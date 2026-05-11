import { shadcn } from "@clerk/ui/themes"

export const clerkAppearance = {
  theme: shadcn,
  variables: {
    colorBackground: "var(--card)",
    colorForeground: "var(--card-foreground)",
    colorPrimary: "var(--primary)",
    colorPrimaryForeground: "var(--primary-foreground)",
    colorDanger: "var(--destructive)",
    colorMuted: "var(--muted)",
    colorMutedForeground: "var(--muted-foreground)",
    colorInput: "var(--input)",
    colorInputForeground: "var(--foreground)",
    colorBorder: "var(--border)",
    colorRing: "var(--ring)",
    borderRadius: "var(--radius)",
  },
}
