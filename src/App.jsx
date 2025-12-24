import React, { useState, useEffect, useRef } from 'react';
import {
  Power, Cpu, Shield, Zap, Activity, Lock, Globe, Hexagon, Aperture,
  Database, Layers, Key, Ban, FileText, Search, Map, Clock, Image as ImageIcon,
  MessageSquare, ChevronRight, AlertTriangle, Crosshair, Box, ZoomIn, UserCheck,
  Upload, X, Brain, Server, Share2, Eye, Terminal, HardDrive, Wifi, Radio,
  BarChart3, Network, RefreshCw, AlertOctagon, ShieldCheck, FileDown, ToggleLeft, ToggleRight,
  Link
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const SYSTEM_PODS = [
  // Core Processing Pods
  { id: 'nlp', name: 'NLP', port: 8010, icon: FileText, desc: 'Language Processing', sub: ['Entity Extract', 'Evidence Corr', 'Lang Detect', 'Sentiment'], version: '2.4', health: '98%', status: 'active', cpu: 45, mem: 1024 },
  { id: 'vis', name: 'VISION', port: 8050, icon: Eye, desc: 'Computer Vision', sub: ['YOLOv8', 'CCTV', 'License Plate', 'Object Track'], version: '3.1', health: '99%', status: 'active', cpu: 78, mem: 4096 },
  { id: 'aud', name: 'AUDIO', port: 8030, icon: Zap, desc: 'Audio Processing', sub: ['Whisper', 'Speaker ID', 'Enhancement', 'YouTube Ingest'], version: '2.0', health: '95%', status: 'active', cpu: 32, mem: 2048 },
  { id: 'vid', name: 'VIDEO', port: 8040, icon: ImageIcon, desc: 'Video Analysis', sub: ['FFmpeg', 'Scene Detect', 'Deepfake Det', 'Object Track'], version: '2.5', health: '97%', status: 'active', cpu: 65, mem: 8192 },
  { id: '3d', name: '3D POD', port: 8020, icon: Box, desc: '3D Processing', sub: ['NeRF', 'Photogrammetry', 'LiDAR', 'Mesh Gen'], version: '3.0', health: '96%', status: 'active', cpu: 88, mem: 16384 },

  // Forensic & Analysis Pods
  { id: 'for', name: 'FORENSICS', port: 8060, icon: Search, desc: 'Digital Evidence', sub: ['Volatility', 'Plaso', 'PyTSK', 'Pattern Detect'], version: '4.2', health: '100%', status: 'active', cpu: 12, mem: 512 },
  { id: 'fac', name: 'FACIAL', port: 8090, icon: UserCheck, desc: 'Biometrics', sub: ['Face Recog', 'Age Prog', 'Emotion', 'InsightFace'], version: '3.3', health: '100%', status: 'active', cpu: 41, mem: 2048 },
  { id: 'osi', name: 'OSINT', port: 8120, icon: Globe, desc: 'Intel Gathering', sub: ['Newspaper3k', 'CrimeCheck', 'Archive', 'DarkWeb Monitor'], version: '1.8', health: '92%', status: 'warning', cpu: 89, mem: 1024 },

  // Content Generation Pods
  { id: 'con', name: 'CONTENT', port: 8080, icon: Layers, desc: 'Content Orchestration', sub: ['Timeline Gen', 'Story Gen', 'Multi-Modal'], version: '2.1', health: '98%', status: 'active', cpu: 35, mem: 2048 },
  { id: 'com', name: 'COMIC', port: 8070, icon: ImageIcon, desc: 'Visual Story', sub: ['StyleTransfer', 'Panel Gen', 'Legacy Enhance'], version: '1.5', health: '99%', status: 'idle', cpu: 5, mem: 256 },
  { id: 'res', name: 'RESTORE', port: 8160, icon: Activity, desc: 'Media Enhance', sub: ['GFPGAN', 'Real-ESRGAN', 'SuperRes', 'Denoise'], version: '2.2', health: '98%', status: 'active', cpu: 55, mem: 4096 },

  // Utility Pods
  { id: 'mis', name: 'MISC', port: 8100, icon: Shield, desc: 'Security Tools', sub: ['Crypto', 'Blockchain', 'Hash Verify', 'API Router'], version: '2.1', health: '100%', status: 'active', cpu: 15, mem: 512 },
  { id: 'ui', name: 'UI POD', port: 8170, icon: Terminal, desc: 'Interface Services', sub: ['Dashboard', 'Reports', 'Viz'], version: '1.0', health: '100%', status: 'active', cpu: 8, mem: 256 },

  // === FOUNDATION LAYER PODS (Critical Infrastructure) ===
  { id: 'synth', name: 'SYNTHETIC', port: 8130, icon: Database, desc: 'Synthetic Forensic', sub: ['Scenario Gen', 'Bloodstain Sim', 'CCTV Mock', 'DNA Variants', 'Timeline Variants'], advanced: true, foundation: true, foundationType: 'synthetic', version: '5.0', health: '99%', status: 'active', cpu: 72, mem: 8192, subPodCount: 17 },
  { id: 'inf', name: 'INFRA', port: 8140, icon: Server, desc: 'Production Infra', sub: ['Chain Validator', 'Celery Worker', 'Prometheus', 'Log Aggregator', 'Health Check'], advanced: true, foundation: true, foundationType: 'infra', version: '4.4', health: '100%', status: 'active', cpu: 25, mem: 1024, subPodCount: 19 },
  { id: 'meta', name: 'META-LEARN', port: 8150, icon: Brain, desc: 'AI Evolution', sub: ['MAML Engine', 'Pattern Correlate', 'Evolution Track', 'Ensemble Router', 'NAS Search'], advanced: true, foundation: true, foundationType: 'meta', version: '5.0', health: '99%', status: 'active', cpu: 92, mem: 32768, subPodCount: 16 },

  // System Core
  { id: 'orc', name: 'ORCHESTRA', port: 8110, icon: Share2, desc: 'System Core', sub: ['Routing', 'Fusion', 'Decision', 'Cross-Pod Coord'], advanced: true, version: '6.0', health: '100%', status: 'active', cpu: 10, mem: 512 },
];

// --- DATA SOURCES (217+ Sources from Reference) ---
const DATA_SOURCES = {
  regional: { name: 'Regional News', count: 60, active: 58, sources: ['Bengali', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Gujarati', 'Marathi', 'Punjabi', 'Odia'] },
  english: { name: 'English News', count: 19, active: 19, sources: ['TOI', 'NDTV', 'Hindu', 'India Today', 'Reuters', 'BBC India'] },
  legal: { name: 'Legal/Gov', count: 47, active: 45, sources: ['IndianKanoon', 'Data.gov.in', 'NCRB', 'Court Records', 'RTI Portal'] },
  osint: { name: 'OSINT/Research', count: 58, active: 52, sources: ['Archives', 'Academic', 'Social Media', 'Forums'] },
  darkweb: { name: 'Dark Web Intel', count: 15, active: 12, sources: ['Tor Monitors', 'Paste Sites', 'Markets'] },
  multimedia: { name: 'YouTube/Media', count: 18, active: 18, sources: ['YouTube', 'Podcasts', 'Audio Archives'] }
};

// --- API INTEGRATIONS (37+ APIs from Reference) ---
const API_INTEGRATIONS = {
  tier1: { name: 'Premium AI', apis: ['Google Gemini', 'OpenAI GPT-4', 'Anthropic Claude', 'Poe', 'Grok'], status: 'active', color: 'purple' },
  tier2: { name: 'Free/Open', apis: ['NewsAPI', 'HuggingFace', 'Comic Vine', 'Wikipedia'], status: 'active', color: 'cyan' },
  content: { name: 'Content Gen', apis: ['Leonardo.ai', 'ElevenLabs', 'Stability AI', 'Midjourney'], status: 'active', color: 'amber' },
  monitoring: { name: 'Monitoring', apis: ['UptimeRobot', 'Prometheus', 'Grafana', 'AlphaVantage'], status: 'active', color: 'green' }
};

// --- KOUSHIKI EVOLUTION TRACKING ---
const KOUSHIKI_EVOLUTION = {
  currentPhase: 3,
  totalPhases: 5,
  phaseName: 'Pattern Correlation',
  phaseProgress: 55,
  learningEvents: 2847,
  patternsLearned: 156,
  confidenceScore: 73,
  cpiScore: { cost: 82, performance: 91, intelligence: 78 },
  syntheticBoost: true,
  chainValidation: 'VERIFIED',
  lastEvolution: '2 hours ago'
};

// --- CONFIDENCE PIPELINE (Per-Step Breakdown) ---
const CONFIDENCE_PIPELINE = {
  ocr: { name: 'OCR Accuracy', score: 78, status: 'warning', detail: 'Handwritten notes: 64%, Printed: 96%' },
  entityExtraction: { name: 'Entity Extraction', score: 82, status: 'warning', detail: 'Cascaded from OCR quality' },
  temporalAlignment: { name: 'Temporal Alignment', score: 99, status: 'good', detail: 'Phone records: high accuracy' },
  dateDeduction: { name: 'Date Deduction', score: 91, status: 'good', detail: 'Cross-source validation' },
  semanticSearch: { name: 'Semantic Search', score: 88, status: 'good', detail: 'BERT embeddings: 3072-dim' },
  finalConfidence: { name: 'Final Timeline', score: 68, status: 'warning', detail: 'Limited by OCR quality' },
  mainRisk: 'OCR errors from handwritten investigator notes (~200 pages)'
};

// --- SOP COMPLIANCE (CrPC §23, IPC §3) ---
const SOP_COMPLIANCE = {
  chainOfCustody: { status: 'complete', score: 100, detail: 'All 847 evidence items documented' },
  evidenceStorage: { status: 'partial', score: 40, detail: '2/5 items lacked climate control per NIST' },
  contaminationLog: { status: 'missing', score: 0, detail: 'Original 1993 files missing timestamps' },
  digitalForensics: { status: 'complete', score: 100, detail: 'Volatility/PyTSK RAM dump correct' },
  witnessProtocol: { status: 'complete', score: 95, detail: 'Video recorded per NHRC guidelines' },
  overallRisk: 'Missing evidence storage documentation may be challenged in court'
};

// --- CASE QUALITY METADATA ---
const CASE_QUALITY_DATA = {
  'aarushi': {
    evidenceAge: '17 years',
    evidenceQuality: 'POOR',
    qualityColor: 'red',
    documentPages: 10000,
    evidenceItems: 1247,
    aiRecommendation: 'Prioritize OCR + NLP + Semantic Search. De-prioritize facial recognition.',
    riskAssessment: {
      timeline: { score: 55, reason: 'Document quality limits accuracy' },
      witness: { score: 72, reason: '100+ conflicting statements' },
      spatial: { score: 40, reason: 'Pre-GPS era, locations unreliable' }
    },
    biasWarnings: ['Facial recognition trained on Western demographics: expect 10-15% lower accuracy on Indian subjects']
  },
  'jessica': {
    evidenceAge: '22 years',
    evidenceQuality: 'FAIR',
    qualityColor: 'amber',
    documentPages: 3500,
    evidenceItems: 892,
    aiRecommendation: 'Focus on video forensics, cross-validate 100+ witness statements',
    riskAssessment: {
      timeline: { score: 78, reason: 'Good CCTV availability for 2003' },
      witness: { score: 65, reason: 'Media bias documented in coverage' },
      spatial: { score: 82, reason: 'Urban Delhi, multiple camera angles' }
    },
    biasWarnings: ['2003-era CCTV resolution limits facial matching accuracy to ~72%']
  },
  'default': {
    evidenceAge: 'Unknown',
    evidenceQuality: 'FAIR',
    qualityColor: 'amber',
    documentPages: 500,
    evidenceItems: 150,
    aiRecommendation: 'Standard multi-modal analysis pipeline',
    riskAssessment: {
      timeline: { score: 75, reason: 'Standard document quality' },
      witness: { score: 80, reason: 'Limited witness pool' },
      spatial: { score: 70, reason: 'GPS data available' }
    },
    biasWarnings: []
  }
};


const StarfieldBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        this.blinkSpeed = Math.random() * 0.05;
        this.alpha = Math.random();
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.alpha += this.blinkSpeed * this.direction;
        if (this.alpha >= 1 || this.alpha <= 0.2) this.direction *= -1;
      }
      draw() {
        ctx.fillStyle = `rgba(0, 242, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      stars = [];
      for (let i = 0; i < 150; i++) stars.push(new Star());
    };
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => { star.update(); star.draw(); });
      requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize);
    resize();
    init();
    const animId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);
  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'radial-gradient(circle at 50% 50%, #050a14 0%, #000000 100%)' }} />
  );
};

const CyberGrid = () => (
  <div className="absolute bottom-0 left-0 w-full h-1/3 overflow-hidden pointer-events-none z-0 perspective-1000">
    <div className="w-[200%] h-[200%] absolute -left-[50%] bg-[linear-gradient(rgba(0,242,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] transform rotate-x-60 animate-grid-move origin-bottom mask-gradient"></div>
    <style>{`
      .rotate-x-60 { transform: rotateX(60deg); }
      .mask-gradient { mask-image: linear-gradient(to top, black, transparent); -webkit-mask-image: linear-gradient(to top, black, transparent); }
      @keyframes gridMove { 0% { transform: rotateX(60deg) translateY(0); } 100% { transform: rotateX(60deg) translateY(40px); } }
      .animate-grid-move { animation: gridMove 2s linear infinite; }
    `}</style>
  </div>
);

// --- SHARED COMPONENTS ---

const JarvisRing = ({ size, color, speed, reverse, dashArray, strokeWidth, opacity, paused }) => (
  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-transparent flex items-center justify-center ${paused ? '' : reverse ? 'animate-spin-reverse-slow' : 'animate-spin-slow'}`}
    style={{ width: size, height: size, animationDuration: speed }}>
    <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full">
      <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={dashArray} strokeLinecap="round" opacity={opacity} />
    </svg>
  </div>
);

// Simple Arrow Component
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);

// --- PERSISTENT SYSTEM BAR (Command Center Style) ---
const SystemBar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/90 border-b border-gray-800/50 z-[60] flex items-center justify-between px-2 md:px-4 backdrop-blur-sm">
      {/* Left: Product Identity + Environment */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
          <span className="font-orbitron text-[10px] md:text-[11px] font-bold tracking-[0.1em] md:tracking-[0.15em] text-gray-100">NAMMALENS</span>
          <span className="text-gray-600 text-[10px] hidden md:inline">|</span>
          <span className="font-mono text-[10px] text-gray-400 tracking-wide hidden md:inline">Koushiki Engine</span>
        </div>
        <div className="flex items-center gap-1.5 px-1.5 md:px-2 py-0.5 bg-amber-900/30 border border-amber-700/50 rounded">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          <span className="font-mono text-[8px] md:text-[9px] font-medium text-amber-400 tracking-wider">DEV</span>
        </div>
      </div>

      {/* Center: Koushiki Phase (visible on md+) */}
      <div className="hidden md:flex items-center gap-2 text-[9px] font-mono">
        <Brain className="w-3 h-3 text-purple-400" />
        <span className="text-gray-500">PHASE</span>
        <span className="text-purple-400 font-bold">{KOUSHIKI_EVOLUTION.currentPhase}/5</span>
        <div className="w-12 h-1 bg-gray-800 rounded overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-600 to-cyan-500" style={{ width: `${KOUSHIKI_EVOLUTION.phaseProgress}%` }} />
        </div>
      </div>

      {/* Right: System Status & Time */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* System Health - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono">
          <span className="text-gray-500">SYS:</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-green-400">NOMINAL</span>
          </div>
        </div>

        {/* Divider - hidden on mobile */}
        <div className="w-px h-3 bg-gray-700 hidden sm:block"></div>

        {/* Timestamp */}
        <div className="font-mono text-[9px] md:text-[10px] text-gray-400 tracking-wider tabular-nums">
          {time} <span className="text-gray-600 hidden sm:inline">UTC+5:30</span>
        </div>
      </div>
    </div>
  );
};

// --- KOUSHIKI EVOLUTION PANEL (Shows AI Learning Progress) ---
const KoushikiEvolutionPanel = () => {
  const evo = KOUSHIKI_EVOLUTION;

  return (
    <div className="bg-black/60 border border-purple-900/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-purple-300 tracking-wider">KOUSHIKI EVOLUTION</span>
        </div>
        <div className="text-[9px] font-mono text-gray-500">{evo.lastEvolution}</div>
      </div>

      {/* Phase Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-mono text-gray-400">PHASE {evo.currentPhase}/{evo.totalPhases}</span>
          <span className="text-[10px] font-mono text-purple-400">{evo.phaseName}</span>
        </div>
        <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-500"
            style={{ width: `${evo.phaseProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {[1, 2, 3, 4, 5].map(phase => (
            <div key={phase} className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold
              ${phase < evo.currentPhase ? 'bg-purple-500 border-purple-400 text-black' :
                phase === evo.currentPhase ? 'bg-purple-900/50 border-purple-400 text-purple-300 animate-pulse' :
                  'bg-gray-900 border-gray-700 text-gray-600'}`}>
              {phase}
            </div>
          ))}
        </div>
      </div>

      {/* CPI Score */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-900/50 rounded p-2 text-center">
          <div className="text-[9px] text-gray-500 mb-1">COST</div>
          <div className="text-sm font-bold text-green-400">{evo.cpiScore.cost}%</div>
        </div>
        <div className="bg-gray-900/50 rounded p-2 text-center">
          <div className="text-[9px] text-gray-500 mb-1">PERF</div>
          <div className="text-sm font-bold text-cyan-400">{evo.cpiScore.performance}%</div>
        </div>
        <div className="bg-gray-900/50 rounded p-2 text-center">
          <div className="text-[9px] text-gray-500 mb-1">INTEL</div>
          <div className="text-sm font-bold text-purple-400">{evo.cpiScore.intelligence}%</div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex justify-between text-[9px] font-mono border-t border-gray-800 pt-2">
        <div className="text-gray-400">
          <span className="text-gray-600">PATTERNS:</span> <span className="text-cyan-400">{evo.patternsLearned}</span>
        </div>
        <div className="text-gray-400">
          <span className="text-gray-600">EVENTS:</span> <span className="text-amber-400">{evo.learningEvents.toLocaleString()}</span>
        </div>
        <div className={`flex items-center gap-1 ${evo.syntheticBoost ? 'text-green-400' : 'text-gray-600'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${evo.syntheticBoost ? 'bg-green-500' : 'bg-gray-600'}`} />
          SYNTH
        </div>
      </div>
    </div>
  );
};

// --- DATA SOURCES PANEL (217+ Sources Visualization) ---
const DataSourcesPanel = () => {
  const totalSources = Object.values(DATA_SOURCES).reduce((acc, cat) => acc + cat.count, 0);
  const activeSources = Object.values(DATA_SOURCES).reduce((acc, cat) => acc + cat.active, 0);

  const categoryColors = {
    regional: 'cyan',
    english: 'blue',
    legal: 'amber',
    osint: 'green',
    darkweb: 'red',
    multimedia: 'purple'
  };

  return (
    <div className="bg-black/60 border border-cyan-900/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300 tracking-wider">DATA SOURCES</span>
        </div>
        <div className="text-[10px] font-mono">
          <span className="text-green-400">{activeSources}</span>
          <span className="text-gray-600">/{totalSources} ACTIVE</span>
        </div>
      </div>

      {/* Source Categories */}
      <div className="space-y-2">
        {Object.entries(DATA_SOURCES).map(([key, cat]) => {
          const color = categoryColors[key];
          const pct = Math.round((cat.active / cat.count) * 100);
          return (
            <div key={key} className="group">
              <div className="flex justify-between items-center mb-0.5">
                <span className={`text-[10px] font-mono text-${color}-400`}>{cat.name}</span>
                <span className="text-[9px] text-gray-500">{cat.active}/{cat.count}</span>
              </div>
              <div className="w-full h-1 bg-gray-900 rounded overflow-hidden">
                <div
                  className={`h-full bg-${color}-500 transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between text-[9px] font-mono text-gray-500">
        <span>10 Languages</span>
        <span>6 Categories</span>
        <span className="text-green-400">{Math.round((activeSources / totalSources) * 100)}% Up</span>
      </div>
    </div>
  );
};

// --- API STATUS PANEL ---
const APIStatusPanel = () => {
  return (
    <div className="bg-black/60 border border-amber-900/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Link className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300 tracking-wider">API INTEGRATIONS</span>
        </div>
        <div className="text-[10px] font-mono text-green-400">37+ ACTIVE</div>
      </div>

      <div className="space-y-2">
        {Object.entries(API_INTEGRATIONS).map(([key, tier]) => (
          <div key={key} className={`bg-${tier.color}-900/10 border border-${tier.color}-900/30 rounded p-2`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`text-[10px] font-bold text-${tier.color}-400`}>{tier.name}</span>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full bg-green-500`} />
                <span className="text-[8px] text-gray-500">{tier.apis.length} APIs</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {tier.apis.slice(0, 3).map((api, i) => (
                <span key={i} className="text-[8px] px-1.5 py-0.5 bg-gray-900/50 rounded text-gray-400">
                  {api}
                </span>
              ))}
              {tier.apis.length > 3 && (
                <span className="text-[8px] px-1.5 py-0.5 text-gray-600">+{tier.apis.length - 3}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CONFIDENCE DASHBOARD (Per-Step Breakdown - Fixes Automation Bias) ---
const ConfidenceDashboard = () => {
  const pipeline = CONFIDENCE_PIPELINE;
  const steps = ['ocr', 'entityExtraction', 'temporalAlignment', 'dateDeduction', 'semanticSearch', 'finalConfidence'];

  const getStatusIcon = (status) => {
    if (status === 'good') return { color: 'text-green-400', bg: 'bg-green-500', icon: '✓' };
    if (status === 'warning') return { color: 'text-amber-400', bg: 'bg-amber-500', icon: '⚠' };
    return { color: 'text-red-400', bg: 'bg-red-500', icon: '✗' };
  };

  return (
    <div className="bg-black/60 border border-red-900/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-bold text-red-300 tracking-wider">CONFIDENCE BREAKDOWN</span>
        </div>
        <div className="text-[9px] font-mono text-gray-500">Per-Step Analysis</div>
      </div>

      {/* Pipeline Steps */}
      <div className="space-y-2 mb-3">
        {steps.map(key => {
          const step = pipeline[key];
          const status = getStatusIcon(step.status);
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${status.color}`}>{status.icon}</span>
                <span className="text-[10px] text-gray-300">{step.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-800 rounded overflow-hidden">
                  <div
                    className={`h-full ${step.status === 'good' ? 'bg-green-500' : step.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${step.score}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono ${status.color}`}>{step.score}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk Warning */}
      <div className="bg-red-900/20 border border-red-800/50 rounded p-2 mt-2">
        <div className="text-[9px] font-bold text-red-400 mb-1">⚠️ MAIN RISK</div>
        <div className="text-[9px] text-gray-400">{pipeline.mainRisk}</div>
      </div>
    </div>
  );
};

// --- SOP COMPLIANCE PANEL (CrPC §23, IPC §3) ---
const SOPCompliancePanel = () => {
  const sop = SOP_COMPLIANCE;
  const items = ['chainOfCustody', 'evidenceStorage', 'contaminationLog', 'digitalForensics', 'witnessProtocol'];

  const getStatusStyle = (status) => {
    if (status === 'complete') return { color: 'text-green-400', icon: '✓', bg: 'bg-green-500' };
    if (status === 'partial') return { color: 'text-amber-400', icon: '⚠', bg: 'bg-amber-500' };
    return { color: 'text-red-400', icon: '✗', bg: 'bg-red-500' };
  };

  const labelMap = {
    chainOfCustody: 'Chain of Custody',
    evidenceStorage: 'Evidence Storage',
    contaminationLog: 'Contamination Log',
    digitalForensics: 'Digital Forensics',
    witnessProtocol: 'Witness Protocol'
  };

  return (
    <div className="bg-black/60 border border-amber-900/30 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-300 tracking-wider">SOP COMPLIANCE</span>
        </div>
        <div className="text-[9px] font-mono text-gray-500">CrPC §23</div>
      </div>

      <div className="space-y-2 mb-3">
        {items.map(key => {
          const item = sop[key];
          const status = getStatusStyle(item.status);
          return (
            <div key={key} className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] ${status.color}`}>{status.icon}</span>
                  <span className="text-[10px] text-gray-300">{labelMap[key]}</span>
                </div>
                <span className={`text-[9px] font-mono ${status.color}`}>
                  {item.status === 'complete' ? 'OK' : item.status === 'partial' ? 'WARN' : 'FAIL'}
                </span>
              </div>
              <div className="text-[8px] text-gray-600 ml-5 mt-0.5">{item.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Overall Risk */}
      <div className="bg-amber-900/20 border border-amber-800/50 rounded p-2">
        <div className="text-[9px] font-bold text-amber-400 mb-1">⚖️ LEGAL RISK</div>
        <div className="text-[9px] text-gray-400">{sop.overallRisk}</div>
      </div>
    </div>
  );
};

// --- CASE METADATA PANEL (Evidence Quality Assessment) ---
const CaseMetadataPanel = ({ caseId = 'aarushi' }) => {
  const quality = CASE_QUALITY_DATA[caseId] || CASE_QUALITY_DATA['default'];

  const qualityColors = {
    POOR: 'red',
    FAIR: 'amber',
    GOOD: 'green'
  };
  const color = qualityColors[quality.evidenceQuality] || 'amber';

  return (
    <div className={`bg-black/60 border border-${color}-900/30 rounded-lg p-4 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" style={{ color: color === 'red' ? '#f87171' : color === 'amber' ? '#fbbf24' : '#4ade80' }} />
          <span className="text-xs font-bold tracking-wider" style={{ color: color === 'red' ? '#fca5a5' : color === 'amber' ? '#fcd34d' : '#86efac' }}>
            CASE METADATA
          </span>
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded bg-${color}-900/30 text-${color}-400`}>
          {quality.evidenceQuality}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-[10px]">
          <span className="text-gray-500">Age:</span> <span className="text-gray-300">{quality.evidenceAge}</span>
        </div>
        <div className="text-[10px]">
          <span className="text-gray-500">Pages:</span> <span className="text-gray-300">{quality.documentPages.toLocaleString()}</span>
        </div>
        <div className="text-[10px]">
          <span className="text-gray-500">Items:</span> <span className="text-gray-300">{quality.evidenceItems}</span>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="space-y-1 mb-3">
        <div className="text-[9px] text-gray-500 uppercase tracking-wider">Risk Assessment</div>
        {Object.entries(quality.riskAssessment).map(([key, data]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 capitalize">{key}</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-1 bg-gray-800 rounded">
                <div
                  className={`h-full rounded ${data.score >= 70 ? 'bg-green-500' : data.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-gray-500">{data.score}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendation */}
      <div className="bg-gray-900/50 rounded p-2 mb-2">
        <div className="text-[9px] text-cyan-400 mb-1">🤖 AI RECOMMENDATION</div>
        <div className="text-[9px] text-gray-400">{quality.aiRecommendation}</div>
      </div>

      {/* Bias Warnings */}
      {quality.biasWarnings.length > 0 && (
        <div className="bg-red-900/20 border border-red-800/50 rounded p-2">
          <div className="text-[9px] font-bold text-red-400 mb-1">⚠️ ALGORITHMIC BIAS WARNING</div>
          {quality.biasWarnings.map((warning, i) => (
            <div key={i} className="text-[9px] text-gray-400">{warning}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const JarvisCore = ({ onEnter }) => {
  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center perspective-1000 group z-20 scale-75 md:scale-100">
      <JarvisRing size="100%" color="#00f2ff" speed="20s" dashArray="10 20 5 30" strokeWidth="0.5" opacity="0.6" />
      <JarvisRing size="95%" color="#00f2ff" speed="15s" reverse dashArray="60 40 10 90" strokeWidth="0.2" opacity="0.4" />
      <JarvisRing size="80%" color="#3b82f6" speed="25s" dashArray="2 10 2 10 50 20" strokeWidth="1" opacity="0.5" />
      <JarvisRing size="65%" color="#f59e0b" speed="12s" reverse dashArray="25 75 10 10" strokeWidth="1.5" opacity="0.8" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] rounded-full border border-amber-500/20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full border-2 border-cyan-400/30 animate-spin-3d-slow border-t-cyan-400 border-b-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] rounded-full border-2 border-amber-500/30 animate-spin-3d-reverse border-l-amber-500 border-r-transparent"></div>

      <button onClick={onEnter} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-40 h-40 rounded-full flex flex-col items-center justify-center text-center p-4 transition-all duration-500 group-hover:scale-105 cursor-pointer">
        <div className="absolute inset-0 bg-black/80 rounded-full blur-md border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_80px_rgba(6,182,212,0.8)] group-hover:border-cyan-400"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="text-cyan-400 mb-1 animate-pulse-fast"><Aperture className="w-10 h-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" /></div>
          <div className="font-orbitron font-bold text-lg text-white tracking-widest leading-tight drop-shadow-[0_0_5px_black]">NAMMALENS</div>
          <div className="text-[8px] font-mono text-amber-400 mt-2 uppercase tracking-wide bg-amber-900/20 px-2 py-0.5 rounded border border-amber-500/30">Powered by Koushiki</div>
        </div>
      </button>

      {/* Floating Text */}
      <div className="absolute top-10 -right-20 text-[8px] font-mono text-cyan-600 flex flex-col items-end gap-1 animate-float w-32">
        <div className="flex items-center gap-1"><span className="w-1 h-1 bg-cyan-400 rounded-full"></span> NET_ID: 884-X</div>
        <div className="flex items-center gap-1"><span className="w-1 h-1 bg-cyan-400 rounded-full"></span> LATENCY: 12ms</div>
      </div>
      <div className="absolute bottom-10 -left-20 text-[8px] font-mono text-amber-600 flex flex-col gap-1 animate-float w-32" style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span> CORE_TEMP: 45°C</div>
        <div className="flex items-center gap-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span> MEM_ALLOC: 64TB</div>
      </div>
    </div>
  );
};

// --- COMPONENT 2: MINI ORB BUTTON ---
const OrbButton = ({ title, sub, icon: Icon, color, disabled, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = {
    cyan: { ring: '#00f2ff', text: '#22d3ee', bg: 'rgba(6, 182, 212, 0.2)', borderNormal: 'rgba(6, 182, 212, 0.3)', borderHover: '#22d3ee', shadowHover: '0 0 50px rgba(6, 182, 212, 0.6)' },
    amber: { ring: '#fbbf24', text: '#fbbf24', bg: 'rgba(245, 158, 11, 0.2)', borderNormal: 'rgba(245, 158, 11, 0.3)', borderHover: '#fbbf24', shadowHover: '0 0 50px rgba(245, 158, 11, 0.6)' },
    red: { ring: '#f87171', text: '#f87171', bg: 'rgba(239, 68, 68, 0.2)', borderNormal: 'rgba(239, 68, 68, 0.3)', borderHover: '#f87171', shadowHover: '0 0 50px rgba(239, 68, 68, 0.6)' },
    gray: { ring: '#9ca3af', text: '#6b7280', bg: 'rgba(31, 41, 55, 0.5)', borderNormal: 'rgba(75, 85, 99, 0.3)', borderHover: 'rgba(75, 85, 99, 0.3)', shadowHover: 'none' }
  };
  const theme = disabled ? config.gray : config[color] || config.cyan;
  const coreStyle = { backgroundColor: theme.bg, borderColor: isHovered && !disabled ? theme.borderHover : theme.borderNormal, boxShadow: isHovered && !disabled ? theme.shadowHover : '0 0 30px rgba(0,0,0,0.5)', transition: 'all 0.3s ease-out' };

  return (
    <div className={`relative w-64 h-64 flex items-center justify-center group ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`} onClick={!disabled ? onClick : undefined} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`absolute w-full h-full rounded-full border border-transparent transition-all duration-700 ${disabled ? '' : 'group-hover:scale-110'}`}><JarvisRing size="100%" color={theme.ring} speed={disabled ? "0s" : "20s"} dashArray="10 40 10 40" strokeWidth="0.5" opacity="0.3" paused={disabled} /></div>
      <div className={`absolute w-48 h-48 rounded-full transition-all duration-700 ${disabled ? '' : 'group-hover:rotate-45'}`}><JarvisRing size="100%" color={theme.ring} speed={disabled ? "0s" : "15s"} reverse dashArray="60 20 60 20" strokeWidth="1" opacity="0.5" paused={disabled} /></div>
      <div className="absolute w-40 h-40 rounded-full border perspective-500" style={{ borderColor: theme.borderNormal }}>{!disabled && (<div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-transparent group-hover:border-t-current group-hover:border-b-current transition-all duration-500 animate-spin-3d-slow" style={{ color: theme.ring }}></div>)}</div>
      <div className="absolute z-10 w-32 h-32 rounded-full backdrop-blur-md border-2 flex flex-col items-center justify-center p-2 text-center" style={coreStyle}>
        <div className="mb-1 transition-transform duration-300 group-hover:scale-110" style={{ color: theme.text }}><Icon className="w-6 h-6 drop-shadow-md" /></div>
        <div className={`font-orbitron font-bold text-[10px] leading-tight text-white tracking-widest ${disabled ? 'text-gray-400' : ''}`}>{title}</div>
        <div className="text-[8px] font-mono mt-1 uppercase tracking-wider opacity-80 leading-tight" style={{ color: theme.text }}>{sub}</div>
      </div>
      {disabled && (<div className="absolute z-20 text-gray-500 opacity-50"><Ban className="w-48 h-48" strokeWidth={0.5} /></div>)}
    </div>
  );
};

// --- COMPONENT 3: SELECTION MENU (ORB GRID) ---
const SelectionMenu = ({ onSelect }) => {
  return (
    <div className="relative z-30 w-full h-full flex flex-col items-center justify-center animate-fade-in-quick">
      <div className="text-center mb-16">
        <div className="text-[10px] font-mono text-gray-500 tracking-[0.3em] mb-3">SELECT OPERATION MODE</div>
        <h2 className="text-3xl md:text-4xl font-orbitron font-black text-white tracking-[0.15em] mb-2">COMMAND MODULE</h2>
        <div className="w-24 h-px bg-gray-700 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <OrbButton title="NAMMALENS" sub="CONTENT ENGINE" icon={Layers} color="gray" disabled={true} />
        <OrbButton title="KOUSHIKI ENGINE" sub="5 CASE DEMO" icon={Database} color="cyan" onClick={() => onSelect('demo')} />
        <OrbButton title="KOUSHIKI ENGINE" sub="LIVE ANALYSIS" icon={Activity} color="amber" onClick={() => onSelect('live')} />
        <OrbButton title="SYSTEM ADMIN" sub="RESTRICTED" icon={Key} color="red" onClick={() => onSelect('admin')} />
      </div>
    </div>
  );
};

// --- COMPONENT 4: CASE SELECTION LIST ---
const CaseList = ({ onSelectCase, onBack }) => {
  const cases = [
    { id: 1, title: "AARUSHI TALWAR", year: "2008", location: "Noida, UP", type: "Double Homicide", status: "COLD", confidence: 45, clues: 128 },
    { id: 2, title: "JESSICA LAL", year: "1999", location: "New Delhi", type: "Homicide", status: "SOLVED", confidence: 98, clues: 342 },
    { id: 3, title: "BEHMAI MASSACRE", year: "1981", location: "Behmai, UP", type: "Mass Murder", status: "ARCHIVED", confidence: 88, clues: 56 },
    { id: 4, title: "PALGHAR LYNCHING", year: "2020", location: "Palghar, MH", type: "Mob Violence", status: "ACTIVE", confidence: 67, clues: 210 },
    { id: 5, title: "GENERIC TEMPLATE", year: "2025", location: "Universal", type: "Template", status: "NEW", confidence: 10, clues: 0 },
  ];

  return (
    <div className="relative z-30 w-full max-w-3xl px-6 py-8 flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeftIcon />
        </button>
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Case Dossiers</h2>
          <div className="text-[10px] font-mono text-gray-600 mt-0.5">{cases.length} AVAILABLE CASES</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCase(c)}
            className="group w-full bg-[#0d0d0d] border border-gray-800/50 hover:border-gray-700 p-4 rounded flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-gray-500 text-[10px] font-mono border border-gray-800">
                {String(c.id).padStart(2, '0')}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-200">{c.title}</span>
                  <span className="text-[10px] font-mono text-gray-600">{c.year}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono tracking-wider
                    ${c.status === 'COLD' ? 'bg-blue-950/50 text-blue-400 border border-blue-900/50' :
                      c.status === 'ACTIVE' ? 'bg-amber-950/50 text-amber-400 border border-amber-900/50' :
                        c.status === 'SOLVED' ? 'bg-green-950/50 text-green-400 border border-green-900/50' :
                          c.status === 'ARCHIVED' ? 'bg-gray-900 text-gray-400 border border-gray-800' :
                            'bg-cyan-950/50 text-cyan-400 border border-cyan-900/50'}`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-[9px] font-mono text-gray-600">
                  <span>{c.location}</span>
                  <span className="text-gray-700">•</span>
                  <span>{c.type}</span>
                  <span className="text-gray-700">•</span>
                  <span>{c.clues} evidence items</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-[9px] font-mono text-gray-600">CONFIDENCE</div>
                <div className={`text-[10px] font-mono ${c.confidence < 40 ? 'text-red-400' : c.confidence < 70 ? 'text-amber-400' : 'text-green-400'}`}>
                  {c.confidence}%
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-gray-500 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT 5.1: INTERACTIVE ENTITY NEXUS GRAPH ---
const EntityNexus = ({ caseData }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Define connections between nodes
  const links = [
    { source: 1, target: 2, label: 'connected to' },
    { source: 1, target: 3, label: 'related to' },
    { source: 1, target: 4, label: 'found at' },
    { source: 2, target: 4, label: 'seen at' },
    { source: 5, target: 2, label: 'identified' },
    { source: 5, target: 1, label: 'witnessed' }
  ];

  // Initialize nodes based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });

        // Initialize nodes with positions based on container
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;

        setNodes([
          { id: 1, label: "VICTIM", type: 'victim', x: centerX, y: centerY, color: '#f59e0b', details: 'Primary subject of investigation. Age 24, last seen 2024-01-15.' },
          { id: 2, label: "SUSPECT A", type: 'suspect', x: centerX - 180, y: centerY - 80, color: '#ef4444', details: 'Person of interest. Known associate, no alibi for critical window.' },
          { id: 3, label: "WEAPON", type: 'evidence', x: centerX + 150, y: centerY + 100, color: '#06b6d4', details: 'Blunt object recovered from scene. Forensics pending.' },
          { id: 4, label: "LOC_HOME", type: 'location', x: centerX - 100, y: centerY + 180, color: '#22c55e', details: 'Primary crime scene. Noida Sector 25, Apartment 32.' },
          { id: 5, label: "WITNESS", type: 'person', x: centerX + 200, y: centerY - 120, color: '#a855f7', details: 'Eyewitness testimony. Neighbor, reported suspicious activity at 22:30.' },
          { id: 6, label: "VEHICLE", type: 'evidence', x: centerX + 80, y: centerY - 60, color: '#06b6d4', details: 'White sedan spotted near scene. Partial plate captured.' },
          { id: 7, label: "TIMELINE", type: 'data', x: centerX - 200, y: centerY + 60, color: '#8b5cf6', details: 'Critical window: 21:00 - 23:30. Cell data gaps detected.' }
        ]);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e, node) => {
    e.preventDefault();
    e.stopPropagation();
    const svg = containerRef.current.querySelector('svg');
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDraggedNode(node.id);
    setDragOffset({ x: x - node.x, y: y - node.y });
    setSelectedNode(node.id);
  };

  const handleMouseMove = (e) => {
    if (draggedNode === null) return;

    const svg = containerRef.current.querySelector('svg');
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodes(prev => prev.map(node =>
      node.id === draggedNode
        ? { ...node, x: x - dragOffset.x, y: y - dragOffset.y }
        : node
    ));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const handleNodeClick = (e, node) => {
    e.stopPropagation();
    setSelectedNode(selectedNode === node.id ? null : node.id);
  };

  const handleBackgroundClick = () => {
    setSelectedNode(null);
  };

  const getNodeById = (id) => nodes.find(n => n.id === id);
  const selectedNodeData = selectedNode ? getNodeById(selectedNode) : null;

  // Get connections for selected node
  const getConnections = (nodeId) => {
    return links
      .filter(l => l.source === nodeId || l.target === nodeId)
      .map(l => {
        const otherId = l.source === nodeId ? l.target : l.source;
        const otherNode = getNodeById(otherId);
        return otherNode ? otherNode.label : null;
      })
      .filter(Boolean);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        onClick={handleBackgroundClick}
        style={{ cursor: draggedNode ? 'grabbing' : 'default' }}
      >
        {/* Background grid pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="1" />
          </pattern>

          {/* Glow filters for each node color */}
          <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#f59e0b" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#ef4444" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#06b6d4" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#22c55e" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#a855f7" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-violet" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="#8b5cf6" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Selection ring animation */}
          <filter id="selection-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#ffffff" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Draw connection lines */}
        {links.map((link, i) => {
          const source = getNodeById(link.source);
          const target = getNodeById(link.target);
          if (!source || !target) return null;

          const isConnectedToSelected = selectedNode === link.source || selectedNode === link.target;

          return (
            <g key={i}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isConnectedToSelected ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.2)'}
                strokeWidth={isConnectedToSelected ? 2 : 1}
                style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
              />
              {/* Connection label on hover/select */}
              {isConnectedToSelected && (
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2 - 5}
                  fill="rgba(6, 182, 212, 0.7)"
                  fontSize="8"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {link.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw nodes */}
        {nodes.map(node => {
          const isSelected = selectedNode === node.id;
          const isDragging = draggedNode === node.id;
          const glowFilter = node.color === '#f59e0b' ? 'url(#glow-amber)'
            : node.color === '#ef4444' ? 'url(#glow-red)'
              : node.color === '#06b6d4' ? 'url(#glow-cyan)'
                : node.color === '#22c55e' ? 'url(#glow-green)'
                  : node.color === '#8b5cf6' ? 'url(#glow-violet)'
                    : 'url(#glow-purple)';

          return (
            <g
              key={node.id}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              onMouseDown={(e) => handleMouseDown(e, node)}
              onClick={(e) => handleNodeClick(e, node)}
            >
              {/* Selection ring */}
              {isSelected && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={18}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  style={{ animation: 'spin 8s linear infinite' }}
                />
              )}

              {/* Outer glow ring on hover/select */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 14 : 10}
                fill={`${node.color}20`}
                stroke={node.color}
                strokeWidth={isSelected ? 2 : 1}
                strokeOpacity={isSelected ? 0.8 : 0.4}
                style={{ transition: 'r 0.2s, stroke-width 0.2s' }}
              />

              {/* Main node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 8 : 6}
                fill={node.color}
                filter={glowFilter}
                style={{ transition: 'r 0.2s' }}
              />

              {/* Node label */}
              <text
                x={node.x + (isSelected ? 22 : 15)}
                y={node.y + 4}
                fill={isSelected ? '#fff' : '#aaa'}
                fontSize={isSelected ? '11' : '10'}
                fontFamily="'Orbitron', monospace"
                fontWeight={isSelected ? 'bold' : 'normal'}
                style={{ transition: 'fill 0.2s, font-size 0.2s', pointerEvents: 'none' }}
              >
                {node.label}
              </text>

              {/* Type indicator */}
              <text
                x={node.x + (isSelected ? 22 : 15)}
                y={node.y + 16}
                fill="#666"
                fontSize="8"
                fontFamily="monospace"
                style={{ pointerEvents: 'none' }}
              >
                {node.type.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Node Detail Panel */}
      {selectedNodeData && (
        <div className="absolute top-4 left-4 bg-black/80 border border-gray-700 rounded-lg p-4 max-w-xs backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedNodeData.color, boxShadow: `0 0 8px ${selectedNodeData.color}` }}
              />
              <span className="text-sm font-bold text-white font-mono">{selectedNodeData.label}</span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
            Type: {selectedNodeData.type}
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-3">
            {selectedNodeData.details}
          </p>

          <div className="border-t border-gray-700 pt-2">
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-wider mb-1">
              Connections ({getConnections(selectedNodeData.id).length})
            </div>
            <div className="flex flex-wrap gap-1">
              {getConnections(selectedNodeData.id).map((conn, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-cyan-900/30 border border-cyan-800/50 rounded text-[9px] text-cyan-400 font-mono">
                  {conn}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 text-[8px] text-gray-600 font-mono">
            Drag to reposition • Click elsewhere to deselect
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/60 border border-gray-800 p-2 rounded text-[9px] font-mono text-gray-400">
        <div className="text-[8px] text-gray-600 mb-1.5 uppercase tracking-wider">Entity Types</div>
        <div className="flex items-center gap-1.5 mb-1"><span className="text-red-500">●</span> SUSPECT</div>
        <div className="flex items-center gap-1.5 mb-1"><span className="text-amber-500">●</span> VICTIM</div>
        <div className="flex items-center gap-1.5 mb-1"><span className="text-cyan-500">●</span> EVIDENCE</div>
        <div className="flex items-center gap-1.5 mb-1"><span className="text-green-500">●</span> LOCATION</div>
        <div className="flex items-center gap-1.5 mb-1"><span className="text-purple-500">●</span> PERSON</div>
        <div className="flex items-center gap-1.5"><span className="text-violet-500">●</span> DATA</div>
      </div>

      {/* Instructions overlay (shows briefly) */}
      <div className="absolute bottom-4 left-4 text-[9px] font-mono text-gray-600">
        Click node to select • Drag to move
      </div>

      {/* CSS for selection animation */}
      <style>{`
        @keyframes spin {
          from { transform-origin: center; transform: rotate(0deg); }
          to { transform-origin: center; transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// --- COMPONENT 5: CASE DASHBOARD ---
const CaseDashboard = ({ caseData, onBack }) => {
  const [activePanel, setActivePanel] = useState('analysis');
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: 'system', text: `Accessing ${caseData.title} database. Forensic embeddings loaded. How can I assist?` }]);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'system', text: `Analyzing "${chatInput}" against case evidence... Correlation found in timeline segment 4.` }]);
    }, 1000);
  };

  const handleGenerateReport = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setMessages(prev => [...prev, { role: 'system', text: `[REPORT] Forensic Dossier compiled successfully. Sent to secure output stream.` }]);
    }, 3000);
  };

  const ActionButton = ({ id, label, icon: Icon, subItems }) => {
    const isActive = activePanel === id;
    const [showSub, setShowSub] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => { setActivePanel(id); if (subItems) setShowSub(!showSub); }}
          className={`w-full py-2.5 px-3 rounded text-left flex items-center justify-between transition-all group
            ${isActive
              ? 'bg-cyan-950/50 border-l-2 border-l-cyan-400 border-y border-r border-y-cyan-900/30 border-r-cyan-900/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]'
              : 'border-l-2 border-l-transparent hover:border-l-gray-600 hover:bg-gray-900/30'}`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`text-[11px] font-medium tracking-wide ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-500'}`} />
            {subItems && <ChevronRight className={`w-3 h-3 text-gray-600 transition-transform ${showSub ? 'rotate-90' : ''}`} />}
          </div>
        </button>
        {subItems && showSub && (
          <div className="mt-1 ml-3 space-y-0.5 border-l border-gray-800 pl-3 animate-fade-in-quick">
            {subItems.map((sub, i) => (
              <button key={i} className="w-full text-left text-[10px] text-gray-500 hover:text-gray-300 py-1.5 transition-colors">
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col bg-[#0a0a0a] relative z-40 mt-8">
      {/* Case Header - Strong Visual Anchor */}
      <header className="border-b border-gray-800 bg-[#0d0d0d]">
        {/* Primary Row: Case Identity */}
        <div className="h-14 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1.5 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors">
              <ArrowLeftIcon />
            </button>
            <div className="w-px h-6 bg-gray-800"></div>
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-mono text-gray-600 tracking-wider">CASE-{String(caseData.id).padStart(4, '0')}</div>
              <h2 className="text-base font-medium text-white tracking-wide">{caseData.title}</h2>
              <div className={`px-2 py-0.5 rounded text-[9px] font-mono font-medium tracking-wider
                ${caseData.status === 'COLD' ? 'bg-blue-950/50 text-blue-400 border border-blue-900/50' :
                  caseData.status === 'ACTIVE' ? 'bg-amber-950/50 text-amber-400 border border-amber-900/50' :
                    caseData.status === 'SOLVED' ? 'bg-green-950/50 text-green-400 border border-green-900/50' :
                      'bg-gray-900/50 text-gray-400 border border-gray-800'}`}>
                {caseData.status}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-gray-300 text-[10px] font-medium hover:bg-gray-800 hover:border-gray-600 transition-colors"
              disabled={isCompiling}
            >
              {isCompiling ? <RefreshCw className="w-3 h-3 animate-spin" /> : <FileDown className="w-3 h-3" />}
              {isCompiling ? "COMPILING..." : "EXPORT DOSSIER"}
            </button>
          </div>
        </div>

        {/* Secondary Row: Case Metadata */}
        <div className="h-8 flex items-center justify-between px-5 border-t border-gray-800/50 bg-black/30">
          <div className="flex items-center gap-6 text-[9px] font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">YEAR</span>
              <span className="text-gray-400">{caseData.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">LOCATION</span>
              <span className="text-gray-400">{caseData.location || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">TYPE</span>
              <span className="text-gray-400">{caseData.type || 'Investigation'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">EVIDENCE</span>
              <span className="text-gray-400">{caseData.clues} items</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-gray-600">CONFIDENCE</span>
            <div className="w-16 h-1.5 bg-gray-900 rounded overflow-hidden">
              <div
                className={`h-full ${caseData.confidence < 40 ? 'bg-red-500' : caseData.confidence < 70 ? 'bg-amber-500' : 'bg-green-500'}`}
                style={{ width: `${caseData.confidence}%` }}
              ></div>
            </div>
            <span className={`text-[9px] font-mono ${caseData.confidence < 40 ? 'text-red-400' : caseData.confidence < 70 ? 'text-amber-400' : 'text-green-400'}`}>
              {caseData.confidence}%
            </span>
          </div>
        </div>
      </header>


      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 border-r border-gray-800/50 bg-black/30 py-4 overflow-y-auto custom-scrollbar">
          {/* ANALYSIS Section */}
          <div className="px-4 mb-1">
            <div className="text-[9px] font-mono text-gray-600 tracking-[0.2em] mb-2">ANALYSIS</div>
          </div>
          <div className="px-2 space-y-0.5">
            <ActionButton id="analysis" label="Entity Correlation" icon={Share2} />
            <ActionButton id="clues" label="Evidence Gaps" icon={Search} />
          </div>

          {/* VISUALIZATION Section */}
          <div className="px-4 mt-6 mb-1">
            <div className="text-[9px] font-mono text-gray-600 tracking-[0.2em] mb-2">VISUALIZATION</div>
          </div>
          <div className="px-2 space-y-0.5">
            <ActionButton id="recon" label="Scene Reconstruction" icon={Box} subItems={["3D Walkthrough", "2D Floorplan", "Comic Sequence"]} />
            <ActionButton id="timeline" label="Timeline Generator" icon={Clock} />
            <ActionButton id="hotspot" label="Crime Hotspot Map" icon={Map} />
          </div>

          {/* REPORTING Section */}
          <div className="px-4 mt-6 mb-1">
            <div className="text-[9px] font-mono text-gray-600 tracking-[0.2em] mb-2">REPORTING</div>
          </div>
          <div className="px-2 space-y-0.5">
            <ActionButton id="dossier" label="Case Dossier" icon={FileText} />
          </div>
        </aside>
        <main className="flex-1 bg-black/20 p-5 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)]"></div>

          {activePanel === 'analysis' && (
            <div className="w-full h-full flex flex-col gap-4 relative z-10">
              {/* Status Bar - Situational Context */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-900/30 border border-amber-700/50 rounded text-[10px] font-mono">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                    <span className="text-amber-400 font-medium">REQUIRES ATTENTION</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500">3 unresolved correlations</span>
                </div>
                <div className="text-[9px] font-mono text-gray-600">Last updated: 2 hours ago</div>
              </div>

              {/* Primary Card - Dominates Layout */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex justify-between items-center mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-gray-500" />
                    <span className="text-[11px] text-gray-300 font-medium tracking-wide">Entity Correlation Map</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-[9px] text-gray-600 font-mono">12 entities • 45 connections</div>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-cyan-950/50 border border-cyan-900/50 rounded">
                      <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
                      <span className="text-[9px] font-mono text-cyan-400">LIVE</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 border border-gray-800/50 rounded bg-black/40 relative overflow-hidden">
                  <EntityNexus caseData={caseData} />
                </div>
              </div>

              {/* Secondary Cards Row - Subdued, Informational */}
              <div className="grid grid-cols-3 gap-3">
                {/* Confidence Score Card */}
                <div className="bg-black/30 border border-gray-800/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-gray-600 tracking-wider">CONFIDENCE</span>
                    <span className="text-[9px] font-mono text-amber-500">{caseData.confidence}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-900 rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-green-500" style={{ width: `${caseData.confidence}%` }}></div>
                  </div>
                  <div className="text-[8px] text-gray-600 mt-1.5">
                    {caseData.confidence < 50 ? 'Low confidence — more evidence needed' : caseData.confidence < 75 ? 'Moderate confidence' : 'High confidence'}
                  </div>
                </div>

                {/* Critical Alerts Card */}
                <div className="bg-black/30 border border-gray-800/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-gray-600 tracking-wider">CRITICAL ALERTS</span>
                    <span className="text-[9px] font-mono text-red-400">2</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span>Witness statement conflict</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Timeline gap: 2hr window</span>
                    </div>
                  </div>
                </div>

                {/* Evidence Gaps Card */}
                <div className="bg-black/30 border border-gray-800/30 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-gray-600 tracking-wider">EVIDENCE GAPS</span>
                    <span className="text-[9px] font-mono text-gray-400">{caseData.clues}</span>
                  </div>
                  <div className="text-[9px] text-gray-500 leading-relaxed">
                    Missing forensic data for key timeframe. Recommend CCTV re-analysis.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'clues' && (
            <div className="w-full h-full flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/30 border border-gray-700/50 rounded text-[10px] font-mono w-fit">
                <span className="text-gray-400">STABLE</span>
              </div>
              <div className="flex-1 border border-dashed border-gray-700 rounded flex items-center justify-center text-gray-600 font-mono text-xs">[ Evidence Gap Analysis Loading... ]</div>
            </div>
          )}

          {activePanel === 'recon' && (
            <div className="w-full h-full flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-900/20 border border-cyan-800/50 rounded text-[10px] font-mono w-fit">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-cyan-400">PROCESSING</span>
              </div>
              <div className="flex-1 border border-dashed border-gray-700 rounded flex items-center justify-center text-gray-600 font-mono text-xs">[ 3D Scene Reconstruction Initializing... ]</div>
            </div>
          )}

          {['timeline', 'hotspot', 'dossier'].includes(activePanel) && (
            <div className="w-full h-full flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/30 border border-gray-700/50 rounded text-[10px] font-mono w-fit">
                <span className="text-gray-400">STABLE</span>
              </div>
              <div className="flex-1 border border-dashed border-gray-700 rounded flex items-center justify-center text-gray-600 font-mono text-xs">[ Module Loading... ]</div>
            </div>
          )}
        </main>
        {/* AI Assistant Panel - Reduced Prominence */}
        <div className="w-72 bg-[#0a0a0a] flex flex-col border-l border-gray-800/50">
          <div className="px-4 py-3 border-b border-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] font-mono text-gray-400 tracking-wider">KOUSHIKI ASSISTANT</span>
            </div>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-3 py-2 rounded text-[10px] font-mono leading-relaxed
                  ${m.role === 'user'
                    ? 'bg-gray-800 text-gray-200 border border-gray-700'
                    : 'bg-gray-900/50 text-gray-400 border border-gray-800/50'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-800/50">
            <form onSubmit={handleChat} className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Query case data..."
                className="w-full bg-gray-900/50 border border-gray-800 rounded px-3 py-2 text-[10px] text-gray-300 focus:outline-none focus:border-gray-600 placeholder-gray-600"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT 6: ADMIN AUTH ---
const AdminAuth = ({ onBack, onLogin }) => {
  const [pass, setPass] = useState("");
  return (
    <div className="relative z-30 flex flex-col items-center justify-center animate-zoom-in p-8 bg-black/80 border border-red-900/50 rounded-xl backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.2)]">
      <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
      <h2 className="text-2xl font-orbitron font-bold text-red-100 tracking-widest mb-6">SYSTEM RESTRICTED</h2>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="ENTER PASSKEY" className="w-64 bg-black border border-red-800 rounded px-4 py-2 text-red-100 text-center font-mono focus:outline-none focus:border-red-500 mb-4" />
      <div className="flex gap-4">
        <button onClick={onBack} className="px-6 py-2 border border-gray-700 text-gray-400 rounded hover:bg-gray-800 font-mono text-xs">CANCEL</button>
        <button onClick={() => {
          if (pass === 'admin') onLogin();
          else alert("Access Denied");
        }} className="px-6 py-2 bg-red-900/20 border border-red-700 text-red-400 rounded hover:bg-red-900/40 font-mono text-xs font-bold">AUTHENTICATE</button>
      </div>
    </div>
  );
};

// --- COMPONENT 7: LIVE ANALYSIS DASHBOARD ---
const LiveAnalysisDashboard = ({ onBack }) => {
  const [activePod, setActivePod] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: 'system', text: "Koushiki Engine Live. All 13 Neural Pods online. Upload evidence to route to specific pods, or ask me directly." }]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileHash, setFileHash] = useState(null);
  const [autoRoute, setAutoRoute] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      // Simulate SHA-256 Hash
      const mockHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setFileHash(mockHash);
      setMessages(prev => [...prev, { role: 'system', text: `File "${file.name}" uploaded. [SHA-256: ${mockHash.substring(0, 8)}...] integrity verified.` }]);
    }
  };

  const isPodRecommended = (pod) => {
    if (!autoRoute || !uploadedFile) return false;
    // Simple Mock Logic: If image -> Vis/Fac/OSINT
    const name = uploadedFile.name.toLowerCase();
    const isImage = name.endsWith('.jpg') || name.endsWith('.png');
    const isAudio = name.endsWith('.wav') || name.endsWith('.mp3');

    if (isImage && ['vis', 'fac', 'osi'].includes(pod.id)) return true;
    if (isAudio && ['aud', 'nlp'].includes(pod.id)) return true;
    return false;
  };

  const handlePodClick = (pod) => {
    if (uploadedFile) {
      setMessages(prev => [...prev, { role: 'system', text: `Routing "${uploadedFile.name}" to ${pod.name} Pod... [SIMULATED PROCESS STARTED]` }]);
      setUploadedFile(null);
      setFileHash(null);
    } else {
      setActivePod(pod);
      setShowDetail(true);
    }
  };

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'system', text: `Processing query across active pods... Result: No anomalies found in current buffer.` }]);
    }, 1000);
  };

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col bg-[#0a0a0a] relative z-40 mt-8">
      <header className="border-b border-gray-800 bg-[#0d0d0d]">
        <div className="h-14 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1.5 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors">
              <ArrowLeftIcon />
            </button>
            <div className="w-px h-6 bg-gray-800"></div>
            <div>
              <h2 className="text-base font-medium text-white tracking-wide">Live Intelligence</h2>
              <div className="text-[10px] font-mono text-gray-600 mt-0.5">ACTIVE SESSION • {SYSTEM_PODS.length} PODS ONLINE</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setAutoRoute(!autoRoute)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-[10px] font-medium transition-colors ${autoRoute ? 'bg-gray-800 border-gray-700 text-gray-300' : 'border-gray-800 text-gray-600 hover:text-gray-400'}`}
            >
              {autoRoute ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
              AUTO-ROUTE
            </button>

            <div className="flex items-center gap-2 px-2.5 py-1 bg-green-950/30 border border-green-900/50 rounded text-[9px] font-mono text-green-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              LIVE
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SYSTEM_PODS.filter(p => !['orc'].includes(p.id)).map((pod) => {
              const recommended = isPodRecommended(pod);
              const dimmed = autoRoute && uploadedFile && !recommended;

              return (
                <button
                  key={pod.id}
                  onClick={() => handlePodClick(pod)}
                  className={`relative group h-44 p-4 border rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden 
                        ${recommended ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-105 z-10' :
                      dimmed ? 'opacity-30 blur-[1px]' :
                        activePod?.id === pod.id ? 'bg-amber-900/30 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
                          pod.foundation ? (
                            pod.foundationType === 'meta' ? 'bg-purple-900/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]' :
                              pod.foundationType === 'infra' ? 'bg-amber-900/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]' :
                                'bg-cyan-900/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                          ) :
                            'bg-black/40 border-gray-800 hover:border-amber-500/50 hover:bg-amber-900/10'}
                    `}
                >
                  {/* Port Badge */}
                  <div className={`absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded ${pod.foundation ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-800 text-gray-400'}`}>
                    :{pod.port}
                  </div>

                  {/* Foundation Badge */}
                  {pod.foundation && (
                    <div className={`absolute top-2 left-2 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${pod.foundationType === 'meta' ? 'bg-purple-500 text-black' :
                      pod.foundationType === 'infra' ? 'bg-amber-500 text-black' :
                        'bg-cyan-500 text-black'
                      }`}>
                      FOUNDATION
                    </div>
                  )}

                  <div className="group-hover:opacity-0 transition-opacity duration-300 absolute flex flex-col items-center">
                    <div className={`p-4 rounded-full mb-3 ${pod.foundation ? (
                      pod.foundationType === 'meta' ? 'bg-purple-900/30 text-purple-400' :
                        pod.foundationType === 'infra' ? 'bg-amber-900/30 text-amber-400' :
                          'bg-cyan-900/30 text-cyan-400'
                    ) : pod.advanced ? 'bg-purple-900/20 text-purple-400' : 'bg-cyan-900/20 text-cyan-400'
                      }`}><pod.icon className="w-8 h-8" /></div>
                    <div className="font-orbitron font-bold text-base text-gray-200">{pod.name}</div>
                    <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase">{pod.desc}</div>
                    {pod.subPodCount && <div className="text-[9px] text-gray-600 mt-1">{pod.subPodCount} SUB-PODS</div>}
                    {recommended && <div className="mt-2 text-[9px] font-bold bg-cyan-500 text-black px-2 py-0.5 rounded">RECOMMENDED</div>}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
                    <div className="text-amber-400 font-bold text-xs mb-2 font-orbitron tracking-widest">{uploadedFile ? 'ROUTE FILE' : 'INSPECT POD'}</div>
                    <div className="flex flex-wrap justify-center gap-2">{pod.sub.slice(0, 3).map((sub, i) => (<span key={i} className="text-[10px] px-2 py-1 bg-gray-800 rounded text-cyan-300 border border-cyan-900/50">{sub}</span>))}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SYSTEM STATUS HUD (Right Side) - Enhanced with new panels */}
        <div className="w-80 bg-black/40 border-l border-gray-800/50 hidden lg:flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {/* Koushiki Evolution */}
            <KoushikiEvolutionPanel />

            {/* Data Sources */}
            <DataSourcesPanel />

            {/* API Integrations */}
            <APIStatusPanel />

            {/* === CRITICAL COMPLIANCE PANELS === */}

            {/* Confidence Dashboard - Per-Step Breakdown */}
            <ConfidenceDashboard />

            {/* SOP Compliance - Legal Admissibility */}
            <SOPCompliancePanel />

            {/* Case Metadata - Quality Assessment */}
            <CaseMetadataPanel caseId="aarushi" />

            {/* Foundation Layer Status - Condensed */}
            <div className="bg-black/60 border border-gray-800 rounded-lg p-4">
              <div className="text-xs font-bold text-amber-500 font-orbitron mb-3 flex items-center gap-2">
                <Network className="w-3 h-3" /> FOUNDATION LAYER
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-cyan-400">SYNTHETIC :8130</span>
                  <span className="text-gray-400">17 pods • 85%</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-amber-400">INFRA :8140</span>
                  <span className="text-gray-400">19 pods • 100%</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-purple-400">META-LEARN :8150</span>
                  <span className="text-gray-400">16 pods • 60%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-800">
                  <span className="text-gray-300">ORCHESTRATOR</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-green-400">18/18 UP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chain Validation Status */}
            <div className="bg-black/60 border border-green-900/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span className="text-[10px] font-bold text-green-300">CHAIN VALIDATION</span>
                </div>
                <span className="text-[9px] font-mono text-green-400 bg-green-900/30 px-2 py-0.5 rounded">VERIFIED</span>
              </div>
              <div className="text-[9px] text-gray-500 mt-1">
                Last validated: 2 min ago • NIST compliant
              </div>
            </div>
          </div>
        </div>

        {/* DETAIL MODAL OVERLAY */}
        {showDetail && activePod && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center animate-zoom-in">
            <div className="w-[600px] bg-black border border-cyan-500/50 rounded-xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] relative">
              <button onClick={() => setShowDetail(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              <div className="flex items-center gap-4 mb-6 border-b border-cyan-900/50 pb-4">
                <div className={`p-3 rounded-lg ${activePod.foundation ? (
                  activePod.foundationType === 'meta' ? 'bg-purple-900/20 text-purple-400' :
                    activePod.foundationType === 'infra' ? 'bg-amber-900/20 text-amber-400' :
                      'bg-cyan-900/20 text-cyan-400'
                ) : 'bg-cyan-900/20 text-cyan-400'}`}><activePod.icon className="w-8 h-8" /></div>
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-white">{activePod.name} POD DIAGNOSTICS</h2>
                  <div className="flex gap-4 text-xs font-mono text-cyan-600 mt-1">
                    <span>PORT: <span className="text-amber-400">{activePod.port}</span></span>
                    <span>VER: {activePod.version}</span>
                    <span>HEALTH: <span className="text-green-400">{activePod.health}</span></span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {activePod.sub.map((sub, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-900/50 border border-gray-800 rounded">
                    <span className="text-[10px] font-mono text-gray-400">{sub}</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded text-[10px] font-medium hover:bg-gray-700 transition-colors">Run Diagnostics</button>
                <button className="flex-1 py-2 border border-gray-800 text-gray-500 rounded text-[10px] font-medium hover:bg-gray-900 hover:text-gray-400 transition-colors">View Logs</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-64 border-t border-amber-900/30 bg-black/80 flex flex-col">
        <div className="px-4 py-2 border-b border-amber-900/20 bg-amber-900/5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 font-orbitron"><Terminal className="w-3 h-3" /> KOUSHIKI CORE TERMINAL</div>
          {uploadedFile && (
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-4 bg-cyan-900/20 px-3 py-1 rounded border border-cyan-800">
              <span className="flex items-center gap-2"><FileText className="w-3 h-3" /> {uploadedFile.name}</span>
              <span className="text-green-400 flex items-center gap-1 font-bold border-l border-cyan-800 pl-4"><ShieldCheck className="w-3 h-3" /> [SHA-256: VERIFIED]</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs custom-scrollbar">{messages.map((m, i) => (<div key={i} className={`${m.role === 'user' ? 'text-right text-gray-300' : 'text-amber-500/80'}`}><span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>{m.role === 'system' ? <span className="font-bold text-amber-500">KOUSHIKI:</span> : <span className="font-bold text-cyan-500">USER:</span>} {m.text}</div>))}</div>
        <div className="p-4 border-t border-amber-900/20 bg-black flex gap-4 items-center"><div className="relative group"><input type="file" className="absolute inset-0 opacity-0 cursor-pointer w-full" onChange={handleFileUpload} /><button className="p-2 bg-gray-900 border border-gray-700 rounded text-gray-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors"><Upload className="w-5 h-5" /></button></div><form onSubmit={handleChat} className="flex-1 relative"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={uploadedFile ? "Select a pod above to process file, or type instructions..." : "Ask Koushiki to perform analysis..."} className="w-full bg-gray-900/50 border border-amber-900/30 rounded px-4 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-500 placeholder-gray-600 font-mono" /><button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-400"><ChevronRight className="w-5 h-5" /></button></form></div>
      </div>
    </div>
  );
};

// --- COMPONENT 8: ADMIN DASHBOARD (PAGE 5) ---
const AdminDashboard = ({ onBack }) => {
  const [selectedPod, setSelectedPod] = useState(null);
  const [logsSystem, setLogsSystem] = useState(["[SYS] Kernel init...", "[SYS] Pod orchestration started.", "[SYS] Koushiki L2 Model Loaded."]);
  const [logsSecurity, setLogsSecurity] = useState(["[SEC] Handshake OK: 127.0.0.1", "[SEC] Port 8000 listening.", "[SEC] Encryption: AES-256"]);
  const scrollRefSys = useRef(null);
  const scrollRefSec = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSys = `[SYS] ${['Allocating VRAM', 'Garbage collection', 'Syncing nodes', 'Optimizing tensor flow'][Math.floor(Math.random() * 4)]}...`;
      const newSec = `[SEC] ${['Packet verify', 'Hash check', 'Token refresh', 'Latency ping'][Math.floor(Math.random() * 4)]}: ${Math.floor(Math.random() * 50)}ms`;
      setLogsSystem(prev => [...prev.slice(-15), newSys]);
      setLogsSecurity(prev => [...prev.slice(-15), newSec]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const QUEUE_ITEMS = [
    { id: 'JOB-4421', file: 'cctv_footage_04.mp4', pod: 'VISION', status: 'Processing', prog: 65 },
    { id: 'JOB-4422', file: 'audio_intercept.wav', pod: 'AUDIO', status: 'Queued', prog: 0 },
    { id: 'JOB-4419', file: 'forensic_dump.mem', pod: 'FORENSICS', status: 'Completed', prog: 100 },
  ];

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col bg-[#0a0a0a] relative z-40 mt-8 text-gray-300 font-mono">
      {/* HEADER */}
      <header className="border-b border-gray-800 bg-[#0d0d0d]">
        <div className="h-14 flex items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-1.5 hover:bg-gray-800 rounded text-gray-500 hover:text-gray-300 transition-colors">
              <ArrowLeftIcon />
            </button>
            <div className="w-px h-6 bg-gray-800"></div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-base font-medium text-white tracking-wide">System Administrator</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600">
            <span>ROOT ACCESS</span>
            <span className="text-gray-700">•</span>
            <span>SESSION: ADMIN-8821</span>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">

        {/* COL 1: INFRA HEALTH (Interactive) */}
        <div className="flex flex-col gap-4">
          <div className="bg-black/40 border border-gray-800 rounded-lg p-4 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2"><Server className="w-3 h-3" /> INFRASTRUCTURE HEALTH MATRIX</h3>
            <div className="grid grid-cols-3 gap-2">
              {SYSTEM_PODS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPod(p)}
                  className={`p-2 rounded border transition-colors text-left group
                    ${selectedPod?.id === p.id
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                    }
                  `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-medium ${selectedPod?.id === p.id ? 'text-gray-200' : 'text-gray-400'}`}>{p.name}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                  </div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: Math.min(p.sub.length, 6) }).map((_, j) => (
                      <div key={j} className={`w-1 h-2 rounded-sm ${selectedPod?.id === p.id ? 'bg-red-900' : 'bg-gray-700 group-hover:bg-red-900/50'}`}></div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/40 border border-gray-800 rounded-lg p-4 h-1/3">
            <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2"><HardDrive className="w-3 h-3" /> ACTIVE PROCESS QUEUE</h3>
            <div className="space-y-2">
              {QUEUE_ITEMS.map(q => (
                <div key={q.id} className="text-[9px] border-b border-gray-800 pb-1">
                  <div className="flex justify-between text-gray-400 mb-1">
                    <span>{q.id} : {q.file}</span>
                    <span className={q.status === 'Completed' ? 'text-green-500' : q.status === 'Processing' ? 'text-amber-500' : 'text-gray-600'}>{q.status}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded overflow-hidden"><div className={`h-full ${q.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${q.prog}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COL 2: NEURAL STATE / POD DETAIL */}
        <div className="bg-black/40 border border-gray-800 rounded-lg p-4 flex flex-col relative overflow-hidden">
          {selectedPod ? (
            <div className="flex flex-col h-full animate-fade-in-quick">
              <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-900/20 rounded border border-red-900/50 text-red-500"><selectedPod.icon className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-lg font-orbitron text-white">{selectedPod.name} POD</h3>
                    <div className="text-[10px] text-gray-500 font-mono">ID: {selectedPod.id.toUpperCase()}-882</div>
                  </div>
                </div>
                <button onClick={() => setSelectedPod(null)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-900/50 p-2 rounded border border-gray-800">
                    <div className="text-[9px] text-gray-500 mb-1">CPU LOAD</div>
                    <div className="text-xl text-red-400 font-mono">{selectedPod.cpu}%</div>
                    <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="bg-red-500 h-full" style={{ width: `${selectedPod.cpu}%` }}></div></div>
                  </div>
                  <div className="bg-gray-900/50 p-2 rounded border border-gray-800">
                    <div className="text-[9px] text-gray-500 mb-1">MEMORY</div>
                    <div className="text-xl text-red-400 font-mono">{selectedPod.mem}MB</div>
                    <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="bg-red-500 h-full" style={{ width: '45%' }}></div></div>
                  </div>
                </div>
                <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">SUB-POD DIAGNOSTICS</h4>
                <div className="space-y-2">
                  {selectedPod.sub.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-black border border-gray-800 rounded hover:border-red-900/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></div>
                        <span className="text-xs text-gray-300 font-mono">{sub}</span>
                      </div>
                      <span className="text-[9px] text-gray-600 font-mono">LATENCY: {Math.floor(Math.random() * 20) + 5}ms</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800 flex gap-2">
                <button className="flex-1 py-2 bg-red-900/20 border border-red-800 rounded text-red-500 text-xs font-bold hover:bg-red-900/40">RESTART POD</button>
                <button className="flex-1 py-2 border border-gray-700 text-gray-400 rounded text-xs hover:bg-gray-800">VIEW LOGS</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Brain className="w-24 h-24 text-purple-500/50 mb-4 animate-pulse" />
              <h3 className="text-lg font-orbitron text-purple-400 mb-2">KOUSHIKI NEURAL STATE</h3>
              <div className="text-center space-y-4 w-full">
                <div>
                  <div className="flex justify-between text-[10px] text-purple-300 mb-1"><span>PATTERN CONFIDENCE</span><span>87%</span></div>
                  <div className="w-full h-1 bg-gray-800 rounded"><div className="w-[87%] h-full bg-purple-500"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-purple-300 mb-1"><span>NEW RULES GENERATED</span><span>1,240</span></div>
                  <div className="w-full h-1 bg-gray-800 rounded"><div className="w-[60%] h-full bg-purple-500"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-purple-300 mb-1"><span>META-WEIGHTS OPTIMIZED</span><span>99.2%</span></div>
                  <div className="w-full h-1 bg-gray-800 rounded"><div className="w-[99%] h-full bg-purple-500"></div></div>
                </div>
              </div>
              <div className="mt-8 text-[10px] text-gray-500">SELECT A POD FROM THE LEFT TO INSPECT</div>
            </div>
          )}
        </div>

        {/* COL 3: SYSTEM STATUS & LOGS */}
        <div className="flex flex-col gap-4">
          {/* System Capabilities Panel */}
          <div className="bg-black/40 border border-gray-800 rounded-lg p-4">
            <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2"><AlertOctagon className="w-3 h-3" /> FULL SYSTEM STATUS</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-[10px] text-gray-400">RAG KNOWLEDGE BASE</span>
                <span className="text-[10px] text-green-500 font-bold bg-green-900/20 px-2 py-0.5 rounded">ONLINE</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-[10px] text-gray-400">VECTOR EMBEDDINGS</span>
                <span className="text-[10px] text-blue-400 font-mono">1,240,592</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-[10px] text-gray-400">ORCHESTRATOR LATENCY</span>
                <span className="text-[10px] text-yellow-500 font-mono">12ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400">META-LEARNING LEVEL</span>
                <span className="text-[10px] text-purple-500 font-bold">LVL 2</span>
              </div>
            </div>
          </div>

          {/* Dual Logs */}
          <div className="flex-1 bg-black rounded-lg border border-gray-800 p-2 font-mono text-[9px] flex flex-col h-40">
            <div className="text-gray-500 border-b border-gray-800 pb-1 mb-1 flex items-center gap-2"><Terminal className="w-3 h-3" /> SYSTEM CORE LOG</div>
            <div className="flex-1 overflow-hidden text-cyan-700/80 space-y-1" ref={scrollRefSys}>
              {logsSystem.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
          <div className="flex-1 bg-black rounded-lg border border-gray-800 p-2 font-mono text-[9px] flex flex-col h-40">
            <div className="text-gray-500 border-b border-gray-800 pb-1 mb-1 flex items-center gap-2"><Wifi className="w-3 h-3" /> NET/SEC LOG</div>
            <div className="flex-1 overflow-hidden text-amber-700/80 space-y-1" ref={scrollRefSec}>
              {logsSecurity.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN APP ORCHESTRATOR ---

export default function App() {
  const [view, setView] = useState('landing'); // landing, selection, demo-list, case-dashboard, admin, live
  const [selectedCase, setSelectedCase] = useState(null);

  const handleEnter = () => setView('selection');

  const handleSelection = (mode) => {
    if (mode === 'demo') setView('demo-list');
    else if (mode === 'admin') setView('admin');
    else if (mode === 'live') setView('live');
    else console.log(`Selected Mode: ${mode}`);
  };

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
    setView('case-dashboard');
  };

  const handleAdminLogin = () => {
    setView('admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center justify-center pt-8">
      {/* Persistent System Bar */}
      <SystemBar />

      <StarfieldBackground />
      <CyberGrid />
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10"></div>

      {view !== 'case-dashboard' && view !== 'live' && view !== 'admin-dashboard' && (
        <header className="absolute top-10 w-full px-6 py-4 flex justify-between items-start pointer-events-none opacity-0 animate-fade-in-down z-30" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-orbitron font-bold text-gray-300 tracking-[0.2em]">KOUSHIKI.AI</h1>
            <div className="text-[9px] font-mono text-gray-600 mt-0.5 tracking-wider">INVESTIGATION INTELLIGENCE PLATFORM</div>
          </div>
          <div className="text-right font-mono text-[9px] text-gray-600 hidden md:block">
            <div className="flex items-center justify-end gap-2"><Lock className="w-2.5 h-2.5 text-gray-500" /> SECURE CHANNEL</div>
            <div className="flex items-center justify-end gap-2 mt-1"><Cpu className="w-2.5 h-2.5 text-gray-500" /> AMD ROCm ACTIVE</div>
          </div>
        </header>
      )}

      {view === 'landing' && (
        <main className="relative z-30 transform transition-all duration-1000 flex items-center justify-center w-full h-full animate-fade-in-up">
          <JarvisCore onEnter={handleEnter} />
        </main>
      )}

      {view === 'selection' && (
        <main className="relative z-30 w-full flex justify-center animate-zoom-in">
          <SelectionMenu onSelect={handleSelection} />
        </main>
      )}

      {view === 'demo-list' && (
        <main className="relative z-30 w-full flex justify-center animate-zoom-in">
          <CaseList onSelectCase={handleCaseSelect} onBack={() => setView('selection')} />
        </main>
      )}

      {view === 'admin' && (
        <main className="relative z-30 w-full flex justify-center">
          <AdminAuth onBack={() => setView('selection')} onLogin={handleAdminLogin} />
        </main>
      )}

      {view === 'admin-dashboard' && (
        <main className="absolute inset-0 z-40 w-full h-full">
          <AdminDashboard onBack={() => setView('selection')} />
        </main>
      )}

      {view === 'live' && (
        <main className="relative z-30 w-full h-full flex justify-center">
          <LiveAnalysisDashboard onBack={() => setView('selection')} />
        </main>
      )}

      {view === 'case-dashboard' && selectedCase && (
        <main className="absolute inset-0 z-40 w-full h-full">
          <CaseDashboard caseData={selectedCase} onBack={() => setView('demo-list')} />
        </main>
      )}

      {view !== 'case-dashboard' && view !== 'live' && view !== 'admin-dashboard' && (
        <footer className="absolute bottom-0 w-full p-8 flex justify-between items-end pointer-events-none opacity-0 animate-fade-in-up z-20" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <div className="text-[9px] text-gray-500 font-mono leading-relaxed opacity-50">KOUSHIKI META-LEARNING PLATFORM © 2025</div>
          <div className="flex gap-4 text-cyan-900 font-mono text-[9px]"><span>VER 2.4.0</span><span>LATENCY: 12ms</span></div>
        </footer>
      )}

      {/* GLOBAL STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .perspective-1000 { perspective: 1000px; }
        .perspective-500 { perspective: 500px; }
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes spinSlow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes spinReverseSlow { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
        .animate-spin-slow { animation: spinSlow 20s linear infinite; }
        .animate-spin-reverse-slow { animation: spinReverseSlow 25s linear infinite; }
        @keyframes spin3dSlow { from { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(0deg); } to { transform: translate(-50%, -50%) rotateX(70deg) rotateZ(360deg); } }
        .animate-spin-3d-slow { animation: spin3dSlow 15s linear infinite; }
        @keyframes spin3dReverse { from { transform: translate(-50%, -50%) rotateY(70deg) rotateZ(0deg); } to { transform: translate(-50%, -50%) rotateY(70deg) rotateZ(-360deg); } }
        .animate-spin-3d-reverse { animation: spin3dReverse 20s linear infinite; }
        @keyframes pulseFast { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        .animate-pulse-fast { animation: pulseFast 2s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fadeInDown 1s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
        @keyframes fadeInQuick { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in-quick { animation: fadeInQuick 0.4s ease-out forwards; }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-zoom-in { animation: zoomIn 0.5s ease-out; }
        @keyframes gridMove { 0% { transform: rotateX(60deg) translateY(0); } 100% { transform: rotateX(60deg) translateY(40px); } }
        .animate-grid-move { animation: gridMove 2s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0e7490; border-radius: 2px; }
      `}</style>
    </div>
  );
}
