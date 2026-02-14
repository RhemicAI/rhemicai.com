# Monitoring Setup Guide

## 1. Google Search Console

### Setup
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Choose "URL prefix" method
4. Enter: `https://rhemicai.com`
5. Verify via HTML tag (add to `<head>` in layout.tsx) or DNS TXT record

### After Verification
1. Go to Sitemaps section
2. Submit: `https://rhemicai.com/sitemap.xml`
3. Monitor indexing status over next 1-2 weeks
4. Check for crawl errors in Coverage report

## 2. Google Analytics 4 (GA4)

### Setup
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create property: "Rhemic AI Website"
3. Create Web data stream for `rhemicai.com`
4. Copy Measurement ID (format: `G-XXXXXXXXXX`)
5. Set environment variable on server:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
6. Rebuild and restart the application

### Verify
1. Visit the site in a browser
2. Open GA4 > Reports > Realtime
3. Confirm page view events appear

### Configure Conversions
Set up these conversion events in GA4:
- **Book Demo click**: Track clicks on "Book a Discovery Call" buttons
- **Start Free Trial click**: Track navigation to `/start-free-trial`
- **Contact form submit**: Track form submissions on `/contact`

## 3. Uptime Monitoring

### UptimeRobot (recommended, free tier)
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Create HTTP(s) monitors for:
   - `https://rhemicai.com` (Homepage)
   - `https://rhemicai.com/blog/what-is-aeo` (Pillar post)
   - `https://rhemicai.com/products` (Products)
   - `https://rhemicai.com/pricing` (Pricing)
   - `https://rhemicai.com/sitemap.xml` (Sitemap)
3. Set check interval: 5 minutes
4. Configure alert contacts (email, Slack)

### Free Tier Limits
- 50 monitors
- 5-minute check interval
- Email + webhook alerts

## 4. Performance Monitoring (Lighthouse CI)

### GitHub Actions Integration

Add `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: ./monitoring-config/lighthouse-ci.json
```

## 5. Schema Monitoring

### Weekly Cron Job

```bash
# Add to crontab (runs every Monday at 9am UTC)
0 9 * * 1 cd /path/to/rhemicai.com && ./monitoring-config/schema-validation.sh >> /var/log/schema-validation.log 2>&1
```

### Manual Validation

Use [Google Rich Results Test](https://search.google.com/test/rich-results) monthly for:
- Homepage (`Organization` + `WebSite` schema)
- Blog post (`BlogPosting` schema)
- Product pages (`Product`/`Service` schema)
