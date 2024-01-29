## react-drawing
1. 소개  
-  환경     
  해당 프로젝트 vite typescript react로 만들어졌습니다.  
- 주요 라이브러리  
  recoil, recoil-persist 사용하였습니다.

1. 폴더 구조
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