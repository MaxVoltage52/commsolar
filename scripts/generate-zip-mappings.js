/**
 * Generate comprehensive zip code mappings for IL, NY, MA, MN
 *
 * Download the free SimpleMaps database from:
 * https://simplemaps.com/data/us-zips (Basic version is free)
 *
 * Extract the CSV file and place it as: data/uszips.csv
 * Then run: node scripts/generate-zip-mappings.js
 */

const fs = require('fs');
const path = require('path');

// State to provider mappings
const STATE_PROVIDERS = {
  'IL': [
    'clearway-il',
    'sunscription-il',
    'nexamp-il',
    'common-energy-il',
    'solstice-il',
    'ampion-il',
    'arcadia-il',
    'gejc-il',
    'igs-il',
    'illinois-community-solar',
    'mc2-il',
    'powermarket-il',
    'solar-landscape-il'
  ],
  'NY': [
    'nexamp-ny',
    'common-energy-ny',
    'sunscription-ny'
  ],
  'MA': [
    'nexamp-ma',
    'solstice-ma',
    'common-energy-ma'
  ],
  'MN': [
    'cef-mn',
    'sunshare-mn',
    'nexamp-mn'
  ]
};

// Read and parse CSV (simple parser - no dependencies needed)
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }

  return data;
}

// Generate zip mappings
function generateZipMappings(csvPath) {
  console.log('Reading zip code data...');
  const zipData = parseCSV(csvPath);

  console.log(`Total zip codes in database: ${zipData.length}`);

  const mappings = {};
  let count = { IL: 0, NY: 0, MA: 0, MN: 0 };

  // Filter and map zip codes for our 4 states
  zipData.forEach(row => {
    const zip = row.zip;
    const stateCode = row.state_id;
    const city = row.city;
    const county = row.county_name;

    // Only process our 4 states
    if (!STATE_PROVIDERS[stateCode]) return;

    // Create mapping
    mappings[zip] = {
      state: getStateName(stateCode),
      stateCode: stateCode,
      county: county || undefined,
      city: city,
      providers: STATE_PROVIDERS[stateCode]
    };

    count[stateCode]++;
  });

  console.log('\nZip codes added per state:');
  console.log(`  Illinois (IL): ${count.IL}`);
  console.log(`  New York (NY): ${count.NY}`);
  console.log(`  Massachusetts (MA): ${count.MA}`);
  console.log(`  Minnesota (MN): ${count.MN}`);
  console.log(`  Total: ${Object.keys(mappings).length}`);

  return mappings;
}

function getStateName(code) {
  const names = {
    'IL': 'Illinois',
    'NY': 'New York',
    'MA': 'Massachusetts',
    'MN': 'Minnesota'
  };
  return names[code];
}

// Main execution
async function main() {
  const csvPath = path.join(__dirname, '..', 'data', 'uszips.csv');
  const outputPath = path.join(__dirname, '..', 'data', 'zip-mappings.json');

  // Check if CSV exists
  if (!fs.existsSync(csvPath)) {
    console.error('\n❌ Error: CSV file not found!');
    console.log('\nPlease download the free zip code database:');
    console.log('1. Go to: https://simplemaps.com/data/us-zips');
    console.log('2. Download the FREE "Basic" version (CSV)');
    console.log('3. Extract the CSV file');
    console.log('4. Rename it to: uszips.csv');
    console.log('5. Place it in: data/uszips.csv');
    console.log('\nThen run this script again.');
    process.exit(1);
  }

  console.log('🚀 Generating comprehensive zip code mappings...\n');

  const mappings = generateZipMappings(csvPath);

  // Write to file
  console.log(`\nWriting to: ${outputPath}`);
  fs.writeFileSync(
    outputPath,
    JSON.stringify(mappings, null, 2),
    'utf-8'
  );

  console.log('✅ Done! Zip code mappings generated successfully.\n');
  console.log('Next steps:');
  console.log('1. Review the generated data/zip-mappings.json file');
  console.log('2. Commit the changes to git');
  console.log('3. Push to GitHub (will auto-deploy to Vercel)');
}

main().catch(console.error);
