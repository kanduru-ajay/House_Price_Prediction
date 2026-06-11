import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { ArrowRight, BarChart3, Brain, Calculator, Map, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Brain,
      title: "AI Price Prediction",
      description: "Advanced ML models predict house prices with high accuracy and confidence scores.",
    },
    {
      icon: BarChart3,
      title: "Real Estate Analytics",
      description: "Interactive dashboards with market trends, price history, and neighborhood data.",
    },
    {
      icon: Zap,
      title: "AI Advisor",
      description: "Conversational AI assistant providing personalized investment insights.",
    },
    {
      icon: Calculator,
      title: "Investment Tools",
      description: "ROI, mortgage, rental yield, and cash flow calculators for smart decisions.",
    },
    {
      icon: Map,
      title: "Location Intelligence",
      description: "Interactive maps with heatmaps, amenities, and neighborhood overlays.",
    },
    {
      icon: TrendingUp,
      title: "Smart Recommendations",
      description: "Personalized property suggestions based on your budget and preferences.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Intelligent Real Estate <span className="text-accent">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Harness AI-powered analytics and predictive modeling to make smarter real estate decisions. From price predictions to investment analysis, we've got you covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/predict">
                    <Button size="lg" className="gap-2">
                      Start Predicting <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline">
                      Go to Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()}>
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-accent">10K+</p>
                <p className="text-sm text-muted-foreground">Properties Analyzed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">98%</p>
                <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">50+</p>
                <p className="text-sm text-muted-foreground">Cities Covered</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/5 rounded-2xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/20">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-r from-accent/30 to-accent/10 rounded-lg"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gradient-to-r from-accent/20 to-accent/5 rounded-lg"></div>
                    <div className="h-24 bg-gradient-to-r from-accent/20 to-accent/5 rounded-lg"></div>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-accent/30 to-accent/10 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-border py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed real estate decisions powered by cutting-edge AI and data science.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-xl border border-border bg-white hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl border border-accent/20 p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Transform Your Real Estate Strategy?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of investors and homebuyers using AI-powered insights to make better decisions.
          </p>
          {!isAuthenticated && (
            <a href={getLoginUrl()}>
              <Button size="lg" className="gap-2">
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Docs</a></li>
                <li><a href="#" className="hover:text-foreground transition">API</a></li>
                <li><a href="#" className="hover:text-foreground transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2026 RealEstateAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition text-sm">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition text-sm">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
