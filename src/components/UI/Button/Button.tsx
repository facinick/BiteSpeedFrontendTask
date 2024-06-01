import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva();

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      ...props
    },
    ref
  ) => {

    return (
      <button
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
