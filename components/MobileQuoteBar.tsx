"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Barra fija inferior en celular: aparece al bajar y se oculta al llegar al formulario. */
export default function MobileQuoteBar({ label, href, color, name }: { label: string; href: string; color: string; name: string }) {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const form = document.getElementById("cotizar");
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > 520 && formTop > window.innerHeight - 40);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "110%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-hoja/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: color }} aria-hidden />
            <span className="min-w-0 flex-1 truncate font-display text-lg font-bold">{name}</span>
            <Link href={href} className="btn btn-rojo shrink-0 justify-center">
              {label}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
