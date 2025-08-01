const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data
const dummyUsers = {
  'john.doe': {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    referralCode: 'johndoe2025',
    totalDonations: 15750,
    joinDate: '2025-01-15',
    rewards: [
      { id: 1, name: 'Bronze Badge', unlocked: true, description: 'Raised $1,000+' },
      { id: 2, name: 'Silver Badge', unlocked: true, description: 'Raised $5,000+' },
      { id: 3, name: 'Gold Badge', unlocked: true, description: 'Raised $10,000+' },
      { id: 4, name: 'Platinum Badge', unlocked: false, description: 'Raise $25,000+' },
      { id: 5, name: 'Diamond Badge', unlocked: false, description: 'Raise $50,000+' }
    ]
  },
  'jane.smith': {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    referralCode: 'janesmith2025',
    totalDonations: 8420,
    joinDate: '2025-01-20',
    rewards: [
      { id: 1, name: 'Bronze Badge', unlocked: true, description: 'Raised $1,000+' },
      { id: 2, name: 'Silver Badge', unlocked: true, description: 'Raised $5,000+' },
      { id: 3, name: 'Gold Badge', unlocked: false, description: 'Raised $10,000+' },
      { id: 4, name: 'Platinum Badge', unlocked: false, description: 'Raise $25,000+' },
      { id: 5, name: 'Diamond Badge', unlocked: false, description: 'Raise $50,000+' }
    ]
  }
};

// Routes
// Dummy signup endpoint
app.post('/api/signup', (req, res) => {
  const { name, email, username, password } = req.body;
  
  // Check if username already exists
  if (dummyUsers[username]) {
    return res.status(400).json({
      success: false,
      message: 'Username already exists'
    });
  }
  
  // Create new user with dummy data
  const newUser = {
    id: Object.keys(dummyUsers).length + 1,
    name: name,
    email: email,
    referralCode: username.toLowerCase().replace(/[^a-z0-9]/g, '') + '2025',
    totalDonations: 0, // New users start with $0
    joinDate: new Date().toISOString().split('T')[0],
    rewards: [
      { id: 1, name: 'Bronze Badge', unlocked: false, description: 'Raise $1,000+' },
      { id: 2, name: 'Silver Badge', unlocked: false, description: 'Raise $5,000+' },
      { id: 3, name: 'Gold Badge', unlocked: false, description: 'Raise $10,000+' },
      { id: 4, name: 'Platinum Badge', unlocked: false, description: 'Raise $25,000+' },
      { id: 5, name: 'Diamond Badge', unlocked: false, description: 'Raise $50,000+' }
    ]
  };
  
  // Add to dummy users
  dummyUsers[username] = newUser;
  
  res.json({
    success: true,
    message: 'Account created successfully',
    user: newUser
  });
});

// Dummy login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple dummy authentication - just check if username exists
  if (dummyUsers[username]) {
    res.json({
      success: true,
      message: 'Login successful',
      user: dummyUsers[username]
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Get user dashboard data
app.get('/api/dashboard/:username', (req, res) => {
  const { username } = req.params;
  
  if (dummyUsers[username]) {
    res.json({
      success: true,
      data: dummyUsers[username]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: Object.values(dummyUsers)
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard available at http://localhost:${PORT}/dashboard`);
  console.log(`🔧 API endpoints:`);
  console.log(`   POST /api/signup - Create new user account`);
  console.log(`   POST /api/login - Login with username/password`);
  console.log(`   GET /api/dashboard/:username - Get user dashboard data`);
  console.log(`   GET /api/users - Get all users`);
});
