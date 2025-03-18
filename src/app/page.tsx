"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Dashboard from "@src/components/Dashboard/Dashboard";
import LandingPage from "@src/components/LandingPage/LandingPage";
// import { redirect } from "next/navigation";

export default function Home() {
  // const { userId } = useAuth();

  // if (userId) {
  //   redirect("/dashboard");
  // }

  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  );
}
