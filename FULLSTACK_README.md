# Complete Coupon Management System

A full-stack coupon management application built with React frontend and Node.js/Express backend.

## 🚀 Features

### Frontend (React)
- **Modern UI Design**: Clean, responsive interface with Tailwind CSS
- **Coupon Management**: Create, view, edit, and delete coupons
- **Real-time Validation**: Form validation with immediate feedback
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Toast Notifications**: SweetAlert2 for user feedback
- **Modal Editing**: In-place coupon editing

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for coupons
- **Data Validation**: Joi validation for all endpoints
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Frontend-backend communication
- **Rate Limiting**: API protection against abuse
- **Security**: Helmet.js for security headers
- **Flexible Storage**: MongoDB with in-memory fallback

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/get-coupons` | Retrieve all coupons |
| POST | `/api/add-coupon` | Create a new coupon |
| PUT | `/api/update-coupon/:id` | Update existing coupon |
| DELETE | `/api/delete-coupon/:id` | Delete a coupon |
| GET | `/api/coupons/stats` | Get coupon statistics |
| GET | `/api/coupons/:id` | Get single coupon by ID |

## 🛠 Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **SweetAlert2**: Beautiful alerts and notifications
- **React Scripts**: Development and build tools

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB/Mongoose**: Database and ODM (with in-memory fallback)
- **Joi**: Data validation
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Express Rate Limit**: API rate limiting

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - uses in-memory database as fallback)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coupon-management-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend development server**
   ```bash
   # In the root directory
   npm start
   # Frontend runs on http://localhost:3000
   ```

3. **Alternative: Run on different port**
   ```bash
   npm run start:3001
   # Frontend runs on http://localhost:3001
   ```

### Backend Server Health Check
Visit `http://localhost:5000/health` to verify the backend is running.

## 📊 Data Model

### Coupon Schema
```javascript
{
  name: String,           // Coupon name (required)
  code: String,           // Unique coupon code (required)
  description: String,    // Coupon description (required)
  discount: Number,       // Discount percentage 0-100 (required)
  type: String,          // "student" or "group" (required)
  expiryDate: Date,      // Expiry date (required)
  numberOfUsages: Number, // For group coupons only
  isActive: Boolean,     // Active status (default: true)
  usedCount: Number,     // Usage tracking (default: 0)
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-generated
}
```

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coupon_management
CORS_ORIGIN=http://localhost:3000
```

### Frontend API Configuration
The frontend is configured to connect to the backend at `http://localhost:5000/api`.

## 🎯 Usage

### Creating a Coupon
1. Fill in the coupon form in the left panel
2. Select coupon type (Student or Group)
3. For group coupons, specify number of usages
4. Click "Create Coupon"

### Managing Coupons
- **View**: All coupons are displayed in the table
- **Edit**: Click the "Edit" button on any coupon
- **Delete**: Click the "Delete" button (with confirmation)
- **Search**: Use query parameters to filter coupons

### API Usage Examples

**Get all coupons:**
```bash
curl http://localhost:5000/api/get-coupons
```

**Create a coupon:**
```bash
curl -X POST http://localhost:5000/api/add-coupon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Sale",
    "code": "SUMMER25",
    "description": "25% off summer courses",
    "discount": 25,
    "type": "student",
    "expiryDate": "2025-12-31"
  }'
```

**Update a coupon:**
```bash
curl -X PUT http://localhost:5000/api/update-coupon/1 \
  -H "Content-Type: application/json" \
  -d '{"discount": 30}'
```

**Delete a coupon:**
```bash
curl -X DELETE http://localhost:5000/api/delete-coupon/1
```

## 🏗 Architecture

### Frontend Architecture
```
src/
├── coupon-management-admin/
│   ├── CouponManagement.jsx    # Main component
│   ├── CreateCouponForm.jsx    # Form component
│   ├── CouponList.jsx          # Table component
│   ├── EditCouponModal.jsx     # Edit modal
│   ├── api.js                  # API functions
│   └── CouponManagement.css    # Styles
└── App.js                      # Root component
```

### Backend Architecture
```
backend/
├── config/
│   ├── database.js             # MongoDB connection
│   └── memoryDatabase.js       # In-memory fallback
├── controllers/
│   └── simpleCouponController.js # API logic
├── middleware/
│   ├── errorHandler.js         # Error handling
│   └── validation.js           # Input validation
├── models/
│   └── Coupon.js              # Mongoose schema
├── routes/
│   └── couponRoutes.js        # API routes
└── server.js                  # Main server file
```

## 🔒 Security Features

- **Input Validation**: Joi schema validation
- **Rate Limiting**: Prevents API abuse
- **CORS Configuration**: Controlled cross-origin access
- **Security Headers**: Helmet.js middleware
- **Error Sanitization**: No sensitive data exposure

## 🎨 UI Features

- **Responsive Design**: Works on all screen sizes
- **Modern Styling**: Gradient backgrounds and shadows
- **Interactive Elements**: Hover effects and transitions
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the build/ directory to your hosting service
```

### Backend Deployment
1. Set production environment variables
2. Configure MongoDB connection
3. Deploy to your preferred hosting service (Heroku, AWS, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 5000 is available
- Verify Node.js version
- Check environment variables

**Frontend API calls fail:**
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API endpoints

**Database connection issues:**
- MongoDB not required (uses in-memory fallback)
- Check MongoDB connection string if using MongoDB

### Debug Mode
Run backend with debug logging:
```bash
DEBUG=* npm start
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check server logs for errors
4. Verify all dependencies are installed
