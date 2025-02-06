const fs = require("fs");
const path = require("path");

// Load the region IDs from JSON files
const greeceRegions = JSON.parse(fs.readFileSync("region_ids_greece.json", "utf8"));
const uaeRegions = JSON.parse(fs.readFileSync("region_ids_uae.json", "utf8"));

const generateCountryEntities = (countryCode, regions) => {
  const entities = regions
    .map(
      (regionId) => `
@Entity('str_property_details_${countryCode.toLowerCase()}_${regionId}')
export class StrPropertyDetails${countryCode}${regionId} extends StrPropertyDetails {}
  `,
    )
    .join("\n");

  return `
import { Entity } from 'typeorm';
import { StrPropertyDetails } from "./str_property_details.entity";

${entities}
  `;
};

const outputDir = "src/entities";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate entities for Greece
const greeceEntityContent = generateCountryEntities("GRC", greeceRegions);
const greeceFilePath = path.join(outputDir, `str_property_details.greece.regionid.entity.partition.ts`);
fs.writeFileSync(greeceFilePath, greeceEntityContent);
console.log(`Generated entities for Greece: ${greeceFilePath}`);

// Generate entities for UAE
const uaeEntityContent = generateCountryEntities("UAE", uaeRegions);
const uaeFilePath = path.join(outputDir, `str_property_details.uae.regionid.entity.partition.ts`);
fs.writeFileSync(uaeFilePath, uaeEntityContent);
console.log(`Generated entities for UAE: ${uaeFilePath}`);

console.log("Entities generated successfully.");
