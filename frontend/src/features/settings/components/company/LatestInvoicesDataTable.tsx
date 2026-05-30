import { useMemo } from "react";
import { BillingDetails, Invoice } from "../../types/settings.types";
import { DataTable, DataTableColumn } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import Link from "next/link";

const statusProps = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
  open: { label: "Open", className: "bg-blue-100 text-blue-800" },
  paid: { label: "Paid", className: "bg-green-100 text-green-800" },
  uncollectible: {
    label: "Uncollectible",
    className: "bg-yellow-100 text-yellow-800",
  },
  void: { label: "Voided", className: "bg-gray-100 text-gray-700" },
} as const;

export function LatestInvoicesDataTable({
  invoices,
  loading,
}: {
  invoices: BillingDetails["invoices"];
  loading: boolean;
}) {
  const invoicesWithStatus = useMemo(
    () =>
      invoices.map((inv: Invoice) => {
        const key = (inv.status ?? "open") as keyof typeof statusProps;
        const props = statusProps[key] ?? {
          label: inv.status ?? "Unknown",
          className: "bg-gray-100 text-gray-800",
        };
        return {
          ...inv,
          statusLabel: props.label,
          statusClassName: props.className,
        };
      }),
    [invoices],
  );

  const columns: DataTableColumn<Invoice>[] = [
    {
      key: "date",
      label: "Date",
      render: (invoice) => (
        <span className="font-medium">
          {new Date(invoice.date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (invoice) => (
        <Badge
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium",
            invoice.statusClassName,
          )}
        >
          {invoice.statusLabel ?? invoice.status}
        </Badge>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (invoice) => (
        <span className="font-medium">
          {invoice.amount} {invoice.currency.toUpperCase()}
        </span>
      ),
    },
    {
      key: "pdf",
      label: "Invoice PDF",
      render: (invoice) =>
        invoice.pdfUrl ? (
          <Link
            href={invoice.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Link>
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <DataTable data={invoicesWithStatus} columns={columns} loading={loading} />
  );
}
