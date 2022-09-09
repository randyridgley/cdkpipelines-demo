import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { LambdaDeploymentConfig, LambdaDeploymentGroup } from 'aws-cdk-lib/aws-codedeploy';
import { Alias, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';

/**
 * A stack for our simple Lambda-powered web service
 */
export class CdkpipelinesDemoStack extends Stack {
  /**
   * The URL of the API Gateway endpoint, for use in the integ tests
   */
  public readonly urlOutput: CfnOutput;
 
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The Lambda function that contains the functionality
    const handler = new Function(this, 'Lambda', {
      runtime: Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: Code.fromAsset(path.resolve(__dirname, '..', 'lambda')),
    });
    
    const alias = new Alias(this, 'apiHandlerStage', {
      aliasName: 'alias',
      version: handler.currentVersion,
    })

    // An API Gateway to make the Lambda web-accessible
    const gw = new LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler: alias,
    });
    
    new LambdaDeploymentGroup(this, 'canaryDeployment', {
      alias: alias,
      deploymentConfig: LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES,
      //alarms: [failureAlarm],
    })

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gw.url,
    });
  }
}