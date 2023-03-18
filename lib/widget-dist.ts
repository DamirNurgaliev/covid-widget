import { exec } from 'child_process';
import path from 'path';

export default class WidgetDist {
    constructor(apiUrl: string) {
        exec("npm run build ", { cwd: path.join(__dirname, "../widget"), env: { LAMBDA_API_URL: apiUrl } })
    }
}