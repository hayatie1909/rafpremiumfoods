# RAF Premium Foods Ecommerce — Phase 3 (Online Bank Transfer)

# RAF Premium Foods Ecommerce — Phase 2

# RAF Premium Foods Ecommerce Website

Domain target: https://rafpremiumfoods.com

## Status
This is a deployable static ecommerce storefront with:
- Responsive mobile + desktop layout
- RAF brand/logo and product packaging assets
- 4 product cards
- Quantity controls
- Persistent cart using localStorage
- Checkout form
- WhatsApp order generation
- FPX-ready UI placeholder
- SEO/OpenGraph basics
- Product bundle button

## IMPORTANT: Retail prices
The retail prices in `config.js` are DEMO values only. Change them before going live.

Current demo:
- Sambal Kering Bilis Premium 150g — RM18.90
- Sambal Penyet Original 200g — RM16.90
- Sambal Tumis Original 200g — RM16.90
- Ibu Sambal Serbaguna 200g — RM15.90

## WhatsApp
Configured in `config.js`:
60146668492

## Run locally
Open `index.html` in a browser.

For best local testing:
python -m http.server 8080
Then open http://localhost:8080

## Deploy
Upload the full folder contents to the document root of `rafpremiumfoods.com`.
Typical hosting folders:
- cPanel: public_html/
- Plesk: httpdocs/
- Netlify/Vercel: deploy this folder

## FPX
Do NOT place gateway private/API keys in `config.js` or any browser JavaScript.

To activate FPX, use a server-side/serverless endpoint with a Malaysian gateway such as:
- Billplz
- ToyyibPay
- senangPay

Recommended flow:
1. Customer submits checkout.
2. Browser POSTs order to secure backend.
3. Backend creates bill/payment request.
4. Customer is redirected to FPX.
5. Gateway callback/webhook updates payment status.
6. Paid order is written to Google Sheet/database.
7. Customer receives confirmation.

## Files
- index.html — storefront
- styles.css — design
- config.js — products/prices/contact config
- app.js — cart + checkout logic
- assets/raf-logo.png
- assets/raf-products.png


See `PHASE2_SETUP.md` and `OPERATING_WORKFLOW.md`.
