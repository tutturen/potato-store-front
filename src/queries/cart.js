import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  query FetchCart($products: [CartItemInput!]!) {
    cart(products: $products) {
      items {
        product {
          image
          name
          id
          subtitle
          unitPrice
          unit
          organic
          price
          percentSale {
            id
          }
        }
        quantity
        unitPrice
        originalPrice
      }
      total
      totalDiscount
      totalBeforeDiscount
    }
  }
`;

export const options = {
  options: props => {
    return {
      variables: {
        products: props.data.cartItems.map(({ id, quantity }) => ({
          product: parseInt(id, 10),
          quantity,
        })),
      },
    };
  },
};

export default graphql(query, options);
