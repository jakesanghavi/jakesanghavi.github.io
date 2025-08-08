import React from 'react';
import { clsx } from 'clsx';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  // Define a base set of classes for the textarea
  const baseClasses = "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  // Combine the base classes with any custom classes using clsx
  const combinedClasses = clsx(
    baseClasses,
    className
  );

  return (
    <textarea
      className={combinedClasses}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;