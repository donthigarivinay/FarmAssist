import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sprout, 
  Beaker, 
  Bug, 
  Wrench, 
  Leaf, 
  Hammer,
  ArrowRight 
} from 'lucide-react';

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      id: 'seeds',
      name: 'Seeds',
      description: 'Premium quality seeds for all crops',
      icon: Sprout,
      color: 'from-green-500 to-green-600',
      productCount: 150,
      featured: true
    },
    {
      id: 'fertilizers',
      name: 'Fertilizers',
      description: 'Organic and chemical fertilizers',
      icon: Beaker,
      color: 'from-blue-500 to-blue-600',
      productCount: 89,
      featured: false
    },
    {
      id: 'pesticides',
      name: 'Pesticides',
      description: 'Safe and effective pest control',
      icon: Bug,
      color: 'from-red-500 to-red-600',
      productCount: 67,
      featured: false
    },
    {
      id: 'equipment',
      name: 'Equipment',
      description: 'Modern farming equipment',
      icon: Wrench,
      color: 'from-purple-500 to-purple-600',
      productCount: 234,
      featured: true
    },
    {
      id: 'organic',
      name: 'Organic',
      description: 'Certified organic products',
      icon: Leaf,
      color: 'from-emerald-500 to-emerald-600',
      productCount: 123,
      featured: false
    },
    {
      id: 'tools',
      name: 'Tools',
      description: 'Hand tools and implements',
      icon: Hammer,
      color: 'from-orange-500 to-orange-600',
      productCount: 178,
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Browse Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything Your Farm Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of agricultural products, 
            from premium seeds to modern farming equipment.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/shop?category=${category.id}`}
              className="group"
            >
              <Card className="hover-lift h-full animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="relative">
                    {category.featured && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-2 -right-2 bg-success text-success-foreground"
                      >
                        Popular
                      </Badge>
                    )}
                    
                    <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${category.color} mb-4`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.productCount} Products
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              to="/register?role=dealer" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors font-medium"
            >
              Become a Dealer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;