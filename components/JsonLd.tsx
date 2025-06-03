interface JsonLdProps {
  website?: {
    name: string;
    alternateName?: string;
    url: string;
    description: string;
    logo?: string;
    searchUrl?: string;
    socialLinks?: string[];
    keywords?: string;
  };
  organization?: {
    name: string;
    url: string;
    logo?: string;
    contactUrl?: string;
    socialLinks?: string[];
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export default function JsonLd({ 
  website,
  organization,
  breadcrumbs 
}: JsonLdProps = {}) {
  // Default website configuration
  const defaultWebsite = {
    name: "My Website",
    alternateName: "Website",
    url: "https://example.com",
    description: "A modern website built with Next.js",
    logo: "https://example.com/logo.png",
    searchUrl: "https://example.com/search?q={search_term_string}",
    socialLinks: [],
    keywords: "website, nextjs, modern"
  };

  // Default organization configuration
  const defaultOrganization = {
    name: "My Organization",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
    contactUrl: "https://example.com/contact",
    socialLinks: []
  };

  // Default breadcrumbs
  const defaultBreadcrumbs = [
    {
      name: "Home",
      url: "https://example.com"
    }
  ];

  // Merge with defaults
  const siteConfig = { ...defaultWebsite, ...website };
  const orgConfig = { ...defaultOrganization, ...organization };
  const breadcrumbConfig = breadcrumbs || defaultBreadcrumbs;

  // Website JSON-LD
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    ...(siteConfig.alternateName && { "alternateName": siteConfig.alternateName }),
    "url": siteConfig.url,
    "description": siteConfig.description,
    "publisher": {
      "@type": "Organization",
      "name": orgConfig.name,
      "url": orgConfig.url,
      ...(orgConfig.logo && {
        "logo": {
          "@type": "ImageObject",
          "url": orgConfig.logo
        }
      })
    },
    ...(siteConfig.searchUrl && {
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": siteConfig.searchUrl
        },
        "query-input": "required name=search_term_string"
      }
    }),
    ...(siteConfig.socialLinks && siteConfig.socialLinks.length > 0 && {
      "sameAs": siteConfig.socialLinks
    }),
    ...(siteConfig.keywords && {
      "keywords": siteConfig.keywords
    })
  };

  // Organization JSON-LD
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": orgConfig.name,
    "url": orgConfig.url,
    ...(orgConfig.logo && { "logo": orgConfig.logo }),
    ...(orgConfig.contactUrl && {
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": orgConfig.contactUrl
      }
    }),
    ...(orgConfig.socialLinks && orgConfig.socialLinks.length > 0 && {
      "sameAs": orgConfig.socialLinks
    })
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbConfig.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
  );
} 