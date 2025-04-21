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
3. Configure Google Maps API:
   - Create a Google Maps API key at [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Maps JavaScript API and Geocoding API
   - Add your API key to the `.env.local` file:
     ```
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

### Running the Project

To run the project locally:

1. Double-click the `run-project.bat` file (Windows)
2. Alternatively, open a terminal and run:
   ```
   npm run dev
   ```
3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Features

- Real-time bus tracking with Google Maps integration
- Route planning and visualization
- Schedule viewing
- Ticket booking
- District-wise route information
- Contact form for user feedback
- Driver information and calling functionality

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
