import { useState, useRef, useEffect } from 'react';

export default function Chat({ userProfile, playClick, playSuccess }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chips, setChips] = useState(['Surprise me! 🎲', 'Quick 20-min meal', 'High protein dinner', 'Vegetarian ideas', 'Chicken recipe']);
  const msgsRef = useRef(null);
  const historyRef = useRef([]);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      const greeting = `Hi there! 👋 I'm Chef AI, your personal dinner advisor.\n\nI know you're cooking for **${userProfile.servings || 'yourself'}** with **${userProfile.skill || 'some'}** cooking experience.\n\nTell me what you're craving or what ingredients you have, and I'll suggest the perfect healthy dinner! 🍽️`;
      setMessages([{ role: 'ai', text: greeting }]);
    }
  }, [userProfile]);

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [messages, loading]);

  const skillInfo = {
    Beginner: 'Simple techniques only. Give very clear detailed steps. Meals 15–30 minutes.',
    Intermediate: 'Comfortable with most techniques. Meals 20–45 mins.',
    Advanced: 'Familiar with professional techniques. Happy with 45–90 min dishes.',
  };

  const sendMsg = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    playClick();
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    historyRef.current = [...historyRef.current, { role: 'user', content: msg }];
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Chef AI, a warm enthusiastic dinner recipe assistant. Recommend healthy dinner recipes.
User profile: Skill: ${userProfile.skill || 'not set'} — ${skillInfo[userProfile.skill] || ''}. Tools: ${userProfile.tools?.join(', ') || 'standard'}. Dietary: ${userProfile.dietary?.join(', ') || 'none'}. Serving: ${userProfile.servings || 'not set'}.
Always give complete recipes with ingredients and steps. Match complexity to skill level. Use food emojis. End with an encouraging note.`,
          messages: historyRef.current,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || '').join('') || 'Sorry, try again!';
      historyRef.current = [...historyRef.current, { role: 'assistant', content: reply }];
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
      playSuccess();
      setChips(['Tell me more', 'Another recipe', 'What about dessert?', 'How to store leftovers?']);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Oops! Check your connection and try again 😅' }]);
    }
    setLoading(false);
  };

  const fmt = (t) => t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FFFDF9' }}>
      <div style={{ padding: '52px 20px 16px', background: '#fff', borderBottom: '1px solid #F0EBE3', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, background: '#FF6B35', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👨‍🍳</div>
        <div><div style={{ fontWeight: 700, fontSize: 15 }}>Chef AI</div><div style={{ fontSize: 12, color: '#2D6A4F', fontWeight: 500 }}>● Online — ready to cook!</div></div>
      </div>
      <div ref={msgsRef} style={{ flex: 1, padding: '16px 16px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 'calc(100vh - 200px)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ maxWidth: '85%', alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end' }}>
            <div style={{ padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: m.role === 'ai' ? 4 : 16, borderBottomRightRadius: m.role === 'user' ? 4 : 16, fontSize: 14, lineHeight: 1.6, background: m.role === 'ai' ? '#fff' : '#FF6B35', border: m.role === 'ai' ? '1px solid #F0EBE3' : 'none', color: m.role === 'ai' ? '#1A1A1A' : '#fff' }}
              dangerouslySetInnerHTML={{ __html: fmt(m.text) }} />
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start' }}>
            <style>{`@keyframes type{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-5px);opacity:1}}`}</style>
            <div style={{ padding: '12px 16px', background: '#fff', border: '1px solid #F0EBE3', borderRadius: 16, borderBottomLeftRadius: 4, display: 'flex', gap: 5 }}>
              {[0, 0.2, 0.4].map((d, i) => <span key={i} style={{ width: 6, height: 6, background: '#6B7280', borderRadius: '50%', display: 'block', animation: `type 1.2s ${d}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '12px 16px 28px', background: '#fff', borderTop: '1px solid #F0EBE3' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {chips.map(c => <button key={c} onClick={() => sendMsg(c)} style={{ flexShrink: 0, background: '#FFF0EB', color: '#FF6B35', border: 'none', borderRadius: 20, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>{c}</button>)}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }}
            placeholder="Ask me for a recipe..." rows={1}
            style={{ flex: 1, border: '1.5px solid #F0EBE3', borderRadius: 14, padding: '12px 16px', fontFamily: 'DM Sans, sans-serif', fontSize: 14, outline: 'none', resize: 'none', color: '#1A1A1A', background: '#fff' }} />
          <button onClick={() => sendMsg()} style={{ width: 44, height: 44, background: '#FF6B35', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>➤</button>
        </div>
      </div>
    </div>
  );
}
