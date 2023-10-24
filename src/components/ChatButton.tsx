import { toggleChat, unreadMessagesNumber } from "./Chat";

export default function () {
  return (
    <div class="z-chatbutton fixed bottom-0 right-0">
      <button class=" p-4 rounded-lg shadow-md" onClick={toggleChat}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 10H16M8 14H16M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {unreadMessagesNumber() > 0 && (
            <div
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                "background-color": "red",
                color: "white",
                "border-radius": "50%",
                width: "25px",
                height: "25px",
                "text-align": "center",
              }}
            >
              <span style={{ "line-height": "20px" }}>
                {unreadMessagesNumber()}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
