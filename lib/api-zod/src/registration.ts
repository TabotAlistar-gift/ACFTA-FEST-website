import * as zod from 'zod';

export const STREAM_KEYS = ['delegate', 'vendor', 'volunteer', 'attendee'] as const;
export type RegistrationStreamKey = (typeof STREAM_KEYS)[number];

export const STREAM_OPTIONS_MAP: Record<RegistrationStreamKey, readonly string[]> = {
  vendor: [
    'Standard Artisan Stand (1m x 2m)',
    'Premium Pavilion Booth (3m x 3m)',
    'Culinary & Food Court Stall',
    'Tech & Innovation Showcase Bay',
  ],
  volunteer: [
    'Guest Relations & VIP Protocol',
    'Media, Press & Social Broadcast',
    'Stage Management & Artist Liaison',
    'Language Translation & Interpretation',
  ],
  delegate: [
    'Venture Capital & Dealroom Matchmaking',
    'Cross-Border Trade Policy & Tariff Advisory',
    'Agribusiness & Renewable Energy Synergies',
    'Creative Economy & Digital Intellectual Property',
  ],
  attendee: [
    'Heritage Waves Cultural Spectacle & Concerts',
    'African Legends United Football Gala Match',
    'Startup Flames Innovation & Pitch Arena',
    'Full 3-Day Festival Observer Access',
  ],
};

export const CreateRegistrationBody = zod
  .object({
    registrationId: zod.string().trim().max(48).optional(),
    streamKey: zod.enum(STREAM_KEYS),
    fullName: zod
      .string()
      .trim()
      .min(2, 'Full name must be at least 2 characters.')
      .max(120, 'Full name cannot exceed 120 characters.')
      .refine((val) => !/\d/.test(val), {
        message: 'Full name cannot contain numbers.',
      })
      .refine((val) => /^[\p{L}\p{M}]+(?:[ '\u2019.\-]+[\p{L}\p{M}]+)*\.?$/u.test(val), {
        message:
          'Full name may only contain letters, spaces, hyphens, periods, and apostrophes.',
      }),
    email: zod
      .string()
      .trim()
      .min(1, 'Email address is required.')
      .max(254, 'Email address cannot exceed 254 characters.')
      .email('Please enter a valid email address.')
      .refine((val) => /^[^\s@]+@[^\s@]+\.[\p{L}]{2,}$/u.test(val), {
        message: 'Email must include a valid domain (e.g. name@domain.com).',
      }),
    phone: zod
      .string()
      .trim()
      .min(1, 'Phone number is required.')
      .refine((val) => !/[\p{L}]/u.test(val), {
        message: 'Phone number must not contain alphabetic characters.',
      })
      .refine((val) => /^[+\d][\d\s\-().+]*$/.test(val), {
        message:
          'Phone number may only contain digits, spaces, hyphens, parentheses, and an optional leading +.',
      })
      .refine(
        (val) => {
          const digits = val.replace(/\D/g, '');
          return digits.length >= 7 && digits.length <= 15;
        },
        {
          message: 'Phone number must contain between 7 and 15 digits.',
        },
      ),
    country: zod
      .string()
      .trim()
      .min(2, 'Country of citizenship or residence is required.')
      .max(100, 'Country name cannot exceed 100 characters.')
      .refine((val) => !/\d/.test(val) && /^[\p{L}\p{M}\s\-'.()’&,]+$/u.test(val), {
        message: 'Please enter a valid country name.',
      }),
    organization: zod
      .string()
      .trim()
      .min(2, 'Organization, company, or institution name is required.')
      .max(160, 'Organization name cannot exceed 160 characters.'),
    role: zod
      .string()
      .trim()
      .min(2, 'Designation or role title is required.')
      .max(120, 'Role title cannot exceed 120 characters.'),
    streamOption: zod
      .string()
      .trim()
      .min(1, 'Please select a focus or preference option.'),
    notes: zod
      .string()
      .trim()
      .min(10, 'Please provide at least 10 characters of notes or requirements.')
      .max(2000, 'Notes cannot exceed 2000 characters.'),
    agreed: zod.boolean().refine((val) => val === true, {
      message: 'You must agree to the official ACFTA Fest Code of Conduct and terms.',
    }),
  })
  .superRefine((data, ctx) => {
    const allowedOptions = STREAM_OPTIONS_MAP[data.streamKey];
    if (!allowedOptions || !allowedOptions.includes(data.streamOption)) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        path: ['streamOption'],
        message: 'Please select a valid option for the chosen participation pathway.',
      });
    }
  });

export const CreateRegistrationResponse = zod.object({
  id: zod.number().int(),
  registrationId: zod.string(),
  streamKey: zod.enum(STREAM_KEYS),
  receivedAt: zod.coerce.date(),
  message: zod.string(),
  emailDispatched: zod.boolean().optional(),
});
