import { useEffect, useRef } from "react";

type VideoProps = {
  stream: MediaStream;
  muted?: boolean;
  local?: boolean;
  label?: string;
};

export default function Video({ stream, muted = false, local = false, label }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
  }, [stream]);

  return (
    <div className={`video-tile ${local ? "video-tile--local" : ""}`}>
      <video ref={ref} autoPlay playsInline muted={muted} />
      {label && <span className="video-tile__label">{label}</span>}
    </div>
  );
}
