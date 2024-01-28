import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

const Drawing = () => {
  const drawingElementRef = useRef<HTMLDivElement>(null);
  const [shapeList, setShapeList] = useState<any[] | []>([]);
  const currentShape = useRef<any | null>(null);
  const shapeLists = useRef<any[] | []>([]);

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;

    if ((e.target as HTMLDivElement).getAttribute("data-type")) return;

    const a = currentShape.current;
    if (!a) return;
    const width = offsetX - a?.left;
    const height = offsetY - a?.top;

    a.width = width;
    a.height = height;

    setShapeList(
      shapeLists.current.map((s) => {
        if (s.index === a.index) return a;
        return s;
      }),
    );
  };

  const handleMouseUp = () => {
    drawingElementRef.current?.removeEventListener(
      "mousemove",
      handleMouseMove,
    );
    drawingElementRef.current?.removeEventListener(
      "handleMouseUp",
      handleMouseUp,
    );
  };

  const handleMouseDown = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    setShapeList((prev) => {
      const temp = {
        left: offsetX,
        top: offsetY,
        width: 6,
        height: 6,
        index: prev.length,
        translateX: 0,
        translateY: 0,
      };
      currentShape.current = temp;
      return [...prev, temp];
    });
    drawingElementRef.current?.addEventListener("mousemove", handleMouseMove);
    drawingElementRef.current?.addEventListener("mouseup", handleMouseUp);
  };

  const handleClear = () => setShapeList([]);

  useEffect(() => {
    shapeLists.current = shapeList;
  }, [shapeList]);

  const shareRenderHelper = () => {
    if (!drawingElementRef.current) return;
    drawingElementRef.current?.addEventListener("mousedown", handleMouseDown);
  };

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="w-[700px] h-[500px]">
        <div className="flex gap-x-[10px] items-start w-full">
          <Button title="Box" onClick={() => shareRenderHelper()} />
          <Button title="Circle" onClick={() => shareRenderHelper()} />
          <Button title="Clear" onClick={handleClear} />
        </div>
        <div
          className="border border-solid border-[#333] w-full h-full relative z-[10]"
          ref={drawingElementRef}
        >
          {shapeList.map((shape, idx) => {
            return (
              <div className="absolute left-0 top-0 w-full h-full">
                <div
                  key={idx}
                  className="absolute border border-solid border-[#333]"
                  data-type="shape"
                  style={{
                    left: shape?.left ?? 0,
                    top: shape?.top ?? 0,
                    width: shape?.width ?? 0,
                    height: shape?.height ?? 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Drawing;
