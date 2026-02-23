import { Product } from '../types';

export const mockProducts: Product[] = [
    {
        id: 'mock-1',
        model_name: 'Ponsri Aqua Grand+',
        price: 12500,
        technology_type: 'RO + UV + UF + TDS Control',
        capacity: '12L',
        warranty: '1 Year Comprehensive',
        description: 'Advanced multi-stage purification system ensuring 100% pure and safe drinking water for your family.',
        specifications: {
            'Purification Capacity': '15 L/hr',
            'Storage Capacity': '12 Liters',
            'Filter Changes': 'Every 12 Months',
            'Power Consumption': '60W'
        },
        image_url: 'https://images.unsplash.com/photo-1629854496460-a29241b77f98?auto=format&fit=crop&q=80&w=800',
        gallery_images: [],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 'mock-2',
        model_name: 'Ponsri Pearl Purifier',
        price: 9800,
        technology_type: 'RO + UV',
        capacity: '10L',
        warranty: '1 Year Warranty',
        description: 'Compact and elegant RO water purifier suitable for modern kitchens.',
        specifications: {
            'Purification Capacity': '12 L/hr',
            'Storage Capacity': '10 Liters',
            'Filter Changes': 'Every 12 Months',
            'Power Consumption': '45W'
        },
        image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        gallery_images: [],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    {
        id: 'mock-3',
        model_name: 'Ponsri Copper Elite',
        price: 14500,
        technology_type: 'RO + UV + UF + Active Copper',
        capacity: '15L',
        warranty: '2 Years Comprehensive',
        description: 'Premium water purifier with active copper technology for enhanced health benefits.',
        specifications: {
            'Purification Capacity': '20 L/hr',
            'Storage Capacity': '15 Liters',
            'Filter Changes': 'Every 15 Months',
            'Power Consumption': '60W'
        },
        image_url: 'https://images.unsplash.com/photo-1582046808791-f9babaaacff6?auto=format&fit=crop&q=80&w=800',
        gallery_images: [],
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];
