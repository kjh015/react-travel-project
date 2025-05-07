import React, { useState, useEffect } from 'react'

function SseSubscriber() {
    const [messages, setMessages] = useState([]);
    const [test, setTest] = useState("not connect");
    const [test2, settest2] = useState("not send");

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8082/sse/subscribe");
        eventSource.onopen = () => {
            setTest("connected!!");
        };
        eventSource.addEventListener("kafka-message", (event) => {            
            settest2("sended!");
            setMessages((prev) => [...prev, event.data]);
        });

        eventSource.onerror = (err) => {
            console.error("SSE error:", err);
            eventSource.close();
        };

        return () => {
        eventSource.close();
        };
    }, []);

    return (
        <div>
        <h2>Kafka Messages</h2>
        {messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>            
        ))}
        <p>{test}</p>
        <p>{test2}</p>
        </div>
    );
}

export default SseSubscriber
