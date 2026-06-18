import { useEffect, useRef } from "react";

export function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean up any previous Giscus iframe/script
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", "harikrishkk/folio-shine-spotlight");
    script.setAttribute("data-repo-id", "R_kgDOS3IfRQ");
    script.setAttribute("data-category-id", "DIC_kwDOS3IfRc4C_b8s");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} className="mt-16" />;
}
