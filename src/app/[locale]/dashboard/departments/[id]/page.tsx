import { getSingleDepartment } from "@/src/services/departments";
import { GrDocumentMissing } from "react-icons/gr";
import { notificationService } from "@/lib/notifiationSystem";
import { buildAction } from "@/lib/notifiationSystem";

notificationService.success("Saved", "Changes saved successfully.");
notificationService.error("Sync failed", "HubSpot webhook timed out.", {
  actions: [
    buildAction("retry", { handler: () => retrySync() }),
    buildAction("dismiss"),
  ],
});
notificationService.warning("Heads up", "Storage nearing limit.");
notificationService.info("FYI", "New feature available.");
notificationService.system("Maintenance", "Scheduled downtime tonight at 2 AM.");
notificationService.critical("Urgent", "Payment processor is down.");

notificationService.ai(
  "Anomaly detected",
  "Revenue dropped 12% week-over-week.",
  { agent: "FinanceAgent", model: "claude-sonnet-4-6", confidence: 0.91 }
);

notificationService.recommendation("Upsell opportunity", "3 accounts match upgrade criteria.");
notificationService.risk("High churn risk", "Acme Corp inactive for 14 days.");
notificationService.integration("Stripe connected", "Revenue data will sync shortly.");
notificationService.automation("Workflow completed", "Onboarding sequence finished for 12 users.");
notificationService.insight("Usage pattern found", "Power users log in 3x more on Mondays.");
notificationService.activity("Member joined", "Layla Hassan joined Engineering.");

import { redirect } from 'next/navigation';
import Link from "next/link";

export default async function EditDeparment({params}:{params:{id:string}}) {

    const paramSnapshot = await params;

    if( ! paramSnapshot.id ) {
        redirect('/dashboard/departments/new');
    }

    const departmentData = await getSingleDepartment(params.id);

    console.log(departmentData);

    if( ! departmentData ) {
        return (<section className = 'flex flex-col justify-center items-center gap-5'>
            <GrDocumentMissing size = {50} />
            <strong>Wrong Department ID</strong>
            <Link href = "/dashboard/departments/all" className = 'button'>
                Back To Departments List
            </Link>
        </section>);
    }

    return (<>

    </>);
}

function retrySync(): void | Promise<void> {
    throw new Error("Function not implemented.");
}
