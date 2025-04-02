import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type ChangeChipProps = {
    change: string;
};

export function ChangeChip({ change }: ChangeChipProps) {
    const isPositive = change.startsWith("+");

    return (
<>
    {isPositive && (
        <div className="flex items-center gap-1 bg-[var(--success)]/20 border border-[var(--success)]/25 rounded-md border-solid justify-center h-5 pl-1">
            <span className="text-xs text-[var(--success)]">{change}</span>
            <ArrowUpRight className="text-[var(--success)] w-4 h-4" />
        </div>
    ) || (
        <div className="flex items-center gap-1 bg-[var(--destructive)]/20 border border-[var(--destructive)]/25 rounded-md border-solid justify-center h-5 pl-1">
            <span className="text-xs text-[var(--destructive)]">{change}</span>
            <ArrowDownRight className="text-[var(--destructive)] w-4 h-4" />
        </div>
    )}
</>
    );
}
