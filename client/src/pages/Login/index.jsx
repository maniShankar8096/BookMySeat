import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/users";

function Login() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      const res = await loginUser(values);
      if (res.success) {
        message.success(res.message);
        localStorage.setItem("token", res.data);
        navigate("/");
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
        <h1>Login to BookmyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
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
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User ?<Link to="/register">Register Here</Link>
            </p>
            <p>
              Forgot Password ? <Link to="/forget">Click Here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
