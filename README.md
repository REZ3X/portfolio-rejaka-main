# Portfolio Rejaka - Personal Website

![Portfolio Banner](https://rejaka.me/assets/images/profile/rez3x.webp)

## 📌 Overview

A modern, responsive portfolio website showcasing the work, skills, and experience of Rejaka Abimanyu Susanto. This website features multiple themes, a blog section, project showcase, and comprehensive information about my professional journey.

**Live Site:** [rejaka.me](https://rejaka.me)

## ✨ Features

- **Dual Theme Support**: Terminal-inspired and soft aesthetic themes
- **Responsive Design**: Optimized for all device sizes
- **Project Portfolio**: Showcase of web, mobile, and other development projects
- **Blog Platform**: Technical articles and tutorials
- **Skills & Experience**: Comprehensive overview of technical abilities
- **IPv4/IPv6 Support**: Special configuration for both connection types
- **SEO Optimized**: Meta tags and structured data for search engines
- **Performance Focused**: Fast loading and optimized assets

## 🛠️ Technology Stack

- **Frontend**: Next.js, TypeScript, React
- **Styling**: Tailwind CSS
- **Deployment**: Nginx with PM2
- **Network**: Cloudflare for DNS and IPv4 tunneling
- **Assets**: Optimized images and fonts

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Git

### Installation

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

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the site

## 📊 Project Structure

```
portfolio-rejaka/
├── public/            # Static assets and blog posts
│   ├── assets/        # Images and other assets
│   ├── blog/          # Markdown blog articles
├── src/
│   ├── app/           # Next.js app directory and routes
│   ├── components/    # React components
│   ├── context/       # Context providers
│   ├── data/          # Data files for projects, skills, etc.
│   ├── styles/        # CSS and styling
```

## 🌐 Deployment

The site is deployed using Nginx as a reverse proxy with PM2 for process management:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Start with PM2:
   ```bash
   pm2 start npm --name "portfolio" -- start
   ```

3. Configure Nginx as a reverse proxy (see deployment documentation for details)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 About the Author

Rejaka Abimanyu Susanto is a full-stack developer based in Indonesia, specializing in web development, database engineering, and game development. Connect with him through the portfolio website or follow his projects on GitHub.

---

© 2025 Rejaka Abimanyu Susanto. All rights reserved.