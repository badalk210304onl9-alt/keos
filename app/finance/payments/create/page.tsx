"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Copy,
  FileDown,
  FileText,
  Hash,
  Loader2,
  Paperclip,
  Plus,
  Save,
  Scale,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";

type AccountType =
  | "Asset"
  | "Liability"
  | "Equity"
  | "Revenue"
  | "Expense";

type JournalStatus =
  | "Draft"
  | "Submitted"
  | "Posted";

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
  type: "success" | "warning" | "error";
  title: string;
  message: string;
} | null;

type JournalForm = {
  journalNumber: string;
  entryDate: string;
  postingDate: string;
  entryType: string;
  reference: string;
  company: string;
  branch: string;
  fiscalPeriod: string;
  currency: string;
  exchangeRate: string;
  narration: string;
  internalNotes: string;
  approvalRequired: boolean;
  recurringJournal: boolean;
  recurringFrequency: string;
  status: JournalStatus;
};

type JournalAccount = {
  code: string;
  name: string;
  type: AccountType;
};

const accounts: JournalAccount[] = [
  {
    code: "110101",
    name: "HDFC Bank Current Account",
    type: "Asset",
  },
  {
    code: "110102",
    name: "ICICI Bank Current Account",
    type: "Asset",
  },
  {
    code: "120101",
    name: "Trade Receivables",
    type: "Asset",
  },
  {
    code: "130101",
    name: "Inventory – Finished Goods",
    type: "Asset",
  },
  {
    code: "140101",
    name: "Input GST Receivable",
    type: "Asset",
  },
  {
    code: "150101",
    name: "Office Equipment",
    type: "Asset",
  },
  {
    code: "210101",
    name: "Trade Payables",
    type: "Liability",
  },
  {
    code: "220101",
    name: "Salary Payable",
    type: "Liability",
  },
  {
    code: "230101",
    name: "Output GST Payable",
    type: "Liability",
  },
  {
    code: "310101",
    name: "Founder Capital",
    type: "Equity",
  },
  {
    code: "410101",
    name: "Product Sales Revenue",
    type: "Revenue",
  },
  {
    code: "410201",
    name: "Service Revenue",
    type: "Revenue",
  },
  {
    code: "510101",
    name: "Cost of Goods Sold",
    type: "Expense",
  },
  {
    code: "510201",
    name: "Advertising and Marketing",
    type: "Expense",
  },
  {
    code: "510301",
    name: "Technology and Software",
    type: "Expense",
  },
  {
    code: "510401",
    name: "Rent and Administration",
    type: "Expense",
  },
  {
    code: "510501",
    name: "Logistics and Freight",
    type: "Expense",
  },
  {
    code: "520101",
    name: "Employee Cost",
    type: "Expense",
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

const entryTypes = [
  "Standard Journal",
  "Adjustment Journal",
  "Accrual Journal",
  "Reclassification Journal",
  "Opening Balance Journal",
];

const companies = [
  "KRVE Fashion Studio Private Limited",
  "KRVE AI Labs",
];

const branches = [
  "Head Office",
  "Varanasi",
  "Delhi",
  "Mumbai",
  "Bengaluru",
];

const currencies = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "AED",
];

const inputClassName =
  "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b] focus:ring-2 focus:ring-[#10233b]/10";

const selectClassName =
  "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-[#10233b] outline-none transition focus:border-[#10233b] focus:ring-2 focus:ring-[#10233b]/10";

const tableInputClassName =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b] focus:ring-2 focus:ring-[#10233b]/10";

const amountInputClassName =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-right text-xs font-black tabular-nums text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b] focus:ring-2 focus:ring-[#10233b]/10";

function generateId(prefix = "id") {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function createJournalNumber() {
  const stamp = new Date()
    .toISOString()
    .replace(/\D/g, "")
    .slice(0, 14);

  return `JE-${stamp}`;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function createEmptyLine(): JournalLine {
  return {
    id: generateId("line"),
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
  };
}

function parseAmount(value: string) {
  const amount = Number(
    value.replace(/,/g, ""),
  );

  return Number.isFinite(amount)
    ? amount
    : 0;
}

function normalizeAmount(value: string) {
  const cleaned = value
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");

  const parts = cleaned.split(".");

  if (parts.length <= 1) {
    return cleaned;
  }

  return `${parts[0]}.${parts
    .slice(1)
    .join("")}`;
}

function formatCurrency(
  value: number,
  currency = "INR",
) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(
      1,
    )} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-xs font-black text-[#10233b]">
      {children}

      {required && (
        <span className="ml-1 text-rose-500">
          *
        </span>
      )}
    </label>
  );
}

function SummaryCard({
  title,
  value,
  helper,
  icon,
}: {
  title: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-xl font-black text-[#10233b]">
            {value}
          </p>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            {helper}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#10233b]">
          {icon}
        </div>
      </div>
    </article>
  );
}

function ValidationRow({
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
        passed
          ? "bg-emerald-50"
          : "bg-amber-50"
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
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
        <p className="text-sm font-black text-[#10233b]">
          {title}
        </p>

        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function CreateJournalEntryPage() {
  const [form, setForm] =
    useState<JournalForm>({
      journalNumber:
        createJournalNumber(),
      entryDate: getToday(),
      postingDate: getToday(),
      entryType: "Standard Journal",
      reference: "",
      company:
        "KRVE Fashion Studio Private Limited",
      branch: "Head Office",
      fiscalPeriod:
        "2026-27 / P01",
      currency: "INR",
      exchangeRate: "1",
      narration: "",
      internalNotes: "",
      approvalRequired: true,
      recurringJournal: false,
      recurringFrequency: "Monthly",
      status: "Draft",
    });

  const [lines, setLines] = useState<
    JournalLine[]
  >([
    createEmptyLine(),
    createEmptyLine(),
  ]);

  const [
    attachments,
    setAttachments,
  ] = useState<AttachmentItem[]>([]);

  const [
    notification,
    setNotification,
  ] =
    useState<NotificationState>(null);

  const [isSaving, setIsSaving] =
    useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const totalDebit = useMemo(
    () =>
      lines.reduce(
        (sum, line) =>
          sum +
          parseAmount(line.debit),
        0,
      ),
    [lines],
  );

  const totalCredit = useMemo(
    () =>
      lines.reduce(
        (sum, line) =>
          sum +
          parseAmount(line.credit),
        0,
      ),
    [lines],
  );

  const difference = Math.abs(
    totalDebit - totalCredit,
  );

  const hasAmounts =
    totalDebit > 0 ||
    totalCredit > 0;

  const isBalanced =
    hasAmounts &&
    difference < 0.01;

  const completeLines =
    lines.filter((line) => {
      const debit = parseAmount(
        line.debit,
      );

      const credit = parseAmount(
        line.credit,
      );

      return (
        line.accountCode !== "" &&
        ((debit > 0 &&
          credit === 0) ||
          (credit > 0 &&
            debit === 0))
      );
    });

  const allLinesComplete =
    completeLines.length >= 2 &&
    completeLines.length ===
      lines.length;

  const hasNarration =
    form.narration.trim().length >=
    5;

  const hasDates = Boolean(
    form.entryDate &&
      form.postingDate,
  );

  const readyToSubmit =
    isBalanced &&
    allLinesComplete &&
    hasNarration &&
    hasDates;

  const updateForm = <
    K extends keyof JournalForm,
  >(
    key: K,
    value: JournalForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const showNotification = (
    type:
      | "success"
      | "warning"
      | "error",
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

  const updateAccount = (
    lineId: string,
    accountCode: string,
  ) => {
    const selectedAccount =
      accounts.find(
        (account) =>
          account.code ===
          accountCode,
      );

    const updatedLines: JournalLine[] =
      lines.map(
        (
          line,
        ): JournalLine => {
          if (
            line.id !== lineId
          ) {
            return line;
          }

          if (!selectedAccount) {
            return {
              ...line,
              accountCode: "",
              accountName: "",
              accountType: "",
            };
          }

          return {
            ...line,
            accountCode:
              selectedAccount.code,
            accountName:
              selectedAccount.name,
            accountType:
              selectedAccount.type,
          };
        },
      );

    setLines(updatedLines);
  };

  const updateLine = (
    lineId: string,
    field: keyof JournalLine,
    value: string,
  ) => {
    const updatedLines: JournalLine[] =
      lines.map(
        (
          line,
        ): JournalLine => {
          if (
            line.id !== lineId
          ) {
            return line;
          }

          if (field === "debit") {
            const normalized =
              normalizeAmount(value);

            return {
              ...line,
              debit: normalized,
              credit:
                parseAmount(
                  normalized,
                ) > 0
                  ? ""
                  : line.credit,
            };
          }

          if (field === "credit") {
            const normalized =
              normalizeAmount(value);

            return {
              ...line,
              credit: normalized,
              debit:
                parseAmount(
                  normalized,
                ) > 0
                  ? ""
                  : line.debit,
            };
          }

          return {
            ...line,
            [field]: value,
          };
        },
      );

    setLines(updatedLines);
  };

  const addLine = () => {
    setLines((current) => [
      ...current,
      createEmptyLine(),
    ]);
  };

  const duplicateLine = (
    lineId: string,
  ) => {
    const index = lines.findIndex(
      (line) =>
        line.id === lineId,
    );

    if (index === -1) {
      return;
    }

    const selectedLine =
      lines[index];

    const duplicatedLine: JournalLine =
      {
        ...selectedLine,
        id: generateId("line"),
        description:
          selectedLine.description
            ? `${selectedLine.description} — Copy`
            : "",
      };

    const updatedLines = [
      ...lines,
    ];

    updatedLines.splice(
      index + 1,
      0,
      duplicatedLine,
    );

    setLines(updatedLines);
  };

  const removeLine = (
    lineId: string,
  ) => {
    if (lines.length <= 2) {
      setLines((current) =>
        current.map((line) =>
          line.id === lineId
            ? createEmptyLine()
            : line,
        ),
      );

      return;
    }

    setLines((current) =>
      current.filter(
        (line) =>
          line.id !== lineId,
      ),
    );
  };

  const addBalancingLine = () => {
    if (
      !hasAmounts ||
      isBalanced
    ) {
      return;
    }

    const balancingLine =
      createEmptyLine();

    const signedDifference =
      totalDebit - totalCredit;

    if (
      signedDifference > 0
    ) {
      balancingLine.credit =
        Math.abs(
          signedDifference,
        ).toFixed(2);
    } else {
      balancingLine.debit =
        Math.abs(
          signedDifference,
        ).toFixed(2);
    }

    balancingLine.description =
      "Automatic balancing entry";

    setLines((current) => [
      ...current,
      balancingLine,
    ]);
  };

  const clearJournal = () => {
    setForm({
      journalNumber:
        createJournalNumber(),
      entryDate: getToday(),
      postingDate: getToday(),
      entryType:
        "Standard Journal",
      reference: "",
      company:
        "KRVE Fashion Studio Private Limited",
      branch: "Head Office",
      fiscalPeriod:
        "2026-27 / P01",
      currency: "INR",
      exchangeRate: "1",
      narration: "",
      internalNotes: "",
      approvalRequired: true,
      recurringJournal: false,
      recurringFrequency:
        "Monthly",
      status: "Draft",
    });

    setLines([
      createEmptyLine(),
      createEmptyLine(),
    ]);

    setAttachments([]);

    showNotification(
      "success",
      "Journal cleared",
      "A new blank journal has been created.",
    );
  };

  const getPayload = () => ({
    ...form,
    totalDebit,
    totalCredit,
    difference,
    lines,
    attachments,
    createdAt:
      new Date().toISOString(),
  });

  const saveDraft = async () => {
    setIsSaving(true);

    try {
      localStorage.setItem(
        `keos-${form.journalNumber}`,
        JSON.stringify(
          getPayload(),
        ),
      );

      await new Promise(
        (resolve) =>
          window.setTimeout(
            resolve,
            500,
          ),
      );

      showNotification(
        "success",
        "Draft saved",
        `${form.journalNumber} has been saved in this browser.`,
      );
    } catch {
      showNotification(
        "error",
        "Save failed",
        "The journal could not be saved.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const submitJournal =
    async () => {
      if (!readyToSubmit) {
        showNotification(
          "warning",
          "Journal not ready",
          "Complete all fields and balance debit with credit.",
        );

        return;
      }

      setIsSubmitting(true);

      await new Promise(
        (resolve) =>
          window.setTimeout(
            resolve,
            700,
          ),
      );

      setForm((current) => ({
        ...current,
        status:
          current.approvalRequired
            ? "Submitted"
            : "Posted",
      }));

      showNotification(
        "success",
        form.approvalRequired
          ? "Submitted for approval"
          : "Journal posted",
        form.approvalRequired
          ? "The journal has entered the finance approval workflow."
          : "The journal has been posted to the general ledger.",
      );

      setIsSubmitting(false);
    };

  const exportJournal = () => {
    const file = new Blob(
      [
        JSON.stringify(
          getPayload(),
          null,
          2,
        ),
      ],
      {
        type: "application/json",
      },
    );

    const url =
      URL.createObjectURL(file);

    const anchor =
      document.createElement("a");

    anchor.href = url;
    anchor.download = `${form.journalNumber}.json`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const uploadFiles = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFiles =
      Array.from(
        event.target.files ?? [],
      );

    const newAttachments: AttachmentItem[] =
      selectedFiles.map(
        (file) => ({
          id: generateId(
            "attachment",
          ),
          name: file.name,
          size: file.size,
          type:
            file.type ||
            "Unknown",
        }),
      );

    setAttachments(
      (current) => [
        ...current,
        ...newAttachments,
      ],
    );

    event.target.value = "";
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#10233b]">
      {notification && (
        <div className="fixed right-6 top-6 z-[100] w-[360px] max-w-[calc(100vw-3rem)] rounded-[22px] border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                notification.type ===
                "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : notification.type ===
                      "warning"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-rose-50 text-rose-600"
              }`}
            >
              {notification.type ===
              "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>

            <div>
              <p className="text-sm font-black">
                {
                  notification.title
                }
              </p>

              <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                {
                  notification.message
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1750px] flex-col gap-5 px-6 py-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <Link
              href="/finance/general-ledger"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-red-600">
                  Finance ERP •
                  Journal Entry
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${
                    form.status ===
                    "Draft"
                      ? "bg-amber-100 text-amber-700"
                      : form.status ===
                          "Submitted"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {form.status}
                </span>
              </div>

              <h1 className="mt-2 text-3xl font-black">
                Create Journal
                Entry
              </h1>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                Journal Number:
                <span className="ml-2 font-black text-[#10233b]">
                  {
                    form.journalNumber
                  }
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={exportJournal}
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black hover:bg-slate-50"
            >
              <FileDown className="h-4 w-4" />
              Export
            </button>

            <button
              type="button"
              onClick={clearJournal}
              className="flex h-11 items-center gap-2 rounded-2xl border border-rose-200 bg-white px-4 text-sm font-black text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>

            <button
              type="button"
              onClick={saveDraft}
              disabled={
                isSaving ||
                isSubmitting
              }
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black hover:bg-slate-50 disabled:opacity-50"
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
              onClick={
                submitJournal
              }
              disabled={
                isSaving ||
                isSubmitting
              }
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-6 text-sm font-black text-white hover:bg-[#183653] disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}

              {form.approvalRequired
                ? "Submit for Approval"
                : "Post Journal"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1750px] space-y-6 px-6 py-7">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Debit"
            value={formatCurrency(
              totalDebit,
              form.currency,
            )}
            helper="Current journal debit"
            icon={
              <FileText className="h-5 w-5" />
            }
          />

          <SummaryCard
            title="Total Credit"
            value={formatCurrency(
              totalCredit,
              form.currency,
            )}
            helper="Current journal credit"
            icon={
              <FileText className="h-5 w-5" />
            }
          />

          <SummaryCard
            title="Difference"
            value={formatCurrency(
              difference,
              form.currency,
            )}
            helper={
              isBalanced
                ? "Journal is balanced"
                : "Adjustment required"
            }
            icon={
              <Scale className="h-5 w-5" />
            }
          />

          <SummaryCard
            title="Status"
            value={form.status}
            helper={
              form.approvalRequired
                ? "Approval workflow enabled"
                : "Direct posting enabled"
            }
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
          />
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
            Journal Information
          </p>

          <h2 className="mt-2 text-xl font-black">
            Entry Details
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <FieldLabel required>
                Journal Number
              </FieldLabel>

              <div className="relative">
                <Hash className="absolute left-4 top-4 h-4 w-4 text-slate-400" />

                <input
                  value={
                    form.journalNumber
                  }
                  readOnly
                  className={`${inputClassName} bg-slate-50 pl-11`}
                />
              </div>
            </div>

            <div>
              <FieldLabel required>
                Entry Date
              </FieldLabel>

              <input
                type="date"
                value={
                  form.entryDate
                }
                onChange={(event) =>
                  updateForm(
                    "entryDate",
                    event.target.value,
                  )
                }
                className={
                  inputClassName
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Posting Date
              </FieldLabel>

              <input
                type="date"
                value={
                  form.postingDate
                }
                onChange={(event) =>
                  updateForm(
                    "postingDate",
                    event.target.value,
                  )
                }
                className={
                  inputClassName
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Entry Type
              </FieldLabel>

              <select
                value={
                  form.entryType
                }
                onChange={(event) =>
                  updateForm(
                    "entryType",
                    event.target.value,
                  )
                }
                className={
                  selectClassName
                }
              >
                {entryTypes.map(
                  (entryType) => (
                    <option
                      key={
                        entryType
                      }
                      value={
                        entryType
                      }
                    >
                      {entryType}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <FieldLabel>
                Reference
              </FieldLabel>

              <input
                value={
                  form.reference
                }
                onChange={(event) =>
                  updateForm(
                    "reference",
                    event.target.value,
                  )
                }
                placeholder="Invoice or voucher number"
                className={
                  inputClassName
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Fiscal Period
              </FieldLabel>

              <input
                value={
                  form.fiscalPeriod
                }
                onChange={(event) =>
                  updateForm(
                    "fiscalPeriod",
                    event.target.value,
                  )
                }
                className={
                  inputClassName
                }
              />
            </div>

            <div>
              <FieldLabel required>
                Company
              </FieldLabel>

              <select
                value={form.company}
                onChange={(event) =>
                  updateForm(
                    "company",
                    event.target.value,
                  )
                }
                className={
                  selectClassName
                }
              >
                {companies.map(
                  (company) => (
                    <option
                      key={company}
                      value={company}
                    >
                      {company}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <FieldLabel required>
                Branch
              </FieldLabel>

              <select
                value={form.branch}
                onChange={(event) =>
                  updateForm(
                    "branch",
                    event.target.value,
                  )
                }
                className={
                  selectClassName
                }
              >
                {branches.map(
                  (branch) => (
                    <option
                      key={branch}
                      value={branch}
                    >
                      {branch}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <FieldLabel required>
                Currency
              </FieldLabel>

              <select
                value={
                  form.currency
                }
                onChange={(event) =>
                  updateForm(
                    "currency",
                    event.target.value,
                  )
                }
                className={
                  selectClassName
                }
              >
                {currencies.map(
                  (currency) => (
                    <option
                      key={currency}
                      value={currency}
                    >
                      {currency}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <FieldLabel required>
                Exchange Rate
              </FieldLabel>

              <input
                value={
                  form.exchangeRate
                }
                onChange={(event) =>
                  updateForm(
                    "exchangeRate",
                    normalizeAmount(
                      event.target
                        .value,
                    ),
                  )
                }
                className={
                  inputClassName
                }
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            <div>
              <FieldLabel required>
                Narration
              </FieldLabel>

              <textarea
                rows={5}
                value={
                  form.narration
                }
                onChange={(event) =>
                  updateForm(
                    "narration",
                    event.target.value,
                  )
                }
                placeholder="Explain the accounting purpose of this journal..."
                className="w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#10233b] focus:ring-2 focus:ring-[#10233b]/10"
              />
            </div>

            <div>
              <FieldLabel>
                Internal Notes
              </FieldLabel>

              <textarea
                rows={5}
                value={
                  form.internalNotes
                }
                onChange={(event) =>
                  updateForm(
                    "internalNotes",
                    event.target.value,
                  )
                }
                placeholder="Notes for finance approvers..."
                className="w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold outline-none focus:border-[#10233b] focus:ring-2 focus:ring-[#10233b]/10"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-black">
                  Approval Required
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Route through finance approval.
                </p>
              </div>

              <input
                type="checkbox"
                checked={
                  form.approvalRequired
                }
                onChange={(event) =>
                  updateForm(
                    "approvalRequired",
                    event.target
                      .checked,
                  )
                }
                className="h-5 w-5 accent-[#10233b]"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-black">
                  Recurring Journal
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Repeat this entry periodically.
                </p>
              </div>

              <input
                type="checkbox"
                checked={
                  form.recurringJournal
                }
                onChange={(event) =>
                  updateForm(
                    "recurringJournal",
                    event.target
                      .checked,
                  )
                }
                className="h-5 w-5 accent-[#10233b]"
              />
            </label>
          </div>

          {form.recurringJournal && (
            <div className="mt-5 max-w-sm">
              <FieldLabel>
                Frequency
              </FieldLabel>

              <select
                value={
                  form.recurringFrequency
                }
                onChange={(event) =>
                  updateForm(
                    "recurringFrequency",
                    event.target.value,
                  )
                }
                className={
                  selectClassName
                }
              >
                <option value="Monthly">
                  Monthly
                </option>

                <option value="Quarterly">
                  Quarterly
                </option>

                <option value="Half-Yearly">
                  Half-Yearly
                </option>

                <option value="Yearly">
                  Yearly
                </option>
              </select>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-xl font-black">
                Journal Lines
              </h2>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                Enter debit and
                credit accounts for
                the transaction.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  setLines([
                    createEmptyLine(),
                    createEmptyLine(),
                  ])
                }
                className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-xs font-black hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
                Clear Lines
              </button>

              <button
                type="button"
                onClick={
                  addBalancingLine
                }
                disabled={
                  !hasAmounts ||
                  isBalanced
                }
                className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-xs font-black disabled:opacity-40"
              >
                <Scale className="h-4 w-4" />
                Add Balance
              </button>

              <button
                type="button"
                onClick={addLine}
                className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-5 text-xs font-black text-white"
              >
                <Plus className="h-4 w-4" />
                Add Line
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1800px] border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "#",
                    "Account",
                    "Description",
                    "Debit",
                    "Credit",
                    "Department",
                    "Cost Center",
                    "Project",
                    "Tax Code",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-3 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {lines.map(
                  (line, index) => (
                    <tr
                      key={line.id}
                      className="hover:bg-slate-50/70"
                    >
                      <td className="px-3 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-xs font-black">
                          {index + 1}
                        </span>
                      </td>

                      <td className="min-w-[260px] px-3 py-3 align-top">
                        <select
                          value={
                            line.accountCode
                          }
                          onChange={(
                            event,
                          ) =>
                            updateAccount(
                              line.id,
                              event
                                .target
                                .value,
                            )
                          }
                          className={
                            tableInputClassName
                          }
                        >
                          <option value="">
                            Select Account
                          </option>

                          {accounts.map(
                            (
                              account,
                            ) => (
                              <option
                                key={
                                  account.code
                                }
                                value={
                                  account.code
                                }
                              >
                                {
                                  account.code
                                }{" "}
                                —{" "}
                                {
                                  account.name
                                }
                              </option>
                            ),
                          )}
                        </select>

                        {line.accountType && (
                          <p className="mt-2 text-[11px] font-bold text-slate-500">
                            {
                              line.accountType
                            }
                          </p>
                        )}
                      </td>

                      <td className="min-w-[220px] px-3 py-3">
                        <input
                          value={
                            line.description
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "description",
                              event
                                .target
                                .value,
                            )
                          }
                          placeholder="Narration..."
                          className={
                            tableInputClassName
                          }
                        />
                      </td>

                      <td className="min-w-[145px] px-3 py-3">
                        <input
                          inputMode="decimal"
                          value={
                            line.debit
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "debit",
                              event
                                .target
                                .value,
                            )
                          }
                          placeholder="0.00"
                          className={
                            amountInputClassName
                          }
                        />
                      </td>

                      <td className="min-w-[145px] px-3 py-3">
                        <input
                          inputMode="decimal"
                          value={
                            line.credit
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "credit",
                              event
                                .target
                                .value,
                            )
                          }
                          placeholder="0.00"
                          className={
                            amountInputClassName
                          }
                        />
                      </td>

                      <td className="min-w-[170px] px-3 py-3">
                        <select
                          value={
                            line.department
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "department",
                              event
                                .target
                                .value,
                            )
                          }
                          className={
                            tableInputClassName
                          }
                        >
                          <option value="">
                            Select
                          </option>

                          {departments.map(
                            (
                              department,
                            ) => (
                              <option
                                key={
                                  department
                                }
                                value={
                                  department
                                }
                              >
                                {
                                  department
                                }
                              </option>
                            ),
                          )}
                        </select>
                      </td>

                      <td className="min-w-[170px] px-3 py-3">
                        <select
                          value={
                            line.costCenter
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "costCenter",
                              event
                                .target
                                .value,
                            )
                          }
                          className={
                            tableInputClassName
                          }
                        >
                          <option value="">
                            Select
                          </option>

                          {costCenters.map(
                            (
                              costCenter,
                            ) => (
                              <option
                                key={
                                  costCenter
                                }
                                value={
                                  costCenter
                                }
                              >
                                {
                                  costCenter
                                }
                              </option>
                            ),
                          )}
                        </select>
                      </td>

                      <td className="min-w-[180px] px-3 py-3">
                        <select
                          value={
                            line.project
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "project",
                              event
                                .target
                                .value,
                            )
                          }
                          className={
                            tableInputClassName
                          }
                        >
                          {projects.map(
                            (project) => (
                              <option
                                key={
                                  project
                                }
                                value={
                                  project
                                }
                              >
                                {project}
                              </option>
                            ),
                          )}
                        </select>
                      </td>

                      <td className="min-w-[140px] px-3 py-3">
                        <select
                          value={
                            line.taxCode
                          }
                          onChange={(
                            event,
                          ) =>
                            updateLine(
                              line.id,
                              "taxCode",
                              event
                                .target
                                .value,
                            )
                          }
                          className={
                            tableInputClassName
                          }
                        >
                          {taxCodes.map(
                            (taxCode) => (
                              <option
                                key={
                                  taxCode
                                }
                                value={
                                  taxCode
                                }
                              >
                                {taxCode}
                              </option>
                            ),
                          )}
                        </select>
                      </td>

                      <td className="px-3 py-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              duplicateLine(
                                line.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100"
                          >
                            <Copy className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              removeLine(
                                line.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>

              <tfoot className="border-t-2 border-slate-200 bg-slate-50">
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-5 text-right text-xs font-black uppercase text-slate-500"
                  >
                    Journal Totals
                  </td>

                  <td className="px-3 py-5 text-right text-sm font-black">
                    {formatCurrency(
                      totalDebit,
                      form.currency,
                    )}
                  </td>

                  <td className="px-3 py-5 text-right text-sm font-black">
                    {formatCurrency(
                      totalCredit,
                      form.currency,
                    )}
                  </td>

                  <td
                    colSpan={5}
                    className="px-4 py-5 text-right"
                  >
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black ${
                        isBalanced
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isBalanced ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}

                      {isBalanced
                        ? "Journal is balanced"
                        : `Difference ${formatCurrency(
                            difference,
                            form.currency,
                          )}`}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Paperclip className="h-5 w-5 text-violet-600" />

              <h2 className="text-lg font-black">
                Attachments
              </h2>
            </div>

            <label className="mt-5 flex cursor-pointer flex-col items-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
              <Upload className="h-7 w-7 text-slate-400" />

              <span className="mt-3 text-sm font-black">
                Upload documents
              </span>

              <span className="mt-1 text-xs font-semibold text-slate-500">
                PDF, image or spreadsheet
              </span>

              <input
                type="file"
                multiple
                onChange={
                  uploadFiles
                }
                className="hidden"
              />
            </label>

            <div className="mt-4 space-y-3">
              {attachments.length ===
              0 ? (
                <p className="rounded-2xl bg-slate-50 p-4 text-xs font-semibold text-slate-500">
                  No attachments
                  added.
                </p>
              ) : (
                attachments.map(
                  (
                    attachment,
                  ) => (
                    <div
                      key={
                        attachment.id
                      }
                      className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">
                          {
                            attachment.name
                          }
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {formatFileSize(
                            attachment.size,
                          )}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setAttachments(
                            (
                              current,
                            ) =>
                              current.filter(
                                (
                                  item,
                                ) =>
                                  item.id !==
                                  attachment.id,
                              ),
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ),
                )
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">
              Validation
            </h2>

            <p className="mt-1 text-xs font-semibold text-slate-500">
              Accounting controls
              and journal readiness.
            </p>

            <div className="mt-5 space-y-3">
              <ValidationRow
                passed={hasDates}
                title="Accounting dates"
                description="Entry and posting dates are required."
              />

              <ValidationRow
                passed={
                  hasNarration
                }
                title="Narration"
                description="A clear journal purpose is required."
              />

              <ValidationRow
                passed={
                  allLinesComplete
                }
                title="Complete lines"
                description="Each line needs an account and one amount."
              />

              <ValidationRow
                passed={isBalanced}
                title="Balanced entry"
                description="Total debit must equal total credit."
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black">
              Workflow
            </h2>

            <p className="mt-1 text-xs font-semibold text-slate-500">
              Journal lifecycle and
              approval status.
            </p>

            <div className="mt-6 space-y-5">
              {[
                {
                  label:
                    "Journal prepared",
                  description:
                    "Entry is being created by Finance.",
                  complete: true,
                },
                {
                  label:
                    form.approvalRequired
                      ? "Approval review"
                      : "Direct posting",
                  description:
                    form.approvalRequired
                      ? "Finance approver review is required."
                      : "Journal can be posted directly.",
                  complete:
                    form.status !==
                    "Draft",
                },
                {
                  label:
                    "General ledger posting",
                  description:
                    "Entry becomes part of the general ledger.",
                  complete:
                    form.status ===
                    "Posted",
                },
              ].map((step) => (
                <div
                  key={step.label}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      step.complete
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step.complete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <CalendarDays className="h-4 w-4" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-black">
                      {step.label}
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      {
                        step.description
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 rounded-2xl p-4 ${
                readyToSubmit
                  ? "bg-emerald-50"
                  : "bg-amber-50"
              }`}
            >
              <p
                className={`text-sm font-black ${
                  readyToSubmit
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}
              >
                {readyToSubmit
                  ? "Ready to submit"
                  : "Action required"}
              </p>

              <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                {readyToSubmit
                  ? "All mandatory accounting validations have passed."
                  : "Complete the validation requirements before submission."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}