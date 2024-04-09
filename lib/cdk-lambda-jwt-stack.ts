import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as dotenv from "dotenv";

dotenv.config()

export class CdkLambdaJwtStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, "lambda", {
      entry: "lambda/index.ts",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        JAAS_APP_ID: process.env.JAAS_APP_ID ?? "",
        JAAS_API_KID: process.env.JAAS_API_KID ?? "",
        PRIVATE_KEY: process.env.PRIVATE_KEY ?? "",
      },
    });

    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new apigw.LambdaRestApi(this, "myapi", {
      handler: fn,
    });
  }
}
