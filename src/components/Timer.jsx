import { useEffect, useRef, useState } from "react";

const Timer = ({ duration, onTimeout }) => {
  const [remaining, setRemaining] = useState(duration);
  const donutRef = useRef();

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const left = duration - elapsed;
      if (left >= 0) {
        setRemaining(left);
        const percent = (left / duration) * 100;
        donutRef.current.style.background = `conic-gradient(#00ffff 0% ${percent}%, rgba(255,255,255,0.5) ${percent}% 100%)`;
        requestAnimationFrame(tick);
      } else {
        onTimeout();
      }
    };
    tick();
  }, [duration, onTimeout]);

  return (
    <div className="text-center my-3">
      <div
        ref={donutRef}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "conic-gradient(#00ffff 0% 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "24px",
          color: "#000",
        }}
      >
        {remaining}
      </div>
    </div>
  );
};

export default Timer;
