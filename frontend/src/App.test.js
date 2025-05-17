import React, { useState, useRef, useEffect } from 'react';
import { Home, Search, Layers, Library, Send, Mic, Globe, MessageSquare, PlusCircle, Download, HelpCircle, Sun } from 'lucide-react';
import './App.css';


function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPro, setIsPro] = useState(true);
  const inputRef = useRef(null);
 
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!message.trim()) return;
   
    // Add user message to chat
    const userMessage = { text: message, isUser: true, id: Date.now() };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
   
    try {
      // Simulate API call
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          text: "This is a simulated response from LunaCare chatbot. In a real implementation, this would come from your API endpoint.",
          isUser: false,
          id: Date.now() + 1
        }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting right now. Please try again.",
        isUser: false,
        id: Date.now() + 1
      }]);
      setIsLoading(false);
    }
  };


  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="w-64 h-full bg-[#121212] border-r border-[#2a2a2a] flex flex-col">
        {/* Logo */}
        <div className="p-5 flex items-center gap-2">
          <div className="text-cyan-400">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0L23.8 10.5L36 12.2L27 20.4L29.6 33.8L18 27.5L6.4 33.8L9 20.4L0 12.2L12.2 10.5L18 0Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="font-normal text-xl text-white">LunaCare</span>
        </div>


        {/* New Thread Button */}
        <div className="px-5 mb-6">
          <button className="w-full flex items-center gap-2 rounded-full bg-[#1e1e1e] hover:bg-[#2a2a2a] py-2 px-4 border border-[#333]">
            <PlusCircle size={18} />
            <span>New Thread</span>
            <span className="ml-auto text-xs text-gray-400">Ctrl + P</span>
          </button>
        </div>


        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#1e1e1e]">
                <Home size={20} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#1e1e1e]">
                <Search size={20} />
                <span>Discover</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#1e1e1e]">
                <Layers size={20} />
                <span>Spaces</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[#1e1e1e]">
                <Library size={20} />
                <span>Library</span>
              </a>
            </li>
          </ul>
        </nav>


        {/* User Profile */}
        <div className="p-5 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <span>L</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-medium truncate">LunaCare User</div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <span className="bg-cyan-800 text-cyan-400 px-1 rounded text-xs">pro</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Empty/Welcome State */}
        {chatHistory.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl font-light mb-20">What do you want to know?</h1>
           
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything..."
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-xl p-4 pl-4 pr-12 text-white focus:outline-none focus:border-[#444]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                  <button className="text-gray-400 hover:text-white">
                    <Globe size={20} />
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full text-white">
                    <Mic size={18} />
                  </button>
                </div>
              </div>
             
              <div className="mt-3 flex gap-2">
                <div className="flex items-center gap-2 bg-[#1e1e1e] border border-[#333] rounded-full py-1 px-3">
                  <span className="bg-cyan-800 text-cyan-400 px-1 rounded text-xs">pro</span>
                  <span>Deep Research</span>
                </div>
              </div>
            </div>
           
            {/* Info Cards */}
            <div className="w-full max-w-2xl mt-20 grid grid-cols-2 gap-4">
              <div className="bg-[#1e1e1e] border border-[#333] rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <Sun className="mb-2" />
                    <div>34°C</div>
                    <div className="text-sm text-gray-400">Partly cloudy</div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>H: 37° L: 26°</div>
                    <div>Your City</div>
                  </div>
                </div>
              </div>
             
              <div className="bg-[#1e1e1e] border border-[#333] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Women's Health Update</div>
                    <div className="text-xs text-gray-400">Latest Research</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
       
        {/* Chat history and input if there are messages */}
        {chatHistory.length > 0 && (
          <>
            <div className="flex-1 overflow-auto p-6">
              {chatHistory.map((msg) => (
                <div key={msg.id} className="mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {msg.isUser ? (
                        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                          <span>L</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-cyan-800 rounded-full flex items-center justify-center">
                          <span>LC</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium mb-1">
                        {msg.isUser ? 'You' : 'LunaCare'}
                      </div>
                      <div className="text-gray-200 leading-relaxed">{msg.text}</div>
                    </div>
                  </div>
                </div>
              ))}
             
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              )}
            </div>
           
            <div className="p-4 border-t border-[#2a2a2a]">
              <div className="relative max-w-3xl mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask follow-up..."
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-full py-3 px-4 pr-12 text-white focus:outline-none focus:border-[#444]"
                />
                <button
                  onClick={handleSendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}


        {/* Footer */}
        <div className="py-4 px-6 text-center text-sm text-gray-500 border-t border-[#2a2a2a] mt-auto">
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-gray-300">LunaCare Pro</a>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Blog</a>
            <a href="#" className="hover:text-gray-300">Careers</a>
            <a href="#" className="hover:text-gray-300">Support</a>
          </div>
        </div>
      </div>
     
      {/* Help Button */}
      <div className="absolute bottom-6 right-6">
        <button className="w-10 h-10 bg-[#222] border border-[#333] rounded-full flex items-center justify-center hover:bg-[#333]">
          <HelpCircle size={20} />
        </button>
      </div>
    </div>
  );
}


export default App;
