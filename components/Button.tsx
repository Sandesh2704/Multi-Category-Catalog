import * as React from 'react'

export const sizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
  icon: 'h-10 w-10 p-0'
} as const

export const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
} as const

export const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
} as const

export const animationStyles = {
  none: '',
  pulse: 'animate-pulse',
  float: 'btn-floating',
  shimmer: 'btn-gradient-shine',
  glow: 'btn-glow'
} as const

export const variants = {
  primary:
    'bg-gradient-to-r w-full from-blue-600 to-blue-900 hover:from-blue-600/90 hover:to-blue-900/90 text-white',

  secondary:
    'bg-gray-300 text-gray-800 hover:bg-gray-400',

  outline:
    'border border-gray-500 text-gray-700 hover:bg-gray-100',

  icon:
    'bg-indigo-500 text-white',

  ghost:
    'hover:bg-sand hover:text-charcoal',

  link:
    'text-indigo underline-offset-4 hover:underline',
} as const

const baseStyles =
  'inline-flex items-center justify-center cursor-pointer font-semibold relative overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  rounded?: keyof typeof roundedStyles
  shadow?: keyof typeof shadowStyles
  animation?: keyof typeof animationStyles
  loading?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

/* ------------------ Button ------------------ */
export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      rounded = 'md',
      shadow = 'none',
      loading = false,
      icon,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const finalClassName = [
      baseStyles,
      variants[variant],
      sizes[size],
      roundedStyles[rounded],
      shadowStyles[shadow],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={finalClassName}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}

        {!loading && children}
      </button>
    )
  }
)

Button.displayName = 'Button'