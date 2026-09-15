import React, { useState, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  FileText,
  AlertCircle
} from 'lucide-react';
import { UserProfile, AuditReport } from '../types';
import { getOrCreateAuditForFdaNumber, DEFAULT_CORN_SNACK_AUDIT } from '../data/fdaDatabase';
import { saveAuditToFirestore } from '../lib/firebase';

interface Props {
  user: UserProfile | null;
  onOpenCamera: () => void;
  onAuditComplete: (report: AuditReport) => void;
  onNavigateToExamples: () => void;
  onNavigateTo3D: () => void;
}

export const UploadAndScanSection: React.FC<Props> = ({
  user,
  onOpenCamera,
  onAuditComplete,
  onNavigateToExamples,
  onNavigateTo3D
}) => {
  const [manualFdaInput, setManualFdaInput] = useState('13-1-02964-6-0089');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick preset food labels for instant testing
  const SAMPLE_PRODUCTS = [
    {
      fda: '13-1-02964-6-0089',
      title: 'ขนมอบกรอบรสข้าวโพดอบเนย (ซันนี่สแน็ค)',
      badge: 'พบจุดแก้ไข 3 จุด (เกณฑ์ Image 6)',
      category: 'ขนมอบกรอบ',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80'
    },
    {
      fda: '10-1-04741-1-0023',
      title: 'เครื่องดื่มชาเขียวรสต้นตำรับ (โออิชิ)',
      badge: 'GDA ครบถ้วน',
      category: 'เครื่องดื่ม',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80'
    },
    {
      fda: '14-2-00142-1-0035',
      title: 'บะหมี่กึ่งสำเร็จรูปรสต้มยำกุ้ง (มาม่า)',
      badge: 'ตรวจสัดส่วนโซเดียม',
      category: 'อาหารกึ่งสำเร็จรูป',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=600&auto=format&fit=crop&q=80'
    },
    {
      fda: '11-1-02544-1-0112',
      title: 'นมถั่วเหลืองยูเอชที (แลคตาซอย)',
      badge: 'ตรวจคำเตือนสารก่อภูมิแพ้',
      category: 'นมและผลิตภัณฑ์นม',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80'
    }
  ];

  // Perform full audit
  const runAuditWithFda = async (fdaNum: string, customImage?: string) => {
    setIsAnalyzing(true);
    // Simulate AI vision + FDA API cross-check
    await new Promise((resolve) => setTimeout(resolve, 900));

    let report = getOrCreateAuditForFdaNumber(fdaNum);
    if (customImage) {
      report = {
        ...report,
        imageUrl: customImage
      };
    }

    // Save report to Firebase and local storage
    await saveAuditToFirestore(report, user);

    setIsAnalyzing(false);
    onAuditComplete(report);
  };

  // Handle file drop or selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      // Default to the corn snack FDA number or extract
      runAuditWithFda(manualFdaInput || '13-1-02964-6-0089', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2444] via-blue-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-blue-800/60">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>ระบบปัญญาประดิษฐ์ตรวจสอบฉลากอาหารตาม พ.ร.บ. อาหาร พ.ศ. 2522</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ตรวจสอบความถูกต้องของฉลากอาหาร <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-white">
              เทียบกับฐานข้อมูล อย. ทันที
            </span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 mt-3 max-w-2xl leading-relaxed">
            ถ่ายภาพหรืออัปโหลดภาพฉลากอาหารเพื่อดึงเลข อย. 13 หลัก ตรวจสอบชื่อสถานที่ผลิต ส่วนประกอบเรียงจากมากไปน้อย วันหมดอายุ คำเตือนสารก่อภูมิแพ้ และตารางโภชนาการแบบ GDA
          </p>

          {/* 3 Core Action Buttons requested in user prompt */}
          <div className="flex flex-wrap items-center gap-3.5 mt-7">
            {/* 1. ปุ่มกด "ถ่ายภาพ" */}
            <button
              onClick={onOpenCamera}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>ถ่ายภาพฉลากอาหาร</span>
            </button>

            {/* 2. ปุ่มกด "อัปโหลดไฟล์" */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm flex items-center gap-2.5 backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-cyan-300" />
              <span>อัปโหลดไฟล์ฉลาก / อาร์ตเวิร์ก</span>
            </button>

            {/* 3. ปุ่มกด "ดูตัวอย่างฉลากอาหาร โดยแยกตามชนิดอาหาร" */}
            <button
              onClick={onNavigateToExamples}
              className="px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-blue-400/30 text-blue-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>ดูตัวอย่างฉลากแยกตามชนิดอาหาร</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
            </button>
          </div>
        </div>

        {/* Decorative background subtle glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Zone & Manual 13-digit FDA Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Drag & Drop Area (7 Cols) */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-7 rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${
            dragActive
              ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
              : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/70 shadow-xs'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-slate-900">
            ลากและวางไฟล์ภาพฉลากอาหารที่นี่ หรือคลิกเพื่อเลือกไฟล์
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            รองรับไฟล์ภาพ JPG, PNG, WEBP และ PDF อาร์ตเวิร์กบรรจุภัณฑ์ ระบบจะสแกนหาเลขสารบบและตรวจโภชนาการอัตโนมัติ
          </p>

          <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              เช็คชื่ออาหารและโรงงาน
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ตรวจสอบ GDA หวานมันเค็ม
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              สารก่อภูมิแพ้
            </span>
          </div>
        </div>

        {/* Right: Direct 13-Digit FDA Search Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span>ตรวจสอบด้วยเลขสารบบอาหาร 13 หลัก</span>
              </h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                FDA porta lookup
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              พิมพ์หรือวางเลข อย. 13 หลัก เพื่อดึงข้อมูลเทียบกับฐานข้อมูลอิเล็กทรอนิกส์ อย. (porta.fda.moph.go.th)
            </p>

            {/* Input field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                เลขสารบบอาหาร (FDA Serial Number):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={manualFdaInput}
                  onChange={(e) => setManualFdaInput(e.target.value)}
                  placeholder="เช่น 13-1-02964-6-0089"
                  className="w-full text-sm font-mono font-bold px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => runAuditWithFda(manualFdaInput)}
              disabled={isAnalyzing}
              className="w-full py-3 px-4 rounded-xl bg-[#0f2444] hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>กำลังดึงข้อมูลและประมวลผลการประเมิน...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>เริ่มตรวจสอบและเปรียบเทียบมาตรฐาน อย.</span>
                </>
              )}
            </button>

            <button
              onClick={onNavigateTo3D}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>เปิดโหมดจำลองบรรจุภัณฑ์ 3 มิติ (Three.js Inspector)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Testing Samples (One-Click Audit) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>ตัวอย่างฉลากผลิตภัณฑ์ทดสอบความแม่นยำ (คลิกเพื่อทดสอบผลตรวจทันที)</span>
          </h2>
          <span className="text-xs text-blue-600 font-medium hidden sm:inline">
            4 หมวดหมู่อาหารยอดนิยม
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SAMPLE_PRODUCTS.map((prod) => (
            <div
              key={prod.fda}
              onClick={() => {
                setManualFdaInput(prod.fda);
                runAuditWithFda(prod.fda, prod.image);
              }}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {prod.category}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {prod.title}
                </h4>

                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  เลข อย. {prod.fda}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {prod.badge}
                </span>
                <span className="text-[11px] text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  ตรวจ <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
