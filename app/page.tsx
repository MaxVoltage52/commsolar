import ZipCodeSearch from "@/components/ZipCodeSearch";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Find Community Solar in Your Area</h2>
        <p className="text-xl text-gray-600">
          Save money on electricity with zero upfront costs. Enter your zip code to get started.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <ZipCodeSearch />
      </div>

      <div className="text-center mb-12">
        <p className="text-gray-600 mb-3">Or browse providers by state:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/states/illinois"
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-colors"
          >
            Illinois
          </Link>
          <Link
            href="/states/new-york"
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-colors"
          >
            New York
          </Link>
          <Link
            href="/states/massachusetts"
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-colors"
          >
            Massachusetts
          </Link>
          <Link
            href="/states/minnesota"
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-colors"
          >
            Minnesota
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">No Upfront Costs</h3>
          <p className="text-gray-600">Subscribe to community solar with zero installation fees.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Guaranteed Savings</h3>
          <p className="text-gray-600">Save 5-20% on your electricity bill every month.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">100% Clean Energy</h3>
          <p className="text-gray-600">Support renewable energy without installing panels.</p>
        </div>
      </div>
    </div>
  );
}
