// src/components/dashboard/SubscriptionBanner.jsx
// Shows current plan status at top of dashboard. Triggers payment modal on upgrade.

import { useEffect, useState } from "react";
import { getSubscriptionStatus } from "../../services/payment";
import PaymentModal from "../PaymentModal";
import { getPlans } from "../../services/payment";

export default function SubscriptionBanner() {
  const [sub, setSub]           = useState(null);
  const [plans, setPlans]       = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getSubscriptionStatus().then(setSub).catch(() => {});
    getPlans().then(setPlans).catch(() => {});
  }, []);

  if (!sub) return null;

  const isLimited = sub.article_limit > 0 && sub.articles_used >= sub.article_limit;
  const isExpired = !sub.is_active;

  const paidPlans = plans.filter((p) => p.plan_type !== "free");

  return (
    <>
      <div
        className={`rounded-xl px-5 py-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-sm ${
          isLimited || isExpired
            ? "bg-red-100 text-red-800 border border-red-300"
            : "bg-indigo-50 text-indigo-800 border border-indigo-200"
        }`}
      >
        <div>
          <span className="font-semibold">{sub.plan}</span>
          {" · "}
          {sub.article_limit === 0
            ? "Unlimited articles"
            : `${sub.articles_used} / ${sub.article_limit} articles used`}
          {" · "}
          {sub.can_humanize ? "Humanize ✅" : "Humanize ❌"}
          {isExpired && <span className="ml-2 font-bold text-red-600">(Expired)</span>}
        </div>

        {(isLimited || isExpired || sub.plan_name === "free") && paidPlans.length > 0 && (
          <div className="flex gap-2">
            {paidPlans.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelected(p)}
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-indigo-500 transition text-xs"
              >
                Upgrade → {p.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <PaymentModal plan={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
