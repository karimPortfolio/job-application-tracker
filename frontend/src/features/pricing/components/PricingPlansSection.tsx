"use client";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { SubscriptionDuration, SubscriptionPlan } from "../enums/pricing.enums";
import { PricingPlan } from "../types/pricing.types";
import { PricingPlanCard } from "./PricingPlanCard";
import { useAuthStore } from "@/stores/auth.store";

export function PricingPlansSection() {
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const { user } = useAuthStore();
  const currentCompanySubscriptionPlan = user?.company?.plan;
  const currentCompanySubscriptionDuration = user?.company?.duration;
  const selectedDuration = isMonthly
    ? SubscriptionDuration.MONTHLY
    : SubscriptionDuration.YEARLY;

  const pricingPlans = useMemo(
    () => [
      {
        plan: SubscriptionPlan.FREE,
        label: "Free",
        description: "Perfect for trying out our core features.",
        price: 0,
        features: [
          "Unlimited applications",
          "Unlimited job listings",
          "User-friendly dashboard",
          "Standard job board distribution",
          "Limited support",
        ],
        popular: false,
        isCurrentlyActive:
          currentCompanySubscriptionPlan === SubscriptionPlan.FREE &&
          currentCompanySubscriptionDuration === selectedDuration,
      },
      {
        plan: SubscriptionPlan.PRO,
        label: "Professional",
        description:
          "For growing teams needing advanced AI tools and faster hiring cycles.",
        price: isMonthly ? 49 : 459,
        features: [
          "Everything in Free",
          "100 credits for AI features access",
          "Access to AI matching & ranking",
          "Automated interview scheduling",
          "24/7 Priority support",
        ],
        popular: true,
        isCurrentlyActive:
          currentCompanySubscriptionPlan === SubscriptionPlan.PRO &&
          currentCompanySubscriptionDuration === selectedDuration,
      },
      {
        plan: SubscriptionPlan.ENTERPRISE,
        label: "Entreprise",
        description:
          "For growing teams needing advanced AI tools and faster hiring cycles.",
        price: isMonthly ? 99 : 999,
        features: [
          "Everything in Professional",
          "1000 credits for AI features access",
          "Advanced access to AI matching & ranking",
          "Automated interview scheduling",
          "SSO & Custom Security",
        ],
        popular: false,
        isCurrentlyActive:
          currentCompanySubscriptionPlan === SubscriptionPlan.ENTERPRISE &&
          currentCompanySubscriptionDuration === selectedDuration,
      },
    ],
    [isMonthly],
  );

  return (
    <section>
      <div className="mb-3 flex justify-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mx-auto mb-16 border flex gap-2 rounded-lg bg-transparent p-1">
            <div
              className={cn(
                "p-2 px-6 rounded-md cursor-pointer",
                isMonthly && "bg-primary text-white",
              )}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </div>
            <div
              className={cn(
                "p-2 rounded-md cursor-pointer",
                !isMonthly && "bg-primary text-white",
              )}
              onClick={() => setIsMonthly(false)}
            >
              Annualy
              <span
                className={cn(
                  "ms-2",
                  !isMonthly ? "text-gray-400" : "text-primary",
                )}
              >
                (Save up to 20%)
              </span>
            </div>
          </div>

          <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
            {pricingPlans.map((pricingPlan: PricingPlan) => (
              <PricingPlanCard
                key={pricingPlan.label}
                pricingPlan={pricingPlan}
                isMonthly={isMonthly}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
