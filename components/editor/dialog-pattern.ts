/**
 * Dialog Pattern Types
 * 
 * Defines the structure and support for dialog interactions.
 * Ready for future dialog implementations.
 */

export interface DialogPatternProps {
  /**
   * Dialog title
   */
  title: string

  /**
   * Dialog description/body content
   */
  description?: string

  /**
   * Footer actions (buttons, etc)
   */
  footer?: React.ReactNode

  /**
   * Whether dialog is open
   */
  open: boolean

  /**
   * Callback when dialog closes
   */
  onOpenChange: (open: boolean) => void

  /**
   * Dialog content/children
   */
  children?: React.ReactNode
}

/**
 * Dialog configuration for reusable dialog implementations
 */
export interface DialogConfig {
  title: string
  description?: string
  primaryAction?: {
    label: string
    onClick: () => void | Promise<void>
  }
  secondaryAction?: {
    label: string
    onClick: () => void | Promise<void>
  }
}
