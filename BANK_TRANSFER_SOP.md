# RAF Payment Verification SOP

1. Customer places order.
2. System assigns RAF Order ID.
3. Customer transfers exact order total.
4. Customer uses RAF Order ID as transfer reference where possible.
5. Customer submits transfer reference, amount and optional receipt.
6. Order changes to PENDING VERIFICATION.
7. Hayati/Rafiq checks actual bank account.
8. If matched:
   - select verifier
   - set Payment Status = PAID
9. System changes Delivery Status = PAYMENT VERIFIED.
10. Prepare shipment only after PAID.
11. Enter courier consignment number.
12. Set PACKED / SHIPPED / DELIVERED as fulfilment progresses.

Exceptions:
- Underpayment: keep PENDING VERIFICATION and contact customer.
- Overpayment: flag Internal Remarks before fulfilment.
- No bank transaction: do not mark PAID.
- Duplicate payment: preserve evidence and escalate for refund/credit decision.
- Screenshot alone is not proof of cleared funds.
