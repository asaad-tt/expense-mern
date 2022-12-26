import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";
import { getUser } from "../store/auth";
import Cookies from "js-cookie";

const Main = () => {
  // const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();

      dispatch(getUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading ......</p>;
  }

  return (
    <div>
      <AppBar></AppBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
