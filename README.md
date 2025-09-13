🏠 Monteurzimmer Booking Application

A microservice-based accommodation booking platform designed for Monteurzimmer (worker accommodation).
The application enables users to browse, manage, and book rooms via a secure and scalable system.

Built with a Spring Boot backend and a React.js frontend, it demonstrates modern web development practices, microservice architecture, and secure authentication.

🎯 Overview

This project showcases a full-stack booking application with:

Microservice architecture for scalability

Secure user authentication & authorization

RESTful APIs for booking and management

Modern React.js frontend for smooth user experience

✨ Features

👤 User Management

Registration & login

JWT-based authentication

Role-based access (Admin, Host, Guest)

🏘️ Accommodation Management

Hosts can create & manage listings

Room details: type, price, location, availability

📅 Booking System

Guests can search for available rooms

Book and manage reservations

🔐 Security

Spring Security with JWT tokens

Protected API endpoints based on user roles

💻 Frontend (React.js)

Responsive booking UI

Interactive search & filter options

Smooth navigation with React Router

📂 Project Architecture
flowchart TD
    subgraph Frontend [React.js Frontend]
        UI[Booking UI] --> APIReq[REST API Requests]
    end

    subgraph Backend [Spring Boot Microservices]
        Auth[Auth Service] --> Sec[Spring Security + JWT]
        Booking[Booking Service] --> DB1[(Bookings DB)]
        Rooms[Room Service] --> DB2[(Rooms DB)]
        Users[User Service] --> DB3[(Users DB)]
    end

    APIReq --> Backend
    Backend --> APIRes[JSON Responses]
    APIRes --> UI

🛠️ Tech Stack
Backend

Java 17

Spring Boot (REST, Security, Data JPA)

JWT Authentication

MySQL / PostgreSQL

Frontend

React.js (with Hooks & Router)

Axios for API communication

Material UI / Tailwind CSS for styling

DevOps & Tools

Docker (optional microservice deployment)

Maven / Gradle

GitHub Actions (CI/CD ready)

🚀 Getting Started
Backend
# Navigate into backend directory
cd backend

# Build and run Spring Boot
mvn clean install
mvn spring-boot:run

Frontend
# Navigate into frontend directory
cd frontend

# Install dependencies
npm install

# Run React app
npm start


Backend will be available at: http://localhost:8080

Frontend will be available at: http://localhost:3000

🔮 Future Enhancements

Payment integration (Stripe/PayPal)

Multi-language support (German/English)

Advanced search filters (price range, amenities)

Mobile app (React Native)

👩‍💻 Author

Developed by Ida Manukyan
📧 idamyan01@gmail.com
 | 🌍 GitHub
