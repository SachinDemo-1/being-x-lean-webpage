import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { dietGoals } from '../context/dietData';
import './Diet.css';

const MEAL_TYPES = [
  { key: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { key: 'lunch', label: 'Lunch', emoji: '☀️' },
  { key: 'dinner', label: 'Dinner', emoji: '🌙' },
  { key: 'snacks', label: 'Snacks', emoji: '⚡' },
];

// ─── Protein Calculator ───────────────────────────────────────
function ProteinCalculator({ goal }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.55');
  const [results, setResults] = useState(null);

  const goalData = dietGoals[goal];

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;

    // Mifflin-St Jeor BMR
    let bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * parseFloat(activity));
    const targetCals = tdee + goalData.calorieSurplus;
    const protein = Math.round(w * goalData.proteinMultiplier);
    const fat = Math.round(w * goalData.fatMultiplier);
    const carbCals = targetCals - (protein * 4) - (fat * 9);
    const carbs = Math.max(0, Math.round(carbCals / 4));

    setResults({ calories: targetCals, protein, carbs, fat, tdee });
  };

  return (
    <div className="calc-section">
      <h3 className="calc-title">🧮 PROTEIN & CALORIE CALCULATOR</h3>
      <p className="calc-subtitle">Enter your details to get personalized daily macro targets for your {goalData.label} goal.</p>

      <div className="calc-form">
        <div className="calc-group">
          <label>Body Weight (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
            placeholder="e.g. 75" min="30" max="250" />
        </div>
        <div className="calc-group">
          <label>Height (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)}
            placeholder="e.g. 175" min="100" max="250" />
        </div>
        <div className="calc-group">
          <label>Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)}
            placeholder="e.g. 25" min="15" max="80" />
        </div>
        <div className="calc-group">
          <label>Gender</label>
          <select value={gender} onChange={e => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="calc-group calc-group-wide">
          <label>Activity Level</label>
          <select value={activity} onChange={e => setActivity(e.target.value)}>
            <option value="1.2">Sedentary (desk job, little exercise)</option>
            <option value="1.375">Light (1–3 workouts/week)</option>
            <option value="1.55">Moderate (3–5 workouts/week)</option>
            <option value="1.725">Active (6–7 workouts/week)</option>
            <option value="1.9">Very Active (2x/day training)</option>
          </select>
        </div>
      </div>

      <button className="btn-primary calc-btn" onClick={calculate}>
        ⚡ Calculate My Macros
      </button>

      {results && (
        <div className="calc-results">
          <div className="calc-result-card">
            <div className="calc-result-num" style={{ color: 'var(--accent)' }}>{results.calories}</div>
            <span className="calc-result-unit">kcal / day</span>
            <div className="calc-result-label">Total Calories</div>
            <div className="calc-result-note">TDEE: {results.tdee} {goalData.calorieSurplus > 0 ? `+${goalData.calorieSurplus}` : goalData.calorieSurplus}</div>
          </div>
          <div className="calc-result-card">
            <div className="calc-result-num" style={{ color: '#00bfff' }}>{results.protein}g</div>
            <span className="calc-result-unit">grams / day</span>
            <div className="calc-result-label">Protein</div>
            <div className="calc-result-note">{(results.protein * 4)} kcal</div>
          </div>
          <div className="calc-result-card">
            <div className="calc-result-num" style={{ color: '#ffd700' }}>{results.carbs}g</div>
            <span className="calc-result-unit">grams / day</span>
            <div className="calc-result-label">Carbohydrates</div>
            <div className="calc-result-note">{(results.carbs * 4)} kcal</div>
          </div>
          <div className="calc-result-card">
            <div className="calc-result-num" style={{ color: '#39ff14' }}>{results.fat}g</div>
            <span className="calc-result-unit">grams / day</span>
            <div className="calc-result-label">Fats</div>
            <div className="calc-result-note">{(results.fat * 9)} kcal</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Meal Card ────────────────────────────────────────────────
function MealCard({ meal, goalColor }) {
  return (
    <div className="meal-card">
      <div className="meal-card-header" style={{ borderColor: goalColor + '44' }}>
        <h4 className="meal-name">{meal.name}</h4>
        <div className="meal-macros">
          <span className="macro-badge macro-cal">🔥 {meal.calories} kcal</span>
          <span className="macro-badge macro-p">💪 {meal.protein}g P</span>
          <span className="macro-badge macro-c">🍞 {meal.carbs}g C</span>
          <span className="macro-badge macro-f">🥑 {meal.fat}g F</span>
        </div>
      </div>
      <div className="meal-card-body">
        <p className="ingredients-label">Ingredients</p>
        <ul className="ingredients-list">
          {meal.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Diet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const goalParam = searchParams.get('goal');
  const [selectedGoal, setSelectedGoal] = useState(
    goalParam && dietGoals[goalParam] ? goalParam : null
  );
  const [activeMealType, setActiveMealType] = useState('breakfast');

  const goalData = selectedGoal ? dietGoals[selectedGoal] : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.diet-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedGoal]);

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    setActiveMealType('breakfast');
    setSearchParams({ goal });
    setTimeout(() => window.scrollTo({ top: 400, behavior: 'smooth' }), 100);
  };

  const activeMeals = goalData ? goalData.mealPlan[activeMealType]?.meals || [] : [];

  return (
    <div className="diet-page">
      <div className="noise-overlay" />

      {/* ─── Hero ─── */}
      <div className="diet-hero">
        <div className="diet-orb-bg">
          <div className="diet-orb diet-orb-1"></div>
          <div className="diet-orb diet-orb-2"></div>
        </div>
        <div className="diet-hero-content diet-reveal">
          <p className="section-eyebrow">Nutrition Science</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>DIET PLANS</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '1.05rem' }}>
            Choose your goal and get a complete meal plan with a built-in protein calculator tailored to your body.
          </p>
        </div>
      </div>

      {/* ─── Goal Selector ─── */}
      <div className="goal-selector-section">
        <div className="goal-selector-inner">
          <div className="goal-question diet-reveal">
            <h2>What's Your Goal?</h2>
            <p>Select your primary objective to unlock a tailored nutrition plan and macro calculator.</p>
          </div>
          <div className="goal-cards">
            {Object.values(dietGoals).map(goal => (
              <div
                key={goal.id}
                className={`goal-card diet-reveal ${selectedGoal === goal.id ? 'selected' : ''}`}
                style={selectedGoal === goal.id ? { borderColor: goal.color, boxShadow: `0 0 30px ${goal.color}33` } : {}}
                onClick={() => handleSelectGoal(goal.id)}
              >
                <span className="goal-emoji">{goal.emoji}</span>
                <h3 className="goal-title" style={{ color: goal.color }}>{goal.label}</h3>
                <p className="goal-desc">{goal.description}</p>
                <div className="goal-tips">
                  {goal.tips.slice(0, 2).map((tip, i) => (
                    <span key={i} className="goal-tip">✓ {tip}</span>
                  ))}
                </div>
                <button
                  className="btn-primary goal-btn"
                  style={{ background: `linear-gradient(135deg, ${goal.color}, ${goal.color}bb)` }}
                  onClick={e => { e.stopPropagation(); handleSelectGoal(goal.id); }}
                >
                  {selectedGoal === goal.id ? '✓ Selected' : `Choose ${goal.label}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Diet Content (shown after goal selection) ─── */}
      {goalData && (
        <div className="diet-content">
          {/* Goal Header */}
          <div className="diet-content-header" style={{ borderColor: goalData.color + '44' }}>
            <div className="diet-content-inner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2.5rem' }}>{goalData.emoji}</span>
                <div>
                  <p className="section-eyebrow">Your Nutrition Plan</p>
                  <h2 className="diet-goal-title" style={{ color: goalData.color }}>{goalData.label.toUpperCase()}</h2>
                </div>
                <button
                  className="btn-outline change-goal-btn"
                  onClick={() => { setSelectedGoal(null); setSearchParams({}); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
                >
                  ↩ Change Goal
                </button>
              </div>
              <div className="goal-tips-row">
                {goalData.tips.map((tip, i) => (
                  <div key={i} className="goal-tip-card">
                    <span className="goal-tip-check" style={{ color: goalData.color }}>✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="diet-content-inner">
            {/* Protein Calculator */}
            <ProteinCalculator goal={selectedGoal} />

            {/* Meal Plan */}
            <div className="meal-plan-section">
              <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                🍽️ MEAL PLAN
              </h3>

              {/* Meal Type Tabs */}
              <div className="meal-type-tabs">
                {MEAL_TYPES.map(mt => (
                  <button
                    key={mt.key}
                    className={`meal-tab ${activeMealType === mt.key ? 'active' : ''}`}
                    onClick={() => setActiveMealType(mt.key)}
                  >
                    <span>{mt.emoji}</span>
                    <span>{mt.label}</span>
                  </button>
                ))}
              </div>

              {/* Meal header */}
              <div className="meal-section-header">
                <span style={{ fontSize: '1.5rem' }}>
                  {MEAL_TYPES.find(m => m.key === activeMealType)?.emoji}
                </span>
                <h4 className="meal-section-title">
                  {goalData.mealPlan[activeMealType]?.title}
                </h4>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  3 meal options — choose what works for you
                </span>
              </div>

              {/* Meal Cards */}
              <div className="meal-cards-grid">
                {activeMeals.map((meal, i) => (
                  <MealCard key={i} meal={meal} goalColor={goalData.color} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer" style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        <p>⚡ FitPPL — Built for those who don't quit.</p>
      </footer>
    </div>
  );
}
