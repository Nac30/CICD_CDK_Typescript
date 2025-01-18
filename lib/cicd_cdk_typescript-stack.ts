import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './stage';


export class CicdCdkTypescriptStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('Nac30/CICD_CDK_Typescript', 'main'), //Remember to change 
        commands: ['npm ci', 
                   'npm run build', 
                   'npx cdk synth']
      })
    });

    const testingStage = pipeline.addStage(new MyPipelineAppStage(this, "test", {
      env: { account: "230473076149", region: "us-east-1" }
    }));

    testingStage.addPost(new ManualApprovalStep('Manual Apporval before Production'));

    const prodstage = pipeline.addStage(new MyPipelineAppStage(this, "prod",{
      env:{account:"230473076149",region:"us-east-1"}
    }));
  }
}