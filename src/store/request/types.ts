export interface RequestState {
  loading: boolean;
  error: boolean | string;
  requests?: any[];
  bids?: any[];
  bid?: any;
}

export interface RequestHookReturn extends RequestState {
  setError: (error: boolean | string) => void;
  submitBid: (data: any) => any;
  updateBidStatus: (data: any) => any;
  getRequests: () => any;
  getBids: () => any;
  getBid: (id: string) => any;
  createAdditionalRepair: (data: any) => any;
}
