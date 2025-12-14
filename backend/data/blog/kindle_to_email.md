# From Kindle to Gmail: Building My Own Readwise-Like System on AWS

I've always adored **Readwise** the app resurfacing your book highlights so they stick. 

**The Magic Result:** Pure automation joy! Every day 5 random highlights in to my mailbox.


### The Journey: Practicing AWS, and Linux to Event-Driven Automation

Roadmap **Kindle → Ubuntu → S3 → Lambda → Email**.

1.	Write sync_kindle.sh, schedule with udev,
2.	Install AWS CLI, configure with IAM keys.
3.	Create S3 bucket, test upload.
4.	Write lambda_function.py, zip, create Lambda with IAM role (AWSLambdaBasicExecutionRole, AmazonS3ReadOnlyAccess, AmazonSNSFullAccess).
5.	Set CloudWatch rule, link to Lambda.
6.	Create SNS topic, subscribe email, update Lambda to publish.
7.	Test: aws lambda invoke ..., check email.


**Version 1 (Cron + Daily):** Script polled every 5 mins.

In the first project I used cron:

```bash
crontab -e
*/5 * * * * ~/kindle_highlights/sync_kindle.sh
```
But what I wanted to try is a different way. To get synchronization only when the Kindle is plugged. the udev is ideal for it.


**Version 2 (mount trigged):** Switched to **udev** for event-driven trigger on plug-in. 

### Deep Dive: How It Works

1. **Instant Trigger: udev Detects Kindle Plug-In**
   - Ubuntu auto-mounts at `/media/$USER/Kindle`.
   - udev runs script **once** when partition appears.

   **Discovery Commands**
   ```bash
   lsblk                  # Spot the Kindle mount
   lsusb                  # Find "1949:xxxx" (Amazon vendor ID)
   lsusb -v | grep -E 'idVendor|idProduct'  # Detailed IDs
   udevadm monitor --environment --udev    # Live debug events
   ```

**hint**: amazon kindle division is Lab126 and their official vendor is 1949, it’s easier when you know what you are searching for.

**hint**: check if the Kindle is mounted, because I have only charged cables as well, these cannot transfer data.


   **udev Rule**
   ```bash
   sudo nano /etc/udev/rules.d/99-kindle-sync.rules
   ```
   ```
   ACTION=="add", SUBSYSTEM=="block", ENV{ID_VENDOR_ID}=="1949", ENV{ID_MODEL_ID}=="0324", \
     ENV{ID_FS_USAGE}=="filesystem", ENV{ID_FS_TYPE}=="vfat", ENV{DEVTYPE}=="partition", \
     RUN+="/bin/bash /home/$USER/kindle_highlights/run_sync_when_kindle_arrives.sh"
   ```
   Reload:
   ```bash
   sudo udevadm control --reload-rules && sudo udevadm trigger
   ```


2. **Wrapper & Main Script**
   Wrapper for udev iscreated to simplify the execution of specific action when certain device events occur:

   ```bash
   # ~/kindle_highlights/run_sync_when_kindle_arrives.sh
   #!/bin/bash
   exec sudo -u $USER /bin/bash /home/$USER/kindle_highlights/sync_kindle.sh \
     >> /home/$USER/kindle_highlights/sync_log.txt 2>&1
   ```

   Main script:

   ```bash
    #!/bin/bash
    set -euo pipefail

    KINDLE_MOUNT="/media/wolsky/Kindle"
    SOURCE="${KINDLE_MOUNT}/documents/My Clippings.txt"
    DEST_DIR="/home/wolsky/kindle_highlights"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)

    DEST="${DEST_DIR}/My_Clippings_${TIMESTAMP}.txt"          # Raw history
    LOG="${DEST_DIR}/sync_log.txt"


    S3_KEY="My Clippings.txt"
    S3_BUCKET="s3://wolsky-cytaty"

    log() {
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG";
    }

    # Prevent double execution
    [[ -f "$DEST_DIR/.sync.lock" ]] && exit 0
    touch "$DEST_DIR/.sync.lock"
    trap 'rm -f "$DEST_DIR/.sync.lock"' EXIT

    if [[ -f "$SOURCE" ]]; then
        # Raw backup
        cp "$SOURCE" "$DEST"
        log "Saved raw copy: $DEST"

        # Clean and upload
        CLEANED="${DEST_DIR}/My_Clippings_clean.txt"
        if ~/kindle_highlights/clean_clippings.py "$SOURCE" "$CLEANED"; then
            log "Successfully cleaned clippings"
        
            if aws s3 cp "$CLEANED" "${S3_BUCKET}/${S3_KEY}" --only-show-errors; then
                log "Uploaded cleaned version → Lambda will send polished highlights"
            else
                log "S3 upload failed (cleaned file)"
            fi
        else
            log "Cleaning failed — uploading raw version as fallback"
            aws s3 cp "$SOURCE" "${S3_BUCKET}/${S3_KEY}" --only-show-errors && \
            log "Uploaded raw version"
        fi
    else
        log "Kindle not mounted or My Clippings.txt not found"
    fi
    ```

### Bonus: Clean Highlights
Remove short/empty ones:

```python
# ~/kindle_highlights/clean_clippings.py
#!/usr/bin/env python3
from pathlib import Path

def clean(input_path, output_path):
    content = input_path.read_text(encoding='utf-8')
    entries = [e.strip() for e in content.split('==========') if e.strip()]
    cleaned = []
    for entry in entries:
        lines = [l.strip() for l in entry.splitlines() if l.strip()]
        if len(lines) < 3: continue
        text = ' '.join(lines[2:]).strip()
        if len(text) < 15: continue
        cleaned.append('\n'.join(lines) + '\n==========\n')
    output_path.write_text(''.join(cleaned), encoding='utf-8')

if __name__ == '__main__':
    clean(Path(sys.argv[1]), Path(sys.argv[2]))
```
3. Install AWS CLI on Ubuntu
Installed AWS CLI manually since apt failed.

```bash
sudo apt update && sudo apt install -y unzip curl
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
rm -rf awscliv2.zip aws
```

**Crucial**: Configured credentials:

```bash

aws configure
# Access Key ID: [from IAM]
# Secret Access Key: [from IAM]
# Region: us-east-1
# Output: json
```

## **Cloud Flow: S3 → Lambda → SNS**

    Architecture:
    ![System diagram](/images/blog/my-post/AWS draw.png)


4. Set Up S3 Bucket

Created wolsky-cytaty bucket 
```bash
aws s3 mb s3://wolsky-cytaty/ --region us-east-1
```

5. Create Lambda Function
Wrote lambda_function.py to pick 5 highlights.
```python
import boto3
import random

s3 = boto3.client('s3')
sns = boto3.client('sns')

def lambda_handler(event, context):
    bucket = 'wolsky-cytaty'
    key = 'My Clippings.txt'
    obj = s3.get_object(Bucket=bucket, Key=key)
    content = obj['Body'].read().decode('utf-8')
    highlights = [h.strip() for h in content.split('==========') if h.strip()]
    five = random.sample(highlights, k=min(5, len(highlights)))
    message = '\n\n'.join(five)
    
    sns.publish(
        TopicArn='arn:aws:sns:us-east-1:123456789:DailyHighlights',
        Message=message,
        Subject='Do you remember this?'
    )
```


6. Lambda

Every service in the automations needs a Lambda ARN.

- CloudWatch Events needs a target
- Permissions need a function name
- Testing needs a deployed function

```bash
aws lambda create-function \
  --function-name sendRandomHighlight \
  --runtime python3.13 \
  --handler lambda_function.lambda_handler \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-s3-role \
  --zip-file fileb://function.zip
```
- Create = define infrastructure
- Update = iterate on logic

```bash
aws lambda update-function-code --function-name sendRandomHighlight --zip-file fileb://function.zip
```

7. Test:
```bash
aws lambda invoke --function-name sendRandomHighlight --payload '{}' output.json.
```

8. : Schedule with CloudWatch

What: Set daily trigger.

```bash
aws events put-rule --name DailyHighlightTrigger --schedule-expression 'rate(1 day)'
```
```bash
aws lambda add-permission \
  --function-name sendRandomHighlight \
  --statement-id CloudWatchTrigger \
  --action 'lambda:InvokeFunction' \
  --principal events.amazonaws.com \
  --source-arn arn:aws:events:us-east-1:YOUR_ACCOUNT_ID:rule/DailyHighlightTrigger
```
```bash
aws events put-targets \
  --rule DailyHighlightTrigger \
  --targets '[{"Id": "1", "Arn": "arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:sendRandomHighlight"}]'
```

9. Set Up SNS for Email

What: Added email notifications.

```bash
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:YOUR_ACCOUNT_ID:DailyHighlights \
  --protocol email \
  --notification-endpoint your_email@gmail.com

This project taught Linux automation, event-driven design, and cloud basics. 