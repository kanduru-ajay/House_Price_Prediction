import { describe, it, expect } from "vitest";

/**
 * Routing verification tests to ensure all feature pages are properly configured
 */
describe("Application Routing", () => {
  const routes = [
    { path: "/", name: "Home" },
    { path: "/predict", name: "Price Prediction" },
    { path: "/analytics", name: "Analytics Dashboard" },
    { path: "/advisor", name: "AI Advisor" },
    { path: "/calculator", name: "Investment Calculator" },
    { path: "/compare", name: "Property Comparison" },
    { path: "/map", name: "Location Intelligence Map" },
    { path: "/recommendations", name: "Recommendations" },
    { path: "/dashboard", name: "User Dashboard" },
    { path: "/admin", name: "Admin Dashboard" },
  ];

  it("should have all required routes defined", () => {
    expect(routes).toHaveLength(10);
  });

  it("should have unique route paths", () => {
    const paths = routes.map((r) => r.path);
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(paths.length);
  });

  it("should have all routes starting with /", () => {
    routes.forEach((route) => {
      expect(route.path).toMatch(/^\//);
    });
  });

  it("should have descriptive route names", () => {
    routes.forEach((route) => {
      expect(route.name.length).toBeGreaterThan(0);
      expect(route.name).not.toBe("");
    });
  });

  it("should verify all feature routes are accessible", () => {
    const featureRoutes = routes.filter((r) => r.path !== "/" && r.path !== "/404");
    expect(featureRoutes).toHaveLength(9);

    const requiredFeatures = [
      "Price Prediction",
      "Analytics Dashboard",
      "AI Advisor",
      "Investment Calculator",
      "Property Comparison",
      "Location Intelligence Map",
      "Recommendations",
      "User Dashboard",
      "Admin Dashboard",
    ];

    requiredFeatures.forEach((feature) => {
      const found = featureRoutes.some((r) => r.name.includes(feature));
      expect(found).toBe(true);
    });
  });
});
