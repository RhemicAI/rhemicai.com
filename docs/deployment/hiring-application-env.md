# Hiring Application Environment

The careers application system needs these production environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://rhemicai.com

CLICKUP_API_TOKEN=pk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLICKUP_APPLICATION_LIST_ID=901714101330

N8N_HIRING_VERIFY_WEBHOOK_URL=https://n8n.example.com/webhook/hiring-verify
HIRING_VERIFY_SECRET=replace-with-long-random-secret

OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_HIRING_MODEL=gpt-5
```

The AI score is triage only. Human review is mandatory before any candidate communication, rejection, advancement, test task, interview, or offer.
