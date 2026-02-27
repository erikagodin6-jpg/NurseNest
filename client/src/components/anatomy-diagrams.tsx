import type { LabelPoint } from "./interactive-learning";

export function HeartSVG() {
  return (
    <g>
      <defs>
        <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(0, 70%, 85%)" />
          <stop offset="100%" stopColor="hsl(0, 60%, 75%)" />
        </linearGradient>
        <linearGradient id="veinGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(220, 60%, 75%)" />
          <stop offset="100%" stopColor="hsl(220, 50%, 82%)" />
        </linearGradient>
        <linearGradient id="arteryGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(0, 65%, 70%)" />
          <stop offset="100%" stopColor="hsl(0, 55%, 78%)" />
        </linearGradient>
      </defs>
      <path d="M200,340 C200,340 80,280 70,200 C60,130 100,80 150,80 C180,80 200,100 210,120 L250,60 C260,40 300,30 330,50 C370,80 380,130 380,180 C380,260 250,340 250,340 Z" fill="url(#heartGrad)" stroke="hsl(0,40%,60%)" strokeWidth="2" opacity="0.9" />
      <line x1="225" y1="80" x2="225" y2="340" stroke="hsl(0,40%,60%)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
      <path d="M130,110 C130,110 130,80 160,80 C180,80 190,95 200,110 Z" fill="hsl(220, 55%, 80%)" stroke="hsl(220,40%,60%)" strokeWidth="1.5" />
      <path d="M255,80 C265,65 290,55 310,65 C340,80 350,110 340,140 L320,180 Z" fill="hsl(0, 60%, 78%)" stroke="hsl(0,40%,60%)" strokeWidth="1.5" />
      <path d="M140,180 L140,220 L200,220 L200,180 Z" fill="hsl(220, 55%, 82%)" stroke="hsl(220,40%,60%)" strokeWidth="1" opacity="0.8" />
      <path d="M250,180 L250,220 L320,220 L320,180 Z" fill="hsl(0, 60%, 80%)" stroke="hsl(0,40%,60%)" strokeWidth="1" opacity="0.8" />
      <path d="M140,240 L140,310 L200,310 L200,240 Z" fill="hsl(220, 55%, 78%)" stroke="hsl(220,40%,55%)" strokeWidth="1" opacity="0.8" />
      <path d="M250,240 L250,310 L320,310 L320,240 Z" fill="hsl(0, 55%, 75%)" stroke="hsl(0,40%,55%)" strokeWidth="1" opacity="0.8" />
      <path d="M150,50 C140,30 160,15 175,25 L180,80" fill="none" stroke="hsl(220,50%,70%)" strokeWidth="8" strokeLinecap="round" />
      <path d="M280,50 C280,25 320,15 330,30 L340,60" fill="none" stroke="hsl(0,50%,70%)" strokeWidth="8" strokeLinecap="round" />
      <path d="M230,45 L230,15 C230,8 240,5 250,8 L270,20" fill="none" stroke="hsl(0,55%,68%)" strokeWidth="10" strokeLinecap="round" />
      <ellipse cx="190" cy="225" rx="15" ry="8" fill="hsl(0,50%,65%)" opacity="0.7" />
      <ellipse cx="270" cy="225" rx="15" ry="8" fill="hsl(0,50%,65%)" opacity="0.7" />
    </g>
  );
}

export const heartLabels: LabelPoint[] = [
  { id: "ra", x: 165, y: 195, label: "Right Atrium", hint: "Receives deoxygenated blood from the body" },
  { id: "la", x: 285, y: 195, label: "Left Atrium", hint: "Receives oxygenated blood from the lungs" },
  { id: "rv", x: 165, y: 275, label: "Right Ventricle", hint: "Pumps blood to the pulmonary artery" },
  { id: "lv", x: 285, y: 275, label: "Left Ventricle", hint: "Pumps oxygenated blood to the aorta" },
  { id: "aorta", x: 245, y: 25, label: "Aorta", hint: "Largest artery: carries oxygenated blood" },
  { id: "svc", x: 155, y: 40, label: "Superior Vena Cava", hint: "Returns blood from upper body" },
  { id: "pa", x: 310, y: 45, label: "Pulmonary Artery", hint: "Carries deoxygenated blood to lungs" },
  { id: "mv", x: 190, y: 225, label: "Tricuspid Valve" },
  { id: "tv", x: 270, y: 225, label: "Mitral Valve" },
];

export function LungsSVG() {
  return (
    <g>
      <defs>
        <linearGradient id="lungGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(340, 50%, 88%)" />
          <stop offset="100%" stopColor="hsl(340, 45%, 80%)" />
        </linearGradient>
      </defs>
      <rect x="220" y="40" width="60" height="120" rx="8" fill="hsl(340,30%,85%)" stroke="hsl(340,30%,65%)" strokeWidth="1.5" />
      <path d="M250,40 L250,20 C250,15 245,10 240,10 L260,10 C255,10 250,15 250,20" fill="none" stroke="hsl(340,30%,65%)" strokeWidth="3" />
      <ellipse cx="240" cy="20" rx="6" ry="4" fill="hsl(340,25%,80%)" stroke="hsl(340,30%,65%)" strokeWidth="1" />
      <ellipse cx="260" cy="20" rx="6" ry="4" fill="hsl(340,25%,80%)" stroke="hsl(340,30%,65%)" strokeWidth="1" />
      <path d="M220,80 C220,80 60,60 50,180 C40,280 100,340 160,340 C200,340 220,310 220,280 Z" fill="url(#lungGrad)" stroke="hsl(340,35%,65%)" strokeWidth="2" />
      <path d="M280,80 C280,80 440,60 450,180 C460,280 400,340 340,340 C300,340 280,310 280,280 Z" fill="url(#lungGrad)" stroke="hsl(340,35%,65%)" strokeWidth="2" />
      <path d="M220,100 C200,110 120,100 100,160" fill="none" stroke="hsl(340,30%,70%)" strokeWidth="2" opacity="0.6" />
      <path d="M220,130 C200,140 140,140 130,190" fill="none" stroke="hsl(340,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <path d="M220,160 C200,170 150,180 145,230" fill="none" stroke="hsl(340,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <path d="M280,100 C300,110 380,100 400,160" fill="none" stroke="hsl(340,30%,70%)" strokeWidth="2" opacity="0.6" />
      <path d="M280,130 C300,140 360,140 370,190" fill="none" stroke="hsl(340,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <path d="M280,160 C300,170 350,180 355,230" fill="none" stroke="hsl(340,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="85" cy="200" r="15" fill="hsl(340,40%,85%)" stroke="hsl(340,30%,70%)" strokeWidth="1" opacity="0.4" />
      <circle cx="120" cy="260" r="12" fill="hsl(340,40%,85%)" stroke="hsl(340,30%,70%)" strokeWidth="1" opacity="0.4" />
      <circle cx="415" cy="200" r="15" fill="hsl(340,40%,85%)" stroke="hsl(340,30%,70%)" strokeWidth="1" opacity="0.4" />
      <circle cx="380" cy="260" r="12" fill="hsl(340,40%,85%)" stroke="hsl(340,30%,70%)" strokeWidth="1" opacity="0.4" />
      <ellipse cx="250" cy="320" rx="30" ry="15" fill="hsl(340,25%,80%)" stroke="hsl(340,30%,65%)" strokeWidth="1.5" opacity="0.6" />
    </g>
  );
}

export const lungLabels: LabelPoint[] = [
  { id: "trachea", x: 250, y: 30, label: "Trachea", hint: "Main airway connecting larynx to bronchi" },
  { id: "rbronchus", x: 180, y: 100, label: "Right Bronchus", hint: "Wider and more vertical than the left" },
  { id: "lbronchus", x: 320, y: 100, label: "Left Bronchus", hint: "Longer and more horizontal" },
  { id: "rlung", x: 130, y: 200, label: "Right Lung", hint: "Has 3 lobes" },
  { id: "llung", x: 370, y: 200, label: "Left Lung", hint: "Has 2 lobes (cardiac notch)" },
  { id: "alveoli-r", x: 85, y: 200, label: "Alveoli", hint: "Site of gas exchange" },
  { id: "diaphragm", x: 250, y: 320, label: "Diaphragm", hint: "Primary muscle of respiration" },
  { id: "carina", x: 250, y: 75, label: "Carina", hint: "Where trachea bifurcates" },
];

export function BrainSVG() {
  return (
    <g>
      <defs>
        <linearGradient id="brainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(270, 50%, 88%)" />
          <stop offset="100%" stopColor="hsl(270, 40%, 80%)" />
        </linearGradient>
      </defs>
      <ellipse cx="230" cy="180" rx="180" ry="150" fill="url(#brainGrad)" stroke="hsl(270,35%,65%)" strokeWidth="2" />
      <path d="M140,80 C120,100 100,140 100,180 C100,220 115,260 140,290" fill="none" stroke="hsl(270,30%,70%)" strokeWidth="2" opacity="0.6" />
      <path d="M200,60 C180,80 170,120 170,160" fill="none" stroke="hsl(270,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <path d="M270,55 C280,80 280,130 275,170" fill="none" stroke="hsl(270,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <path d="M330,80 C340,110 350,150 345,200" fill="none" stroke="hsl(270,30%,70%)" strokeWidth="1.5" opacity="0.5" />
      <path d="M50,180 L410,180" stroke="hsl(270,25%,72%)" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
      <path d="M230,30 L230,330" stroke="hsl(270,25%,72%)" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
      <path d="M230,290 C230,310 210,340 190,350 C170,355 160,350 155,340 C150,330 155,310 165,300" fill="hsl(270,35%,82%)" stroke="hsl(270,30%,65%)" strokeWidth="1.5" />
      <ellipse cx="230" cy="350" rx="35" ry="18" fill="hsl(270,30%,85%)" stroke="hsl(270,30%,65%)" strokeWidth="1.5" />
      <path d="M230,368 L230,395" stroke="hsl(270,30%,65%)" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

export const brainLabels: LabelPoint[] = [
  { id: "frontal", x: 140, y: 120, label: "Frontal Lobe", hint: "Reasoning, planning, motor function" },
  { id: "parietal", x: 280, y: 110, label: "Parietal Lobe", hint: "Sensory processing, spatial awareness" },
  { id: "temporal", x: 120, y: 230, label: "Temporal Lobe", hint: "Hearing, memory, language" },
  { id: "occipital", x: 350, y: 200, label: "Occipital Lobe", hint: "Visual processing" },
  { id: "cerebellum", x: 190, y: 340, label: "Cerebellum", hint: "Coordination and balance" },
  { id: "brainstem", x: 230, y: 380, label: "Brainstem", hint: "Vital functions: breathing, heart rate" },
];

export function KidneySVG() {
  return (
    <g>
      <defs>
        <linearGradient id="kidneyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(15, 55%, 82%)" />
          <stop offset="100%" stopColor="hsl(15, 45%, 72%)" />
        </linearGradient>
      </defs>
      <path d="M180,60 C120,60 70,120 70,200 C70,280 120,340 180,340 C200,340 210,320 210,300 C210,260 195,230 195,200 C195,170 210,140 210,100 C210,80 200,60 180,60 Z" fill="url(#kidneyGrad)" stroke="hsl(15,35%,55%)" strokeWidth="2" />
      <path d="M320,60 C380,60 430,120 430,200 C430,280 380,340 320,340 C300,340 290,320 290,300 C290,260 305,230 305,200 C305,170 290,140 290,100 C290,80 300,60 320,60 Z" fill="url(#kidneyGrad)" stroke="hsl(15,35%,55%)" strokeWidth="2" />
      <ellipse cx="200" cy="200" rx="15" ry="40" fill="hsl(15,40%,88%)" stroke="hsl(15,30%,60%)" strokeWidth="1" />
      <ellipse cx="300" cy="200" rx="15" ry="40" fill="hsl(15,40%,88%)" stroke="hsl(15,30%,60%)" strokeWidth="1" />
      <path d="M200,170 L250,140 L250,130" fill="none" stroke="hsl(0,50%,65%)" strokeWidth="3" />
      <path d="M300,170 L250,140" fill="none" stroke="hsl(0,50%,65%)" strokeWidth="3" />
      <path d="M200,230 L220,250 L220,350" fill="none" stroke="hsl(40,50%,65%)" strokeWidth="4" strokeLinecap="round" />
      <path d="M300,230 L280,250 L280,350" fill="none" stroke="hsl(40,50%,65%)" strokeWidth="4" strokeLinecap="round" />
      <path d="M220,350 L250,360 L280,350" fill="none" stroke="hsl(40,50%,65%)" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="250" cy="375" rx="35" ry="20" fill="hsl(40,40%,85%)" stroke="hsl(40,35%,60%)" strokeWidth="1.5" />
      <path d="M250,130 L250,60" fill="none" stroke="hsl(0,50%,65%)" strokeWidth="4" />
      <path d="M240,60 L260,60" stroke="hsl(0,50%,65%)" strokeWidth="3" />
    </g>
  );
}

export const kidneyLabels: LabelPoint[] = [
  { id: "lcortex", x: 130, y: 170, label: "Renal Cortex", hint: "Contains glomeruli for filtration" },
  { id: "lmedulla", x: 160, y: 260, label: "Renal Medulla", hint: "Contains loops of Henle" },
  { id: "lpelvis", x: 200, y: 200, label: "Renal Pelvis", hint: "Collects urine from calyces" },
  { id: "lureter", x: 220, y: 300, label: "Ureter", hint: "Transports urine to bladder" },
  { id: "renal-artery", x: 250, y: 100, label: "Renal Artery", hint: "Supplies blood for filtration" },
  { id: "bladder", x: 250, y: 375, label: "Bladder", hint: "Stores urine" },
  { id: "rcortex", x: 375, y: 170, label: "Right Kidney" },
];

export function DigestiveSVG() {
  return (
    <g>
      <defs>
        <linearGradient id="giGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(30, 55%, 85%)" />
          <stop offset="100%" stopColor="hsl(30, 45%, 75%)" />
        </linearGradient>
      </defs>
      <path d="M230,20 L230,60 C230,70 240,80 250,80 C260,80 270,70 270,60 L270,20" fill="none" stroke="hsl(30,40%,60%)" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="250" cy="120" rx="60" ry="40" fill="url(#giGrad)" stroke="hsl(30,35%,55%)" strokeWidth="2" />
      <path d="M250,160 C250,170 240,175 240,185 C240,195 260,195 260,185 C260,175 250,170 250,160" fill="hsl(30,50%,80%)" stroke="hsl(30,35%,55%)" strokeWidth="1.5" />
      <path d="M250,195 C220,210 200,230 180,250 C160,270 180,280 200,270 C220,260 240,250 260,260 C280,270 300,280 320,270 C340,260 340,240 320,230 C300,220 280,210 260,220 C240,230 220,250 200,260" fill="none" stroke="hsl(30,40%,65%)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M200,260 C180,280 170,300 180,320 C190,340 210,330 230,340 C250,350 240,370 250,380" fill="none" stroke="hsl(30,40%,65%)" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <path d="M350,100 C370,110 380,130 375,150 C370,170 350,175 340,160" fill="hsl(20,45%,78%)" stroke="hsl(20,35%,55%)" strokeWidth="1.5" />
      <ellipse cx="150" cy="160" rx="30" ry="45" fill="hsl(30,30%,82%)" stroke="hsl(30,30%,58%)" strokeWidth="1.5" />
      <path d="M320,180 C340,190 360,200 370,220 C380,250 360,260 340,240" fill="hsl(35,40%,80%)" stroke="hsl(35,30%,58%)" strokeWidth="1.5" />
    </g>
  );
}

export const digestiveLabels: LabelPoint[] = [
  { id: "esophagus", x: 250, y: 45, label: "Esophagus", hint: "Transports food via peristalsis" },
  { id: "stomach", x: 250, y: 120, label: "Stomach", hint: "Mechanical & chemical digestion" },
  { id: "duodenum", x: 250, y: 190, label: "Duodenum", hint: "First part of small intestine" },
  { id: "smallintestine", x: 260, y: 250, label: "Small Intestine", hint: "Primary site of nutrient absorption" },
  { id: "liver", x: 355, y: 130, label: "Liver", hint: "Metabolism, detox, bile production" },
  { id: "spleen", x: 150, y: 155, label: "Spleen" },
  { id: "pancreas", x: 350, y: 220, label: "Pancreas", hint: "Produces insulin and digestive enzymes" },
  { id: "colon", x: 210, y: 330, label: "Large Intestine", hint: "Water absorption, fecal formation" },
];

export function EndocrineSVG() {
  return (
    <g>
      <defs>
        <linearGradient id="endoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(180, 45%, 85%)" />
          <stop offset="100%" stopColor="hsl(180, 35%, 75%)" />
        </linearGradient>
      </defs>
      <ellipse cx="250" cy="50" rx="100" ry="35" fill="none" stroke="hsl(270,30%,75%)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      <ellipse cx="250" cy="50" rx="12" ry="8" fill="hsl(270,45%,80%)" stroke="hsl(270,35%,60%)" strokeWidth="1.5" />
      <ellipse cx="215" cy="50" rx="8" ry="6" fill="hsl(270,40%,85%)" stroke="hsl(270,30%,65%)" strokeWidth="1" />
      <ellipse cx="285" cy="50" rx="8" ry="6" fill="hsl(270,40%,85%)" stroke="hsl(270,30%,65%)" strokeWidth="1" />
      <path d="M230,110 C230,100 240,95 250,95 C260,95 270,100 270,110 L275,130 C275,140 260,145 250,145 C240,145 225,140 225,130 Z" fill="hsl(180,40%,82%)" stroke="hsl(180,35%,58%)" strokeWidth="1.5" />
      <ellipse cx="230" cy="130" rx="15" ry="10" fill="hsl(180,35%,78%)" stroke="hsl(180,30%,55%)" strokeWidth="1" />
      <ellipse cx="270" cy="130" rx="15" ry="10" fill="hsl(180,35%,78%)" stroke="hsl(180,30%,55%)" strokeWidth="1" />
      <ellipse cx="250" cy="200" rx="8" ry="6" fill="hsl(45,50%,80%)" stroke="hsl(45,40%,55%)" strokeWidth="1.5" />
      <ellipse cx="200" cy="260" rx="25" ry="20" fill="url(#endoGrad)" stroke="hsl(180,30%,55%)" strokeWidth="1.5" />
      <ellipse cx="300" cy="260" rx="25" ry="20" fill="url(#endoGrad)" stroke="hsl(180,30%,55%)" strokeWidth="1.5" />
      <ellipse cx="250" cy="310" rx="35" ry="18" fill="hsl(30,40%,82%)" stroke="hsl(30,30%,55%)" strokeWidth="1.5" />
      <ellipse cx="220" cy="370" rx="18" ry="15" fill="hsl(15,45%,80%)" stroke="hsl(15,35%,55%)" strokeWidth="1.5" />
      <ellipse cx="280" cy="370" rx="18" ry="15" fill="hsl(15,45%,80%)" stroke="hsl(15,35%,55%)" strokeWidth="1.5" />
      <line x1="250" y1="60" x2="250" y2="90" stroke="hsl(270,25%,75%)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      <line x1="250" y1="145" x2="250" y2="195" stroke="hsl(180,25%,75%)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      <line x1="250" y1="210" x2="250" y2="250" stroke="hsl(45,25%,75%)" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
    </g>
  );
}

export const endocrineLabels: LabelPoint[] = [
  { id: "hypothalamus", x: 215, y: 50, label: "Hypothalamus", hint: "Master regulator of hormones" },
  { id: "pituitary", x: 250, y: 50, label: "Pituitary", hint: "Releases TSH, ACTH, ADH, FSH, LH, GH" },
  { id: "pineal", x: 285, y: 50, label: "Pineal Gland", hint: "Produces melatonin" },
  { id: "thyroid", x: 250, y: 115, label: "Thyroid", hint: "T3/T4: controls metabolic rate" },
  { id: "parathyroid", x: 270, y: 135, label: "Parathyroid", hint: "PTH: regulates calcium" },
  { id: "thymus", x: 250, y: 200, label: "Thymus", hint: "T-cell maturation" },
  { id: "adrenal-l", x: 200, y: 260, label: "Adrenal Gland", hint: "Cortisol, aldosterone, epinephrine" },
  { id: "pancreas-endo", x: 250, y: 310, label: "Pancreas", hint: "Insulin & glucagon" },
  { id: "gonad-l", x: 220, y: 370, label: "Gonads", hint: "Estrogen/testosterone production" },
];

export function CellSVG() {
  return (
    <g>
      <defs>
        <radialGradient id="cellCytoGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#e8f4f8" />
          <stop offset="40%" stopColor="#d4ecf4" />
          <stop offset="100%" stopColor="#b8dce8" />
        </radialGradient>
        <radialGradient id="cellNucGrad" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#c5b3e6" />
          <stop offset="60%" stopColor="#9b82c7" />
          <stop offset="100%" stopColor="#7a5fb0" />
        </radialGradient>
        <radialGradient id="cellNucleolusGrad" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#8b6db5" />
          <stop offset="100%" stopColor="#5e3d8f" />
        </radialGradient>
        <linearGradient id="cellMitoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a8d8a0" />
          <stop offset="50%" stopColor="#7bc46e" />
          <stop offset="100%" stopColor="#5aad4e" />
        </linearGradient>
        <linearGradient id="cellGolgiGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d89a" />
          <stop offset="100%" stopColor="#e6b84d" />
        </linearGradient>
        <linearGradient id="cellRERGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a0c4e8" />
          <stop offset="100%" stopColor="#7badd4" />
        </linearGradient>
        <linearGradient id="cellSERGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8d4ec" />
          <stop offset="100%" stopColor="#94bfdd" />
        </linearGradient>
        <radialGradient id="cellLysoGrad" cx="40%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#f0a8a8" />
          <stop offset="100%" stopColor="#d46a6a" />
        </radialGradient>
        <radialGradient id="cellVesicleGrad" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#f5e0b0" />
          <stop offset="100%" stopColor="#dbc07a" />
        </radialGradient>
        <radialGradient id="cellPeroxGrad" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#c8e0b0" />
          <stop offset="100%" stopColor="#8fba6e" />
        </radialGradient>
        <radialGradient id="cellCentrioleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4b8e0" />
          <stop offset="100%" stopColor="#a88cc0" />
        </radialGradient>
        <pattern id="membranePattern" x="0" y="0" width="14" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <rect width="14" height="30" fill="#b8dce8" />
          <circle cx="7" cy="5" r="3.5" fill="#5a9ab5" opacity="0.7" />
          <line x1="7" y1="8" x2="7" y2="16" stroke="#5a9ab5" strokeWidth="1.2" opacity="0.5" />
          <circle cx="7" cy="25" r="3.5" fill="#5a9ab5" opacity="0.7" />
          <line x1="7" y1="22" x2="7" y2="14" stroke="#5a9ab5" strokeWidth="1.2" opacity="0.5" />
        </pattern>
      </defs>

      <ellipse cx="250" cy="200" rx="210" ry="170" fill="url(#cellCytoGrad)" stroke="none" />
      <ellipse cx="250" cy="200" rx="210" ry="170" fill="url(#membranePattern)" opacity="0.15" />
      <ellipse cx="250" cy="200" rx="210" ry="170" fill="none" stroke="#4a8ea8" strokeWidth="5" />
      <ellipse cx="250" cy="200" rx="207" ry="167" fill="none" stroke="#6bacc4" strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="250" cy="200" rx="213" ry="173" fill="none" stroke="#3a7e98" strokeWidth="1.5" opacity="0.4" />

      <ellipse cx="250" cy="185" rx="68" ry="58" fill="url(#cellNucGrad)" stroke="#5e3d8f" strokeWidth="2" />
      <ellipse cx="250" cy="185" rx="68" ry="58" fill="none" stroke="#7a5fb0" strokeWidth="1" strokeDasharray="3,4" opacity="0.5" />
      <path d="M195,175 Q210,165 230,170 Q245,175 260,168 Q280,160 300,172 Q310,178 305,185" fill="none" stroke="#5e3d8f" strokeWidth="0.8" opacity="0.4" />
      <path d="M200,195 Q220,188 240,192 Q260,196 280,190 Q295,185 310,192" fill="none" stroke="#5e3d8f" strokeWidth="0.8" opacity="0.4" />
      <path d="M210,205 Q230,210 250,205 Q270,200 290,207" fill="none" stroke="#5e3d8f" strokeWidth="0.6" opacity="0.3" />
      <ellipse cx="255" cy="182" rx="18" ry="15" fill="url(#cellNucleolusGrad)" stroke="#4a2d78" strokeWidth="1.5" />
      <ellipse cx="258" cy="179" rx="6" ry="5" fill="#7a5fb0" opacity="0.4" />

      <g transform="translate(120,110) rotate(-25)">
        <ellipse cx="30" cy="15" rx="30" ry="15" fill="url(#cellMitoGrad)" stroke="#3d8a35" strokeWidth="1.5" />
        <path d="M8,15 L15,5 L15,25 L22,8 L22,22 L30,5 L30,25 L38,8 L38,22 L45,10 L48,15" fill="none" stroke="#2d6a28" strokeWidth="1.2" opacity="0.6" />
        <ellipse cx="30" cy="15" rx="30" ry="15" fill="none" stroke="#4a9a42" strokeWidth="0.5" />
      </g>
      <g transform="translate(340,240) rotate(15)">
        <ellipse cx="28" cy="13" rx="28" ry="13" fill="url(#cellMitoGrad)" stroke="#3d8a35" strokeWidth="1.5" />
        <path d="M6,13 L12,4 L12,22 L20,6 L20,20 L28,4 L28,22 L36,6 L36,20 L42,8 L46,13" fill="none" stroke="#2d6a28" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g transform="translate(150,280) rotate(40)">
        <ellipse cx="22" cy="10" rx="22" ry="10" fill="url(#cellMitoGrad)" stroke="#3d8a35" strokeWidth="1.2" />
        <path d="M5,10 L10,3 L10,17 L17,4 L17,16 L24,3 L24,17 L31,5 L35,10" fill="none" stroke="#2d6a28" strokeWidth="1" opacity="0.5" />
      </g>

      <g transform="translate(310,125)">
        <path d="M0,0 C15,-5 35,-5 50,0 C55,2 55,8 50,10 C35,15 15,15 0,10 C-5,8 -5,2 0,0 Z" fill="url(#cellRERGrad)" stroke="#5a8aad" strokeWidth="1.2" />
        <path d="M0,16 C15,11 35,11 50,16 C55,18 55,24 50,26 C35,31 15,31 0,26 C-5,24 -5,18 0,16 Z" fill="url(#cellRERGrad)" stroke="#5a8aad" strokeWidth="1.2" />
        <path d="M0,32 C15,27 35,27 50,32 C55,34 55,40 50,42 C35,47 15,47 0,42 C-5,40 -5,34 0,32 Z" fill="url(#cellRERGrad)" stroke="#5a8aad" strokeWidth="1.2" />
        <circle cx="5" cy="3" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="15" cy="1" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="25" cy="3" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="35" cy="1" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="45" cy="3" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="8" cy="19" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="18" cy="17" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="28" cy="19" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="38" cy="17" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="48" cy="19" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="5" cy="35" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="15" cy="33" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="25" cy="35" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="35" cy="33" r="1.5" fill="#3a6a8a" opacity="0.7" />
        <circle cx="45" cy="35" r="1.5" fill="#3a6a8a" opacity="0.7" />
      </g>

      <g transform="translate(370,165)">
        <path d="M0,0 C20,-3 40,3 50,0 C52,8 48,14 40,16 C20,20 5,15 0,10 Z" fill="url(#cellSERGrad)" stroke="#6a9ab8" strokeWidth="1" />
        <path d="M5,20 C25,17 42,22 52,18 C54,26 48,32 38,34 C18,38 3,33 0,28 Z" fill="url(#cellSERGrad)" stroke="#6a9ab8" strokeWidth="1" />
        <path d="M8,38 C28,35 45,40 55,36 C57,44 50,50 40,52 C20,56 5,51 2,46 Z" fill="url(#cellSERGrad)" stroke="#6a9ab8" strokeWidth="1" />
      </g>

      <g transform="translate(90,220)">
        <path d="M5,0 C25,-4 45,-4 55,0 C60,2 58,10 52,12 C32,16 12,16 5,12 C0,10 0,2 5,0 Z" fill="url(#cellGolgiGrad)" stroke="#c49a30" strokeWidth="1.2" />
        <path d="M8,16 C28,12 48,12 58,16 C63,18 61,26 55,28 C35,32 15,32 8,28 C3,26 3,18 8,16 Z" fill="url(#cellGolgiGrad)" stroke="#c49a30" strokeWidth="1.2" />
        <path d="M12,32 C32,28 52,28 62,32 C67,34 65,42 58,44 C38,48 18,48 12,44 C7,42 7,34 12,32 Z" fill="url(#cellGolgiGrad)" stroke="#c49a30" strokeWidth="1.2" />
        <path d="M16,48 C36,44 56,44 66,48 C71,50 69,58 62,60 C42,64 22,64 16,60 C11,58 11,50 16,48 Z" fill="url(#cellGolgiGrad)" stroke="#c49a30" strokeWidth="1.2" />
        <circle cx="68" cy="22" r="5" fill="#f0d070" stroke="#c49a30" strokeWidth="0.8" />
        <circle cx="72" cy="38" r="4" fill="#f0d070" stroke="#c49a30" strokeWidth="0.8" />
        <circle cx="75" cy="52" r="3.5" fill="#f0d070" stroke="#c49a30" strokeWidth="0.8" />
      </g>

      <circle cx="200" cy="300" r="12" fill="url(#cellLysoGrad)" stroke="#b04040" strokeWidth="1.5" />
      <circle cx="200" cy="300" r="6" fill="#c05858" opacity="0.4" />
      <path d="M194,296 L198,300 L194,304" fill="none" stroke="#8a2a2a" strokeWidth="0.8" opacity="0.5" />
      <path d="M202,294 L206,300 L202,306" fill="none" stroke="#8a2a2a" strokeWidth="0.8" opacity="0.5" />

      <circle cx="280" cy="310" r="9" fill="url(#cellLysoGrad)" stroke="#b04040" strokeWidth="1.2" />
      <circle cx="280" cy="310" r="4.5" fill="#c05858" opacity="0.3" />

      <circle cx="430" cy="175" r="3" fill="#3a6a8a" />
      <circle cx="420" cy="165" r="2.5" fill="#3a6a8a" />
      <circle cx="415" cy="185" r="2.5" fill="#3a6a8a" />
      <circle cx="100" cy="170" r="3" fill="#3a6a8a" />
      <circle cx="110" cy="155" r="2.5" fill="#3a6a8a" />
      <circle cx="90" cy="185" r="2.5" fill="#3a6a8a" />
      <circle cx="200" cy="130" r="2.5" fill="#3a6a8a" />
      <circle cx="310" cy="280" r="2.5" fill="#3a6a8a" />
      <circle cx="380" cy="300" r="3" fill="#3a6a8a" />
      <circle cx="150" cy="230" r="2.5" fill="#3a6a8a" />

      <circle cx="82" cy="130" r="8" fill="url(#cellPeroxGrad)" stroke="#5a8a48" strokeWidth="1" />
      <circle cx="82" cy="130" r="3.5" fill="#6a9a58" opacity="0.4" />

      <g transform="translate(395,125)">
        <rect x="-3" y="-12" width="6" height="24" rx="2" fill="url(#cellCentrioleGrad)" stroke="#7a5fa0" strokeWidth="1" />
        <line x1="-3" y1="-6" x2="3" y2="-6" stroke="#6a4f90" strokeWidth="0.6" />
        <line x1="-3" y1="0" x2="3" y2="0" stroke="#6a4f90" strokeWidth="0.6" />
        <line x1="-3" y1="6" x2="3" y2="6" stroke="#6a4f90" strokeWidth="0.6" />
        <rect x="4" y="-8" width="6" height="20" rx="2" fill="url(#cellCentrioleGrad)" stroke="#7a5fa0" strokeWidth="1" transform="rotate(90,7,2)" />
        <line x1="4" y1="-3" x2="10" y2="-3" stroke="#6a4f90" strokeWidth="0.6" transform="rotate(90,7,2)" />
        <line x1="4" y1="3" x2="10" y2="3" stroke="#6a4f90" strokeWidth="0.6" transform="rotate(90,7,2)" />
      </g>

      <circle cx="330" cy="85" r="6" fill="url(#cellVesicleGrad)" stroke="#b8a060" strokeWidth="1" />
      <circle cx="410" cy="260" r="5" fill="url(#cellVesicleGrad)" stroke="#b8a060" strokeWidth="1" />
      <circle cx="170" cy="95" r="5.5" fill="url(#cellVesicleGrad)" stroke="#b8a060" strokeWidth="1" />

      <path d="M190,155 Q180,140 175,155 Q170,165 180,170" fill="none" stroke="#7a5fb0" strokeWidth="0.8" opacity="0.3" />
      <path d="M310,195 Q320,180 325,195 Q330,205 320,210" fill="none" stroke="#7a5fb0" strokeWidth="0.8" opacity="0.3" />
      <path d="M230,230 Q240,245 250,235 Q260,225 255,240" fill="none" stroke="#7a5fb0" strokeWidth="0.8" opacity="0.3" />
      <line x1="200" y1="150" x2="180" y2="135" stroke="#8a8aaa" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,3" />
      <line x1="300" y1="160" x2="320" y2="140" stroke="#8a8aaa" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,3" />
      <line x1="250" y1="240" x2="250" y2="270" stroke="#8a8aaa" strokeWidth="0.5" opacity="0.3" strokeDasharray="2,3" />
    </g>
  );
}

export const cellLabels: LabelPoint[] = [
  { id: "membrane", x: 300, y: 22, label: "Cell Membrane", hint: "Phospholipid bilayer with embedded proteins; selectively permeable barrier controlling ion/molecule transport (Na⁺/K⁺ ATPase, glucose transporters)" },
  { id: "nucleus", x: 300, y: 210, label: "Nucleus", hint: "Double-membrane organelle housing chromatin (DNA + histones); site of transcription & mRNA processing; nuclear pores regulate macromolecule transport" },
  { id: "nucleolus", x: 310, y: 195, label: "Nucleolus", hint: "Dense region within nucleus; assembles ribosomal subunits (rRNA synthesis); prominent in cells with high protein output" },
  { id: "mito1", x: 200, y: 140, label: "Mitochondria", hint: "Double-membrane organelle with cristae; oxidative phosphorylation produces ~36 ATP/glucose via electron transport chain; has own mtDNA (maternal inheritance)" },
  { id: "rer", x: 170, y: 200, label: "Rough ER", hint: "Ribosome-studded membrane network continuous with nuclear envelope; co-translational protein folding & N-linked glycosylation; prominent in secretory cells" },
  { id: "ser", x: 420, y: 175, label: "Smooth ER", hint: "Lacks ribosomes; lipid/steroid synthesis, Ca²⁺ storage (sarcoplasmic reticulum in muscle), drug detoxification (hepatocytes via cytochrome P450)" },
  { id: "golgi", x: 340, y: 320, label: "Golgi Apparatus", hint: "Stacked cisternae (cis→trans); post-translational modification (glycosylation, phosphorylation), protein sorting & vesicle packaging for secretion or lysosomal targeting" },
  { id: "lysosome", x: 460, y: 290, label: "Lysosomes", hint: "Membrane-bound vesicle (pH ~5) with acid hydrolases; autophagy, phagocytosis, apoptosis; deficiency causes lysosomal storage diseases (Tay-Sachs, Gaucher)" },
  { id: "ribosome", x: 130, y: 330, label: "Ribosomes", hint: "80S particles (40S + 60S subunits); translate mRNA → polypeptide; free ribosomes make cytoplasmic proteins, bound ribosomes make secretory/membrane proteins" },
  { id: "peroxisome", x: 420, y: 350, label: "Peroxisomes", hint: "Oxidative organelle; fatty acid β-oxidation (very long chain), H₂O₂ detoxification via catalase; critical in hepatocytes and renal tubular cells" },
  { id: "centriole", x: 300, y: 75, label: "Centrioles", hint: "Paired cylindrical structures (9+0 microtubule triplets); organize mitotic spindle during cell division; form basal bodies of cilia (respiratory epithelium)" },
  { id: "cytoplasm", x: 200, y: 370, label: "Cytoplasm", hint: "Aqueous cytosol + organelles + cytoskeleton (microfilaments, intermediate filaments, microtubules); site of glycolysis, signal transduction, protein degradation (proteasomes)" },
];
