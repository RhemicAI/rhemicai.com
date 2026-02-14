# Rollback Plan

## When to Rollback

- Critical pages returning 500 errors
- Major layout/rendering issues
- JavaScript errors preventing interaction
- Performance regression > 50%

## Rollback Steps

### 1. Identify the Problem

```bash
# Check application logs
pm2 logs rhemicai --lines 50

# Check if the app is running
pm2 status
```

### 2. Revert to Previous Version

```bash
cd /path/to/rhemicai.com

# Option A: Revert the merge commit
git revert HEAD
npm ci
npm run build
pm2 restart rhemicai

# Option B: Reset to previous tag/commit
git checkout v1.0.0  # or the previous known-good tag
npm ci
npm run build
pm2 restart rhemicai
```

### 3. Verify Rollback

```bash
curl -I https://rhemicai.com
curl -I https://rhemicai.com/blog
```

### 4. Clear Caches (if applicable)

```bash
# If using CDN (Cloudflare, etc.):
# Purge cache via CDN dashboard

# Browser cache:
# Users may need to hard refresh (Ctrl+Shift+R)
```

## Important Notes

- **No database changes**: This is a static site (Next.js SSR/SSG). No database migrations to revert.
- **No external state**: All state is in the codebase. Rollback is clean.
- **Environment variables**: GA4 env var is additive only. Removing it just disables analytics.
- **Estimated rollback time**: < 5 minutes

## Post-Rollback

1. Notify the team that rollback occurred
2. Investigate root cause on the feature branch
3. Fix and re-test before attempting deployment again
4. Consider deploying during lower-traffic window
