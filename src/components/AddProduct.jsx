import React, { use, useState } from "react";
import axios from "axios";
const AddProduct = () => {
    const[productname, setProductname] = useState("")
    const[description, setDescription] = useState("")
    const[cost, setCost] = useState("")
    const[photo,setPhoto] = useState("")
    // 
    const[loading,setLoading] = useState("")
    const[error,setError] = useState("")
    const[success,setSuccess] = useState("")
    // Function to handle submit
    const submit = async (e) => {
        e.preventDefault() //Prevents the browser from refreshing 
        // update the loading hook with a message 
        setLoading("Uploading product please wait...")
        // error handling
        try {
           //put updated data from hooks in a data variable and create a form data
            const data = new FormData() 
            data.append('product_name',productname)
            data.append('product_description',description)
            data.append('product_cost',cost)
            data.append('product_photo',photo)
             // Post the data to the backend API with the help of axios
            const response = await axios.post("http://carlkiboko.alwaysdata.net/api/add_product",data)
             // After posting the data to the backend reset the loading hook to be empty
            setLoading("")
            // Update the success hook with message from the backend
            setSuccess(response.data.success)
            // after adding product successfully clear the input fields
            setProductname("")
            setPhoto("")
            setCost("")
            setDescription("")
        } catch (error) {
             //Reset the loading hook to be empty 
            setLoading("") 
            // Capture the error message
            setError(error.message)
            
        }
    }
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow">
                {loading}
                {error}
                {success}
                <h1>Welcome to Add Products</h1>
                <form onSubmit={submit}>
                    <input type="text" className="form-control" placeholder="Enter Product Name"required
                    value={productname}
                    onChange={(e) => setProductname(e.target.value)}
                    /> <br /> <br />
                    {productname}
                    <textarea className="form-control" placeholder="Describe your product"required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea><br /> <br />
                    {description}
                    <input type="number" className="form-control" placeholder="Enter Product Cost"required
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    /> <br /> <br />
                    {cost}
                    <input type="file" className="form-control"required
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    /><br /> <br />
                     <div className="d-flex justify-content-left">
                    <button type="submit" className="btn btn-primary text-center w-2">Upload Product</button> <br />
                </div>
                </form>
               
                <br />
            </div>
        </div>
    )
}
export default AddProduct;