import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildConfig } from '../environment/build-config';
import { BaseStack } from './base-stack';

export interface DefaultStackProps extends StackProps {
  
}

export class DefaultStack extends BaseStack {
  private readonly buildConfig: BuildConfig;

  constructor(scope: Construct, id: string, props: DefaultStackProps, buildConfig: BuildConfig) {
    super(scope, id, props, buildConfig);
    this.buildConfig = buildConfig;
    console.log(this.buildConfig.Parameters.TestParameter);
  }
}
