import React from "react";
import LoginForm from "../(auth)/login/page";

export default function LoginSus() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </React.Suspense>
  );
}
