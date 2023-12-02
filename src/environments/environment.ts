// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiStage: 'dev',
  apiCacheExpiryHours: 12,
  userApiGateway: 'hu2qbprk7j',
  eventApiGateway: 't9uk11ucqa',
  courseApiGateway: 'pir8ksji0b',
  marketplaceApiGateway: '2qdikhxbob',
  capsuleApiGateway: 'zgzztfoaxe',
  topicApiGateway: 'q7y9oyz0d9',
  feedbackApiGateway: 'm4hav0fkxf',
  subscriptionApiGateway: 'r8stxkvqs4',
  digestApiGateway: '7vrqxopm10',
  tekByteApiGateway: '8aor8j6icj',
  videoApiGateway: 'kppi2bylsk',
  interviewprepApiGateway: 's19tfj8cee',
  researchPaperApiGateway: 'flve5ir6cc',
  campaignApiGateway: 'orf1vh4o23',
  insightsApiGateway: '878m5ejncb',
  feedApiGateway: 'b0jqzywk9l',
  skillStudioApiGateway: 'jcsh0salef',
  awsRegion: 'us-east-1',
  apiEndpointTemplate: 'https://{{api-gateway}}.execute-api.{{aws-region}}.amazonaws.com/dev',
  awsCognitoConfigs: {
    clientId: '6oh669hj770mhsg9pss38l9cmb',
    clientSecret: 'ro7o0f8fcbfe8bko62c8khsakoqbeej1gf946ptrsvqng07seec',
    redirectUri: 'http://localhost:4200/',
    domainUri: 'https://tekcapzuledev.auth.us-east-1.amazoncognito.com',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
