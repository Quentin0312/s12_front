type MenuButtonProps = {
  title: string;
  onClick: () => void;
};

export default function (props: MenuButtonProps) {
  return (
    <button class="btn btn-neutral m-1 w-64" onClick={() => props.onClick()}>
      {props.title}
    </button>
  );
}
