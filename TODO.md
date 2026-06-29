# Faceless Marketplace — Master TODO & Development Roadmap

> **Project Status:** Closed Beta (marketplace-mvp branch)
>
> **Production:** Landing page only (main branch)
>
> **Beta:** Marketplace development (marketplace-mvp branch)

---

# 🚨 DEVELOPMENT RULES

These rules apply to every feature.

## Git Workflow

* [ ] Never develop marketplace features on `main`
* [ ] Main branch is only for:

  * Landing page
  * Marketing
  * Waitlist
  * SEO
  * Analytics
  * Branding
* [ ] Marketplace development happens only on `marketplace-mvp`
* [ ] Run lint before every commit
* [ ] Run production build before every commit
* [ ] Create small logical commits
* [ ] Never push broken code
* [ ] Never merge into main until marketplace is production ready

---

# 🔥 PRIORITY 0 — CRITICAL BUGS

These must be fixed before inviting beta users.

## Authentication

* [ ] Fix email/password signup
* [ ] Fix login flow
* [ ] Fix invalid login credentials issue
* [ ] Fix duplicate signup success message
* [ ] Ensure existing emails cannot silently create duplicate accounts
* [x] Add Confirm Password field (client + server)
* [x] Validate passwords match (live validation)
* [x] Password strength indicator (client-side)
* [x] Show/hide password (eye icons)
* [x] Forgot Password page (sends reset email)
* [x] Reset Password page (client-side update after reset link)
* [ ] Resend confirmation email (requires Supabase admin APIs)
* [ ] Better authentication error messages
* [ ] Google + Email account linking
* [ ] Test Google login
* [ ] Test email login
* [ ] Test logout
* [ ] Test signup
* [ ] Test password reset
* [ ] Test account deletion
* [ ] Redirect back to intended page after login

---

## Database & Supabase

* [ ] Audit EVERY `.from()` query
* [ ] Audit EVERY `.select()` query
* [ ] Ensure every query selects the correct table
* [ ] Ensure every join uses valid relationships
* [ ] Remove AI-generated invalid relationship queries
* [ ] Standardise profile loading
* [ ] Standardise listing loading
* [ ] Review every foreign key
* [ ] Review every RLS policy
* [ ] Remove duplicate queries
* [ ] Add helper functions for common queries
* [ ] Add proper error handling to every database call
* [ ] Ensure every server action returns meaningful errors

---

## Security

* [ ] Verify all RLS policies
* [ ] Verify users cannot edit others' listings
* [ ] Verify users cannot delete others' listings
* [ ] Verify storage permissions
* [ ] Verify message permissions
* [ ] Verify review permissions
* [ ] Verify order permissions

---

# 📱 PRIORITY 1 — USER EXPERIENCE

## Navigation

* [ ] Mobile hamburger menu
* [ ] Mobile side drawer
* [ ] Active navigation highlighting
* [ ] User dropdown
* [ ] Avatar menu
* [ ] Breadcrumbs
* [ ] Responsive navigation
* [ ] Better footer

---

## Authentication UI

* [ ] Loading buttons
* [ ] Disable buttons while submitting
* [ ] Toast notifications
* [ ] Success messages
* [ ] Error banners
* [ ] Friendly validation
* [ ] Enter key submits form

---

## Dashboard

Seller Dashboard

* [ ] Statistics cards
* [ ] Active listings
* [ ] Draft listings
* [ ] Sold listings
* [ ] Revenue summary
* [ ] Listing performance
* [ ] Messages summary

Buyer Dashboard

* [ ] Saved listings
* [ ] Orders
* [ ] Recently viewed
* [ ] Messages
* [ ] Recommendations

---

# 🎨 UI / UX / VISUAL DESIGN

## Overall Design

* [ ] Develop a cohesive design system
* [ ] Define typography scale
* [ ] Define spacing system
* [ ] Improve colour palette
* [ ] Improve iconography
* [ ] Improve button styles
* [ ] Improve form styling
* [ ] Improve cards
* [ ] Improve shadows
* [ ] Improve borders
* [ ] Improve hover animations
* [ ] Improve loading animations
* [ ] Improve transitions
* [ ] Improve responsiveness

---

## Homepage

* [ ] Hero illustration
* [ ] Better hero section
* [ ] Marketplace screenshots
* [ ] Animated feature cards
* [ ] Trust section
* [ ] Testimonials
* [ ] Statistics section
* [ ] Featured listings
* [ ] Categories section
* [ ] Download app section (future)
* [ ] Better footer
* [ ] Better CTA sections

---

## Marketplace

* [ ] Better listing cards
* [ ] Premium product gallery
* [ ] Better image carousel
* [ ] Skeleton loading
* [ ] Empty state illustrations
* [ ] Better badges
* [ ] Better filters
* [ ] Better search bar
* [ ] Floating action button on mobile

---

## Images

* [ ] High-quality category illustrations
* [ ] Category icons
* [ ] Empty state graphics
* [ ] Placeholder images
* [ ] Trust illustrations
* [ ] Buyer protection graphics
* [ ] Seller protection graphics
* [ ] Onboarding illustrations
* [ ] Profile avatars
* [ ] Default avatar system

---

## Branding

* [ ] Refine logo
* [ ] Logo variations
* [ ] Favicon improvements
* [ ] Social media assets
* [ ] Open Graph improvements
* [ ] Brand guidelines

---

## Micro-interactions

* [ ] Smooth page transitions
* [ ] Success animations
* [ ] Error animations
* [ ] Button feedback
* [ ] Image hover effects
* [ ] Card hover effects
* [ ] Loading spinners
* [ ] Toast animations

---

## Accessibility

* [ ] Keyboard navigation
* [ ] Focus states
* [ ] Screen reader support
* [ ] Colour contrast audit
* [ ] Font scaling
* [ ] Motion reduction support

---

## Inspiration

Study and borrow the best UX patterns from:

* [ ] Stripe
* [ ] Linear
* [ ] Apple
* [ ] Airbnb
* [ ] Vercel
* [ ] Shopify
* [ ] Notion
* [ ] Takealot
* [ ] eBay
* [ ] Facebook Marketplace

# 📸 Content & Assets

- [ ] Replace every placeholder image
- [ ] Use realistic product photography
- [ ] Add beautiful empty-state illustrations
- [ ] Add professional onboarding graphics
- [ ] Add marketplace screenshots to the landing page
- [ ] Ensure every page has a polished visual hierarchy
- [ ] Create a premium, trustworthy aesthetic consistent across the platform

# 🛍 PRIORITY 2 — MARKETPLACE

## Listings

* [ ] Better listing form
* [ ] Better image uploader
* [ ] Drag & drop images
* [ ] Image compression
* [ ] Image cropping
* [ ] Cover image selection
* [ ] Listing drafts
* [ ] Duplicate listing
* [ ] Archive listing
* [ ] Reactivate listing
* [ ] Delete confirmation

---

## Browse

* [ ] Better search
* [ ] Search suggestions
* [ ] Filters
* [ ] Price range
* [ ] Categories
* [ ] Condition filter
* [ ] Location filter
* [ ] Sort improvements
* [ ] Infinite scrolling
* [ ] Better pagination

---

## Listing Details

* [ ] Better gallery
* [ ] Zoom images
* [ ] Seller card
* [ ] Seller profile
* [ ] Seller listings
* [ ] Related listings
* [ ] Share listing
* [ ] Save listing
* [ ] Report listing
* [ ] Contact seller
* [ ] View count
* [ ] Recently viewed

---

# 💬 PRIORITY 3 — COMMUNICATION

## Messaging

* [ ] Better inbox
* [ ] Conversation previews
* [ ] Search messages
* [ ] Typing indicators
* [ ] Read receipts
* [ ] Unread badges
* [ ] Image attachments

---

## Notifications

* [ ] Notification centre
* [ ] Mark all read
* [ ] Email notifications
* [ ] Push notifications
* [ ] Notification preferences

---

## Reviews

* [ ] Seller ratings
* [ ] Buyer ratings
* [ ] Rating summary
* [ ] Review moderation
* [ ] Report reviews

---

# 📦 PRIORITY 4 — ORDERS

* [ ] Better order timeline
* [ ] Shipping status
* [ ] Collection option
* [ ] Tracking number
* [ ] Buyer confirmation
* [ ] Seller confirmation
* [ ] Cancel order
* [ ] Refund placeholder

---

# 💳 PRIORITY 5 — PAYMENTS

* [ ] Research South African payment providers
* [ ] Payment architecture
* [ ] Escrow architecture
* [ ] Payment provider integration
* [ ] Payment webhooks
* [ ] Refund flow
* [ ] Dispute flow
* [ ] Seller payouts

---

# 🛡 PRIORITY 6 — TRUST & SAFETY

* [ ] Report listing
* [ ] Report seller
* [ ] Report buyer
* [ ] Block user
* [ ] Buyer protection page
* [ ] Seller protection page
* [ ] Safety Centre
* [ ] Scam detection
* [ ] Fraud monitoring
* [ ] Identity verification
* [ ] Verified seller programme

---

# 👑 PRIORITY 7 — ADMIN

* [ ] Admin dashboard
* [ ] Moderate listings
* [ ] Moderate users
* [ ] Moderate reports
* [ ] Moderate reviews
* [ ] Ban users
* [ ] Suspend users
* [ ] Feature listings
* [ ] Verify sellers
* [ ] Analytics dashboard

---

# 🚀 PRIORITY 8 — PERFORMANCE

* [ ] Image optimisation
* [ ] Lazy loading
* [ ] Skeleton loading
* [ ] Better caching
* [ ] Reduce bundle size
* [ ] Optimise queries
* [ ] Optimise Core Web Vitals
* [ ] Lighthouse audit

---

# 🌍 PRIORITY 9 — SEO & MARKETING

* [ ] Metadata audit
* [ ] Structured data audit
* [ ] Sitemap verification
* [ ] Robots verification
* [ ] Google Analytics
* [ ] Microsoft Clarity
* [ ] Search Console
* [ ] Bing Webmaster Tools
* [ ] Blog
* [ ] Help Centre
* [ ] FAQ improvements

---

# ⚖ LEGAL

* [ ] Privacy Policy review
* [ ] Terms of Service
* [ ] Seller Agreement
* [ ] Buyer Agreement
* [ ] POPIA compliance
* [ ] Cookie Policy
* [ ] Returns policy

---

# 📱 FUTURE

* [ ] Native mobile app
* [ ] PWA
* [ ] Push notifications
* [ ] AI listing generation
* [ ] AI image enhancement
* [ ] AI pricing suggestions
* [ ] AI scam detection
* [ ] Saved searches
* [ ] Watchlist alerts
* [ ] Offers
* [ ] Auctions
* [ ] Business accounts
* [ ] Bulk uploads
* [ ] API
* [ ] International expansion

---

# 🧹 TECHNICAL DEBT

* [ ] Audit every AI-generated file
* [ ] Remove duplicate code
* [ ] Improve folder structure
* [ ] Standardise server actions
* [ ] Standardise database access
* [ ] Standardise error handling
* [ ] Add logging
* [ ] Add monitoring
* [ ] Add integration tests
* [ ] Add end-to-end tests
* [ ] Add unit tests
* [ ] Improve documentation

## Authentication notes

- Server-side policy: minimum password length set to 8 characters. Passwords must include at least one uppercase letter, one lowercase letter, and one number. Special characters are allowed but not required. Client-side checklist and strength indicator provide live feedback.
- Resend verification and robust account linking require Supabase service-role capabilities; manual configuration and owner credentials are required. Account linking is deferred to a future enhancement and not implemented in this MVP.

---

# 🚀 PUBLIC LAUNCH CHECKLIST

* [ ] Authentication fully tested
* [ ] Marketplace fully tested
* [ ] Mobile tested
* [ ] Tablet tested
* [ ] Desktop tested
* [ ] Cross-browser tested
* [ ] Accessibility audit
* [ ] Security audit
* [ ] Performance audit
* [ ] Production email configured
* [ ] Analytics verified
* [ ] Error monitoring enabled
* [ ] Backups enabled
* [ ] Beta feedback addressed
* [ ] Launch announcement prepared

---

# 💡 FUTURE IDEAS

* [ ] Escrow timeline
* [ ] AI dispute assistant
* [ ] Price history
* [ ] Seller reputation score
* [ ] Local pickup scheduling
* [ ] Charity listings
* [ ] Digital products
* [ ] Services marketplace
* [ ] Vehicle marketplace
* [ ] Property marketplace
* [ ] Job marketplace
* [ ] Community forums

---

# 🎯 LONG-TERM VISION

Faceless Marketplace should become the safest and most trusted marketplace in South Africa by combining strong buyer protection, transparent seller reputation, intuitive design, and AI-assisted fraud prevention. Every feature should prioritize trust, simplicity, and ease of use while keeping the platform fast, accessible, and enjoyable on both desktop and mobile.
