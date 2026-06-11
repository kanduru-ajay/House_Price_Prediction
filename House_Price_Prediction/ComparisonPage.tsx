import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Check, X, Plus } from "lucide-react";

interface Property {
  id: string;
  name: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  yearBuilt: number;
  roi: number;
  locationScore: number;
  investmentScore: number;
}

const sampleProperties: Property[] = [
  {
    id: "1",
    name: "Downtown Luxury Apartment",
    price: 450000,
    area: 2200,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    yearBuilt: 2020,
    roi: 7.5,
    locationScore: 9.2,
    investmentScore: 8.5,
  },
  {
    id: "2",
    name: "Midtown Family Home",
    price: 380000,
    area: 2800,
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    yearBuilt: 2018,
    roi: 6.2,
    locationScore: 8.1,
    investmentScore: 7.8,
  },
  {
    id: "3",
    name: "Suburban Villa",
    price: 320000,
    area: 3200,
    bedrooms: 4,
    bathrooms: 2.5,
    parking: 2,
    yearBuilt: 2015,
    roi: 5.8,
    locationScore: 7.5,
    investmentScore: 7.2,
  },
  {
    id: "4",
    name: "Waterfront Penthouse",
    price: 520000,
    area: 2500,
    bedrooms: 3,
    bathrooms: 3,
    parking: 3,
    yearBuilt: 2022,
    roi: 9.3,
    locationScore: 9.8,
    investmentScore: 9.1,
  },
];

export default function ComparisonPage() {
  const [selectedProperties, setSelectedProperties] = useState<string[]>(["1", "2"]);
  const [showAllProperties, setShowAllProperties] = useState(false);

  const toggleProperty = (id: string) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const properties = selectedProperties.map((id) => sampleProperties.find((p) => p.id === id)).filter(Boolean) as Property[];

  const metrics = [
    { label: "Price", key: "price", format: (v: number) => `$${v.toLocaleString()}` },
    { label: "Area (sq ft)", key: "area", format: (v: number) => `${v.toLocaleString()}` },
    { label: "Bedrooms", key: "bedrooms", format: (v: number) => v.toString() },
    { label: "Bathrooms", key: "bathrooms", format: (v: number) => v.toString() },
    { label: "Parking Spaces", key: "parking", format: (v: number) => v.toString() },
    { label: "Year Built", key: "yearBuilt", format: (v: number) => v.toString() },
    { label: "Annual ROI", key: "roi", format: (v: number) => `${v.toFixed(1)}%` },
    { label: "Location Score", key: "locationScore", format: (v: number) => `${v.toFixed(1)}/10` },
    { label: "Investment Score", key: "investmentScore", format: (v: number) => `${v.toFixed(1)}/10` },
  ];

  const getBestValue = (key: keyof Property) => {
    if (properties.length === 0) return null;
    const values = properties.map((p) => p[key] as number);
    if (key === "price" || key === "yearBuilt") {
      return Math.min(...values);
    }
    return Math.max(...values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Property Comparison</h1>
            <p className="text-lg text-muted-foreground">
              Compare multiple properties side-by-side to make informed decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Property Selector */}
            <Card className="p-6 border-border h-fit">
              <h3 className="font-semibold text-foreground mb-4">Available Properties</h3>
              <div className="space-y-3 mb-6">
                {sampleProperties.map((property) => (
                  <label key={property.id} className="flex items-start gap-3 cursor-pointer group">
                    <Checkbox
                      checked={selectedProperties.includes(property.id)}
                      onCheckedChange={() => toggleProperty(property.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 group-hover:text-accent transition-colors">
                      <p className="text-sm font-medium">{property.name}</p>
                      <p className="text-xs text-muted-foreground">${(property.price / 1000).toFixed(0)}K</p>
                    </div>
                  </label>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setShowAllProperties(!showAllProperties)}>
                <Plus className="w-4 h-4 mr-2" />
                Add More
              </Button>
            </Card>

            {/* Comparison Table */}
            <div className="lg:col-span-3 overflow-x-auto">
              {properties.length > 0 ? (
                <Card className="border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Metric</th>
                          {properties.map((property) => (
                            <th key={property.id} className="px-6 py-4 text-left text-sm font-semibold text-foreground min-w-48">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-semibold">{property.name}</p>
                                  <p className="text-xs text-muted-foreground mt-1">${property.price.toLocaleString()}</p>
                                </div>
                                <button
                                  onClick={() => toggleProperty(property.id)}
                                  className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {metrics.map((metric, idx) => {
                          const best = getBestValue(metric.key as keyof Property);
                          return (
                            <tr key={idx} className="border-b border-border hover:bg-muted/30 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium text-foreground bg-muted/20 sticky left-0 z-10">
                                {metric.label}
                              </td>
                              {properties.map((property) => {
                                const value = property[metric.key as keyof Property];
                                const isBest = value === best;
                                return (
                                  <td
                                    key={property.id}
                                    className={`px-6 py-4 text-sm ${
                                      isBest ? "bg-green-50 font-semibold text-green-700" : "text-foreground"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {isBest && <Check className="w-4 h-4 text-green-600" />}
                                      {metric.format(value as number)}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ) : (
                <Card className="p-12 border-border flex items-center justify-center min-h-96 text-center">
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-2">No Properties Selected</p>
                    <p className="text-muted-foreground">Select at least one property from the list to compare.</p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Comparison Insights */}
          {properties.length > 1 && (
            <Card className="mt-8 p-8 border-border bg-gradient-to-br from-accent/5 to-accent/10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Comparison Insights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Best Investment Score</p>
                  <p className="text-2xl font-bold text-accent">
                    {Math.max(...properties.map((p) => p.investmentScore)).toFixed(1)}/10
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {properties.find((p) => p.investmentScore === Math.max(...properties.map((p) => p.investmentScore)))?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Best ROI</p>
                  <p className="text-2xl font-bold text-accent">
                    {Math.max(...properties.map((p) => p.roi)).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {properties.find((p) => p.roi === Math.max(...properties.map((p) => p.roi)))?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Average Price</p>
                  <p className="text-2xl font-bold text-accent">
                    ${(properties.reduce((sum, p) => sum + p.price, 0) / properties.length / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Across selected properties</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
