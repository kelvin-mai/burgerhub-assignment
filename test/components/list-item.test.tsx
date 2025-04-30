import * as React from 'react';
import { render } from '@testing-library/react-native';

import { ProductListItem } from '@/components/product';
import { formatUSD } from '@/lib/utils';
import { APIProduct } from '@/lib/types';

const mock: APIProduct = {
  id: '1',
  name: 'Burger A',
  price: 499,
  image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6',
  description:
    'A classic beef patty topped with lettuce, tomato, and our special sauce, served in a sesame seed bun.',
  calorie: 760,
  slug: 'burger-a',
};

describe('<ProductListItem />', () => {
  it('should render props', () => {
    const c = render(<ProductListItem product={mock} />);
    expect(c.getByTestId('product-list-item-name').props.children).toEqual(
      mock.name,
    );
    expect(
      c.getByTestId('product-list-item-description').props.children,
    ).toEqual(mock.description);
    expect(c.getByTestId('product-list-item-image').props.source.uri).toEqual(
      mock.image,
    );
    expect(c.getByTestId('product-list-item-price').props.children).toEqual(
      formatUSD(mock.price),
    );
  });
});
