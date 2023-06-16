// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiStage: 'dev',
  apiCacheExpiryHours: 12,
  capsuleApiGateway: 'kzqdp4mtmd',
  eventApiGateway: 'ubm1d5yjrd',
  feedbackApiGateway: '7a0ynuuzb7',
  subscriptionApiGateway: 'jianrwq924',
  topicApiGateway: 'ydfobf5vfd',
  tekByteApiGateway: '66ja8b3hcl',
  userApiGateway: 'x5jyub91a3',
  digestApiGateway: '7vrqxopm10',
  awsRegion: 'execute-api.us-east-1',
  apiEndpointTemplate: 'https://{{api-gateway}}.{{aws-region}}.amazonaws.com/dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
