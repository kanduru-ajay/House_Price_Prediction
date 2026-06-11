import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

interface PredictionResult {
  estimatedPrice: number;
  confidenceScore: number;
  priceRange: { min: number; max: number };
  appreciationPotential: number;
}

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    yearBuilt: "",
    floorNumber: "",
    propertyType: "residential",
    amenities: [] as string[],
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const amenitiesList = ["Gym", "Pool", "Garden", "Parking", "Security", "Elevator"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate ML prediction
    setTimeout(() => {
      const basePrice = 250000;
      const areaMultiplier = (parseInt(formData.area) || 1000) / 1000;
      const bedroomMultiplier = (parseInt(formData.bedrooms) || 2) * 50000;
      const locationMultiplier = Math.random() * 1.5 + 0.8;
      const ageMultiplier = 1 - (new Date().getFullYear() - (parseInt(formData.yearBuilt) || 2000)) * 0.01;

      const predictedPrice = Math.round(
        (basePrice + bedroomMultiplier) * areaMultiplier * locationMultiplier * Math.max(ageMultiplier, 0.5)
      );

      const confidence = Math.round(Math.random() * 20 + 80);
      const variance = predictedPrice * 0.15;

      setResult({
        estimatedPrice: predictedPrice,
        confidenceScore: confidence,
        priceRange: {
          min: Math.round(predictedPrice - variance),
          max: Math.round(predictedPrice + variance),
        },
        appreciationPotential: Math.round(Math.random() * 8 + 2),
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Smart House Price Prediction</h1>
            <p className="text-lg text-muted-foreground">
              Enter property details to get an AI-powered price prediction with confidence scores and market insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Location */}
                  <div>
                    <Label htmlFor="location" className="text-base font-semibold">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter city or neighborhood"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Grid Layout for Multiple Inputs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Area */}
                    <div>
                      <Label htmlFor="area" className="text-base font-semibold">Area (sq ft)</Label>
                      <Input
                        id="area"
                        type="number"
                        placeholder="e.g., 2500"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Bedrooms */}
                    <div>
                      <Label htmlFor="bedrooms" className="text-base font-semibold">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        placeholder="e.g., 3"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Bathrooms */}
                    <div>
                      <Label htmlFor="bathrooms" className="text-base font-semibold">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        placeholder="e.g., 2"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Parking */}
                    <div>
                      <Label htmlFor="parking" className="text-base font-semibold">Parking Spaces</Label>
                      <Input
                        id="parking"
                        type="number"
                        placeholder="e.g., 2"
                        value={formData.parking}
                        onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                        className="mt-2"
                      />
                    </div>

                    {/* Year Built */}
                    <div>
                      <Label htmlFor="yearBuilt" className="text-base font-semibold">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        type="number"
                        placeholder="e.g., 2015"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Floor Number */}
                    <div>
                      <Label htmlFor="floorNumber" className="text-base font-semibold">Floor Number</Label>
                      <Input
                        id="floorNumber"
                        type="number"
                        placeholder="e.g., 5"
                        value={formData.floorNumber}
                        onChange={(e) => setFormData({ ...formData, floorNumber: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label htmlFor="propertyType" className="text-base font-semibold">Property Type</Label>
                    <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amenities */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Amenities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {amenitiesList.map((amenity) => (
                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
                              } else {
                                setFormData({
                                  ...formData,
                                  amenities: formData.amenities.filter((a) => a !== amenity),
                                });
                              }
                            }}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span className="text-sm">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Analyzing..." : "Get Price Prediction"}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-1">
              {result ? (
                <div className="space-y-4">
                  {/* Main Result Card */}
                  <Card className="p-6 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-sm font-semibold text-muted-foreground">Estimated Price</h3>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-4xl font-bold text-accent mb-2">
                      ${result.estimatedPrice.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Based on current market data</p>
                  </Card>

                  {/* Confidence Score */}
                  <Card className="p-6 border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">Confidence Score</h4>
                      <span className="text-2xl font-bold text-accent">{result.confidenceScore}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidenceScore}%` }}
                      ></div>
                    </div>
                  </Card>

                  {/* Price Range */}
                  <Card className="p-6 border-border">
                    <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Minimum</p>
                        <p className="text-lg font-semibold text-foreground">
                          ${result.priceRange.min.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Maximum</p>
                        <p className="text-lg font-semibold text-foreground">
                          ${result.priceRange.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Appreciation Potential */}
                  <Card className="p-6 border-border bg-gradient-to-br from-green-50 to-green-50/50">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-foreground">Annual Appreciation</h4>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{result.appreciationPotential}%</p>
                    <p className="text-sm text-muted-foreground mt-2">Projected yearly growth</p>
                  </Card>

                  <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                    New Prediction
                  </Button>
                </div>
              ) : (
                <Card className="p-6 border-border bg-muted/30 flex flex-col items-center justify-center min-h-96">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-center text-muted-foreground">
                    Fill in the property details and click "Get Price Prediction" to see results.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
