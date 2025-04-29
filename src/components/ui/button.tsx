import * as React from 'react';
import { Pressable } from 'react-native';

import { cn } from '@/lib/utils';
import { TextClassContext } from './text';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, disabled, ...props }, ref) => {
  return (
    <TextClassContext.Provider
      value={cn(
        `web:whitespace-nowrap web:transition-colors web:pointer-events-none
        text-zinc-100 font-bold text-lg`,
      )}
    >
      <Pressable
        className={cn(
          `group flex items-center justify-center rounded-lg
           web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2
           web:hover:opacity-90 active:opacity-90
           h-10 px-4 py-2 native:h-12 native:px-5 native:py-3`,
          disabled && 'opacity-50 web:pointer-events-none',
          className,
        )}
        ref={ref}
        role='button'
        disabled={disabled}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
