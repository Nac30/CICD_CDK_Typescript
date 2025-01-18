import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MyLambdaStack } from "./lamda-stack";

export class MyPipelineAppStage extends cdk.Stage{

    constructor(scope:Construct,stageName:string, props?:cdk.StackProps){
        super(scope,stageName,props);

        const LambdaStack = new MyLambdaStack(this,'LambdaStack',stageName);
    }
}