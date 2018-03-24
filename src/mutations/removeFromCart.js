import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation RemoveCartItem($productId: Int!) {
    removeFromCart(productId: $productId) @client
  }
`;

const options = {
  props: ({ mutate }) => ({
    removeFromCart: product => mutate({ variables: { productId: product.id } }),
  }),
};

export default graphql(query, options);
