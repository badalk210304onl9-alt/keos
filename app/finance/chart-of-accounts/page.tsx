"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  IndianRupee,
  Landmark,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  WalletCards,
} from "lucide-react";

type AccountType =
  | "Asset"
  | "Liability"
  | "Equity"
  | "Income"
  | "Expense";

type AccountStatus = "Active" | "Inactive";

type Account = {
  id: number;
  code: string;
  name: string;
  type: AccountType;
  group: string;
  parentAccount: string;
  balance: number;
  status: AccountStatus;
};

const initialAccounts: Account[] = [
  {
    id: 1,
    code: "1000",
    name: "Assets",
    type: "Asset",
    group: "Primary Group",
    parentAccount: "-",
    balance: 12725000,
    status: "Active",
  },
  {
    id: 2,
    code: "1101",
    name: "Cash and Cash Equivalents",
    type: "Asset",
    group: "Current Assets",
    parentAccount: "Assets",
    balance: 1850000,
    status: "Active",
  },
  {
    id: 3,
    code: "1102",
    name: "Trade Receivables",
    type: "Asset",
    group: "Current Assets",
    parentAccount: "Assets",
    balance: 2450000,
    status: "Active",
  },
  {
    id: 4,
    code: "1201",
    name: "Property, Plant and Equipment",
    type: "Asset",
    group: "Fixed Assets",
    parentAccount: "Assets",
    balance: 4850000,
    status: "Active",
  },
  {
    id: 5,
    code: "2000",
    name: "Liabilities",
    type: "Liability",
    group: "Primary Group",
    parentAccount: "-",
    balance: 5655000,
    status: "Active",
  },
  {
    id: 6,
    code: "2101",
    name: "Trade Payables",
    type: "Liability",
    group: "Current Liabilities",
    parentAccount: "Liabilities",
    balance: 1325000,
    status: "Active",
  },
  {
    id: 7,
    code: "2201",
    name: "Long-Term Loans",
    type: "Liability",
    group: "Non-Current Liabilities",
    parentAccount: "Liabilities",
    balance: 3480000,
    status: "Active",
  },
  {
    id: 8,
    code: "3000",
    name: "Shareholders Equity",
    type: "Equity",
    group: "Primary Group",
    parentAccount: "-",
    balance: 7070000,
    status: "Active",
  },
  {
    id: 9,
    code: "4001",
    name: "Product Sales",
    type: "Income",
    group: "Operating Revenue",
    parentAccount: "Income",
    balance: 1850000,
    status: "Active",
  },
  {
    id: 10,
    code: "5001",
    name: "Cost of Goods Sold",
    type: "Expense",
    group: "Direct Expenses",
    parentAccount: "Expenses",
    balance: 920000,
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

export default function ChartOfAccountsPage() {
  const [accounts, setAccounts] =
    useState<Account[]>(initialAccounts);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return accounts.filter((account) => {
      const matchesSearch =
        account.name.toLowerCase().includes(query) ||
        account.code.toLowerCase().includes(query) ||
        account.group.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || account.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        account.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [accounts, search, typeFilter, statusFilter]);

  const activeAccounts = accounts.filter(
    (account) => account.status === "Active",
  ).length;

  const assetAccounts = accounts.filter(
    (account) => account.type === "Asset",
  ).length;

  const liabilityAccounts = accounts.filter(
    (account) => account.type === "Liability",
  ).length;

  const incomeExpenseAccounts = accounts.filter(
    (account) =>
      account.type === "Income" ||
      account.type === "Expense",
  ).length;

  function showMessage(text: string) {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function toggleStatus(id: number) {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.id === id
          ? {
              ...account,
              status:
                account.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : account,
      ),
    );

    showMessage("Account status updated.");
  }

  function deleteAccount(id: number) {
    setAccounts((currentAccounts) =>
      currentAccounts.filter((account) => account.id !== id),
    );

    showMessage("Account removed from chart of accounts.");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {message && (
        <div className="fixed right-6 top-6 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm font-bold text-emerald-700 shadow-xl">
          {message}
        </div>
      )}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/finance"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              aria-label="Back to finance"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-black text-slate-950">
                Chart of Accounts
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage financial accounts, groups and account codes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              showMessage("New account form will open here.")
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white transition hover:bg-[#17385f]"
          >
            <Plus size={17} />
            Add Account
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Accounts"
            value={String(accounts.length)}
            description="All ledger accounts"
            icon={<FileText size={22} />}
          />

          <SummaryCard
            title="Active Accounts"
            value={String(activeAccounts)}
            description="Accounts available for posting"
            icon={<CheckCircle2 size={22} />}
          />

          <SummaryCard
            title="Asset Accounts"
            value={String(assetAccounts)}
            description="Current and non-current assets"
            icon={<WalletCards size={22} />}
          />

          <SummaryCard
            title="Income & Expense"
            value={String(incomeExpenseAccounts)}
            description={`${liabilityAccounts} liability accounts`}
            icon={<CircleDollarSign size={22} />}
          />
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950">
                Account Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review accounting hierarchy and financial balances
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-3.5 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search account or code"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none md:w-64"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option value="All">All Types</option>
                <option value="Asset">Asset</option>
                <option value="Liability">Liability</option>
                <option value="Equity">Equity</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-4">Account</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Account Group</th>
                  <th className="px-6 py-4">Parent Account</th>
                  <th className="px-6 py-4 text-right">
                    Balance
                  </th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="text-sm transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#102844]">
                          <AccountIcon type={account.type} />
                        </div>

                        <div>
                          <p className="font-black text-slate-900">
                            {account.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Account code: {account.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <TypeBadge type={account.type} />
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {account.group}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {account.parentAccount}
                    </td>

                    <td className="px-6 py-5 text-right font-black text-[#102844]">
                      {formatCurrency(account.balance)}
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() => toggleStatus(account.id)}
                        className={`rounded-full px-3 py-1 text-[11px] font-black ${
                          account.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {account.status}
                      </button>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            showMessage(
                              `Edit ${account.name} account.`,
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                          aria-label="Edit account"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteAccount(account.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100"
                          aria-label="Delete account"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredAccounts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >
                      <FileText
                        size={34}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-4 font-black text-slate-700">
                        No accounts found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        Change the search or filter values.
                      </p>
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
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: AccountType }) {
  const className =
    type === "Asset"
      ? "bg-emerald-100 text-emerald-700"
      : type === "Liability"
        ? "bg-rose-100 text-rose-700"
        : type === "Equity"
          ? "bg-violet-100 text-violet-700"
          : type === "Income"
            ? "bg-blue-100 text-blue-700"
            : "bg-amber-100 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black ${className}`}
    >
      {type}
    </span>
  );
}

function AccountIcon({ type }: { type: AccountType }) {
  if (type === "Asset") {
    return <WalletCards size={18} />;
  }

  if (type === "Liability") {
    return <Landmark size={18} />;
  }

  if (type === "Equity") {
    return <ShieldCheck size={18} />;
  }

  if (type === "Income") {
    return <IndianRupee size={18} />;
  }

  return <CircleDollarSign size={18} />;
}