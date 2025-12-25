export default function JsonLd() {
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Universe | A Journey Through Space and Time',
        description: 'An immersive journey through 13.8 billion years of cosmic history using NASA imagery.',
        url: 'https://exploreuniverse.dev',
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Universe Journey',
        url: 'https://exploreuniverse.dev',
        logo: 'https://exploreuniverse.dev/icon.png',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </>
    );
}
