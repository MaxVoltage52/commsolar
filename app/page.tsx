import ZipCodeSearch from "@/components/ZipCodeSearch";
import Link from "next/link";
import { Sun, DollarSign, Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-slate-900">
          Find Community Solar in Your Area
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Compare providers and save on your electricity bill with clean, renewable energy. No rooftop panels required.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-10">
        <ZipCodeSearch />
      </div>

      {/* State Links */}
      <div className="text-center mb-16">
        <p className="text-slate-600 mb-4 font-medium">Or browse by state:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/states/illinois"
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg font-medium transition-all"
          >
            Illinois
          </Link>
          <Link
            href="/states/new-york"
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg font-medium transition-all"
          >
            New York
          </Link>
          <Link
            href="/states/massachusetts"
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg font-medium transition-all"
          >
            Massachusetts
          </Link>
          <Link
            href="/states/minnesota"
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 rounded-lg font-medium transition-all"
          >
            Minnesota
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900">No Upfront Costs</h3>
          <p className="text-slate-600">Subscribe to community solar with zero installation fees or equipment costs.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <Sun className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900">Guaranteed Savings</h3>
          <p className="text-slate-600">Save 7-20% on your electricity bill every month with clean solar energy.</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <Leaf className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-slate-900">100% Renewable</h3>
          <p className="text-slate-600">Support clean energy without installing panels on your roof.</p>
        </div>
      </div>
    </div>
  );
}
