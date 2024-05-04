export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://daniel.london/sitemap.xml',
    host: 'https://daniel.london',
  };
}
