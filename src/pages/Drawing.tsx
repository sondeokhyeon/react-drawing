import { useRef } from "react";
import Button from "@/components/ui/Button";

const Drawing = () => {
  const drawingElementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
  };

  const boxRenderHelper = () => {
    drawingElementRef.current?.addEventListener("click", handleMouseDown);
  };

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="w-[700px] h-[500px]">
        <div className="flex gap-x-[10px] items-start w-full">
          <Button title="Box" onClick={boxRenderHelper} />
          <Button title="Circle" onClick={() => console.log(4)} />
          <Button title="Clear" onClick={() => console.log(4)} />
        </div>
        <div
          className="border border-solid border-[#333] w-full h-full relative"
          ref={drawingElementRef}
        ></div>
      </div>
    </div>
  );
};

export default Drawing;
