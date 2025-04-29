import { ShoppingCart, type LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { House } from 'lucide-react-native';

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
iconWithClassName(ShoppingCart);

export { House, ShoppingCart };
