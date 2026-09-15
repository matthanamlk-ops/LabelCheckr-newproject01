import { FDARecord, AuditReport } from '../types';

export const OFFICIAL_FDA_RECORDS: Record<string, FDARecord> = {
  '13-1-02964-6-0089': {
    fdaNumber: '13-1-02964-6-0089',
    registeredFoodName: 'ข้าวโพดอบกรอบรสเนย (ตรา ซันนี่สแน็ค)',
    manufacturerName: 'บริษัท ซันนี่ ฟู้ดส์ แมนูแฟคเจอริ่ง จำกัด',
    manufacturerAddress: 'เลขที่ 88/12 หมู่ 4 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
    foodCategory: 'อาหารในภาชนะบรรจุที่ปิดสนิท (กลุ่มอาหารขนมอบกรอบพร้อมบริโภค)',
    foodCategoryCode: 'สธ. 383 / 394',
    licenseStatus: 'คงอยู่',
    licenseExpiry: '31 ธันวาคม 2570',
    licenseNumber: 'ใบอนุญาตผลิตอาหาร (แบบ ส.2): 13-1-02964',
    mandatoryGDA: true,
    notes: 'จัดเป็นอาหารที่ต้องมีฉลากและแสดงฉลากโภชนาการแบบ GDA ภาคบังคับตามประกาศกระทรวงสาธารณสุข'
  },
  '10-1-04741-1-0023': {
    fdaNumber: '10-1-04741-1-0023',
    registeredFoodName: 'เครื่องดื่มชาเขียวรสต้นตำรับ (ตรา โออิชิ ชาเขียว)',
    manufacturerName: 'บริษัท โออิชิ เทรดดิ้ง จำกัด',
    manufacturerAddress: '60/1 ซอยนวนคร 13 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120',
    foodCategory: 'เครื่องดื่มในภาชนะบรรจุที่ปิดสนิท',
    foodCategoryCode: 'สธ. 356',
    licenseStatus: 'คงอยู่',
    licenseExpiry: '31 ธันวาคม 2569',
    licenseNumber: 'ใบอนุญาตผลิตอาหาร (แบบ ส.2): 10-1-04741',
    mandatoryGDA: true,
    notes: 'ต้องแสดงฉลาก GDA ด้านหน้าบรรจุภัณฑ์ และระบุปริมาณคาเฟอีนหากเกินเกณฑ์'
  },
  '14-2-00142-1-0035': {
    fdaNumber: '14-2-00142-1-0035',
    registeredFoodName: 'บะหมี่กึ่งสำเร็จรูปรสต้มยำกุ้ง (ตรา มาม่า)',
    manufacturerName: 'บริษัท ไทยเพรซิเดนท์ฟูดส์ จำกัด (มหาชน)',
    manufacturerAddress: 'เลขที่ 60 หมู่ 1 ถนนบางกระดี ตำบลบางกะดี อำเภอเมืองปทุมธานี จังหวัดปทุมธานี 12000',
    foodCategory: 'อาหารกึ่งสำเร็จรูป (บะหมี่กึ่งสำเร็จรูป)',
    foodCategoryCode: 'สธ. 394',
    licenseStatus: 'คงอยู่',
    licenseExpiry: '31 ธันวาคม 2570',
    licenseNumber: 'ใบอนุญาตผลิตอาหาร (แบบ ส.2): 14-2-00142',
    mandatoryGDA: true,
    notes: 'อาหารกึ่งสำเร็จรูปบังคับแสดง GDA โซเดียม หวาน มัน เค็ม อย่างเคร่งครัด'
  },
  '11-1-02544-1-0112': {
    fdaNumber: '11-1-02544-1-0112',
    registeredFoodName: 'นมถั่วเหลืองยูเอชที รสหวานคลาสสิค (ตรา แลคตาซอย)',
    manufacturerName: 'บริษัท แลคตาซอย จำกัด',
    manufacturerAddress: 'เลขที่ 99 หมู่ 3 ตำบลหนองโพรง อำเภอศรีมหาโพธิ จังหวัดปราจีนบุรี 25140',
    foodCategory: 'นมและผลิตภัณฑ์จากถั่วเหลืองในภาชนะบรรจุปิดสนิท',
    foodCategoryCode: 'สธ. 383',
    licenseStatus: 'คงอยู่',
    licenseExpiry: '31 ธันวาคม 2571',
    licenseNumber: 'ใบอนุญาตผลิตอาหาร (แบบ ส.2): 11-1-02544',
    mandatoryGDA: true,
    notes: 'ต้องระบุข้อมูลสารก่อภูมิแพ้อย่างชัดเจน (มีถั่วเหลืองและนมผง)'
  },
  '73-1-01140-1-0005': {
    fdaNumber: '73-1-01140-1-0005',
    registeredFoodName: 'น้ำส้มสายน้ำผึ้ง 100% (ตรา มาลี)',
    manufacturerName: 'บริษัท มาลีกรุ๊ป จำกัด (มหาชน)',
    manufacturerAddress: 'เลขที่ 401 หมู่ 8 ถนนเพชรเกษม ตำบลท่าตำหนัก อำเภอนครชัยศรี จังหวัดนครปฐม 73120',
    foodCategory: 'น้ำผลไม้และน้ำผัก',
    foodCategoryCode: 'สธ. 356',
    licenseStatus: 'คงอยู่',
    licenseExpiry: '31 ธันวาคม 2569',
    licenseNumber: 'ใบอนุญาตผลิตอาหาร (แบบ ส.2): 73-1-01140',
    mandatoryGDA: true,
    notes: 'แสดงข้อความน้ำผลไม้แท้ 100% ไม่เติมน้ำตาล และแสดง GDA'
  }
};

// Default comparative report (Exact match to Image 6.jpeg)
export const DEFAULT_CORN_SNACK_AUDIT: AuditReport = {
  id: 'CHK-2568-0419B',
  timestamp: '19 เม.ย. 2568 14:32 น.',
  fdaConnectedDate: '19 เม.ย. 2568 14:32 น.',
  complianceScore: 78,
  complianceLevel: 'ความสอดคล้องระดับ 2 (ผ่านเงื่อนไข)',
  statusWarning: 'ต้องแก้ไข 3 รายการก่อนจัดจำหน่าย',
  scanConfidence: 99.4,
  scanId: '#8942-RAW',
  
  productName: 'ขนมอบกรอบรสข้าวโพดอบเนย',
  brandName: 'ตรา ซันนี่สแน็ค',
  fdaNumber: '13-1-02964-6-0089',
  netWeight: '55 กรัม',
  barcode: '8851234567898',
  imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
  
  physicalData: {
    foodName: 'ขนมอบกรอบรสข้าวโพดอบเนย ตรา ซันนี่สแน็ค',
    foodNameNote: 'ตรวจพบการใช้คำว่า "ขนมอบกรอบรสข้าวโพดอบเนย" บนด้านหน้าของบรรจุภัณฑ์',
    manufacturer: 'บริษัท ซันนี่ ฟู้ดส์ แมนูแฟคเจอริ่ง จำกัด เลขที่ 88/12 หมู่ 4 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 12120',
    manufacturerNote: 'สมบูรณ์ตรงข้อกำหนด',
    ingredients: [
      { name: 'แป้งข้าวโพด', percentage: 62 },
      { name: 'น้ำมันปาล์มโอเลอีน', percentage: 18 },
      { name: 'เครื่องปรุงรสเนย', percentage: 12 },
      { name: 'น้ำตาล', percentage: 5 },
      { name: 'เกลือบริโภคเสริมไอโอดีน', percentage: 3 }
    ],
    ingredientsNote: 'เรียงลำดับถูกต้องตามร้อยละจากมากไปน้อย',
    isIngredientsSortedDesc: true,
    mfgDate: '12/03/2025',
    expDate: '12/03/2026',
    datePlacementNote: 'ตรวจพบข้อความระบุ: "ดูวันหมดอายุที่ใต้บรรจุภัณฑ์" บนแผงข้อความหลัก',
    allergenWarning: 'ข้อมูลสำหรับผู้แพ้อาหาร: มีนมและถั่วเหลือง',
    allergenFontSizeMm: 1.2,
    allergenWarningNote: 'ตรวจวัดความสูงตัวอักษรจริงได้เพียง 1.2 มม. (เกณฑ์แนะนำ 1.5 มม.)',
    gdaRawText: 'พลังงาน 280 kcal / น้ำตาล 4 กรัม / ไขมัน 14 กรัม / โซเดียม 180 มิลลิกรัม'
  },
  
  fdaRecord: OFFICIAL_FDA_RECORDS['13-1-02964-6-0089'],
  
  gdaPills: [
    {
      nutrient: 'พลังงาน',
      amount: 280,
      unit: 'กิโลแคลอรี',
      rdiDailyLimit: 2000,
      calculatedRdiPercent: 14.0,
      printedRdiPercent: 14,
      isCompliant: true,
      statusNote: 'ผ่านเกณฑ์ อย.'
    },
    {
      nutrient: 'น้ำตาล',
      amount: 4,
      unit: 'กรัม',
      rdiDailyLimit: 65,
      calculatedRdiPercent: 6.15,
      printedRdiPercent: 6,
      isCompliant: true,
      statusNote: 'ผ่านเกณฑ์ อย.'
    },
    {
      nutrient: 'ไขมัน',
      amount: 14,
      unit: 'กรัม',
      rdiDailyLimit: 65,
      calculatedRdiPercent: 21.53,
      printedRdiPercent: 22,
      isCompliant: true,
      statusNote: 'ผ่านเกณฑ์ อย. (ปัดเศษถูกต้อง)'
    },
    {
      nutrient: 'โซเดียม',
      amount: 180,
      unit: 'มิลลิกรัม',
      rdiDailyLimit: 2000,
      calculatedRdiPercent: 9.0,
      printedRdiPercent: 9,
      isCompliant: false,
      statusNote: 'ต้องตรวจทานการปัดเศษและความคมชัดของตัวเลข'
    }
  ],
  
  findings: [
    {
      id: 'FINDING-001',
      severity: 'medium',
      severityThai: 'ข้อผิดพลาด - ปานกลาง (Medium Risk)',
      category: 'กฎหมายข้อ 4 (ชื่ออาหาร)',
      penaltyNote: 'ระวางโทษ: ปรับไม่เกิน 30,000 บาท',
      title: '1. ชื่ออาหารบนฉลากไม่ตรงกับใบสำคัญการจดทะเบียน อย. 100%',
      actualText: 'ขนมอบกรอบรสข้าวโพดอบเนย',
      fdaText: 'ข้าวโพดอบกรอบรสเนย (ตรา ซันนี่สแน็ค)',
      details: 'ในระบบระบุ "ข้าวโพดอบกรอบรสเนย" แต่ฉลากจริงมีคำว่า "ขนม..." เพิ่มนำหน้า ซึ่งอาจทำให้ผู้บริโภคหรือเจ้าหน้าที่เข้าใจว่าเป็นคนละสูตรการผลิตตามสารบบ',
      correctiveActions: [
        'แนวทาง ก (แนะนำ): ปรับข้อความภาษาไทยบนบล็อกพิมพ์อาร์ตเวิร์กให้ตรงเป็น "ข้าวโพดอบกรอบรสเนย (ตรา ซันนี่สแน็ค)" ก่อนสั่งพิมพ์ล็อตจำหน่าย',
        'แนวทาง ข: ยื่นคำขอแก้ไขเปลี่ยนแปลงรายการในสารบบอาหารผ่านระบบอิเล็กทรอนิกส์ (E-submission) กองอาหาร อย. โดยแนบหลักเกณฑ์การตั้งชื่ออาหารเพิ่มเติม'
      ]
    },
    {
      id: 'FINDING-002',
      severity: 'critical',
      severityThai: 'ข้อผิดพลาด - ต้องแก้ไขก่อนพิมพ์ (Critical Violation)',
      category: 'ประกาศกระทรวงสาธารณสุข ฉบับที่ 394',
      penaltyNote: 'ไม่ผ่านเกณฑ์ตรวจปล่อยสินค้า',
      title: '2. การแสดงฉลากโภชนาการแบบ GDA ค่าโซเดียมไม่ตรงตามหลักการคำนวณและปัดเศษ',
      actualText: 'โซเดียม 180 มก. *9%',
      fdaText: 'โซเดียม 180 มก. คำนวณต่อ 2,000 มก. Thai RDI',
      details: 'กล่อง GDA ในอาร์ตเวิร์กระบุ "โซเดียม 180 มก. *9%" โดยเมื่อเทียบกับข้อกำหนด อย. ค่า Thai RDI กำหนดโซเดียมสูงสุดที่ 2,000 มิลลิกรัม/วัน ซึ่งการคำนวณสัดส่วน 180 / 2000 = 9.0% แต่การแสดงตัวเลขร้อยละต้องสอดคล้องกับตารางการปัดเศษและขนาดหนึ่งหน่วยบริโภคที่ถูกต้อง และตำแหน่งความคมชัดของอัตราส่วน 1:4',
      correctiveActions: [
        'ดาวน์โหลดเทมเพลตมาตรฐานรูปทรงกระบอก GDA (Guideline Daily Amounts) จากฐานข้อมูล อย. (food.fda.moph.go.th/food-law/nutrition-label)',
        'ปรับปรุงฟอนต์ของตัวเลขอัตราส่วนให้มีความหนาชัดเจนตามสัดส่วนพื้นที่ 1:4 ของกรอบด้านหน้าบรรจุภัณฑ์'
      ]
    },
    {
      id: 'FINDING-003',
      severity: 'recommendation',
      severityThai: 'ข้อควรปรับปรุง - แนะนำ (Recommendation)',
      category: 'เกณฑ์ทัศนวิสัย (Visual Clarity)',
      penaltyNote: 'ข้อเสนอแนะเชิงป้องกัน',
      title: '3. ขนาดตัวอักษรข้อความเตือนและข้อมูลสารก่อภูมิแพ้ต่ำกว่าเกณฑ์ความชัดเจน',
      actualText: 'ความสูงตัวอักษรจริง 1.2 มิลลิเมตร',
      fdaText: 'เกณฑ์ความสูงตัวอักษรไม่น้อยกว่า 1.5 มิลลิเมตร',
      details: 'ข้อความ "ข้อมูลสำหรับผู้แพ้อาหาร: มีนมและถั่วเหลือง" บนซองตรวจวัดความสูงตัวอักษรจริงได้เพียง 1.2 มิลลิเมตร ซึ่งซองบรรจุภัณฑ์ขนาดความจุ 55 กรัม (พื้นที่ฉลากมากกว่า 150 ตร.ซม.) ประกาศกระทรวงสาธารณสุขแนะนำให้มีความสูงตัวอักษรไม่น้อยกว่า 1.5 มิลลิเมตร เพื่อให้ผู้บริโภคอ่านได้ชัดเจน',
      correctiveActions: [
        'เพิ่มขนาดตัวอักษรส่วนสารก่อภูมิแพ้ให้มีความสูงจริงไม่น้อยกว่า 1.5 มม.',
        'ใช้ตัวอักษรหนา (Bold Text) พร้อมเน้นสีกรอบข้อความให้ตัดกับพื้นผิวซองเพื่อป้องกันการถูกปฏิเสธในการสุ่มตรวจตลาด (Market Surveillance)'
      ]
    }
  ]
};

// Helper to look up or generate audit
export function getOrCreateAuditForFdaNumber(fdaNum: string): AuditReport {
  const cleanNum = fdaNum.trim();
  const fdaRecord = OFFICIAL_FDA_RECORDS[cleanNum] || {
    fdaNumber: cleanNum,
    registeredFoodName: 'ผลิตภัณฑ์อาหารแปรรูปพร้อมบริโภค',
    manufacturerName: 'บริษัท สยามฟู้ดแมนูแฟคเจอร์ จำกัด',
    manufacturerAddress: 'เลขที่ 123/45 หมู่ 2 ถ.มิตรภาพ ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000',
    foodCategory: 'อาหารในภาชนะบรรจุที่ปิดสนิท',
    foodCategoryCode: 'สธ. 383',
    licenseStatus: 'คงอยู่',
    licenseExpiry: '31 ธันวาคม 2570',
    licenseNumber: 'ใบอนุญาตผลิตอาหาร (แบบ ส.2): ' + cleanNum.slice(0, 11),
    mandatoryGDA: true,
    notes: 'ได้รับอนุญาตถูกต้องตามสารบบอาหาร อย.'
  };

  if (cleanNum === '13-1-02964-6-0089') {
    return DEFAULT_CORN_SNACK_AUDIT;
  }

  // Generate dynamic matching report for any other FDA number
  return {
    ...DEFAULT_CORN_SNACK_AUDIT,
    id: `CHK-${new Date().getFullYear() + 543}-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toLocaleString('th-TH'),
    fdaConnectedDate: new Date().toLocaleString('th-TH'),
    fdaNumber: cleanNum,
    productName: fdaRecord.registeredFoodName,
    fdaRecord: fdaRecord,
    complianceScore: 88,
    complianceLevel: 'ความสอดคล้องระดับ 1 (ผ่านเกณฑ์มาตรฐาน)',
    statusWarning: 'ผ่านเกณฑ์ตรวจสอบฉลากอาหาร อย.',
    findings: [
      {
        id: 'FINDING-AUTO-01',
        severity: 'recommendation',
        severityThai: 'ข้อควรปรับปรุง - แนะนำ (Recommendation)',
        category: 'การแสดงข้อความบนฉลาก',
        title: 'ตรวจสอบการจัดวางโลโก้ อย. และขนาดฟอนต์ 13 หลัก',
        actualText: 'ขนาดกรอบ อย. พอดีกับพื้นที่',
        fdaText: 'อัตราส่วนกรอบเครื่องหมาย อย. กว้าง:ยาว 1:2',
        details: 'ตัวเลขสารบบ 13 หลักตรงกับฐานข้อมูล อย. เลขที่จดแจ้งมีสถานะ "คงอยู่" แนะนำคงความคมชัดในบล็อกพิมพ์ทุกแบทช์',
        correctiveActions: [
          'ควบคุมคุณภาพการพิมพ์วันที่ผลิต/หมดอายุ ไม่ให้เลอะเลือนจากแรงเสียดทานการขนส่ง'
        ]
      }
    ]
  };
}
