import startAPI from "../api/api";
import { location, park } from "../types/types";

const testLocation: location = {
  latLng: {
    latitude: 44.3386,
    longitude: -68.2733,
  },
};

const api = startAPI();

export const test = async (park: park) => {
    const route = await api.get_route(testLocation, park.placeId);
    console.log("route to park: ", route)
    console.log("routes.route[0]:", route.routes[0])
    return route;
};
