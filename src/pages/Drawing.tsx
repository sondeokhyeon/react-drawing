import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { PR_SHARE_RENDER_HELPER } from "@/types/FUNCTIONS";
import { STR_SHAPE } from "@/types/STRUCTURES";
import useLocalStroage from "@/hooks/useLocalStorage";

const Drawing = () => {
  const drawingElementRef = useRef<HTMLDivElement>(null);

  const currentShape = useRef<STR_SHAPE | null>(null);
  const shapeLists = useRef<STR_SHAPE[] | []>([]);

  const isShapeButtonEnableFlag = useRef(true);
  const shapeRenderType = useRef<PR_SHARE_RENDER_HELPER | null>(null);
  const { data, setData, clearData } = useLocalStroage("shape", []);
  const [shapeList, setShapeList] = useState<STR_SHAPE[] | []>(data);

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    /* 이벤트 타겟이 이상하게 튀는 경우가 있어 해당 현상을 방지하고자 추가 */
    if ((e.target as HTMLDivElement).getAttribute("data-type")) return;

    const shape = currentShape.current;
    if (!shape) return;
    const width = offsetX - shape?.left;
    const height = offsetY - shape?.top;

    if (width < 0) {
      shape.translateX = width;
    } else {
      shape.translateX = 0;
    }

    if (height < 0) {
      shape.translateY = height;
    } else {
      shape.translateY = 0;
    }

    if (shapeRenderType.current === PR_SHARE_RENDER_HELPER.CIRCLE)
      shape.radius = width / 50;

    shape.width = Math.abs(width);
    shape.height = Math.abs(height);

    setShapeList(
      shapeLists.current.map((s) => {
        if (s.index === shape.index) return shape;
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
      const temp: STR_SHAPE = {
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
      setData([...prev, temp]);
      return [...prev, temp];
    });
    drawingElementRef.current?.addEventListener("mousemove", handleMouseMove);
    drawingElementRef.current?.addEventListener("mouseup", handleMouseUp);
  };

  const handleClear = () => {
    clearData();
    setShapeList([]);
  };

  useEffect(() => {
    shapeLists.current = shapeList;
  }, [shapeList]);

  const shareRenderHelper = (shareType: PR_SHARE_RENDER_HELPER) => {
    shapeRenderType.current = shareType;
    if (!drawingElementRef.current || isShapeButtonEnableFlag.current === false)
      return;
    drawingElementRef.current?.addEventListener("mousedown", handleMouseDown);
    isShapeButtonEnableFlag.current = false;
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
          {shapeList.map((shape: STR_SHAPE, idx) => {
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
