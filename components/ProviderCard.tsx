"use client";

import { Provider } from "@/types/provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, XCircle, Tag } from "lucide-react";

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
    <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900">{name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-slate-900">
            {pricing.discountRate}%
          </span>
          <span className="text-sm text-slate-600 ml-2">savings</span>
        </CardDescription>
      </CardHeader>

      {/* Promotional Banner - More subtle design */}
      {isPromotionActive && (
        <div className="mx-6 mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">
                {promotion.description}
              </p>
              {promotion.expiresAt && (
                <p className="text-xs text-blue-700 mt-0.5">
                  Offer expires {new Date(promotion.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <CardContent className="space-y-6 flex-1 flex flex-col">
        {/* Pricing Details */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-700">Pricing Details</h4>
          <ul className="text-sm space-y-2 text-slate-600">
            {pricing.subscriptionFee && pricing.subscriptionFee > 0 ? (
              <li className="flex justify-between">
                <span>Subscription Fee:</span>
                <span className="font-medium">${pricing.subscriptionFee}/mo</span>
              </li>
            ) : null}
            {pricing.cancellationFee && pricing.cancellationFee > 0 ? (
              <li className="flex justify-between">
                <span>Cancellation Fee:</span>
                <span className="font-medium">${pricing.cancellationFee}</span>
              </li>
            ) : null}
            {pricing.contractLength && pricing.contractLength > 0 ? (
              <li className="flex justify-between">
                <span>Contract:</span>
                <span className="font-medium">{pricing.contractLength} months</span>
              </li>
            ) : (
              <li className="flex justify-between">
                <span>Contract:</span>
                <span className="font-medium text-blue-600">No commitment</span>
              </li>
            )}
          </ul>
        </div>

        {/* Features */}
        <div className="space-y-3 flex-1">
          <h4 className="font-semibold text-sm text-slate-700">Features</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2 text-slate-600">
              {features.noUpfrontCost ? (
                <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
              )}
              <span>No upfront costs</span>
            </li>
            <li className="flex items-center gap-2 text-slate-600">
              {features.cancellableAnytime ? (
                <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
              )}
              <span>Cancel anytime</span>
            </li>
            <li className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <span>{features.renewablePercentage}% Renewable Energy</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="space-y-2 mt-auto">
          <Button
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
            onClick={() => window.open(signupLink, "_blank")}
          >
            {isPromotionActive ? "View Offer" : "Learn More"}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          {referralLink && (
            <p className="text-xs text-slate-500 text-center">
              Affiliate link · Supports this site at no cost to you
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
