import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/_core/hooks/useAuth";
import { Heart, Clock, Search, TrendingUp, Download } from "lucide-react";
import { Link } from "wouter";

interface SavedProperty {
  id: string;
  name: string;
  price: number;
  location: string;
  savedDate: string;
}

interface Prediction {
  id: string;
  property: string;
  predictedPrice: number;
  confidence: number;
  date: string;
}

interface SavedSearch {
  id: string;
  name: string;
  criteria: string;
  results: number;
  date: string;
}

export default function UserDashboard() {
  const { user } = useAuth();

  const savedProperties: SavedProperty[] = [
    { id: "1", name: "Downtown Luxury Apartment", price: 450000, location: "Downtown", savedDate: "2026-06-10" },
    { id: "2", name: "Midtown Family Home", price: 380000, location: "Midtown", savedDate: "2026-06-09" },
    { id: "3", name: "Waterfront Penthouse", price: 520000, location: "Waterfront", savedDate: "2026-06-08" },
  ];

  const predictions: Prediction[] = [
    { id: "1", property: "Downtown Luxury Apartment", predictedPrice: 465000, confidence: 92, date: "2026-06-11" },
    { id: "2", property: "Suburban Villa", predictedPrice: 325000, confidence: 88, date: "2026-06-10" },
    { id: "3", property: "Urban Studio", predictedPrice: 285000, confidence: 85, date: "2026-06-09" },
  ];

  const savedSearches: SavedSearch[] = [
    { id: "1", name: "Downtown 3BR", criteria: "Downtown, 3+ bedrooms, $300K-$500K", results: 24, date: "2026-06-11" },
    { id: "2", name: "Family Homes", criteria: "Suburbs, 4+ bedrooms, $250K-$400K", results: 18, date: "2026-06-10" },
    { id: "3", name: "Investment Properties", criteria: "Any, ROI > 6%, $200K-$600K", results: 42, date: "2026-06-09" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, {user?.name || "User"}!</h1>
            <p className="text-lg text-muted-foreground">Manage your saved properties, predictions, and searches.</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Saved Properties</p>
                  <p className="text-3xl font-bold text-foreground">{savedProperties.length}</p>
                </div>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Predictions Made</p>
                  <p className="text-3xl font-bold text-foreground">{predictions.length}</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Saved Searches</p>
                  <p className="text-3xl font-bold text-foreground">{savedSearches.length}</p>
                </div>
                <Search className="w-5 h-5 text-accent" />
              </div>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Confidence</p>
                  <p className="text-3xl font-bold text-foreground">88%</p>
                </div>
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="saved" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved">Saved Properties</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="searches">Saved Searches</TabsTrigger>
            </TabsList>

            {/* Saved Properties */}
            <TabsContent value="saved" className="space-y-4">
              {savedProperties.length > 0 ? (
                savedProperties.map((property) => (
                  <Card key={property.id} className="p-6 border-border hover:border-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">{property.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{property.location}</p>
                        <div className="flex items-center gap-4">
                          <p className="text-2xl font-bold text-accent">${property.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Saved {property.savedDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 border-border flex items-center justify-center text-center">
                  <div>
                    <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">No Saved Properties</p>
                    <p className="text-muted-foreground mb-4">Start exploring and save your favorite properties.</p>
                    <Link href="/recommendations">
                      <Button>Browse Properties</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Predictions */}
            <TabsContent value="predictions" className="space-y-4">
              {predictions.length > 0 ? (
                predictions.map((prediction) => (
                  <Card key={prediction.id} className="p-6 border-border hover:border-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">{prediction.property}</h4>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Predicted Price</p>
                            <p className="text-2xl font-bold text-accent">${prediction.predictedPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Confidence Score</p>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-accent transition-all"
                                  style={{ width: `${prediction.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-foreground">{prediction.confidence}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Date</p>
                            <p className="text-sm text-foreground">{prediction.date}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 border-border flex items-center justify-center text-center">
                  <div>
                    <TrendingUp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">No Predictions Yet</p>
                    <p className="text-muted-foreground mb-4">Make your first price prediction to get started.</p>
                    <Link href="/predict">
                      <Button>Make Prediction</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Saved Searches */}
            <TabsContent value="searches" className="space-y-4">
              {savedSearches.length > 0 ? (
                savedSearches.map((search) => (
                  <Card key={search.id} className="p-6 border-border hover:border-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">{search.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{search.criteria}</p>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-semibold text-accent">{search.results} results</p>
                          <p className="text-xs text-muted-foreground">Saved {search.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 border-border flex items-center justify-center text-center">
                  <div>
                    <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">No Saved Searches</p>
                    <p className="text-muted-foreground mb-4">Create custom searches to find properties matching your criteria.</p>
                    <Link href="/recommendations">
                      <Button>Start Searching</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
