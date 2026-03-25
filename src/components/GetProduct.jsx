import React, { use, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Footer from "./Footer";
const GetProduct = () => {
    // Search bar
    
    // hooks
    const [products, setProducts] = useState([]) //empty array .. to handle the data from the backend
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate() //navigation from one component to another 
    // Image URL
    const images_URL = 'https://carlkiboko.alwaysdata.net/static/images/'
    // Function to get the products
    const getproduct = async () => {
        setLoading("Fetching products please wait...") 
        try {
            // Connect to our backend API
            const response = await axios.get("https://carlkiboko.alwaysdata.net//api/get_product_details")
            console.log(response.data)
            setProducts(response.data) //Updating the products hook with the data from the backend(from the response)
            //    After getting the data reset the loading hook 
            setLoading("")
        } catch (error) {
            setLoading("")
            setError("Something went wrong")

        }
    }
    useEffect(() => {
        getproduct()
    }, []) // empty dependancy to ensure our function runs only once when the component renders/mounts
    return (
        <div className="row">
            <div>
                <Carousel/>
               
            </div>
            <h3 className="display-4 mt-3">Source Products</h3>
            {loading}
            {error}
            {products.map((product) =>(

                <div className="text-center col-md-3 mb-4">
                {/* Card with equal size */}
                <div className="card shadow">
                    <img src={images_URL+product.product_photo} alt="images" className="product_img"/>
                    <div className="card-body">
                        <h5 className="mt-2" >{product.product_name}</h5>
                        <p className="text-muted" >{product.product_description}</p>
                        <b className="text-warning"> {product.product_cost} KES</b>
                        <button className="btn btn-dark mt-2 w-100"
                        onClick={() => navigate('/mpesapayment',{state:{product}})}
                        >Buy Now</button>
                    </div>
                </div> 
            </div>
            ))}
            <div>
                <Footer/>
            </div>

        </div>
    )
}
export default GetProduct;