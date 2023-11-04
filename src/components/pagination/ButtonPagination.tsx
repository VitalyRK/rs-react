import { useState } from 'react';

interface IButtonPaginationProps {
  value: number | string;
  active?: boolean;
  inActive?: boolean;
  handleControlToPage?: () => void;
  handleClickToPage?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonPagination(props: IButtonPaginationProps) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <button
      style={{
        background: props.inActive
          ? '#919191'
          : props.active
          ? '#00aa7a'
          : 'inherit',
        transform: isHover ? 'scale(1.07)' : 'none',

        minWidth: '35px',
        width: 'fit-content',
        height: '35px',
        padding: '0 3px',
        fontSize: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        pointerEvents: props.inActive || props.active ? 'none' : 'unset',
      }}
      value={props.value}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={props.handleControlToPage || props.handleClickToPage}
    >
      {props.value}
    </button>
  );
}

export default ButtonPagination;
