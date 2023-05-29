import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Authentication } from "./pages/Auth/Authentication";
import { Home } from "./pages/Home/Home";
import { useAppSelector } from "./state/hooks";
import { routeNamePath, routeNames } from "./data/routeUtils";

import { Profile } from "./pages/Profile/Profile";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { TripListView } from "./components/TripListView/TripView";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { TripDetailView } from "./components/TripDetailView/TripDetailView";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  // const isUserLoggediIn = isLoggedIn ? <Home /> : <Authentication />;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [isLoggedIn]);

  return (
    <Routes>
      <Route path={routeNamePath[routeNames.HOME]} element={<Home />}>
        {/* <Route
        path={routeNamePath[routeNames.TRIP]}
        element={<Authentication />}
      /> */}
        <Route path={routeNamePath[routeNames.HOME]} element={<Dashboard />} />

        <Route
          path={routeNamePath[routeNames.TRIP]}
          element={<TripListView />}
        />
        <Route
          path={routeNamePath[routeNames.TRIPDATA]}
          element={<TripDetailView />}
        />

        <Route
          path={routeNamePath[routeNames.ANALYTICS]}
          element={<Analytics />}
        />

        <Route path={routeNamePath[routeNames.PROFILE]} element={<Profile />} />

        <Route path={"*"} element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
