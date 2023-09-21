import { UserInterface } from 'interfaces/user';
import { PurchaseInterface } from 'interfaces/purchase';
import { GetQueryInterface } from 'interfaces';

export interface BillingInterface {
  id?: string;
  user_id: string;
  purchase_id: string;
  amount_due: number;
  due_date: any;
  payment_date?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  purchase?: PurchaseInterface;
  _count?: {};
}

export interface BillingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  purchase_id?: string;
}
