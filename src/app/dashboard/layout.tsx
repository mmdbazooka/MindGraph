import { NotesProvider } from "@/features/notes/provider";
import { AppShell } from "@/components/app-shell";
export default function DashboardLayout({children}:{children:React.ReactNode}) { return <NotesProvider><AppShell>{children}</AppShell></NotesProvider>; }
