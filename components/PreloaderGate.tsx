"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  delayNormalMs?: number;
  delayReducedMs?: number;
  storageKey?: string;
};

export default function PreloaderGate({
  children,
  delayNormalMs = 1500,
  delayReducedMs = 700,
  storageKey = "preloader_shown_this_tab",
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Mostra apenas no primeiro load desta aba
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem(storageKey) === "1";
      if (alreadyShown) {
        setShouldShow(false);
        setIsLoading(false);
        return;
      }
      setShouldShow(true);
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Se sessionStorage falhar, mostra normalmente
      setShouldShow(true);
    }
  }, [storageKey]);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const delay = useMemo(
    () => (prefersReducedMotion ? delayReducedMs : delayNormalMs),
    [prefersReducedMotion, delayReducedMs, delayNormalMs]
  );

  // Timer só se for mostrar
  useEffect(() => {
    if (!shouldShow) return;
    const t = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(t);
  }, [shouldShow, delay]);

  // Se não é pra mostrar, renderiza direto
  if (!shouldShow) return <>{children}</>;

  return (
    <>
      {/* Conteúdo NÃO aparece por trás */}
      <div className={isLoading ? "invisible pointer-events-none" : "visible"}>
        {children}
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            {/* fundo opaco */}
            <div className="absolute inset-0 bg-anthracite" />
            {/* efeito grain opcional */}
            <div className="absolute inset-0 bg-grain" />

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter: prefersReducedMotion
                    ? "none"
                    : [
                        "drop-shadow(0 0 8px rgba(220, 38, 38, 0.3))",
                        "drop-shadow(0 0 20px rgba(220, 38, 38, 0.6))",
                        "drop-shadow(0 0 8px rgba(220, 38, 38, 0.3))",
                      ],
                }}
                transition={{
                  scale: { duration: 0.3 },
                  opacity: { duration: 0.3 },
                  filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative w-32 h-32 mb-6"
              >
                <Image
                  src="/logo.png"
                  alt="Latina Grill"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-serif font-bold text-cream mb-1">
                  Latina Grill
                </h2>
                <p className="text-sm text-cream/60 uppercase tracking-widest">
                  Cascais
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
