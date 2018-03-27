import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const query = gql`
  mutation AddOneToCart($productId: Int!) {
    addOneToCart(productId: $productId) @client
  }
`;

const options = {
  props: ({ mutate }) => ({
    addToCart: product => mutate({ variables: { productId: product.id } }),
  }),
};

export default graphql(query, options);
