/* 해당 파일은 프로젝트에서 사용하는 오브젝트들 정의한다 */
/* 접두사는 STR로 한다 */ 

/** 도형 타입  */
export interface STR_SHAPE {
  /** 도형 배열 인덱스 */
  index: number;
  /** 도형 X 좌표 */
  left: number;
  /** 도형 Y 좌표 */
  top: number;
  /** 도형 넓이 */
  width: number;
  /** 도형 높이 */
  height: number;
  /** 도형 음수 처리 X CSS값 */
  translateX: number;
  /** 도형 음수 처리 Y CSS값 */
  translateY: number;
  /** 원형 랜더링용 CSS값 */
  radius: number;
}
