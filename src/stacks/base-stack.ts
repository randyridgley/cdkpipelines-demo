import { NestedStack, NestedStackProps, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BuildConfig } from '../environment/build-config';

/**
 * Default tags for all stacks
 */
export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props);

    //Tagging
    Tags.of(this).add('Environment', `${buildConfig.Environment}`);
    Tags.of(this).add('Application', `${buildConfig.App}`);
    Tags.of(this).add('Version', `${buildConfig.Version}`);
    Tags.of(this).add('Stack', this.stackName);
  }
}

/**
 * Add tags to all nested stacks
 */
export class NestedBaseStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    if (this.nestedStackParent?.tags.hasTags) {
      Object.entries(this.nestedStackParent.tags.tagValues()).forEach(([key, value]) => {
        this.tags.setTag(key, value);
      });
    }
  }
}
