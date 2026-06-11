import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useState } from "react";
import { TrendingUp, TrendingDown, Home, MapPin } from "lucide-react";

const priceHistoryData = [
  { month: "Jan", price: 245000, volume: 120 },
  { month: "Feb", price: 248000, volume: 135 },
  { month: "Mar", price: 252000, volume: 145 },
  { month: "Apr", price: 255000, volume: 160 },
  { month: "May", price: 258000, volume: 175 },
  { month: "Jun", price: 265000, volume: 190 },
];

const neighborhoodData = [
  { name: "Downtown", avgPrice: 450000, growth: 8.5 },
  { name: "Midtown", avgPrice: 380000, growth: 6.2 },
  { name: "Uptown", avgPrice: 320000, growth: 7.1 },
  { name: "Suburbs", avgPrice: 280000, growth: 5.8 },
  { name: "Waterfront", avgPrice: 520000, growth: 9.3 },
];

const marketTrendData = [
  { week: "W1", demand: 65, supply: 45 },
  { week: "W2", demand: 72, supply: 48 },
  { week: "W3", demand: 68, supply: 52 },
  { week: "W4", demand: 78, supply: 50 },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Real Estate Analytics</h1>
            <p className="text-lg text-muted-foreground">
              Market trends, price history, and neighborhood insights
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Price</p>
                <p className="text-3xl font-bold text-foreground">$285K</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">+4.2% from last month</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Properties Listed</p>
                <p className="text-3xl font-bold text-foreground">2,847</p>
              </div>
              <Home className="w-5 h-5 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Market Heat</p>
                <p className="text-3xl font-bold text-foreground">Hot</p>
              </div>
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-xs text-orange-600 mt-2">High demand, low supply</p>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Days on Market</p>
                <p className="text-3xl font-bold text-foreground">28</p>
              </div>
              <TrendingDown className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-2">-8% from last month</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Price History */}
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Price Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={priceHistoryData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="var(--accent)"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Market Demand vs Supply */}
          <Card className="p-6 border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Demand vs Supply</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" fill="var(--accent)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="supply" fill="var(--muted)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Neighborhood Analysis */}
        <Card className="p-6 border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Neighborhood Rankings</h3>
          <div className="space-y-4">
            {neighborhoodData.map((neighborhood, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">{neighborhood.name}</p>
                    <p className="text-sm text-muted-foreground">Avg Price: ${neighborhood.avgPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{neighborhood.growth}%</p>
                  <p className="text-sm text-green-600">Annual Growth</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
