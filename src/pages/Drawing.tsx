import { useEffect, useRef, useState } from "react";
import { PR_SHARE_RENDER_HELPER } from "@/types/FUNCTIONS";
import Button from "@/components/ui/Button";

const Drawing = () => {
  const drawingElementRef = useRef<HTMLDivElement>(null);
  const [shapeList, setShapeList] = useState<STR_SHAPE[] | []>([]);
  const currentShape = useRef<any | null>(null);
  const shapeLists = useRef<any[] | []>([]);
  const shapeRenderFlag = useRef(true);
  const shapeRenderType = useRef<PR_SHARE_RENDER_HELPER | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;

    if ((e.target as HTMLDivElement).getAttribute("data-type")) return;

    const a = currentShape.current;
    if (!a) return;
    const width = offsetX - a?.left;
    const height = offsetY - a?.top;

    if (width < 0) {
      a.translateX = width;
    } else {
      a.translateX = 0;
    }

    if (height < 0) {
      a.translateY = height;
    } else {
      a.translateY = 0;
    }

    if (shapeRenderType.current === PR_SHARE_RENDER_HELPER.CIRCLE)
      a.radius = 50;
    a.width = Math.abs(width);
    a.height = Math.abs(height);

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
        radius:
          shapeRenderType.current === PR_SHARE_RENDER_HELPER.CIRCLE ? 50 : 0,
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

  const shareRenderHelper = (shareType: PR_SHARE_RENDER_HELPER) => {
    shapeRenderType.current = shareType;
    if (!drawingElementRef.current || shapeRenderFlag.current === false) return;
    drawingElementRef.current?.addEventListener("mousedown", handleMouseDown);
    shapeRenderFlag.current = false;
  };

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="w-[700px] h-[500px]">
        <div className="flex gap-x-[10px] items-start w-full">
          <Button
            title="Box"
            onClick={() => shareRenderHelper(PR_SHARE_RENDER_HELPER.BOX)}
          />
          <Button
            title="Circle"
            onClick={() => shareRenderHelper(PR_SHARE_RENDER_HELPER.CIRCLE)}
          />
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
                    borderRadius: `${shape?.radius ?? 0}%`,
                    transform: `translate(${shape?.translateX ?? 0}px,${
                      shape?.translateY ?? 0
                    }px)`,
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
