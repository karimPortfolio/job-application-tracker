"use client";

import { useEffect } from "react";
import { useBillingActions } from "../../hooks/useBillingActions";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { PaymentMethodsCard } from "./PaymentMethodsCard";
import { LatestInvoicesDataTable } from "./LatestInvoicesDataTable";

export function BillingDetails() {
  const { fetchCompanyBillingDetails, billingDetails, loading } =
    useBillingActions();

  useEffect(() => {
    function fetchBillingDetails() {
      try {
        fetchCompanyBillingDetails();
      } catch (err) {}
    }

    fetchBillingDetails();
  }, []);

  const subscription = billingDetails?.subscription;
  const paymentMethods = billingDetails?.paymentMethods;
  const invoices = billingDetails?.invoices || [];

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col space-y-5">
        <div className="font-medium">Current Plan</div>
        {subscription && (
          <CurrentPlanCard subscription={subscription} loading={loading} />
        )}
      </div>

      <div className="flex flex-col space-y-5">
        <div className="font-medium">Latest Payment Methods</div>
        {paymentMethods && (
          <PaymentMethodsCard
            paymentMethods={paymentMethods}
            loading={loading}
          />
        )}
      </div>

      <div className="flex flex-col space-y-5">
        <div className="font-medium">Latest Invoices</div>
        <div>
          {invoices && (
            <LatestInvoicesDataTable invoices={invoices} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}
