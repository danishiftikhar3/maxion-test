import * as fs from "fs";
import * as turf from "@turf/turf";
import { Feature, Polygon, MultiPolygon } from "geojson";
import getCountryShortName from "../utils/shortCountryName";

// Define the function to find GID_3 from given coordinates and regions
export function findRegionsFromCoordinates(country: string, polygon: Polygon | MultiPolygon): string[] {
  const shortCountryName = getCountryShortName(country);
  // Validate that the polygon has valid coordinates
  if (!polygon || !Array.isArray(polygon.coordinates)) {
    throw new Error("findRegionsFromCoordinates: Error: coordinates are not iterable");
  }

  // Load regions data from file
  let regions = JSON.parse(fs.readFileSync(`./geojsons/${shortCountryName}_adm_3.json`, "utf8"));

  // Create the buffered polygon using turf
  const polygon1 =
    polygon.type === "MultiPolygon" ? turf.multiPolygon(polygon.coordinates) : turf.polygon(polygon.coordinates);

  // Store matched GID_3
  const matchedGIDs: Set<string> = new Set();

  // Loop through regions and find intersections
  regions.features.forEach((feature: Feature<Polygon | MultiPolygon>) => {
    if (feature.geometry) {
      try {
        const polygon2 =
          feature.geometry.type === "MultiPolygon"
            ? turf.multiPolygon(feature.geometry.coordinates)
            : turf.polygon(feature.geometry.coordinates);

        // Check for intersection using turf.booleanIntersects
        if (turf.booleanIntersects(polygon1, polygon2)) {
          const gid3 = feature.properties?.GID_3;
          if (gid3) {
            matchedGIDs.add(gid3);
          }
        }
      } catch (error) {
        console.error("Invalid geometry coordinates:", error);
      }
    }
  });

  // Return the matched GID_3 values as an array
  return Array.from(matchedGIDs);
}
