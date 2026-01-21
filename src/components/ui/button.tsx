import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-brand-mint text-white hover:bg-brand-mint-dark hover:shadow-xl hover:shadow-brand-mint/30 hover:scale-105',
        destructive:
          'bg-red-500 text-white hover:bg-red-600',
        outline:
          'border-2 border-brand-slate text-brand-ice hover:border-brand-mint hover:bg-brand-mint/5',
        secondary:
          'bg-brand-deep text-white hover:bg-brand-slate hover:shadow-xl',
        ghost:
          'text-brand-soft hover:text-brand-mint hover:bg-white/10',
        link:
          'text-brand-mint underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
