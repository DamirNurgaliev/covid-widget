import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from "aws-cdk-lib/aws-lambda";
import path from "path";
import * as apigwv2 from 'aws-cdk-lib/aws-apigateway';

interface CovidStatsApiProps {
}

export class CovidStatsApi extends Construct {
  readonly apiUrl: string

  constructor(scope: Construct, id: string, props?: CovidStatsApiProps) {
    super(scope, id);

    const getCovidStatsFunction = new lambda.NodejsFunction(this, 'GetCovidStatsFunction', {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, "..", "api", "getCovidStats", "index.ts"),
      handler: 'getCovidStats'
    })

    const api = new apigwv2.LambdaRestApi(this, 'myapi', {
      handler: getCovidStatsFunction,
      defaultCorsPreflightOptions: {
        allowOrigins: apigwv2.Cors.ALL_ORIGINS,
        allowMethods: apigwv2.Cors.ALL_METHODS // this is also the default
      }
    });

    this.apiUrl = api.url
  }
}