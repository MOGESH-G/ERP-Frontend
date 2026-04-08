import {
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import clsx from "clsx";

interface TooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  className = "",
}: TooltipProps) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => setShow(true), []);
  const handleMouseLeave = useCallback(() => setShow(false), []);

  useEffect(() => {
    if (!show || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const triggerRect =
      (
        ref.current.parentElement?.parentElement as HTMLElement
      )?.getBoundingClientRect() || rect;

    // Fixed position relative to trigger - right side, centered vertically
    const top = triggerRect.top + (triggerRect.height - rect.height) / 2;
    const left = triggerRect.right + 8; // 8px gap

    Object.assign(ref.current.style, {
      position: "fixed",
      top: `${Math.max(10, top)}px`,
      left: `${left}px`,
      zIndex: "50",
      pointerEvents: "none",
    });
  }, [show]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {show && (
        <div
          ref={ref}
          className={clsx(
            "px-3 py-1.5 text-xs rounded-md shadow-xl whitespace-nowrap bg-primary-500/95 backdrop-blur-sm text-white border border-primary-400/50",
            "origin-left scale-95 translate-x-2 opacity-0 transition-all duration-200",
            "hover:scale-100 hover:translate-x-0 hover:opacity-100",
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
