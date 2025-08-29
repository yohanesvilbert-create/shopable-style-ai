import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetailHeader } from '@/components/product/ProductDetailHeader';
import { HeroMediaCarousel } from '@/components/product/HeroMediaCarousel';
import { ProductSummary } from '@/components/product/ProductSummary';
import { VariantSelectors } from '@/components/product/VariantSelectors';
import { StickyBottomCTA } from '@/components/product/StickyBottomCTA';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ReviewsSection } from '@/components/product/ReviewsSection';
import { StyleOptimizer } from '@/components/product/StyleOptimizer';
import { YouMayAlsoLike } from '@/components/product/YouMayAlsoLike';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badges: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  colors: { name: string; value: string; available: boolean }[];
  sizes: { name: string; available: boolean }[];
  description: string;
  features: string[];
  shippingInfo: string;
  returnPolicy: string;
}

// Mock product data - replace with actual data fetching
const mockProduct: Product = {
  id: '1',
  name: 'Premium Cotton Blend T-Shirt',
  brand: 'ShopAble Essentials',
  price: 89.90,
  salePrice: 71.92,
  discountPercent: 20,
  rating: 4.6,
  reviewCount: 142,
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  badges: ['NEW', '-20%'],
  stockStatus: 'in-stock',
  colors: [
    { name: 'White', value: '#FFFFFF', available: true },
    { name: 'Black', value: '#000000', available: true },
    { name: 'Navy', value: '#1E3A8A', available: false }
  ],
  sizes: [
    { name: 'XS', available: true },
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: false },
    { name: 'XL', available: true }
  ],
  description: 'Crafted from premium cotton blend fabric, this versatile t-shirt offers exceptional comfort and style. Perfect for casual wear or layering.',
  features: [
    '100% Premium Cotton Blend',
    'Pre-shrunk for Perfect Fit',
    'Reinforced Seams',
    'Machine Washable',
    'Available in Multiple Colors'
  ],
  shippingInfo: 'Free shipping on orders over RM150',
  returnPolicy: '30-day hassle-free returns'
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product] = useState<Product>(mockProduct);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  useEffect(() => {
    // Auto-select first available color and size
    if (product.colors.length > 0) {
      const firstAvailable = product.colors.find(c => c.available);
      if (firstAvailable) setSelectedColor(firstAvailable.name);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    
    // Add to cart logic here
    console.log('Adding to cart:', {
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) return;
    
    // Buy now logic here
    handleAddToCart();
    navigate('/bag');
  };

  const canAddToCart = selectedColor && selectedSize && product.stockStatus !== 'out-of-stock';

  return (
    <div className="mobile-container bg-app-background">
      <ProductDetailHeader 
        product={product}
        isFavorite={isFavorite}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
        onBack={() => navigate(-1)}
      />
      
      <div className="pb-24">
        <HeroMediaCarousel 
          images={product.images}
          badges={product.badges}
          stockStatus={product.stockStatus}
        />
        
        <div className="px-4 space-y-6">
          <ProductSummary 
            product={product}
          />
          
          <VariantSelectors
            colors={product.colors}
            sizes={product.sizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            onColorSelect={setSelectedColor}
            onSizeSelect={setSelectedSize}
            onQuantityChange={setQuantity}
            onSizeGuideOpen={() => setShowSizeGuide(true)}
          />
          
          <ProductInfo 
            description={product.description}
            features={product.features}
            shippingInfo={product.shippingInfo}
            returnPolicy={product.returnPolicy}
          />
          
          <ReviewsSection 
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
          
          <StyleOptimizer 
            productId={product.id}
          />
          
          <YouMayAlsoLike 
            currentProductId={product.id}
          />
        </div>
      </div>
      
      <StickyBottomCTA
        isFavorite={isFavorite}
        canAddToCart={canAddToCart}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}