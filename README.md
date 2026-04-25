<div align="center">
  <img src="C:/Users/priya/.gemini/antigravity/brain/b61fef1f-7332-4fbe-9db8-cbc8323d8268/dental_app_banner_1777116736191.png" alt="Dental App UI Banner" width="100%" style="border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
  
  <br />
  <br />

  # 🦷 Dental Appointment SaaS

  **A premium, modern, and responsive Dental Appointment Booking System.**

  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](#)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](#)

  > Built with cutting-edge web technologies, featuring a dedicated patient portal, seamless authentication flows, and dynamic dashboards with a healthcare-inspired aesthetic utilizing glassmorphism and fluid animations.

</div>

<br />

---

## ✨ Key Features

### 🧑‍⚕️ For Patients
- **Sleek Intake Flow:** Painless personal and medical history onboarding.
- **Smart Booking System:** Choose preferred doctors and time slots effortlessly.
- **Patient Hub:** View upcoming appointments and historical visit data at a glance.

### 🩺 For Doctors
- **Doctor Dashboard:** See daily schedules, review patient medical notes, and assess pain levels prior to visits.

### ⚙️ For Administrators
- **Command Center:** Total system oversight, managing all appointments, patients, and platform data from one secure dashboard.

### 🎨 Premium UI/UX
- **Glassmorphism Aesthetic:** Responsive, accessible design using custom Vanilla CSS modules.
- **Fluid Motion:** Physics-based animations via **Framer Motion** and silky smooth scrolling powered by **Lenis**.

---

## 🚀 Tech Stack

We chose a robust, modern stack prioritizing performance, developer experience, and scalability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **[Next.js v16+](https://nextjs.org/)** | React framework with App Router for SSR and routing. |
| **UI Library** | **[React v19](https://react.dev/)** | Component-based UI development. |
| **Language** | **[TypeScript](https://www.typescriptlang.org/)** | Strongly typed JavaScript for safer code. |
| **Styling** | **Vanilla CSS Modules** | Custom styling for an authentic glassmorphism effect. |
| **Animations** | **[Framer Motion](https://www.framer.com/motion/)** | Declarative physics-based animations. |
| **Scrolling** | **[Lenis](https://lenis.studiofreight.com/)** | Lightweight smooth scroll implementation. |
| **Icons** | **[Lucide React](https://lucide.dev/)** | Clean, consistent SVG icon set. |
| **Database ORM**| **[Prisma v5](https://www.prisma.io/)** | Next-generation Node.js and TypeScript ORM. |
| **Database** | **SQLite** | Lightweight local database (`dev.db`) for rapid development. |

<details>
<summary><b>🧠 View Architecture Mindmap</b></summary>

```mermaid
mindmap
  root((Tech Stack))
    User Interaction Flow
      Frontend
      API Layer
      Database
    Frontend Layer
      Next.js 16
      React 19
      TypeScript
      CSS Modules
    UI/UX Layer
      Framer Motion
      Lenis Smooth Scroll
      Glassmorphism
    Backend Layer
      Next.js API Routes
      Prisma ORM
      SQLite Database
```
</details>

## 🏗️ Project Architecture
A high-level view of our directory structure designed for modularity and easy maintenance:

```mermaid
graph TD
    Root[Dental-Appointment]
    
    Root --> PrismaDir[📁 prisma/]
    PrismaDir --> Schema[schema.prisma]
    
    Root --> SrcDir[📁 src/]
    
    SrcDir --> AppDir[📁 app/]
    AppDir --> API[📁 api/ - API Routes]
    AppDir --> Booking[📁 booking/ - Patient Booking Flow]
    AppDir --> DashDir[📁 dashboard/ - Dashboards]
    AppDir --> IntakeDir[📁 intake/ - Medical Onboarding]
    AppDir --> Auth[📁 login/ & signup/]
    
    SrcDir --> CompDir[📁 components/]
    CompDir --> CompDash[📁 dashboard/ - Admin/Patient Panels]
    CompDir --> CompIntake[📁 intake/ - Multi-step Form]
    
    SrcDir --> Lib[📁 lib/ - Utilities & DB Client]
```

## 🗄️ Database Schema
Here is the underlying database model powering the application data flow:

```mermaid
erDiagram
    User ||--o| PatientInfo : "has"
    User ||--o{ Appointment : "books"
    Doctor ||--o{ Appointment : "assigned to"

    User {
        String id PK
        String email UK
        String phone UK
        String passwordHash
        String role "patient, doctor, admin"
        DateTime createdAt
    }

    PatientInfo {
        String id PK
        String userId FK
        String fullName
        Int age
        String gender
        Boolean diabetes
        Boolean bloodPressure
        String allergies
    }

    Doctor {
        String id PK
        String name
        String specialty
    }

    Appointment {
        String id PK
        String patientId FK
        String doctorId FK
        String appointmentDate
        String appointmentTime
        String reason
        Int painLevel
        String status
    }
```

## 🔄 User Journey
How users navigate through the application ecosystem:

```mermaid
flowchart TD
    Start((Landing Page)) --> Auth{Authentication}
    
    Auth -- New --> Signup[Signup Page]
    Auth -- Returning --> Login[Login Page]
    
    Signup --> Login
    Login --> RoleCheck{Check User Role}
    
    RoleCheck -- Patient --> PatientHub{Patient Hub}
    RoleCheck -- Doctor --> DocDash[Doctor Dashboard]
    RoleCheck -- Admin --> AdminDash[Admin Dashboard]
    
    PatientHub --> Intake[Intake & Medical Form]
    Intake --> Book[Book Appointment]
    Book --> Confirm[Confirmation View]
    Confirm --> PatDash[Patient Dashboard]
    
    PatDash --> History[View Medical History]
    
    DocDash --> ViewPat[View Patient Notes]
    AdminDash --> Manage[Manage Entire System]
```

## 🛠️ Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Prerequisites
Ensure you have the following installed:

* Node.js (v18 or higher)
* npm, yarn, or pnpm

### 2. Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/dental-appointment-saas.git
cd dental-appointment-saas
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure your Prisma database URL to point to the local SQLite file:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup
Generate the Prisma Client and push the schema to the SQLite database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Start Development Server
Boot up the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application!
