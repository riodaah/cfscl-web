"use client";

import { useEffect, useRef, useState } from "react";
import { byCategory } from "@/lib/products";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorText, setErrorText] = useState("");
  const [product, setProduct] = useState("");
  const startedAt = useRef(0);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const p = new URLSearchParams(window.location.search).get("producto");
    if (p) setProduct(p);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrors({});
    setErrorText("");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, t: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        const first = Object.keys(json.errors)[0];
        (form.elements.namedItem(first) as HTMLElement | null)?.focus();
        return;
      }
      throw new Error();
    } catch {
      setStatus("error");
      setErrorText(
        `No pudimos enviar tu solicitud desde aquí. Escríbenos a ${site.email} o llámanos al ${site.phone} y te respondemos en el día.`
      );
    }
  }

  if (status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} className="rounded-3xl bg-white p-8 sm:p-10 outline-none shadow-[inset_0_0_0_1px_var(--color-linea)]">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-verde text-white" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="mt-5 display-md">Solicitud enviada</h3>
        <p className="mt-3 max-w-prose text-niebla">
          Un ejecutivo de CFS revisará tu solicitud y te contactará por correo con disponibilidad, calibres y condiciones de
          despacho.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-linea mt-6 text-huerto">
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-rojo-oscuro">
        {errors[name]}
      </p>
    ) : null;
  const describedBy = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white p-6 sm:p-10 shadow-[inset_0_0_0_1px_var(--color-linea)]">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="label">Nombre y apellido</label>
          <input id="nombre" name="nombre" required autoComplete="name" className="field" aria-invalid={!!errors.nombre} aria-describedby={describedBy("nombre")} />
          {err("nombre")}
        </div>
        <div>
          <label htmlFor="empresa" className="label">Empresa <span className="font-normal text-niebla">(opcional)</span></label>
          <input id="empresa" name="empresa" autoComplete="organization" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">Correo</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="telefono" className="label">Teléfono o WhatsApp <span className="font-normal text-niebla">(opcional)</span></label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor="pais" className="label">País de destino</label>
          <input id="pais" name="pais" required autoComplete="country-name" className="field" aria-invalid={!!errors.pais} aria-describedby={describedBy("pais")} />
          {err("pais")}
        </div>
        <div>
          <label htmlFor="producto" className="label">Producto de interés</label>
          <select
            id="producto"
            name="producto"
            className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2313241a%22 stroke-width=%222.5%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            aria-invalid={!!errors.producto}
            aria-describedby={describedBy("producto")}
          >
            <option value="">Selecciona una fruta</option>
            <optgroup label="Frescos">
              {byCategory("frescos").map((p) => (
                <option key={p.formName} value={p.formName}>{p.name}</option>
              ))}
            </optgroup>
            <optgroup label="Congelados IQF">
              {byCategory("congelados").map((p) => (
                <option key={p.formName} value={p.formName}>{p.name} congelado</option>
              ))}
            </optgroup>
            <option value="Varios productos">Varios productos</option>
          </select>
          {err("producto")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="volumen" className="label">Volumen estimado <span className="font-normal text-niebla">(opcional)</span></label>
          <input id="volumen" name="volumen" placeholder="Ej.: 2 contenedores de 40' en enero" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="mensaje" className="label">Mensaje <span className="font-normal text-niebla">(opcional)</span></label>
          <textarea id="mensaje" name="mensaje" rows={4} placeholder="Variedades, calibres, embalaje o puerto de destino" className="field resize-y" />
        </div>
        {/* Campo trampa: los bots lo completan, las personas no lo ven */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">No completar</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 rounded-xl bg-rojo/10 px-4 py-3 text-[0.95rem] font-medium text-rojo-oscuro">
          {errorText}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-niebla max-w-sm">Un ejecutivo te responde por correo, normalmente dentro del día hábil.</p>
        <button type="submit" disabled={status === "sending"} className="btn btn-rojo justify-center text-lg disabled:opacity-70">
          {status === "sending" ? "Enviando…" : "Enviar solicitud"}
        </button>
      </div>
    </form>
  );
}
