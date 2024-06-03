import { useState } from "react";
import React from "react";

import PocketBase from "pocketbase";

function Score() {
  const [userAName, setUserAName] = useState();
  const [userBName, setUserBName] = useState();

  const [userAScore1, setUserAScore1] = useState(0);
  const [userAScore2, setUserAScore2] = useState(0);
  const [userAScore3, setUserAScore3] = useState(0);
  const [userAScoreTotal, setUserAScoreTotal] = useState(
    userAScore1 + userAScore2 + userAScore3
  );

  const [userBScore1, setUserBScore1] = useState(0);
  const [userBScore2, setUserBScore2] = useState(0);
  const [userBScore3, setUserBScore3] = useState(0);
  const [userBScoreTotal, setUserBScoreTotal] = useState(
    userBScore1 + userBScore2 + userBScore3
  );

  const [confirm, setConfirm] = useState();

  const [currentRound, setCurrentRound] = useState(1);

  const [gameProcess, setGameProcess] = useState();

  const pb = new PocketBase("http://127.0.0.1:8090");
  pb.autoCancellation(false);

  const postA = async () => {
    const data = {
      Name: userAName,
      Score: userAScoreTotal,
    };

    const record = await pb.collection("Data").create(data);
  };

  const postB = async () => {
    const data = {
      Name: userBName,
      Score: userBScoreTotal,
    };

    const record = await pb.collection("Data").create(data);
  };

  const gameEnd = async () => {
    postA();
    postB();
    setUserAName(null);
    setUserBName(null);
    setUserAScore1(0);
    setUserAScore2(0);
    setUserAScore3(0);
    setUserBScore1(0);
    setUserBScore2(0);
    setUserBScore3(0);
    setUserAScoreTotal(0);
    setUserBScoreTotal(0);
    setCurrentRound(1);
    setConfirm(null);
  };

  if (!userAName || !userBName || confirm !== "confirmed") {
    return (
      <>
        <h1>Enter Players' Name</h1>

        <label className="score_user_name">
          Plyer A:
          <input
            type="text"
            value={userAName}
            onChange={(e) => setUserAName(e.target.value)}
          />
        </label>

        <label className="score_user_name">
          Plyer B:
          <input
            type="text"
            value={userBName}
            onChange={(e) => setUserBName(e.target.value)}
          />
        </label>
        <button onClick={() => setConfirm("confirmed")}>Start</button>
      </>
    );
  }

  if (gameProcess !== "Finish")
    return (
      <>
        <div className="score_user_seperate">
          <h2>{userAName}'s Score</h2>
          <h3>{userAScoreTotal}</h3>
          <div className="score_input">
            <div className="score_each_round">
              {currentRound === 1 && (
                <label className="score_user_name">
                  Round 1:
                  <input
                    type="number"
                    value={userAScore1}
                    onChange={(e) => setUserAScore1(e.target.value)}
                  />
                </label>
              )}
              {currentRound === 2 && (
                <label className="score_user_name">
                  Round 2:
                  <input
                    type="number"
                    value={userAScore2}
                    onChange={(e) => setUserAScore2(e.target.value)}
                  />
                </label>
              )}
              {currentRound === 3 && (
                <label className="score_user_name">
                  Round 3:
                  <input
                    type="number"
                    value={userAScore3}
                    onChange={(e) => setUserAScore3(e.target.value)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="score_user_seperate">
          <h2>{userBName}'s Score</h2>
          <h3>{userBScoreTotal}</h3>
          <div className="score_input">
            <div className="score_each_round">
              {currentRound === 1 && (
                <label className="score_user_name">
                  Round 1:
                  <input
                    type="number"
                    value={userBScore1}
                    onChange={(e) => setUserBScore1(e.target.value)}
                  />
                </label>
              )}
              {currentRound === 2 && (
                <label className="score_user_name">
                  Round 2:
                  <input
                    type="number"
                    value={userBScore2}
                    onChange={(e) => setUserBScore2(e.target.value)}
                  />
                </label>
              )}
              {currentRound === 3 && (
                <label className="score_user_name">
                  Round 3:
                  <input
                    type="number"
                    value={userBScore3}
                    onChange={(e) => setUserBScore3(e.target.value)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {currentRound < 3 && (
          <button
            onClick={() => {
              if (currentRound === 1) {
                setUserAScoreTotal(userAScoreTotal + Number(userAScore1));
                setUserBScoreTotal(userBScoreTotal + Number(userBScore1));
              } else if (currentRound === 2) {
                setUserAScoreTotal(userAScoreTotal + Number(userAScore2));
                setUserBScoreTotal(userBScoreTotal + Number(userBScore2));
              }

              setCurrentRound(currentRound + 1);
            }}
          >
            Finish Round {currentRound}
          </button>
        )}

        {currentRound === 3 && (
          <button
            onClick={() => {
              setUserAScoreTotal(userAScoreTotal + Number(userAScore3));
              setUserBScoreTotal(userBScoreTotal + Number(userBScore3));

              setGameProcess("Finish");
            }}
          >
            Finish Game
          </button>
        )}
      </>
    );

  return (
    <>
      <h1>Game Result:</h1>
      <h2>
        {userAName}'s Score: {userAScoreTotal}
      </h2>
      <h2>
        {userBName}'s Score: {userBScoreTotal}
      </h2>
      {userAScoreTotal > userBScoreTotal && <p>{userAName} Wins!</p>}
      {userAScoreTotal < userBScoreTotal && <p>{userBName} Wins!</p>}
      {userAScoreTotal === userBScoreTotal && <p>Tie Game!</p>}

      <button onClick={gameEnd}>Home</button>
    </>
  );
}

export default Score;
