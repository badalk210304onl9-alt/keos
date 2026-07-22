"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  FileCheck2,
  FileText,
  IndianRupee,
  Landmark,
  Paperclip,
  Plus,
  ReceiptText,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type ExpenseStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Rejected";

type UploadedDocument = {
  id: number;
  name: string;
  size: number;
  type: string;
};

type ExpenseForm = {
  title: string;
  vendor: string;
  employee: string;
  department: string;
  costCenter: string;
  category: string;
  expenseDate: string;
  paymentMethod: string;
  currency: string;
  projectCode: string;
  invoiceNumber: string;
  baseAmount: number;
  gstRate: number;
  tdsRate: number;
  reimbursable: boolean;
  businessPurpose: string;
  notes: string;
};

const departments = [
  "Finance",
  "Marketing",
  "Technology",
  "Operations",
  "Creative",
  "Procurement",
  "Administration",
  "Human Resources",
];

const costCenters = [
  "CC-FINANCE",
  "CC-MARKETING",
  "CC-TECHNOLOGY",
  "CC-OPERATIONS",
  "CC-CREATIVE",
  "CC-PROCUREMENT",
  "CC-ADMIN",
  "CC-HR",
];

const categories = [
  "Advertising & Marketing",
  "Business Travel",
  "Cloud Infrastructure",
  "Consulting & Professional Fees",
  "Employee Welfare",
  "Freight & Logistics",
  "Inventory Purchase",
  "Office Supplies",
  "Rent & Utilities",
  "Repairs & Maintenance",
  "Software Subscription",
  "Training & Development",
];

const paymentMethods = [
  "Corporate Card",
  "Bank Transfer",
  "UPI",
  "Cash",
  "Employee Paid",
  "Vendor Credit",
];

const vendors = [
  "Amazon Web Services",
  "Elite Packaging",
  "Google India",
  "Meta Platforms",
  "Premium Textiles",
  "Urban Logistics",
  "Vercel",
  "Other Vendor",
];

const initialForm: ExpenseForm = {
  title: "",
  vendor: "",
  employee: "Badal Kumar",
  department: "Finance",
  costCenter: "CC-FINANCE",
  category: "",
  expenseDate: new Date().toISOString().split("T")[0],
  paymentMethod: "Corporate Card",
  currency: "INR",
  projectCode: "",
  invoiceNumber: "",
  baseAmount: 0,
  gstRate: 18,
  tdsRate: 0,
  reimbursable: false,
  businessPurpose: "",
  notes: "",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function CreateExpensePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<ExpenseForm>(initialForm);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [status, setStatus] = useState<ExpenseStatus>("Draft");
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);

  const expenseReference = useMemo(
    () =>
      `EXP-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 99999) + 1,
      ).padStart(5, "0")}`,
    [],
  );

  const gstAmount = form.baseAmount * (form.gstRate / 100);
  const grossAmount = form.baseAmount + gstAmount;
  const tdsAmount = form.baseAmount * (form.tdsRate / 100);
  const netPayable = grossAmount - tdsAmount;

  const budgetLimit = 500000;
  const departmentUsedBudget = 318500;
  const projectedUsage = departmentUsedBudget + netPayable;
  const remainingBudget = Math.max(budgetLimit - projectedUsage, 0);
  const budgetUsage = Math.min((projectedUsage / budgetLimit) * 100, 100);

  const duplicateRisk =
    form.invoiceNumber.trim().length > 4 && form.baseAmount > 0 ? 8 : 0;

  const policyRisk =
    form.baseAmount >= 100000
      ? "High-value approval required"
      : form.baseAmount >= 50000
        ? "Finance manager review required"
        : "Within standard expense policy";

  const riskLevel =
    form.baseAmount >= 100000
      ? "High"
      : form.baseAmount >= 50000
        ? "Medium"
        : "Low";

  const updateForm = <K extends keyof ExpenseForm>(
    field: K,
    value: ExpenseForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSubmitted(false);
    setSavedDraft(false);
  };

  const addFiles = (files: FileList | File[]) => {
    const acceptedFiles = Array.from(files)
      .filter((file) => file.size <= 10 * 1024 * 1024)
      .map((file) => ({
        id: Date.now() + Math.floor(Math.random() * 10000),
        name: file.name,
        size: file.size,
        type: file.type || "Document",
      }));

    setDocuments((current) => [...current, ...acceptedFiles]);
  };

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeDocument = (id: number) => {
    setDocuments((current) =>
      current.filter((document) => document.id !== id),
    );
  };

  const saveDraft = () => {
    setStatus("Draft");
    setSavedDraft(true);
    setSubmitted(false);

    window.setTimeout(() => {
      setSavedDraft(false);
    }, 1800);
  };

  const submitExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("Pending Approval");
    setSubmitted(true);
    setSavedDraft(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setDocuments([]);
    setStatus("Draft");
    setSubmitted(false);
    setSavedDraft(false);
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
                Expense Management
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Record Business Expense
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Record, validate and submit business expenses for approval
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={[
                "rounded-full px-4 py-2 text-xs font-black",
                status === "Draft"
                  ? "bg-slate-100 text-slate-600"
                  : status === "Pending Approval"
                    ? "bg-amber-50 text-amber-700"
                    : status === "Approved"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {status}
            </span>

            <span className="rounded-full bg-[#10233b] px-4 py-2 text-xs font-black text-white">
              {expenseReference}
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
                Expense submitted successfully
              </p>

              <p className="mt-1 text-xs font-semibold text-emerald-700">
                The expense is now pending department and finance approval.
              </p>
            </div>
          </div>
        </section>
      )}

      <form
        onSubmit={submitExpense}
        className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Basic Information
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#10233b]">
                    Expense Identity
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Provide the primary expense and vendor information
                  </p>
                </div>

                <ReceiptText className="h-7 w-7 text-[#10233b]" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-black text-[#10233b]">
                    Expense Title
                  </label>

                  <input
                    required
                    value={form.title}
                    onChange={(event) =>
                      updateForm("title", event.target.value)
                    }
                    placeholder="Example: July Meta advertising campaign"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Vendor
                  </label>

                  <div className="relative mt-2">
                    <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <select
                      required
                      value={form.vendor}
                      onChange={(event) =>
                        updateForm("vendor", event.target.value)
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      <option value="">Select vendor</option>

                      {vendors.map((vendor) => (
                        <option key={vendor} value={vendor}>
                          {vendor}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Invoice / Bill Number
                  </label>

                  <div className="relative mt-2">
                    <FileText className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      required
                      value={form.invoiceNumber}
                      onChange={(event) =>
                        updateForm("invoiceNumber", event.target.value)
                      }
                      placeholder="Enter vendor invoice number"
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Expense Date
                  </label>

                  <div className="relative mt-2">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      required
                      type="date"
                      value={form.expenseDate}
                      onChange={(event) =>
                        updateForm("expenseDate", event.target.value)
                      }
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Expense Category
                  </label>

                  <select
                    required
                    value={form.category}
                    onChange={(event) =>
                      updateForm("category", event.target.value)
                    }
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Organizational Allocation
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#10233b]">
                    Department and Cost Center
                  </h2>
                </div>

                <Landmark className="h-7 w-7 text-[#10233b]" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Employee / Requester
                  </label>

                  <div className="relative mt-2">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      required
                      value={form.employee}
                      onChange={(event) =>
                        updateForm("employee", event.target.value)
                      }
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Department
                  </label>

                  <select
                    value={form.department}
                    onChange={(event) => {
                      const selectedDepartment = event.target.value;
                      const departmentIndex =
                        departments.indexOf(selectedDepartment);

                      updateForm("department", selectedDepartment);

                      if (departmentIndex >= 0) {
                        updateForm(
                          "costCenter",
                          costCenters[departmentIndex],
                        );
                      }
                    }}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Cost Center
                  </label>

                  <select
                    value={form.costCenter}
                    onChange={(event) =>
                      updateForm("costCenter", event.target.value)
                    }
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  >
                    {costCenters.map((costCenter) => (
                      <option key={costCenter} value={costCenter}>
                        {costCenter}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Project Code
                  </label>

                  <input
                    value={form.projectCode}
                    onChange={(event) =>
                      updateForm("projectCode", event.target.value)
                    }
                    placeholder="Optional project code"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Financial Details
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#10233b]">
                    Amount, Tax and Payment
                  </h2>
                </div>

                <CircleDollarSign className="h-7 w-7 text-[#10233b]" />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Base Amount
                  </label>

                  <div className="relative mt-2">
                    <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.baseAmount || ""}
                      onChange={(event) =>
                        updateForm(
                          "baseAmount",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0.00"
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Currency
                  </label>

                  <select
                    value={form.currency}
                    onChange={(event) =>
                      updateForm("currency", event.target.value)
                    }
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  >
                    <option value="INR">INR — Indian Rupee</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    GST Rate
                  </label>

                  <select
                    value={form.gstRate}
                    onChange={(event) =>
                      updateForm("gstRate", Number(event.target.value))
                    }
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  >
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18%</option>
                    <option value={28}>28%</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    TDS Rate
                  </label>

                  <select
                    value={form.tdsRate}
                    onChange={(event) =>
                      updateForm("tdsRate", Number(event.target.value))
                    }
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  >
                    <option value={0}>No TDS</option>
                    <option value={1}>1%</option>
                    <option value={2}>2%</option>
                    <option value={5}>5%</option>
                    <option value={10}>10%</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Payment Method
                  </label>

                  <div className="relative mt-2">
                    <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <select
                      value={form.paymentMethod}
                      onChange={(event) =>
                        updateForm("paymentMethod", event.target.value)
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                    >
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
                  <div>
                    <p className="text-sm font-black text-[#10233b]">
                      Employee Reimbursement
                    </p>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Mark if employee paid personally
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={form.reimbursable}
                    onChange={(event) =>
                      updateForm("reimbursable", event.target.checked)
                    }
                    className="h-5 w-5 accent-[#10233b]"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Supporting Evidence
                  </p>

                  <h2 className="mt-2 text-xl font-black text-[#10233b]">
                    Bills and Attachments
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Upload invoices, receipts or supporting documents
                  </p>
                </div>

                <Paperclip className="h-7 w-7 text-[#10233b]" />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileSelection}
                className="hidden"
              />

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={[
                  "mt-6 flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed px-6 py-10 text-center transition",
                  isDragging
                    ? "border-[#10233b] bg-slate-100"
                    : "border-slate-300 bg-slate-50",
                ].join(" ")}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#10233b] shadow-sm">
                  <Upload className="h-6 w-6" />
                </div>

                <p className="mt-4 text-sm font-black text-[#10233b]">
                  Drop bills and receipts here
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-500">
                  PDF, JPG, PNG, DOC or DOCX — maximum 10 MB each
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-[#10233b] px-4 py-2.5 text-xs font-black text-white"
                >
                  <Plus className="h-4 w-4" />
                  Browse Documents
                </button>
              </div>

              {documents.length > 0 && (
                <div className="mt-5 space-y-3">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FileCheck2 className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-[#10233b]">
                            {document.name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {formatFileSize(document.size)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeDocument(document.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Business Justification
              </p>

              <h2 className="mt-2 text-xl font-black text-[#10233b]">
                Purpose and Internal Notes
              </h2>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Business Purpose
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={form.businessPurpose}
                    onChange={(event) =>
                      updateForm("businessPurpose", event.target.value)
                    }
                    placeholder="Explain why this expense was incurred and how it supports business operations..."
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-[#10233b]">
                    Internal Notes
                  </label>

                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(event) =>
                      updateForm("notes", event.target.value)
                    }
                    placeholder="Add approval instructions or internal comments..."
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5 2xl:sticky 2xl:top-6 2xl:h-fit">
            <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.20)] sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
                Expense Summary
              </p>

              <h2 className="mt-2 text-xl font-black">
                Financial Calculation
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    Base Amount
                  </span>

                  <span className="text-sm font-black">
                    {formatCurrency(form.baseAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    GST ({form.gstRate}%)
                  </span>

                  <span className="text-sm font-black">
                    {formatCurrency(gstAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    Gross Amount
                  </span>

                  <span className="text-sm font-black">
                    {formatCurrency(grossAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    TDS ({form.tdsRate}%)
                  </span>

                  <span className="text-sm font-black text-red-300">
                    -{formatCurrency(tdsAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold text-slate-300">
                  Net Payable
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(netPayable)}
                </p>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    AI Control
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Expense Intelligence
                  </h2>
                </div>

                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-sm font-black text-emerald-700">
                      Category validation
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-emerald-600">
                      {form.category
                        ? `${form.category} selected for accounting allocation.`
                        : "Select an expense category for AI validation."}
                    </p>
                  </div>
                </div>

                <div
                  className={[
                    "flex items-start gap-3 rounded-2xl p-4",
                    duplicateRisk > 20
                      ? "bg-red-50"
                      : "bg-emerald-50",
                  ].join(" ")}
                >
                  <FileCheck2
                    className={[
                      "mt-0.5 h-5 w-5 shrink-0",
                      duplicateRisk > 20
                        ? "text-red-600"
                        : "text-emerald-600",
                    ].join(" ")}
                  />

                  <div>
                    <p
                      className={[
                        "text-sm font-black",
                        duplicateRisk > 20
                          ? "text-red-700"
                          : "text-emerald-700",
                      ].join(" ")}
                    >
                      Duplicate probability: {duplicateRisk}%
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      No significant duplicate invoice match detected.
                    </p>
                  </div>
                </div>

                <div
                  className={[
                    "flex items-start gap-3 rounded-2xl p-4",
                    riskLevel === "High"
                      ? "bg-red-50"
                      : riskLevel === "Medium"
                        ? "bg-amber-50"
                        : "bg-emerald-50",
                  ].join(" ")}
                >
                  {riskLevel === "Low" ? (
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertTriangle
                      className={[
                        "mt-0.5 h-5 w-5 shrink-0",
                        riskLevel === "High"
                          ? "text-red-600"
                          : "text-amber-600",
                      ].join(" ")}
                    />
                  )}

                  <div>
                    <p
                      className={[
                        "text-sm font-black",
                        riskLevel === "High"
                          ? "text-red-700"
                          : riskLevel === "Medium"
                            ? "text-amber-700"
                            : "text-emerald-700",
                      ].join(" ")}
                    >
                      {riskLevel} approval risk
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      {policyRisk}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Budget Control
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Department Budget
                  </h2>
                </div>

                <WalletCards className="h-6 w-6 text-[#10233b]" />
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Remaining After Expense
                    </p>

                    <p className="mt-2 text-2xl font-black text-[#10233b]">
                      {formatCurrency(remainingBudget)}
                    </p>
                  </div>

                  <p className="text-xs font-black text-slate-500">
                    {budgetUsage.toFixed(1)}% used
                  </p>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={[
                      "h-full rounded-full",
                      budgetUsage >= 95
                        ? "bg-red-500"
                        : budgetUsage >= 80
                          ? "bg-amber-500"
                          : "bg-emerald-500",
                    ].join(" ")}
                    style={{ width: `${budgetUsage}%` }}
                  />
                </div>
              </div>

              {projectedUsage > budgetLimit && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-red-50 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <p className="text-xs font-semibold leading-5 text-red-700">
                    This expense exceeds the available department budget and
                    will require exceptional approval.
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Approval Route
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Workflow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  {
                    number: 1,
                    title: "Department Review",
                    approver: "Department Manager",
                  },
                  {
                    number: 2,
                    title: "Finance Validation",
                    approver: "Finance Manager",
                  },
                  {
                    number: 3,
                    title: "Founder Approval",
                    approver:
                      form.baseAmount >= 100000
                        ? "Required"
                        : "Not required",
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
                        {step.approver}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <section className="sticky bottom-0 z-20 mt-5 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_-14px_45px_rgba(15,35,59,0.10)] backdrop-blur-xl">
          {savedDraft ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              Expense draft saved successfully
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={resetForm}
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
                  Submit for Approval
                </button>
              </div>
            </div>
          )}
        </section>
      </form>
    </main>
  );
}