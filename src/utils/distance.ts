/**
 * Haversine formula to compute distance between two coordinates in kilometers.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Returns a practical travel time estimate string for college freshers.
 */
export function getTravelEstimate(distanceKm: number): { text: string; icon: string; mode: string } {
  if (distanceKm <= 1.2) {
    const mins = Math.max(3, Math.round(distanceKm * 12));
    return { text: `~${mins} min walk`, icon: '🚶', mode: 'Walkable' };
  } else if (distanceKm <= 4.0) {
    const mins = Math.max(5, Math.round(distanceKm * 3.5));
    return { text: `~${mins} min bike / auto`, icon: '🛵', mode: 'Quick Auto' };
  } else if (distanceKm <= 12.0) {
    const mins = Math.round(distanceKm * 2.5);
    return { text: `~${mins} min ride`, icon: '🚗', mode: 'Shared Auto / Cab' };
  } else {
    const mins = Math.round(distanceKm * 2.2);
    return { text: `~${mins} min transit`, icon: '🚌', mode: 'RTC Bus / Cab' };
  }
}
