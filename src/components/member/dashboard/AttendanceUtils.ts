
import { AttendanceRecord } from '@/types';

// Calculate attendance streak (consecutive days)
export const calculateAttendanceStreak = (memberAttendance: AttendanceRecord[]): number => {
  if (memberAttendance.length === 0) return 0;
  
  const sortedAttendance = [...memberAttendance].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  // Check if checked in today
  const latestAttendance = new Date(sortedAttendance[0].date);
  latestAttendance.setHours(0, 0, 0, 0);
  
  // If not checked in today, start from yesterday
  if (currentDate.getTime() !== latestAttendance.getTime()) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  // Count consecutive days
  for (let i = 0; i < sortedAttendance.length; i++) {
    const attendanceDate = new Date(sortedAttendance[i].date);
    attendanceDate.setHours(0, 0, 0, 0);
    
    if (attendanceDate.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (attendanceDate.getTime() < currentDate.getTime()) {
      // Break streak
      break;
    }
  }
  
  return streak;
};

// Check if checked in today
export const isCheckedInToday = (memberAttendance: AttendanceRecord[]): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return memberAttendance.some(record => record.date === today);
};
