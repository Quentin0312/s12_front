type SubMenuButtonProps = {
    title: string;
    onClick: () => void;
  };
  
  export default function (props: SubMenuButtonProps) {
    return (
     <button class="btn btn-secondary"
             onClick={() => props.onClick()}>
        {props.title}
     </button>

    );
  }
  
  