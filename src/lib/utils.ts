import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const iconWithClassName = (icon: LucideIcon) => {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
};
