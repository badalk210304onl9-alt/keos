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
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  FileCheck2,
  FileText,
  IndianRupee,
  Landmark,
  Mail,
  MapPin,
  Paperclip,
  Plus,
  Printer,
  ReceiptText,
  Save,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Trash2,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type ReceiptStatus = "Draft" | "Submitted" | "Approved";

type PaymentMethod =
  | "Bank Transfer"
  | "UPI"
  | "Cash"
  | "Cheque"
  | "Credit Card";

type Customer = {
  code: string;
  name: string;
  gstin: string;
  email: string;
  phone: string;
  address: string;
};

type InvoiceRow = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  invoiceAmount: number;
  outstandingAmount: number;
  allocatedAmount: number;
  selected: boolean;
};

type Attachment = {
  id: number;
  name: string;
  size: number;
};

const customers: Customer[] = [
  {
    code: "CUS-0001",
    name: "Aarav Retail Private Limited",
    gstin: "09AAECA1234F1Z5",
    email: "accounts@aaravretail.in",
    phone: "+91 98765 43210",
    address: "Sector 62, Noida, Uttar Pradesh – 201309",
  },
  {
    code: "CUS-0002",
    name: "Vistara Fashion House",
    gstin: "27AABCV5678K1Z2",
    email: "finance@vistarafashion.in",
    phone: "+91 98200 11223",
    address: "Lower Parel, Mumbai, Maharashtra – 400013",
  },
  {
    code: "CUS-0003",
    name: "Urban Loom Enterprises",
    gstin: "07AACCU4321R1Z8",
    email: "payments@urbanloom.in",
    phone: "+91 98111 77665",
    address: "Connaught Place, New Delhi – 110001",
  },
];

const initialInvoices: InvoiceRow[] = [
  {
    id: 1,
    invoiceNumber: "INV-2026-00418",
    invoiceDate: "2026-07-10",
    dueDate: "2026-08-09",
    invoiceAmount: 125000,
    outstandingAmount: 125000,
    allocatedAmount: 0,
    selected: false,
  },
  {
    id: 2,
    invoiceNumber: "INV-2026-00406",
    invoiceDate: "2026-07-03",
    dueDate: "2026-08-02",
    invoiceAmount: 78500,
    outstandingAmount: 38500,
    allocatedAmount: 0,
    selected: false,
  },
  {
    id: 3,
    invoiceNumber: "INV-2026-00391",
    invoiceDate: "2026-06-28",
    dueDate: "2026-07-28",
    invoiceAmount: 52000,
    outstandingAmount: 52000,
    allocatedAmount: 0,
    selected: false,
  },
];

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

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

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <p className="text-[10px] font-black uppercase tracking-widest">
          {label}
        </p>
      </div>

      <p className="mt-2 truncate text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
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

export default function CreateReceiptPage() {
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<ReceiptStatus>("Draft");
  const [toast, setToast] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [receiptNumber] = useState("RCT-2026-00081");
  const [receiptDate, setReceiptDate] = useState("2026-07-22");
  const [postingDate, setPostingDate] = useState("2026-07-22");
  const [company, setCompany] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [branch, setBranch] = useState("Varanasi Head Office");
  const [currency, setCurrency] = useState("INR");

  const [selectedCustomerCode, setSelectedCustomerCode] =
    useState("CUS-0001");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Bank Transfer");

  const [bankAccount, setBankAccount] = useState(
    "HDFC Bank • Current Account • 4582",
  );

  const [referenceNumber, setReferenceNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState("2026-07-22");
  const [amountReceived, setAmountReceived] = useState(100000);

  const [tdsAmount, setTdsAmount] = useState(0);
  const [bankCharges, setBankCharges] = useState(0);
  const [otherAdjustment, setOtherAdjustment] = useState(0);
  const [roundOff, setRoundOff] = useState(0);

  const [invoiceRows, setInvoiceRows] =
    useState<InvoiceRow[]>(initialInvoices);

  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [customerRemarks, setCustomerRemarks] = useState(
    "Thank you for your payment.",
  );

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const selectedCustomer =
    customers.find((customer) => customer.code === selectedCustomerCode) ??
    customers[0];

  const filteredInvoices = useMemo(() => {
    const query = invoiceSearch.trim().toLowerCase();

    if (!query) return invoiceRows;

    return invoiceRows.filter((invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(query),
    );
  }, [invoiceRows, invoiceSearch]);

  const allocatedAmount = useMemo(() => {
    return invoiceRows.reduce(
      (total, invoice) => total + Number(invoice.allocatedAmount || 0),
      0,
    );
  }, [invoiceRows]);

  const totalOutstanding = useMemo(() => {
    return invoiceRows.reduce(
      (total, invoice) => total + Number(invoice.outstandingAmount || 0),
      0,
    );
  }, [invoiceRows]);

  const deductions =
    Number(tdsAmount || 0) +
    Number(bankCharges || 0) +
    Number(otherAdjustment || 0);

  const availableForAllocation =
    Number(amountReceived || 0) - deductions + Number(roundOff || 0);

  const unallocatedAmount = availableForAllocation - allocatedAmount;

  const showMessage = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const updateInvoiceAllocation = (id: number, value: number) => {
    setInvoiceRows((currentRows) =>
      currentRows.map((invoice) => {
        if (invoice.id !== id) return invoice;

        const safeValue = Math.max(
          0,
          Math.min(Number(value || 0), invoice.outstandingAmount),
        );

        return {
          ...invoice,
          allocatedAmount: safeValue,
          selected: safeValue > 0,
        };
      }),
    );
  };

  const toggleInvoice = (id: number) => {
    const currentAllocated = invoiceRows
      .filter((invoice) => invoice.id !== id)
      .reduce(
        (total, invoice) => total + Number(invoice.allocatedAmount || 0),
        0,
      );

    const remaining = Math.max(availableForAllocation - currentAllocated, 0);

    setInvoiceRows((currentRows) =>
      currentRows.map((invoice) => {
        if (invoice.id !== id) return invoice;

        if (invoice.selected) {
          return {
            ...invoice,
            selected: false,
            allocatedAmount: 0,
          };
        }

        const allocation = Math.min(invoice.outstandingAmount, remaining);

        return {
          ...invoice,
          selected: allocation > 0,
          allocatedAmount: allocation,
        };
      }),
    );
  };

  const allocateAutomatically = () => {
    let remaining = Math.max(availableForAllocation, 0);

    const updatedRows = invoiceRows.map((invoice) => {
      const allocation = Math.min(invoice.outstandingAmount, remaining);

      remaining -= allocation;

      return {
        ...invoice,
        selected: allocation > 0,
        allocatedAmount: allocation,
      };
    });

    setInvoiceRows(updatedRows);
    showMessage("Receipt amount allocated automatically.");
  };

  const clearAllocation = () => {
    setInvoiceRows((currentRows) =>
      currentRows.map((invoice) => ({
        ...invoice,
        selected: false,
        allocatedAmount: 0,
      })),
    );

    showMessage("Invoice allocation cleared.");
  };

  const handleAttachments = (event: ChangeEvent<HTMLInputElement>) => {
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

  const validateReceipt = () => {
    if (!selectedCustomerCode) {
      showMessage("Please select a customer.");
      return false;
    }

    if (amountReceived <= 0) {
      showMessage("Amount received must be greater than zero.");
      return false;
    }

    if (allocatedAmount <= 0) {
      showMessage("Allocate payment to at least one invoice.");
      return false;
    }

    if (unallocatedAmount < 0) {
      showMessage("Allocated amount exceeds available receipt amount.");
      return false;
    }

    if (
      paymentMethod !== "Cash" &&
      paymentMethod !== "Credit Card" &&
      !referenceNumber.trim()
    ) {
      showMessage("Enter transaction reference or UTR number.");
      return false;
    }

    return true;
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("Receipt saved successfully as draft.");
  };

  const submitReceipt = () => {
    if (!validateReceipt()) return;

    setStatus("Submitted");
    showMessage("Receipt submitted successfully.");
  };

  const approveReceipt = () => {
    if (!validateReceipt()) return;

    setStatus("Approved");
    showMessage("Receipt approved and posted successfully.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitReceipt();
  };

  const PaymentIcon =
    paymentMethod === "Bank Transfer"
      ? Landmark
      : paymentMethod === "UPI"
        ? Smartphone
        : paymentMethod === "Cash"
          ? Banknote
          : paymentMethod === "Cheque"
            ? FileCheck2
            : CreditCard;

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {toast && (
        <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={18} strokeWidth={2.5} />
          </div>

          <p className="text-sm font-bold text-slate-800">{toast}</p>
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
                  <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                    Create Customer Receipt
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                      status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "Submitted"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Record customer payment and allocate it against outstanding
                  invoices.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Printer size={17} />
                Preview
              </button>

              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Save size={17} />
                Save Draft
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
                onClick={approveReceipt}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <BadgeCheck size={17} />
                Approve
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1680px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <ReceiptText size={21} />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Receipt Information
                    </h2>
                    <p className="text-xs text-slate-500">
                      Company, branch and posting details
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Receipt Number
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    {receiptNumber}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Receipt Date</label>

                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="date"
                      value={receiptDate}
                      onChange={(event) => setReceiptDate(event.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Posting Date</label>

                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="date"
                      value={postingDate}
                      onChange={(event) => setPostingDate(event.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Currency</label>

                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(event) => setCurrency(event.target.value)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
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
                      className={`${inputClass} appearance-none pl-10 pr-10`}
                    >
                      <option>KRVE Fashion Studio Private Limited</option>
                      <option>KRVE Technologies Private Limited</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Branch</label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={branch}
                      onChange={(event) => setBranch(event.target.value)}
                      className={`${inputClass} appearance-none pl-10 pr-10`}
                    >
                      <option>Varanasi Head Office</option>
                      <option>Delhi Corporate Office</option>
                      <option>Mumbai Operations</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<UserRound size={21} />}
                title="Customer Information"
                description="Select the customer making this payment"
              />

              <div className="p-6">
                <label className={labelClass}>Customer</label>

                <div className="relative">
                  <select
                    value={selectedCustomerCode}
                    onChange={(event) =>
                      setSelectedCustomerCode(event.target.value)
                    }
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {customers.map((customer) => (
                      <option key={customer.code} value={customer.code}>
                        {customer.name} — {customer.code}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                  />
                </div>

                <div className="mt-5 grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 xl:grid-cols-4">
                  <InfoItem
                    label="Customer Code"
                    value={selectedCustomer.code}
                    icon={<UserRound size={15} />}
                  />

                  <InfoItem
                    label="GSTIN"
                    value={selectedCustomer.gstin}
                    icon={<ShieldCheck size={15} />}
                  />

                  <InfoItem
                    label="Email"
                    value={selectedCustomer.email}
                    icon={<Mail size={15} />}
                  />

                  <InfoItem
                    label="Phone"
                    value={selectedCustomer.phone}
                    icon={<Smartphone size={15} />}
                  />

                  <div className="sm:col-span-2 xl:col-span-4">
                    <InfoItem
                      label="Billing Address"
                      value={selectedCustomer.address}
                      icon={<MapPin size={15} />}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<WalletCards size={21} />}
                title="Payment Details"
                description="Enter payment mode, bank account and reference details"
              />

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Payment Method</label>

                  <div className="relative">
                    <PaymentIcon
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={paymentMethod}
                      onChange={(event) =>
                        setPaymentMethod(event.target.value as PaymentMethod)
                      }
                      className={`${inputClass} appearance-none pl-10 pr-10`}
                    >
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                      <option>Cash</option>
                      <option>Cheque</option>
                      <option>Credit Card</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Payment Date</label>

                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(event) => setPaymentDate(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Amount Received</label>

                  <div className="relative">
                    <IndianRupee
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={amountReceived}
                      onChange={(event) =>
                        setAmountReceived(Number(event.target.value))
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Deposit Bank Account</label>

                  <div className="relative">
                    <Landmark
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={bankAccount}
                      onChange={(event) => setBankAccount(event.target.value)}
                      className={`${inputClass} appearance-none pl-10 pr-10`}
                    >
                      <option>HDFC Bank • Current Account • 4582</option>
                      <option>ICICI Bank • Current Account • 0917</option>
                      <option>Cash in Hand • Varanasi Office</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Transaction Reference / UTR
                  </label>

                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(event) =>
                      setReferenceNumber(event.target.value)
                    }
                    placeholder="Enter UTR or transaction ID"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Invoice Allocation
                    </h2>
                    <p className="text-xs text-slate-500">
                      Allocate the received amount against customer invoices
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={allocateAutomatically}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#102844] px-4 text-xs font-bold text-white"
                  >
                    <Plus size={15} />
                    Auto Allocate
                  </button>

                  <button
                    type="button"
                    onClick={clearAllocation}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600"
                  >
                    <X size={15} />
                    Clear
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="relative mb-5 max-w-sm">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    value={invoiceSearch}
                    onChange={(event) =>
                      setInvoiceSearch(event.target.value)
                    }
                    placeholder="Search invoice number"
                    className={`${inputClass} pl-10`}
                  />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-[980px] w-full">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <th className="px-4 py-4">Select</th>
                        <th className="px-4 py-4">Invoice</th>
                        <th className="px-4 py-4">Invoice Date</th>
                        <th className="px-4 py-4">Due Date</th>
                        <th className="px-4 py-4 text-right">Invoice Amount</th>
                        <th className="px-4 py-4 text-right">Outstanding</th>
                        <th className="px-4 py-4 text-right">Allocate</th>
                        <th className="px-4 py-4 text-right">Balance</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredInvoices.map((invoice) => {
                        const balance =
                          invoice.outstandingAmount -
                          invoice.allocatedAmount;

                        return (
                          <tr
                            key={invoice.id}
                            className="text-sm text-slate-700"
                          >
                            <td className="px-4 py-4">
                              <input
                                type="checkbox"
                                checked={invoice.selected}
                                onChange={() => toggleInvoice(invoice.id)}
                                className="h-4 w-4 rounded border-slate-300"
                              />
                            </td>

                            <td className="px-4 py-4 font-black text-slate-900">
                              {invoice.invoiceNumber}
                            </td>

                            <td className="px-4 py-4">
                              {invoice.invoiceDate}
                            </td>

                            <td className="px-4 py-4">{invoice.dueDate}</td>

                            <td className="px-4 py-4 text-right font-semibold">
                              {formatCurrency(invoice.invoiceAmount)}
                            </td>

                            <td className="px-4 py-4 text-right font-semibold">
                              {formatCurrency(invoice.outstandingAmount)}
                            </td>

                            <td className="px-4 py-4">
                              <input
                                type="number"
                                min="0"
                                max={invoice.outstandingAmount}
                                value={invoice.allocatedAmount}
                                onChange={(event) =>
                                  updateInvoiceAllocation(
                                    invoice.id,
                                    Number(event.target.value),
                                  )
                                }
                                className="ml-auto h-10 w-36 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none focus:border-slate-400"
                              />
                            </td>

                            <td className="px-4 py-4 text-right font-black text-slate-900">
                              {formatCurrency(balance)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Total Outstanding
                    </p>

                    <p className="mt-2 text-lg font-black text-slate-900">
                      {formatCurrency(totalOutstanding)}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                      Allocated
                    </p>

                    <p className="mt-2 text-lg font-black text-blue-800">
                      {formatCurrency(allocatedAmount)}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl p-4 ${
                      unallocatedAmount < 0
                        ? "bg-rose-50"
                        : "bg-emerald-50"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        unallocatedAmount < 0
                          ? "text-rose-500"
                          : "text-emerald-500"
                      }`}
                    >
                      Unallocated
                    </p>

                    <p
                      className={`mt-2 text-lg font-black ${
                        unallocatedAmount < 0
                          ? "text-rose-700"
                          : "text-emerald-700"
                      }`}
                    >
                      {formatCurrency(unallocatedAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<IndianRupee size={21} />}
                title="Deductions and Adjustments"
                description="Record TDS, bank charges and other adjustments"
              />

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className={labelClass}>TDS Amount</label>

                  <input
                    type="number"
                    min="0"
                    value={tdsAmount}
                    onChange={(event) =>
                      setTdsAmount(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Bank Charges</label>

                  <input
                    type="number"
                    min="0"
                    value={bankCharges}
                    onChange={(event) =>
                      setBankCharges(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Other Adjustment</label>

                  <input
                    type="number"
                    value={otherAdjustment}
                    onChange={(event) =>
                      setOtherAdjustment(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Round Off</label>

                  <input
                    type="number"
                    step="0.01"
                    value={roundOff}
                    onChange={(event) =>
                      setRoundOff(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<Paperclip size={21} />}
                title="Attachments"
                description="Upload payment screenshot, bank advice or supporting files"
              />

              <div className="p-6">
                <input
                  ref={attachmentInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={handleAttachments}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => attachmentInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-10 text-center transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <Upload size={22} />
                  </div>

                  <p className="mt-4 text-sm font-black text-slate-900">
                    Upload supporting documents
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PDF, JPG, PNG or DOC files
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
                          onClick={() => removeAttachment(attachment.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={17} />
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
                title="Notes and Remarks"
                description="Add internal instructions and customer-facing remarks"
              />

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Internal Notes</label>

                  <textarea
                    value={internalNotes}
                    onChange={(event) =>
                      setInternalNotes(event.target.value)
                    }
                    placeholder="Add notes for finance and approval teams"
                    className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label className={labelClass}>Customer Remarks</label>

                  <textarea
                    value={customerRemarks}
                    onChange={(event) =>
                      setCustomerRemarks(event.target.value)
                    }
                    placeholder="Add remarks visible on receipt"
                    className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-medium text-slate-800 outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <section className="overflow-hidden rounded-3xl bg-[#102844] text-white shadow-xl">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                  Receipt Summary
                </p>

                <h3 className="mt-2 text-lg font-black">{receiptNumber}</h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine
                  label="Customer"
                  value={selectedCustomer.name}
                />

                <SummaryLine
                  label="Payment Method"
                  value={paymentMethod}
                />

                <SummaryLine
                  label="Amount Received"
                  value={formatCurrency(amountReceived)}
                />

                <SummaryLine
                  label="Deductions"
                  value={formatCurrency(deductions)}
                />

                <SummaryLine
                  label="Available"
                  value={formatCurrency(availableForAllocation)}
                />

                <SummaryLine
                  label="Allocated"
                  value={formatCurrency(allocatedAmount)}
                />

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-blue-200">
                        Unallocated Balance
                      </p>

                      <p
                        className={`mt-2 text-2xl font-black ${
                          unallocatedAmount < 0
                            ? "text-rose-300"
                            : "text-white"
                        }`}
                      >
                        {formatCurrency(unallocatedAmount)}
                      </p>
                    </div>

                    <IndianRupee
                      size={30}
                      className="text-blue-300/60"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900">
                Workflow Status
              </h3>

              <div className="mt-5 space-y-4">
                <WorkflowStep
                  title="Receipt Created"
                  active
                  complete
                />

                <WorkflowStep
                  title="Submitted for Review"
                  active={status !== "Draft"}
                  complete={status !== "Draft"}
                />

                <WorkflowStep
                  title="Approved and Posted"
                  active={status === "Approved"}
                  complete={status === "Approved"}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900">
                Receipt Controls
              </h3>

              <div className="mt-4 space-y-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  <Save size={17} />
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={submitReceipt}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#102844] text-sm font-bold text-white transition hover:bg-[#17385f]"
                >
                  <Send size={17} />
                  Submit Receipt
                </button>

                <button
                  type="button"
                  onClick={approveReceipt}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <BadgeCheck size={17} />
                  Approve and Post
                </button>
              </div>
            </section>
          </aside>
        </div>
      </form>

      {showPreview && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-black text-slate-950">
                  Receipt Preview
                </h2>

                <p className="text-xs text-slate-500">{receiptNumber}</p>
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

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    KRVE Fashion Studio Private Limited
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Varanasi, Uttar Pradesh, India
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Customer Receipt
                  </p>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    {receiptNumber}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Receipt Date: {receiptDate}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Received From
                  </p>

                  <p className="mt-2 font-black text-slate-900">
                    {selectedCustomer.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCustomer.address}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    GSTIN: {selectedCustomer.gstin}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Payment Details
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Method: {paymentMethod}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Reference: {referenceNumber || "Not provided"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Payment Date: {paymentDate}
                  </p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-4 py-4">Invoice</th>
                      <th className="px-4 py-4 text-right">Allocated Amount</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {invoiceRows
                      .filter((invoice) => invoice.allocatedAmount > 0)
                      .map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800">
                            {invoice.invoiceNumber}
                          </td>

                          <td className="px-4 py-4 text-right text-sm font-black text-slate-900">
                            {formatCurrency(invoice.allocatedAmount)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 ml-auto max-w-sm rounded-2xl bg-slate-50 p-5">
                <SummaryPreviewLine
                  label="Amount Received"
                  value={formatCurrency(amountReceived)}
                />

                <SummaryPreviewLine
                  label="Deductions"
                  value={formatCurrency(deductions)}
                />

                <SummaryPreviewLine
                  label="Amount Allocated"
                  value={formatCurrency(allocatedAmount)}
                />

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="font-black text-slate-900">
                      Receipt Total
                    </span>

                    <span className="text-lg font-black text-[#102844]">
                      {formatCurrency(amountReceived)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-center text-xs text-slate-400">
                {customerRemarks}
              </p>
            </div>
          </div>
        </div>
      )}
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

      <span className="max-w-[190px] text-right text-xs font-black text-white">
        {value}
      </span>
    </div>
  );
}

function SummaryPreviewLine({
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

function WorkflowStep({
  title,
  active,
  complete,
}: {
  title: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          complete
            ? "bg-emerald-100 text-emerald-600"
            : active
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-100 text-slate-400"
        }`}
      >
        {complete ? <Check size={15} /> : <span className="h-2 w-2 rounded-full bg-current" />}
      </div>

      <p
        className={`text-xs font-bold ${
          active ? "text-slate-800" : "text-slate-400"
        }`}
      >
        {title}
      </p>
    </div>
  );
}