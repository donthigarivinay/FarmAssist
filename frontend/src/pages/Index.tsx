import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';

const Index = () => {
  // Mock data - in real app this would come from authentication context
  const cartItemsCount = 3;
  const userRole = null; // 'farmer' | 'dealer' | 'deliveryAgent' | null
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount}
        userRole={userRole}
        isLoggedIn={isLoggedIn}
      />
      
      <main className="pt-16">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
