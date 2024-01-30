import { useRecoilState } from "recoil";
import { shapeAtomSelector } from "@/atoms/drawing";
import { STR_SHAPE } from "@/types/STRUCTURES";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

/* 도형 조절(개별 삭제, 순서변경) container */
const ShapeControlContainer = () => {
  const [subMenuSelect, setSubMenuSelect] = useState<number | null>(null);
  const [shapeList, setShapeList] = useRecoilState<STR_SHAPE[] | []>(
    shapeAtomSelector,
  );

  const handleMouseOver = (shape: STR_SHAPE) => {
    const shapeWithBackgroundColor = {
      ...shape,
      backgroundColor: "powderblue",
    };
    const highlightList = shapeList.map((s) => {
      if (s.index === shape.index) return shapeWithBackgroundColor;
      return s;
    });
    setShapeList(highlightList);
  };

  const handleMouseOut = () => {
    const highlightRemoveList = shapeList.map((s) => {
      return { ...s, backgroundColor: "" };
    });
    setShapeList(highlightRemoveList);
  };

  const handleButtonClick = (i: number) => setSubMenuSelect(i);

  return (
    <div className="w-[200px] h-[500px] border border-solid border-[#333] overflow-scroll ">
      {shapeList.map((e, i) => {
        return (
          <div key={i} className="relative">
            <button
              onMouseOver={() => {
                handleMouseOver(e);
              }}
              onMouseOut={handleMouseOut}
              onClick={() => handleButtonClick(i)}
              className="h-[50px] w-full border-b border-solid border-[#333] text-center flex justify-center items-center cursor-pointer"
            >
              {i}
            </button>
            {subMenuSelect === i && (
              <SubMenu shape={e} setSubMenuSelect={setSubMenuSelect} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const SubMenu = ({
  shape,
  setSubMenuSelect,
}: {
  shape: STR_SHAPE;
  setSubMenuSelect: Dispatch<SetStateAction<number | null>>;
}) => {
  const subMenuRef = useRef<HTMLDivElement>(null);

  const [shapeList, setShapeList] = useRecoilState<STR_SHAPE[] | []>(
    shapeAtomSelector,
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleMenuClose);
    return () => document.removeEventListener("mousedown", handleMenuClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuClose = (e: MouseEvent) => {
    const target = e.target;
    if (
      subMenuRef.current &&
      !subMenuRef.current.contains(target as HTMLDivElement)
    ) {
      setSubMenuSelect(null);
    }
  };

  const reOrderList = () => {
    return shapeList.filter((s) => {
      return s.index !== shape.index;
    });
  };

  const handleRemoveShape = () => {
    setShapeList(reOrderList());
    setSubMenuSelect(null);
  };

  const handleOrderChangeTop = () => {
    const reOrder = [shape, ...reOrderList()];
    setShapeList(reOrder);
    setSubMenuSelect(null);
  };

  const handleOrderChangeLast = () => {
    const reOrder = [...reOrderList(), shape];
    setShapeList(reOrder);
    setSubMenuSelect(null);
  };

  return (
    <div
      ref={subMenuRef}
      className="absolute top-[0px] left-[20%] w-[110px] h-auto border border-solid border-[#333] bg-white text-[12px] z-[10]"
    >
      <ul>
        <li>
          <button onClick={handleOrderChangeTop}>맨 앞으로 가져오기</button>
        </li>
        <li>
          <button onClick={handleOrderChangeLast}>맨 뒤로 보내기</button>
        </li>
        <li>
          <button onClick={handleRemoveShape}>삭제</button>
        </li>
      </ul>
    </div>
  );
};

export default ShapeControlContainer;
