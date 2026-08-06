import React from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export const LampContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-80px 0px", once: true });

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 40%, #0a1628 100%)" }}
    >
      {/* === TUBE LIGHT FIXTURE === */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center z-30">
        {/* Tube housing / bracket */}
        <div className="w-3/4 max-w-2xl h-[3px] bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-60 rounded-full" />
        {/* Glowing tube strip */}
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={
            isInView
              ? { width: "72%", opacity: 1 }
              : { width: "0%", opacity: 0 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #22d3ee 20%, #ffffff 50%, #22d3ee 80%, transparent 100%)",
            boxShadow:
              "0 0 6px 2px #22d3ee, 0 0 18px 4px #06b6d4, 0 0 40px 6px rgba(6,182,212,0.4)",
          }}
        />
      </div>

      {/* === RADIAL TEAL GLOW spreading downward from tube === */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={
          isInView
            ? { opacity: 1, scaleX: 1 }
            : { opacity: 0, scaleX: 0.3 }
        }
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-10"
        style={{
          height: "420px",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(6,182,212,0.55) 0%, rgba(20,184,166,0.3) 35%, rgba(6,182,212,0.1) 65%, transparent 100%)",
        }}
      />

      {/* Secondary softer ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 pointer-events-none z-10"
        style={{
          height: "280px",
          background:
            "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(34,211,238,0.25) 0%, transparent 70%)",
        }}
      />

      {/* === COLLAPSIBLE CONTENT AREA === */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isInView
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.85, ease: "easeInOut", delay: 0.15 }}
        className="overflow-hidden"
      >
        {/* Content wrapper — inner padding pushes content below tube */}
        <div className="relative z-20 pt-14 pb-10 px-8">
          {children}
        </div>
      </motion.div>

      {/* Floor dark fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(10,22,40,0.8), transparent)",
        }}
      />
    </div>
  );
};
