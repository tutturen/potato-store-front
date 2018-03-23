import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation RemoveOneCartItem($productId: Int!) {
    removeOneFromCart(productId: $productId) @client
  }
`;

const options = {
  props: ({ mutate }) => ({
    removeOneFromCart: productId => mutate({ variables: { productId } }),
  }),
};

export default graphql(query, options);
