"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { monthlyInvoiceBands, turnoverBands } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  turnoverBand: string;
  erpSystem: string;
  formType: "contact" | "demo";
  enquiryType: "GENERAL" | "PRICE" | "PRODUCT" | "INTEGRATION" | "SUPPORT";
  jobTitle: string;
  monthlyInvoices: string;
  notes: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  turnoverBand: "",
  erpSystem: "",
  formType: "contact",
  enquiryType: "GENERAL",
  jobTitle: "",
  monthlyInvoices: "",
  notes: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-brand-navy shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export function ContactForm({
  defaultType = "contact",
  className,
}: {
  defaultType?: "contact" | "demo";
  className?: string;
}) {
  const [form, setForm] = useState<FormState>({
    ...initial,
    formType: defaultType,
    message:
      defaultType === "demo"
        ? "I would like to schedule a product demo and discuss LHDN e-invoice automation for our business."
        : "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const endpoint =
      form.formType === "demo" ? "/api/demo" : "/api/contact";

    const payload =
      form.formType === "demo"
        ? {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            jobTitle: form.jobTitle,
            erpSystem: form.erpSystem,
            monthlyInvoices: form.monthlyInvoices,
            turnoverBand: form.turnoverBand,
            notes: form.notes || form.message,
          }
        : {
            name: form.name,
            email: form.email,
            phone: form.phone,
            company: form.company,
            message: form.message,
            turnoverBand: form.turnoverBand,
            erpSystem: form.erpSystem,
            type: form.enquiryType,
          };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        error?: string;
        details?: Record<string, string[]>;
      };

      if (!res.ok) {
        if (data.details) {
          const mapped: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.details)) {
            mapped[k] = v[0] ?? "Invalid value";
          }
          setFieldErrors(mapped);
        }
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
      setForm({ ...initial, formType: form.formType });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center",
          className
        )}
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-xl font-semibold text-brand-navy">
          Thank you — we received your request
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Our account specialists will contact you shortly at the email you
          provided. For urgent matters, call us at{" "}
          <a href="tel:+60163381871" className="font-semibold text-brand-blue">
            +6016-338-1871
          </a>
          .
        </p>
        <Button
          type="button"
          className="mt-6"
          variant="outline"
          onClick={() => setStatus("idle")}
        >
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8",
        className
      )}
    >
      <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
        {(
          [
            ["contact", "General enquiry"],
            ["demo", "Request a demo"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => update("formType", value)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition",
              form.formType === value
                ? "bg-white text-brand-navy shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {form.formType === "contact" ? (
        <div className="mb-4">
          <label className={labelClass} htmlFor="enquiryType">
            What can we help with?
          </label>
          <select
            id="enquiryType"
            className={inputClass}
            value={form.enquiryType}
            onChange={(e) =>
              update(
                "enquiryType",
                e.target.value as FormState["enquiryType"]
              )
            }
          >
            <option value="GENERAL">General enquiry</option>
            <option value="PRICE">Pricing inquiry</option>
            <option value="PRODUCT">Product / demo questions</option>
            <option value="INTEGRATION">ERP integration</option>
            <option value="SUPPORT">Support</option>
          </select>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Full name *
          </label>
          <input
            id="name"
            required
            className={inputClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
          {fieldErrors.name ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Work email *
          </label>
          <input
            id="email"
            type="email"
            required
            className={inputClass}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          ) : null}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            className={inputClass}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+60…"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Company {form.formType === "demo" ? "*" : ""}
          </label>
          <input
            id="company"
            required={form.formType === "demo"}
            className={inputClass}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            autoComplete="organization"
          />
          {fieldErrors.company ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.company}</p>
          ) : null}
        </div>

        {form.formType === "demo" ? (
          <>
            <div>
              <label className={labelClass} htmlFor="jobTitle">
                Job title
              </label>
              <input
                id="jobTitle"
                className={inputClass}
                value={form.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="monthlyInvoices">
                Monthly invoice volume
              </label>
              <select
                id="monthlyInvoices"
                className={inputClass}
                value={form.monthlyInvoices}
                onChange={(e) => update("monthlyInvoices", e.target.value)}
              >
                <option value="">Select…</option>
                {monthlyInvoiceBands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}

        <div>
          <label className={labelClass} htmlFor="turnoverBand">
            Annual turnover band
          </label>
          <select
            id="turnoverBand"
            className={inputClass}
            value={form.turnoverBand}
            onChange={(e) => update("turnoverBand", e.target.value)}
          >
            <option value="">Select…</option>
            {turnoverBands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="erpSystem">
            ERP / accounting system
          </label>
          <input
            id="erpSystem"
            className={inputClass}
            value={form.erpSystem}
            onChange={(e) => update("erpSystem", e.target.value)}
            placeholder="e.g. SAP, Sage, SQL Accounting"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor="message">
          {form.formType === "demo" ? "Additional notes" : "Message *"}
        </label>
        <textarea
          id="message"
          required={form.formType === "contact"}
          rows={4}
          className={cn(inputClass, "resize-y")}
          value={form.formType === "demo" ? form.notes || form.message : form.message}
          onChange={(e) => {
            if (form.formType === "demo") update("notes", e.target.value);
            else update("message", e.target.value);
          }}
          placeholder="Tell us about your e-invoice timeline, systems, and goals…"
        />
        {fieldErrors.message ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
        ) : null}
      </div>

      {status === "error" ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        className="mt-6 w-full sm:w-auto"
        size="lg"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : form.formType === "demo" ? (
          "Request demo"
        ) : (
          "Send message"
        )}
      </Button>

      <p className="mt-3 text-xs text-slate-500">
        By submitting, you agree we may contact you about Einvoicify services.
        We do not sell your data.
      </p>
    </form>
  );
}
