import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITrip, ITripDetails } from "../../interfaces/trip.interface";
import { Button, Card, Image, List, Tag } from "antd";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../../env";
import { convertToDayJS } from "../../utils/dateUtils";
import { TripPlotGraph } from "../Graphs/TripPlotGraph";
const emptyData: ITripDetails = {
  id: 0,
  inserted_at: "",
  name: null,
  updated_at: "",
  data: {
    currentTime: "",
    image: "",
    threshold: 0,
  },
};
const supabase = createClient(supabaseUrl, supabaseKey);

export const TripDetailView = () => {
  const { id, view } = useParams<string>();
  const [tripDetails, settripDetails] = useState<ITripDetails[]>([]);
  const [tripLoader, setTripLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) setTripsData();
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trip_data",
        },
        (payload: any) => {
          console.log(payload);
          settripDetails([payload.new, ...tripDetails]);
          // Update your state or perform any other necessary actions with the payload data
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const setTripsData = async () => {
    try {
      setTripLoader(true);
      const tripsData: any = await supabase
        .from("trip_data")
        .select(`*`)
        .eq("trip_id", id);
      console.log("trip data", tripsData);
      if (tripsData && tripsData.data) {
        let trpData = tripsData.data.reverse().map((trip: any) => ({
          ...trip,
          data: JSON.parse(trip.data),
        }));
        settripDetails(trpData || []);
      }
      setTripLoader(false);
    } catch (error) {
      console.log(error);
      setTripLoader(false);
    }
  };

  const getTag = (val: number) => {
    if (val > 10) {
      return <Tag color="volcano">SLEEPY</Tag>;
    } else if (val > 20) {
      return <Tag color="#ff0000">SLEPT</Tag>;
    } else if (val > 40) {
      return <Tag color="#c80000">CRITICAL</Tag>;
    } else if (val > 60) {
      return <Tag color="#b10000">PRONE TO ACCIDENt</Tag>;
    } else return <Tag color="success">Good</Tag>;
  };
  return (
    <div className="pl-7 pt-4 pr-[2px]">
      {tripDetails.length ? (
        <div className="text-slate-400">
          {" "}
          Showing results for Trip number {id}
        </div>
      ) : (
        <>
          {" "}
          <div className="text-slate-400"></div>
        </>
      )}

      <div className="p-4 h-[400px] flex items-center flex-col">
        <h1 className="flex">Individual sleepyness tracking</h1>
        <TripPlotGraph data={tripDetails} />
      </div>
      <List
        loading={tripLoader}
        itemLayout="horizontal"
        dataSource={tripDetails}
        className={` overflow-y-scroll ${
          tripDetails.length ? "h-[83vh]" : ""
        } `}
        renderItem={(item, index) => (
          <List.Item key={item.id}>
            <Card className="w-full mr-6">
              <div className="flex justify-between ">
                <div className="flex flex-col justify-between">
                  <div>
                    <span>
                      {item.name
                        ? item.name[0].toUpperCase() +
                          item.name.slice(1, item.name.length)
                        : "" || "Sample"}
                    </span>
                    <div className="mt-[2px]">
                      {getTag(parseInt(item.data.threshold as any))}
                    </div>
                  </div>
                  <div className="text-[#c2c2c2]">
                    {convertToDayJS(item.updated_at)?.fromNow()}
                  </div>
                </div>

                <div className="">
                  <Image src={item.data.image} width={80} height={80} />
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {!tripDetails.length && !tripLoader ? (
        <div className="flex flex-col items-center">
          <div className="text-slate-400 flex justify-center ">
            <div>No results found for Trip number {id}</div>
          </div>
          <div className="mt-3">
            <Button type="primary" onClick={() => navigate("/trips")}>
              Go back
            </Button>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
};
