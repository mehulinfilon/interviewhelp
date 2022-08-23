import "./App.css";
import Card from "./component/Card/Card";
import userData from "./utils/users.json";
import logsData from "./utils/logs.json";

function App() {
  return (
    <div className="users">
      {userData.map((el) => {
        return (
          <Card
            key={el.id}
            logs={logsData.filter((v) => v.user_id === el.id)}
            {...el}
          />
        );
      })}
    </div>
  );
}

export default App;
