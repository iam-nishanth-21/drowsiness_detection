import { matchPath, useLocation } from "react-router-dom";

export enum routeNames {
  HOME = "Trips",
  TRIP = "Trip",
  TRIPDATA = "Trip data",

  PROFILE = "Profile",
  ANALYTICS = "Analytics",
}
export const routeNamePath = {
  [routeNames.HOME]: "/",
  [routeNames.TRIP]: "/trips",
  [routeNames.TRIPDATA]: "/trips/:id",

  [routeNames.ANALYTICS]: "/analytics",
  [routeNames.PROFILE]: "/profile",
};
export const routePaths = [
  { path: "/", name: routeNames.HOME },
  { path: "/trips", name: routeNames.TRIP },
  { path: "/trips/:id", name: routeNames.TRIPDATA },

  { path: "/analytics", name: routeNames.ANALYTICS },

  { path: "/profile", name: routeNames.PROFILE },
];
export const getRouteName = () => {
  const { pathname } = useLocation();
  for (const route of routePaths) {
    if (matchPath({ path: route.path }, pathname)) {
      return route.name;
    }
  }
  return pathname;
};
