# ERP Vendors Module

A React application for managing vendors and their contact persons in an ERP system.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and update with your API URL:VITE_API_BASE_URL=https://quicks.ae/erp/api
4. Start the development server: `npm run dev`

## Assumptions

- Using mock data for vendors and contacts as the real API endpoints might not be available
- Authentication token is stored in localStorage for simplicity
- Basic validation is implemented for forms

## Credentials Handling

- The login functionality uses the provided API endpoint
- On successful login, the Bearer token is stored in localStorage
- The token is automatically attached to all subsequent API requests

## Features Implemented

- User authentication with login/logout
- Vendors list with search, sort, and pagination
- Add/Edit vendor forms with validation
- Vendor details view with contact persons management
- Responsive UI with Tailwind CSS

## Testing

To test the application:

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:5173
3. Use any credentials to login (mock authentication)
4. Test all features: vendor listing, search, add/edit, contact management