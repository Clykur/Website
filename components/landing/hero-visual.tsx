"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, BriefcaseBusiness, LayoutDashboard } from "lucide-react";

export function HeroVisual() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 16]);

  return (
    <motion.div
      style={{ y }}
      className="relative mx-auto mt-14 h-[330px] w-full max-w-3xl md:h-[420px]"
      aria-hidden
    >
      <motion.div
        style={{ rotate }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,rgba(255,90,60,0.3),rgba(255,59,31,0.22))] blur-2xl"
      />
      <FloatingCard
        className="left-8 top-16"
        icon={<CalendarDays className="h-4 w-4 text-[#0A0A0A]" />}
        title="Bookings"
        text="Automated slot orchestration"
        delay={0}
      />
      <FloatingCard
        className="right-8 top-10"
        icon={<BriefcaseBusiness className="h-4 w-4 text-[#0A0A0A]" />}
        title="Services"
        text="Engineering partnership flow"
        delay={0.2}
      />
      <FloatingCard
        className="bottom-8 left-1/2 -translate-x-1/2"
        icon={<LayoutDashboard className="h-4 w-4 text-[#0A0A0A]" />}
        title="Scheduling UI"
        text="Realtime product operations"
        delay={0.35}
      />
    </motion.div>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  text,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      animate={{ y: [0, -10, 0] }}
      className={`absolute ${className} min-w-52 rounded-2xl border border-[#EFEFF1] bg-white p-5 shadow-[0_10px_30px_rgba(10,10,10,0.08)] backdrop-blur-md`}
    >
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F7F8]">
        {icon}
      </div>
      <p className="text-sm font-semibold tracking-tight text-[#0A0A0A]">{title}</p>
      <p className="mt-1 text-xs text-[#6B7280]">{text}</p>
    </motion.div>
  );
}
