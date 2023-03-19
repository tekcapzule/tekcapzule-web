export enum CacheTypeEnum {
  SESSION = 'session',
  LOCAL = 'local',
}

export const Constants = {
  None: 'none',
  NotAvailable: 'N/A',
  AdminUserGroup: 'admin_users_group',
  DefaultApiCacheExpiryHours: 12,
  CacheType: CacheTypeEnum.SESSION,
};

Object.freeze(Constants);
