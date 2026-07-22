"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  IndianRupee,
  Landmark,
  Mail,
  PieChart,
  Printer,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

type ReportType =
  | "Profit & Loss"
  | "Balance Sheet"
  | "Cash Flow"
  | "Trial Balance";

type PeriodType =
  | "This Month"
  | "Last Month"
  | "This Quarter"
  | "This Financial Year"
  | "Custom";

type StatementRow = {
  id: string;
  label: string;
  current: number;
  previous: number;
  level?: number;
  bold?: boolean;
  total?: boolean;
  negative?: boolean;
};

const profitAndLossRows: StatementRow[] = [
  {
    id: "revenue",
    label: "Revenue",
    current: 12875000,
    previous: 10480000,
    bold: true,
  },
  {
    id: "product-sales",
    label: "Product Sales",
    current: 10950000,
    previous: 8940000,
    level: 1,
  },
  {
    id: "service-income",
    label: "Service and Styling Income",
    current: 1250000,
    previous: 940000,
    level: 1,
  },
  {
    id: "other-income",
    label: "Other Operating Income",
    current: 675000,
    previous: 600000,
    level: 1,
  },
  {
    id: "total-revenue",
    label: "Total Revenue",
    current: 12875000,
    previous: 10480000,
    total: true,
  },
  {
    id: "cogs",
    label: "Cost of Goods Sold",
    current: 4915000,
    previous: 4180000,
    bold: true,
    negative: true,
  },
  {
    id: "material-cost",
    label: "Fabric and Material Cost",
    current: 2875000,
    previous: 2410000,
    level: 1,
    negative: true,
  },
  {
    id: "manufacturing",
    label: "Manufacturing Expenses",
    current: 1340000,
    previous: 1190000,
    level: 1,
    negative: true,
  },
  {
    id: "packaging-logistics",
    label: "Packaging and Logistics",
    current: 700000,
    previous: 580000,
    level: 1,
    negative: true,
  },
  {
    id: "gross-profit",
    label: "Gross Profit",
    current: 7960000,
    previous: 6300000,
    total: true,
  },
  {
    id: "operating-expenses",
    label: "Operating Expenses",
    current: 4625000,
    previous: 4035000,
    bold: true,
    negative: true,
  },
  {
    id: "marketing",
    label: "Advertising and Marketing",
    current: 1225000,
    previous: 980000,
    level: 1,
    negative: true,
  },
  {
    id: "employee",
    label: "Employee Cost",
    current: 1540000,
    previous: 1390000,
    level: 1,
    negative: true,
  },
  {
    id: "technology",
    label: "Technology and Software",
    current: 740000,
    previous: 610000,
    level: 1,
    negative: true,
  },
  {
    id: "rent-admin",
    label: "Rent and Administration",
    current: 720000,
    previous: 695000,
    level: 1,
    negative: true,
  },
  {
    id: "professional",
    label: "Professional and Other Expenses",
    current: 400000,
    previous: 360000,
    level: 1,
    negative: true,
  },
  {
    id: "ebitda",
    label: "EBITDA",
    current: 3335000,
    previous: 2265000,
    total: true,
  },
  {
    id: "depreciation",
    label: "Depreciation and Amortization",
    current: 425000,
    previous: 360000,
    negative: true,
  },
  {
    id: "finance-cost",
    label: "Finance Cost",
    current: 185000,
    previous: 225000,
    negative: true,
  },
  {
    id: "profit-before-tax",
    label: "Profit Before Tax",
    current: 2725000,
    previous: 1680000,
    total: true,
  },
  {
    id: "tax",
    label: "Income Tax Expense",
    current: 681250,
    previous: 420000,
    negative: true,
  },
  {
    id: "net-profit",
    label: "Net Profit",
    current: 2043750,
    previous: 1260000,
    total: true,
  },
];

const balanceSheetRows: StatementRow[] = [
  {
    id: "assets",
    label: "Assets",
    current: 24750000,
    previous: 19850000,
    bold: true,
  },
  {
    id: "current-assets",
    label: "Current Assets",
    current: 15150000,
    previous: 11950000,
    level: 1,
    bold: true,
  },
  {
    id: "cash",
    label: "Cash and Bank Balances",
    current: 5250000,
    previous: 3980000,
    level: 2,
  },
  {
    id: "receivables",
    label: "Trade Receivables",
    current: 4860000,
    previous: 3820000,
    level: 2,
  },
  {
    id: "inventory",
    label: "Inventory",
    current: 4140000,
    previous: 3280000,
    level: 2,
  },
  {
    id: "advances",
    label: "Advances and Other Current Assets",
    current: 900000,
    previous: 870000,
    level: 2,
  },
  {
    id: "non-current-assets",
    label: "Non-Current Assets",
    current: 9600000,
    previous: 7900000,
    level: 1,
    bold: true,
  },
  {
    id: "fixed-assets",
    label: "Property, Plant and Equipment",
    current: 7425000,
    previous: 6180000,
    level: 2,
  },
  {
    id: "intangibles",
    label: "Intangible Assets",
    current: 1275000,
    previous: 1050000,
    level: 2,
  },
  {
    id: "deposits",
    label: "Deposits and Long-Term Advances",
    current: 900000,
    previous: 670000,
    level: 2,
  },
  {
    id: "total-assets",
    label: "Total Assets",
    current: 24750000,
    previous: 19850000,
    total: true,
  },
  {
    id: "liabilities",
    label: "Liabilities",
    current: 10325000,
    previous: 8400000,
    bold: true,
  },
  {
    id: "payables",
    label: "Trade Payables",
    current: 3525000,
    previous: 2810000,
    level: 1,
  },
  {
    id: "borrowings",
    label: "Borrowings",
    current: 4100000,
    previous: 3600000,
    level: 1,
  },
  {
    id: "tax-liability",
    label: "Tax and Statutory Liabilities",
    current: 1150000,
    previous: 870000,
    level: 1,
  },
  {
    id: "other-liability",
    label: "Other Liabilities",
    current: 1550000,
    previous: 1120000,
    level: 1,
  },
  {
    id: "equity",
    label: "Shareholders’ Equity",
    current: 14425000,
    previous: 11450000,
    bold: true,
  },
  {
    id: "share-capital",
    label: "Share Capital",
    current: 7500000,
    previous: 6500000,
    level: 1,
  },
  {
    id: "reserves",
    label: "Reserves and Surplus",
    current: 6925000,
    previous: 4950000,
    level: 1,
  },
  {
    id: "liabilities-equity",
    label: "Total Liabilities and Equity",
    current: 24750000,
    previous: 19850000,
    total: true,
  },
];

const cashFlowRows: StatementRow[] = [
  {
    id: "operating",
    label: "Cash Flow from Operating Activities",
    current: 3825000,
    previous: 2940000,
    bold: true,
  },
  {
    id: "profit-before-tax-cf",
    label: "Profit Before Tax",
    current: 2725000,
    previous: 1680000,
    level: 1,
  },
  {
    id: "non-cash",
    label: "Non-Cash Adjustments",
    current: 610000,
    previous: 585000,
    level: 1,
  },
  {
    id: "working-capital",
    label: "Working Capital Movement",
    current: 1215000,
    previous: 1095000,
    level: 1,
  },
  {
    id: "tax-paid",
    label: "Taxes Paid",
    current: 725000,
    previous: 420000,
    level: 1,
    negative: true,
  },
  {
    id: "net-operating",
    label: "Net Cash from Operating Activities",
    current: 3825000,
    previous: 2940000,
    total: true,
  },
  {
    id: "investing",
    label: "Cash Flow from Investing Activities",
    current: 1780000,
    previous: 1495000,
    bold: true,
    negative: true,
  },
  {
    id: "asset-purchase",
    label: "Purchase of Fixed Assets",
    current: 1480000,
    previous: 1275000,
    level: 1,
    negative: true,
  },
  {
    id: "software-investment",
    label: "Technology and Software Investment",
    current: 300000,
    previous: 220000,
    level: 1,
    negative: true,
  },
  {
    id: "net-investing",
    label: "Net Cash Used in Investing Activities",
    current: 1780000,
    previous: 1495000,
    total: true,
    negative: true,
  },
  {
    id: "financing",
    label: "Cash Flow from Financing Activities",
    current: 775000,
    previous: 360000,
    bold: true,
  },
  {
    id: "capital",
    label: "Capital Introduced",
    current: 1000000,
    previous: 750000,
    level: 1,
  },
  {
    id: "loan-repayment",
    label: "Loan and Finance Payments",
    current: 225000,
    previous: 390000,
    level: 1,
    negative: true,
  },
  {
    id: "net-financing",
    label: "Net Cash from Financing Activities",
    current: 775000,
    previous: 360000,
    total: true,
  },
  {
    id: "net-increase",
    label: "Net Increase in Cash",
    current: 2820000,
    previous: 1805000,
    total: true,
  },
];

const trialBalanceRows: StatementRow[] = [
  {
    id: "cash-bank-tb",
    label: "Cash and Bank",
    current: 5250000,
    previous: 3980000,
  },
  {
    id: "receivable-tb",
    label: "Trade Receivables",
    current: 4860000,
    previous: 3820000,
  },
  {
    id: "inventory-tb",
    label: "Inventory",
    current: 4140000,
    previous: 3280000,
  },
  {
    id: "fixed-assets-tb",
    label: "Fixed and Intangible Assets",
    current: 8700000,
    previous: 7230000,
  },
  {
    id: "payables-tb",
    label: "Trade Payables",
    current: 3525000,
    previous: 2810000,
    negative: true,
  },
  {
    id: "borrowings-tb",
    label: "Borrowings",
    current: 4100000,
    previous: 3600000,
    negative: true,
  },
  {
    id: "equity-tb",
    label: "Capital and Reserves",
    current: 14425000,
    previous: 11450000,
    negative: true,
  },
  {
    id: "revenue-tb",
    label: "Revenue Accounts",
    current: 12875000,
    previous: 10480000,
    negative: true,
  },
  {
    id: "expense-tb",
    label: "Expense Accounts",
    current: 10831250,
    previous: 9220000,
  },
  {
    id: "total-debit",
    label: "Total Debit",
    current: 33781250,
    previous: 27530000,
    total: true,
  },
  {
    id: "total-credit",
    label: "Total Credit",
    current: 33781250,
    previous: 27530000,
    total: true,
    negative: true,
  },
];

const reportDescriptions: Record<ReportType, string> = {
  "Profit & Loss":
    "Revenue, expenses and profitability for the selected reporting period.",
  "Balance Sheet":
    "Assets, liabilities and shareholders’ equity as of the reporting date.",
  "Cash Flow":
    "Operating, investing and financing cash movements for the selected period.",
  "Trial Balance":
    "Debit and credit balances across all general ledger accounts.",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatCompactCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 1,
  }).format(value);

export default function FinancialReportsPage() {
  const [reportType, setReportType] =
    useState<ReportType>("Profit & Loss");
  const [period, setPeriod] =
    useState<PeriodType>("This Financial Year");
  const [comparisonEnabled, setComparisonEnabled] = useState(true);
  const [showZeroBalances, setShowZeroBalances] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const rows = useMemo(() => {
    const source =
      reportType === "Profit & Loss"
        ? profitAndLossRows
        : reportType === "Balance Sheet"
          ? balanceSheetRows
          : reportType === "Cash Flow"
            ? cashFlowRows
            : trialBalanceRows;

    if (showZeroBalances) return source;

    return source.filter(
      (row) => row.current !== 0 || row.previous !== 0,
    );
  }, [reportType, showZeroBalances]);

  const revenue = 12875000;
  const grossProfit = 7960000;
  const netProfit = 2043750;
  const cashBalance = 5250000;
  const receivables = 4860000;
  const payables = 3525000;

  const grossMargin = (grossProfit / revenue) * 100;
  const netMargin = (netProfit / revenue) * 100;
  const currentRatio = 15150000 / 6225000;

  const refreshReport = () => {
    setIsRefreshing(true);

    window.setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  const exportCSV = () => {
    const headers = [
      "Particulars",
      "Current Period",
      "Previous Period",
      "Variance",
      "Variance Percentage",
    ];

    const csvRows = rows.map((row) => {
      const variance = row.current - row.previous;
      const variancePercentage =
        row.previous === 0 ? 0 : (variance / row.previous) * 100;

      return [
        row.label,
        row.negative ? -row.current : row.current,
        row.negative ? -row.previous : row.previous,
        row.negative ? -variance : variance,
        variancePercentage.toFixed(2),
      ];
    });

    const csvContent = [headers, ...csvRows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `keos-${reportType
      .toLowerCase()
      .replaceAll(" ", "-")}.csv`;

    anchor.click();
    URL.revokeObjectURL(url);
  };

  const sendReport = () => {
    setEmailSent(true);

    window.setTimeout(() => {
      setEmailSent(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d02b3f]">
                Finance Intelligence
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Financial Reports
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Generate, analyze and export enterprise financial
                statements
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>

            <button
              type="button"
              onClick={sendReport}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              {emailSent ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <Mail className="h-4 w-4" />
              )}

              {emailSent ? "Report Sent" : "Email"}
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            <div className="relative">
              <label className="text-xs font-black text-[#10233b]">
                Financial Statement
              </label>

              <button
                type="button"
                onClick={() =>
                  setShowReportMenu((current) => !current)
                }
                className="mt-2 flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b]"
              >
                <span className="flex items-center gap-3">
                  <FileBarChart className="h-5 w-5 text-[#d02b3f]" />
                  {reportType}
                </span>

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {showReportMenu && (
                <div className="absolute left-0 top-[82px] z-30 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {(
                    [
                      "Profit & Loss",
                      "Balance Sheet",
                      "Cash Flow",
                      "Trial Balance",
                    ] as ReportType[]
                  ).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setReportType(type);
                        setShowReportMenu(false);
                      }}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black transition",
                        reportType === type
                          ? "bg-[#10233b] text-white"
                          : "text-[#10233b] hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {type}

                      {reportType === type && (
                        <BadgeCheck className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-black text-[#10233b]">
                Reporting Period
              </label>

              <div className="relative mt-2">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={period}
                  onChange={(event) =>
                    setPeriod(event.target.value as PeriodType)
                  }
                  className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-black text-[#10233b] outline-none"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Quarter</option>
                  <option>This Financial Year</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#10233b]">
                Company Entity
              </label>

              <div className="relative mt-2">
                <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-black text-[#10233b] outline-none">
                  <option>KRVE Fashion Studio Private Limited</option>
                  <option>KRVE Retail Division</option>
                  <option>KRVE Digital Commerce</option>
                  <option>Consolidated Group</option>
                </select>
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={refreshReport}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white lg:w-auto"
              >
                <RefreshCw
                  className={[
                    "h-4 w-4",
                    isRefreshing ? "animate-spin" : "",
                  ].join(" ")}
                />

                {isRefreshing ? "Refreshing" : "Generate"}
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              {reportDescriptions[reportType]}
            </p>

            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-black text-[#10233b]">
                <input
                  type="checkbox"
                  checked={comparisonEnabled}
                  onChange={(event) =>
                    setComparisonEnabled(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#10233b]"
                />
                Compare previous period
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs font-black text-[#10233b]">
                <input
                  type="checkbox"
                  checked={showZeroBalances}
                  onChange={(event) =>
                    setShowZeroBalances(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#10233b]"
                />
                Show zero balances
              </label>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <MetricCard
            label="Revenue"
            value={formatCompactCurrency(revenue)}
            change="+22.9%"
            positive
            icon={<CircleDollarSign className="h-5 w-5" />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <MetricCard
            label="Gross Profit"
            value={formatCompactCurrency(grossProfit)}
            change="+26.3%"
            positive
            icon={<TrendingUp className="h-5 w-5" />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <MetricCard
            label="Net Profit"
            value={formatCompactCurrency(netProfit)}
            change="+62.2%"
            positive
            icon={<BarChart3 className="h-5 w-5" />}
            iconClass="bg-violet-50 text-violet-600"
          />

          <MetricCard
            label="Cash Balance"
            value={formatCompactCurrency(cashBalance)}
            change="+31.9%"
            positive
            icon={<Landmark className="h-5 w-5" />}
            iconClass="bg-cyan-50 text-cyan-600"
          />

          <MetricCard
            label="Receivables"
            value={formatCompactCurrency(receivables)}
            change="+27.2%"
            positive={false}
            icon={<WalletCards className="h-5 w-5" />}
            iconClass="bg-amber-50 text-amber-600"
          />

          <MetricCard
            label="Payables"
            value={formatCompactCurrency(payables)}
            change="+25.4%"
            positive={false}
            icon={<FileText className="h-5 w-5" />}
            iconClass="bg-red-50 text-red-600"
          />
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <article className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Financial Statement
                </p>

                <h2 className="mt-2 text-xl font-black text-[#10233b]">
                  {reportType}
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {period} · Figures presented in Indian Rupees
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                  <CheckCircle2 className="mr-1.5 inline h-3.5 w-3.5" />
                  Books Balanced
                </span>

                <button
                  type="button"
                  onClick={exportCSV}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-[#10233b]"
                  title="Export CSV"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[820px] w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Particulars
                    </th>

                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Current Period
                    </th>

                    {comparisonEnabled && (
                      <>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Previous Period
                        </th>

                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Variance
                        </th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => {
                    const variance = row.current - row.previous;
                    const variancePercentage =
                      row.previous === 0
                        ? 0
                        : (variance / row.previous) * 100;

                    const favourable = row.negative
                      ? variance <= 0
                      : variance >= 0;

                    return (
                      <tr
                        key={row.id}
                        className={[
                          "border-b border-slate-100",
                          row.total
                            ? "bg-[#10233b] text-white"
                            : "hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <td
                          className={[
                            "px-6 py-4 text-sm",
                            row.total || row.bold
                              ? "font-black"
                              : "font-semibold",
                            row.total
                              ? "text-white"
                              : "text-[#10233b]",
                          ].join(" ")}
                          style={{
                            paddingLeft: `${
                              24 + (row.level || 0) * 24
                            }px`,
                          }}
                        >
                          {row.label}
                        </td>

                        <td
                          className={[
                            "px-6 py-4 text-right text-sm font-black",
                            row.total
                              ? "text-white"
                              : row.negative
                                ? "text-red-600"
                                : "text-[#10233b]",
                          ].join(" ")}
                        >
                          {row.negative ? "(" : ""}
                          {formatCurrency(row.current)}
                          {row.negative ? ")" : ""}
                        </td>

                        {comparisonEnabled && (
                          <>
                            <td
                              className={[
                                "px-6 py-4 text-right text-sm font-semibold",
                                row.total
                                  ? "text-slate-200"
                                  : "text-slate-500",
                              ].join(" ")}
                            >
                              {row.negative ? "(" : ""}
                              {formatCurrency(row.previous)}
                              {row.negative ? ")" : ""}
                            </td>

                            <td className="px-6 py-4 text-right">
                              <span
                                className={[
                                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black",
                                  row.total
                                    ? favourable
                                      ? "bg-emerald-400/20 text-emerald-200"
                                      : "bg-red-400/20 text-red-200"
                                    : favourable
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-red-50 text-red-700",
                                ].join(" ")}
                              >
                                {variancePercentage >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3" />
                                )}

                                {Math.abs(variancePercentage).toFixed(1)}%
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-semibold text-slate-500">
                Generated on 22 July 2026 · 1:30 PM
              </p>

              <p className="flex items-center gap-2 text-xs font-black text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Verified by KEOS Finance Engine
              </p>
            </div>
          </article>

          <aside className="space-y-5">
            <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.2)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
                    Profitability
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Financial Health
                  </h2>
                </div>

                <PieChart className="h-7 w-7 text-white/80" />
              </div>

              <div className="mt-6 space-y-5">
                <RatioProgress
                  label="Gross Profit Margin"
                  value={grossMargin}
                  target="Target 55%"
                />

                <RatioProgress
                  label="Net Profit Margin"
                  value={netMargin}
                  target="Target 12%"
                />

                <RatioProgress
                  label="Current Ratio"
                  value={Math.min(currentRatio * 25, 100)}
                  displayedValue={`${currentRatio.toFixed(2)}x`}
                  target="Target 1.50x"
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    KEOS Intelligence
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Finance Insights
                  </h2>
                </div>

                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>

              <div className="mt-5 space-y-3">
                <InsightCard
                  type="positive"
                  title="Profitability improving"
                  description="Net profit increased by 62.2% compared with the previous period."
                />

                <InsightCard
                  type="warning"
                  title="Receivables increasing"
                  description="Customer receivables increased faster than revenue. Review collections."
                />

                <InsightCard
                  type="positive"
                  title="Strong liquidity"
                  description={`Current ratio is ${currentRatio.toFixed(
                    2,
                  )}x, above the internal liquidity benchmark.`}
                />

                <InsightCard
                  type="warning"
                  title="Marketing cost growth"
                  description="Advertising expenses grew by 25%, requiring campaign ROI review."
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Report Control
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Available Statements
              </h2>

              <div className="mt-5 space-y-3">
                {(
                  [
                    "Profit & Loss",
                    "Balance Sheet",
                    "Cash Flow",
                    "Trial Balance",
                  ] as ReportType[]
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setReportType(type)}
                    className={[
                      "flex w-full items-center justify-between rounded-2xl border p-4 text-left transition",
                      reportType === type
                        ? "border-[#10233b] bg-slate-50"
                        : "border-slate-200 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          "flex h-10 w-10 items-center justify-center rounded-xl",
                          reportType === type
                            ? "bg-[#10233b] text-white"
                            : "bg-slate-100 text-[#10233b]",
                        ].join(" ")}
                      >
                        <FileText className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {type}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          View financial statement
                        </p>
                      </div>
                    </div>

                    {reportType === type && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex items-start gap-3 rounded-[24px] border border-amber-200 bg-amber-50 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <p className="text-sm font-black text-amber-800">
                  Draft financial data
                </p>

                <p className="mt-1 text-xs font-semibold leading-5 text-amber-700">
                  These statements are generated from current ledger
                  entries and may change before period closing.
                </p>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  change,
  positive,
  icon,
  iconClass,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}
        >
          {icon}
        </div>

        <span
          className={[
            "flex items-center gap-1 text-xs font-black",
            positive ? "text-emerald-600" : "text-amber-600",
          ].join(" ")}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <TrendingUp className="h-3.5 w-3.5" />
          )}

          {change}
        </span>
      </div>

      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-[#10233b]">
        {value}
      </p>
    </article>
  );
}

function RatioProgress({
  label,
  value,
  displayedValue,
  target,
}: {
  label: string;
  value: number;
  displayedValue?: string;
  target: string;
}) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-300">
            {label}
          </p>

          <p className="mt-1 text-xl font-black">
            {displayedValue || `${value.toFixed(1)}%`}
          </p>
        </div>

        <p className="text-xs font-semibold text-slate-400">
          {target}
        </p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

function InsightCard({
  type,
  title,
  description,
}: {
  type: "positive" | "warning";
  title: string;
  description: string;
}) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-2xl p-4",
        type === "positive" ? "bg-emerald-50" : "bg-amber-50",
      ].join(" ")}
    >
      {type === "positive" ? (
        <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
      ) : (
        <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      )}

      <div>
        <p
          className={[
            "text-sm font-black",
            type === "positive"
              ? "text-emerald-700"
              : "text-amber-700",
          ].join(" ")}
        >
          {title}
        </p>

        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}