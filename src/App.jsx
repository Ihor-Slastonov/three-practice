/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Three from "./components/Three/Three";

import "./App.css";
import Loader from "./components/Loader/Loader";

const App = () => {
  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={<Loader />}>
        <Three />
      </Suspense>
    </Canvas>
  );
};

export default App;
