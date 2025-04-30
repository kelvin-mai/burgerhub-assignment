import * as React from 'react';
import { render, userEvent } from '@testing-library/react-native';

import { ProductCartItem } from '@/components/product';
import { formatUSD } from '@/lib/utils';
import { mockProduct } from '../../fixtures';

describe('<ProductCartItem>', () => {
  it('should render props', () => {
    const c = render(
      <ProductCartItem
        product={mockProduct}
        quantity={1}
      />,
    );

    expect(c.getByTestId('product-cart-item-name').props.children).toEqual(
      mockProduct.name,
    );
    expect(c.getByTestId('product-cart-item-image').props.source.uri).toEqual(
      mockProduct.image,
    );
    expect(c.getByTestId('product-cart-item-quantity').props.children).toEqual([
      'Quantity: ',
      1,
    ]);
    expect(c.getByTestId('product-cart-item-price').props.children).toEqual([
      'Price: ',
      formatUSD(mockProduct.price),
    ]);
    expect(c.getByTestId('product-cart-item-subtotal').props.children).toEqual([
      'Subtotal: ',
      formatUSD(mockProduct.price),
    ]);
  });

  it('should render correct subtotal when multiple quantity', () => {
    const mockQuantity = 69;
    const c = render(
      <ProductCartItem
        product={mockProduct}
        quantity={mockQuantity}
      />,
    );

    expect(c.getByTestId('product-cart-item-quantity').props.children).toEqual([
      'Quantity: ',
      mockQuantity,
    ]);
    expect(c.getByTestId('product-cart-item-price').props.children).toEqual([
      'Price: ',
      formatUSD(mockProduct.price),
    ]);
    expect(c.getByTestId('product-cart-item-subtotal').props.children).toEqual([
      'Subtotal: ',
      formatUSD(mockProduct.price * mockQuantity),
    ]);
  });
});
