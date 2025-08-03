import React from "react";
import "../css/Loader.css";
import bookLoader from "../assets/Book-loading.json";
import { Player } from "@lottiefiles/react-lottie-player";

export const PageLoader = () => (
  <div className="page-loader">
    <Player
      autoplay
      loop
      src={bookLoader}
      className="lottie-loader"
      style={{ height: "200px", width: "200px" }}
    />
    <p className="loader-text">
      {"EduTrackr...".split("").map((char, index) => (
        <span
          key={index}
          className="wave-letter"
          style={{ animationDelay: `${index * 0.16}s` }}
        >
          {char}
        </span>
      ))}
    </p>
  </div>
);

export const ButtonLoader = ({ size = 20, color = "white" }) => (
  <div
    className="button-spinner"
    style={{
      width: size,
      height: size,
      borderTopColor: color,
    }}
  />
);


export const SectionLoader = () => (
  <div className="section-loader">
    <div className="spinner small" />
  </div>
);
