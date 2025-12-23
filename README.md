# Community Solar Finder

A web application to help people across the United States find community solar providers, compare pricing, and calculate potential savings.

## Features

- **Zip Code Search**: Enter your zip code to find available community solar providers in your area
- **Provider Comparison**: View detailed information about each provider including pricing, features, and contact details
- **Savings Calculator**: Estimate your annual savings based on your monthly electric bill
- **State Policy Information**: Learn about community solar programs and policies in your state

## Currently Supported States

- Illinois (IL) - 13 providers including Clearway Community Solar
- New York (NY) - 3 providers
- Massachusetts (MA) - 3 providers
- Minnesota (MN) - 3 providers

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Charts**: Recharts
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
commsolar/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── calculator/        # Savings calculator page
│   ├── search/            # Search results page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ZipCodeSearch.tsx
│   ├── ProviderCard.tsx
│   └── SavingsCalculator.tsx
├── lib/                   # Utility functions
│   ├── data-access.ts    # Data layer
│   └── savings-calc.ts   # Calculation logic
├── types/                 # TypeScript types
├── data/                  # JSON data files
│   ├── providers/        # Provider data by state
│   ├── policies/         # State policy information
│   └── zip-mappings.json # Zip code mappings
└── public/               # Static assets
```

## Data Sources

- **Illinois Providers**: [Citizens Utility Board (CUB)](https://www.citizensutilityboard.org/solar-in-the-community/)
- **State Policies**: NREL, DSIRE, state energy offices
- **Provider Pricing**: Official provider websites and public sources

## Contributing

This project is being developed to help people save money on electricity through community solar. Contributions are welcome!

## License

MIT

## Acknowledgments

- Citizens Utility Board for Illinois community solar data
- NREL for state policy information
- All community solar providers working to make clean energy accessible
