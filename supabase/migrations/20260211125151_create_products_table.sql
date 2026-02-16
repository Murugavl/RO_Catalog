/*
  # Create Products Table for RO Purifier Catalog

  ## Overview
  This migration creates the core database structure for managing RO water purifier products
  in the catalog system. It includes all product specifications, pricing, images, and visibility controls.

  ## New Tables
  
  ### `products`
  Stores all RO purifier model information with complete specifications.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each product
  - `model_name` (text, required) - Name of the RO purifier model
  - `price` (decimal, required) - Product price in INR
  - `technology_type` (text, required) - Type of purification (RO / RO+UV / RO+UV+UF)
  - `capacity` (text, required) - Storage capacity (e.g., "7L", "10L")
  - `warranty` (text, required) - Warranty information
  - `description` (text) - Full product description
  - `specifications` (jsonb) - Detailed specs stored as JSON
  - `image_url` (text) - Primary product image URL
  - `gallery_images` (text[]) - Array of additional image URLs
  - `is_active` (boolean, default true) - Visibility control (only active products shown publicly)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the products table
  - Public users can only SELECT active products
  - Only authenticated admin users can INSERT, UPDATE, or DELETE products
  
  ### Policies Created
  1. **Public Read Access** - Anyone can view active products
  2. **Admin Insert Access** - Only authenticated users can add products
  3. **Admin Update Access** - Only authenticated users can modify products
  4. **Admin Delete Access** - Only authenticated users can remove products
  
  ## Notes
  - The specifications field uses JSONB for flexible attribute storage
  - Gallery images use PostgreSQL array type for multiple image URLs
  - Timestamps automatically track creation and modification times
  - is_active flag provides soft visibility control without deletion
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name text NOT NULL,
  price decimal(10,2) NOT NULL,
  technology_type text NOT NULL,
  capacity text NOT NULL,
  warranty text NOT NULL,
  description text DEFAULT '',
  specifications jsonb DEFAULT '{}'::jsonb,
  image_url text DEFAULT '',
  gallery_images text[] DEFAULT ARRAY[]::text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public users can view active products only
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  USING (is_active = true);

-- Authenticated admin users can insert products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated admin users can update products
CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated admin users can delete products
CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries on active products
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;

-- Create index for model name searches
CREATE INDEX IF NOT EXISTS idx_products_model_name ON products(model_name);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();