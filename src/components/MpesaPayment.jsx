import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const MpesaPayment = () =>{
    // receive the product sent from get products
    const {product} = useLocation().state || {}
    // hook
    const [phone,setPhoneNumber] = useState("")
    const [message,setMessage] = useState("")
    // Image URL
    const img_url = "https://carlkiboko.alwaysdata.net/static/images/"
    // Create a function to handle form submission
    const submit = async(e) =>{
        e.preventDefault()
        try {
            // Create a form data object
            const data = new FormData()
            data.append('phone',phone) // phone number is from our state variable
            data.append('amount',product.product_cost)// the cost of the product is coming from the received object
            // Post data to the backend API
            const response = await axios.post('http://carlkiboko.alwaysdata.net/api/mpesa_payment')
        } catch (error) {
         setMessage("Something went wrong please try again later")   
        }
    }
    return(
        <div className="row justify-content-center">
            <div className="col-md-6 card shadow mt-5" >
            <h5 class="text-center text-success">LIPA NA M-PESA</h5>
            <img src={img_url+product.product_photo} alt="product" className="product_img" />
            <div className="card-body" >
                <p className="mb-1"><strong>Product:</strong>{product.product_name}</p>
                <p className="mb-2"><strong>Price:</strong>KES {product.product_cost}</p><br />
                <form onSubmit={submit}>

                <input type="tel" placeholder="Enter Phone Number, 254" className="form-control mb-2" required
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                /><br />
                {phone}
                <button type="submit" className="btn btn-success w-100">Pay Now</button><br />
                </form>
                <p className="text-center mt-2">{message}</p>
            </div>
            </div>

        </div>
    )
}
export default MpesaPayment;