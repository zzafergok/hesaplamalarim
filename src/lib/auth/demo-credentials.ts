/**
 * Intentionally non-sensitive credentials shown in Tulpar's template forms.
 * The demo login endpoint accepts any schema-valid credentials; these values
 * make the starter flows immediately explorable after installation.
 */
export const demoLoginCredentials = {
  admin: {
    email: 'admin@tulpar.space',
    password: 'securePassword123',
  },
  user: {
    email: 'pilot@tulpar.space',
    password: 'securePassword123',
  },
} as const;
