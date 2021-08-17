import { ROOT_WEB } from '@/src/constants/app';

const title = 'Bui Duc Tai – Developer, writer, creator.'
const description = 'Personal portfolio and resume website for Duc-Tai Bui, a student, developer, writer, and creator who has passion about coding and developing wow products.'

const SEODefault = {
  title,
  description,
  canonical: ROOT_WEB,
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: ROOT_WEB,
    title,
    description,
    images: [
      {
        url: ROOT_WEB + '/images/logo.png',
        alt: title
      }
    ]
  },
  twitter: {
    handle: '@TaiBui52074508',
    site: '@TaiBui52074508',
    cardType: 'summary_large_image'
  }
}

export default SEODefault;