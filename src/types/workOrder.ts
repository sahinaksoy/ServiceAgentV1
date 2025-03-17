export type WorkOrderPriority = 'high' | 'medium' | 'low';
export type WorkOrderType = 'emergency' | 'maintenance' | 'renovation' | 'additional' | 'investment';
export type WorkOrderCategory = 'mechanical' | 'electrical';
export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface WorkOrderCompany {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  mobile: string;
  address: string;
}

export interface WorkOrderAssignee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export interface WorkOrderService {
  id: number;
  name: string;
  category: string;
  duration: number;
}

export interface WorkOrderPart {
  id: number;
  name: string;
  unit: string;
  price: number;
  quantity: number;
}

export interface WorkOrder {
  id: number;
  summary: string;
  priority: WorkOrderPriority;
  type: WorkOrderType;
  category: WorkOrderCategory;
  status: WorkOrderStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  company: WorkOrderCompany;
  assignedTo: WorkOrderAssignee | null;
  services: WorkOrderService[];
  parts: WorkOrderPart[];
  totalAmount: number;
}

export interface WorkOrderFormData {
  summary: string;
  priority: WorkOrderPriority;
  type: WorkOrderType;
  category: WorkOrderCategory;
  dueDate: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  mobile: string;
  serviceAddress: string;
  preferredDate1: string;
  assignedTo: string;
  services: number[];
} 