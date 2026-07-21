"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  BadgeIndianRupee,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileBarChart,
  Filter,
  IndianRupee,
  Landmark,
  LineChart,
  ListFilter,
  Package,
  Plus,
  RefreshCcw,
  Search,
  ShoppingBag,
  Smartphone,
  Store,
  TrendingUp,
  Upload,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type RevenueStatus = "Completed" | "Pending" | "Refunded" | "Failed";
type RevenueChannel =
  | "Website"
  | "Mobile App"
  | "Marketplace"
  | "Retail Store"
  | "Social Commerce";

type RevenueTransaction = {
  id: string;
  orderId: string;
  customer: string;
  customerEmail: string;
  product: string;
  category: string;
  channel: RevenueChannel;
  paymentMethod: string;
  amount: number;
  tax: number;
  discount: number;
  netRevenue: number;
  date: string;
  time: string;
  status: RevenueStatus;
};

const revenueStats = [
  {
    title: "Total Revenue",
    value: "₹18.42L",
    change: "+24.8%",
    description: "Compared with last month",
    icon: BadgeIndianRupee,
    positive: true,
  },
  {
    title: "Net Revenue",
    value: "₹15.86L",
    change: "+21.4%",
    description: "After tax, discounts and refunds",
    icon: CircleDollarSign,
    positive: true,
  },
  {
    title: "Average Order Value",
    value: "₹12,840",
    change: "+8.6%",
    description: "Average revenue per completed order",
    icon: ShoppingBag,
    positive: true,
  },
  {
    title: "Refunded Revenue",
    value: "₹86,420",
    change: "-4.2%",
    description: "Refund amount during this month",
    icon: RefreshCcw,
    positive: false,
  },
];

const monthlyRevenue = [
  { month: "Aug", revenue: 9.2, target: 10.5 },
  { month: "Sep", revenue: 10.4, target: 11.2 },
  { month: "Oct", revenue: 11.1, target: 11.8 },
  { month: "Nov", revenue: 12.8, target: 12.5 },
  { month: "Dec", revenue: 15.2, target: 14.6 },
  { month: "Jan", revenue: 13.6, target: 14.2 },
  { month: "Feb", revenue: 14.8, target: 15.1 },
  { month: "Mar", revenue: 15.4, target: 15.8 },
  { month: "Apr", revenue: 16.1, target: 16.4 },
  { month: "May", revenue: 16.8, target: 17.2 },
  { month: "Jun", revenue: 17.5, target: 18.0 },
  { month: "Jul", revenue: 18.42, target: 18.5 },
];

const categoryRevenue = [
  {
    name: "Luxury Blazers",
    revenue: "₹5.84L",
    percentage: 31.7,
    orders: 284,
    growth: "+28.6%",
  },
  {
    name: "Premium Sneakers",
    revenue: "₹4.26L",
    percentage: 23.1,
    orders: 318,
    growth: "+18.2%",
  },
  {
    name: "Formal Shirts",
    revenue: "₹3.18L",
    percentage: 17.3,
    orders: 426,
    growth: "+15.4%",
  },
  {
    name: "Accessories",
    revenue: "₹2.74L",
    percentage: 14.9,
    orders: 512,
    growth: "+32.8%",
  },
  {
    name: "Luxury Bags",
    revenue: "₹2.40L",
    percentage: 13.0,
    orders: 146,
    growth: "+11.6%",
  },
];

const channelRevenue = [
  {
    name: "Website",
    revenue: "₹8.42L",
    percentage: 45.7,
    orders: 642,
    icon: Store,
  },
  {
    name: "Mobile App",
    revenue: "₹4.18L",
    percentage: 22.7,
    orders: 318,
    icon: Smartphone,
  },
  {
    name: "Marketplace",
    revenue: "₹2.96L",
    percentage: 16.1,
    orders: 244,
    icon: ShoppingBag,
  },
  {
    name: "Retail Store",
    revenue: "₹1.82L",
    percentage: 9.9,
    orders: 118,
    icon: Landmark,
  },
  {
    name: "Social Commerce",
    revenue: "₹1.04L",
    percentage: 5.6,
    orders: 92,
    icon: Users,
  },
];

const paymentMethods = [
  {
    method: "UPI",
    amount: "₹6.82L",
    percentage: 37,
    transactions: 526,
    icon: Smartphone,
  },
  {
    method: "Credit / Debit Card",
    amount: "₹5.46L",
    percentage: 29.6,
    transactions: 388,
    icon: CreditCard,
  },
  {
    method: "Razorpay Wallet",
    amount: "₹2.84L",
    percentage: 15.4,
    transactions: 216,
    icon: WalletCards,
  },
  {
    method: "Cash on Delivery",
    amount: "₹2.16L",
    percentage: 11.7,
    transactions: 142,
    icon: IndianRupee,
  },
  {
    method: "Bank Transfer",
    amount: "₹1.14L",
    percentage: 6.3,
    transactions: 66,
    icon: Landmark,
  },
];

const topProducts = [
  {
    name: "KRVE Noir Double-Breasted Blazer",
    sku: "KRV-BLZ-001",
    revenue: "₹2.86L",
    units: 152,
    growth: "+34.2%",
  },
  {
    name: "KRVE Icon Black Gold Sneakers",
    sku: "KRV-SNK-004",
    revenue: "₹2.18L",
    units: 164,
    growth: "+24.8%",
  },
  {
    name: "KRVE Signature Formal Shirt",
    sku: "KRV-SHT-012",
    revenue: "₹1.72L",
    units: 226,
    growth: "+18.6%",
  },
  {
    name: "KRVE Obsidian Leather Duffle",
    sku: "KRV-BAG-006",
    revenue: "₹1.46L",
    units: 74,
    growth: "+16.4%",
  },
  {
    name: "KRVE Gold Crest Belt",
    sku: "KRV-ACC-009",
    revenue: "₹94,800",
    units: 188,
    growth: "+29.8%",
  },
];

const topCustomers = [
  {
    name: "Arjun Malhotra",
    email: "arjun.malhotra@email.com",
    orders: 12,
    revenue: "₹1,42,860",
    segment: "Platinum",
  },
  {
    name: "Ananya Mehta",
    email: "ananya.mehta@email.com",
    orders: 10,
    revenue: "₹1,18,420",
    segment: "Platinum",
  },
  {
    name: "Rohit Sharma",
    email: "rohit.sharma@email.com",
    orders: 9,
    revenue: "₹96,840",
    segment: "Gold",
  },
  {
    name: "Ishita Kapoor",
    email: "ishita.kapoor@email.com",
    orders: 8,
    revenue: "₹84,260",
    segment: "Gold",
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    orders: 7,
    revenue: "₹76,480",
    segment: "Gold",
  },
];

const revenueTransactions: RevenueTransaction[] = [
  {
    id: "REV-2026-1842",
    orderId: "KRVE-1058",
    customer: "Rohit Sharma",
    customerEmail: "rohit.sharma@email.com",
    product: "KRVE Noir Blazer",
    category: "Luxury Blazers",
    channel: "Website",
    paymentMethod: "Razorpay",
    amount: 18999,
    tax: 2898,
    discount: 1000,
    netRevenue: 15101,
    date: "21 Jul 2026",
    time: "10:42 AM",
    status: "Completed",
  },
  {
    id: "REV-2026-1841",
    orderId: "KRVE-1057",
    customer: "Ananya Mehta",
    customerEmail: "ananya.mehta@email.com",
    product: "KRVE Icon Sneakers",
    category: "Premium Sneakers",
    channel: "Mobile App",
    paymentMethod: "UPI",
    amount: 12499,
    tax: 1906,
    discount: 500,
    netRevenue: 10093,
    date: "21 Jul 2026",
    time: "10:18 AM",
    status: "Completed",
  },
  {
    id: "REV-2026-1840",
    orderId: "KRVE-1056",
    customer: "Ishita Kapoor",
    customerEmail: "ishita.kapoor@email.com",
    product: "KRVE Signature Shirt",
    category: "Formal Shirts",
    channel: "Marketplace",
    paymentMethod: "Credit Card",
    amount: 7999,
    tax: 1220,
    discount: 800,
    netRevenue: 5979,
    date: "21 Jul 2026",
    time: "09:46 AM",
    status: "Pending",
  },
  {
    id: "REV-2026-1839",
    orderId: "KRVE-1055",
    customer: "Vikram Singh",
    customerEmail: "vikram.singh@email.com",
    product: "KRVE Leather Duffle",
    category: "Luxury Bags",
    channel: "Website",
    paymentMethod: "Debit Card",
    amount: 16999,
    tax: 2593,
    discount: 1200,
    netRevenue: 13206,
    date: "21 Jul 2026",
    time: "09:22 AM",
    status: "Refunded",
  },
  {
    id: "REV-2026-1838",
    orderId: "KRVE-1054",
    customer: "Arjun Malhotra",
    customerEmail: "arjun.malhotra@email.com",
    product: "KRVE Gold Crest Belt",
    category: "Accessories",
    channel: "Social Commerce",
    paymentMethod: "UPI",
    amount: 4999,
    tax: 763,
    discount: 0,
    netRevenue: 4236,
    date: "21 Jul 2026",
    time: "08:54 AM",
    status: "Completed",
  },
  {
    id: "REV-2026-1837",
    orderId: "KRVE-1053",
    customer: "Meera Joshi",
    customerEmail: "meera.joshi@email.com",
    product: "KRVE Classic Shirt",
    category: "Formal Shirts",
    channel: "Retail Store",
    paymentMethod: "Cash",
    amount: 6499,
    tax: 991,
    discount: 300,
    netRevenue: 5208,
    date: "20 Jul 2026",
    time: "07:38 PM",
    status: "Completed",
  },
  {
    id: "REV-2026-1836",
    orderId: "KRVE-1052",
    customer: "Kabir Verma",
    customerEmail: "kabir.verma@email.com",
    product: "KRVE Icon Sneakers",
    category: "Premium Sneakers",
    channel: "Website",
    paymentMethod: "Cash on Delivery",
    amount: 13999,
    tax: 2135,
    discount: 700,
    netRevenue: 11164,
    date: "20 Jul 2026",
    time: "06:14 PM",
    status: "Pending",
  },
  {
    id: "REV-2026-1835",
    orderId: "KRVE-1051",
    customer: "Priya Nair",
    customerEmail: "priya.nair@email.com",
    product: "KRVE Noir Blazer",
    category: "Luxury Blazers",
    channel: "Mobile App",
    paymentMethod: "Credit Card",
    amount: 18999,
    tax: 2898,
    discount: 1500,
    netRevenue: 14601,
    date: "20 Jul 2026",
    time: "05:42 PM",
    status: "Failed",
  },
  {
    id: "REV-2026-1834",
    orderId: "KRVE-1050",
    customer: "Aditya Rao",
    customerEmail: "aditya.rao@email.com",
    product: "KRVE Leather Wallet",
    category: "Accessories",
    channel: "Marketplace",
    paymentMethod: "UPI",
    amount: 3999,
    tax: 610,
    discount: 200,
    netRevenue: 3189,
    date: "20 Jul 2026",
    time: "04:16 PM",
    status: "Completed",
  },
  {
    id: "REV-2026-1833",
    orderId: "KRVE-1049",
    customer: "Sara Khan",
    customerEmail: "sara.khan@email.com",
    product: "KRVE Obsidian Duffle",
    category: "Luxury Bags",
    channel: "Website",
    paymentMethod: "Razorpay",
    amount: 15999,
    tax: 2441,
    discount: 1000,
    netRevenue: 12558,
    date: "20 Jul 2026",
    time: "03:05 PM",
    status: "Completed",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function RevenuePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<RevenueTransaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return revenueTransactions.filter((transaction) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        transaction.id.toLowerCase().includes(query) ||
        transaction.orderId.toLowerCase().includes(query) ||
        transaction.customer.toLowerCase().includes(query) ||
        transaction.customerEmail.toLowerCase().includes(query) ||
        transaction.product.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;

      const matchesChannel =
        channelFilter === "All" || transaction.channel === channelFilter;

      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [searchQuery, statusFilter, channelFilter]);

  const totalFilteredRevenue = filteredTransactions
    .filter((transaction) => transaction.status === "Completed")
    .reduce((total, transaction) => total + transaction.netRevenue, 0);

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => Math.max(item.revenue, item.target)),
  );

  function resetFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setChannelFilter("All");
    setDateFilter("This Month");
  }

  return (
    <div className="min-h-full w-full overflow-x-hidden bg-[#f5f7fa]">
      <section className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d02b3f]">
                Finance / Revenue Management
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Revenue Management
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Monitor sales income, revenue channels, product performance,
                collections and transaction records.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <Link
              href="/finance/revenue/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              Record Revenue
            </Link>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {revenueStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10233b] text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span
                    className={[
                      "flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black",
                      stat.positive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-600",
                    ].join(" ")}
                  >
                    {stat.positive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-black tracking-tight text-[#10233b]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.45fr)]">
          <article className="min-w-0 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Revenue Growth
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monthly actual revenue compared with planned target
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-[#10233b]"
              >
                FY 2025–26
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Current Month
                </p>
                <p className="mt-1 text-2xl font-black text-[#10233b]">
                  ₹18.42L
                </p>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Monthly Target
                </p>
                <p className="mt-1 text-2xl font-black text-[#10233b]">
                  ₹18.50L
                </p>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <p className="text-xs font-semibold text-slate-500">
                  Target Achievement
                </p>
                <p className="mt-1 text-2xl font-black text-emerald-600">
                  99.6%
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto pb-2">
              <div className="flex h-[310px] min-w-[760px] items-end gap-4">
                {monthlyRevenue.map((item) => {
                  const revenueHeight = (item.revenue / maxRevenue) * 100;
                  const targetHeight = (item.target / maxRevenue) * 100;

                  return (
                    <div
                      key={item.month}
                      className="flex h-full min-w-0 flex-1 flex-col justify-end"
                    >
                      <div className="flex h-full items-end justify-center gap-1.5">
                        <div
                          title={`Revenue ₹${item.revenue}L`}
                          className="w-4 rounded-t-md bg-[#10233b] transition hover:bg-[#d02b3f]"
                          style={{ height: `${revenueHeight}%` }}
                        />

                        <div
                          title={`Target ₹${item.target}L`}
                          className="w-4 rounded-t-md bg-slate-200 transition hover:bg-slate-300"
                          style={{ height: `${targetHeight}%` }}
                        />
                      </div>

                      <p className="mt-3 text-center text-[10px] font-black uppercase text-slate-400">
                        {item.month}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="h-3 w-3 rounded bg-[#10233b]" />
                Actual Revenue
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span className="h-3 w-3 rounded bg-slate-200" />
                Revenue Target
              </div>
            </div>
          </article>

          <article className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              Revenue Health
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">94</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">
                  Health Score
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <TrendingUp className="h-7 w-7 text-emerald-400" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[94%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Revenue Growth
                  </p>
                  <span className="text-xs font-black text-emerald-400">
                    Excellent
                  </span>
                </div>
                <p className="mt-2 text-xl font-black">+24.8%</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Collection Efficiency
                  </p>
                  <span className="text-xs font-black text-emerald-400">
                    Strong
                  </span>
                </div>
                <p className="mt-2 text-xl font-black">96.4%</p>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-slate-300">
                    Refund Ratio
                  </p>
                  <span className="text-xs font-black text-amber-400">
                    Watch
                  </span>
                </div>
                <p className="mt-2 text-xl font-black">4.7%</p>
              </div>
            </div>

            <Link
              href="/finance/analytics"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open Advanced Analytics
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Revenue by Category
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Product category contribution to total revenue
                </p>
              </div>

              <Package className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-5">
              {categoryRevenue.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {category.name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {category.orders} orders
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-[#10233b]">
                        {category.revenue}
                      </p>
                      <p className="mt-1 text-xs font-black text-emerald-600">
                        {category.growth}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#10233b]"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>

                  <p className="mt-2 text-right text-[10px] font-black text-slate-400">
                    {category.percentage}% contribution
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Revenue by Channel
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Revenue distribution across sales channels
                </p>
              </div>

              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {channelRevenue.map((channel) => {
                const Icon = channel.icon;

                return (
                  <div
                    key={channel.name}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-xs font-black text-emerald-600">
                        {channel.percentage}%
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-black text-[#10233b]">
                      {channel.name}
                    </p>

                    <p className="mt-1 text-2xl font-black text-[#10233b]">
                      {channel.revenue}
                    </p>

                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {channel.orders} completed orders
                    </p>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Payment Method Performance
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Collections received through each payment method
                </p>
              </div>

              <CreditCard className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-3">
              {paymentMethods.map((payment) => {
                const Icon = payment.icon;

                return (
                  <div
                    key={payment.method}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="truncate text-sm font-black text-[#10233b]">
                          {payment.method}
                        </p>
                        <p className="text-sm font-black text-[#10233b]">
                          {payment.amount}
                        </p>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#10233b]"
                          style={{ width: `${payment.percentage}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-4 text-[10px] font-bold text-slate-400">
                        <span>{payment.transactions} transactions</span>
                        <span>{payment.percentage}% share</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Revenue Forecast
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  AI-assisted projection for upcoming period
                </p>
              </div>

              <LineChart className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 rounded-2xl bg-[#10233b] p-5 text-white">
              <p className="text-xs font-semibold text-slate-300">
                Projected August Revenue
              </p>

              <p className="mt-2 text-3xl font-black">₹21.28L</p>

              <div className="mt-3 flex items-center gap-2 text-xs font-black text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                15.5% expected growth
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] font-semibold text-slate-400">
                    Conservative
                  </p>
                  <p className="mt-1 text-sm font-black">₹19.84L</p>
                </div>

                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] font-semibold text-slate-400">
                    Optimistic
                  </p>
                  <p className="mt-1 text-sm font-black">₹23.60L</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Expected Orders
                  </p>
                  <p className="mt-1 text-lg font-black text-[#10233b]">
                    1,628
                  </p>
                </div>
                <ShoppingBag className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Expected AOV
                  </p>
                  <p className="mt-1 text-lg font-black text-[#10233b]">
                    ₹13,072
                  </p>
                </div>
                <BadgeIndianRupee className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Top Revenue Products
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Highest-performing products this month
                </p>
              </div>

              <Link
                href="/products"
                className="text-xs font-black text-[#d02b3f]"
              >
                View Products
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {topProducts.map((product, index) => (
                <div
                  key={product.sku}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-[#10233b]">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {product.sku} · {product.units} units
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-black text-[#10233b]">
                      {product.revenue}
                    </p>
                    <p className="mt-1 text-xs font-black text-emerald-600">
                      {product.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Top Customers
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Highest lifetime value customers this month
                </p>
              </div>

              <Link
                href="/customers"
                className="text-xs font-black text-[#d02b3f]"
              >
                View Customers
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {topCustomers.map((customer) => (
                <div
                  key={customer.email}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-[#10233b]">
                    {customer.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-[#10233b]">
                      {customer.name}
                    </p>
                    <p className="mt-1 truncate text-xs font-medium text-slate-400">
                      {customer.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-black text-[#10233b]">
                      {customer.revenue}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">
                      {customer.orders} orders · {customer.segment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Revenue Transactions
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Search, filter and review all revenue records
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 sm:w-[320px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search order, customer or product..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-[#10233b] outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowFilters((current) => !current)}
                  className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <ListFilter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-4">
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </span>

                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                  >
                    <option>All</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Refunded</option>
                    <option>Failed</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Channel
                  </span>

                  <select
                    value={channelFilter}
                    onChange={(event) => setChannelFilter(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                  >
                    <option>All</option>
                    <option>Website</option>
                    <option>Mobile App</option>
                    <option>Marketplace</option>
                    <option>Retail Store</option>
                    <option>Social Commerce</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Date Range
                  </span>

                  <select
                    value={dateFilter}
                    onChange={(event) => setDateFilter(event.target.value)}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                  >
                    <option>This Month</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                  </select>
                </label>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b]"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Reset Filters
                  </button>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs font-bold text-slate-500">
                Showing{" "}
                <span className="font-black text-[#10233b]">
                  {filteredTransactions.length}
                </span>{" "}
                transactions
              </p>

              <p className="text-xs font-bold text-slate-500">
                Filtered completed revenue:{" "}
                <span className="font-black text-emerald-600">
                  {formatCurrency(totalFilteredRevenue)}
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Revenue ID
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Product
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Channel
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Gross
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Tax
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Discount
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Net Revenue
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Date
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-[#10233b]">
                        {transaction.id}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Order #{transaction.orderId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {transaction.customer}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {transaction.customerEmail}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[220px] truncate text-sm font-bold text-slate-700">
                        {transaction.product}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {transaction.category}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-[#10233b]">
                        {transaction.channel}
                      </span>
                      <p className="mt-2 text-xs font-medium text-slate-400">
                        {transaction.paymentMethod}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                      {formatCurrency(transaction.amount)}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-600">
                      {formatCurrency(transaction.tax)}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-red-500">
                      -{formatCurrency(transaction.discount)}
                    </td>

                    <td className="px-5 py-4 text-sm font-black text-emerald-600">
                      {formatCurrency(transaction.netRevenue)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700">
                        {transaction.date}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {transaction.time}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                          transaction.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : transaction.status === "Pending"
                              ? "bg-amber-50 text-amber-600"
                              : transaction.status === "Refunded"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-red-50 text-red-600",
                        ].join(" ")}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedTransaction(transaction)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-[#10233b] transition hover:bg-[#10233b] hover:text-white"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search className="h-6 w-6" />
                      </div>

                      <p className="mt-4 text-sm font-black text-[#10233b]">
                        No revenue records found
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Change your filters or search query.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-500">
              Page 1 of 1 · {filteredTransactions.length} records
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-300 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10233b] text-xs font-black text-white"
              >
                1
              </button>

              <button
                type="button"
                disabled
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-300 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Successful Collections
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">96.4%</p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Payment collection efficiency remains above the company target.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarDays className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Revenue Recognition
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">₹2.14L</p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Revenue pending recognition due to payment or delivery status.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <FileBarChart className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Revenue Reports
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              18 Reports
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Monthly, channel, product, tax and settlement reports available.
            </p>
          </article>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Revenue Management</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Revenue systems operational</span>
            <span>·</span>
            <span>Last synchronized just now</span>
          </div>
        </footer>
      </main>

      {selectedTransaction && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#071321]/55 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close transaction details"
            onClick={() => setSelectedTransaction(null)}
            className="absolute inset-0"
          />

          <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Revenue Transaction
                </p>

                <h2 className="mt-1 text-xl font-black text-[#10233b]">
                  {selectedTransaction.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
                <p className="text-xs font-semibold text-slate-300">
                  Net Revenue
                </p>

                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(selectedTransaction.netRevenue)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider",
                      selectedTransaction.status === "Completed"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedTransaction.status === "Pending"
                          ? "bg-amber-400/15 text-amber-300"
                          : selectedTransaction.status === "Refunded"
                            ? "bg-blue-400/15 text-blue-300"
                            : "bg-red-400/15 text-red-300",
                    ].join(" ")}
                  >
                    {selectedTransaction.status}
                  </span>

                  <span className="text-xs font-semibold text-slate-300">
                    {selectedTransaction.date} · {selectedTransaction.time}
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Customer Details
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Customer
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedTransaction.customer}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Email
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedTransaction.customerEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Order ID
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      #{selectedTransaction.orderId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Product & Payment
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Product
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedTransaction.product}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Channel
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedTransaction.channel}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Payment
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedTransaction.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Revenue Breakdown
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-slate-500">
                      Gross Amount
                    </span>
                    <span className="font-black text-[#10233b]">
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-slate-500">Tax</span>
                    <span className="font-black text-slate-700">
                      {formatCurrency(selectedTransaction.tax)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-slate-500">
                      Discount
                    </span>
                    <span className="font-black text-red-500">
                      -{formatCurrency(selectedTransaction.discount)}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-black text-[#10233b]">
                        Net Revenue
                      </span>
                      <span className="text-lg font-black text-emerald-600">
                        {formatCurrency(selectedTransaction.netRevenue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>

                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10233b] text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  <Filter className="h-4 w-4" />
                  Open Order
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}