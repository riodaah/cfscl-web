import { NextResponse } from "next/server";
import { formOptions } from "@/lib/products";

// Recibe las solicitudes de cotización del formulario.
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY     clave de https://resend.com para enviar el correo
//   CONTACT_TO         destinatario(s), separados por coma. Por defecto info@cfscl.cl
//   CONTACT_FROM       remitente verificado en Resend, ej: "Web CFS <web@cfscl.cl>"
//   LEAD_WEBHOOK_URL   (opcional) webhook de n8n/Make para registrar el lead en el CRM

type Lead = {
  nombre: string;
  empresa: string;
  pais: string;
  email: string;
  telefono: string;
  producto: string;
  volumen: string;
  mensaje: string;
};

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // Trampa para bots: campo oculto y envíos demasiado rápidos.
  const startedAt = Number(body.t);
  if (clean(body.website) || (startedAt && Date.now() - startedAt < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const lead: Lead = {
    nombre: clean(body.nombre, 120),
    empresa: clean(body.empresa, 160),
    pais: clean(body.pais, 80),
    email: clean(body.email, 160),
    telefono: clean(body.telefono, 40),
    producto: clean(body.producto, 80),
    volumen: clean(body.volumen, 120),
    mensaje: clean(body.mensaje, 3000),
  };

  const errors: Record<string, string> = {};
  if (!lead.nombre) errors.nombre = "Escribe tu nombre.";
  if (!lead.pais) errors.pais = "Indica tu país.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = "Revisa el correo: falta @ o el dominio.";
  if (lead.producto && lead.producto !== "Varios productos" && !formOptions.includes(lead.producto)) errors.producto = "Elige un producto de la lista.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!resendKey && !webhook) {
    console.error("[contacto] Falta configurar RESEND_API_KEY o LEAD_WEBHOOK_URL");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const tasks: Promise<Response>[] = [];

  if (resendKey) {
    const rows: [string, string][] = [
      ["Nombre", lead.nombre],
      ["Empresa", lead.empresa || "—"],
      ["País", lead.pais],
      ["Correo", lead.email],
      ["Teléfono", lead.telefono || "—"],
      ["Producto", lead.producto || "—"],
      ["Volumen estimado", lead.volumen || "—"],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;color:#13241a">
        <h2 style="margin:0 0 16px">Nueva solicitud de cotización desde cfscl.cl</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          ${rows.map(([k, v]) => `<tr><td style="color:#56665b">${k}</td><td><strong>${escape(v)}</strong></td></tr>`).join("")}
        </table>
        <p style="margin-top:16px;white-space:pre-wrap">${escape(lead.mensaje || "(sin mensaje)")}</p>
      </div>`;
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM || "Web CFS <onboarding@resend.dev>",
          to: (process.env.CONTACT_TO || "info@cfscl.cl").split(",").map((s) => s.trim()),
          reply_to: lead.email,
          subject: `Cotización web: ${lead.producto || "consulta"} — ${lead.empresa || lead.nombre} (${lead.pais})`,
          html,
        }),
      })
    );
  }

  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, origen: "cfscl.cl", fecha: new Date().toISOString() }),
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    console.error("[contacto] Ningún canal aceptó el lead", results);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
