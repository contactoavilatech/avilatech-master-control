import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, Shield, Users, Radio, Zap, Fuel, Truck, Warehouse, 
  Camera, CheckCircle2, AlertTriangle, Clock, Filter, Plus, 
  Search, Upload, ChevronRight, MapPin, Activity, Settings, 
  TrendingUp, Download, Eye, FileText, Check, X, RefreshCw,
  Server, HardDrive, Layers, Lock, Cpu, ArrowUpRight, DollarSign, Cloud,
  Sun, Moon, RotateCcw
} from 'lucide-react';

// --- INITIAL SEED DATA (CARACAS & VENEZUELA CENTRAL REGION FOCUS) ---
const SEED_SITES = [
  {
    id: 'CCS-101',
    name: 'BTS Sabana Grande - Central Node',
    region: 'Capital',
    type: 'Telecom & DWDM',
    status: 'In Progress',
    progress: 78,
    lead: 'Ing. Carlos Mendoza',
    crew: 'Cuadrilla Alfa - Power & Fiber',
    lastUpdate: '2026-10-27 14:30',
    coords: '10.4960° N, 66.8812° W',
    powerStatus: 'Normal (Grid + Gen Backup)',
    fuelLevel: 85,
    genHours: 1420,
    milestones: [
      { name: 'Inspección de Sitio y Permisos local', done: true, date: '2026-10-01' },
      { name: 'Adecuación Estructura & Torre', done: true, date: '2026-10-10' },
      { name: 'Instalación de Gabinete de Fuerza', done: true, date: '2026-10-18' },
      { name: 'Integración Tarjeta DWDM 100G', done: true, date: '2026-10-24' },
      { name: 'FBB Swap y Pruebas OTDR', done: false, date: 'Pending' },
      { name: 'Aprobación Final de Auditoría QA', done: false, date: 'Pending' }
    ],
    photos: [
      { id: 'p1', title: 'Cableado Gabinete de Fuerza AC/DC', category: 'Power Systems', status: 'Approved', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-24 11:20' },
      { id: 'p2', title: 'Montaje de Chasis DWDM', category: 'Telecom', status: 'Pending QA', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-25 16:45' }
    ]
  },
  {
    id: 'VAL-204',
    name: 'Valencia Norte - Hub Repetidor 04',
    region: 'Central',
    type: 'Power & Generadores',
    status: 'Critical Alert',
    progress: 42,
    lead: 'Ing. Roberto Silva',
    crew: 'Cuadrilla Bravo - Heavy Power',
    lastUpdate: '2026-10-27 16:10',
    coords: '10.1620° N, 68.0077° W',
    powerStatus: 'Falla Red Comercial - Gen Activo',
    fuelLevel: 24,
    genHours: 3890,
    milestones: [
      { name: 'Inspección previa de Transferencia ATS', done: true, date: '2026-10-05' },
      { name: 'Instalación Conmutador de Potencia', done: true, date: '2026-10-15' },
      { name: 'Reemplazo Motogenerador 150 kVA', done: false, date: 'In Progress' },
      { name: 'Prueba de Carga Eléctrica 48h', done: false, date: 'Pending' },
      { name: 'Conexión Telemetría Remota', done: false, date: 'Pending' }
    ],
    photos: [
      { id: 'p3', title: 'Llegada de Planta Eléctrica Perkins', category: 'Motogenerador', status: 'Approved', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-26 09:15' }
    ]
  },
  {
    id: 'MCBO-302',
    name: 'Maracaibo Subestación - Nodo Fibra',
    region: 'Occidente',
    type: 'Telecom & FBB',
    status: 'Completed',
    progress: 100,
    lead: 'Ing. Elena Gómez',
    crew: 'Cuadrilla Charlie - Óptica',
    lastUpdate: '2026-10-26 18:00',
    coords: '10.6544° N, 71.6402° W',
    powerStatus: 'Normal (Solar + Grid)',
    fuelLevel: 95,
    genHours: 850,
    milestones: [
      { name: 'Fusión de Hilos de Fibra Óptica', done: true, date: '2026-10-02' },
      { name: 'Medición Traza OTDR', done: true, date: '2026-10-12' },
      { name: 'Etiquetado y Peinado de Rack', done: true, date: '2026-10-20' },
      { name: 'Entrega QA a Cliente Final', done: true, date: '2026-10-26' }
    ],
    photos: [
      { id: 'p4', title: 'Bandeja de Empalme Certificada', category: 'Fibre Optic', status: 'Approved', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-25 10:00' }
    ]
  },
  {
    id: 'PLC-401',
    name: 'Puerto La Cruz - Nodo Costero 12',
    region: 'Oriente',
    type: 'Swap & Upgrades',
    status: 'In Progress',
    progress: 60,
    lead: 'Ing. Marcus Ruiz',
    crew: 'Cuadrilla Delta - General',
    lastUpdate: '2026-10-27 11:15',
    coords: '10.2138° N, 64.6326° W',
    powerStatus: 'Normal',
    fuelLevel: 70,
    genHours: 2100,
    milestones: [
      { name: 'Desmontaje Antenas Legacy', done: true, date: '2026-10-18' },
      { name: 'Montaje de Nuevas RRU 5G', done: true, date: '2026-10-22' },
      { name: 'Reemplazo Cable Feeder / Coaxial', done: false, date: 'In Progress' },
      { name: 'Alineación de Sectores y VSWR', done: false, date: 'Pending' }
    ],
    photos: [
      { id: 'p5', title: 'Montaje de Radiofrecuencia RRU', category: 'Telecom', status: 'Pending QA', url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=600&q=80', timestamp: '2026-10-27 10:30' }
    ]
  }
];

const SEED_INVENTORY = [
  { code: 'SKU-DWDM-10G', name: 'Módulo SFP+ 10G ER 1310nm 40km', centralQty: 145, fieldQty: 24, minThreshold: 30, unit: 'pcs', category: 'Telecom' },
  { code: 'SKU-PWR-48V', name: 'Módulo Rectificador 48V 3000W Huawei/ZTE', centralQty: 42, fieldQty: 12, minThreshold: 15, unit: 'unidades', category: 'Power' },
  { code: 'SKU-GEN-FIL', name: 'Kit Filtros Motogenerador Perkins 100kVA', centralQty: 88, fieldQty: 30, minThreshold: 20, unit: 'kits', category: 'Motogeneradores' },
  { code: 'SKU-FIB-12C', name: 'Cable Fibra Óptica ADSS 12 hilos Single Mode', centralQty: 12500, fieldQty: 3200, minThreshold: 5000, unit: 'metros', category: 'FBB' },
  { code: 'SKU-BAT-GEL', name: 'Batería Gel Deep Cycle 12V 200Ah', centralQty: 18, fieldQty: 6, minThreshold: 25, unit: 'unidades', category: 'Power' }
];

const SEED_FLEET = [
  { id: 'V-01', plate: 'AB892CD', model: 'Toyota Hilux 4x4 Tech', assignedCrew: 'Cuadrilla Alfa', odometer: '142,500 km', status: 'Operativo', fuel: '82%', lastMaint: '2026-09-15', gps: 'Caracas (Ruta Sabana Grande)' },
  { id: 'V-02', plate: 'A31BC5D', model: 'Ford F-350 Grua Pesada', assignedCrew: 'Cuadrilla Bravo', odometer: '210,100 km', status: 'En Servicio', fuel: '45%', lastMaint: '2026-10-20', gps: 'Valencia Taller Central' },
  { id: 'V-03', plate: 'AD901EF', model: 'Chevrolet LUV D-Max 4x4', assignedCrew: 'Cuadrilla Charlie', odometer: '98,300 km', status: 'Operativo', fuel: '90%', lastMaint: '2026-10-01', gps: 'Maracaibo Campo' },
  { id: 'V-04', plate: 'AB441GH', model: 'Nissan Frontier 4x4', assignedCrew: 'Cuadrilla Delta', odometer: '175,000 km', status: 'Alerta Mantenimiento', fuel: '25%', lastMaint: '2026-08-10', gps: 'Autopista PLC' }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // LOCALSTORAGE BACKED STATE MANAGERS
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem('avilatech_sites');
    return saved ? JSON.parse(saved) : SEED_SITES;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('avilatech_inventory');
    return saved ? JSON.parse(saved) : SEED_INVENTORY;
  });

  const [fleet, setFleet] = useState(() => {
    const saved = localStorage.getItem('avilatech_fleet');
    return saved ? JSON.parse(saved) : SEED_FLEET;
  });

  useEffect(() => {
    localStorage.setItem('avilatech_sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('avilatech_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('avilatech_fleet', JSON.stringify(fleet));
  }, [fleet]);

  const handleResetData = () => {
    if (window.confirm("¿Deseas restaurar la base de datos temporal con los datos iniciales de la demo?")) {
      localStorage.removeItem('avilatech_sites');
      localStorage.removeItem('avilatech_inventory');
      localStorage.removeItem('avilatech_fleet');
      setSites(SEED_SITES);
      setInventory(SEED_INVENTORY);
      setFleet(SEED_FLEET);
    }
  };

  // Modal states
  const [selectedSite, setSelectedSite] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPowerModal, setShowPowerModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Form input states
  const [progressForm, setProgressForm] = useState({ siteId: '', milestoneIdx: 0, progress: 50, note: '' });
  const [photoForm, setPhotoForm] = useState({ siteId: '', title: '', category: 'Telecom', url: '' });
  const [powerForm, setPowerForm] = useState({ siteId: '', genHoursAdd: 10, fuelLevel: 80, powerStatus: 'Normal' });
  const [inventoryForm, setInventoryForm] = useState({ code: '', qty: 10, targetCrew: 'Cuadrilla Alfa' });
  const [fleetForm, setFleetForm] = useState({ vehicleId: 'V-01', newOdometer: '145,000 km', fuel: '90%', status: 'Operativo' });

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

  // Form Handlers
  const handleToggleMilestone = (siteId, index) => {
    if (selectedRole === 'client') return;
    setSites(prev => prev.map(site => {
      if (site.id === siteId) {
        const updatedMilestones = [...site.milestones];
        updatedMilestones[index].done = !updatedMilestones[index].done;
        updatedMilestones[index].date = updatedMilestones[index].done ? new Date().toISOString().split('T')[0] : 'Pending';
        const completedCount = updatedMilestones.filter(m => m.done).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        const updated = { ...site, milestones: updatedMilestones, progress: newProgress, lastUpdate: 'Justo ahora' };
        if (selectedSite && selectedSite.id === siteId) setSelectedSite(updated);
        return updated;
      }
      return site;
    }));
  };

  const handleSaveProgressForm = (e) => {
    e.preventDefault();
    if (!progressForm.siteId) return;
    setSites(prev => prev.map(s => {
      if (s.id === progressForm.siteId) {
        return { ...s, progress: Number(progressForm.progress), lastUpdate: 'Justo ahora' };
      }
      return s;
    }));
    setShowProgressModal(false);
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    const targetSiteId = progressForm.siteId || sites[0]?.id;
    if (!photoForm.title) return;

    const newPhoto = {
      id: 'p-' + Date.now(),
      title: photoForm.title,
      category: photoForm.category,
      status: 'Pending QA',
      url: photoForm.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      timestamp: new Date().toLocaleString()
    };

    setSites(prev => prev.map(s => {
      if (s.id === targetSiteId) {
        return { ...s, photos: [newPhoto, ...s.photos] };
      }
      return s;
    }));

    setPhotoForm({ siteId: '', title: '', category: 'Telecom', url: '' });
    setShowPhotoModal(false);
  };

  const handleApprovePhoto = (siteId, photoId, approved) => {
    if (selectedRole !== 'admin' && selectedRole !== 'qa') return;
    setSites(prev => prev.map(s => {
      if (s.id === siteId) {
        const updatedPhotos = s.photos.map(p => p.id === photoId ? { ...p, status: approved ? 'Approved' : 'Rejected' } : p);
        const updated = { ...s, photos: updatedPhotos };
        if (selectedSite && selectedSite.id === siteId) setSelectedSite(updated);
        return updated;
      }
      return s;
    }));
  };

  const handleSavePower = (e) => {
    e.preventDefault();
    setSites(prev => prev.map(s => {
      if (s.id === powerForm.siteId) {
        return { 
          ...s, 
          fuelLevel: Number(powerForm.fuelLevel), 
          genHours: s.genHours + Number(powerForm.genHoursAdd),
          powerStatus: powerForm.powerStatus 
        };
      }
      return s;
    }));
    setShowPowerModal(false);
  };

  const handleSaveInventory = (e) => {
    e.preventDefault();
    setInventory(prev => prev.map(item => {
      if (item.code === inventoryForm.code) {
        return {
          ...item,
          centralQty: Math.max(0, item.centralQty - Number(inventoryForm.qty)),
          fieldQty: item.fieldQty + Number(inventoryForm.qty)
        };
      }
      return item;
    }));
    setShowInventoryModal(false);
  };

  const handleSaveFleet = (e) => {
    e.preventDefault();
    setFleet(prev => prev.map(v => {
      if (v.id === fleetForm.vehicleId) {
        return { ...v, odometer: fleetForm.newOdometer, fuel: fleetForm.fuel, status: fleetForm.status };
      }
      return v;
    }));
    setShowFleetModal(false);
  };

  // Metrics
  const totalProjects = sites.length;
  const criticalAlerts = sites.filter(s => s.status === 'Critical Alert').length;
  const avgProgress = Math.round(sites.reduce((acc, curr) => acc + curr.progress, 0) / totalProjects);

  // Dynamic Theme Helpers
  const bgMain = darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  const bgHeader = darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm';
  const bgCard = darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm';
  const bgSubCard = darkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-100 border-slate-200';
  const textMuted = darkMode ? 'text-slate-400' : 'text-slate-500';
  const textTitle = darkMode ? 'text-white' : 'text-slate-900';
  const tableHeaderBg = darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100/80 border-slate-200';

  return (
    <div className={`min-h-screen ${bgMain} flex flex-col font-sans antialiased transition-colors duration-200 selection:bg-emerald-500 selection:text-slate-900`}>
      
      {/* HEADER BAR */}
      <header className={`border-b ${bgHeader} backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Radio className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className={`text-xl font-extrabold tracking-tight ${darkMode ? 'bg-gradient-to-r from-white via-slate-200 to-slate-400' : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600'} bg-clip-text text-transparent`}>
              ÁvilaTech <span className="text-emerald-500 text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Operations Hub v3.2</span>
            </h1>
            <p className={`text-xs ${textMuted}`}>Control Centralizado de Operaciones de Telecomunicaciones e Infraestructura</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          
          <button
            onClick={handleResetData}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
              darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title="Restaurar base de datos temporal con datos iniciales"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Restablecer Demo</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
              darkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {darkMode ? <Sun className="w-4 h-4 fill-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span className="hidden sm:inline">{darkMode ? 'Claro' : 'Oscuro'}</span>
          </button>

          <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border ${darkMode ? 'bg-slate-800/80 border-slate-700/60' : 'bg-slate-100 border-slate-300'}`}>
            <span className={`text-xs ${textMuted} pl-2 font-medium flex items-center gap-1.5 hidden lg:flex`}>
              <Users className="w-3.5 h-3.5 text-emerald-500" /> Perfil Demo:
            </span>
            <div className="flex gap-1">
              {[
                { id: 'admin', label: 'Admin', icon: Shield },
                { id: 'supervisor', label: 'Supervisor', icon: Activity },
                { id: 'qa', label: 'Auditor QA', icon: CheckCircle2 },
                { id: 'client', label: 'Cliente', icon: Eye }
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
                        : `${textMuted} hover:${textTitle} ${darkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-200'}`
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setShowPricingModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all transform active:scale-95"
          >
            <Cloud className="w-4 h-4" />
            <span className="hidden sm:inline">Hosting & Cotización</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`w-64 border-r ${darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'} p-4 hidden md:flex flex-col gap-6 justify-between`}>
          <div className="space-y-4">
            <div className={`text-xs font-semibold ${textMuted} uppercase tracking-wider px-3`}>
              Módulos del Sistema
            </div>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Resumen Ejecutivo', icon: BarChart3, badge: null },
                { id: 'telecom', label: 'Telecom, FBB & DWDM', icon: Radio, badge: `${sites.length} Sitios` },
                { id: 'power', label: 'Energía & Generación', icon: Zap, badge: `${criticalAlerts} Alerta` },
                { id: 'inventory', label: 'Almacén & Cuadrillas', icon: Warehouse, badge: 'Stock OK' },
                { id: 'fleet', label: 'Control de Flota', icon: Truck, badge: `${fleet.length} Unid.` },
                { id: 'qa', label: 'Evidencias & Auditoría QA', icon: Camera, badge: 'Fotos' }
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? darkMode 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm font-bold'
                        : `${textMuted} ${darkMode ? 'hover:bg-slate-800/60 hover:text-slate-200' : 'hover:bg-slate-100 hover:text-slate-900'}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') : textMuted}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        active 
                          ? (darkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-200 text-emerald-800') 
                          : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600')
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className={`rounded-xl p-3.5 border ${bgCard} space-y-2`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold ${textTitle} flex items-center gap-1.5`}>
                <Lock className="w-3.5 h-3.5 text-cyan-500" /> Rol: {selectedRole.toUpperCase()}
              </span>
            </div>
            <p className={`text-[11px] ${textMuted} leading-relaxed`}>
              {selectedRole === 'admin' && 'Permisos de modificación global habilitados.'}
              {selectedRole === 'supervisor' && 'Permisos de registro de avance y fotos activados.'}
              {selectedRole === 'qa' && 'Permisos de aprobación y revisión técnica habilitados.'}
              {selectedRole === 'client' && 'Modo solo lectura ejecutivo.'}
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className={`flex-1 overflow-y-auto p-4 lg:p-8 space-y-6 ${darkMode ? 'bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950' : 'bg-slate-50'}`}>
          
          {/* SEARCH & INPUT BUTTONS BAR */}
          <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl border ${bgCard}`}>
            <div className="relative flex-1 max-w-md">
              <Search className={`w-4 h-4 ${textMuted} absolute left-3.5 top-1/2 -translate-y-1/2`} />
              <input
                type="text"
                placeholder="Buscar por nodo, ID, líder de cuadrilla o región..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs transition-all focus:outline-none focus:border-emerald-500 ${
                  darkMode 
                    ? 'bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500' 
                    : 'bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {selectedRole !== 'client' && (
                <>
                  <button
                    onClick={() => { setProgressForm({ ...progressForm, siteId: sites[0]?.id }); setShowProgressModal(true); }}
                    className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> Avance Sitio
                  </button>
                  <button
                    onClick={() => { setPhotoForm({ ...photoForm, siteId: sites[0]?.id }); setShowPhotoModal(true); }}
                    className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/10"
                  >
                    <Upload className="w-3.5 h-3.5" /> Foto QA
                  </button>
                </>
              )}
            </div>
          </div>

          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`${bgCard} p-5 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${textMuted}`}>Proyectos Activos</span>
                    <Radio className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className={`text-3xl font-black ${textTitle}`}>{totalProjects}</div>
                  <div className="mt-2 flex items-center text-xs text-emerald-500 font-medium gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +12% este mes
                  </div>
                </div>

                <div className={`${bgCard} p-5 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${textMuted}`}>Progreso Operativo Global</span>
                    <Activity className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div className={`text-3xl font-black ${textTitle}`}>{avgProgress}%</div>
                  <div className={`w-full ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} rounded-full h-1.5 mt-3 overflow-hidden`}>
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: `${avgProgress}%` }} />
                  </div>
                </div>

                <div className={`${bgCard} p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${textMuted}`}>Diésel Generadores Promedio</span>
                    <Fuel className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className={`text-3xl font-black ${textTitle}`}>68%</div>
                  <div className="mt-2 text-xs text-amber-500 font-medium">
                    1 Sitio en reserva crítica (Valencia)
                  </div>
                </div>

                <div className={`${bgCard} p-5 rounded-2xl relative overflow-hidden group hover:border-rose-500/40 transition-all`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium ${textMuted}`}>Alertas Críticas</span>
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className={`text-3xl font-black ${textTitle}`}>{criticalAlerts}</div>
                  <div className="mt-2 text-xs text-rose-500 font-medium">
                    Falla de red comercial activa
                  </div>
                </div>
              </div>

              {/* SITES TABLE */}
              <div className={`${bgCard} rounded-2xl overflow-hidden`}>
                <div className={`p-5 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} flex flex-wrap items-center justify-between gap-4`}>
                  <div>
                    <h3 className={`text-base font-bold ${textTitle} flex items-center gap-2`}>
                      <Layers className="w-4 h-4 text-emerald-500" /> Monitoreo Consolidado de Nodos Operativos
                    </h3>
                    <p className={`text-xs ${textMuted}`}>Seguimiento en tiempo real con persistencia de datos</p>
                  </div>
                  <span className={`text-xs ${textMuted} font-mono`}>{filteredSites.length} sitios mostrados</span>
                </div>

                <div className="overflow-x-auto">
                  <table className={`w-full text-left text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    <thead className={`${tableHeaderBg} uppercase font-semibold ${textMuted}`}>
                      <tr>
                        <th className="p-4">Nodo / Sitio</th>
                        <th className="p-4">Región & Coordenadas</th>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Cuadrilla</th>
                        <th className="p-4">Nivel Energía</th>
                        <th className="p-4">Progreso</th>
                        <th className="p-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                      {filteredSites.map((site) => (
                        <tr key={site.id} className={`${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-100/60'} transition-all`}>
                          <td className="p-4 font-semibold">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${
                                site.status === 'Completed' ? 'bg-emerald-500' :
                                site.status === 'Critical Alert' ? 'bg-rose-500 animate-pulse' : 'bg-cyan-500'
                              }`} />
                              <div>
                                <div className={textTitle}>{site.name}</div>
                                <div className={`text-[10px] ${textMuted} font-mono`}>{site.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className={`p-4 ${textMuted}`}>
                            <div>{site.region}</div>
                            <div className="text-[10px] font-mono">{site.coords}</div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                              darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300'
                            }`}>
                              {site.type}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className={textTitle}>{site.crew}</div>
                            <div className={`text-[10px] ${textMuted}`}>{site.lead}</div>
                          </td>
                          <td className="p-4 font-mono">
                            <span className={site.fuelLevel < 30 ? 'text-rose-500 font-bold' : textTitle}>
                              {site.fuelLevel}% Tanque
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-20 ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} h-1.5 rounded-full overflow-hidden`}>
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${site.progress}%` }} />
                              </div>
                              <span className="font-mono font-bold text-xs">{site.progress}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedSite(site)}
                              className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-semibold text-xs transition-all"
                            >
                              Ver Expediente
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

          {/* TAB 2: TELECOM */}
          {activeTab === 'telecom' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sites.map(site => (
                  <div key={site.id} className={`${bgCard} rounded-2xl p-5 space-y-4`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{site.id}</span>
                        <h4 className={`text-base font-bold ${textTitle} mt-1`}>{site.name}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-500">{site.progress}%</span>
                    </div>

                    <div className="space-y-2">
                      <div className={`space-y-1.5 p-3 rounded-xl border ${bgSubCard}`}>
                        {site.milestones.map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={m.done}
                                disabled={selectedRole === 'client'}
                                onChange={() => handleToggleMilestone(site.id, idx)}
                                className="rounded border-slate-400 text-emerald-500 h-4 w-4"
                              />
                              <span className={m.done ? 'line-through text-slate-400' : textTitle}>{m.name}</span>
                            </label>
                            <span className={`text-[10px] font-mono ${textMuted}`}>{m.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POWER */}
          {activeTab === 'power' && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`${bgCard} p-5 rounded-2xl flex justify-between items-center`}>
                <div>
                  <h3 className={`text-base font-bold ${textTitle} flex items-center gap-2`}>
                    <Zap className="w-5 h-5 text-amber-500" /> Monitoreo de Plantas & Motogeneradores
                  </h3>
                  <p className={`text-xs ${textMuted}`}>Control de combustible y horómetros acumulados</p>
                </div>
                {selectedRole !== 'client' && (
                  <button
                    onClick={() => { setPowerForm({ ...powerForm, siteId: sites[0]?.id }); setShowPowerModal(true); }}
                    className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Registrar Lectura Diésel
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sites.map(s => (
                  <div key={s.id} className={`${bgCard} p-5 rounded-2xl space-y-3`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-bold ${textTitle}`}>{s.name}</span>
                      <span className="text-xs font-mono text-amber-500">{s.powerStatus}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className={`p-3 rounded-lg border ${bgSubCard}`}>
                        <div className={`text-[10px] ${textMuted}`}>Combustible</div>
                        <div className={`text-lg font-bold ${s.fuelLevel < 30 ? 'text-rose-500' : textTitle}`}>{s.fuelLevel}%</div>
                      </div>
                      <div className={`p-3 rounded-lg border ${bgSubCard}`}>
                        <div className={`text-[10px] ${textMuted}`}>Horómetro Motor</div>
                        <div className={`text-lg font-bold ${textTitle}`}>{s.genHours} hrs</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`${bgCard} p-5 rounded-2xl flex justify-between items-center`}>
                <div>
                  <h3 className={`text-base font-bold ${textTitle} flex items-center gap-2`}>
                    <Warehouse className="w-5 h-5 text-cyan-500" /> Inventario Central vs Campo
                  </h3>
                  <p className={`text-xs ${textMuted}`}>Despacho de insumos a cuadrillas</p>
                </div>
                {selectedRole !== 'client' && (
                  <button
                    onClick={() => { setInventoryForm({ ...inventoryForm, code: inventory[0]?.code }); setShowInventoryModal(true); }}
                    className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Despachar a Cuadrilla
                  </button>
                )}
              </div>

              <div className={`${bgCard} rounded-2xl overflow-hidden`}>
                <table className={`w-full text-left text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <thead className={`${tableHeaderBg} uppercase font-semibold ${textMuted}`}>
                    <tr>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Descripción</th>
                      <th className="p-4">Almacén Central</th>
                      <th className="p-4">En Cuadrillas</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {inventory.map(item => (
                      <tr key={item.code}>
                        <td className="p-4 font-mono font-bold text-emerald-500">{item.code}</td>
                        <td className={`p-4 ${textTitle}`}>{item.name}</td>
                        <td className="p-4 font-bold">{item.centralQty} {item.unit}</td>
                        <td className="p-4 font-bold text-cyan-500">{item.fieldQty} {item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FLEET */}
          {activeTab === 'fleet' && (
            <div className="space-y-6 animate-fadeIn">
              <div className={`${bgCard} p-5 rounded-2xl flex justify-between items-center`}>
                <div>
                  <h3 className={`text-base font-bold ${textTitle} flex items-center gap-2`}>
                    <Truck className="w-5 h-5 text-emerald-500" /> Control de Vehículos Operativos
                  </h3>
                  <p className={`text-xs ${textMuted}`}>Telemetría y kilometraje de unidades</p>
                </div>
                {selectedRole !== 'client' && (
                  <button
                    onClick={() => setShowFleetModal(true)}
                    className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Actualizar Vehículo
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {fleet.map(v => (
                  <div key={v.id} className={`${bgCard} p-4 rounded-2xl space-y-2`}>
                    <div className="flex justify-between items-start">
                      <span className={`text-[10px] font-mono ${darkMode ? 'bg-slate-800' : 'bg-slate-200'} px-2 py-0.5 rounded`}>{v.id}</span>
                      <span className="text-xs font-bold text-emerald-500">{v.status}</span>
                    </div>
                    <div className={`font-bold ${textTitle} text-sm`}>{v.model}</div>
                    <div className="text-xs font-mono text-cyan-500">{v.plate}</div>
                    <div className={`text-xs ${textMuted} pt-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                      <div>Km: {v.odometer}</div>
                      <div>Tanque: {v.fuel}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: QA GALLERY */}
          {activeTab === 'qa' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sites.flatMap(s => s.photos.map(p => ({ ...p, siteName: s.name, siteId: s.id }))).map(photo => (
                  <div key={photo.id} className={`${bgCard} rounded-2xl p-3 space-y-2`}>
                    <img src={photo.url} alt={photo.title} className="w-full h-36 object-cover rounded-xl" />
                    <div className={`text-xs font-bold ${textTitle}`}>{photo.title}</div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className={textMuted}>{photo.siteId}</span>
                      <span className="text-emerald-500 font-mono font-bold">{photo.status}</span>
                    </div>
                    {(selectedRole === 'admin' || selectedRole === 'qa') && photo.status === 'Pending QA' && (
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => handleApprovePhoto(photo.siteId, photo.id, true)} className="flex-1 py-1 bg-emerald-500/20 text-emerald-500 font-bold rounded text-xs">
                          Aprobar
                        </button>
                        <button onClick={() => handleApprovePhoto(photo.siteId, photo.id, false)} className="flex-1 py-1 bg-rose-500/20 text-rose-500 font-bold rounded text-xs">
                          Rechazar
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

      {/* INPUT MODAL 1: PROGRESS FORM */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border w-full max-w-md rounded-2xl p-6 space-y-4`}>
            <h3 className={`text-base font-bold ${textTitle}`}>Registrar Avance de Sitio</h3>
            <form onSubmit={handleSaveProgressForm} className="space-y-3 text-xs">
              <div>
                <label className={`block ${textMuted} mb-1`}>Seleccionar Nodo / Sitio</label>
                <select
                  value={progressForm.siteId}
                  onChange={e => setProgressForm({ ...progressForm, siteId: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                >
                  {sites.map(s => <option key={s.id} value={s.id}>{s.id} - {s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={`block ${textMuted} mb-1`}>Porcentaje de Avance General (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={progressForm.progress}
                  onChange={e => setProgressForm({ ...progressForm, progress: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowProgressModal(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">Guardar Avance</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INPUT MODAL 2: UPLOAD PHOTO */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border w-full max-w-md rounded-2xl p-6 space-y-4`}>
            <h3 className={`text-base font-bold ${textTitle}`}>Cargar Evidencia Fotográfica QA</h3>
            <form onSubmit={handleAddPhoto} className="space-y-3 text-xs">
              <div>
                <label className={`block ${textMuted} mb-1`}>Seleccionar Sitio</label>
                <select
                  value={photoForm.siteId || sites[0]?.id}
                  onChange={e => setPhotoForm({ ...photoForm, siteId: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                >
                  {sites.map(s => <option key={s.id} value={s.id}>{s.id} - {s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={`block ${textMuted} mb-1`}>Título de la Foto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Peinado de Fibra Óptica ODF"
                  value={photoForm.title}
                  onChange={e => setPhotoForm({ ...photoForm, title: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowPhotoModal(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold">Subir Evidencia</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INPUT MODAL 3: POWER */}
      {showPowerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border w-full max-w-md rounded-2xl p-6 space-y-4`}>
            <h3 className={`text-base font-bold ${textTitle}`}>Actualizar Lectura de Planta</h3>
            <form onSubmit={handleSavePower} className="space-y-3 text-xs">
              <div>
                <label className={`block ${textMuted} mb-1`}>Nodo / Sitio</label>
                <select
                  value={powerForm.siteId || sites[0]?.id}
                  onChange={e => setPowerForm({ ...powerForm, siteId: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                >
                  {sites.map(s => <option key={s.id} value={s.id}>{s.id} - {s.name}</option>)}
                </select>
              </div>
              <div>
                <label className={`block ${textMuted} mb-1`}>Nivel de Combustible Diésel (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={powerForm.fuelLevel}
                  onChange={e => setPowerForm({ ...powerForm, fuelLevel: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowPowerModal(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold">Actualizar Lectura</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INPUT MODAL 4: INVENTORY */}
      {showInventoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border w-full max-w-md rounded-2xl p-6 space-y-4`}>
            <h3 className={`text-base font-bold ${textTitle}`}>Despachar Insumos a Campo</h3>
            <form onSubmit={handleSaveInventory} className="space-y-3 text-xs">
              <div>
                <label className={`block ${textMuted} mb-1`}>Seleccionar Material / SKU</label>
                <select
                  value={inventoryForm.code || inventory[0]?.code}
                  onChange={e => setInventoryForm({ ...inventoryForm, code: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                >
                  {inventory.map(item => <option key={item.code} value={item.code}>{item.code} - {item.name}</option>)}
                </select>
              </div>
              <div>
                <label className={`block ${textMuted} mb-1`}>Cantidad a Despachar</label>
                <input
                  type="number"
                  min="1"
                  value={inventoryForm.qty}
                  onChange={e => setInventoryForm({ ...inventoryForm, qty: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowInventoryModal(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold">Despachar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INPUT MODAL 5: FLEET */}
      {showFleetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border w-full max-w-md rounded-2xl p-6 space-y-4`}>
            <h3 className={`text-base font-bold ${textTitle}`}>Actualizar Novedad de Vehículo</h3>
            <form onSubmit={handleSaveFleet} className="space-y-3 text-xs">
              <div>
                <label className={`block ${textMuted} mb-1`}>Seleccionar Vehículo</label>
                <select
                  value={fleetForm.vehicleId}
                  onChange={e => setFleetForm({ ...fleetForm, vehicleId: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                >
                  {fleet.map(v => <option key={v.id} value={v.id}>{v.id} - {v.model} ({v.plate})</option>)}
                </select>
              </div>
              <div>
                <label className={`block ${textMuted} mb-1`}>Nuevo Kilometraje</label>
                <input
                  type="text"
                  value={fleetForm.newOdometer}
                  onChange={e => setFleetForm({ ...fleetForm, newOdometer: e.target.value })}
                  className={`w-full rounded-xl p-2 ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'} border`}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowFleetModal(false)} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRICING & HOSTING INFO MODAL */}
      {showPricingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border w-full max-w-2xl rounded-2xl p-6 space-y-4`}>
            <h3 className={`text-lg font-bold ${textTitle}`}>Estrategia de Hospedaje & Precios</h3>
            <p className={`text-xs ${textMuted}`}>Esta demostración funciona de forma 100% independiente sin backend gracias a almacenamiento temporal local (LocalStorage).</p>
            <div className={`p-4 rounded-xl border ${bgSubCard} text-xs space-y-2`}>
              <div className="font-bold text-emerald-500">Servidores recomendados para Producción:</div>
              <div>• Frontend: Vercel / Netlify (Plan Hobby $0/mes)</div>
              <div>• Base de Datos & Auth: Supabase (Plan Free $0/mes)</div>
              <div>• Fotos QA HD: Cloudinary / S3 ($0/mes hasta 25GB)</div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowPricingModal(false)} className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">Cerrar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}