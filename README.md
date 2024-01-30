## react-drawing
1. 소개    
  해당 프로젝트 vite typescript react로 만들어졌으며   
  Canvas를 사용하지 않고 DOM으로 사각형과 원형을 그릴수 있으며  
  Data는 LocalStorage를 통해서 관리되고 있습니다.
---
2. 기능    
   도형의 사각형, 원형 생성, 일괄삭제의 기능이 있으며   
   컨트롤영역에서 도형의 순서변경 및 개별삭제 기능이 있습니다. 
--- 
3. 명령어   
   npm install 이후 npm run dev 를 통해 실행이 가능하며   
   주소는 localhost:5173입니다 
---
4. 폴더 구조
```
├─ src
│  ├─ atoms
│  │  └─ drawing.ts
│  ├─ components
│  │  ├─ container
│  │  │  ├─ ShapeContainer.tsx
│  │  │  └─ ShapeControlContainer.tsx
│  │  └─ ui
│  │     └─ Button.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  └─ Drawing.tsx
│  ├─ types
│  │  ├─ FUNCTIONS.ts
│  │  └─ STRUCTURES.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
---
5. 개선 필요사항  
   1. State변경 시 최신 State를 참조 안되어 useRef를 사용하는 부분 개선 필요
   2. 랜더링 최적화를 통하여 랜더링
   3. 주석추가 
   