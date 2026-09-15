import React, { useState } from 'react';
import { AuditReport, UserProfile } from '../types';
import { 
  Printer, 
  Send, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Share2,
  Check,
  Zap,
  Percent
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  report: AuditReport;
  user: UserProfile | null;
  onRescan: () => void;
  onNavigateToExamples: () => void;
}

export const AuditResultView: React.FC<Props> = ({
  report,
  user,
  onRescan,
  onNavigateToExamples
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'compare' | 'findings' | 'gda'>('all');
  const [shareSuccess, setShareSuccess] = useState(false);

  // Trigger browser print
  const handlePrint = () => {
    window.print();
  };

  // Trigger Send to R&D / Artwork team
  const handleForwardRnD = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3500);
  };

  return (
    <div id="audit-result-view" className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Sub-header & Breadcrumb (Image 6.jpeg) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            ระบบตรวจสอบมาตรฐานฉลาก อย.
          </span>
          <span>/</span>
          <span>รหัสการตรวจประเมิน: <strong className="text-slate-800">{report.id}</strong></span>
          <span>/</span>
          <span className="text-slate-600">สรุปผลการประเมินทางกฎหมาย</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>เชื่อมต่อฐานข้อมูล อย. สำเร็จ: {report.fdaConnectedDate}</span>
        </div>
      </div>

      {/* 2. Top Evaluation Card with Score & Action Buttons (Image 6.jpeg) */}
      <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100/90 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Score Circle + Product Status */}
          <div className="flex items-center gap-5">
            {/* Score Ring (78% คะแนน อย.) */}
            <div className="relative shrink-0 flex items-center justify-center w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-white shadow-md border-4 border-blue-500/30">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600 transition-all duration-1000 ease-out"
                  strokeDasharray={`${report.complianceScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-[#0f2444] leading-none">
                  {report.complianceScore}%
                </span>
                <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
                  คะแนน อย.
                </span>
              </div>
            </div>

            {/* Product Meta & Flags */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300/80 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  <AlertTriangle className="w-3 h-3 text-amber-700" />
                  {report.statusWarning}
                </span>
                <span className="text-xs text-slate-500 font-medium bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  {report.complianceLevel}
                </span>
              </div>

              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                ผลการประเมินความถูกต้องของฉลากอาหาร: {report.productName}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                <span>
                  เลขสารบบอาหาร: <strong className="font-mono text-slate-900">{report.fdaNumber}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  สถานะในระบบ: {report.fdaRecord.licenseStatus} / ได้รับอนุญาตถูกต้อง
                </span>
                <span>•</span>
                <span className="text-slate-500">
                  ประเภท: {report.fdaRecord.foodCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons (Image 6.jpeg) */}
          <div className="flex flex-wrap lg:flex-col items-stretch gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#0f2444] hover:bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-blue-400" />
              <span>พิมพ์รายงานสรุปผลการตรวจ (PDF)</span>
            </button>

            <button
              onClick={handleForwardRnD}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-indigo-600" />
              <span>{shareSuccess ? '✓ บันทึกและส่งต่อแล้ว' : 'ส่งต่อ R&D / อาร์ตเวิร์ก'}</span>
            </button>

            <button
              onClick={onRescan}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ส่งตรวจใหม่</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Tabs & Status Legend Bar (Image 6.jpeg) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'all'
                ? 'bg-[#0f2444] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            แสดงทั้งหมด
          </button>
          <button
            onClick={() => setActiveSubTab('compare')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'compare'
                ? 'bg-[#0f2444] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            เปรียบเทียบข้อมูลจริง VS ฐานข้อมูล อย.
          </button>
          <button
            onClick={() => setActiveSubTab('findings')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'findings'
                ? 'bg-[#0f2444] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ข้อผิดพลาดและแนวทางแก้ไข ({report.findings.length} รายการ)
          </button>
          <button
            onClick={() => setActiveSubTab('gda')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'gda'
                ? 'bg-[#0f2444] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ฉลากโภชนาการ GDA & Thai RDI
          </button>
        </div>

        {/* Legend Indicators (Image 6.jpeg) */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            ถูกต้องสมบูรณ์
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            ข้อสังเกต/ไม่ตรงฐานข้อมูล
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            ผิดข้อกำหนดกฎหมาย
          </span>
        </div>
      </div>

      {/* 4. Comparative Audit Grid (ตารางตรวจสอบข้อมูลเปรียบเทียบภาคบังคับ) (Image 6.jpeg) */}
      {(activeSubTab === 'all' || activeSubTab === 'compare') && (
        <section id="comparative-audit-grid" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>ตารางตรวจสอบข้อมูลเปรียบเทียบภาคบังคับ (Comparative Audit Grid)</span>
            </h2>
            <span className="text-xs text-slate-500">
              มาตรฐาน พ.ร.บ. อาหาร พ.ศ. 2522
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Left Column: ฉลากจริง (Physical Detected Data) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              
              {/* Header Box */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                    📷
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      ข้อมูลที่ตรวจพบบนฉลากจริง
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      OCR Text & Visual Recognition Confidence: {report.scanConfidence}%
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  SCAN-ID: {report.scanId}
                </span>
              </div>

              {/* Product Visual Card */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
                <img
                  src={report.imageUrl || 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80'}
                  alt="Packaging preview"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-300/80 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    บรรจุภัณฑ์ที่อัปโหลดเข้าตรวจสอบ
                  </span>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {report.physicalData.foodName}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    ขนาดสุทธิ: {report.netWeight} • บาร์โค้ด: {report.barcode}
                  </div>
                </div>
              </div>

              {/* Section 1: ชื่ออาหาร */}
              <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    1. ชื่ออาหาร (FOOD NAME)
                  </span>
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    ตรวจพบข้อแตกต่าง
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {report.physicalData.foodName}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {report.physicalData.foodNameNote}
                </p>
              </div>

              {/* Section 2: ผู้ผลิตและสถานที่ผลิต */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    2. ผู้ผลิตและสถานที่ผลิต
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    สมบูรณ์ตรงข้อกำหนด
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  {report.physicalData.manufacturer}
                </p>
              </div>

              {/* Section 3: ส่วนประกอบสำคัญ */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">
                    3. ส่วนประกอบสำคัญ (INGREDIENTS)
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    เรียงลำดับถูกต้องตามร้อยละ
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed mb-2">
                  {report.physicalData.ingredients.map(i => `${i.name} ${i.percentage}%`).join(', ')}
                </p>
                {/* Visual percentage progress bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-200 flex overflow-hidden">
                  <div style={{ width: '62%' }} className="bg-blue-600" title="แป้งข้าวโพด 62%" />
                  <div style={{ width: '18%' }} className="bg-amber-500" title="น้ำมันปาล์ม 18%" />
                  <div style={{ width: '12%' }} className="bg-emerald-500" title="เครื่องปรุงรส 12%" />
                  <div style={{ width: '5%' }} className="bg-purple-500" title="น้ำตาล 5%" />
                  <div style={{ width: '3%' }} className="bg-slate-400" title="เกลือ 3%" />
                </div>
              </div>

              {/* Section 4: วันผลิตและวันหมดอายุ */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    4. วันผลิตและวันหมดอายุ (MFG / EXP)
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    ระบุตำแหน่งชัดเจน
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-900 font-semibold">
                  <span>MFG: {report.physicalData.mfgDate}</span>
                  <span>EXP: {report.physicalData.expDate}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {report.physicalData.datePlacementNote}
                </p>
              </div>

              {/* Section 5: ข้อมูลสารก่อภูมิแพ้ & ฉลาก GDA */}
              <div className="p-3 rounded-xl border border-red-200 bg-red-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    5. ข้อมูลสารก่อภูมิแพ้ & ฉลาก GDA
                  </span>
                  <span className="text-[11px] font-medium text-red-800 bg-red-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <AlertOctagon className="w-3 h-3" />
                    พบจุดต้องปรับปรุง
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {report.physicalData.allergenWarning}
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {report.physicalData.gdaRawText}
                </p>
              </div>
            </div>

            {/* Right Column: ฐานข้อมูล อย. (FDA Live API) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
              
              {/* Header Box */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    🏛️
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      ข้อมูลในฐานข้อมูล อย. (FDA Live API)
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        ● ACTIVE RECORD
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      อ้างอิงระบบบริการอิเล็กทรอนิกส์ porta.fda.moph.go.th
                    </p>
                  </div>
                </div>

                <a
                  href="https://porta.fda.moph.go.th/fda_search_center_new/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                >
                  <span>เปิดดูในสำเนา</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Official Registration Number Banner */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    เลขทะเบียนสารบบอาหารอย่างเป็นทางการ
                  </span>
                  <div className="text-sm font-extrabold font-mono text-blue-900">
                    {report.fdaRecord.fdaNumber}
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  ตรงกัน 100%
                </span>
              </div>

              {/* Section 1: ชื่อที่ได้รับอนุญาตในสารบบ */}
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    1. ชื่ออาหารที่ได้รับอนุญาตในสารบบ
                  </span>
                  <span className="text-[11px] font-medium text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    ชื่อจดทะเบียนไม่ตรง 100%
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900">
                  {report.fdaRecord.registeredFoodName}
                </p>
                <p className="text-[11px] text-slate-600 mt-1 flex items-start gap-1 bg-white p-2 rounded border border-blue-100">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    ข้อสังเกตเจ้าหน้าที่: ในระบบระบุ "{report.fdaRecord.registeredFoodName}" แต่ฉลากจริงมีคำว่า "ขนม..." เพิ่มนำหน้า
                  </span>
                </p>
              </div>

              {/* Section 2: ผู้รับอนุญาต / ที่ตั้งตามใบอนุญาต */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    2. ผู้รับอนุญาต / ที่ตั้งตามใบอนุญาต
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    ตรงกันทุกตัวอักษร
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900">
                  {report.fdaRecord.manufacturerName}
                </p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {report.fdaRecord.manufacturerAddress}
                </p>
              </div>

              {/* Section 3: ประเภทอาหารและเงื่อนไขควบคุม */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    3. ประเภทอาหารและเงื่อนไขควบคุม
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    หมวดอาหารตรงประเภท
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {report.fdaRecord.foodCategory}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {report.fdaRecord.notes}
                </p>
              </div>

              {/* Section 4: สถานะและอายุใบอนุญาตสถานที่ */}
              <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    4. สถานะและอายุใบอนุญาตสถานที่
                  </span>
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    ยังไม่หมดอายุ / สถานะ: {report.fdaRecord.licenseStatus} (Active)
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {report.fdaRecord.licenseNumber}
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  ต่ออายุรอบล่าสุดเมื่อ: 10 มกราคม 2567 (สิ้นสุดรอบ {report.fdaRecord.licenseExpiry})
                </p>
              </div>

              {/* Section 5: เกณฑ์ฉลากโภชนาการที่บังคับใช้ */}
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800">
                    5. เกณฑ์ฉลากโภชนาการที่บังคับใช้
                  </span>
                  <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                    GDA Mandatory
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  ต้องแสดง GDA ด้านหน้าบรรจุภัณฑ์: ค่าอ้างอิง Thai RDI (โซเดียม 2,000 มก. / พลังงาน 2,000 kcal) บังคับใช้ตามประกาศกระทรวงสาธารณสุข ฉบับที่ 394 (พ.ศ. 2561)
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Audit Findings & Corrective Actions Section (Image 6.jpeg) */}
      {(activeSubTab === 'all' || activeSubTab === 'findings') && (
        <section id="audit-findings-section" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-red-600" />
              <h2 className="text-base font-bold text-slate-900">
                รายการข้อผิดพลาดและคำแนะนำการแก้ไขตามกฎหมาย อย. (Audit Findings & Corrective Actions)
              </h2>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
              ตรวจพบ {report.findings.length} ข้อกำหนดต้องดำเนินการ
            </span>
          </div>

          <div className="space-y-4">
            {report.findings.map((f, idx) => {
              const isCrit = f.severity === 'critical';
              const isMed = f.severity === 'medium';

              return (
                <div
                  key={f.id}
                  className={`rounded-2xl border p-5 transition-all shadow-xs ${
                    isCrit
                      ? 'border-red-300 bg-red-50/25 ring-1 ring-red-200/50'
                      : isMed
                        ? 'border-amber-200 bg-amber-50/20'
                        : 'border-slate-200 bg-white'
                  }`}
                >
                  {/* Finding Title & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                          isCrit
                            ? 'bg-red-600 text-white'
                            : isMed
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-700 text-white'
                        }`}
                      >
                        {isCrit ? <AlertOctagon className="w-3.5 h-3.5" /> : isMed ? <AlertTriangle className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
                        {f.severityThai}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {f.category}
                      </span>
                    </div>

                    {f.penaltyNote && (
                      <span className="text-xs font-medium text-red-700 bg-red-100/80 px-2.5 py-0.5 rounded-full">
                        {f.penaltyNote}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {f.title}
                  </h3>

                  {/* Comparison pill if applicable */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-slate-200/80 mb-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        ข้อความที่ปรากฏบนฉลากจริง:
                      </span>
                      <span className="font-semibold text-red-700">
                        "{f.actualText}"
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        ชื่อ/เกณฑ์ที่ถูกต้องตามระเบียบ อย.:
                      </span>
                      <span className="font-semibold text-emerald-800">
                        "{f.fdaText}"
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {f.details}
                  </p>

                  {/* Corrective Actions Box */}
                  <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/70 text-xs">
                    <div className="font-bold text-blue-900 mb-1.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>แนวทางแก้ไขตามระเบียบ อย.:</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-700">
                      {f.correctiveActions.map((act, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold shrink-0">•</span>
                          <span className="leading-relaxed">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. GDA Nutrition Check Table Section (Image 6.jpeg) */}
      {(activeSubTab === 'all' || activeSubTab === 'gda') && (
        <section id="gda-nutrition-section" className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-blue-600" />
                <span>การตรวจสอบฉลากโภชนาการแบบ GDA & สัดส่วน Thai RDI</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                เกณฑ์คำนวณตามกฎหมายเลข 3 ท้ายประกาศกระทรวงสาธารณสุข (ฉบับที่ 394) พ.ศ. 2561
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium text-blue-800">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>พลังงานอ้างอิงพื้นฐาน: 2,000 กิโลแคลอรี / วัน</span>
            </div>
          </div>

          {/* 4 GDA Cylinder Cards (Image 6.jpeg) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {report.gdaPills.map((g, idx) => {
              const isWarning = !g.isCompliant;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-4 text-center border-2 transition-all ${
                    isWarning
                      ? 'border-red-300 bg-red-50/40 ring-1 ring-red-200'
                      : 'border-slate-200 bg-white shadow-xs'
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-600 block">
                    {g.nutrient}
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {g.amount}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {g.unit}
                  </span>

                  <div className="my-2 pt-2 border-t border-slate-100">
                    <span className="text-sm font-extrabold text-blue-600 block">
                      *{g.printedRdiPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (คำนวณจริง {g.calculatedRdiPercent.toFixed(1)}%)
                    </span>
                  </div>

                  <div className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isWarning ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {g.statusNote}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full GDA Comparative Table (Image 6.jpeg) */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">สารอาหาร</th>
                    <th className="py-3 px-4">ปริมาณต่อหนึ่งหน่วยบริโภค</th>
                    <th className="py-3 px-4">เกณฑ์ Thai RDI ต่อวัน</th>
                    <th className="py-3 px-4">คำนวณ % RDI จริง</th>
                    <th className="py-3 px-4">ค่าที่พิมพ์บนฉลาก</th>
                    <th className="py-3 px-4 text-right">สถานะความสอดคล้อง</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">พลังงานทั้งหมด</td>
                    <td className="py-3.5 px-4 text-slate-700 font-mono">280 kcal</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">2,000 kcal</td>
                    <td className="py-3.5 px-4 text-slate-900 font-mono font-bold">14.0%</td>
                    <td className="py-3.5 px-4 text-blue-700 font-mono font-bold">14%</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" />
                        ถูกต้อง
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">น้ำตาลทรายและน้ำตาลธรรมชาติ</td>
                    <td className="py-3.5 px-4 text-slate-700 font-mono">4 g</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">65 g</td>
                    <td className="py-3.5 px-4 text-slate-900 font-mono font-bold">6.15%</td>
                    <td className="py-3.5 px-4 text-blue-700 font-mono font-bold">6%</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" />
                        ถูกต้อง
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">ไขมันทั้งหมด</td>
                    <td className="py-3.5 px-4 text-slate-700 font-mono">14 g</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">65 g</td>
                    <td className="py-3.5 px-4 text-slate-900 font-mono font-bold">21.53%</td>
                    <td className="py-3.5 px-4 text-blue-700 font-mono font-bold">22%</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" />
                        ปัดเศษถูกต้อง
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50/30 bg-red-50/15">
                    <td className="py-3.5 px-4 font-semibold text-red-900">โซเดียม (Sodium)</td>
                    <td className="py-3.5 px-4 text-red-700 font-mono font-bold">180 mg</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono">2,000 mg</td>
                    <td className="py-3.5 px-4 text-slate-900 font-mono font-bold">9.00%</td>
                    <td className="py-3.5 px-4 text-red-700 font-mono font-bold">9%</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
                        <AlertTriangle className="w-3 h-3" />
                        ปรับปรุงความคมชัด
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 7. Footer Reference (Image 6.jpeg) */}
      <footer className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
            อย.
          </div>
          <div>
            <div className="font-bold text-slate-700">สำนักงานคณะกรรมการอาหารและยา (อย.)</div>
            <div className="text-[11px] text-slate-400">
              อ้างอิงมาตรฐานตามพระราชบัญญัติอาหาร พ.ศ. 2522 และประกาศกระทรวงสาธารณสุขฉบับปรับปรุง
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap text-blue-700 font-medium text-xs">
          <a
            href="https://porta.fda.moph.go.th/fda_search_center_new/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center gap-1"
          >
            <span>ระบบบริการกลาง อย. (porta.fda.moph.go.th)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://food.fda.moph.go.th"
            target="_blank"
            rel="noreferrer"
            className="hover:underline flex items-center gap-1"
          >
            <span>กองอาหาร อย. (food.fda.moph.go.th)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-400 font-mono text-[11px]">v2.4 Regulatory Compliance Suite</span>
        </div>
      </footer>
    </div>
  );
};
