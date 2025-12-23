import { Provider } from "@/types/provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const {
    name,
    pricing,
    features,
    contactInfo
  } = provider;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>
          <span className="text-2xl font-bold text-green-600">
            {pricing.discountRate}% Savings
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pricing Details */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Pricing Details:</h4>
          <ul className="text-sm space-y-1">
            {pricing.subscriptionFee && pricing.subscriptionFee > 0 ? (
              <li>Subscription Fee: ${pricing.subscriptionFee}/month</li>
            ) : null}
            {pricing.cancellationFee && pricing.cancellationFee > 0 ? (
              <li>Cancellation Fee: ${pricing.cancellationFee}</li>
            ) : null}
            {pricing.contractLength && pricing.contractLength > 0 ? (
              <li>Contract: {pricing.contractLength} months</li>
            ) : (
              <li className="text-green-600">No long-term contract</li>
            )}
          </ul>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Features:</h4>
          <ul className="text-sm space-y-1">
            <li className="flex items-center gap-2">
              {features.noUpfrontCost ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              No upfront costs
            </li>
            <li className="flex items-center gap-2">
              {features.cancellableAnytime ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              Cancel anytime
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              {features.renewablePercentage}% Renewable Energy
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full"
          onClick={() => window.open(contactInfo.website, "_blank")}
        >
          Visit Website
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
