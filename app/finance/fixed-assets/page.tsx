"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  IndianRupee,
  Laptop,
  Plus,
  Search,
  TrendingDown,
} from "lucide-react";

type AssetStatus = "Active" | "Under Maintenance" | "Disposed";

type FixedAsset = {
  id: number;
  assetCode: string;
  assetName: string;
  category: string;
  location: string;
  purchaseDate: string;
  purchaseValue: number;
  depreciation: number;
  bookValue: number;
  status: AssetStatus;
};

const initialAssets: FixedAsset[] = [
  {
    id: 1,
    assetCode: "AST-001",
    assetName: "Dell Precision Workstation",
    category: "Computer Equipment",
    location: "Technology Department",
    purchaseDate: "2025-08-10",
    purchaseValue: 185000,
    depreciation: 37000,
    bookValue: 148000,
    status: "Active",
  },
  {
    id: 2,
    assetCode: "AST-002",
    assetName: "Office Furniture Set",
    category: "Furniture",
    location: "Corporate Office",
    purchaseDate: "2025-05-15",
    purchaseValue: 250000,
    depreciation: 25000,
    bookValue: 225000,
    status: "Active",
  },
  {
    id: 3,
    assetCode: "AST-003",
    assetName: "Industrial Cutting Machine",
    category: "Plant and Machinery",
    location: "Production Unit",
    purchaseDate: "2024-11-20",
    purchaseValue: 850000,
    depreciation: 127500,
    bookValue: 722500,
    status: "Under Maintenance",
  },
  {
    id: 4,
    assetCode: "AST-004",
    assetName: "Delivery Vehicle",
    category: "Vehicles",
    location: "Operations",
    purchaseDate: "2024-06-10",
    purchaseValue: 950000,
    depreciation: 190000,
    bookValue: 760000,
    status: "Active",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FixedAssetsPage() {
  const [assets, setAssets] = useState<FixedAsset[]>(initialAssets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const query = search.toLowerCase();

      const matchesSearch =
        asset.assetName.toLowerCase().includes(query) ||
        asset.assetCode.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || asset.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assets, search, statusFilter]);

  const purchaseValue = assets.reduce(
    (sum, asset) => sum + asset.purchaseValue,
    0,
  );

  const totalDepreciation = assets.reduce(
    (sum, asset) => sum + asset.depreciation,
    0,
  );

  const bookValue = assets.reduce(
    (sum, asset) => sum + asset.bookValue,
    0,
  );

  const activeAssets = assets.filter(
    (asset) => asset.status === "Active",
  ).length;

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function updateStatus(id: number, status: AssetStatus) {
    setAssets((currentAssets) =>
      currentAssets.map((asset) =>
        asset.id === id ? { ...asset, status } : asset,
      ),
    );

    showMessage(`Asset marked as ${status}.`);
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-xl">
          {message}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Fixed Assets
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Asset register, depreciation and disposal management
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              showMessage("Add asset form will open here.")
            }
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
          >
            <Plus size={17} />
            Add Asset
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Purchase Value"
            value={formatCurrency(purchaseValue)}
            icon={<IndianRupee size={22} />}
          />

          <SummaryCard
            title="Accumulated Depreciation"
            value={formatCurrency(totalDepreciation)}
            icon={<TrendingDown size={22} />}
          />

          <SummaryCard
            title="Current Book Value"
            value={formatCurrency(bookValue)}
            icon={<Building2 size={22} />}
          />

          <SummaryCard
            title="Active Assets"
            value={String(activeAssets)}
            icon={<CheckCircle2 size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Fixed Asset Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Asset valuation and lifecycle records
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search asset or category"
                  className="h-11 rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Under Maintenance</option>
                <option>Disposed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Purchase Date</th>
                  <th className="px-6 py-4 text-right">
                    Purchase Value
                  </th>
                  <th className="px-6 py-4 text-right">
                    Depreciation
                  </th>
                  <th className="px-6 py-4 text-right">
                    Book Value
                  </th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="text-sm">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                          <Laptop size={18} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900">
                            {asset.assetName}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {asset.assetCode}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {asset.category}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {asset.location}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {asset.purchaseDate}
                    </td>

                    <td className="px-6 py-5 text-right font-bold">
                      {formatCurrency(asset.purchaseValue)}
                    </td>

                    <td className="px-6 py-5 text-right font-bold text-rose-700">
                      {formatCurrency(asset.depreciation)}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {formatCurrency(asset.bookValue)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={asset.status} />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              asset.id,
                              "Under Maintenance",
                            )
                          }
                          className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-700"
                        >
                          Maintain
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(asset.id, "Disposed")
                          }
                          className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-black text-rose-700"
                        >
                          Dispose
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredAssets.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center text-sm font-bold text-slate-400"
                    >
                      No assets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">{title}</p>
          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const style =
    status === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Disposed"
        ? "bg-rose-100 text-rose-700"
        : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-[11px] font-black ${style}`}
    >
      {status}
    </span>
  );
}