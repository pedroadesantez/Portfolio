# Contact Form Setup Guide

Your portfolio's contact form now has proper email integration! Here's how to complete the setup:

## Current Status

✅ **API endpoint created** - `/api/contact` handles form submissions securely  
✅ **Form component updated** - Now sends real requests instead of simulations  
✅ **Validation & security** - Rate limiting, input sanitization, and error handling  
⚠️ **Email service** - Needs configuration to send emails to your inbox

## Quick Setup (Recommended - Formspree)

1. **Sign up for Formspree** (free tier available):
   - Go to https://formspree.io/
   - Create a free account
   - Click "Create New Form"
   - Use your email `pedroadesantez@gmail.com` as the recipient

2. **Get your Form ID**:
   - After creating the form, you'll get an endpoint like: `https://formspree.io/f/xvgpkjyw`
   - Copy the form ID (the part after `/f/` - e.g., `xvgpkjyw`)

3. **Configure your environment**:
   - Copy `.env.example` to `.env.local`
   - Replace `YOUR_FORM_ID` with your actual form ID:
     ```
     FORMSPREE_ENDPOINT=https://formspree.io/f/xvgpkjyw
     ```

4. **Deploy**:
   - Commit your changes to GitHub
   - Your deployment platform (Vercel/Netlify) will automatically rebuild
   - Add the `FORMSPREE_ENDPOINT` environment variable in your deployment settings

## How It Works Now

### Without Email Service (Current Behavior):

- Form validates and processes data securely
- Shows success message to user
- Logs submission details to server console
- Opens user's email client as fallback (mailto link)

### With Email Service (After Setup):

- Form validates and processes data securely
- Sends email directly to `pedroadesantez@gmail.com`
- Shows success message to user
- No mailto fallback needed

## Testing

1. **Local Testing**: Start your dev server (`npm run dev`) and test the form
2. **Production Testing**: After deployment, test with a real submission

## Security Features

- ✅ Rate limiting (3 attempts per 15 minutes per IP)
- ✅ Input sanitization and validation
- ✅ HTTPS requirement in production
- ✅ Error handling and logging
- ✅ CORS protection

## Alternative Options

If you prefer not to use Formspree, you can integrate with:

- **EmailJS** (client-side email service)
- **Resend** (modern email API)
- **SendGrid** (enterprise email service)
- **Custom SMTP** (using Gmail/Outlook)

## Troubleshooting

- **Form shows success but no email arrives**: Check if `FORMSPREE_ENDPOINT` is set correctly
- **Rate limiting errors**: Wait 15 minutes between test submissions
- **CORS errors**: Make sure the API route is properly deployed

Need help? The contact form will still work as a fallback by opening the user's email client!
