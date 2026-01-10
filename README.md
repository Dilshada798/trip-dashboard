# Trip Management Dashboard

A modern, responsive web application for monitoring and managing vehicle trips. Built with React, TypeScript, and Material-UI.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.7-007FFF?logo=mui)

## Features

- **Real-time Statistics Dashboard** - View total, active, completed, and cancelled trips at a glance
- **Status Filtering** - Filter trips by status (Active, Completed, Cancelled, or All)
- **Interactive Data Table** - Sortable and organized trip information display
- **Modern UI/UX** - Beautiful gradient design with smooth animations
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Mock Data Support** - No backend required - works entirely with mock data
- **Auto-refresh** - Manual refresh button to reload trip data
- **Type-Safe** - Full TypeScript support for better development experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dilshada798/trip-dashboard.git
   cd trip-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload when you make changes

## Project Structure

```
trip-dashboard/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── StatusChip.tsx  # Status badge component
│   │   ├── StatusFilter.tsx # Filter buttons component
│   │   └── TripTable.tsx   # Data table component
│   ├── data/              # Mock data and types
│   │   └── trips.ts       # Trip data and TypeScript interfaces
│   ├── hooks/             # Custom React hooks
│   │   └── useTrips.ts    # Trip data management hook
│   ├── pages/             # Page components
│   │   └── Dashboard.tsx  # Main dashboard page
│   ├── services/          # API/service layer
│   │   └── api.ts         # Mock API functions
│   ├── App.tsx            # Root component
│   └── index.tsx          # Entry point
├── package.json
└── README.md
```

## Technologies Used

- **React 18.3.1** - UI library
- **TypeScript 5.0** - Type safety
- **Material-UI (MUI) 7.3.7** - Component library
- **React Scripts 5.0.1** - Build tooling
- **Emotion** - CSS-in-JS styling

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder. Optimized and minified for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App to get full control over configuration.

## Usage

### Viewing Trips
- The dashboard displays all trips in a table format
- Statistics cards show overview of trip statuses
- Use the filter buttons to view trips by specific status

### Filtering
- Click on status filter buttons (All, Active, Completed, Cancelled)
- The table automatically updates to show filtered results
- Statistics remain based on all trips

### Refreshing Data
- Click the refresh button in the top-right corner
- Data will reload from the mock data source

## Configuration

### Mock Data
The application uses mock data stored in `src/data/trips.ts`. You can modify this file to add, remove, or update trip data.

### Customization
- **Colors & Theme**: Modify Material-UI theme in `src/pages/Dashboard.tsx`
- **Data Structure**: Update the `Trip` interface in `src/data/trips.ts`
- **API Integration**: Replace mock functions in `src/services/api.ts` with real API calls

## Data Model

```typescript
interface Trip {
  id: number;
  vehicle: string;      // Vehicle identifier (e.g., "PM-101")
  source: string;       // Trip origin
  destination: string;  // Trip destination
  status: TripStatus;  // "Active" | "Completed" | "Cancelled"
}
```

## Features in Detail

### Statistics Dashboard
- **Total Trips**: Count of all trips
- **Active Trips**: Currently ongoing trips
- **Completed Trips**: Successfully finished trips
- **Cancelled Trips**: Cancelled trips

### Status Filtering
- Filter by: All, Active, Completed, or Cancelled
- Real-time table updates
- Maintains statistics across all trips

### Data Table
- Displays vehicle ID, source, destination, and status
- Color-coded status indicators
- Responsive layout

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Author

**Dilshada798**
- GitHub: [@Dilshada798](https://github.com/Dilshada798)

## Acknowledgments

- Material-UI for the excellent component library
- Create React App for the project scaffolding
- React team for the amazing framework

---

