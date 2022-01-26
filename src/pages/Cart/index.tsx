import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const total =
     formatPrice(
       cart.reduce((sumTotal, product) => {
         sumTotal += product.amount * product.price;
         return sumTotal;
       }, 0)
     )

  function handleProductIncrement(product: Product) {
    updateProductAmount({productId: product.id, amount: product.amount + 1});
  }

  function handleProductDecrement(product: Product) {
    if (product.amount === 1) {
      removeProduct(product.id);
    } else {
      updateProductAmount({productId: product.id, amount: product.amount - 1});
    }
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map(p => (
          <tr data-testid="product" key={p.id}>
            <td>
              <img src={p.image} alt={p.title} />
            </td>
            <td>
              <strong>{p.title}</strong>
              <span>{formatPrice(p.price)}</span>
            </td>
            <td>
              <div>
                <button
                  type="button"
                  data-testid="decrement-product"
                  disabled={p.amount <= 1}
                  onClick={() => handleProductDecrement(p)}
                >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <input
                  type="text"
                  data-testid="product-amount"
                  readOnly
                  value={p.amount}
                />
                <button
                  type="button"
                  data-testid="increment-product"
                 onClick={() => handleProductIncrement(p)}
                >
                  <MdAddCircleOutline size={20} />
                </button>
              </div>
            </td>
            <td>
              <strong>{formatPrice(p.amount * p.price)}</strong>
            </td>
            <td>
              <button
                type="button"
                data-testid="remove-product"
              onClick={() => handleRemoveProduct(p.id)}
              >
                <MdDelete size={20} />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
