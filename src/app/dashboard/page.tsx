"use client";
import { useAuth } from "@clerk/nextjs";
import Dashboard from "@src/components/Dashboard/Dashboard";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return <Dashboard />;
}
