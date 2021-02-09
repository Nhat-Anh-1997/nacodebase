import * as readPkgUp from 'read-pkg-up';
const { packageJson: pkg } = readPkgUp.sync();

export const isProduction = process.env.NODE_ENV === 'production';
export const productionPort = process.env.PORT || 8000;
export const serverPort = isProduction ? productionPort : 8000;
export const serverName = pkg.name;
export const serverVersion = pkg.version;

export const devTenant =
  process.env.DEV_TENANT_ID || '73e7859d-49e3-4a4f-bff7-9b03df1da0eb';
