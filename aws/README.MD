## Using CloudFormation

We have multiple options for IaC:
- CloudFormation
- CDK
- Terraform

I use CloudFormation because its simple to use.




## Install Ansible
```sh
pip install boto3 botocore
pipx install --include-deps ansible

ansible-galaxy collection install amazon.aws
```

## Edit Vault

I am going to store all of my configuration in a vault.
For learning I'll use a vault even for non-sensentive information.

```sh
cd aws
ansible-vault create playbooks/vaults/prod.yml
ansible-vault edit playbooks/vaults/prod.yml
```

quit the vault --> :wq
the file in vault is encrypted I can safely push this to the repo

## Consideration with boto3

When trying to deploy the cloud formation template. I had complains about boto3 not being installed despite running `pip install boto3`

It looks as though ansible creates their own Python virtual environmet.


> TASK [Deploy /Update stack] *************************************************************************************************************************************************************************************************************************************************
[WARNING]: Deprecation warnings can be disabled by setting `deprecation_warnings=False` in ansible.cfg.
[DEPRECATION WARNING]: Importing 'to_bytes' from 'ansible.module_utils._text' is deprecated. This feature will be removed from ansible-core version 2.24. Use ansible.module_utils.common.text.converters instead.
[DEPRECATION WARNING]: Importing 'to_native' from 'ansible.module_utils._text' is deprecated. This feature will be removed from ansible-core version 2.24. Use ansible.module_utils.common.text.converters instead.
[DEPRECATION WARNING]: Importing 'to_text' from 'ansible.module_utils._text' is deprecated. This feature will be removed from ansible-core version 2.24. Use ansible.module_utils.common.text.converters instead.
[DEPRECATION WARNING]: Param 'template' is deprecated. See the module docs for more information. This feature will be removed from collection 'amazon.aws' in a release after 2026-05-01.
[ERROR]: Task failed: Module failed: Failed to import the required Python library (botocore and boto3) on codespaces-a09d7a's Python /usr/local/py-utils/venvs/ansible/bin/python. Please read the module documentation and install it in the appropriate location. If the required library is installed, but Ansible is using the wrong Python interpreter, please consult the documentation on ansible_python_interpreter
Origin: /workspaces/cloud-resume-challenge/aws/playbooks/deploy.yml:17:7

15
16   tasks:
17     - name: Deploy /Update stack
         ^ column 7

fatal: [localhost]: FAILED! => {"changed": false, "msg": "Failed to import the required Python library (botocore and boto3) on codespaces-a09d7a's Python /usr/local/py-utils/venvs/ansible/bin/python. Please read the module documentation and install it in the appropriate location. If the required library is installed, but Ansible is using the wrong Python interpreter, please consult the documentation on ansible_python_interpreter"}

PLAY RECAP ******************************************************************************************************************************************************************************************************************************************************************
localhost                  : ok=0    changed=0    unreachable=0    failed=1    skipped=0    rescued=0    ignored=0  

I'll attempt to install directly.
```sh
/usr/local/py-utils/venvs/ansible/bin/python -m pip install --upgrade pip
/usr/local/py-utils/venvs/ansible/bin/python -m pip install boto3 botocore

```

### S3 bucket deployed

### Next step:
Configure static website hosting without it we're not gonna be able to see our website.

I'll do it in template.yaml

Bucket is enable for website hosting

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-s3.html#scenario-s3-bucket-website

https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-s3-bucket-websiteconfiguration.html

###

I am using AWS and have a bucket for hosting a static website.
I have a React app with vitejs. I want the asible playbook to build the code and then copy it to the S3 bucket

## Instal dependencies for Ansible

```sh
ansible-galaxy collection install -r requirements.txt
```

I didn't invalidate because have no issue with it.