import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    name: "Seeds",
    description: "High-quality seeds for various crops.",
    image: "/assets/hero-agriculture.jpg"
  },
  {
    name: "Fertilizers",
    description: "Organic and chemical fertilizers for better yield.",
    image: "/assets/products-showcase.jpg"
  },
  {
    name: "Pesticides",
    description: "Protect your crops with effective pesticides.",
    image: "/placeholder.svg"
  },
  {
    name: "Equipment",
    description: "Modern equipment for efficient farming.",
    image: "/placeholder.svg"
  },
  {
    name: "Organic",
    description: "Organic products for sustainable agriculture.",
    image: "/placeholder.svg"
  },
  {
    name: "Tools",
    description: "Essential tools for every farmer.",
    image: "/placeholder.svg"
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} isLoggedIn={true} userRole="dealer" />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-foreground mb-6">Product Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Card key={cat.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <CardTitle>{cat.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-muted-foreground">{cat.description}</p>
                <Badge>{cat.name}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
