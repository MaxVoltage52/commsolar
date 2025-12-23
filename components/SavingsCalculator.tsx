"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SavingsResults {
  currentAnnualCost: number;
  estimatedSavings: number;
  savingsPercentage: number;
  newAnnualCost: number;
}

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [discountRate, setDiscountRate] = useState("15");
  const [results, setResults] = useState<SavingsResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    const bill = parseFloat(monthlyBill);
    const discount = parseFloat(discountRate);

    if (!bill || bill <= 0) {
      alert("Please enter a valid monthly bill amount");
      return;
    }

    if (!discount || discount <= 0 || discount > 100) {
      alert("Please enter a valid discount rate between 1-100");
      return;
    }

    setIsCalculating(true);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlyBill: bill,
          discountRate: discount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.calculation);
      } else {
        alert("Error calculating savings");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to calculate savings");
    } finally {
      setIsCalculating(false);
    }
  };

  const chartData = results
    ? [
        {
          name: "Current Cost",
          amount: results.currentAnnualCost,
        },
        {
          name: "With Community Solar",
          amount: results.newAnnualCost,
        },
        {
          name: "Annual Savings",
          amount: results.estimatedSavings,
        },
      ]
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Your Potential Savings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Electric Bill ($)</label>
              <Input
                type="number"
                placeholder="150"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                min="0"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Expected Discount Rate (%)</label>
              <Input
                type="number"
                placeholder="15"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                min="1"
                max="100"
                step="1"
              />
              <p className="text-xs text-gray-500">
                Typical savings range from 10-20%
              </p>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            size="lg"
            className="w-full md:w-auto"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {isCalculating ? "Calculating..." : "Calculate Savings"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-900">Your Estimated Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-1">Current Annual Cost</p>
                  <p className="text-3xl font-bold text-green-900">
                    ${results.currentAnnualCost.toFixed(0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-1">New Annual Cost</p>
                  <p className="text-3xl font-bold text-green-900">
                    ${results.newAnnualCost.toFixed(0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-700 mb-1">Annual Savings</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${results.estimatedSavings.toFixed(0)}
                  </p>
                  <p className="text-sm text-green-700">
                    ({results.savingsPercentage}% discount)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> These are estimated savings based on the discount rate you selected.
                Actual savings may vary depending on the specific provider, your location, and your energy usage patterns.
                Visit provider websites for official quotes.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
