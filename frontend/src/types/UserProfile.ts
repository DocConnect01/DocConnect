export interface UserProfile {
    FirstName: string;
    LastName: string;
    Email: string;
    PhotoUrl?: string;
    Password?: string;
  }
  
  export interface UserProfileState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
  }