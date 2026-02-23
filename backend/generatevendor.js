import fs from "fs";
import { randomUUID } from "crypto";

/* ================= CONFIG ================= */

const PASSWORD_HASH =
  "$2b$10$VyMyYM2Xw5GBq9.3jSFMW.OVF94UWH6n8XCkWzF6VJ5wTEjOARqx.";

const LOCATIONS = {
  MUM: 30,
  DEL: 30,
  BLR: 20,
  JAI: 15,
  UDA: 15,
  GOA: 20,
  ROM: 20,
  GEN: 15,
  CPH: 15,
  BKK: 20,
  NYC: 25,
  MIA: 25,
};

const PREMIUM_CITIES = ["NYC", "ROM", "CPH", "GEN"];

const CATEGORIES = [
  "ACCOMMODATION",
  "CATERING",
  "TECHNICAL",
  "DECOR",
  "FLOOR_SPACE",
  "FURNITURE",
  "STAFF",
];

/* ================= HELPERS ================= */

function randomBetween(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMultiple(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRating() {
  return parseFloat(randomBetween(2.0, 9.8));
}

function generateStarLevel(city) {
  if (PREMIUM_CITIES.includes(city)) {
    const r = Math.random();
    if (r < 0.25) return 5;
    if (r < 0.55) return 4;
    if (r < 0.8) return 3;
    if (r < 0.93) return 2;
    return 1;
  } else {
    const r = Math.random();
    if (r < 0.08) return 5;
    if (r < 0.3) return 4;
    if (r < 0.7) return 3;
    if (r < 0.9) return 2;
    return 1;
  }
}

function categoryBias(city) {
  switch (city) {
    case "DEL":
    case "JAI":
    case "UDA":
    case "GOA":
    case "ROM":
    case "CPH":
    case "BKK":
    case "MIA":
      return ["CATERING", "DECOR", "ACCOMMODATION", "FLOOR_SPACE", "STAFF"];
    case "MUM":
    case "BLR":
    case "NYC":
    case "GEN":
      return ["ACCOMMODATION", "TECHNICAL", "FLOOR_SPACE", "CATERING"];
    default:
      return CATEGORIES;
  }
}

function generateMetadata(category, city) {
  const base = {
    minBudget: randomInt(100000, 500000),
    maxBudget: randomInt(600000, 5000000),
  };

  if (category === "ACCOMMODATION") {
    return JSON.stringify({
      ...base,
      maxGuests: randomInt(100, 1500),
      hotelRooms: randomInt(20, 300),
      destinationWedding: true,
    });
  }

  if (category === "CATERING") {
    return JSON.stringify({
      ...base,
      maxGuests: randomInt(100, 2000),
      vegOnly: Math.random() > 0.5,
    });
  }

  if (category === "TECHNICAL") {
    return JSON.stringify({
      ...base,
      maxGuests: randomInt(200, 5000),
      supportsHybrid: Math.random() > 0.4,
    });
  }

  if (category === "FLOOR_SPACE") {
    return JSON.stringify({
      ...base,
      floorSpaceSqFt: randomInt(2000, 80000),
    });
  }

  return JSON.stringify(base);
}

/* ================= GENERATION ================= */

let vendorsCSV =
  "id,name,email,passwordHash,isActive,baseLocationCode,rating,reviewCount,starLevel,createdAt,updatedAt\n";

let categoriesCSV =
  "id,vendorId,category,metadata,createdAt,updatedAt\n";

let vendorIndex = 1;

Object.entries(LOCATIONS).forEach(([city, count]) => {
  for (let i = 0; i < count; i++) {
    const vendorId = randomUUID();
    const name = `Vendor_${vendorIndex}_${city}`;
    const email = `vendor${vendorIndex}@eventhub.com`;
    const rating = generateRating();
    const reviewCount = randomInt(5, 1000);
    const starLevel = generateStarLevel(city);
    const now = new Date().toISOString();

    vendorsCSV += `${vendorId},${name},${email},${PASSWORD_HASH},true,${city},${rating},${reviewCount},${starLevel},${now},${now}\n`;

    // Category distribution
    let categoryCount;
    const r = Math.random();
    if (r < 0.4) categoryCount = 1;
    else if (r < 0.8) categoryCount = 2;
    else categoryCount = 3;

    const biasedCategories = categoryBias(city);
    const chosenCategories = pickMultiple(
      biasedCategories.length >= categoryCount
        ? biasedCategories
        : CATEGORIES,
      categoryCount
    );

    chosenCategories.forEach((cat) => {
      const catId = randomUUID();
      const metadata = generateMetadata(cat, city);

      categoriesCSV += `${catId},${vendorId},${cat},"${metadata.replace(
        /"/g,
        '""'
      )}",${now},${now}\n`;
    });

    vendorIndex++;
  }
});

/* ================= WRITE FILES ================= */

fs.writeFileSync("vendors.csv", vendorsCSV);
fs.writeFileSync("vendor_categories.csv", categoriesCSV);

console.log("✅ vendors.csv generated");
console.log("✅ vendor_categories.csv generated");