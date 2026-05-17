import React, { useState, useRef, useEffect } from "react";

const Chatbot = ({ products, onClose }) => {
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hey 👋 I’m Carl Automotive Assistant. Ask me about spare parts, engines, brakes, filters, etc."
        }
    ]);

    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const messagesEndRef = useRef(null);

    // AUTO SCROLL
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    // ✅ FIXED INTELLIGENCE ENGINE
    const handleSend = () => {
        if (!input.trim()) return;

        const userText = input;
        const lower = userText.toLowerCase();

        setMessages(prev => [...prev, { sender: "user", text: userText }]);
        setInput("");
        setTyping(true);

        setTimeout(() => {
            let botReply = "";
            let results = [];

            const isGreeting =
                /hi|hello|hey|yo|good morning|good evening|sup/.test(lower);

            const isThanks =
                /thank|thanks|appreciate/.test(lower);

            const isAutomotive =
                /car|engine|brake|oil|filter|gear|wheel|clutch|spark|radiator|battery|suspension|vehicle|tyre|tire|spare/.test(lower);

            const found = products.filter(p =>
                (p.product_name || "").toLowerCase().includes(lower) ||
                (p.product_description || "").toLowerCase().includes(lower)
            );

            // 🟢 GREETING
            if (isGreeting) {
                botReply =
                    "Hey 👋 Welcome to Carl Automotive. What part do you need today?";
            }

            // 🟢 THANK YOU
            else if (isThanks) {
                botReply =
                    "You're welcome 👍 Always here to keep your vehicle running smoothly.";
            }

            // 🟢 PRODUCT MATCH
            else if (found.length > 0) {
                botReply = `I found ${found.length} matching automotive parts 🔧`;
                results = found.slice(0, 4);
            }

            // 🟡 AUTOMOTIVE CONTEXT BUT NO MATCH
            else if (isAutomotive) {
                botReply =
                    "I couldn’t find an exact match, but try: brake pads, engine oil, air filters, spark plugs, or gearbox parts.";
            }

            // 🔴 OFF-TOPIC REDIRECT
            else {
                botReply =
                    "I mainly help with automotive parts 🚗. Ask me about engines, brakes, filters, or car accessories.";
            }

            setTyping(false);

            setMessages(prev => [
                ...prev,
                { sender: "bot", text: botReply, products: results }
            ]);
        }, 700);
    };

    const theme = darkMode
        ? {
              bg: "#121212",
              text: "#fff",
              bot: "#2a2a2a",
              user: "#4da3ff",
              header: "#1e1e1e",
              card: "#222"
          }
        : {
              bg: "#ffffff",
              text: "#000",
              bot: "#f2f2f2",
              user: "#111",
              header: "#f8f8f8",
              card: "#f5f5f5"
          };

    return (
        <div style={{ ...styles.chatBox, background: theme.bg }}>

            {/* HEADER */}
            <div style={{ ...styles.header, background: theme.header }}>
                <span style={{ color: theme.text }}>
                    🚗 Carl Automotive Assistant
                </span>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setDarkMode(!darkMode)} style={styles.iconBtn}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button onClick={() => onClose && onClose()} style={styles.iconBtn}>
                        ✖
                    </button>
                </div>
            </div>

            {/* MESSAGES */}
            <div style={styles.messages}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ margin: "8px" }}>

                        <div style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                            <span
                                style={{
                                    ...styles.bubble,
                                    background:
                                        msg.sender === "user"
                                            ? theme.user
                                            : theme.bot,
                                    color: msg.sender === "user" ? "#fff" : theme.text
                                }}
                            >
                                {msg.text}
                            </span>
                        </div>

                        {/* PRODUCT PREVIEW */}
                        {msg.products?.length > 0 && (
                            <div style={styles.productRow}>
                                {msg.products.map((p, idx) => (
                                    <div key={idx} style={{
                                        ...styles.card,
                                        background: theme.card
                                    }}>
                                        <img
                                            src={
                                                "https://carlkiboko.alwaysdata.net/static/images/" +
                                                p.product_photo
                                            }
                                            style={styles.img}
                                            alt=""
                                        />
                                        <p style={{ margin: "5px 0", fontWeight: "600" }}>
                                            {p.product_name}
                                        </p>
                                        <b>{p.product_cost} KES</b>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {typing && <div style={styles.typing}>typing...</div>}

                <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div style={styles.inputBox}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about car parts..."
                    style={styles.input}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend} style={styles.sendBtn}>
                    ➤
                </button>
            </div>
        </div>
    );
};

const styles = {
    chatBox: {
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "340px",
        height: "460px",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        alignItems: "center"
    },

    iconBtn: {
        background: "transparent",
        border: "none",
        fontSize: "16px",
        cursor: "pointer"
    },

    messages: {
        flex: 1,
        overflowY: "auto",
        padding: "10px"
    },

    bubble: {
        padding: "8px 12px",
        borderRadius: "14px",
        display: "inline-block",
        maxWidth: "80%"
    },

    typing: {
        fontSize: "12px",
        opacity: 0.7,
        padding: "5px"
    },

    inputBox: {
        display: "flex",
        borderTop: "1px solid #ddd"
    },

    input: {
        flex: 1,
        padding: "10px",
        border: "none",
        outline: "none"
    },

    sendBtn: {
        background: "#111",
        color: "#fff",
        border: "none",
        padding: "10px 14px",
        cursor: "pointer"
    },

    productRow: {
        display: "flex",
        gap: "8px",
        marginTop: "8px"
    },

    card: {
        width: "100px",
        padding: "6px",
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "11px"
    },

    img: {
        width: "100%",
        height: "60px",
        objectFit: "cover",
        borderRadius: "6px"
    }
};

export default Chatbot;