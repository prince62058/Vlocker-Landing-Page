

import { Emi } from "@/app/types/emi";
import EmiCard from "./EmiCard";

export default function EmiList({ emis }: { emis: Emi[] }) {
    return (
        <div className="flex flex-col gap-4" >
            {emis.map((emi) => (
                <EmiCard key={emi.id} emi={emi}  />
            ))}
        </div>
    )
}
