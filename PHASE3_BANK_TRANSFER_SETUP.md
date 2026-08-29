# RAF Premium Foods — Phase 3 Manual Bank Transfer Setup

## Current temporary payment flow
Until FPX is ready:

Customer
→ checkout
→ system generates RAF Order ID
→ order saved to Google Sheet
→ customer sees bank-transfer page
→ transfers via online banking
→ enters transfer reference + amount
→ optionally uploads JPG/PNG/PDF receipt
→ Google Sheet status becomes `PENDING VERIFICATION`
→ Hayati/Rafiq checks actual bank transaction
→ verifier selects their name
→ Payment Status changed to `PAID`
→ Delivery Status automatically becomes `PAYMENT VERIFIED`

## 1. Fill bank details
Open `config.js`:

bankName: "YOUR BANK"
accountName: "Noblemind Resources"
accountNumber: "YOUR ACCOUNT NUMBER"

Do not put:
- bank login
- password
- PIN
- TAC / OTP
- private keys

in the website.

## 2. Create Google Sheet
Create a Google Sheet named:
`RAF Premium Foods Orders`

Extensions → Apps Script → paste `google-apps-script/Code.gs`.

Run:
`setupRAF()`

Approve permissions.

## 3. Deploy Apps Script Web App
Deploy → New deployment → Web app
Execute as: Me
Who has access: Anyone

Copy the Web App URL and paste it into `config.js`:
`orderApiUrl`

## 4. Payment receipt storage
If customer uploads payment proof, Apps Script creates a Google Drive folder:
`RAF Payment Receipts`

The receipt URL is recorded in the Orders sheet.

Maximum receipt size on the website: 4MB.

## 5. Finance control
Do NOT mark PAID based only on a screenshot.

Verification procedure:
1. Open actual business bank transaction.
2. Match amount.
3. Match transaction reference where available.
4. Match Order ID/customer.
5. Select `Verified By`: Hayati or Rafiq.
6. Change Payment Status to `PAID`.
7. Only then proceed to packing/shipping.

## 6. When FPX is ready
Keep this manual-transfer option as backup.

Add FPX as:
- primary payment gateway
- webhook updates PAID automatically
- bank transfer remains secondary/manual option

No website redesign is required.
