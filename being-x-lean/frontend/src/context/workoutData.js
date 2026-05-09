export const exerciseDB = {
  'lat-pulldown': { id:'lat-pulldown',name:'Lat Pulldown',detail:'4 Sets (2 Close, 2 Wide)',reps:'9–12 reps',muscle:'Latissimus Dorsi',emoji:'🏋️',bodyPart:'back',youtubeUrl:'https://www.youtube.com/watch?v=CAwf7n6Luuc',tips:['Pull bar to upper chest, not behind neck','Keep chest up, squeeze shoulder blades','Control negative — 2–3 seconds up','Alternate grips for full lat coverage'],targetMuscles:['Lats','Biceps','Rear Delts','Rhomboids']},
  'seated-row':   { id:'seated-row',name:'Seated Cable Row',detail:'3 Sets',reps:'9–12 reps',muscle:'Middle Back',emoji:'🔙',bodyPart:'back',youtubeUrl:'https://www.youtube.com/watch?v=GZbfZ033f74',tips:['Use low cable angle to hit lower lats','Drive elbows back and squeeze at peak','Keep torso upright throughout','Full stretch at the front for max range'],targetMuscles:['Mid-Back','Lats','Biceps','Rear Delts']},
  'pullup':       { id:'pullup',name:'Pull-Ups',detail:'3 Sets',reps:'8–12 reps',muscle:'Back / Biceps',emoji:'⬆️',bodyPart:'back',youtubeUrl:'https://www.youtube.com/watch?v=eGo4IYlbE5g',tips:['Full dead hang at the bottom','Chin over bar at the top','Lead with chest, not chin','Use band assistance if needed'],targetMuscles:['Lats','Biceps','Rear Delts','Core']},
  'facepull':     { id:'facepull',name:'Face Pull',detail:'3 Sets',reps:'12–15 reps',muscle:'Rear Delts / Rotator Cuff',emoji:'🎯',bodyPart:'shoulders',youtubeUrl:'https://www.youtube.com/watch?v=rep-qVOkqgk',tips:['Pull rope to face level','External rotate at end position','Keep elbows high throughout','Light weight, high mind-muscle'],targetMuscles:['Rear Delts','Rotator Cuff','Upper Traps']},
  'reverse-fly':  { id:'reverse-fly',name:'Reverse Cable Fly',detail:'4 Sets',reps:'9–12 reps',muscle:'Rear Deltoids',emoji:'🦋',bodyPart:'shoulders',youtubeUrl:'https://www.youtube.com/watch?v=lPt0GqQequU',tips:['Cable at head height','Slight elbow bend throughout','Focus on rear delt not back','Squeeze at full extension 1 sec'],targetMuscles:['Rear Delts','Rhomboids','Traps']},
  'ohp':          { id:'ohp',name:'Overhead Press',detail:'3 Sets',reps:'9–12 reps',muscle:'Front Deltoids',emoji:'🏛️',bodyPart:'shoulders',youtubeUrl:'https://www.youtube.com/watch?v=2yjwXTZQDDI',tips:['Barbell or dumbbell — both work','Press slightly in front of face','Engage core and glutes for stability','Full lockout — squeeze front delts'],targetMuscles:['Anterior Deltoid','Lateral Deltoid','Triceps','Upper Traps']},
  'lateral-raise':{ id:'lateral-raise',name:'Cable Lateral Raise',detail:'4 Sets',reps:'9–12 reps',muscle:'Lateral Deltoids',emoji:'↔️',bodyPart:'shoulders',youtubeUrl:'https://www.youtube.com/watch?v=3VcKaXpzqRo',tips:['Cable = constant tension','Raise just above shoulder height','Lead with elbows not wrists','Cross-body path for better activation'],targetMuscles:['Lateral Deltoid','Supraspinatus','Upper Traps']},
  'db-press':     { id:'db-press',name:'Dumbbell Press',detail:'2 Flat + 2 Incline Sets',reps:'9–12 reps',muscle:'Chest',emoji:'💪',bodyPart:'chest',youtubeUrl:'https://www.youtube.com/watch?v=VmB1G1K7v94',tips:['Flat: mid/lower chest builder','Incline 30–45°: upper chest','Touch dumbbells lightly at top','Control descent always'],targetMuscles:['Pec Major','Anterior Deltoid','Triceps']},
  'machine-press':{ id:'machine-press',name:'Incline Machine Press',detail:'2 Sets',reps:'9–12 reps',muscle:'Upper Chest',emoji:'🖥️',bodyPart:'chest',youtubeUrl:'https://www.youtube.com/watch?v=Y2DkPFmgVBs',tips:['Go heavier safely on machine','Handles at upper chest level','Full lockout, 3-sec negative','Great finisher after free weight'],targetMuscles:['Upper Pec','Anterior Deltoid','Triceps']},
  'cable-fly':    { id:'cable-fly',name:'Upper Angle Cable Fly',detail:'3 Sets',reps:'9–12 reps',muscle:'Lower Chest',emoji:'🔄',bodyPart:'chest',youtubeUrl:'https://www.youtube.com/watch?v=taI4XduLpTk',tips:['Cables high — pull down + inward','Slight elbow bend always','Feel stretch at top of movement','Squeeze — imagine hugging a tree'],targetMuscles:['Lower Pec','Pec Minor','Anterior Deltoid']},
  'dips':         { id:'dips',name:'Dips',detail:'3 Sets',reps:'8–12 reps',muscle:'Chest / Triceps',emoji:'⬇️',bodyPart:'chest',youtubeUrl:'https://www.youtube.com/watch?v=2z8JmcrW-As',tips:['Lean forward for more chest','Upright = more triceps','Elbows past 90° at bottom','Add weight when reps get easy'],targetMuscles:['Lower Pec','Triceps','Anterior Delt']},
  'barbell-curl': { id:'barbell-curl',name:'Barbell Curl',detail:'3 Sets',reps:'9–12 reps',muscle:'Biceps',emoji:'💪',bodyPart:'arms',youtubeUrl:'https://www.youtube.com/watch?v=kwG2ipFRgfo',tips:['Elbows pinned to sides','EZ-bar reduces wrist strain','Full range: extended to chin','Strict form — no body rocking'],targetMuscles:['Biceps Brachii','Brachialis','Brachioradialis']},
  'incline-curl': { id:'incline-curl',name:'Incline Dumbbell Curl',detail:'2 Sets',reps:'9–12 reps',muscle:'Biceps Long Head',emoji:'📐',bodyPart:'arms',youtubeUrl:'https://www.youtube.com/watch?v=soxrZlIl35U',tips:['Bench 45–60°, arms hang behind','Stretches long head for peak',"Don't swing — feel the stretch",'Supinate wrist at top'],targetMuscles:['Biceps Long Head','Short Head','Brachialis']},
  'hammer-curl':  { id:'hammer-curl',name:'Hammer Curl',detail:'3 Sets',reps:'9–12 reps',muscle:'Brachialis / Forearms',emoji:'🔨',bodyPart:'arms',youtubeUrl:'https://www.youtube.com/watch?v=zC3nLlEvin4',tips:['Neutral grip (palms facing in)','Builds brachialis under bicep','Also thickens forearms','Alternate or simultaneous'],targetMuscles:['Brachialis','Brachioradialis','Biceps Long Head']},
  'tricep-pushdown':{ id:'tricep-pushdown',name:'Tricep Pushdown',detail:'3 Sets',reps:'9–12 reps',muscle:'Triceps',emoji:'⬇️',bodyPart:'arms',youtubeUrl:'https://www.youtube.com/watch?v=2-LAMcpzODU',tips:['Elbows pinned to sides always','Fully extend, squeeze at bottom','Rope allows wider extension',"Don't use back to push down"],targetMuscles:['Lateral Head','Medial Head','Long Head']},
  'overhead-ext': { id:'overhead-ext',name:'Overhead Cable Extension',detail:'2 Sets',reps:'9–12 reps',muscle:'Triceps Long Head',emoji:'🔝',bodyPart:'arms',youtubeUrl:'https://www.youtube.com/watch?v=YOIoSoFOJwY',tips:['Cable low, face away from machine','Hinge forward to stretch long head','Control descent behind head','Single-arm for better range'],targetMuscles:['Triceps Long Head','Triceps Lateral Head']},
  'leg-press':    { id:'leg-press',name:'Leg Press / Squat',detail:'3 Sets',reps:'9–12 reps',muscle:'Quads / Glutes',emoji:'🦵',bodyPart:'legs',youtubeUrl:'https://www.youtube.com/watch?v=IZxyjW7MPJQ',tips:['Feet shoulder-width, mid-plate','Chest up, knees over toes','Go to parallel or below','Drive through heels on push'],targetMuscles:['Quads','Glutes','Hamstrings','Adductors']},
  'leg-ext':      { id:'leg-ext',name:'Leg Extension',detail:'3 Sets',reps:'9–12 reps',muscle:'Quadriceps',emoji:'🦿',bodyPart:'legs',youtubeUrl:'https://www.youtube.com/watch?v=YyvSfVjQeL0',tips:['Squeeze hard at top 1–2s','Slow eccentric for overload','Pad just above ankle','Hips flush against seat'],targetMuscles:['Rectus Femoris','Vastus Lateralis','Vastus Medialis']},
  'ham-curl':     { id:'ham-curl',name:'Hamstring Curl',detail:'3 Sets',reps:'9–12 reps',muscle:'Hamstrings',emoji:'🦵',bodyPart:'legs',youtubeUrl:'https://www.youtube.com/watch?v=1Tq3QdYUuHs',tips:['Lying or seated — both effective','Toes in to bias bicep femoris','Full range, no cheating stretch','Squeeze hard at peak contraction'],targetMuscles:['Bicep Femoris','Semitendinosus','Semimembranosus']},
  'calf-raise':   { id:'calf-raise',name:'Calf Raises',detail:'3 Sets',reps:'9–12 reps',muscle:'Calves',emoji:'🦶',bodyPart:'legs',youtubeUrl:'https://www.youtube.com/watch?v=gwLzBJYoWlI',tips:['Full stretch at bottom, full peak','Hold top 2 sec for max activation','Straight = gastro, bent = soleus','Step for deeper stretch'],targetMuscles:['Gastrocnemius','Soleus']},
  'rdl':          { id:'rdl',name:'Romanian Deadlift',detail:'3 Sets',reps:'9–12 reps',muscle:'Hamstrings / Glutes',emoji:'🏗️',bodyPart:'legs',youtubeUrl:'https://www.youtube.com/watch?v=JCXUYuzwNrM',tips:['Hinge at hips, soft knee bend','Bar close to legs throughout','Pause at stretch position','Drive hips forward to stand'],targetMuscles:['Hamstrings','Glutes','Erectors']},
  'hip-thrust':   { id:'hip-thrust',name:'Hip Thrust',detail:'3 Sets',reps:'9–12 reps',muscle:'Glutes',emoji:'🍑',bodyPart:'legs',youtubeUrl:'https://www.youtube.com/watch?v=xDmFkJxPzeM',tips:['Shoulders on bench, bar on hips','Drive hips to full extension','Squeeze glutes hard at top','Chin tucked, core braced'],targetMuscles:['Glutes','Hamstrings','Hip Flexors']},
};

export const muscleGroupExercises = {
  chest:    { label:'Chest',    color:'#ff3b6b', icon:'🫁', exercises:['db-press','machine-press','cable-fly','dips'] },
  back:     { label:'Back',     color:'#ff4500', icon:'🔙', exercises:['lat-pulldown','seated-row','pullup','facepull'] },
  shoulders:{ label:'Shoulders',color:'#00bfff', icon:'💫', exercises:['ohp','lateral-raise','reverse-fly','facepull'] },
  arms:     { label:'Arms',     color:'#ffd700', icon:'💪', exercises:['barbell-curl','incline-curl','hammer-curl','tricep-pushdown','overhead-ext'] },
  legs:     { label:'Legs',     color:'#39ff14', icon:'🦵', exercises:['leg-press','leg-ext','ham-curl','calf-raise','rdl','hip-thrust'] },
  core:     { label:'Core',     color:'#bf00ff', icon:'⭕', exercises:['leg-press','pullup','rdl'] },
};

export const workoutPlans = {
  3:{ days:3,label:'3 Day Split',subtitle:'Classic PPL — Perfect for Beginners',description:'The foundational Push-Pull-Legs cycle. 3 days per week with full recovery. Ideal for beginners.',badge:'Beginner',color:'#00bfff',
    schedule:[
      {day:'Day 1',focus:'Pull',title:'Back + Triceps + Rear Delts',emoji:'💪',color:'#ff4500',exercises:['lat-pulldown','seated-row','reverse-fly','tricep-pushdown','overhead-ext']},
      {day:'Day 2',focus:'Legs',title:'Legs + Lateral Delts',emoji:'🦵',color:'#00bfff',exercises:['leg-press','leg-ext','ham-curl','calf-raise','lateral-raise']},
      {day:'Day 3',focus:'Push',title:'Chest + Biceps + Front Delts',emoji:'🏋️',color:'#ff3b6b',exercises:['db-press','machine-press','cable-fly','barbell-curl','incline-curl','hammer-curl','ohp']},
    ]},
  4:{ days:4,label:'4 Day Split',subtitle:'Upper/Lower PPL Hybrid',description:'Four days for more frequency and muscle stimulation per week.',badge:'Intermediate',color:'#39ff14',
    schedule:[
      {day:'Day 1',focus:'Pull',title:'Back + Rear Delts',emoji:'💪',color:'#ff4500',exercises:['lat-pulldown','seated-row','pullup','reverse-fly','facepull']},
      {day:'Day 2',focus:'Push',title:'Chest + Front Delts + Triceps',emoji:'🏋️',color:'#ff3b6b',exercises:['db-press','machine-press','cable-fly','ohp','dips']},
      {day:'Day 3',focus:'Legs',title:'Quads + Calves',emoji:'🦵',color:'#00bfff',exercises:['leg-press','leg-ext','calf-raise','lateral-raise']},
      {day:'Day 4',focus:'Arms + Hamstrings',title:'Hamstrings + Arms',emoji:'💪',color:'#ffd700',exercises:['rdl','ham-curl','barbell-curl','incline-curl','hammer-curl','tricep-pushdown','overhead-ext']},
    ]},
  5:{ days:5,label:'5 Day Split',subtitle:'High Frequency Power Program',description:'Five days for intermediate lifters wanting more volume and frequency.',badge:'Advanced',color:'#ffd700',
    schedule:[
      {day:'Day 1',focus:'Pull',title:'Back + Biceps',emoji:'💪',color:'#ff4500',exercises:['lat-pulldown','seated-row','pullup','barbell-curl','incline-curl','hammer-curl']},
      {day:'Day 2',focus:'Push',title:'Chest + Triceps',emoji:'🏋️',color:'#ff3b6b',exercises:['db-press','machine-press','cable-fly','dips','tricep-pushdown','overhead-ext']},
      {day:'Day 3',focus:'Legs',title:'Full Legs',emoji:'🦵',color:'#00bfff',exercises:['leg-press','leg-ext','ham-curl','rdl','calf-raise']},
      {day:'Day 4',focus:'Shoulders',title:'Full Shoulder Day',emoji:'🏛️',color:'#bf00ff',exercises:['ohp','lateral-raise','reverse-fly','facepull']},
      {day:'Day 5',focus:'Arms + Glutes',title:'Arms + Glutes',emoji:'💪',color:'#39ff14',exercises:['barbell-curl','hammer-curl','tricep-pushdown','hip-thrust','ham-curl','calf-raise']},
    ]},
  6:{ days:6,label:'6 Day Split',subtitle:'Elite PPL — Advanced Athletes Only',description:'The full PPL twice per week. Maximum volume and frequency for advanced lifters.',badge:'Elite',color:'#ff4500',
    schedule:[
      {day:'Day 1',focus:'Pull A',title:'Back + Rear Delts (Heavy)',emoji:'💪',color:'#ff4500',exercises:['lat-pulldown','seated-row','pullup','reverse-fly','barbell-curl']},
      {day:'Day 2',focus:'Push A',title:'Chest + Shoulders (Heavy)',emoji:'🏋️',color:'#ff3b6b',exercises:['db-press','machine-press','ohp','tricep-pushdown','dips']},
      {day:'Day 3',focus:'Legs A',title:'Quad-Dominant Legs',emoji:'🦵',color:'#00bfff',exercises:['leg-press','leg-ext','calf-raise','lateral-raise','hip-thrust']},
      {day:'Day 4',focus:'Pull B',title:'Back + Biceps (Volume)',emoji:'🔙',color:'#ffd700',exercises:['seated-row','facepull','incline-curl','hammer-curl','overhead-ext']},
      {day:'Day 5',focus:'Push B',title:'Chest + Arms (Volume)',emoji:'💥',color:'#bf00ff',exercises:['cable-fly','machine-press','barbell-curl','tricep-pushdown','ohp']},
      {day:'Day 6',focus:'Legs B',title:'Hamstring-Dominant Legs',emoji:'🦵',color:'#39ff14',exercises:['rdl','ham-curl','leg-ext','calf-raise','lateral-raise']},
    ]},
};

export const workoutData = workoutPlans[3].schedule.map(day=>({
  id:day.day.toLowerCase().replace(' ',''),day:day.day,title:day.title,emoji:day.emoji,color:day.color,
  description:`${day.focus} session targeting ${day.title}.`,
  exercises:day.exercises.map(id=>exerciseDB[id]).filter(Boolean)
}));

export const generalGuidelines = [
  {icon:'🎯',title:'Rep Range',text:'9–12 reps for all exercises — optimal for hypertrophy and strength'},
  {icon:'⏱️',title:'Rest Periods',text:'60–90 seconds between sets — enough recovery, not too much'},
  {icon:'🎨',title:'Controlled Tempo',text:'Maintain proper form and controlled tempo on every rep'},
  {icon:'🔥',title:'Train Hard',text:'Train close to failure for best muscle building results'},
];
