function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export default function DistanceCalulator(
  userLat: number,
  userLon: number,
  printerLat: number,
  printerLon: number
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(printerLat - userLat); // deg2rad below
  const dLon = deg2rad(printerLon - userLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLat)) *
      Math.cos(deg2rad(printerLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c; // Distance in km

  if (distance < 1) {
    return Math.round(distance * 1000) + "m";
  } else {
    return Math.round(distance * 100) / 100 + "km";
  }
}
