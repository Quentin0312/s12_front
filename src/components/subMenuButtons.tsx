type SubMenuButtonProps = {
    title: string;
    onClick: () => void;
  };
  
  export default function (props: SubMenuButtonProps) {
    return (
     <button class="btn bg-slate-700"
             onClick={() => props.onClick()}>
        {props.title}
     </button>

    );
  }
  
  