import { useState } from 'react';
import Splash from './components/Splash';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Chat from './components/Chat';
import RecipeDetail from './components/RecipeDetail';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState({ skill: '', tools: [], dietary: [], servings: '' });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const playClick = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.15, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      o.start(); o.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  const playSuccess = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [523, 659, 784].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = f;
        g.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.15);
        o.start(ctx.currentTime + i * 0.1);
        o.stop(ctx.currentTime + i * 0.1 + 0.15);
      });
    } catch (e) {}
  };

  const openRecipe = (recipe) => {
    playClick();
    setSelectedRecipe(recipe);
    setScreen('detail');
  };

  const goHome = () => {
    playClick();
    setScreen('main');
    setActiveTab('home');
  };

  const switchTab = (tab) => {
    playClick();
    setActiveTab(tab);
  };

  const BottomNav = () => (
    <nav className="bottom-nav">
      <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => switchTab('home')}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Home</span>
      </button>
      <button className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => switchTab('chat')}>
        <span className="nav-icon">🤖</span>
        <span className="nav-label">Chef AI</span>
      </button>
      <button className={`nav-btn ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => switchTab('saved')}>
        <span className="nav-icon">❤️</span>
        <span className="nav-label">Saved</span>
      </button>
      <button className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => switchTab('profile')}>
        <span className="nav-icon">👤</span>
        <span className="nav-label">Profile</span>
      </button>
    </nav>
  );

  if (screen === 'splash') {
    return <Splash onStart={() => { playClick(); setScreen('onboarding'); }} onSkip={() => { playClick(); setScreen('main'); }} />;
  }
  if (screen === 'onboarding') {
    return <Onboarding onComplete={(profile) => { playSuccess(); setUserProfile(profile); setScreen('main'); }} playClick={playClick} />;
  }
  if (screen === 'detail') {
    return <RecipeDetail recipe={selectedRecipe} onBack={goHome} />;
  }

  return (
    <div className="screen">
      {activeTab === 'home' && <Home onOpenRecipe={openRecipe} playClick={playClick} userProfile={userProfile} />}
      {activeTab === 'chat' && <Chat userProfile={userProfile} playClick={playClick} playSuccess={playSuccess} />}
      {activeTab === 'saved' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#6B7280', padding: 40 }}>
          <span style={{ fontSize: 60 }}>❤️</span>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1A1A1A' }}>No saved recipes yet</p>
          <p style={{ fontSize: 14, textAlign: 'center' }}>Tap the heart on any recipe to save it here.</p>
        </div>
      )}
      {activeTab === 'profile' && (
        <div style={{ flex: 1, padding: '56px 24px 100px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, marginBottom: 24 }}>Your Profile</h2>
          {[
            { label: 'Cooking Skill', value: userProfile.skill || 'Not set' },
            { label: 'Cooking For', value: userProfile.servings || 'Not set' },
            { label: 'Kitchen Tools', value: userProfile.tools?.join(', ') || 'Not set' },
            { label: 'Dietary Needs', value: userProfile.dietary?.join(', ') || 'Not set' },
          ].map((item) => (
            <div key={item.label} style={{ background: '#FFFDF9', borderRadius: 14, padding: '14px 16px', marginBottom: 10, border: '1.5px solid #F0EBE3' }}>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
          <button className="btn-secondary" style={{ marginTop: 20 }} onClick={() => setScreen('onboarding')}>Update Preferences</button>
        </div>
      )}
      <BottomNav />
    </div>
  );
      }
