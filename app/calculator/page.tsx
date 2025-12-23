import SavingsCalculator from "@/components/SavingsCalculator";

export default function CalculatorPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Savings Calculator</h1>
        <p className="text-xl text-gray-600">
          Estimate how much you could save with community solar
        </p>
      </div>
      <SavingsCalculator />
    </div>
  );
}
