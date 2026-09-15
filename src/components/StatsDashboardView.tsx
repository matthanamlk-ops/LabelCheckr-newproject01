import React, { useEffect, useState } from 'react';
import { GlobalStats, UserProfile, UserRole } from '../types';
import { fetchGlobalStats, db } from '../lib/firebase';
import { 
  BarChart3, 
  Users, 
  Stethoscope, 
  Factory, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  ExternalLink,
  PieChart,
  Activity
} from 'lucide-react';

interface Props {
  currentUser: UserProfile | null;
}

export const StatsDashboardView: React.FC<Props> = ({ currentUser }) => {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchGlobalStats();
      setStats(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-500 font-medium">กำลังโหลดแดชบอร์ดสถิติผู้ใช้งาน...</p>
      </div>
    );
  }

  const totalUsers = stats.totalUsers || 1;
  const healthPct = Math.round((stats.rolesCount.health_personnel / totalUsers) * 100);
  const businessPct = Math.round((stats.rolesCount.business_operator / totalUsers) * 100);
  const publicPct = Math.round((stats.rolesCount.general_public / totalUsers) * 100);

  return (
    <div id="stats-dashboard-view" className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-100">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>แดชบอร์ดสรุปสถิติผู้ใช้งานและผลการตรวจฉลากอาหาร</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            สถิติผู้ใช้งานระบบ LabelCheckr แยกตามกลุ่มเป้าหมาย
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            ติดตามการเข้าใช้งานของบุคลากรสาธารณสุข ผู้ประกอบการ และประชาชนทั่วไป 
            ข้อมูลซิงค์กับฐานข้อมูล Firebase Firestore แบบเรียลไทม์
          </p>
        </div>

        {/* Current user role card */}
        {currentUser && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs shrink-0 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              {currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">กลุ่มของคุณขณะนี้:</div>
              <div className="font-bold text-slate-900">{currentUser.roleThai}</div>
              <div className="text-[10px] text-blue-600 font-mono truncate max-w-[130px]">{currentUser.email}</div>
            </div>
          </div>
        )}
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">ผู้ใช้งานทั้งหมด</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {stats.totalUsers.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% จากสัปดาห์ก่อน</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">จำนวนครั้งที่ตรวจฉลาก</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {stats.totalAudits.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ตรวจผ่านกล้อง & เลข อย.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">อัตราความสอดคล้องเฉลี่ย</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">
            {stats.averageScore}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            เกณฑ์เฉลี่ยฉลากที่เข้าตรวจ
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">จุดผิดพลาดที่พบสะสม</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-2">
            {stats.commonViolations.reduce((acc, curr) => acc + curr.count, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ให้คำแนะนำการแก้ไขแล้ว
          </div>
        </div>
      </div>

      {/* 3 User Group Cards with Proportional Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Group 1: บุคลากรสาธารณสุข */}
        <div className="bg-white rounded-2xl border-2 border-blue-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    บุคลากรสาธารณสุข
                  </h3>
                  <span className="text-[11px] text-blue-700 font-semibold">
                    อย. / สสจ. / รพ.
                  </span>
                </div>
              </div>
              <span className="text-lg font-black text-blue-700">
                {healthPct}%
              </span>
            </div>

            <div className="text-2xl font-black text-slate-900 mb-2">
              {stats.rolesCount.health_personnel.toLocaleString()} <span className="text-xs font-normal text-slate-500">คน</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
              <div style={{ width: `${healthPct}%` }} className="h-full bg-blue-600 rounded-full" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              เน้นการตรวจเชิงเฝ้าระวังผลิตภัณฑ์ในท้องตลาด การตรวจสอบความถูกต้องของเลข อย. 13 หลัก และข้อความอวดอ้างสรรพคุณเกินจริง
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>บทบาทหลัก:</span>
            <span className="font-semibold text-slate-800">เฝ้าระวัง & บังคับใช้กฎหมาย</span>
          </div>
        </div>

        {/* Group 2: ผู้ประกอบการ */}
        <div className="bg-white rounded-2xl border-2 border-indigo-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ผู้ประกอบการอาหาร
                  </h3>
                  <span className="text-[11px] text-indigo-700 font-semibold">
                    โรงงานผลิต / SME / QA
                  </span>
                </div>
              </div>
              <span className="text-lg font-black text-indigo-700">
                {businessPct}%
              </span>
            </div>

            <div className="text-2xl font-black text-slate-900 mb-2">
              {stats.rolesCount.business_operator.toLocaleString()} <span className="text-xs font-normal text-slate-500">คน</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
              <div style={{ width: `${businessPct}%` }} className="h-full bg-indigo-600 rounded-full" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              เน้นการตรวจสอบความถูกต้องก่อนลงทุนสั่งพิมพ์บรรจุภัณฑ์จริง (Pre-Print QA), การคำนวณ GDA หวานมันเค็ม และการเรียงลำดับส่วนประกอบ
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>บทบาทหลัก:</span>
            <span className="font-semibold text-slate-800">Pre-Print Quality Control</span>
          </div>
        </div>

        {/* Group 3: ประชาชนทั่วไป */}
        <div className="bg-white rounded-2xl border-2 border-emerald-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ประชาชนทั่วไป
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ผู้บริโภค / ผู้รักสุขภาพ
                  </span>
                </div>
              </div>
              <span className="text-lg font-black text-emerald-700">
                {publicPct}%
              </span>
            </div>

            <div className="text-2xl font-black text-slate-900 mb-2">
              {stats.rolesCount.general_public.toLocaleString()} <span className="text-xs font-normal text-slate-500">คน</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
              <div style={{ width: `${publicPct}%` }} className="h-full bg-emerald-600 rounded-full" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              เน้นการถ่ายภาพเพื่อตรวจสอบว่าเลข อย. จริงหรือสวมสิทธิ์, ตรวจสอบสารก่อภูมิแพ้ และอ่านปริมาณน้ำตาล โซเดียมก่อนตัดสินใจซื้อ
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>บทบาทหลัก:</span>
            <span className="font-semibold text-slate-800">คุ้มครองตนเองก่อนบริโภค</span>
          </div>
        </div>
      </div>

      {/* Top 5 Common Legal Violations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>5 ข้อบกพร่องที่พบบ่อยที่สุดจากการตรวจฉลากในระบบ</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          รวบรวมจากผลการตรวจประเมินของทุกกลุ่มผู้ใช้งาน เพื่อเป็นแนวทางปรับปรุงฉลาก
        </p>

        <div className="space-y-3">
          {stats.commonViolations.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    พบแล้ว {item.count} ครั้ง ในการตรวจ
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-200 overflow-hidden hidden sm:block">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
                <span className="text-xs font-bold text-slate-900 w-12 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
