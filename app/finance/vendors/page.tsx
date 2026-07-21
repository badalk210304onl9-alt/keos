"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BadgeIndianRupee,
  Ban,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  FileCheck2,
  FileText,
  Filter,
  Landmark,
  ListFilter,
  Mail,
  MapPin,
  MoreHorizontal,
  PackageCheck,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Star,
  Truck,
  Upload,
  UserRoundCheck,
  WalletCards,
  X,
} from "lucide-react";

type VendorStatus =
  | "Active"
  | "Inactive"
  | "Under Review"
  | "Blocked";

type ComplianceStatus =
  | "Verified"
  | "Pending"
  | "Expired"
  | "Rejected";

type VendorCategory =
  | "Packaging"
  | "Textiles"
  | "Technology"
  | "Logistics"
  | "Marketing"
  | "Office Supplies"
  | "Professional Services";

type Vendor = {
  id: string;
  name: string;
  legalName: string;
  category: VendorCategory;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  gstin: string;
  pan: string;
  bankName: string;
  accountEnding: string;
  paymentTerms: string;
  totalPurchases: number;
  outstanding: number;
  purchaseOrders: number;
  rating: number;
  onTimeDelivery: number;
  qualityScore: number;
  status: VendorStatus;
  compliance: ComplianceStatus;
  joinedDate: string;
  lastOrderDate: string;
  notes: string;
};

const vendorStats = [
  {
    title: "Total Vendors",
    value: "128",
    change: "+14 this year",
    description: "Registered supplier accounts",
    icon: Building2,
    tone: "positive",
  },
  {
    title: "Active Vendors",
    value: "104",
    change: "81.2%",
    description: "Currently approved for procurement",
    icon: UserRoundCheck,
    tone: "positive",
  },
  {
    title: "Outstanding Payables",
    value: "₹6.82L",
    change: "24 invoices",
    description: "Vendor payments currently due",
    icon: WalletCards,
    tone: "warning",
  },
  {
    title: "Compliance Pending",
    value: "12",
    change: "Action required",
    description: "Documents awaiting verification",
    icon: ShieldCheck,
    tone: "danger",
  },
];

const categorySpend = [
  {
    category: "Textiles",
    vendors: 26,
    spend: "₹18.42L",
    percentage: 34,
  },
  {
    category: "Packaging",
    vendors: 18,
    spend: "₹9.86L",
    percentage: 18,
  },
  {
    category: "Marketing",
    vendors: 21,
    spend: "₹8.74L",
    percentage: 16,
  },
  {
    category: "Logistics",
    vendors: 16,
    spend: "₹7.18L",
    percentage: 13,
  },
  {
    category: "Technology",
    vendors: 14,
    spend: "₹5.42L",
    percentage: 10,
  },
  {
    category: "Professional Services",
    vendors: 12,
    spend: "₹4.86L",
    percentage: 9,
  },
];

const paymentSchedule = [
  {
    vendor: "Elite Packaging Pvt. Ltd.",
    invoice: "INV-EP-7841",
    amount: "₹1,42,500",
    dueDate: "22 Jul 2026",
    status: "Due Tomorrow",
  },
  {
    vendor: "Royal Textile House",
    invoice: "INV-RTH-614",
    amount: "₹2,18,400",
    dueDate: "25 Jul 2026",
    status: "Upcoming",
  },
  {
    vendor: "SwiftLogix India",
    invoice: "INV-SL-2486",
    amount: "₹86,240",
    dueDate: "27 Jul 2026",
    status: "Upcoming",
  },
  {
    vendor: "Creator Network India",
    invoice: "INV-CNI-188",
    amount: "₹76,700",
    dueDate: "29 Jul 2026",
    status: "Approval Pending",
  },
];

const vendors: Vendor[] = [
  {
    id: "VEN-2026-001",
    name: "Elite Packaging",
    legalName: "Elite Packaging Private Limited",
    category: "Packaging",
    contactPerson: "Rohit Agarwal",
    email: "accounts@elitepackaging.in",
    phone: "+91 98765 10234",
    city: "Noida",
    state: "Uttar Pradesh",
    gstin: "09AABCE7841K1Z5",
    pan: "AABCE7841K",
    bankName: "HDFC Bank",
    accountEnding: "4821",
    paymentTerms: "Net 30",
    totalPurchases: 986420,
    outstanding: 142500,
    purchaseOrders: 42,
    rating: 4.8,
    onTimeDelivery: 96,
    qualityScore: 94,
    status: "Active",
    compliance: "Verified",
    joinedDate: "12 Jan 2025",
    lastOrderDate: "21 Jul 2026",
    notes:
      "Primary supplier for rigid boxes, metallic foil bags and premium packaging materials.",
  },
  {
    id: "VEN-2026-002",
    name: "Royal Textile House",
    legalName: "Royal Textile House LLP",
    category: "Textiles",
    contactPerson: "Ankit Mehra",
    email: "sales@royaltextilehouse.in",
    phone: "+91 98112 24680",
    city: "Surat",
    state: "Gujarat",
    gstin: "24AAVFR6142P1ZR",
    pan: "AAVFR6142P",
    bankName: "ICICI Bank",
    accountEnding: "6194",
    paymentTerms: "Net 45",
    totalPurchases: 1842680,
    outstanding: 218400,
    purchaseOrders: 68,
    rating: 4.7,
    onTimeDelivery: 92,
    qualityScore: 97,
    status: "Active",
    compliance: "Verified",
    joinedDate: "18 Oct 2024",
    lastOrderDate: "19 Jul 2026",
    notes:
      "Core textile vendor for premium wool, cotton blends and luxury suiting fabrics.",
  },
  {
    id: "VEN-2026-003",
    name: "SwiftLogix India",
    legalName: "SwiftLogix Supply Chain Solutions Limited",
    category: "Logistics",
    contactPerson: "Deepak Yadav",
    email: "finance@swiftlogix.in",
    phone: "+91 98990 44882",
    city: "Gurugram",
    state: "Haryana",
    gstin: "06AAQCS2486L1ZT",
    pan: "AAQCS2486L",
    bankName: "Axis Bank",
    accountEnding: "8836",
    paymentTerms: "Net 15",
    totalPurchases: 718240,
    outstanding: 86240,
    purchaseOrders: 54,
    rating: 4.5,
    onTimeDelivery: 89,
    qualityScore: 91,
    status: "Active",
    compliance: "Verified",
    joinedDate: "05 Feb 2025",
    lastOrderDate: "20 Jul 2026",
    notes:
      "National logistics and fulfilment partner for intercity inventory movement.",
  },
  {
    id: "VEN-2026-004",
    name: "Adobe Systems",
    legalName: "Adobe Systems India Private Limited",
    category: "Technology",
    contactPerson: "Corporate Accounts",
    email: "billing-india@adobe.com",
    phone: "+91 80005 55555",
    city: "Noida",
    state: "Uttar Pradesh",
    gstin: "09AACCA2984J1ZQ",
    pan: "AACCA2984J",
    bankName: "Citibank",
    accountEnding: "2048",
    paymentTerms: "Immediate",
    totalPurchases: 246800,
    outstanding: 0,
    purchaseOrders: 8,
    rating: 4.6,
    onTimeDelivery: 100,
    qualityScore: 95,
    status: "Active",
    compliance: "Verified",
    joinedDate: "01 Apr 2025",
    lastOrderDate: "21 Jul 2026",
    notes:
      "Creative software subscriptions for design, media and marketing teams.",
  },
  {
    id: "VEN-2026-005",
    name: "Creator Network India",
    legalName: "Creator Network India Private Limited",
    category: "Marketing",
    contactPerson: "Sanya Kapoor",
    email: "partnerships@creatornetwork.in",
    phone: "+91 98200 77441",
    city: "Mumbai",
    state: "Maharashtra",
    gstin: "27AAFCC1884N1ZS",
    pan: "AAFCC1884N",
    bankName: "Kotak Mahindra Bank",
    accountEnding: "7642",
    paymentTerms: "50% Advance",
    totalPurchases: 874600,
    outstanding: 76700,
    purchaseOrders: 18,
    rating: 4.2,
    onTimeDelivery: 84,
    qualityScore: 88,
    status: "Under Review",
    compliance: "Pending",
    joinedDate: "16 Mar 2025",
    lastOrderDate: "18 Jul 2026",
    notes:
      "Influencer and creator campaign management partner. Current compliance review is pending.",
  },
  {
    id: "VEN-2026-006",
    name: "Fresh Office Supply",
    legalName: "Fresh Office Supply Company",
    category: "Office Supplies",
    contactPerson: "Pankaj Mishra",
    email: "orders@freshoffice.in",
    phone: "+91 99360 11228",
    city: "Varanasi",
    state: "Uttar Pradesh",
    gstin: "09AANPF7812D1Z7",
    pan: "AANPF7812D",
    bankName: "State Bank of India",
    accountEnding: "3381",
    paymentTerms: "Net 15",
    totalPurchases: 184200,
    outstanding: 0,
    purchaseOrders: 26,
    rating: 4.4,
    onTimeDelivery: 91,
    qualityScore: 89,
    status: "Active",
    compliance: "Verified",
    joinedDate: "24 Jun 2025",
    lastOrderDate: "18 Jul 2026",
    notes:
      "Office stationery, pantry and general administration supply partner.",
  },
  {
    id: "VEN-2026-007",
    name: "Nexora Consulting",
    legalName: "Nexora Business Consulting LLP",
    category: "Professional Services",
    contactPerson: "Madhav Sinha",
    email: "accounts@nexoraconsulting.in",
    phone: "+91 99101 68242",
    city: "New Delhi",
    state: "Delhi",
    gstin: "07AAHFN2942R1Z6",
    pan: "AAHFN2942R",
    bankName: "IDFC First Bank",
    accountEnding: "5242",
    paymentTerms: "Milestone Based",
    totalPurchases: 486000,
    outstanding: 125000,
    purchaseOrders: 7,
    rating: 4.3,
    onTimeDelivery: 86,
    qualityScore: 92,
    status: "Active",
    compliance: "Expired",
    joinedDate: "28 Aug 2025",
    lastOrderDate: "12 Jul 2026",
    notes:
      "Strategy and business advisory vendor. GST document renewal is required.",
  },
  {
    id: "VEN-2026-008",
    name: "Urban Loom Traders",
    legalName: "Urban Loom Traders",
    category: "Textiles",
    contactPerson: "Farhan Khan",
    email: "urbanloomtraders@gmail.com",
    phone: "+91 98254 42861",
    city: "Ahmedabad",
    state: "Gujarat",
    gstin: "24ABDPK4428M1ZX",
    pan: "ABDPK4428M",
    bankName: "Bank of Baroda",
    accountEnding: "9024",
    paymentTerms: "Net 30",
    totalPurchases: 328400,
    outstanding: 0,
    purchaseOrders: 14,
    rating: 3.8,
    onTimeDelivery: 72,
    qualityScore: 74,
    status: "Blocked",
    compliance: "Rejected",
    joinedDate: "07 Dec 2025",
    lastOrderDate: "14 May 2026",
    notes:
      "Vendor blocked following repeated quality and delivery deviations.",
  },
  {
    id: "VEN-2026-009",
    name: "CloudGrid Technologies",
    legalName: "CloudGrid Technologies Private Limited",
    category: "Technology",
    contactPerson: "Ritika Bansal",
    email: "enterprise@cloudgrid.in",
    phone: "+91 80471 29420",
    city: "Bengaluru",
    state: "Karnataka",
    gstin: "29AAHCC2942K1ZR",
    pan: "AAHCC2942K",
    bankName: "Yes Bank",
    accountEnding: "7416",
    paymentTerms: "Annual Advance",
    totalPurchases: 542600,
    outstanding: 0,
    purchaseOrders: 12,
    rating: 4.6,
    onTimeDelivery: 98,
    qualityScore: 96,
    status: "Active",
    compliance: "Verified",
    joinedDate: "11 Nov 2024",
    lastOrderDate: "02 Jul 2026",
    notes:
      "Cloud infrastructure, data storage and enterprise security service provider.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: VendorStatus) {
  if (status === "Active") return "bg-emerald-50 text-emerald-600";
  if (status === "Under Review") return "bg-amber-50 text-amber-600";
  if (status === "Blocked") return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-500";
}

function getComplianceClass(status: ComplianceStatus) {
  if (status === "Verified") return "bg-emerald-50 text-emerald-600";
  if (status === "Pending") return "bg-amber-50 text-amber-600";
  if (status === "Expired") return "bg-orange-50 text-orange-600";
  return "bg-red-50 text-red-600";
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [complianceFilter, setComplianceFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        vendor.id.toLowerCase().includes(query) ||
        vendor.name.toLowerCase().includes(query) ||
        vendor.legalName.toLowerCase().includes(query) ||
        vendor.contactPerson.toLowerCase().includes(query) ||
        vendor.email.toLowerCase().includes(query) ||
        vendor.gstin.toLowerCase().includes(query) ||
        vendor.city.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || vendor.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || vendor.category === categoryFilter;

      const matchesCompliance =
        complianceFilter === "All" ||
        vendor.compliance === complianceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesCompliance
      );
    });
  }, [
    searchQuery,
    statusFilter,
    categoryFilter,
    complianceFilter,
  ]);

  const filteredOutstanding = filteredVendors.reduce(
    (total, vendor) => total + vendor.outstanding,
    0,
  );

  function resetFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setComplianceFilter("All");
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
                Finance / Vendor Management
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Vendor Management
              </h1>

              <p className="mt-1 max-w-3xl text-sm font-medium text-slate-500">
                Manage suppliers, compliance, purchasing performance,
                outstanding balances and vendor relationships.
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
              href="/finance/vendors/create"
              className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              <Plus className="h-4 w-4" />
              Add Vendor
            </Link>
          </div>
        </div>
      </section>

      <main className="space-y-5 p-4 sm:p-6 lg:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {vendorStats.map((stat) => {
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
                      "rounded-full px-2.5 py-1 text-[10px] font-black",
                      stat.tone === "positive"
                        ? "bg-emerald-50 text-emerald-600"
                        : stat.tone === "warning"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600",
                    ].join(" ")}
                  >
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

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Vendor Spend by Category
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Purchase value and supplier distribution by category
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-black text-[#10233b]"
              >
                FY 2025–26
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {categorySpend.map((item) => (
                <div
                  key={item.category}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#10233b]">
                        {item.category}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {item.vendors} registered vendors
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-[#10233b]">
                        {item.spend}
                      </p>

                      <p className="mt-1 text-xs font-black text-slate-400">
                        {item.percentage}% spend
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#10233b]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.18)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-400">
              Vendor Performance
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">91</p>
                <p className="mt-1 text-sm font-semibold text-slate-300">
                  Average vendor score
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Star className="h-7 w-7 text-amber-400" />
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[91%] rounded-full bg-emerald-400" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    On-Time Delivery
                  </p>
                  <p className="mt-1 text-lg font-black">92.4%</p>
                </div>

                <Truck className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Quality Acceptance
                  </p>
                  <p className="mt-1 text-lg font-black">94.8%</p>
                </div>

                <PackageCheck className="h-5 w-5 text-blue-400" />
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300">
                    Compliance Rate
                  </p>
                  <p className="mt-1 text-lg font-black">90.6%</p>
                </div>

                <ShieldCheck className="h-5 w-5 text-amber-400" />
              </div>
            </div>

            <Link
              href="/finance/vendors/performance"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              Open Vendor Analytics
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_400px]">
          <article className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#10233b]">
                    Vendor Directory
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Search, filter and review all supplier accounts
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative sm:w-[320px]">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search vendor, GSTIN or city..."
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
                    onClick={() =>
                      setShowFilters((current) => !current)
                    }
                    className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <ListFilter className="h-4 w-4" />
                    Filters
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-5 grid grid-cols-1 gap-4 rounded-2xl bg-slate-50 p-4 md:grid-cols-4">
                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vendor Status
                    </span>

                    <select
                      value={statusFilter}
                      onChange={(event) =>
                        setStatusFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Under Review</option>
                      <option>Blocked</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </span>

                    <select
                      value={categoryFilter}
                      onChange={(event) =>
                        setCategoryFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Packaging</option>
                      <option>Textiles</option>
                      <option>Technology</option>
                      <option>Logistics</option>
                      <option>Marketing</option>
                      <option>Office Supplies</option>
                      <option>Professional Services</option>
                    </select>
                  </label>

                  <label>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Compliance
                    </span>

                    <select
                      value={complianceFilter}
                      onChange={(event) =>
                        setComplianceFilter(event.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#10233b] outline-none"
                    >
                      <option>All</option>
                      <option>Verified</option>
                      <option>Pending</option>
                      <option>Expired</option>
                      <option>Rejected</option>
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

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <p className="text-xs font-bold text-slate-500">
                  Showing{" "}
                  <span className="font-black text-[#10233b]">
                    {filteredVendors.length}
                  </span>{" "}
                  vendors
                </p>

                <p className="text-xs font-bold text-slate-500">
                  Outstanding balance:{" "}
                  <span className="font-black text-[#d02b3f]">
                    {formatCurrency(filteredOutstanding)}
                  </span>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1300px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Vendor
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Contact
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Category
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Purchases
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Outstanding
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Performance
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Compliance
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Last Order
                    </th>
                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-sm font-black text-white">
                            {vendor.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {vendor.name}
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                              {vendor.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {vendor.contactPerson}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {vendor.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-[#10233b]">
                          {vendor.category}
                        </span>

                        <p className="mt-2 text-xs font-medium text-slate-400">
                          {vendor.city}, {vendor.state}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-[#10233b]">
                          {formatCurrency(vendor.totalPurchases)}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {vendor.purchaseOrders} purchase orders
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p
                          className={[
                            "text-sm font-black",
                            vendor.outstanding > 0
                              ? "text-[#d02b3f]"
                              : "text-emerald-600",
                          ].join(" ")}
                        >
                          {formatCurrency(vendor.outstanding)}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {vendor.paymentTerms}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-sm font-black text-[#10233b]">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          {vendor.rating}
                        </div>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Delivery {vendor.onTimeDelivery}%
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getComplianceClass(vendor.compliance),
                          ].join(" ")}
                        >
                          {vendor.compliance}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getStatusClass(vendor.status),
                          ].join(" ")}
                        >
                          {vendor.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {vendor.lastOrderDate}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-400">
                          Joined {vendor.joinedDate}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedVendor(vendor)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-[#10233b] transition hover:bg-[#10233b] hover:text-white"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredVendors.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-5 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Search className="h-6 w-6" />
                        </div>

                        <p className="mt-4 text-sm font-black text-[#10233b]">
                          No vendors found
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-500">
                          Change your search or filter selection.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-bold text-slate-500">
                Page 1 of 1 · {filteredVendors.length} vendor records
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-300"
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-[#10233b]">
                  Payment Schedule
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Upcoming vendor dues
                </p>
              </div>

              <CalendarDays className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-5 space-y-3">
              {paymentSchedule.map((payment) => (
                <button
                  key={payment.invoice}
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#10233b]">
                        {payment.vendor}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {payment.invoice}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-black text-[#d02b3f]">
                      {payment.amount}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock3 className="h-3.5 w-3.5" />
                      {payment.dueDate}
                    </span>

                    <span
                      className={[
                        "rounded-full px-2 py-1 text-[9px] font-black uppercase",
                        payment.status === "Due Tomorrow"
                          ? "bg-red-50 text-red-600"
                          : payment.status === "Approval Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600",
                      ].join(" ")}
                    >
                      {payment.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <Link
              href="/finance/payments"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
            >
              Open Vendor Payments
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <BadgeCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Verified Vendors
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              116
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Vendors with complete tax, banking and compliance records.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Compliance Expiring
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              8 Vendors
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Documents will expire within the next thirty days.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CircleDollarSign className="h-5 w-5" />
            </div>

            <h3 className="mt-4 text-sm font-black text-[#10233b]">
              Negotiated Savings
            </h3>

            <p className="mt-2 text-2xl font-black text-[#10233b]">
              ₹4.28L
            </p>

            <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
              Estimated annual savings from supplier negotiations.
            </p>
          </article>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Vendor Management</p>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Vendor systems operational</span>
            <span>·</span>
            <span>Last synchronized just now</span>
          </div>
        </footer>
      </main>

      {selectedVendor && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-[#071321]/55 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close vendor details"
            onClick={() => setSelectedVendor(null)}
            className="absolute inset-0"
          />

          <aside className="relative z-10 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                  Vendor Profile
                </p>

                <h2 className="mt-1 text-xl font-black text-[#10233b]">
                  {selectedVendor.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVendor(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="rounded-[24px] bg-[#10233b] p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-300">
                      Total Purchases
                    </p>

                    <p className="mt-2 text-3xl font-black">
                      {formatCurrency(selectedVendor.totalPurchases)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-sm font-black">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {selectedVendor.rating}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span
                    className={[
                      "rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider",
                      selectedVendor.status === "Active"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : selectedVendor.status === "Under Review"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-red-400/15 text-red-300",
                    ].join(" ")}
                  >
                    {selectedVendor.status}
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase text-slate-200">
                    {selectedVendor.category}
                  </span>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Company Information
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Legal Name
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedVendor.legalName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        GSTIN
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedVendor.gstin}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        PAN
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-700">
                        {selectedVendor.pan}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <MapPin className="h-5 w-5 text-slate-400" />

                    <p className="text-sm font-bold text-slate-700">
                      {selectedVendor.city}, {selectedVendor.state}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Contact Person
                </h3>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <UserRoundCheck className="h-5 w-5 text-slate-400" />

                    <p className="text-sm font-bold text-slate-700">
                      {selectedVendor.contactPerson}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <Mail className="h-5 w-5 text-slate-400" />

                    <p className="text-sm font-bold text-slate-700">
                      {selectedVendor.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <Phone className="h-5 w-5 text-slate-400" />

                    <p className="text-sm font-bold text-slate-700">
                      {selectedVendor.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Banking & Payment
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Bank
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedVendor.bankName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Account
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      •••• {selectedVendor.accountEnding}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Payment Terms
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {selectedVendor.paymentTerms}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Outstanding
                    </p>

                    <p className="mt-1 text-sm font-black text-[#d02b3f]">
                      {formatCurrency(selectedVendor.outstanding)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Performance
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold text-slate-500">
                        On-Time Delivery
                      </p>

                      <p className="text-xs font-black text-[#10233b]">
                        {selectedVendor.onTimeDelivery}%
                      </p>
                    </div>

                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#10233b]"
                        style={{
                          width: `${selectedVendor.onTimeDelivery}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold text-slate-500">
                        Quality Score
                      </p>

                      <p className="text-xs font-black text-[#10233b]">
                        {selectedVendor.qualityScore}%
                      </p>
                    </div>

                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{
                          width: `${selectedVendor.qualityScore}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-slate-200 p-5">
                <h3 className="text-sm font-black text-[#10233b]">
                  Notes
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {selectedVendor.notes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-sm font-black text-[#10233b]"
                >
                  <FileText className="h-4 w-4" />
                  Vendor Ledger
                </button>

                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#10233b] text-sm font-black text-white"
                >
                  <Filter className="h-4 w-4" />
                  Edit Vendor
                </button>
              </div>

              {selectedVendor.status !== "Blocked" ? (
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 text-sm font-black text-red-600 transition hover:bg-red-50"
                >
                  <Ban className="h-4 w-4" />
                  Block Vendor
                </button>
              ) : (
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-black text-white"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Reactivate Vendor
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}