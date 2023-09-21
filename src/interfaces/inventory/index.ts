import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  product_id: string;
  quantity: number;
  last_updated: any;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
}
