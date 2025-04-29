import {
  House,
  Minus,
  Plus,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react-native';
import { cssInterop } from 'nativewind';

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

iconWithClassName(House);
iconWithClassName(Minus);
iconWithClassName(Plus);
iconWithClassName(ShoppingCart);

export { House, Minus, Plus, ShoppingCart };
