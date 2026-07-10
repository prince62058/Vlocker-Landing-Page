
import Signin from "@/app/components/auth/sign-in";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Sign In | Property",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In Page" />
      <Suspense fallback={<div>Loading...</div>}>
        <Signin />
      </Suspense>
    </>
  );
};

export default SigninPage;
