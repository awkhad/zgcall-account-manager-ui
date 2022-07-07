export function getAPICredentials() {
  return {
    accessKeyId: process.env.ACCESS_KEY_ID,
    accessKeySecret: process.env.ACCESS_KEY_SECRET,
    endpoint: process.env.APISERVER_ENDPOINT_DEV,
  }
}
