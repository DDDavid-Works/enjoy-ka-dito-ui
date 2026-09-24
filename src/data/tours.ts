export type Category = 'Local Tours' | 'International' | 'Corporate / Group'

export type ItineraryDay = {
  label: string
  description: string
}

export type Tour = {
  slug: string
  title: string
  location: string
  duration: string
  price: string | null
  image: string
  category: Category
  summary: string
  itinerary: ItineraryDay[]
  inclusions: string[]
  exclusions: string[]
  gallery: string[]
}

const GALLERY_POOL = [
  '/images/hero-islands.jpg',
  '/images/local-tours.jpg',
  '/images/international-tours.jpg',
  '/images/bohol-countryside.jpg',
  '/images/coron-lagoon.jpg',
  '/images/singapore-city.jpg',
  '/images/thailand-boats.jpg',
]

function gallery(main: string, count = 3): string[] {
  const rest = GALLERY_POOL.filter((src) => src !== main)
  return [main, ...rest.slice(0, count - 1)]
}

export const TOURS: Tour[] = [
  {
    slug: 'el-nido-island-escape',
    title: 'El Nido Island Escape',
    location: 'Palawan',
    duration: '4 days',
    price: 'From ₱12,500',
    image: '/images/hero-islands.jpg',
    category: 'Local Tours',
    summary:
      'Sample itinerary — island-hop through El Nido’s limestone cliffs and lagoons, with easy beach time built in between tours.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival in El Nido, transfer to hotel, sunset welcome briefing.' },
      { label: 'Day 2', description: 'Island Hopping Tour A: Big Lagoon, Small Lagoon, Secret Lagoon.' },
      { label: 'Day 3', description: 'Island Hopping Tour C: Hidden Beach, Matinloc Shrine, Star Beach.' },
      { label: 'Day 4', description: 'Free morning, souvenir shopping, transfer to airport.' },
    ],
    inclusions: ['Hotel accommodation', 'Island hopping tours with lunch', 'Airport transfers', 'Local guide'],
    exclusions: ['Airfare', 'Travel insurance', 'Personal expenses', 'Environmental fees'],
    gallery: gallery('/images/hero-islands.jpg'),
  },
  {
    slug: 'boracay-beach-break',
    title: 'Boracay Beach Break',
    location: 'Aklan',
    duration: '3 days',
    price: 'From ₱8,900',
    image: '/images/hero-islands.jpg',
    category: 'Local Tours',
    summary: 'Sample itinerary — a short, relaxed White Beach getaway with an optional sunset sailing trip.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival, hotel check-in, free afternoon at White Beach.' },
      { label: 'Day 2', description: 'Island hopping and snorkelling, sunset paraw sailing.' },
      { label: 'Day 3', description: 'Free morning, check-out, transfer to port/airport.' },
    ],
    inclusions: ['Hotel accommodation', 'Island hopping tour', 'Airport/port transfers'],
    exclusions: ['Airfare', 'Travel insurance', 'Personal expenses'],
    gallery: gallery('/images/hero-islands.jpg'),
  },
  {
    slug: 'springtime-in-japan',
    title: 'Springtime in Japan',
    location: 'Tokyo & Kyoto',
    duration: '6 days',
    price: null,
    image: '/images/hero-islands.jpg',
    category: 'International',
    summary: 'Sample itinerary — a first-timer’s route through Tokyo and Kyoto timed around the cherry blossom season.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival in Tokyo, hotel check-in, evening in Shinjuku.' },
      { label: 'Day 2', description: 'Asakusa, Senso-ji Temple, Tokyo Skytree.' },
      { label: 'Day 3', description: 'Shibuya, Harajuku, Meiji Shrine.' },
      { label: 'Day 4', description: 'Bullet train to Kyoto, Fushimi Inari Shrine.' },
      { label: 'Day 5', description: 'Arashiyama Bamboo Grove, Kinkaku-ji (Golden Pavilion).' },
      { label: 'Day 6', description: 'Free morning, transfer to airport for departure.' },
    ],
    inclusions: ['Hotel accommodation', 'Bullet train ticket (Tokyo–Kyoto)', 'Daily breakfast', 'Airport transfers'],
    exclusions: ['Airfare', 'Travel insurance', 'Japan visa fees', 'Personal expenses'],
    gallery: gallery('/images/hero-islands.jpg'),
  },
  {
    slug: 'bohol-countryside',
    title: 'Bohol Countryside',
    location: 'Bohol',
    duration: '3 days',
    price: null,
    image: '/images/bohol-countryside.jpg',
    category: 'Local Tours',
    summary: 'Sample itinerary — Chocolate Hills, tarsiers, and a river cruise across a relaxed 3-day loop.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival, hotel check-in, Loboc River cruise with lunch.' },
      { label: 'Day 2', description: 'Chocolate Hills, Tarsier Sanctuary, man-made forest.' },
      { label: 'Day 3', description: 'Free morning, souvenir shopping, transfer to port/airport.' },
    ],
    inclusions: ['Hotel accommodation', 'Countryside tour with lunch', 'Airport/port transfers'],
    exclusions: ['Airfare', 'Travel insurance', 'Personal expenses'],
    gallery: gallery('/images/bohol-countryside.jpg'),
  },
  {
    slug: 'coron-lagoon-journey',
    title: 'Coron Lagoon Journey',
    location: 'Palawan',
    duration: '4 days',
    price: null,
    image: '/images/coron-lagoon.jpg',
    category: 'Local Tours',
    summary: 'Sample itinerary — Coron’s lagoons and wreck-diving sites, with time to relax between tours.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival in Coron, hotel check-in, town orientation.' },
      { label: 'Day 2', description: 'Kayangan Lake, Twin Lagoon, Barracuda Lake tour.' },
      { label: 'Day 3', description: 'Optional wreck snorkelling/diving, free afternoon.' },
      { label: 'Day 4', description: 'Free morning, transfer to airport.' },
    ],
    inclusions: ['Hotel accommodation', 'Lagoon tour with lunch', 'Airport transfers'],
    exclusions: ['Airfare', 'Travel insurance', 'Diving equipment rental', 'Personal expenses'],
    gallery: gallery('/images/coron-lagoon.jpg'),
  },
  {
    slug: 'singapore-city-escape',
    title: 'Singapore City Escape',
    location: 'Singapore',
    duration: '4 days',
    price: null,
    image: '/images/singapore-city.jpg',
    category: 'International',
    summary: 'Sample itinerary — a compact city break covering Singapore’s main sights and a night at Gardens by the Bay.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival, hotel check-in, Marina Bay evening walk.' },
      { label: 'Day 2', description: 'Gardens by the Bay, Supertree light show.' },
      { label: 'Day 3', description: 'Sentosa Island, Universal Studios (optional).' },
      { label: 'Day 4', description: 'Free morning, transfer to airport for departure.' },
    ],
    inclusions: ['Hotel accommodation', 'Daily breakfast', 'Airport transfers'],
    exclusions: ['Airfare', 'Travel insurance', 'Attraction tickets', 'Personal expenses'],
    gallery: gallery('/images/singapore-city.jpg'),
  },
  {
    slug: 'thailand-island-time',
    title: 'Thailand Island Time',
    location: 'Phuket',
    duration: '5 days',
    price: null,
    image: '/images/thailand-boats.jpg',
    category: 'International',
    summary: 'Sample itinerary — Phuket beach time paired with a Phi Phi Islands day trip by speedboat.',
    itinerary: [
      { label: 'Day 1', description: 'Arrival in Phuket, hotel check-in, free beach afternoon.' },
      { label: 'Day 2', description: 'Phi Phi Islands day trip by speedboat, snorkelling stops.' },
      { label: 'Day 3', description: 'Phang Nga Bay tour, James Bond Island.' },
      { label: 'Day 4', description: 'Free day at leisure, optional Old Phuket Town walk.' },
      { label: 'Day 5', description: 'Free morning, transfer to airport for departure.' },
    ],
    inclusions: ['Hotel accommodation', 'Phi Phi Islands day trip with lunch', 'Airport transfers'],
    exclusions: ['Airfare', 'Travel insurance', 'Personal expenses'],
    gallery: gallery('/images/thailand-boats.jpg'),
  },
]

export const FILTERS: Array<Category | 'All'> = ['All', 'Local Tours', 'International', 'Corporate / Group']

export function getTourBySlug(slug: string): Tour | undefined {
  return TOURS.find((tour) => tour.slug === slug)
}
