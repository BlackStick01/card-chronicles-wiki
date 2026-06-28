"use client";

import { Globe2 } from "lucide-react";

export function LanguageSwitcher() {
  return (
    <div className="hidden h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-950/70 px-3 text-sm font-black text-slate-300 sm:flex">
      <Globe2 className="h-4 w-4 text-amber-300" />
      English
    </div>
  );
}
