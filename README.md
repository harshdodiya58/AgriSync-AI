# 🌾 AgriSync AI — Farm-to-Market Intelligence Platform

A production-ready full-stack web application that synchronizes agricultural crop supply with food market demand using AI-powered predictive analytics.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** (Dark theme with glassmorphism)
- **Recharts** (Data visualization)
- **JWT Authentication** (Role-based access)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **bcryptjs** (Password hashing)
- **JWT** (Token-based auth)

## 📁 Project Structure

```
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic (auth, yield, demand, sync, alerts)
│   ├── middleware/      # JWT auth & role-based access
│   ├── models/          # Mongoose schemas (User, YieldData, DemandData, Synchronization)
│   ├── routes/          # API routes
│   ├── seed/            # Database seed script
│   ├── server.js        # Express server entry point
│   └── .env             # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js pages (landing, login, register, dashboard, etc.)
│   │   ├── components/  # Reusable components (Sidebar, Navbar, DashboardLayout)
│   │   ├── context/     # Auth context provider
│   │   └── lib/         # API helper functions
│   └── .env.local       # Frontend environment variables
│
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (running locally on port 27017 or MongoDB Atlas URI)

### 1. Clone & Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

### 2. Configure Environment Variables

Backend `.env` is already configured for local MongoDB:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/farm-to-market
JWT_SECRET=farm_to_market_super_secret_key_2024
JWT_EXPIRE=7d
```

Frontend `.env.local` is already configured:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This will create:
- 3 demo users (farmer, processor, admin)
- Sample synchronization/alert data

**Demo Credentials:**
- 👨‍🌾 Farmer: `farmer@example.com` / `password123`
- 🏭 Processor: `processor@example.com` / `password123`
- 👑 Admin: `admin@example.com` / `password123`

### 4. Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```
Backend runs on: `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

### 5. Open in Browser

Navigate to: **http://localhost:3000**

## 🎯 Features

### 1️⃣ **AI Yield Prediction**
- Input: Crop type, region, land size, soil type, weather forecast
- Output: Predicted yield (tons), risk score, confidence percentage
- Simulated AI logic using crop productivity factors, soil multipliers, and weather impact

### 2️⃣ **Demand Forecasting**
- 30-60 day time-series demand prediction
- Recharts line chart visualization
- Festival spike detection (Diwali, Christmas, etc.)
- Regional demand breakdown

### 3️⃣ **Supply-Demand Synchronization**
- Compare farm supply vs market demand
- Visual bar chart comparison
- Imbalance calculation (surplus/shortage)
- AI-powered recommendations for region diversion

### 4️⃣ **Smart Alerts**
- Real-time oversupply/shortage alerts
- Severity levels (low, medium, high, critical)
- Filterable alert dashboard
- Actionable recommendations

### 5️⃣ **Role-Based Dashboards**
- **Farmer**: Yield prediction, demand forecast, sync, alerts
- **Processor**: Demand forecast, sync, alerts
- **Admin**: Full system access + admin panel with stats

## 🎨 UI/UX Highlights

- **Dark Theme**: Deep blue-black background (#0a0f1e)
- **Gradient Accents**: Green (#22c55e) + Blue (#3b82f6) AI theme
- **Glassmorphism**: Frosted glass cards with backdrop blur
- **Micro-animations**: Hover effects, smooth transitions, pulse rings
- **Responsive Design**: Mobile-friendly sidebar and layouts
- **Premium Typography**: Inter font from Google Fonts

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user (protected)

### Yield Prediction
- `POST /api/yield/predict` — Predict crop yield (protected)
- `GET /api/yield/history` — Get prediction history (protected)

### Demand Forecast
- `GET /api/demand/forecast?cropType=wheat&region=north&days=30` — Get demand forecast (protected)

### Synchronization
- `POST /api/sync/compare` — Compare supply vs demand (protected)
- `GET /api/sync/history` — Get sync history (protected)

### Alerts
- `GET /api/alerts?type=oversupply&severity=high` — Get alerts (protected)
- `GET /api/alerts/stats` — Get dashboard stats (protected)

## 🔐 Security

- **Password Hashing**: bcrypt with salt rounds = 12
- **JWT Tokens**: 7-day expiration
- **Role-Based Access**: Middleware checks user role for protected routes
- **CORS**: Configured for localhost:3000

## 🧪 Testing

1. **Register** a new user with role "farmer"
2. **Login** and verify redirect to dashboard
3. **Navigate to Yield Prediction** → Fill form → Submit → Verify results
4. **Navigate to Demand Forecast** → Verify chart renders with 30-day data
5. **Navigate to Synchronization** → Input supply/demand → Verify chart and recommendations
6. **Navigate to Alerts** → Verify alert cards display

## 🛠️ Development Scripts

### Backend
```bash
npm start       # Start server
npm run dev     # Start server (same as start)
npm run seed    # Seed database with demo data
```

### Frontend
```bash
npm run dev     # Start Next.js dev server
npm run build   # Build for production
npm start       # Start production server
```

## 📝 Notes

- **MongoDB**: Ensure MongoDB is running before starting the backend
- **Ports**: Backend (5000), Frontend (3000)
- **AI Logic**: Currently simulated with mathematical models (crop factors, weather impact, etc.)
- **Production**: For production deployment, update MONGO_URI to MongoDB Atlas and configure proper JWT secrets

## 🎉 Built With

- ❤️ Passion for agriculture technology
- 🧠 AI-powered intelligence
- 🌍 Vision for sustainable farming

---

**© 2024 AgriSync AI — Bridging Farms and Markets with Intelligence**
