import React, { useEffect, useState } from 'react';
import axiosApiCall from '../../Assets/axiosApiCall';
import Checkout from '../../Components/Checkout/Checkout';
import './CartItem.css'

const CartItems = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      axiosApiCall("cart", "get", null).then(
        res => {
          const {data} = res.data;
          setData(data);
        }
      ).catch(err => {
        console.error(err, "unable to fetch data")
      })
    }, [])

    const clearCart = () => {
      // remove all cart items after 2 seconds of checkout.
      setTimeout(() => {
        axiosApiCall("cart", "delete", null).then(res => {
          setData([])
        }).catch(err => {
          console.error(err, "unable to remove cart items")
        })
      }, 800)
    };

    return (
      <>
        <div>
          {
            (data && data.length) ? (
              <div className='cart-item-container'>
                {
                  data.map(item => (
                    <div className='cart-item' key={item.item_id}>
                      <div className='cart-item-name'>
                        <h3>{item.name}</h3>
                        <h4>INR {item.price}</h4>
                      </div>
                      <div>
                        <img className='cart-item-img' src={item.image} alt="cart-item" />
                      </div>
                    </div>
                  ))
                }
                <Checkout items = {[...data]} clearCart={clearCart} />
              </div>
            ): (
              <h1>No Items available for checkout. Keep Shopping!</h1>
            )
          }
        </div>
      </>
    )
};
export default CartItems;
