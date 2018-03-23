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
    cartItems: [CartItem!]!
  }

  type Mutation {
    addOneToCart(productId: Int!): Int
    removeFromCart(productId: Int!): Int
    removeOneFromCart(productId: Int!): Int
    logOut: Boolean
  }
  
  type CartItem {
    id: Int!
    quantity: Int!
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

const removeFromCartGeneric = (_, { productId, all }, { cache }) => {
  const query = gql`
    query GetCartItems {
      cartItems @client {
        id
        quantity
      }
    }
  `;
  const previous = cache.readQuery({ query });
  const previousItems = previous.cartItems;

  const previousCartItem = previousItems.find(c => c.id === productId);
  if (previousCartItem === undefined) {
    // Nothing to remove.
    return productId;
  }
  // We first remove this item, then add back modified version (if applicable)
  const itemsExceptThis = previousItems.filter(c => c.id !== productId);
  let maybeThis = [];

  if (previousCartItem.quantity <= 1 || all) {
    // Do not add new item to maybeThis, thereby removing it completely
  } else {
    const newQuantity = (previousCartItem.quantity -= 1);
    const newItem = {
      id: productId,
      quantity: newQuantity,
      __typename: 'CartItem',
    };
    maybeThis.push(newItem);
  }
  const newItemList = itemsExceptThis.concat(maybeThis);

  const newData = {
    cartItems: newItemList,
  };
  cache.writeData({ data: newData });
  return productId;
};

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      addOneToCart: (_, { productId }, { cache }) => {
        const query = gql`
          query GetCartItems {
            cartItems @client {
              id
              quantity
            }
          }
        `;
        const previous = cache.readQuery({ query });
        const previousItems = previous.cartItems;

        // Should we modify existing entry, or add a new?
        const previousCartItem = previousItems.find(c => c.id === productId);
        let itemsWithThis = null;
        if (previousCartItem !== undefined) {
          // Modify existing, increase quantity
          const newQuantity = previousCartItem.quantity + 1;
          const itemsExceptThis = previousItems.filter(c => c.id !== productId);
          const newItem = {
            id: productId,
            quantity: newQuantity,
            __typename: 'CartItem',
          };
          itemsWithThis = itemsExceptThis.concat([newItem]);
        } else {
          // Add new
          const newItem = {
            id: productId,
            quantity: 1,
            __typename: 'CartItem',
          };
          itemsWithThis = previousItems.concat([newItem]);
        }
        // Make change
        const data = {
          cartItems: itemsWithThis,
        };
        cache.writeData({ data });
        return productId;
      },
      removeFromCart: (obj, args, context) => {
        args.all = true;
        return removeFromCartGeneric(obj, args, context);
      },
      removeOneFromCart: (obj, args, context) => {
        args.all = false;
        return removeFromCartGeneric(obj, args, context);
      },
      logOut: (_, __, { cache }) => {
        localStorage.removeItem('jwt');
        cache.writeData({ data: defaultState });
        return true;
      },
    },
  },
  defaults: defaultState,
  typeDefs,
});

export default stateLink;
