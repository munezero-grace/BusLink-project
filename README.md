# BusLink Project

BusLink is a modern solution for public transportation in Rwanda. This project provides real-time bus tracking, route planning, and a seamless travel experience for users in Rwanda.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)

### First-time Setup

If you're setting up the project for the first time:

1. Install Node.js and npm if you haven't already
2. Run the setup script:
   - Double-click `setup-nextjs.bat` (Windows)
   - This will install all required dependencies

### Running the Project

To run the project locally:

1. Double-click the `run-project.bat` file (Windows)
2. Alternatively, open a terminal and run:
   ```
   npm run dev
   ```
3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Features

- Real-time bus tracking
- Route planning
- Schedule viewing
- Ticket booking
- District-wise route information

## Project Structure

- `/src/app`: Contains the main application code
  - `/components`: Reusable UI components
  - `/page.tsx`: Homepage
- `/public`: Static assets like images

## Development

To modify the project:

1. Edit files in the `src/app` directory
2. The changes will be hot-reloaded in your browser

## Building for Production

To build the project for production:

```
npm run build
```

Then to start the production server:

```
npm start
```
