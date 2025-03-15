export type WorkOrderType = 'emergency' | 'maintenance' | 'investment';
export type WorkOrderStatus = 'pending' | 'approved' | 'rejected' | 'inProgress' | 'completed';

export interface WorkOrder {
  id: string;
  type: WorkOrderType;
  region: string;
  date: string;
  description: string;
  assignedTo: string;
  status: WorkOrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface WorkOrderFormData {
  type: WorkOrderType;
  region: string;
  date: string;
  description: string;
  assignedTo: string;
} 