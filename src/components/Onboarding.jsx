import { useState } from 'react';

const steps = [
  { title: "What's your cooking level?", sub: "We'll tailor recipes to match your skills.", type: 'single', key: 'skill',
    options: [
      { icon: '🌱', label: 'Beginner', desc: 'I can boil water and make simple meals. New to cooking!' },
      { icon: '🍳', label: 'Intermediate', desc: 'I follow recipes and am comfortable with most techniques.' },
      { icon: '👨‍🍳', label: 'Advanced', desc: 'I improvise, know flavour pairings, and love a challenge.' },
    ]},
  { title: 'What tools do you have?', sub: "We'll only suggest recipes you can actually make.", type: 'multi', key: 'tools',
    options: ['Oven','Stovetop','Air fryer','Instant Pot','Blender','Microwave','Grill','Wok'] },
  { title: 'Any dietary needs?', sub: "Let us know and we'll filter your recommendations.", type: 'multi', key: 'dietary',
    options: ['No restrictions','Vegetarian','Vegan','Gluten-free','Dairy-free','Low carb','Halal','Keto'] },
  { title: 'Typical servings?', sub: 'How many people do you usually cook for?', type: 'single', key: 'servings',
    options: [
      { icon: '👤', label: 'Just me (1)', desc: 'Quick, single-portion meals with minimal waste.' },
      { icon: '👫', label: '2 people', desc: 'Couples or roommates — balanced portions.' },
      { icon: '👨‍👩‍👧', label: 'Family (3–4)', desc: 'Family-sized servings, great for batch cooking.' },
      { icon: '🎉', label: 'Crowd (5+)', desc: 'Big batches for gatherings and meal prepping.' },
    ]},
];

export default function Onboarding({ onComplete, playClick }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ skill: '', tools: [], dietary: [], servings: '' });
  const s = steps[step];

  const selectSingle = (val) => { playClick(); setProfile(p => ({ ...p, [s.key]: val })); };
  const toggleMulti = (val) => {
    playClick();
    setProfile(p => { const arr = p[s.key] || []; return { ...p, [s.key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] }; });
  };
  const next = () => { playClick(); if (step < steps.length - 1) setStep(step + 1); else onComplete(profile); };

  return (
    <div className="screen" style={{ background: '#fff' }}>
      <div style={{ padding: '56px 24px 24px', background: 'linear-gradient(135deg,#FFF8F5 0%,#fff 100%)' }}>
        <div style={{ height: 4, background: '#F0EBE3', borderRadius: 2, marginBottom: 32 }}>
          <div style={{ height: 4, background: '#FF6B35', borderRadius: 2, width: `${((step + 1) / steps.length) * 100}%`, transition: 'width 0.4s ease' }} />
        </div>
        <h2 style={{ fontSize: 26, marginBottom: 8 }}>{s.title}</h2>
        <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.6 }}>{s.sub}</p>
      </div>
      <div style={{ padding: '20px 24px', flex: 1 }}>
        {s.type === 'single' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {s.options.map(opt => {
              const sel = profile[s.key] === opt.label;
              return (
                <div key={opt.label} onClick={() => selectSingle(opt.label)}
                  style={{ background: sel ? '#FFF0EB' : '#fff', border: `1.5px solid ${sel ? '#FF6B35' : '#F0EBE3'}`, borderRadius: 14, padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, background: sel ? '#FF6B35' : '#F0EBE3', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{opt.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2, lineHeight: 1.4 }}>{opt.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {s.options.map(opt => {
              const sel = (profile[s.key] || []).includes(opt);
              return (
                <div key={opt} onClick={() => toggleMulti(opt)}
                  style={{ background: sel ? '#FFF0EB' : '#fff', border: `1.5px solid ${sel ? '#FF6B35' : '#F0EBE3'}`, borderRadius: 10, padding: '10px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: sel ? '#FF6B35' : '#1A1A1A' }}>
                  {opt}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ padding: '20px 24px 36px' }}>
        <button className="btn-primary" onClick={next}>{step < steps.length - 1 ? 'Continue →' : 'Start Cooking! 🍽️'}</button>
      </div>
    </div>
  );
                    }
