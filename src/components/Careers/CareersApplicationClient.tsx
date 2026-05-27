"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CareerRole, careersRoles } from "@/lib/careers";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

const emptyAnswers = (role: CareerRole) => role.formQuestions.map(() => "");

export default function CareersApplicationClient() {
  const [modalRole, setModalRole] = useState<CareerRole | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  function openApplication(role: CareerRole) {
    if (role.status !== "open") {
      setNotice("This role is not open yet.");
      return;
    }
    setModalRole(role);
    setAnswers(emptyAnswers(role));
    setSubmitState({ type: "idle", message: "" });
    setNotice("");
  }

  const closeModal = useCallback(() => {
    if (isSubmitting) return;
    setModalRole(null);
    setAnswers([]);
    setSubmitState({ type: "idle", message: "" });
  }, [isSubmitting]);

  useEffect(() => {
    if (!modalRole) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeModal, modalRole]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!modalRole || modalRole.status !== "open") return;

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("roleSlug", modalRole.slug);
    formData.set("roleTitle", modalRole.title);
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
      };

      if (!response.ok || !data.success) {
        setSubmitState({
          type: "error",
          message: data.error || "Application failed. Email contact@rhemicai.com if this keeps happening.",
        });
        return;
      }

      form.reset();
      setAnswers(emptyAnswers(modalRole));
      setSubmitState({
        type: "success",
        message:
          data.message ||
          "Application received. Check your email to verify your address. Human review is required before any next step.",
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
        <div className="mb-8 glass-panel p-6">
          <p className="section-label mb-3">Active hiring</p>
          <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Rhemic is currently hiring for one active role:{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              SDR / Appointment Setter
            </span>
            . The operations, fulfillment, and technical automation roles remain visible
            because they are part of the hiring system, but they are not open for applications yet.
          </p>
          {notice && (
            <p className="mt-4 rounded-lg border border-amber-500/25 bg-amber-500/10 p-3 text-sm font-medium text-amber-200">
              {notice}
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {careersRoles.map((role) => {
            const isOpen = role.status === "open";
            return (
              <article
                key={role.slug}
                className={`glass-panel p-6 transition-all duration-200 ${
                  isOpen ? "border-[rgba(var(--accent-teal-rgb),0.35)]" : "opacity-75"
                }`}
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="section-label">{role.bottleneck}</span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      isOpen
                        ? "border-[rgba(var(--accent-teal-rgb),0.35)] bg-[rgba(var(--accent-teal-rgb),0.1)] text-[var(--pulse-deep)]"
                        : "border-amber-500/25 bg-amber-500/10 text-amber-200"
                    }`}
                  >
                    {isOpen ? "Open" : "Coming soon"}
                  </span>
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
                <button
                  type="button"
                  onClick={() => openApplication(role)}
                  disabled={!isOpen}
                  className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isOpen
                      ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-[1.01]"
                      : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--bg-elevated)] text-[var(--text-muted)]"
                  }`}
                >
                  {isOpen ? "Apply now" : "Coming soon"}
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {modalRole &&
        typeof document !== "undefined" &&
        createPortal(
          (
        <div
          aria-labelledby="careers-application-title"
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-[2147483647] flex items-center justify-center overflow-hidden bg-black/80 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="glass-panel relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden p-0 sm:max-h-[calc(100dvh-4rem)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 z-10 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-1.5 text-sm font-semibold text-[var(--text-secondary)] shadow-lg transition-colors hover:text-[var(--text-primary)] sm:right-5 sm:top-5"
              aria-label="Close application modal"
            >
              Close
            </button>

            <div className="border-b border-[var(--border-default)] px-4 pb-4 pt-5 pr-20 sm:px-8 sm:pb-6 sm:pt-7">
              <p className="section-label mb-3">Job application</p>
              <h2
                id="careers-application-title"
                className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl"
              >
                Apply for {modalRole.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Help Rhemic turn qualified med-spa leads into booked audit calls.
              </p>
              <p className="mt-3 rounded-lg border border-[rgba(var(--accent-teal-rgb),0.22)] bg-[rgba(var(--accent-teal-rgb),0.06)] p-3 text-sm leading-relaxed text-[var(--text-primary)]">
                AI scoring is triage only. Human review is mandatory before any candidate
                communication or hiring decision.
              </p>
            </div>

            <div className="overflow-y-auto overscroll-contain px-4 py-5 sm:px-8 sm:py-6">
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="roleSlug" value={modalRole.slug} readOnly />

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      Full name *
                    </span>
                    <input
                      name="name"
                      required
                      maxLength={100}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
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
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
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
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
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
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
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
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
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
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
                      placeholder="https://..."
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      Position *
                    </span>
                    <input
                      name="roleTitle"
                      value={modalRole.title}
                      readOnly
                      className="w-full rounded-lg border border-[rgba(var(--accent-teal-rgb),0.25)] bg-[rgba(var(--accent-teal-rgb),0.06)] px-3 py-2.5 text-[var(--text-primary)] sm:px-4 sm:py-3"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                      Availability
                    </span>
                    <input
                      name="availability"
                      maxLength={160}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
                      placeholder="10-20 hours/week, immediate start"
                    />
                  </label>
                </div>

                <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                  {modalRole.formQuestions.map((question, index) => (
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
                        className="w-full resize-y rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] sm:px-4 sm:py-3"
                        placeholder="Be specific. We score from evidence, not vague claims."
                      />
                    </label>
                  ))}
                </div>

                <label className="mt-6 block sm:mt-8">
                  <span className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                    Resume PDF *
                  </span>
                  <input
                    name="resume"
                    type="file"
                    accept="application/pdf,.pdf"
                    required
                    className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] px-3 py-2.5 text-sm text-[var(--text-secondary)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--btn-primary-bg)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--btn-primary-text)] sm:px-4 sm:py-3 sm:file:mr-4 sm:file:px-4"
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
                  className="mt-6 w-full rounded-full bg-[var(--btn-primary-bg)] px-8 py-3.5 text-base font-semibold text-[var(--btn-primary-text)] transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:mt-8 sm:py-4"
                >
                  {isSubmitting ? "Submitting..." : "Submit application"}
                </button>
              </form>
            </div>
          </div>
        </div>
          ),
          document.body,
        )}
    </section>
  );
}
