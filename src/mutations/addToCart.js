import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation AddToCart($productId: Int!) {
    addToCart(productId: $productId) @client
  }
`;

const options = {
  props: ({ mutate }) => ({
    addToCart: product => mutate({ variables: { productId: product.id } }),
  }),
};

export default graphql(query, options);
