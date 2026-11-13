import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { PreferencesProvider } from "@/components/preferences";
export const metadata: Metadata = { title: { default: "MindGraph — A home for connected thinking", template: "%s | MindGraph" }, description: "A local-first knowledge workspace. Write Markdown, connect your ideas, and explore your personal knowledge graph.", icons: { icon: "/icon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning><body><PreferencesProvider>{children}</PreferencesProvider></body></html>; }
