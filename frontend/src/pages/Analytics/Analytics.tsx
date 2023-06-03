import React, { useEffect, useState } from "react";
import { ITrip, ITripDetails } from "../../interfaces/trip.interface";
import { supabaseKey, supabaseUrl } from "../../env";
import { createClient } from "@supabase/supabase-js";
import TripGraph from "../../components/Graphs/TripGraph";

import { Chart, registerables } from "chart.js";
import BarChartComponent from "../../components/Graphs/TripDetailGraph";
import { TripPlotGraph } from "../../components/Graphs/TripPlotGraph";
Chart.register(...registerables);
const supabase = createClient(supabaseUrl, supabaseKey);

const Analytics = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [tripLoader, setTripLoader] = useState(false);
  const [tripDetails, settripDetails] = useState<ITripDetails[]>([]);

  useEffect(() => {
    setTripsData();
    getAllTripsData();
  }, []);

  const setTripsData = async () => {
    const tripsData: any = await supabase.from("trips").select(`*`);
    console.log(tripsData.data);
    setTrips(tripsData.data.reverse());
  };

  const getAllTripsData = async () => {
    try {
      setTripLoader(true);
      const tripsData: any = await supabase.from("trip_data").select(`*`);

      if (tripsData && tripsData.data) {
        let trpData = tripsData.data.reverse().map((trip: any) => ({
          ...trip,
          data: JSON.parse(trip.data),
        }));
        settripDetails(trpData || []);
        console.log("trip data", trpData);
      }
      setTripLoader(false);
    } catch (error) {
      console.log(error);
      setTripLoader(false);
    }
  };

  return (
    <div>
      <div className="p-4 ">
        <h1>No of trips each day</h1>
        <TripGraph trips={trips} />
      </div>

      <div className="p-4 ">
        <h1>Driver wide sleepyness tracking</h1>
        <BarChartComponent data={tripDetails} />
      </div>
    </div>
  );
};

export default Analytics;
