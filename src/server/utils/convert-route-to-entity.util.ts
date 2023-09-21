const mapping: Record<string, string> = {
  billings: 'billing',
  businesses: 'business',
  inventories: 'inventory',
  products: 'product',
  purchases: 'purchase',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
