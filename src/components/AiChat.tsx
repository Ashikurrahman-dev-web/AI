"use client";

import { useState, useEffect, useRef } from "react";

const CONTEXT = `You are the AI assistant embedded in pdf-store website.
About website:
- High-quality PDF Shop`;

const QUICK_PROMPTS = [
  "What are your products?",
  "Tell me about your goal",
  "Available for sell?",
  "How to contact you?",
];

const AIChat = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (role: string, text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  useEffect(() => {
    // Greeting
    const timer = setTimeout(() => {
      addMessage("ai", "Hi! 👋 I'm pdf-store's AI assistant. Ask me about his products, product's quality, or how to buy this product!");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const sendMsg = async (text: string) => {
    if (!text.trim() || isTyping) return;

    setInput("");
    setIsTyping(true);
    addMessage("user", text);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate thinking
      
      let reply = "";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("products")) {
reply = "This website is highly working in selling to high-quality PDF.";
      } else if (lowerText.includes("goal")) {
reply = "It was successfully sell over 30 products, It focuses on pushing the boundaries of what's possible on the E-commerce.";
      }

      setIsTyping(false);
      addMessage("ai", reply);
      
    } catch (error) {
      setIsTyping(false);
      addMessage("ai", "Oops! I encountered a connection issue. Feel free to email pdf-store at pdfstore.6969.@gmail.com 📧");
    }
  };

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-[120px]" id="ai-chat">
      <div className="text-center mb-16">
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">
          AI ASSISTANT
        </span>
        <h2 className="text-h2 text-on-background mt-3">
          Chat With My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            AI
          </span>
        </h2>
        <p className="text-on-surface-variant mt-4 text-lg">
          Ask anything about my products.
        </p>
      </div>

      <div className="max-w-[760px] mx-auto">
        <div className="ai-gradient-border">
          <div className="ai-chat-inner">
            <div
              className="flex items-center gap-3 px-6 py-4 border-b border-white/5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,var(--color-primary),var(--color-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  flexShrink: 0,
                }}
              >
                🤖
              </div>
              <div>
                <p className="text-sm font-bold text-white font-heading">
                  pdf-store&apos;s AI Assistant
                </p>
                <p className="text-xs text-purple-400">
                  <span className="ai-status-dot"></span>Online — ready to chat
                </p>
              </div>
            </div>

            <div className="ai-messages-area" ref={containerRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`msg ${msg.role}`}>
                  <div className="msg-avatar">
                    {msg.role === "ai" ? "🤖" : "👤"}
                  </div>
                  <div className="msg-bubble">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="msg ai">
                  <div className="msg-avatar">🤖</div>
                  <div className="msg-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {QUICK_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  className="quick-btn"
                  onClick={() => sendMsg(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="flex gap-3 items-center px-5 py-4 border-t border-white/5">
              <input
                className="ai-input"
                type="text"
                placeholder="Ask me anything about This Website..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg(input)}
                disabled={isTyping}
              />
              <button
                className="ai-send-btn"
                onClick={() => sendMsg(input)}
                disabled={isTyping}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-purple-500">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;