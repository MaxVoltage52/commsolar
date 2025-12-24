# Managing Referral & Affiliate Links

This guide shows you how to add referral links and promotions to providers.

## Current Active Referral Links

### Illinois
- ✅ **Clearway Community Solar**: $200 bill credit (expires 1/31/26)

### To Add
- [ ] Nexamp (all states): $100 Visa gift card
- [ ] Common Energy (IL, NY, MA): $50 per referral + Partner Program
- [ ] Solstice (IL, NY, MA): $25-$100 per referral

## How to Add a Referral Link

### Step 1: Get Your Referral Link
Sign up for the provider's referral/affiliate program and get your unique link.

### Step 2: Update the Provider Data File

Edit the appropriate file in `data/providers/`:
- Illinois: `illinois.json`
- New York: `new-york.json`
- Massachusetts: `massachusetts.json`
- Minnesota: `minnesota.json`

### Step 3: Add the Referral Link

Find the provider in the JSON file and add the `referralLink` field:

```json
{
  "id": "nexamp-il",
  "name": "Nexamp",
  ...
  "contactInfo": {
    "website": "https://www.nexamp.com/illinois-community-solar",
    "phone": null,
    "email": null
  },
  "referralLink": "YOUR_REFERRAL_LINK_HERE",
  "lastUpdated": "2025-12-22"
}
```

### Step 4: (Optional) Add a Promotion

If there's a special promotion, add the `promotion` field:

```json
{
  "id": "nexamp-il",
  "name": "Nexamp",
  ...
  "referralLink": "YOUR_REFERRAL_LINK_HERE",
  "promotion": {
    "description": "$100 Visa gift card for you and your friend",
    "expiresAt": "2026-12-31"
  },
  "lastUpdated": "2025-12-22"
}
```

**Note**: If no `expiresAt` date is provided, the promotion will show indefinitely.

### Step 5: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and search for a zip code in that state to see the promotion.

### Step 6: Deploy

```bash
git add data/providers/
git commit -m "Add referral link for [Provider Name]"
git push origin master
```

Vercel will automatically deploy your changes in 2-3 minutes!

## Example: Complete Clearway Entry (Illinois)

```json
{
  "id": "clearway-il",
  "name": "Clearway Community Solar",
  "logo": null,
  "states": ["IL"],
  "serviceAreas": [
    {
      "state": "IL",
      "counties": []
    }
  ],
  "pricing": {
    "discountRate": 20,
    "subscriptionFee": 0,
    "cancellationFee": 0,
    "contractLength": 240
  },
  "features": {
    "noUpfrontCost": true,
    "cancellableAnytime": true,
    "renewablePercentage": 100
  },
  "contactInfo": {
    "website": "https://www.clearwaycommunitysolar.com/illinois/",
    "phone": null,
    "email": null
  },
  "referralLink": "https://www.clearwaycommunitysolar.com/referral-page-friend/?qs=...",
  "promotion": {
    "description": "$200 bill credit for you AND your friend",
    "expiresAt": "2026-01-31"
  },
  "lastUpdated": "2025-12-22"
}
```

## What Happens When You Add a Referral Link?

1. ✅ The provider card shows a prominent promotional banner
2. ✅ The button text changes to "Claim Offer & Sign Up"
3. ✅ Small disclosure: "Referral link - supports this site at no cost to you"
4. ✅ Promotion automatically expires after the date (won't show expired offers)

## Affiliate Program Links

### Signup Links:
- **Common Energy Partner Program**: https://www.commonenergy.us/join-us ($150-$400 per home)
- **Nexamp Referral**: https://refer.nexamp.com/ ($100 per signup)
- **Solstice Ambassador**: https://solstice.us/refer-a-friend/ ($25-$100)
- **Sunscription Partner**: https://www.us-solar.com/partner (variable rewards)

### For Clearway:
Email: communitysolarsales@clearwayenergy.com for partnership opportunities

## Tips

1. **Test First**: Always test locally before deploying
2. **Update Dates**: Keep promotion expiration dates current
3. **Be Transparent**: The site automatically adds disclosure text
4. **Track Performance**: Use the provider's dashboard to see referral performance
5. **Multi-State**: If a provider operates in multiple states, add the referral link to each state's file

## Questions?

The promotional banner will automatically:
- Show a gift icon
- Highlight the offer in green
- Display expiration date with calendar icon
- Make the button more prominent

No additional code changes needed - just update the JSON files!
