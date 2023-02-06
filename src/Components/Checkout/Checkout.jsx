import React, { useEffect, useState } from 'react';
import axiosApiCall from '../../Assets/axiosApiCall';
import './Checkout.css';

const Checkout = ({items, clearCart}) => {
  const [totalOrder, setTotalOrder] = useState(null);
  const [couponCode, setCouponCode] = useState("")
  const [couponMessge, setCouponMessge] = useState("");
  const [totalAmount, setTotalAmount] = useState(null)
  const [discountedAmount, setDiscountedAmount] = useState(null)
  const [checkoutMessage, setCheckoutMessage] = useState("")

  useEffect(() => {
    axiosApiCall("order", "get", null).then(
      res => {
        const {count} = res.data;
        setTotalOrder(count);
      }
      ).catch(err => {
        console.error(err, "unable to fetch orders")
      })
    }, [])
    
    useEffect(() => {
    // generating coupon whenever order changes
    handleGenerateCoupon()
    handleCheckoutAmount(items)
  }, [totalOrder])

  const handleGenerateCoupon = () => {
    if (totalOrder) {
      if ((totalOrder +1)%3 === 0) {
        console.log("generating a coupon")
        axiosApiCall("coupon", "get", null).then(res => {
            const {coupon_code} = res.data.coupon_code;
            setCouponCode(coupon_code);
            setCouponMessge(`Yay, you have a coupon - ${coupon_code}`);
          }
        ).catch(err => {
          console.error(err, "unable to fetch coupon")
        })
      }else {
        console.log("unable to generate a coupon")
        setCouponMessge("Sorry, No coupon codes available as we provide a 10% discount only on every 3rd order.")
      }
    }
  }

  const handleCheckoutAmount = (items) => {
    let total = 0;
    items.forEach(item => {
      // calculating total amount
        total += Number(item.price)
    })
    setTotalAmount(parseInt(total));
  }

  const handleApplyCoupon = () => {
    // calculating discounted amount
    const newDiscountedAmount = totalAmount - (totalAmount / 10);
    setDiscountedAmount(parseInt(newDiscountedAmount));
  }

  const handleCheckout = () => {
    const payload = {
      coupon_code: couponCode,
    }
    axiosApiCall("checkout", "post", payload).then(res => {
      setCheckoutMessage('You order has been placed successfully.');
      const details = {
        amount: discountedAmount ? parseInt(discountedAmount) : parseInt(totalAmount),
        discount: discountedAmount ? parseInt(totalAmount) - parseInt(discountedAmount) : 0,
      };
      // update user details
      axiosApiCall("details", "post", details).then(res => {
        console.log("updated user details");
      }).catch(err => {
        console.error(err, "unable to update order count")
      })

      // updated order count after checkout
      axiosApiCall("order", "post", null).then(res => {
        setTotalOrder(order => order+1)
      }).catch(err => {
        console.error(err, "unable to update order count")
      })

      // clearing cart after checkout
      clearCart()
    }).catch(err => {
      setCheckoutMessage('Coupon code is invalid.')
      console.error(err, "unable to fetch coupon hereeee")
    })
  }

  return (
    <div>
      {totalOrder && <h5>Order Number - {totalOrder + 1}</h5>}
      <div className="coupon-container">
        {
          couponMessge && (
            <p>
              {couponMessge}
            </p>
          )
        }
        {totalOrder && (totalOrder +1)%3 === 0 && items?.length && <button disabled={discountedAmount} onClick={handleApplyCoupon}>Apply Coupon</button>}
        {
          discountedAmount && totalAmount && (
            <div>
              <h3>New order amount with 10% off : <span className="strike-text">{totalAmount}</span> <span>{discountedAmount}</span></h3>
            </div>
          )
        }
        {
          totalAmount && !discountedAmount && (
            <h3>Total order amount - {totalAmount}</h3>
          )
        }
        {
          checkoutMessage ? (
            <p>{checkoutMessage}</p>
          ) : (
            <button onClick={handleCheckout}>
              Checkout
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Checkout