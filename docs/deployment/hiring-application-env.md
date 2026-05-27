# Hiring Application Environment

The careers application system needs these production environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://rhemicai.com

CLICKUP_API_TOKEN=pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLICKUP_APPLICATION_LIST_ID=901714101330

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
HIRING_EMAIL_FROM="Rhemic AI <contact@rhemicai.com>"
HIRING_EMAIL_REPLY_TO="contact@rhemicai.com"
HIRING_VERIFY_SECRET=replace-with-long-random-secret

# Pick exactly one provider.
HIRING_AI_PROVIDER=deepseek

DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_HIRING_MODEL=deepseek-v4-pro

# OpenAI alternative. Only set these when HIRING_AI_PROVIDER=openai.
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_HIRING_MODEL=gpt-4.1-mini
```

The AI score is triage only. Human review is mandatory before any candidate communication, rejection, advancement, test task, interview, or offer.
The application route rate-limits public submissions by IP and applicant email, checks for an existing ClickUp application for the same email before creating a task, rejects resume uploads that do not start with PDF magic bytes, and sends the applicant thank-you/verification email through Resend from `contact@rhemicai.com`.
