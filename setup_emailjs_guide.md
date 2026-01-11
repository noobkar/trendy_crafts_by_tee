# How to Configure EmailJS

You need three keys from your [EmailJS Dashboard](https://dashboard.emailjs.com/).

## 1. Service ID
1. Go to **"Email Services"**.
2. Click **"Add New Service"** -> **"Gmail"**.
3. Connect your account.
4. Copy the **Service ID** (e.g., `service_xyz123`).

## 2. Template ID
1. Go to **"Email Templates"**.
2. Click **"Create New Template"**.
3. Use this content:
   - **Subject**: `Order from {{from_name}}`
   - **Body**: `{{message}}`
4. Save and copy the **Template ID** (e.g., `template_abc456`).

## 3. Public Key
1. Go to **"Account"** (top right).
2. Copy the **Public Key**.

## 4. Update Code
Paste these into `src/services/emailService.js`.
