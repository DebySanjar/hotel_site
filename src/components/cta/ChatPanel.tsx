import { useState, useRef, useEffect } from 'react';
import MIcon from './MIcon';
import FadeUp from './FadeUp';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const SEED_MESSAGES: Message[] = [
  { role: 'assistant', text: "Welcome to the Vibe Design course! I'll guide you through building stunning websites with AI. What would you like to learn first?" },
  { role: 'user', text: "I want to learn how to build a hero section with a cinematic video background using AI." },
  { role: 'assistant', text: "Great choice! In this course, you'll learn how to create full-screen looping videos, liquid glass nav bars, email signups, and manifesto buttons — all with AI assistance. Let's dive in!" },
];

const CANNED_REPLIES = [
  "Great question! Let me walk you through that step by step.",
  "That's a popular topic in our community. Here's what I recommend...",
  "Perfect! This is covered in Module 3 of the course.",
];

interface ChatPanelProps {
  initialScroll?: 'top' | 'bottom';
  animateMessagesIn?: boolean;
}

export default function ChatPanel({ initialScroll = 'bottom', animateMessagesIn = false }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyIndex = useRef(0);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (initialScroll === 'bottom') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [initialScroll]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input.trim() };
    const reply: Message = { role: 'assistant', text: CANNED_REPLIES[replyIndex.current % CANNED_REPLIES.length] };
    replyIndex.current++;
    setMessages(prev => [...prev, userMsg, reply]);
    setInput('');
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: 'rgba(8,8,10,0.6)', backdropFilter: 'blur(24px)' }}>

      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/10">
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0">
          <MIcon name="auto_awesome" size={14} className="text-white/60" />
        </div>
        <div>
          <p className="text-sm font-medium text-white leading-tight">Vibe Design course</p>
          <p className="text-[11px] text-white/40">Learn how to build website with AI</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-4 py-5 space-y-4 min-h-0">
        {messages.map((msg, i) =>
          animateMessagesIn ? (
            <FadeUp key={i} delay={i * 0.12} y={16}>
              <MessageBubble msg={msg} />
            </FadeUp>
          ) : (
            <MessageBubble key={i} msg={msg} />
          )
        )}
      </div>

      {/* Input */}
      <div className="px-3 pb-3">
        <div className="liquid-glass rounded-2xl flex items-end gap-2 px-3 py-2">
          <textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the course..."
            className="flex-1 bg-transparent outline-none text-white/80 placeholder-white/30 text-sm resize-none leading-relaxed"
            style={{ maxHeight: 80 }}
          />
          <button
            onClick={send}
            className="bg-white text-black rounded-xl p-2 shrink-0 hover:bg-white/90 transition-colors"
          >
            <MIcon name="arrow_upward" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
        ${msg.role === 'user'
          ? 'bg-white/15 text-white/90'
          : 'bg-white/5 text-white/70 border border-white/5'
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
