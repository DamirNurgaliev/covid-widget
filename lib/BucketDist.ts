import { RemovalPolicy } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import path from 'path';

export default class BucketDist extends Construct {
  constructor(scope: Construct, id: string, props?: {}) {
    super(scope, id);

    const covidWidgetDist = new Bucket(this, 'CovidWidgetDist', {
      bucketName: 'covid-widget-dist',
      removalPolicy: RemovalPolicy.RETAIN,
      publicReadAccess: true,
    });
    
    new s3deploy.BucketDeployment(this, 'DeployFiles', {
      sources: [s3deploy.Source.asset(path.join(__dirname, "../widget/dist"))],
      destinationBucket: covidWidgetDist,
    });
  }
}