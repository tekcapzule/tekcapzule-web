// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiStage: 'dev',
  apiCacheExpiryHours: 12,
  userApiGateway: 'tpuvjtmfy9',
  eventApiGateway: 't9uk11ucqa',
  courseApiGateway: 'pir8ksji0b',
  marketplaceApiGateway: '2qdikhxbob',
  capsuleApiGateway: 'zgzztfoaxe',
  topicApiGateway: 'ydfobf5vfd',
  feedbackApiGateway: '1eynm6e2p8',
  subscriptionApiGateway: 'r8stxkvqs4',
  digestApiGateway: '7vrqxopm10',
  tekByteApiGateway: '8aor8j6icj',
  videoApiGateway: 'kppi2bylsk',
  interviewprepApiGateway: 's19tfj8cee',
  researchPaperApiGateway: 'flve5ir6cc',
  insightsApiGateway: '878m5ejncb',
  campaignApiGateway: 'fbc0hgdw4j',
  awsRegion: 'us-east-1',
  apiEndpointTemplate: 'https://{{api-gateway}}.execute-api.{{aws-region}}.amazonaws.com/dev',
  awsCognitoConfigs: {
    clientId: '32afdup2cl1jg2fv9idfd8l4hn',
    clientSecret: 'g3esl8ns46kukru0gu2f6sc2tf6n84ltu79pq8e5hdklagvum0v',
    redirectUri: 'http://localhost:4200',
    domain: 'https://tekcapzuledev-local.auth.us-east-1.amazoncognito.com',
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
