import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProviderCard from '@/components/ProviderCard';
import { Provider } from '@/types/provider';
import { StatePolicy } from '@/types/state';

const STATE_MAP: { [key: string]: { name: string; code: string } } = {
  illinois: { name: 'Illinois', code: 'IL' },
  'new-york': { name: 'New York', code: 'NY' },
  massachusetts: { name: 'Massachusetts', code: 'MA' },
  minnesota: { name: 'Minnesota', code: 'MN' },
};

async function getStateProviders(stateName: string) {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'data', 'providers', `${stateName}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.providers as Provider[];
  } catch (error) {
    return null;
  }
}

async function getStatePolicy(stateCode: string) {
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'data', 'policies', 'state-policies.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data[stateCode] as StatePolicy | undefined;
  } catch (error) {
    return null;
  }
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateInfo = STATE_MAP[state];

  if (!stateInfo) {
    notFound();
  }

  const providers = await getStateProviders(state);
  const policy = await getStatePolicy(stateInfo.code);

  if (!providers) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <Link href="/" className="text-slate-600 hover:text-slate-900 mb-6 inline-block font-medium">
          ← Back to search
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-slate-900">
          Community Solar Providers in {stateInfo.name}
        </h1>
        <p className="text-xl text-slate-600">
          {providers.length} provider{providers.length !== 1 ? 's' : ''} available in {stateInfo.name}
        </p>
      </div>

      {policy && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 mb-10 shadow-sm">
          <h2 className="text-2xl font-bold mb-3 text-slate-900">{policy.programName || 'State Program'}</h2>
          <p className="text-slate-700 mb-6 leading-relaxed">{policy.description}</p>
          {policy.keyBenefits && policy.keyBenefits.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-slate-900">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2">
                {policy.keyBenefits.map((benefit, index) => (
                  <li key={index} className="text-slate-700">{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/calculator" className="text-blue-600 hover:text-blue-800 text-lg">
          Calculate Your Savings →
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { state: 'illinois' },
    { state: 'new-york' },
    { state: 'massachusetts' },
    { state: 'minnesota' },
  ];
}
