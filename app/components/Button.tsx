import { IconType } from "react-icons";

interface ButtonProps{
  label:string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon:Icon
}:ButtonProps)=>{


  return(
    <button
      onClick={onClick}
      className={
        `relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        text-lg
        py-3
        ${outline?'bg-white':'bg-rose-500'}
        ${outline?'border-black':'bg-rose-500'}
        ${outline?'text-black':'text-white'}
        ${small? 'py-1' : 'py-3'}
        ${small? 'text-sm' : 'text-md'}
        ${small? 'font-light' : 'font-semibold'}
        ${small? 'border-[1px]' : 'border-[1px]'}
      `}
    >
      {Icon&&(
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  )
}

export default Button