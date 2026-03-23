import { Link } from "react-router-dom";
import React, { useState } from 'react'
import axios from "axios";
const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    // 
    const [loading, setLoading] = useState("") // a message as we wait for the user to be signed up
    const [success, setSuccess] = useState("") //a message to display that a user has either created the account succesfully 
    const [error, setError] = useState("") // displays an error if a user misses the credentials
    // Function to handle submit
    const submit = async (e) => {
        e.preventDefault() //prevents the browser from refreshing
        // Update the loading hook with a message
        setLoading("Please wait")
        // error handling
        try {
            //put updated data from hooks in a data variable and create a form data
            const data = new FormData()
            data.append('username', username)
            data.append('email', email)
            data.append('password', password)
            data.append('phone', phone)
            // Post the data to the backend API with the help of axios
            const response = await axios.post("http://carlkiboko.alwaysdata.net/api/signup", data)
            // After posting the data to the backend reset the loading hook to be empty
            setLoading("")
            // Update the success hook with message from the backend
            setSuccess(response.data.success)
            // after signing up successfully clear the input fields
            setUsername("")
            setEmail("")
            setPassword("")
            setPhone("")
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
                {success && (
                    <div className="alert alert-success text-center p-4">
                        <h4>🎉 {success}</h4>
                        <p>Your account has been created successfully.</p>

                        <Link to="/signin" className="btn btn-success mt-2">
                            Go to Sign In
                        </Link>
                    </div>
                )}
                {error}
                <h2 className="text-center">Sign Up page</h2>
                <form onSubmit={submit}>
                    <input type="text" placeholder="Your Name" className="form-control" required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br />
                    {username}
                    <input type="email" placeholder="Enter Email" className="form-control" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    {email}
                    <input type="password" placeholder="Enter Password" className="form-control" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    {password}
                    <input type="text" placeholder="Enter Phone" className="form-control" required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    /><br />
                    {phone}
                    <div className="d-flex justify-content-center">
                        <button type="submit" className=" signup-card btn btn-primary text-center">Sign Up</button>
                    </div>
                </form>
                <p className="text-center">Already have an account?</p>
                <Link to="/signin" className="text-center">Sign In</Link>
            </div>
        </div>
    )
}
export default SignUp;