"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Scale,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Copy,
  File,
  FileSpreadsheet,
  FileText,
  GripVertical,
  IndianRupee,
  Landmark,
  Layers3,
  Loader2,
  LockKeyhole,
  MoreHorizontal,
  Paperclip,
  Plus,
  ReceiptText,
  RefreshCw,
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

type EntryType =
  | "Standard Journal"
  | "Adjustment Journal"
  | "Accrual Journal"
  | "Reclassification Journal"
  | "Opening Balance Journal";

type JournalStatus = "Draft" | "Submitted";

type AccountType =
  | "Asset"
  | "Liability"
  | "Equity"
  | "Revenue"
  | "Expense";

type JournalLine = {
  id: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType | "";
  description: string;
  debit: string;
  credit: string;
  department: string;
  costCenter: string;
  project: string;
  taxCode: string;
};

type AttachmentItem = {
  id: string;
  name: string;
  size: number;
  type: string;
};

type NotificationState = {
  type: "success" | "error";
  title: string;
  message: string;
} | null;

const accounts = [
  {
    code: "110101",
    name: "HDFC Bank Current Account",
    type: "Asset" as AccountType,
  },
  {
    code: "110102",
    name: "ICICI Bank Current Account",
    type: "Asset" as AccountType,
  },
  {
    code: "120101",
    name: "Trade Receivables",
    type: "Asset" as AccountType,
  },
  {
    code: "130101",
    name: "Inventory – Finished Goods",
    type: "Asset" as AccountType,
  },
  {
    code: "140101",
    name: "Input GST Receivable",
    type: "Asset" as AccountType,
  },
  {
    code: "150101",
    name: "Office Equipment",
    type: "Asset" as AccountType,
  },
  {
    code: "210101",
    name: "Trade Payables",
    type: "Liability" as AccountType,
  },
  {
    code: "220101",
    name: "Salary Payable",
    type: "Liability" as AccountType,
  },
  {
    code: "230101",
    name: "Output GST Payable",
    type: "Liability" as AccountType,
  },
  {
    code: "310101",
    name: "Founder Capital",
    type: "Equity" as AccountType,
  },
  {
    code: "410101",
    name: "Product Sales Revenue",
    type: "Revenue" as AccountType,
  },
  {
    code: "410201",
    name: "Service Revenue",
    type: "Revenue" as AccountType,
  },
  {
    code: "510101",
    name: "Cost of Goods Sold",
    type: "Expense" as AccountType,
  },
  {
    code: "510201",
    name: "Advertising and Marketing",
    type: "Expense" as AccountType,
  },
  {
    code: "510301",
    name: "Technology and Software",
    type: "Expense" as AccountType,
  },
  {
    code: "510401",
    name: "Rent and Administration",
    type: "Expense" as AccountType,
  },
  {
    code: "510501",
    name: "Logistics and Freight",
    type: "Expense" as AccountType,
  },
  {
    code: "520101",
    name: "Employee Cost",
    type: "Expense" as AccountType,
  },
];

const departments = [
  "Finance",
  "Sales",
  "Marketing",
  "Operations",
  "Technology",
  "Human Resources",
  "Administration",
  "Procurement",
  "Logistics",
];

const costCenters = [
  "CC-FINANCE",
  "CC-SALES",
  "CC-MARKETING",
  "CC-OPERATIONS",
  "CC-TECHNOLOGY",
  "CC-HR",
  "CC-ADMIN",
  "CC-PROCUREMENT",
  "CC-LOGISTICS",
  "CC-E-COMMERCE",
  "CC-TAXATION",
];

const projects = [
  "No Project",
  "KRVE Website",
  "KRVE AI Studio",
  "KEOS Development",
  "Luxury Collection 2026",
  "Retail Expansion",
  "Brand Campaign 2026",
];

const taxCodes = [
  "No Tax",
  "GST 0%",
  "GST 5%",
  "GST 12%",
  "GST 18%",
  "GST 28%",
  "TDS 1%",
  "TDS 2%",
  "TDS 10%",
];

const journalTemplates = [
  {
    id: "payroll",
    name: "Monthly Payroll Accrual",
    description: "Employee cost and salary payable",
  },
  {
    id: "rent",
    name: "Monthly Rent Expense",
    description: "Rent expense and bank payable",
  },
  {
    id: "marketing",
    name: "Marketing Expense",
    description: "Campaign expense and vendor payable",
  },
  {
    id: "sales",
    name: "Sales Recognition",
    description: "Receivable and sales revenue",
  },
];

const createEmptyLine = (): JournalLine => ({
  id: crypto.randomUUID(),
  accountCode: "",
  accountName: "",
  accountType: "",
  description: "",
  debit: "",
  credit: "",
  department: "",
  costCenter: "",
  project: "No Project",
  taxCode: "No Tax",
});

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const parseAmount = (value: string) => {
  const amount = Number(value.replace(/,/g, ""));
  return Number.isFinite(amount) ? amount : 0;
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const today = new Date().toISOString().split("T")[0];

export default function CreateJournalEntryPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [journalNumber] = useState("JV-2026-00482");
  const [entryDate, setEntryDate] = useState(today);
  const [postingDate, setPostingDate] = useState(today);
  const [entryType, setEntryType] =
    useState<EntryType>("Standard Journal");
  const [reference, setReference] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState("1.0000");
  const [company, setCompany] = useState("KRVE Fashion Studio");
  const [branch, setBranch] = useState("Corporate Office");
  const [fiscalPeriod, setFiscalPeriod] = useState("July 2026");
  const [narration, setNarration] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [recurringJournal, setRecurringJournal] = useState(false);
  const [recurringFrequency, setRecurringFrequency] =
    useState("Monthly");

  const [lines, setLines] = useState<JournalLine[]>([
    createEmptyLine(),
    createEmptyLine(),
  ]);

  const [attachments, setAttachments] = useState<AttachmentItem[]>(
    [],
  );

  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<JournalStatus>("Draft");
  const [notification, setNotification] =
    useState<NotificationState>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const totalDebit = useMemo(
    () =>
      lines.reduce(
        (total, line) => total + parseAmount(line.debit),
        0,
      ),
    [lines],
  );

  const totalCredit = useMemo(
    () =>
      lines.reduce(
        (total, line) => total + parseAmount(line.credit),
        0,
      ),
    [lines],
  );

  const difference = Math.abs(totalDebit - totalCredit);

  const isBalanced =
    totalDebit > 0 &&
    totalCredit > 0 &&
    Math.abs(totalDebit - totalCredit) < 0.01;

  const completedLines = lines.filter(
    (line) =>
      line.accountCode &&
      (parseAmount(line.debit) > 0 ||
        parseAmount(line.credit) > 0),
  ).length;

  const validationIssues = useMemo(() => {
    const issues: string[] = [];

    if (!entryDate) {
      issues.push("Journal entry date is required.");
    }

    if (!postingDate) {
      issues.push("Posting date is required.");
    }

    if (!reference.trim()) {
      issues.push("Transaction reference is required.");
    }

    if (!narration.trim()) {
      issues.push("Journal narration is required.");
    }

    if (completedLines < 2) {
      issues.push("At least two valid journal lines are required.");
    }

    lines.forEach((line, index) => {
      const debit = parseAmount(line.debit);
      const credit = parseAmount(line.credit);
      const hasAnyData =
        line.accountCode ||
        line.description ||
        debit > 0 ||
        credit > 0;

      if (!hasAnyData) {
        return;
      }

      if (!line.accountCode) {
        issues.push(`Line ${index + 1}: account is required.`);
      }

      if (debit <= 0 && credit <= 0) {
        issues.push(
          `Line ${index + 1}: enter a debit or credit amount.`,
        );
      }

      if (debit > 0 && credit > 0) {
        issues.push(
          `Line ${index + 1}: debit and credit cannot both contain values.`,
        );
      }

      if (!line.department) {
        issues.push(`Line ${index + 1}: department is required.`);
      }

      if (!line.costCenter) {
        issues.push(`Line ${index + 1}: cost center is required.`);
      }
    });

    if (!isBalanced) {
      issues.push("Total debit and total credit must be equal.");
    }

    return issues;
  }, [
    completedLines,
    entryDate,
    isBalanced,
    lines,
    narration,
    postingDate,
    reference,
  ]);

  const updateLine = (
    lineId: string,
    field: keyof JournalLine,
    value: string,
  ) => {
    setLines((currentLines) =>
      currentLines.map((line) => {
        if (line.id !== lineId) {
          return line;
        }

        const updatedLine = {
          ...line,
          [field]: value,
        };

        if (field === "accountCode") {
          const selectedAccount = accounts.find(
            (account) => account.code === value,
          );

          updatedLine.accountName = selectedAccount?.name ?? "";
          updatedLine.accountType = selectedAccount?.type ?? "";
        }

        if (field === "debit" && parseAmount(value) > 0) {
          updatedLine.credit = "";
        }

        if (field === "credit" && parseAmount(value) > 0) {
          updatedLine.debit = "";
        }

        return updatedLine;
      }),
    );
  };

  const addLine = () => {
    setLines((currentLines) => [
      ...currentLines,
      createEmptyLine(),
    ]);
  };

  const duplicateLine = (lineId: string) => {
    const lineToCopy = lines.find((line) => line.id === lineId);

    if (!lineToCopy) {
      return;
    }

    const copiedLine: JournalLine = {
      ...lineToCopy,
      id: crypto.randomUUID(),
    };

    const currentIndex = lines.findIndex(
      (line) => line.id === lineId,
    );

    setLines((currentLines) => [
      ...currentLines.slice(0, currentIndex + 1),
      copiedLine,
      ...currentLines.slice(currentIndex + 1),
    ]);
  };

  const removeLine = (lineId: string) => {
    if (lines.length <= 2) {
      showNotification(
        "error",
        "Unable to remove line",
        "A journal entry must contain at least two lines.",
      );
      return;
    }

    setLines((currentLines) =>
      currentLines.filter((line) => line.id !== lineId),
    );
  };

  const clearAllLines = () => {
    setLines([createEmptyLine(), createEmptyLine()]);
  };

  const autoBalanceLastLine = () => {
    if (lines.length === 0) {
      return;
    }

    const amountDifference = totalDebit - totalCredit;

    if (Math.abs(amountDifference) < 0.01) {
      showNotification(
        "success",
        "Journal already balanced",
        "Total debit and total credit are already equal.",
      );
      return;
    }

    const lastLineId = lines[lines.length - 1].id;

    setLines((currentLines) =>
      currentLines.map((line) => {
        if (line.id !== lastLineId) {
          return line;
        }

        if (amountDifference > 0) {
          return {
            ...line,
            debit: "",
            credit: amountDifference.toFixed(2),
          };
        }

        return {
          ...line,
          debit: Math.abs(amountDifference).toFixed(2),
          credit: "",
        };
      }),
    );
  };

  const applyTemplate = (templateId: string) => {
    if (templateId === "payroll") {
      setEntryType("Accrual Journal");
      setReference("PAYROLL-JUL-2026");
      setNarration(
        "Monthly employee payroll accrual for July 2026.",
      );
      setLines([
        {
          ...createEmptyLine(),
          accountCode: "520101",
          accountName: "Employee Cost",
          accountType: "Expense",
          description: "Monthly employee payroll expense",
          debit: "1540000",
          department: "Human Resources",
          costCenter: "CC-HR",
        },
        {
          ...createEmptyLine(),
          accountCode: "220101",
          accountName: "Salary Payable",
          accountType: "Liability",
          description: "Salary payable provision",
          credit: "1540000",
          department: "Human Resources",
          costCenter: "CC-HR",
        },
      ]);
    }

    if (templateId === "rent") {
      setEntryType("Standard Journal");
      setReference("RENT-JUL-2026");
      setNarration(
        "Corporate office rent expense for July 2026.",
      );
      setLines([
        {
          ...createEmptyLine(),
          accountCode: "510401",
          accountName: "Rent and Administration",
          accountType: "Expense",
          description: "Monthly corporate office rent",
          debit: "325000",
          department: "Administration",
          costCenter: "CC-ADMIN",
        },
        {
          ...createEmptyLine(),
          accountCode: "110101",
          accountName: "HDFC Bank Current Account",
          accountType: "Asset",
          description: "Rent payment from HDFC bank",
          credit: "325000",
          department: "Finance",
          costCenter: "CC-FINANCE",
        },
      ]);
    }

    if (templateId === "marketing") {
      setEntryType("Standard Journal");
      setReference("META-JUL-8821");
      setNarration(
        "Digital marketing campaign expense for July 2026.",
      );
      setLines([
        {
          ...createEmptyLine(),
          accountCode: "510201",
          accountName: "Advertising and Marketing",
          accountType: "Expense",
          description: "Meta advertising campaign expense",
          debit: "225000",
          department: "Marketing",
          costCenter: "CC-MARKETING",
          project: "Brand Campaign 2026",
        },
        {
          ...createEmptyLine(),
          accountCode: "210101",
          accountName: "Trade Payables",
          accountType: "Liability",
          description: "Amount payable to advertising vendor",
          credit: "225000",
          department: "Finance",
          costCenter: "CC-FINANCE",
          project: "Brand Campaign 2026",
        },
      ]);
    }

    if (templateId === "sales") {
      setEntryType("Standard Journal");
      setReference("INV-2026-1143");
      setNarration(
        "Product sales revenue recognized against customer invoice.",
      );
      setLines([
        {
          ...createEmptyLine(),
          accountCode: "120101",
          accountName: "Trade Receivables",
          accountType: "Asset",
          description: "Customer receivable recognized",
          debit: "485000",
          department: "Sales",
          costCenter: "CC-SALES",
        },
        {
          ...createEmptyLine(),
          accountCode: "410101",
          accountName: "Product Sales Revenue",
          accountType: "Revenue",
          description: "Product sales revenue recognized",
          credit: "485000",
          department: "Sales",
          costCenter: "CC-E-COMMERCE",
        },
      ]);
    }

    setShowTemplates(false);

    showNotification(
      "success",
      "Template applied",
      "Journal lines and transaction details have been populated.",
    );
  };

  const showNotification = (
    type: "success" | "error",
    title: string,
    message: string,
  ) => {
    setNotification({
      type,
      title,
      message,
    });

    window.setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleFiles = (files: FileList | File[]) => {
    const selectedFiles = Array.from(files);

    const validFiles = selectedFiles.filter((file) => {
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      return allowedTypes.includes(file.type) && file.size <= 10_000_000;
    });

    const newAttachments: AttachmentItem[] = validFiles.map(
      (file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
      }),
    );

    setAttachments((current) => [
      ...current,
      ...newAttachments,
    ]);

    if (validFiles.length !== selectedFiles.length) {
      showNotification(
        "error",
        "Some files were rejected",
        "Only PDF, JPG, PNG and Excel files up to 10 MB are supported.",
      );
    }
  };

  const handleFileInput = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachments((current) =>
      current.filter(
        (attachment) => attachment.id !== attachmentId,
      ),
    );
  };

  const buildJournalPayload = () => ({
    journalNumber,
    entryDate,
    postingDate,
    entryType,
    reference,
    currency,
    exchangeRate,
    company,
    branch,
    fiscalPeriod,
    narration,
    internalNotes,
    approvalRequired,
    recurringJournal,
    recurringFrequency:
      recurringJournal ? recurringFrequency : null,
    status,
    totalDebit,
    totalCredit,
    lines,
    attachments,
    createdAt: new Date().toISOString(),
  });

  const saveDraft = async () => {
    setIsSaving(true);

    await new Promise((resolve) =>
      window.setTimeout(resolve, 900),
    );

    const payload = {
      ...buildJournalPayload(),
      status: "Draft",
    };

    localStorage.setItem(
      `keos-journal-${journalNumber}`,
      JSON.stringify(payload),
    );

    setStatus("Draft");
    setIsSaving(false);

    showNotification(
      "success",
      "Draft saved",
      `${journalNumber} has been saved locally as a draft.`,
    );
  };

  const submitJournal = async () => {
    if (validationIssues.length > 0) {
      showNotification(
        "error",
        "Journal validation failed",
        validationIssues[0],
      );
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) =>
      window.setTimeout(resolve, 1200),
    );

    const payload = {
      ...buildJournalPayload(),
      status: "Submitted",
    };

    localStorage.setItem(
      `keos-journal-${journalNumber}`,
      JSON.stringify(payload),
    );

    setStatus("Submitted");
    setIsSubmitting(false);

    showNotification(
      "success",
      approvalRequired
        ? "Journal submitted for approval"
        : "Journal posted successfully",
      approvalRequired
        ? `${journalNumber} has been routed to the finance approval queue.`
        : `${journalNumber} has been recorded in the general ledger.`,
    );
  };

  const exportJournal = () => {
    const payload = buildJournalPayload();

    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      {
        type: "application/json",
      },
    );

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${journalNumber}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#f4f6f9] text-[#10233b]">
      {notification && (
        <div className="fixed right-5 top-5 z-[100] w-[calc(100%-2.5rem)] max-w-md">
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl ${
              notification.type === "success"
                ? "border-emerald-200 bg-white"
                : "border-rose-200 bg-white"
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                notification.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">
                {notification.title}
              </p>

              <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                {notification.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-400 transition hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1750px] flex-col gap-5 px-4 py-6 sm:px-6 xl:flex-row xl:items-center xl:justify-between xl:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance/general-ledger"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white transition hover:bg-slate-50"
              aria-label="Back to general ledger"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#c72c41]">
                  Finance ERP · Core Accounting
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                    status === "Draft"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {status}
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Create Journal Entry
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Record a balanced debit and credit transaction with
                account allocation, cost-center control, supporting
                documents and approval workflow.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setShowMoreActions((current) => !current)
                }
                className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black transition hover:bg-slate-50"
              >
                <MoreHorizontal className="h-4 w-4" />
                More
                <ChevronDown className="h-4 w-4" />
              </button>

              {showMoreActions && (
                <div className="absolute right-0 top-14 z-30 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      exportJournal();
                      setShowMoreActions(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <FileText className="h-4 w-4" />
                    Export journal JSON
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      clearAllLines();
                      setShowMoreActions(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-rose-600 transition hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear journal lines
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={saveDraft}
              disabled={isSaving || isSubmitting}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Draft
            </button>

            <button
              type="button"
              onClick={submitJournal}
              disabled={isSaving || isSubmitting}
              className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#183653] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : approvalRequired ? (
                <Send className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}

              {approvalRequired
                ? "Submit for Approval"
                : "Post Journal"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1750px] space-y-6 p-4 sm:p-6 xl:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Journal Number"
            value={journalNumber}
            helper="Automatically generated"
            icon={<ReceiptText className="h-5 w-5" />}
            iconClass="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            label="Total Debit"
            value={formatCurrency(totalDebit)}
            helper={`${completedLines} completed lines`}
            icon={<IndianRupee className="h-5 w-5" />}
            iconClass="bg-cyan-50 text-cyan-700"
          />

          <SummaryCard
            label="Total Credit"
            value={formatCurrency(totalCredit)}
            helper="Journal credit value"
            icon={<CircleDollarSign className="h-5 w-5" />}
            iconClass="bg-violet-50 text-violet-700"
          />

          <SummaryCard
            label="Balance Status"
            value={isBalanced ? "Balanced" : "Unbalanced"}
            helper={
              isBalanced
                ? "Ready for validation"
                : `${formatCurrency(difference)} difference`
            }
            icon={
              isBalanced ? (
                <Scale className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )
            }
            iconClass={
              isBalanced
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }
          />
        </section>

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                    Transaction Header
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Journal Information
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Enter transaction dates, entity, reference and
                    accounting period.
                  </p>
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setShowTemplates((current) => !current)
                    }
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black transition hover:bg-slate-50"
                  >
                    <Layers3 className="h-4 w-4" />
                    Use Template
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {showTemplates && (
                    <div className="absolute right-0 top-12 z-30 w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      {journalTemplates.map((template) => (
                        <button
                          key={template.id}
                          type="button"
                          onClick={() =>
                            applyTemplate(template.id)
                          }
                          className="w-full rounded-xl p-3 text-left transition hover:bg-slate-50"
                        >
                          <p className="text-sm font-black">
                            {template.name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-500">
                            {template.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <FormField
                  label="Journal Number"
                  required
                  icon={<ReceiptText className="h-4 w-4" />}
                >
                  <input
                    value={journalNumber}
                    disabled
                    className="keos-input bg-slate-100 text-slate-500"
                  />
                </FormField>

                <FormField
                  label="Journal Entry Date"
                  required
                  icon={<CalendarDays className="h-4 w-4" />}
                >
                  <input
                    type="date"
                    value={entryDate}
                    onChange={(event) =>
                      setEntryDate(event.target.value)
                    }
                    className="keos-input"
                  />
                </FormField>

                <FormField
                  label="Posting Date"
                  required
                  icon={<CalendarDays className="h-4 w-4" />}
                >
                  <input
                    type="date"
                    value={postingDate}
                    onChange={(event) =>
                      setPostingDate(event.target.value)
                    }
                    className="keos-input"
                  />
                </FormField>

                <FormField
                  label="Journal Type"
                  required
                  icon={<FileSpreadsheet className="h-4 w-4" />}
                >
                  <select
                    value={entryType}
                    onChange={(event) =>
                      setEntryType(
                        event.target.value as EntryType,
                      )
                    }
                    className="keos-input appearance-none"
                  >
                    <option>Standard Journal</option>
                    <option>Adjustment Journal</option>
                    <option>Accrual Journal</option>
                    <option>Reclassification Journal</option>
                    <option>Opening Balance Journal</option>
                  </select>
                </FormField>

                <FormField
                  label="Transaction Reference"
                  required
                  icon={<FileText className="h-4 w-4" />}
                >
                  <input
                    value={reference}
                    onChange={(event) =>
                      setReference(event.target.value)
                    }
                    placeholder="Invoice, UTR or document number"
                    className="keos-input"
                  />
                </FormField>

                <FormField
                  label="Fiscal Period"
                  required
                  icon={<CalendarDays className="h-4 w-4" />}
                >
                  <select
                    value={fiscalPeriod}
                    onChange={(event) =>
                      setFiscalPeriod(event.target.value)
                    }
                    className="keos-input appearance-none"
                  >
                    <option>July 2026</option>
                    <option>August 2026</option>
                    <option>September 2026</option>
                    <option>October 2026</option>
                    <option>November 2026</option>
                    <option>December 2026</option>
                  </select>
                </FormField>

                <FormField
                  label="Legal Entity"
                  required
                  icon={<Building2 className="h-4 w-4" />}
                >
                  <select
                    value={company}
                    onChange={(event) =>
                      setCompany(event.target.value)
                    }
                    className="keos-input appearance-none"
                  >
                    <option>KRVE Fashion Studio</option>
                    <option>KRVE Technologies</option>
                    <option>KRVE Retail Operations</option>
                  </select>
                </FormField>

                <FormField
                  label="Branch"
                  required
                  icon={<Landmark className="h-4 w-4" />}
                >
                  <select
                    value={branch}
                    onChange={(event) =>
                      setBranch(event.target.value)
                    }
                    className="keos-input appearance-none"
                  >
                    <option>Corporate Office</option>
                    <option>Varanasi Operations</option>
                    <option>Delhi Retail Office</option>
                    <option>Mumbai Retail Office</option>
                  </select>
                </FormField>

                <div className="grid grid-cols-[1fr_140px] gap-3">
                  <FormField
                    label="Currency"
                    required
                    icon={<WalletCards className="h-4 w-4" />}
                  >
                    <select
                      value={currency}
                      onChange={(event) =>
                        setCurrency(event.target.value)
                      }
                      className="keos-input appearance-none"
                    >
                      <option>INR</option>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </FormField>

                  <FormField label="Exchange Rate">
                    <input
                      type="number"
                      min="0"
                      step="0.0001"
                      value={exchangeRate}
                      onChange={(event) =>
                        setExchangeRate(event.target.value)
                      }
                      className="keos-input px-3"
                    />
                  </FormField>
                </div>
              </div>

              <div className="mt-5">
                <FormField
                  label="Journal Narration"
                  required
                  icon={<FileText className="h-4 w-4" />}
                >
                  <textarea
                    value={narration}
                    onChange={(event) =>
                      setNarration(event.target.value)
                    }
                    placeholder="Explain the business purpose and accounting treatment of this journal entry."
                    rows={4}
                    className="keos-input min-h-28 resize-y py-3"
                  />
                </FormField>
              </div>
            </section>

            <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                    Double-Entry Accounting
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Journal Lines
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Select ledger accounts and allocate equal debit and
                    credit values.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={autoBalanceLastLine}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black transition hover:bg-slate-50"
                  >
                    <Scale className="h-4 w-4" />
                    Auto Balance
                  </button>

                  <button
                    type="button"
                    onClick={addLine}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white transition hover:bg-[#183653]"
                  >
                    <Plus className="h-4 w-4" />
                    Add Line
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1750px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <TableHeader className="w-12" />
                      <TableHeader className="min-w-64">
                        Ledger Account
                      </TableHeader>
                      <TableHeader className="min-w-64">
                        Line Description
                      </TableHeader>
                      <TableHeader className="min-w-40">
                        Department
                      </TableHeader>
                      <TableHeader className="min-w-44">
                        Cost Center
                      </TableHeader>
                      <TableHeader className="min-w-44">
                        Project
                      </TableHeader>
                      <TableHeader className="min-w-36">
                        Tax Code
                      </TableHeader>
                      <TableHeader
                        className="min-w-44"
                        align="right"
                      >
                        Debit
                      </TableHeader>
                      <TableHeader
                        className="min-w-44"
                        align="right"
                      >
                        Credit
                      </TableHeader>
                      <TableHeader
                        className="w-28"
                        align="center"
                      >
                        Actions
                      </TableHeader>
                    </tr>
                  </thead>

                  <tbody>
                    {lines.map((line, index) => (
                      <tr
                        key={line.id}
                        className="border-b border-slate-100 align-top transition hover:bg-slate-50/70"
                      >
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-slate-300" />

                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-black text-slate-500">
                              {index + 1}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <select
                            value={line.accountCode}
                            onChange={(event) =>
                              updateLine(
                                line.id,
                                "accountCode",
                                event.target.value,
                              )
                            }
                            className="table-input appearance-none"
                          >
                            <option value="">
                              Select ledger account
                            </option>

                            {accounts.map((account) => (
                              <option
                                key={account.code}
                                value={account.code}
                              >
                                {account.code} · {account.name}
                              </option>
                            ))}
                          </select>

                          {line.accountType && (
                            <div className="mt-2 flex items-center gap-2">
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500">
                                {line.accountType}
                              </span>

                              <span className="text-[10px] font-bold text-slate-400">
                                {line.accountCode}
                              </span>
                            </div>
                          )}
                        </td>

                        <td className="px-3 py-4">
                          <input
                            value={line.description}
                            onChange={(event) =>
                              updateLine(
                                line.id,
                                "description",
                                event.target.value,
                              )
                            }
                            placeholder="Enter line description"
                            className="table-input"
                          />
                        </td>

                        <td className="px-3 py-4">
                          <select
                            value={line.department}
                            onChange={(event) =>
                              updateLine(
                                line.id,
                                "department",
                                event.target.value,
                              )
                            }
                            className="table-input appearance-none"
                          >
                            <option value="">
                              Select department
                            </option>

                            {departments.map((department) => (
                              <option
                                key={department}
                                value={department}
                              >
                                {department}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-3 py-4">
                          <select
                            value={line.costCenter}
                            onChange={(event) =>
                              updateLine(
                                line.id,
                                "costCenter",
                                event.target.value,
                              )
                            }
                            className="table-input appearance-none"
                          >
                            <option value="">
                              Select cost center
                            </option>

                            {costCenters.map((costCenter) => (
                              <option
                                key={costCenter}
                                value={costCenter}
                              >
                                {costCenter}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-3 py-4">
                          <select
                            value={line.project}
                            onChange={(event) =>
                              updateLine(
                                line.id,
                                "project",
                                event.target.value,
                              )
                            }
                            className="table-input appearance-none"
                          >
                            {projects.map((project) => (
                              <option key={project} value={project}>
                                {project}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-3 py-4">
                          <select
                            value={line.taxCode}
                            onChange={(event) =>
                              updateLine(
                                line.id,
                                "taxCode",
                                event.target.value,
                              )
                            }
                            className="table-input appearance-none"
                          >
                            {taxCodes.map((taxCode) => (
                              <option
                                key={taxCode}
                                value={taxCode}
                              >
                                {taxCode}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-3 py-4">
                          <div className="relative">
                            <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={line.debit}
                              onChange={(event) =>
                                updateLine(
                                  line.id,
                                  "debit",
                                  event.target.value,
                                )
                              }
                              placeholder="0.00"
                              className="table-input pl-8 text-right font-black text-blue-700"
                            />
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <div className="relative">
                            <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={line.credit}
                              onChange={(event) =>
                                updateLine(
                                  line.id,
                                  "credit",
                                  event.target.value,
                                )
                              }
                              placeholder="0.00"
                              className="table-input pl-8 text-right font-black text-violet-700"
                            />
                          </div>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                duplicateLine(line.id)
                              }
                              title="Duplicate line"
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100"
                            >
                              <Copy className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => removeLine(line.id)}
                              title="Remove line"
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-500 transition hover:bg-rose-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="bg-[#10233b] text-white">
                      <td
                        colSpan={7}
                        className="px-5 py-5 text-sm font-black"
                      >
                        Journal Entry Totals
                      </td>

                      <td className="px-5 py-5 text-right text-sm font-black">
                        {formatCurrency(totalDebit)}
                      </td>

                      <td className="px-5 py-5 text-right text-sm font-black">
                        {formatCurrency(totalCredit)}
                      </td>

                      <td className="px-5 py-5 text-center">
                        {isBalanced ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-300" />
                        ) : (
                          <AlertCircle className="mx-auto h-5 w-5 text-amber-300" />
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={addLine}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 text-xs font-black text-slate-600 transition hover:border-[#10233b] hover:text-[#10233b]"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Journal Line
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">
                    Difference:
                  </span>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-black ${
                      isBalanced
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {formatCurrency(difference)}
                  </span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                      Supporting Evidence
                    </p>

                    <h2 className="mt-2 text-xl font-black">
                      Attachments
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Upload invoices, receipts, approvals or
                      spreadsheets.
                    </p>
                  </div>

                  <Paperclip className="h-6 w-6 text-slate-400" />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.xls,.xlsx"
                  onChange={handleFileInput}
                  className="hidden"
                />

                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed p-7 text-center transition ${
                    isDragging
                      ? "border-[#10233b] bg-slate-50"
                      : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                    <Upload className="h-5 w-5 text-slate-500" />
                  </div>

                  <p className="mt-4 text-sm font-black">
                    Drop files here or click to browse
                  </p>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    PDF, JPG, PNG and Excel · Maximum 10 MB each
                  </p>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <File className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-black">
                            {attachment.name}
                          </p>

                          <p className="mt-1 text-[10px] font-semibold text-slate-400">
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeAttachment(attachment.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                      Finance Team
                    </p>

                    <h2 className="mt-2 text-xl font-black">
                      Internal Notes
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Notes are visible only to authorized finance
                      users.
                    </p>
                  </div>

                  <LockKeyhole className="h-6 w-6 text-slate-400" />
                </div>

                <textarea
                  value={internalNotes}
                  onChange={(event) =>
                    setInternalNotes(event.target.value)
                  }
                  rows={8}
                  placeholder="Add review instructions, approval context or reconciliation comments."
                  className="mt-5 min-h-48 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#10233b] focus:bg-white"
                />
              </article>
            </section>
          </div>

          <aside className="space-y-5">
            <section
              className={`rounded-[28px] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.2)] ${
                isBalanced ? "bg-[#10233b]" : "bg-[#7f1d2d]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-300">
                    Real-Time Control
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Journal Balance
                  </h2>
                </div>

                <Scale className="h-7 w-7 text-white/80" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold text-white/70">
                    Total Debit
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {formatCurrency(totalDebit)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs font-semibold text-white/70">
                    Total Credit
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {formatCurrency(totalCredit)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-white/70">
                    Difference
                  </span>

                  <span className="text-sm font-black">
                    {formatCurrency(difference)}
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      isBalanced
                        ? "w-full bg-emerald-400"
                        : "w-[45%] bg-amber-300"
                    }`}
                  />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {isBalanced ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-300" />
                  )}

                  <p className="text-xs font-black">
                    {isBalanced
                      ? "Debit and credit are balanced."
                      : "Journal cannot be posted until balanced."}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                    KEOS Intelligence
                  </p>

                  <h2 className="mt-2 text-lg font-black">
                    Accounting Validation
                  </h2>
                </div>

                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>

              <div className="mt-5 space-y-3">
                <ValidationItem
                  passed={completedLines >= 2}
                  title="Minimum journal lines"
                  description={`${completedLines} valid line${completedLines === 1 ? "" : "s"} completed`}
                />

                <ValidationItem
                  passed={isBalanced}
                  title="Debit-credit balance"
                  description={
                    isBalanced
                      ? "Journal totals are equal"
                      : `${formatCurrency(difference)} difference remains`
                  }
                />

                <ValidationItem
                  passed={Boolean(reference.trim())}
                  title="Transaction reference"
                  description={
                    reference.trim()
                      ? "Reference has been provided"
                      : "Reference is required"
                  }
                />

                <ValidationItem
                  passed={Boolean(narration.trim())}
                  title="Business narration"
                  description={
                    narration.trim()
                      ? "Narration has been provided"
                      : "Narration is required"
                  }
                />

                <ValidationItem
                  passed={lines
                    .filter(
                      (line) =>
                        line.accountCode ||
                        parseAmount(line.debit) > 0 ||
                        parseAmount(line.credit) > 0,
                    )
                    .every(
                      (line) =>
                        line.department && line.costCenter,
                    )}
                  title="Organizational allocation"
                  description="Department and cost-center validation"
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#c72c41]">
                    Workflow
                  </p>

                  <h2 className="mt-2 text-lg font-black">
                    Approval Settings
                  </h2>
                </div>

                <ShieldCheck className="h-6 w-6 text-emerald-600" />
              </div>

              <div className="mt-5 space-y-4">
                <ToggleRow
                  title="Approval required"
                  description="Route this journal to the finance approval queue."
                  enabled={approvalRequired}
                  onChange={setApprovalRequired}
                />

                <ToggleRow
                  title="Recurring journal"
                  description="Repeat this entry automatically on a schedule."
                  enabled={recurringJournal}
                  onChange={setRecurringJournal}
                />

                {recurringJournal && (
                  <div>
                    <label className="text-xs font-black">
                      Recurrence Frequency
                    </label>

                    <select
                      value={recurringFrequency}
                      onChange={(event) =>
                        setRecurringFrequency(
                          event.target.value,
                        )
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#10233b] focus:bg-white"
                    >
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Half-Yearly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-black">
                    Prepared by Badal Kumar
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Finance Administrator
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                <WorkflowStep
                  completed
                  label="Journal prepared"
                  value="Current stage"
                />

                <WorkflowStep
                  completed={status === "Submitted"}
                  label="Finance review"
                  value={
                    approvalRequired
                      ? "Pending approval"
                      : "Not required"
                  }
                />

                <WorkflowStep
                  completed={false}
                  label="General ledger posting"
                  value="Awaiting completion"
                />
              </div>
            </section>

            {validationIssues.length > 0 && (
              <section className="rounded-[24px] border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <div>
                    <p className="text-sm font-black text-amber-800">
                      {validationIssues.length} validation issue
                      {validationIssues.length === 1 ? "" : "s"}
                    </p>

                    <div className="mt-3 space-y-2">
                      {validationIssues
                        .slice(0, 4)
                        .map((issue) => (
                          <p
                            key={issue}
                            className="text-xs font-semibold leading-5 text-amber-700"
                          >
                            • {issue}
                          </p>
                        ))}

                      {validationIssues.length > 4 && (
                        <p className="text-xs font-black text-amber-800">
                          + {validationIssues.length - 4} more issues
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <button
              type="button"
              onClick={submitJournal}
              disabled={isSubmitting || isSaving}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white shadow-lg shadow-slate-900/15 transition hover:bg-[#183653] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : approvalRequired ? (
                <ClipboardCheck className="h-5 w-5" />
              ) : (
                <BadgeCheck className="h-5 w-5" />
              )}

              {approvalRequired
                ? "Validate & Submit Journal"
                : "Validate & Post Journal"}
            </button>
          </aside>
        </section>
      </div>

      <style jsx global>{`
        .keos-input {
          width: 100%;
          min-height: 44px;
          border-radius: 12px;
          border: 1px solid rgb(226 232 240);
          background: rgb(248 250 252);
          padding: 10px 14px 10px 42px;
          font-size: 14px;
          font-weight: 600;
          color: #10233b;
          outline: none;
          transition:
            border-color 160ms ease,
            background-color 160ms ease,
            box-shadow 160ms ease;
        }

        .keos-input:focus {
          border-color: #10233b;
          background: white;
          box-shadow: 0 0 0 3px rgba(16, 35, 59, 0.08);
        }

        .keos-input:disabled {
          cursor: not-allowed;
        }

        .table-input {
          width: 100%;
          min-height: 42px;
          border-radius: 11px;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 9px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #10233b;
          outline: none;
          transition:
            border-color 160ms ease,
            box-shadow 160ms ease;
        }

        .table-input:focus {
          border-color: #10233b;
          box-shadow: 0 0 0 3px rgba(16, 35, 59, 0.07);
        }

        @media print {
          button,
          a {
            display: none !important;
          }

          body,
          main {
            background: white !important;
          }
        }
      `}</style>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  helper,
  icon,
  iconClass,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <p className="mt-3 text-xl font-black text-[#10233b]">
            {value}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            {helper}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </article>
  );
}

function FormField({
  label,
  required = false,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs font-black text-[#10233b]">
        {label}

        {required && (
          <span className="text-rose-500">*</span>
        )}
      </label>

      <div className="relative mt-2">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-[14px] z-10 text-slate-400">
            {icon}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

function TableHeader({
  children,
  align = "left",
  className = "",
}: {
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}) {
  const alignment =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";

  return (
    <th
      className={`px-3 py-4 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 ${alignment} ${className}`}
    >
      {children}
    </th>
  );
}

function ValidationItem({
  passed,
  title,
  description,
}: {
  passed: boolean;
  title: string;
  description: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl p-4 ${
        passed ? "bg-emerald-50" : "bg-amber-50"
      }`}
    >
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          passed
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {passed ? (
          <Check className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
      </div>

      <div>
        <p
          className={`text-sm font-black ${
            passed ? "text-emerald-800" : "text-amber-800"
          }`}
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

function ToggleRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4">
      <div>
        <p className="text-sm font-black">{title}</p>

        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#10233b]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function WorkflowStep({
  completed,
  label,
  value,
}: {
  completed: boolean;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
          completed
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        {completed ? (
          <Check className="h-4 w-4" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
      </div>

      <div>
        <p className="text-xs font-black">{label}</p>

        <p className="mt-1 text-[11px] font-semibold text-slate-500">
          {value}
        </p>
      </div>
    </div>
  );
}