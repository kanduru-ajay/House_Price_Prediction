import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, TrendingUp } from "lucide-react";

export default function CalculatorPage() {
  const [roiInputs, setRoiInputs] = useState({
    propertyPrice: "300000",
    downPayment: "60000",
    rentalIncome: "2000",
    expenses: "500",
    appreciationRate: "5",
    years: "10",
  });

  const [mortgageInputs, setMortgageInputs] = useState({
    loanAmount: "240000",
    interestRate: "6.5",
    loanTerm: "30",
  });

  const [rentalInputs, setRentalInputs] = useState({
    propertyPrice: "300000",
    monthlyRent: "2000",
    annualExpenses: "6000",
  });

  // Calculate ROI
  const calculateROI = () => {
    const principal = parseFloat(roiInputs.downPayment) || 0;
    const monthlyIncome = parseFloat(roiInputs.rentalIncome) || 0;
    const monthlyExpenses = parseFloat(roiInputs.expenses) || 0;
    const appreciation = parseFloat(roiInputs.appreciationRate) || 0;
    const years = parseFloat(roiInputs.years) || 1;

    const annualCashFlow = (monthlyIncome - monthlyExpenses) * 12;
    const totalCashFlow = annualCashFlow * years;
    const propertyAppreciation = (parseFloat(roiInputs.propertyPrice) || 0) * (appreciation / 100) * years;
    const totalReturn = totalCashFlow + propertyAppreciation;
    const roi = principal > 0 ? ((totalReturn / principal) * 100) / years : 0;

    return { roi: roi.toFixed(2), totalReturn: totalReturn.toFixed(0), annualCashFlow: annualCashFlow.toFixed(0) };
  };

  // Calculate Mortgage
  const calculateMortgage = () => {
    const principal = parseFloat(mortgageInputs.loanAmount) || 0;
    const monthlyRate = (parseFloat(mortgageInputs.interestRate) || 0) / 100 / 12;
    const numPayments = (parseFloat(mortgageInputs.loanTerm) || 30) * 12;

    if (monthlyRate === 0) {
      return { monthlyPayment: (principal / numPayments).toFixed(2), totalPayment: principal.toFixed(0) };
    }

    const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = monthlyPayment * numPayments;

    return { monthlyPayment: monthlyPayment.toFixed(2), totalPayment: totalPayment.toFixed(0) };
  };

  // Calculate Rental Yield
  const calculateRentalYield = () => {
    const price = parseFloat(rentalInputs.propertyPrice) || 0;
    const monthlyRent = parseFloat(rentalInputs.monthlyRent) || 0;
    const annualExpenses = parseFloat(rentalInputs.annualExpenses) || 0;

    const annualRent = monthlyRent * 12;
    const netIncome = annualRent - annualExpenses;
    const yield_ = price > 0 ? ((netIncome / price) * 100).toFixed(2) : "0";

    return { yield: yield_, annualRent: annualRent.toFixed(0), netIncome: netIncome.toFixed(0) };
  };

  const roi = calculateROI();
  const mortgage = calculateMortgage();
  const rental = calculateRentalYield();

  // Growth projection data
  const growthData = Array.from({ length: parseInt(roiInputs.years) + 1 }, (_, i) => ({
    year: i,
    value: (parseFloat(roiInputs.downPayment) || 0) + (parseFloat(roi.annualCashFlow) || 0) * i,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Investment Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate ROI, mortgage payments, rental yields, and investment projections.
            </p>
          </div>

          <Tabs defaultValue="roi" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
              <TabsTrigger value="mortgage">Mortgage Calculator</TabsTrigger>
              <TabsTrigger value="rental">Rental Yield</TabsTrigger>
            </TabsList>

            {/* ROI Calculator */}
            <TabsContent value="roi" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-8 border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-6">ROI Analysis</h3>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="propertyPrice" className="text-base font-semibold">Property Price</Label>
                          <Input
                            id="propertyPrice"
                            type="number"
                            value={roiInputs.propertyPrice}
                            onChange={(e) => setRoiInputs({ ...roiInputs, propertyPrice: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="downPayment" className="text-base font-semibold">Down Payment</Label>
                          <Input
                            id="downPayment"
                            type="number"
                            value={roiInputs.downPayment}
                            onChange={(e) => setRoiInputs({ ...roiInputs, downPayment: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="rentalIncome" className="text-base font-semibold">Monthly Rental Income</Label>
                          <Input
                            id="rentalIncome"
                            type="number"
                            value={roiInputs.rentalIncome}
                            onChange={(e) => setRoiInputs({ ...roiInputs, rentalIncome: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expenses" className="text-base font-semibold">Monthly Expenses</Label>
                          <Input
                            id="expenses"
                            type="number"
                            value={roiInputs.expenses}
                            onChange={(e) => setRoiInputs({ ...roiInputs, expenses: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="appreciationRate" className="text-base font-semibold">Annual Appreciation (%)</Label>
                          <Input
                            id="appreciationRate"
                            type="number"
                            value={roiInputs.appreciationRate}
                            onChange={(e) => setRoiInputs({ ...roiInputs, appreciationRate: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="years" className="text-base font-semibold">Investment Period (Years)</Label>
                          <Input
                            id="years"
                            type="number"
                            value={roiInputs.years}
                            onChange={(e) => setRoiInputs({ ...roiInputs, years: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="p-6 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Annual ROI</h4>
                    <p className="text-4xl font-bold text-accent">{roi.roi}%</p>
                  </Card>

                  <Card className="p-6 border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Annual Cash Flow</h4>
                    <p className="text-3xl font-bold text-foreground">${roi.annualCashFlow}</p>
                  </Card>

                  <Card className="p-6 border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Total Return</h4>
                    <p className="text-3xl font-bold text-green-600">${roi.totalReturn}</p>
                  </Card>
                </div>
              </div>

              {/* Growth Chart */}
              <Card className="p-6 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Investment Growth Projection</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="year" stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} dot={{ fill: "var(--accent)", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            {/* Mortgage Calculator */}
            <TabsContent value="mortgage" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-8 border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Mortgage Details</h3>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="loanAmount" className="text-base font-semibold">Loan Amount</Label>
                          <Input
                            id="loanAmount"
                            type="number"
                            value={mortgageInputs.loanAmount}
                            onChange={(e) => setMortgageInputs({ ...mortgageInputs, loanAmount: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="interestRate" className="text-base font-semibold">Interest Rate (%)</Label>
                          <Input
                            id="interestRate"
                            type="number"
                            step="0.1"
                            value={mortgageInputs.interestRate}
                            onChange={(e) => setMortgageInputs({ ...mortgageInputs, interestRate: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="loanTerm" className="text-base font-semibold">Loan Term (Years)</Label>
                          <Input
                            id="loanTerm"
                            type="number"
                            value={mortgageInputs.loanTerm}
                            onChange={(e) => setMortgageInputs({ ...mortgageInputs, loanTerm: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="p-6 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Monthly Payment</h4>
                    <p className="text-4xl font-bold text-accent">${mortgage.monthlyPayment}</p>
                  </Card>

                  <Card className="p-6 border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Total Payment</h4>
                    <p className="text-3xl font-bold text-foreground">${mortgage.totalPayment}</p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Rental Yield */}
            <TabsContent value="rental" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-8 border-border">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Rental Yield Analysis</h3>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="rentalPropertyPrice" className="text-base font-semibold">Property Price</Label>
                          <Input
                            id="rentalPropertyPrice"
                            type="number"
                            value={rentalInputs.propertyPrice}
                            onChange={(e) => setRentalInputs({ ...rentalInputs, propertyPrice: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="monthlyRent" className="text-base font-semibold">Monthly Rent</Label>
                          <Input
                            id="monthlyRent"
                            type="number"
                            value={rentalInputs.monthlyRent}
                            onChange={(e) => setRentalInputs({ ...rentalInputs, monthlyRent: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="annualExpenses" className="text-base font-semibold">Annual Expenses</Label>
                          <Input
                            id="annualExpenses"
                            type="number"
                            value={rentalInputs.annualExpenses}
                            onChange={(e) => setRentalInputs({ ...rentalInputs, annualExpenses: e.target.value })}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="p-6 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Rental Yield</h4>
                    <p className="text-4xl font-bold text-accent">{rental.yield}%</p>
                  </Card>

                  <Card className="p-6 border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Annual Rent</h4>
                    <p className="text-3xl font-bold text-foreground">${rental.annualRent}</p>
                  </Card>

                  <Card className="p-6 border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Net Income</h4>
                    <p className="text-3xl font-bold text-green-600">${rental.netIncome}</p>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
