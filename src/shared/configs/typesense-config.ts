import { PROTOCOLS } from '@constants/network';
import Typesense from 'typesense';

export const clientTypesense = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || '',
      port: PROTOCOLS.HTTPS.PORT,
      protocol: PROTOCOLS.HTTPS.NAME,
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || '',
  connectionTimeoutSeconds: 2,
});
