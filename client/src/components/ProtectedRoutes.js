import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCurrentUser } from "../api/users";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { setUser } from "../redux/userSlice";
import { Layout, Menu } from "antd";

const ProtectedRoute = ({ children }) => {
  //to fetch user from state if user is already available and check his role
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      label: (
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
      ),
      icon: <HomeOutlined />,
      key: "menu1",
    },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      key: "menu2",
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin");
                } else if (user.role === "partner") {
                  navigate("/partner");
                } else {
                  navigate("/profile");
                }
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
          key: "sub1",
        },
        {
          label: (
            <span
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </span>
          ),
          icon: <LogoutOutlined />,
          key: "sub2",
        },
      ],
    },
  ];

  const { Header } = Layout;
  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const res = await getCurrentUser();
      dispatch(setUser(res?.data));
      dispatch(hideLoading());
    } catch (err) {
      //   localStorage.removeItem("token");
      //   navigate("/login");
      console.log("error in catch", err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
