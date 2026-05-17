export default function RecipeDetail({ recipe, onBack }) {
  if (!recipe) return null;
  const diffMap = { beginner: '🌱 Beginner Friendly', intermediate: '🍳 Intermediate', advanced: '👨‍🍳 Advanced Chef' };
  const diffColor = { beginner: { bg: '#D8F3DC', color: '#2D6A4F' }, intermediate: { bg: '#FEF3C7', color: '#92400E' }, advanced: { bg: '#FEE2E2', color: '#991B1B' } };
  const dc = diffColor[recipe.level];

  return (
    <div className="screen" style={{ background: '#fff', overflowY: 'auto' }}>
      <div style={{ height: 260, background: recipe.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100, position: 'relative', flexShrink: 0 }}>
        <div onClick={onBack} style={{ position: 'absolute', top: 52, left: 16, width: 38, height: 38, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, border: '1.5px solid #F0EBE3' }}>←</div>
        {recipe.emoji}
      </div>
      <div style={{ padding: '20px 20px 80px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: dc.bg, color: dc.color, fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 20, marginBottom: 12 }}>
          {diffMap[recipe.level]}
        </div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, marginBottom: 16 }}>{recipe.title}</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, background: '#FFFDF9', borderRadius: 14, padding: 14 }}>
          {[{ val: recipe.time, label: 'mins' }, { val: recipe.cals, label: 'calories' }, { val: recipe.servings, label: 'servings' }].map(m => (
            <div key={m.label} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#FF6B35' }}>{m.val}</div>
              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, margin: '20px 0 12px' }}>🧂 Ingredients</h3>
        {recipe.ingredients.map((ing, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F0EBE3' }}>
            <div style={{ width: 8, height: 8, background: '#FF6B35', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ fontSize: 14 }}>{ing}</span>
          </div>
        ))}
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, margin: '20px 0 12px' }}>👨‍🍳 Steps</h3>
        {recipe.steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, background: '#FF6B35', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#374151' }}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
