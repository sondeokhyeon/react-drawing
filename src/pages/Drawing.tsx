import { useEffect, useRef } from "react";
import { PR_SHARE_RENDER_HELPER } from "@/types/FUNCTIONS";
import { STR_SHAPE } from "@/types/STRUCTURES";
import { useResetRecoilState, useRecoilState } from "recoil";
import { shapeAtomSelector } from "@/atoms/drawing";
import Button from "@/components/ui/Button";
import ShapeContainer from "@/components/container/ShapeContainer";
import ShapeControlContainer from "@/components/container/ShapeControlContainer";

const Drawing = () => {
  const drawingElementRef = useRef<HTMLDivElement>(null);

  const currentShape = useRef<STR_SHAPE | null>(null);
  const shapeLists = useRef<STR_SHAPE[] | []>([]);

  const isShapeButtonEnableFlag = useRef(true);
  const shapeRenderType = useRef<PR_SHARE_RENDER_HELPER | null>(null);

  const [shapeList, setShapeList] = useRecoilState<STR_SHAPE[] | []>(
    shapeAtomSelector,
  );

  /* RecoilState를 초기값으로 바꾼다 */
  const handleClear = useResetRecoilState(shapeAtomSelector);

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;

    const shape = currentShape.current;
    if (!shape) return;

    const width = offsetX - shape.left;
    const height = offsetY - shape.top;
    let translateX = 0;
    let translateY = 0;
    let radius = 0;

    if (width < 0) {
      translateX = width;
    } else {
      translateX = 0;
    }

    if (height < 0) {
      translateY = height;
    } else {
      translateY = 0;
    }

    if (shapeRenderType.current === PR_SHARE_RENDER_HELPER.CIRCLE) radius = 50;

    const resizedShape = {
      ...shape,
      translateY: translateY,
      translateX: translateX,
      radius: radius,
      width: Math.abs(width),
      height: Math.abs(height),
    };

    setShapeList(
      shapeLists.current.map((s) => {
        if (s.index === resizedShape.index) return resizedShape;
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
      const newShape: STR_SHAPE = {
        left: offsetX,
        top: offsetY,
        width: 6,
        height: 6,
        radius:
          shapeRenderType.current === PR_SHARE_RENDER_HELPER.CIRCLE ? 50 : 0,
        index: prev.length,
        translateX: 0,
        translateY: 0,
        backgroundColor: "",
      };
      currentShape.current = newShape;
      return [...prev, newShape];
    });

    drawingElementRef.current?.addEventListener("mousemove", handleMouseMove);
    drawingElementRef.current?.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    /* 상태값 업데이트 이후 최신 state를 가져올 수 없으므로 useRef에 담는다  */
    shapeLists.current = shapeList;
  }, [shapeList]);

  const handleShapeButton = (shareType: PR_SHARE_RENDER_HELPER) => {
    /* 최신값을 사용해야 하므로 useRef에 값을 담는다 */
    shapeRenderType.current = shareType;
    if (
      !drawingElementRef.current ||
      isShapeButtonEnableFlag.current === false
    ) {
      return;
    }
    drawingElementRef.current?.addEventListener("mousedown", handleMouseDown);
    isShapeButtonEnableFlag.current = false;
  };

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="w-[950px] h-auto">
        <div className="flex gap-x-[10px] items-start w-full">
          <Button
            title="Box"
            onClick={() => handleShapeButton(PR_SHARE_RENDER_HELPER.BOX)}
          />
          <Button
            title="Circle"
            onClick={() => handleShapeButton(PR_SHARE_RENDER_HELPER.CIRCLE)}
          />
          <Button title="Clear" onClick={handleClear} />
        </div>
        <div className="flex justify-between ">
          <div
            className="border border-solid border-[#333] w-[700px] h-[500px] relative "
            ref={drawingElementRef}
          >
            <ShapeContainer />
          </div>
          <ShapeControlContainer />
        </div>
      </div>
    </div>
  );
};

export default Drawing;
