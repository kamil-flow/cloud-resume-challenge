## Using CloudFormation

We have multiple options for IaC:
- CloudFormation
- CDK
- Terraform

I use CloudFormation because its simple to use.




## Install Ansible
```sh
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