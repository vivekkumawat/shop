import * as configData from '../config.json';

export default () => ({
  MONGODB_URI: configData.mongoDB.url,
  JWT_SECRET: configData.JWT.secret,
});
