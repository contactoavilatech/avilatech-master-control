import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Shield, Users, Radio, Zap, Fuel, Truck, Warehouse, 
  Camera, CheckCircle2, AlertTriangle, Clock, Filter, Plus, 
  Search, Upload, ChevronRight, MapPin, Activity, Settings, 
  TrendingUp, Download, Eye, FileText, Check, X, RefreshCw,
  Server, HardDrive, Layers, Lock, Cpu, ArrowUpRight, DollarSign, Cloud
} from 'lucide-react';

// --- MOCK INITIAL DATA ---
const INITIAL_SITES = [
  {
    id: 'ST-101',
    name: 'Caracas Centro - BTS Node Alpha',
    region: 'Capital',
    type: 'Telecom & DWDM',
    status: 'In Progress',
    progress: 78,
    lead: 'Ing. Carlos Mendoza',
    crew: 'Cuadrilla Alfa - Power & Fiber',
    lastUpdate: '2026-10-27 14:30',
    coords: '10.4806° N, 66.9036° W',
    powerStatus: 'Normal (Grid + Gen Backup)',
    fuelLevel: 85,
    genHours: 1420,
    milestones: [
      { name: 'Site Survey & Permits', done: true, date: '2026-10-01' },
      { name: 'Civil Works & Tower Mount', done: true, date: '2026-10-10' },
      { name: 'Power Cabinet Installation', done: true, date: '2026-10-18' },
      { name: 'DWDM Card Integration', done: true, date: '2026-10-24' },
      { name: 'FBB Swap & Drive Test', done: false, date: 'Pending' },
      { name: 'Final QA Approval', done: false, date: 'Pending' }
    ],
    photos: [
      { id: 'p1', title: 'Power Cabinet Wiring', category: 'Power Systems', status: 'Approved', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-24 11:20' },
      { id: 'p2', title: 'DWDM Rack Mount', category: 'Telecom', status: 'Pending QA', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-25 16:45' }
    ]
  },
  {
    id: 'ST-102',
    name: 'Valencia Norte - Repeater Hub 04',
    region: 'Central',
    type: 'Power & Generators',
    status: 'Critical Alert',
    progress: 42,
    lead: 'Ing. Roberto Silva',
    crew: 'Cuadrilla Bravo - Heavy Power',
    lastUpdate: '2026-10-27 16:10',
    coords: '10.1620° N, 68.0077° W',
    powerStatus: 'Grid Fault - Generator Active',
    fuelLevel: 28,
    genHours: 3890,
    milestones: [
      { name: 'Site Survey & Permits', done: true, date: '2026-10-05' },
      { name: 'ATS Switch Installation', done: true, date: '2026-10-15' },
      { name: 'Generator Replacement (150 kVA)', done: false, date: 'In Progress' },
      { name: 'Load Testing', done: false, date: 'Pending' },
      { name: 'Remote Telemetry Hookup', done: false, date: 'Pending' }
    ],
    photos: [
      { id: 'p3', title: 'Generator Arrival', category: 'Motogenerador', status: 'Approved', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-26 09:15' }
    ]
  },
  {
    id: 'ST-103',
    name: 'Maracaibo Substation - Fiber Node',
    region: 'Occidente',
    type: 'Telecom & FBB',
    status: 'Completed',
    progress: 100,
    lead: 'Ing. Elena Gómez',
    crew: 'Cuadrilla Charlie - Optical',
    lastUpdate: '2026-10-26 18:00',
    coords: '10.6544° N, 71.6402° W',
    powerStatus: 'Normal (Solar + Grid)',
    fuelLevel: 100,
    genHours: 850,
    milestones: [
      { name: 'Fiber Splice & Sparing', done: true, date: '2026-10-02' },
      { name: 'OTDR Trace Validation', done: true, date: '2026-10-12' },
      { name: 'Rack Swap & Tagging', done: true, date: '2026-10-20' },
      { name: 'QA Site Handover', done: true, date: '2026-10-26' }
    ],
    photos: [
      { id: 'p4', title: 'Splicing Tray Clean', category: 'Fibre Optic', status: 'Approved', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-25 10:00' }
    ]
  },
  {
    id: 'ST-104',
    name: 'Puerto La Cruz - Coastal Site 12',
    region: 'Oriente',
    type: 'Swap & Upgrades',
    status: 'In Progress',
    progress: 60,
    lead: 'Ing. Marcus Ruiz',
    crew: 'Cuadrilla Delta - General Works',
    lastUpdate: '2026-10-27 11:15',
    coords: '10.2138° N, 64.6326° W',
    powerStatus: 'Normal',
    fuelLevel: 70,
    genHours: 2100,
    milestones: [
      { name: 'Dismantling Legacy Antennas', done: true, date: '2026-10-18' },
      { name: 'New 5G RRU Mounting', done: true, date: '2026-10-22' },
      { name: 'Feeder Cable Replacement', done: false, date: 'In Progress' },
      { name: 'Sector Alignment & VSWR Check', done: false, date: 'Pending' }
    ],
    photos: [
      { id: 'p5', title: '5G RRU Installation', category: 'Telecom', status: 'Pending QA', url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-27 10:30' }
    ]
  }
];

const INITIAL_INVENTORY = [
  { code: 'INV-DWDM-01', name: 'Módulo SFP+ 10G ER 1310nm 40km', centralQty: 145, fieldQty: 24, minThreshold: 30, unit: 'pcs', category: 'Telecom' },
  { code: 'INV-PWR-48V', name: 'Módulo Rectificador 48V 3000W Huawei/ZTE', centralQty: 42, fieldQty: 12, minThreshold: 15, unit: 'units', category: 'Power' },
  { code: 'INV-GEN-FIL', name: 'Kit Filtros Motogenerador Perkins 100kVA', centralQty: 88, fieldQty: 30, minThreshold: 20, unit: 'kits', category: 'Motogeneradores' },
  { code: 'INV-FIB-12C', name: 'Cable Fibra Óptica ADSS 12 hilos Single Mode', centralQty: 12500, fieldQty: 3200, minThreshold: 5000, unit: 'meters', category: 'FBB' },
  { code: 'INV-BAT-GEL', name: 'Batería Gel Deep Cycle 12V 200Ah', centralQty: 18, fieldQty: 6, minThreshold: 25, unit: 'units', category: 'Power' }
];

const INITIAL_FLEET = [
  { id: 'V-01', plate: 'AB892CD', model: 'Toyota Hilux 4x4 Tech', assignedCrew: 'Cuadrilla Alfa', odometer: '142,500 km', status: 'Operational', fuel: '82%', lastMaint: '2026-09-15', gps: 'Caracas (Active Route)' },
  { id: 'V-02', plate: 'A31BC5D', model: 'Ford F-350 Heavy Duty Crane', assignedCrew: 'Cuadrilla Bravo', odometer: '210,100 km', status: 'In Service', fuel: '45%', lastMaint: '2026-10-20', gps: 'Valencia Service Shop' },
  { id: 'V-03', plate: 'AD901EF', model: 'Chevrolet LUV D-Max 4x4', assignedCrew: 'Cuadrilla Charlie', odometer: '98,300 km', status: 'Operational', fuel: '90%', lastMaint: '2026-10-01', gps: 'Maracaibo Field' },
  { id: 'V-04', plate: 'AB441GH', model: 'Nissan Frontier 4x4', assignedCrew: 'Cuadrilla Delta', odometer: '175,000 km', status: 'Warning', fuel: '25%', lastMaint: '2026-08-10', gps: 'Puerto La Cruz Highway' }
];

export default function App() {
  // Navigation & Filtering state
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin', 'supervisor', 'qa', 'client'
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Data states
  const [sites, setSites] = useState(INITIAL_SITES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [fleet] = useState(INITIAL_FLEET);

  // Modal / Drawer state
  const [selectedSite, setSelectedSite] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [newPhotoData, setNewPhotoData] = useState({ title: '', category: 'Telecom', url: '' });
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Filtered Sites logic
  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      const matchRegion = selectedRegion === 'All' || site.region === selectedRegion;
      const matchType = selectedType === 'All' || site.type.includes(selectedType);
      const matchSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.lead.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchType && matchSearch;
    });
  }, [sites, selectedRegion, selectedType, searchQuery]);

  // Handler to toggle milestone status
  const handleToggleMilestone = (siteId, index) => {
    if (selectedRole === 'client') return; // View only
    setSites(prev => prev.map(site => {
      if (site.id === siteId) {
        const updatedMilestones = [...site.milestones];
        updatedMilestones[index].done = !updatedMilestones[index].done;
        updatedMilestones[index].date = updatedMilestones[index].done ? new Date().toISOString().split('T')[0] : 'Pending';
        
        // Recalculate progress %
        const completedCount = updatedMilestones.filter(m => m.done).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

        const updated = { ...site, milestones: updatedMilestones, progress: newProgress, lastUpdate: 'Just now' };
        if (selectedSite && selectedSite.id === siteId) {
          setSelectedSite(updated);
        }
        return updated;
      }
      return site;
    }));
  };

  // Handler to add photo evidence
  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhotoData.title || !selectedSite) return;

    const newPhoto = {
      id: 'p-' + Date.now(),
      title: newPhotoData.title,
      category: newPhotoData.category,
      status: 'Pending QA',
      url: newPhotoData.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      timestamp: new Date().toLocaleString()
    };

    setSites(prev => prev.map(s => {
      if (s.id === selectedSite.id) {
        const updated = { ...s, photos: [newPhoto, ...s.photos] };
        setSelectedSite(updated);
        return updated;
      }
      return s;
    }));

    setNewPhotoData({ title: '', category: 'Telecom', url: '' });
    setShowPhotoModal(false);
  };

  // Handler for QA Photo Approval
  const handleApprovePhoto = (siteId, photoId, approved) => {
    if (selectedRole !== 'admin' && selectedRole !== 'qa') return;
    setSites(prev => prev.map(s => {
      if (s.id === siteId) {
        const updatedPhotos = s.photos.map(p => {
          if (p.id === photoId) {
            return { ...p, status: approved ? 'Approved' : 'Rejected' };
          }
          return p;
        });
        const updated = { ...s, photos: updatedPhotos };
        if (selectedSite && selectedSite.id === siteId) setSelectedSite(updated);
        return updated;
      }
      return s;
    }));
  };

  // Calculations for Metrics
  const totalProjects = sites.length;
  const completedProjects = sites.filter(s => s.progress === 100).length;
  const criticalAlerts = sites.filter(s => s.status === 'Critical Alert').length;
  const avgProgress = Math.round(sites.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-900">
      
      {/* TOP BAR / HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Radio className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ÁvilaTech <span className="text-emerald-400 text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Operations Hub v3.2</span>
            </h1>
            <p className="text-xs text-slate-400">Master Operations, Telecommunications & Infrastructure Control</p>
          </div>
        </div>

        {/* ROLE SWITCHER DEMO TOOLBAR */}
        <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          <span className="text-xs text-slate-400 pl-2 font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> Perfil Demo:
          </span>
          <div className="flex gap-1">
            {[
              { id: 'admin', label: 'Admin Root', icon: Shield },
              { id: 'supervisor', label: 'Supervisor Campo', icon: Activity },
              { id: 'qa', label: 'Auditor QA', icon: CheckCircle2 },
              { id: 'client', label: 'Cliente / Gerente', icon: Eye }
            ].map((role) => {
              const Icon = role.icon;
              const active = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    active 
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-semibold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* HOSTING & COMMERCIAL INFO BUTTON */}
        <button
          onClick={() => setShowPricingModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95"
        >
          <Cloud className="w-4 h-4" />
          <span> Hosting & Cotización SaaS</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/40 p-4 hidden md:flex flex-col gap-6 justify-between">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">
              Módulos del Sistema
            </div>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Resumen Ejecutivo', icon: BarChart3, badge: null },
                { id: 'telecom', label: 'Telecom, FBB & DWDM', icon: Radio, badge: '4 Sitios' },
                { id: 'power', label: 'Energía & Generación', icon: Zap, badge: '1 Alerta' },
                { id: 'inventory', label: 'Almacén & Cuadrillas', icon: Warehouse, badge: 'Stock OK' },
                { id: 'fleet', label: 'Control de Flota', icon: Truck, badge: '4 Vehículos' },
                { id: 'qa', label: 'Evidencias & Auditoría QA', icon: Camera, badge: '2 Rev.' }
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* PERMISSION INDICATOR CARD */}
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> Permisos Activos
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {selectedRole}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {selectedRole === 'admin' && 'Acceso total: Cargar fotos, aprobar QA, editar hitos y modificar inventario.'}
              {selectedRole === 'supervisor' && 'Acceso de Campo: Actualización de avances, hitos y carga de fotos.'}
              {selectedRole === 'qa' && 'Acceso Auditor: Verificación técnica y aprobación/rechazo de evidencias.'}
              {selectedRole === 'client' && 'Acceso Ejecutivo: Solo lectura, monitoreo KPI y reportes descargables.'}
            </p>
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950">
          
          {/* SEARCH AND GENERAL FILTERS */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar sitio, ID, líder de cuadrilla o región..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Filter className="w-3.5 h-3.5 text-emerald-400" /> Región:
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">Todas las Regiones</option>
                <option value="Capital">Capital</option>
                <option value="Central">Central</option>
                <option value="Occidente">Occidente</option>
                <option value="Oriente">Oriente</option>
              </select>

              <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
                Especialidad:
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">Todas las Áreas</option>
                <option value="Telecom">Telecom & DWDM</option>
                <option value="Power">Power & Fuerza</option>
                <option value="Swap">Swaps & Modernización</option>
              </select>
            </div>
          </div>

          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* MASTER KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Proyectos Activos</span>
                    <Radio className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{totalProjects}</div>
                  <div className="mt-2 flex items-center text-xs text-emerald-400 font-medium gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +12% vs mes anterior
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all" />
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Progreso Operativo Global</span>
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{avgProgress}%</div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: `${avgProgress}%` }} />
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Nivel de Combustible Flota/Gen</span>
                    <Fuel className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-white">71%</div>
                  <div className="mt-2 text-xs text-amber-400 font-medium">
                    1 Sitio en Reserva Crítica (Valencia)
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-rose-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all" />
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-medium">Alertas Críticas</span>
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{criticalAlerts}</div>
                  <div className="mt-2 text-xs text-rose-400 font-medium">
                    Falla de red en Hub Valencia 04
                  </div>
                </div>
              </div>

              {/* LIVE SITES OVERVIEW TABLE */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" /> Estado Consolidado de Sitios e Infraestructura
                    </h3>
                    <p className="text-xs text-slate-400">Seguimiento en tiempo real de cuadrillas, energía y fibra</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Mostrando {filteredSites.length} de {sites.length} sitios</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/60 uppercase font-semibold text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-4">Sitio / Nodo</th>
                        <th className="p-4">Región / Coordenadas</th>
                        <th className="p-4">Especialidad</th>
                        <th className="p-4">Cuadrilla / Lider</th>
                        <th className="p-4">Energía & Respaldo</th>
                        <th className="p-4">Progreso</th>
                        <th className="p-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredSites.map((site) => (
                        <tr key={site.id} className="hover:bg-slate-800/40 transition-all group">
                          <td className="p-4 font-semibold text-white">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${
                                site.status === 'Completed' ? 'bg-emerald-400' :
                                site.status === 'Critical Alert' ? 'bg-rose-500 animate-pulse' : 'bg-cyan-400'
                              }`} />
                              <div>
                                <div className="text-slate-100 group-hover:text-emerald-400 transition-colors">{site.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono">{site.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-400">
                            <div>{site.region}</div>
                            <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-500" /> {site.coords}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                              {site.type}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="text-slate-200">{site.crew}</div>
                            <div className="text-[10px] text-slate-500">{site.lead}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Fuel className={`w-3.5 h-3.5 ${site.fuelLevel < 30 ? 'text-rose-400' : 'text-emerald-400'}`} />
                              <span>{site.fuelLevel}% Tanque</span>
                            </div>
                            <div className="text-[10px] text-slate-500">{site.genHours} hrs uso acum.</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    site.progress === 100 ? 'bg-emerald-400' :
                                    site.status === 'Critical Alert' ? 'bg-rose-500' : 'bg-cyan-400'
                                  }`} 
                                  style={{ width: `${site.progress}%` }} 
                                />
                              </div>
                              <span className="font-mono font-bold text-xs">{site.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedSite(site)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-semibold text-xs border border-emerald-500/30 transition-all flex items-center gap-1.5 ml-auto"
                            >
                              <Eye className="w-3.5 h-3.5" /> Expediente
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TELECOM & SWAPS */}
          {activeTab === 'telecom' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-emerald-400" /> Control de Despliegues DWDM, FBB & Swaps
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Monitoreo de migraciones de red, cambio de tarjetas transceptoras, tendido de fibra y certificación OTDR.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                    Nodos DWDM Activos: 18
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                    Swaps Completados: 85%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sites.map(site => (
                  <div key={site.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {site.id}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">{site.name}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" /> {site.region} ({site.coords})
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        site.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        site.status === 'Critical Alert' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {site.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Checklist de Hitos</span>
                        <span>{site.milestones.filter(m => m.done).length} / {site.milestones.length} Completados</span>
                      </div>
                      <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                        {site.milestones.map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={m.done}
                                disabled={selectedRole === 'client'}
                                onChange={() => handleToggleMilestone(site.id, idx)}
                                className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20 h-4 w-4"
                              />
                              <span className={m.done ? 'line-through text-slate-500' : 'text-slate-200'}>
                                {m.name}
                              </span>
                            </label>
                            <span className="text-[10px] font-mono text-slate-500">{m.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className="text-xs text-slate-400">
                        Cuadrilla: <strong className="text-slate-200">{site.crew}</strong>
                      </span>
                      <button
                        onClick={() => setSelectedSite(site)}
                        className="text-xs text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        Ver Detalle Completo <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POWER & GENERATORS */}
          {activeTab === 'power' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Cuadros de Fuerza Operativos</div>
                    <div className="text-2xl font-bold text-white">94.2%</div>
                    <div className="text-[10px] text-slate-500">32 Rectificadores en línea</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
                    <Fuel className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Reserva de Diésel Promedio</div>
                    <div className="text-2xl font-bold text-white">1,840 Litros</div>
                    <div className="text-[10px] text-slate-500">Autonomía est. 48 horas</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Horas de Operación Generadores</div>
                    <div className="text-2xl font-bold text-white">8,260 hrs</div>
                    <div className="text-[10px] text-slate-500">Mantenimiento preventivo al día</div>
                  </div>
                </div>
              </div>

              {/* GENERATORS DETAILED TRACKER */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Fuel className="w-5 h-5 text-amber-400" /> Control de Motogeneradores & Plantas Eléctricas en Sitios
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {sites.map(site => (
                    <div key={site.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200 text-sm">{site.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                          site.fuelLevel < 30 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {site.powerStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">Nivel de Tanque (Diésel)</div>
                          <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-1">
                            <Fuel className={`w-4 h-4 ${site.fuelLevel < 30 ? 'text-rose-400' : 'text-emerald-400'}`} />
                            {site.fuelLevel}%
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className={`h-full rounded-full ${site.fuelLevel < 30 ? 'bg-rose-500' : 'bg-emerald-400'}`} style={{ width: `${site.fuelLevel}%` }} />
                          </div>
                        </div>

                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400">Horas Acumuladas Motor</div>
                          <div className="text-lg font-bold text-white flex items-center gap-1.5 mt-1">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            {site.genHours} hrs
                          </div>
                          <div className="text-[10px] text-slate-500 mt-2">Próx. Service: +250 hrs</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WAREHOUSE & FIELD KITS */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Warehouse className="w-5 h-5 text-cyan-400" /> Inventario Central vs Stock de Cuadrillas
                  </h3>
                  <p className="text-xs text-slate-400">Control de transceptores DWDM, cables de fibra, baterías y filtros</p>
                </div>
                {selectedRole !== 'client' && (
                  <button className="px-3.5 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-emerald-400 transition-all">
                    <Plus className="w-4 h-4" /> Registrar Transferencia a Cuadrilla
                  </button>
                )}
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/60 uppercase font-semibold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-4">Código SKU</th>
                      <th className="p-4">Descripción del Material</th>
                      <th className="p-4">Categoría</th>
                      <th className="p-4">Almacén Central</th>
                      <th className="p-4">En Cuadrillas (Campo)</th>
                      <th className="p-4">Estado de Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {inventory.map((item) => {
                      const total = item.centralQty + item.fieldQty;
                      const isLow = total < item.minThreshold;
                      return (
                        <tr key={item.code} className="hover:bg-slate-800/40 transition-all">
                          <td className="p-4 font-mono text-emerald-400 font-semibold">{item.code}</td>
                          <td className="p-4 font-medium text-white">{item.name}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-200">{item.centralQty} {item.unit}</td>
                          <td className="p-4 font-bold text-cyan-400">{item.fieldQty} {item.unit}</td>
                          <td className="p-4">
                            {isLow ? (
                              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-semibold flex items-center gap-1 w-max">
                                <AlertTriangle className="w-3 h-3" /> Stock Reposición Requerido
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1 w-max">
                                <Check className="w-3 h-3" /> Stock Suficiente
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FLEET CONTROL */}
          {activeTab === 'fleet' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-400" /> Telemetría & Asignación de Unidades de Campo
                  </h3>
                  <p className="text-xs text-slate-400">Rastreo de vehículos, mantenimientos preventivos y kilometraje</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fleet.map((veh) => (
                  <div key={veh.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{veh.id}</span>
                        <h4 className="text-sm font-bold text-white mt-1">{veh.model}</h4>
                        <p className="text-xs font-mono text-emerald-400 font-bold">{veh.plate}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        veh.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {veh.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Asignado a:</span>
                        <span className="font-medium text-slate-200">{veh.assignedCrew}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Kilometraje:</span>
                        <span className="font-mono">{veh.odometer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Combustible:</span>
                        <span className="font-mono font-bold text-cyan-400">{veh.fuel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ubicación GPS:</span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {veh.gps}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PHOTOGRAPHIC EVIDENCE & QA AUDIT */}
          {activeTab === 'qa' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Camera className="w-5 h-5 text-emerald-400" /> Galería e Historial de Evidencia Fotográfica QA
                  </h3>
                  <p className="text-xs text-slate-400">Verificación y trazabilidad visual Antes / Durante / Después por auditoría técnica</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.flatMap(s => s.photos.map(p => ({ ...p, siteName: s.name, siteId: s.id }))).map((photo) => (
                  <div key={photo.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden group hover:border-emerald-500/40 transition-all space-y-3 p-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                      <img 
                        src={photo.url} 
                        alt={photo.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-[10px] font-bold backdrop-blur-md shadow-md ${
                        photo.status === 'Approved' ? 'bg-emerald-500/80 text-slate-950' :
                        photo.status === 'Rejected' ? 'bg-rose-500/80 text-white' : 'bg-amber-500/80 text-slate-950'
                      }`}>
                        {photo.status}
                      </span>
                    </div>

                    <div className="space-y-1 px-1">
                      <div className="text-[10px] font-mono text-emerald-400">{photo.siteId} - {photo.siteName}</div>
                      <h4 className="text-sm font-bold text-white">{photo.title}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> Registrado: {photo.timestamp}
                      </p>
                    </div>

                    {(selectedRole === 'admin' || selectedRole === 'qa') && photo.status === 'Pending QA' && (
                      <div className="flex gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => handleApprovePhoto(photo.siteId, photo.id, true)}
                          className="flex-1 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Aprobar
                        </button>
                        <button
                          onClick={() => handleApprovePhoto(photo.siteId, photo.id, false)}
                          className="flex-1 py-1.5 bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* DETAILED SITE EXPEDIENTE DRAWER/MODAL */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* MODAL HEADER */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    {selectedSite.id}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2">{selectedSite.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {selectedSite.region} ({selectedSite.coords})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* METRICS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500">Progreso Total</span>
                  <div className="text-lg font-bold text-emerald-400">{selectedSite.progress}%</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500">Combustible</span>
                  <div className="text-lg font-bold text-amber-400">{selectedSite.fuelLevel}%</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500">Generador</span>
                  <div className="text-lg font-bold text-cyan-400">{selectedSite.genHours} hrs</div>
                </div>
              </div>

              {/* MILESTONE CHECKLIST */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hitos e Inspecciones Técnicas
                </h4>
                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {selectedSite.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-900 last:border-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={m.done}
                          disabled={selectedRole === 'client'}
                          onChange={() => handleToggleMilestone(selectedSite.id, idx)}
                          className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20 h-4 w-4"
                        />
                        <span className={m.done ? 'line-through text-slate-500' : 'text-slate-200'}>{m.name}</span>
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">{m.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PHOTO EVIDENCE SECTION */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-cyan-400" /> Evidencias Fotograficas ({selectedSite.photos.length})
                  </h4>
                  {selectedRole !== 'client' && (
                    <button
                      onClick={() => setShowPhotoModal(true)}
                      className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1 border border-emerald-500/30"
                    >
                      <Upload className="w-3.5 h-3.5" /> Subir Foto
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {selectedSite.photos.map((photo) => (
                    <div key={photo.id} className="bg-slate-950 p-2 rounded-xl border border-slate-800 space-y-2">
                      <img src={photo.url} alt={photo.title} className="w-full h-28 object-cover rounded-lg" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">{photo.title}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[9px] text-slate-500 font-mono">{photo.category}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            photo.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {photo.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedSite(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD PHOTO MODAL */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" /> Subir Evidencia de Campo
              </h3>
              <button onClick={() => setShowPhotoModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Título de la Inspección / Foto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Splicing de Fibra en Caja de Empalme N2"
                  value={newPhotoData.title}
                  onChange={e => setNewPhotoData({ ...newPhotoData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Categoría Técnica</label>
                <select
                  value={newPhotoData.category}
                  onChange={e => setNewPhotoData({ ...newPhotoData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Telecom">Telecom & DWDM</option>
                  <option value="Power Systems">Sistemas de Fuerza</option>
                  <option value="Motogenerador">Motogeneradores</option>
                  <option value="Fibre Optic">FIB / FBB</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">URL de Imagen (Simulación Carga)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newPhotoData.url}
                  onChange={e => setNewPhotoData({ ...newPhotoData, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400"
                >
                  Guardar Evidencia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HOSTING & COMMERCIAL BLUEPRINT MODAL */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl p-6 lg:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                  Plan de Despliegue Comercial & Hospedaje
                </span>
                <h2 className="text-2xl font-black text-white mt-2">Guía de Hospedaje Gratuito y Modelo SaaS</h2>
              </div>
              <button onClick={() => setShowPricingModal(false)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FREE HOSTING STRATEGY */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Cloud className="w-4 h-4" /> 1. Estrategia de Hospedaje Gratuito Actual (Ideal para Demos)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs">Vercel / Netlify</div>
                  <div className="text-[11px] text-emerald-400 font-bold">$0 / mes</div>
                  <p className="text-[10px] text-slate-400">Hosting del Frontend React sin límites de vistas de demo.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs">Supabase (PostgreSQL)</div>
                  <div className="text-[11px] text-emerald-400 font-bold">$0 / mes</div>
                  <p className="text-[10px] text-slate-400">Base de datos con autenticación de usuarios y 500MB de almacén.</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs">Cloudinary (Storage Photos)</div>
                  <div className="text-[11px] text-emerald-400 font-bold">$0 / mes</div>
                  <p className="text-[10px] text-slate-400">25 GB gratis de fotos y compresión automática de evidencia.</p>
                </div>
              </div>
            </div>

            {/* COMMERCIAL MODULAR PRICING FOR CLIENT PROPOSALS */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> 2. Propuesta Comercial Modular Recomendada
              </h3>
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 font-semibold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Módulo u Opción</th>
                      <th className="p-3">Alcance Incluido</th>
                      <th className="p-3 text-right">Costo Estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-3 font-semibold text-white">Setup Inicial & Personalización Marca</td>
                      <td className="p-3 text-slate-400">Configuración de dominios, carga de logo y adaptación de KPIs</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400">$800 - $1,500 USD (Único)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Módulo Telecom & Swaps DWDM/FBB</td>
                      <td className="p-3 text-slate-400">Gestión de sitios, seguimiento de hitos e inventario transceptores</td>
                      <td className="p-3 text-right font-mono text-slate-200">$250 USD / mes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Módulo Energía, Fuerza & Telemetría</td>
                      <td className="p-3 text-slate-400">Horas de motor, nivel diésel, alertas de fallo de red</td>
                      <td className="p-3 text-right font-mono text-slate-200">$200 USD / mes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-white">Módulo Flota & Almacén de Campo</td>
                      <td className="p-3 text-slate-400">Auditoría fotográfica QA, kits de cuadrilla y vehículos</td>
                      <td className="p-3 text-right font-mono text-slate-200">$180 USD / mes</td>
                    </tr>
                    <tr className="bg-emerald-500/5 font-bold">
                      <td className="p-3 text-emerald-400">SaaS Suite Completa ÁvilaTech (All-in-One)</td>
                      <td className="p-3 text-slate-300">Todos los módulos habilitados + usuarios ilimitados + soporte 24/7</td>
                      <td className="p-3 text-right font-mono text-emerald-400">$550 USD / mes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPricingModal(false)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:opacity-90"
              >
                Entendido, Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}