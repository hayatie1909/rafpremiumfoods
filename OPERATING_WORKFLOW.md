# RAF Premium Foods — Operating Workflow

CUSTOMER
1. Browse rafpremiumfoods.com
2. Add sambal to cart
3. Checkout
4. System calculates product total + shipping
5. Order ID generated
6. Order saved in Google Sheet
7. WhatsApp order sent

RAF ADMIN
8. Review order in Google Sheet
9. Send/confirm payment instruction
10. Verify bank/FPX payment
11. Set Payment Status = PAID
12. Select Verified By = Hayati or Rafiq
13. Enter Pos Malaysia Consignment No
14. Pack order
15. Print courier label / consignment note
16. Set Delivery Status = SHIPPED

CUSTOMER
17. Check order status via Track Order page
18. Receive delivery
19. Status = DELIVERED

CONTROL POINTS
- Never ship before Payment Status = PAID.
- Payment Reference should be recorded.
- Consignment No should be unique per shipment.
- Refunds should retain the original order record.
- Price changes are controlled in config.js.
