import { type FieldErrors, type Resolver } from 'react-hook-form';
import { z } from 'zod';
import { type StreamKey } from '@/data/registerData';

export const STREAM_OPTIONS: Record<StreamKey, readonly string[]> = {
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

export const COUNTRIES: readonly string[] = [
  'The Gambia', 'Nigeria', 'Ghana', 'Senegal', 'Kenya', 'South Africa', 'Cameroon',
  'Côte d’Ivoire', 'Egypt', 'Ethiopia', 'Morocco', 'Rwanda', 'Tanzania', 'Uganda',
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde',
  'Central African Republic', 'Chad', 'Comoros', 'Congo (Brazzaville)',
  'Democratic Republic of the Congo', 'Djibouti', 'Equatorial Guinea', 'Eritrea',
  'Eswatini', 'Gabon', 'Guinea', 'Guinea-Bissau', 'Lesotho', 'Liberia', 'Libya',
  'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Mozambique', 'Namibia',
  'Niger', 'São Tomé and Príncipe', 'Seychelles', 'Sierra Leone', 'Somalia',
  'South Sudan', 'Sudan', 'Togo', 'Tunisia', 'Zambia', 'Zimbabwe',
  'United Kingdom', 'United States', 'Canada', 'France', 'Germany', 'Belgium',
  'Netherlands', 'Brazil', 'Jamaica', 'Trinidad and Tobago', 'Barbados',
  'United Arab Emirates', 'China', 'India', 'Other International',
];

export const step1ProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters).')
    .max(120, 'Full name cannot exceed 120 characters.')
    .refine((val) => !/\d/.test(val), {
      message: 'Full name cannot contain numbers.',
    })
    .refine((val) => /^[\p{L}\p{M}]+(?:[ '\u2019.\-]+[\p{L}\p{M}]+)*\.?$/u.test(val), {
      message:
        'Full name may only contain letters, spaces, hyphens, periods, and apostrophes.',
    }),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .max(254, 'Email address cannot exceed 254 characters.')
    .email('Please enter a valid email address (e.g. name@domain.com).')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[\p{L}]{2,}$/u.test(val), {
      message: 'Email must include a valid domain (e.g. name@domain.com).',
    }),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
    .refine((val) => !/[\p{L}]/u.test(val), {
      message: 'Phone number must not contain alphabetic characters.',
    })
    .refine((val) => /^[+\d][\d\s\-().+]*$/.test(val), {
      message:
        'Phone number may only contain digits, spaces, hyphens, parentheses, and an optional +.',
    })
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length >= 7 && digits.length <= 15;
      },
      {
        message:
          'Please enter a valid phone number (7 to 15 digits, e.g. +220 701 2345 or +234 803 123 4567).',
      },
    ),
  country: z
    .string()
    .trim()
    .min(2, 'Please select or enter your country of citizenship or residence.')
    .max(100, 'Country name cannot exceed 100 characters.')
    .refine((val) => !/\d/.test(val) && /^[\p{L}\p{M}\s\-'.()’&,]+$/u.test(val), {
      message: 'Please enter a valid country name.',
    }),
});

export const registrationFormSchema = step1ProfileSchema
  .extend({
    streamKey: z.enum(['delegate', 'vendor', 'volunteer', 'attendee']),
    organization: z
      .string()
      .trim()
      .min(2, 'Please enter your organization, company, or institution name.')
      .max(160, 'Organization name cannot exceed 160 characters.'),
    role: z
      .string()
      .trim()
      .min(2, 'Please enter your designation, role, or occupation.')
      .max(120, 'Role title cannot exceed 120 characters.'),
    streamOption: z
      .string()
      .trim()
      .min(1, 'Please select an option for this participation pathway.'),
    notes: z
      .string()
      .trim()
      .min(10, 'Please provide brief notes, goals, or requirements (at least 10 characters).')
      .max(2000, 'Notes cannot exceed 2000 characters.'),
    agreed: z.boolean().refine((val) => val === true, {
      message: 'You must accept the official ACFTA Fest Code of Conduct and terms to submit.',
    }),
  })
  .superRefine((data, ctx) => {
    const validOpts = STREAM_OPTIONS[data.streamKey];
    if (!validOpts || !validOpts.includes(data.streamOption)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['streamOption'],
        message: 'Please select a valid focus or preference option for this pathway.',
      });
    }
  });

export type RegisterFormData = z.infer<typeof registrationFormSchema> & {
  registrationId?: string;
};

/**
 * Zod v4-compatible Resolver for react-hook-form.
 * (@hookform/resolvers v3 checks `error.errors`, which was removed in Zod v4 in favor of `error.issues`.)
 */
export const registrationFormResolver: Resolver<RegisterFormData> = async (
  values,
  _context,
  options,
) => {
  const result = await registrationFormSchema.safeParseAsync(values);
  if (result.success) {
    return {
      values: result.data,
      errors: {},
    };
  }

  const allowedNames =
    options?.names && options.names.length > 0
      ? new Set<string>(options.names as string[])
      : null;

  const fieldErrors: FieldErrors<RegisterFormData> = {};
  const issues = result.error.issues ?? [];
  for (const issue of issues) {
    const key = issue.path[0] as keyof RegisterFormData | undefined;
    if (!key) continue;
    if (allowedNames && !allowedNames.has(key)) continue;
    if (!fieldErrors[key]) {
      fieldErrors[key] = {
        type: issue.code || 'validation',
        message: issue.message,
      };
    }
  }

  if (Object.keys(fieldErrors).length === 0) {
    return {
      values,
      errors: {},
    };
  }

  return {
    values: {},
    errors: fieldErrors,
  };
};

const DRAFT_STORAGE_KEY = 'acfta_registration_draft_v1';

export function loadRegistrationDraft(defaultStreamKey: StreamKey): RegisterFormData {
  const fallback: RegisterFormData = {
    streamKey: defaultStreamKey,
    fullName: '',
    email: '',
    phone: '',
    country: '',
    organization: '',
    role: '',
    streamOption: '',
    notes: '',
    agreed: false,
  };

  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<RegisterFormData>;
    const validOpts = STREAM_OPTIONS[defaultStreamKey];
    const keepOption =
      parsed.streamOption && validOpts.includes(parsed.streamOption)
        ? parsed.streamOption
        : '';

    return {
      streamKey: defaultStreamKey,
      fullName: typeof parsed.fullName === 'string' ? parsed.fullName : '',
      email: typeof parsed.email === 'string' ? parsed.email : '',
      phone: typeof parsed.phone === 'string' ? parsed.phone : '',
      country: typeof parsed.country === 'string' ? parsed.country : '',
      organization: typeof parsed.organization === 'string' ? parsed.organization : '',
      role: typeof parsed.role === 'string' ? parsed.role : '',
      streamOption: keepOption,
      notes: typeof parsed.notes === 'string' ? parsed.notes : '',
      agreed: Boolean(parsed.agreed),
    };
  } catch {
    return fallback;
  }
}

export function saveRegistrationDraft(values: Partial<RegisterFormData>): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearRegistrationDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
