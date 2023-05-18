import React from "react";
import { useAppSelector } from "../../state/hooks";
import { Button, Card, Descriptions, Divider } from "antd";

export const Profile = () => {
  const user = { name: "", email: "" };
  return (
    <div>
      {/* <Header /> */}

      <div className="px-4 mt-6">
        <Card className="p-4 ">
          <Descriptions title="User Info">
            <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            {/* <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item> */}
          </Descriptions>
          <Divider />
          {/* <div className="flex justify-center mb-2">
            <Button className="" type="primary" onClick={() => handleLogOut()}>
              Logout
            </Button>
          </div> */}
        </Card>
      </div>
    </div>
  );
};
