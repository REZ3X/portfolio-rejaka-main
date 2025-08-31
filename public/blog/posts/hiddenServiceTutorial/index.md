# 🕵️ Deploy Hidden Service Web in Linux: The Complete Guide (with Vanity .onion Domains)

Hey privacy enthusiasts and fellow developers! Ever wanted to run your own hidden service on the Tor network? Whether you're building something privacy-focused, testing anonymous deployments, or just curious about how the dark web works, this guide will walk you through deploying your web application as a Tor hidden service.

Today we'll cover everything from basic hidden service deployment to creating custom vanity .onion addresses that look professional. Ready to dive into the world of anonymous web services? Let's go! 🚀

---

## ❓ What Are We Building?

Before jumping into the technical stuff, let's understand what we're working with:

### 🧅 **Tor Hidden Services Explained**
**Tor Hidden Services** (now called "Onion Services") allow you to host websites that are only accessible through the Tor network. Unlike regular websites that need domain registration and public IP addresses, hidden services:

- Generate unique `.onion` addresses automatically
- Provide end-to-end encryption by default  
- Hide both server and client locations
- Don't require traditional DNS or domain registration

### 🔄 **Nginx Reverse Proxy in This Setup**
**Nginx** acts as a middle layer between Tor and your web application:

```
Tor Browser → Tor Network → Your Server (Nginx) → Your Web App
```

Benefits of using Nginx:
- **Load balancing** for multiple app instances
- **SSL termination** (though Tor already encrypts)
- **Caching** for better performance
- **Request filtering** and security headers

### 🎯 **Vanity .onion Domains**
Regular .onion addresses look like random gibberish: `3g2upl4pq6kufc4m.onion`

Vanity domains let you customize the prefix: `webapp4pq6kufc4m.onion`

This makes your hidden service more memorable and professional-looking.

---

## 🧰 Requirements & Package Installation

### 📋 **What You'll Need**
- **Linux server** (Debian/Ubuntu recommended)
- **Running web application** on any port (we'll use port 4000 as example)
- **Root or sudo access**
- **Patience** (vanity generation can take time!)

### 📦 **Required Packages**
```bash
# Essential packages for our hidden service setup
curl        # Download and HTTP requests
nginx       # Reverse proxy server  
tor         # The Tor daemon itself
autoconf    # Build configuration tools
automake    # Makefile generation
libtool     # Library creation tools
make        # Build compilation  
gcc         # C compiler
git         # Version control
libsodium-dev  # Cryptography library
build-essential # Essential build tools
```

### 🚀 **Installation Command**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl nginx tor autoconf automake libtool make gcc git libsodium-dev build-essential -y
```

**What this does:**
- Updates package lists and existing packages
- Installs all required dependencies in one command
- The `-y` flag automatically confirms installation

---

## 🔧 Tutorial: Nginx Reverse Proxy Setup

### 1️⃣ **Verify Your Web App is Running**

First, make sure your application is accessible locally:

```bash
curl http://127.0.0.1:4000
```

You should see your app's response. If not, start your application first!

**Example for different frameworks:**
```bash
# Next.js
npm run start          # Usually runs on port 3000

# Express.js  
node server.js         # Check your server file for port

# Python Flask
python app.py          # Usually runs on port 5000

# Laravel
php artisan serve      # Usually runs on port 8000
```

### 2️⃣ **Create Nginx Configuration**

Create a new nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/yourwebapp
```

Add this configuration:

```nginx
server {
    # Listen only on localhost port 8080
    listen 127.0.0.1:8080;
    
    # Local server name (not publicly accessible)
    server_name yourwebapp.local;
    
    # Proxy all requests to your web application
    location / {
        # Forward requests to your app running on port 4000
        proxy_pass http://127.0.0.1:4000;
        
        # Preserve original request headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Handle WebSocket connections (if needed)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security headers for hidden services
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

**Configuration breakdown:**
- `listen 127.0.0.1:8080` → Only accept local connections on port 8080
- `proxy_pass` → Forward requests to your actual web app
- `proxy_set_header` → Preserve important request information
- Security headers → Basic protection against common attacks

### 3️⃣ **Enable and Test Configuration**

Enable the site and test configuration:

```bash
# Create symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/yourwebapp /etc/nginx/sites-enabled/

# Test nginx configuration for syntax errors
sudo nginx -t

# If test passes, restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx
```

**Verify the proxy works:**
```bash
curl http://127.0.0.1:8080
```

You should see the same response as your original app!

---

## 🧅 Tutorial: Tor Hidden Service Deployment

### 1️⃣ **Configure Tor Hidden Service**

Edit the Tor configuration file:

```bash
sudo nano /etc/tor/torrc
```

Add these lines at the bottom:

```bash
# Hidden Service Configuration
HiddenServiceDir /var/lib/tor/yourwebapp/
HiddenServicePort 80 127.0.0.1:8080
```

**Configuration explanation:**
- `HiddenServiceDir` → Directory where Tor stores keys and hostname
- `HiddenServicePort` → Maps external port 80 to your nginx proxy on port 8080

### 2️⃣ **Start Tor Service**

Restart Tor to apply configuration:

```bash
# Restart tor service
sudo systemctl restart tor

# Check if tor is running properly
sudo systemctl status tor

# Check tor logs for any errors
sudo journalctl -u tor -f
```

### 3️⃣ **Get Your .onion Address**

Retrieve your generated .onion domain:

```bash
sudo cat /var/lib/tor/yourwebapp/hostname
```

You'll see something like:
```
abc123def456ghi789jkl.onion
```

**What happened here:**
- Tor generated a cryptographic key pair
- The .onion address is derived from the public key
- Private key is stored securely for your service

### 4️⃣ **Test Your Hidden Service**

1. **Download Tor Browser** from [torproject.org](https://www.torproject.org/download/)
2. **Open Tor Browser** and wait for connection
3. **Navigate to your .onion address**
4. **Verify your web app loads correctly**

🎉 **Congratulations! Your hidden service is live!**

---

## 🎭 Tutorial: Creating Vanity .onion Domains

Regular .onion addresses are hard to remember. Let's create a custom prefix!

### 1️⃣ **Understanding Vanity Domain Limitations**

**Character limitations:**
- Only lowercase letters `a-z` and digits `2-7` are allowed
- No `0`, `1`, `8`, `9` (these aren't in base32 encoding)
- Maximum practical prefix length: 6-8 characters

**Time estimation for generation:**
```
1-2 characters: Instant (seconds)
3-4 characters: Minutes  
5-6 characters: Hours to days
7-8 characters: Days to weeks
9+ characters: Months to years (not practical)
```

### 2️⃣ **Clone Vanity Generator**

Download and build the mkp224o vanity generator:

```bash
# Clone the repository
git clone https://github.com/cathugger/mkp224o.git
cd mkp224o
```

### 3️⃣ **Build the Generator**

Generate build configuration:

```bash
# Generate build scripts
./autogen.sh

# Configure the build system
./configure

# Compile the binary
make
```

**What each command does:**
- `autogen.sh` → Creates build configuration files
- `configure` → Checks dependencies and sets up compilation
- `make` → Compiles the source code into executable

### 4️⃣ **Generate Vanity .onion Address**

Check your system's CPU cores and generate vanity address:

```bash
# Check CPU core count
nproc

# Generate vanity .onion with 2 threads (adjust based on your cores)
# Replace "webapp" with your desired prefix
./mkp224o -j 2 webapp

# For better performance, use more threads:
# ./mkp224o -j 4 webapp     # For 4+ core systems
# ./mkp224o -j 8 webapp     # For 8+ core systems
```

**Command breakdown:**
- `-j 2` → Use 2 CPU threads for generation
- `webapp` → Look for .onion addresses starting with "webapp"

**Example output:**
```
waiting for luck...
working with 2 threads, please wait...
webapp4d5e6f7g8h9i.onion
```

### 5️⃣ **Apply Vanity Domain**

When generator finds a match:

```bash
# Stop the generator (Ctrl+C)
# Copy the generated keys
sudo cp webapp4d5e6f7g8h9i.onion/hs_ed25519_secret_key /var/lib/tor/yourwebapp/
sudo cp webapp4d5e6f7g8h9i.onion/hostname /var/lib/tor/yourwebapp/

# Set correct permissions
sudo chown debian-tor:debian-tor /var/lib/tor/yourwebapp/*
sudo chmod 600 /var/lib/tor/yourwebapp/hs_ed25519_secret_key

# Restart tor to use new keys
sudo systemctl restart tor

# Verify new hostname
sudo cat /var/lib/tor/yourwebapp/hostname
```

🎉 **Your vanity .onion domain is ready!**

---

## ⚡ Advanced Configuration & Security

### 🔒 **Enhanced Security Headers**

Update your nginx configuration for better security:

```nginx
server {
    listen 127.0.0.1:8080;
    server_name portfolio.local;
    
    # Enhanced security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "no-referrer";
    add_header Content-Security-Policy "default-src 'self'";
    
    # Disable server tokens
    server_tokens off;
    
    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Remove revealing headers
        proxy_hide_header X-Powered-By;
        proxy_hide_header Server;
    }
    
    # Block common attack patterns
    location ~ /\. {
        deny all;
    }
}
```

### 📊 **Multiple Services Configuration**

Run multiple hidden services on one server:

```bash
# In /etc/tor/torrc
HiddenServiceDir /var/lib/tor/webapp1/
HiddenServicePort 80 127.0.0.1:8080

HiddenServiceDir /var/lib/tor/webapp2/  
HiddenServicePort 80 127.0.0.1:8081

HiddenServiceDir /var/lib/tor/api/
HiddenServicePort 80 127.0.0.1:8082
```

### 🚀 **Performance Optimization**

Optimize for better performance:

```nginx
# Add to nginx configuration
location / {
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Enable caching for static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    proxy_pass http://127.0.0.1:4000;
    proxy_buffering on;
    proxy_buffer_size 8k;
    proxy_buffers 16 8k;
}
```

---

## 🛠️ Troubleshooting Common Issues

### ❌ **Service Not Accessible**

```bash
# Check if tor is running
sudo systemctl status tor

# Check nginx status  
sudo systemctl status nginx

# Check tor logs
sudo journalctl -u tor -f

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify port bindings
sudo netstat -tulpn | grep :8080
```

### ❌ **Vanity Generation Too Slow**

```bash
# Use more CPU cores
./mkp224o -j $(nproc) webapp

# Try shorter prefixes  
./mkp224o -j 4 web      # Instead of "webapp"

# Check system load
htop
```

### ❌ **Permission Errors**

```bash
# Fix tor directory permissions
sudo chown -R debian-tor:debian-tor /var/lib/tor/yourwebapp/
sudo chmod 700 /var/lib/tor/yourwebapp/
sudo chmod 600 /var/lib/tor/yourwebapp/*
```

---

## 📊 Vanity Generation Time Estimates

Based on average hardware (4-core CPU):

| Prefix Length | Example | Estimated Time |
|---------------|---------|----------------|
| **3 chars** | `app` | 1-5 minutes |
| **4 chars** | `blog` | 10-30 minutes |
| **5 chars** | `ghost` | 2-8 hours |
| **6 chars** | `webapp` | 1-3 days |
| **7 chars** | `mysite1` | 1-4 weeks |
| **8 chars** | `portfolio` | 2-6 months |

**Pro Tips for Faster Generation:**
- Use common letters (`a`, `e`, `i`, `o`)
- Avoid rare combinations
- Consider shorter, memorable prefixes
- Use high-core-count servers for faster generation

---

## 🔐 Security Best Practices

### ✅ **Do's**
- Keep your server updated regularly
- Use strong passwords for server access
- Monitor logs for suspicious activity
- Backup your private keys securely
- Use HTTPS within your application (defense in depth)

### ❌ **Don'ts**  
- Don't share your private keys
- Don't log sensitive user information
- Don't use predictable file paths
- Don't ignore security updates
- Don't run unnecessary services

### 🛡️ **Additional Security Measures**

```bash
# Enable firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw deny 8080  # Block direct access to nginx

# Fail2ban for SSH protection
sudo apt install fail2ban -y

# Regular security updates
sudo apt update && sudo apt upgrade -y
```

---

## 🎉 Final Thoughts

Congratulations! You've successfully deployed a Tor hidden service with:

✅ **Nginx reverse proxy** for professional routing  
✅ **Secure .onion domain** accessible via Tor  
✅ **Custom vanity address** for better branding  
✅ **Security best practices** for safe operation  

### 🚀 **What's Next?**

- **Monitor your service** with logs and analytics
- **Optimize performance** based on usage patterns
- **Consider load balancing** for high-traffic services
- **Implement additional security layers** as needed
- **Share your .onion address** through secure channels

### 💡 **Use Cases for Hidden Services**

- **Privacy-focused applications** (secure messaging, anonymous feedback)
- **Development testing** (internal tools, staging environments)
- **Censorship resistance** (news sites, whistleblowing platforms)
- **Personal projects** (private blogs, family sharing)

Remember: With great privacy comes great responsibility. Use these tools ethically and follow your local laws.

---

🔗 **Useful Resources:**
- [Tor Project Documentation](https://community.torproject.org/onion-services/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Hidden Service Security Guide](https://riseup.net/en/security/network-security/tor/onionservices-best-practices)

---

🔑 **TL;DR** → Install packages → Configure nginx reverse proxy → Setup tor hidden service → Generate vanity .onion domain with mkp224o → Test and secure your deployment. Your web app is now accessible anonymously through the Tor network!