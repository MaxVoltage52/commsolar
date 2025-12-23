"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Provider } from "@/types/provider";
import { StatePolicy, LocationInfo } from "@/types/state";
import ProviderCard from "@/components/ProviderCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";

interface SearchResults {
  success: boolean;
  available: boolean;
  message: string;
  location: LocationInfo | null;
  providers: Provider[];
  statePolicy: StatePolicy | null;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const zipCode = searchParams.get("zip");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get results from sessionStorage first
    const storedResults = sessionStorage.getItem("searchResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
      setLoading(false);
    } else if (zipCode) {
      // If no stored results, fetch them
      fetchResults(zipCode);
    }
  }, [zipCode]);

  const fetchResults = async (zip: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode: zip }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-xl text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-xl text-gray-600">No results found. Please try searching again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Location Header */}
      {results.location && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              {results.location.city}, {results.location.state} {results.location.zip}
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {/* Results Message */}
      <Card className={results.available ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            {results.available ? (
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            )}
            <p className={`text-lg ${results.available ? "text-green-900" : "text-yellow-900"}`}>
              {results.message}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* State Policy Information */}
      {results.statePolicy && (
        <Card>
          <CardHeader>
            <CardTitle>Community Solar in {results.statePolicy.state}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{results.statePolicy.description}</p>

            {results.statePolicy.keyBenefits.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Key Benefits:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {results.statePolicy.keyBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {results.statePolicy.resources.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Resources:</h4>
                <ul className="space-y-1">
                  {results.statePolicy.resources.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Provider Results */}
      {results.providers.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Available Providers ({results.providers.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto text-center py-12">
        <p className="text-xl text-gray-600">Loading results...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
