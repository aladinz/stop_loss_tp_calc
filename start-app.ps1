# PowerShell script to start both the Node.js proxy server and React app
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd server; npm start'
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'npm start'
