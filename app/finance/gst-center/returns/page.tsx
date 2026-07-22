"use client";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Calculator,
  Check,
  ChevronDown,
  Download,
  FileCheck2,
  FileJson,
  FileSpreadsheet,
  FileText,
  IndianRupee,
  Landmark,
  RefreshCcw,
  Save,
  Send,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

type ReturnType = "GSTR-1" | "GSTR-3B" | "GSTR-9";
type ReturnStatus =
  | "Draft"
  | "Validated"
  | "Submitted"
  | "Approved"
  | "Filed";

type GSTReturnRecord = {
  id: number;
  returnType: ReturnType;
  period: string;
  dueDate: string;
  status: ReturnStatus;
  taxableValue: number;
  taxLiability: number;
};

type Attachment = {
  id: number;
  name: string;
  size: number;
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

const initialReturns: GSTReturnRecord[] = [
  {
    id: 1,
    returnType: "GSTR-1",
    period: "July 2026",
    dueDate: "2026-08-11",
    status: "Draft",
    taxableValue: 3250000,
    taxLiability: 585000,
  },
  {
    id: 2,
    returnType: "GSTR-3B",
    period: "July 2026",
    dueDate: "2026-08-20",
    status: "Draft",
    taxableValue: 3250000,
    taxLiability: 342000,
  },
  {
    id: 3,
    returnType: "GSTR-1",
    period: "June 2026",
    dueDate: "2026-07-11",
    status: "Filed",
    taxableValue: 2980000,
    taxLiability: 536400,
  },
  {
    id: 4,
    returnType: "GSTR-3B",
    period: "June 2026",
    dueDate: "2026-07-20",
    status: "Filed",
    taxableValue: 2980000,
    taxLiability: 316000,
  },
  {
    id: 5,
    returnType: "GSTR-9",
    period: "FY 2025–26",
    dueDate: "2026-12-31",
    status: "Validated",
    taxableValue: 28400000,
    taxLiability: 4110000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
        {icon}
      </div>

      <div>
        <h2 className="font-black text-slate-950">{title}</h2>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default function GSTReturnsPage() {
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<ReturnStatus>("Draft");
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [returnReference] = useState("GST-RET-2026-00018");
  const [gstin, setGstin] = useState("09AAECK1234F1Z7");
  const [legalName, setLegalName] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [tradeName, setTradeName] = useState("KRVE The Fashion Studio");
  const [financialYear, setFinancialYear] = useState("FY 2026–27");
  const [returnPeriod, setReturnPeriod] = useState("July 2026");
  const [returnType, setReturnType] = useState<ReturnType>("GSTR-3B");
  const [filingFrequency, setFilingFrequency] = useState("Monthly");
  const [dueDate, setDueDate] = useState("2026-08-20");
  const [state, setState] = useState("Uttar Pradesh");
  const [authorizedSignatory, setAuthorizedSignatory] =
    useState("Badal Kumar");

  const [b2bSales, setB2bSales] = useState(1850000);
  const [b2cSales, setB2cSales] = useState(970000);
  const [exportSales, setExportSales] = useState(0);
  const [exemptSales, setExemptSales] = useState(125000);
  const [creditNotes, setCreditNotes] = useState(50000);
  const [debitNotes, setDebitNotes] = useState(20000);

  const [taxablePurchases, setTaxablePurchases] = useState(1420000);
  const [igstInput, setIgstInput] = useState(82000);
  const [cgstInput, setCgstInput] = useState(91000);
  const [sgstInput, setSgstInput] = useState(91000);
  const [cessInput, setCessInput] = useState(0);
  const [ineligibleItc, setIneligibleItc] = useState(12000);
  const [reversedItc, setReversedItc] = useState(5000);

  const [igstOutput, setIgstOutput] = useState(126000);
  const [cgstOutput, setCgstOutput] = useState(216000);
  const [sgstOutput, setSgstOutput] = useState(216000);
  const [cessOutput, setCessOutput] = useState(0);

  const [lateFee, setLateFee] = useState(0);
  const [interestAmount, setInterestAmount] = useState(0);
  const [cashLedgerBalance, setCashLedgerBalance] = useState(90000);
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentDate, setPaymentDate] = useState("2026-07-23");

  const [remarks, setRemarks] = useState(
    "Return prepared based on sales, purchase and tax ledger records.",
  );

  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [returns, setReturns] =
    useState<GSTReturnRecord[]>(initialReturns);

  const totalTaxableSales =
    Number(b2bSales || 0) +
    Number(b2cSales || 0) +
    Number(exportSales || 0) -
    Number(creditNotes || 0) +
    Number(debitNotes || 0);

  const totalOutputTax =
    Number(igstOutput || 0) +
    Number(cgstOutput || 0) +
    Number(sgstOutput || 0) +
    Number(cessOutput || 0);

  const grossInputTaxCredit =
    Number(igstInput || 0) +
    Number(cgstInput || 0) +
    Number(sgstInput || 0) +
    Number(cessInput || 0);

  const eligibleInputTaxCredit =
    grossInputTaxCredit -
    Number(ineligibleItc || 0) -
    Number(reversedItc || 0);

  const grossTaxPayable = Math.max(
    totalOutputTax - eligibleInputTaxCredit,
    0,
  );

  const totalAdditionalLiability =
    Number(lateFee || 0) + Number(interestAmount || 0);

  const totalLiability =
    grossTaxPayable + totalAdditionalLiability;

  const cashPaymentRequired = Math.max(
    totalLiability - Number(cashLedgerBalance || 0),
    0,
  );

  const remainingCashLedger = Math.max(
    Number(cashLedgerBalance || 0) - totalLiability,
    0,
  );

  const complianceScore = useMemo(() => {
    let score = 100;

    if (!gstin.trim()) score -= 20;
    if (totalTaxableSales <= 0) score -= 15;
    if (!declarationAccepted) score -= 20;
    if (lateFee > 0) score -= 10;
    if (interestAmount > 0) score -= 10;
    if (status === "Draft") score -= 10;

    return Math.max(score, 0);
  }, [
    declarationAccepted,
    gstin,
    interestAmount,
    lateFee,
    status,
    totalTaxableSales,
  ]);

  const filedReturns = returns.filter(
    (item) => item.status === "Filed",
  ).length;

  const pendingReturns = returns.filter(
    (item) => item.status !== "Filed",
  ).length;

  const showMessage = (text: string) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2600);
  };

  const handleAttachments = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    const mappedFiles: Attachment[] = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
    }));

    setAttachments((current) => [...current, ...mappedFiles]);
    event.target.value = "";
  };

  const removeAttachment = (id: number) => {
    setAttachments((current) =>
      current.filter((attachment) => attachment.id !== id),
    );
  };

  const validateReturn = () => {
    if (!gstin.trim()) {
      showMessage("Please enter the GSTIN.");
      return false;
    }

    if (!legalName.trim()) {
      showMessage("Please enter the legal business name.");
      return false;
    }

    if (totalTaxableSales < 0) {
      showMessage("Taxable sales cannot be negative.");
      return false;
    }

    if (eligibleInputTaxCredit < 0) {
      showMessage("Eligible input tax credit cannot be negative.");
      return false;
    }

    return true;
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("GST return saved as draft.");
  };

  const validateGSTReturn = () => {
    if (!validateReturn()) return;

    setStatus("Validated");
    showMessage("GST return validated successfully.");
  };

  const submitReturn = () => {
    if (!validateReturn()) return;

    if (!declarationAccepted) {
      showMessage("Accept the declaration before submitting.");
      return;
    }

    setStatus("Submitted");
    showMessage("GST return submitted for approval.");
  };

  const approveReturn = () => {
    if (!validateReturn()) return;

    if (!declarationAccepted) {
      showMessage("Accept the declaration before approval.");
      return;
    }

    setStatus("Approved");
    showMessage("GST return approved successfully.");
  };

  const fileReturn = () => {
    if (!validateReturn()) return;

    if (!declarationAccepted) {
      showMessage("Accept the declaration before filing.");
      return;
    }

    if (cashPaymentRequired > 0 && !paymentReference.trim()) {
      showMessage(
        "Enter the tax payment reference before filing.",
      );
      return;
    }

    setStatus("Filed");

    setReturns((current) => [
      {
        id: Date.now(),
        returnType,
        period: returnPeriod,
        dueDate,
        status: "Filed",
        taxableValue: totalTaxableSales,
        taxLiability: totalLiability,
      },
      ...current,
    ]);

    showMessage("GST return marked as filed successfully.");
  };

  const generateJson = () => {
    showMessage("GST return JSON generated successfully.");
  };

  const exportExcel = () => {
    showMessage("GST return exported to Excel.");
  };

  const downloadPDF = () => {
    showMessage("GST return PDF generated.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitReturn();
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-[150] flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={18} strokeWidth={2.5} />
          </div>

          <p className="text-sm font-bold text-slate-800">
            {message}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1680px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                    GST Returns
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                      status === "Filed"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : status === "Submitted"
                            ? "bg-violet-100 text-violet-700"
                            : status === "Validated"
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Prepare, validate, approve and track GST return
                  filings.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Save size={17} />
                Save Draft
              </button>

              <button
                type="button"
                onClick={validateGSTReturn}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
              >
                <ShieldCheck size={17} />
                Validate
              </button>

              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17385f]"
              >
                <Send size={17} />
                Submit
              </button>

              <button
                type="button"
                onClick={approveReturn}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <BadgeCheck size={17} />
                Approve
              </button>

              <button
                type="button"
                onClick={fileReturn}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <FileCheck2 size={17} />
                Mark Filed
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1680px] px-5 py-6 lg:px-8">
          <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Output GST"
              value={formatCurrency(totalOutputTax)}
              description="GST liability on outward supplies"
              icon={<IndianRupee size={21} />}
            />

            <MetricCard
              title="Eligible ITC"
              value={formatCurrency(eligibleInputTaxCredit)}
              description="Input tax credit after adjustments"
              icon={<Landmark size={21} />}
              positive
            />

            <MetricCard
              title="GST Payable"
              value={formatCurrency(totalLiability)}
              description="Net tax, interest and late fee"
              icon={<Calculator size={21} />}
              negative={totalLiability > 0}
            />

            <MetricCard
              title="Compliance Score"
              value={`${complianceScore}/100`}
              description={`${filedReturns} filed · ${pendingReturns} pending`}
              icon={<ShieldCheck size={21} />}
              positive={complianceScore >= 80}
              negative={complianceScore < 60}
            />
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
            <div className="space-y-6">
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                      <FileCheck2 size={21} />
                    </div>

                    <div>
                      <h2 className="font-black text-slate-950">
                        Return Information
                      </h2>
                      <p className="text-xs text-slate-500">
                        GST registration, return period and filing details
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 px-4 py-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Return Reference
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      {returnReference}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className={labelClass}>GSTIN</label>

                    <input
                      value={gstin}
                      onChange={(event) =>
                        setGstin(event.target.value.toUpperCase())
                      }
                      placeholder="Enter GSTIN"
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Legal Business Name
                    </label>

                    <input
                      value={legalName}
                      onChange={(event) =>
                        setLegalName(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>Trade Name</label>

                    <input
                      value={tradeName}
                      onChange={(event) =>
                        setTradeName(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>State</label>

                    <select
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      className={inputClass}
                    >
                      <option>Uttar Pradesh</option>
                      <option>Delhi</option>
                      <option>Maharashtra</option>
                      <option>Bihar</option>
                      <option>West Bengal</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Financial Year
                    </label>

                    <select
                      value={financialYear}
                      onChange={(event) =>
                        setFinancialYear(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>FY 2026–27</option>
                      <option>FY 2025–26</option>
                      <option>FY 2024–25</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Return Period
                    </label>

                    <select
                      value={returnPeriod}
                      onChange={(event) =>
                        setReturnPeriod(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>July 2026</option>
                      <option>June 2026</option>
                      <option>May 2026</option>
                      <option>April 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Return Type</label>

                    <div className="relative">
                      <select
                        value={returnType}
                        onChange={(event) =>
                          setReturnType(
                            event.target.value as ReturnType,
                          )
                        }
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option>GSTR-1</option>
                        <option>GSTR-3B</option>
                        <option>GSTR-9</option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Filing Frequency
                    </label>

                    <select
                      value={filingFrequency}
                      onChange={(event) =>
                        setFilingFrequency(event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Annual</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Due Date</label>

                    <div className="relative">
                      <CalendarDays
                        size={16}
                        className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        type="date"
                        value={dueDate}
                        onChange={(event) =>
                          setDueDate(event.target.value)
                        }
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<FileText size={21} />}
                  title="Outward Supplies"
                  description="Record taxable sales, exports, exemptions and adjustments"
                />

                <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                  <AmountField
                    label="B2B Taxable Sales"
                    value={b2bSales}
                    onChange={setB2bSales}
                  />

                  <AmountField
                    label="B2C Taxable Sales"
                    value={b2cSales}
                    onChange={setB2cSales}
                  />

                  <AmountField
                    label="Export Sales"
                    value={exportSales}
                    onChange={setExportSales}
                  />

                  <AmountField
                    label="Exempt / Nil Rated Sales"
                    value={exemptSales}
                    onChange={setExemptSales}
                  />

                  <AmountField
                    label="Credit Notes"
                    value={creditNotes}
                    onChange={setCreditNotes}
                  />

                  <AmountField
                    label="Debit Notes"
                    value={debitNotes}
                    onChange={setDebitNotes}
                  />
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-500">
                        Total Taxable Outward Supplies
                      </p>

                      <p className="mt-2 text-xl font-black text-slate-950">
                        {formatCurrency(totalTaxableSales)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-500">
                        Exempt Supplies
                      </p>

                      <p className="mt-2 text-lg font-black text-slate-800">
                        {formatCurrency(exemptSales)}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<IndianRupee size={21} />}
                  title="Output Tax Liability"
                  description="Enter IGST, CGST, SGST and cess collected"
                />

                <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
                  <AmountField
                    label="IGST Output"
                    value={igstOutput}
                    onChange={setIgstOutput}
                  />

                  <AmountField
                    label="CGST Output"
                    value={cgstOutput}
                    onChange={setCgstOutput}
                  />

                  <AmountField
                    label="SGST Output"
                    value={sgstOutput}
                    onChange={setSgstOutput}
                  />

                  <AmountField
                    label="Cess Output"
                    value={cessOutput}
                    onChange={setCessOutput}
                  />
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
                  <p className="text-xs font-bold text-slate-500">
                    Total Output GST
                  </p>

                  <p className="mt-2 text-xl font-black text-slate-950">
                    {formatCurrency(totalOutputTax)}
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<Landmark size={21} />}
                  title="Input Tax Credit"
                  description="Record purchase values and eligible input tax credits"
                />

                <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                  <AmountField
                    label="Taxable Purchases"
                    value={taxablePurchases}
                    onChange={setTaxablePurchases}
                  />

                  <AmountField
                    label="IGST Input"
                    value={igstInput}
                    onChange={setIgstInput}
                  />

                  <AmountField
                    label="CGST Input"
                    value={cgstInput}
                    onChange={setCgstInput}
                  />

                  <AmountField
                    label="SGST Input"
                    value={sgstInput}
                    onChange={setSgstInput}
                  />

                  <AmountField
                    label="Cess Input"
                    value={cessInput}
                    onChange={setCessInput}
                  />

                  <AmountField
                    label="Ineligible ITC"
                    value={ineligibleItc}
                    onChange={setIneligibleItc}
                  />

                  <AmountField
                    label="ITC Reversal"
                    value={reversedItc}
                    onChange={setReversedItc}
                  />
                </div>

                <div className="grid gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      Gross Input Tax Credit
                    </p>

                    <p className="mt-2 text-lg font-black text-slate-950">
                      {formatCurrency(grossInputTaxCredit)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      Eligible Input Tax Credit
                    </p>

                    <p className="mt-2 text-lg font-black text-emerald-700">
                      {formatCurrency(eligibleInputTaxCredit)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<Calculator size={21} />}
                  title="Tax Payment"
                  description="Calculate liability, ledger utilization and cash requirement"
                />

                <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                  <AmountField
                    label="Late Fee"
                    value={lateFee}
                    onChange={setLateFee}
                  />

                  <AmountField
                    label="Interest Amount"
                    value={interestAmount}
                    onChange={setInterestAmount}
                  />

                  <AmountField
                    label="Cash Ledger Balance"
                    value={cashLedgerBalance}
                    onChange={setCashLedgerBalance}
                  />

                  <div>
                    <label className={labelClass}>
                      Payment Reference
                    </label>

                    <input
                      value={paymentReference}
                      onChange={(event) =>
                        setPaymentReference(event.target.value)
                      }
                      placeholder="Enter challan or payment reference"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Payment Date
                    </label>

                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(event) =>
                        setPaymentDate(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 md:grid-cols-3">
                  <TaxSummaryBox
                    label="Gross GST Payable"
                    value={formatCurrency(grossTaxPayable)}
                  />

                  <TaxSummaryBox
                    label="Cash Payment Required"
                    value={formatCurrency(cashPaymentRequired)}
                    warning={cashPaymentRequired > 0}
                  />

                  <TaxSummaryBox
                    label="Remaining Cash Ledger"
                    value={formatCurrency(remainingCashLedger)}
                    positive
                  />
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<Upload size={21} />}
                  title="Supporting Documents"
                  description="Upload reconciliation reports, challans and working papers"
                />

                <div className="p-6">
                  <input
                    ref={attachmentInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.xlsx,.xls,.csv,.json,.png,.jpg,.jpeg"
                    onChange={handleAttachments}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      attachmentInputRef.current?.click()
                    }
                    className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-10 text-center transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                      <Upload size={22} />
                    </div>

                    <p className="mt-4 text-sm font-black text-slate-900">
                      Upload GST documents
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PDF, Excel, CSV, JSON or image files
                    </p>
                  </button>

                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <FileText size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-slate-800">
                              {attachment.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {formatFileSize(attachment.size)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeAttachment(attachment.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                          >
                            <X size={17} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={<FileText size={21} />}
                  title="Declaration and Remarks"
                  description="Add filing notes and authorized declaration"
                />

                <div className="space-y-5 p-6">
                  <div>
                    <label className={labelClass}>
                      Authorized Signatory
                    </label>

                    <input
                      value={authorizedSignatory}
                      onChange={(event) =>
                        setAuthorizedSignatory(event.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Remarks</label>

                    <textarea
                      value={remarks}
                      onChange={(event) =>
                        setRemarks(event.target.value)
                      }
                      className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <input
                      type="checkbox"
                      checked={declarationAccepted}
                      onChange={(event) =>
                        setDeclarationAccepted(
                          event.target.checked,
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                    />

                    <div>
                      <p className="text-sm font-black text-slate-900">
                        Authorized declaration
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        I confirm that the information entered in this
                        return has been reviewed and approved for filing.
                      </p>
                    </div>
                  </label>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-black text-slate-950">
                      GST Return History
                    </h2>

                    <p className="text-xs text-slate-500">
                      Previous and pending return records
                    </p>
                  </div>

                  <span className="rounded-xl bg-slate-50 px-4 py-2 text-xs font-black text-slate-700">
                    {returns.length} records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[900px] w-full">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <th className="px-6 py-4">Return</th>
                        <th className="px-6 py-4">Period</th>
                        <th className="px-6 py-4">Due Date</th>
                        <th className="px-6 py-4 text-right">
                          Taxable Value
                        </th>
                        <th className="px-6 py-4 text-right">
                          Tax Liability
                        </th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {returns.map((item) => (
                        <tr key={item.id} className="text-sm">
                          <td className="px-6 py-4 font-black text-slate-900">
                            {item.returnType}
                          </td>

                          <td className="px-6 py-4 font-semibold text-slate-600">
                            {item.period}
                          </td>

                          <td className="px-6 py-4 text-slate-500">
                            {item.dueDate}
                          </td>

                          <td className="px-6 py-4 text-right font-bold text-slate-800">
                            {formatCurrency(item.taxableValue)}
                          </td>

                          <td className="px-6 py-4 text-right font-black text-slate-900">
                            {formatCurrency(item.taxLiability)}
                          </td>

                          <td className="px-6 py-4">
                            <StatusBadge status={item.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              <section className="overflow-hidden rounded-3xl bg-[#102844] text-white shadow-xl">
                <div className="border-b border-white/10 px-6 py-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                    GST Summary
                  </p>

                  <h3 className="mt-2 text-lg font-black">
                    {returnReference}
                  </h3>
                </div>

                <div className="space-y-4 p-6">
                  <SummaryLine
                    label="Return Type"
                    value={returnType}
                  />

                  <SummaryLine
                    label="Return Period"
                    value={returnPeriod}
                  />

                  <SummaryLine
                    label="Taxable Sales"
                    value={formatCurrency(totalTaxableSales)}
                  />

                  <SummaryLine
                    label="Output GST"
                    value={formatCurrency(totalOutputTax)}
                  />

                  <SummaryLine
                    label="Eligible ITC"
                    value={formatCurrency(
                      eligibleInputTaxCredit,
                    )}
                  />

                  <SummaryLine
                    label="Additional Liability"
                    value={formatCurrency(
                      totalAdditionalLiability,
                    )}
                  />

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold text-blue-200">
                      Total GST Payable
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      {formatCurrency(totalLiability)}
                    </p>
                  </div>
                </div>
              </section>

              {cashPaymentRequired > 0 && (
                <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex gap-3">
                    <AlertTriangle
                      size={20}
                      className="shrink-0 text-amber-600"
                    />

                    <div>
                      <p className="text-sm font-black text-amber-900">
                        Cash payment required
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        Additional payment of{" "}
                        {formatCurrency(cashPaymentRequired)} is
                        required before filing.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-900">
                  Filing Workflow
                </h3>

                <div className="mt-5 space-y-4">
                  <WorkflowStep
                    title="Return Created"
                    complete
                  />

                  <WorkflowStep
                    title="Return Validated"
                    complete={
                      status === "Validated" ||
                      status === "Submitted" ||
                      status === "Approved" ||
                      status === "Filed"
                    }
                  />

                  <WorkflowStep
                    title="Submitted for Approval"
                    complete={
                      status === "Submitted" ||
                      status === "Approved" ||
                      status === "Filed"
                    }
                  />

                  <WorkflowStep
                    title="Finance Approved"
                    complete={
                      status === "Approved" ||
                      status === "Filed"
                    }
                  />

                  <WorkflowStep
                    title="Return Filed"
                    complete={status === "Filed"}
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-900">
                  Export and Filing Tools
                </h3>

                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={generateJson}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <FileJson size={17} />
                    Generate JSON
                  </button>

                  <button
                    type="button"
                    onClick={exportExcel}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <FileSpreadsheet size={17} />
                    Export Excel
                  </button>

                  <button
                    type="button"
                    onClick={downloadPDF}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Download size={17} />
                    Download PDF
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPreview(true)}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#102844] text-sm font-bold text-white transition hover:bg-[#17385f]"
                  >
                    <FileText size={17} />
                    Preview Return
                  </button>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-black text-slate-900">
                  Compliance Health
                </h3>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      complianceScore >= 80
                        ? "bg-emerald-600"
                        : complianceScore >= 60
                          ? "bg-amber-500"
                          : "bg-rose-600"
                    }`}
                    style={{
                      width: `${complianceScore}%`,
                    }}
                  />
                </div>

                <p className="mt-4 text-2xl font-black text-slate-950">
                  {complianceScore}/100
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Based on return completeness and filing controls.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </form>

      {showPreview && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  GST Return Preview
                </h2>

                <p className="text-xs text-slate-500">
                  {returnReference}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-8">
              <div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-2xl font-black tracking-[0.2em] text-[#102844]">
                    KEOS
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    {legalName}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    GSTIN: {gstin}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    GST Return
                  </p>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    {returnType}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Period: {returnPeriod}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Due Date: {dueDate}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <PreviewMetric
                  label="Taxable Sales"
                  value={formatCurrency(totalTaxableSales)}
                />

                <PreviewMetric
                  label="Output GST"
                  value={formatCurrency(totalOutputTax)}
                />

                <PreviewMetric
                  label="Eligible ITC"
                  value={formatCurrency(
                    eligibleInputTaxCredit,
                  )}
                />

                <PreviewMetric
                  label="GST Payable"
                  value={formatCurrency(totalLiability)}
                />
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-5 py-4">Tax Component</th>
                      <th className="px-5 py-4 text-right">
                        Output Tax
                      </th>
                      <th className="px-5 py-4 text-right">
                        Input Credit
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm">
                    <PreviewTaxRow
                      label="IGST"
                      output={igstOutput}
                      input={igstInput}
                    />

                    <PreviewTaxRow
                      label="CGST"
                      output={cgstOutput}
                      input={cgstInput}
                    />

                    <PreviewTaxRow
                      label="SGST"
                      output={sgstOutput}
                      input={sgstInput}
                    />

                    <PreviewTaxRow
                      label="Cess"
                      output={cessOutput}
                      input={cessInput}
                    />
                  </tbody>
                </table>
              </div>

              <div className="ml-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-6">
                <PreviewSummaryLine
                  label="Output Tax"
                  value={formatCurrency(totalOutputTax)}
                />

                <PreviewSummaryLine
                  label="Eligible ITC"
                  value={formatCurrency(
                    eligibleInputTaxCredit,
                  )}
                />

                <PreviewSummaryLine
                  label="Interest and Late Fee"
                  value={formatCurrency(
                    totalAdditionalLiability,
                  )}
                />

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="font-black text-slate-900">
                      Total GST Payable
                    </span>

                    <span className="text-lg font-black text-[#102844]">
                      {formatCurrency(totalLiability)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Declaration
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {remarks}
                </p>

                <p className="mt-4 text-sm font-black text-slate-900">
                  Authorized Signatory: {authorizedSignatory}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function AmountField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <div className="relative">
        <IndianRupee
          size={16}
          className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
        />

        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className={`${inputClass} pl-10`}
        />
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon,
  positive,
  negative,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <p
            className={`mt-3 text-xl font-black ${
              positive
                ? "text-emerald-700"
                : negative
                  ? "text-rose-700"
                  : "text-slate-950"
            }`}
          >
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function TaxSummaryBox({
  label,
  value,
  warning,
  positive,
}: {
  label: string;
  value: string;
  warning?: boolean;
  positive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        warning
          ? "bg-rose-50"
          : positive
            ? "bg-emerald-50"
            : "bg-white"
      }`}
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-black ${
          warning
            ? "text-rose-700"
            : positive
              ? "text-emerald-700"
              : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SummaryLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-semibold text-blue-200">
        {label}
      </span>

      <span className="max-w-[190px] text-right text-xs font-black">
        {value}
      </span>
    </div>
  );
}

function WorkflowStep({
  title,
  complete,
}: {
  title: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          complete
            ? "bg-emerald-100 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {complete ? (
          <Check size={15} />
        ) : (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>

      <p
        className={`text-xs font-bold ${
          complete ? "text-slate-800" : "text-slate-400"
        }`}
      >
        {title}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ReturnStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${
        status === "Filed"
          ? "bg-emerald-100 text-emerald-700"
          : status === "Approved"
            ? "bg-blue-100 text-blue-700"
            : status === "Submitted"
              ? "bg-violet-100 text-violet-700"
              : status === "Validated"
                ? "bg-cyan-100 text-cyan-700"
                : "bg-amber-100 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

function PreviewMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-black text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PreviewTaxRow({
  label,
  output,
  input,
}: {
  label: string;
  output: number;
  input: number;
}) {
  return (
    <tr>
      <td className="px-5 py-4 font-black text-slate-900">
        {label}
      </td>

      <td className="px-5 py-4 text-right font-bold text-slate-700">
        {formatCurrency(output)}
      </td>

      <td className="px-5 py-4 text-right font-bold text-emerald-700">
        {formatCurrency(input)}
      </td>
    </tr>
  );
}

function PreviewSummaryLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-3 flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}