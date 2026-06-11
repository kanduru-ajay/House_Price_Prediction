import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Heart, MapPin, Home, TrendingUp, Star } from "lucide-react";

interface Recommendation {
  id: string;
  name: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  roi: number;
  matchScore: number;
  image: string;
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    name: "Downtown Luxury Apartment",
    price: 450000,
    area: 2200,
    bedrooms: 3,
    bathrooms: 2,
    location: "Downtown",
    roi: 7.5,
    matchScore: 95,
    image: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    id: "2",
    name: "Midtown Family Home",
    price: 380000,
    area: 2800,
    bedrooms: 4,
    bathrooms: 3,
    location: "Midtown",
    roi: 6.2,
    matchScore: 88,
    image: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    id: "3",
    name: "Suburban Villa",
    price: 320000,
    area: 3200,
    bedrooms: 4,
    bathrooms: 2.5,
    location: "Suburbs",
    roi: 5.8,
    matchScore: 82,
    image: "bg-gradient-to-br from-amber-400 to-amber-600",
  },
  {
    id: "4",
    name: "Waterfront Penthouse",
    price: 520000,
    area: 2500,
    bedrooms: 3,
    bathrooms: 3,
    location: "Waterfront",
    roi: 9.3,
    matchScore: 92,
    image: "bg-gradient-to-br from-cyan-400 to-cyan-600",
  },
  {
    id: "5",
    name: "Urban Studio",
    price: 280000,
    area: 1200,
    bedrooms: 1,
    bathrooms: 1,
    location: "Downtown",
    roi: 8.1,
    matchScore: 85,
    image: "bg-gradient-to-br from-purple-400 to-purple-600",
  },
  {
    id: "6",
    name: "Modern Townhouse",
    price: 350000,
    area: 2000,
    bedrooms: 3,
    bathrooms: 2,
    location: "Midtown",
    roi: 6.8,
    matchScore: 90,
    image: "bg-gradient-to-br from-pink-400 to-pink-600",
  },
];

export default function RecommendationsPage() {
  const [preferences, setPreferences] = useState({
    budget: "500000",
    location: "any",
    bedrooms: "3",
    lifestyle: "balanced",
  });

  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  // Filter recommendations based on preferences
  const filtered = recommendations.filter((rec) => {
    const budgetMatch = rec.price <= parseInt(preferences.budget);
    const locationMatch = preferences.location === "any" || rec.location.toLowerCase().includes(preferences.location.toLowerCase());
    const bedroomMatch = rec.bedrooms >= parseInt(preferences.bedrooms);
    return budgetMatch && locationMatch && bedroomMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Property Recommendations</h1>
            <p className="text-lg text-muted-foreground">
              Discover properties tailored to your budget and preferences.
            </p>
          </div>

          {/* Preferences Section */}
          <Card className="p-8 border-border mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Your Preferences</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="budget" className="text-base font-semibold">Max Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={preferences.budget}
                  onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-base font-semibold">Location</Label>
                <Select value={preferences.location} onValueChange={(value) => setPreferences({ ...preferences, location: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="midtown">Midtown</SelectItem>
                    <SelectItem value="suburbs">Suburbs</SelectItem>
                    <SelectItem value="waterfront">Waterfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bedrooms" className="text-base font-semibold">Min Bedrooms</Label>
                <Select value={preferences.bedrooms} onValueChange={(value) => setPreferences({ ...preferences, bedrooms: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="lifestyle" className="text-base font-semibold">Lifestyle</Label>
                <Select value={preferences.lifestyle} onValueChange={(value) => setPreferences({ ...preferences, lifestyle: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">Investment Focus</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Recommendations Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {filtered.length} Properties Found
              </h3>
              {favorites.length > 0 && (
                <Button variant="outline" size="sm">
                  View Favorites ({favorites.length})
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <Card key={property.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Image */}
                  <div className={`${property.image} h-48 relative overflow-hidden`}>
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </button>

                    {/* Match Score Badge */}
                    <div className="absolute bottom-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {property.matchScore}% Match
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {property.name}
                    </h4>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="space-y-2 mb-4 pb-4 border-b border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Price</span>
                        <span className="font-semibold text-foreground">${property.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Area</span>
                        <span className="font-semibold text-foreground">{property.area.toLocaleString()} sq ft</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Bedrooms</span>
                        <span className="font-semibold text-foreground">{property.bedrooms}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">{property.roi}% ROI</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <Home className="w-4 h-4" />
                        <span className="text-sm font-semibold">Premium</span>
                      </div>
                    </div>

                    <Button className="w-full">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <Card className="p-12 border-border flex items-center justify-center text-center">
                <div>
                  <p className="text-lg font-semibold text-foreground mb-2">No Properties Found</p>
                  <p className="text-muted-foreground">Try adjusting your preferences to see more recommendations.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
