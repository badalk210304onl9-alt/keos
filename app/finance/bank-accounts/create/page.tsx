"use client";

import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Hash,
  IndianRupee,
  Landmark,
  MapPin,
  Save,
  ShieldCheck,
  UserRound,
  WalletCards,
} from "lucide-react";

type AccountStatus = "Active" | "Inactive" | "Frozen";
type AccountType =
  | "Current Account"
  | "Savings Account"
  | "Cash Credit"
  | "Overdraft"
  | "Escrow Account";

const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100";

const labelClass = "mb-2 block text-xs font-bold text-slate-600";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export default function CreateBankAccountPage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<AccountStatus>("Active");

  const [accountCode] = useState("BANK-0008");
  const [accountName, setAccountName] = useState(
    "KRVE HDFC Current Account",
  );
  const [bankName, setBankName] = useState("HDFC Bank");
  const [accountType, setAccountType] =
    useState<AccountType>("Current Account");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [accountHolderName, setAccountHolderName] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [currency, setCurrency] = useState("INR");
  const [openingBalance, setOpeningBalance] = useState(0);
  const [openingDate, setOpeningDate] = useState("2026-07-22");
  const [ledgerAccount, setLedgerAccount] = useState(
    "Bank Accounts — Current Assets",
  );
  const [company, setCompany] = useState(
    "KRVE Fashion Studio Private Limited",
  );
  const [branch, setBranch] = useState("Varanasi Head Office");
  const [contactPerson, setContactPerson] = useState("Badal Kumar");
  const [relationshipManager, setRelationshipManager] = useState("");
  const [upiId, setUpiId] = useState("");
  const [internetBanking, setInternetBanking] = useState(true);
  const [paymentGateway, setPaymentGateway] = useState(false);
  const [defaultCollectionAccount, setDefaultCollectionAccount] =
    useState(true);
  const [defaultPaymentAccount, setDefaultPaymentAccount] =
    useState(false);
  const [notes, setNotes] = useState("");

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2500);
  };

  const validateAccount = () => {
    if (!accountName.trim()) {
      showMessage("Please enter the account name.");
      return false;
    }

    if (!bankName.trim()) {
      showMessage("Please select a bank.");
      return false;
    }

    if (!accountNumber.trim()) {
      showMessage("Please enter the bank account number.");
      return false;
    }

    if (accountNumber !== confirmAccountNumber) {
      showMessage("Bank account numbers do not match.");
      return false;
    }

    if (!ifscCode.trim()) {
      showMessage("Please enter the IFSC code.");
      return false;
    }

    return true;
  };

  const saveAccount = () => {
    if (!validateAccount()) return;

    showMessage("Bank account saved successfully.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveAccount();
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
                    Create Bank Account
                  </h1>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-black uppercase ${
                      status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "Frozen"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Add company bank accounts, balances and banking controls.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#102844] px-5 text-sm font-bold text-white"
            >
              <Save size={17} />
              Save Bank Account
            </button>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1680px] gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-[#102844]">
                    <Landmark size={21} />
                  </div>

                  <div>
                    <h2 className="font-black">Account Information</h2>
                    <p className="text-xs text-slate-500">
                      Bank, account type and account number
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Account Code
                  </p>
                  <p className="mt-1 text-sm font-black">{accountCode}</p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div className="md:col-span-2">
                  <label className={labelClass}>Account Name</label>
                  <input
                    value={accountName}
                    onChange={(event) =>
                      setAccountName(event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as AccountStatus)
                    }
                    className={inputClass}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Frozen</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Bank Name</label>
                  <select
                    value={bankName}
                    onChange={(event) => setBankName(event.target.value)}
                    className={inputClass}
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Bank of Baroda</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Account Type</label>
                  <select
                    value={accountType}
                    onChange={(event) =>
                      setAccountType(event.target.value as AccountType)
                    }
                    className={inputClass}
                  >
                    <option>Current Account</option>
                    <option>Savings Account</option>
                    <option>Cash Credit</option>
                    <option>Overdraft</option>
                    <option>Escrow Account</option>
                  </select>
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
                    <option>GBP</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Account Number</label>
                  <input
                    type="password"
                    value={accountNumber}
                    onChange={(event) =>
                      setAccountNumber(event.target.value)
                    }
                    placeholder="Enter account number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Confirm Account Number
                  </label>
                  <input
                    value={confirmAccountNumber}
                    onChange={(event) =>
                      setConfirmAccountNumber(event.target.value)
                    }
                    placeholder="Re-enter account number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>IFSC Code</label>
                  <input
                    value={ifscCode}
                    onChange={(event) =>
                      setIfscCode(event.target.value.toUpperCase())
                    }
                    placeholder="HDFC0001234"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>SWIFT Code</label>
                  <input
                    value={swiftCode}
                    onChange={(event) =>
                      setSwiftCode(event.target.value.toUpperCase())
                    }
                    placeholder="Optional"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>UPI ID</label>
                  <input
                    value={upiId}
                    onChange={(event) => setUpiId(event.target.value)}
                    placeholder="krve@hdfcbank"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Building2 size={21} />
                </div>

                <div>
                  <h2 className="font-black">Branch Information</h2>
                  <p className="text-xs text-slate-500">
                    Bank branch and address details
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Bank Branch Name</label>
                  <input
                    value={branchName}
                    onChange={(event) =>
                      setBranchName(event.target.value)
                    }
                    placeholder="Enter bank branch"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Account Holder Name</label>
                  <input
                    value={accountHolderName}
                    onChange={(event) =>
                      setAccountHolderName(event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Bank Branch Address</label>
                  <textarea
                    value={branchAddress}
                    onChange={(event) =>
                      setBranchAddress(event.target.value)
                    }
                    placeholder="Enter full bank branch address"
                    className="min-h-28 w-full rounded-2xl border border-slate-200 p-4 text-sm font-medium outline-none"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <IndianRupee size={21} />
                </div>

                <div>
                  <h2 className="font-black">Accounting Integration</h2>
                  <p className="text-xs text-slate-500">
                    Opening balance and general ledger mapping
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <div>
                  <label className={labelClass}>Opening Balance</label>
                  <input
                    type="number"
                    value={openingBalance}
                    onChange={(event) =>
                      setOpeningBalance(Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Opening Date</label>
                  <input
                    type="date"
                    value={openingDate}
                    onChange={(event) =>
                      setOpeningDate(event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Ledger Account</label>
                  <select
                    value={ledgerAccount}
                    onChange={(event) =>
                      setLedgerAccount(event.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Bank Accounts — Current Assets</option>
                    <option>Cash Credit — Current Liabilities</option>
                    <option>Overdraft Account — Current Liabilities</option>
                    <option>Escrow Account — Current Assets</option>
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
                  <label className={labelClass}>Company Branch</label>
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
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                  <UserRound size={21} />
                </div>

                <div>
                  <h2 className="font-black">Bank Contacts</h2>
                  <p className="text-xs text-slate-500">
                    Internal owner and relationship manager information
                  </p>
                </div>
              </div>

              <div className="grid gap-5 p-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Internal Contact Person</label>
                  <input
                    value={contactPerson}
                    onChange={(event) =>
                      setContactPerson(event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Bank Relationship Manager
                  </label>
                  <input
                    value={relationshipManager}
                    onChange={(event) =>
                      setRelationshipManager(event.target.value)
                    }
                    placeholder="Enter relationship manager"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Notes</label>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Add bank account instructions or notes"
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
                  Account Summary
                </p>

                <h3 className="mt-2 text-lg font-black">{accountCode}</h3>
              </div>

              <div className="space-y-4 p-6">
                <SummaryLine label="Bank" value={bankName} />
                <SummaryLine label="Account Type" value={accountType} />
                <SummaryLine label="Currency" value={currency} />
                <SummaryLine label="IFSC" value={ifscCode || "Not entered"} />
                <SummaryLine label="Status" value={status} />

                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Opening Balance
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    {formatCurrency(openingBalance)}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-black">
                Banking Controls
              </h3>

              <div className="mt-5 space-y-4">
                <ToggleOption
                  label="Internet Banking Enabled"
                  checked={internetBanking}
                  onChange={setInternetBanking}
                />

                <ToggleOption
                  label="Payment Gateway Connected"
                  checked={paymentGateway}
                  onChange={setPaymentGateway}
                />

                <ToggleOption
                  label="Default Collection Account"
                  checked={defaultCollectionAccount}
                  onChange={setDefaultCollectionAccount}
                />

                <ToggleOption
                  label="Default Payment Account"
                  checked={defaultPaymentAccount}
                  onChange={setDefaultPaymentAccount}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-sm font-black text-emerald-900">
                    Secure Banking Record
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-700">
                    Account numbers must be encrypted before storing them in
                    the production database.
                  </p>
                </div>
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

function ToggleOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span className="text-xs font-bold text-slate-700">{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-slate-300"
      />
    </label>
  );
}