import PocketBase from "pocketbase";
import { useState, useEffect } from "react";

import "./style/Ranking.css";

function Ranking() {
  const [data, setData] = useState([]);
  const pb = new PocketBase("http://127.0.0.1:8090");

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const records = await pb.collection("Data").getFullList({
          sort: "-Score",
        });
        if (!isCancelled) {
          console.log(records);
          setData(records);
        }
      } catch (error) {
        if (!isCancelled) {
        }
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="rank_content">
      <h1>Ranking</h1>
      {data.map((data, index) => {
        return (
          <div key={index} className="rank_list">
            <div className="rank_list_contents">
              <p className="rank_list_name">{data.Name}</p>
              <p className="rank_list_score">{data.Score}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Ranking;
