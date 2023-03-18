import { APIGatewayProxyEventV2, Context, APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import axios from "axios";

export const getCovidStats = async (event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyStructuredResultV2> => {
  const data = await axios.get("https://api.covid19api.com/summary").then(res => res.data)
  const plData = data["Countries"].filter(result => result["Country"] === "Poland")

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Headers' : 'Content-Type',
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'OPTIONS,GET,HEAD' },
    body: JSON.stringify(plData)
  }
}