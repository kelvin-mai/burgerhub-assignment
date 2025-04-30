import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ProductListItem } from '@/components/product';
import { formatUSD } from '@/lib/utils';
import { mockProduct } from '../../fixtures';

const mockNavigate = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
}));

const mockSetSelectedProduct = jest.fn();
jest.mock('@/store', () => ({
  useAppActions: () => ({
    setSelectedProduct: mockSetSelectedProduct,
  }),
}));

describe('<ProductListItem />', () => {
  it('should render props', () => {
    const c = render(<ProductListItem product={mockProduct} />);
    expect(c.getByTestId('product-list-item-name').props.children).toEqual(
      mockProduct.name,
    );
    expect(
      c.getByTestId('product-list-item-description').props.children,
    ).toEqual(mockProduct.description);
    expect(c.getByTestId('product-list-item-image').props.source.uri).toEqual(
      mockProduct.image,
    );
    expect(c.getByTestId('product-list-item-price').props.children).toEqual(
      formatUSD(mockProduct.price),
    );
  });

  it('should respond to press event', async () => {
    const c = render(
      <NavigationContainer>
        <ProductListItem product={mockProduct} />
      </NavigationContainer>,
    );
    fireEvent.press(c.getByTestId('product-list-item-pressable'));
    expect(mockSetSelectedProduct).toHaveBeenCalledWith(mockProduct);
    expect(mockNavigate).toHaveBeenCalledWith('/product-details');
  });
});
