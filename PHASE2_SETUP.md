# RAF Premium Foods — Google Sheet + Apps Script Setup

## 1. Create the order database
1. Create a new Google Sheet named `RAF Premium Foods Orders`.
2. Extensions → Apps Script.
3. Delete the default code and paste the content from `google-apps-script/Code.gs`.
4. Save.
5. Run function `setupRAF()` once.
6. Approve the requested Google permissions.

This creates:
- Orders tab
- Config tab
- Payment status dropdown
- Verifier dropdown: Hayati / Rafiq
- Delivery status dropdown

## 2. Deploy the Order API
Apps Script:
1. Deploy → New deployment.
2. Type: Web app.
3. Execute as: Me.
4. Who has access: Anyone.
5. Deploy.
6. Copy the Web App URL.

Open `config.js` and replace:
`PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

with the deployed URL.

## 3. Order flow
Customer website
→ cart
→ checkout
→ order saved to Google Sheet
→ RAF receives email notification
→ WhatsApp order opens with complete order details
→ customer pays
→ Hayati/Rafiq changes Payment Status to PAID
→ Apps Script automatically sets Delivery Status = PAYMENT VERIFIED
→ if customer email exists, confirmation email is sent
→ enter Pos Malaysia Consignment No
→ status becomes READY TO PRINT
→ after handover to courier set SHIPPED
→ customer can check status using `track.html`

## 4. Shipping logic
Configured in website:
RM5.60 per billable kg.
Weight is rounded UP to the next kg, with minimum 1kg.

Example:
0.75kg → billed 1kg → RM5.60
1.20kg → billed 2kg → RM11.20

If your actual Pos Malaysia tariff uses zones or different minimums, edit `config.js`.

## 5. FPX
The website deliberately does NOT contain any private FPX/API credential.

To activate payment:
- choose the merchant gateway
- create payment request from a backend/serverless function
- receive gateway webhook/callback
- match callback to Order ID
- update Payment Method, Payment Status and Payment Reference in Google Sheet

Never expose:
- secret keys
- signing keys
- merchant private credentials
inside `config.js`, `app.js`, HTML or public GitHub.

## 6. Pos Malaysia
Current package prepares the fulfilment workflow and consignment field.
For automatic consignment creation/label printing, connect the official Pos Malaysia merchant/shipping API or portal integration using your merchant credentials.

## 7. Domain deploy
Upload the website files to the document root for:
https://rafpremiumfoods.com

After live deployment, test:
- mobile checkout
- Google Sheet write
- WhatsApp order
- tracking
- payment verification status
- email notification
