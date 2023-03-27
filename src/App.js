import { useEffect, useState } from "react";
import { BarChart } from "./components/BarChart";
import { PieChart } from "./components/PIeChart";
import { loadInitialData } from "./utils";
import './components/style.css';
import { UsersList } from "./components/UsersList";
import { CarsList } from "./components/CarsList";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadInitialData().then((items) => {
      setData(items);
    setIsLoading(false);
  })
  }, []);

  return (
    <div className={`${isLoading ? 'overlay' : ''}`}>
      <header className="App-header">
        <h1 className="vehicleHeader">Vehicle Info</h1>
      </header>
      {
      isLoading ? <div className="loading">Loading...</div>
      :
      <>
        <BarChart data={data} />
        <div className="userList">
          <UsersList data={data} />
          <PieChart data={data} />
        </div>
        <CarsList data={data} />
        </>
     }
    </div>
  );
}

export default App;
