import { useProgress, Html } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center h-[100vh] bg-black/75">
        <div className="w-[80%] h-[10px] bg-[#ddd] mb-[10px]">
          <div
            className="h-full bg-[#4caf50]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>Loading... {Math.round(progress)}%</p>
      </div>
    </Html>
  );
};

export default Loader;
