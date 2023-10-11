import "./overlay.css";

type OverlayProps = {
  message: string;
};

export default function (props: OverlayProps) {
  return (
    <div id="spinner-overlay" class=" z-overlay">
      <div class="text-white text-5xl select-none z-header">
        {props.message}
      </div>
    </div>
  );
}
