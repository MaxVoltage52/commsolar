/**
 * Generate accurate zip code mappings using real zip code database
 * Data source: https://github.com/scpike/us-state-county-zip
 */

const fs = require('fs');
const path = require('path');

// State to provider mappings
const STATE_PROVIDERS = {
  IL: [
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
  NY: [
    'clearway-ny',
    'nexamp-ny',
    'common-energy-ny',
    'sunscription-ny'
  ],
  MA: [
    'clearway-ma',
    'nexamp-ma',
    'solstice-ma',
    'common-energy-ma'
  ],
  MN: [
    'clearway-mn',
    'cef-mn',
    'sunshare-mn',
    'nexamp-mn'
  ]
};

const STATE_NAMES = {
  IL: 'Illinois',
  NY: 'New York',
  MA: 'Massachusetts',
  MN: 'Minnesota'
};

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Simple CSV parser (handles commas in quoted fields)
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }

  return data;
}

function generateAccurateZipMappings() {
  const csvPath = path.join(__dirname, '..', 'data', 'zip-database.csv');

  if (!fs.existsSync(csvPath)) {
    console.error('❌ Error: zip-database.csv not found!');
    console.log('Please run the download command first.');
    process.exit(1);
  }

  console.log('📖 Reading zip code database...\n');
  const zipData = parseCSV(csvPath);
  console.log(`Total records in database: ${zipData.length.toLocaleString()}`);

  const mappings = {};
  const counts = { IL: 0, NY: 0, MA: 0, MN: 0 };

  zipData.forEach(row => {
    const stateCode = row.state_abbr;
    const zip = row.zipcode;
    const city = row.city;
    const county = row.county;

    // Only process our 4 states
    if (!STATE_PROVIDERS[stateCode]) return;

    mappings[zip] = {
      state: STATE_NAMES[stateCode],
      stateCode: stateCode,
      county: county || undefined,
      city: city,
      providers: STATE_PROVIDERS[stateCode]
    };

    counts[stateCode]++;
  });

  console.log('\n✓ Zip codes processed per state:');
  console.log(`  Illinois (IL): ${counts.IL.toLocaleString()}`);
  console.log(`  New York (NY): ${counts.NY.toLocaleString()}`);
  console.log(`  Massachusetts (MA): ${counts.MA.toLocaleString()}`);
  console.log(`  Minnesota (MN): ${counts.MN.toLocaleString()}`);
  console.log(`  Total: ${Object.keys(mappings).length.toLocaleString()}\n`);

  return mappings;
}

function main() {
  const outputPath = path.join(__dirname, '..', 'data', 'zip-mappings.json');

  console.log('🚀 Generating accurate zip code mappings...\n');

  const mappings = generateAccurateZipMappings();

  console.log(`💾 Writing to: ${outputPath}`);
  fs.writeFileSync(
    outputPath,
    JSON.stringify(mappings, null, 2),
    'utf-8'
  );

  // Show some examples
  console.log('\n📍 Sample zip codes:');
  console.log(`  60103: ${mappings['60103']?.city}, ${mappings['60103']?.stateCode}`);
  console.log(`  60108: ${mappings['60108']?.city}, ${mappings['60108']?.stateCode}`);
  console.log(`  60601: ${mappings['60601']?.city}, ${mappings['60601']?.stateCode}`);

  console.log('\n✅ Done!\n');
  console.log('Next steps:');
  console.log('1. Test: npm run dev (try zip codes 60103, 60108)');
  console.log('2. Commit: git add data/zip-mappings.json && git commit -m "Fix: Use accurate city names for all zip codes"');
  console.log('3. Push: git push origin master\n');
}

main();
