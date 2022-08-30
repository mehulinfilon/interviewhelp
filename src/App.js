/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Card from "./component/Card/Card";
import logsData from "./utils/logs.json";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const [offsetId, setOffsetId] = useState("");
  const [loader, setLoader] = useState(true);
  const [errormsg, setErrorMsg] = useState();

  const fetchUser = () => {
    setLoader(true);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer key4v56MUqVr9sNJv",
      },
    };

    fetch(`https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?pageSize=6&offset=${offsetId}&view=Grid%20view`, options)
      .then((res) => res.json())
      .then(function (response) {
        setLoader(false);
        if (response.status !== 200 && response.error) {
          throw new Error(response.error.message);
        } else {
          setUserData([...userData, ...response.records]);
          setOffsetId(response.offset);
        }
      })
      .catch((err) => setErrorMsg(err.toString()));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {errormsg && <div className="err-msg">{errormsg}</div>}
      <div className="users">
        {userData.length > 0 &&
          userData.map((el) => {
            return (
              <Card
                key={el.id}
                logs={logsData.filter((v) => v.user_id === el.fields.Id)}
                {...el.fields}
              />
            );
          })}
      </div>
      <button disabled={loader} onClick={() => fetchUser()}>
        {loader ? "Please wait..." : "Load more"}
      </button>
    </>
  );
}

export default App;
