export interface BusinessState {
  loading: boolean;
  loading2: boolean;
  error: boolean | string;
  business?: any;
  schedule?: any[];
  services?: any[];
  garages?: any[];
}

export interface BusinessHookReturn extends BusinessState {
  setError: (error: boolean | string) => void;
  createBusiness: (data: any) => any;
  updateBusiness: (data: any) => any;
  saveSchedule: (data: any) => any;
  getSchedule: () => any;
  getBusiness: () => any;
  getServices: () => any;
  stripeOnboard: (data: {country: string}) => any;
  addGarage: (data: any) => any;
  updateGarage: (data: any) => any;
  getGarages: () => any;
}
