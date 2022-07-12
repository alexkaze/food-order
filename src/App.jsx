import React, { useState } from 'react';

import CartProvider from './store/cart-provider';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Foods from './components/Food/Foods';

const App = () => {
  const [cartDisplay, setCartDisplay] = useState(false);

  const displayCartHandler = () => setCartDisplay(prevState => !prevState);
  const hideCartHandler = () => setCartDisplay(prevState => !prevState);

  return (
    <CartProvider>
      {cartDisplay && <Cart onHideCart={hideCartHandler} />}
      <Header onDisplayCart={displayCartHandler} />
      <main>
        <Foods />
      </main>
    </CartProvider>
  );
};

export default App;
