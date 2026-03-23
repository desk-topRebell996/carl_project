import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    // 
    const [loading, setLoading] = useState("")// a message as a user waits to be signed in
    const [error, setError] = useState("") //display an error if the user misses the credentials
    // Function to handle submit
    const submit = async (e) => {
        e.preventDefault() //Prevents the browser from refreshing
        // Update the loading hook with a message
        setLoading("Please wait as we log you in")
        // error handling
        try {
            // put updated data from hooks in data 
            const data = new FormData()
            data.append('username', username)
            data.append('password', password)
            // Post the data to the backend API with the help of axios
            const response = await axios.post("https://malombeswala.alwaysdata.net/api/signin", data)
            // Console.log the response  and observe in the browser
            console.log(response)
            // After posting the data to the backend reset the loading hook to be empty
            setLoading("")
            // Check if the response has a user
            if (response.data.user) {
                // if user is found save the details in local storage
                localStorage.setItem("user", JSON.stringify(response.data.user))
                // Redirect to home page
                navigate("/")
            } else {
                // If not found show an error
                setError(response.data.message)
            }
        } catch (error) {
            // Reset the loading hook to be empty 
            setLoading("")
            // Capture the error message
            setError(error.data.message)
        }
    }
    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow">
                {loading}
                {error}

                <h1 className="signin_prod text-center">Sign In </h1> <br /> <br />
                <form onSubmit={submit}>
                    <input type="text" placeholder="Username" className="form-control" required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /> <br /><br />
                    {username}
                    <input type="password" placeholder="Password" className="form-control" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> <br /> <br />
                    {password}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="signin-card btn btn-primary text-center w-100">Sign In</button>
                    </div>
                </form><br />
                <p className="text-center">Don't have an account?</p>
                <Link to="/signup" className="text-center">Sign Up</Link>
            </div>
        </div>
    )
}
export default SignIn;