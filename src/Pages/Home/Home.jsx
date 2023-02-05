import React, { useEffect, useState } from 'react'
import axiosApiCall from '../../Assets/axiosApiCall';
import {items} from "../../Assets/Items"
import './Home.css';

const Home = () => {
  const [userDetails, setUserDetails] = useState(null)
  const handleAddToCart = item => {
    const {item_id, price, name, image} = item;
    const itemData = {
      name, price, item_id, image: image[0]
    }
    axiosApiCall(`cart/${item_id}`, "post", itemData).then(res => {
      console.log("data added successfully", itemData);
    }).catch(err => {
      console.error(err, "unable to add data")
    })
  };

  useEffect(() => {
    // get user details
    axiosApiCall("details", "get", null).then(res => {
      const {details} = res.data;
      setUserDetails(details[0]);
    }).catch(err => {
      console.error(err, "unable to fetch order count")
    })
  }, [])

  return (
    <>
      <div>
        {
          userDetails && (
            <div className="details-container">
              <div>Total amount spent - {userDetails.total_amount}</div>
              <div>Total orders - {userDetails.total_orders}</div>
              <div>Total coupons used - {userDetails.coupon_codes.length}</div>
              <div>Total discount - {userDetails.total_discount}</div>
            </div>
          )
        }  
      </div>
      <div className="product-container">
        {
          items.map(item => (
            <div className='product' key={item.id}>
              <h3>
                {item.name}
              </h3>
              <img className='product-img' src={item.image} alt="itemImage" />
              <p>INR {item.price}</p>
              <button onClick={() => handleAddToCart(item)}>
                Add To Cart
              </button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Home