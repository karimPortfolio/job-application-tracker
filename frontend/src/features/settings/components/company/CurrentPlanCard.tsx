import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRICING_CURRENCY_SYMBOL } from "@/features/pricing/components/PricingPlanCard";
import { Badge } from "@/components/ui/badge";
import { LoadingButton } from "@/components/ui/loading-button";
import { SubscriptionStatus } from "@/features/pricing/enums/pricing.enums";
import { BillingDetails } from "../../types/settings.types";
import { Skeleton } from "@/components/ui/skeleton";

export function CurrentPlanCard({
  subscription,
  loading,
}: {
  subscription: BillingDetails["subscription"];
  loading: boolean;
}) {
  if (loading) return <LoadingPlaceholder />;

  const subscriptionPrice = useMemo(() => {
    if (subscription.plan?.price) {
      return subscription.plan?.price;
    }

    return null;
  }, [subscription.plan?.price]);

  const subscriptionStatusBadge = useMemo(() => {
    switch (subscription?.status) {
      case SubscriptionStatus.ACTIVE:
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
            Active
          </Badge>
        );
      case SubscriptionStatus.CANCELED:
        <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
          Canceled
        </Badge>;
      case SubscriptionStatus.PAST_DUE:
        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
          Canceled
        </Badge>;
      default:
        <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
          Canceled
        </Badge>;
    }
  }, [subscription?.status]);

  return (
    <Card className="md:w-1/2 shadow-none">
      <CardHeader className="relative flex justify-start items-center">
        <div className="absolute -top-3">{subscriptionStatusBadge}</div>
      </CardHeader>
      <CardContent className="flex justify-between items-center gap-5">
        <CardTitle className="text-xl">
          {subscription?.plan?.label ?? "Not specified"}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {subscription?.expiresAt ?? "No expiring date specified"}
          </div>
        </CardTitle>
        <div className="flex items-center gap-1">
          <span className="text-2xl font-medium">
            {`${subscriptionPrice ?? 0}${PRICING_CURRENCY_SYMBOL}`}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {`/ ${subscription?.duration ?? "Not specified"}`}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <LoadingButton size="sm">Cancel Subscription</LoadingButton>
      </CardFooter>
    </Card>
  );
}

const LoadingPlaceholder = () => (
  <div className="w-full flex flex-col">
    <Card className="w-1/2 shadow-none">
      <CardHeader>
        <Skeleton className="w-14 h-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-60 h-5" />
        <Skeleton className="w-40 h-4 mt-2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="w-56 h-7" />
      </CardFooter>
    </Card>
  </div>
);
