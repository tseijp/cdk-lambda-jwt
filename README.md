# getting started

## version

- aws-cdk: latest
- aws-cli: latest
- hono: latest
- node: latest

## setup

```ruby
mkdir cdk-lambda-jwt
cd cdk-lambda-jwt
cdk init app -l typescript
yarn add hono
mkdir lambda
# edit lambda/index.ts
# edit lib/cdk-lambda-jwt-stack.ts
```

## deploy to lambda

- install aws-cli and aws-cdk
- install and open docker desktop
- login aws for command prompt
  - `aws configure sso`
  - `aws sso login --profile sso-xxx-your-profile`

```ruby
mkdir cdk-lambda-jwt
cd cdk-lambda-jwt
cdk init app -l typescript
yarn add hono
mkdir lambda
# edit lambda/index.ts
# edit lib/cdk-lambda-jwt-stack.ts
cdk deploy --profile xxx-your-sso-profile
```

<details>
<summary>

output

</summary>

```
[+] Building 1.1s (14/14) FINISHED                                                                                                                          docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                                                        0.0s
 => => transferring dockerfile: 1.30kB                                                                                                                                      0.0s
 => [internal] load .dockerignore                                                                                                                                           0.0s
 => => transferring context: 2B                                                                                                                                             0.0s
 => [internal] load metadata for public.ecr.aws/sam/build-nodejs20.x:latest                                                                                                 1.0s
 => [ 1/10] FROM public.ecr.aws/sam/build-nodejs20.x@sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa                                                0.0s
 => CACHED [ 2/10] RUN npm install --global yarn@1.22.5                                                                                                                     0.0s
 => CACHED [ 3/10] RUN npm install --global pnpm@7.30.5                                                                                                                     0.0s
 => CACHED [ 4/10] RUN npm install --global typescript                                                                                                                      0.0s
 => CACHED [ 5/10] RUN npm install --global --unsafe-perm=true esbuild@0                                                                                                    0.0s
 => CACHED [ 6/10] RUN mkdir /tmp/npm-cache &&     chmod -R 777 /tmp/npm-cache &&     npm config --global set cache /tmp/npm-cache                                          0.0s
 => CACHED [ 7/10] RUN mkdir /tmp/yarn-cache &&     chmod -R 777 /tmp/yarn-cache &&     yarn config set cache-folder /tmp/yarn-cache                                        0.0s
 => CACHED [ 8/10] RUN mkdir /tmp/pnpm-cache &&     chmod -R 777 /tmp/pnpm-cache &&     pnpm config --global set store-dir /tmp/pnpm-cache                                  0.0s
 => CACHED [ 9/10] RUN npm config --global set update-notifier false                                                                                                        0.0s
 => CACHED [10/10] RUN /sbin/useradd -u 1000 user && chmod 711 /                                                                                                            0.0s
 => exporting to image                                                                                                                                                      0.0s
 => => exporting layers                                                                                                                                                     0.0s
 => => writing image sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb                                                                                0.0s
 => => naming to docker.io/library/cdk-cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                     0.0s

What's Next?
  1. Sign in to your Docker account → docker login
  2. View a summary of image vulnerabilities and recommendations → docker scout quickview
Bundling asset CdkLambdaJwtStack/lambda/Code/Stage...
esbuild cannot run locally. Switching to Docker bundling.
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested

  asset-output/index.js  49.2kb

⚡ Done in 173ms

✨  Synthesis time: 5.09s

CdkLambdaJwtStack:  start: Building dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd:current_account-current_region
CdkLambdaJwtStack:  success: Built dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd:current_account-current_region
CdkLambdaJwtStack:  start: Building eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:current_account-current_region
CdkLambdaJwtStack:  success: Built eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:current_account-current_region
CdkLambdaJwtStack:  start: Publishing dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd:current_account-current_region
CdkLambdaJwtStack:  start: Publishing eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:current_account-current_region
CdkLambdaJwtStack:  success: Published dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd:current_account-current_region
CdkLambdaJwtStack:  success: Published eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:current_account-current_region
This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬───────────────────────────┬────────┬──────────────────────────┬────────────────────────────────────────────────────┬─────────────────────────────────────────────────────┐
│   │ Resource                  │ Effect │ Action                   │ Principal                                          │ Condition                                           │
├───┼───────────────────────────┼────────┼──────────────────────────┼────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤
│ + │ ${lambda.Arn}             │ Allow  │ lambda:InvokeFunctionUrl │ *                                                  │                                                     │
│ + │ ${lambda.Arn}             │ Allow  │ lambda:InvokeFunction    │ Service:apigateway.amazonaws.com                   │ "ArnLike": {                                        │
│   │                           │        │                          │                                                    │   "AWS:SourceArn": "arn:${AWS::Partition}:execute-a │
│   │                           │        │                          │                                                    │ pi:${AWS::Region}:${AWS::AccountId}:${fffffffffffff │
│   │                           │        │                          │                                                    │ }/${myapi/DeploymentStage.prod}/*/*"                │
│   │                           │        │                          │                                                    │ }                                                   │
│ + │ ${lambda.Arn}             │ Allow  │ lambda:InvokeFunction    │ Service:apigateway.amazonaws.com                   │ "ArnLike": {                                        │
│   │                           │        │                          │                                                    │   "AWS:SourceArn": "arn:${AWS::Partition}:execute-a │
│   │                           │        │                          │                                                    │ pi:${AWS::Region}:${AWS::AccountId}:${fffffffffffff │
│   │                           │        │                          │                                                    │ }/test-invoke-stage/*/*"                            │
│   │                           │        │                          │                                                    │ }                                                   │
│ + │ ${lambda.Arn}             │ Allow  │ lambda:InvokeFunction    │ Service:apigateway.amazonaws.com                   │ "ArnLike": {                                        │
│   │                           │        │                          │                                                    │   "AWS:SourceArn": "arn:${AWS::Partition}:execute-a │
│   │                           │        │                          │                                                    │ pi:${AWS::Region}:${AWS::AccountId}:${fffffffffffff │
│   │                           │        │                          │                                                    │ }/${myapi/DeploymentStage.prod}/*/"                 │
│   │                           │        │                          │                                                    │ }                                                   │
│ + │ ${lambda.Arn}             │ Allow  │ lambda:InvokeFunction    │ Service:apigateway.amazonaws.com                   │ "ArnLike": {                                        │
│   │                           │        │                          │                                                    │   "AWS:SourceArn": "arn:${AWS::Partition}:execute-a │
│   │                           │        │                          │                                                    │ pi:${AWS::Region}:${AWS::AccountId}:${fffffffffffff │
│   │                           │        │                          │                                                    │ }/test-invoke-stage/*/"                             │
│   │                           │        │                          │                                                    │ }                                                   │
├───┼───────────────────────────┼────────┼──────────────────────────┼────────────────────────────────────────────────────┼─────────────────────────────────────────────────────┤
│ + │ ${lambda/ServiceRole.Arn} │ Allow  │ sts:AssumeRole           │ Service:lambda.amazonaws.com                       │                                                     │
└───┴───────────────────────────┴────────┴──────────────────────────┴────────────────────────────────────────────────────┴─────────────────────────────────────────────────────┘
IAM Policy Changes
┌───┬───────────────────────┬────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource              │ Managed Policy ARN                                                             │
├───┼───────────────────────┼────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${lambda/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole │
└───┴───────────────────────┴────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Do you wish to deploy these changes (y/n)? y
CdkLambdaJwtStack: deploying... [1/1]
CdkLambdaJwtStack: creating CloudFormation changeset...

 ✅  CdkLambdaJwtStack

✨  Deployment time: 47.08s

Outputs:
CdkLambdaJwtStack.myapiEndpoint8EB17201 = https://gggggggggggg.execute-api.ap-northeast-1.amazonaws.com/prod/
Stack ARN:
arn:aws:cloudformation:ap-northeast-1:hhhhhhhhhhhhhhh:stack/CdkLambdaJwtStack/iiiiiiiiiiiiiiiiiiiiiiiiiiiiii

✨  Total time: 52.17s
```

</details>

## JaaS

- save appId as `JAAS_APP_ID` in `.env` // diff from kid (kid is for public key)
- generate private key and public key
  ```
  openssl genrsa -out private.pem 2048
  openssl rsa -in private.pem -pubout -out public.pem
  ```
- save private key as `PRIVATE_KEY` in `.env`
- open [8x8 Jitsi as a Service](https://jaas.8x8.vc/#/apikeys)
- disable `Allow meeting participants to join unauthenticated`
- click `Add API Key` => Click `Add publick API key`
- fill public key => generate
- copy generated `vpaas-xxxxxxxxxxxxxxxx/yyyyyy` and save as `JAAS_APO_KID` in `.env`

# Ref

- [AWS Lambda - Hono](https://hono.dev/getting-started/aws-lambda)
- [JWT Auth Middleware - Hono](https://hono.dev/middleware/builtin/jwt)
- [lib-jitsi-meet/doc/tokens.md at master · jitsi/lib-jitsi-meet](https://github.com/jitsi/lib-jitsi-meet/blob/master/doc/tokens.md#token-structure)
- [jaas_demo/jaas-jwt-samples/js/index.js at main · 8x8/jaas_demo](https://github.com/8x8/jaas_demo/blob/main/jaas-jwt-samples/js/index.js#L7)
- [hono/src/utils/jwt/jwt.ts at main · honojs/hono](https://github.com/honojs/hono/blob/main/src/utils/jwt/jwt.ts#L40-L54)

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.
The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run dev`     start node server
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
