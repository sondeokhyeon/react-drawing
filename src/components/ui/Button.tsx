export interface ButtonInterface {
  title: string;
  onClick: () => void;
  isDisable?: boolean;
}

const Button = ({ title, onClick, isDisable = false }: ButtonInterface) => {
  return (
    <button
      onClick={() => {
        if (isDisable) return;
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default Button;
