import React, { useState, useEffect, useRef } from 'react';
import { 
  Power, Cpu, Shield, Zap, Activity, Lock, Globe, Hexagon, Aperture, 
  Database, Layers, Key, Ban, FileText, Search, Map, Clock, Image as ImageIcon,
  MessageSquare, ChevronRight, AlertTriangle, Crosshair, Box, ZoomIn, UserCheck,
  Upload, X, Brain, Server, Share2, Eye, Terminal, HardDrive, Wifi, Radio,
  BarChart3, Network, RefreshCw, AlertOctagon, ShieldCheck, FileDown, ToggleLeft, ToggleRight,
  GitGraph, Link
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const SYSTEM_PODS = [
  { id: 'nlp', name: 'NLP', icon: FileText, desc: 'Language & Sentiment', sub: ['Entity Extract', 'Evidence Corr', 'Lang Detect'], version: '2.4', health: '98%', status: 'active', cpu: 45, mem: 1024 },
  { id: 'vis', name: 'VISION', icon: Eye, desc: 'Computer Vision', sub: ['YOLOv8', 'CCTV', 'License Plate'], version: '3.1', health: '99%', status: 'active', cpu: 78, mem: 4096 },
  { id: 'aud', name: 'AUDIO', icon: Zap, desc: 'Audio Forensics', sub: ['Whisper', 'Speaker ID', 'Enhancement'], version: '2.0', health: '95%', status: 'active', cpu: 32, mem: 2048 },
  { id: 'for', name: 'FORENSICS', icon: Search, desc: 'Digital Evidence', sub: ['Volatility', 'Plaso', 'PyTSK'], version: '4.2', health: '100%', status: 'active', cpu: 12, mem: 512 },
  { id: 'osi', name: 'OSINT', icon: Globe, desc: 'Open Intelligence', sub: ['Scrapers', 'CrimeCheck', 'DarkWeb'], version: '1.8', health: '92%', status: 'warning', cpu: 89, mem: 1024 },
  { id: 'vid', name: 'VIDEO', icon: ImageIcon, desc: 'Video Gen/Proc', sub: ['FFmpeg', 'Hunyuan', 'Deepfake Det'], version: '2.5', health: '97%', status: 'active', cpu: 65, mem: 8192 },
  { id: '3d', name: '3D POD', icon: Box, desc: 'Spatial Recon', sub: ['NeRF', 'Photogrammetry', 'LiDAR'], version: '3.0', health: '96%', status: 'active', cpu: 88, mem: 16384 },
  { id: 'res', name: 'RESTORE', icon: Activity, desc: 'Media Enhance', sub: ['GFPGAN', 'SuperRes', 'Denoise'], version: '2.2', health: '98%', status: 'active', cpu: 55, mem: 4096 },
  { id: 'com', name: 'COMIC', icon: ImageIcon, desc: 'Visual Story', sub: ['StyleTransfer', 'Panel Gen'], version: '1.5', health: '99%', status: 'idle', cpu: 5, mem: 256 },
  { id: 'fac', name: 'FACIAL', icon: UserCheck, desc: 'Biometrics', sub: ['Recog', 'Age Prog', 'Emotion'], version: '3.3', health: '100%', status: 'active', cpu: 41, mem: 2048 },
  { id: 'mis', name: 'MISC', icon: Shield, desc: 'Security Tools', sub: ['Crypto', 'Blockchain', 'Hash'], version: '2.1', health: '100%', status: 'active', cpu: 15, mem: 512 },
  { id: 'meta', name: 'META-LEARN', icon: Brain, desc: 'Self-Evolving', sub: ['Pattern Discovery', 'Auto-Tune'], advanced: true, version: '5.0', health: '99%', status: 'active', cpu: 92, mem: 32768 },
  { id: 'inf', name: 'INFRA', icon: Server, desc: 'Prod Ops', sub: ['Load Bal', 'Monitor', 'Scale'], advanced: true, version: '4.4', health: '100%', status: 'active', cpu: 25, mem: 1024 },
  { id: 'orc', name: 'ORCHESTRA', icon: Share2, desc: 'System Core', sub: ['Routing', 'Fusion', 'Decision'], advanced: true, version: '6.0', health: '100%', status: 'active', cpu: 10, mem: 512 },
];

// --- VISUAL ASSETS (BACKGROUNDS) ---

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
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

// --- COMPONENT 1: MAIN LANDING ORB ---
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
      <div className="absolute bottom-10 -left-20 text-[8px] font-mono text-amber-600 flex flex-col gap-1 animate-float w-32" style={{animationDelay: '1s'}}>
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
      <div className="absolute w-40 h-40 rounded-full border perspective-500" style={{borderColor: theme.borderNormal}}>{!disabled && (<div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-transparent group-hover:border-t-current group-hover:border-b-current transition-all duration-500 animate-spin-3d-slow" style={{color: theme.ring}}></div>)}</div>
      <div className="absolute z-10 w-32 h-32 rounded-full backdrop-blur-md border-2 flex flex-col items-center justify-center p-2 text-center" style={coreStyle}>
         <div className="mb-1 transition-transform duration-300 group-hover:scale-110" style={{color: theme.text}}><Icon className="w-6 h-6 drop-shadow-md" /></div>
         <div className={`font-orbitron font-bold text-[10px] leading-tight text-white tracking-widest ${disabled ? 'text-gray-400' : ''}`}>{title}</div>
         <div className="text-[8px] font-mono mt-1 uppercase tracking-wider opacity-80 leading-tight" style={{color: theme.text}}>{sub}</div>
      </div>
      {disabled && (<div className="absolute z-20 text-gray-500 opacity-50"><Ban className="w-48 h-48" strokeWidth={0.5} /></div>)}
    </div>
  );
};

// --- COMPONENT 3: SELECTION MENU (ORB GRID) ---
const SelectionMenu = ({ onSelect }) => {
  return (
    <div className="relative z-30 w-full h-full flex flex-col items-center justify-center animate-fade-in-quick">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">COMMAND MODULE</h2>
        <div className="h-px w-64 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
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
    { id: 1, title: "AARUSHI TALWAR", year: "2008", status: "COLD", confidence: 45, clues: 128 },
    { id: 2, title: "JESSICA LAL", year: "1999", status: "SOLVED", confidence: 98, clues: 342 },
    { id: 3, title: "BEHMAI MASSACRE", year: "1981", status: "ARCHIVED", confidence: 88, clues: 56 },
    { id: 4, title: "PALGHAR LYNCHING", year: "2020", status: "ACTIVE", confidence: 67, clues: 210 },
    { id: 5, title: "GENERIC TEMPLATE", year: "2025", status: "NEW", confidence: 10, clues: 0 },
  ];

  return (
    <div className="relative z-30 w-full max-w-4xl p-8 flex flex-col gap-6 animate-fade-in-quick">
      <div className="flex items-center mb-8 relative">
        <button onClick={onBack} className="absolute left-0 p-2 hover:bg-cyan-900/20 rounded text-cyan-500 transition-colors"><ArrowLeftIcon /></button>
        <div className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-500 tracking-widest mb-2">CASE DOSSIERS</h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {cases.map((c, i) => (
          <button key={c.id} onClick={() => onSelectCase(c)} className="relative group w-full bg-black/60 border border-cyan-900/30 hover:border-cyan-400 p-4 rounded-lg flex items-center justify-between transition-all hover:bg-cyan-900/10 hover:scale-[1.01] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-900/20 rounded flex items-center justify-center text-cyan-400 font-orbitron font-bold border border-cyan-500/30">{i+1}</div>
              <div className="text-left">
                <div className="text-lg font-orbitron text-cyan-100 font-bold tracking-wider">{c.title} <span className="text-sm text-cyan-600 font-mono ml-2">{c.year}</span></div>
                <div className="text-xs font-mono text-gray-500 flex gap-4 mt-1">
                  <span>STATUS: <span className={c.status === 'COLD' ? 'text-blue-400' : 'text-green-400'}>{c.status}</span></span>
                  <span>CONFIDENCE: <span className="text-cyan-400">{c.confidence}%</span></span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-cyan-600 group-hover:text-cyan-400 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENT 5.1: ENTITY NEXUS GRAPH (NEW) ---
const EntityNexus = ({ caseData }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;
    
    // Mock Nodes based on case
    const nodes = [
      { id: 1, label: "VICTIM", type: 'victim', x: width/2, y: height/2, color: '#f59e0b' },
      { id: 2, label: "SUSPECT A", type: 'suspect', x: width/2 - 150, y: height/2 - 50, color: '#ef4444' },
      { id: 3, label: "WEAPON", type: 'evidence', x: width/2 + 120, y: height/2 + 80, color: '#06b6d4' },
      { id: 4, label: "LOC_HOME", type: 'location', x: width/2 - 80, y: height/2 + 150, color: '#22c55e' },
      { id: 5, label: "WITNESS", type: 'person', x: width/2 + 180, y: height/2 - 100, color: '#a855f7' }
    ];
    
    const links = [
      { source: 1, target: 2 },
      { source: 1, target: 3 },
      { source: 1, target: 4 },
      { source: 2, target: 4 },
      { source: 5, target: 2 }
    ];

    const draw = () => {
      ctx.clearRect(0,0, width, height);
      
      // Draw Links
      ctx.lineWidth = 1;
      links.forEach(link => {
        const s = nodes.find(n => n.id === link.source);
        const t = nodes.find(n => n.id === link.target);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();
      });

      // Draw Nodes
      nodes.forEach(node => {
        // Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Label
        ctx.fillStyle = '#ccc';
        ctx.font = '10px "Orbitron", monospace';
        ctx.fillText(node.label, node.x + 12, node.y + 4);
      });
      
      // Gentle animation
      nodes.forEach(n => {
        n.x += (Math.random() - 0.5) * 0.5;
        n.y += (Math.random() - 0.5) * 0.5;
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    const handleResize = () => {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute bottom-4 right-4 bg-black/60 border border-gray-800 p-2 rounded text-[9px] font-mono text-gray-400">
            <div><span className="text-red-500">●</span> SUSPECT</div>
            <div><span className="text-cyan-500">●</span> EVIDENCE</div>
            <div><span className="text-green-500">●</span> LOCATION</div>
        </div>
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
          onClick={() => { setActivePanel(id); if(subItems) setShowSub(!showSub); }}
          className={`w-full p-4 border rounded-lg text-left flex items-center justify-between transition-all ${isActive ? 'bg-cyan-900/30 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-black/40 border-cyan-900/30 hover:border-cyan-600 hover:bg-cyan-900/10'}`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-300' : 'text-cyan-700'}`} />
            <span className={`font-orbitron text-sm font-bold tracking-wider ${isActive ? 'text-white' : 'text-gray-400'}`}>{label}</span>
          </div>
          {subItems && <ChevronRight className={`w-4 h-4 text-cyan-600 transition-transform ${showSub ? 'rotate-90' : ''}`} />}
        </button>
        {subItems && showSub && (
          <div className="mt-2 ml-4 space-y-2 border-l-2 border-cyan-900/50 pl-4 animate-fade-in-quick">
            {subItems.map((sub, i) => (
              <button key={i} className="w-full text-left text-xs font-mono text-cyan-500 hover:text-cyan-300 py-1 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-700 rounded-full"></div> {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-black/80 backdrop-blur-xl relative z-40 animate-zoom-in">
      <header className="h-16 border-b border-cyan-900/50 flex items-center px-6 bg-black/60 justify-between">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-cyan-900/30 rounded text-cyan-500"><ArrowLeftIcon /></button>
            <div>
            <h2 className="text-xl font-orbitron font-bold text-white tracking-widest">{caseData.title}</h2>
            <div className="flex gap-4 text-[10px] font-mono text-cyan-600">
                <span>YEAR: {caseData.year}</span>
                <span>STATUS: {caseData.status}</span>
                <span>CLUES: {caseData.clues}</span>
            </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button 
                onClick={handleGenerateReport}
                className="flex items-center gap-2 px-4 py-1.5 bg-cyan-900/20 border border-cyan-500 rounded text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 transition-all"
                disabled={isCompiling}
            >
                {isCompiling ? <RefreshCw className="w-4 h-4 animate-spin"/> : <FileDown className="w-4 h-4" />}
                {isCompiling ? "COMPILING..." : "GENERATE REPORT"}
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-900/20 border border-amber-900/50 rounded text-amber-500 text-xs font-bold animate-pulse">
                <Activity className="w-3 h-3" /> LIVE ANALYSIS
            </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 border-r border-cyan-900/30 bg-black/40 p-4 overflow-y-auto space-y-3 custom-scrollbar">
          <ActionButton id="analysis" label="DETAILED ANALYSIS" icon={GitGraph} />
          <ActionButton id="recon" label="SCENE RECONSTRUCTION" icon={Box} subItems={["3D Walkthrough", "2D Floorplan", "Comic Panel Sequence"]} />
          <ActionButton id="timeline" label="TIMELINE GEN" icon={Clock} />
          <ActionButton id="hotspot" label="CRIME HOTSPOT" icon={Map} />
          <ActionButton id="clues" label="MISSING CLUES" icon={Search} />
        </aside>
        <main className="flex-1 bg-black/20 p-6 relative overflow-hidden flex flex-col items-center justify-center border-r border-cyan-900/30">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)]"></div>
          
          {activePanel === 'analysis' && (
            <div className="w-full h-full flex flex-col">
               <div className="flex justify-between items-center mb-4 px-4">
                  <h3 className="text-sm font-orbitron text-cyan-400 flex items-center gap-2"><Network className="w-4 h-4"/> ENTITY NEXUS</h3>
                  <div className="text-[10px] text-gray-500 font-mono">NODES: 12 • EDGES: 45</div>
               </div>
               <div className="flex-1 border border-cyan-900/30 rounded bg-black/40 relative overflow-hidden">
                  <EntityNexus caseData={caseData} />
               </div>
            </div>
          )}
          {activePanel === 'recon' && (<div className="w-full h-full border border-dashed border-cyan-800 rounded flex items-center justify-center text-cyan-700 font-mono text-xs">[ 3D RENDER VIEWPORT INITIALIZING... ]</div>)}
          {/* Placeholders for other panels */}
          {['timeline', 'hotspot', 'clues'].includes(activePanel) && (<div className="text-cyan-800 font-mono text-xs">[ MODULE LOADING... ]</div>)}
        </main>
        <div className="w-80 bg-black/60 flex flex-col border-l border-cyan-900/30">
          <div className="p-3 border-b border-cyan-900/30 bg-cyan-900/10 flex items-center gap-2"><Cpu className="w-4 h-4 text-cyan-400" /><span className="font-orbitron text-xs font-bold text-cyan-100">KOUSHIKI AI</span></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-lg text-xs font-mono ${m.role === 'user' ? 'bg-cyan-900/40 text-cyan-100 border border-cyan-700' : 'bg-gray-900/60 text-gray-300 border border-gray-700'}`}>{m.text}</div></div>))}
          </div>
          <div className="p-4 border-t border-cyan-900/30 bg-black/80">
            <form onSubmit={handleChat} className="relative"><input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Query case data..." className="w-full bg-gray-900/50 border border-cyan-800 rounded px-3 py-2 text-xs text-cyan-100 focus:outline-none focus:border-cyan-500 pr-8" /><Zap className="absolute right-2 top-2 w-3 h-3 text-cyan-600" /></form>
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
      const mockHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setFileHash(mockHash);
      setMessages(prev => [...prev, { role: 'system', text: `File "${file.name}" uploaded. [SHA-256: ${mockHash.substring(0,8)}...] integrity verified.` }]);
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
    <div className="w-full h-full flex flex-col bg-black/90 backdrop-blur-xl relative z-40 animate-zoom-in">
      <header className="h-16 border-b border-amber-900/50 flex items-center px-6 bg-black/60 justify-between">
        <div className="flex items-center gap-4"><button onClick={onBack} className="p-2 hover:bg-amber-900/20 rounded text-amber-500"><ArrowLeftIcon /></button><div><h2 className="text-xl font-orbitron font-bold text-amber-100 tracking-widest">LIVE INTELLIGENCE</h2><div className="text-[10px] font-mono text-amber-600">ACTIVE SESSION • 13 PODS ONLINE</div></div></div>
        
        <div className="flex items-center gap-6">
            {/* Auto Route Toggle */}
            <button 
                onClick={() => setAutoRoute(!autoRoute)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${autoRoute ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400' : 'border-gray-700 text-gray-500'}`}
            >
                {autoRoute ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                <span className="text-xs font-bold font-orbitron">AUTO-ROUTE</span>
            </button>

            <div className="px-3 py-1 bg-amber-900/20 border border-amber-900/50 rounded text-amber-500 text-xs font-bold animate-pulse flex items-center gap-2">
                <Activity className="w-3 h-3" /> REAL-TIME
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
                    className={`relative group h-40 p-4 border rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden 
                        ${recommended ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] scale-105 z-10' : 
                          dimmed ? 'opacity-30 blur-[1px]' :
                          activePod?.id === pod.id ? 'bg-amber-900/30 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 
                          'bg-black/40 border-gray-800 hover:border-amber-500/50 hover:bg-amber-900/10'}
                    `}
                >
                    <div className="group-hover:opacity-0 transition-opacity duration-300 absolute flex flex-col items-center">
                        <div className={`p-4 rounded-full mb-3 ${pod.advanced ? 'bg-purple-900/20 text-purple-400' : 'bg-cyan-900/20 text-cyan-400'}`}><pod.icon className="w-8 h-8" /></div>
                        <div className="font-orbitron font-bold text-base text-gray-200">{pod.name}</div>
                        <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase">{pod.desc}</div>
                        {recommended && <div className="mt-2 text-[9px] font-bold bg-cyan-500 text-black px-2 py-0.5 rounded">RECOMMENDED</div>}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
                        <div className="text-amber-400 font-bold text-xs mb-2 font-orbitron tracking-widest">{uploadedFile ? 'ROUTE FILE' : 'INSPECT POD'}</div>
                        <div className="flex flex-wrap justify-center gap-2">{pod.sub.slice(0, 2).map((sub, i) => (<span key={i} className="text-[10px] px-2 py-1 bg-gray-800 rounded text-cyan-300 border border-cyan-900/50">{sub}</span>))}</div>
                    </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SYSTEM STATUS HUD (Right Side) */}
        <div className="w-64 bg-black/40 border-l border-amber-900/20 p-4 hidden lg:flex flex-col gap-6">
           <div className="text-xs font-bold text-amber-500 font-orbitron mb-2 flex items-center gap-2"><Network className="w-3 h-3"/> SYSTEM CAPABILITIES</div>
           <div className="space-y-4">
              <div className="bg-amber-900/10 border border-amber-900/30 p-3 rounded">
                 <div className="text-[10px] text-gray-400 mb-1 flex justify-between"><span>RAG MEMORY</span><span className="text-green-400">ONLINE</span></div>
                 <div className="text-xs font-mono text-amber-400">1.2M VECTORS</div>
                 <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="w-full h-full bg-green-500"></div></div>
              </div>
              <div className="bg-purple-900/10 border border-purple-900/30 p-3 rounded">
                 <div className="text-[10px] text-gray-400 mb-1 flex justify-between"><span>META-LEARNING</span><span className="text-purple-400">LVL 2</span></div>
                 <div className="text-xs font-mono text-purple-300">PATTERN RECOG</div>
                 <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="w-[60%] h-full bg-purple-500"></div></div>
              </div>
              <div className="bg-cyan-900/10 border border-cyan-900/30 p-3 rounded">
                 <div className="text-[10px] text-gray-400 mb-1 flex justify-between"><span>ORCHESTRATOR</span><span className="text-cyan-400">NOMINAL</span></div>
                 <div className="text-xs font-mono text-cyan-300">LATENCY: 12ms</div>
                 <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="w-[95%] h-full bg-cyan-500"></div></div>
              </div>
              <div className="bg-gray-900/30 border border-gray-700 p-3 rounded">
                 <div className="text-[10px] text-gray-400 mb-1 flex justify-between"><span>GLOBAL INFRA</span><span className="text-gray-300">STABLE</span></div>
                 <div className="text-xs font-mono text-gray-400">15/15 PODS UP</div>
              </div>
           </div>
        </div>

        {/* DETAIL MODAL OVERLAY */}
        {showDetail && activePod && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center animate-zoom-in">
             <div className="w-[600px] bg-black border border-cyan-500/50 rounded-xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] relative">
                <button onClick={() => setShowDetail(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5"/></button>
                <div className="flex items-center gap-4 mb-6 border-b border-cyan-900/50 pb-4">
                   <div className="p-3 bg-cyan-900/20 rounded-lg text-cyan-400"><activePod.icon className="w-8 h-8"/></div>
                   <div>
                      <h2 className="text-2xl font-orbitron font-bold text-white">{activePod.name} POD DIAGNOSTICS</h2>
                      <div className="flex gap-4 text-xs font-mono text-cyan-600 mt-1">
                         <span>VER: {activePod.version}</span>
                         <span>HEALTH: <span className="text-green-400">{activePod.health}</span></span>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   {activePod.sub.map((sub, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-gray-900 border border-gray-700 rounded">
                         <span className="text-xs font-mono text-gray-300">{sub}</span>
                         <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></span>
                      </div>
                   ))}
                </div>
                <div className="flex gap-4">
                   <button className="flex-1 py-2 bg-cyan-900/20 border border-cyan-600 text-cyan-400 rounded font-orbitron text-xs hover:bg-cyan-900/40">RUN DIAGNOSTICS</button>
                   <button className="flex-1 py-2 border border-gray-700 text-gray-400 rounded font-orbitron text-xs hover:bg-gray-800">VIEW LOGS</button>
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
                    <span className="text-green-400 flex items-center gap-1 font-bold border-l border-cyan-800 pl-4"><ShieldCheck className="w-3 h-3"/> [SHA-256: VERIFIED]</span>
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
      const newSys = `[SYS] ${['Allocating VRAM', 'Garbage collection', 'Syncing nodes', 'Optimizing tensor flow'][Math.floor(Math.random()*4)]}...`;
      const newSec = `[SEC] ${['Packet verify', 'Hash check', 'Token refresh', 'Latency ping'][Math.floor(Math.random()*4)]}: ${Math.floor(Math.random()*50)}ms`;
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
    <div className="w-full h-full flex flex-col bg-black/95 backdrop-blur-xl relative z-40 animate-zoom-in text-gray-300 font-mono">
      {/* HEADER */}
      <header className="h-14 border-b border-red-900/50 flex items-center px-6 bg-red-950/10 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-red-900/20 rounded text-red-500"><ArrowLeftIcon /></button>
          <div className="flex items-center gap-2 text-red-500 font-orbitron font-bold tracking-widest"><Shield className="w-5 h-5"/> SYSTEM ADMINISTRATOR</div>
        </div>
        <div className="text-xs text-red-800 flex gap-4">
          <span>ROOT ACCESS GRANTED</span>
          <span>SESSION ID: ADMIN-8821</span>
        </div>
      </header>

      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        
        {/* COL 1: INFRA HEALTH (Interactive) */}
        <div className="flex flex-col gap-4">
          <div className="bg-black/40 border border-gray-800 rounded-lg p-4 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2"><Server className="w-3 h-3"/> INFRASTRUCTURE HEALTH MATRIX</h3>
            <div className="grid grid-cols-3 gap-2">
              {SYSTEM_PODS.map((p,i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedPod(p)}
                  className={`p-2 rounded border transition-all text-left group
                    ${selectedPod?.id === p.id 
                      ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                      : 'bg-gray-900/50 border-gray-700 hover:border-red-500/50'
                    }
                  `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-bold ${selectedPod?.id === p.id ? 'text-red-400' : 'text-gray-300'}`}>{p.name}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'warning' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
                  </div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({length: Math.min(p.sub.length, 6)}).map((_, j) => (
                      <div key={j} className={`w-1 h-2 rounded-sm ${selectedPod?.id === p.id ? 'bg-red-900' : 'bg-gray-700 group-hover:bg-red-900/50'}`}></div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-black/40 border border-gray-800 rounded-lg p-4 h-1/3">
             <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2"><HardDrive className="w-3 h-3"/> ACTIVE PROCESS QUEUE</h3>
             <div className="space-y-2">
                {QUEUE_ITEMS.map(q => (
                  <div key={q.id} className="text-[9px] border-b border-gray-800 pb-1">
                    <div className="flex justify-between text-gray-400 mb-1">
                      <span>{q.id} : {q.file}</span>
                      <span className={q.status==='Completed'?'text-green-500':q.status==='Processing'?'text-amber-500':'text-gray-600'}>{q.status}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded overflow-hidden"><div className={`h-full ${q.status==='Completed'?'bg-green-500':'bg-amber-500'}`} style={{width: `${q.prog}%`}}></div></div>
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
                      <div className="p-2 bg-red-900/20 rounded border border-red-900/50 text-red-500"><selectedPod.icon className="w-6 h-6"/></div>
                      <div>
                         <h3 className="text-lg font-orbitron text-white">{selectedPod.name} POD</h3>
                         <div className="text-[10px] text-gray-500 font-mono">ID: {selectedPod.id.toUpperCase()}-882</div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedPod(null)} className="text-gray-500 hover:text-white"><X className="w-4 h-4"/></button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                   <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-900/50 p-2 rounded border border-gray-800">
                         <div className="text-[9px] text-gray-500 mb-1">CPU LOAD</div>
                         <div className="text-xl text-red-400 font-mono">{selectedPod.cpu}%</div>
                         <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="bg-red-500 h-full" style={{width: `${selectedPod.cpu}%`}}></div></div>
                      </div>
                      <div className="bg-gray-900/50 p-2 rounded border border-gray-800">
                         <div className="text-[9px] text-gray-500 mb-1">MEMORY</div>
                         <div className="text-xl text-red-400 font-mono">{selectedPod.mem}MB</div>
                         <div className="w-full h-1 bg-gray-800 rounded mt-1"><div className="bg-red-500 h-full" style={{width: '45%'}}></div></div>
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
                            <span className="text-[9px] text-gray-600 font-mono">LATENCY: {Math.floor(Math.random()*20)+5}ms</span>
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
              <h3 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2"><AlertOctagon className="w-3 h-3"/> FULL SYSTEM STATUS</h3>
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
              <div className="text-gray-500 border-b border-gray-800 pb-1 mb-1 flex items-center gap-2"><Terminal className="w-3 h-3"/> SYSTEM CORE LOG</div>
              <div className="flex-1 overflow-hidden text-cyan-700/80 space-y-1" ref={scrollRefSys}>
                 {logsSystem.map((l,i) => <div key={i}>{l}</div>)}
              </div>
           </div>
           <div className="flex-1 bg-black rounded-lg border border-gray-800 p-2 font-mono text-[9px] flex flex-col h-40">
              <div className="text-gray-500 border-b border-gray-800 pb-1 mb-1 flex items-center gap-2"><Wifi className="w-3 h-3"/> NET/SEC LOG</div>
              <div className="flex-1 overflow-hidden text-amber-700/80 space-y-1" ref={scrollRefSec}>
                 {logsSecurity.map((l,i) => <div key={i}>{l}</div>)}
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
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col items-center justify-center">
      <StarfieldBackground />
      <CyberGrid />
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

      {view !== 'case-dashboard' && view !== 'live' && view !== 'admin-dashboard' && (
        <header className="absolute top-0 w-full p-8 flex justify-between items-start pointer-events-none opacity-0 animate-fade-in-down z-30" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-orbitron font-black text-cyan-500 tracking-[0.1em] drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">KOUSHIKI.AI</h1>
          </div>
          <div className="text-right font-mono text-[10px] text-cyan-800 border-r-2 border-cyan-800 pr-3 hidden md:block">
            <div className="flex items-center justify-end gap-2"><Lock className="w-3 h-3"/> SECURE CHANNEL</div>
            <div className="flex items-center justify-end gap-2"><Cpu className="w-3 h-3"/> AMD ROCm ACTIVE</div>
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
        <footer className="absolute bottom-0 w-full p-8 flex justify-between items-end pointer-events-none opacity-0 animate-fade-in-up z-20" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
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
