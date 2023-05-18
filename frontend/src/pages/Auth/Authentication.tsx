import React, { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Image,
  Form,
  Input,
  Card,
  message,
} from "antd";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import { useAppDispatch } from "../../state/hooks";

import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import axios from "axios";

const { Header, Content } = Layout;

export const Authentication = () => {
  const dispatch = useAppDispatch();
  const [useGoogleImgURL, setUseGoogleImgURL] = useState(true);

  const onFinish = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {};
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div className="-mb-2">
      <Row gutter={[0, 0]} className="w-full">
        <Col xs={24} sm={24} md={12} lg={12} className="h-screen">
          <div className="flex flex-col justify-center items-center   h-full ">
            <Card className=" shadow-xl flex flex-col p-6 ">
              <div className="">
                <Typography.Title className=" mt-4  self-start">
                  Welcome
                </Typography.Title>
              </div>

              <div className=" flex justify-center items-center mt-4 ">
                <Form
                  name="basic"
                  style={{ width: 300 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  layout="vertical"
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  requiredMark={"optional"}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your Email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Enter your password" />
                  </Form.Item>

                  {/* <Typography.Link className="flex justify-end mb-4 -mt-2">
                Forgot password ?
              </Typography.Link> */}

                  {/* <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

                  <Form.Item className="flex items-center justify-center">
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className=" flex items-center justify-center h-2 my-6 ">
                <div className="w-1/6 border border-solid border-slate-200"></div>
                <div className="mx-4 text-sm text-slate-400">or</div>
                <div className="w-1/6 border border-solid border-slate-200"></div>
              </div>
              <div className="flex items-center justify-center  ">
                <div
                  className="w-[70%] transition-all duration-200 ease-in border-2 border-solid border-slate-200 flex items-center justify-center  cursor-pointer hover:bg-[#3A0088] hover:text-[#fff]"
                  onClick={googleLogin}
                  onMouseEnter={() => setUseGoogleImgURL(false)}
                  onMouseLeave={() => setUseGoogleImgURL(true)}
                >
                  {useGoogleImgURL ? (
                    <Image
                      preview={false}
                      src={"/src/assets/icons/google_icon.webp"}
                      width={28}
                      height={28}
                    />
                  ) : (
                    <GoogleOutlined className="text-lg px-[5px]" />
                  )}

                  <div className="p-2 text-base">Continue with Google</div>
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="flex flex-col justify-center h-[98vh]  overflow-hidden  ">
            <Image
              src={
                "https://indiater.com/wp-content/uploads/2017/11/social-media-food-creative-template-1-990x990.jpg"
              }
              preview={false}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
