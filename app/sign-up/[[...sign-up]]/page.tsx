import { SignUp } from "@clerk/nextjs"
import { AuthPageShell } from "@/components/auth/auth-page-shell"
import { clerkAppearance } from "@/lib/clerk-appearance"

const signInPath = new URL(
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in",
  "http://ghost-ai.local"
).pathname

const signUpPath = new URL(
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up",
  "http://ghost-ai.local"
).pathname

export default function SignUpPage() {
  return (
    <AuthPageShell
      title="Create your Ghost AI account"
      description="Start with a secure account before opening the editor workspace."
    >
      <SignUp
        appearance={clerkAppearance}
        path={signUpPath}
        routing="path"
        signInUrl={signInPath}
      />
    </AuthPageShell>
  )
}
