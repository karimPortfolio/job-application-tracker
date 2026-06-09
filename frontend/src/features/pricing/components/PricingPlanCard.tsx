import { useTheme } from "next-themes";
import { SubscriptionDuration } from "../enums/pricing.enums";
import { PricingPlan } from "../types/pricing.types";
import { Check } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePricingActions } from "../hooks/usePricingActions";
import { LoadingButton } from "@/components/ui/loading-button";
import { useMemo } from "react";

export const PRICING_CURRENCY_SYMBOL = "$";

export function PricingPlanCard({
  pricingPlan,
  isMonthly,
}: {
  pricingPlan: PricingPlan;
  isMonthly: boolean;
}) {
  const { subscriptionCheckout, loading, clearApiError } =
    usePricingActions();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const glassStyle = {
    background: isDark ? "rgba(45, 99, 237, 0.05)" : "transparent",
    backdropFilter: "blur(12px)",
  };

  const buttonLabel = useMemo(() => {
    if (pricingPlan.isCurrentlyActive) return "Current Plan";
    return "Get started";
  }, [pricingPlan.isCurrentlyActive])

  const handleSubscriptionCheckout = async () => {
    const duration = isMonthly
      ? SubscriptionDuration.MONTHLY
      : SubscriptionDuration.YEARLY;
    clearApiError();
    try
    {
      const url = await subscriptionCheckout({ plan: pricingPlan.plan, duration });
      if (url)
      {
        window.location.href = url;
      }
    } catch(err) {}
  };

  return (
    <Card
      style={glassStyle}
      className={cn("h-full", pricingPlan.popular && " border-primary")}
    >
      <CardHeader>
        <CardTitle className="mb-4 relative">
          {pricingPlan.popular && (
            <div className="absolute -right-6 -top-6 rounded-tr-lg rounded-bl-lg bg-primary py-2 text-white px-5 w-fit text-md">
              Most Popular
            </div>
          )}
          <div className="mb-4 text-2xl">{pricingPlan.label}</div>
          <div>
            <span className="text-6xl">{`${PRICING_CURRENCY_SYMBOL}${pricingPlan.price}`}</span>
            <span className="text-gray-500 dark:text-gray-400 font-normal">
              {isMonthly ? "/month" : "/year"}
            </span>
          </div>
        </CardTitle>
        <CardDescription className="text-md">
          {pricingPlan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 border-t-1 py-6">
          {pricingPlan.features.map((feature: string, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="text-primary w-4 h-4" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardAction className="w-full px-5">
        <LoadingButton
          size="lg"
          className="w-full text-md"
          isLoading={loading}
          disabled={pricingPlan.isCurrentlyActive}
          variant={pricingPlan.isCurrentlyActive ? "outline" : "default"}
          onClick={handleSubscriptionCheckout}
        >
          { loading ? "Please wait..." : buttonLabel }
        </LoadingButton>
      </CardAction>
    </Card>
  );
}
