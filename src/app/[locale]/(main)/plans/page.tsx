import PlansPage from "@/components/plans/PlansPage";

export default async function Page({searchParams}: {searchParams: Promise<{duration: 'yearly'|'monthly' | undefined}>}) {
  const sParams = await searchParams;
  
  return <PlansPage duration = {sParams.duration ? sParams.duration:'monthly'} />;
}
