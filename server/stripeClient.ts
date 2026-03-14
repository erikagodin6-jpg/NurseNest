import Stripe from 'stripe';

let cachedCredentials: { publishableKey: string; secretKey: string } | null = null;

async function getCredentialsFromConnector(): Promise<{ publishableKey: string; secretKey: string } | null> {
  try {
    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    if (!hostname) return null;

    const xReplitToken = process.env.REPL_IDENTITY
      ? 'repl ' + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
        ? 'depl ' + process.env.WEB_REPL_RENEWAL
        : null;

    if (!xReplitToken) return null;

    const connectorName = 'stripe';
    const isProduction = process.env.REPLIT_DEPLOYMENT === '1';
    const targetEnvironment = isProduction ? 'production' : 'development';

    const url = new URL(`https://${hostname}/api/v2/connection`);
    url.searchParams.set('include_secrets', 'true');
    url.searchParams.set('connector_names', connectorName);
    url.searchParams.set('environment', targetEnvironment);

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    });

    const data = await response.json();
    const connectionSettings = data.items?.[0];

    if (connectionSettings?.settings?.publishable && connectionSettings?.settings?.secret) {
      console.log(`[Stripe] Credentials loaded from Replit connector (${targetEnvironment})`);
      return {
        publishableKey: connectionSettings.settings.publishable,
        secretKey: connectionSettings.settings.secret,
      };
    }

    return null;
  } catch (err: any) {
    console.warn(`[Stripe] Connector lookup failed: ${err.message}`);
    return null;
  }
}

function getCredentialsFromEnv(): { publishableKey: string; secretKey: string } | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || process.env.VITE_STRIPE_PUBLIC_KEY;

  if (secretKey && publishableKey) {
    return { publishableKey, secretKey };
  }
  return null;
}

function validateCredentials(creds: { publishableKey: string; secretKey: string }): void {
  const isProduction = process.env.REPLIT_DEPLOYMENT === '1';

  if (isProduction) {
    if (creds.secretKey.startsWith('sk_test_')) {
      throw new Error('[Stripe] FATAL: Test secret key detected in production deployment. Set STRIPE_SECRET_KEY to a live key (sk_live_...).');
    }
    if (creds.publishableKey.startsWith('pk_test_')) {
      throw new Error('[Stripe] FATAL: Test publishable key detected in production deployment. Set STRIPE_PUBLISHABLE_KEY to a live key (pk_live_...).');
    }
  }
}

async function getCredentials(): Promise<{ publishableKey: string; secretKey: string }> {
  if (cachedCredentials) return cachedCredentials;

  const isProduction = process.env.REPLIT_DEPLOYMENT === '1';
  const env = isProduction ? 'production' : 'development';

  const connectorCreds = await getCredentialsFromConnector();
  if (connectorCreds) {
    validateCredentials(connectorCreds);
    cachedCredentials = connectorCreds;
    return connectorCreds;
  }

  const envCreds = getCredentialsFromEnv();
  if (envCreds) {
    console.log(`[Stripe] Credentials loaded from environment variables (${env})`);
    validateCredentials(envCreds);
    cachedCredentials = envCreds;
    return envCreds;
  }

  const missing: string[] = [];
  if (!process.env.STRIPE_SECRET_KEY) missing.push('STRIPE_SECRET_KEY');
  if (!process.env.STRIPE_PUBLISHABLE_KEY && !process.env.VITE_STRIPE_PUBLIC_KEY) missing.push('STRIPE_PUBLISHABLE_KEY');

  throw new Error(
    `[Stripe] No credentials found for ${env}. ` +
    `Replit connector returned no ${env} connection, and env vars are missing: ${missing.join(', ')}. ` +
    `Set STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY as environment secrets.`
  );
}

export async function getUncachableStripeClient() {
  const { secretKey } = await getCredentials();
  return new Stripe(secretKey, {
    apiVersion: '2025-08-27.basil' as any,
  });
}

export async function getStripePublishableKey() {
  const { publishableKey } = await getCredentials();
  return publishableKey;
}

export async function getStripeSecretKey() {
  const { secretKey } = await getCredentials();
  return secretKey;
}

let stripeSync: any = null;

export async function getStripeSync() {
  if (!stripeSync) {
    const { StripeSync } = await import('stripe-replit-sync');
    const secretKey = await getStripeSecretKey();

    stripeSync = new StripeSync({
      poolConfig: {
        connectionString: process.env.DATABASE_URL || "",
        max: 2,
      },
      stripeSecretKey: secretKey,
    });
  }
  return stripeSync;
}
