import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  ShieldAlert, 
  Search, 
  BookOpen, 
  Flame, 
  Sparkles,
  Info
} from 'lucide-react';

export const RegulationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'label' | 'nutrition' | 'penalties'>('label');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-100">
            <Scale className="w-3.5 h-3.5" />
            <span>พระราชบัญญัติอาหาร พ.ศ. 2522 & ประกาศกระทรวงสาธารณสุข</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            ข้อกำหนดและเกณฑ์มาตรฐานฉลากอาหาร อย.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            รวบรวมกฎหมาย ประกาศกระทรวงสาธารณสุขฉบับล่าสุด และแนวทางปฏิบัติอย่างเป็นทางการของสำนักงานคณะกรรมการอาหารและยา (อย.)
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://food.fda.moph.go.th/food-law/food-label"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5 border border-blue-200 transition-all"
          >
            <span>food.fda.moph.go.th/food-label</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('label')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'label'
              ? 'bg-[#0f2444] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. ประกาศ สธ. ฉบับที่ 383 (การแสดงฉลากอาหารทั่วไป)
        </button>

        <button
          onClick={() => setActiveTab('nutrition')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'nutrition'
              ? 'bg-[#0f2444] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. ประกาศ สธ. ฉบับที่ 394 (ฉลากโภชนาการ & GDA หวาน มัน เค็ม)
        </button>

        <button
          onClick={() => setActiveTab('penalties')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'penalties'
              ? 'bg-[#0f2444] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          3. บทกำหนดโทษ & กฎหมายมาตรา 40-51
        </button>
      </div>

      {/* Tab 1: ประกาศ สธ. ฉบับที่ 383 */}
      {activeTab === 'label' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              องค์ประกอบภาคบังคับบนฉลากอาหารในภาชนะบรรจุ (Mandatory Elements)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              ตามประกาศกระทรวงสาธารณสุข (ฉบับที่ 383) พ.ศ. 2560 เรื่อง การแสดงฉลากของอาหารในภาชนะบรรจุ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  ข้อ 1: ชื่ออาหาร
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  ต้องตรงตามที่ได้รับอนุญาตในใบสำคัญการจดทะเบียน อย. หากมีชื่อทางการค้า (Brand) ต้องอยู่ร่วมกับชื่อสามัญทางอาหาร และตัวอักษรต้องมีขนาดกลมกลืน ไม่สื่อไปในทางหลอกลวง
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  ข้อ 2: เลขสารบบอาหาร 13 หลัก
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  ต้องแสดงในกรอบเครื่องหมาย อย. สัดส่วน 1:2 ตัวเลขฟอนต์อ่านง่าย บนพื้นสีตัดกันอย่างชัดเจน และต้องตรงกับประเภทผลิตภัณฑ์ที่ได้รับอนุญาต
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  ข้อ 3: ส่วนประกอบสำคัญ (Ingredients)
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  ต้องเรียงลำดับจากปริมาณมากที่สุดไปหาน้อยที่สุดตามร้อยละของน้ำหนัก (% wt) หากมีการใช้วัตถุเจือปนอาหาร ต้องระบุชื่อกลุ่มหน้าที่หรือเลข INS ชัดเจน
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  ข้อ 4: ข้อมูลสำหรับผู้แพ้อาหาร (Allergen)
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  ต้องระบุข้อความ "ข้อมูลสำหรับผู้แพ้อาหาร: มี..." หรือ "อาจมี..." ขนาดตัวอักษรความสูงต้องไม่ต่ำกว่า 1.5 มิลลิเมตร และต้องใช้สีตัดกับพื้นหลัง
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  ข้อ 5: วันผลิต และ วันหมดอายุ (MFG / EXP)
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  ต้องแสดง วัน/เดือน/ปี ที่หมดอายุ (หรือควรบริโภคก่อน) โดยพิมพ์ด้วยหมึกถาวรหรือปั๊มลายนูน ไม่สามารถลบเลือนหรือแก้ไขได้
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  ข้อ 6: ชื่อและที่ตั้งผู้ผลิต / ผู้นำเข้า
                </span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                  ต้องระบุชื่อผู้ผลิต หรือ ผู้แบ่งบรรจุ และที่ตั้งสถานที่ผลิตอย่างครบถ้วน (ตำบล/แขวง, อำเภอ/เขต, จังหวัด) และต้องตรงกับใบอนุญาตสถานที่ผลิตอาหาร
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: ฉลากโภชนาการ & GDA */}
      {activeTab === 'nutrition' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              เกณฑ์ฉลากโภชนาการแบบ GDA (หวาน มัน เค็ม)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              ตามประกาศกระทรวงสาธารณสุข (ฉบับที่ 394) พ.ศ. 2561 กำหนดให้อาหาร 5 กลุ่ม ต้องแสดงฉลาก GDA ด้านหน้าบรรจุภัณฑ์
            </p>

            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 mb-5">
              <h4 className="text-xs font-bold text-blue-900 mb-1">
                กลุ่มอาหารบังคับแสดงฉลาก GDA:
              </h4>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>ขนมอบกรอบ (มันฝรั่งทอด, ข้าวโพดอบกรอบ, ข้าวเกรียบ, แครกเกอร์, เวเฟอร์)</li>
                <li>ช็อกโกแลต และขนมหวานรสช็อกโกแลต</li>
                <li>ผลิตภัณฑ์ขนมอบ (เบเกอรี่, คุกกี้, เค้ก, พาย)</li>
                <li>อาหารกึ่งสำเร็จรูป (บะหมี่, ก๋วยเตี๋ยว, โจ๊ก, ข้าวต้ม)</li>
                <li>มื้ออาหารแช่เย็น / แช่แข็งพร้อมบริโภค</li>
              </ul>
            </div>

            {/* Thai RDI Constants */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">พลังงานอ้างอิง</span>
                <span className="text-lg font-extrabold text-slate-900">2,000</span>
                <span className="text-[10px] text-slate-400 block">kcal / วัน</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">น้ำตาลสูงสุด</span>
                <span className="text-lg font-extrabold text-slate-900">65</span>
                <span className="text-[10px] text-slate-400 block">กรัม / วัน</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">ไขมันสูงสุด</span>
                <span className="text-lg font-extrabold text-slate-900">65</span>
                <span className="text-[10px] text-slate-400 block">กรัม / วัน</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] text-slate-500 block">โซเดียมสูงสุด</span>
                <span className="text-lg font-extrabold text-slate-900">2,000</span>
                <span className="text-[10px] text-slate-400 block">มิลลิกรัม / วัน</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Penalties */}
      {activeTab === 'penalties' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              บทกำหนดโทษตามพระราชบัญญัติอาหาร พ.ศ. 2522
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              การฝ่าฝืนหรือไม่ปฏิบัติตามหลักเกณฑ์การแสดงฉลากอาหาร มีโทษตามกฎหมายดังต่อไปนี้
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900">
                    มาตรา 40 (ฉลากไม่ถูกต้อง / ขาดข้อความสำคัญ)
                  </span>
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    ปรับไม่เกิน 30,000 บาท
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  การผลิต นำเข้า หรือจำหน่ายอาหารที่มีการแสดงฉลากไม่ถูกต้อง ไม่ครบถ้วน หรือไม่เป็นไปตามประกาศกระทรวงสาธารณสุข
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-900">
                    มาตรา 41 (การโฆษณา / แสดงข้อความโอ้อวดหลอกลวง)
                  </span>
                  <span className="text-xs font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded">
                    จำคุกไม่เกิน 3 ปี หรือปรับไม่เกิน 30,000 บาท หรือทั้งจำทั้งปรับ
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  การแสดงข้อความบนฉลากเพื่อประโยชน์ทางการค้าโดยหลอกลวงหรือทำให้เกิดความหลงเชื่อโดยไม่สมควร หรืออวดอ้างสรรพคุณบำบัดรักษาโรค
                </p>
              </div>

              <div className="p-4 rounded-xl bg-red-50/50 border border-red-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-900">
                    มาตรา 51 (อาหารปลอม / สวมเลข อย.)
                  </span>
                  <span className="text-xs font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded">
                    จำคุกตั้งแต่ 6 เดือน ถึง 10 ปี และปรับตั้งแต่ 5,000 ถึง 100,000 บาท
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  การนำเลขสารบบอาหารของผู้อื่นมาสวมใส่ หรือปลอมแปลงฉลากเพื่อลวงให้เข้าใจว่าเป็นอาหารที่ได้รับอนุญาตถูกต้อง
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
