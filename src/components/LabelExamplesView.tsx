import React, { useState } from 'react';
import { LABEL_EXAMPLES, FOOD_CATEGORIES_INFO } from '../data/labelExamples';
import { 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Tag
} from 'lucide-react';
import { AuditReport } from '../types';
import { getOrCreateAuditForFdaNumber } from '../data/fdaDatabase';

interface Props {
  onSelectSampleForAudit: (report: AuditReport) => void;
}

export const LabelExamplesView: React.FC<Props> = ({ onSelectSampleForAudit }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'ขนมอบกรอบและสแน็ค (GDA)', name: 'ขนมอบกรอบ (GDA)' },
    { id: 'เครื่องดื่มพร้อมบริโภค (GDA)', name: 'เครื่องดื่ม (GDA)' },
    { id: 'อาหารกึ่งสำเร็จรูป (GDA)', name: 'อาหารกึ่งสำเร็จรูป' },
    { id: 'นมและผลิตภัณฑ์จากนม', name: 'นมและผลิตภัณฑ์นม' },
    { id: 'อาหารเสริมและวิตามิน', name: 'อาหารเสริม & วิตามิน' }
  ];

  const filteredExamples = LABEL_EXAMPLES.filter((ex) => {
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.fdaNumber.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-100">
            <BookOpen className="w-3.5 h-3.5" />
            <span>คลังตัวอย่างฉลากอาหารตามประกาศกระทรวงสาธารณสุข</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            ตัวอย่างฉลากอาหารที่ถูกต้อง แยกตามชนิดอาหาร
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            อ้างอิงคู่มือการแสดงฉลากอาหารและฉลากโภชนาการ สำนักงานคณะกรรมการอาหารและยา (อย.) 
            ศึกษาตำแหน่งองค์ประกอบภาคบังคับ การวางสัดส่วน และข้อความคำเตือนตามกฎหมาย
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://food.fda.moph.go.th/food-law/food-label"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>เกณฑ์ฉลาก อย.</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
          <a
            href="https://food.fda.moph.go.th/food-law/nutrition-label"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 border border-blue-200 transition-all"
          >
            <span>เกณฑ์โภชนาการ GDA</span>
            <ExternalLink className="w-3 h-3 text-blue-600" />
          </a>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0f2444] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่ออาหารหรือเลข อย...."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExamples.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1.5">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                    เลข อย. {item.fdaNumber}
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  {item.regulatoryComplianceStatus}
                </span>
              </div>

              {/* Visual Packaging Preview */}
              <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200">
                <img
                  src={item.packagingImageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-medium text-white">
                    {item.productType}
                  </span>
                </div>
              </div>

              {/* Mandatory Checklist */}
              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  องค์ประกอบฉลากที่ถูกต้องตามกฎหมาย:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {item.mandatoryElements.map((elem, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800 text-[11px]">
                          {elem.label}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight">
                          {elem.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GDA and Warning Highlights */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 text-xs mb-4">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>คำเตือน / ข้อความเฉพาะตามระเบียบ อย.:</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {item.specialWarning}
                </p>
                {item.gdaRequired && (
                  <div className="mt-2 text-[11px] font-medium text-blue-700 bg-blue-50 p-1.5 rounded border border-blue-100">
                    ⚡ {item.gdaFormat}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 truncate">
                📜 {item.lawReference}
              </span>

              <button
                onClick={() => {
                  const report = getOrCreateAuditForFdaNumber(item.fdaNumber);
                  onSelectSampleForAudit({
                    ...report,
                    imageUrl: item.packagingImageUrl
                  });
                }}
                className="px-4 py-2 rounded-xl bg-[#0f2444] hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-xs"
              >
                <span>ทดสอบตรวจฉลากนี้</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FDA Classification Reference Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-2">
          4 กลุ่มประเภทอาหารตามพระราชบัญญัติอาหาร พ.ศ. 2522
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          การควบคุมฉลากอาหารของ อย. แบ่งตามระดับความเสี่ยงและลักษณะการบริโภค
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FOOD_CATEGORIES_INFO.map((cat, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
              <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                กลุ่มที่ {i + 1}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">
                {cat.categoryName}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-3 text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                <strong>ตัวอย่าง:</strong> {cat.examples.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
