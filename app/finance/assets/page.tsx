"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Barcode,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileDown,
  IndianRupee,
  Laptop,
  MapPin,
  MoreHorizontal,
  PackageCheck,
  Plus,
  QrCode,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  Truck,
  Wrench,
  X,
} from "lucide-react";

type AssetStatus =
  | "Active"
  | "Under Maintenance"
  | "Idle"
  | "Disposed"
  | "Lost";

type AssetCondition =
  | "Excellent"
  | "Good"
  | "Fair"
  | "Poor"
  | "Critical";

type DepreciationMethod =
  | "Straight Line"
  | "Written Down Value"
  | "No Depreciation";

type AssetCategory =
  | "IT Equipment"
  | "Furniture"
  | "Warehouse Equipment"
  | "Vehicles"
  | "Office Equipment"
  | "Creative Equipment";

type Asset = {
  id: string;
  name: string;
  category: AssetCategory;
  serialNumber: string;
  barcode: string;
  department: string;
  location: string;
  assignedTo: string;
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  accumulatedDepreciation: number;
  depreciationMethod: DepreciationMethod;
  usefulLife: number;
  condition: AssetCondition;
  status: AssetStatus;
  nextMaintenance: string;
  vendor: string;
  warrantyExpiry: string;
  description: string;
};

const assets: Asset[] = [
  {
    id: "AST-KEOS-0001",
    name: "MacBook Pro M3 Max",
    category: "IT Equipment",
    serialNumber: "KRVE-MBP-2026-001",
    barcode: "890100000001",
    department: "Founder Office",
    location: "Executive Office · Varanasi",
    assignedTo: "Founder",
    purchaseDate: "12 Apr 2026",
    purchaseValue: 349900,
    currentValue: 314910,
    accumulatedDepreciation: 34990,
    depreciationMethod: "Straight Line",
    usefulLife: 5,
    condition: "Excellent",
    status: "Active",
    nextMaintenance: "12 Oct 2026",
    vendor: "Apple India",
    warrantyExpiry: "11 Apr 2027",
    description:
      "Primary founder workstation used for KEOS administration, strategic planning and product supervision.",
  },
  {
    id: "AST-KEOS-0002",
    name: "Dell Precision Workstation",
    category: "IT Equipment",
    serialNumber: "KRVE-DPW-2026-002",
    barcode: "890100000002",
    department: "Technology",
    location: "Technology Lab · Varanasi",
    assignedTo: "AI Engineering Team",
    purchaseDate: "18 Mar 2026",
    purchaseValue: 285000,
    currentValue: 249375,
    accumulatedDepreciation: 35625,
    depreciationMethod: "Written Down Value",
    usefulLife: 5,
    condition: "Good",
    status: "Active",
    nextMaintenance: "18 Sep 2026",
    vendor: "Dell Technologies",
    warrantyExpiry: "17 Mar 2029",
    description:
      "High-performance development workstation used for AI model testing and virtual try-on development.",
  },
  {
    id: "AST-KEOS-0003",
    name: "Sony Alpha Cinema Camera",
    category: "Creative Equipment",
    serialNumber: "KRVE-CAM-2026-003",
    barcode: "890100000003",
    department: "Creative Studio",
    location: "Content Studio · Varanasi",
    assignedTo: "Creative Production Team",
    purchaseDate: "06 Feb 2026",
    purchaseValue: 420000,
    currentValue: 367500,
    accumulatedDepreciation: 52500,
    depreciationMethod: "Straight Line",
    usefulLife: 6,
    condition: "Excellent",
    status: "Active",
    nextMaintenance: "06 Aug 2026",
    vendor: "Sony India",
    warrantyExpiry: "05 Feb 2028",
    description:
      "Cinema-grade camera used for luxury fashion campaigns, product photography and social media production.",
  },
  {
    id: "AST-KEOS-0004",
    name: "Industrial Garment Rack System",
    category: "Warehouse Equipment",
    serialNumber: "KRVE-RACK-2026-004",
    barcode: "890100000004",
    department: "Warehouse & Logistics",
    location: "Main Warehouse · Varanasi",
    assignedTo: "Warehouse Operations",
    purchaseDate: "22 Jan 2026",
    purchaseValue: 580000,
    currentValue: 536500,
    accumulatedDepreciation: 43500,
    depreciationMethod: "Straight Line",
    usefulLife: 10,
    condition: "Good",
    status: "Active",
    nextMaintenance: "22 Jul 2026",
    vendor: "StoreMax Systems",
    warrantyExpiry: "21 Jan 2028",
    description:
      "Modular warehouse garment storage system for premium apparel inventory.",
  },
  {
    id: "AST-KEOS-0005",
    name: "Electric Delivery Vehicle",
    category: "Vehicles",
    serialNumber: "KRVE-EV-2026-005",
    barcode: "890100000005",
    department: "Warehouse & Logistics",
    location: "Distribution Hub · Varanasi",
    assignedTo: "Last-Mile Delivery Team",
    purchaseDate: "15 Dec 2025",
    purchaseValue: 1280000,
    currentValue: 1088000,
    accumulatedDepreciation: 192000,
    depreciationMethod: "Written Down Value",
    usefulLife: 8,
    condition: "Good",
    status: "Under Maintenance",
    nextMaintenance: "24 Jul 2026",
    vendor: "Tata Motors",
    warrantyExpiry: "14 Dec 2028",
    description:
      "Electric commercial vehicle used for local inventory transfer and premium customer deliveries.",
  },
  {
    id: "AST-KEOS-0006",
    name: "Executive Conference Table",
    category: "Furniture",
    serialNumber: "KRVE-FUR-2026-006",
    barcode: "890100000006",
    department: "Founder Office",
    location: "Board Room · Varanasi",
    assignedTo: "Executive Management",
    purchaseDate: "03 Jan 2026",
    purchaseValue: 210000,
    currentValue: 194250,
    accumulatedDepreciation: 15750,
    depreciationMethod: "Straight Line",
    usefulLife: 10,
    condition: "Excellent",
    status: "Active",
    nextMaintenance: "03 Jan 2027",
    vendor: "Luxury Office Interiors",
    warrantyExpiry: "02 Jan 2029",
    description:
      "Premium executive conference table used for board meetings and strategic reviews.",
  },
  {
    id: "AST-KEOS-0007",
    name: "Inventory Barcode Scanner Set",
    category: "Warehouse Equipment",
    serialNumber: "KRVE-BAR-2026-007",
    barcode: "890100000007",
    department: "Warehouse & Logistics",
    location: "Main Warehouse · Varanasi",
    assignedTo: "Inventory Control Team",
    purchaseDate: "11 Apr 2026",
    purchaseValue: 145000,
    currentValue: 130500,
    accumulatedDepreciation: 14500,
    depreciationMethod: "Straight Line",
    usefulLife: 5,
    condition: "Fair",
    status: "Active",
    nextMaintenance: "11 Aug 2026",
    vendor: "Zebra Technologies",
    warrantyExpiry: "10 Apr 2028",
    description:
      "Handheld barcode scanners used for receiving, picking, packing and stock audits.",
  },
  {
    id: "AST-KEOS-0008",
    name: "High-Speed Office Printer",
    category: "Office Equipment",
    serialNumber: "KRVE-PRN-2025-008",
    barcode: "890100000008",
    department: "Finance",
    location: "Finance Office · Varanasi",
    assignedTo: "Finance Operations",
    purchaseDate: "24 Nov 2025",
    purchaseValue: 86000,
    currentValue: 64500,
    accumulatedDepreciation: 21500,
    depreciationMethod: "Written Down Value",
    usefulLife: 5,
    condition: "Poor",
    status: "Under Maintenance",
    nextMaintenance: "22 Jul 2026",
    vendor: "Canon India",
    warrantyExpiry: "23 Nov 2026",
    description:
      "High-volume printer used for financial statements, invoices and statutory documents.",
  },
  {
    id: "AST-KEOS-0009",
    name: "Studio Lighting Kit",
    category: "Creative Equipment",
    serialNumber: "KRVE-LGT-2025-009",
    barcode: "890100000009",
    department: "Creative Studio",
    location: "Content Studio · Varanasi",
    assignedTo: "Photography Team",
    purchaseDate: "12 Oct 2025",
    purchaseValue: 175000,
    currentValue: 131250,
    accumulatedDepreciation: 43750,
    depreciationMethod: "Straight Line",
    usefulLife: 5,
    condition: "Fair",
    status: "Idle",
    nextMaintenance: "12 Aug 2026",
    vendor: "Godox India",
    warrantyExpiry: "11 Oct 2026",
    description:
      "Professional lighting equipment for product shoots and editorial fashion campaigns.",
  },
  {
    id: "AST-KEOS-0010",
    name: "Legacy Desktop Computer",
    category: "IT Equipment",
    serialNumber: "KRVE-PC-2023-010",
    barcode: "890100000010",
    department: "Customer Experience",
    location: "Support Office · Varanasi",
    assignedTo: "Unassigned",
    purchaseDate: "18 Jun 2023",
    purchaseValue: 72000,
    currentValue: 11800,
    accumulatedDepreciation: 60200,
    depreciationMethod: "Written Down Value",
    usefulLife: 4,
    condition: "Critical",
    status: "Disposed",
    nextMaintenance: "Not Applicable",
    vendor: "HP India",
    warrantyExpiry: "Expired",
    description:
      "Legacy desktop retired due to performance limitations and increasing maintenance cost.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getStatusClass(status: AssetStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Under Maintenance":
      return "bg-amber-50 text-amber-700";
    case "Idle":
      return "bg-blue-50 text-blue-700";
    case "Disposed":
      return "bg-slate-100 text-slate-600";
    case "Lost":
      return "bg-red-50 text-red-700";
  }
}

function getConditionClass(condition: AssetCondition) {
  switch (condition) {
    case "Excellent":
      return "bg-emerald-50 text-emerald-700";
    case "Good":
      return "bg-blue-50 text-blue-700";
    case "Fair":
      return "bg-amber-50 text-amber-700";
    case "Poor":
      return "bg-orange-50 text-orange-700";
    case "Critical":
      return "bg-red-50 text-red-700";
  }
}

function getCategoryIcon(category: AssetCategory) {
  switch (category) {
    case "IT Equipment":
      return Laptop;
    case "Warehouse Equipment":
      return Boxes;
    case "Vehicles":
      return Truck;
    case "Creative Equipment":
      return PackageCheck;
    case "Furniture":
      return Building2;
    case "Office Equipment":
      return FileDown;
  }
}

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [selectedAsset, setSelectedAsset] =
    useState<Asset | null>(null);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        asset.id.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query) ||
        asset.serialNumber.toLowerCase().includes(query) ||
        asset.department.toLowerCase().includes(query) ||
        asset.assignedTo.toLowerCase().includes(query) ||
        asset.location.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        asset.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        asset.status === statusFilter;

      const matchesCondition =
        conditionFilter === "All" ||
        asset.condition === conditionFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesCondition
      );
    });
  }, [
    searchQuery,
    categoryFilter,
    statusFilter,
    conditionFilter,
  ]);

  const totalPurchaseValue = assets.reduce(
    (sum, asset) => sum + asset.purchaseValue,
    0,
  );

  const totalCurrentValue = assets.reduce(
    (sum, asset) => sum + asset.currentValue,
    0,
  );

  const totalDepreciation = assets.reduce(
    (sum, asset) => sum + asset.accumulatedDepreciation,
    0,
  );

  const maintenanceAssets = assets.filter(
    (asset) => asset.status === "Under Maintenance",
  ).length;

  const activeAssets = assets.filter(
    (asset) => asset.status === "Active",
  ).length;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#10233b]">
      <main className="mx-auto w-full max-w-[1900px] space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <section className="rounded-[30px] bg-[#10233b] p-5 text-white shadow-[0_24px_70px_rgba(15,35,59,0.16)] sm:p-7">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <Link
                href="/finance"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-300 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Finance Command Center
              </Link>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
                  <Boxes className="h-7 w-7" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      Asset System Active
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-300">
                      FY 2026–27
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl">
                    Fixed Assets Management
                  </h1>

                  <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-300">
                    Enterprise asset register, depreciation tracking,
                    assignment control, maintenance management and
                    disposal governance.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-100"
              >
                <Plus className="h-4 w-4" />
                Add Asset
              </button>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                <QrCode className="h-4 w-4" />
                Scan QR
              </button>

              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Export Register
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              title: "Total Assets",
              value: assets.length.toString(),
              detail: `${activeAssets} active`,
              icon: Boxes,
              iconClass: "bg-blue-50 text-blue-600",
            },
            {
              title: "Purchase Value",
              value: formatCompactCurrency(totalPurchaseValue),
              detail: "Gross asset cost",
              icon: CircleDollarSign,
              iconClass: "bg-purple-50 text-purple-600",
            },
            {
              title: "Current Book Value",
              value: formatCompactCurrency(totalCurrentValue),
              detail: "Net carrying value",
              icon: IndianRupee,
              iconClass: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Accumulated Depreciation",
              value: formatCompactCurrency(totalDepreciation),
              detail: `${(
                (totalDepreciation / totalPurchaseValue) *
                100
              ).toFixed(1)}% depreciated`,
              icon: TrendingDown,
              iconClass: "bg-red-50 text-red-600",
            },
            {
              title: "Under Maintenance",
              value: maintenanceAssets.toString(),
              detail: "Requires attention",
              icon: Wrench,
              iconClass: "bg-amber-50 text-amber-600",
            },
          ].map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    card.iconClass,
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-5 text-xs font-bold text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-black tracking-tight text-[#10233b]">
                  {card.value}
                </p>

                <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {card.detail}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.6fr)]">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Asset Valuation
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Asset Value & Depreciation Overview
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Gross acquisition value compared with current book
                  value.
                </p>
              </div>

              <TrendingDown className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-500">
                  Original Asset Cost
                </p>

                <p className="mt-2 text-2xl font-black text-[#10233b]">
                  {formatCompactCurrency(totalPurchaseValue)}
                </p>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-full rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-500">
                  Current Book Value
                </p>

                <p className="mt-2 text-2xl font-black text-emerald-600">
                  {formatCompactCurrency(totalCurrentValue)}
                </p>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.min(
                        (totalCurrentValue /
                          totalPurchaseValue) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold text-slate-500">
                  Value Consumed
                </p>

                <p className="mt-2 text-2xl font-black text-red-600">
                  {formatCompactCurrency(totalDepreciation)}
                </p>

                <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${Math.min(
                        (totalDepreciation /
                          totalPurchaseValue) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-[#10233b]">
                    Asset Retention Ratio
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Percentage of acquisition value remaining in the
                    fixed-asset register.
                  </p>
                </div>

                <p className="text-3xl font-black text-[#10233b]">
                  {(
                    (totalCurrentValue / totalPurchaseValue) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.16)] sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
              <Sparkles className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-amber-400">
              KEOS Asset Intelligence
            </p>

            <h2 className="mt-3 text-2xl font-black leading-tight">
              Two assets require immediate maintenance review.
            </h2>

            <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
              The office printer has declining condition and the
              delivery vehicle is currently unavailable. Preventive
              action can reduce operational downtime.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Maintenance exposure
                  </span>

                  <span className="text-sm font-black text-red-300">
                    ₹1.36L
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Replacement candidates
                  </span>

                  <span className="text-sm font-black text-amber-300">
                    2 assets
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-300">
                    Asset-control score
                  </span>

                  <span className="text-sm font-black text-emerald-300">
                    92.6%
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#10233b] transition hover:bg-slate-100"
            >
              <Sparkles className="h-4 w-4" />
              View AI Recommendations
            </button>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Fixed Asset Register
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Enterprise Asset Register
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Track ownership, location, valuation, depreciation
                  and operational condition.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative sm:w-[330px]">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search asset, serial or employee..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold outline-none transition placeholder:text-slate-400 focus:border-[#10233b]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Categories</option>
                  <option value="IT Equipment">IT Equipment</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Warehouse Equipment">
                    Warehouse Equipment
                  </option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Office Equipment">
                    Office Equipment
                  </option>
                  <option value="Creative Equipment">
                    Creative Equipment
                  </option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Under Maintenance">
                    Under Maintenance
                  </option>
                  <option value="Idle">Idle</option>
                  <option value="Disposed">Disposed</option>
                  <option value="Lost">Lost</option>
                </select>

                <select
                  value={conditionFilter}
                  onChange={(event) =>
                    setConditionFilter(event.target.value)
                  }
                  className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black outline-none focus:border-[#10233b]"
                >
                  <option value="All">All Conditions</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1850px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  {[
                    "Asset",
                    "Category",
                    "Serial / Barcode",
                    "Department",
                    "Location",
                    "Assigned To",
                    "Purchase Date",
                    "Purchase Value",
                    "Book Value",
                    "Depreciation",
                    "Condition",
                    "Status",
                    "Maintenance",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredAssets.map((asset) => {
                  const CategoryIcon = getCategoryIcon(
                    asset.category,
                  );

                  return (
                    <tr
                      key={asset.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#10233b]">
                            <CategoryIcon className="h-4 w-4" />
                          </div>

                          <div>
                            <p className="text-sm font-black text-[#10233b]">
                              {asset.name}
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-400">
                              {asset.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-700">
                        {asset.category}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-xs font-black text-[#10233b]">
                          {asset.serialNumber}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                          <Barcode className="h-3 w-3" />
                          {asset.barcode}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-700">
                        {asset.department}
                      </td>

                      <td className="px-5 py-4">
                        <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {asset.location}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-700">
                        {asset.assignedTo}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-slate-700">
                        {asset.purchaseDate}
                      </td>

                      <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                        {formatCompactCurrency(
                          asset.purchaseValue,
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm font-black text-emerald-600">
                        {formatCompactCurrency(asset.currentValue)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-black text-red-600">
                          {formatCompactCurrency(
                            asset.accumulatedDepreciation,
                          )}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          {asset.depreciationMethod}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getConditionClass(asset.condition),
                          ].join(" ")}
                        >
                          {asset.condition}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                            getStatusClass(asset.status),
                          ].join(" ")}
                        >
                          {asset.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="flex items-center gap-2 text-sm font-bold text-slate-700">
                          <CalendarDays className="h-4 w-4 text-slate-400" />
                          {asset.nextMaintenance}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAsset(asset)
                            }
                            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>

                          <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredAssets.length === 0 && (
                  <tr>
                    <td
                      colSpan={14}
                      className="px-5 py-16 text-center"
                    >
                      <Search className="mx-auto h-8 w-8 text-slate-300" />

                      <p className="mt-4 text-sm font-black text-[#10233b]">
                        No assets found
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Change the search query or selected filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold text-slate-500">
              Showing {filteredAssets.length} of {assets.length} assets
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-300"
              >
                Previous
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
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        </section>

                {selectedAsset && (
          <div className="fixed inset-0 z-[100]">
            <button
              type="button"
              aria-label="Close asset details"
              onClick={() => setSelectedAsset(null)}
              className="absolute inset-0 bg-[#07111f]/65 backdrop-blur-[3px]"
            />

            <aside className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-[#f5f7fa] shadow-[-30px_0_80px_rgba(15,35,59,0.24)] sm:max-w-[760px]">
              <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-7">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-amber-400">
                      {(() => {
                        const AssetIcon = getCategoryIcon(
                          selectedAsset.category,
                        );

                        return <AssetIcon className="h-5 w-5" />;
                      })()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                          {selectedAsset.id}
                        </span>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
                            getStatusClass(selectedAsset.status),
                          ].join(" ")}
                        >
                          {selectedAsset.status}
                        </span>

                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
                            getConditionClass(
                              selectedAsset.condition,
                            ),
                          ].join(" ")}
                        >
                          {selectedAsset.condition}
                        </span>
                      </div>

                      <h2 className="mt-2 truncate text-xl font-black text-[#10233b] sm:text-2xl">
                        {selectedAsset.name}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {selectedAsset.category} ·{" "}
                        {selectedAsset.department}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-[#10233b]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-4 sm:p-7">
                <section className="overflow-hidden rounded-[28px] bg-[#10233b] text-white shadow-[0_20px_60px_rgba(15,35,59,0.18)]">
                  <div className="relative p-5 sm:p-6">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />

                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                          Current Book Value
                        </p>

                        <p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                          {formatCompactCurrency(
                            selectedAsset.currentValue,
                          )}
                        </p>

                        <p className="mt-2 text-sm font-medium text-slate-300">
                          Original cost{" "}
                          {formatCompactCurrency(
                            selectedAsset.purchaseValue,
                          )}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-300">
                          Value Retained
                        </p>

                        <p className="mt-1 text-2xl font-black">
                          {(
                            (selectedAsset.currentValue /
                              selectedAsset.purchaseValue) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-6">
                      <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <span>Depreciated Value</span>

                        <span>
                          {formatCompactCurrency(
                            selectedAsset.accumulatedDepreciation,
                          )}
                        </span>
                      </div>

                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{
                            width: `${Math.min(
                              (selectedAsset
                                .accumulatedDepreciation /
                                selectedAsset.purchaseValue) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                          Purchase Date
                        </p>

                        <p className="mt-2 text-xs font-black">
                          {selectedAsset.purchaseDate}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                          Useful Life
                        </p>

                        <p className="mt-2 text-xs font-black">
                          {selectedAsset.usefulLife} years
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                          Method
                        </p>

                        <p className="mt-2 text-xs font-black">
                          {selectedAsset.depreciationMethod}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                          Warranty
                        </p>

                        <p className="mt-2 text-xs font-black">
                          {selectedAsset.warrantyExpiry}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Building2 className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Department
                    </p>

                    <p className="mt-1 text-sm font-black text-[#10233b]">
                      {selectedAsset.department}
                    </p>
                  </article>

                  <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <MapPin className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-black text-[#10233b]">
                      {selectedAsset.location}
                    </p>
                  </article>

                  <article className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="h-4 w-4" />
                    </div>

                    <p className="mt-4 text-xs font-semibold text-slate-500">
                      Assigned To
                    </p>

                    <p className="mt-1 text-sm font-black text-[#10233b]">
                      {selectedAsset.assignedTo}
                    </p>
                  </article>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Asset Identification
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Registration, barcode and vendor information
                      </p>
                    </div>

                    <Barcode className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Asset ID
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedAsset.id}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Category
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedAsset.category}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Serial Number
                      </p>

                      <p className="mt-2 break-all text-sm font-black text-[#10233b]">
                        {selectedAsset.serialNumber}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Barcode Number
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Barcode className="h-4 w-4 text-slate-500" />

                        <p className="break-all text-sm font-black text-[#10233b]">
                          {selectedAsset.barcode}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Vendor
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedAsset.vendor}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Warranty Expiry
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-500" />

                        <p className="text-sm font-black text-[#10233b]">
                          {selectedAsset.warrantyExpiry}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Asset Description
                    </p>

                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                      {selectedAsset.description}
                    </p>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Financial Valuation
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Acquisition cost, book value and accumulated
                        depreciation
                      </p>
                    </div>

                    <IndianRupee className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Purchase Value
                      </p>

                      <p className="mt-2 text-xl font-black text-[#10233b]">
                        {formatCompactCurrency(
                          selectedAsset.purchaseValue,
                        )}
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-slate-400">
                        {formatCurrency(
                          selectedAsset.purchaseValue,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Current Value
                      </p>

                      <p className="mt-2 text-xl font-black text-emerald-600">
                        {formatCompactCurrency(
                          selectedAsset.currentValue,
                        )}
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-slate-400">
                        {formatCurrency(
                          selectedAsset.currentValue,
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Depreciation
                      </p>

                      <p className="mt-2 text-xl font-black text-red-600">
                        {formatCompactCurrency(
                          selectedAsset.accumulatedDepreciation,
                        )}
                      </p>

                      <p className="mt-1 text-[10px] font-bold text-slate-400">
                        {(
                          (selectedAsset
                            .accumulatedDepreciation /
                            selectedAsset.purchaseValue) *
                          100
                        ).toFixed(1)}
                        % of original cost
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-5">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-500">
                          Current book value
                        </span>

                        <span className="text-xs font-black text-emerald-600">
                          {(
                            (selectedAsset.currentValue /
                              selectedAsset.purchaseValue) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>

                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${Math.min(
                              (selectedAsset.currentValue /
                                selectedAsset.purchaseValue) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-500">
                          Accumulated depreciation
                        </span>

                        <span className="text-xs font-black text-red-600">
                          {(
                            (selectedAsset
                              .accumulatedDepreciation /
                              selectedAsset.purchaseValue) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>

                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{
                            width: `${Math.min(
                              (selectedAsset
                                .accumulatedDepreciation /
                                selectedAsset.purchaseValue) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Depreciation Method
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedAsset.depreciationMethod}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Estimated Useful Life
                      </p>

                      <p className="mt-2 text-sm font-black text-[#10233b]">
                        {selectedAsset.usefulLife} years
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `Opening depreciation schedule for ${selectedAsset.id}.`,
                      )
                    }
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-slate-50"
                  >
                    <TrendingDown className="h-4 w-4" />
                    View Complete Depreciation Schedule
                  </button>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Assignment & Location
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Current ownership and physical custody
                      </p>
                    </div>

                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-50 p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Current Custodian
                        </p>

                        <p className="mt-2 text-lg font-black text-[#10233b]">
                          {selectedAsset.assignedTo}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {selectedAsset.department}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          Physical Location
                        </p>

                        <p className="mt-2 flex items-center gap-2 text-sm font-black text-[#10233b]">
                          <MapPin className="h-4 w-4 text-[#d02b3f]" />
                          {selectedAsset.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening employee assignment workflow for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-12 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Assign Asset
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Assign to employee or team
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening asset transfer workflow for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-12 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Transfer Asset
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Change department or location
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-slate-300" />
                    </button>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Maintenance Control
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Service condition and preventive-maintenance
                        schedule
                      </p>
                    </div>

                    <Wrench className="h-5 w-5 text-slate-400" />
                  </div>

                  <div
                    className={[
                      "mt-5 rounded-2xl border p-4",
                      selectedAsset.status ===
                        "Under Maintenance" ||
                      selectedAsset.condition === "Poor" ||
                      selectedAsset.condition === "Critical"
                        ? "border-amber-200 bg-amber-50"
                        : "border-emerald-200 bg-emerald-50",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      {selectedAsset.status ===
                        "Under Maintenance" ||
                      selectedAsset.condition === "Poor" ||
                      selectedAsset.condition === "Critical" ? (
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      )}

                      <div>
                        <p
                          className={[
                            "text-sm font-black",
                            selectedAsset.status ===
                              "Under Maintenance" ||
                            selectedAsset.condition === "Poor" ||
                            selectedAsset.condition === "Critical"
                              ? "text-amber-800"
                              : "text-emerald-800",
                          ].join(" ")}
                        >
                          {selectedAsset.status ===
                          "Under Maintenance"
                            ? "Asset is currently under maintenance"
                            : selectedAsset.condition ===
                                  "Poor" ||
                                selectedAsset.condition ===
                                  "Critical"
                              ? "Maintenance attention required"
                              : "Asset is operational"}
                        </p>

                        <p
                          className={[
                            "mt-1 text-xs font-medium leading-5",
                            selectedAsset.status ===
                              "Under Maintenance" ||
                            selectedAsset.condition === "Poor" ||
                            selectedAsset.condition === "Critical"
                              ? "text-amber-700"
                              : "text-emerald-700",
                          ].join(" ")}
                        >
                          {selectedAsset.status ===
                          "Under Maintenance"
                            ? "Service activity should be completed and verified before returning this asset to active use."
                            : selectedAsset.condition ===
                                  "Poor" ||
                                selectedAsset.condition ===
                                  "Critical"
                              ? "A preventive inspection should be scheduled to avoid operational interruption."
                              : "No immediate service risk has been identified for this asset."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Next Maintenance
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-500" />

                        <p className="text-sm font-black text-[#10233b]">
                          {selectedAsset.nextMaintenance}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Current Condition
                      </p>

                      <span
                        className={[
                          "mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase",
                          getConditionClass(
                            selectedAsset.condition,
                          ),
                        ].join(" ")}
                      >
                        {selectedAsset.condition}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening maintenance booking for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
                    >
                      <Wrench className="h-4 w-4" />
                      Schedule Maintenance
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening maintenance history for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                    >
                      <Clock3 className="h-4 w-4" />
                      Service History
                    </button>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10233b] text-amber-400">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                        KEOS AI Asset Analysis
                      </p>

                      <h3 className="mt-2 text-base font-black text-[#10233b]">
                        Asset Intelligence Summary
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        {selectedAsset.condition === "Excellent" ||
                        selectedAsset.condition === "Good" ? (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                        )}

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Operational Condition
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {selectedAsset.condition ===
                              "Excellent" ||
                            selectedAsset.condition === "Good"
                              ? "The asset remains in reliable operating condition and can continue under the normal preventive-maintenance cycle."
                              : selectedAsset.condition === "Fair"
                                ? "The asset remains usable, but condition deterioration should be monitored during the next maintenance review."
                                : "The asset has elevated operational risk and should be inspected before continued business-critical use."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Valuation Assessment
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            The asset currently retains{" "}
                            {(
                              (selectedAsset.currentValue /
                                selectedAsset.purchaseValue) *
                              100
                            ).toFixed(1)}
                            % of its acquisition value under the{" "}
                            {selectedAsset.depreciationMethod.toLowerCase()}{" "}
                            method.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-purple-500" />

                        <div>
                          <p className="text-sm font-black text-[#10233b]">
                            Recommended Control
                          </p>

                          <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                            {selectedAsset.status === "Disposed"
                              ? "Complete disposal documentation, verify accounting write-off and retain the audit trail."
                              : selectedAsset.status ===
                                    "Under Maintenance"
                                ? "Keep the asset unavailable for assignment until the service record and operational verification are completed."
                                : selectedAsset.condition ===
                                      "Critical" ||
                                    selectedAsset.condition ===
                                      "Poor"
                                  ? "Restrict critical use and initiate repair-versus-replacement evaluation."
                                  : "Continue assignment controls, periodic physical verification and scheduled maintenance."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `KEOS AI asset report generated for ${selectedAsset.id}.`,
                      )
                    }
                    className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate Detailed AI Asset Report
                  </button>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black text-[#10233b]">
                        Asset Activity Timeline
                      </h3>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Registration, assignment and verification
                        history
                      </p>
                    </div>

                    <Clock3 className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="mt-6">
                    <div className="relative flex gap-4 pb-6">
                      <div className="absolute left-[17px] top-9 h-full w-px bg-slate-200" />

                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Asset verification completed
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                          Current custodian, location and physical
                          condition were verified.
                        </p>

                        <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          18 Jul 2026 · Asset Control Team
                        </p>
                      </div>
                    </div>

                    <div className="relative flex gap-4 pb-6">
                      <div className="absolute left-[17px] top-9 h-full w-px bg-slate-200" />

                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <MapPin className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Asset assigned
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                          Assigned to {selectedAsset.assignedTo} under{" "}
                          {selectedAsset.department}.
                        </p>

                        <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {selectedAsset.purchaseDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                        <PackageCheck className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          Asset registered
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                          Purchased from {selectedAsset.vendor} and
                          added to the KEOS fixed-asset register.
                        </p>

                        <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {selectedAsset.purchaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div>
                    <h3 className="text-base font-black text-[#10233b]">
                      Asset Control Actions
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      Execute authorized fixed-asset operations
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening edit workflow for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Edit Asset
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Update register details
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening transfer workflow for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Transfer Asset
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Move custody or location
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `QR label prepared for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Generate QR Label
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Print asset identification
                        </p>
                      </div>

                      <QrCode className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Asset report exported for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-slate-200 px-4 text-left transition hover:border-[#10233b] hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-xs font-black text-[#10233b]">
                          Export Asset Report
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Download complete statement
                        </p>
                      </div>

                      <Download className="h-4 w-4 text-slate-300" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        window.alert(
                          `Opening maintenance workflow for ${selectedAsset.id}.`,
                        )
                      }
                      className="flex h-14 items-center justify-between rounded-2xl border border-amber-200 px-4 text-left transition hover:bg-amber-50"
                    >
                      <div>
                        <p className="text-xs font-black text-amber-700">
                          Send for Maintenance
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Create service request
                        </p>
                      </div>

                      <Wrench className="h-4 w-4 text-amber-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Start disposal workflow for ${selectedAsset.id}?`,
                        );

                        if (confirmed) {
                          window.alert(
                            `${selectedAsset.id} has been submitted for disposal approval.`,
                          );
                        }
                      }}
                      className="flex h-14 items-center justify-between rounded-2xl border border-red-200 px-4 text-left transition hover:bg-red-50"
                    >
                      <div>
                        <p className="text-xs font-black text-red-600">
                          Dispose Asset
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                          Retire or sell asset
                        </p>
                      </div>

                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </section>

                <div className="flex flex-col gap-3 pb-5 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                  >
                    <X className="h-4 w-4" />
                    Close Details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      window.alert(
                        `Opening complete workspace for ${selectedAsset.id}.`,
                      )
                    }
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-5 text-sm font-black text-white transition hover:bg-[#183653]"
                  >
                    Open Asset Workspace
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}

                <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Maintenance Operations
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Asset Maintenance Queue
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  Monitor assets requiring preventive maintenance,
                  repair or operational inspection.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Opening enterprise maintenance planner.",
                  )
                }
                className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
              >
                <Wrench className="h-4 w-4" />
                Maintenance Planner
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {assets
                .filter(
                  (asset) =>
                    asset.status === "Under Maintenance" ||
                    asset.condition === "Poor" ||
                    asset.condition === "Critical" ||
                    asset.condition === "Fair",
                )
                .map((asset) => {
                  const AssetIcon = getCategoryIcon(asset.category);

                  const isCritical =
                    asset.condition === "Critical" ||
                    asset.condition === "Poor";

                  return (
                    <div
                      key={asset.id}
                      className={[
                        "rounded-2xl border p-4 transition hover:shadow-sm",
                        isCritical
                          ? "border-red-200 bg-red-50/40"
                          : asset.status === "Under Maintenance"
                            ? "border-amber-200 bg-amber-50/40"
                            : "border-slate-200 bg-white",
                      ].join(" ")}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-start gap-4">
                          <div
                            className={[
                              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                              isCritical
                                ? "bg-red-100 text-red-600"
                                : asset.status ===
                                    "Under Maintenance"
                                  ? "bg-amber-100 text-amber-600"
                                  : "bg-blue-50 text-blue-600",
                            ].join(" ")}
                          >
                            <AssetIcon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-black text-[#10233b]">
                                {asset.name}
                              </p>

                              <span
                                className={[
                                  "rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider",
                                  getConditionClass(asset.condition),
                                ].join(" ")}
                              >
                                {asset.condition}
                              </span>
                            </div>

                            <p className="mt-1 text-xs font-semibold text-slate-500">
                              {asset.id} · {asset.department}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {asset.location}
                              </span>

                              <span className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {asset.nextMaintenance}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedAsset(asset)}
                            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b]"
                          >
                            <Eye className="h-4 w-4" />
                            View Asset
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              window.alert(
                                `Maintenance work order created for ${asset.id}.`,
                              )
                            }
                            className="flex h-9 items-center gap-2 rounded-xl bg-[#10233b] px-3 text-xs font-black text-white transition hover:bg-[#183653]"
                          >
                            <Wrench className="h-4 w-4" />
                            Create Work Order
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </article>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Service Summary
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Maintenance Health
                </h2>
              </div>

              <Wrench className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      Operational Assets
                    </p>

                    <p className="mt-2 text-2xl font-black text-emerald-600">
                      {
                        assets.filter(
                          (asset) => asset.status === "Active",
                        ).length
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      Under Maintenance
                    </p>

                    <p className="mt-2 text-2xl font-black text-amber-600">
                      {
                        assets.filter(
                          (asset) =>
                            asset.status === "Under Maintenance",
                        ).length
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Wrench className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      Replacement Risk
                    </p>

                    <p className="mt-2 text-2xl font-black text-red-600">
                      {
                        assets.filter(
                          (asset) =>
                            asset.condition === "Poor" ||
                            asset.condition === "Critical",
                        ).length
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#10233b] p-5 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                AI Recommendation
              </p>

              <p className="mt-3 text-sm font-black leading-6">
                Replace the legacy desktop and evaluate the finance
                printer before approving further repair expenditure.
              </p>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "KEOS AI maintenance report generated.",
                  )
                }
                className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-black text-[#10233b] transition hover:bg-slate-100"
              >
                <Sparkles className="h-4 w-4" />
                Generate Maintenance Report
              </button>
            </div>
          </aside>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                Depreciation Management
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Asset Depreciation Schedule
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Review carrying value, depreciation method and
                remaining useful life.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Monthly depreciation journal has been generated.",
                  )
                }
                className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-slate-50"
              >
                <RefreshCcw className="h-4 w-4" />
                Run Depreciation
              </button>

              <button
                type="button"
                onClick={() =>
                  window.alert(
                    "Depreciation schedule exported successfully.",
                  )
                }
                className="flex h-11 items-center gap-2 rounded-2xl bg-[#10233b] px-4 text-sm font-black text-white transition hover:bg-[#183653]"
              >
                <Download className="h-4 w-4" />
                Export Schedule
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[1250px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  {[
                    "Asset",
                    "Method",
                    "Useful Life",
                    "Purchase Value",
                    "Accumulated Depreciation",
                    "Current Book Value",
                    "Value Retained",
                    "Depreciation Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[10px] font-black uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {assets
                  .filter(
                    (asset) =>
                      asset.depreciationMethod !==
                      "No Depreciation",
                  )
                  .map((asset) => {
                    const retainedPercentage =
                      (asset.currentValue /
                        asset.purchaseValue) *
                      100;

                    return (
                      <tr
                        key={asset.id}
                        className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-black text-[#10233b]">
                            {asset.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {asset.id}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm font-bold text-slate-700">
                          {asset.depreciationMethod}
                        </td>

                        <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                          {asset.usefulLife} years
                        </td>

                        <td className="px-5 py-4 text-sm font-black text-[#10233b]">
                          {formatCompactCurrency(
                            asset.purchaseValue,
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm font-black text-red-600">
                          {formatCompactCurrency(
                            asset.accumulatedDepreciation,
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm font-black text-emerald-600">
                          {formatCompactCurrency(
                            asset.currentValue,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="w-[140px]">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-black text-[#10233b]">
                                {retainedPercentage.toFixed(1)}%
                              </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={[
                                  "h-full rounded-full",
                                  retainedPercentage >= 70
                                    ? "bg-emerald-500"
                                    : retainedPercentage >= 40
                                      ? "bg-amber-500"
                                      : "bg-red-500",
                                ].join(" ")}
                                style={{
                                  width: `${Math.min(
                                    retainedPercentage,
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={[
                              "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                              retainedPercentage >= 60
                                ? "bg-emerald-50 text-emerald-700"
                                : retainedPercentage >= 30
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-red-50 text-red-700",
                            ].join(" ")}
                          >
                            {retainedPercentage >= 60
                              ? "Normal"
                              : retainedPercentage >= 30
                                ? "Review"
                                : "Near End of Life"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAsset(asset)
                            }
                            className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-black text-[#10233b] transition hover:border-[#10233b] hover:bg-[#10233b] hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Asset Distribution
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Department Allocation
                </h2>
              </div>

              <Building2 className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-4">
              {Array.from(
                new Set(assets.map((asset) => asset.department)),
              ).map((department) => {
                const departmentAssets = assets.filter(
                  (asset) =>
                    asset.department === department,
                );

                const departmentValue =
                  departmentAssets.reduce(
                    (sum, asset) =>
                      sum + asset.currentValue,
                    0,
                  );

                const percentage =
                  (departmentAssets.length /
                    assets.length) *
                  100;

                return (
                  <div
                    key={department}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-[#10233b]">
                          {department}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {departmentAssets.length} assets ·{" "}
                          {formatCompactCurrency(
                            departmentValue,
                          )}{" "}
                          book value
                        </p>
                      </div>

                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-600">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>

                    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#10233b]"
                        style={{
                          width: `${Math.min(
                            percentage,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d02b3f]">
                  Disposal Governance
                </p>

                <h2 className="mt-2 text-lg font-black text-[#10233b]">
                  Disposal & Retirement Queue
                </h2>
              </div>

              <Trash2 className="h-5 w-5 text-slate-400" />
            </div>

            <div className="mt-6 space-y-3">
              {assets
                .filter(
                  (asset) =>
                    asset.status === "Disposed" ||
                    asset.condition === "Critical" ||
                    asset.currentValue /
                      asset.purchaseValue <
                      0.3,
                )
                .map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-2xl border border-red-200 bg-red-50/30 p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-black text-[#10233b]">
                            {asset.name}
                          </p>

                          <span
                            className={[
                              "rounded-full px-2.5 py-1 text-[9px] font-black uppercase",
                              getStatusClass(asset.status),
                            ].join(" ")}
                          >
                            {asset.status}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {asset.id} · Current value{" "}
                          {formatCompactCurrency(
                            asset.currentValue,
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAsset(asset)
                          }
                          className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-[#10233b]"
                        >
                          <Eye className="h-4 w-4" />
                          Review
                        </button>

                        {asset.status !== "Disposed" && (
                          <button
                            type="button"
                            onClick={() => {
                              const confirmed =
                                window.confirm(
                                  `Submit ${asset.id} for disposal approval?`,
                                );

                              if (confirmed) {
                                window.alert(
                                  `${asset.id} submitted for disposal approval.`,
                                );
                              }
                            }}
                            className="flex h-9 items-center gap-2 rounded-xl bg-red-600 px-3 text-xs font-black text-white transition hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Dispose
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              {assets.filter(
                (asset) =>
                  asset.status === "Disposed" ||
                  asset.condition === "Critical" ||
                  asset.currentValue /
                    asset.purchaseValue <
                    0.3,
              ).length === 0 && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-7 w-7 text-emerald-600" />

                  <p className="mt-3 text-sm font-black text-emerald-800">
                    No disposal candidates
                  </p>

                  <p className="mt-1 text-xs font-medium text-emerald-700">
                    All registered assets remain within acceptable
                    operating limits.
                  </p>
                </div>
              )}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() =>
              window.alert("Opening QR-label generator.")
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <QrCode className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  QR Labels
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Generate asset tags
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() =>
              window.alert("Opening physical asset audit.")
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Barcode className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Physical Audit
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Verify registered assets
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() =>
              window.alert("Opening asset transfer register.")
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <ArrowUpRight className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Transfer Register
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Review custody changes
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() =>
              window.alert(
                "Complete fixed-asset report exported.",
              )
            }
            className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Download className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-black text-[#10233b]">
                  Asset Report
                </p>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Export complete register
                </p>
              </div>
            </div>

            <ChevronRight className="h-5 w-5 text-slate-300" />
          </button>
        </section>

        <footer className="flex flex-col gap-2 border-t border-slate-200 px-1 pb-2 pt-5 text-xs font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>KEOS Finance · Fixed Assets Management</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Asset register operational</span>
            <span>·</span>
            <span>{assets.length} registered assets</span>
            <span>·</span>
            <span>
              {formatCompactCurrency(totalCurrentValue)} book value
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}