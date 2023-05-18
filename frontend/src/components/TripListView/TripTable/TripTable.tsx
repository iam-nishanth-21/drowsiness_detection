import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { convertToDayJS, displayDateFormat } from "../../../utils/dateUtils";
import { ITrip } from "../../../interfaces/trip.interface";
import useWindowSize from "../../../hooks/useWindowSize";
import { Link } from "react-router-dom";

const columns: ColumnsType<ITrip> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => (
      <div className="flex items-center">
        <span>
          {name ? name[0].toUpperCase() + name.slice(1, name.length) : "" || ""}
        </span>
      </div>
    ),
  },

  {
    title: "Trip start time",
    dataIndex: "created_at",
    key: "created_at",
    render: (createdAt) => <div>{displayDateFormat(createdAt)}</div>,
  },
  {
    title: "Started at",
    key: "tags",
    dataIndex: "created_at",
    render: (createdAt) => <div>{convertToDayJS(createdAt)?.fromNow()}</div>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={"/trips/" + _.id.toString()}>
          <div>View Details</div>
        </Link>
        {/* <div>Delete</div> */}
      </Space>
    ),
  },
];

export const TripTable = ({ data }: { data: ITrip[] }) => {
  const [width, height] = useWindowSize();

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={data.length === 0}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};
