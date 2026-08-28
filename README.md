# KUKISA Registration Platform

A mobile-first web application designed to help the **Kenyatta University Kiambu Students Association (KUKISA)** register and collect information from new students from Kiambu County.

The platform provides a simple and convenient way for students to join KUKISA directly from their phones while securely storing registration information in a database.

## 📱 About the Project

With new students joining Kenyatta University, KUKISA needed a faster and more organized way to register potential members from Kiambu County.

This platform allows students to submit their personal, academic, and Kiambu County information through a simple online registration form.

The submitted information is securely stored in Supabase, making it easier for the organization to manage and access member registrations.

## ✨ Features

- 📱 Mobile-first responsive design
- 📝 Student registration form
- 👤 Personal information collection
- 🎓 Academic information collection
- 📍 Kiambu County information collection
- 🏫 Constituency selection
- ✅ User consent confirmation
- 🔒 Secure database storage with Supabase
- 🚫 Duplicate registration number prevention
- ⏳ Loading state during registration submission
- 🎉 Professional registration success screen
- 📲 Social media links in the footer
- 🎨 KUKISA-inspired branding and colors

## 🖼️ Registration Information Collected

The platform collects the following information:

### Personal Information
- Full Name
- Phone Number
- Email Address
- National ID Number

### Academic Information
- Registration Number
- Course
- School / Faculty
- Year of Study

### Kiambu County Information
- Constituency
- Sub-county
- Ward
- Current Residence / Hostel

### Additional Information
- How the student heard about KUKISA
- Consent confirmation

## 🛠️ Tech Stack

- React
- Vite
- CSS
- Supabase
- Lucide React

## 🗄️ Database

The project uses **Supabase** as the backend database.

Student registrations are stored in a `registrations` table.

The application also includes:

- Row Level Security (RLS)
- Public insert access for registrations
- Unique registration number validation

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kukisa-registration.git
```

### 2. Navigate to the project folder

```bash
cd kukisa-registration
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create an environment file

Create a `.env` file in the root of the project:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Never upload your `.env` file or Supabase secret keys to GitHub.

### 5. Start the development server

```bash
npm run dev
```

## 📁 Project Structure

```text
kukisa-registration/
│
├── public/
├── src/
│   ├── components/
│   │   └── RegistrationForm.jsx
│   │
│   ├── lib/
│   │   └── supabase.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── README.md
```

## 🔐 Environment Variables

This project requires the following environment variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

These variables are required to connect the application to the Supabase database.

## 🎯 Project Goal

The goal of this project is to help KUKISA move from manual student registration to a simple digital system that can be easily accessed by students using their mobile phones.

It provides the organization with a centralized way to collect and manage information from potential members.

## 👨‍💻 Developer

**Brian Muchiru**

- GitHub: [@BRIAN-pixel275](https://github.com/BRIAN-pixel275)
- LinkedIn: [Brian Muchiru](https://www.linkedin.com/in/brian-muchiru-b0b057356)

---

Built for the **Kenyatta University Kiambu Students Association (KUKISA)**.