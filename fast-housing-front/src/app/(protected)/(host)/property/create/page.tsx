import React from "react";
import RegisterPropertyForm from "@/components/ui/Form/RegisterPropertyForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function CreateProperty() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  if (session) {
    return (
      <div>
        <RegisterPropertyForm />
      </div>
    );
  } else {
    redirect("/");
  }
}
