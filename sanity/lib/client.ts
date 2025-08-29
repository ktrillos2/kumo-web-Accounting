import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, hasSanityCreds } from '../env'

export const client = hasSanityCreds
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : {
      fetch: async () => null,
      withConfig: () => client,
    } as unknown as ReturnType<typeof createClient>
