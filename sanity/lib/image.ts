import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId, hasSanityCreds } from '../env'

// https://www.sanity.io/docs/image-url
const builder = hasSanityCreds ? createImageUrlBuilder({ projectId, dataset }) : null as any

export const urlFor = (source: SanityImageSource) => {
  if (!builder) return { url: () => '' } as any
  return builder.image(source)
}
