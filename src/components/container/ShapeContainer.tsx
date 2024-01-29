import { shapeAtomSelector } from "@/atoms/drawing";
import { STR_SHAPE } from "@/types/STRUCTURES";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";

const ShapeContainer = () => {
  const shapeList = useRecoilValue(shapeAtomSelector);
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full z-[10]" />
      {shapeList.map((shape: STR_SHAPE, idx) => {
        return (
          <Fragment key={idx}>
            <Shape shape={shape} />
          </Fragment>
        );
      })}
    </>
  );
};

const Shape = ({ shape }: { shape: STR_SHAPE }) => {
  return (
    <div
      className="absolute border border-solid border-[#333]"
      data-index={shape.index}
      style={{
        left: shape?.left ?? 0,
        top: shape?.top ?? 0,
        width: shape?.width ?? 0,
        height: shape?.height ?? 0,
        borderRadius: `${shape?.radius ?? 0}%`,
        transform: `translate(${shape?.translateX ?? 0}px,${
          shape?.translateY ?? 0
        }px)`,
        backgroundColor: shape.backgroundColor,
      }}
    />
  );
};

export default ShapeContainer;
