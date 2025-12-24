"use client";

import { Provider } from "@/types/provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, XCircle, Gift, Calendar } from "lucide-react";

interface ProviderCardProps {
  provider: Provider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const {
    name,
    pricing,
    features,
    contactInfo,
    referralLink,
    promotion
  } = provider;

  // Check if promotion is still valid
  const isPromotionActive = promotion && (!promotion.expiresAt || new Date(promotion.expiresAt) > new Date());
  const signupLink = referralLink || contactInfo.website;

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

      {/* Promotional Banner */}
      {isPromotionActive && (
        <div className="mx-6 mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg">
          <div className="flex items-start gap-2">
            <Gift className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-green-900 text-sm">
                🎉 Special Offer!
              </p>
              <p className="text-green-800 text-sm mt-1">
                {promotion.description}
              </p>
              {promotion.expiresAt && (
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3 text-green-700" />
                  <p className="text-xs text-green-700">
                    Expires {new Date(promotion.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
          onClick={() => window.open(signupLink, "_blank")}
        >
          {isPromotionActive ? "Claim Offer & Sign Up" : "Visit Website"}
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
        {referralLink && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Referral link - supports this site at no cost to you
          </p>
        )}
      </CardContent>
    </Card>
  );
}
