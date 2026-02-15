# Standard Engineering - Deployment Guide

## 🌐 Production Deployment Instructions

### Prerequisites for Deployment
- MongoDB Atlas account (cloud database)
- Node.js hosting (Heroku, AWS, DigitalOcean, Render)
- Frontend hosting (Netlify, Vercel, AWS S3 + CloudFront)
- Domain name (optional but recommended)
- SSL certificate (usually automatic with hosting providers)

---

## 🖥️ Backend Deployment

### Option 1: Deploy to Heroku (Recommended for beginners)

#### Step 1: Prepare Backend
```bash
cd backend

# Remove node_modules and reinstall clean
rm -rf node_modules
npm install

# Test locally
npm run dev
```

#### Step 2: Create Procfile
```bash
# In backend directory, create file named "Procfile"
echo "web: node server.js" > Procfile
```

#### Step 3: Update .env for Production
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_strong_random_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

#### Step 4: Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
# or use npm:
npm install -g heroku
```

#### Step 5: Deploy to Heroku
```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create standard-engineering-api

# Add MongoDB Atlas URI
heroku config:set MONGODB_URI="your_connection_string"
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set FRONTEND_URL="https://your-frontend-domain.com"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Backend URL will be**: `https://standard-engineering-api.herokuapp.com`

### Option 2: Deploy to DigitalOcean App Platform

#### Step 1: Prepare Repository
```bash
# Ensure .env is in .gitignore
# Ensure Procfile exists
# Push to GitHub
```

#### Step 2: Connect DigitalOcean
1. Go to digitalocean.com
2. Create new app from GitHub
3. Select backend repository
4. Configure:
   - Port: 5000
   - Build: `npm install`
   - Run: `node server.js`
5. Add environment variables
6. Deploy

### Option 3: Deploy to AWS EC2

#### Step 1: Launch EC2 Instance
1. Choose Ubuntu 22.04 LTS
2. t2.micro or t3.micro (free tier eligible)
3. Configure security group for ports 80, 443, 5000

#### Step 2: SSH into Instance
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Step 4: Install MongoDB (or use Atlas)
```bash
# Skip if using MongoDB Atlas
```

#### Step 5: Clone and Setup
```bash
git clone your-repo
cd backend
npm install
```

#### Step 6: Setup Environment Variables
```bash
nano .env
# Add your configuration
```

#### Step 7: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 start server.js --name "steel-api"
pm2 startup
pm2 save
```

#### Step 8: Install Nginx (Reverse Proxy)
```bash
sudo apt install nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/default

# Add this to the server block:
location / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

sudo systemctl restart nginx
```

#### Step 9: Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
sudo systemctl restart nginx
```

---

## 🎨 Frontend Deployment

### Option 1: Deploy to Netlify

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 2: Create netlify.toml
```toml
[build]
command = "npm run build"
publish = "build"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

#### Step 3: Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Frontend URL**: `https://your-site.netlify.app`

### Option 2: Deploy to Vercel

#### Step 1: Push to GitHub

#### Step 2: Connect Vercel
1. Go to vercel.com
2. Import project from GitHub
3. Set root directory: `frontend`
4. Environment variables:
   - REACT_APP_API_URL=https://your-api-url.com
5. Deploy

**Frontend URL**: `https://your-site.vercel.app`

### Option 3: Deploy to AWS S3 + CloudFront

#### Step 1: Build
```bash
cd frontend
npm run build
```

#### Step 2: Create S3 Bucket
1. Go to AWS S3
2. Create bucket with website hosting enabled
3. Upload `build/` contents

#### Step 4: Setup CloudFront
1. Create distribution
2. Point to S3 bucket
3. Add custom domain
4. Setup SSL with ACM

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

#### Step 1: Create Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up free

#### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose Free tier
3. Select region (choose closest to your backend)
4. Create cluster

#### Step 3: Create Database User
1. Go to "Database Access"
2. Add database user with strong password
3. Grant admin permissions

#### Step 4: Get Connection String
1. Click "Connect" on cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace <username> and <password>

#### Step 5: Allow IP Access
1. Go to "Network Access"
2. Add IP address (0.0.0.0/0 for all - not secure)
3. Better: Add specific IPs

#### Step 6: Use Connection String
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/standard-engineering?retryWrites=true&w=majority
```

---

## 🔒 Security Checklist

### Backend Security
- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS/SSL
- [ ] Update FRONTEND_URL to production domain
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB authentication
- [ ] Restrict database IP access
- [ ] Enable CORS for frontend domain only
- [ ] Use strong password for database
- [ ] Enable database backups

### Frontend Security
- [ ] Update REACT_APP_API_URL to production API
- [ ] Remove console.log statements from production
- [ ] Enable HTTPS
- [ ] Use security headers
- [ ] Enable HSTS

### Network Security
- [ ] Use HTTPS everywhere
- [ ] Enable CORS properly (not wildcard)
- [ ] Use strong passwords
- [ ] Enable 2FA for accounts
- [ ] Keep dependencies updated

---

## 📊 Performance Optimization

### Backend
```javascript
// Add caching headers in server.js
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});

// Add compression
const compression = require('compression');
app.use(compression());

// Add rate limiting (npm install express-rate-limit)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

### Frontend
- Lazy load components
- Optimize images
- Minify CSS/JS (automatic with build)
- Use CDN for static assets
- Enable gzip compression

---

## 📡 Domain Setup

### Pointing Domain to Deployment

#### For Heroku/Netlify/Vercel
```
Create CNAME record pointing to provided domain
```

#### For AWS
```
Create Route 53 hosted zone
Add A record pointing to CloudFront distribution
```

#### For Custom Server
```
Create A record pointing to server IP address
```

---

## 🚀 Post-Deployment Steps

### Step 1: Verify Deployment
```bash
# Test backend API
curl https://your-api-domain.com/api/health

# Expected response:
# {"success":true,"message":"Server is running"}

# Test frontend
# Visit https://your-frontend-domain.com
```

### Step 2: Setup Admin Account
1. Register account through frontend
2. Connect to MongoDB
3. Update user role to admin

### Step 3: Create Initial Data
1. Add sample products
2. Test user workflow
3. Test admin workflow

### Step 4: Monitoring
- Set up error logging (Sentry)
- Set up uptime monitoring (Pingdom)
- Monitor database performance
- Check API logs regularly

---

## 🔄 Continuous Deployment (CD)

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/your-app.git main
```

---

## 📈 Scaling for Production

### When Traffic Increases
1. Use CDN for static assets
2. Enable caching (Redis)
3. Optimize database indexes
4. Add load balancing
5. Increase server resources
6. Use database replication

### Recommended Specs
- **Backend**: 2GB RAM, 1 CPU (minimum)
- **Database**: Managed service (Atlas, RDS)
- **Frontend**: CDN + Static hosting

---

## 📞 Deployment Support

### Troubleshooting Common Issues

**"Cannot connect to MongoDB"**
- Verify connection string
- Check IP whitelist on MongoDB Atlas
- Verify credentials

**"API not responding"**
- Check backend logs
- Verify environment variables
- Check network connectivity

**"Frontend not loading"**
- Check API_URL in frontend env
- Verify CORS configuration
- Check browser console errors

---

## 📋 Deployment Checklist

- [ ] Database setup (MongoDB Atlas)
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Domain setup
- [ ] SSL certificate
- [ ] Admin account created
- [ ] Environment variables configured
- [ ] Security checks complete
- [ ] Backup strategy in place
- [ ] Monitoring setup
- [ ] Documentation updated
- [ ] Team trained
- [ ] Rollback plan prepared

---

## 📚 Resources

- [Heroku Deployment](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Netlify Deployment](https://docs.netlify.com/)
- [AWS Deployment](https://aws.amazon.com/getting-started/)
- [DigitalOcean](https://www.digitalocean.com/docs/)

---

**Deployment Complete!** 🎉

Your Standard Engineering system is now live and accessible to customers worldwide.
