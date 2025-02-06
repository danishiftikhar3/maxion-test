const mapWidth = 640;
const mapHeight = 768;

function getZoomLevel(bbox) {
  const WORLD_DIM = { width: 256, height: 256 }; // Base tile size (256px by 256px)
  const ZOOM_MAX = 21; // Maximum zoom level

  const latFraction = (latRad(bbox[3]) - latRad(bbox[1])) / Math.PI;
  const lngDiff = bbox[2] - bbox[0];
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  const latZoom = zoom(mapHeight, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapWidth, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

function latRad(lat) {
  const sin = Math.sin((lat * Math.PI) / 180);
  const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
}

function zoom(mapPx, worldPx, fraction) {
  return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
}

export default getZoomLevel;
