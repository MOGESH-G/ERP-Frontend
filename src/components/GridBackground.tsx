import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "motion/react";

const GRID_COLS = 24;
const GRID_ROWS = 18;

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();

  const scanLineColor =
    theme.palette.mode === "dark"
      ? "rgba(59,130,246,0.2)" // fallback for primary-500 in dark
      : "rgba(37,99,235,0.2)"; // primary-500 in light

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const cells = Array.from({ length: GRID_COLS * GRID_ROWS }, () => ({
      opacity: Math.random() * 0.12,
      target: Math.random() * 0.12,
      speed: 0.003 + Math.random() * 0.008,
    }));

    const draw = () => {
      const W = (canvas.width = canvas.offsetWidth);
      const H = (canvas.height = canvas.offsetHeight);

      const cw = W / GRID_COLS;
      const ch = H / GRID_ROWS;

      ctx.clearRect(0, 0, W, H);

      cells.forEach((cell, i) => {
        cell.opacity += (cell.target - cell.opacity) * cell.speed;

        if (Math.abs(cell.opacity - cell.target) < 0.002) {
          cell.target = Math.random() * 0.13;
        }

        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);

        const x = col * cw;
        const y = row * ch;

        // 🎨 use theme primary color with opacity
        ctx.strokeStyle = `rgba(${theme.palette.mode === "dark" ? "59,130,246" : "37,99,235"},${cell.opacity})`;
        ctx.lineWidth = 0.5;

        ctx.strokeRect(x + 0.5, y + 0.5, cw - 1, ch - 1);
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(raf);
  }, [theme]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {/* animated scan line */}
      <motion.div
        initial={{ top: -120 }}
        animate={{ top: "120%" }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 120,
          background: `linear-gradient(to bottom, transparent, ${scanLineColor}, transparent)`,
        }}
      />
    </Box>
  );
}
