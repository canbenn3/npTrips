import { location, route_req_body } from "../types/types";

const API_KEY = import.meta.env.VITE_API_KEY

const startAPI = () => {

  const get_route = async (origin: location, destination: string) => {
    const req: route_req_body = {
      origin: {
        location: origin,
      },
      destination: {
        placeId: destination,
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: true,
        avoidHighways: false,
        avoidFerries: true,
      },
      languageCode: "en-US",
      units: "IMPERIAL",
    };
    const res = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify(req),
      }
    );

    if (!res.ok) {
      console.log("Error: ", res.statusText);
    }

    return res.json();
  };

  return {
    get_route: get_route,
  };
};

export default startAPI;
