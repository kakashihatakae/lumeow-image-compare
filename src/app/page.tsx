"use client";
import { useAuth } from "@clerk/nextjs";
import LandingPage from "@src/components/LandingPage/LandingPage";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = useAuth();

  if (userId) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
