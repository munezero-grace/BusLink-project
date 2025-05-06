# BusLink Project

BusLink is a modern solution for public transportation in Rwanda. This project provides real-time bus tracking, route planning, booking capabilities, and performance monitoring for all stakeholders in Rwanda's transport ecosystem.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)

### First-time Setup

If you're setting up the project for the first time:

1. Install Node.js and npm if you haven't already
2. Run the setup script:
   - Double-click `setup-project.bat` (Windows)
   - This will install all required dependencies
3. Configure Mapbox API:
   - Create a Mapbox API key at [Mapbox](https://account.mapbox.com/)
   - Add your API key to the `.env.local` file:
     ```
     NEXT_PUBLIC_MAPBOX_TOKEN=your_api_key_here
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

### User Features
- Real-time bus tracking with Mapbox integration
- Route planning and visualization
- Schedule viewing
- Seat booking
- Contact form for user feedback
- User account management

### Driver Features
- Passenger list management
- Performance metrics dashboard
- Vehicle efficiency monitoring
- Route navigation

### Admin Features
- Driver management (add, block, remove drivers)
- Route management
- Feedback monitoring
- Performance tracking
- Arrival time monitoring

## Project Structure

- `/src/app`: Contains the main application code
  - `/components`: Reusable UI components
    - `/home`: Home page components
    - `/layout`: Layout components (Navigation, Footer)
    - `/maps`: Map integration components
    - `/ui`: Reusable UI elements
  - `/dashboard`: Dashboard pages for different user roles
    - `/admin`: Admin dashboard
    - `/driver`: Driver dashboard
    - `/user`: User dashboard
  - `/auth`: Authentication pages
  - `/booking`: Booking flow
  - `/tracking`: Bus tracking
  - `/page.tsx`: Homepage
- `/public`: Static assets like images
- `/src/utils`: Utility functions
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions

## Additional Packages

The project uses the following key packages:

- Next.js - React framework for server-rendered applications
- Mapbox GL - For map visualization and tracking
- React Query - For data fetching
- Chart.js - For data visualization
- Tailwind CSS - For styling
- React Icons - For icons

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

## Contributors

- [Your Name] - Initial development and architecture
