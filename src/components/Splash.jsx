export default function Splash({ onStart, onSkip }) {
  return (
    <div className="screen" style={{ background: '#FFFDF9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
      <div style={{ width: 100, height: 100, background: '#FF6B35', borderRadius: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 48, animation: 'bounce 2s infinite' }}>🍳</div>
      <h1 style={{ fontSize: 36, color: '#1A1A1A', lineHeight: 1.1, marginBottom: 10 }}>Dinner<br /><span style={{ color: '#FF6B35' }}>Chef AI</span></h1>
      <p style={{ color: '#6B7280', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>Your personal dinner companion. Discover healthy, delicious recipes tailored just for you.</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
        {['🥗 Healthy', '👨‍🍳 Personalized', '⚡ Quick & Easy'].map(tag => (
          <div key={tag} style={{ background: '#FFF0EB', color: '#FF6B35', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 20 }}>{tag}</div>
        ))}
      </div>
      <button className="btn-primary" onClick={onStart}>Get Started 🍽️</button>
      <button className="btn-secondary" onClick={onSkip}>I've done this before</button>
    </div>
  );
}
