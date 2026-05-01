import * as React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}



const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className,  children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = 'Container'

export { Container }
