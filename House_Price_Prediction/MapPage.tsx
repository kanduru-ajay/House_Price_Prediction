import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Map, Layers, MapPin, Zap } from "lucide-react";

export default function MapPage() {
  const [layers, setLayers] = useState({
    properties: true,
    heatmap: true,
    schools: false,
    hospitals: false,
    transit: false,
    shopping: false,
  });

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const properties = [
    { id: 1, name: "Downtown Luxury", price: 450000, lat: 40.7128, lng: -74.006 },
    { id: 2, name: "Midtown Family Home", price: 380000, lat: 40.758, lng: -73.9855 },
    { id: 3, name: "Suburban Villa", price: 320000, lat: 40.7489, lng: -73.968 },
    { id: 4, name: "Waterfront Penthouse", price: 520000, lat: 40.7614, lng: -73.9776 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Location Intelligence Map</h1>
            <p className="text-lg text-muted-foreground">
              Explore properties, neighborhoods, and amenities on an interactive map.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Controls */}
            <Card className="p-6 border-border h-fit">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Map Layers
              </h3>
              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={layers.properties}
                    onCheckedChange={() => toggleLayer("properties")}
                  />
                  <span className="text-sm">Properties</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={layers.heatmap}
                    onCheckedChange={() => toggleLayer("heatmap")}
                  />
                  <span className="text-sm">Price Heatmap</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={layers.schools}
                    onCheckedChange={() => toggleLayer("schools")}
                  />
                  <span className="text-sm">Schools</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={layers.hospitals}
                    onCheckedChange={() => toggleLayer("hospitals")}
                  />
                  <span className="text-sm">Hospitals</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={layers.transit}
                    onCheckedChange={() => toggleLayer("transit")}
                  />
                  <span className="text-sm">Public Transit</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={layers.shopping}
                    onCheckedChange={() => toggleLayer("shopping")}
                  />
                  <span className="text-sm">Shopping Centers</span>
                </label>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-3 text-sm">Active Layers</h4>
                <div className="space-y-2 text-xs">
                  {Object.entries(layers)
                    .filter(([, enabled]) => enabled)
                    .map(([layer]) => (
                      <div key={layer} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        {layer.charAt(0).toUpperCase() + layer.slice(1)}
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* Map Area */}
            <div className="lg:col-span-3">
              <Card className="p-6 border-border overflow-hidden">
                <div className="relative w-full h-96 lg:h-96 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-border flex items-center justify-center">
                  {/* Map Placeholder */}
                  <div className="text-center">
                    <Map className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Interactive Map View</p>
                    <p className="text-sm text-muted-foreground">Google Maps integration with live property markers</p>
                  </div>

                  {/* Sample Markers */}
                  {layers.properties && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {properties.map((prop, idx) => (
                        <div
                          key={prop.id}
                          className="absolute w-8 h-8 bg-accent rounded-full shadow-lg flex items-center justify-center text-white text-xs font-bold pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
                          style={{
                            left: `${20 + idx * 20}%`,
                            top: `${30 + (idx % 2) * 30}%`,
                          }}
                          title={prop.name}
                        >
                          {idx + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property List */}
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-foreground">Properties on Map</h4>
                  {properties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground group-hover:text-accent transition-colors">{prop.name}</p>
                            <p className="text-sm text-muted-foreground">${prop.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <Zap className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Neighborhood Info */}
              <Card className="mt-8 p-6 border-border bg-gradient-to-br from-accent/5 to-accent/10">
                <h3 className="text-lg font-semibold text-foreground mb-4">Neighborhood Insights</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Safety Rating</p>
                    <p className="text-3xl font-bold text-accent">8.5/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">School Quality</p>
                    <p className="text-3xl font-bold text-accent">9.2/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Walkability Score</p>
                    <p className="text-3xl font-bold text-accent">8.8/10</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
