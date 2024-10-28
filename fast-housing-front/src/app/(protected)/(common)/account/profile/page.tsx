import { redirect } from "next/navigation";
import React from "react";
import Profile from "@/components/ui/Profile/ProfileBoard";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  if (session) {
    return <Profile />;
  } else {
    redirect("/");
  }
}
