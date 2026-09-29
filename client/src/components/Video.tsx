// import { useEffect, useRef } from "react";

// export default function Video({ stream, muted = false }: { stream: MediaStream; muted?: boolean }) {
//   const ref = useRef<HTMLVideoElement>(null);
//   useEffect(() => {
//     if (ref.current) ref.current.srcObject = stream;
//   }, [stream]);
//   return <video ref={ref} autoPlay playsInline muted={muted} />;
// }

import { useEffect, useRef } from "react";

type VideoProps = {
  stream: MediaStream;
  muted?: boolean;
  local?: boolean;
  label?: string;
};

export default function Video({
  stream,
  muted = false,
  local = false,
  label,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <video ref={ref} autoPlay playsInline muted={muted} />
      {label && <span>{label}</span>}
    </div>
  );
}
