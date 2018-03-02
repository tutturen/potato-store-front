import {makeApiCall} from './general';
const CART_KEY = 'cart';
const CACHED_CART_KEY = 'cached_processed_cart';
const MILLIS_TO_CACHE_CART = 5 * 60 * 1000;

/**
 * Get the local version of the cart, which only contains product IDs and count of items.
 * @return {{products: [string], productCount: number}}
 */
export function getLocalCart() {
  const rawValue = localStorage.getItem(CART_KEY);

  let parsedValue = {};
  const cartExists = (rawValue !== null);
  if (cartExists) {
    parsedValue.products = JSON.parse(rawValue);
    parsedValue.productCount = parsedValue.products.length;
  } else {
    parsedValue = _newCart();
  }

  return parsedValue;
}

/**
 * Add productID to the cart.
 * @param productID ID of product to add to cart.
 */
export function addProductToCart(productID) {
  const cart = getLocalCart();
  cart.products.push(productID);
  _setLocalCart(cart);
  invalidateCartCache();
}

/**
 * Remove the given productID from the cart.
 *
 * If the item is not found in the cart, no error is thrown.
 * @param productID ID of product to remove from cart.
 */
export function removeProductFromCart(productID) {
  const cart = getLocalCart();
  const productIndex = cart.products.indexOf(productID);
  if (productIndex === -1) {
    console.warn(`Tried removing ${productID} from cart, but no such ID was found.`);
    return;
  }
  cart.products.splice(productIndex, 1);
  _setLocalCart(cart);
  invalidateCartCache();
}

/**
 * Remove all items from the cart.
 */
export function clearCart() {
  _setLocalCart(_newCart());
  invalidateCartCache();
}

function _newCart() {
  return {
    products: [],
    productCount: 0,
  };
}

function _setLocalCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart.products));
}

/**
 * Fetch the full cart next time instead of relying on local cache.
 */
export function invalidateCartCache() {
  localStorage.removeItem(CACHED_CART_KEY);
}

/**
 * Get the full cart, with product details, total sum and discounts.
 *
 * See the query in the _fetchCartFromBackend function for details on the return format.
 * @return {Promise.<*>}
 */
export async function getFullCart() {
  const localCart = getLocalCart();
  const cachedValue = localStorage.getItem(CACHED_CART_KEY);
  const cacheExists = (cachedValue !== null);

  let fetchNeeded = (!cacheExists);
  let parsedCachedValue = null;
  if (cacheExists) {
    parsedCachedValue = JSON.parse(cachedValue);

    // Is it fresh enough? We first check if it matches the local cart
    if (parsedCachedValue.products.length !== localCart.products.length) {
      // Different length
      fetchNeeded = true;
    } else if ((parsedCachedValue.fetchedAt - Date.now()) > MILLIS_TO_CACHE_CART) {
      // Cache has expired
      fetchNeeded = true;
    }
  }

  let result = null;
  if (fetchNeeded) {
    result = await _fetchCartFromBackend();
    result.fetchedAt = Date.now();
    localStorage.setItem(CACHED_CART_KEY, JSON.stringify(result));
  } else {
    result = parsedCachedValue;
  }
  return result;
}

function _fetchCartFromBackend() {
  const query = `
query FetchCart($products: [ID!]!) {
  cart($products) {
    products {
      id
      name
      subtitle
      image
      price
      unitPrice
      unit
      category {
        name
        id
      }
      organic
      percentSale {
        cut
      }
      packageDeal {
        product {
          id
          name
        }
        paidQuantity
        minimumQuantity
      }
    }
    totalBeforeDiscount
    totalDiscount
    total
  }
}
`;
  const variables = {
    products: getLocalCart().products,
  };
  return makeApiCall(query, variables)
    .then((body) => {
      if (body.errors && body.errors.length) {
        throw new Error(`Failed to fetch cart: ${body.errors.join('; ')}`);
      }
      return body;
    })
    .then((body) => body.data.cart);
}

/*function _fakeFetchCartFromBackend() {
  return Promise.resolve({
    products: [
      {
        id: '123',
        name: 'Økologiske Egg',
        subtitle: null,
        image: '/media/uploads/public/217/233/186233-974e6-product_list.jpg',
        price: 25.5,
        unitPrice: 63.7,
        unit: 'kg',
        category: [
          {
            id: '123',
            name: 'Egg',
          },
        ],
        organic: true,
        percentSale: null,
        packageDeal: null,
      },
    ],
    totalBeforeDiscount: 25.5,
    totalDiscount: 0.0,
    total: 25.5,
  });
}*/