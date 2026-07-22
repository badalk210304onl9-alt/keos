"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
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
} from "lucide-react";

type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function CreateSalesInvoicePage() {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: 1,
      description: "",
      quantity: 1,
      rate: 0,
      tax: 18,
    },
  ]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const invoiceNumber = useMemo(
    () =>
      `KRVE-INV-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 9999) + 1,
      ).padStart(4, "0")}`,
    [],
  );

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
    setItems((currentItems) =>
      currentItems.length === 1
        ? currentItems
        : currentItems.filter((item) => item.id !== id),
    );
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d02b3f]">
                Sales Invoices
              </p>

              <h1 className="mt-2 text-2xl font-black text-[#10233b] sm:text-3xl">
                Create Customer Invoice
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Generate and issue a professional KRVE customer invoice
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-[#10233b]">
            {invoiceNumber}
          </span>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl space-y-5 p-4 sm:p-6 lg:p-8"
      >
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Invoice Details
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Document Information
                  </h2>
                </div>

                <ReceiptIndianRupee className="h-6 w-6 text-[#10233b]" />
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
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
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
                      min={invoiceDate}
                      value={dueDate}
                      onChange={(event) => setDueDate(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none transition focus:border-[#10233b]"
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

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Customer
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Billing Information
                  </h2>
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
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none placeholder:text-slate-400 focus:border-[#10233b]"
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
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none placeholder:text-slate-400 focus:border-[#10233b]"
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
                      className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none placeholder:text-slate-400 focus:border-[#10233b]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    Invoice Items
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Products and Services
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={addItem}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#10233b] px-4 text-xs font-black text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </button>
              </div>

              <div className="mt-5 space-y-4">
                {items.map((item, index) => (
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
                        disabled={items.length === 1}
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 disabled:opacity-40"
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
                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none placeholder:text-slate-400 focus:border-[#10233b]"
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
                          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
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
                            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
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
                          className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#10233b] outline-none focus:border-[#10233b]"
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
                          {formatCurrency(
                            item.quantity *
                              item.rate *
                              (1 + item.tax / 100),
                          )}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Notes
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Additional Information
              </h2>

              <textarea
                rows={6}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Payment instructions, customer notes or invoice terms..."
                className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-[#10233b] outline-none placeholder:text-slate-400 focus:border-[#10233b]"
              />

              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-violet-50 p-4">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />

                <div>
                  <p className="text-sm font-black text-violet-700">
                    KEOS invoice intelligence
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-violet-600">
                    Tax rates, totals and customer information will be
                    validated before issuing the invoice.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_20px_50px_rgba(15,35,59,0.18)] sm:p-6 xl:sticky xl:top-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
              Invoice Summary
            </p>

            <h2 className="mt-2 text-xl font-black">
              Amount Calculation
            </h2>

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

                  <span className="text-sm font-black">{discount}%</span>
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

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-black text-white"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b]"
              >
                <Send className="h-4 w-4" />
                Create Invoice
              </button>
            </div>

            {saved && (
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-emerald-400/15 p-4 text-sm font-black text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                Invoice created successfully
              </div>
            )}
          </aside>
        </section>
      </form>
    </main>
  );
}