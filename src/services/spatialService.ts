import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

setOptions({
  key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  v: "weekly"
});

export const getGoogleMaps = async () => {
  return await importLibrary("maps");
};

export const calculateWalkingTime = async (origin: string, destination: string) => {
  try {
    const service = new google.maps.DistanceMatrixService();
    const response = await service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING,
    });

    return response.rows[0].elements[0].duration.text;
  } catch (err) {
    return "2 mins";
  }
};

export const findRecoveryZones = async (location: google.maps.LatLng) => {
  try {
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    return new Promise((resolve) => {
      service.nearbySearch(
        { location, radius: 500, type: "cafe" },
        (results) => resolve(results?.slice(0, 3) || [])
      );
    });
  } catch (err) {
    return [];
  }
};
