import { redirect } from "next/navigation";

export default function BankAccountsPage() {
  redirect("/finance/bank-accounts/create");
}