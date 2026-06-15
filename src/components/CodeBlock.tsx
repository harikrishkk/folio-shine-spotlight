import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in (node as object)) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function CodeBlock({ children, ...rest }: { children?: ReactNode } & React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const text = extractText(children);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="not-prose relative group my-6">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2 right-2 inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono rounded border border-white/10 bg-black/40 text-white/80 hover:text-white hover:border-[var(--color-accent)] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        {...rest}
        className="bg-[#0d1117] border border-foreground/10 rounded-md p-4 overflow-x-auto text-sm"
      >
        {children}
      </pre>
    </div>
  );
}