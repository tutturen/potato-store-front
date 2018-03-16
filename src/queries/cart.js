import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  query FetchCart($products: [ID!]!) {
    cart(products: $products) {
      products {
        id
        name
        subtitle
        price
        image
      }
      total
      totalDiscount
      totalBeforeDiscount
    }
  }
`;

export const options = {
  options: props => {
    return { variables: { products: props.data.cartItems } };
  },
};

export default graphql(query, options);
