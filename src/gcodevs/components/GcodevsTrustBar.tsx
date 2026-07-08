import React from "react";
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { TRUST_ITEMS } from "../copy";

const ICONS = [GlobeAltIcon, DevicePhoneMobileIcon, MagnifyingGlassIcon, WrenchScrewdriverIcon];

const GcodevsTrustBar: React.FC = () => (
  <section className="bg-slate-50 border-y border-slate-200 dark:bg-slate-900 dark:border-slate-800 py-8 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
      {TRUST_ITEMS.map((item, index) => {
        const Icon = ICONS[index];
        return (
          <div key={item.title} className="flex items-start gap-3">
            <Icon className="w-6 h-6 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default GcodevsTrustBar;
