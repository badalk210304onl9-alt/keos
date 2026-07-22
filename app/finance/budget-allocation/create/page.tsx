"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  IndianRupee,
  Landmark,
  Lock,
  Plus,
  RotateCcw,
  Save,
  Send,
  Trash2,
  Unlock,
  UserRound,
  WalletCards,
} from "lucide-react";

type BudgetStatus =
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Frozen"
  | "Rejected";

type MonthlyBudget = {
  id: number;
  month: string;
  allocated: number;
  actual: number;
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

const initialMonthlyBudgets: MonthlyBudget[] = [
  { id: 1, month: "April", allocated: 800000, actual: 650000 },
  { id: 2, month: "May", allocated: 850000, actual: 790000 },
  { id: 3, month: "June", allocated: 900000, actual: 920000 },
  { id: 4, month: "July", allocated: 950000, actual: 760000 },
  { id: 5, month: "August", allocated: 950000, actual: 0 },
  { id: 6, month: "September", allocated: 1000000, actual: 0 },
  { id: 7, month: "October", allocated: 1000000, actual: 0 },
  { id: 8, month: "November", allocated: 900000, actual: 0 },
  { id: 9, month: "December", allocated: 850000, actual: 0 },
  { id: 10, month: "January", allocated: 900000, actual: 0 },
  { id: 11, month: "February", allocated: 900000, actual: 0 },
  { id: 12, month: "March", allocated: 1000000, actual: 0 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CreateBudgetAllocationPage() {
  const [status, setStatus] = useState<BudgetStatus>("Draft");
  const [message, setMessage] = useState("");

  const [budgetNumber] = useState("BUD-2026-00018");
  const [financialYear, setFinancialYear] = useState("FY 2026–27");
  const [budgetName, setBudgetName] = useState(
    "Marketing Department Annual Budget",
  );
  const [budgetType, setBudgetType] = useState("Department Budget");
  const [company, setCompany] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [branch, setBranch] = useState("Varanasi Head Office");
  const [department, setDepartment] = useState("Marketing");
  const [costCenter, setCostCenter] = useState("CC-MKT-001");
  const [project, setProject] = useState("KRVE Brand Expansion");
  const [budgetOwner, setBudgetOwner] = useState("Badal Kumar");
  const [currency, setCurrency] = useState("INR");
  const [annualBudget, setAnnualBudget] = useState(11000000);
  const [contingency, setContingency] = useState(500000);
  const [minimumApprovalAmount, setMinimumApprovalAmount] =
    useState(100000);
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [notes, setNotes] = useState("");
  const [monthlyBudgets, setMonthlyBudgets] =
    useState<MonthlyBudget[]>(initialMonthlyBudgets);

  const totalAllocated = useMemo(
    () =>
      monthlyBudgets.reduce(
        (total, item) => total + Number(item.allocated || 0),
        0,
      ),
    [monthlyBudgets],
  );

  const totalActual = useMemo(
    () =>
      monthlyBudgets.reduce(
        (total, item) => total + Number(item.actual || 0),
        0,
      ),
    [monthlyBudgets],
  );

  const totalBudget = annualBudget + contingency;
  const remainingBudget = totalBudget - totalActual;
  const unallocatedBudget = totalBudget - totalAllocated;

  const utilisation =
    totalBudget > 0 ? (totalActual / totalBudget) * 100 : 0;

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const updateMonthlyBudget = (
    id: number,
    field: "allocated" | "actual",
    value: number,
  ) => {
    setMonthlyBudgets((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: Math.max(0, Number(value || 0)),
            }
          : item,
      ),
    );
  };

  const distributeAutomatically = () => {
    const monthlyAmount = Math.floor(totalBudget / 12);
    let assigned = 0;

    setMonthlyBudgets((current) =>
      current.map((item, index) => {
        const allocation =
          index === current.length - 1
            ? totalBudget - assigned
            : monthlyAmount;

        assigned += allocation;

        return {
          ...item,
          allocated: allocation,
        };
      }),
    );

    showMessage("Budget distributed equally across all months.");
  };

  const clearAllocation = () => {
    setMonthlyBudgets((current) =>
      current.map((item) => ({
        ...item,
        allocated: 0,
      })),
    );

    showMessage("Monthly allocation cleared.");
  };

  const validateBudget = () => {
    if (!budgetName.trim()) {
      showMessage("Please enter the budget name.");
      return false;
    }

    if (annualBudget <= 0) {
      showMessage("Annual budget must be greater than zero.");
      return false;
    }

    if (totalAllocated > totalBudget) {
      showMessage("Monthly allocation exceeds total available budget.");
      return false;
    }

    if (!department) {
      showMessage("Please select a department.");
      return false;
    }

    return true;
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("Budget allocation saved as draft.");
  };

  const submitBudget = () => {
    if (!validateBudget()) return;

    setStatus("Submitted");
    showMessage("Budget submitted for approval.");
  };

  const approveBudget = () => {
    if (!validateBudget()) return;

    setStatus("Approved");
    showMessage("Budget allocation approved.");
  };

  const freezeBudget = () => {
    if (!validateBudget()) return;

    setStatus("Frozen");
    showMessage("Budget allocation frozen successfully.");
  };

  const unlockBudget = () => {
    setStatus("Approved");
    showMessage("Budget allocation unlocked.");
  };

  const rejectBudget = () => {
    setStatus("Rejected");
    showMessage("Budget allocation rejected.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitBudget();
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-black tracking-tight">
                    Create Budget Allocation
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                      status === "Frozen"
                        ? "bg-slate-900 text-white"
                        : status === "Approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : status === "Submitted"
                            ? "bg-blue-100 text-blue-700"
                            : status === "Rejected"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Allocate and monitor departmental financial limits.
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
                onClick={approveBudget}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white"
              >
                <BadgeCheck size={17} />
                Approve
              </button>

              {status === "Frozen" ? (
                <button
                  type="button"
                  onClick={unlockBudget}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white"
                >
                  <Unlock size={17} />
                  Unlock
                </button>
              ) : (
                <button
                  type="button"
                  onClick={freezeBudget}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-bold text-white"
                >
                  <Lock size={17} />
                  Freeze
                </button>
              )}
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
                    <h2 className="font-black">Budget Information</h2>
                    <p className="text-xs text-slate-500">
                      Financial year, budget type and ownership details
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Budget Number
                  </p>

                  <p className="mt-1 text-sm font-black">{budgetNumber}</p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Financial Year</label>

                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={financialYear}
                      onChange={(event) =>
                        setFinancialYear(event.target.value)
                      }
                      className={`${inputClass} appearance-none pl-10 pr-10`}
                    >
                      <option>FY 2026–27</option>
                      <option>FY 2027–28</option>
                      <option>FY 2028–29</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Budget Type</label>

                  <select
                    value={budgetType}
                    onChange={(event) => setBudgetType(event.target.value)}
                    className={inputClass}
                  >
                    <option>Department Budget</option>
                    <option>Project Budget</option>
                    <option>Capital Expenditure Budget</option>
                    <option>Operating Budget</option>
                    <option>Marketing Budget</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Currency</label>

                  <select
                    value={currency}
                    onChange={(event) => setCurrency(event.target.value)}
                    className={inputClass}
                  >
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                  <label className={labelClass}>Budget Name</label>

                  <input
                    value={budgetName}
                    onChange={(event) => setBudgetName(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Company</label>

                  <div className="relative">
                    <Building2
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      className={`${inputClass} pl-10`}
                    >
                      <option>KRVE Fashion Studio Private Limited</option>
                      <option>KRVE Technologies Private Limited</option>
                    </select>
                  </div>
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
                  <Landmark size={21} />
                </div>

                <div>
                  <h2 className="font-black">Allocation Ownership</h2>
                  <p className="text-xs text-slate-500">
                    Department, cost center and project assignment
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Department</label>

                  <select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    className={inputClass}
                  >
                    <option>Marketing</option>
                    <option>Finance</option>
                    <option>Human Resources</option>
                    <option>Operations</option>
                    <option>Technology</option>
                    <option>Product</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Cost Center</label>

                  <select
                    value={costCenter}
                    onChange={(event) => setCostCenter(event.target.value)}
                    className={inputClass}
                  >
                    <option>CC-MKT-001</option>
                    <option>CC-FIN-001</option>
                    <option>CC-HR-001</option>
                    <option>CC-OPS-001</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Project</label>

                  <select
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                    className={inputClass}
                  >
                    <option>KRVE Brand Expansion</option>
                    <option>AI Virtual Studio</option>
                    <option>Retail Store Launch</option>
                    <option>Mobile Application</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Budget Owner</label>

                  <div className="relative">
                    <UserRound
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={budgetOwner}
                      onChange={(event) =>
                        setBudgetOwner(event.target.value)
                      }
                      className={`${inputClass} pl-10`}
                    >
                      <option>Badal Kumar</option>
                      <option>Finance Manager</option>
                      <option>Marketing Head</option>
                      <option>Operations Director</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Minimum Approval Amount
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={minimumApprovalAmount}
                    onChange={(event) =>
                      setMinimumApprovalAmount(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <IndianRupee size={21} />
                </div>

                <div>
                  <h2 className="font-black">Budget Amount</h2>
                  <p className="text-xs text-slate-500">
                    Set annual allocation and contingency reserve
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Annual Budget</label>

                  <input
                    type="number"
                    min="0"
                    value={annualBudget}
                    onChange={(event) =>
                      setAnnualBudget(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Contingency Reserve
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={contingency}
                    onChange={(event) =>
                      setContingency(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={approvalRequired}
                    onChange={(event) =>
                      setApprovalRequired(event.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Approval required for budget consumption
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Transactions above the approval limit must be reviewed.
                    </p>
                  </div>
                </label>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <CalendarDays size={21} />
                  </div>

                  <div>
                    <h2 className="font-black">Monthly Distribution</h2>
                    <p className="text-xs text-slate-500">
                      Allocate and compare monthly budget consumption
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={distributeAutomatically}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#102844] px-4 text-xs font-bold text-white"
                  >
                    <Plus size={15} />
                    Auto Distribute
                  </button>

                  <button
                    type="button"
                    onClick={clearAllocation}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600"
                  >
                    <RotateCcw size={15} />
                    Clear
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto p-6">
                <table className="min-w-[850px] w-full">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-4 py-4">Month</th>
                      <th className="px-4 py-4 text-right">
                        Allocated Budget
                      </th>
                      <th className="px-4 py-4 text-right">
                        Actual Spending
                      </th>
                      <th className="px-4 py-4 text-right">Variance</th>
                      <th className="px-4 py-4 text-right">Utilisation</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {monthlyBudgets.map((item) => {
                      const variance = item.allocated - item.actual;
                      const percentage =
                        item.allocated > 0
                          ? (item.actual / item.allocated) * 100
                          : 0;

                      return (
                        <tr key={item.id}>
                          <td className="px-4 py-4 text-sm font-black text-slate-900">
                            {item.month}
                          </td>

                          <td className="px-4 py-4">
                            <input
                              type="number"
                              min="0"
                              value={item.allocated}
                              onChange={(event) =>
                                updateMonthlyBudget(
                                  item.id,
                                  "allocated",
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-40 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none"
                            />
                          </td>

                          <td className="px-4 py-4">
                            <input
                              type="number"
                              min="0"
                              value={item.actual}
                              onChange={(event) =>
                                updateMonthlyBudget(
                                  item.id,
                                  "actual",
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-40 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none"
                            />
                          </td>

                          <td
                            className={`px-4 py-4 text-right text-sm font-black ${
                              variance >= 0
                                ? "text-emerald-700"
                                : "text-rose-700"
                            }`}
                          >
                            {formatCurrency(variance)}
                          </td>

                          <td className="px-4 py-4 text-right text-sm font-black text-slate-700">
                            {percentage.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className={labelClass}>Budget Notes</label>

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add allocation assumptions, restrictions or approval notes"
                className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <section className="overflow-hidden rounded-3xl bg-[#102844] text-white shadow-xl">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                  Budget Summary
                </p>

                <h3 className="mt-2 text-lg font-black">{budgetNumber}</h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine
                  label="Department"
                  value={department}
                />

                <SummaryLine
                  label="Annual Budget"
                  value={formatCurrency(annualBudget)}
                />

                <SummaryLine
                  label="Contingency"
                  value={formatCurrency(contingency)}
                />

                <SummaryLine
                  label="Total Allocated"
                  value={formatCurrency(totalAllocated)}
                />

                <SummaryLine
                  label="Actual Spending"
                  value={formatCurrency(totalActual)}
                />

                <SummaryLine
                  label="Unallocated"
                  value={formatCurrency(unallocatedBudget)}
                />

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Remaining Budget
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    {formatCurrency(remainingBudget)}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Budget Utilisation</h3>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${
                    utilisation > 90
                      ? "bg-rose-600"
                      : utilisation > 70
                        ? "bg-amber-500"
                        : "bg-emerald-600"
                  }`}
                  style={{
                    width: `${Math.min(utilisation, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-4 text-2xl font-black text-slate-950">
                {utilisation.toFixed(1)}%
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Total approved budget consumed.
              </p>
            </section>

            {unallocatedBudget < 0 && (
              <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
                <div className="flex gap-3">
                  <AlertTriangle
                    size={20}
                    className="shrink-0 text-rose-600"
                  />

                  <div>
                    <p className="text-sm font-black text-rose-900">
                      Budget exceeded
                    </p>

                    <p className="mt-1 text-xs leading-5 text-rose-700">
                      Monthly allocations exceed the approved total budget.
                    </p>
                  </div>
                </div>
              </section>
            )}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Approval Workflow</h3>

              <div className="mt-5 space-y-4">
                <WorkflowStep title="Budget Created" complete />

                <WorkflowStep
                  title="Submitted for Approval"
                  complete={status !== "Draft"}
                />

                <WorkflowStep
                  title="Budget Approved"
                  complete={
                    status === "Approved" || status === "Frozen"
                  }
                />

                <WorkflowStep
                  title="Budget Frozen"
                  complete={status === "Frozen"}
                />
              </div>

              <button
                type="button"
                onClick={rejectBudget}
                className="mt-5 flex h-10 w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700"
              >
                Reject Budget
              </button>
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
      <span className="text-xs font-semibold text-blue-200">{label}</span>

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