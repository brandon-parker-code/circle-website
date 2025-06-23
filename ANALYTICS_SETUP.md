# Analytics Setup Guide for Circle360 Website

## Google Analytics 4 Setup

### 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Follow the setup wizard to create your account
4. Choose "Web" as your data stream type
5. Enter your website details:
   - Website name: Circle360
   - Website URL: Your domain (e.g., https://circle360.com)
   - Industry category: Technology
   - Business size: Small business

### 2. Get Your Measurement ID

1. After creating the property, you'll get a Measurement ID (format: G-XXXXXXXXXX)
2. Copy this ID - you'll need it for the next step

### 3. Update the Website Code

Replace `GA_MEASUREMENT_ID` in the `index.html` file with your actual Measurement ID:

```html
<!-- In the head section of index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. What's Being Tracked

The website now tracks the following events:

#### Page Interactions
- **Page views** - Every page load
- **Navigation clicks** - Menu and link clicks
- **Smooth scroll navigation** - Section navigation
- **Mobile menu usage** - Mobile menu open/close

#### Button & CTA Tracking
- **Download button clicks** - All download buttons
- **Membership plan interactions** - Plan selection clicks
- **Feature card clicks** - Feature exploration
- **Testimonial interactions** - Customer review engagement
- **Back to top clicks** - User engagement

#### User Behavior
- **Scroll depth** - 25%, 50%, 75%, 100% milestones
- **Time on page** - Session duration
- **Section visibility** - Which sections users view
- **Form submissions** - Future form interactions

#### Technical Data
- **Device information** - Screen resolution, viewport size
- **Browser data** - User agent, language
- **Traffic sources** - Referrer information
- **External link clicks** - Outbound traffic
- **Social media clicks** - Social engagement

### 5. Viewing Your Analytics

1. **Real-time reports** - See current visitors
2. **Audience reports** - Demographics, devices, locations
3. **Acquisition reports** - Traffic sources
4. **Behavior reports** - Page views, events, user flow
5. **Conversions** - Track specific goals

### 6. Setting Up Goals

Recommended goals to track:

1. **Download clicks** - Track app downloads
2. **Membership plan views** - Track plan interest
3. **Contact form submissions** - Track leads
4. **Page engagement** - Track time on site

### 7. Privacy Considerations

- The analytics code respects user privacy
- No personally identifiable information is collected
- Users can opt-out via browser settings
- Consider adding a privacy notice about analytics

### 8. Testing Your Setup

1. Visit your website
2. Perform various actions (click buttons, scroll, navigate)
3. Check Google Analytics Real-Time reports
4. Verify events are being tracked correctly

### 9. Advanced Features

#### Custom Events
The website tracks custom events like:
- `download_button_click`
- `membership_plan_click`
- `scroll_depth`
- `section_view`

#### Enhanced Ecommerce (Future)
If you add ecommerce features, you can track:
- Product views
- Add to cart
- Purchase completions
- Revenue tracking

### 10. Maintenance

- Regularly check analytics data
- Monitor for unusual traffic patterns
- Update goals as business objectives change
- Review and optimize based on user behavior

## Alternative Analytics Options

### 1. Plausible Analytics
- Privacy-focused alternative
- GDPR compliant
- Simple setup
- No cookie banners required

### 2. Fathom Analytics
- Privacy-first analytics
- GDPR compliant
- Clean, simple interface
- No data selling

### 3. Matomo (Self-hosted)
- Open-source analytics
- Complete data ownership
- Self-hosted solution
- Full control over data

## Troubleshooting

### Common Issues

1. **No data appearing**
   - Check Measurement ID is correct
   - Verify code is in the `<head>` section
   - Check browser console for errors

2. **Events not tracking**
   - Ensure JavaScript is enabled
   - Check for ad blockers
   - Verify gtag function is available

3. **Delayed data**
   - Real-time data appears immediately
   - Standard reports have 24-48 hour delay
   - Check timezone settings

### Support Resources

- [Google Analytics Help Center](https://support.google.com/analytics/)
- [Google Analytics Community](https://support.google.com/analytics/community)
- [Google Analytics YouTube Channel](https://www.youtube.com/user/googleanalytics)

---

**Note**: Remember to update your privacy policy to mention the use of Google Analytics and provide users with information about data collection and their rights. 