import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Eye, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface HotspotInfo {
  id: string;
  title: string;
  badge: string;
  position: [number, number, number];
  thaiDescription: string;
  legalStatus: 'valid' | 'warning' | 'critical';
  fdaRule: string;
}

const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'gda',
    title: 'ฉลากโภชนาการ GDA (หวาน มัน เค็ม)',
    badge: 'ด้านหน้า 1:4',
    position: [0, -0.4, 0.65],
    thaiDescription: 'กล่องทรงกระบอก 4 ช่อง (พลังงาน, น้ำตาล, ไขมัน, โซเดียม) ต้องครอบคลุมพื้นที่อย่างน้อย 1 ใน 4 ของแผงหน้า',
    legalStatus: 'warning',
    fdaRule: 'ประกาศกระทรวงสาธารณสุข ฉบับที่ 394 (พ.ศ. 2561)'
  },
  {
    id: 'fda-badge',
    title: 'เลขสารบบอาหาร 13 หลัก (อย.)',
    badge: 'ด้านหลังแผงข้อความ',
    position: [0.3, 0.4, -0.65],
    thaiDescription: 'เครื่องหมาย อย. พร้อมตัวเลข 13 หลัก ต้องอยู่ในกรอบสี่เหลี่ยมผืนผ้า สัดส่วน 1:2 บนพื้นสีตัดกันชัดเจน',
    legalStatus: 'valid',
    fdaRule: 'มาตรา 40 พระราชบัญญัติอาหาร พ.ศ. 2522'
  },
  {
    id: 'ingredients',
    title: 'ส่วนประกอบสำคัญ & สารก่อภูมิแพ้',
    badge: 'เรียงตามร้อยละ %',
    position: [-0.65, 0.1, 0.1],
    thaiDescription: 'เรียงจากมากไปน้อย ตัวอักษรคำเตือนสารก่อภูมิแพ้ต้องสูงไม่น้อยกว่า 1.5 มม.',
    legalStatus: 'warning',
    fdaRule: 'ประกาศกระทรวงสาธารณสุข ฉบับที่ 383'
  },
  {
    id: 'expiry',
    title: 'วันผลิตและวันหมดอายุ (MFG / EXP)',
    badge: 'รอยซีล / ด้านล่าง',
    position: [0, -0.85, 0.2],
    thaiDescription: 'ต้องระบุ วัน/เดือน/ปี ที่หมดอายุหรือควรบริโภคก่อนอย่างถาวร ไม่ลบเลือน',
    legalStatus: 'valid',
    fdaRule: 'เกณฑ์การแสดงฉลากอาหาร อย. ข้อ 7'
  }
];

export const ThreeDInspector: React.FC<{
  productType?: 'pouch' | 'can' | 'box';
  activeFdaNumber?: string;
}> = ({ productType = 'pouch', activeFdaNumber = '13-1-02964-6-0089' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo | null>(HOTSPOTS[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [currentPackage, setCurrentPackage] = useState<'pouch' | 'can' | 'box'>(productType);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions with ResizeObserver
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 420;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a'); // Sophisticated dark navy stage

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 2.0);
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xffffff, 1.5, 10);
    topLight.position.set(0, 3, 2);
    scene.add(topLight);

    // Create Main Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Build 3D Package depending on selected package type
    let mainMesh: THREE.Mesh;
    let foilTexture: THREE.CanvasTexture;

    // Dynamic texture generation with Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Background gradient for food label
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#1e3a8a');
    grad.addColorStop(0.5, '#2563eb');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Front details
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 56px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SUNNY SNACK', 280, 220);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('ข้าวโพดอบกรอบรสเนย', 290, 290);

    // GDA Box on texture
    ctx.fillStyle = '#ffffff';
    ctx.roundRect(240, 580, 540, 160, 20);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#0284c7';
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('คุณค่าทางโภชนาการต่อ 1 ซอง (55 กรัม)', 320, 620);

    // GDA Cylinders
    const gdaData = [
      { label: 'พลังงาน', val: '280 kcal', pct: '14%' },
      { label: 'น้ำตาล', val: '4 g', pct: '6%' },
      { label: 'ไขมัน', val: '14 g', pct: '22%' },
      { label: 'โซเดียม', val: '180 mg', pct: '9%' },
    ];
    gdaData.forEach((g, idx) => {
      const cx = 270 + idx * 125;
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(cx, 635, 110, 85);
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(g.label, cx + 18, 655);
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(g.val, cx + 14, 680);
      ctx.fillStyle = '#2563eb';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText(g.pct, cx + 38, 705);
    });

    // FDA Badge
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(320, 820, 380, 60);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3;
    ctx.strokeRect(320, 820, 380, 60);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(`อย. ${activeFdaNumber}`, 345, 860);

    foilTexture = new THREE.CanvasTexture(canvas);

    // Geometry based on selection
    if (currentPackage === 'pouch') {
      const geometry = new THREE.CylinderGeometry(0.55, 0.5, 1.6, 32, 16);
      // deform cylinder to look like a puffed snack pouch
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const factor = Math.cos((y / 0.8) * Math.PI * 0.5);
        pos.setZ(i, pos.getZ(i) * (1 + factor * 0.45));
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhysicalMaterial({
        map: foilTexture,
        roughness: 0.25,
        metalness: 0.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      modelGroup.add(mainMesh);

      // Top crimp seal
      const crimpGeo = new THREE.BoxGeometry(1.2, 0.08, 0.08);
      const crimpMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
      const topCrimp = new THREE.Mesh(crimpGeo, crimpMat);
      topCrimp.position.y = 0.82;
      modelGroup.add(topCrimp);

      const botCrimp = new THREE.Mesh(crimpGeo, crimpMat);
      botCrimp.position.y = -0.82;
      modelGroup.add(botCrimp);

    } else if (currentPackage === 'can') {
      const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
      const material = new THREE.MeshPhysicalMaterial({
        map: foilTexture,
        metalness: 0.85,
        roughness: 0.15,
        clearcoat: 0.8
      });
      mainMesh = new THREE.Mesh(geometry, material);
      modelGroup.add(mainMesh);

      // Can top rim
      const rimGeo = new THREE.TorusGeometry(0.48, 0.04, 16, 32);
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.2 });
      const topRim = new THREE.Mesh(rimGeo, rimMat);
      topRim.rotation.x = Math.PI / 2;
      topRim.position.y = 0.75;
      modelGroup.add(topRim);

    } else {
      const geometry = new THREE.BoxGeometry(1.0, 1.6, 0.5);
      const material = new THREE.MeshStandardMaterial({
        map: foilTexture,
        roughness: 0.4,
        metalness: 0.1
      });
      mainMesh = new THREE.Mesh(geometry, material);
      modelGroup.add(mainMesh);
    }

    // Laser scanning plane effect
    const scanPlaneGeo = new THREE.PlaneGeometry(1.8, 0.04);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.rotation.x = Math.PI / 2;
    modelGroup.add(scanPlane);

    // Hotspot 3D markers
    const hotspotMarkers: THREE.Mesh[] = [];
    HOTSPOTS.forEach((spot) => {
      const markerGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: spot.legalStatus === 'valid' ? 0x10b981 : spot.legalStatus === 'critical' ? 0xef4444 : 0xf59e0b
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(...spot.position);

      // Outer glow halo ring
      const ringGeo = new THREE.RingGeometry(0.07, 0.1, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spot.legalStatus === 'valid' ? 0x34d399 : 0xfbbf24,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      marker.add(ring);

      modelGroup.add(marker);
      hotspotMarkers.push(marker);
    });

    // Ambient floating particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.04,
      transparent: true,
      opacity: 0.5
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      modelGroup.rotation.y += deltaX * 0.008;
      modelGroup.rotation.x += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      modelGroup.rotation.y += deltaX * 0.008;
      modelGroup.rotation.x += deltaY * 0.008;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    domElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW && newH) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let scanY = 0.8;
    let scanDirection = -0.015;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Idle Rotation
      if (isAutoRotating && !isDragging) {
        modelGroup.rotation.y += 0.006;
      }

      // Scanner laser motion
      if (isScanning) {
        scanY += scanDirection;
        if (scanY < -0.8) scanDirection = 0.015;
        if (scanY > 0.8) scanDirection = -0.015;
        scanPlane.position.y = scanY;
        scanPlane.visible = true;
      } else {
        scanPlane.visible = false;
      }

      // Pulse markers
      const time = Date.now() * 0.003;
      hotspotMarkers.forEach((m, i) => {
        const scale = 1 + Math.sin(time + i) * 0.15;
        m.scale.set(scale, scale, scale);
      });

      // Subtle particle float
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [currentPackage, activeFdaNumber, isAutoRotating, isScanning]);

  return (
    <div id="three-inspector-card" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-white">
      {/* Top Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-wide text-slate-200">
                ระบบจำลองโมเดลบรรจุภัณฑ์ 3 มิติ (Three.js Inspector)
              </span>
              <span className="text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Interactive 3D
              </span>
            </div>
            <p className="text-xs text-slate-400">
              หมุนตรวจสอบตำแหน่งองค์ประกอบฉลากอาหารภาคบังคับตามกฎหมาย อย. 360 องศา
            </p>
          </div>
        </div>

        {/* Model Type Selector */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setCurrentPackage('pouch')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              currentPackage === 'pouch'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ถุงฟอยล์ขนมอบกรอบ
          </button>
          <button
            onClick={() => setCurrentPackage('can')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              currentPackage === 'can'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            กระป๋องเครื่องดื่ม
          </button>
          <button
            onClick={() => setCurrentPackage('box')}
            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
              currentPackage === 'box'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            กล่องอาหารแปรรูป
          </button>
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left 3D Canvas */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[440px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Controls Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shadow-md ${
                isAutoRotating
                  ? 'bg-blue-600/90 text-white border-blue-400'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="หมุนอัตโนมัติ"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
              <span>{isAutoRotating ? 'หมุนอัตโนมัติ: เปิด' : 'หมุนอัตโนมัติ: ปิด'}</span>
            </button>
            <button
              onClick={() => setIsScanning(!isScanning)}
              className={`p-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 shadow-md ${
                isScanning
                  ? 'bg-cyan-600/90 text-white border-cyan-400'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="เลเซอร์สแกน"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isScanning ? 'เลเซอร์สแกน: เปิด' : 'เลเซอร์สแกน: ปิด'}</span>
            </button>
          </div>

          <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 pointer-events-none">
            คลิกค้างแล้วลากเมาส์เพื่อหมุนโมเดล 360° | คลิกจุดตรวจด้านขวาเพื่อดูเกณฑ์ อย.
          </div>
        </div>

        {/* Right Hotspots & Legal Notes */}
        <div className="lg:col-span-4 p-4 sm:p-5 bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                จุดตรวจมาตรฐานบนบรรจุภัณฑ์
              </span>
              <span className="text-xs text-blue-400 font-medium">4 จุดบังคับ</span>
            </div>

            {/* List of Hotspots */}
            <div className="space-y-2.5">
              {HOTSPOTS.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-500/70 shadow-md ring-1 ring-blue-500/30'
                        : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="mt-0.5">
                      {spot.legalStatus === 'valid' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-semibold text-slate-100 truncate">
                          {spot.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 bg-slate-700/60 px-1.5 py-0.5 rounded">
                          {spot.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        {spot.thaiDescription}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Hotspot Inspector Detail */}
          {selectedHotspot && (
            <div className="mt-4 p-3.5 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  เกณฑ์อ้างอิงกฎหมาย อย.
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  selectedHotspot.legalStatus === 'valid'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {selectedHotspot.legalStatus === 'valid' ? 'ถูกต้องตามเกณฑ์' : 'พบข้อสังเกต'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedHotspot.thaiDescription}
              </p>
              <div className="mt-2 text-[10px] text-slate-500 border-t border-slate-800 pt-1.5">
                📜 {selectedHotspot.fdaRule}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
