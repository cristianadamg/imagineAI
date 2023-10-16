// import { response } from "express";
import "./App.css";
import API_KEY from "./apiKey";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const surpriseOptions = [
    "Realistic painting of a dystopian industrial city with towering factories, pollution-filled air, and a gloomy sky",
    "Victorian-era painting of a masquerade ball with elaborate costumes, contrasting colors, and soft lighting",
    "Cityscape painting during a rainy day, focusing on reflections in puddles with a mix of soft and harsh brush strokes",
    "Spacecraft landing on an alien planet, digital art style, otherworldly mood",
    "Majestic mountain range in the distance, oil painting style, serene mood",
    "Cute cartoon animal playing a musical instrument, pop art style, fun mood",
    "Majestic tiger prowling through the jungle, oil painting style, fierce mood",
    "A blue cat eating melon",
    "A cartoon style shark on the telephone",
    "A sunflower sunbathing on a tropical island",
    "An Enchanted Forest",
    "A home built in a huge Soap bubble",
    "Photo of an extremely cute alien fish swimming an alien habitable underwater planet",
    "A beautiful house in tropical modernism style inside of a forest and full of trees and plants",
    "3D render of a floating futuristic castle in a clear sky, digital art",
    "A digital Illustration of the a purely mechanical television, 4k, detailed, fantasy vivid colors",
    "A cowboy gunslinger walking the neon lit streets and alleys of a futuristic tokyo covered in a dense fog",
    "A big large happy kawaii fluffy cutest baby Shiba-inu puppy wearing kimono enjoy shopping in a futuristic abandoned city, anime movie, IMAX, cinematic lighting, only in cinema",
    "Hyper realistic photo of a high end futuristic single-level house where walls are made of windows, light coming through the window, mid century modern style, cinematic lighting",
    "Botticelli’s Simonetta Vespucci young portrait photography hyperrealistic modern dressed, futuristic",
    "An artistic render of a fox made of fire",
  ];

  const [imageUrls, setImageUrls] = useState(["/", "/"]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);
  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setError(null);
    }, 2100);
  };

  function surpriseMe() {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];

    inputRef.current.value = randomValue;
  }

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      setError("Please describe what you want to see");
      clearErrorAfterDelay();
      return 0;
    }

    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 2,
          size: "512x512",
        }),
      }
    );

    let data = await response.json();
    let data_array = data.data;
    setImageUrls(data_array.map((item) => item.url));
    setLoading(false);
  };

  return (
    <div className="app">
      <section className="header">
        <h1 className="logo">
          <a href="index.html">
            Imagine <span className="logo-second">AI</span>
          </a>
        </h1>

        <ul>
          <li>
            {" "}
            <a
              href="https://platform.openai.com/docs"
              target="_blank"
              rel="noreferrer"
              className="openai-docs"
            >
              OpenAI Docs
            </a>{" "}
          </li>
        </ul>
      </section>
      <hr className="divider" />
      <div className="container">
        <section className="showcase">
          <h1>AI Image Generator</h1>
          <p>
            Create beautiful images effortlessly and explore the endless
            possibilities of AI text-to-image art. Enter a description of what
            you want to see, and watch <span className="piece-1">Imagine</span>
            <span className="piece-2"> AI</span> bring your ideas to life!
          </p>
        </section>
        <section className="searchSection">
          <p className="detailed-description">
            Describe what you want to see{" "}
            <span className="surprise" onClick={surpriseMe}>
              Surprise Me
            </span>
          </p>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="A ferocious lion scrolling through social media..."
              ref={inputRef}
            />
            <button
              className="btn"
              onClick={() => {
                imageGenerator();
              }}
            >
              Generate
            </button>
          </div>
          {error && (
            <p className="error-message">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="iconFontAwesome"
              />
              {error}
            </p>
          )}
        </section>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          {/* <div className="loading-bar-full"></div> */}
          <div className={loading ? "loading-text" : "hidden"}>
            Generating your images...
          </div>
          {/* <div className="loading-text">Generating your images...</div> */}
        </div>
        <section className="imageSection">
          <div className="image">
            {imageUrls.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt="" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
