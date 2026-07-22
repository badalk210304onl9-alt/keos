"use client";

import { FormEvent, useState } from "react";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  IndianRupee,
  Mail,
  Plus,
  ReceiptIndianRupee,
  Save,
  Send,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
};

type CreateInvoiceDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const initialItems: InvoiceItem[] = [
  {
    id: 1,
    description: "",
    quantity: 1,
    rate: 0,
    tax: 18,
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function CreateInvoiceDrawer({
  open,
  onClose,
}: CreateInvoiceDrawerProps) {
  const [items, setItems] = useState<InvoiceItem[]>(initialItems);
  const [invoiceNumber] = useState(
    `KRVE-INV-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 9999) + 1,
    ).padStart(4, "0")}`,
  );

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [notes, setNotes] = useState("");
  const [discount, setDiscount] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!open) {
    return null;
  }

  const updateItem = (
    id: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "description" ? value : Number(value || 0),
            }
          : item,
      ),
    );
  };

  const addItem = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        id: Date.now(),
        description: "",
        quantity: 1,
        rate: 0,
        tax: 18,
      },
    ]);
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => {
      if (currentItems.length === 1) {
        return currentItems;
      }

      return currentItems.filter((item) => item.id !== id);
    });
  };

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.rate,
    0,
  );

  const taxAmount = items.reduce(
    (total, item) =>
      total + item.quantity * item.rate * (item.tax / 100),
    0,
  );

  const discountAmount = subtotal * (discount / 100);
  const grandTotal = subtotal + taxAmount - discountAmount;

  const resetForm = () => {
    setItems(initialItems);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerCompany("");
    setInvoiceDate(new Date().toISOString().split("T")[0]);
    setDueDate("");
    setPaymentTerms("Net 30");
    setNotes("");
    setDiscount(0);
    setSaved(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
      handleClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-[120] flex justify-end bg-[#10233b]/50 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close invoice drawer"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />

      <aside className="relative z-10 h-full w-full max-w-[880px] overflow-y-auto bg-[#f5f7fa] shadow-2xl">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                <ReceiptIndianRupee className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d02b3f]">
                  Finance Quick Action
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#10233b]">
                  Create Customer Invoice
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Generate, review and issue a professional customer invoice
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-4 sm:p-6"
        >
          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Invoice Identity
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Document Information
                </h3>
              </div>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-[#10233b]">
                {invoiceNumber}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Invoice Date
                </label>

                <div className="relative mt-2">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    required
                    type="date"
                    value={invoiceDate}
                    onChange={(event) =>
                      setInvoiceDate(event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Due Date
                </label>

                <div className="relative mt-2">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    required
                    type="date"
                    value={dueDate}
                    min={invoiceDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-black text-[#10233b]">
                  Payment Terms
                </label>

                <select
                  value={paymentTerms}
                  onChange={(event) =>
                    setPaymentTerms(event.target.value)
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                >
                  <option>Due on Receipt</option>
                  <option>Net 7</option>
                  <option>Net 15</option>
                  <option>Net 30</option>
                  <option>Net 45</option>
                  <option>Net 60</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Customer Details
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Billing Information
                </h3>
              </div>

              <UserRound className="h-6 w-6 text-[#10233b]" />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Customer Name
                </label>

                <div className="relative mt-2">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    required
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(event.target.value)
                    }
                    placeholder="Enter customer name"
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#10233b]">
                  Customer Email
                </label>

                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    required
                    type="email"
                    value={customerEmail}
                    onChange={(event) =>
                      setCustomerEmail(event.target.value)
                    }
                    placeholder="customer@example.com"
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-black text-[#10233b]">
                  Company / Organization
                </label>

                <div className="relative mt-2">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={customerCompany}
                    onChange={(event) =>
                      setCustomerCompany(event.target.value)
                    }
                    placeholder="Optional company name"
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Invoice Items
                </p>

                <h3 className="mt-2 text-lg font-black text-[#10233b]">
                  Products and Services
                </h3>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white transition hover:bg-[#183653]"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {items.map((item, index) => {
                const itemSubtotal = item.quantity * item.rate;
                const itemTax = itemSubtotal * (item.tax / 100);
                const itemTotal = itemSubtotal + itemTax;

                return (
                  <article
                    key={item.id}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-black uppercase tracking-wider text-[#10233b]">
                        Item {index + 1}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-black text-[#10233b]">
                          Description
                        </label>

                        <div className="relative mt-2">
                          <FileText className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />

                          <textarea
                            required
                            rows={3}
                            value={item.description}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "description",
                                event.target.value,
                              )
                            }
                            placeholder="Product or service description"
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black text-[#10233b]">
                          Quantity
                        </label>

                        <input
                          required
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            updateItem(
                              item.id,
                              "quantity",
                              event.target.value,
                            )
                          }
                          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-black text-[#10233b]">
                          Rate
                        </label>

                        <div className="relative mt-2">
                          <IndianRupee className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            required
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "rate",
                                event.target.value,
                              )
                            }
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black text-[#10233b]">
                          GST Rate
                        </label>

                        <select
                          value={item.tax}
                          onChange={(event) =>
                            updateItem(
                              item.id,
                              "tax",
                              event.target.value,
                            )
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

                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Item Total
                        </p>

                        <p className="mt-2 text-lg font-black text-[#10233b]">
                          {formatCurrency(itemTotal)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Additional Information
              </p>

              <h3 className="mt-2 text-lg font-black text-[#10233b]">
                Notes and Instructions
              </h3>

              <textarea
                rows={7}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Payment instructions, customer notes or invoice terms..."
                className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
              />

              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-violet-50 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />

                <div>
                  <p className="text-sm font-black text-violet-700">
                    KEOS invoice intelligence
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-violet-600">
                    Customer details, payment terms, tax rates and totals will
                    be validated before issuing the invoice.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[26px] bg-[#10233b] p-5 text-white shadow-[0_20px_50px_rgba(15,35,59,0.18)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
                Invoice Summary
              </p>

              <h3 className="mt-2 text-lg font-black">
                Amount Calculation
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    Subtotal
                  </span>

                  <span className="text-sm font-black">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    GST
                  </span>

                  <span className="text-sm font-black">
                    {formatCurrency(taxAmount)}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-sm font-semibold text-slate-300">
                      Discount
                    </label>

                    <span className="text-sm font-black">
                      {discount}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={discount}
                    onChange={(event) =>
                      setDiscount(Number(event.target.value))
                    }
                    className="mt-3 w-full"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-300">
                    Discount Amount
                  </span>

                  <span className="text-sm font-black text-red-300">
                    -{formatCurrency(discountAmount)}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold text-slate-300">
                  Total Payable
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(grandTotal)}
                </p>
              </div>
            </article>
          </section>

          <section className="sticky bottom-0 z-20 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_-14px_45px_rgba(15,35,59,0.10)] backdrop-blur-xl">
            {saved ? (
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                Invoice created successfully
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#10233b] px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  <Send className="h-4 w-4" />
                  Create Invoice
                </button>
              </div>
            )}
          </section>
        </form>
      </aside>
    </div>
  );
}