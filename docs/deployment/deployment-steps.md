# Deployment Steps

## Prerequisites

- Node.js 18+ installed on Hetzner server
- Git access to `RhemicAI/rhemicai.com` repository
- SSL certificate configured (Let's Encrypt recommended)
- Reverse proxy (nginx/Caddy) configured

## Step 1: Merge

```bash
# On GitHub:
# 1. Review PR from feature/seo-aeo-foundation → main
# 2. Approve and merge (squash or merge commit)
```

## Step 2: Tag Release

```bash
git checkout main
git pull origin main
git tag -a v1.1.0-seo-aeo -m "SEO/AEO foundation: pillar post, schema, monitoring"
git push origin v1.1.0-seo-aeo
```

## Step 3: Build on Server

```bash
cd /path/to/rhemicai.com
git pull origin main
npm ci
npm run build
```

## Step 4: Set Environment Variables

```bash
# Add to your .env.production or server environment:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Get from GA4 Admin
```

## Step 5: Start/Restart Application

```bash
# Using PM2 (recommended):
pm2 start npm --name "rhemicai" -- start
# Or restart if already running:
pm2 restart rhemicai

# Or using systemd:
sudo systemctl restart rhemicai

# Or manually:
npm start  # Runs on port 3000
```

## Step 6: Verify

```bash
# Quick smoke test
curl -I https://rhemicai.com
curl -I https://rhemicai.com/blog/what-is-aeo
curl -I https://rhemicai.com/sitemap.xml
curl -I https://rhemicai.com/robots.txt
```

## Reverse Proxy Config (nginx example)

```nginx
server {
    listen 443 ssl http2;
    server_name rhemicai.com www.rhemicai.com;

    ssl_certificate /etc/letsencrypt/live/rhemicai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rhemicai.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name rhemicai.com www.rhemicai.com;
    return 301 https://$server_name$request_uri;
}
```

## Estimated Deployment Time

15-30 minutes (including verification)
