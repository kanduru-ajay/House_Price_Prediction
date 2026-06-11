import { describe, it, expect } from "vitest";

/**
 * Integration tests to verify all feature pages are properly exported and can be imported
 */
describe("Feature Pages", () => {
  it("should import Calculator page without errors", async () => {
    const module = await import("./CalculatorPage");
    expect(module.default).toBeDefined();
  });

  it("should import Comparison page without errors", async () => {
    const module = await import("./ComparisonPage");
    expect(module.default).toBeDefined();
  });

  it("should import Map page without errors", async () => {
    const module = await import("./MapPage");
    expect(module.default).toBeDefined();
  });

  it("should import Recommendations page without errors", async () => {
    const module = await import("./RecommendationsPage");
    expect(module.default).toBeDefined();
  });

  it("should import Advisor page without errors", async () => {
    const module = await import("./AdvisorPage");
    expect(module.default).toBeDefined();
  });

  it("should import Dashboard page without errors", async () => {
    const module = await import("./DashboardPage");
    expect(module.default).toBeDefined();
  });

  it("should import Prediction page without errors", async () => {
    const module = await import("./PredictionPage");
    expect(module.default).toBeDefined();
  });

  it("should import User Dashboard without errors", async () => {
    const module = await import("./UserDashboard");
    expect(module.default).toBeDefined();
  });

  it("should import Admin Dashboard without errors", async () => {
    const module = await import("./AdminDashboard");
    expect(module.default).toBeDefined();
  });

  it("should import Home page without errors", async () => {
    const module = await import("./Home");
    expect(module.default).toBeDefined();
  });
});
