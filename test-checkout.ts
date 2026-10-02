import { validateProductsForCheckout } from './src/lib/repositories/product';

async function test() {
  try {
    await validateProductsForCheckout([ { productId: "6", quantity: 3 } ]);
    console.log("Success");
  } catch(e) {
    console.error(e);
  }
}

test();
