export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  customer: Customer;
  scheduledDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'retired';
  lastMaintenanceDate: Date;
  nextMaintenanceDate: Date;
  assignedTo?: string;
  location: string;
} 