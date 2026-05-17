import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const storedUser = JSON.parse(
                localStorage.getItem("user")
            );
            setUser(storedUser);
        };

        loadUser();

        window.addEventListener("storage", loadUser);
        window.addEventListener("userUpdated", loadUser);

        return () => {
            window.removeEventListener("storage", loadUser);
            window.removeEventListener("userUpdated", loadUser);
        };
    }, []);

    if (!user) {
        return (
            <h3 className="text-center mt-5">
                Not logged in
            </h3>
        );
    }

    return (
        <div
            style={styles.wrapper}
            className="d-flex justify-content-center align-items-center"
        >
            <div style={styles.card}>

                {/* AVATAR */}
                <div style={styles.avatarWrapper}>
                    <img
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=0f172a&color=fff&size=128`}
                        alt="profile"
                        style={styles.avatar}
                    />
                </div>

                {/* USERNAME */}
                <h2 style={styles.name}>
                    {user.username}
                </h2>

                {/* EMAIL */}
                <div style={styles.infoBox}>
                    <p style={styles.label}>Email</p>
                    <p style={styles.value}>{user.email}</p>
                </div>

                {/* PHONE */}
                <div style={styles.infoBox}>
                    <p style={styles.label}>Phone</p>
                    <p style={styles.value}>{user.phone}</p>
                </div>

                {/* BADGE */}
                <div style={styles.badge}>
                    Logged in as {user.username}
                </div>

            </div>
        </div>
    );
};

/* STYLES */
const styles = {
    wrapper: {
        minHeight: "80vh",
        background:
            "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "20px",
    },

    card: {
        width: "360px",
        padding: "25px",
        borderRadius: "22px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        textAlign: "center",
        color: "#fff",
    },

    avatarWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "15px",
    },

    avatar: {
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid rgba(255,255,255,0.3)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    },

    name: {
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "20px",
    },

    infoBox: {
        background: "rgba(255,255,255,0.06)",
        padding: "10px",
        borderRadius: "12px",
        marginBottom: "10px",
        textAlign: "left",
    },

    label: {
        fontSize: "12px",
        color: "#94a3b8",
        marginBottom: "3px",
    },

    value: {
        fontSize: "15px",
        fontWeight: "500",
        color: "#f8fafc",
        margin: 0,
    },

    badge: {
        marginTop: "15px",
        padding: "8px",
        borderRadius: "12px",
        background:
            "linear-gradient(135deg,#22c55e,#16a34a)",
        color: "#fff",
        fontSize: "13px",
        fontWeight: "600",
    },
};

export default Profile;