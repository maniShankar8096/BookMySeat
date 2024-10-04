import React from "react";
import { Button, Form, Input, message, Radio } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/users";

function Register() {
  const onFinish = async (values) => {
    try {
      const res = await registerUser(values);
      if (res?.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <main className="App-header">
        <h1>Register to BookMyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              className="d-block"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input type="text" placeholder="Enter your Name"></Input>
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input type="text" placeholder="Enter your email"></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input type="password" placeholder="Enter your password"></Input>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                htmlType="submit"
                style={{ fontSize: "1.5rem", fontweight: "600" }}
              >
                Register
              </Button>
            </Form.Item>
            <Form.Item
              label="Register as a Partner"
              htmlFor="role"
              name="role"
              className="d-block text-center"
              initialValue={false}
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <div className="d-flex justify-content-center">
                <Radio.Group name="radiogroup" className="flex-start">
                  <Radio value={"partner"}>Yes</Radio>
                  <Radio value={"user"}>No</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
          <div>
            <p>
              Already a user? <Link to="/login">Login Now</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Register;
