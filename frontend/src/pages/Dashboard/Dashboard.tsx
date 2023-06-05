import {
  Avatar,
  Button,
  Card,
  Empty,
  List,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "../../env";
import { ITrip, ITripDetails } from "../../interfaces/trip.interface";
const supabase = createClient(supabaseUrl, supabaseKey);

export const Dashboard = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [totalTrips, setTotal] = useState<any>({});
  const [tripLoader, setTripLoader] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<any>([]);

  useEffect(() => {
    setTripsData();
    getBlockedusers();
    setTotalTripsData();
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

  const setTotalTripsData = async () => {
    try {
      setTripLoader(true);
      const tripsData: any = await supabase.from("trip_data").select(`*`);
      // .limit(5);

      console.log("trip data", tripsData);
      if (tripsData && tripsData.data) {
        let trpData = tripsData.data.reverse().map((trip: any) => ({
          ...trip,
          data: JSON.parse(trip.data),
        }));
        console.log("total", trpData);

        let map: any = {};
        trpData.map((d: ITripDetails) => {
          if (!map[d.name || "NA"]) {
            map[d.name || "NA"] = { count: 1, threshold: 0 };
          }
          if (map.hasOwnProperty(d.name || "NA")) {
            map[d.name || "NA"].count += 1;
            if (d.data.threshold > 10)
              map[d.name || "NA"].threshold += d.data.threshold;
          } else {
            map[d.name || "NA"].count = 1;
          }
        });
        setTotal(map);
      }
      setTripLoader(false);
    } catch (error) {
      console.log(error);
      setTripLoader(false);
    }
  };

  const setTripsData = async () => {
    const tripsData: any = await supabase.from("trips").select(`*`);
    // .limit(5);
    console.log(tripsData.data);
    setTrips(tripsData.data.reverse());
  };

  const getBlockedusers = async () => {
    try {
      let data = await supabase.from("Blocked_users").select("*");
      console.log("Blokced ", data.data);
      setBlockedUsers(data.data?.map((d) => d.name));
    } catch (error) {
      console.log(error);
    }
  };
  const blockuser = async (name: any) => {
    try {
      const { data, error } = await supabase
        .from("Blocked_users")
        .insert([{ name }]);

      console.log(data);
    } catch (error) {
      message.error("Error blocking user");
    }
  };

  const UnBlockuser = async (name: any) => {
    try {
      const { data, error } = await supabase
        .from("Blocked_users")
        .delete()
        .eq("name", name);

      console.log(data);
    } catch (error) {
      message.error("Error blocking user");
    }
  };
  return (
    <div className="p-6">
      <Spin spinning={tripLoader}>
        <Typography.Title level={3}>Users registered</Typography.Title>
        {trips.length ? (
          <>
            {trips.map((t) => (
              <Card className="">
                <div className="flex justify-between">
                  <div>
                    <Typography.Text className="font-bold px-5">
                      Username:
                    </Typography.Text>
                    <Typography.Text>{t.name}</Typography.Text>
                    <div>
                      <Typography.Text className="font-bold px-5">
                        Total trips completed:
                      </Typography.Text>
                      <Typography.Text>
                        {totalTrips[t.name || "NA"]
                          ? totalTrips[t.name || "NA"]?.count
                          : "NA"}
                      </Typography.Text>
                    </div>

                    <div>
                      <Typography.Text className="font-bold px-5">
                        Total sleep threshold:
                      </Typography.Text>
                      <Typography.Text>
                        {totalTrips[t.name || "NA"] ? (
                          <>
                            {totalTrips[t.name || "NA"]?.threshold}

                            {totalTrips[t.name || "NA"]?.threshold > 40 ? (
                              <>
                                <Tag color="red" className="ml-3">
                                  Should take test{" "}
                                </Tag>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </Typography.Text>
                    </div>
                  </div>
                  <div>
                    {blockedUsers.includes(t.name) ? (
                      <Button
                        type="primary"
                        onClick={() => {
                          UnBlockuser(t.name);
                        }}
                        color="red"
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        onClick={() => {
                          blockuser(t.name);
                        }}
                        style={{
                          background: "red",
                          borderColor: "red",
                          color: "#fff",
                        }}
                      >
                        Block user
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Empty description="loading ..." />
          </>
        )}
      </Spin>
    </div>
  );
};
