import "./App.css";
import { park, parkRoute, route } from "./types/types";
import { Button } from "./components/Button";
import startAPI from "./api/api";
import { useMemo, useState } from "react";
import { parks } from "./assets/parks";
import {
  getCurrentLocation,
  getHourMinutes,
  metersToMiles,
  sortedParks,
} from "./util/util";
import { test } from "./testing/testAPI";

const TEST_INDEX = 25;
const emptyRoute: route = {
  duration: "",
  distanceMeters: 0,
  polyline: {
    encodedPolyline: "",
  },
};

function App() {
  const api = startAPI();
  const [parkRoutes, setParkRoutes] = useState<parkRoute[]>([]);
  const [numParks, setNumParks] = useState<number>(5);
  const [sortedParkList, setSortedParkList] = useState<park[]>([]);
  useMemo(() => {
    async function fetchSortedParks() {
      const sortedList = await sortedParks(parks);
      setSortedParkList(sortedList);
    }
    fetchSortedParks();
  }, []);

  async function handleClick() {
    setParkRoutes([]);
    const origin = await getCurrentLocation();
    for (const park of sortedParkList.slice(0, numParks)) {
      const destination = park.placeId;
      console.log("fetching route to ", park.parkname);
      const route = await api.get_route(origin, destination);
      console.log("route to park: ", route);
      setParkRoutes((oldList) => {
        const newList: parkRoute[] = [
          ...oldList,
          { park: park, route: route ? route.routes[0] : emptyRoute },
        ];
        return newList;
      });
    }
  }

  function testAPI() {
    console.log("testing api for park: ", sortedParkList[TEST_INDEX].parkname);
    test(sortedParkList[TEST_INDEX]);
  }

  return (
    <>
      <div className="form">
        <label>
          Give me the nearest
          <input
            type="number"
            className="number-input"
            name="numParks"
            value={numParks}
            max={sortedParkList.length}
            onChange={(e) => setNumParks(parseInt(e.target.value))}
          />
          parks!!!
        </label>
        <Button handleClick={handleClick} value={"Get some parks!"} />
        <Button handleClick={testAPI} value={`Test api`} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Park</th>
            <th>Distance(mi)</th>
            <th>Duration (hr:min)</th>
          </tr>
        </thead>
        <tbody>
          {parkRoutes.map((parkRoute, index) => (
            <tr
              key={parkRoute.park.parkname}
              className={index % 2 === 0 ? "darkrow" : "lightrow"}
            >
              <td>{parkRoute.park.parkname}</td>
              <td>
                {parkRoute.route.distanceMeters
                  ? metersToMiles(parkRoute.route.distanceMeters)
                  : "No route"}
              </td>
              <td>
                {parkRoute.route.duration
                  ? getHourMinutes(
                      parseInt(parkRoute.route.duration.slice(0, -1))
                    )
                  : "No route"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Powered by Google</p>
    </>
  );
}
export default App;
