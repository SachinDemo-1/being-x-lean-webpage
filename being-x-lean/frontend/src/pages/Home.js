import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generalGuidelines, muscleGroupExercises, exerciseDB } from '../context/workoutData';
import Anatomy3D from '../components/Anatomy3D';
import './Home.css';

// ─── MUSCLE COLORS (matching reference image) ─────────────────────────────────
const MC = {
  chest:     '#e8516a',   // deep pink/red
  pec_minor: '#c94060',
  shoulder:  '#e8874a',   // orange
  delt_ant:  '#d4763a',
  bicep:     '#5b9bd5',   // blue
  bicep_lh:  '#4a88c2',
  forearm:   '#b07a3c',   // tan/brown
  forearm2:  '#c98840',
  abs:       '#e85c3a',   // orange-red
  oblique:   '#d4472e',
  serratus:  '#c94030',
  neck:      '#d4b896',   // skin
  trap:      '#7ab87a',   // green (back)
  lat:       '#5a9e7a',   // teal-green
  rhomboid:  '#4a8e6a',
  teres:     '#3a7e5a',
  infrasp:   '#6aae8a',
  tricep:    '#8a6ab8',   // purple
  tricep_lh: '#7a5aa8',
  forearm_b: '#a07838',
  glute_max: '#e8a84a',   // yellow-orange
  glute_med: '#d49838',
  quad:      '#9b59b6',   // purple for quads
  quad2:     '#8e4da8',
  vl:        '#b06ec0',
  vm:        '#9a5eb0',
  rf:        '#a060b8',
  ham:       '#e87a3a',   // orange for hamstrings
  ham2:      '#d86a2a',
  calf:      '#5ab8d8',   // light blue
  calf2:     '#4aa8c8',
  tibialis:  '#6ac8e8',
  it_band:   '#c8a050',
  adductor:  '#7888c8',   // blue-purple
  skin:      '#d4956a',   // skin tone
  bone:      '#e8d8b0',
  erector:   '#6a9868',
  thoraco:   '#5a8858',
};

// ─── FRONT VIEW SVG ─────────────────────────────────────────────────────────
function FrontBody({ onHover, onClickMuscle, hoveredGroup }) {
  const isH = (g) => hoveredGroup === g;
  const opacity = (g) => isH(g) ? 1 : 0.88;
  const filter = (g) => isH(g) ? 'url(#glow)' : 'none';

  return (
    <svg viewBox="0 0 220 520" xmlns="http://www.w3.org/2000/svg" className="body-svg">
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="skinGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0a87a"/>
          <stop offset="100%" stopColor="#c4845a"/>
        </radialGradient>
      </defs>

      {/* ── HEAD ── */}
      <ellipse cx="110" cy="32" rx="26" ry="30" fill={MC.skin} stroke="#b07050" strokeWidth="0.8"/>
      {/* Hair */}
      <ellipse cx="110" cy="14" rx="26" ry="16" fill="#3a2a1a"/>
      <ellipse cx="110" cy="20" rx="26" ry="8" fill="#3a2a1a"/>
      {/* Neck */}
      <rect x="101" y="59" width="18" height="20" rx="4" fill={MC.skin} stroke="#b07050" strokeWidth="0.6"
        onMouseEnter={()=>onHover('neck')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('neck')} style={{cursor:'pointer'}}/>
      {/* Neck muscles */}
      <rect x="97" y="58" width="7" height="18" rx="2" fill="#c89060" opacity="0.7"/>
      <rect x="116" y="58" width="7" height="18" rx="2" fill="#c89060" opacity="0.7"/>

      {/* ── TRAPS (visible front) ── */}
      <path d="M84,62 Q95,56 110,60 Q125,56 136,62 Q130,78 110,80 Q90,78 84,62Z"
        fill={MC.trap} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>

      {/* ── SHOULDERS ── */}
      {/* Left shoulder */}
      <ellipse cx="80" cy="96" rx="20" ry="18" fill={MC.shoulder} opacity={opacity('shoulders')} filter={filter('shoulders')}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>
      <ellipse cx="80" cy="90" rx="15" ry="12" fill={MC.delt_ant} opacity={opacity('shoulders')} filter={filter('shoulders')}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>
      {/* Right shoulder */}
      <ellipse cx="140" cy="96" rx="20" ry="18" fill={MC.shoulder} opacity={opacity('shoulders')} filter={filter('shoulders')}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>
      <ellipse cx="140" cy="90" rx="15" ry="12" fill={MC.delt_ant} opacity={opacity('shoulders')} filter={filter('shoulders')}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>

      {/* ── CHEST ── */}
      {/* Left pec */}
      <path d="M87,80 Q88,78 110,82 L110,116 Q96,120 84,112 Q80,102 87,80Z"
        fill={MC.chest} opacity={opacity('chest')} filter={filter('chest')}
        onMouseEnter={()=>onHover('chest')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('chest')} style={{cursor:'pointer'}}/>
      {/* Right pec */}
      <path d="M133,80 Q132,78 110,82 L110,116 Q124,120 136,112 Q140,102 133,80Z"
        fill={MC.chest} opacity={opacity('chest')} filter={filter('chest')}
        onMouseEnter={()=>onHover('chest')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('chest')} style={{cursor:'pointer'}}/>
      {/* Pec lower line */}
      <path d="M88,112 Q110,122 132,112" fill="none" stroke="#c03050" strokeWidth="0.8" opacity="0.5"/>
      {/* Pec minor detail */}
      <path d="M93,86 Q100,82 108,84 L107,100 Q99,100 93,96Z"
        fill={MC.pec_minor} opacity="0.5"/>
      <path d="M127,86 Q120,82 112,84 L113,100 Q121,100 127,96Z"
        fill={MC.pec_minor} opacity="0.5"/>

      {/* ── SERRATUS ── */}
      <path d="M83,110 Q80,124 82,140 Q88,136 90,122Z" fill={MC.serratus} opacity={opacity('chest')}
        onMouseEnter={()=>onHover('chest')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('chest')} style={{cursor:'pointer'}}/>
      <path d="M137,110 Q140,124 138,140 Q132,136 130,122Z" fill={MC.serratus} opacity={opacity('chest')}
        onMouseEnter={()=>onHover('chest')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('chest')} style={{cursor:'pointer'}}/>
      {/* Serratus ribs detail */}
      {[0,1,2,3].map(i=>(
        <path key={i} d={`M83,${113+i*8} Q87,${111+i*8} 90,${114+i*8}`} fill="none" stroke={MC.serratus} strokeWidth="1.2" opacity="0.7"/>
      ))}
      {[0,1,2,3].map(i=>(
        <path key={i} d={`M137,${113+i*8} Q133,${111+i*8} 130,${114+i*8}`} fill="none" stroke={MC.serratus} strokeWidth="1.2" opacity="0.7"/>
      ))}

      {/* ── ABS ── */}
      {/* Rectus Abdominis grid */}
      <rect x="96" y="118" width="28" height="82" rx="6" fill={MC.abs} opacity={opacity('core')} filter={filter('core')}
        onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>
      {/* Ab segments - 6 pack */}
      {[0,1,2].map(i=>(
        <React.Fragment key={i}>
          <rect x="97" y={120+i*26} width="12" height="22" rx="3" fill={MC.abs} stroke="#c04030" strokeWidth="0.6" opacity={opacity('core')}
            onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
            onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>
          <rect x="111" y={120+i*26} width="12" height="22" rx="3" fill={MC.abs} stroke="#c04030" strokeWidth="0.6" opacity={opacity('core')}
            onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
            onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>
        </React.Fragment>
      ))}
      {/* Linea alba */}
      <line x1="110" y1="118" x2="110" y2="200" stroke="#a03020" strokeWidth="0.8" opacity="0.6"/>

      {/* ── OBLIQUES ── */}
      <path d="M83,118 Q88,118 96,122 L96,200 Q85,188 80,168 Q78,148 83,118Z"
        fill={MC.oblique} opacity={opacity('core')} filter={filter('core')}
        onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>
      <path d="M137,118 Q132,118 124,122 L124,200 Q135,188 140,168 Q142,148 137,118Z"
        fill={MC.oblique} opacity={opacity('core')} filter={filter('core')}
        onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>
      {/* Tendinous inscriptions */}
      {[0,1,2].map(i=>(
        <line key={i} x1="96" y1={131+i*26} x2="124" y2={131+i*26} stroke="#a03020" strokeWidth="0.6" opacity="0.5"/>
      ))}

      {/* ── UPPER ARMS ── */}
      {/* LEFT ARM */}
      {/* Bicep */}
      <path d="M62,90 Q60,88 56,96 Q52,110 54,126 Q58,134 66,134 Q74,130 76,116 Q78,100 72,90Z"
        fill={MC.bicep} opacity={opacity('arms')} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      {/* Bicep long head detail */}
      <path d="M63,92 Q60,100 60,118 Q62,128 66,132" fill="none" stroke={MC.bicep_lh} strokeWidth="2" opacity="0.5"/>
      {/* Tricep front visible */}
      <path d="M74,90 Q78,92 80,110 Q78,124 74,132 Q70,136 68,132 Q66,118 66,104Z"
        fill={MC.tricep} opacity={opacity('arms')*0.7} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>

      {/* RIGHT ARM */}
      <path d="M158,90 Q160,88 164,96 Q168,110 166,126 Q162,134 154,134 Q146,130 144,116 Q142,100 148,90Z"
        fill={MC.bicep} opacity={opacity('arms')} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      <path d="M157,92 Q160,100 160,118 Q158,128 154,132" fill="none" stroke={MC.bicep_lh} strokeWidth="2" opacity="0.5"/>
      <path d="M146,90 Q142,92 140,110 Q142,124 146,132 Q150,136 152,132 Q154,118 154,104Z"
        fill={MC.tricep} opacity={opacity('arms')*0.7} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>

      {/* ── FOREARMS ── */}
      {/* Left forearm */}
      <path d="M54,134 Q48,140 44,158 Q42,172 46,186 Q50,190 56,188 Q62,184 64,168 Q66,150 66,136Z"
        fill={MC.forearm} opacity={opacity('arms')} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      <path d="M48,138 Q46,152 48,168 Q50,178 54,184" fill="none" stroke={MC.forearm2} strokeWidth="1.5" opacity="0.6"/>
      <path d="M60,136 Q62,148 62,164 Q62,176 60,184" fill="none" stroke={MC.forearm2} strokeWidth="1.2" opacity="0.5"/>

      {/* Right forearm */}
      <path d="M166,134 Q172,140 176,158 Q178,172 174,186 Q170,190 164,188 Q158,184 156,168 Q154,150 154,136Z"
        fill={MC.forearm} opacity={opacity('arms')} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>

      {/* ── HANDS ── */}
      <ellipse cx="49" cy="196" rx="9" ry="14" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>
      <ellipse cx="171" cy="196" rx="9" ry="14" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>

      {/* ── HIP / PELVIS ── */}
      <path d="M88,200 Q95,196 110,198 Q125,196 132,200 Q138,210 136,222 Q124,228 110,230 Q96,228 84,222 Q82,210 88,200Z"
        fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>

      {/* ── QUADS / THIGHS ── */}
      {/* Left thigh - Rectus Femoris (center) */}
      <path d="M96,230 Q91,236 88,260 Q86,284 88,308 Q92,320 98,322 Q106,318 108,300 Q110,276 108,250 Q106,234 96,230Z"
        fill={MC.rf} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Left - Vastus Lateralis */}
      <path d="M89,232 Q82,242 78,268 Q76,292 80,314 Q84,322 90,322 Q94,314 94,296 Q94,270 90,248Z"
        fill={MC.vl} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Left - Vastus Medialis (teardrop) */}
      <path d="M104,294 Q108,296 110,308 Q108,320 102,324 Q97,322 96,312 Q95,300 104,294Z"
        fill={MC.vm} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* IT Band left */}
      <path d="M78,250 Q74,274 76,310 Q78,316 80,314" fill="none" stroke={MC.it_band} strokeWidth="2" opacity="0.7"/>
      {/* Sartorius */}
      <path d="M94,230 Q86,260 86,295 Q87,310 90,320" fill="none" stroke="#c8a050" strokeWidth="1.5" opacity="0.6"/>

      {/* Right thigh - Rectus Femoris */}
      <path d="M124,230 Q129,236 132,260 Q134,284 132,308 Q128,320 122,322 Q114,318 112,300 Q110,276 112,250 Q114,234 124,230Z"
        fill={MC.rf} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Right - Vastus Lateralis */}
      <path d="M131,232 Q138,242 142,268 Q144,292 140,314 Q136,322 130,322 Q126,314 126,296 Q126,270 130,248Z"
        fill={MC.vl} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Right - Vastus Medialis (teardrop) */}
      <path d="M116,294 Q112,296 110,308 Q112,320 118,324 Q123,322 124,312 Q125,300 116,294Z"
        fill={MC.vm} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>

      {/* ── ADDUCTORS ── */}
      <path d="M108,234 Q104,246 104,270 Q105,290 108,308" fill="none" stroke={MC.adductor} strokeWidth="3" opacity="0.6"/>
      <path d="M112,234 Q116,246 116,270 Q115,290 112,308" fill="none" stroke={MC.adductor} strokeWidth="3" opacity="0.6"/>

      {/* ── KNEE ── */}
      <ellipse cx="94" cy="328" rx="14" ry="10" fill="#c8b898" stroke="#a09070" strokeWidth="0.6"/>
      <ellipse cx="126" cy="328" rx="14" ry="10" fill="#c8b898" stroke="#a09070" strokeWidth="0.6"/>

      {/* ── CALVES ── */}
      {/* Left calf - Gastrocnemius */}
      <path d="M82,338 Q78,350 78,368 Q80,386 84,398 Q88,408 94,408 Q100,406 102,392 Q104,374 100,354 Q96,340 88,336Z"
        fill={MC.calf} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Left calf - Soleus */}
      <path d="M98,356 Q104,368 104,384 Q102,400 98,408 Q92,412 88,408" fill="none" stroke={MC.calf2} strokeWidth="3" opacity="0.7"/>
      {/* Left Tibialis Anterior */}
      <path d="M100,338 Q104,352 104,370 Q104,386 102,400 Q98,402 96,398 Q94,378 94,358 Q94,344 98,338Z"
        fill={MC.tibialis} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>

      {/* Right calf */}
      <path d="M138,338 Q142,350 142,368 Q140,386 136,398 Q132,408 126,408 Q120,406 118,392 Q116,374 120,354 Q124,340 132,336Z"
        fill={MC.calf} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      <path d="M120,338 Q116,352 116,370 Q116,386 118,400 Q122,402 124,398 Q126,378 126,358 Q126,344 122,338Z"
        fill={MC.tibialis} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>

      {/* ── FEET ── */}
      <ellipse cx="91" cy="416" rx="13" ry="7" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>
      <ellipse cx="129" cy="416" rx="13" ry="7" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>

      {/* ── BODY OUTLINE ── */}
      <path d="M110,8 Q136,8 136,34 Q136,58 126,62 Q138,66 150,82 Q162,96 162,114 Q168,116 174,108 Q182,96 178,88 Q186,94 188,108 Q186,128 178,138 Q174,148 170,148 Q174,164 172,180 Q168,194 162,198 L148,208 Q142,228 142,248 Q150,256 154,272 Q162,298 160,324 Q158,338 148,336 Q152,356 152,376 Q150,400 144,412 Q136,418 130,416 Q122,412 120,404 Q118,412 110,416 Q102,412 100,404 Q98,412 90,416 Q84,418 76,412 Q70,400 68,376 Q68,356 72,336 Q62,338 60,324 Q58,298 66,272 Q70,256 78,248 Q78,228 72,208 L58,198 Q52,194 48,180 Q46,164 50,148 Q46,148 42,138 Q34,128 32,108 Q34,94 42,88 Q38,96 46,108 Q52,116 58,114 Q58,96 70,82 Q82,66 94,62 Q84,58 84,34 Q84,8 110,8Z"
        fill="none" stroke="#8a5a3a" strokeWidth="1.2" opacity="0.5"/>

      {/* ── LABELS ── */}
      <text x="33" y="90" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600" letterSpacing="0.5">Shoulders</text>
      <text x="24" y="114" fontSize="5" fill="var(--text-secondary)" fontFamily="Barlow Condensed">Deltoid</text>
      <line x1="63" y1="92" x2="44" y2="90" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="168" y="98" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Biceps</text>
      <line x1="162" y1="108" x2="176" y2="102" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="168" y="114" fontSize="5" fill="var(--text-secondary)" fontFamily="Barlow Condensed">Forearms</text>
      <line x1="164" y1="158" x2="180" y2="118" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="150" y="82" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Chest</text>
      <line x1="120" y1="96" x2="152" y2="84" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="14" y="148" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Abs</text>
      <line x1="96" y1="150" x2="32" y2="150" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="10" y="270" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Thighs</text>
      <line x1="78" y1="268" x2="28" y2="270" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="152" y="308" fontSize="5" fill="var(--text-secondary)" fontFamily="Barlow Condensed">Vastus Med.</text>
      <line x1="124" y1="310" x2="152" y2="308" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="4" y="376" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Calves</text>
      <line x1="80" y1="370" x2="26" y2="374" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>
    </svg>
  );
}

// ─── BACK VIEW SVG ───────────────────────────────────────────────────────────
function BackBody({ onHover, onClickMuscle, hoveredGroup }) {
  const isH = (g) => hoveredGroup === g;
  const opacity = (g) => isH(g) ? 1 : 0.88;
  const filter = (g) => isH(g) ? 'url(#glowB)' : 'none';

  return (
    <svg viewBox="0 0 220 520" xmlns="http://www.w3.org/2000/svg" className="body-svg">
      <defs>
        <filter id="glowB" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── HEAD BACK ── */}
      <ellipse cx="110" cy="32" rx="26" ry="30" fill={MC.skin} stroke="#b07050" strokeWidth="0.8"/>
      <ellipse cx="110" cy="14" rx="26" ry="16" fill="#3a2a1a"/>
      <ellipse cx="110" cy="22" rx="26" ry="10" fill="#3a2a1a"/>

      {/* ── NECK BACK ── */}
      <rect x="101" y="59" width="18" height="20" rx="4" fill={MC.skin} stroke="#b07050" strokeWidth="0.6"/>

      {/* ── TRAPEZIUS ── */}
      <path d="M84,62 Q95,56 110,60 Q125,56 136,62 Q140,80 138,96 Q130,108 110,110 Q90,108 82,96 Q80,80 84,62Z"
        fill={MC.trap} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      {/* Trap detail lines */}
      <path d="M110,60 Q110,80 110,110" fill="none" stroke="#4a8850" strokeWidth="0.8" opacity="0.5"/>
      <path d="M86,68 Q98,72 110,72 Q122,72 134,68" fill="none" stroke="#4a8850" strokeWidth="0.7" opacity="0.4"/>

      {/* ── SHOULDERS BACK ── */}
      <ellipse cx="80" cy="96" rx="20" ry="18" fill={MC.shoulder} opacity={opacity('shoulders')} filter={filter('shoulders')}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>
      <path d="M80,80 Q68,86 64,98 Q66,110 74,112 Q82,110 86,98Z"
        fill={MC.delt_ant} opacity={opacity('shoulders')*0.85}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>
      <ellipse cx="140" cy="96" rx="20" ry="18" fill={MC.shoulder} opacity={opacity('shoulders')} filter={filter('shoulders')}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>
      <path d="M140,80 Q152,86 156,98 Q154,110 146,112 Q138,110 134,98Z"
        fill={MC.delt_ant} opacity={opacity('shoulders')*0.85}
        onMouseEnter={()=>onHover('shoulders')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('shoulders')} style={{cursor:'pointer'}}/>

      {/* ── INFRASPINATUS / RHOMBOIDS / TERES ── */}
      {/* Left */}
      <path d="M84,98 Q90,96 108,98 L108,116 Q96,120 84,116Z"
        fill={MC.rhomboid} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      <path d="M112,98 Q118,96 136,98 L136,116 Q124,120 112,116Z"
        fill={MC.rhomboid} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      {/* Infraspinatus */}
      <path d="M78,100 Q84,96 84,116 Q80,118 76,112 Q74,106 78,100Z"
        fill={MC.infrasp} opacity={opacity('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      <path d="M142,100 Q136,96 136,116 Q140,118 144,112 Q146,106 142,100Z"
        fill={MC.infrasp} opacity={opacity('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      {/* Teres Major */}
      <path d="M76,114 Q80,118 84,118 Q84,126 80,128 Q74,124 74,116Z"
        fill={MC.teres} opacity={opacity('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      <path d="M144,114 Q140,118 136,118 Q136,126 140,128 Q146,124 146,116Z"
        fill={MC.teres} opacity={opacity('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>

      {/* ── LATS ── */}
      <path d="M82,116 Q84,118 88,126 Q90,144 88,164 Q86,176 88,190 Q92,196 96,196 Q100,188 100,170 Q100,148 98,128 Q96,118 90,116Z"
        fill={MC.lat} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      <path d="M138,116 Q136,118 132,126 Q130,144 132,164 Q134,176 132,190 Q128,196 124,196 Q120,188 120,170 Q120,148 122,128 Q124,118 130,116Z"
        fill={MC.lat} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      {/* Lat detail stripes */}
      {[0,1,2].map(i=>(
        <path key={i} d={`M88,${128+i*20} Q90,${126+i*20} 96,${128+i*20}`} fill="none" stroke="#3a7860" strokeWidth="1" opacity="0.5"/>
      ))}
      {[0,1,2].map(i=>(
        <path key={i} d={`M132,${128+i*20} Q130,${126+i*20} 124,${128+i*20}`} fill="none" stroke="#3a7860" strokeWidth="1" opacity="0.5"/>
      ))}

      {/* ── ERECTOR SPINAE ── */}
      <rect x="104" y="118" width="7" height="76" rx="3" fill={MC.erector} opacity={opacity('back')} filter={filter('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      <rect x="109" y="118" width="7" height="76" rx="3" fill={MC.erector} opacity={opacity('back')}
        onMouseEnter={()=>onHover('back')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('back')} style={{cursor:'pointer'}}/>
      {/* Thoracolumbar Fascia */}
      <rect x="100" y="120" width="20" height="72" rx="4" fill={MC.thoraco} opacity="0.25"/>

      {/* ── EXTERNAL OBLIQUE BACK ── */}
      <path d="M86,188 Q84,196 86,212 Q88,222 96,226 L100,196Z"
        fill={MC.oblique} opacity={opacity('core')}
        onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>
      <path d="M134,188 Q136,196 134,212 Q132,222 124,226 L120,196Z"
        fill={MC.oblique} opacity={opacity('core')}
        onMouseEnter={()=>onHover('core')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('core')} style={{cursor:'pointer'}}/>

      {/* ── TRICEPS (BACK) ── */}
      <path d="M63,90 Q58,92 54,108 Q52,124 56,136 Q60,142 66,140 Q72,136 74,122 Q76,106 72,94Z"
        fill={MC.tricep} opacity={opacity('arms')} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      {/* Tricep long head */}
      <path d="M66,92 Q64,108 64,126 Q66,136 70,140" fill="none" stroke={MC.tricep_lh} strokeWidth="2.5" opacity="0.6"/>
      {/* Bicep back visible */}
      <path d="M74,92 Q78,96 78,114 Q76,126 72,134" fill="none" stroke={MC.bicep} strokeWidth="2" opacity="0.5"/>

      <path d="M157,90 Q162,92 166,108 Q168,124 164,136 Q160,142 154,140 Q148,136 146,122 Q144,106 148,94Z"
        fill={MC.tricep} opacity={opacity('arms')} filter={filter('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      <path d="M154,92 Q156,108 156,126 Q154,136 150,140" fill="none" stroke={MC.tricep_lh} strokeWidth="2.5" opacity="0.6"/>

      {/* ── FOREARMS BACK ── */}
      <path d="M54,140 Q50,148 46,164 Q44,180 48,192 Q52,196 58,194 Q64,190 66,174 Q66,156 64,142Z"
        fill={MC.forearm_b} opacity={opacity('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      <path d="M166,140 Q170,148 174,164 Q176,180 172,192 Q168,196 162,194 Q156,190 154,174 Q154,156 156,142Z"
        fill={MC.forearm_b} opacity={opacity('arms')}
        onMouseEnter={()=>onHover('arms')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('arms')} style={{cursor:'pointer'}}/>
      {/* Brachioradialis */}
      <path d="M50,144 Q48,158 50,172 Q52,182 56,190" fill="none" stroke={MC.forearm} strokeWidth="2" opacity="0.6"/>
      <path d="M170,144 Q172,158 170,172 Q168,182 164,190" fill="none" stroke={MC.forearm} strokeWidth="2" opacity="0.6"/>

      {/* ── HANDS BACK ── */}
      <ellipse cx="49" cy="200" rx="9" ry="12" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>
      <ellipse cx="171" cy="200" rx="9" ry="12" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>

      {/* ── GLUTES ── */}
      {/* Left glute */}
      <path d="M88,224 Q82,228 80,244 Q80,258 86,268 Q92,274 100,272 Q108,268 110,254 Q110,238 104,228 Q96,222 88,224Z"
        fill={MC.glute_max} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Glute Med */}
      <path d="M84,220 Q80,216 78,228 Q78,240 84,248 Q88,252 94,250 Q88,240 88,228Z"
        fill={MC.glute_med} opacity={opacity('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Right glute */}
      <path d="M132,224 Q138,228 140,244 Q140,258 134,268 Q128,274 120,272 Q112,268 110,254 Q110,238 116,228 Q124,222 132,224Z"
        fill={MC.glute_max} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      <path d="M136,220 Q140,216 142,228 Q142,240 136,248 Q132,252 126,250 Q132,240 132,228Z"
        fill={MC.glute_med} opacity={opacity('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Glute detail lines */}
      <path d="M90,232 Q100,244 100,260 Q99,268 96,272" fill="none" stroke="#c08830" strokeWidth="1" opacity="0.5"/>
      <path d="M130,232 Q120,244 120,260 Q121,268 124,272" fill="none" stroke="#c08830" strokeWidth="1" opacity="0.5"/>

      {/* ── HAMSTRINGS ── */}
      {/* Left - Biceps Femoris */}
      <path d="M80,274 Q76,290 76,314 Q78,330 84,336 Q90,338 94,328 Q96,310 94,286 Q92,274 86,272Z"
        fill={MC.ham} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Left - Semitendinosus */}
      <path d="M96,272 Q100,278 102,296 Q102,318 100,330 Q96,338 92,334 Q94,314 94,290 Q94,278 96,272Z"
        fill={MC.ham2} opacity={opacity('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Left - Semimembranosus */}
      <path d="M104,274 Q108,284 108,304 Q107,322 104,332 Q100,334 100,328 Q102,306 102,286 Q102,278 104,274Z"
        fill={MC.ham} opacity={opacity('legs')*0.85}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* IT Band back */}
      <path d="M76,278 Q74,302 76,326" fill="none" stroke={MC.it_band} strokeWidth="2.5" opacity="0.7"/>

      {/* Right hamstrings */}
      <path d="M140,274 Q144,290 144,314 Q142,330 136,336 Q130,338 126,328 Q124,310 126,286 Q128,274 134,272Z"
        fill={MC.ham} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      <path d="M124,272 Q120,278 118,296 Q118,318 120,330 Q124,338 128,334 Q126,314 126,290 Q126,278 124,272Z"
        fill={MC.ham2} opacity={opacity('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      <path d="M116,274 Q112,284 112,304 Q113,322 116,332 Q120,334 120,328 Q118,306 118,286 Q118,278 116,274Z"
        fill={MC.ham} opacity={opacity('legs')*0.85}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>

      {/* ── KNEE BACK ── */}
      <ellipse cx="90" cy="338" rx="14" ry="10" fill="#c8b898" stroke="#a09070" strokeWidth="0.6"/>
      <ellipse cx="130" cy="338" rx="14" ry="10" fill="#c8b898" stroke="#a09070" strokeWidth="0.6"/>

      {/* ── CALVES BACK ── */}
      {/* Left - gastrocnemius (back, bigger) */}
      <path d="M78,348 Q74,362 74,378 Q76,396 82,406 Q88,414 94,412 Q100,408 102,394 Q104,374 100,356 Q96,342 88,340 Q82,340 78,348Z"
        fill={MC.calf} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      {/* Medial head */}
      <path d="M96,348 Q100,358 102,376 Q102,394 100,406" fill="none" stroke={MC.calf2} strokeWidth="3" opacity="0.7"/>
      {/* Lateral head */}
      <path d="M82,344 Q80,358 80,376 Q80,394 82,406" fill="none" stroke={MC.calf2} strokeWidth="2.5" opacity="0.6"/>
      {/* Soleus */}
      <path d="M78,388 Q80,396 86,406 Q90,412 96,412 Q100,406 100,398" fill="none" stroke="#3a98b8" strokeWidth="2" opacity="0.6"/>
      {/* Peroneus */}
      <path d="M102,360 Q106,374 106,392 Q104,406 102,410" fill={MC.tibialis} opacity={opacity('legs')*0.7}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>

      {/* Right calf */}
      <path d="M142,348 Q146,362 146,378 Q144,396 138,406 Q132,414 126,412 Q120,408 118,394 Q116,374 120,356 Q124,342 132,340 Q138,340 142,348Z"
        fill={MC.calf} opacity={opacity('legs')} filter={filter('legs')}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>
      <path d="M118,360 Q114,374 114,392 Q116,406 118,410" fill={MC.tibialis} opacity={opacity('legs')*0.7}
        onMouseEnter={()=>onHover('legs')} onMouseLeave={()=>onHover(null)}
        onClick={()=>onClickMuscle('legs')} style={{cursor:'pointer'}}/>

      {/* ── FEET BACK ── */}
      <ellipse cx="90" cy="420" rx="13" ry="7" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>
      <ellipse cx="130" cy="420" rx="13" ry="7" fill={MC.skin} stroke="#a06840" strokeWidth="0.6"/>

      {/* ── BACK LABELS ── */}
      <text x="148" y="78" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Back</text>
      <line x1="136" y1="88" x2="152" y2="80" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="148" y="140" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Triceps</text>
      <line x1="155" y1="110" x2="158" y2="136" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="148" y="162" fontSize="5" fill="var(--text-secondary)" fontFamily="Barlow Condensed">Lats</text>
      <line x1="136" y1="148" x2="150" y2="160" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="4" y="160" fontSize="5" fill="var(--text-secondary)" fontFamily="Barlow Condensed">Erector</text>
      <line x1="104" y1="162" x2="30" y2="160" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="148" y="248" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Glutes</text>
      <line x1="134" y1="256" x2="150" y2="250" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="148" y="306" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Hamstrings</text>
      <line x1="140" y1="304" x2="152" y2="306" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      <text x="4" y="380" fontSize="6" fill="var(--text-secondary)" fontFamily="Barlow Condensed" fontWeight="600">Calves</text>
      <line x1="76" y1="374" x2="26" y2="378" stroke="var(--text-secondary)" strokeWidth="0.5" opacity="0.5"/>

      {/* Body outline back */}
      <path d="M110,8 Q136,8 136,34 Q136,58 126,62 Q138,66 150,82 Q162,96 162,114 Q168,116 176,108 Q184,96 180,88 Q188,94 190,108 Q188,128 178,140 Q174,150 168,150 Q172,166 170,182 Q166,196 160,200 L148,210 Q142,228 142,270 Q142,292 138,336 Q148,340 152,360 Q156,384 150,410 Q142,418 130,418 Q118,412 118,406 Q114,412 110,416 Q106,412 102,406 Q102,412 90,418 Q78,418 70,410 Q64,384 68,360 Q72,340 82,336 Q78,292 78,270 Q78,228 72,210 L60,200 Q54,196 50,182 Q48,166 52,150 Q46,150 42,140 Q32,128 30,108 Q32,94 40,88 Q36,96 44,108 Q52,116 58,114 Q58,96 70,82 Q82,66 94,62 Q84,58 84,34 Q84,8 110,8Z"
        fill="none" stroke="#8a5a3a" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  );
}

function Anatomy3D({ onMuscleClick }) {
  const [isFront, setIsFront] = useState(true);
  const [hoveredGroup, setHoveredGroup] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFront(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="anatomy-3d-wrapper">
      {isFront ? (
        <FrontBody
          onHover={setHoveredGroup}
          hoveredGroup={hoveredGroup}
          onClickMuscle={onMuscleClick}
        />
      ) : (
        <BackBody
          onHover={setHoveredGroup}
          hoveredGroup={hoveredGroup}
          onClickMuscle={onMuscleClick}
        />
      )}
    </div>
  );
}

// ─── MUSCLE MODAL ────────────────────────────────────────────────────────────
function MuscleModal({ muscleGroup, onClose }) {
  const data = muscleGroupExercises[muscleGroup];
  const exercises = data.exercises.map(id => exerciseDB[id]).filter(Boolean);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="muscle-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ borderColor: data.color }}>
          <div className="modal-title-row">
            <span className="modal-icon">{data.icon}</span>
            <div>
              <p className="modal-eyebrow">Muscle Group</p>
              <h2 className="modal-title" style={{ color: data.color }}>{data.label.toUpperCase()} EXERCISES</h2>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-exercises">
          {exercises.map(ex => (
            <div className="modal-exercise-card" key={ex.id} style={{ '--ex-color': data.color }}>
              <div className="mec-left"><span className="mec-emoji">{ex.emoji}</span></div>
              <div className="mec-body">
                <div className="mec-header">
                  <div>
                    <h3 className="mec-name">{ex.name}</h3>
                    <span className="mec-muscle">{ex.muscle}</span>
                  </div>
                  <div className="mec-meta">
                    <span className="mec-sets">{ex.detail}</span>
                    <span className="mec-reps" style={{ color: data.color }}>{ex.reps}</span>
                  </div>
                </div>
                <div className="mec-tips">
                  {ex.tips.slice(0, 2).map((tip, i) => <span key={i} className="mec-tip">• {tip}</span>)}
                </div>
                <div className="mec-muscles">
                  {ex.targetMuscles.map(m => <span key={m} className="muscle-chip">{m}</span>)}
                </div>
                <a href={ex.youtubeUrl} target="_blank" rel="noopener noreferrer" className="yt-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.37.55A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.13 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.37-.55a3.02 3.02 0 002.13-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <Link to="/workout" className="btn-primary" onClick={onClose} style={{ background: `linear-gradient(135deg,${data.color},${data.color}99)` }}>
            View Full Workout Plan →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── BRAND NAME ──────────────────────────────────────────────────────────────
function BrandName() {
  return (
    <div className="brand-name-container">
      <div className="brand-line">
        {'BEING'.split('').map((l, i) => <span key={i} className="brand-letter" style={{ animationDelay: `${i * 0.09}s` }}>{l}</span>)}
        <span className="brand-x">_X_</span>
        {'LEAN'.split('').map((l, i) => <span key={i} className="brand-letter brand-letter-2" style={{ animationDelay: `${(i + 6) * 0.09}s` }}>{l}</span>)}
      </div>
    </div>
  );
}

// ─── LEGEND ITEM ─────────────────────────────────────────────────────────────
function LegendItem({ label, color, icon, onClick, isHovered }) {
  return (
    <button className={`legend-item ${isHovered ? 'legend-active' : ''}`} style={{ '--mg-color': color }} onClick={onClick}>
      <span className="legend-dot" style={{ background: color }}></span>
      <span>{icon}</span>
      <span className="legend-label">{label}</span>
    </button>
  );
}

// ─── PLAN / DIET CARDS ───────────────────────────────────────────────────────
const PLAN_CARDS = [
  { days: 3, label: '3 Day Split', badge: 'Beginner',     color: '#00bfff', emoji: '🌱', desc: 'Classic PPL — 3 days/week. Perfect for beginners.' },
  { days: 4, label: '4 Day Split', badge: 'Intermediate', color: '#39ff14', emoji: '⚡', desc: 'Upper/Lower Hybrid — 4 days for more volume.' },
  { days: 5, label: '5 Day Split', badge: 'Advanced',     color: '#ffd700', emoji: '🔥', desc: 'High Frequency — 5 days for serious gains.' },
  { days: 6, label: '6 Day Split', badge: 'Elite',        color: '#ff4500', emoji: '👑', desc: 'Elite Double PPL — 6 days for advanced athletes.' },
];
const DIET_CARDS = [
  { id: 'muscle-gain', label: 'Muscle Gain', emoji: '💪', color: '#ff4500', desc: 'Surplus + high protein to build lean muscle.' },
  { id: 'fat-loss',    label: 'Fat Loss',    emoji: '🔥', color: '#39ff14', desc: 'Deficit + high protein to shed fat and stay lean.' },
  { id: 'bulk',        label: 'Dirty Bulk',  emoji: '🍖', color: '#ffd700', desc: 'Maximum calories for rapid size and strength.' },
];

// ─── MAIN HOME ───────────────────────────────────────────────────────────────
export default function Home() {
  const [activeMuscle, setActiveMuscle] = useState(null);
  const [hoveredGroup, setHoveredGroup] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleMuscleClick = (group) => { setActiveMuscle(group); setHoveredGroup(null); };

  return (
    <div className="home">
      <div className="noise-overlay" />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-orb orb-3"></div>
        </div>

        <div className="hero-layout">
          {/* Left text */}
          <div className="hero-text">
            <div className="hero-badge-pill">Push · Pull · Legs · Nutrition</div>
            <BrandName />
            <p className="hero-subtitle">
              Click any muscle on the anatomical body to instantly see all exercises targeting that group — complete with form tips and YouTube tutorials.
            </p>
            <div className="hero-actions">
              <Link to="/workout" className="btn-primary hero-btn">🏋️ Workout Plans</Link>
              <Link to="/diet" className="btn-outline hero-btn">🥗 Diet Plans</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">4</span><span className="stat-label">Splits</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><span className="stat-num">21</span><span className="stat-label">Exercises</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><span className="stat-num">3</span><span className="stat-label">Diet Plans</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><span className="stat-num">6</span><span className="stat-label">Muscle Groups</span></div>
            </div>
          </div>

          {/* Right: Anatomy Diagram */}
          <div className="hero-3d">
            <div className="anatomy-container">
              {/* Legend */}
              <div className="muscle-legend">
                {Object.entries(muscleGroupExercises).map(([key, mg]) => (
                  <LegendItem key={key} label={mg.label} color={mg.color} icon={mg.icon}
                    onClick={() => handleMuscleClick(key)}
                    isHovered={hoveredGroup === key} />
                ))}
              </div>

              {/* 3D Anatomical Body */}
              <Anatomy3D onMuscleClick={handleMuscleClick} />

              <div className="anatomy-hint">
                👆 Click any muscle to see exercises &nbsp;·&nbsp; Drag to rotate manually &nbsp;·&nbsp; Auto-rotates 360°
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKOUT PLANS ── */}
      <section className="days-overview">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Training Programs</p>
            <h2 className="section-title">CHOOSE YOUR SPLIT</h2>
            <p className="section-desc">Select how many days per week you train. Every plan is PPL-based, optimized for hypertrophy.</p>
          </div>
          <div className="day-cards">
            {PLAN_CARDS.map((plan, i) => (
              <div className="day-card reveal" key={plan.days} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="plan-card-top" style={{ borderColor: plan.color }}>
                  <span className="plan-big-num" style={{ color: plan.color }}>{plan.days}</span>
                  <div>
                    <span className="plan-badge" style={{ color: plan.color, background: `${plan.color}18`, border: `1px solid ${plan.color}44` }}>{plan.badge}</span>
                    <h3 className="day-title">{plan.label}</h3>
                  </div>
                  <span style={{ fontSize: '1.8rem', marginLeft: 'auto' }}>{plan.emoji}</span>
                </div>
                <p className="day-desc">{plan.desc}</p>
                <Link to={`/workout?days=${plan.days}`} className="day-cta" style={{ color: plan.color }}>Start {plan.days}-Day Plan →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIET PLANS ── */}
      <section className="diet-overview">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Nutrition Plans</p>
            <h2 className="section-title">PICK YOUR GOAL</h2>
            <p className="section-desc">Science-backed meal plans with a built-in protein and calorie calculator.</p>
          </div>
          <div className="day-cards" style={{ marginTop: '3rem' }}>
            {DIET_CARDS.map((goal, i) => (
              <div className="day-card reveal" key={goal.id} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="diet-card-header">
                  <span style={{ fontSize: '2.5rem' }}>{goal.emoji}</span>
                  <h3 className="day-title" style={{ color: goal.color }}>{goal.label}</h3>
                </div>
                <p className="day-desc">{goal.desc}</p>
                <Link to={`/diet?goal=${goal.id}`} className="day-cta" style={{ color: goal.color }}>View {goal.label} Plan →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDELINES ── */}
      <section className="guidelines-section">
        <div className="container">
          <div className="reveal">
            <p className="section-eyebrow">Rules to Live By</p>
            <h2 className="section-title">TRAINING PRINCIPLES</h2>
          </div>
          <div className="guidelines-grid">
            {generalGuidelines.map((g, i) => (
              <div className="guideline-card reveal" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="guideline-icon">{g.icon}</span>
                <h4 className="guideline-title">{g.title}</h4>
                <p className="guideline-text">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <div className="cta-orb"></div>
            <h2 className="section-title">READY TO START?</h2>
            <p>Sign in to track your progress, save your theme, and access the full program anytime.</p>
            <div className="cta-buttons">
              <Link to="/workout" className="btn-primary">🏋️ Start Training</Link>
              <Link to="/auth" className="btn-outline">Create Free Account</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer"><p>⚡ BEING_X_LEAN — Built for those who don't quit.</p></footer>

      {activeMuscle && <MuscleModal muscleGroup={activeMuscle} onClose={() => setActiveMuscle(null)} />}
    </div>
  );
}
