import * as React from 'react';
import type { ViewRef } from '@rn-primitives/types';
import { type ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { cn } from '@/lib/utils';

export const Card = React.forwardRef<ViewRef, ViewProps>(
  ({ className, ...props }, ref) => (
    <Animated.View
      ref={ref}
      className={cn(
        'rounded-lg border border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-900 drop-shadow-lg',
        className,
      )}
      entering={FadeIn}
      exiting={FadeOut}
      {...props}
    />
  ),
);
Card.displayName = 'Card';
