// RAF Premium Foods - Phase 3: Manual Online Bank Transfer
// Fill bank details here once the official account is ready.
// NEVER put passwords, TAC, PIN or private API keys here.
window.RAF_CONFIG = {
  siteUrl: "https://rafpremiumfoods.com",
  whatsappNumber: "60146668492",
  senderEmail: "raf-ecommerce@raf.com.my",
  senderAddress: "No. 3, Jalan Lombong Timah 29/48, Taman Orkid Maju 3, Seksyen 29, 40460 Shah Alam, Selangor",
  currency: "MYR",

  shippingRatePerKg: 5.60,
  minBillableKg: 1,

  // Paste deployed Google Apps Script Web App URL here.
  orderApiUrl: "https://script.google.com/macros/s/AKfycbzgTrPjX6HuueuWUu62rde11d1TVqA_ZbeRIsw3FrE1H8kpOSUNZ-RI1z8kCVpkdXk/exec",

  // Temporary payment method until FPX is ready.
  paymentMode: "BANK_TRANSFER",

  // Fill these when the bank account is available.
  bank: {
    bankName: "Maybank",
    accountName: "Nurhayati Kasiran",
    accountNumber: "162478283592",
    paymentNote: "Gunakan Order ID sebagai payment reference."
  },

  paymentVerifiers: ["Hayati", "Rafiq"],

  products: [
    {
      id: "bilis-premium",
      name: "Sambal Kering Bilis Premium",
      short: "Rangup • Wangi • Pedas",
      description: "Sambal bilis premium untuk nasi panas, bubur, roti atau makan terus.",
      weight: "150g",
      weightGram: 150,
      price: 18.90,
      tag: "BEST SELLER"
    },
    {
      id: "penyet-original",
      name: "Sambal Penyet Original",
      short: "Pedas • Padu • Membuka selera",
      description: "Sambal penyet yang bold dan sesuai digandingkan dengan ayam, tempe, tauhu dan nasi.",
      weight: "200g",
      weightGram: 200,
      price: 16.90,
      tag: "SPICY FAVOURITE"
    },
    {
      id: "tumis-original",
      name: "Sambal Tumis Original",
      short: "Pekat • Wangi • Lazat",
      description: "Sambal tumis serbaguna untuk nasi lemak, mee, bihun atau lauk harian.",
      weight: "200g",
      weightGram: 200,
      price: 16.90,
      tag: "TRADITIONAL"
    },
    {
      id: "ibu-sambal",
      name: "Ibu Sambal Serbaguna",
      short: "Pekat • Asli • Serbaguna",
      description: "Pes sambal untuk tumisan, sambal goreng, nasi lemak dan asas kuah.",
      weight: "200g",
      weightGram: 200,
      price: 15.90,
      tag: "COOKING SHORTCUT"
    }
  ]
};
