import React from "react";
import NewVerificationForm from "@/components/ui/Form/NewVerificationForm/NewVerificationForm";
import RedirectButton from "@/components/ui/Buttons/RedirectButton";

export default function NewVerificationPage() {
  return (
    <NewVerificationForm status="Checking your email...">
      <RedirectButton path="/public/auth/sign-in" text="Sign in" />
      <RedirectButton path="/" text="Home" />
    </NewVerificationForm>
  );
}
