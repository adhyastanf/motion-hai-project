import { createAuthClient } from 'better-auth/client'; // make sure to import from better-auth/react
import { organizationClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  // baseURL: 'http://localhost:3000',
  plugins: [organizationClient()],
});

export const { signIn, signOut, signUp, getSession, useSession } = authClient;
