import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import productsShowcase from '@/assets/products-showcase.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  dealer: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  organic?: boolean;
}

const FeaturedProductsSection: React.FC = () => {
  // Mock data - in real app this would come from API
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Wheat Seeds',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 124,
      category: 'seeds',
      dealer: 'AgroSeeds Co.',
      image: productsShowcase,
      inStock: true,
      featured: true,
      organic: true
    },
    {
      id: '2',
      name: 'Organic Fertilizer NPK',
      price: 1899,
      rating: 4.6,
      reviews: 89,
      category: 'fertilizers',
      dealer: 'GreenGrow Ltd.',
      image: productsShowcase,
      inStock: true,
      featured: true
    },
    {
      id: '3',
      name: 'Advanced Pest Control',
      price: 759,
      originalPrice: 899,
      rating: 4.7,
      reviews: 67,
      category: 'pesticides',
      dealer: 'SafeCrop Solutions',
      image: productsShowcase,
      inStock: true,
      featured: true
    },
    {
      id: '4',
      name: 'Smart Irrigation Kit',
      price: 12999,
      rating: 4.9,
      reviews: 45,
      category: 'equipment',
      dealer: 'TechFarm Equipment',
      image: productsShowcase,
      inStock: true,
      featured: true
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    // TODO: Implement toggle favorite functionality
    console.log('Toggle favorite:', productId);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            ⭐ Featured Products
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top Rated Agricultural Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and highly-rated products, 
            trusted by thousands of farmers across the country.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="hover-lift animate-scale-in group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.originalPrice && (
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    {product.organic && (
                      <Badge className="text-xs bg-success text-success-foreground">
                        Organic
                      </Badge>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Quick Add to Cart - appears on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-4">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs mb-2 capitalize">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    by {product.dealer}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      product.inStock ? 'text-success' : 'text-destructive'
                    }`}>
                      {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm text-primary hover:text-primary-hover font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/shop">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;