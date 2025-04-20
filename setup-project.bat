@echo off
echo Setting up BusLink project...

echo Step 1: Installing dependencies...
cd /d C:\Users\user\Desktop\BusLink-project
call npm install

echo Step 2: Git setup...
git reset
git add .
git commit -m "Initial commit for BusLink project"

echo Step 3: Starting development server...
call npm run dev

echo Setup complete! If the server doesn't start, run 'npm run dev' manually.
