// src/components/ui/Input.jsx

import React from 'react';
import { clsx } from 'clsx';

const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  // Define a base set of classes for the input
  const baseClasses = "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

  // Combine the base classes with any custom classes using clsx
  const combinedClasses = clsx(
    baseClasses,
    className
  );

  return (
    <input
      type={type}
      className={combinedClasses}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;