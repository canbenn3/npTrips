export interface route_req_body {
  origin: {
    location: location;
  };
  destination: {
    placeId: string;
  };
  travelMode: string;
  routingPreference: string;
  computeAlternativeRoutes: boolean;
  routeModifiers: {
    avoidTolls: boolean;
    avoidHighways: boolean;
    avoidFerries: boolean;
  };
  languageCode: string;
  units: string;
}

export type route = {
  duration: string;
  distanceMeters: number;
  polyline: {
    encodedPolyline: string;
  };
}

export interface route_res_body {
  routes: route[];
}

export interface location {
  latLng: {
    latitude: number;
    longitude: number;
  };
}

export type park = {
  parkname: string;
  placeId: string;
  location: location;
}

export type parkRoute = {
  park: park;
  route: route;
}

export type api_type = {
  get_route: (origin: location, destination: location) => Promise<any>;
}