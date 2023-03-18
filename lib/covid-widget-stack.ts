import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CovidStatsApi } from './api';
import WidgetDist from './widget-dist';
import BucketDist from './BucketDist';

export class CovidWidgetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cs = new CovidStatsApi(this, 'myApi')
    new WidgetDist(cs.apiUrl)
    new BucketDist(this, 'bucketDist')
  }
}
