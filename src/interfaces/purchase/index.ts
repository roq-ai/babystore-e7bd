import { BillingInterface } from 'interfaces/billing';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  product_id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  purchase_date: any;
  created_at?: any;
  updated_at?: any;
  billing?: BillingInterface[];
  product?: ProductInterface;
  user?: UserInterface;
  _count?: {
    billing?: number;
  };
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  user_id?: string;
}
