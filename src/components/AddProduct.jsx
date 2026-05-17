import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ darkMode }) => {
    const [productname, setProductname] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [photo, setPhoto] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const theme = darkMode
        ? {
              bg: "#0b1220",
              card: "rgba(255,255,255,0.06)",
              text: "#f8fafc",
              border: "rgba(255,255,255,0.12)",
              input: "rgba(255,255,255,0.08)"
          }
        : {
              bg: "#f4f6fb",
              card: "rgba(255,255,255,0.75)",
              text: "#0f172a",
              border: "rgba(0,0,0,0.08)",
              input: "rgba(255,255,255,0.9)"
          };

    const submit = async (e) => {
        e.preventDefault();

        setLoading("Uploading product please wait...");
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("product_name", productname);
            data.append("product_description", description);
            data.append("product_cost", cost);
            data.append("product_photo", photo);

            const response = await axios.post(
                "http://carlkiboko.alwaysdata.net/api/add_product",
                data
            );

            setLoading("");
            setSuccess(response.data.success);

            setProductname("");
            setDescription("");
            setCost("");
            setPhoto("");
        } catch (err) {
            setLoading("");
            setError("Failed to upload product.");
        }
    };

    return (
        <div
            style={{
                background: theme.bg,
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div
                style={{
                    background: theme.card,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                    backdropFilter: "blur(20px)",
                    padding: "25px",
                    borderRadius: "22px",
                    width: "400px"
                }}
            >
                <h2 className="text-center mb-3">Add Product</h2>

                {loading && <p className="text-info text-center">{loading}</p>}
                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}

                <form onSubmit={submit}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={productname}
                        onChange={(e) => setProductname(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "12px",
                            border: `1px solid ${theme.border}`,
                            background: theme.input,
                            color: theme.text
                        }}
                    />

                    <textarea
                        placeholder="Product Description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "12px",
                            border: `1px solid ${theme.border}`,
                            background: theme.input,
                            color: theme.text
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Product Cost"
                        required
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "12px",
                            border: `1px solid ${theme.border}`,
                            background: theme.input,
                            color: theme.text
                        }}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setPhoto(e.target.files[0])}
                        style={{ marginBottom: "10px", color: theme.text }}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "14px",
                            border: "none",
                            background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                            color: "#fff",
                            cursor: "pointer"
                        }}
                    >
                        Upload Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;