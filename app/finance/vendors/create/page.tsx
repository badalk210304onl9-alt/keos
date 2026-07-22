"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleCheckBig,
  FileCheck2,
  FileText,
  Hash,
  Landmark,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  Plus,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type VendorStatus = "Draft" | "Pending Verification" | "Active";

type VendorForm = {
  legalName: string;
  tradeName: string;
  vendorType: string;
  category: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  website: string;

  gstRegistered: boolean;
  gstin: string;
  pan: string;
  cin: string;
  msmeRegistered: boolean;
  msmeNumber: string;

  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  bankName: string;
  accountHolder: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  branchName: string;
  upiId: string;

  paymentTerms: string;
  currency: string;
  creditLimit: number;
  openingBalance: number;
  tdsApplicable: boolean;
  tdsSection: string;

  businessDescription: string;
  internalNotes: string;
};

type UploadedDocument = {
  id: number;
  name: string;
  size: number;
  type: string;
};

const initialForm: VendorForm = {
  legalName: "",
  tradeName: "",
  vendorType: "Company",
  category: "",
  contactPerson: "",
  designation: "",
  email: "",
  phone: "",
  website: "",

  gstRegistered: true,
  gstin: "",
  pan: "",
  cin: "",
  msmeRegistered: false,
  msmeNumber: "",

  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",

  bankName: "",
  accountHolder: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifscCode: "",
  branchName: "",
  upiId: "",

  paymentTerms: "Net 30",
  currency: "INR",
  creditLimit: 0,
  openingBalance: 0,
  tdsApplicable: false,
  tdsSection: "",

  businessDescription: "",
  internalNotes: "",
};

const categories = [
  "Fabric & Textiles",
  "Manufacturing",
  "Packaging",
  "Logistics",
  "Warehousing",
  "Technology",
  "Marketing",
  "Creative Services",
  "Professional Services",
  "Facility Management",
  "Office Supplies",
  "Other",
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const paymentTerms = [
  "Due on Receipt",
  "Net 7",
  "Net 15",
  "Net 30",
  "Net 45",
  "Net 60",
  "Net 90",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function CreateVendorPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<VendorForm>(initialForm);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [status, setStatus] = useState<VendorStatus>("Draft");
  const [isDragging, setIsDragging] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const vendorCode = useMemo(
    () =>
      `VEN-${String(Math.floor(Math.random() * 9999) + 1).padStart(
        4,
        "0",
      )}`,
    [],
  );

  const panValid =
    form.pan.length === 10 &&
    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan);

  const gstValid =
    !form.gstRegistered ||
    (form.gstin.length === 15 &&
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(
        form.gstin,
      ));

  const ifscValid =
    form.ifscCode.length === 11 &&
    /^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode);

  const bankAccountsMatch =
    form.accountNumber.length > 0 &&
    form.accountNumber === form.confirmAccountNumber;

  const duplicateRisk =
    form.legalName.trim().length > 4 && form.pan.length === 10 ? 6 : 0;

  const completionChecks = [
    form.legalName.trim().length > 0,
    form.category.length > 0,
    form.contactPerson.trim().length > 0,
    form.email.trim().length > 0,
    form.phone.trim().length > 0,
    panValid,
    gstValid,
    form.addressLine1.trim().length > 0,
    form.city.trim().length > 0,
    form.state.length > 0,
    form.bankName.trim().length > 0,
    form.accountNumber.trim().length > 0,
    bankAccountsMatch,
    ifscValid,
  ];

  const completionPercentage = Math.round(
    (completionChecks.filter(Boolean).length / completionChecks.length) *
      100,
  );

  const updateForm = <K extends keyof VendorForm>(
    field: K,
    value: VendorForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSavedDraft(false);
    setSubmitted(false);
  };

  const addFiles = (files: FileList | File[]) => {
    const acceptedFiles = Array.from(files)
      .filter((file) => file.size <= 10 * 1024 * 1024)
      .map((file) => ({
        id: Date.now() + Math.floor(Math.random() * 10000),
        name: file.name,
        size: file.size,
        type: file.type || "Document",
      }));

    setDocuments((current) => [...current, ...acceptedFiles]);
  };

  const handleFileSelection = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeDocument = (id: number) => {
    setDocuments((current) =>
      current.filter((document) => document.id !== id),
    );
  };

  const saveDraft = () => {
    setStatus("Draft");
    setSavedDraft(true);
    setSubmitted(false);

    window.setTimeout(() => {
      setSavedDraft(false);
    }, 1800);
  };

  const submitVendor = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!panValid) {
      window.alert("Please enter a valid PAN number.");
      return;
    }

    if (!gstValid) {
      window.alert("Please enter a valid GSTIN.");
      return;
    }

    if (!ifscValid) {
      window.alert("Please enter a valid IFSC code.");
      return;
    }

    if (!bankAccountsMatch) {
      window.alert("Bank account numbers do not match.");
      return;
    }

    setStatus("Pending Verification");
    setSubmitted(true);
    setSavedDraft(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearForm = () => {
    setForm(initialForm);
    setDocuments([]);
    setStatus("Draft");
    setSavedDraft(false);
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <Link
              href="/finance/vendors"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#10233b] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#d02b3f]">
                Vendor Onboarding
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-[#10233b] sm:text-3xl">
                Add New Vendor
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Register vendor identity, tax, banking and payment
                information
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={[
                "rounded-full px-4 py-2 text-xs font-black",
                status === "Draft"
                  ? "bg-slate-100 text-slate-600"
                  : status === "Pending Verification"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700",
              ].join(" ")}
            >
              {status}
            </span>

            <span className="rounded-full bg-[#10233b] px-4 py-2 text-xs font-black text-white">
              {vendorCode}
            </span>
          </div>
        </div>
      </header>

      {submitted && (
        <section className="border-b border-emerald-200 bg-emerald-50">
          <div className="mx-auto flex max-w-[1500px] items-start gap-3 px-5 py-4 sm:px-6 lg:px-8">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

            <div>
              <p className="text-sm font-black text-emerald-800">
                Vendor submitted successfully
              </p>

              <p className="mt-1 text-xs font-semibold text-emerald-700">
                Vendor code {vendorCode} is pending tax and bank
                verification.
              </p>
            </div>
          </div>
        </section>
      )}

      <form
        onSubmit={submitVendor}
        className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Company Profile"
                title="Vendor Information"
                description="Enter the legal and business identity of the vendor"
                icon={<Building2 className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Legal Business Name" required>
                  <input
                    required
                    value={form.legalName}
                    onChange={(event) =>
                      updateForm("legalName", event.target.value)
                    }
                    placeholder="Registered business name"
                    className="input-style"
                  />
                </Field>

                <Field label="Trade Name">
                  <input
                    value={form.tradeName}
                    onChange={(event) =>
                      updateForm("tradeName", event.target.value)
                    }
                    placeholder="Brand or trading name"
                    className="input-style"
                  />
                </Field>

                <Field label="Vendor Type" required>
                  <select
                    value={form.vendorType}
                    onChange={(event) =>
                      updateForm("vendorType", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option>Company</option>
                    <option>Partnership Firm</option>
                    <option>LLP</option>
                    <option>Sole Proprietorship</option>
                    <option>Individual Consultant</option>
                    <option>Government Entity</option>
                  </select>
                </Field>

                <Field label="Vendor Category" required>
                  <select
                    required
                    value={form.category}
                    onChange={(event) =>
                      updateForm("category", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Business Description" className="sm:col-span-2">
                  <textarea
                    rows={4}
                    value={form.businessDescription}
                    onChange={(event) =>
                      updateForm(
                        "businessDescription",
                        event.target.value,
                      )
                    }
                    placeholder="Describe products or services supplied by the vendor..."
                    className="textarea-style"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Primary Contact"
                title="Contact Information"
                description="Add the authorized vendor representative"
                icon={<UserRound className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Contact Person" required>
                  <input
                    required
                    value={form.contactPerson}
                    onChange={(event) =>
                      updateForm("contactPerson", event.target.value)
                    }
                    placeholder="Full name"
                    className="input-style"
                  />
                </Field>

                <Field label="Designation">
                  <input
                    value={form.designation}
                    onChange={(event) =>
                      updateForm("designation", event.target.value)
                    }
                    placeholder="Example: Accounts Manager"
                    className="input-style"
                  />
                </Field>

                <Field label="Email Address" required>
                  <div className="relative">
                    <Mail className="input-icon" />

                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateForm("email", event.target.value)
                      }
                      placeholder="accounts@vendor.com"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Phone Number" required>
                  <div className="relative">
                    <Phone className="input-icon" />

                    <input
                      required
                      value={form.phone}
                      onChange={(event) =>
                        updateForm("phone", event.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Website" className="sm:col-span-2">
                  <input
                    type="url"
                    value={form.website}
                    onChange={(event) =>
                      updateForm("website", event.target.value)
                    }
                    placeholder="https://vendorwebsite.com"
                    className="input-style"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Compliance"
                title="Tax and Registration Details"
                description="Provide Indian statutory registration details"
                icon={<ShieldCheck className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ToggleCard
                  title="GST Registered"
                  description="Vendor has an active GST registration"
                  checked={form.gstRegistered}
                  onChange={(checked) =>
                    updateForm("gstRegistered", checked)
                  }
                />

                <ToggleCard
                  title="MSME Registered"
                  description="Vendor is registered under Udyam"
                  checked={form.msmeRegistered}
                  onChange={(checked) =>
                    updateForm("msmeRegistered", checked)
                  }
                />

                {form.gstRegistered && (
                  <Field label="GSTIN" required>
                    <input
                      required
                      maxLength={15}
                      value={form.gstin}
                      onChange={(event) =>
                        updateForm(
                          "gstin",
                          event.target.value.toUpperCase(),
                        )
                      }
                      placeholder="27AABCP1234F1Z5"
                      className={[
                        "input-style uppercase",
                        form.gstin.length > 0
                          ? gstValid
                            ? "border-emerald-400"
                            : "border-red-400"
                          : "",
                      ].join(" ")}
                    />

                    <ValidationText
                      visible={form.gstin.length > 0}
                      valid={gstValid}
                      validText="GSTIN format is valid"
                      invalidText="Enter a valid 15-character GSTIN"
                    />
                  </Field>
                )}

                <Field label="PAN Number" required>
                  <input
                    required
                    maxLength={10}
                    value={form.pan}
                    onChange={(event) =>
                      updateForm(
                        "pan",
                        event.target.value.toUpperCase(),
                      )
                    }
                    placeholder="AABCP1234F"
                    className={[
                      "input-style uppercase",
                      form.pan.length > 0
                        ? panValid
                          ? "border-emerald-400"
                          : "border-red-400"
                        : "",
                    ].join(" ")}
                  />

                  <ValidationText
                    visible={form.pan.length > 0}
                    valid={panValid}
                    validText="PAN format is valid"
                    invalidText="Enter a valid 10-character PAN"
                  />
                </Field>

                <Field label="CIN / Registration Number">
                  <input
                    value={form.cin}
                    onChange={(event) =>
                      updateForm(
                        "cin",
                        event.target.value.toUpperCase(),
                      )
                    }
                    placeholder="Corporate identification number"
                    className="input-style uppercase"
                  />
                </Field>

                {form.msmeRegistered && (
                  <Field label="Udyam Registration Number">
                    <input
                      value={form.msmeNumber}
                      onChange={(event) =>
                        updateForm(
                          "msmeNumber",
                          event.target.value.toUpperCase(),
                        )
                      }
                      placeholder="UDYAM-UP-00-0000000"
                      className="input-style uppercase"
                    />
                  </Field>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Registered Address"
                title="Business Address"
                description="Enter the vendor billing and registered address"
                icon={<MapPin className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Address Line 1"
                  required
                  className="sm:col-span-2"
                >
                  <input
                    required
                    value={form.addressLine1}
                    onChange={(event) =>
                      updateForm("addressLine1", event.target.value)
                    }
                    placeholder="Building, street or industrial area"
                    className="input-style"
                  />
                </Field>

                <Field label="Address Line 2" className="sm:col-span-2">
                  <input
                    value={form.addressLine2}
                    onChange={(event) =>
                      updateForm("addressLine2", event.target.value)
                    }
                    placeholder="Landmark or additional address"
                    className="input-style"
                  />
                </Field>

                <Field label="City" required>
                  <input
                    required
                    value={form.city}
                    onChange={(event) =>
                      updateForm("city", event.target.value)
                    }
                    placeholder="City"
                    className="input-style"
                  />
                </Field>

                <Field label="State" required>
                  <select
                    required
                    value={form.state}
                    onChange={(event) =>
                      updateForm("state", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option value="">Select state</option>

                    {indianStates.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Postal Code" required>
                  <input
                    required
                    maxLength={6}
                    value={form.postalCode}
                    onChange={(event) =>
                      updateForm(
                        "postalCode",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="221005"
                    className="input-style"
                  />
                </Field>

                <Field label="Country">
                  <select
                    value={form.country}
                    onChange={(event) =>
                      updateForm("country", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                    <option>Singapore</option>
                  </select>
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Payment Account"
                title="Bank Details"
                description="Add the verified account used for vendor payments"
                icon={<Landmark className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Bank Name" required>
                  <input
                    required
                    value={form.bankName}
                    onChange={(event) =>
                      updateForm("bankName", event.target.value)
                    }
                    placeholder="Bank name"
                    className="input-style"
                  />
                </Field>

                <Field label="Account Holder Name" required>
                  <input
                    required
                    value={form.accountHolder}
                    onChange={(event) =>
                      updateForm("accountHolder", event.target.value)
                    }
                    placeholder="Name as per bank account"
                    className="input-style"
                  />
                </Field>

                <Field label="Account Number" required>
                  <input
                    required
                    type="password"
                    value={form.accountNumber}
                    onChange={(event) =>
                      updateForm(
                        "accountNumber",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="Enter account number"
                    className="input-style"
                  />
                </Field>

                <Field label="Confirm Account Number" required>
                  <input
                    required
                    value={form.confirmAccountNumber}
                    onChange={(event) =>
                      updateForm(
                        "confirmAccountNumber",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                    placeholder="Re-enter account number"
                    className={[
                      "input-style",
                      form.confirmAccountNumber.length > 0
                        ? bankAccountsMatch
                          ? "border-emerald-400"
                          : "border-red-400"
                        : "",
                    ].join(" ")}
                  />

                  <ValidationText
                    visible={form.confirmAccountNumber.length > 0}
                    valid={bankAccountsMatch}
                    validText="Account numbers match"
                    invalidText="Account numbers do not match"
                  />
                </Field>

                <Field label="IFSC Code" required>
                  <input
                    required
                    maxLength={11}
                    value={form.ifscCode}
                    onChange={(event) =>
                      updateForm(
                        "ifscCode",
                        event.target.value.toUpperCase(),
                      )
                    }
                    placeholder="SBIN0001234"
                    className={[
                      "input-style uppercase",
                      form.ifscCode.length > 0
                        ? ifscValid
                          ? "border-emerald-400"
                          : "border-red-400"
                        : "",
                    ].join(" ")}
                  />

                  <ValidationText
                    visible={form.ifscCode.length > 0}
                    valid={ifscValid}
                    validText="IFSC format is valid"
                    invalidText="Enter a valid 11-character IFSC"
                  />
                </Field>

                <Field label="Branch Name">
                  <input
                    value={form.branchName}
                    onChange={(event) =>
                      updateForm("branchName", event.target.value)
                    }
                    placeholder="Bank branch name"
                    className="input-style"
                  />
                </Field>

                <Field label="UPI ID" className="sm:col-span-2">
                  <input
                    value={form.upiId}
                    onChange={(event) =>
                      updateForm("upiId", event.target.value)
                    }
                    placeholder="vendor@bank"
                    className="input-style"
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Commercial Terms"
                title="Accounting and Payment Settings"
                description="Configure vendor credit and tax deduction terms"
                icon={<WalletCards className="h-7 w-7" />}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Payment Terms">
                  <select
                    value={form.paymentTerms}
                    onChange={(event) =>
                      updateForm("paymentTerms", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    {paymentTerms.map((term) => (
                      <option key={term}>{term}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Preferred Currency">
                  <select
                    value={form.currency}
                    onChange={(event) =>
                      updateForm("currency", event.target.value)
                    }
                    className="input-style bg-white"
                  >
                    <option value="INR">INR — Indian Rupee</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — British Pound</option>
                  </select>
                </Field>

                <Field label="Credit Limit">
                  <div className="relative">
                    <Banknote className="input-icon" />

                    <input
                      type="number"
                      min="0"
                      value={form.creditLimit || ""}
                      onChange={(event) =>
                        updateForm(
                          "creditLimit",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <Field label="Opening Balance">
                  <div className="relative">
                    <Banknote className="input-icon" />

                    <input
                      type="number"
                      min="0"
                      value={form.openingBalance || ""}
                      onChange={(event) =>
                        updateForm(
                          "openingBalance",
                          Number(event.target.value || 0),
                        )
                      }
                      placeholder="0"
                      className="input-style pl-11"
                    />
                  </div>
                </Field>

                <ToggleCard
                  title="TDS Applicable"
                  description="Deduct tax at source from vendor payments"
                  checked={form.tdsApplicable}
                  onChange={(checked) =>
                    updateForm("tdsApplicable", checked)
                  }
                />

                {form.tdsApplicable && (
                  <Field label="TDS Section">
                    <select
                      value={form.tdsSection}
                      onChange={(event) =>
                        updateForm("tdsSection", event.target.value)
                      }
                      className="input-style bg-white"
                    >
                      <option value="">Select section</option>
                      <option>194C — Contractor</option>
                      <option>194H — Commission</option>
                      <option>194I — Rent</option>
                      <option>194J — Professional Services</option>
                      <option>194Q — Purchase of Goods</option>
                    </select>
                  </Field>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Supporting Evidence"
                title="Vendor Documents"
                description="Upload tax, bank and registration documents"
                icon={<Paperclip className="h-7 w-7" />}
              />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileSelection}
                className="hidden"
              />

              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={[
                  "mt-6 flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed px-6 py-10 text-center transition",
                  isDragging
                    ? "border-[#10233b] bg-slate-100"
                    : "border-slate-300 bg-slate-50",
                ].join(" ")}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#10233b] shadow-sm">
                  <Upload className="h-6 w-6" />
                </div>

                <p className="mt-4 text-sm font-black text-[#10233b]">
                  Drop vendor documents here
                </p>

                <p className="mt-2 text-xs font-semibold text-slate-500">
                  GST certificate, PAN, cancelled cheque or MSME
                  certificate
                </p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-[#10233b] px-4 py-2.5 text-xs font-black text-white"
                >
                  <Plus className="h-4 w-4" />
                  Browse Documents
                </button>
              </div>

              {documents.length > 0 && (
                <div className="mt-5 space-y-3">
                  {documents.map((document) => (
                    <div
                      key={document.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FileCheck2 className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-[#10233b]">
                            {document.name}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-slate-400">
                            {formatFileSize(document.size)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeDocument(document.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                eyebrow="Internal Information"
                title="Finance Notes"
                description="Add internal onboarding or approval instructions"
                icon={<FileText className="h-7 w-7" />}
              />

              <textarea
                rows={5}
                value={form.internalNotes}
                onChange={(event) =>
                  updateForm("internalNotes", event.target.value)
                }
                placeholder="Add payment instructions, procurement notes or approval comments..."
                className="textarea-style mt-6"
              />
            </section>
          </div>

          <aside className="space-y-5 2xl:sticky 2xl:top-6 2xl:h-fit">
            <section className="rounded-[28px] bg-[#10233b] p-5 text-white shadow-[0_24px_60px_rgba(15,35,59,0.2)] sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400">
                Vendor Summary
              </p>

              <h2 className="mt-2 text-xl font-black">
                Onboarding Progress
              </h2>

              <div className="mt-6 rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300">
                    Profile completion
                  </span>

                  <span className="text-sm font-black">
                    {completionPercentage}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  label="Vendor Code"
                  value={vendorCode}
                />

                <SummaryRow
                  label="Vendor Name"
                  value={form.legalName || "Not entered"}
                />

                <SummaryRow
                  label="Category"
                  value={form.category || "Not selected"}
                />

                <SummaryRow
                  label="Payment Terms"
                  value={form.paymentTerms}
                />

                <SummaryRow
                  label="Credit Limit"
                  value={formatCurrency(form.creditLimit)}
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                    KEOS Intelligence
                  </p>

                  <h2 className="mt-2 text-lg font-black text-[#10233b]">
                    Vendor Validation
                  </h2>
                </div>

                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>

              <div className="mt-5 space-y-3">
                <ValidationCard
                  title="PAN validation"
                  description={
                    panValid
                      ? "PAN structure is valid."
                      : "Enter a valid PAN number."
                  }
                  valid={panValid}
                />

                <ValidationCard
                  title="GST validation"
                  description={
                    gstValid
                      ? "GST registration format is valid."
                      : "GSTIN requires validation."
                  }
                  valid={gstValid}
                />

                <ValidationCard
                  title="Bank account check"
                  description={
                    bankAccountsMatch
                      ? "Account numbers match."
                      : "Confirm the bank account number."
                  }
                  valid={bankAccountsMatch}
                />

                <ValidationCard
                  title="Duplicate vendor risk"
                  description={`${duplicateRisk}% duplicate probability detected.`}
                  valid={duplicateRisk < 20}
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
                Approval Route
              </p>

              <h2 className="mt-2 text-lg font-black text-[#10233b]">
                Vendor Verification Workflow
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  {
                    number: 1,
                    title: "Procurement Review",
                    description: "Business requirement validation",
                  },
                  {
                    number: 2,
                    title: "Finance Verification",
                    description: "PAN, GST and bank validation",
                  },
                  {
                    number: 3,
                    title: "Final Activation",
                    description: "Vendor account activation",
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10233b] text-sm font-black text-white">
                      {step.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-[#10233b]">
                        {step.title}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        {step.description}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </section>

            <section className="flex items-start gap-3 rounded-[24px] border border-amber-200 bg-amber-50 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <div>
                <p className="text-sm font-black text-amber-800">
                  Verification required
                </p>

                <p className="mt-1 text-xs font-semibold leading-5 text-amber-700">
                  Vendor payments should remain blocked until tax and bank
                  verification is completed.
                </p>
              </div>
            </section>
          </aside>
        </div>

        <section className="sticky bottom-0 z-20 mt-5 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-[0_-14px_45px_rgba(15,35,59,0.1)] backdrop-blur-xl">
          {savedDraft ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              Vendor draft saved successfully
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={clearForm}
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
                Clear Form
              </button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#10233b] px-5 py-3 text-sm font-black text-[#10233b] transition hover:bg-slate-50"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#10233b] px-6 py-3 text-sm font-black text-white transition hover:bg-[#183653]"
                >
                  <Send className="h-4 w-4" />
                  Submit Vendor
                </button>
              </div>
            </div>
          )}
        </section>
      </form>

      <style jsx global>{`
        .input-style {
          height: 3rem;
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgb(226 232 240);
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #10233b;
          outline: none;
          transition: 0.2s;
        }

        .input-style::placeholder {
          color: rgb(148 163 184);
        }

        .input-style:focus {
          border-color: #10233b;
        }

        .textarea-style {
          width: 100%;
          resize: none;
          border-radius: 1rem;
          border: 1px solid rgb(226 232 240);
          padding: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #10233b;
          outline: none;
          transition: 0.2s;
        }

        .textarea-style::placeholder {
          color: rgb(148 163 184);
        }

        .textarea-style:focus {
          border-color: #10233b;
        }

        .input-icon {
          pointer-events: none;
          position: absolute;
          left: 1rem;
          top: 50%;
          height: 1rem;
          width: 1rem;
          transform: translateY(-50%);
          color: rgb(148 163 184);
        }
      `}</style>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d02b3f]">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-black text-[#10233b]">
          {title}
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {description}
        </p>
      </div>

      <div className="text-[#10233b]">{icon}</div>
    </div>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-black text-[#10233b]">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4">
      <div>
        <p className="text-sm font-black text-[#10233b]">{title}</p>

        <p className="mt-1 text-xs font-semibold text-slate-500">
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-[#10233b]"
      />
    </label>
  );
}

function ValidationText({
  visible,
  valid,
  validText,
  invalidText,
}: {
  visible: boolean;
  valid: boolean;
  validText: string;
  invalidText: string;
}) {
  if (!visible) return null;

  return (
    <p
      className={[
        "mt-2 text-xs font-semibold",
        valid ? "text-emerald-600" : "text-red-600",
      ].join(" ")}
    >
      {valid ? validText : invalidText}
    </p>
  );
}

function ValidationCard({
  title,
  description,
  valid,
}: {
  title: string;
  description: string;
  valid: boolean;
}) {
  return (
    <div
      className={[
        "flex items-start gap-3 rounded-2xl p-4",
        valid ? "bg-emerald-50" : "bg-amber-50",
      ].join(" ")}
    >
      {valid ? (
        <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
      ) : (
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      )}

      <div>
        <p
          className={[
            "text-sm font-black",
            valid ? "text-emerald-700" : "text-amber-700",
          ].join(" ")}
        >
          {title}
        </p>

        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm font-semibold text-slate-300">
        {label}
      </span>

      <span className="max-w-[190px] text-right text-sm font-black">
        {value}
      </span>
    </div>
  );
}