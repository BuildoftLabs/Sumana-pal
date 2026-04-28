export const navItems = ["Home", "Services", "Testimonial", "Offers", "About me", "Blogs", "Contact"];

export const treatSection = {
  badge: "What I Treat",
  titlePrefix: "Whatever your body is dealing with",
  titleAccent: "I've seen it before.",
  description: "I build eating plans for real conditions, real schedules, and real lives.",
  cards: [
    {
      title: "PCOD/PCOS",
      iconUrl: "/treat-icons/pcod-pcos.png",
      icon: (
        <svg viewBox="0 0 64 64" role="img" aria-label="PCOD/PCOS icon">
          <path
            d="M18 24c0-7 6-12 14-12s14 5 14 12c0 6-4 9-8 11 3 2 6 6 6 11 0 7-6 12-12 12s-12-5-12-12c0-5 3-9 6-11-4-2-8-5-8-11Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M24 26c3-3 6-4 8-4s5 1 8 4M26 46c2 2 4 3 6 3s4-1 6-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      title: "Weight Loss",
      iconUrl: "/treat-icons/weight-loss.png",
      icon: (
        <svg viewBox="0 0 64 64" role="img" aria-label="Weight loss icon">
          <path
            d="M20 18h24M24 46h16M32 18v28"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M26 32h12l-6 8-6-8Z" fill="currentColor" />
          <path
            d="M16 46h32"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      title: "Thyroid",
      iconUrl: "/treat-icons/thyroid.png",
      icon: (
        <svg viewBox="0 0 64 64" role="img" aria-label="Thyroid icon">
          <path
            d="M26 16c0 6-4 8-8 10v8c0 12 6 20 14 20s14-8 14-20v-8c-4-2-8-4-8-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M24 30h16M24 38h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      title: "Diabetes",
      iconUrl: "/treat-icons/diabetes.png",
      icon: (
        <svg viewBox="0 0 64 64" role="img" aria-label="Diabetes icon">
          <path
            d="M26 12v8l-8 14a14 14 0 0 0 12 21h4a14 14 0 0 0 12-21l-8-14v-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M38 22h10M43 17v10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M28 38c2-2 6-2 8 0s6 2 8 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ]
};

export const servicesSection = {
  badge: "Services",
  titlePrefix: "Pick what fits",
  titleAccent: "where you are right now.",
  description:
    "No one-size-fits-all plans. Every program is built around your condition, your schedule, and your life.",
  progress: { current: 1, total: 7 },
  cards: [
    {
      title: "Kids Nutrition",
      description:
        "Healthy growth, stronger immunity, and better focus — through food children actually enjoy.",
      imageAlt: "Child eating healthy food",
      imageUrl:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
      badge: null,
      primaryCta: { label: "Get This", href: "#get-kids-nutrition" },
      secondaryCta: { label: "Know More", href: "#kids-nutrition" }
    },
    {
      title: "Weight Loss",
      description:
        "Lose weight steadily without giving up rice, roti, or eating out. Real plans for real lives.",
      imageAlt: "Tape measure around waist",
      imageUrl:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
      badge: "Most Enquired",
      primaryCta: { label: "Get This", href: "#get-weight-loss" },
      secondaryCta: { label: "Know More", href: "#weight-loss" }
    },
    {
      title: "Sports Nutrition",
      description:
        "Fuel performance, speed up recovery, and build endurance — without supplements you don’t need.",
      imageAlt: "Cyclist training outdoors",
      imageUrl:
        "https://images.unsplash.com/photo-1520975693411-bc2d1a9a9a65?auto=format&fit=crop&w=900&q=80",
      badge: null,
      primaryCta: { label: "Get This", href: "#get-sports-nutrition" },
      secondaryCta: { label: "Know More", href: "#sports-nutrition" }
    },
    {
      title: "PCOS Care",
      description:
        "Balanced meals and practical routines to support hormones, energy, and steady progress every day.",
      imageAlt: "Healthy meal planning for PCOS",
      imageUrl:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
      badge: null,
      primaryCta: { label: "Get This", href: "#get-pcos-care" },
      secondaryCta: { label: "Know More", href: "#pcos-care" }
    },
    {
      title: "Diabetes Management",
      description:
        "Simple food plans to help manage blood sugar, improve consistency, and fit real daily schedules.",
      imageAlt: "Nutrition plan for diabetes management",
      imageUrl:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=900&q=80",
      badge: "Popular",
      primaryCta: { label: "Get This", href: "#get-diabetes-management" },
      secondaryCta: { label: "Know More", href: "#diabetes-management" }
    },
    {
      title: "Prenatal Nutrition",
      description:
        "Support a healthy pregnancy with nourishing meals that cover cravings, energy, and essential nutrients.",
      imageAlt: "Prenatal healthy foods",
      imageUrl:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80",
      badge: null,
      primaryCta: { label: "Get This", href: "#get-prenatal-nutrition" },
      secondaryCta: { label: "Know More", href: "#prenatal-nutrition" }
    },
    {
      title: "Thyroid Support",
      description:
        "A realistic food-first plan to support metabolism, improve energy, and make routines easier to follow.",
      imageAlt: "Healthy foods for thyroid support",
      imageUrl:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80",
      badge: null,
      primaryCta: { label: "Get This", href: "#get-thyroid-support" },
      secondaryCta: { label: "Know More", href: "#thyroid-support" }
    }
  ]
};

export const testimonialsSection = {
  badge: "Testimonials",
  title: "Real People. Real Results.",
  description:
    "Over 3,000 people have trusted Sumana with their health. Here's what some of them have to say.",
  rating: { value: 4.9, label: "150+ Reviews" },
  people: [
    { initials: "S", color: "#f26f3f" },
    { initials: "A", color: "#234f43" },
    { initials: "R", color: "#0ea5e9" },
    { initials: "M", color: "#8b5cf6" }
  ],
  testimonials: [
    {
      name: "Sujata Chandra",
      stars: 5,
      avatar: { initials: "S", color: "#f26f3f" },
      text:
        "Dietician Sumana Pal Roy Mam's diet chart helped me lose 3kg in just 1 month! The plan was simple, easy to follow, and tailored to my needs. I never felt hungry or deprived, and the results have been incredible. She was always supportive and answered all my questions along the way. I'm so happy with the results, and I highly recommend her to anyone looking for a practical, effective, and personalized diet plan. ❤️❤️"
    },
    {
      name: "Sujata Chandra",
      stars: 5,
      avatar: { initials: "S", color: "#234f43" },
      text:
        "Dietician Sumana Pal Roy Mam's diet chart helped me lose 3kg in just 1 month! The plan was simple, easy to follow, and tailored to my needs. I never felt hungry or deprived, and the results have been incredible. She was always supportive and answered all my questions along the way. I'm so happy with the results, and I highly recommend her to anyone looking for a practical, effective, and personalized diet plan. ❤️❤️"
    },
    {
      name: "Sujata Chandra",
      stars: 5,
      avatar: { initials: "S", color: "#0ea5e9" },
      text:
        "Dietician Sumana Pal Roy Mam's diet chart helped me lose 3kg in just 1 month! The plan was simple, easy to follow, and tailored to my needs. I never felt hungry or deprived, and the results have been incredible. She was always supportive and answered all my questions along the way. I'm so happy with the results, and I highly recommend her to anyone looking for a practical, effective, and personalized diet plan. ❤️❤️"
    }
  ],
  ctaBar: {
    title: "Don't just take our word for it.",
    subtitle: "Read every review, unfiltered, directly on Google.",
    buttonLabel: "See All Google Reviews",
    buttonHref: "#google-reviews"
  }
};

export const transformationsSection = {
  badge: "Transformations",
  titlePrefix: "See what changes when food becomes",
  titleAccent: "your medicine.",
  description:
    "These are real clients, real results — achieved through personalized diet plans that fit their actual lives. No crash diets. No surgery. No shortcuts.",
  filters: ["All", "Weight Loss", "Weight Gain"],
  cards: [
    {
      category: "Weight Loss",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeImageUrl: null,
      afterImageUrl: null,
      person: "Priya, 28 F",
      chips: ["-14 kg", "4 Months"],
      tag: "Weight Loss",
      quote: "\"I didn't change my lifestyle. She changed my eating — that changed everything.\""
    },
    {
      category: "Weight Gain",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeImageUrl: null,
      afterImageUrl: null,
      person: "Priya, 28 F",
      chips: ["-14 kg", "4 Months"],
      tag: "Weight Gain",
      quote: "\"I didn't change my lifestyle. She changed my eating — that changed everything.\""
    },
    {
      category: "Weight Loss",
      beforeLabel: "Before",
      afterLabel: "After",
      beforeImageUrl: null,
      afterImageUrl: null,
      person: "Priya, 28 F",
      chips: ["-14 kg", "4 Months"],
      tag: "Weight Loss",
      quote: "\"I didn't change my lifestyle. She changed my eating — that changed everything.\""
    }
  ],
  cta: {
    title: "Ready to write your own story?",
    subtitle: "Start with a free 15-minute chat — no commitment, no pressure.",
    primary: { label: "Start My Transformation", href: "#start-transformation" },
    secondary: { label: "See More Result", href: "#more-results" }
  }
};

export const questionSection = {
  badge: "Got a Question?",
  left: {
    titleStrong: "Ask me anything.",
    titleMuted: "No question is too small."
  },
  form: {
    title: "Send Me Your Question",
    subtitle: "I'll get back to you within 24 hours — usually sooner.",
    fields: {
      name: { label: "Your Name", placeholder: "Enter Your Full Name", required: true },
      phone: { label: "Phone Number", placeholder: "Enter Your Phone Number", required: true },
      email: { label: "E-mail", placeholder: "example@mail.com", required: true },
      question: { label: "Your Question", placeholder: "Ask me anything...", required: true }
    },
    buttonLabel: "See More Result"
  }
};

export const offersSection = {
  stripItems: ["LIMITED SLOTS LEFT", "NAVRATRI OFFER - 50% OFF", "SPECIAL DEAL"],
  badge: "Limited Time Offer",
  titlePrefix: "Special Deals -",
  titleAccent: "Only For a Limited Time.",
  description:
    "Grab a discounted plan before slots fill up. I take limited new clients each month to give everyone personal attention.",
  cards: [
    {
      title: "50% Off",
      subtitle: "Navratri Offer",
      imageAlt: "Offer poster",
      imageUrl:
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=900&q=80",
      primaryCta: { label: "Grab This Offer", href: "#grab-offer-1" },
      secondaryCta: { label: "Know More", href: "#offer-1" }
    },
    {
      title: "50% Off",
      subtitle: "Navratri Offer",
      imageAlt: "Offer poster",
      imageUrl:
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=900&q=80",
      primaryCta: { label: "Grab This Offer", href: "#grab-offer-2" },
      secondaryCta: { label: "Know More", href: "#offer-2" }
    },
    {
      title: "50% Off",
      subtitle: "Navratri Offer",
      imageAlt: "Offer poster",
      imageUrl:
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&w=900&q=80",
      primaryCta: { label: "Grab This Offer", href: "#grab-offer-3" },
      secondaryCta: { label: "Know More", href: "#offer-3" }
    }
  ]
};

export const bmiSection = {
  badge: "Free Tool",
  titlePrefix: "Understand Your BMI",
  titleAccent: "Unlock Your Next Move",
  description: "A quick calculation to understand your body weight relative to your height.",
  gender: {
    label: "Select Your Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" }
    ]
  },
  height: { label: "Height", placeholder: "0", unit: "cm", minCm: 60, maxCm: 250 },
  weight: { label: "Weight", placeholder: "0", unit: "kg", minKg: 10, maxKg: 400 },
  form: {
    title: "BMI Calculator",
    subtitle: "Fill in your details and click Calculate BMI to see your result.",
    buttonLabel: "Calculate BMI"
  },
  ranges: [
    { key: "under", label: "Underweight", min: null, max: 18.49 },
    { key: "healthy", label: "Healthy Weight", min: 18.5, max: 24.99 },
    { key: "over", label: "Overweight", min: 25, max: 29.99 },
    { key: "obese", label: "Obesity", min: 30, max: null }
  ],
  result: {
    title: "Your BMI",
    emptyValue: "--",
    categoryLabel: "Status",
    emptyCategory: "--",
    healthyLabel: "Healthy Weight",
    emptyHealthy: "--",
    overviewLabel: "Overview",
    overviewBullets: ["Your current BMI", "Your healthy range", "Simple next steps"],
    cta: { label: "Get Your Personalized Plan", href: "#book-call" }
  }
};

export const faqSection = {
  badge: "FAQs",
  titlePrefix: "Frequently Asked",
  titleAccent: "Questions",
  description:
    "Questions I get asked every single day.\nI've answered the most common ones here — honestly, in plain language, no jargon.",
  defaultOpenIndex: 0,
  items: [
    {
      q: "How much weight can I lose in a month?",
      a: "Healthy and sustainable weight loss is typically 2–4 kg per month, depending on your body type, metabolism, medical conditions, and adherence to the plan. Extreme weight loss is not recommended as it can harm your health."
    },
    {
      q: "Can I lose weight if I have thyroid issues or PCOD?",
      a: "Yes. With the right plan, weight loss is possible even with thyroid issues or PCOD. The key is a personalized approach that supports hormones, metabolism, sleep, stress, and realistic routines."
    },
    {
      q: "Can I become a mother if I have PCOD?",
      a: "Many women with PCOD can conceive with the right lifestyle, nutrition, and medical guidance. Improving insulin sensitivity, maintaining a healthy weight, and supporting ovulation often helps."
    },
    {
      q: "Is it necessary to stop eating rice or roti for weight loss?",
      a: "No. Weight loss depends on total calories, portion sizes, and balance. You can include rice/roti in the right quantity and still reach your goals."
    },
    {
      q: "Do I need to take supplements for weight loss?",
      a: "Not always. Most people can achieve results through food-first nutrition. Supplements may be recommended only if there is a deficiency or specific medical need."
    }
  ]
};

export const footerSection = {
  brand: {
    name: "Sumana Pal Roy",
    tagline: "Dietitian • Personalized nutrition plans"
  },
  links: {
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/dietitian_sumana.pal?igsh=YjVreThqaTE4bGhw"
    },
    whatsapp: {
      label: "WhatsApp Channel",
      href: "https://whatsapp.com/channel/0029VaEOZ5VDZ4LRTdESFQ1l"
    }
  },
  map: {
    title: "Visit",
    locationLabel: "Chinsurah",
    iframeTitle: "Chinsurah map",
    embedUrl: "https://www.google.com/maps?q=Chinsurah&output=embed",
    linkLabel: "Open in Google Maps",
    linkUrl: "https://share.google/I12RMbm8uAqaIBu0c"
  },
  legal: {
    rightsText: "All rights reserved."
  }
};

