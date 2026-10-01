/**
 * Every visible string on the storefront, copied from modessae.com.
 * Keep the copy identical; only the presentation changed.
 */

export const ANNOUNCEMENTS = [
  "For a limited time only",
  "Free tracked shipping only today",
  "Closing down sale",
];

export const HERO = {
  title: "After 14 years, we're closing",
  subtitle: "Everything 50% off",
  cta: "Shop now",
  ctaHref: "/collections/abiti",
  imageAlt: "Helen and Jess standing in the MODESSAE boutique beside a 'closing down after 14 years' sign",
};

export const BEST_SELLERS_TITLE = "Shop our best sellers";

export const REVIEWS_SUMMARY = {
  title: "What our customers say",
  rating: "4.8/5",
  ratingWord: "Excellent",
  count: "Over 13,548 reviews",
};

export type Review = {
  quote: string;
  name: string;
  city: string;
  when: string;
  image: string;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "I'm always a bit nervous ordering from a shop I don't know, but this parcel was neat, carefully packed, and MODESSAE earned my trust straight away.",
    name: "Claire C.",
    city: "Launceston",
    when: "1 day ago",
    image: "/images/reviews/review-1.jpg",
  },
  {
    quote:
      "I couldn't help smiling the moment I saw the heel in person. The colour is elegant without being too serious, and it made me want to feel feminine again.",
    name: "Janine V.",
    city: "Geelong",
    when: "5 hours ago",
    image: "/images/reviews/review-2.jpg",
  },
  {
    quote:
      "I recommended MODESSAE to my sister in Melbourne and she rang me straight after her first order to say thank you. When a woman with taste approves, you know it's the real thing.",
    name: "Vanessa G.",
    city: "Geelong",
    when: "2 days ago",
    image: "/images/reviews/review-3.jpg",
  },
  {
    quote:
      "Opening the parcel at home felt like a little treat. The bag was well protected, the colour is gorgeous, and the size is practical without being bulky.",
    name: "Carol L.",
    city: "Adelaide",
    when: "6 hours ago",
    image: "/images/reviews/review-4.jpg",
  },
  {
    quote:
      "Ordering online still makes me hesitate sometimes, but holding this parcel made me smile. Neat, carefully packed, and MODESSAE really does seem to care.",
    name: "Denise P.",
    city: "Toowoomba",
    when: "2 days ago",
    image: "/images/reviews/review-5.jpg",
  },
  {
    quote:
      "I was after a simple black bag that still looks elegant. This one is soft, roomy, easy to carry, and makes me feel more put together without trying.",
    name: "Leah V.",
    city: "Bendigo",
    when: "3 days ago",
    image: "/images/reviews/review-6.png",
  },
  {
    quote:
      "Gorgeous dress, but heads up, it runs small, so go up a size. Once you've got the right one, the structured waist and flowing skirt are worth every cent.",
    name: "Pauline A.",
    city: "Bunbury",
    when: "5 hours ago",
    image: "/images/reviews/review-7.png",
  },
  {
    quote:
      "This photo sums up why I keep coming back. Everything feels considered and beautiful, from a label that understands a woman wants more than just a dress.",
    name: "Leah V.",
    city: "Nelson",
    when: "1 day ago",
    image: "/images/reviews/review-8.jpg",
  },
  {
    quote:
      "I wanted to show the details because they genuinely surprised me. The heel feels stable, the strap is delicate, and the colour goes easily with everyday outfits.",
    name: "Simone M.",
    city: "Launceston",
    when: "1 day ago",
    image: "/images/reviews/review-9.png",
  },
];

export const FAREWELL = {
  title: "We said goodbye forever...",
  paragraphs: [
    "Fourteen years ago, the two of us decided to stop waiting for someone else to build something for us and do it ourselves.",
    "We started with almost nothing — a small store, a rack of clothes, and one simple idea: a woman doesn't stop wanting to feel beautiful just because she's no longer twenty-five.",
    "Fourteen years later, that idea still holds. What no longer adds up are the numbers — rent, bills, taxes, everything costs more now — and staying open would mean cutting corners on the one thing we never compromised on: quality.",
    "So we're sad, but we'd rather close on a high note than struggle to stay open.",
    "Everything left is 50% off. These are our last pieces — once they're gone, there's no restocking.",
  ],
  thanks: "Thank you for these fourteen years. We mean it.",
  signature: "— Helen & Jess ❤️",
};

export type Faq = { q: string; a: string[] };

export const FAQ_TITLE = "Frequently asked questions";

export const FAQS: Faq[] = [
  {
    q: "Why shop with MODESSAE?",
    a: [
      "At MODESSAE, every piece is chosen to make you feel good, not just look good.",
      "Since 2012 we've focused on quality, style and comfort, pairing what's current with a timeless touch that never dates.",
      "We choose every piece carefully and pay attention to every detail, from the design right through to delivery, so shopping with us is simple, safe and enjoyable.",
      "You won't just find clothes here, but pieces that reflect who you are and carry you through every part of your day.",
    ],
  },
  {
    q: "How long does shipping take?",
    a: [
      "We offer free tracked shipping to Australia and New Zealand.",
      "Orders are packed within 1–2 business days and usually arrive within 7–12 business days in major cities, or 10–16 business days in regional areas.",
      "Once your order ships, you'll receive a tracking link so you can follow it at any time. Tracking can take 3–5 business days to start updating.",
    ],
  },
  {
    q: "Where is my order?",
    a: [
      "Once your order ships, you'll receive an email with your tracking number.",
      "Enter it on our order tracking page to follow your parcel in real time.",
    ],
  },
  {
    q: "How do returns work?",
    a: [
      "At MODESSAE, we want you to love what you ordered.",
      "You have 30 days from delivery to return an item you've changed your mind about. It must be unworn, unwashed and have its tags attached.",
      "To start a return, simply email us at info@modessae.com and we'll send you the return address. If an item is faulty or not as described, we cover the return postage.",
      "Your rights under the Australian Consumer Law and the New Zealand Consumer Guarantees Act always apply.",
    ],
  },
  {
    q: "Which payment methods do you accept?",
    a: [
      "We accept the most secure and widely used payment methods, including Visa, Mastercard and American Express credit and debit cards.",
      "You can also pay with Apple Pay, Google Pay and Shop Pay for a faster checkout.",
    ],
  },
];

/** Two extra questions that only appear on the contact page. */
export const CONTACT_EXTRA_FAQS: Faq[] = [
  {
    q: "Are your products made ethically and sustainably?",
    a: [
      "We value responsible business practices and only work with partners who meet strict quality standards. Every order is also packed and shipped with care.",
    ],
  },
  {
    q: "My tracking says “delivered” but I haven't received anything. What should I do?",
    a: [
      "First, check with your neighbours and around your property, as couriers sometimes leave parcels in a safe place.",
      "If it still hasn't turned up, email us at info@modessae.com with your order number. We'll contact the courier to check for a delivery photo or other proof of delivery.",
      "We'll do everything we can to sort it out quickly.",
    ],
  },
];

export const SERVICES = [
  {
    title: "Free shipping",
    text: "Enjoy free tracked shipping on every order to Australia and New Zealand, with no minimum spend. Every parcel is packed with care and tracked all the way to your door.",
  },
  {
    title: "30-day returns",
    text: "You have 30 days to return an item. If something isn't right, the process is simple and straightforward.",
  },
  {
    title: "Secure payment",
    text: "Shop with complete peace of mind thanks to secure, encrypted payments. Your details are protected with every purchase.",
  },
];

export const CLOSING_SALE = {
  title: "Our closing down sale",
  lines: [
    "Every remaining piece is now up to 50% off. Final sizes only, no restocks.",
    "This is your last chance to buy from our original collection. Once pieces sell out, they won't be back.",
    "Enjoy free tracked shipping on every item, plus 30-day returns so you can try your piece at home with peace of mind.",
  ],
  closer: "When they're gone, they're gone for good.",
};

export const CONTACT = {
  title: "Contact us",
  hoursTitle: "Customer service hours (Sydney time):",
  hours: ["Monday to Friday: 9am to 5pm", "Saturday: 10am to 2pm"],
  questionTitle: "Got a question?",
  questionText: "Email us any time at:",
  email: "info@modessae.com",
};

export const CONTACT_PAGE = {
  title: "We're here for you!",
  intro: "Have a question about your order, our collection or anything else?",
  text: "Our customer service team is here to help. Fill in the contact form below or email us at info@modessae.com and we'll get back to you as soon as possible.",
};

export const STORY_PAGE = {
  title: "Our Story",
  paragraphs: [
    "MODESSAE was born from a divorce, a lease she couldn't afford and a nine-year-old daughter.",
    "Fourteen years ago Helen found herself on her own in Sydney, starting again from scratch, including the way she saw fashion. She opened a tiny boutique for the women of her neighbourhood in Paddington. Not for catalogue sizes. For real bodies, for women living full lives who simply wanted to feel good in what they wore.",
    "In the early days, everything went through her hands. Every woman who walked in would explain what she was looking for, and Helen would genuinely answer, not with standard sizes, but with the same advice you'd give a friend who asks \"but what should I wear?\". Every piece was chosen with a real woman in mind. Every detail, a considered choice.",
    "Jess grew up among those racks, doing her homework behind the counter and watching her mum work. Over time, what had been Helen's calling became her path too.",
    "Building something like this takes years, energy and a great deal of your own life. But that's exactly where the most important part of the story came from: today Jess works beside her mum, and together they've run MODESSAE as what it always was: a family business, built one decision at a time.",
    "Over the years the boutique grew, with a proper collection and a small team. But its heart stayed exactly the same as it was fourteen years ago.",
    "Every piece is still chosen with the same question in mind: \"would a real woman wear this and feel like herself?\" Every collection is chosen for women who work, go out and live full lives: not for a mannequin, not for a sample size.",
  ],
  pullQuote: "We don't sell trends. We sell that feeling of finally knowing what to wear.",
  paragraphsAfter: [
    "From a tiny shopfront in Paddington, MODESSAE became the choice of more than 50,000 women across Australia and New Zealand. And honestly, that still amazes us every time we stop to think about it.",
    "This year, after fourteen years, the cost of living caught up with us too, and we've made the hardest decision of our lives: we're closing.",
    "Thank you for being here. For trusting us from the very beginning.",
    "Everything we have left is now 50% off. Once it's gone, it won't be back.",
  ],
  signoff: "With love,",
  signature: "Helen & Jess.",
};

export const WORK_PAGE = {
  title: "Join our team",
  subtitle: "Thank you for your interest in MODESSAE",
  paragraphs: [
    "As we're closing our boutique after 14 years, we're not taking on new team members at the moment.",
    "If you have a question about an order, we'd love to help: email us at info@modessae.com.",
  ],
};

export const TRACK_PAGE = {
  title: "Track your order",
  paragraphs: [
    "Once your order ships, you'll receive an email with your tracking number.",
    "Enter it on our order tracking page to follow your parcel in real time.",
    "Tracking can take 3–5 business days to start updating after you receive it. That's normal and doesn't mean anything is wrong.",
  ],
  trackerUrl: "https://modessae.com/a/tracciamento-ordine",
};

/** Collection-page letter shown above the product grid on the live store. */
export const COLLECTION_LETTER = {
  title: "Thank you for 14 years 🤍",
  paragraphs: [
    "Fourteen years ago I was on my own, with a nine-year-old daughter and a lease I couldn't really afford. I opened a tiny boutique in Paddington for women who'd stopped seeing themselves in shop windows.",
    "Today my daughter Jess works beside me. Together we choose every piece with the same question: would a real woman wear this and feel like herself?",
    "This year the rent went up again, freight kept climbing, and like everyone, the women who shop with us are feeling the cost of living. We won't cut corners to survive. So we've made the hardest decision we've ever made: we're closing.",
    "Everything we have left is now 50% off. Pieces are limited, and once they're gone, we won't be restocking.",
  ],
  extraTitle: "Extra savings:",
  extras: [
    "10% extra on 2 pieces",
    "15% extra on 3 pieces",
    "20% extra on 4 pieces",
    "25% extra on 5 pieces or more",
  ],
  extraNote: "Extra savings apply automatically at checkout across the whole collection.",
  thanks: "Thank you, from the bottom of our hearts, for fourteen years.",
  signature: "— Helen & Jess",
};

export const CART_STRINGS = {
  empty: "Your cart is currently empty.",
  subtotal: "Subtotal",
  note: "Shipping, taxes, and discount codes calculated at checkout.",
  checkout: "Check out",
  inStock: "In stock, ready to ship",
  soldOut: "Sold Out",
  unavailable: "Unavailable",
  save: "Save",
};

/** Reviews shown on every product page (the live store rotates these seven). */
export const PRODUCT_REVIEWS: Review[] = [
  {
    quote:
      "If you're a woman over 40 who's tired of fashion made for teenagers, stop looking and come here. These dresses understand our bodies.",
    name: "Rhonda A.",
    city: "Adelaide",
    when: "5 hours ago",
    image: "/images/reviews/product-review-1.jpg",
  },
  {
    quote:
      "Elegant lines, and the gathering at the waist is so flattering on a real body. I ordered it straight away and it didn't disappoint, it fits exactly as it looks.",
    name: "Alison R.",
    city: "Launceston",
    when: "1 day ago",
    image: "/images/reviews/product-review-2.png",
  },
  {
    quote:
      "The packaging looked lovely. Inside, the floral print was very close to the photo, soft and romantic, although the colours were a touch less vivid in person.",
    name: "Trish M.",
    city: "Perth",
    when: "2 days ago",
    image: "/images/reviews/product-review-3.jpg",
  },
  {
    quote:
      "This dress made me feel like myself again, feminine and elegant without any effort. The cut is generous in all the right places for a real woman's body.",
    name: "Simone E.",
    city: "Bendigo",
    when: "3 days ago",
    image: "/images/reviews/product-review-4.png",
  },
  {
    quote:
      "Gorgeous dress, but heads up, it runs small, so go up a size. Once you've got the right one, the structured waist and flowing skirt are worth every cent.",
    name: "Pauline A.",
    city: "Bunbury",
    when: "5 hours ago",
    image: "/images/reviews/review-7.png",
  },
  {
    quote:
      "This photo sums up why I keep coming back. Everything feels considered and beautiful, from a label that understands a woman wants more than just a dress.",
    name: "Leah V.",
    city: "Nelson",
    when: "1 day ago",
    image: "/images/reviews/review-8.jpg",
  },
  {
    quote:
      "I recommended MODESSAE to my sister in Melbourne and she rang me straight after her first order to say thank you. When a woman with taste approves, you know it's the real thing.",
    name: "Vanessa G.",
    city: "Geelong",
    when: "2 days ago",
    image: "/images/reviews/review-3.jpg",
  },
];
