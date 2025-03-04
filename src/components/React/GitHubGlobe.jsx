import { useEffect, useRef } from "react";
import createGlobe from "github-globe";

const GitHubGlobe = () => {
  const globeRef = useRef(null);

  useEffect(() => {
    if (globeRef.current) {
      createGlobe(globeRef.current, {
        username: "tu-usuario-de-github", // Cambia esto por tu usuario de GitHub
        theme: "dark",
        places: [
          {
            lat: 41.3874, 
            lng: 2.1686, 
            size: 5,
            color: "#FF5733",
            tooltip: "Barcelona, España"
          },
          {
            lat: 37.7749,
            lng: -122.4194,
            size: 7,
            color: "#00FF00",
            tooltip: "San Francisco, donde nació GitHub"
          },
        ],
        tooltipRenderer: (place) => `
          <div style="
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 14px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          ">
            <strong>${place.tooltip}</strong>
          </div>
        `,
      });
    }
  }, []);

  return <canvas ref={globeRef} className="w-full h-[500px]" />;
};

export default GitHubGlobe;
