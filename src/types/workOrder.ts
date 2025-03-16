export type WorkOrderType = 'emergency' | 'maintenance' | 'renovation' | 'additional' | 'investment';
export type WorkOrderStatus = 'pending' | 'approved' | 'rejected' | 'inProgress' | 'completed';
export type WorkOrderPriority = 'high' | 'medium' | 'low';

export interface WorkOrder {
  id: string;
  type: WorkOrderType;
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
  createdAt: string;
  updatedAt: string;
}

export type WorkOrderFormData = Omit<WorkOrder, 'id' | 'status' | 'createdAt' | 'updatedAt'>; 