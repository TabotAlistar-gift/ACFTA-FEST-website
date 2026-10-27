export interface CheckoutTicket {
  number: string;
  title: string;
  date: string;
  price: string;
  priceRaw: number;
  currency?: 'NGN' | 'USD';
  description: string;
  benefits: string[];
  image: string;
  featured?: boolean;
}

export type CheckoutStep = 'details' | 'payment' | 'confirm';

export interface DetailsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  organization: string;
  qty: number;
}

export const NATIONALITIES = [
  'Nigerian',
  'Ghanaian',
  'Kenyan',
  'South African',
  'Senegalese',
  'Ivorian',
  'Ethiopian',
  'Tanzanian',
  'Ugandan',
  'Rwandan',
  'Gambian',
  'Sierra Leonean',
  'Liberian',
  'Togolese',
  'Beninese',
  'Other African',
  'International',
] as const;

export function formatPrice(amount: number, currency: 'NGN' | 'USD' = 'NGN'): string {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
