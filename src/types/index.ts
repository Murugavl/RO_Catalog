export interface Product {
  id: string;
  model_name: string;
  price: number;
  technology_type: string;
  capacity: string;
  warranty: string;
  description: string;
  specifications: Record<string, any>;
  image_url: string;
  gallery_images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  model_name: string;
  price: number;
  technology_type: string;
  capacity: string;
  warranty: string;
  description: string;
  specifications: Record<string, any>;
  image_url: string;
  gallery_images: string[];
  is_active: boolean;
}
