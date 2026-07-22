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
  Banknote,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  FileText,
  IndianRupee,
  Landmark,
  Mail,
  PackageCheck,
  Paperclip,
  Printer,
  RefreshCcw,
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

type RefundStatus =
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Processed"
  | "Rejected";

type RefundMethod =
  | "Original Payment Method"
  | "Bank Transfer"
  | "UPI"
  | "Store Credit"
  | "Cash";

type RefundReason =
  | "Product Return"
  | "Order Cancellation"
  | "Damaged Product"
  | "Incorrect Product"
  | "Duplicate Payment"
  | "Overpayment"
  | "Service Issue"
  | "Other";

type Customer = {
  code: string;
  name: string;
  email: string;
  phone: string;
  gstin: string;
  address: string;
};

type OrderItem = {
  id: number;
  sku: string;
  product: string;
  quantity: number;
  unitPrice: number;
  refundableQuantity: number;
  refundQuantity: number;
  refundAmount: number;
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
    email: "accounts@aaravretail.in",
    phone: "+91 98765 43210",
    gstin: "09AAECA1234F1Z5",
    address: "Sector 62, Noida, Uttar Pradesh – 201309",
  },
  {
    code: "CUS-0002",
    name: "Vistara Fashion House",
    email: "finance@vistarafashion.in",
    phone: "+91 98200 11223",
    gstin: "27AABCV5678K1Z2",
    address: "Lower Parel, Mumbai, Maharashtra – 400013",
  },
  {
    code: "CUS-0003",
    name: "Urban Loom Enterprises",
    email: "payments@urbanloom.in",
    phone: "+91 98111 77665",
    gstin: "07AACCU4321R1Z8",
    address: "Connaught Place, New Delhi – 110001",
  },
];

const initialItems: OrderItem[] = [
  {
    id: 1,
    sku: "KRVE-BLZ-001",
    product: "KRVE Noir Blazer",
    quantity: 2,
    unitPrice: 18999,
    refundableQuantity: 2,
    refundQuantity: 0,
    refundAmount: 0,
    selected: false,
  },
  {
    id: 2,
    sku: "KRVE-SNK-002",
    product: "KRVE Icon Sneakers",
    quantity: 1,
    unitPrice: 12999,
    refundableQuantity: 1,
    refundQuantity: 0,
    refundAmount: 0,
    selected: false,
  },
  {
    id: 3,
    sku: "KRVE-SHT-008",
    product: "KRVE Signature Shirt",
    quantity: 3,
    unitPrice: 6999,
    refundableQuantity: 3,
    refundQuantity: 0,
    refundAmount: 0,
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

export default function CreateRefundPage() {
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<RefundStatus>("Draft");
  const [toast, setToast] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [refundNumber] = useState("RFD-2026-00031");
  const [refundDate, setRefundDate] = useState("2026-07-22");
  const [orderNumber, setOrderNumber] = useState("ORD-2026-00418");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-00418");
  const [selectedCustomerCode, setSelectedCustomerCode] =
    useState("CUS-0001");

  const [refundReason, setRefundReason] =
    useState<RefundReason>("Product Return");

  const [refundMethod, setRefundMethod] =
    useState<RefundMethod>("Original Payment Method");

  const [bankAccount, setBankAccount] = useState(
    "HDFC Bank • Current Account • 4582",
  );

  const [referenceNumber, setReferenceNumber] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [customerRemarks, setCustomerRemarks] = useState(
    "Your refund will be processed after approval.",
  );

  const [restockingFee, setRestockingFee] = useState(0);
  const [shippingDeduction, setShippingDeduction] = useState(0);
  const [otherDeduction, setOtherDeduction] = useState(0);
  const [roundOff, setRoundOff] = useState(0);

  const [items, setItems] = useState<OrderItem[]>(initialItems);
  const [itemSearch, setItemSearch] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const selectedCustomer =
    customers.find((customer) => customer.code === selectedCustomerCode) ??
    customers[0];

  const filteredItems = useMemo(() => {
    const query = itemSearch.trim().toLowerCase();

    if (!query) return items;

    return items.filter(
      (item) =>
        item.product.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query),
    );
  }, [items, itemSearch]);

  const grossRefund = useMemo(() => {
    return items.reduce(
      (total, item) => total + Number(item.refundAmount || 0),
      0,
    );
  }, [items]);

  const totalDeductions =
    Number(restockingFee || 0) +
    Number(shippingDeduction || 0) +
    Number(otherDeduction || 0);

  const netRefund =
    grossRefund - totalDeductions + Number(roundOff || 0);

  const showMessage = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const toggleItem = (id: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        if (item.selected) {
          return {
            ...item,
            selected: false,
            refundQuantity: 0,
            refundAmount: 0,
          };
        }

        return {
          ...item,
          selected: true,
          refundQuantity: item.refundableQuantity,
          refundAmount: item.refundableQuantity * item.unitPrice,
        };
      }),
    );
  };

  const updateRefundQuantity = (id: number, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        const safeQuantity = Math.max(
          0,
          Math.min(Number(quantity || 0), item.refundableQuantity),
        );

        return {
          ...item,
          selected: safeQuantity > 0,
          refundQuantity: safeQuantity,
          refundAmount: safeQuantity * item.unitPrice,
        };
      }),
    );
  };

  const selectAllItems = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected: true,
        refundQuantity: item.refundableQuantity,
        refundAmount: item.refundableQuantity * item.unitPrice,
      })),
    );

    showMessage("All refundable items selected.");
  };

  const clearItems = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected: false,
        refundQuantity: 0,
        refundAmount: 0,
      })),
    );

    showMessage("Refund item selection cleared.");
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

  const validateRefund = () => {
    if (!orderNumber.trim()) {
      showMessage("Please enter an order number.");
      return false;
    }

    if (grossRefund <= 0) {
      showMessage("Select at least one item for refund.");
      return false;
    }

    if (netRefund <= 0) {
      showMessage("Net refund amount must be greater than zero.");
      return false;
    }

    if (
      refundMethod === "Bank Transfer" &&
      !referenceNumber.trim()
    ) {
      showMessage("Enter bank or transaction reference details.");
      return false;
    }

    return true;
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("Refund request saved as draft.");
  };

  const submitRefund = () => {
    if (!validateRefund()) return;

    setStatus("Submitted");
    showMessage("Refund submitted for approval.");
  };

  const approveRefund = () => {
    if (!validateRefund()) return;

    setStatus("Approved");
    showMessage("Refund request approved.");
  };

  const processRefund = () => {
    if (!validateRefund()) return;

    setStatus("Processed");
    showMessage("Refund processed successfully.");
  };

  const rejectRefund = () => {
    setStatus("Rejected");
    showMessage("Refund request rejected.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitRefund();
  };

  const RefundMethodIcon =
    refundMethod === "Bank Transfer"
      ? Landmark
      : refundMethod === "UPI"
        ? Smartphone
        : refundMethod === "Cash"
          ? Banknote
          : refundMethod === "Store Credit"
            ? WalletCards
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
                    Create Customer Refund
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${
                      status === "Processed"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "Approved"
                          ? "bg-blue-100 text-blue-700"
                          : status === "Submitted"
                            ? "bg-violet-100 text-violet-700"
                            : status === "Rejected"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Record order refunds, approvals and payment processing.
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
                onClick={approveRefund}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <BadgeCheck size={17} />
                Approve
              </button>

              <button
                type="button"
                onClick={processRefund}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                <RefreshCcw size={17} />
                Process
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
                    <RefreshCcw size={21} />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Refund Information
                    </h2>

                    <p className="text-xs text-slate-500">
                      Order, invoice and refund details
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Refund Number
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-900">
                    {refundNumber}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Refund Date</label>

                  <div className="relative">
                    <CalendarDays
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="date"
                      value={refundDate}
                      onChange={(event) => setRefundDate(event.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Order Number</label>

                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(event) => setOrderNumber(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Invoice Number</label>

                  <input
                    type="text"
                    value={invoiceNumber}
                    onChange={(event) => setInvoiceNumber(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Refund Reason</label>

                  <div className="relative">
                    <select
                      value={refundReason}
                      onChange={(event) =>
                        setRefundReason(event.target.value as RefundReason)
                      }
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option>Product Return</option>
                      <option>Order Cancellation</option>
                      <option>Damaged Product</option>
                      <option>Incorrect Product</option>
                      <option>Duplicate Payment</option>
                      <option>Overpayment</option>
                      <option>Service Issue</option>
                      <option>Other</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
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
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<UserRound size={21} />}
                title="Customer Information"
                description="Customer and billing details"
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4">
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
                    icon={<PackageCheck size={15} />}
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <PackageCheck size={21} />
                  </div>

                  <div>
                    <h2 className="font-black text-slate-950">
                      Refund Items
                    </h2>

                    <p className="text-xs text-slate-500">
                      Select products and quantities to refund
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={selectAllItems}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#102844] px-4 text-xs font-bold text-white"
                  >
                    <Check size={15} />
                    Select All
                  </button>

                  <button
                    type="button"
                    onClick={clearItems}
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
                    value={itemSearch}
                    onChange={(event) => setItemSearch(event.target.value)}
                    placeholder="Search product or SKU"
                    className={`${inputClass} pl-10`}
                  />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="min-w-[950px] w-full">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <th className="px-4 py-4">Select</th>
                        <th className="px-4 py-4">Product</th>
                        <th className="px-4 py-4">SKU</th>
                        <th className="px-4 py-4 text-right">Unit Price</th>
                        <th className="px-4 py-4 text-right">
                          Refundable Qty.
                        </th>
                        <th className="px-4 py-4 text-right">Refund Qty.</th>
                        <th className="px-4 py-4 text-right">Refund Amount</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="text-sm text-slate-700">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={item.selected}
                              onChange={() => toggleItem(item.id)}
                              className="h-4 w-4 rounded border-slate-300"
                            />
                          </td>

                          <td className="px-4 py-4 font-black text-slate-900">
                            {item.product}
                          </td>

                          <td className="px-4 py-4 text-slate-500">
                            {item.sku}
                          </td>

                          <td className="px-4 py-4 text-right font-semibold">
                            {formatCurrency(item.unitPrice)}
                          </td>

                          <td className="px-4 py-4 text-right font-semibold">
                            {item.refundableQuantity}
                          </td>

                          <td className="px-4 py-4">
                            <input
                              type="number"
                              min="0"
                              max={item.refundableQuantity}
                              value={item.refundQuantity}
                              onChange={(event) =>
                                updateRefundQuantity(
                                  item.id,
                                  Number(event.target.value),
                                )
                              }
                              className="ml-auto h-10 w-28 rounded-xl border border-slate-200 px-3 text-right text-sm font-bold outline-none focus:border-slate-400"
                            />
                          </td>

                          <td className="px-4 py-4 text-right font-black text-slate-900">
                            {formatCurrency(item.refundAmount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<CircleDollarSign size={21} />}
                title="Refund Calculation"
                description="Apply deductions and calculate net refund"
              />

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className={labelClass}>Restocking Fee</label>

                  <input
                    type="number"
                    min="0"
                    value={restockingFee}
                    onChange={(event) =>
                      setRestockingFee(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Shipping Deduction</label>

                  <input
                    type="number"
                    min="0"
                    value={shippingDeduction}
                    onChange={(event) =>
                      setShippingDeduction(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Other Deduction</label>

                  <input
                    type="number"
                    min="0"
                    value={otherDeduction}
                    onChange={(event) =>
                      setOtherDeduction(Number(event.target.value))
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
                icon={<WalletCards size={21} />}
                title="Refund Payment"
                description="Select how the refund will be processed"
              />

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Refund Method</label>

                  <div className="relative">
                    <RefundMethodIcon
                      size={16}
                      className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      value={refundMethod}
                      onChange={(event) =>
                        setRefundMethod(event.target.value as RefundMethod)
                      }
                      className={`${inputClass} appearance-none pl-10 pr-10`}
                    >
                      <option>Original Payment Method</option>
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                      <option>Store Credit</option>
                      <option>Cash</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Payment Account</label>

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
                      <option>KRVE Store Credit Wallet</option>
                      <option>Cash in Hand</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Transaction Reference
                  </label>

                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(event) =>
                      setReferenceNumber(event.target.value)
                    }
                    placeholder="UTR or transaction ID"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <SectionHeader
                icon={<Paperclip size={21} />}
                title="Attachments"
                description="Upload return proof, product images or approval files"
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
                    Upload refund documents
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
                description="Add internal notes and customer-facing remarks"
              />

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Internal Notes</label>

                  <textarea
                    value={internalNotes}
                    onChange={(event) =>
                      setInternalNotes(event.target.value)
                    }
                    placeholder="Add notes for approval and finance teams"
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
                    placeholder="Remarks visible to the customer"
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
                  Refund Summary
                </p>

                <h3 className="mt-2 text-lg font-black">{refundNumber}</h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine
                  label="Customer"
                  value={selectedCustomer.name}
                />

                <SummaryLine label="Order" value={orderNumber} />

                <SummaryLine label="Reason" value={refundReason} />

                <SummaryLine
                  label="Refund Method"
                  value={refundMethod}
                />

                <SummaryLine
                  label="Gross Refund"
                  value={formatCurrency(grossRefund)}
                />

                <SummaryLine
                  label="Deductions"
                  value={formatCurrency(totalDeductions)}
                />

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-bold text-blue-200">
                    Net Refund Amount
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-4">
                    <p
                      className={`text-2xl font-black ${
                        netRefund < 0 ? "text-rose-300" : "text-white"
                      }`}
                    >
                      {formatCurrency(netRefund)}
                    </p>

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
                Approval Workflow
              </h3>

              <div className="mt-5 space-y-4">
                <WorkflowStep
                  title="Refund Created"
                  active
                  complete
                />

                <WorkflowStep
                  title="Submitted for Approval"
                  active={status !== "Draft"}
                  complete={
                    status === "Submitted" ||
                    status === "Approved" ||
                    status === "Processed"
                  }
                />

                <WorkflowStep
                  title="Refund Approved"
                  active={
                    status === "Approved" || status === "Processed"
                  }
                  complete={
                    status === "Approved" || status === "Processed"
                  }
                />

                <WorkflowStep
                  title="Payment Processed"
                  active={status === "Processed"}
                  complete={status === "Processed"}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <AlertTriangle
                  size={20}
                  className="shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-sm font-black text-amber-900">
                    Refund Verification
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    Verify returned items, payment details and approval before
                    processing the refund.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900">
                Refund Controls
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
                  onClick={submitRefund}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#102844] text-sm font-bold text-white transition hover:bg-[#17385f]"
                >
                  <Send size={17} />
                  Submit for Approval
                </button>

                <button
                  type="button"
                  onClick={approveRefund}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <BadgeCheck size={17} />
                  Approve Refund
                </button>

                <button
                  type="button"
                  onClick={processRefund}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  <RefreshCcw size={17} />
                  Process Refund
                </button>

                <button
                  type="button"
                  onClick={rejectRefund}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  <X size={17} />
                  Reject Refund
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
                  Refund Preview
                </h2>

                <p className="text-xs text-slate-500">{refundNumber}</p>
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
                    Refund Note
                  </p>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    {refundNumber}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Refund Date: {refundDate}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Customer
                  </p>

                  <p className="mt-2 font-black text-slate-900">
                    {selectedCustomer.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCustomer.address}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Refund Details
                  </p>

                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Order: {orderNumber}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Reason: {refundReason}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Method: {refundMethod}
                  </p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-4 py-4">Product</th>
                      <th className="px-4 py-4 text-right">Quantity</th>
                      <th className="px-4 py-4 text-right">Amount</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {items
                      .filter((item) => item.refundQuantity > 0)
                      .map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-4 text-sm font-bold text-slate-800">
                            {item.product}
                          </td>

                          <td className="px-4 py-4 text-right text-sm font-semibold text-slate-700">
                            {item.refundQuantity}
                          </td>

                          <td className="px-4 py-4 text-right text-sm font-black text-slate-900">
                            {formatCurrency(item.refundAmount)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto mt-8 max-w-sm rounded-2xl bg-slate-50 p-5">
                <PreviewLine
                  label="Gross Refund"
                  value={formatCurrency(grossRefund)}
                />

                <PreviewLine
                  label="Deductions"
                  value={formatCurrency(totalDeductions)}
                />

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex justify-between gap-4">
                    <span className="font-black text-slate-900">
                      Net Refund
                    </span>

                    <span className="text-lg font-black text-[#102844]">
                      {formatCurrency(netRefund)}
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

function PreviewLine({
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
        {complete ? (
          <Check size={15} />
        ) : (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
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