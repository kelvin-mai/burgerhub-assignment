import {
  House,
  Minus,
  MoonStar,
  Plus,
  ShoppingCart,
  Sun,
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
iconWithClassName(MoonStar);
iconWithClassName(Plus);
iconWithClassName(Sun);
iconWithClassName(ShoppingCart);

export { House, Minus, MoonStar, Plus, Sun, ShoppingCart };
