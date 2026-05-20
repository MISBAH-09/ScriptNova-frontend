import { useEffect, useState } from "react";
import { getPlans, getSubscriptionStatus } from "../../services/payment";
import PaymentModal from "../PaymentModal";

export default function SubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getPlans(), getSubscriptionStatus()])
      .then(([planData, subData]) => {
        setPlans(Array.isArray(planData) ? planData : []);
        setSubscription(subData);
      })
      .catch(() => {
        setError("Unable to load subscription details. Please refresh.");
      })
      .finally(() => setLoading(false));
  }, []);

  const openPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const formatStatus = (sub) => {
    if (!sub) return "Unknown";
    if (!sub.is_active) return "Expired";
    return "Active";
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Subscription</h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage your current plan, view available plans, and subscribe from here.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            Status: <span className="font-semibold">{formatStatus(subscription)}</span>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 text-sm text-slate-500">Loading subscription details…</div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Current plan</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{subscription?.plan || "Free"}</p>
              <p className="mt-3 text-sm text-slate-600">
                {subscription ? (
                  <>
                    {subscription.is_active ? "Active" : "Expired"} · {subscription.articles_used} / {subscription.article_limit === 0 ? "Unlimited" : subscription.article_limit} articles used
                  </>
                ) : (
                  "No subscription information available."
                )}
              </p>
              {subscription?.expires_at && (
                <p className="mt-2 text-sm text-slate-500">Expires: {new Date(subscription.expires_at).toLocaleDateString()}</p>
              )}
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Humanize</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {subscription?.can_humanize ? "Enabled" : "Not included"}
              </p>
              <p className="mt-3 text-sm text-slate-600">AI humanize capability on your active plan.</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Generate</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {subscription?.article_limit === 0 ? "Unlimited" : `${subscription?.article_limit || 0} articles`}
              </p>
              <p className="mt-3 text-sm text-slate-600">Remaining quota is updated after each new blog generation.</p>
            </div>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Available plans</h3>
            <p className="text-sm text-slate-500">Choose a plan and complete payment using PayFast.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {(loading ? Array.from({ length: 3 }) : plans).map((plan, index) => {
            if (!plan) {
              return (
                <div key={`placeholder-${index}`} className="rounded-3xl bg-slate-50 p-6 animate-pulse" />
              );
            }

            const isCurrent = subscription?.plan_name === plan.name;
            const expired = subscription && !subscription.is_active;
            const actionLabel = isCurrent ? "Current plan" : "Choose plan";

            return (
              <div key={plan.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{plan.display_name}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">Rs {plan.price_pkr}</p>
                    <p className="mt-1 text-sm text-slate-600">{plan.duration_days === 3 ? "3 days" : "Monthly"}</p>
                  </div>
                  {plan.plan_type === "monthly" && (
                    <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">Popular</span>
                  )}
                </div>

                <p className="mt-6 text-sm text-slate-600 flex-1">{plan.description}</p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li>{plan.article_limit === 0 ? "✅ Unlimited blog generations" : `✅ ${plan.article_limit} blog generations`}</li>
                  <li>{plan.humanize_enabled ? "✅ Humanize included" : "❌ Humanize not included"}</li>
                </ul>

                <button
                  onClick={() => openPlan(plan)}
                  className="mt-6 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50"
                  disabled={isCurrent && !expired}
                >
                  {isCurrent && !expired ? "Current plan" : actionLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
