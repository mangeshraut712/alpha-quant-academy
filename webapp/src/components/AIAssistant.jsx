import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    MessageCircle, X, Send, Bot, User, Sparkles,
    BookOpen, Code, HelpCircle, Lightbulb
} from 'lucide-react';
import { cn } from '../lib/utils';

// AI Learning Assistant Chatbot
const AIAssistant = memo(function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "👋 Hi! I'm your AI learning assistant. I can help you with:\n\n• Questions about Python & Finance\n• Curriculum recommendations\n• Code explanations\n• Career guidance\n\nWhat would you like to learn today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Quick prompts
    const quickPrompts = [
        { icon: BookOpen, text: "What should I learn first?" },
        { icon: Code, text: "Explain pandas DataFrames" },
        { icon: HelpCircle, text: "How to get a quant job?" },
        { icon: Lightbulb, text: "Best Python practices" },
    ];

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response (in production, this would call an API)
        setTimeout(() => {
            let response = "";

            if (text.toLowerCase().includes('first') || text.toLowerCase().includes('start')) {
                response = "**Great question!** I recommend starting with:\n\n1. **Track 1: Python Fundamentals** - Build a solid foundation\n2. **Track 2: Data Analysis** - Master NumPy & Pandas\n\nThese will give you 80% of what you need for finance work. Start with the Python Basics module - it's only 2 hours! 🚀";
            } else if (text.toLowerCase().includes('pandas') || text.toLowerCase().includes('dataframe')) {
                response = "**DataFrames** are like Excel spreadsheets in Python!\n\n```python\nimport pandas as pd\n\n# Create a DataFrame\ndf = pd.DataFrame({\n    'Stock': ['AAPL', 'GOOGL'],\n    'Price': [150.25, 125.50]\n})\n\n# Access data\ndf['Price'].mean()  # Calculate average\n```\n\nCheck out **Track 2: Pandas Mastery** for hands-on practice!";
            } else if (text.toLowerCase().includes('quant') || text.toLowerCase().includes('job') || text.toLowerCase().includes('career')) {
                response = "**Quant Career Path:**\n\n1. 📚 Master Python + Statistics\n2. 📊 Learn financial modeling (our Track 4)\n3. 🤖 Build ML trading strategies (Track 5)\n4. 💼 Create portfolio projects (our 3 projects!)\n5. 🎯 Practice coding interviews\n\nOur AI Stock Analyst project is *perfect* for your portfolio - it shows multi-model architecture skills!";
            } else if (text.toLowerCase().includes('practice') || text.toLowerCase().includes('best')) {
                response = "**Python Best Practices:**\n\n✅ Use virtual environments\n✅ Write docstrings for functions\n✅ Follow PEP 8 style guide\n✅ Use type hints (Python 3.10+)\n✅ Test with pytest\n✅ Version control with Git\n\nOur **Best Practices module** covers all of this in detail!";
            } else {
                response = "That's a great topic to explore! Here are some resources in our curriculum that might help:\n\n• **Curriculum** - 26+ modules covering everything\n• **Projects** - Hands-on practice\n• **AI Analyst** - Advanced multi-model architecture\n\nFeel free to ask me specific questions about Python, finance, or career advice! 🎓";
            }

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all",
                    isOpen && "hidden"
                )}
            >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2.5 h-2.5" />
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[32rem] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold">AI Learning Assistant</div>
                                <div className="text-xs opacity-80 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    Online
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn("flex gap-3", msg.role === 'user' && "flex-row-reverse")}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    msg.role === 'assistant' ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                                )}>
                                    {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                </div>
                                <div className={cn(
                                    "max-w-[80%] p-3 rounded-2xl text-sm",
                                    msg.role === 'assistant'
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-sm"
                                        : "bg-blue-600 text-white rounded-tr-sm"
                                )}>
                                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                                        __html: msg.content
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-2 rounded mt-2 text-xs overflow-x-auto"><code>$2</code></pre>')
                                    }} />
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-violet-600" />
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-sm">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Prompts */}
                    {messages.length <= 2 && (
                        <div className="px-4 pb-2 flex gap-2 flex-wrap">
                            {quickPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(prompt.text)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <prompt.icon className="w-3 h-3" />
                                    {prompt.text}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
});

export default AIAssistant;
