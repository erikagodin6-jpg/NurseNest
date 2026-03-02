import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play, Pause, Volume2, VolumeX, Repeat,
  HeartPulse, ChevronDown, ChevronUp, Stethoscope,
  HelpCircle, CheckCircle2, XCircle, Eye, EyeOff
} from "lucide-react";

interface HeartSoundConfig {
  id: string;
  name: string;
  category: "normal" | "extra" | "murmur" | "abnormal";
  timing: string;
  location: string;
  stethoscope: "bell" | "diaphragm" | "both";
  pitch: string;
  description: string;
  clinicalSignificance: string;
  commonCauses: string[];
  bpm: number;
  synthesize: (ctx: AudioContext, dest: AudioNode, bpm: number) => { stop: () => void };
}

function createNoise(ctx: AudioContext, duration: number): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  return source;
}

function playThud(ctx: AudioContext, dest: AudioNode, startTime: number, freq: number, attack: number, decay: number, gain: number) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, startTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, startTime + decay);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(200, startTime);
  filter.Q.setValueAtTime(1, startTime);
  g.gain.setValueAtTime(0, startTime);
  g.gain.linearRampToValueAtTime(gain, startTime + attack);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + decay);
  osc.connect(filter);
  filter.connect(g);
  g.connect(dest);
  osc.start(startTime);
  osc.stop(startTime + decay + 0.05);
}

function playClick(ctx: AudioContext, dest: AudioNode, startTime: number, freq: number, duration: number, gain: number) {
  const noise = createNoise(ctx, duration);
  const filter = ctx.createBiquadFilter();
  const g = ctx.createGain();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freq, startTime);
  filter.Q.setValueAtTime(5, startTime);
  g.gain.setValueAtTime(0, startTime);
  g.gain.linearRampToValueAtTime(gain, startTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  noise.connect(filter);
  filter.connect(g);
  g.connect(dest);
  noise.start(startTime);
  noise.stop(startTime + duration + 0.01);
}

function synthesizeNormalS1S2(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function schedule(time: number) {
    if (!running) return;
    playThud(ctx, dest, time, 80, 0.005, 0.08, 0.7);
    playClick(ctx, dest, time, 300, 0.04, 0.3);
    const s2Time = time + interval * 0.35;
    playThud(ctx, dest, s2Time, 120, 0.003, 0.06, 0.5);
    playClick(ctx, dest, s2Time, 400, 0.03, 0.25);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

function synthesizeS3(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function schedule(time: number) {
    if (!running) return;
    playThud(ctx, dest, time, 80, 0.005, 0.08, 0.7);
    playClick(ctx, dest, time, 300, 0.04, 0.3);
    const s2Time = time + interval * 0.35;
    playThud(ctx, dest, s2Time, 120, 0.003, 0.06, 0.5);
    playClick(ctx, dest, s2Time, 400, 0.03, 0.25);
    const s3Time = s2Time + 0.12;
    playThud(ctx, dest, s3Time, 50, 0.008, 0.1, 0.35);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

function synthesizeS4(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function schedule(time: number) {
    if (!running) return;
    const s4Time = time;
    playThud(ctx, dest, s4Time, 45, 0.008, 0.09, 0.3);
    const s1Time = time + 0.12;
    playThud(ctx, dest, s1Time, 80, 0.005, 0.08, 0.7);
    playClick(ctx, dest, s1Time, 300, 0.04, 0.3);
    const s2Time = s1Time + interval * 0.35;
    playThud(ctx, dest, s2Time, 120, 0.003, 0.06, 0.5);
    playClick(ctx, dest, s2Time, 400, 0.03, 0.25);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

function synthesizeSystolicMurmur(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function schedule(time: number) {
    if (!running) return;
    playThud(ctx, dest, time, 80, 0.005, 0.08, 0.6);
    playClick(ctx, dest, time, 300, 0.04, 0.25);
    const murmurStart = time + 0.06;
    const murmurDur = interval * 0.28;
    const noise = createNoise(ctx, murmurDur);
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(250, murmurStart);
    filter.Q.setValueAtTime(3, murmurStart);
    g.gain.setValueAtTime(0, murmurStart);
    g.gain.linearRampToValueAtTime(0.15, murmurStart + murmurDur * 0.3);
    g.gain.linearRampToValueAtTime(0.2, murmurStart + murmurDur * 0.5);
    g.gain.linearRampToValueAtTime(0.001, murmurStart + murmurDur);
    noise.connect(filter);
    filter.connect(g);
    g.connect(dest);
    noise.start(murmurStart);
    noise.stop(murmurStart + murmurDur + 0.01);
    const s2Time = time + interval * 0.35;
    playThud(ctx, dest, s2Time, 120, 0.003, 0.06, 0.5);
    playClick(ctx, dest, s2Time, 400, 0.03, 0.25);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

function synthesizeDiastolicMurmur(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function schedule(time: number) {
    if (!running) return;
    playThud(ctx, dest, time, 80, 0.005, 0.08, 0.65);
    playClick(ctx, dest, time, 300, 0.04, 0.3);
    const s2Time = time + interval * 0.35;
    playThud(ctx, dest, s2Time, 120, 0.003, 0.06, 0.5);
    playClick(ctx, dest, s2Time, 400, 0.03, 0.25);
    const murmurStart = s2Time + 0.04;
    const murmurDur = interval * 0.5;
    const noise = createNoise(ctx, murmurDur);
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(180, murmurStart);
    filter.Q.setValueAtTime(2, murmurStart);
    g.gain.setValueAtTime(0.001, murmurStart);
    g.gain.linearRampToValueAtTime(0.12, murmurStart + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, murmurStart + murmurDur);
    noise.connect(filter);
    filter.connect(g);
    g.connect(dest);
    noise.start(murmurStart);
    noise.stop(murmurStart + murmurDur + 0.01);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

function synthesizeFrictionRub(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function playRub(startTime: number, dur: number) {
    const noise = createNoise(ctx, dur);
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, startTime);
    filter.Q.setValueAtTime(8, startTime);
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(0.18, startTime + 0.01);
    g.gain.linearRampToValueAtTime(0.12, startTime + dur * 0.5);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
    noise.connect(filter);
    filter.connect(g);
    g.connect(dest);
    noise.start(startTime);
    noise.stop(startTime + dur + 0.01);
  }

  function schedule(time: number) {
    if (!running) return;
    playThud(ctx, dest, time, 80, 0.005, 0.08, 0.5);
    playRub(time + 0.03, 0.08);
    const s2Time = time + interval * 0.35;
    playThud(ctx, dest, s2Time, 120, 0.003, 0.06, 0.4);
    playRub(s2Time + 0.03, 0.06);
    playRub(time + interval * 0.6, 0.07);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

function synthesizeSplitS2(ctx: AudioContext, dest: AudioNode, bpm: number) {
  const interval = 60 / bpm;
  let running = true;
  let timeout: ReturnType<typeof setTimeout>;

  function schedule(time: number) {
    if (!running) return;
    playThud(ctx, dest, time, 80, 0.005, 0.08, 0.7);
    playClick(ctx, dest, time, 300, 0.04, 0.3);
    const s2aTime = time + interval * 0.35;
    playThud(ctx, dest, s2aTime, 130, 0.003, 0.05, 0.45);
    playClick(ctx, dest, s2aTime, 420, 0.025, 0.2);
    const s2pTime = s2aTime + 0.04;
    playThud(ctx, dest, s2pTime, 110, 0.003, 0.05, 0.4);
    playClick(ctx, dest, s2pTime, 380, 0.025, 0.18);
    timeout = setTimeout(() => {
      if (running) schedule(ctx.currentTime + 0.05);
    }, interval * 1000);
  }

  schedule(ctx.currentTime + 0.05);
  return { stop: () => { running = false; clearTimeout(timeout); } };
}

const HEART_SOUNDS: HeartSoundConfig[] = [
  {
    id: "normal-s1s2",
    name: "Normal S1 and S2",
    category: "normal",
    timing: "S1 at systole onset, S2 at diastole onset",
    location: "All cardiac areas",
    stethoscope: "diaphragm",
    pitch: "S1: low-pitched (lub), S2: higher-pitched (dub)",
    description: "S1 is produced by closure of the mitral and tricuspid valves (AV valves) at the beginning of systole. S2 is produced by closure of the aortic and pulmonic valves (semilunar valves) at the beginning of diastole. Together they create the classic 'lub-dub' pattern.",
    clinicalSignificance: "Normal finding. S1 is loudest at the apex (mitral area). S2 is loudest at the base (aortic area). Understanding normal sounds is essential for recognizing abnormalities.",
    commonCauses: ["Normal cardiac function"],
    bpm: 72,
    synthesize: synthesizeNormalS1S2,
  },
  {
    id: "s3-gallop",
    name: "S3 (Ventricular Gallop)",
    category: "extra",
    timing: "Early diastole, shortly after S2",
    location: "Mitral area (apex), left lateral decubitus position",
    stethoscope: "bell",
    pitch: "Low-pitched thud",
    description: "S3 occurs during the rapid passive filling phase of the ventricle in early diastole. It sounds like 'lub-dub-ta' or the word 'Kentucky' (ken-TUC-ky). In adults over 40, it typically indicates ventricular volume overload and reduced compliance.",
    clinicalSignificance: "Pathologic in adults over 40 - strongly associated with heart failure (volume overload). Can be physiologic in children, young adults, athletes, and during pregnancy.",
    commonCauses: ["Heart failure (systolic dysfunction)", "Mitral regurgitation", "Tricuspid regurgitation", "Physiologic in young adults and athletes"],
    bpm: 72,
    synthesize: synthesizeS3,
  },
  {
    id: "s4-gallop",
    name: "S4 (Atrial Gallop)",
    category: "extra",
    timing: "Late diastole, just before S1",
    location: "Mitral area (apex)",
    stethoscope: "bell",
    pitch: "Low-pitched thud",
    description: "S4 occurs during atrial contraction (atrial kick) against a stiff, non-compliant ventricle in late diastole. It sounds like 'ta-lub-dub' or the word 'Tennessee' (TEN-nes-see). It is always pathologic and indicates decreased ventricular compliance.",
    clinicalSignificance: "Always pathologic. Indicates ventricular hypertrophy or stiffening (diastolic dysfunction). Absent in atrial fibrillation since the atrial kick is lost.",
    commonCauses: ["Hypertension (left ventricular hypertrophy)", "Hypertrophic cardiomyopathy", "Aortic stenosis", "Acute myocardial infarction", "Coronary artery disease"],
    bpm: 72,
    synthesize: synthesizeS4,
  },
  {
    id: "systolic-murmur",
    name: "Systolic Murmur (Crescendo-Decrescendo)",
    category: "murmur",
    timing: "Between S1 and S2 (systole)",
    location: "Aortic area (2nd ICS right sternal border), radiates to carotids",
    stethoscope: "diaphragm",
    pitch: "Medium to high-pitched, harsh, diamond-shaped",
    description: "A crescendo-decrescendo (diamond-shaped) systolic murmur that begins after S1 and ends before S2. The intensity increases then decreases, creating a 'whooshing' sound. This is the classic pattern of aortic stenosis, where the valve fails to open fully.",
    clinicalSignificance: "Aortic stenosis murmur radiates to the carotids. Severity correlates with the timing of peak intensity - later peaking indicates more severe stenosis. Grade III or louder murmurs require echocardiographic evaluation.",
    commonCauses: ["Aortic stenosis (most common cause in elderly)", "Hypertrophic obstructive cardiomyopathy", "Pulmonic stenosis", "Innocent flow murmurs (grade I-II)"],
    bpm: 72,
    synthesize: synthesizeSystolicMurmur,
  },
  {
    id: "diastolic-murmur",
    name: "Diastolic Murmur (Decrescendo)",
    category: "murmur",
    timing: "After S2, during diastole",
    location: "Aortic area, left sternal border (Erb's point)",
    stethoscope: "diaphragm",
    pitch: "High-pitched, blowing, decrescendo",
    description: "A high-pitched, blowing decrescendo murmur heard best along the left sternal border with the patient sitting up and leaning forward. It begins immediately after S2 and fades. This pattern is classic for aortic regurgitation.",
    clinicalSignificance: "All diastolic murmurs are pathologic until proven otherwise. Must be reported immediately. Aortic regurgitation causes volume overload of the left ventricle and can lead to heart failure.",
    commonCauses: ["Aortic regurgitation (insufficiency)", "Mitral stenosis (low-pitched rumble)", "Pulmonic regurgitation"],
    bpm: 72,
    synthesize: synthesizeDiastolicMurmur,
  },
  {
    id: "pericardial-friction-rub",
    name: "Pericardial Friction Rub",
    category: "abnormal",
    timing: "Systole and diastole (triphasic: atrial systole, ventricular systole, ventricular diastole)",
    location: "Left sternal border, 3rd-4th ICS",
    stethoscope: "diaphragm",
    pitch: "High-pitched, scratchy, grating - like sandpaper",
    description: "A harsh, scratchy, grating sound caused by inflamed pericardial layers rubbing against each other. Classically has three components but may have one or two. Best heard with the patient sitting up and leaning forward. Unlike pleural rubs, it persists when the patient holds their breath.",
    clinicalSignificance: "Indicates pericarditis (inflammation of the pericardium). Key differentiator from pleural friction rub: pericardial rub continues when the patient holds their breath, while pleural rub stops.",
    commonCauses: ["Acute pericarditis (viral, bacterial, autoimmune)", "Post-MI (Dressler syndrome)", "Uremic pericarditis", "Post-cardiac surgery"],
    bpm: 80,
    synthesize: synthesizeFrictionRub,
  },
  {
    id: "split-s2",
    name: "Physiologic Split S2",
    category: "normal",
    timing: "S2 splits into A2 and P2 during inspiration",
    location: "Pulmonic area (2nd ICS left sternal border)",
    stethoscope: "diaphragm",
    pitch: "Two closely spaced high-pitched sounds during inspiration",
    description: "During inspiration, increased venous return to the right heart delays pulmonic valve closure (P2), while decreased return to the left heart slightly advances aortic valve closure (A2). This creates an audible split of S2 into two components during inspiration that merges back into a single sound during expiration.",
    clinicalSignificance: "Normal physiologic finding that varies with respiration. Fixed splitting (no change with respiration) suggests atrial septal defect. Paradoxical splitting (wider on expiration) suggests LBBB or severe aortic stenosis.",
    commonCauses: ["Normal physiologic response to inspiration", "Fixed split: Atrial septal defect", "Wide split: Right bundle branch block", "Paradoxical split: Left bundle branch block"],
    bpm: 72,
    synthesize: synthesizeSplitS2,
  },
];

const AUSCULTATION_AREAS = [
  { id: "aortic", label: "Aortic", shortLabel: "A", cx: 198, cy: 115, description: "2nd intercostal space, right sternal border" },
  { id: "pulmonic", label: "Pulmonic", shortLabel: "P", cx: 228, cy: 115, description: "2nd intercostal space, left sternal border" },
  { id: "erbs", label: "Erb's Point", shortLabel: "E", cx: 223, cy: 145, description: "3rd intercostal space, left sternal border" },
  { id: "tricuspid", label: "Tricuspid", shortLabel: "T", cx: 218, cy: 175, description: "4th intercostal space, left sternal border" },
  { id: "mitral", label: "Mitral (Apex)", shortLabel: "M", cx: 240, cy: 200, description: "5th intercostal space, left midclavicular line" },
];

function HeartDiagram({ selectedArea, onSelectArea }: { selectedArea: string | null; onSelectArea: (id: string) => void }) {
  return (
    <svg viewBox="0 0 430 300" className="w-full max-w-sm mx-auto" data-testid="svg-heart-areas">
      <path d="M160,55 Q140,60 120,90 Q100,130 100,180 Q100,230 110,260 Q115,280 140,290 L290,290 Q315,280 320,260 Q330,230 330,180 Q330,130 310,90 Q290,60 270,55 Q250,50 215,48 Q180,50 160,55Z" fill="#f5e6d3" stroke="#c4a882" strokeWidth="1.5" />
      <line x1="215" y1="55" x2="215" y2="280" stroke="#e2cdb5" strokeWidth="0.8" strokeDasharray="4,4" />
      <ellipse cx="190" cy="108" rx="4" ry="3" fill="#c4a882" opacity="0.5" />
      <ellipse cx="240" cy="108" rx="4" ry="3" fill="#c4a882" opacity="0.5" />
      <path d="M195,140 C195,120 210,110 215,110 C220,110 235,120 235,140 C235,165 215,185 215,185 C215,185 195,165 195,140Z" fill="#ef444420" stroke="#ef4444" strokeWidth="1" />
      {AUSCULTATION_AREAS.map(area => {
        const isSelected = selectedArea === area.id;
        return (
          <g key={area.id} onClick={() => onSelectArea(area.id)} style={{ cursor: "pointer" }} data-testid={`heart-area-${area.id}`}>
            <circle cx={area.cx} cy={area.cy} r={isSelected ? 14 : 11} fill={isSelected ? "#ef4444" : "#f87171"} opacity={isSelected ? 0.9 : 0.6} stroke={isSelected ? "#b91c1c" : "#ef4444"} strokeWidth={isSelected ? 2.5 : 1.5}>
              <animate attributeName="r" values={isSelected ? "14;16;14" : "11;11;11"} dur="2s" repeatCount="indefinite" />
            </circle>
            <text x={area.cx} y={area.cy + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" style={{ pointerEvents: "none" }}>{area.shortLabel}</text>
          </g>
        );
      })}
      <text x="215" y="295" textAnchor="middle" fontSize="11" fill="#6b7280" fontWeight="600">Cardiac Auscultation Areas</text>
    </svg>
  );
}

function HeartSoundCard({ sound, allSounds }: { sound: HeartSoundConfig; allSounds: HeartSoundConfig[] }) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<{ stop: () => void } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping] = useState(true);
  const [bpm, setBpm] = useState(sound.bpm);
  const [quizMode, setQuizMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const gainRef = useRef<GainNode | null>(null);

  const startPlayback = useCallback(() => {
    if (stopRef.current) {
      stopRef.current.stop();
      stopRef.current = null;
    }
    const ctx = audioCtxRef.current || new AudioContext();
    audioCtxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();
    const gain = ctx.createGain();
    gain.gain.value = isMuted ? 0 : volume;
    gain.connect(ctx.destination);
    gainRef.current = gain;
    const stopper = sound.synthesize(ctx, gain, bpm);
    stopRef.current = stopper;
    setIsPlaying(true);
  }, [sound, bpm, volume, isMuted]);

  const stopPlayback = useCallback(() => {
    if (stopRef.current) {
      stopRef.current.stop();
      stopRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    return () => {
      if (stopRef.current) stopRef.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stopPlayback();
      setTimeout(() => startPlayback(), 50);
    }
  }, [bpm]);

  const categoryColors: Record<string, string> = {
    normal: "bg-green-100 text-green-800 border-green-300",
    extra: "bg-amber-100 text-amber-800 border-amber-300",
    murmur: "bg-red-100 text-red-800 border-red-300",
    abnormal: "bg-purple-100 text-purple-800 border-purple-300",
  };

  const quizOptions = quizMode
    ? allSounds.filter(s => s.id !== sound.id).slice(0, 3).map(s => s.name).concat(sound.name).sort(() => Math.random() - 0.5)
    : [];

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid={`heart-sound-${sound.id}`}>
      <div className="flex items-start gap-3 mb-3">
        <HeartPulse className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          {quizMode && !showAnswer ? (
            <p className="font-medium text-gray-900" data-testid="text-quiz-prompt">
              <HelpCircle className="w-4 h-4 inline mr-1 text-amber-500" />
              Identify this heart sound
            </p>
          ) : (
            <>
              <p className="font-medium text-gray-900" data-testid={`text-sound-title-${sound.id}`}>{sound.name}</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[sound.category]}`}>
                  {sound.category === "normal" ? "Normal" : sound.category === "extra" ? "Extra Sound" : sound.category === "murmur" ? "Murmur" : "Abnormal"}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  {sound.stethoscope === "bell" ? "Bell" : sound.stethoscope === "diaphragm" ? "Diaphragm" : "Bell or Diaphragm"}
                </span>
              </div>
            </>
          )}
        </div>
        <Button
          variant="ghost" size="sm"
          onClick={() => { setQuizMode(!quizMode); setSelectedAnswer(null); setShowAnswer(false); }}
          className={`text-xs shrink-0 ${quizMode ? "text-amber-600 bg-amber-50" : "text-gray-500"}`}
          data-testid={`button-quiz-toggle-${sound.id}`}
        >
          {quizMode ? <Eye className="w-3.5 h-3.5 mr-1" /> : <EyeOff className="w-3.5 h-3.5 mr-1" />}
          {quizMode ? "Show" : "Test Me"}
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={togglePlay} data-testid={`button-play-${sound.id}`}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-gray-500 whitespace-nowrap">{bpm} BPM</span>
          <Slider
            value={[bpm]} min={50} max={120} step={1}
            onValueChange={(v) => setBpm(v[0])}
            className="flex-1"
            data-testid={`slider-bpm-${sound.id}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMuted(!isMuted)} data-testid={`button-mute-${sound.id}`}>
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]} min={0} max={1} step={0.05}
            onValueChange={(v) => { setVolume(v[0]); setIsMuted(v[0] === 0); }}
            className="w-16"
            data-testid={`slider-volume-${sound.id}`}
          />
        </div>
        <Button
          variant="ghost" size="sm"
          className="text-xs h-7 px-2 text-gray-500"
          onClick={() => setExpanded(!expanded)}
          data-testid={`button-details-${sound.id}`}
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5 mr-1" /> : <ChevronDown className="w-3.5 h-3.5 mr-1" />}
          Details
        </Button>
      </div>

      {expanded && !quizMode && (
        <div className="mt-3 pt-3 border-t space-y-2 text-sm" data-testid={`details-${sound.id}`}>
          <div><span className="font-semibold text-gray-700">Timing:</span> <span className="text-gray-600">{sound.timing}</span></div>
          <div><span className="font-semibold text-gray-700">Location:</span> <span className="text-gray-600">{sound.location}</span></div>
          <div><span className="font-semibold text-gray-700">Pitch:</span> <span className="text-gray-600">{sound.pitch}</span></div>
          <p className="text-gray-600">{sound.description}</p>
          <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-800 mb-1">Clinical Significance</p>
            <p className="text-xs text-blue-700">{sound.clinicalSignificance}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1">Common Causes</p>
            <ul className="text-xs text-gray-600 space-y-0.5">
              {sound.commonCauses.map((c, i) => <li key={i} className="flex items-start gap-1"><span className="text-gray-400 mt-px">-</span>{c}</li>)}
            </ul>
          </div>
        </div>
      )}

      {quizMode && (
        <div className="mt-3 pt-3 border-t space-y-2" data-testid={`quiz-options-${sound.id}`}>
          {quizOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => { setSelectedAnswer(opt); setShowAnswer(true); }}
              disabled={showAnswer}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                showAnswer && opt === sound.name ? "bg-green-100 text-green-800 border border-green-300" :
                showAnswer && opt === selectedAnswer && opt !== sound.name ? "bg-red-100 text-red-800 border border-red-300" :
                selectedAnswer === opt ? "bg-primary/10 border border-primary/30" :
                "bg-gray-50 hover:bg-gray-100 border border-transparent"
              }`}
              data-testid={`button-quiz-option-${sound.id}-${i}`}
            >
              {showAnswer && opt === sound.name && <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-600" />}
              {showAnswer && opt === selectedAnswer && opt !== sound.name && <XCircle className="w-4 h-4 inline mr-2 text-red-600" />}
              {opt}
            </button>
          ))}
          {showAnswer && (
            <p className="text-xs text-gray-500 mt-2 italic">
              {selectedAnswer === sound.name ? "Correct!" : `The correct answer is: ${sound.name}`}
              {" "}{sound.clinicalSignificance.split(".")[0]}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function HeartSoundsLibrary() {
  const [expanded, setExpanded] = useState(true);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredSounds = activeFilter === "all"
    ? HEART_SOUNDS
    : HEART_SOUNDS.filter(s => s.category === activeFilter);

  const selectedAreaInfo = AUSCULTATION_AREAS.find(a => a.id === selectedArea);

  return (
    <div className="space-y-6" data-testid="section-heart-sounds-library">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left"
        data-testid="button-toggle-heart-sounds"
      >
        <HeartPulse className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900 flex-1">Heart Sounds Audio Practice</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{HEART_SOUNDS.length} sounds</span>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {expanded && (
        <>
          <Card className="border-red-200 bg-gradient-to-b from-red-50/50 to-white">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-gray-900">Cardiac Auscultation Landmarks</h4>
              </div>
              <p className="text-sm text-gray-500">Tap a landmark to learn the valve area and what you should listen for at that location. Remember: APE-TM (Aortic, Pulmonic, Erb's, Tricuspid, Mitral).</p>
              <div className="grid md:grid-cols-2 gap-4 items-start">
                <HeartDiagram selectedArea={selectedArea} onSelectArea={(id) => setSelectedArea(selectedArea === id ? null : id)} />
                <div className="space-y-3">
                  {selectedAreaInfo ? (
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-2" data-testid={`panel-area-${selectedAreaInfo.id}`}>
                      <h4 className="font-bold text-red-900">{selectedAreaInfo.label}</h4>
                      <p className="text-sm text-gray-700">{selectedAreaInfo.description}</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                      <p className="text-sm text-gray-500">Select an area on the diagram to view details</p>
                      <div className="mt-3 text-xs text-gray-400 space-y-1">
                        <p><strong>A</strong> = Aortic (2nd ICS, right)</p>
                        <p><strong>P</strong> = Pulmonic (2nd ICS, left)</p>
                        <p><strong>E</strong> = Erb's Point (3rd ICS, left)</p>
                        <p><strong>T</strong> = Tricuspid (4th ICS, left)</p>
                        <p><strong>M</strong> = Mitral/Apex (5th ICS, MCL)</p>
                      </div>
                    </div>
                  )}
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-xs font-semibold text-amber-800 mb-1">Auscultation Tips</p>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>- Use the diaphragm for high-pitched sounds (S1, S2, murmurs)</li>
                      <li>- Use the bell for low-pitched sounds (S3, S4)</li>
                      <li>- Auscultate in a quiet environment</li>
                      <li>- Listen to at least 5-10 cardiac cycles at each area</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 flex-wrap" data-testid="filter-heart-sounds">
            {[
              { id: "all", label: "All Sounds" },
              { id: "normal", label: "Normal" },
              { id: "extra", label: "Extra Sounds" },
              { id: "murmur", label: "Murmurs" },
              { id: "abnormal", label: "Abnormal" },
            ].map(f => (
              <Button
                key={f.id}
                variant={activeFilter === f.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(f.id)}
                className="text-xs"
                data-testid={`button-filter-${f.id}`}
              >
                {f.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2" data-testid="grid-heart-sounds">
            {filteredSounds.map(sound => (
              <HeartSoundCard key={sound.id} sound={sound} allSounds={HEART_SOUNDS} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
