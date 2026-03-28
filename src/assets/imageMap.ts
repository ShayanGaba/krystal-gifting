import heroGift from '@/assets/hero-gift.jpg';
import productJournal from '@/assets/product-journal.jpg';
import productHamper from '@/assets/product-hamper.jpg';
import productHeadphones from '@/assets/product-headphones.jpg';
import productBamboo from '@/assets/product-bamboo.jpg';
import productCrystal from '@/assets/product-crystal.jpg';
import productChocolate from '@/assets/product-chocolate.jpg';
import productPens from '@/assets/product-pens.jpg';

export const heroImage = heroGift;

export const productImages: Record<string, string> = {
  'executive-leather-journal': productJournal,
  'premium-gift-hamper': productHamper,
  'wireless-noise-cancelling': productHeadphones,
  'eco-bamboo-desk-set': productBamboo,
  'crystal-award-trophy': productCrystal,
  'artisan-chocolate-collection': productChocolate,
  'smart-notebook-rocketbook': productBamboo,
  'luxury-pen-set': productPens,
  'wellness-spa-kit': productHamper,
  'portable-espresso-maker': productHeadphones,
  'branded-welcome-kit': productBamboo,
  'luxury-watch-box': productJournal,
  'subscription-coffee-box': productChocolate,
  'experience-cooking-class': productHamper,
  'custom-branded-backpack': productBamboo,
  'ceramic-diffuser-set': productCrystal,
};

export const collectionImages: Record<string, string> = {
  'client-appreciation': productJournal,
  'employee-recognition': productCrystal,
  'holiday-seasonal': productHamper,
  'corporate-events': productChocolate,
  'onboarding-kits': productBamboo,
  'executive-luxury': productPens,
  'eco-friendly': productBamboo,
  'tech-gadgets': productHeadphones,
  'gift-boxes': heroGift,
  'custom-branded': productJournal,
  'experience-gifts': productHamper,
  'subscriptions': productChocolate,
};
