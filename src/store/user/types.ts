export interface UserState {
  loading: boolean;
  loading2: boolean;
  error: boolean | string;
  current?: any;
  carRecords?: any[];
  notifications?: any[];
}

export interface UserHookReturn extends UserState {
  setError: (error: boolean | string) => void;
  updateProfile: (data: any) => any;
  updateLocation: (data: any) => any;
  changePassword: (data: any) => any;
  getProfile: () => any;
  updatePhone: (data: any) => any;
  verifyPhone: (data: any) => any;
  getCarRecords: (data: any) => any;
  getNotifications: () => any;
  deleteAccount: (data: any) => any;
}
