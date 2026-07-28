"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CrmShell } from "@/components/crm/CrmShell";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  type: string;
  status: string;
  source: string;
  notes: string | null;
  createdAt: string;
};

type Demo = {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  status: string;
  erpSystem: string | null;
  notes: string | null;
  createdAt: string;
};

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"];

export default function CrmLeadsPage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"enquiries" | "demos">("enquiries");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/crm/leads");
      if (res.status === 401) {
        router.push("/crm/login");
        return;
      }
      const data = await res.json();
      setEnquiries(data.enquiries ?? []);
      setDemos(data.demos ?? []);
      setAdminName("CRM User");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(
    id: string,
    kind: "enquiry" | "demo",
    status: string
  ) {
    setUpdating(id);
    try {
      const res = await fetch("/api/crm/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, kind, status }),
      });
      if (res.ok) await load();
    } finally {
      setUpdating(null);
    }
  }

  return (
    <CrmShell adminName={adminName}>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            Contact forms, price inquiries, chat-originated leads, and demo
            requests.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("enquiries")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              tab === "enquiries"
                ? "bg-brand-navy text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            Enquiries ({enquiries.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("demos")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              tab === "demos"
                ? "bg-brand-navy text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            Demos ({demos.length})
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : tab === "enquiries" ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-slate-500"
                      >
                        No enquiries yet.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((e) => (
                      <tr key={e.id} className="align-top hover:bg-slate-50/80">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-brand-navy">
                            {e.name}
                          </p>
                          <p className="text-xs text-slate-500">{e.email}</p>
                          {e.company ? (
                            <p className="text-xs text-slate-500">{e.company}</p>
                          ) : null}
                          {e.phone ? (
                            <p className="text-xs text-slate-500">{e.phone}</p>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-brand-blue">
                            {e.type}
                          </span>
                          <p className="mt-1 text-[11px] text-slate-400">
                            {e.source}
                          </p>
                        </td>
                        <td className="max-w-xs px-4 py-3 text-slate-600">
                          <p className="line-clamp-3 text-xs leading-relaxed">
                            {e.message}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={e.status}
                            disabled={updating === e.id}
                            onChange={(ev) =>
                              void updateStatus(
                                e.id,
                                "enquiry",
                                ev.target.value
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                          {new Date(e.createdAt).toLocaleString("en-MY")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Company / ERP</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {demos.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-12 text-center text-slate-500"
                      >
                        No demo requests yet.
                      </td>
                    </tr>
                  ) : (
                    demos.map((d) => (
                      <tr key={d.id} className="align-top hover:bg-slate-50/80">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-brand-navy">
                            {d.name}
                          </p>
                          <p className="text-xs text-slate-500">{d.email}</p>
                          {d.phone ? (
                            <p className="text-xs text-slate-500">{d.phone}</p>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-slate-700">{d.company}</p>
                          <p className="text-xs text-slate-500">
                            {d.erpSystem || "ERP not specified"}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={d.status}
                            disabled={updating === d.id}
                            onChange={(ev) =>
                              void updateStatus(d.id, "demo", ev.target.value)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-medium"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                          {new Date(d.createdAt).toLocaleString("en-MY")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </CrmShell>
  );
}
