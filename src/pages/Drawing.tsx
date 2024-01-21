import { useRef } from "react";

const Drawing = () => {
  const drawingElementRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="w-[700px] h-[500px]">
        <div className="flex gap-x-[10px] items-start w-full"></div>
        <div
          className="border border-solid border-[#333] w-full h-full relative"
          ref={drawingElementRef}
        ></div>
      </div>
    </div>
  );
};

export default Drawing;
