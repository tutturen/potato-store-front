import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const query = gql`
  mutation PerformPurchase($products: [CartItemInput!]!) {
    buy(products: $products) {
      success
    }
  }
`;

export const options = {
  props: ({ ownProps, mutate }) => {
    return {
      buyCart() {
        return mutate({
          variables: {
            products: ownProps.data.cart.items.map(item => ({
              product: item.product.id,
              quantity: item.quantity,
            })),
          },
          update: (store, response) => {
            if (response.data.buy.success) {
              // Empty cart query
              const cartItemsQuery = gql`
                query {
                  cartItems @client {
                    id
                    quantity
                  }
                }
              `;
              store.writeQuery({
                query: cartItemsQuery,
                data: { cartItems: [] },
              });
              // Redirect the user to order page
              ownProps.history.push({ pathname: '/order' });
            } else {
              console.error('Buying cart failed', response);
              ownProps.history.push({ pathname: '/login' });
            }
          },
        });
      },
    };
  },
};

export default graphql(query, options);
