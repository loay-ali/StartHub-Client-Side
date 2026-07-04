// This route is now the actual target of the PausedState "Renew" button
// (see components/dashboard/PausedState.tsx). It was previously an empty
// stub, so fixing the link alone would have sent users to a blank page.
//
// This is intentionally a placeholder, not the full renewal flow: wiring
// GET /plans + POST /subscriptions/select-plan (per the plan-renew backlog
// item) needs the real Subscriptions endpoints, which aren't implemented
// on the backend yet (subscription.controller.ts is an empty stub) and
// PlanCard's current "Select Plan" button links out to /register?plan=,
// which is wrong for an already-authenticated user renewing — that needs
// its own fix before PlanCard can be reused here safely.
export default function RenewPlanPage() {
    return (
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <h1 className="text-xl font-bold text-gray-900">Renew your subscription</h1>
            <p className="text-sm leading-relaxed text-gray-500">
                Plan selection and renewal aren&apos;t wired up yet. This page is a
                placeholder so the &quot;Renew&quot; button no longer leads to a blank
                screen — the full flow (plan list + checkout) is tracked as separate
                work.
            </p>
        </div>
    );
}