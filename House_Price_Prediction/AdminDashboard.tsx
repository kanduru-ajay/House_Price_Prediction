import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, Database, Activity, TrendingUp, Upload, Settings } from "lucide-react";

const userActivityData = [
  { date: "Mon", predictions: 45, comparisons: 23, searches: 67 },
  { date: "Tue", predictions: 52, comparisons: 28, searches: 72 },
  { date: "Wed", predictions: 48, comparisons: 25, searches: 65 },
  { date: "Thu", predictions: 61, comparisons: 32, searches: 78 },
  { date: "Fri", predictions: 55, comparisons: 29, searches: 71 },
  { date: "Sat", predictions: 42, comparisons: 20, searches: 58 },
  { date: "Sun", predictions: 38, comparisons: 18, searches: 52 },
];

const propertyDistribution = [
  { name: "Residential", value: 45 },
  { name: "Commercial", value: 25 },
  { name: "Apartment", value: 20 },
  { name: "Villa", value: 10 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage platform data, users, and system metrics.</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">1,247</p>
                </div>
                <Users className="w-5 h-5 text-accent" />
              </div>
              <p className="text-xs text-green-600 mt-2">+12% this month</p>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Properties</p>
                  <p className="text-3xl font-bold text-foreground">8,542</p>
                </div>
                <Database className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">+8% this month</p>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Predictions Made</p>
                  <p className="text-3xl font-bold text-foreground">3,891</p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs text-blue-600 mt-2">+24% this month</p>
            </Card>

            <Card className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">System Health</p>
                  <p className="text-3xl font-bold text-foreground">99.8%</p>
                </div>
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-xs text-green-600 mt-2">All systems operational</p>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="analytics" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-8">
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">User Activity (Weekly)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="predictions" stroke="var(--accent)" strokeWidth={2} />
                    <Line type="monotone" dataKey="comparisons" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="searches" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6 border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Property Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={propertyDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {propertyDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="p-6 border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">System Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">API Response Time</p>
                        <p className="text-sm text-accent font-semibold">145ms</p>
                      </div>
                      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">Database Load</p>
                        <p className="text-sm text-accent font-semibold">32%</p>
                      </div>
                      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "32%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">Cache Hit Rate</p>
                        <p className="text-sm text-accent font-semibold">87%</p>
                      </div>
                      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "87%" }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Users */}
            <TabsContent value="users" className="space-y-4">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">User Management</h3>
                  <Button size="sm">Add User</Button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
                      <div>
                        <p className="font-medium text-foreground">User {i}</p>
                        <p className="text-sm text-muted-foreground">user{i}@example.com</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Active</span>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Properties */}
            <TabsContent value="properties" className="space-y-4">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Property Management</h3>
                  <Button size="sm" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Dataset
                  </Button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
                      <div>
                        <p className="font-medium text-foreground">Property Dataset {i}</p>
                        <p className="text-sm text-muted-foreground">2,150 properties • Last updated 2 days ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Refresh
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-4">
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">ML Model Version</p>
                      <p className="text-sm text-muted-foreground">Current: v3.2.1</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Database Backup</p>
                      <p className="text-sm text-muted-foreground">Last backup: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Backup Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">API Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">1000 requests per minute</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Enabled for system alerts</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
