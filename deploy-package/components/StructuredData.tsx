import Script from 'next/script'
import config from '@/lib/config'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'faq' | 'product' | 'service' | 'localBusiness' | 'softwareApplication'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": config.company.name,
          "description": config.seo.defaultDescription,
          "url": config.company.website,
          "logo": `${config.company.website}${config.assets.logo}`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": config.company.phone,
            "contactType": "customer service",
            "email": config.company.email
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": config.company.address.street,
            "addressLocality": config.company.address.city,
            "postalCode": config.company.address.postalCode,
            "addressCountry": config.company.address.country
          },
          "sameAs": [
            `https://twitter.com/${config.social.twitter.replace('@', '')}`,
            config.social.linkedin,
            config.social.github
          ]
        }

      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": config.company.name,
          "description": config.seo.defaultDescription,
          "url": config.company.website,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${config.company.website}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }

      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        }

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "Nexora",
            "url": "https://nexora.fr"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "EUR"
          }
        }

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": config.company.name,
          "description": "Agence de création de sites web propulsés par l'IA",
          "url": config.company.website,
          "telephone": config.company.phone,
          "email": config.company.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": config.company.address.street,
            "addressLocality": config.company.address.city,
            "postalCode": config.company.address.postalCode,
            "addressCountry": config.company.address.country
          },
          "openingHours": "Mo-Fr 09:00-18:00",
          "priceRange": "€€"
        }

      case 'softwareApplication':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": config.company.name,
          "description": "Plateforme de création de sites web assistée par l'IA",
          "url": config.company.website,
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          }
        }

      default:
        return {}
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
}
