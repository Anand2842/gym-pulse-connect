
import { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string; phone?: string }) => Promise<{ error: any | null; data: any | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null; data: any | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: any | null; data: any | null }>;
  updateEmail: (newEmail: string) => Promise<{ error: any | null; data: any | null }>;
}

export interface UserData {
  first_name: string;
  last_name: string;
  phone?: string;
}
