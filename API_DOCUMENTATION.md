# Coupon Management API Documentation

This document outlines the API endpoints required for the coupon management frontend to function correctly.

---

### What the Frontend Needs from the Backend

The frontend needs the backend to provide the following data for each coupon:

*   `id`: A unique identifier for the coupon (e.g., a number or a string).
*   `name`: The name of the coupon (e.g., "Summer Sale").
*   `code`: The coupon code that users will enter (e.g., "SUMMER20").
*   `description`: A brief explanation of the coupon (e.g., "20% off for summer").
*   `discount`: The discount percentage (e.g., 20).
*   `expiryDate`: The expiry date of the coupon (e.g., "2025-12-31").
*   `type`: The type of coupon, which can be either "student" or "group".
*   `numberOfUsages` (optional): The number of times a group coupon can be used. This field is only applicable to group coupons.

---

### What the Frontend Sends to the Backend

Here is a breakdown of what the frontend sends to the backend for each API call:

#### 1. Get All Coupons

*   **API Call:** `GET /api/get-coupons`
*   **What it sends:** Nothing. This is a simple GET request to fetch all coupons.

#### 2. Create a New Coupon

*   **API Call:** `POST /api/add-coupon`
*   **What it sends:** A JSON object in the request body with the following details:
    *   `name` (string)
    *   `code` (string)
    *   `description` (string)
    *   `discount` (number)
    *   `expiryDate` (string)
    *   `type` (string: "student" or "group")
    *   `numberOfUsages` (number, optional)
*   **Example:**
    ```json
    {
      "name": "New Year Sale",
      "code": "NEWYEAR25",
      "description": "25% off for the new year",
      "discount": 25,
      "expiryDate": "2026-01-15",
      "type": "group",
      "numberOfUsages": 50
    }
    ```

#### 3. Update an Existing Coupon

*   **API Call:** `PUT /api/update-coupon/:id`
*   **What it sends:**
    *   The `id` of the coupon to be updated in the URL.
    *   A JSON object in the request body containing the fields to be updated.
*   **Example:** To update the `numberOfUsages` of a group coupon with `id` 4:
    ```json
    {
      "numberOfUsages": 75
    }
    ```

#### 4. Delete a Coupon

*   **API Call:** `DELETE /api/delete-coupon/:id`
*   **What it sends:** The `id` of the coupon to be deleted in the URL.