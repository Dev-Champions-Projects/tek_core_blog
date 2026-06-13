import SignInForm from "@/components/signin-form";
import { requireNoAuth } from "@/lib/auth-utils";

// This page must be rendered dynamically because it checks auth headers
export const dynamic = "force-dynamic";

export default async function SignInPage() {
  await requireNoAuth();
  return <SignInForm />;
}
