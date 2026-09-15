import React from 'react';
import { BrandLogo } from './BrandLogo';
import { UserProfile, UserRole } from '../types';
import { Stethoscope, Factory, Users, ExternalLink, RefreshCw, BarChart3, Box } from 'lucide-react';

export type NavTab = 'main' | 'result' | 'examples' | 'regulations' | 'stats' | '3d';

interface Props {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  user: UserProfile | null;
  onOpenRoleModal: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  onTabChange,
  user,
  onOpenRoleModal
}) => {
  const getRoleIcon = (role?: UserRole) => {
    switch (role) {
      case 'health_personnel':
        return <Stethoscope className="w-3.5 h-3.5 text-blue-400" />;
      case 'business_operator':
        return <Factory className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <Users className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Subtitle */}
          <div className="cursor-pointer" onClick={() => onTabChange('main')}>
            <BrandLogo size="md" />
          </div>

          {/* Center Navigation Links (Matching Image 6.jpeg) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onTabChange('main')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'main'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              หน้าหลักและตรวจสอบ
            </button>

            <button
              onClick={() => onTabChange('result')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'result'
                  ? 'bg-[#0f2444] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              ผลการตรวจสอบเปรียบเทียบ
            </button>

            <button
              onClick={() => onTabChange('examples')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'examples'
                  ? 'bg-[#0f2444] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              คลังตัวอย่างฉลากตามกฎหมาย
            </button>

            <button
              onClick={() => onTabChange('regulations')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'regulations'
                  ? 'bg-[#0f2444] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              ข้อกำหนดและเกณฑ์ อย.
            </button>

            <button
              onClick={() => onTabChange('stats')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'stats'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>สถิติผู้ใช้งาน</span>
            </button>

            <button
              onClick={() => onTabChange('3d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === '3d'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>โมเดล 3D</span>
            </button>
          </nav>

          {/* Right Status Badges & User Group */}
          <div className="flex items-center gap-3">
            {/* Green FDA connection pill */}
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>เชื่อมต่อฐานข้อมูล อย. (FDA Live API)</span>
            </div>

            {/* Current Role Badge & Switcher */}
            {user && (
              <button
                onClick={onOpenRoleModal}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-800 transition-all cursor-pointer"
                title="คลิกเพื่อสลับกลุ่มผู้ใช้งาน"
              >
                <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center shadow-xs">
                  {getRoleIcon(user.role)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] text-slate-500 font-normal leading-tight">
                    กลุ่มผู้ใช้งาน
                  </div>
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {user.role === 'health_personnel' 
                      ? 'บุคลากรสาธารณสุข' 
                      : user.role === 'business_operator' 
                        ? 'ผู้ประกอบการ' 
                        : 'ประชาชนทั่วไป'}
                  </div>
                </div>
                <RefreshCw className="w-3 h-3 text-slate-400 ml-1" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="md:hidden flex items-center gap-1 pb-2.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onTabChange('main')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 ${
              activeTab === 'main' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            หน้าหลัก
          </button>
          <button
            onClick={() => onTabChange('result')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 ${
              activeTab === 'result' ? 'bg-[#0f2444] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            ผลตรวจเปรียบเทียบ
          </button>
          <button
            onClick={() => onTabChange('examples')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 ${
              activeTab === 'examples' ? 'bg-[#0f2444] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            ตัวอย่างฉลาก
          </button>
          <button
            onClick={() => onTabChange('regulations')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 ${
              activeTab === 'regulations' ? 'bg-[#0f2444] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            เกณฑ์ อย.
          </button>
          <button
            onClick={() => onTabChange('stats')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 ${
              activeTab === 'stats' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            สถิติ
          </button>
          <button
            onClick={() => onTabChange('3d')}
            className={`px-3 py-1 text-xs font-medium rounded-lg shrink-0 ${
              activeTab === '3d' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            3D
          </button>
        </div>
      </div>
    </header>
  );
};
