/* eslint-disable no-unused-vars */
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { angleToRadians } from "../../helpers/angleToRadian";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    if (orbitControlsRef.current) {
      console.log(orbitControlsRef.current);
    }
  }, []);

  return (
    <>
      {/* Camera
       */}
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(40)}
        maxPolarAngle={angleToRadians(80)}
      />
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />

      {/* Light */}
      <ambientLight args={["#ffffff", 1]} />

      {/* Ball */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Floor */}
      <mesh rotation={[-angleToRadians(90), 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color="#1ea3d8" />
      </mesh>
    </>
  );
};

export default Three;
