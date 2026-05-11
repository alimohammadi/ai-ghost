import type { ReactNode } from "react"

const features = [
  "Protected editor workspace",
  "Secure project access",
  "Profile and session controls",
]

interface AuthPageShellProps {
  children: ReactNode
  title: string
  description: string
}

export function AuthPageShell({
  children,
  title,
  description,
}: AuthPageShellProps) {
  return (
    <main className="grid min-h-screen bg-background text-foreground lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
      <section className="hidden border-r border-border px-12 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="text-sm font-semibold tracking-wide">Ghost AI</div>

        <div className="max-w-sm space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Private AI writing environment
            </p>
            <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">Ghost AI</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-10">
        {children}
      </section>
    </main>
  )
}
