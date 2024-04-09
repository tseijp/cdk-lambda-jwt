import { generate } from "../generate";

/**
 * my created
 */
test("generate", () => {
  expect(
    generate(
      "jaas_appId",
      "jaas_appKid",
      "", // dummy private key
    )
  ).toBeTruthy();

  expect(
    generate(
      "jaas_appId2",
      "jaas_appKey2",
      "", // dummy private key
    )
  ).toBeTruthy();
});

// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkLambdaJwt from '../lib/cdk-lambda-jwt-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-lambda-jwt-stack.ts
test("SQS Queue Created", () => {
  //   const app = new cdk.App();
  //     // WHEN
  //   const stack = new CdkLambdaJwt.CdkLambdaJwtStack(app, 'MyTestStack');
  //     // THEN
  //   const template = Template.fromStack(stack);
  //   template.hasResourceProperties('AWS::SQS::Queue', {
  //     VisibilityTimeout: 300
  //   });
});
