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
        <radialGradient id="cellGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(200, 50%, 92%)" />
          <stop offset="100%" stopColor="hsl(200, 40%, 82%)" />
        </radialGradient>
        <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(260, 50%, 85%)" />
          <stop offset="100%" stopColor="hsl(260, 40%, 70%)" />
        </radialGradient>
      </defs>
      <ellipse cx="250" cy="200" rx="200" ry="160" fill="url(#cellGrad)" stroke="hsl(200,40%,60%)" strokeWidth="3" />
      <ellipse cx="250" cy="200" rx="200" ry="160" fill="none" stroke="hsl(200,50%,70%)" strokeWidth="6" opacity="0.3" />
      <ellipse cx="250" cy="180" rx="60" ry="50" fill="url(#nucleusGrad)" stroke="hsl(260,35%,55%)" strokeWidth="2" />
      <ellipse cx="250" cy="180" rx="15" ry="12" fill="hsl(260,45%,65%)" stroke="hsl(260,35%,50%)" strokeWidth="1" />
      <path d="M130,140 C120,120 140,100 160,110 C180,120 170,140 150,150 C130,160 120,150 130,140 Z" fill="hsl(160,40%,75%)" stroke="hsl(160,30%,55%)" strokeWidth="1" />
      <path d="M340,250 C330,230 350,210 370,220 C390,230 380,250 360,260 C340,270 330,260 340,250 Z" fill="hsl(160,40%,75%)" stroke="hsl(160,30%,55%)" strokeWidth="1" />
      <path d="M100,220 C90,210 95,195 110,200 L150,220 L130,240 C115,245 105,235 100,220 Z" fill="hsl(40,50%,80%)" stroke="hsl(40,35%,55%)" strokeWidth="1" />
      <path d="M350,140 C360,130 375,135 380,145 L370,170 L345,160 C335,155 340,145 350,140 Z" fill="hsl(40,50%,80%)" stroke="hsl(40,35%,55%)" strokeWidth="1" />
      <path d="M170,280 C190,270 200,290 190,300 C180,310 170,300 170,280 Z" fill="hsl(0,45%,80%)" stroke="hsl(0,35%,60%)" strokeWidth="1" />
      <circle cx="180" cy="290" r="5" fill="hsl(0,50%,75%)" stroke="hsl(0,35%,55%)" strokeWidth="0.5" />
      <path d="M320,300 Q340,280 360,300 Q340,320 320,300" fill="none" stroke="hsl(200,30%,65%)" strokeWidth="2" opacity="0.6" />
      <path d="M290,280 Q310,260 330,280 Q310,300 290,280" fill="none" stroke="hsl(200,30%,65%)" strokeWidth="2" opacity="0.6" />
      <circle cx="400" cy="180" r="8" fill="hsl(120,35%,75%)" stroke="hsl(120,30%,55%)" strokeWidth="1" />
      <circle cx="120" cy="280" r="6" fill="hsl(120,35%,75%)" stroke="hsl(120,30%,55%)" strokeWidth="1" />
      <circle cx="380" cy="290" r="7" fill="hsl(120,35%,75%)" stroke="hsl(120,30%,55%)" strokeWidth="1" />
    </g>
  );
}

export const cellLabels: LabelPoint[] = [
  { id: "membrane", x: 250, y: 42, label: "Cell Membrane", hint: "Selectively permeable phospholipid bilayer" },
  { id: "nucleus", x: 250, y: 180, label: "Nucleus", hint: "Contains DNA, controls cell activity" },
  { id: "nucleolus", x: 250, y: 170, label: "Nucleolus", hint: "Makes ribosomal RNA" },
  { id: "mito1", x: 145, y: 130, label: "Mitochondria", hint: "ATP production: powerhouse of the cell" },
  { id: "golgi", x: 110, y: 220, label: "Golgi Apparatus", hint: "Packages and ships proteins" },
  { id: "er", x: 360, y: 145, label: "Endoplasmic Reticulum", hint: "Protein synthesis (rough) & lipid synthesis (smooth)" },
  { id: "lysosome", x: 180, y: 290, label: "Lysosome", hint: "Digests cellular waste" },
  { id: "ribosome", x: 400, y: 180, label: "Ribosomes", hint: "Synthesize proteins from mRNA" },
  { id: "cytoplasm", x: 330, y: 310, label: "Cytoplasm", hint: "Gel-like fluid filling the cell" },
];
