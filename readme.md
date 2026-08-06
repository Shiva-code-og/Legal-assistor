# Legal Assister
### AI-Powered Consumer Legal Assistance Platform

**Developed by:**  
@merakstack, @shiva-code-og, @vignesh-0314, @navaneesh

---

## Overview

Legal Assister is an AI-powered legal assistance platform designed to help ordinary citizens stand up against corporations that engage in unfair or illegal practices.

The platform simplifies the complaint filing process by collecting the user's information, generating a professionally formatted legal complaint, converting it into a PDF, and automatically sending it via email to the appropriate legal authority through an automated n8n workflow.

Whether the issue is unfair vendor practices, excessive hospital billing, consumer fraud, hidden charges, or other violations of consumer rights, Legal Assister helps users prepare and submit formal complaints with minimal effort.

---

## 🎥 Demo

**Legal Assister Demo**

---

## Sample Workflow

```
      User Opens Website
               │
               ▼
      Describe the Legal Issue
               │
               ▼
      AI Collects Required Details
               │
               ▼
       User Reviews Information
               │
               ▼
         Submit Complaint
               │
               ▼
     Frontend Sends POST Request
          to n8n Webhook
               │
               ▼
     Complaint PDF Generated
               │
               ▼
    Appropriate Authority Selected
               │
               ▼
     Email with PDF Complaint Sent
               │
               ▼
     User Receives Confirmation
```

---

# Features

- ⚖️ AI-guided legal complaint assistance
- 📝 Interactive complaint collection form
- 📄 Automatic PDF complaint generation
- 📧 Email complaints directly to legal authorities
- 🔄 n8n workflow automation
- 🤖 AI-assisted legal document formatting
- 🌐 Next.js frontend
- ⚡ Fast and responsive interface
- 🔒 Secure user data handling
- 📤 One-click complaint submission

---

# Tech Stack

```
                         FRONTEND LAYER
   ┌────────────────────────────────────────────────────────┐
   │                  Next.js (App Router)                  │
   │   - TypeScript UI Components                           │
   │   - Responsive Interface                               │
   │   - Complaint Form                                     │
   └───────────────────────────┬────────────────────────────┘

                                │ (POST Request)
                         ▲      ▼      ▲
      ┌──────────────────┼─────────────┼──────────────────┐
      │ Hosted on:       │             │                  │
      │     Vercel       │             │                  │
      └──────────────────┘             │                  │
                                       │
                                       ▼

                         AUTOMATION LAYER

   ┌────────────────────────────────────────────────────────┐
   │                       n8n Workflow                     │
   │                                                        │
   │ • Receive Complaint Data                               │
   │ • Validate Information                                 │
   │ • Generate Legal Complaint PDF                         │
   │ • Select Appropriate Authority                         │
   │ • Send Email with PDF Attachment                       │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼

                        EXTERNAL SERVICES

        ┌─────────────────────┐      ┌────────────────────┐
        │    PDF Generator    │      │     Gmail API      │
        │ Complaint Document  │      │ Sends Complaint    │
        └─────────────────────┘      └────────────────────┘
```

---

# Project Images

### Home Page

*(Add Screenshot Here)*

---

### Complaint Form

*(Add Screenshot Here)*

---

### Complaint Preview

*(Add Screenshot Here)*

---

### Successful Submission

*(Add Screenshot Here)*

---

# Installation Guide

## Prerequisites

Make sure you have installed:

- Node.js (v18 or later)
- npm / yarn / pnpm
- Git
- n8n Instance
- Gmail API Credentials
- PDF Generation Service (if external)

---

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/legal-assister.git

cd legal-assister
```

---

## 2. Install Dependencies

Using npm

```bash
npm install
```

Or using pnpm

```bash
pnpm install
```

Or using yarn

```bash
yarn
```

---

## 3. Configure Environment Variables

Create a `.env.local`

```env
# n8n Webhook

NEXT_PUBLIC_N8N_WEBHOOK_URL=your_webhook_url

# Gmail API

GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret

# Optional AI API

GROQ_API_KEY=your_groq_api_key
```

Update the values according to your setup.

---

## 4. Run Development Server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 5. Build for Production

```bash
npm run build

npm start
```

---

# 📂 Project Structure

```
Legal-Assister/
│
├── app/
├── components/
├── public/
│   ├── home.png
│   ├── form.png
│   ├── preview.png
│   └── success.png
├── lib/
├── styles/
├── .env.local
├── package.json
└── README.md
```

---

# Workflow Setup

1. Create an n8n workflow.
2. Add a Webhook node.
3. Receive complaint details from the frontend.
4. Generate a formatted complaint document.
5. Convert the complaint into a PDF.
6. Determine the appropriate legal authority.
7. Send an email containing the complaint PDF.
8. Return a success response to the frontend.
9. Deploy the frontend to Vercel (or any preferred hosting provider).
10. Connect the frontend POST request to the n8n webhook.

---

# Use Cases

Legal Assister can help users file complaints regarding:

- Consumer fraud
- Hospital overcharging
- Hidden service charges
- Vendor malpractice
- Defective products
- Refund disputes
- Warranty violations
- Billing disputes
- Digital payment fraud
- Other consumer rights violations

---

# 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repository

# Create a feature branch

git checkout -b feature/amazing-feature

# Commit your changes

git commit -m "Add amazing feature"

# Push your branch

git push origin feature/amazing-feature
```

Then open a Pull Request.

---

# License

This project is licensed under the MIT License.

---

# Achievement 🏆

Empowering citizens through accessible legal technology by simplifying complaint filing and automating communication with the appropriate authorities.

---

# ⚖️ Protect. Report. Generate. Submit.

**Legal Assister** transforms complex consumer complaint procedures into a streamlined, AI-assisted workflow, enabling individuals to seek justice against unfair corporate practices with confidence.