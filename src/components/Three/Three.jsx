/* eslint-disable no-unused-vars */
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { angleToRadians } from "../../helpers/angleToRadian";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Car } from "./Car";

/* eslint-disable react/no-unknown-property */
const Three = () => {
  const orbitControlsRef = useRef(null);

  useFrame((state) => {
    if (orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlsRef.current.update();
    }
  });

  // Animation
  const ballRef = useRef();

  useEffect(() => {
    if (ballRef.current) {
      const ball = ballRef.current.position;
      const timeline = gsap.timeline();

      // x-axis motion
      timeline.to(ball, {
        x: 1,
        duration: 2,
      });

      timeline.to(
        ball,
        {
          y: 0.5,
          duration: 1,
          ease: "bounce.out",
        },
        "<"
      );
    }
  }, []);

  return (
    <>
      {/* Ball */}
      <mesh position={[-2, 2, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
      </mesh>

      {/* Car */}
      <Car />

      {/* Camera
       */}
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(40)}
        maxPolarAngle={angleToRadians(80)}
      />
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />

      {/* Light */}
      <ambientLight args={["#ffffff", 0.74]} />

      <spotLight
        args={["#ffffff", 5, 10, angleToRadians(45), 0.45]}
        position={[-3, 1, 0]}
        castShadow
      />

      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>

      {/* Environmnet */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color="#2266cc" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
};

export default Three;
