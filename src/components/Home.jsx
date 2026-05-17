import { useState } from 'react';
import { recipes } from '../data/recipes';

const cats = [
  { id: 'all', label: 'All' }, { id: 'quick', label: '⚡ Quick' },
  { id: 'vegetarian', label: '🥗 Veg' }, { id: 'chicken', label: '🍗 Chicken' }, { id: 'seafood', label: '🐟 Seafood' },
];

export default function Home({ onOpenRecipe, playClick }) {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = recipes.filter(r => (activeCat === 'all' || r.tag === activeCat) && r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FFFDF9' }}>
      <div style={{ padding: '52px 24px 20px', background: '#fff' }}>
        <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 4 }}>Good evening! 🌙</div>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>What's for <span style={{ color: '#FF6B35' }}>dinner</span>?</h2>
        <div style={{ background: '#fff', border: '1.5px solid #F0EBE3', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}>
          <span style={{ fontSize: 18, color: '#6B7280' }}>🔍</span>
          <input type="text" placeholder="Search recipes..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: 14, flex: 1, background: 'transparent', color: '#1A1A1A' }} />
        </div>
      </div>
      <div style={{ overflowY: 'auto', flex: 1, paddingBottom: 80 }}>
        <div style={{ display: 'flex', gap: 10, padding: '16px 24px 0', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => { playClick(); setActiveCat(c.id); }}
              style={{ flexShrink: 0, padding: '10px 18px', borderRadius: 20, border: '1.5px solid', borderColor: activeCat === c.id ? '#FF6B35' : '#F0EBE3', background: activeCat === c.id ? '#FF6B35' : '#fff', color: activeCat === c.id ? '#fff' : '#1A1A1A', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
              {c.label}
            </button>
          ))}
        </div>
        <div style={{ padding: '20px 24px 12px' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18 }}>Tonight's picks ✨</h3>
        </div>
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(r => (
            <div key={r.id} onClick={() => onOpenRecipe(r)}
              style={{ background: '#fff', borderRadius: 18, overflow: 'hidden', border: '1.5px solid #F0EBE3', cursor: 'pointer' }}>
              <div style={{ height: 180, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
                {r.emoji}
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#2D6A4F', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{r.badge}</div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, marginBottom: 6 }}>{r.title}</h3>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  {[`⏱ ${r.time} min`, `🔥 ${r.cals} cal`, `👥 ${r.servings} servings`].map(m => (
                    <span key={m} style={{ fontSize: 12, color: '#6B7280' }}>{m}</span>
                  ))}
                </div>
                <div style={{ marginTop: 8 }}>
                  <span className={`skill-badge skill-${r.level}`}>{r.level.charAt(0).toUpperCase() + r.level.slice(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
