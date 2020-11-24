require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';
const appUrl = process.env.APP_URL || '';
const graphqlConfig = {
  port: parseInt(`${process.env.GRAPHQL_PORT || 3000}`, 10),
};

const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};
const jwtCustomer = {
  accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET_CUSTOMER,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET_CUSTOMER,
  iscustomer: process.env.JWT_ISCUSTOMER,
  audience: process.env.JWT_AUDIENCE_CUSTOMER,
};
const cacheConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(`${process.env.REDIS_PORT || 6379}`, 10),
  password: process.env.REDIS_PASSWORD || undefined,
};

const serviceConfig = {
  users: process.env.USERS_SERVICE || '',
  core: process.env.CORE_SERVICE || '',
  customer: process.env.CUSTOMER_SERVICE || '',
  mailer: process.env.MAILER_SERVICE || '',
  invoice: process.env.INVOICE_SERVICE || '',
  area: process.env.AREA_SERVICE || '',
  ewallet: process.env.EWALLET_SERVICE || '',
  catalog: process.env.CATALOG_SERVICE || '',
  thirdParty: {
    dalat: process.env.DALAT_SERVER,
  },
};

const rabbitConfig = {
  url: `amqp://${process.env.RABBIT_USER}:${encodeURIComponent(process.env.RABBIT_PASS || '')}@${process.env.RABBIT}`,
  channel: [],
};

const s3UploadConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  destinationBucketName: process.env.AWS_DESTINATIONBUCKETNAME || 'MakeMon',
  region: process.env.AWS_REGION || 'ca-central-1',
};

export {
  env, graphqlConfig, jwtConfig, cacheConfig, serviceConfig, jwtCustomer, appUrl, rabbitConfig, s3UploadConfig,
};
