import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation RemoveCartItem($productId: Int!) {
    removeFromCart(productId: $productId) @client
  }
`;

const options = {
  props: ({ mutate }) => ({
    removeFromCart: productId => mutate({ variables: { productId } }),
  }),
};

export default graphql(query, options);
