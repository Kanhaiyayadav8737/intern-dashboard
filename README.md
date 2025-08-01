# 🎯 Intern Dashboard

A simple full-stack web application for tracking intern fundraising progress with dummy authentication and static data.

## Features

### Frontend
- **Dummy Login/Signup Page**: No real authentication required
- **Dashboard Display**:
  - Intern name and profile info
  - Dummy referral code (e.g., `johndoe2025`)
  - Total donations raised (fetched from backend)
  - Rewards/achievements section with unlockable badges
  - Progress tracking with visual milestones

### Backend
- **REST API** built with Node.js + Express
- **Dummy Data**: Pre-configured user profiles with fundraising data
- **CORS Enabled**: For frontend-backend communication
- **Static File Serving**: Serves the frontend files

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Styling**: Modern CSS with gradients and animations
- **Data**: In-memory dummy data (no database required)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the project directory:
   ```bash
   cd intern-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### Development Mode
For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/login` - Dummy login endpoint
  ```json
  {
    "username": "john.doe",
    "password": "any_password"
  }
  ```

### Dashboard Data
- `GET /api/dashboard/:username` - Get user dashboard data
- `GET /api/users` - Get all users (for testing)

## Demo Users

Try logging in with these dummy accounts:

| Username | Name | Referral Code | Donations |
|----------|------|---------------|-----------|
| `john.doe` | John Doe | `johndoe2025` | $15,750 |
| `jane.smith` | Jane Smith | `janesmith2025` | $8,420 |

*Any password works for demo purposes*

## Project Structure

```
intern-dashboard/
├── server.js              # Express server and API routes
├── package.json           # Dependencies and scripts
├── README.md              # This file
└── public/                # Frontend files
    ├── index.html         # Login page
    ├── dashboard.html     # Dashboard page
    ├── styles.css         # All CSS styles
    ├── login.js           # Login functionality
    └── dashboard.js       # Dashboard functionality
```

## Features Implemented

✅ **Dummy Login/Signup**: Working forms with validation  
✅ **Dashboard Display**: Shows intern name, referral code, donations  
✅ **REST API**: Returns dummy data for users  
✅ **Rewards System**: Badge unlocking based on donation amounts  
✅ **Progress Tracking**: Visual progress bar with milestones  
✅ **Responsive Design**: Works on desktop and mobile  
✅ **Modern UI**: Clean, professional design with animations  

## Testing with Postman

You can test the API endpoints directly:

1. **Login**: `POST http://localhost:3000/api/login`
2. **Dashboard Data**: `GET http://localhost:3000/api/dashboard/john.doe`
3. **All Users**: `GET http://localhost:3000/api/users`

## Customization

- **Add New Users**: Edit the `dummyUsers` object in `server.js`
- **Modify Rewards**: Update the rewards array for each user
- **Change Styling**: Edit `public/styles.css`
- **Add Features**: Extend the API routes and frontend JavaScript

## License

MIT License - Feel free to use this project for learning and development!
