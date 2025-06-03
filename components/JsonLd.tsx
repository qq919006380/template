export default function JsonLd() {
  // Use static, serializable objects to ensure consistent server/client rendering
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Labubu Collection Hub",
    "alternateName": "Labubu.city",
    "url": "https://labubu.city",
    "description": "The ultimate Labubu collection hub featuring HD wallpapers, series guides, and rare variant identification.",
    "publisher": {
      "@type": "Organization",
      "name": "Labubu.city",
      "url": "https://labubu.city",
      "logo": {
        "@type": "ImageObject",
        "url": "https://img.labubu.city/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://labubu.city/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.instagram.com/labubu",
      "https://twitter.com/labubu",
      "https://www.facebook.com/labubu"
    ],
    "mainEntity": {
      "@type": "CreativeWork",
      "name": "Labubu Collection",
      "description": "Complete collection of Labubu designer toys, wallpapers, and series information",
      "creator": {
        "@type": "Person",
        "name": "Kasing Lung"
      },
      "genre": "Designer Toys",
      "keywords": "Labubu, collectible toys, blind box, Popmart, designer toys, HD wallpapers"
    }
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Labubu Collection Hub",
    "url": "https://labubu.city",
    "logo": "https://img.labubu.city/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://labubu.city/contact"
    },
    "sameAs": [
      "https://www.instagram.com/labubu",
      "https://twitter.com/labubu",
      "https://www.facebook.com/labubu"
    ]
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://labubu.city"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Wallpapers",
        "item": "https://labubu.city/labubu-wallpapers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Series Guide",
        "item": "https://labubu.city/series"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Blog",
        "item": "https://labubu.city/blog"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
} 