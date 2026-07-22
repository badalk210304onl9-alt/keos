"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  IndianRupee,
  Plus,
  ReceiptText,
  Save,
  Send,
  Trash2,
  UserRound,
  WalletCards,
} from "lucide-react";

type CashStatus = "Draft" | "Submitted" | "Approved" | "Posted";

type TransactionType =
  | "Cash Receipt"
  | "Cash Payment"
  | "Petty Cash Expense"
  | "Cash Transfer"
  | "Cash Deposit"
  | "Cash Withdrawal";

type CashTransaction = {
  id: number;
  date: string;
  reference: string;
  description: string;
  type: "Receipt" | "Payment";
  amount: number;
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CreateCashManagementPage() {
  const [status, setStatus] = useState<CashStatus>("Draft");
  const [message, setMessage] = useState("");

  const [voucherNumber] = useState("CASH-2026-00128");
  const [transactionDate, setTransactionDate] = useState("2026-07-23");
  const [postingDate, setPostingDate] = useState("2026-07-23");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("Petty Cash Expense");

  const [cashAccount, setCashAccount] = useState(
    "Petty Cash — Varanasi Head Office",
  );

  const [company, setCompany] = useState(
    "KRVE Fashion Studio Private Limited",
  );

  const [branch, setBranch] = useState("Varanasi Head Office");
  const [department, setDepartment] = useState("Administration");
  const [employee, setEmployee] = useState("Badal Kumar");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [payee, setPayee] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState(5000);
  const [openingBalance, setOpeningBalance] = useState(35000);
  const [cashLimit, setCashLimit] = useState(50000);
  const [notes, setNotes] = useState("");

  const [transactions, setTransactions] = useState<CashTransaction[]>([
    {
      id: 1,
      date: "2026-07-22",
      reference: "CASH-2026-00124",
      description: "Office stationery purchase",
      type: "Payment",
      amount: 3250,
    },
    {
      id: 2,
      date: "2026-07-22",
      reference: "CASH-2026-00125",
      description: "Cash received from sales counter",
      type: "Receipt",
      amount: 15000,
    },
    {
      id: 3,
      date: "2026-07-23",
      reference: "CASH-2026-00126",
      description: "Local courier payment",
      type: "Payment",
      amount: 850,
    },
  ]);

  const totalReceipts = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "Receipt")
        .reduce((total, transaction) => total + transaction.amount, 0),
    [transactions],
  );

  const totalPayments = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "Payment")
        .reduce((total, transaction) => total + transaction.amount, 0),
    [transactions],
  );

  const currentBalance = openingBalance + totalReceipts - totalPayments;

  const projectedBalance =
    transactionType === "Cash Receipt" ||
    transactionType === "Cash Deposit"
      ? currentBalance + amount
      : currentBalance - amount;

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const addTransaction = () => {
    if (!purpose.trim()) {
      showMessage("Please enter the transaction purpose.");
      return;
    }

    if (amount <= 0) {
      showMessage("Transaction amount must be greater than zero.");
      return;
    }

    const receiptTypes: TransactionType[] = [
      "Cash Receipt",
      "Cash Deposit",
    ];

    const newTransaction: CashTransaction = {
      id: Date.now(),
      date: transactionDate,
      reference: voucherNumber,
      description: purpose,
      type: receiptTypes.includes(transactionType) ? "Receipt" : "Payment",
      amount,
    };

    setTransactions((current) => [newTransaction, ...current]);
    setPurpose("");
    setAmount(0);
    showMessage("Cash transaction added.");
  };

  const removeTransaction = (id: number) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id),
    );
  };

  const validateEntry = () => {
    if (!cashAccount) {
      showMessage("Please select a cash account.");
      return false;
    }

    if (!purpose.trim()) {
      showMessage("Please enter the transaction purpose.");
      return false;
    }

    if (amount <= 0) {
      showMessage("Amount must be greater than zero.");
      return false;
    }

    if (projectedBalance < 0) {
      showMessage("Insufficient cash balance.");
      return false;
    }

    return true;
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("Cash entry saved as draft.");
  };

  const submitEntry = () => {
    if (!validateEntry()) return;

    setStatus("Submitted");
    showMessage("Cash entry submitted for approval.");
  };

  const approveEntry = () => {
    if (!validateEntry()) return;

    setStatus("Approved");
    showMessage("Cash entry approved.");
  };

  const postEntry = () => {
    if (!validateEntry()) return;

    setStatus("Posted");
    showMessage("Cash entry posted successfully.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitEntry();
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={18} />
          </div>

          <p className="text-sm font-bold text-slate-800">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1680px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-black">
                    Cash Management Entry
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase ${
                      status === "Posted"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : status === "Submitted"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Manage petty cash, branch registers and daily cash
                  transactions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700"
              >
                <Save size={17} />
                Save Draft
              </button>

              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
              >
                <Send size={17} />
                Submit
              </button>

              <button
                type="button"
                onClick={approveEntry}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white"
              >
                <BadgeCheck size={17} />
                Approve
              </button>

              <button
                type="button"
                onClick={postEntry}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white"
              >
                <CircleDollarSign size={17} />
                Post Entry
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1680px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <WalletCards size={21} />
                  </div>

                  <div>
                    <h2 className="font-black">Cash Entry Information</h2>
                    <p className="text-xs text-slate-500">
                      Transaction, company and posting details
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Voucher Number
                  </p>

                  <p className="mt-1 text-sm font-black">{voucherNumber}</p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Transaction Date</label>
                  <input
                    type="date"
                    value={transactionDate}
                    onChange={(event) =>
                      setTransactionDate(event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Posting Date</label>
                  <input
                    type="date"
                    value={postingDate}
                    onChange={(event) =>
                      setPostingDate(event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Transaction Type</label>
                  <div className="relative">
                    <select
                      value={transactionType}
                      onChange={(event) =>
                        setTransactionType(
                          event.target.value as TransactionType,
                        )
                      }
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option>Cash Receipt</option>
                      <option>Cash Payment</option>
                      <option>Petty Cash Expense</option>
                      <option>Cash Transfer</option>
                      <option>Cash Deposit</option>
                      <option>Cash Withdrawal</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Cash Account</label>
                  <select
                    value={cashAccount}
                    onChange={(event) => setCashAccount(event.target.value)}
                    className={inputClass}
                  >
                    <option>Petty Cash — Varanasi Head Office</option>
                    <option>Cash in Hand — Delhi Office</option>
                    <option>Cash Register — Retail Store</option>
                    <option>Cash in Transit</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Department</label>
                  <select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    className={inputClass}
                  >
                    <option>Administration</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                    <option>Human Resources</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Company</label>
                  <select
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    className={inputClass}
                  >
                    <option>KRVE Fashion Studio Private Limited</option>
                    <option>KRVE Technologies Private Limited</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Branch</label>
                  <select
                    value={branch}
                    onChange={(event) => setBranch(event.target.value)}
                    className={inputClass}
                  >
                    <option>Varanasi Head Office</option>
                    <option>Delhi Corporate Office</option>
                    <option>Mumbai Operations</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <ReceiptText size={21} />
                </div>

                <div>
                  <h2 className="font-black">Transaction Details</h2>
                  <p className="text-xs text-slate-500">
                    Payee, purpose, amount and reference information
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Employee / Custodian</label>
                  <select
                    value={employee}
                    onChange={(event) => setEmployee(event.target.value)}
                    className={inputClass}
                  >
                    <option>Badal Kumar</option>
                    <option>Finance Manager</option>
                    <option>Branch Administrator</option>
                    <option>Cashier</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Payee / Received From</label>
                  <input
                    value={payee}
                    onChange={(event) => setPayee(event.target.value)}
                    placeholder="Enter person or business name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Reference Number</label>
                  <input
                    value={referenceNumber}
                    onChange={(event) =>
                      setReferenceNumber(event.target.value)
                    }
                    placeholder="Bill, receipt or voucher reference"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Purpose</label>
                  <input
                    value={purpose}
                    onChange={(event) => setPurpose(event.target.value)}
                    placeholder="Enter transaction purpose"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Amount</label>
                  <div className="relative">
                    <IndianRupee
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amount}
                      onChange={(event) =>
                        setAmount(Number(event.target.value))
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label className={labelClass}>Internal Notes</label>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Add cash handling or approval notes"
                    className="min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm font-medium outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <button
                    type="button"
                    onClick={addTransaction}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
                  >
                    <Plus size={17} />
                    Add to Cash Register
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Banknote size={21} />
                </div>

                <div>
                  <h2 className="font-black">Cash Register</h2>
                  <p className="text-xs text-slate-500">
                    Recent cash receipts and payments
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto p-6">
                <table className="min-w-[850px] w-full">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-4 py-4">Date</th>
                      <th className="px-4 py-4">Reference</th>
                      <th className="px-4 py-4">Description</th>
                      <th className="px-4 py-4">Type</th>
                      <th className="px-4 py-4 text-right">Amount</th>
                      <th className="px-4 py-4" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="text-sm">
                        <td className="px-4 py-4 font-semibold text-slate-600">
                          {transaction.date}
                        </td>

                        <td className="px-4 py-4 font-black text-slate-900">
                          {transaction.reference}
                        </td>

                        <td className="px-4 py-4 text-slate-600">
                          {transaction.description}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-black ${
                              transaction.type === "Receipt"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-right font-black">
                          {formatCurrency(transaction.amount)}
                        </td>

                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              removeTransaction(transaction.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <section className="overflow-hidden rounded-3xl bg-[#102844] text-white shadow-xl">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                  Cash Position
                </p>

                <h3 className="mt-2 text-lg font-black">{cashAccount}</h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine
                  label="Opening Balance"
                  value={formatCurrency(openingBalance)}
                />

                <SummaryLine
                  label="Cash Receipts"
                  value={formatCurrency(totalReceipts)}
                />

                <SummaryLine
                  label="Cash Payments"
                  value={formatCurrency(totalPayments)}
                />

                <SummaryLine
                  label="Current Balance"
                  value={formatCurrency(currentBalance)}
                />

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Projected Balance
                  </p>

                  <p
                    className={`mt-2 text-2xl font-black ${
                      projectedBalance < 0
                        ? "text-rose-300"
                        : "text-white"
                    }`}
                  >
                    {formatCurrency(projectedBalance)}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Cash Limit Control</h3>

              <div className="mt-5">
                <label className={labelClass}>Maximum Cash Limit</label>
                <input
                  type="number"
                  min="0"
                  value={cashLimit}
                  onChange={(event) =>
                    setCashLimit(Number(event.target.value))
                  }
                  className={inputClass}
                />

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#102844]"
                    style={{
                      width: `${Math.min(
                        (currentBalance / Math.max(cashLimit, 1)) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  {formatCurrency(currentBalance)} of{" "}
                  {formatCurrency(cashLimit)} cash limit used.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Approval Workflow</h3>

              <div className="mt-5 space-y-4">
                <WorkflowStep title="Cash Entry Created" complete />
                <WorkflowStep
                  title="Submitted for Approval"
                  complete={status !== "Draft"}
                />
                <WorkflowStep
                  title="Approved"
                  complete={
                    status === "Approved" || status === "Posted"
                  }
                />
                <WorkflowStep
                  title="Posted to Ledger"
                  complete={status === "Posted"}
                />
              </div>
            </section>
          </aside>
        </div>
      </form>
    </main>
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