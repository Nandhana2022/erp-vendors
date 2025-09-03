# ERP Vendors Management System

A modern React application for managing vendors and their contact information in an ERP system.

## 🌐 Live Demo

[**View Live Application**](https://erp-vendors.vercel.app/login)

## 🚀 Features

- **User Authentication** - Secure login with JWT tokens
- **Vendor Management** - CRUD operations for vendors
- **Contact Management** - Manage contact persons for each vendor
- **Advanced UI** - Glassmorphism design with dark/light mode
- **Responsive Design** - Works on desktop and mobile devices
- **Search & Filter** - Advanced search and sorting capabilities
- **Form Validation** - Client-side validation for all forms

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v3 with custom design system
- **HTTP Client**: Axios for API calls
- **Forms**: React Hook Form with validation
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Heroicons
- **Deployment**: Vercel


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