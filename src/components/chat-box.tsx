import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMessageSquare } from 'react-icons/fi';

interface Message {
  user: string;
  bot: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages((prev) => [
        ...prev,
        { user: input, bot: 'Hello! This is a sample AI response.' },
      ]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200">
            <FiMessageSquare size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">AI Assistant</h2>
            <p className="text-xs text-gray-600 dark:text-gray-300">Ask me anything about your resume</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <FiMessageSquare className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">How can I help you today?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md">
              Ask me anything about improving your resume, job search tips, or interview preparation.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="space-y-3">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[85%] lg:max-w-[90%] bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-2xl rounded-tr-none px-4 py-2 shadow-sm">
                  <p className="text-sm">{msg.user}</p>
                </div>
              </div>
              
              {/* Bot message */}
              <div className="flex justify-start">
                <div className="max-w-[85%] lg:max-w-[90%] bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-600">
                  <p className="text-sm">{msg.bot}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full pl-4 pr-12 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-500 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400 text-sm"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  handleSend();
                }
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
                input.trim()
                  ? 'bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500'
                  : 'text-gray-300 dark:text-gray-500 cursor-not-allowed'
              } transition-colors duration-200`}
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          AI responses may be inaccurate. Verify important information.
        </p>
      </div>
    </div>
  );
}
