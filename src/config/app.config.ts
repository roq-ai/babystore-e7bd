interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'Store Manager'],
  tenantName: 'Business',
  applicationName: 'babyStore',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View products', 'Purchase products', 'View billing information', 'Edit personal information'],
  ownerAbilities: [
    'Manage user information',
    'Manage business information',
    'Manage products',
    'Manage purchases and billing',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/222db745-5af0-4ea9-8580-b46622571b84',
};
