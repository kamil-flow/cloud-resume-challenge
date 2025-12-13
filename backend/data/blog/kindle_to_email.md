# From Kindle to Gmail: Building My Own Readwise-Like System on AWS Free Tier 🚀

I've always adored **Readwise** — that clever app resurfacing your book highlights so they stick. Why pay when I can build my own? Especially as I'm diving into IT, automation, and cloud — this became my playground on AWS free tier.

**The Magic Result:** Plug my Kindle into Ubuntu → seconds later → Gmail pings with 5 random highlights. No manual steps. Pure automation joy!












### The Journey: Overwhelmed to Event-Driven Mastery

AWS felt overwhelming — endless services! I started small: Focus on **Kindle → Ubuntu → S3 → Lambda → Email**.

**Version 1 (Cron + Daily):** Script polled every 5 mins, CloudWatch triggered Lambda daily. Worked, but delayed.

**Version 2 (Instant!):** Switched to **udev** for event-driven trigger on plug-in. Email arrives ~10s later.

Inspired by Readwise's resurfacing:








### Deep Dive: How It Works (Rebuild in One Afternoon)

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

   **Bullet-Proof udev Rule** (adapt `0324` to your model)
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
   Wrapper (runs as your user):
   ```bash
   # ~/kindle_highlights/run_sync_when_kindle_arrives.sh
   #!/bin/bash
   exec sudo -u $USER /bin/bash /home/$USER/kindle_highlights/sync_kindle.sh \
     >> /home/$USER/kindle_highlights/sync_log.txt 2>&1
   ```

   Main script (bash in terminal):
   ```bash
   # ~/kindle_highlights/sync_kindle.sh
   #!/bin/bash
   set -euo pipefail

   KINDLE_MOUNT="/media/$USER/Kindle"
   SOURCE="${KINDLE_MOUNT}/documents/My Clippings.txt"
   DEST_DIR="/home/$USER/kindle_highlights"
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)

   DEST="${DEST_DIR}/My_Clippings_${TIMESTAMP}.txt"
   FIXED_DEST="${DEST_DIR}/My_Clippings.txt"
   LOG="${DEST_DIR}/sync_log.txt"

   log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG"; }

   [[ -f "$DEST_DIR/.sync.lock" ]] && exit 0
   touch "$DEST_DIR/.sync.lock"
   trap 'rm -f "$DEST_DIR/.sync.lock"' EXIT

   if [[ -f "$SOURCE" ]]; then
       cp "$SOURCE" "$DEST"
       cp "$SOURCE" "$FIXED_DEST"
       log "Synced clippings"
       aws s3 cp "$FIXED_DEST" "s3://your-bucket/My Clippings.txt" && log "Uploaded!"
   else
       log "No file found"
   fi
   ```








3. **Cloud Flow: S3 → Lambda → SNS**
   - S3 stores/overwrites `My Clippings.txt`.
   - S3 event triggers Lambda instantly.
   - Lambda picks 5 random highlights → SNS emails.

   Architecture:
















   The payoff:








### Bonus: Clean Highlights (Optional Python Parser)
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

Call before upload for polished emails.

### Lessons & Security
- MFA root, IAM least privilege, no secrets in code.
- For posting: Blur emails/account IDs/ARNs.

This project taught Linux automation, event-driven design, and cloud basics. If rebuilding, follow this post — it's your complete blueprint.

What sparks your curiosity most — the udev trigger, Python cleaning, or extending to articles/PDFs? Experts often add databases (DynamoDB) or apps (Streamlit dashboard). Your turn — what's next for your version? You've built something incredible! 📚✨