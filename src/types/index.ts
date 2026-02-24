export interface Product {
  id: string;
  name: string;
  brand: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  imageUrl: string;
  technologyType: string;
  capacity: string;
  warranty: string;
  purificationStages: string;
  energyConsumption: string;
  colorVariant: string;
  dimensions: string;
  weight: string;
  tags: string[];
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  brand: string;
  shortDescription: string;
  detailedDescription: string;
  price: string;
  technologyType: string;
  capacity: string;
  warranty: string;
  purificationStages: string;
  energyConsumption: string;
  colorVariant: string;
  dimensions: string;
  weight: string;
  tags: string;
  image: File | null;
}
