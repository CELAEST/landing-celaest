export type Locale = 'en' | 'es';

export interface Translation {
  nav: {
    products: string;
    pricing: string;
    about: string;
    faq: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subheadline1: string;
    subheadline2: string;
    browseCTA: string;
    watchDemo: string;
    stats: {
      assets: string;
      users: string;
      uptime: string;
      support: string;
    };
  };
  products: {
    title1: string;
    title2: string;
    subtitle: string;
    features: {
      verified: { title: string; description: string };
      secure: { title: string; description: string };
      roi: { title: string; description: string };
      python: { title: string; description: string };
      business: { title: string; description: string };
      instant: { title: string; description: string };
    };
    exploreCTA: string;
  };
  pricing: {
    title1: string;
    title2: string;
    subtitle: string;
    plans: {
      starter: {
        name: string;
        description: string;
        features: string[];
      };
      professional: {
        name: string;
        description: string;
        features: string[];
      };
      enterprise: {
        name: string;
        description: string;
        features: string[];
      };
    };
    mostPopular: string;
    getStarted: string;
    contactSales: string;
    guarantee: string;
  };
  about: {
    title1: string;
    title2: string;
    description1: string;
    description2: string;
    badge: string;
    values: {
      devFirst: { title: string; description: string };
      security: { title: string; description: string };
      quality: { title: string; description: string };
      support: { title: string; description: string };
    };
    learnMore: string;
  };
  faq: {
    title1: string;
    title2: string;
    subtitle: string;
    questions: Array<{ question: string; answer: string }>;
    stillQuestions: string;
    contactSupport: string;
    supportDescription: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}
