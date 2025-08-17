# Portfolio Rejaka - Personal Website

![Portfolio Banner](https://rejaka.id/assets/images/profile/rez3x.webp)

## 📌 Overview

A modern, responsive portfolio website showcasing the work, skills, and experience of Rejaka Abimanyu Susanto. This full-stack web application features dual themes, interactive guestbook, blog platform, AI chatbot integration, and comprehensive professional showcase.

**Live Site:** [rejaka.id](https://rejaka.id)

## ✨ Features

### 🎨 User Interface

- **Dual Theme Support**: Terminal-inspired and soft aesthetic themes
- **Responsive Design**: Mobile-first approach optimized for all device sizes
- **Interactive Modals**: Dynamic project showcases and content displays
- **Custom Cursor**: Enhanced user experience with themed cursor animations

### 📝 Content Management

- **Blog Platform**: Technical articles and tutorials with markdown support
- **Project Portfolio**: Interactive showcase of web, mobile, and development projects
- **Resume Page**: Professional resume with downloadable PDF
- **Skills & Experience**: Comprehensive overview of technical abilities

### 🤖 Interactive Features

- **AI Chatbot (V0id)**: Gemini AI-powered assistant with sophisticated persona system
- **Advanced AI Security**: Multi-layer jailbreak protection and content filtering
- **Guestbook System**: User authentication with Google, GitHub, and Discord OAuth
- **Word Filtering**: Advanced profanity filter with multilingual support
- **Real-time Validation**: Live content filtering and validation

### 🔒 Security & Authentication

- **OAuth Integration**: Secure login with multiple providers
- **Content Moderation**: Comprehensive word filtering system
- **Database Integration**: MongoDB for user data and guestbook entries
- **Session Management**: Secure cookie-based authentication

### 🌐 Technical Features

- **SEO Optimized**: Meta tags, sitemap, and structured data
- **Performance Focused**: Fast loading with optimized assets
- **IPv4/IPv6 Support**: Dual-stack network configuration
- **API Integration**: RESTful APIs for dynamic content

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context API

### Backend & APIs

- **Runtime**: Node.js
- **Database**: MongoDB with native driver
- **Authentication**: OAuth 2.0 (Google, GitHub, Discord)
- **AI Integration**: Google Gemini API via @google/generative-ai
- **Content Processing**: Markdown parsing with gray-matter and marked
- **File Processing**: Markdown parsing and processing

### Deployment & Infrastructure

- **Web Server**: Nginx with reverse proxy
- **Process Manager**: PM2 for Node.js applications
- **CDN**: Cloudflare for performance and security
- **SSL**: Let's Encrypt certificates
- **Monitoring**: PM2 monitoring and logs

### Development Tools

- **Version Control**: Git with GitHub
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint, TypeScript strict mode
- **Build Tool**: Next.js built-in bundler

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Git
- MongoDB database (local or cloud)

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/REZ3X/portfolio-rejaka.git
   cd portfolio-rejaka
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` with your actual API keys and database credentials.

4. Configure OAuth applications:

   - **Google**: Create OAuth client in Google Cloud Console
   - **GitHub**: Create OAuth app in GitHub Developer Settings
   - **Discord**: Create application in Discord Developer Portal

5. Set up MongoDB:

   - Create a MongoDB database (local or MongoDB Atlas)
   - Add connection string to `.env`

6. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) to view the site

## 📊 Project Structure

```
portfolio-rejaka/
├── public/                 # Static assets and content
│   ├── assets/            # Images, icons, and media files
│   ├── blog/              # Markdown blog articles
│   │   └── posts/         # Individual blog post directories
│   ├── v0id_files/        # AI chatbot related files
│   ├── robots.txt         # Search engine crawler rules
│   └── sitemap.xml        # SEO sitemap
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # OAuth authentication
│   │   │   ├── guestbook/ # Guestbook functionality
│   │   │   └── voidBot/   # AI chatbot API
│   │   ├── blog/          # Blog pages and routing
│   │   ├── resume/        # Resume page
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Homepage
│   ├── components/        # React components
│   │   ├── blog/          # Blog-related components
│   │   ├── main/          # Main page components
│   │   ├── modals/        # Modal dialogs
│   │   ├── shared/        # Shared/common components
│   │   └── terminal/      # Terminal theme components
│   ├── context/           # React Context providers
│   ├── data/              # Static data and configurations
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries (MongoDB, etc.)
│   ├── styles/            # Global CSS and styling
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── .env.example           # Environment variables template
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🌐 Deployment

The site is deployed using Nginx as a reverse proxy with PM2 for process management:

### Production Build

1. Build the production version:

   ```bash
   npm run build
   ```

2. Start with PM2:

   ```bash
   pm2 start npm --name "portfolio-rejaka-prod" -- start
   ```

3. Configure Nginx as a reverse proxy:

   ```nginx
   server {
       listen 80;
       server_name rejaka.id www.rejaka.id;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name rejaka.id www.rejaka.id;

       ssl_certificate /path/to/ssl/certificate;
       ssl_certificate_key /path/to/ssl/private/key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Environment Variables

Ensure all required environment variables are set in production:

- Database connection strings
- OAuth client credentials
- API keys for external services
- Security configurations

### Monitoring

- Use `pm2 monit` for real-time monitoring
- Check logs with `pm2 logs portfolio-rejaka-main`
- Set up PM2 startup script for auto-restart

## 📡 API Documentation

### Authentication Endpoints

- `GET /api/auth/google` - Google OAuth authentication
- `GET /api/auth/github` - GitHub OAuth authentication
- `GET /api/auth/discord` - Discord OAuth authentication

### Guestbook API

- `GET /api/guestbook` - Fetch all guestbook entries
- `POST /api/guestbook` - Create new guestbook entry
- `DELETE /api/guestbook` - Delete user's guestbook entry

### AI Chatbot API

- `POST /api/voidBot` - Send message to V0id AI assistant

### AI Security Features

- **Jailbreak Protection**: Advanced pattern detection for prompt injection attempts
- **Content Moderation**: Multi-layer filtering for harmful, inappropriate, or malicious content
- **Rate Limiting**: Message length and frequency controls
- **Context Awareness**: Intelligent conversation flow management

### Content Filtering

- Advanced word filtering system with multilingual support
- Real-time content validation and moderation
- Configurable banned words via environment variables

### AI Persona System

- **V0id III**: Multi-persona AI assistant representing three distinct personalities
- **REZ3X**: Technical/programming persona for development queries
- **Abim**: Academic persona for research and analytical discussions
- **Xiannyaa**: Creative persona for artistic and design-related topics

## 🔧 Configuration

### OAuth Setup

1. **Google OAuth**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs
   - Enable People API

2. **GitHub OAuth**:

   - Go to GitHub Developer Settings
   - Create new OAuth App
   - Set authorization callback URL

3. **Discord OAuth**:
   - Go to Discord Developer Portal
   - Create new application
   - Set redirect URIs in OAuth2 settings

### Database Schema

The application uses MongoDB with the following collections:

- `users` - OAuth user information
- `guestbook` - Guestbook entries with user references

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 About the Author

Rejaka Abimanyu Susanto is a full-stack developer based in Indonesia, specializing in web development, database engineering, and game development. Connect with him through the portfolio website or follow his projects on GitHub.

---

© 2025 Rejaka Abimanyu Susanto. All rights reserved.
