# Hiring Application Environment

The careers application system needs these production environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://rhemicai.com

CLICKUP_API_TOKEN=pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLICKUP_APPLICATION_LIST_ID=901714101330

N8N_HIRING_VERIFY_WEBHOOK_URL=https://n8n.example.com/webhook/hiring-verify
# Shared secret signs verification tokens and the N8N webhook payload header X-Rhemic-Signature.
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
The application route rate-limits public submissions by IP and applicant email, checks for an existing ClickUp application for the same email before creating a task, and rejects resume uploads that do not start with PDF magic bytes.
