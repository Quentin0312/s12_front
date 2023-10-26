type MenuButtonProps = {
  title: string;
  onClick: () => void;
};

export default function (props: MenuButtonProps) {
  return (
    // <div
    //   class="mx-5 cursor-pointer select-none"
    //   onClick={() => props.onClick()}
    // >
    //   <div class="text-center h-fit">{props.title}</div>
    // </div>
    <button class="btn btn-neutral m-1 w-64"
            onClick={() => props.onClick()}> 
          {props.title}
    </button>
  );
}

