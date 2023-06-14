import { spawn } from 'child_process';
const mlDir = (__dirname + "/../machine-learning/");
const scriptsDir = mlDir + "scripts/";

export function callPy(filename: string, args: any[]) {
    return new Promise(function (success, reject) {
        var response: any[] = [];

        const pythonProcess = spawn('python', [scriptsDir + filename, ...args]);

        pythonProcess.stdout.on('data', (data) => {
            response.push(JSON.parse(data.toString()));
        });
        
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                success(response);
            } else {
                reject(code);
            }
        });
    });
}
