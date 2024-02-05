import { useRef } from "react";
import { PR_SHAPE_TYPE } from "@/types/FUNCTIONS";
import { STR_SHAPE } from "@/types/STRUCTURES";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { shapeAtom } from "@/atoms/drawing";
import { v4 as uid } from "uuid";
import Button from "@/components/ui/Button";
import ShapeContainer from "@/components/container/ShapeContainer";
import ShapeControlContainer from "@/components/container/ShapeControlContainer";

const Drawing = () => {
  /* 도형 랜더링 영역 Ref  */
  const drawingElementRef = useRef<HTMLDivElement>(null);
  /* 현재수정중인 도형 */
  const currentShape = useRef<STR_SHAPE | null>(null);
  /** state 업데이트 이후 최신 도형리스트 */
  /** 도형버튼타입 */
  const isShapeButtonEnableFlag = useRef(true);
  /** 도형버튼타입 */
  const shapeButtonType = useRef<PR_SHAPE_TYPE | null>(null);
  /* 도형리스트  */
  const setShapeList = useSetRecoilState(shapeAtom);

  /* RecoilState를 초기값으로 바꾼다 */
  const handleClear = useResetRecoilState(shapeAtom);

  const handleMouseMove = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;

    const shape = currentShape.current;
    if (!shape) return;

    const width = offsetX - shape.left;
    const height = offsetY - shape.top;
    let translateX = 0;
    let translateY = 0;
    let radius = 0;

    /* 도형이 양수가 되면 translateX의 값이 0이 되어야하므로 초기화 해준다 */
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

    if (shapeButtonType.current === PR_SHAPE_TYPE.CIRCLE) radius = 50;

    const resizedShape = {
      ...shape,
      translateY: translateY,
      translateX: translateX,
      radius: radius,
      width: Math.abs(width),
      height: Math.abs(height),
    };

    setShapeList((prev) =>
      prev.map((s) => {
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
        radius: shapeButtonType.current === PR_SHAPE_TYPE.CIRCLE ? 50 : 0,
        index: prev.length,
        translateX: 0,
        translateY: 0,
        key: uid(),
        backgroundColor: "",
      };
      currentShape.current = newShape;
      return [...prev, newShape];
    });

    drawingElementRef.current?.addEventListener("mousemove", handleMouseMove);
    drawingElementRef.current?.addEventListener("mouseup", handleMouseUp);
  };

  const handleShapeButton = (shapeType: PR_SHAPE_TYPE) => {
    /* 최신값을 사용해야 하므로 useRef에 값을 담는다 */
    shapeButtonType.current = shapeType;
    if (
      !drawingElementRef.current ||
      isShapeButtonEnableFlag.current === false
    ) {
      return;
    }
    drawingElementRef.current?.addEventListener("mousedown", handleMouseDown);
    /* mousedown addEventListener 한번만 등록을 위해 조건을 추가한다  */
    isShapeButtonEnableFlag.current = false;
  };

  return (
    <div className="flex justify-center items-center h-full w-full flex-col">
      <div className="w-[950px] h-auto">
        <div className="flex gap-x-[10px] items-start w-full">
          <Button
            title="Box"
            onClick={() => handleShapeButton(PR_SHAPE_TYPE.BOX)}
          />
          <Button
            title="Circle"
            onClick={() => handleShapeButton(PR_SHAPE_TYPE.CIRCLE)}
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
