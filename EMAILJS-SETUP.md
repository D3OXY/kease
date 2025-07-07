# EmailJS Contact Form Setup Guide

This guide will walk you through setting up EmailJS to replace the TypeForm implementation with a custom contact form.

## Table of Contents

1. [EmailJS Account Setup](#emailjs-account-setup)
2. [Creating Email Templates](#creating-email-templates)
3. [Configuration](#configuration)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

## EmailJS Account Setup

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create your account
3. Verify your email address

### Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (recommended: **Gmail** for simplicity)
4. For Gmail:
    - Click **Connect Account**
    - Sign in with your Gmail account
    - Allow EmailJS permissions
    - Your service will be created with an ID like `service_xyz123`

### Step 3: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (looks like `xyz123abc`)
3. Copy this key - you'll need it for configuration

## Creating Email Templates

You need to create two email templates:

### Template 1: Business Notification (Main Template)

This template sends the contact form submission to your business email.

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. **Template Name**: `Contact Form Submission`
4. **Template ID**: Will be auto-generated (e.g., `template_abc123`)

**Template Content:**

**Subject:**

```
New Contact Form Submission from {{from_name}}
```

**Body:**

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
            }
            .content {
                background-color: #fff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .field {
                margin-bottom: 15px;
            }
            .label {
                font-weight: bold;
                color: #555;
            }
            .value {
                background-color: #f8f9fa;
                padding: 10px;
                border-radius: 3px;
                margin-top: 5px;
            }
            .footer {
                margin-top: 20px;
                padding: 15px;
                background-color: #f1f3f4;
                border-radius: 5px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>You've received a new message through your website contact form.</p>
            </div>

            <div class="content">
                <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">{{from_name}}</div>
                </div>

                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value">{{from_email}}</div>
                </div>

                <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">{{message}}</div>
                </div>
            </div>

            <div class="footer">
                <p>This message was sent from your website contact form.</p>
                <p>Respond directly to this email to reply to {{from_name}}.</p>
            </div>
        </div>
    </body>
</html>
```

**Settings:**

-   **From Name**: `Kease Studio Website`
-   **From Email**: Use your business email (e.g., `connect@kease.studio`)
-   **Subject**: `New Contact Form Submission from {{from_name}}`
-   **Reply To**: `{{from_email}}` (so you can reply directly to the sender)

### Template 2: User Confirmation (Auto-Reply Template)

This template sends a confirmation email to the user who submitted the form.

1. Create another template
2. **Template Name**: `Contact Form Confirmation`
3. **Template ID**: Will be auto-generated (e.g., `template_xyz789`)

**Template Content:**

**Subject:**

```
Thank you for contacting Kease Studio, {{to_name}}!
```

**Body:**

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                text-align: center;
            }
            .content {
                background-color: #fff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                padding: 15px;
                background-color: #f1f3f4;
                border-radius: 5px;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            .logo {
                max-width: 150px;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Thank You for Reaching Out!</h2>
            </div>

            <div class="content">
                <p>Hello {{to_name}},</p>

                <p>Thank you for contacting Kease Studio! We've received your message and our team will review it shortly.</p>

                <p>We typically respond within 24-48 hours during business days. If your inquiry is urgent, please feel free to call us directly.</p>

                <p>In the meantime, feel free to explore our portfolio or follow us on social media for the latest updates.</p>

                <p>
                    Best regards,<br />
                    <strong>The Kease Studio Team</strong>
                </p>
            </div>

            <div class="footer">
                <p><strong>Kease Studio</strong></p>
                <p>Synerge Co-Working, 16th Main, 4th T Block East, Pattabhirama Nagar, Jayanagar, Bengaluru, Karnataka 560041</p>
                <p>Phone: +91 8075701546 | Email: connect@kease.studio</p>
                <p>Follow us: <a href="https://www.instagram.com/keasestudio/">Instagram</a> | <a href="https://www.linkedin.com/company/kease-studio">LinkedIn</a></p>
            </div>
        </div>
    </body>
</html>
```

**Settings:**

-   **From Name**: `Kease Studio`
-   **From Email**: Use your business email (e.g., `connect@kease.studio`)
-   **Subject**: `Thank you for contacting Kease Studio, {{to_name}}!`
-   **Reply To**: Your business email

## Configuration

### Step 4: Update JavaScript Configuration

Open `assets/js/contact-form.js` and update the configuration object with your actual values:

```javascript
const EMAILJS_CONFIG = {
    publicKey: "YOUR_PUBLIC_KEY", // Replace with your public key from Step 3
    serviceId: "YOUR_SERVICE_ID", // Replace with your service ID from Step 2
    templateId: "YOUR_MAIN_TEMPLATE_ID", // Replace with main template ID from Template 1
    confirmationTemplateId: "YOUR_CONFIRMATION_TEMPLATE_ID", // Replace with confirmation template ID from Template 2
};
```

**Example:**

```javascript
const EMAILJS_CONFIG = {
    publicKey: "xyz123abc",
    serviceId: "service_gmail123",
    templateId: "template_abc123",
    confirmationTemplateId: "template_xyz789",
};
```

### Step 5: Configure Email Destination

In the same file, make sure the business email is correct:

```javascript
const templateParams = {
    from_name: data.user_name,
    from_email: data.user_email,
    message: data.user_help,
    to_name: "Kease Studio Team",
    to_email: "connect@kease.studio", // Update this to your business email
};
```

## Testing

### Step 6: Test the Form

1. Open your website in a browser
2. Navigate to the contact form (homepage or contact page)
3. Fill out the form with test data
4. Submit the form
5. Check for:
    - Success message appears on the website
    - Business email receives the contact form notification
    - User receives confirmation email

### Step 7: Test Error Handling

1. Try submitting with invalid email format
2. Try submitting with empty required fields
3. Try submitting multiple times quickly (rate limiting)

## Troubleshooting

### Common Issues

**1. "EmailJS library not loaded" error**

-   Check that the EmailJS CDN script is loading properly
-   Ensure there are no ad blockers blocking the CDN

**2. "Template not found" error**

-   Double-check template IDs in your configuration
-   Ensure templates are published (not in draft mode)

**3. "Service not found" error**

-   Verify your service ID is correct
-   Ensure the email service is properly connected

**4. Emails not being sent**

-   Check EmailJS dashboard for error logs
-   Verify your email service authentication hasn't expired
-   Check spam/junk folders

**5. Form not submitting**

-   Check browser console for JavaScript errors
-   Ensure all required form fields have the correct IDs

### Rate Limits

EmailJS has rate limits on the free plan:

-   200 emails per month
-   2 emails per second

For higher volume, consider upgrading to a paid plan.

### Security Notes

1. **Public Key**: It's safe to include the public key in your frontend code
2. **Template Variables**: Never expose sensitive template IDs that aren't meant for public use
3. **Rate Limiting**: The form includes built-in rate limiting to prevent spam

## Additional Features

### Adding More Fields

To add more fields to the form:

1. **Add HTML field** in both `index.html` and `contact-us.html`:

```html
<div class="tt-form-group">
    <label for="company">Company (optional)</label>
    <input type="text" id="company" name="company" class="tt-form-control" placeholder="Your company" />
</div>
```

2. **Update validation** in `assets/js/contact-form.js` if needed

3. **Update email templates** to include the new field:

```html
<div class="field">
    <div class="label">Company:</div>
    <div class="value">{{company}}</div>
</div>
```

4. **Update template parameters**:

```javascript
const templateParams = {
    // ... existing fields
    company: data.company || "Not provided",
};
```

## Support

If you encounter issues:

1. Check the [EmailJS Documentation](https://www.emailjs.com/docs/)
2. Review error messages in the browser console
3. Check the EmailJS dashboard for service status
4. Verify email service connection in EmailJS dashboard

---

**Note**: Remember to test the form thoroughly before going live, and consider setting up monitoring to track form submissions and any potential issues.
