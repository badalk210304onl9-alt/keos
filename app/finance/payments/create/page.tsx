"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  FileText,
  Hash,
  IndianRupee,
  Landmark,
  Mail,
  ReceiptText,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type PaymentStatus = "Draft" | "Recorded" | "Pending Reconciliation";

type PaymentForm = {
  paymentType: "Incoming" | "Outgoing";
  partyType: "Customer" | "Vendor" | "Employee" | "Other";
  partyName: string;
  referenceType: string;
  referenceNumber: string;
  paymentDate: string;
  paymentMethod: string;
  bankAccount: string;
  transactionReference: string;
  currency: string;
  amount: number;
  bankCharges: number;
  tdsAmount: number;
  adjustmentAmount: number;
  email: string;
  narration: string;
  internalNotes: string;
};

const initialForm: PaymentForm = {
  paymentType: "Outgoing",
  partyType: "Vendor",
  partyName: "",
  referenceType: "Vendor Invoice",
  referenceNumber: "",
  paymentDate: new Date().toISOString().split("T")[0],
  paymentMethod: "Bank Transfer",
  bankAccount: "HDFC Bank •••• 4821",
  transactionReference: "",
  currency: "INR",
  amount: 0,
  bankCharges: 0,
  tdsAmount: 0,
  adjustmentAmount: 0,
  email: "",
  narration: "",
  internalNotes: "",
};

const partyOptions = {
  Customer: [
    "Aarav Fashion House",
    "Maison Luxe Retail",
    "Urban Style Private Limited",
    "Royal Wardrobe",
  ],
  Vendor: [
    "Premium Textiles Private Limited",
    "Elite Packaging Solutions",
    "Urban Logistics India",
    "Apex Cloud Systems",
  ],
  Employee: [
    "Badal Kumar",
    "Riya Kapoor",
    "Arjun Mehta",
    "Neha Sharma",
  ],
  Other: ["Government Department", "Consultant", "Service Provider"],
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function RecordPaymentPage() {
  const [form, setForm] = useState<PaymentForm>(initialForm);
  const [status, setStatus] = useState<PaymentStatus>("Draft");
  const [savedDraft, setSavedDraft] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const paymentNumber = useMemo(
    () =>
      `PAY-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 99999) + 1,
      ).padStart(5, "0")}`,
    [],
  );

  const netAmount =
    form.amount +
    form.bankCharges -
    form.tdsAmount -
    form.adjustmentAmount;

  const paymentRisk =
    netAmount >= 500000 ? "High" : netAmount >= 100000 ? "Medium" : "Low";

  const updateForm = <K extends keyof PaymentForm>(
    field: K,
    value: PaymentForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSavedDraft(false);
    setSubmitted(false);
  };

  const saveDraft = () => {
    setStatus("Draft");
    setSavedDraft(true);
    setSubmitted(false);

    window.setTimeout(() => {
      setSavedDraft(false);
    }, 1800);
  };

  const submitPayment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("Pending Reconciliation");
    setSubmitted(true);
    setSavedDraft(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearForm = () => {
    setForm(initialForm);
    setStatus("Draft");
    setSavedDraft(false);
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d02b3f]">
                Finance Operations
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Record Payment
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Record incoming or outgoing payments and send them for bank
                reconciliation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={[
                "rounded-full px-4 py-2 text-xs font-black",
                status === "Draft"
                  ? "bg-slate-100 text-slate-600"
                  : status === "Recorded"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700",
              ].join(" ")}
            >
              {status}
            </span>

            <span className="rounded-full bg-[#10233b] px-4 py-2 text-xs font-black text-white">
              {paymentNumber}
            </span>
          </div>
        </div>
      </header>

      {submitted && (
        <section className="border-b border-emerald-200 bg-emerald-50">
          <div className="mx-auto flex max-w-[1500px] items-start gap-3 px-5 py-4 sm:px-6 lg:px-8">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

            <div>
              <p className="text-sm font-black text-emerald-800">
                Payment recorded successfully
              </p>

              <p className="mt-1 text-xs font-semibold text-emerald-700">
                Payment {paymentNumber} is now pending bank reconciliation.
              </p>
            </div>
          </div>
        </section>
      )}

      <form
        onSubmit={submitPayment}
        className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Payment Direction"
                title="Payment Type"
                description="Choose whether money is being received or paid"
                icon={<CircleDollarSign className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    updateForm("paymentType", "Incoming");
                    updateForm("partyType", "Customer");
                    updateForm("referenceType", "Sales Invoice");
                    updateForm("partyName", "");
                  }}
                  className={[
                    "rounded-[22px] border-2 p-5 text-left transition",
                    form.paymentType === "Incoming"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <IndianRupee className="h-5 w-5" />
                    </div>

                    {form.paymentType === "Incoming" && (
                      <BadgeCheck className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>

                  <p className="mt-4 text-sm font-black text-[#10233b]">
                    Incoming Payment
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Receive money from a customer or another party
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateForm("paymentType", "Outgoing");
                    updateForm("partyType", "Vendor");
                    updateForm("referenceType", "Vendor Invoice");
                    updateForm("partyName", "");
                  }}
                  className={[
                    "rounded-[22px] border-2 p-5 text-left transition",
                    form.paymentType === "Outgoing"
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Banknote className="h-5 w-5" />
                    </div>

                    {form.paymentType === "Outgoing" && (
                      <BadgeCheck className="h-5 w-5 text-blue-600" />
                    )}
                  </div>

                  <p className="mt-4 text-sm font-black text-[#10233b]">
                    Outgoing Payment
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Pay a vendor, employee or another party
                  </p>
                </button>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Party Information"
                title="Customer or Payee Details"
                description="Select the party associated with this payment"
                icon={<Building2 className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Party Type" required>
                  <select
                    value={form.partyType}
                    onChange={(event) => {
                      const value = event.target.value as PaymentForm["partyType"];

                      updateForm("partyType", value);
                      updateForm("partyName", "");
                    }}
                    className="input-style bg-white"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Employee">Employee</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <Field label="Party Name" required>
                  <div className="relative">
                    <UserRound className="input-icon" />

                    <select
                      required
                      value={form.partyName}
                      onChange={(event) =>
                        updateForm("partyName", event.target.value)
                      }
                      className="input-style bg-white pl-11"
                    >
                      <option value="">Select party</option>

                      {partyOptions[form.partyType].map((party) => (
                        <option key={party} value={party}>
                          {party}
                        </option>
                      ))}
                    </select>
                  </div>
                </Field>

                <Field label="Email Address">
                  <div className="relative">
                    <Mail className="input-icon" />

                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateForm("email", event.target.value)
                      }
                      placeholder="accounts@example.com"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Reference Type">
                  <select
                    value={form.referenceType}
                    onChange={(event) =>
                      updateForm("referenceType", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option>Sales Invoice</option>
                    <option>Vendor Invoice</option>
                    <option>Expense Claim</option>
                    <option>Purchase Order</option>
                    <option>Advance Payment</option>
                    <option>Refund</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field
                  label="Reference Number"
                  className="sm:col-span-2"
                >
                  <div className="relative">
                    <FileText className="input-icon" />

                    <input
                      value={form.referenceNumber}
                      onChange={(event) =>
                        updateForm("referenceNumber", event.target.value)
                      }
                      placeholder="Invoice, bill or order reference"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Transaction Details"
                title="Payment Information"
                description="Enter payment date, method and bank reference"
                icon={<CreditCard className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Payment Date" required>
                  <div className="relative">
                    <CalendarDays className="input-icon" />

                    <input
                      required
                      type="date"
                      value={form.paymentDate}
                      onChange={(event) =>
                        updateForm("paymentDate", event.target.value)
                      }
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Payment Method" required>
                  <select
                    value={form.paymentMethod}
                    onChange={(event) =>
                      updateForm("paymentMethod", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                    <option>Corporate Card</option>
                    <option>Cheque</option>
                    <option>Cash</option>
                    <option>Payment Gateway</option>
                    <option>Wallet</option>
                  </select>
                </Field>

                <Field label="Bank Account" required>
                  <div className="relative">
                    <Landmark className="input-icon" />

                    <select
                      value={form.bankAccount}
                      onChange={(event) =>
                        updateForm("bankAccount", event.target.value)
                      }
                      className="input-style bg-white pl-11"
                    >
                      <option>HDFC Bank •••• 4821</option>
                      <option>ICICI Bank •••• 7456</option>
                      <option>State Bank of India •••• 1208</option>
                      <option>Axis Bank •••• 9382</option>
                      <option>Cash Account</option>
                    </select>
                  </div>
                </Field>

                <Field label="Transaction Reference" required>
                  <div className="relative">
                    <Hash className="input-icon" />

                    <input
                      required
                      value={form.transactionReference}
                      onChange={(event) =>
                        updateForm(
                          "transactionReference",
                          event.target.value.toUpperCase(),
                        )
                      }
                      placeholder="UTR, cheque or transaction ID"
                      className="input-style uppercase pl-11"
                    />
                  </div>
                </Field>

                <Field label="Currency">
                  <select
                    value={form.currency}
                    onChange={(event) =>
                      updateForm("currency", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option value="INR">INR — Indian Rupee</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                  </select>
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Financial Allocation"
                title="Amount and Deductions"
                description="Enter payment value, charges and adjustments"
                icon={<WalletCards className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Payment Amount" required>
                  <div className="relative">
                    <IndianRupee className="input-icon" />

                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.amount || ""}
                      onChange={(event) =>
                        updateForm(
                          "amount",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0.00"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Bank Charges">
                  <div className="relative">
                    <IndianRupee className="input-icon" />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.bankCharges || ""}
                      onChange={(event) =>
                        updateForm(
                          "bankCharges",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0.00"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="TDS Deduction">
                  <div className="relative">
                    <IndianRupee className="input-icon" />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.tdsAmount || ""}
                      onChange={(event) =>
                        updateForm(
                          "tdsAmount",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0.00"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Adjustment Amount">
                  <div className="relative">
                    <IndianRupee className="input-icon" />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.adjustmentAmount || ""}
                      onChange={(event) =>
                        updateForm(
                          "adjustmentAmount",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0.00"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Description"
                title="Payment Narration"
                description="Add details for ledger and audit records"
                icon={<ReceiptText className="h-7 w-7" />}
              />

              <div className="mt-6 space-y-4">
                <Field label="Narration" required>
                  <textarea
                    required
                    rows={4}
                    value={form.narration}
                    onChange={(event) =>
                      updateForm("narration", event.target.value)
                    }
                    placeholder="Enter the purpose and description of this payment..."
                    className="textarea-style"
                  />
                </Field>

                <Field label="Internal Notes">
                  <textarea
                    rows={4}
                    value={form.internalNotes}
                    onChange={(event) =>
                      updateForm("internalNotes", event.target.value)
                    }
                    placeholder="Add internal finance or reconciliation notes..."
                    className="textarea-style"
                  />
                </Field>
              </div>
            </section>
          </div>

          <aside className="space-y-5 2xl:sticky 2xl:top-6 2xl:h-fit">
            <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.2)] sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
                Payment Summary
              </p>

              <h2 className="mt-2 text-xl font-black">
                Transaction Calculation
              </h2>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  label="Payment Amount"
                  value={formatCurrency(form.amount)}
                />

                <SummaryRow
                  label="Bank Charges"
                  value={formatCurrency(form.bankCharges)}
                />

                <SummaryRow
                  label="TDS Deduction"
                  value={`-${formatCurrency(form.tdsAmount)}`}
                />

                <SummaryRow
                  label="Adjustments"
                  value={`-${formatCurrency(form.adjustmentAmount)}`}
                />
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold text-slate-300">
                  Net Transaction Amount
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(netAmount)}
                </p>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    KEOS Intelligence
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Payment Validation
                  </h2>
                </div>

                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>

              <div className="mt-5 space-y-3">
                <ValidationCard
                  title="Reference validation"
                  description={
                    form.transactionReference.length >= 6
                      ? "Transaction reference is available."
                      : "Enter a valid transaction reference."
                  }
                  valid={form.transactionReference.length >= 6}
                />

                <ValidationCard
                  title="Party validation"
                  description={
                    form.partyName
                      ? `${form.partyName} selected.`
                      : "Select a customer, vendor or payee."
                  }
                  valid={Boolean(form.partyName)}
                />

                <ValidationCard
                  title="Amount validation"
                  description={
                    form.amount > 0
                      ? "Payment amount is valid."
                      : "Enter a payment amount greater than zero."
                  }
                  valid={form.amount > 0}
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Risk Control
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Approval Requirement
              </h2>

              <div
                className={[
                  "mt-5 flex items-start gap-3 rounded-2xl p-4",
                  paymentRisk === "High"
                    ? "bg-red-50"
                    : paymentRisk === "Medium"
                      ? "bg-amber-50"
                      : "bg-emerald-50",
                ].join(" ")}
              >
                {paymentRisk === "Low" ? (
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                ) : (
                  <AlertTriangle
                    className={[
                      "mt-0.5 h-5 w-5 shrink-0",
                      paymentRisk === "High"
                        ? "text-red-600"
                        : "text-amber-600",
                    ].join(" ")}
                  />
                )}

                <div>
                  <p
                    className={[
                      "text-sm font-black",
                      paymentRisk === "High"
                        ? "text-red-700"
                        : paymentRisk === "Medium"
                          ? "text-amber-700"
                          : "text-emerald-700",
                    ].join(" ")}
                  >
                    {paymentRisk} payment risk
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    {paymentRisk === "High"
                      ? "Founder and finance controller approval required."
                      : paymentRisk === "Medium"
                        ? "Finance manager approval required."
                        : "Payment is within the standard approval limit."}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Processing Route
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Payment Workflow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  {
                    number: 1,
                    title: "Payment Entry",
                    description: "Finance records transaction",
                  },
                  {
                    number: 2,
                    title: "Approval Check",
                    description: "Approval based on payment value",
                  },
                  {
                    number: 3,
                    title: "Bank Reconciliation",
                    description: "Match with bank statement",
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-sm font-black text-white">
                      {step.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-[#10233b]">
                        {step.title}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        {step.description}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="sticky bottom-0 z-20 mt-5 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_-14px_45px_rgba(15,35,59,0.1)] backdrop-blur-xl">
          {savedDraft ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              Payment draft saved successfully
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={clearForm}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
                Clear Form
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#10233b] px-5 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-6 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  <Send className="h-4 w-4" />
                  Record Payment
                </button>
              </div>
            </div>
          )}
        </section>
      </form>

      <style jsx global>{`
        .input-style {
          height: 3rem;
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgb(226 232 240);
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #10233b;
          outline: none;
          transition: 0.2s;
        }

        .input-style::placeholder {
          color: rgb(148 163 184);
        }

        .input-style:focus {
          border-color: #10233b;
        }

        .textarea-style {
          width: 100%;
          resize: none;
          border-radius: 1rem;
          border: 1px solid rgb(226 232 240);
          padding: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #10233b;
          outline: none;
          transition: 0.2s;
        }

        .textarea-style::placeholder {
          color: rgb(148 163 184);
        }

        .textarea-style:focus {
          border-color: #10233b;
        }

        .input-icon {
          pointer-events: none;
          position: absolute;
          left: 1rem;
          top: 50%;
          height: 1rem;
          width: 1rem;
          transform: translateY(-50%);
          color: rgb(148 163 184);
        }
      `}</style>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-black text-[#10233b]">{title}</h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {description}
        </p>
      </div>

      <div className="text-[#10233b]">{icon}</div>
    </div>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-black text-[#10233b]">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm font-semibold text-slate-300">{label}</span>

      <span className="text-right text-sm font-black">{value}</span>
    </div>
  );
}

function ValidationCard({
  title,
  description,
  valid,
}: {
  title: string;
  description: string;
  valid: boolean;
}) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-2xl p-4",
        valid ? "bg-emerald-50" : "bg-amber-50",
      ].join(" ")}
    >
      {valid ? (
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
      ) : (
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      )}

      <div>
        <p
          className={[
            "text-sm font-black",
            valid ? "text-emerald-700" : "text-amber-700",
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