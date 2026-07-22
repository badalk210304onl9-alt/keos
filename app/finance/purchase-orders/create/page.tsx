"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  IndianRupee,
  PackageCheck,
  Plus,
  Save,
  Send,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type PurchaseOrderStatus =
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Issued";

type PurchaseItem = {
  id: number;
  itemCode: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  taxRate: number;
};

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

const vendors = [
  {
    code: "VEN-0001",
    name: "Luxury Textile Industries",
    gstin: "27AAECL4582H1Z7",
    email: "accounts@luxurytextile.in",
    phone: "+91 98765 11223",
    address: "Lower Parel, Mumbai, Maharashtra",
  },
  {
    code: "VEN-0002",
    name: "Elite Packaging Solutions",
    gstin: "09AACCE7821P1Z4",
    email: "finance@elitepackaging.in",
    phone: "+91 98111 44556",
    address: "Noida, Uttar Pradesh",
  },
  {
    code: "VEN-0003",
    name: "Prime Fashion Accessories",
    gstin: "07AAGFP2891M1Z6",
    email: "sales@primefashion.in",
    phone: "+91 98990 22881",
    address: "New Delhi",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CreatePurchaseOrderPage() {
  const [status, setStatus] = useState<PurchaseOrderStatus>("Draft");
  const [message, setMessage] = useState("");

  const [purchaseOrderNumber] = useState("PO-2026-00124");
  const [orderDate, setOrderDate] = useState("2026-07-22");
  const [expectedDate, setExpectedDate] = useState("2026-07-30");
  const [vendorCode, setVendorCode] = useState("VEN-0001");
  const [company, setCompany] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [branch, setBranch] = useState("Varanasi Head Office");
  const [currency, setCurrency] = useState("INR");
  const [paymentTerms, setPaymentTerms] = useState("Net 30 Days");
  const [shippingCharges, setShippingCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(
    "Goods must be supplied according to approved quality standards.",
  );

  const [items, setItems] = useState<PurchaseItem[]>([
    {
      id: 1,
      itemCode: "FAB-001",
      description: "Premium Black Suiting Fabric",
      quantity: 100,
      unit: "Meter",
      rate: 1250,
      taxRate: 18,
    },
    {
      id: 2,
      itemCode: "ACC-014",
      description: "Metallic Gold Luxury Buttons",
      quantity: 500,
      unit: "Piece",
      rate: 85,
      taxRate: 18,
    },
  ]);

  const selectedVendor =
    vendors.find((vendor) => vendor.code === vendorCode) ?? vendors[0];

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.quantity * item.rate,
        0,
      ),
    [items],
  );

  const taxAmount = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.quantity * item.rate * (item.taxRate / 100),
        0,
      ),
    [items],
  );

  const grandTotal =
    subtotal +
    taxAmount +
    Number(shippingCharges || 0) -
    Number(discount || 0);

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        itemCode: "",
        description: "",
        quantity: 1,
        unit: "Piece",
        rate: 0,
        taxRate: 18,
      },
    ]);
  };

  const updateItem = (
    id: number,
    field: keyof PurchaseItem,
    value: string | number,
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const validatePurchaseOrder = () => {
    if (!vendorCode) {
      showMessage("Please select a vendor.");
      return false;
    }

    if (!items.length) {
      showMessage("Add at least one purchase item.");
      return false;
    }

    if (
      items.some(
        (item) =>
          !item.description.trim() ||
          item.quantity <= 0 ||
          item.rate <= 0,
      )
    ) {
      showMessage("Complete all purchase item details.");
      return false;
    }

    return true;
  };

  const saveDraft = () => {
    setStatus("Draft");
    showMessage("Purchase order saved as draft.");
  };

  const submitOrder = () => {
    if (!validatePurchaseOrder()) return;

    setStatus("Submitted");
    showMessage("Purchase order submitted for approval.");
  };

  const approveOrder = () => {
    if (!validatePurchaseOrder()) return;

    setStatus("Approved");
    showMessage("Purchase order approved.");
  };

  const issueOrder = () => {
    if (!validatePurchaseOrder()) return;

    setStatus("Issued");
    showMessage("Purchase order issued to vendor.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitOrder();
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-2xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={18} />
          </div>

          <p className="text-sm font-bold">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1680px] flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black">
                    Create Purchase Order
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase ${
                      status === "Issued"
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
                  Create purchase requests, manage approvals and issue vendor
                  commitments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold"
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
                onClick={approveOrder}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white"
              >
                <BadgeCheck size={17} />
                Approve
              </button>

              <button
                type="button"
                onClick={issueOrder}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white"
              >
                <PackageCheck size={17} />
                Issue PO
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1680px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <FileText size={21} />
                  </div>

                  <div>
                    <h2 className="font-black">Purchase Order Information</h2>
                    <p className="text-xs text-slate-500">
                      Order, company and delivery details
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    PO Number
                  </p>
                  <p className="mt-1 text-sm font-black">
                    {purchaseOrderNumber}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Order Date</label>
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(event) => setOrderDate(event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Expected Delivery Date
                  </label>
                  <input
                    type="date"
                    value={expectedDate}
                    onChange={(event) => setExpectedDate(event.target.value)}
                    className={inputClass}
                  />
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

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <UserRound size={21} />
                </div>

                <div>
                  <h2 className="font-black">Vendor Information</h2>
                  <p className="text-xs text-slate-500">
                    Select supplier and review billing information
                  </p>
                </div>
              </div>

              <div className="p-6">
                <label className={labelClass}>Vendor</label>

                <select
                  value={vendorCode}
                  onChange={(event) => setVendorCode(event.target.value)}
                  className={inputClass}
                >
                  {vendors.map((vendor) => (
                    <option key={vendor.code} value={vendor.code}>
                      {vendor.name} — {vendor.code}
                    </option>
                  ))}
                </select>

                <div className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Vendor Code
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {selectedVendor.code}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      GSTIN
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {selectedVendor.gstin}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Email
                    </p>
                    <p className="mt-2 truncate text-sm font-bold">
                      {selectedVendor.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Phone
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {selectedVendor.phone}
                    </p>
                  </div>

                  <div className="sm:col-span-2 xl:col-span-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Address
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      {selectedVendor.address}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <PackageCheck size={21} />
                  </div>

                  <div>
                    <h2 className="font-black">Purchase Items</h2>
                    <p className="text-xs text-slate-500">
                      Add products, quantities, rates and taxes
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#102844] px-4 text-xs font-bold text-white"
                >
                  <Plus size={15} />
                  Add Item
                </button>
              </div>

              <div className="overflow-x-auto p-6">
                <table className="min-w-[1050px] w-full">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="px-3 py-4">Item Code</th>
                      <th className="px-3 py-4">Description</th>
                      <th className="px-3 py-4">Quantity</th>
                      <th className="px-3 py-4">Unit</th>
                      <th className="px-3 py-4">Rate</th>
                      <th className="px-3 py-4">GST %</th>
                      <th className="px-3 py-4 text-right">Total</th>
                      <th className="px-3 py-4" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {items.map((item) => {
                      const lineTotal =
                        item.quantity *
                        item.rate *
                        (1 + item.taxRate / 100);

                      return (
                        <tr key={item.id}>
                          <td className="px-3 py-4">
                            <input
                              value={item.itemCode}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "itemCode",
                                  event.target.value,
                                )
                              }
                              className="h-10 w-32 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                            />
                          </td>

                          <td className="px-3 py-4">
                            <input
                              value={item.description}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "description",
                                  event.target.value,
                                )
                              }
                              className="h-10 w-64 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                            />
                          </td>

                          <td className="px-3 py-4">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "quantity",
                                  Number(event.target.value),
                                )
                              }
                              className="h-10 w-24 rounded-xl border border-slate-200 px-3 text-right text-sm font-semibold"
                            />
                          </td>

                          <td className="px-3 py-4">
                            <select
                              value={item.unit}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "unit",
                                  event.target.value,
                                )
                              }
                              className="h-10 w-28 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                            >
                              <option>Piece</option>
                              <option>Meter</option>
                              <option>Kg</option>
                              <option>Box</option>
                            </select>
                          </td>

                          <td className="px-3 py-4">
                            <input
                              type="number"
                              min="0"
                              value={item.rate}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "rate",
                                  Number(event.target.value),
                                )
                              }
                              className="h-10 w-32 rounded-xl border border-slate-200 px-3 text-right text-sm font-semibold"
                            />
                          </td>

                          <td className="px-3 py-4">
                            <select
                              value={item.taxRate}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "taxRate",
                                  Number(event.target.value),
                                )
                              }
                              className="h-10 w-24 rounded-xl border border-slate-200 px-3 text-sm font-semibold"
                            >
                              <option value={0}>0%</option>
                              <option value={5}>5%</option>
                              <option value={12}>12%</option>
                              <option value={18}>18%</option>
                              <option value={28}>28%</option>
                            </select>
                          </td>

                          <td className="px-3 py-4 text-right text-sm font-black">
                            {formatCurrency(lineTotal)}
                          </td>

                          <td className="px-3 py-4">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 size={17} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(event) =>
                      setPaymentTerms(event.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Immediate</option>
                    <option>Net 15 Days</option>
                    <option>Net 30 Days</option>
                    <option>Net 45 Days</option>
                    <option>Net 60 Days</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Internal Notes</label>
                  <input
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Notes for purchase and approval teams"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Terms and Conditions
                  </label>
                  <textarea
                    value={terms}
                    onChange={(event) => setTerms(event.target.value)}
                    className="min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm font-medium outline-none"
                  />
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <section className="overflow-hidden rounded-3xl bg-[#102844] text-white shadow-xl">
              <div className="border-b border-white/10 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                  Purchase Summary
                </p>
                <h3 className="mt-2 text-lg font-black">
                  {purchaseOrderNumber}
                </h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine
                  label="Vendor"
                  value={selectedVendor.name}
                />
                <SummaryLine
                  label="Subtotal"
                  value={formatCurrency(subtotal)}
                />
                <SummaryLine
                  label="Tax"
                  value={formatCurrency(taxAmount)}
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold text-blue-200">
                    Shipping Charges
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={shippingCharges}
                    onChange={(event) =>
                      setShippingCharges(Number(event.target.value))
                    }
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/10 px-3 text-sm font-bold text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-blue-200">
                    Discount
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(event) =>
                      setDiscount(Number(event.target.value))
                    }
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/10 px-3 text-sm font-bold text-white outline-none"
                  />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Grand Total
                  </p>
                  <p className="mt-2 text-2xl font-black">
                    {formatCurrency(grandTotal)}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">Approval Workflow</h3>

              <div className="mt-5 space-y-4">
                <WorkflowStep
                  title="Purchase Order Created"
                  complete
                />
                <WorkflowStep
                  title="Submitted for Approval"
                  complete={status !== "Draft"}
                />
                <WorkflowStep
                  title="Approved"
                  complete={
                    status === "Approved" || status === "Issued"
                  }
                />
                <WorkflowStep
                  title="Issued to Vendor"
                  complete={status === "Issued"}
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