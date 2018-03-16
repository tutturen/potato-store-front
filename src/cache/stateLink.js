import cache from './cache';
import gql from 'graphql-tag';
import { withClientState } from 'apollo-link-state';

const typeDefs = `
  type UserType {
    id: ID!
    loggedIn: Boolean!
    firstName: String
    lastName: String
    username: String
  }

  type Query {
    user: UserType
    cartItems: [Int!]!
  }

  type Mutation {
    addToCart(productId: Int!): Int
    logOut: Boolean
  }
`;

const defaultState = {
  user: {
    id: 0,
    __typename: 'UserType',
    loggedIn: false,
    username: 'John',
    firstName: 'John',
    lastName: 'Johnson',
  },
  cartItems: [],
};

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      addToCart: (_, { productId }, { cache }) => {
        const query = gql`
          query GetCartItems {
            cartItems @client
          }
        `;
        const previous = cache.readQuery({ query });
        const data = {
          cartItems: previous.cartItems.concat([productId]),
        };
        cache.writeData({ data });
        return productId;
      },
      logOut: (_, __, { cache }) => {
        cache.writeData({ data: defaultState });
        return true;
      },
    },
  },
  defaults: defaultState,
  typeDefs,
});

export default stateLink;
