@echo off
echo Installing dependencies for BusLink project...
cd /d C:\Users\user\Desktop\BusLink-project
npm install next@latest react@latest react-dom@latest
npm install tailwindcss@latest autoprefixer@latest postcss@latest react-icons@latest
npm install -D @types/node @types/react typescript eslint eslint-config-next
echo Dependencies installation complete!
pause
