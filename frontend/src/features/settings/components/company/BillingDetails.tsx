"use client";

import { useEffect, useState } from "react";
import { useBillingActions } from "../../hooks/useBillingActions";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { PaymentMethodsCard } from "./PaymentMethodsCard";
import { LatestInvoicesDataTable } from "./LatestInvoicesDataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from "next/navigation";

export function BillingDetails() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { fetchCompanyBillingDetails, billingDetails, loading } =
    useBillingActions();

  const params = useParams();

  useEffect(() => {
    function fetchBillingDetails() {
      try {
        fetchCompanyBillingDetails();
      } catch (err) {}
    }

    fetchBillingDetails();
  }, []);

  useEffect(() => {
    if (params?.success) {
      setShowSuccessAlert(true);
    }

    const setTimeoutId = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);

    return () => clearTimeout(setTimeoutId);
  }, [params.success]);

  const subscription = billingDetails?.subscription;
  const paymentMethods = billingDetails?.paymentMethods;
  const invoices = billingDetails?.invoices || [];

  return (
    <div className="flex flex-col space-y-12">
      {showSuccessAlert && (
        <Alert className="bg-green-100 text-green-800 border-green-200">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Payment method updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col space-y-5">
        <div className="font-medium">Current Plan</div>
        {subscription ? (
          <CurrentPlanCard subscription={subscription} loading={loading} />
        ) : (
          <Alert className="flex justify-center p-5">No record found.</Alert>
        )}
      </div>

      <div className="flex flex-col space-y-5">
        <div className="font-medium">Latest Payment Methods</div>
        {paymentMethods ? (
          <PaymentMethodsCard
            paymentMethods={paymentMethods}
            loading={loading}
          />
        ) : (
          <Alert className="flex justify-center p-5">No record found.</Alert>
        )}
      </div>

      <div className="flex flex-col space-y-5">
        <div className="font-medium">Latest Invoices</div>
        <div>
          {invoices ? (
            <LatestInvoicesDataTable invoices={invoices} loading={loading} />
          ) : (
            <Alert className="flex justify-center p-5">No record found.</Alert>
          )}
        </div>
      </div>
    </div>
  );
}
