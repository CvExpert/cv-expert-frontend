import { useState } from "react";

interface Message {
    user: string;
    bot: string;
  }
  
  export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    
    const handleSend = () => {
      if (input.trim() !== "") {
        setMessages((prev) => [...prev, { user: input, bot: "Hello! This is a sample AI response." }]);
        setInput("");
      }
    };
  
    return (
        <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg shadow-md flex flex-col">
        <div className="flex flex-col gap-3 overflow-y-auto max-h-96 p-2">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="p-2 bg-blue-200 text-blue-900 rounded-lg self-end max-w-[75%]">
                <strong>You:</strong> {msg.user}
              </div>
              <div className="p-2 bg-gray-200 text-gray-900 rounded-lg max-w-[75%]">
                <strong>AI:</strong> {msg.bot}
              </div>
            </div>
          ))}
        </div>
  
        <div className="flex w-full items-center gap-2 mt-3">
          <input
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
  