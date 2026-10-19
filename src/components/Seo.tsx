import { Helmet } from 'react-helmet-async'

type Props = {
  title: string
  description: string
  canonical?: string
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

export default function Seo({ title, description, canonical, image, noindex, jsonLd }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
