"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ZipCodeSearch() {
  const [zipCode, setZipCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate zip code
    const cleanZip = zipCode.replace(/[^0-9]/g, "");
    if (cleanZip.length !== 5) {
      setError("Please enter a valid 5-digit zip code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode: cleanZip }),
      });

      const data = await response.json();

      if (data.success) {
        // Store results in sessionStorage and navigate to results page
        sessionStorage.setItem("searchResults", JSON.stringify(data));
        router.push(`/search?zip=${cleanZip}`);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter your zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={5}
              className="h-12 text-lg"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="h-12 px-8"
          >
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Search
              </>
            )}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </form>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Currently covering Illinois, New York, Massachusetts, and Minnesota
      </p>
    </div>
  );
}
