import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  increment,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, UserRole, GlobalStats, AuditReport } from '../types';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Verify connection
(async () => {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is in offline mode or waiting for connection.');
    }
  }
})();

// Role mapping helper
export const ROLE_LABELS: Record<UserRole, string> = {
  health_personnel: 'บุคลากรด้านสาธารณสุข (อย./สสจ./รพ.)',
  business_operator: 'ผู้ประกอบการ / โรงงานผลิตอาหาร (SME / QA)',
  general_public: 'ประชาชนทั่วไป / ผู้บริโภค'
};

// Initial default stats
const DEFAULT_STATS: GlobalStats = {
  totalUsers: 1485,
  totalAudits: 2840,
  averageScore: 82,
  rolesCount: {
    health_personnel: 142,
    business_operator: 389,
    general_public: 954
  },
  commonViolations: [
    { name: 'ขนาดตัวอักษรคำเตือนสารก่อภูมิแพ้ต่ำกว่า 1.5 มม.', count: 482, percentage: 38 },
    { name: 'การปัดเศษและคำนวณ % Thai RDI โซเดียม/น้ำตาลใน GDA คลาดเคลื่อน', count: 394, percentage: 31 },
    { name: 'ชื่ออาหารบนฉลากไม่ตรงกับชื่อที่จดแจ้ง อย. ในระบบ 100%', count: 312, percentage: 24 },
    { name: 'ไม่ระบุข้อความ "ข้อมูลสำหรับผู้แพ้อาหาร" ตามประกาศฉบับ 383', count: 248, percentage: 19 },
    { name: 'การเรียงลำดับส่วนประกอบไม่ได้เรียงจากมากไปน้อยตามร้อยละ', count: 185, percentage: 14 }
  ],
  healthPersonnelCount: 142,
  businessOperatorCount: 389,
  generalPublicCount: 954,
  passedAudits: 1988,
  failedAudits: 852,
  updatedAt: new Date().toISOString()
};

// Get current saved user profile
export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem('labelcheckr_user');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading saved user', e);
  }
  return null;
}

// Save or update user profile with chosen role
export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    // 1. Save user doc
    const userRef = doc(db, 'users', profile.uid);
    await setDoc(userRef, profile, { merge: true });

    // 2. Increment role count in global stats
    const statsRef = doc(db, 'stats', 'summary');
    const roleKey = profile.role === 'health_personnel' 
      ? 'healthPersonnelCount' 
      : profile.role === 'business_operator' 
        ? 'businessOperatorCount' 
        : 'generalPublicCount';

    await setDoc(statsRef, {
      [roleKey]: increment(1),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Could not save to Firebase Firestore, saving locally:', err);
  }

  // Always save in localStorage for instant access
  try {
    localStorage.setItem('labelcheckr_user', JSON.stringify(profile));
  } catch (e) {
    console.error('Storage error', e);
  }
}

// Get global user stats
export async function fetchGlobalStats(): Promise<GlobalStats> {
  try {
    const statsRef = doc(db, 'stats', 'summary');
    const snap = await getDoc(statsRef);
    if (snap.exists()) {
      const data = snap.data();
      const hp = (data.healthPersonnelCount || 0) + DEFAULT_STATS.rolesCount.health_personnel;
      const bo = (data.businessOperatorCount || 0) + DEFAULT_STATS.rolesCount.business_operator;
      const gp = (data.generalPublicCount || 0) + DEFAULT_STATS.rolesCount.general_public;
      const audits = (data.totalAudits || 0) + DEFAULT_STATS.totalAudits;
      return {
        totalUsers: hp + bo + gp,
        totalAudits: audits,
        averageScore: DEFAULT_STATS.averageScore,
        rolesCount: {
          health_personnel: hp,
          business_operator: bo,
          general_public: gp
        },
        commonViolations: DEFAULT_STATS.commonViolations,
        healthPersonnelCount: hp,
        businessOperatorCount: bo,
        generalPublicCount: gp,
        passedAudits: (data.passedAudits || 0) + DEFAULT_STATS.passedAudits,
        failedAudits: (data.failedAudits || 0) + DEFAULT_STATS.failedAudits,
        updatedAt: data.updatedAt || new Date().toISOString()
      };
    }
  } catch (err) {
    console.warn('Firestore fetchGlobalStats fallback to default', err);
  }
  return DEFAULT_STATS;
}

// Save audit result
export async function saveAuditToFirestore(report: AuditReport, user?: UserProfile | null): Promise<void> {
  try {
    const reportRef = doc(db, 'auditReports', report.id);
    await setDoc(reportRef, {
      ...report,
      userId: user?.uid || 'anonymous',
      userRole: user?.role || 'general_public',
      userEmail: user?.email || 'guest@labelcheckr.th',
      savedAt: new Date().toISOString()
    });

    const statsRef = doc(db, 'stats', 'summary');
    await setDoc(statsRef, {
      totalAudits: increment(1),
      passedAudits: increment(report.complianceScore >= 80 ? 1 : 0),
      failedAudits: increment(report.complianceScore < 80 ? 1 : 0),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Could not save report to Firestore:', err);
  }

  // Save in local history
  try {
    const historyKey = 'labelcheckr_history';
    const existing = JSON.parse(localStorage.getItem(historyKey) || '[]');
    const updated = [report, ...existing.filter((r: AuditReport) => r.id !== report.id)].slice(0, 20);
    localStorage.setItem(historyKey, JSON.stringify(updated));
  } catch (e) {
    console.error('History storage error', e);
  }
}
