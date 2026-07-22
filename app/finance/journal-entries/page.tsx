import { redirect } from "next/navigation";

export default function JournalEntriesPage() {
  redirect("/finance/journal-entries/create");
}