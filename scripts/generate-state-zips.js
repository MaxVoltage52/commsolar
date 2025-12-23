/**
 * Generate zip code mappings based on known zip code ranges for IL, NY, MA, MN
 * This creates comprehensive coverage without needing to download external databases
 */

const fs = require('fs');
const path = require('path');

// Known zip code ranges for each state
// Source: USPS zip code ranges
const ZIP_RANGES = {
  IL: [
    { start: 60001, end: 60999 }, // Northern IL
    { start: 61001, end: 62999 }  // Southern IL
  ],
  NY: [
    { start: 10001, end: 14999 }, // NYC and surrounding
    { start: 6390, end: 6390 }    // Fishers Island
  ],
  MA: [
    { start: 1001, end: 2799 },   // Massachusetts
    { start: 5501, end: 5544 }    // Massachusetts (continued)
  ],
  MN: [
    { start: 55001, end: 56799 }  // Minnesota
  ]
};

// Major cities for realistic city names (simplified)
const MAJOR_CITIES = {
  IL: {
    '600': 'Chicago',
    '601': 'Chicago',
    '606': 'Chicago',
    '607': 'Chicago',
    '608': 'Chicago',
    '610': 'Rockford',
    '615': 'Peoria',
    '617': 'Bloomington',
    '618': 'Centralia',
    '620': 'East St. Louis',
    '625': 'Carbondale',
    '627': 'Springfield'
  },
  NY: {
    '100': 'New York',
    '101': 'New York',
    '102': 'New York',
    '103': 'New York',
    '104': 'Bronx',
    '105': 'Westchester',
    '110': 'Queens',
    '111': 'Queens',
    '112': 'Brooklyn',
    '113': 'Flushing',
    '114': 'Jamaica',
    '116': 'Far Rockaway',
    '117': 'Hicksville',
    '118': 'Riverhead',
    '120': 'Albany',
    '122': 'Albany',
    '130': 'Syracuse',
    '132': 'Syracuse',
    '140': 'Rochester',
    '142': 'Buffalo',
    '143': 'Niagara Falls'
  },
  MA: {
    '010': 'Springfield',
    '011': 'Springfield',
    '012': 'Pittsfield',
    '013': 'Greenfield',
    '014': 'Fitchburg',
    '015': 'Worcester',
    '016': 'Worcester',
    '017': 'Framingham',
    '018': 'Woburn',
    '019': 'Lynn',
    '020': 'Brockton',
    '021': 'Boston',
    '022': 'Cambridge',
    '023': 'Brockton',
    '024': 'Brockton',
    '025': 'Cape Cod',
    '026': 'Cape Cod',
    '027': 'New Bedford'
  },
  MN: {
    '550': 'Minneapolis',
    '551': 'St. Paul',
    '553': 'Minneapolis',
    '554': 'Minneapolis',
    '555': 'Minneapolis',
    '560': 'Mankato',
    '565': 'Rochester',
    '566': 'Duluth',
    '567': 'Thief River Falls'
  }
};

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
    'nexamp-ny',
    'common-energy-ny',
    'sunscription-ny'
  ],
  MA: [
    'nexamp-ma',
    'solstice-ma',
    'common-energy-ma'
  ],
  MN: [
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

function getCityForZip(stateCode, zip) {
  const prefix = zip.substring(0, 3);
  return MAJOR_CITIES[stateCode][prefix] || `City in ${STATE_NAMES[stateCode]}`;
}

function generateZipMappings() {
  const mappings = {};
  let totalCount = 0;

  console.log('🚀 Generating zip code mappings for IL, NY, MA, MN...\n');

  Object.keys(ZIP_RANGES).forEach(stateCode => {
    let stateCount = 0;

    ZIP_RANGES[stateCode].forEach(range => {
      for (let zip = range.start; zip <= range.end; zip++) {
        const zipStr = zip.toString().padStart(5, '0');

        mappings[zipStr] = {
          state: STATE_NAMES[stateCode],
          stateCode: stateCode,
          city: getCityForZip(stateCode, zipStr),
          providers: STATE_PROVIDERS[stateCode]
        };

        stateCount++;
        totalCount++;
      }
    });

    console.log(`✓ ${STATE_NAMES[stateCode]} (${stateCode}): ${stateCount.toLocaleString()} zip codes`);
  });

  console.log(`\n📊 Total: ${totalCount.toLocaleString()} zip codes\n`);

  return mappings;
}

// Main execution
function main() {
  const outputPath = path.join(__dirname, '..', 'data', 'zip-mappings.json');

  const mappings = generateZipMappings();

  console.log(`💾 Writing to: ${outputPath}`);
  fs.writeFileSync(
    outputPath,
    JSON.stringify(mappings, null, 2),
    'utf-8'
  );

  console.log('✅ Done!\n');
  console.log('Next steps:');
  console.log('1. Test locally: npm run dev');
  console.log('2. Commit: git add data/zip-mappings.json && git commit -m "Add comprehensive zip code coverage"');
  console.log('3. Push: git push origin master');
  console.log('4. Vercel will auto-deploy! 🚀\n');
}

main();
