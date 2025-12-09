# HealUSA - EmailJS Setup Guide

## 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Copy the **Service ID** (e.g., `service_abc123`)

## 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Subject: New Appointment Request - {{patient_name}}

New appointment request received:

Patient Information:
- Name: {{patient_name}}
- WeChat/Email: {{patient_email}}

Appointment Details:
- Procedure: {{procedure_type}}
- Date: {{appointment_date}}
- Time: {{appointment_time}}

Additional Notes:
{{additional_notes}}

Please follow up with the patient as soon as possible.
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

## 4. Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `abcDEF123xyz`)

## 5. Update .env File

Update the `.env` file with your credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcDEF123xyz
```

## 6. Update Recipient Email

In `src/pages/Appointment.tsx`, find this line (around line 57):

```typescript
to_email: 'your-email@example.com', // Replace with your email
```

Replace `'your-email@example.com'` with your actual email address where you want to receive appointment notifications.

## 7. Test the Form

1. Run `npm run dev`
2. Go to the appointment page
3. Fill out and submit the form
4. Check your email inbox

## Troubleshooting

- **Email not sending?** Check your Service ID and Template ID
- **Template variables not working?** Make sure variable names match exactly
- **CORS errors?** Make sure you're using the correct Public Key
- **Rate limiting?** Free tier has 200 emails/month limit

## Security Notes

- Never commit `.env` file to git (add to `.gitignore`)
- Public Key is safe to use in frontend
- Free tier: 200 emails/month
- For production, consider upgrading to paid plan
