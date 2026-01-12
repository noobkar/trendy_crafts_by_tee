# Firebase Analytics Setup Guide

Follow these steps to configure Firebase Analytics for your website.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `trendy-crafts-web` (or your preferred name)
4. Optionally enable Google Analytics (recommended)
5. Click **"Create project"**

## Step 2: Add a Web App to Your Project

1. In your Firebase project dashboard, click the **Web icon** (</>) to add a web app
2. Enter an app nickname: `Trendy Crafts Website`
3. Check **"Also set up Firebase Hosting"** (optional, for future deployment)
4. Click **"Register app"**

## Step 3: Get Your Firebase Configuration

After registering your app, you'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

## Step 4: Update Your Code

1. Open `src/config/firebaseConfig.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Step 5: Enable Analytics in Firebase Console

1. In Firebase Console, go to **Analytics** > **Dashboard**
2. Verify that Analytics is enabled
3. You should start seeing data within 24 hours

## What's Being Tracked?

The analytics implementation tracks:

### Page Views
- Automatically tracked on every route change
- Includes geolocation data (lat/long)

### User Events
- **add_to_cart**: When a product is added to cart
- **remove_from_cart**: When a product is removed from cart
- **begin_checkout**: When user starts checkout process
- **purchase**: When an order is successfully placed
- **search**: When user searches for products
- **contact_form_submit**: When contact form is submitted

### Custom Parameters
Each event includes:
- Latitude and longitude (if user grants permission)
- Timestamp
- Event-specific data (product details, order value, etc.)

## Viewing Analytics Data

1. Go to Firebase Console > Analytics > Dashboard
2. View real-time events: Analytics > DebugView (requires enabling debug mode)
3. View event reports: Analytics > Events
4. View user location: Analytics > Demographics > Locations

## Privacy Considerations

⚠️ **Important**: This implementation requests geolocation permission from users. Make sure to:

1. Add a privacy policy to your website
2. Inform users about data collection
3. Consider adding a cookie consent banner (see optional implementation in plan)
4. Comply with GDPR, CCPA, and other privacy regulations in your region

## Testing

To test analytics in development:

1. Open browser console
2. Look for analytics logging messages like:
   - "Analytics initialized with location tracking"
   - "Page view tracked: Shop"
   - "Event tracked: add_to_cart"

## Troubleshooting

- **No data showing**: Wait 24-48 hours for initial data to populate
- **Geolocation not working**: User may have denied permission
- **Events not logging**: Check browser console for errors
- **Invalid configuration**: Verify all Firebase config values are correct
