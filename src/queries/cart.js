import gql from 'graphql-tag';

export default gql`
  query FetchCart($products: [ID!]!) {
    cart {
      products {
        id
        name
      }
      total
      totalDiscount
      totalBeforeDiscount
    }
  }
`;
