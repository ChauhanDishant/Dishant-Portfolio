import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

export function useWaveTrail(length = 8, easing = 0.25) {
  const points = useRef<Point[]>(
    Array.from({ length }, () => ({ x: 0, y: 0 })),
  );

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      for (let i = points.current.length - 1; i > 0; i--) {
        points.current[i].x +=
          (points.current[i - 1].x - points.current[i].x) * easing;
        points.current[i].y +=
          (points.current[i - 1].y - points.current[i].y) * easing;
      }
      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [easing]);

  const setHead = (x: number, y: number) => {
    points.current[0].x = x;
    points.current[0].y = y;
  };

  return { points: points.current, setHead };
}
