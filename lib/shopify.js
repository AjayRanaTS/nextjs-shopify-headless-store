const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_URL = `https://${domain}/api/2026-10/graphql.json`;

// 1. Har GraphQL request isi function se jaayegi
async function shopifyFetch(query, variables = {}, options = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    ...options,
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// 2. Price format karna
export function formatPrice({ amount, currencyCode }) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currencyCode }).format(amount);
}

// 3. Saare products (homepage ke liye)
export async function getProducts(first = 12) {
  const data = await shopifyFetch(
    `query Products($first: Int!) {
      products(first: $first) {
        nodes {
          title
          handle
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }`,
    { first },
    { next: { revalidate: 60 } }
  );
  return data.products.nodes;
}

// 4. Ek product (product page ke liye)
export async function getProduct(handle) {
  const data = await shopifyFetch(
    `query Product($handle: String!) {
      product(handle: $handle) {
        title
        description
        descriptionHtml
        seo { title description }
        featuredImage { url altText }
        images(first: 6) {
          nodes { url altText width height }
        }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 50) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
          }
        }
      }
    }`,
    { handle },
    { next: { revalidate: 60 } }
  );
  return data.product;
}

// 5. Cart banao aur checkout link lo
export async function createCheckout(variantId) {
  const data = await shopifyFetch(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId: variantId, quantity: 1 }] },
    { cache: 'no-store' }
  );
  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length) throw new Error(userErrors[0].message);
  return cart.checkoutUrl;
}

// ---------- CART ----------

// Fragment: cart ke fields ek jagah likho, har query/mutation mein reuse karo
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
`;

function handleCartResult(result) {
  if (result.userErrors.length) throw new Error(result.userErrors[0].message);
  return result.cart;
}

// Cart padhna (purani ya complete ho chuki cart pe null aata hai)
export async function getCart(cartId) {
  const data = await shopifyFetch(
    `query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}`,
    { cartId },
    { cache: 'no-store' }
  );
  return data.cart;
}

// Nayi cart banana
export async function createCart(lines) {
  const data = await shopifyFetch(
    `mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}`,
    { lines },
    { cache: 'no-store' }
  );
  return handleCartResult(data.cartCreate);
}

// Cart mein product jodna
export async function addCartLines(cartId, lines) {
  const data = await shopifyFetch(
    `mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines },
    { cache: 'no-store' }
  );
  return handleCartResult(data.cartLinesAdd);
}

// Quantity badalna
export async function updateCartLines(cartId, lines) {
  const data = await shopifyFetch(
    `mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines },
    { cache: 'no-store' }
  );
  return handleCartResult(data.cartLinesUpdate);
}

// Item hatana
export async function removeCartLines(cartId, lineIds) {
  const data = await shopifyFetch(
    `mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lineIds },
    { cache: 'no-store' }
  );
  return handleCartResult(data.cartLinesRemove);
}