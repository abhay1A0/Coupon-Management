# API Requirements for Coupon Management System

## Base URL
The application expects APIs to be available at: `https://coupon-api.onrender.com/api`

## Required API Endpoints

### 1. GET /api/get-coupons
**Description:** Retrieve all coupons  
**Method:** GET  
**Authentication:** Required (if applicable)  
**Response Format:**
```json
[
  {
    "id": 1,
    "name": "Summer Sale",
    "code": "SUMMER20",
    "description": "20% off for summer courses",
    "discount": 20,
    "type": "group",
    "expiryDate": "2025-12-31",
    "numberOfUsages": 100,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Student Discount",
    "code": "STUDENT10",
    "description": "10% off for students",
    "discount": 10,
    "type": "student",
    "expiryDate": "2025-10-31",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### 2. POST /api/add-coupon
**Description:** Create a new coupon  
**Method:** POST  
**Authentication:** Required (if applicable)  
**Request Body:**
```json
{
  "name": "Summer Sale",
  "code": "SUMMER20",
  "description": "20% off for summer courses",
  "discount": 20,
  "type": "group",
  "expiryDate": "2025-12-31",
  "numberOfUsages": 100
}
```

**Response Format:**
```json
{
  "id": 1,
  "name": "Summer Sale",
  "code": "SUMMER20",
  "description": "20% off for summer courses",
  "discount": 20,
  "type": "group",
  "expiryDate": "2025-12-31",
  "numberOfUsages": 100,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 3. PUT /api/update-coupon/:id
**Description:** Update an existing coupon  
**Method:** PUT  
**Authentication:** Required (if applicable)  
**URL Parameters:**
- `id` (required): The ID of the coupon to update

**Request Body:**
```json
{
  "name": "Updated Summer Sale",
  "code": "SUMMER25",
  "description": "25% off for summer courses",
  "discount": 25,
  "type": "group",
  "expiryDate": "2025-12-31",
  "numberOfUsages": 150
}
```

**Response Format:**
```json
{
  "id": 1,
  "name": "Updated Summer Sale",
  "code": "SUMMER25",
  "description": "25% off for summer courses",
  "discount": 25,
  "type": "group",
  "expiryDate": "2025-12-31",
  "numberOfUsages": 150,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### 4. DELETE /api/delete-coupon/:id
**Description:** Delete a coupon  
**Method:** DELETE  
**Authentication:** Required (if applicable)  
**URL Parameters:**
- `id` (required): The ID of the coupon to delete

**Response Format:**
```json
{
  "message": "Coupon deleted successfully",
  "id": 1
}
```

## Data Schema

### Coupon Object
```typescript
interface Coupon {
  id: number;
  name: string;
  code: string;
  description: string;
  discount: number; // Percentage (0-100)
  type: 'student' | 'group';
  expiryDate: string; // ISO date string (YYYY-MM-DD)
  numberOfUsages?: number; // Only for group coupons
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}
```

## Validation Rules

### Coupon Code
- Must be unique across all coupons
- Must be alphanumeric with no spaces
- Recommended length: 6-20 characters

### Discount
- Must be a number between 0 and 100
- Represents percentage discount

### Type
- Must be either 'student' or 'group'
- If type is 'group', numberOfUsages field is required
- If type is 'student', numberOfUsages field is optional/ignored

### Expiry Date
- Must be a valid date
- Must be in the future
- Format: YYYY-MM-DD

### Number of Usages
- Only applicable for group coupons
- Must be a positive integer
- Default: unlimited (if not specified)

## Error Handling

All endpoints should return appropriate HTTP status codes:

### Success Codes
- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST requests
- `204 No Content` - Successful DELETE requests

### Error Codes
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Coupon not found
- `409 Conflict` - Duplicate coupon code
- `500 Internal Server Error` - Server error

### Error Response Format
```json
{
  "error": {
    "code": "DUPLICATE_COUPON_CODE",
    "message": "A coupon with this code already exists",
    "details": "The coupon code 'SUMMER20' is already in use"
  }
}
```

## Additional Features (Optional)

### Coupon Usage Tracking
If you want to track coupon usage, you might want to add:
- `usedCount` field to track how many times a coupon has been used
- `isActive` field to enable/disable coupons
- `usageHistory` endpoint to track who used the coupon and when

### Bulk Operations
- `POST /api/bulk-create-coupons` - Create multiple coupons at once
- `PUT /api/bulk-update-coupons` - Update multiple coupons at once
- `DELETE /api/bulk-delete-coupons` - Delete multiple coupons at once

### Search and Filter
- `GET /api/get-coupons?search=summer&type=group&status=active`
- Add query parameters for filtering and searching

## Testing

You can test the APIs using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)
- Insomnia

Example curl commands:

```bash
# Get all coupons
curl -X GET https://coupon-api.onrender.com/api/get-coupons

# Create a new coupon
curl -X POST https://coupon-api.onrender.com/api/add-coupon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Coupon",
    "code": "TEST10",
    "description": "Test description",
    "discount": 10,
    "type": "student",
    "expiryDate": "2025-12-31"
  }'

# Update a coupon
curl -X PUT https://coupon-api.onrender.com/api/update-coupon/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Coupon",
    "discount": 15
  }'

# Delete a coupon
curl -X DELETE https://coupon-api.onrender.com/api/delete-coupon/1
```
