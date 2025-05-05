
export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  joinDate: string;
}

export interface Member extends User {
  role: 'member';
  membershipType: 'monthly' | 'quarterly' | 'yearly';
  membershipEndDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  lastPaymentDate?: string;
  referredBy?: string;
  workoutLog?: WorkoutSession[];
  attendanceHistory?: AttendanceRecord[];
}

export interface Admin extends User {
  role: 'admin';
  gymName: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  date: string;
  checkInTime: string;
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'online' | 'card' | 'upi';
  upiReference?: string;
  membershipType: 'monthly' | 'quarterly' | 'yearly';
  validUntil: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface WhatsAppNotification {
  id: string;
  memberId: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

export interface WorkoutSession {
  id: string;
  memberId: string;
  date: string;
  duration: number; // in minutes
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  overduePayments: number;
  attendanceToday: number;
  revenueThisMonth: number;
  newMembersThisMonth: number;
}

export interface GymGalleryImage {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: string;
  order: number;
}

export interface MockDataContext {
  currentUser: User | null;
  members: Member[];
  admins: Admin[];
  attendance: AttendanceRecord[];
  payments: Payment[];
  whatsappNotifications: WhatsAppNotification[];
  gymGalleryImages: GymGalleryImage[];
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  addMember: (member: Omit<Member, 'id' | 'role'>) => Promise<Member>;
  updateMember: (id: string, data: Partial<Member>) => Promise<Member>;
  deleteMember: (id: string) => Promise<boolean>;
  recordAttendance: (memberId: string) => Promise<AttendanceRecord>;
  recordPayment: (payment: Omit<Payment, 'id'>) => Promise<Payment>;
  sendWhatsAppNotification: (memberId: string, message: string) => Promise<WhatsAppNotification>;
  getDashboardStats: () => DashboardStats;
  uploadGymImage: (imageFile: File) => Promise<GymGalleryImage>;
  deleteGymImage: (imageId: string) => Promise<boolean>;
  updateGymImageOrder: (imageId: string, newOrder: number) => Promise<GymGalleryImage>;
}
