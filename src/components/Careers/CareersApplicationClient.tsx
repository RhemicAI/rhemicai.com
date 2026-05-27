"use client";

import { useMemo, useState } from "react";
import { CareerRole, careersRoles } from "@/lib/careers";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
  taskUrl?: string;
};

const emptyAnswers = (role: CareerRole) => role.formQuestions.map(() => "");

export default function CareersApplicationClient() {
  const [selectedSlug, setSelectedSlug] = useState(careersRoles[0].slug);
  const selectedRole = useMemo(
    () => careersRoles.find((role) => role.slug === selectedSlug) ?? careersRoles[0],
    [selectedSlug],
  );
  const [answers, setAnswers] = useState(() => emptyAnswers(selectedRole));
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function selectRole(role: CareerRole) {
    setSelectedSlug(role.slug);
    setAnswers(emptyAnswers(role));
    setSubmitState({ type: "idle", message: "" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("roleSlug", selectedRole.slug);
    formData.set("roleTitle", selectedRole.title);
    formData.set("answers", JSON.stringify(answers));

    try {
      const response = await fetch("/api/careers/applications", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        taskUrl?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitState({
          type: "error",
          message: data.error || "Application failed. Email contact@rhemicai.com if this keeps happening.",
        });
        return;
      }

      form.reset();
      setAnswers(emptyAnswers(selectedRole));
      setSubmitState({
        type: "success",
        message:
          data.message ||
          "Application received. Check your email to verify your address. Human review is required before any next step.",
        taskUrl: data.taskUrl,
      });
    } catch {
      setSubmitState({
        type: "error",
        message: "Application failed. Email contact@rhemicai.com if this keeps happening.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative z-10 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {careersRoles.map((role) => {
            const isSelected = selectedRole.slug === role.slug;
            return (
              <button
                key={role.slug}
                type="button"
                onClick={() => selectRole(role)}
                className={`group text-left glass-panel p-6 transition-all duration-200 ${
                  isSelected
                    ? "border-[rgba(var(--accent-teal-rgb),0.55)] bg-[rgba(var(--accent-teal-rgb),0.07)]"
                    : "hover:border-[var(--border-strong)] hover:bg-[var(--bg-glass-hover)]"
                }`}
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="section-label">{role.bottleneck}</span>
                  {isSelected && (
                    <span className="rounded-full border border-[rgba(var(--accent-teal-rgb),0.35)] bg-[rgba(var(--accent-teal-rgb),0.1)] px-2.5 py-1 text-xs font-semibold text-[var(--pulse-deep)]">
                      Selected
                    </span>
                  )}
                </div>
                <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)]">
                  {role.title}
                </h2>
                <p className="mb-4 text-sm text-[var(--text-muted)]">{role.type}</p>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {role.description}
                </p>
                <div className="grid gap-3 text-sm">
                  <div>
                    <p className="mb-1 font-semibold text-[var(--text-primary)]">
                      Founder work removed
                    </p>
                    <p className="leading-relaxed text-[var(--text-tertiary)]">
                      {role.founderWorkRemoved}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-[var(--text-primary)]">
                      System plugged into
                    </p>
                    <p className="leading-relaxed text-[var(--text-tertiary)]">
                      {role.systemPluggedInto}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-[var(--text-primary)]">
                      First 30 days
                    </p>
                    <p className="leading-relaxed text-[var(--text-tertiary)]">
                      {role.firstThirtyDaysSuccess}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <aside className="glass-panel h-fit p-6">
            <p className="section-label mb-4">Hiring system</p>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              {selectedRole.title}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              <p>
                This role exists to remove founder bottleneck:{" "}
                <span className="font-semibold text-[var(--text-primary)]">
                  {selectedRole.bottleneck}
                </span>
                .
              </p>
              <p>
                Every application is scored for fit, communication, execution clarity,
                systems thinking, AI tooling, domain fit, and risk.
              </p>
              <p className="rounded-lg border border-[rgba(var(--accent-teal-rgb),0.22)] bg-[rgba(var(--accent-teal-rgb),0.06)] p-4 text-[var(--text-primary)]">
                AI scoring is triage only. A human reviewer must decide before any candidate
                communication or hiring action.
              </p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8">
            <div className="mb-8">
              <p className="section-label mb-3">Application</p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Apply for {selectedRole.title}
              </h2>
            </div>

            <input type="hidden" name="roleSlug" value={selectedRole.slug} readOnly />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Full name *
                </span>
                <input
                  name="name"
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="Jane Smith"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Email *
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={120}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="jane@email.com"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Phone
                </span>
                <input
                  name="phone"
                  maxLength={60}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="+1 555 000 0000"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Location
                </span>
                <input
                  name="location"
                  maxLength={120}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="Dallas, TX"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  LinkedIn
                </span>
                <input
                  name="linkedinUrl"
                  type="url"
                  maxLength={250}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="https://linkedin.com/in/..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Portfolio or work sample
                </span>
                <input
                  name="portfolioUrl"
                  type="url"
                  maxLength={250}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Position *
                </span>
                <input
                  name="roleTitle"
                  value={selectedRole.title}
                  readOnly
                  className="w-full rounded-lg border border-[rgba(var(--accent-teal-rgb),0.25)] bg-[rgba(var(--accent-teal-rgb),0.06)] px-4 py-3 text-[var(--text-primary)]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                  Availability
                </span>
                <input
                  name="availability"
                  maxLength={160}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                  placeholder="10-20 hours/week, immediate start"
                />
              </label>
            </div>

            <div className="mt-8 space-y-5">
              {selectedRole.formQuestions.map((question, index) => (
                <label key={question} className="block">
                  <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                    {question} *
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={answers[index] ?? ""}
                    onChange={(event) => {
                      const nextAnswers = [...answers];
                      nextAnswers[index] = event.target.value;
                      setAnswers(nextAnswers);
                    }}
                    className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                    placeholder="Be specific. We score from evidence, not vague claims."
                  />
                </label>
              ))}
            </div>

            <label className="mt-8 block">
              <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Resume PDF *
              </span>
              <input
                name="resume"
                type="file"
                accept="application/pdf,.pdf"
                required
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--btn-primary-bg)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--btn-primary-text)]"
              />
            </label>

            {submitState.type !== "idle" && (
              <div
                role="alert"
                className={`mt-6 rounded-lg border p-4 text-sm font-medium ${
                  submitState.type === "success"
                    ? "border-green-500/30 bg-green-900/20 text-green-300"
                    : "border-red-500/30 bg-red-900/20 text-red-300"
                }`}
              >
                {submitState.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-full bg-[var(--btn-primary-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Submit application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
