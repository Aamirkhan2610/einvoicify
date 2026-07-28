import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getCrmSession } from "@/lib/auth";
import { CrmShell } from "@/components/crm/CrmShell";
import { ChatsClient } from "./ChatsClient";

export default async function CrmChatsPage() {
  const session = await getCrmSession();
  if (!session) redirect("/crm/login");

  return (
    <CrmShell adminName={session.admin.name}>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        }
      >
        <ChatsClient />
      </Suspense>
    </CrmShell>
  );
}
