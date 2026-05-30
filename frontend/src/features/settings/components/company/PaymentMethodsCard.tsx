import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BillingDetails } from "../../types/settings.types";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PaymentMethodsCard({
  paymentMethods,
  loading,
}: {
  paymentMethods: BillingDetails["paymentMethods"];
  loading: boolean;
}) {
  if (loading) return <LoadingPlaceholder />;

  
  const transformedPaymentMethods = useMemo(() => {
    const pm = paymentMethods;
    if (!pm || !pm.length) return [];

    return pm.map((p) => {
      switch (p.brand) {
        case "mastercard":
          return {
            ...p,
            img: "https://upload.wikimedia.org/wikipedia/commons/6/64/1aMastercard.jpg",
          };

        case "visa":
          return {
            ...p,
            img: "/images/credit-cards/visa-logo.png",
          };
        case "american-express":
          return {
            ...p,
            img: "/images/credit-cards/american-express-logo.png",
          };
      }
    });
  }, [paymentMethods]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {transformedPaymentMethods?.map((pm, index) => {
        if (!pm) return null;

        return (
          <Card key={index} className="shadow-none">
            <CardHeader className="flex items-center gap-4">
              <div className="rounded-sm border bg-white dark:bg-gray-100 dark:border-none">
                <Image
                  src={pm.img ?? ""}
                  alt={`${pm.brand} credit card`}
                  width={40}
                  height={10}
                  className="rounded-sm"
                />
              </div>
              <CardTitle className="flex items-center">
                <span className="mr-1 mt-1">**** **** ****</span>
                <span>{pm.lastDigits}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center text-sm">
              <div className="flex iyems-center gap-5">
                <div>Country</div>
                <div className="text-gray-600 dark:text-gray-400">
                  {pm.country}
                </div>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {pm.expMonth}
                {"/"}
                {pm.expYear}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

const LoadingPlaceholder = () => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <Card key={index} className="shadow-none">
        <CardHeader>
          <Skeleton className="w-full h-5" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-60 h-5" />
          <Skeleton className="w-40 h-4 mt-2" />
        </CardContent>
      </Card>
    ))}
  </div>
);
