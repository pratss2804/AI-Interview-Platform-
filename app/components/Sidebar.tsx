"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  FileText,
  History,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 hover:text-blue-400 ${
      pathname === path ? "text-blue-400 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        AI Interview
      </h1>

      <nav className="space-y-5">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link href="/upload-resume" className={linkClass("/upload-resume")}>
          <Upload size={20} />
          Upload Resume
        </Link>

        <Link href="/interview" className={linkClass("/interview")}>
          <MessageSquare size={20} />
          Interview
        </Link>

        <Link href="/report" className={linkClass("/report")}>
          <FileText size={20} />
          Report
        </Link>

        <Link href="/history" className={linkClass("/history")}>
          <History size={20} />
          History
        </Link>
      </nav>
    </aside>
  );
}