export const hiringPipelineLabels = [
  "New Application",
  "Email Unverified",
  "Verified",
  "AI Scored",
  "Human Review Needed",
  "Test Task Sent",
  "Test Task Submitted",
  "Interview",
  "Offer",
  "Rejected",
  "Talent Pool",
] as const;

export const recommendedNextSteps = [
  "reject",
  "hold",
  "test_task",
  "interview",
  "strong_candidate",
] as const;

export type HiringPipelineLabel = (typeof hiringPipelineLabels)[number];
export type RecommendedNextStep = (typeof recommendedNextSteps)[number];

export type CareerRole = {
  slug: string;
  title: string;
  type: string;
  bottleneck: string;
  founderWorkRemoved: string;
  systemPluggedInto: string;
  firstThirtyDaysSuccess: string;
  description: string;
  tags: string[];
  formQuestions: string[];
  suggestedTestTask: string;
};

export const careersRoles: CareerRole[] = [
  {
    slug: "sdr-appointment-setter",
    title: "SDR / Appointment Setter",
    type: "Contract to full-time · Remote",
    bottleneck: "Lead Generation + Sales follow-up",
    founderWorkRemoved:
      "Daily prospect follow-up, call openers, lead qualification, and booked-call chasing.",
    systemPluggedInto:
      "Med spa lead packets, CRM follow-up, founder-led sales scripts, and ClickUp pipeline updates.",
    firstThirtyDaysSuccess:
      "Consistently books qualified med spa conversations, writes clean follow-ups, and updates every lead without Karim re-explaining the process.",
    description:
      "Own the first mile of demand. You turn med spa lead packets into booked conversations with sharp calls, fast follow-up, and clean CRM discipline.",
    tags: ["Sales", "Follow-up", "Med spa GTM"],
    formQuestions: [
      "Write a 4-sentence call opener for a med spa owner who is missing consults from calls and follow-up gaps.",
      "Describe how you would follow up with a lead who replied once, then went quiet.",
      "What sales process or CRM habit have you used that made you more reliable than other reps?",
    ],
    suggestedTestTask:
      "Write a call opener and follow-up email for a med spa lead packet.",
  },
  {
    slug: "client-success-ops-coordinator",
    title: "Client Success / Ops Coordinator",
    type: "Contract to full-time · Remote",
    bottleneck: "Onboarding + client communication",
    founderWorkRemoved:
      "Client onboarding reminders, unclear handoffs, update messages, and status follow-through.",
    systemPluggedInto:
      "Client onboarding checklists, ClickUp account tasks, weekly updates, and fulfillment handoffs.",
    firstThirtyDaysSuccess:
      "Turns messy client context into clean checklists, keeps every owner updated, and prevents loose ends from reaching Karim.",
    description:
      "Convert client chaos into clean operating rhythm. You keep onboarding, communication, and follow-through tight.",
    tags: ["Operations", "Client success", "Communication"],
    formQuestions: [
      "A client sent scattered onboarding details across email, text, and a call. How would you turn that into an execution checklist?",
      "Write a concise client update when fulfillment is waiting on access to Google Business Profile and website CMS.",
      "What operating habit helps you keep multiple clients from slipping?",
    ],
    suggestedTestTask:
      "Turn a messy client onboarding situation into a checklist and update message.",
  },
  {
    slug: "fulfillment-specialist",
    title: "Fulfillment Specialist",
    type: "Contract · Remote",
    bottleneck: "Fulfillment delivery",
    founderWorkRemoved:
      "Manual website review, consult-leak detection, delivery prep, and implementation QA notes.",
    systemPluggedInto:
      "Med spa website audits, visibility reports, fulfillment SOPs, and client delivery tasks.",
    firstThirtyDaysSuccess:
      "Can inspect a med spa site, find consult-leak opportunities, document fixes, and ship QA-ready work without vague handoff.",
    description:
      "Help ship the work clients actually paid for. You inspect sites, find leaks, document fixes, and keep delivery moving.",
    tags: ["Fulfillment", "Audits", "QA"],
    formQuestions: [
      "What would you check first on a med spa website to find missed consult opportunities?",
      "Describe a time you turned a vague task into a finished deliverable.",
      "List the information you would need before reviewing a med spa website for conversion and visibility issues.",
    ],
    suggestedTestTask:
      "Review a med spa website and identify 5 consult-leak opportunities.",
  },
  {
    slug: "technical-automation-engineer",
    title: "Technical Automation Engineer",
    type: "Contract to full-time · Remote",
    bottleneck: "Internal systems, agents, integrations, dashboards",
    founderWorkRemoved:
      "Manual system glue, brittle automations, dashboard gaps, and repeated internal tooling requests.",
    systemPluggedInto:
      "ClickUp, Airtable-style ops tables, lead scoring, internal agents, dashboards, and API integrations.",
    firstThirtyDaysSuccess:
      "Designs small safe automations, names failure modes clearly, and ships internal tools that reduce repeated founder/operator work.",
    description:
      "Build the internal systems layer. You design practical automations, integrations, dashboards, and agent workflows that do not break the operation.",
    tags: ["Automation", "Integrations", "Internal tools"],
    formQuestions: [
      "Design a safe sync between a lead table and ClickUp. What can go wrong, and how would you prevent duplicate or bad writes?",
      "Describe one automation or internal tool you built. What did it replace?",
      "How do you decide when an AI agent should act automatically versus create a human review task?",
    ],
    suggestedTestTask:
      "Design a safe Airtable to ClickUp sync or lead-scoring worker plan.",
  },
];

export function getCareerRole(slug: string) {
  return careersRoles.find((role) => role.slug === slug);
}
