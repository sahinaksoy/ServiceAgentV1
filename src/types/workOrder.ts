export type WorkOrderType = 'emergency' | 'maintenance' | 'renovation' | 'additional' | 'investment';
export type WorkOrderStatus = 'pool' | 'waitingForAssignment' | 'pending' | 'inProgress' | 'waitingForCompletion' | 'completed' | 'cancelled';
export type WorkOrderPriority = 'high' | 'medium' | 'low';
export type WorkOrderCategory = 'mechanical' | 'electrical' | 'sensor' | 'maintenance' | 'temperature' | 'glass' | 'water' | 'monitoring';

export interface WorkOrder {
  id: string;
  type: WorkOrderType;
  category: WorkOrderCategory;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  summary: string;
  dueDate: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  mobile: string;
  serviceAddress: string;
  billingAddress: string;
  preferredDate1: string;
  assignedTo: string;
  services: number[];
  parts: number[];
  partQuantities: { [key: number]: number };
  createdAt: string;
  updatedAt: string;
}

export type WorkOrderFormData = Omit<WorkOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>; 