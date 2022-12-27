// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiStage: 'dev',
  apiCacheExpiryHours: '12',
  capsuleApiGateway: '0isr8e2ete',
  eventApiGateway: 'ubm1d5yjrd',
  feedbackApiGateway: '1eynm6e2p8',
  subscriptionApiGateway: 'r8stxkvqs4',
  topicApiGateway: 'ku5hosmks2',
  userApiGateway: 'x5jyub91a3',
  awsRegion: 'execute-api.us-west-2',
  apiEndpointTemplate: 'https://{{api-gateway}}.{{aws-region}}.amazonaws.com/dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
