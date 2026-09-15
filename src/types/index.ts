export type UserRole = 'health_personnel' | 'business_operator' | 'general_public';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  roleThai: string;
  organization?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface FDARecord {
  fdaNumber: string; // เลขสารบบอาหาร 13 หลัก เช่น 13-1-02964-6-0089
  registeredFoodName: string; // ชื่ออาหารที่ได้รับอนุญาตในสารบบ
  manufacturerName: string; // ผู้รับอนุญาต
  manufacturerAddress: string; // ที่ตั้งตามใบอนุญาต
  foodCategory: string; // ประเภทอาหารและเงื่อนไขควบคุม
  foodCategoryCode: string;
  licenseStatus: 'คงอยู่' | 'ยกเลิก' | 'พักใช้';
  licenseExpiry: string;
  licenseNumber: string;
  mandatoryGDA: boolean;
  notes?: string;
}

export interface IngredientItem {
  name: string;
  percentage: number;
}

export interface GDAPill {
  nutrient: 'พลังงาน' | 'น้ำตาล' | 'ไขมัน' | 'โซเดียม';
  amount: number;
  unit: string;
  rdiDailyLimit: number;
  calculatedRdiPercent: number;
  printedRdiPercent: number;
  isCompliant: boolean;
  statusNote: string;
}

export interface AuditFinding {
  id: string;
  severity: 'critical' | 'medium' | 'recommendation';
  severityThai: string;
  category: string;
  penaltyNote?: string;
  title: string;
  actualText: string;
  fdaText: string;
  details: string;
  correctiveActions: string[];
}

export interface AuditReport {
  id: string;
  timestamp: string;
  fdaConnectedDate: string;
  complianceScore: number; // e.g. 78
  complianceLevel: string; // e.g. "ความสอดคล้องระดับ 2 (ผ่านเงื่อนไข)"
  statusWarning: string; // e.g. "ต้องแก้ไข 3 รายการก่อนจัดจำหน่าย"
  scanConfidence: number; // e.g. 99.4
  scanId: string; // e.g. "#8942-RAW"
  
  // Product details
  productName: string;
  brandName: string;
  fdaNumber: string;
  netWeight: string;
  barcode: string;
  imageUrl?: string;
  
  // Physical Label Data (Detected)
  physicalData: {
    foodName: string;
    foodNameNote: string;
    manufacturer: string;
    manufacturerNote: string;
    ingredients: IngredientItem[];
    ingredientsNote: string;
    isIngredientsSortedDesc: boolean;
    mfgDate: string;
    expDate: string;
    datePlacementNote: string;
    allergenWarning: string;
    allergenFontSizeMm: number;
    allergenWarningNote: string;
    gdaRawText: string;
  };
  
  // Official FDA Record
  fdaRecord: FDARecord;
  
  // GDA Analysis
  gdaPills: GDAPill[];
  
  // Findings & Action Recommendations
  findings: AuditFinding[];
}

export interface GlobalStats {
  totalUsers: number;
  totalAudits: number;
  averageScore: number;
  rolesCount: {
    health_personnel: number;
    business_operator: number;
    general_public: number;
  };
  commonViolations: {
    name: string;
    count: number;
    percentage: number;
  }[];
  healthPersonnelCount: number;
  businessOperatorCount: number;
  generalPublicCount: number;
  passedAudits: number;
  failedAudits: number;
  updatedAt: string;
}
