# Cloud Résumé Challenge -AWS

This repository contains my implementation of the Cloud Resume Challenge, focused on understanding AWS infrastructure, deployment workflows, and frontend hosting behind a CDN.

The project is split into **three concerns:**

* Frontend (React + Vite) [Fronted](./frontend/README.md)

* Infrastructure (AWS via CloudFormation + Ansible) [AWS](./aws/README.MD)

* Backend utilities (content generation, not in production path) [Backend](./backend/README.md)

## Architecture Overview
### Frontend

* React + Vite

* Static Single Page Application (SPA)

* Built into static assets (dist/)

### Hosting

* S3 (static hosting)

* CloudFront (CDN, HTTPS, SPA routing)

* Origin Access Control (OAC)

### Infrastructure as Code

* CloudFormation templates

* Deployed via Ansible

### Deployment Flow
```markdown
Frontend code
  ↓
npm run build
  ↓
frontend/dist
  ↓
Ansible (upload.yml)
  ↓
S3 (www bucket)
  ↓
CloudFront
```
## Repository Structure

```
cloud-resume-challenge/
├── frontend/      # React + Vite SPA
├── backend/       # Markdown rendering utilities (not production)
├── aws/
│   ├── playbooks/
│   │   ├── deploy.yml    # CloudFormation (infra)
│   │   ├── upload.yml    # Build + upload frontend
│   │   ├── invalidate.yml  # CloudFront cache invalidation
│   │   └── vaults/prod.yml  # Encrypted config
│   └── templates/
│       └── frontend.yaml    # CloudFormation template
└── README.md
```

## Infrastructure Deployment

Infrastructure is deployed using CloudFromation, orchestrated by Ansible.

### What it creates
* S3 buckets (apex + www)
* CloudFront distributions
* ACM certificate integration
* SPA routing (403/404 --> index.html)

### Deploy / update  infrastructure
```bash
cd asw
ansible-playbook playbooks/deploy.yml --ask-vault-pass
```

## Fronted Deployment

The frontend is a static React application built with Vite.

### Build and upload frontend
```sh
cd aws
ansible-playbook playbooks/upload.yml --ask-vault-pass
```
This playbook: 

1. Installs frontend dependentcies (```npm ci```)
2. Builds the app (```npm run build-aws```)
3. Uploads  ```/frontend/dist``` to the S3 www bucket
4. Ensures ```index.html is uploaded with no-cache headers (SPA correctness)

## CloudFront Caching & Invalidation

CloudFront aggressively caches content.

### Important rules
* Hashed assets (JS/CSS) usually do not require invalidaton
* index.html changes may NOT be visible immediately
* When content apears stale --> invalidate CloudFront

### Invalidate cache manually
```sh
cd aws
ansible-playbook playbooks/invalidate.yml --ask-vault-pass
```
This forces CloudFront to fetch fresh content from S3

AWS reference:
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html

## Backend
The ```backend/``` directory contains Python utilities for:
* Rendering markdown to HTML
* Generating content with syntax highlighting
* Experimenting with content piplines

## Security & Configuration
* Sensitive configuration is stored in Ansible Vault
* ```vaults/prod.yml```is encrypted and safe to commit
* AWS credentials are injected via environment variables ```export AWS_ACCESS_KEY_ID=```

## Design Decisions
* **CloudFormation** over Terraform/CDK for native AWS learning
* **Ansible** for orchestration, not application logic
* **Vite** for fast, simple frontend builds
* **CloudFront OAC** for secure S3 access
* SPA routing handled at CDN level

## Final note to Future-Me
if the site "works but doesn't update":
1. Check S3 upload
2. Check CloudFront cache
3. Run invalidation
4. Don't debug React first