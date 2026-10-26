"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Photo from "./Photo";
import SeasonNow from "./SeasonNow";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-huerto text-white">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y }}
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease }}
      >
        <Photo name="hero" alt="Huerto de cerezos en flor en los valles de Chile" priority className="h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(11,59,34,.94)_0%,rgba(11,59,34,.75)_42%,rgba(11,59,34,.15)_100%)]" aria-hidden />

      <div className="wrap grid min-h-[min(calc(100svh-4.5rem),54rem)] items-end gap-10 pt-24 pb-14 md:pb-20 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="max-w-4xl">
          <motion.h1 className="display-xl" {...rise(0.15)}>
            Fruta de los valles de Chile y Perú para los mercados más exigentes
          </motion.h1>
          <motion.p className="lead mt-6 max-w-2xl text-white/85" {...rise(0.35)}>
            Más de {site.years} años produciendo y exportando cerezas, uvas, manzanas, arándanos y fruta congelada IQF a
            Asia, Europa y Norteamérica.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3" {...rise(0.5)}>
            <Link href="/contacto" className="btn btn-rojo text-lg">
              Cotizar fruta
            </Link>
            <a href={site.catalog} download className="btn btn-linea text-lg text-white">
              Descargar catálogo
            </a>
          </motion.div>
        </div>
        <motion.div {...rise(0.7)}>
          <SeasonNow />
        </motion.div>
      </div>
    </section>
  );
}
