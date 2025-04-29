import * as React from 'react';
import type { ViewRef } from '@rn-primitives/types';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/lib/utils';

export const Card = React.forwardRef<ViewRef, ViewProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        'rounded-lg border border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-900 drop-shadow-lg',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';
