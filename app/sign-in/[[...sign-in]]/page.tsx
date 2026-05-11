import { SignIn } from "@clerk/nextjs"
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

export default function SignInPage() {
  return (
    <AuthPageShell
      title="Welcome back to Ghost AI"
      description="Sign in to continue into your editor and manage your writing workspace."
    >
      <SignIn
        appearance={clerkAppearance}
        path={signInPath}
        routing="path"
        signUpUrl={signUpPath}
      />
    </AuthPageShell>
  )
}
