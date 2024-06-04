import { useState } from "react";
import React from "react";

import PocketBase from "pocketbase";

import "./style/Score.css";

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

  const onClickConfirm = () => {
    if (!userAName || !userBName) {
      alert("Input players' name!");
      setUserAName();
      setUserBName();
    } else {
      setConfirm("confirmed");
    }
  };

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
    await postA();
    await postB();
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
    window.location.href = "/";
  };

  if (!userAName || !userBName || confirm !== "confirmed") {
    return (
      <>
        <h1 className="score_initial_title">Enter Players' Name</h1>

        <label className="score_user_name">
          Player A:
          <input
            className="score_initial_playername_input"
            type="text"
            value={userAName}
            onChange={(e) => setUserAName(e.target.value)}
          />
        </label>

        <label className="score_user_name">
          Player B:
          <input
            className="score_initial_playername_input"
            type="text"
            value={userBName}
            onChange={(e) => setUserBName(e.target.value)}
          />
        </label>
        <button className="score_button_start" onClick={onClickConfirm}>
          Start
        </button>
      </>
    );
  }

  if (gameProcess !== "Finish")
    return (
      <>
        <h1 className="score_round_display">Round {currentRound}</h1>
        <div className="score_inprogress_score_display">
          <div className="score_user_seperate">
            <p className="score_user_totalscore">{userAName}'s Score</p>
            <p className="score_user_totalscore">{userAScoreTotal}</p>
            <div className="score_input">
              <div className="score_each_round">
                {currentRound === 1 && (
                  <div className="score_user_name">
                    <p>Round score: {userAScore1}</p>
                    <button onClick={() => setUserAScore1(userAScore1 + 0)}>
                      0 pt
                    </button>
                    <button onClick={() => setUserAScore1(userAScore1 + 5)}>
                      5 pt
                    </button>
                    <button onClick={() => setUserAScore1(userAScore1 + 10)}>
                      10 pt
                    </button>
                    <button onClick={() => setUserAScore1(userAScore1 + 15)}>
                      15 pt
                    </button>
                    <button onClick={() => setUserAScore1(userAScore1 + 20)}>
                      20 pt
                    </button>
                    <button onClick={() => setUserAScore1(0)}>reset</button>
                  </div>
                )}
                {currentRound === 2 && (
                  <div className="score_user_name">
                    <p>Round score: {userAScore2}</p>
                    <button onClick={() => setUserAScore2(userAScore2 + 0)}>
                      0 pt
                    </button>
                    <button onClick={() => setUserAScore2(userAScore2 + 5)}>
                      5 pt
                    </button>
                    <button onClick={() => setUserAScore2(userAScore2 + 10)}>
                      10 pt
                    </button>
                    <button onClick={() => setUserAScore2(userAScore2 + 15)}>
                      15 pt
                    </button>
                    <button onClick={() => setUserAScore2(userAScore2 + 20)}>
                      20 pt
                    </button>
                    <button onClick={() => setUserAScore2(0)}>reset</button>
                  </div>
                )}
                {currentRound === 3 && (
                  <div className="score_user_name">
                    <p>Round score: {userAScore3}</p>
                    <button onClick={() => setUserAScore3(userAScore3 + 0)}>
                      0 pt
                    </button>
                    <button onClick={() => setUserAScore3(userAScore3 + 5)}>
                      5 pt
                    </button>
                    <button onClick={() => setUserAScore3(userAScore3 + 10)}>
                      10 pt
                    </button>
                    <button onClick={() => setUserAScore3(userAScore3 + 15)}>
                      15 pt
                    </button>
                    <button onClick={() => setUserAScore3(userAScore3 + 20)}>
                      20 pt
                    </button>
                    <button onClick={() => setUserAScore3(0)}>reset</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="score_user_seperate">
            <p className="score_user_totalscore">{userBName}'s Score</p>
            <p className="score_user_totalscore">{userBScoreTotal}</p>
            <div className="score_input">
              <div className="score_each_round">
                {currentRound === 1 && (
                  <div className="score_user_name">
                    <p>Round score: {userBScore1}</p>
                    <button onClick={() => setUserBScore1(userBScore1 + 0)}>
                      0 pt
                    </button>
                    <button onClick={() => setUserBScore1(userBScore1 + 5)}>
                      5 pt
                    </button>
                    <button onClick={() => setUserBScore1(userBScore1 + 10)}>
                      10 pt
                    </button>
                    <button onClick={() => setUserBScore1(userBScore1 + 15)}>
                      15 pt
                    </button>
                    <button onClick={() => setUserBScore1(userBScore1 + 20)}>
                      20 pt
                    </button>
                    <button onClick={() => setUserBScore1(0)}>reset</button>
                  </div>
                )}
                {currentRound === 2 && (
                  <div className="score_user_name">
                    <p>Round score: {userBScore2}</p>
                    <button onClick={() => setUserBScore2(userBScore2 + 0)}>
                      0 pt
                    </button>
                    <button onClick={() => setUserBScore2(userBScore2 + 5)}>
                      5 pt
                    </button>
                    <button onClick={() => setUserBScore2(userBScore2 + 10)}>
                      10 pt
                    </button>
                    <button onClick={() => setUserBScore2(userBScore2 + 15)}>
                      15 pt
                    </button>
                    <button onClick={() => setUserBScore2(userBScore2 + 20)}>
                      20 pt
                    </button>
                    <button onClick={() => setUserBScore2(0)}>reset</button>
                  </div>
                )}
                {currentRound === 3 && (
                  <div className="score_user_name">
                    <p>Round score: {userBScore3}</p>
                    <button onClick={() => setUserBScore3(userBScore3 + 0)}>
                      0 pt
                    </button>
                    <button onClick={() => setUserBScore3(userBScore3 + 5)}>
                      5 pt
                    </button>
                    <button onClick={() => setUserBScore3(userBScore3 + 10)}>
                      10 pt
                    </button>
                    <button onClick={() => setUserBScore3(userBScore3 + 15)}>
                      15 pt
                    </button>
                    <button onClick={() => setUserBScore3(userBScore3 + 20)}>
                      20 pt
                    </button>
                    <button onClick={() => setUserBScore3(0)}>reset</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {currentRound < 3 && (
          <button
            className="score_button_finish"
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
            className="score_button_finish"
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
      {userAScoreTotal > userBScoreTotal && (
        <p className="score_result_text">{userAName} Wins!</p>
      )}
      {userAScoreTotal < userBScoreTotal && (
        <p className="score_result_text">{userBName} Wins!</p>
      )}
      {userAScoreTotal === userBScoreTotal && (
        <p className="score_result_text">Tie Game!</p>
      )}

      <button className="score_button_finish" onClick={gameEnd}>
        Home
      </button>
    </>
  );
}

export default Score;
