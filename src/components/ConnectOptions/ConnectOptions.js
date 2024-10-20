import React from "react";
import "./ConnectOptions.css";
import { useNavigate } from "react-router-dom";
import line from "../../assets/LINE.png";


import { useEffect, useState } from "react";

import axios from "axios";
import { baseURL } from "../../App.js";
import liff from "@line/liff";

function ConnectOptions() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState()
  const navigate = useNavigate();

  // * setting for liff
  async function liftSetting() {
    console.log("pass")
    await liff
    .init({
        liffId: "2006420246-rQkg2M50",
        // withLoginOnExternalBrowser: true,
    })
    .then(() => {
        console.log("LIFF init succeeded: ");
        fetchProfile();
    })
    .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
        console.log("error: ", e)
    });
  }

  // * fetch user profile
  async function fetchProfile() {
    if (liff.isLoggedIn()) {
        try {
            const profile = await liff.getProfile();
            console.log(profile);
            setUserProfile(profile);
            // await requestLoginViaLine(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }
  }

  // TODO: fix if it is redirect then it should check login to database again
  async function requestLoginViaLine(profile) {
    try {
        const response = await axios.post(`${baseURL}/line/login`,
            profile,
            {withCredentials: true}
        )
        console.log(response.data);
        if (response.data.status === "success") {
          if (response.data.order === true && response.data.isRegistered) {
              navigate(`/payment-page?product=${response.data.productId}`);
          } 
        if (!response.data.isRegistered) {
          console.log(response.data)
          navigate("/register-page", {
            state: {
              productId: response.data.productId
            }
          })
        }
        }
    } catch (error){
        console.log("error: ", error)
    }
  }

  async function loginLine() {
    if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: "https://6e67-2405-9800-b651-be20-855d-251c-879e-604a.ngrok-free.app/login-page" });
    } else {
        try {
            const profile = await liff.getProfile();
            console.log(profile);
            setUserProfile(profile);
            requestLoginViaLine(profile);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }
}

  useEffect(() => {
    console.log("pass")
    liftSetting();

  }, [])
  
  return (
    <div className="connect-options">
      <h1>or connect with:</h1>
      <div className="connect-options__box">
        <div className="connect-options__box--item">

          {/* // * LINE */}
          <img src={line} alt="Separator line" onClick={loginLine}/>

        </div>
      </div>
      <p>
        Don't have an account?   <span    onClick={() => { navigate("/register-page"); }} // เปลี่ยนเส้นทางไปยังหน้า register
        style={{ cursor: "pointer", color: "#3FABD9" }} // เพิ่มสไตล์ให้ชัดเจนว่าเป็นลิงก์
      >
          Register
        </span>
      </p>
    </div>
  );
}

export default ConnectOptions;
