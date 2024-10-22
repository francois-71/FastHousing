import ErrorDisplay from "@/components/ui/ErrorDisplay";
import RedirectButton from "@/components/ui/Buttons/RedirectButton";
import React from "react";

export default function AuthErrorPage() {
  return (
    <div>
      <ErrorDisplay title="Oops" message="It looks like something went wrong...">
        <RedirectButton path="/public/auth/sign-in" text="Sign in" />
        <RedirectButton path="/" text="Home page" />
      </ErrorDisplay>
    </div>
  );
}
