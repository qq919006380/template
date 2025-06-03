export interface LabubuSeries {
  id: string;
  slug: string;
  name: string;
  description: string;
  releaseDate: string;
  price: string;
  rarity: string;
  colorVariants: string[];
  status: string;
  imageUrl: string;
}

export const labubuSeries: LabubuSeries[] = [
  {
    id: '1',
    slug: 'angel-in-clouds',
    name: 'Angel in Clouds',
    description: 'Ethereal beauty meets collectible charm in this heavenly series featuring Labubu with angel wings floating among dreamy clouds.',
    releaseDate: '2024-01-15',
    price: '$12.99',
    rarity: 'Limited Edition',
    colorVariants: ['White', 'Pink', 'Blue', 'Gold'],
    status: 'Available',
    imageUrl: '/series/angel-in-clouds.jpg'
  },
  {
    id: '2',
    slug: 'the-monsters',
    name: 'The Monsters',
    description: 'Enter a world where cute meets mysterious, as Labubu transforms into adorable monster variants.',
    releaseDate: '2024-02-20',
    price: '$11.99',
    rarity: 'Regular',
    colorVariants: ['Green', 'Purple', 'Orange', 'Black'],
    status: 'Available',
    imageUrl: '/series/the-monsters.jpg'
  },
  {
    id: '3',
    slug: 'zimomo',
    name: 'Zimomo Special',
    description: 'A special collaboration featuring the beloved Zimomo character in classic Labubu style.',
    releaseDate: '2024-03-10',
    price: '$14.99',
    rarity: 'Super Rare',
    colorVariants: ['Classic', 'Special Edition'],
    status: 'Limited',
    imageUrl: '/series/zimomo.jpg'
  }
];

export const rarityColors = {
  'Regular': 'bg-gray-100 text-gray-800',
  'Rare': 'bg-blue-100 text-blue-800',
  'Super Rare': 'bg-purple-100 text-purple-800',
  'Limited Edition': 'bg-gold-100 text-gold-800',
  'Ultra Rare': 'bg-red-100 text-red-800'
}; 