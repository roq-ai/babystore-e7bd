import { InventoryInterface } from 'interfaces/inventory';
import { PurchaseInterface } from 'interfaces/purchase';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  inventory?: InventoryInterface[];
  purchase?: PurchaseInterface[];
  business?: BusinessInterface;
  _count?: {
    inventory?: number;
    purchase?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  business_id?: string;
}
