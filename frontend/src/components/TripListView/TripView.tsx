import { Avatar, List } from "antd";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../../env";
import { ITrip } from "../../interfaces/trip.interface";
import { TripTable } from "./TripTable/TripTable";
const supabase = createClient(supabaseUrl, supabaseKey);

export const TripListView = () => {
  // const trips = useAppSelector((state) => state.trip.trips);

  const [trips, setTrips] = useState<ITrip[]>([]);

  useEffect(() => {
    setTripsData();
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trips",
        },
        (payload: any) => {
          console.log(payload);
          setTrips([payload.new, ...trips]);

          // Update your state or perform any other necessary actions with the payload data
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const setTripsData = async () => {
    const tripsData: any = await supabase.from("trips").select(`*`);
    console.log(tripsData.data);
    setTrips(tripsData.data.reverse());
  };
  return (
    <div className="pl-5 py-3 pr-[2px]  ">
      <TripTable data={trips} />
    </div>
  );
};
