import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CicdCdkTypescriptStack } from '../lib/cicd_cdk_typescript-stack';

const app = new cdk.App();
new CicdCdkTypescriptStack(app,'CicdCdkTypescriptStack',{
  env:{
    account:'230473076149',
    region:'us-east-1'
  }
})

app.synth();