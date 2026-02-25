export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  technologyType: string;
  capacity: string;
  warranty: string;
  purificationStages: string;
  energyConsumption: string;
  colorVariant: string;
  weight: string;
  createdAt: string;
  shortDescription?: string;
  detailedDescription?: string;
}

export interface ProductFormData {
  name: string;
  brand: string;
  price: string;
  technologyType: string;
  capacity: string;
  warranty: string;
  purificationStages: string;
  energyConsumption: string;
  colorVariant: string;
  weight: string;
  image: File | null;
}
