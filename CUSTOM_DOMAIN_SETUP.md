# Custom Domain Setup for Circle360 Website

## Overview

Since you're using Firebase Hosting, setting up a custom domain is straightforward. Firebase automatically handles SSL certificates and provides global CDN distribution.

## Step-by-Step Process

### Step 1: Purchase a Domain (if you don't have one)

**Recommended Domain Registrars:**
- **Google Domains** (now Squarespace) - $12/year
- **Namecheap** - $10-15/year
- **GoDaddy** - $12-15/year
- **Cloudflare** - $8-12/year

**Suggested Domain Names:**
- `circle360.com`
- `circle360.app`
- `circle360.io`
- `getcircle360.com`
- `circle360family.com`

### Step 2: Add Custom Domain in Firebase Console

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/project/circles-c3ee6/hosting
   - Click on your project: **circles-c3ee6**

2. **Add Custom Domain:**
   - Click **"Add custom domain"**
   - Enter your domain (e.g., `circle360.com`)
   - Click **"Continue"**

3. **Verify Domain Ownership:**
   - Firebase will provide you with DNS records to add
   - You'll need to add these to your domain registrar

### Step 3: Configure DNS Records

**Firebase will provide you with specific records, but here's what you'll typically need:**

#### Option A: Root Domain (circle360.com)

Add these **A records** to your domain registrar:

```
Type: A
Name: @
Value: 151.101.1.195
TTL: 3600

Type: A
Name: @
Value: 151.101.65.195
TTL: 3600
```

#### Option B: Subdomain (www.circle360.com)

Add this **CNAME record**:

```
Type: CNAME
Name: www
Value: circles-c3ee6.web.app
TTL: 3600
```

#### Option C: Both Root and Subdomain

Add both sets of records above.

### Step 4: Domain Registrar Instructions

#### Google Domains (Squarespace)
1. Go to your domain dashboard
2. Click **"DNS"** tab
3. Click **"Manage custom records"**
4. Add the A and CNAME records provided by Firebase
5. Save changes

#### Namecheap
1. Go to **"Domain List"** → **"Manage"**
2. Click **"Advanced DNS"**
3. Add the records in **"Host Records"**
4. Save changes

#### GoDaddy
1. Go to **"My Products"** → **"DNS"**
2. Click **"Manage DNS"**
3. Add records in **"DNS Records"**
4. Save changes

#### Cloudflare
1. Go to your domain dashboard
2. Click **"DNS"** tab
3. Add the records
4. Make sure **"Proxy status"** is set to **"DNS only"** (gray cloud)
5. Save changes

### Step 5: Verify and Wait

1. **DNS Propagation:**
   - DNS changes can take 24-48 hours to propagate globally
   - Usually works within 1-2 hours
   - You can check propagation at: https://www.whatsmydns.net/

2. **Firebase Verification:**
   - Firebase will automatically verify your domain
   - You'll receive an email when verification is complete
   - Check Firebase Console for status

3. **SSL Certificate:**
   - Firebase automatically provisions SSL certificates
   - Takes 24-48 hours to activate
   - Your site will be accessible via HTTPS

### Step 6: Test Your Domain

Once DNS propagates and SSL is active:

1. **Test your domain:**
   - Visit `https://circle360.com` (or your chosen domain)
   - Should redirect to your Circle360 website

2. **Test subdomain (if configured):**
   - Visit `https://www.circle360.com`
   - Should also work

3. **Verify SSL:**
   - Check for the padlock icon in browser
   - Should show as secure

## Recommended Domain Setup

For the best user experience, I recommend:

### Primary Setup:
- **Root domain**: `circle360.com` (A records)
- **Subdomain**: `www.circle360.com` (CNAME record)
- **Redirect**: `www` → root domain

### DNS Records Example:
```
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

Type: CNAME
Name: www
Value: circles-c3ee6.web.app
```

## Cost Breakdown

### Domain Registration:
- **Domain**: $10-15/year
- **Privacy Protection**: $5-10/year (recommended)
- **Total**: $15-25/year

### Firebase Hosting:
- **Free tier**: 10GB storage, 360MB/day transfer
- **Paid tier**: $0.026/GB storage, $0.15/GB transfer
- **For most websites**: Free tier is sufficient

## Troubleshooting

### Common Issues:

1. **DNS Not Propagating:**
   - Wait 24-48 hours
   - Check with https://www.whatsmydns.net/
   - Verify records are correct

2. **SSL Certificate Issues:**
   - Wait 24-48 hours for SSL activation
   - Ensure DNS is fully propagated
   - Check Firebase Console for errors

3. **Domain Not Working:**
   - Verify DNS records are correct
   - Check for typos in domain name
   - Ensure Firebase verification is complete

### Testing Commands:

```bash
# Check DNS propagation
nslookup circle360.com

# Check SSL certificate
openssl s_client -connect circle360.com:443 -servername circle360.com

# Test website
curl -I https://circle360.com
```

## Security Considerations

### SSL Certificate:
- Firebase automatically provides SSL certificates
- Certificates auto-renew
- Supports modern TLS protocols

### Security Headers:
Your `firebase.json` already includes security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## Next Steps After Domain Setup

1. **Update Analytics:**
   - Add your custom domain to Google Analytics
   - Update tracking code if needed

2. **Update App Store Links:**
   - Update your iOS app's website URL
   - Point to your new custom domain

3. **Email Setup (Optional):**
   - Consider setting up email forwarding
   - Or use Google Workspace for business email

4. **Monitor Performance:**
   - Use Firebase Console to monitor traffic
   - Set up alerts for downtime

## Quick Setup Commands

Once you have your domain, you can also set it up via CLI:

```bash
# Add custom domain via CLI
firebase hosting:sites:add circle360

# Deploy to custom domain
firebase deploy --only hosting:circle360
```

---

**Need Help?**
- Firebase Support: https://firebase.google.com/support
- Domain Registrar Support: Check your registrar's help center
- DNS Propagation: https://www.whatsmydns.net/ 