import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { exerciseDB, workoutPlans, generalGuidelines } from '../context/workoutData';
import './Workout.css';

function ExerciseCard({ exercise, dayColor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`exercise-card ${expanded ? 'expanded' : ''}`}
      style={{ '--day-color': dayColor }}
    >
      <div className="ex-card-main" onClick={() => setExpanded(!expanded)}>
        <div className="ex-emoji-wrap">
          <span className="ex-emoji">{exercise.emoji}</span>
        </div>
        <div className="ex-info">
          <div className="ex-header">
            <div>
              <h3 className="ex-name">{exercise.name}</h3>
              <span className="ex-muscle">{exercise.muscle}</span>
            </div>
            <div className="ex-sets-reps">
              <span className="ex-sets">{exercise.detail}</span>
              <span className="ex-reps" style={{ color: dayColor }}>{exercise.reps}</span>
            </div>
          </div>

          <div className="ex-muscles">
            {exercise.targetMuscles.map(m => (
              <span key={m} className="muscle-tag">{m}</span>
            ))}
          </div>

          <button className="expand-btn" style={{ color: dayColor }}>
            {expanded ? '▲ Hide Tips' : '▼ Form Tips & Instructions'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="ex-expanded-content">
          <h4 className="tips-title">📋 How to Perform</h4>
          <ul className="tips-list">
            {exercise.tips.map((tip, i) => (
              <li key={i} className="tip-item">
                <span className="tip-num" style={{ background: dayColor }}>{i + 1}</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Plan Selector ────────────────────────────────────────────
function PlanSelector({ currentDays, onSelect }) {
  const plans = Object.values(workoutPlans);
  const badges = { 3: 'Beginner', 4: 'Intermediate', 5: 'Advanced', 6: 'Elite' };
  const badgeColors = { 3: '#00bfff', 4: '#39ff14', 5: '#ffd700', 6: '#ff4500' };

  return (
    <div className="plan-selector-section">
      <div className="plan-selector-inner">
        <p className="section-eyebrow" style={{ textAlign: 'center' }}>Choose Your Training Frequency</p>
        <h2 className="section-title plan-selector-title">SELECT YOUR SPLIT</h2>
        <div className="plan-selector-grid">
          {plans.map(plan => (
            <button
              key={plan.days}
              className={`plan-select-card ${currentDays === plan.days ? 'active' : ''}`}
              style={{
                '--plan-color': plan.color,
                borderColor: currentDays === plan.days ? plan.color : undefined,
                boxShadow: currentDays === plan.days ? `0 0 25px ${plan.color}44` : undefined,
              }}
              onClick={() => onSelect(plan.days)}
            >
              <span className="psc-badge" style={{ color: badgeColors[plan.days], background: `${badgeColors[plan.days]}18`, border: `1px solid ${badgeColors[plan.days]}44` }}>
                {badges[plan.days]}
              </span>
              <div className="psc-num" style={{ color: plan.color }}>{plan.days}</div>
              <div className="psc-label">{plan.label}</div>
              <div className="psc-sub">{plan.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Workout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const daysParam = parseInt(searchParams.get('days')) || 3;
  const [selectedDays, setSelectedDays] = useState([3, 4, 5, 6].includes(daysParam) ? daysParam : 3);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const plan = workoutPlans[selectedDays];
  const activeDay = plan.schedule[activeDayIndex];

  useEffect(() => {
    setActiveDayIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedDays]);

  const handleSelectDays = (days) => {
    setSelectedDays(days);
    setSearchParams({ days });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/PPL_Workout_Plan_v2.pdf';
    link.download = 'FitPPL_Workout_Plan.pdf';
    link.click();
  };

  return (
    <div className="workout-page">
      <div className="noise-overlay" />

      {/* ─── Page Header ─── */}
      <div className="workout-header">
        <div className="wh-bg">
          <div className="wh-orb" style={{ background: plan.color }}></div>
        </div>
        <div className="wh-content">
          <p className="section-eyebrow">Push · Pull · Legs Program</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>WORKOUT PLAN</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Select your training split, then click any exercise to expand form tips
          </p>
          <button className="btn-outline download-btn" onClick={handleDownload}>
            ⬇️ Download PDF Plan
          </button>
        </div>
      </div>

      {/* ─── Plan Selector ─── */}
      <PlanSelector currentDays={selectedDays} onSelect={handleSelectDays} />

      {/* ─── Day Tabs ─── */}
      <div className="day-tabs-wrap">
        <div className="day-tabs">
          {plan.schedule.map((day, i) => (
            <button
              key={i}
              className={`day-tab ${activeDayIndex === i ? 'active' : ''}`}
              style={activeDayIndex === i ? { borderColor: day.color, color: day.color } : {}}
              onClick={() => setActiveDayIndex(i)}
            >
              <span className="tab-emoji">{day.emoji}</span>
              <div>
                <span className="tab-day">{day.day}</span>
                <span className="tab-name">{day.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── Active Day ─── */}
      <div className="workout-content">
        <div className="day-intro" style={{ borderColor: activeDay.color }}>
          <div className="day-intro-header">
            <span className="day-big-emoji">{activeDay.emoji}</span>
            <div>
              <h2 className="day-intro-title">{activeDay.day}: {activeDay.title}</h2>
              <p className="day-intro-desc">{plan.description}</p>
            </div>
          </div>
          <div className="day-meta">
            <span>📊 {activeDay.exercises.length} Exercises</span>
            <span>🔁 9–12 Reps</span>
            <span>⏱️ 60–90s Rest</span>
            <span>🎯 {activeDay.focus}</span>
          </div>
        </div>

        <div className="exercises-grid">
          {activeDay.exercises.map((exId, i) => {
            const ex = exerciseDB[exId];
            if (!ex) return null;
            return (
              <div key={ex.id} style={{ animationDelay: `${i * 0.08}s`, animation: 'fadeInUp 0.5s ease both' }}>
                <ExerciseCard exercise={ex} dayColor={activeDay.color} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Guidelines ─── */}
      <div className="workout-guidelines">
        <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          TRAINING GUIDELINES
        </h3>
        <div className="g-grid">
          {generalGuidelines.map((g, i) => (
            <div key={i} className="g-card">
              <span className="g-icon">{g.icon}</span>
              <div>
                <strong>{g.title}</strong>
                <p>{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
