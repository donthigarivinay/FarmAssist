import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Award, 
  Truck, 
  Shield, 
  Leaf,
  Star,
  CheckCircle
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Farmers', value: '50,000+', icon: Users },
    { label: 'Products Available', value: '10,000+', icon: Target },
    { label: 'Verified Dealers', value: '500+', icon: Award },
    { label: 'Orders Delivered', value: '2,00,000+', icon: Truck }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products are verified and tested for quality standards'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick delivery across India with real-time tracking'
    },
    {
      icon: Star,
      title: 'Expert Support',
      description: '24/7 agricultural expert support for your farming needs'
    },
    {
      icon: Leaf,
      title: 'Sustainable Solutions',
      description: 'Promoting eco-friendly and sustainable farming practices'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      experience: '15+ years in Agriculture'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300',
      experience: '12+ years in Supply Chain'
    },
    {
      name: 'Amit Patel',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
      experience: '10+ years in AgTech'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={3} userRole={null} isLoggedIn={false} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About FarmAssist</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering farmers with modern technology and quality agricultural products. 
              We're committed to transforming agriculture through innovation and sustainable practices.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center group hover-lift">
                  <CardContent className="p-6">
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To revolutionize agriculture by providing farmers with easy access to quality products, 
                    modern farming techniques, and technology-driven solutions that increase productivity 
                    and promote sustainable farming practices.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardContent className="p-8">
                  <Leaf className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India's leading agricultural platform that bridges the gap between farmers 
                    and modern agriculture, fostering a community of empowered farmers who contribute 
                    to food security and sustainable development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose FarmAssist?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best agricultural solutions with cutting-edge technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center group hover-lift">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section
        <div className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Passionate individuals working together to transform agriculture
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center group hover-lift">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                    <p className="text-sm text-muted-foreground">{member.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        // </div> */}

        {/* Values Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Quality First', description: 'We never compromise on the quality of products and services' },
                { title: 'Farmer-Centric', description: 'Every decision we make puts farmers at the center' },
                { title: 'Sustainability', description: 'Promoting eco-friendly and sustainable farming practices' },
                { title: 'Innovation', description: 'Constantly evolving with technology to serve better' },
                { title: 'Trust', description: 'Building lasting relationships based on trust and transparency' },
                { title: 'Community', description: 'Creating a supportive community of farmers and dealers' }
              ].map((value, index) => (
                <Card key={index} className="group hover-lift">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;