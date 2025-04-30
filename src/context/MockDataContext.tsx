import React, { createContext, useContext, useState } from 'react';
import { 
  User, 
  Member, 
  Admin, 
  AttendanceRecord, 
  Payment, 
  MockDataContext as MockDataContextType,
  DashboardStats,
  WhatsAppNotification,
  GymGalleryImage
} from '../types';
import { toast } from 'sonner';

// Sample gallery images with placeholder URLs
const sampleGalleryImages: GymGalleryImage[] = [
  {
    id: 'img1',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    caption: 'Strength training area',
    uploadedAt: '2023-03-15',
    order: 1
  },
  {
    id: 'img2',
    url: 'https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    caption: 'Cardio zone',
    uploadedAt: '2023-03-16',
    order: 2
  },
  {
    id: 'img3',
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    caption: 'Group workout studio',
    uploadedAt: '2023-03-17',
    order: 3
  }
];

// Sample data
const sampleMembers: Member[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    email: 'raj@example.com',
    role: 'member',
    phone: '9876543210',
    joinDate: '2023-01-15',
    membershipType: 'monthly',
    membershipEndDate: '2023-05-15',
    paymentStatus: 'paid',
    lastPaymentDate: '2023-04-15',
    attendanceHistory: [
      { id: 'a1', memberId: '1', date: '2023-04-25', checkInTime: '09:15:00' },
      { id: 'a2', memberId: '1', date: '2023-04-26', checkInTime: '10:00:00' },
    ]
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'member',
    phone: '8765432109',
    joinDate: '2023-02-10',
    membershipType: 'quarterly',
    membershipEndDate: '2023-05-10',
    paymentStatus: 'pending',
    lastPaymentDate: '2023-02-10',
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit@example.com',
    role: 'member',
    phone: '7654321098',
    joinDate: '2023-03-20',
    membershipType: 'yearly',
    membershipEndDate: '2024-03-20',
    paymentStatus: 'paid',
    lastPaymentDate: '2023-03-20',
  },
  {
    id: '4',
    name: 'Sunita Verma',
    email: 'sunita@example.com',
    role: 'member',
    phone: '6543210987',
    joinDate: '2023-04-05',
    membershipType: 'monthly',
    membershipEndDate: '2023-05-05',
    paymentStatus: 'overdue',
    lastPaymentDate: '2023-04-05',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram@example.com',
    role: 'member',
    phone: '5432109876',
    joinDate: '2023-01-25',
    membershipType: 'quarterly',
    membershipEndDate: '2023-04-25',
    paymentStatus: 'overdue',
    lastPaymentDate: '2023-01-25',
  }
];

const sampleAdmins: Admin[] = [
  {
    id: 'a1',
    name: 'Rahul Gupta',
    email: 'admin@example.com',
    role: 'admin',
    phone: '9988776655',
    joinDate: '2022-12-01',
    gymName: 'FlexFit Gym'
  }
];

const sampleAttendance: AttendanceRecord[] = [
  { id: 'a1', memberId: '1', date: '2023-04-25', checkInTime: '09:15:00' },
  { id: 'a2', memberId: '1', date: '2023-04-26', checkInTime: '10:00:00' },
  { id: 'a3', memberId: '2', date: '2023-04-25', checkInTime: '18:30:00' },
  { id: 'a4', memberId: '3', date: '2023-04-26', checkInTime: '07:45:00' },
  { id: 'a5', memberId: '4', date: '2023-04-25', checkInTime: '16:20:00' },
  { id: 'a6', memberId: '5', date: '2023-04-26', checkInTime: '19:10:00' },
];

const samplePayments: Payment[] = [
  {
    id: 'p1',
    memberId: '1',
    amount: 1000,
    date: '2023-04-15',
    paymentMethod: 'cash',
    membershipType: 'monthly',
    validUntil: '2023-05-15',
    status: 'completed'
  },
  {
    id: 'p2',
    memberId: '2',
    amount: 2500,
    date: '2023-02-10',
    paymentMethod: 'online',
    membershipType: 'quarterly',
    validUntil: '2023-05-10',
    status: 'completed'
  },
  {
    id: 'p3',
    memberId: '3',
    amount: 8000,
    date: '2023-03-20',
    paymentMethod: 'cash',
    membershipType: 'yearly',
    validUntil: '2024-03-20',
    status: 'completed'
  }
];

// Create context
const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(sampleMembers);
  const [admins] = useState<Admin[]>(sampleAdmins);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(sampleAttendance);
  const [payments, setPayments] = useState<Payment[]>(samplePayments);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [whatsappNotifications, setWhatsappNotifications] = useState<WhatsAppNotification[]>([]);
  const [gymGalleryImages, setGymGalleryImages] = useState<GymGalleryImage[]>(sampleGalleryImages);

  const login = async (email: string, password: string): Promise<User | null> => {
    // Simple mock authentication
    const admin = admins.find(a => a.email === email);
    if (admin) {
      setCurrentUser(admin);
      toast.success(`Welcome back, ${admin.name}`);
      return admin;
    }

    const member = members.find(m => m.email === email);
    if (member) {
      setCurrentUser(member);
      toast.success(`Welcome back, ${member.name}`);
      return member;
    }

    toast.error('Invalid email or password');
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info('You have been logged out');
  };

  const addMember = async (memberData: Omit<Member, 'id' | 'role'>): Promise<Member> => {
    const newMember: Member = {
      ...memberData,
      id: `m${Date.now()}`,
      role: 'member'
    };
    setMembers(prev => [...prev, newMember]);
    toast.success(`${newMember.name} has been added as a member`);
    return newMember;
  };

  const updateMember = async (id: string, data: Partial<Member>): Promise<Member> => {
    let updatedMember: Member | undefined;
    setMembers(prev => 
      prev.map(member => {
        if (member.id === id) {
          updatedMember = { ...member, ...data };
          return updatedMember;
        }
        return member;
      })
    );
    
    if (!updatedMember) {
      throw new Error('Member not found');
    }
    
    toast.success(`${updatedMember.name}'s information has been updated`);
    return updatedMember;
  };

  const deleteMember = async (id: string): Promise<boolean> => {
    const memberToDelete = members.find(m => m.id === id);
    if (!memberToDelete) return false;
    
    setMembers(prev => prev.filter(member => member.id !== id));
    toast.success(`${memberToDelete.name} has been removed`);
    return true;
  };

  const recordAttendance = async (memberId: string): Promise<AttendanceRecord> => {
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];
    
    // Check if member already checked in today
    const existingAttendance = attendance.find(
      a => a.memberId === memberId && a.date === today
    );
    
    if (existingAttendance) {
      toast.info("You've already checked in today");
      return existingAttendance;
    }
    
    const newAttendance: AttendanceRecord = {
      id: `a${Date.now()}`,
      memberId,
      date: today,
      checkInTime: currentTime
    };
    
    setAttendance(prev => [...prev, newAttendance]);
    toast.success("Check-in successful!");
    return newAttendance;
  };

  const recordPayment = async (paymentData: Omit<Payment, 'id'>): Promise<Payment> => {
    const newPayment: Payment = {
      ...paymentData,
      id: `p${Date.now()}`
    };
    
    setPayments(prev => [...prev, newPayment]);
    
    // Update member payment status
    setMembers(prev => 
      prev.map(member => {
        if (member.id === paymentData.memberId) {
          return {
            ...member,
            paymentStatus: 'paid',
            lastPaymentDate: paymentData.date,
            membershipEndDate: paymentData.validUntil
          };
        }
        return member;
      })
    );
    
    toast.success(`Payment of ₹${paymentData.amount} recorded successfully`);
    return newPayment;
  };

  const sendWhatsAppNotification = async (memberId: string, message: string): Promise<WhatsAppNotification> => {
    // Get member
    const member = members.find(m => m.id === memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    
    // Create notification record
    const notification: WhatsAppNotification = {
      id: `wn${Date.now()}-${memberId}`,
      memberId,
      message,
      sentAt: new Date().toISOString(),
      status: 'delivered',
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add to notifications collection
    setWhatsappNotifications(prev => [...prev, notification]);
    
    // Return the notification
    return notification;
  };

  const getDashboardStats = (): DashboardStats => {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const activeMembers = members.filter(m => {
      const endDate = new Date(m.membershipEndDate);
      return endDate >= new Date();
    });
    
    const overduePayments = members.filter(m => m.paymentStatus === 'overdue').length;
    
    const attendanceToday = attendance.filter(a => a.date === today).length;
    
    const paymentsThisMonth = payments.filter(p => {
      const paymentDate = new Date(p.date);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    });
    
    const revenueThisMonth = paymentsThisMonth.reduce((sum, payment) => sum + payment.amount, 0);
    
    const newMembersThisMonth = members.filter(m => {
      const joinDate = new Date(m.joinDate);
      return joinDate.getMonth() === currentMonth && 
             joinDate.getFullYear() === currentYear;
    }).length;
    
    return {
      totalMembers: members.length,
      activeMembers: activeMembers.length,
      overduePayments,
      attendanceToday,
      revenueThisMonth,
      newMembersThisMonth
    };
  };

  // Function to handle uploading a new gym image
  const uploadGymImage = async (imageFile: File): Promise<GymGalleryImage> => {
    // In a real app, we would upload the file to storage and get a URL
    // Here we'll create a blob URL for demonstration
    const imageUrl = URL.createObjectURL(imageFile);
    
    const newImage: GymGalleryImage = {
      id: `img${Date.now()}`,
      url: imageUrl,
      caption: '',
      uploadedAt: new Date().toISOString(),
      order: gymGalleryImages.length + 1
    };
    
    setGymGalleryImages(prev => [...prev, newImage]);
    toast.success('Image uploaded successfully');
    return newImage;
  };
  
  // Function to delete an image
  const deleteGymImage = async (imageId: string): Promise<boolean> => {
    setGymGalleryImages(prev => {
      const filtered = prev.filter(img => img.id !== imageId);
      
      // Reorder the remaining images
      return filtered.map((img, index) => ({
        ...img,
        order: index + 1
      }));
    });
    
    toast.success('Image deleted successfully');
    return true;
  };
  
  // Function to update image order
  const updateGymImageOrder = async (imageId: string, newOrder: number): Promise<GymGalleryImage> => {
    let updatedImage: GymGalleryImage | undefined;
    
    setGymGalleryImages(prev => {
      const currentImage = prev.find(img => img.id === imageId);
      if (!currentImage) return prev;
      
      const currentOrder = currentImage.order;
      
      // Ensure newOrder is within bounds
      const safeNewOrder = Math.max(1, Math.min(newOrder, prev.length));
      
      return prev.map(img => {
        if (img.id === imageId) {
          updatedImage = { ...img, order: safeNewOrder };
          return updatedImage;
        }
        
        // Adjust other images' orders based on move direction
        if (currentOrder < safeNewOrder) {
          // Moving down, decrease order for images between current and new position
          if (img.order > currentOrder && img.order <= safeNewOrder) {
            return { ...img, order: img.order - 1 };
          }
        } else if (currentOrder > safeNewOrder) {
          // Moving up, increase order for images between new and current position
          if (img.order >= safeNewOrder && img.order < currentOrder) {
            return { ...img, order: img.order + 1 };
          }
        }
        
        return img;
      }).sort((a, b) => a.order - b.order);
    });
    
    if (!updatedImage) {
      throw new Error('Image not found');
    }
    
    toast.success('Image order updated');
    return updatedImage;
  };

  return (
    <MockDataContext.Provider value={{ 
      currentUser,
      members,
      admins,
      attendance,
      payments,
      whatsappNotifications,
      gymGalleryImages,
      login,
      logout,
      addMember,
      updateMember,
      deleteMember,
      recordAttendance,
      recordPayment,
      sendWhatsAppNotification,
      getDashboardStats,
      uploadGymImage,
      deleteGymImage,
      updateGymImageOrder
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = (): MockDataContextType => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
