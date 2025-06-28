// User types
export interface IUser {
  _id?: string;
  username: string;
  email: string;
  accountNumber: number;
  password: string;
  role: "admin" | "user";
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Poultry types
export interface IPoultry {
  _id?: string;
  batchNumber: string;
  quantity: number;
  arrivalDate: Date;
  breed: string;
  source: string;
  initialWeight: number;
  userId: {};
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  date: Date;
  notes?: string;
}

// Feed types
export interface IFeed {
  _id?: string;
  poultryId: {};
  date: Date;
  quantity: number;
  type: string;
  cost: number;
  notes?: string;
  userId: {};
  createdAt?: Date;
  updatedAt?: Date;
}

// Water types
export interface IWater {
  _id?: string;
  poultryId: {};
  date: Date;
  quantity: number;
  type: string;
  notes?: string;
  userId: {};
  createdAt?: Date;
  updatedAt?: Date;
}

// Mortality types
export interface IMortality {
  _id?: string;
  poultryId: {};
  date: Date;
  quantity: number;
  cause: string;
  notes?: string;
  userId: {};
  createdAt?: Date;
  updatedAt?: Date;
}

// Monitoring types
export interface IMonitoring {
  _id?: string;
  poultryId: {};
  date: Date;
  weight: number;
  health: "good" | "fair" | "poor";
  behavior: string;
  temperature: string;
  humidity: number;
  notes?: string;
  userId: {};
  timeSlots: "8h" | "12h" | "18h" | "22h";
  vaccineAdministered: string;
  waterAdministered: number;
  hangar: string;
  mortality: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Auth types
export interface IAuthRequest extends Request {
  user?: IUser;
}

// Supposons une collection activations :

// Monitoring types
export interface IActivation {
  _id: string;
  deviceId: string;
  isActive: boolean;
  expiresAt: Date;
  notes: string;
}
