import PricingSection from "../home/PricingSection"
import PricingHero from "./PricingHero"

export default function PlansPage({duration}:{duration:string}) {
    return (
        <div>
            <PricingHero />
            <PricingSection duration = {duration}/>
        </div>
    )
}