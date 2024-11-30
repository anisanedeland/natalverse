import React, { useState, useEffect } from "react";
import VerseDisplay from "../components/VerseDisplay";
import verses from "../data/verses.json";
import ReskinnedButton from "../components/ReskinnedButton";
import WelcomeBanner from "../components/WelcomeBanner";

export default function Home() {
  const [currentVerse, setCurrentVerse] = useState(null);
  const [userName, setUserName] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const savedName = sessionStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
      setIsFirstVisit(false);
    }

    const lastClickTime = sessionStorage.getItem("lastClickTime");
    if (lastClickTime) {
      const elapsedTime = Date.now() - parseInt(lastClickTime, 10);
      if (elapsedTime < 5 * 60 * 1000) {
        setIsButtonDisabled(true);
        setTimeout(
          () => setIsButtonDisabled(false),
          5 * 60 * 1000 - elapsedTime
        );
      }
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      sessionStorage.setItem("userName", userName);
      setIsFirstVisit(false);
    }
  };

  const getRandomVerse = () => {
    if (loading || isButtonDisabled) return;

    setLoading(true);
    setIsButtonDisabled(true);

    // Save the current time to sessionStorage
    const currentTime = Date.now();
    sessionStorage.setItem("lastClickTime", currentTime);

    // Simulate loading for 5 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * verses.length);
      setCurrentVerse(verses[randomIndex]);
      setLoading(false);
    }, 5000);

    // Re-enable the button after 5 minutes
    setTimeout(() => setIsButtonDisabled(false), 3 * 1000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        minHeight: "100vh",
        margin: 0,
        backgroundColor: "#0d0d0d",
        backgroundImage: "url('/img/CURTAINS.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          backgroundImage: "url('/img/aog_white.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "100%",
          marginBottom: "20px",
          marginTop: "80px",
        }}
      ></div>

      <div
        style={{
          backgroundImage: "url('/img/TITLE.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      ></div>

      {isFirstVisit ? (
        <form onSubmit={handleNameSubmit} style={{ margin: "20px 0" }}>
          <label htmlFor="name" style={{ fontSize: "18px", color: "#ffd041" }}>
            Namac
          </label>
          <br />
          <input
            id="name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100px",
            }}
          >
            <ReskinnedButton
              text="Enter"
              onClick={handleNameSubmit}
              style={{
                backgroundColor: "#ff4500",
                color: "#ffd041",
                marginTop: "20px",
              }}
            />
          </div>
        </form>
      ) : (
        <>
          <WelcomeBanner userName={userName} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <ReskinnedButton
              text={loading ? "Ditunggu Ya!!!" : "Click Me!"}
              onClick={getRandomVerse}
              style={{
                backgroundColor: isButtonDisabled ? "#ccc" : "#ff4500",
                color: "#ffd041",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              disabled={isButtonDisabled}
            />
          </div>
          {currentVerse && <VerseDisplay verse={currentVerse} />}
        </>
      )}
    </div>
  );
}
