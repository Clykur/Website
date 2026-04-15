"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const rotateY = ((x / bounds.width) * 2 - 1) * 7;
        const rotateX = -((y / bounds.height) * 2 - 1) * 7;
        setRotate({ x: rotateX, y: rotateY });
      }}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
