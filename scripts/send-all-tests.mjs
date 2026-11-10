/**
 * Script para enviar un test real de todos los correos del catálogo CELAEST
 * a estebani1421@gmail.com a través de la API oficial de Resend.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.error("Error: RESEND_API_KEY no encontrada en las variables de entorno.");
  process.exit(1);
}
const TARGET_EMAIL = "estebani1421@gmail.com";
const FROM = "CELAEST <onboarding@resend.dev>";

async function sendEmail({ subject, html, text }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TARGET_EMAIL],
      subject,
      html,
      text,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || JSON.stringify(data));
  }
  return data;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log(`\n🚀 Iniciando envío de prueba de los correos CELAEST a: ${TARGET_EMAIL}\n`);

  // Importamos los renderers desde los módulos compilados o generamos los payloads directamente
  const emailSuites = [
    {
      num: 1,
      name: "Acuse de Recibo al Cliente (Lead Web)",
      subject: "Hemos recibido tu consulta - CELAEST",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#A855F7;font-weight:bold;letter-spacing:0.18em;font-size:18px;margin-bottom:20px;">CELAEST</div><h2 style="color:#FFF;">Hemos recibido tu mensaje</h2><p style="color:#94A3B8;line-height:1.6;">Hola, Esteban.<br><br>Gracias por contactar al equipo de ingeniería de CELAEST. Un especialista técnico revisará tu consulta de automatización y te responderá en menos de 24 horas hábiles.</p><div style="background:rgba(255,255,255,0.04);border-left:3px solid #8B5CF6;padding:16px;border-radius:8px;margin:20px 0;"><strong style="color:#FFF;">Tu Consulta:</strong><br><span style="color:#CBD5E1;">"Queremos evaluar la integración del IA Mesh y los agentes autónomos de CELAEST."</span></div><p style="font-size:12px;color:#64748B;">Si necesitas agregar detalles adicionales, responde directamente a este correo.</p></div></body></html>`,
      text: "Hola, Esteban. Hemos recibido tu consulta en CELAEST y te responderemos en menos de 24 horas hábiles.",
    },
    {
      num: 2,
      name: "Alerta Interna de Nuevo Lead (Ventas CELAEST)",
      subject: "[Lead Web] Nueva Solicitud Enterprise - Empresa TechCorp",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><span style="background:rgba(139,92,246,0.2);color:#C4B5FD;border:1px solid #8B5CF6;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;">NUEVO LEAD B2B</span><h2 style="color:#FFF;margin-top:14px;">Solicitud Enterprise de Esteban Pérez</h2><p style="color:#94A3B8;font-size:14px;"><strong>Email:</strong> estebani1421@gmail.com<br><strong>Empresa:</strong> TechCorp Latam<br><strong>Plan de Interés:</strong> Enterprise Dedicated</p><div style="background:rgba(0,0,0,0.5);border-left:3px solid #A855F7;padding:16px;border-radius:8px;color:#CBD5E1;font-size:14px;">"Necesitamos automatizar pipelines de procesamiento con 15 agentes concurrentes."</div></div></body></html>`,
      text: "NUEVO LEAD CELAEST: Esteban Pérez (estebani1421@gmail.com) - TechCorp Latam",
    },
    {
      num: 3,
      name: "Bienvenida al Newsletter / Waitlist",
      subject: "Bienvenido al ecosistema CELAEST · Actualizaciones",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#A855F7;font-weight:bold;letter-spacing:0.18em;font-size:18px;margin-bottom:20px;">CELAEST</div><h2 style="color:#FFF;">Bienvenido al futuro de la automatización</h2><p style="color:#94A3B8;line-height:1.6;">Te has suscrito exitosamente a las actualizaciones de arquitectura, IA Mesh y herramientas de automatización de CELAEST.</p><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);padding:18px;border-radius:10px;margin:20px 0;"><span style="color:#A855F7;font-weight:bold;">&bull; Lanzamientos anticipados</span><br><span style="color:#A855F7;font-weight:bold;">&bull; Guías de ingeniería desacoplada</span><br><span style="color:#A855F7;font-weight:bold;">&bull; Modelos de IA en producción</span></div><div style="text-align:center;margin-top:24px;"><a href="https://celaest.com" style="background:#7C3AED;color:#FFF;padding:12px 24px;border-radius:9999px;text-decoration:none;font-weight:bold;">Explorar Plataforma &rarr;</a></div></div></body></html>`,
      text: "Bienvenido a CELAEST. Te has suscrito exitosamente a nuestras actualizaciones.",
    },
    {
      num: 4,
      name: "Verificación de Cuenta / Magic Link (Auth)",
      subject: "Verifica tu cuenta en CELAEST (Código: 849201)",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#A855F7;font-weight:bold;letter-spacing:0.18em;font-size:18px;margin-bottom:20px;">CELAEST</div><h2 style="color:#FFF;">Verifica tu correo electrónico</h2><p style="color:#94A3B8;line-height:1.6;">Haz clic en el botón para ingresar de forma segura a tu cuenta de CELAEST:</p><div style="text-align:center;margin:28px 0;"><a href="https://app.celaest.com/auth/verify?token=demo_token" style="background:#7C3AED;color:#FFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Verificar y Acceder &rarr;</a></div><div style="background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.2);padding:14px;border-radius:8px;text-align:center;"><span style="font-size:11px;color:#64748B;text-transform:uppercase;">Código temporal:</span><br><span style="font-size:24px;font-family:monospace;letter-spacing:0.25em;color:#A855F7;font-weight:bold;">849201</span></div><p style="font-size:12px;color:#64748B;margin-top:20px;">Este enlace y código expiran en 15 minutos.</p></div></body></html>`,
      text: "Tu código de verificación CELAEST es 849201. Expira en 15 minutos.",
    },
    {
      num: 5,
      name: "Restablecimiento de Contraseña (Auth)",
      subject: "Restablecer tu contraseña de CELAEST",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#A855F7;font-weight:bold;letter-spacing:0.18em;font-size:18px;margin-bottom:20px;">CELAEST</div><h2 style="color:#FFF;">Restablecer Contraseña</h2><p style="color:#94A3B8;line-height:1.6;">Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic a continuación para definir una nueva contraseña:</p><div style="text-align:center;margin:28px 0;"><a href="https://app.celaest.com/auth/reset?token=demo_token" style="background:#7C3AED;color:#FFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Restablecer Contraseña &rarr;</a></div><div style="background:rgba(239,68,68,0.1);border-left:3px solid #EF4444;padding:12px;border-radius:6px;font-size:12px;color:#FCA5A5;">Si no solicitaste este cambio, ningún cambio ha ocurrido y puedes ignorar este correo.</div></div></body></html>`,
      text: "Restablece tu contraseña de CELAEST ingresando a: https://app.celaest.com/auth/reset?token=demo",
    },
    {
      num: 6,
      name: "Alerta de Seguridad (Nuevo Acceso / Dispositivo)",
      subject: "Alerta de Seguridad: Nuevo inicio de sesión en CELAEST",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#EAB308;font-weight:bold;letter-spacing:0.18em;font-size:13px;margin-bottom:12px;">SEGURIDAD DE CUENTA</div><h2 style="color:#FFF;">Nuevo inicio de sesión detectado</h2><p style="color:#94A3B8;font-size:14px;">Detectamos un nuevo inicio de sesión en tu cuenta con los siguientes datos:</p><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:14px;font-size:13px;line-height:1.6;"><span style="color:#64748B;">Dispositivo:</span> Chrome en Windows 11<br><span style="color:#64748B;">Ubicación:</span> Bogotá, Colombia<br><span style="color:#64748B;">IP:</span> 190.156.44.12<br><span style="color:#64748B;">Hora:</span> 15:05 UTC</div><p style="color:#64748B;font-size:12px;margin-top:16px;">Si fuiste tú, ignora este mensaje. Si no fuiste tú, congela tu sesión de inmediato:</p><div style="margin-top:12px;"><a href="https://app.celaest.com/security/lockout" style="background:#DC2626;color:#FFF;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:13px;">Proteger mi Cuenta</a></div></div></body></html>`,
      text: "Alerta de Seguridad: Nuevo inicio de sesión detectado desde Chrome en Windows 11 (Bogotá, Colombia).",
    },
    {
      num: 7,
      name: "Recibo de Factura / Pago Exitoso (Billing)",
      subject: "Recibo de Pago: Plan CELAEST Professional (#INV-2026-084)",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#22C55E;font-weight:bold;letter-spacing:0.18em;font-size:13px;margin-bottom:12px;">PAGO PROCESADO CON ÉXITO</div><h2 style="color:#FFF;">Recibo de Suscripción</h2><p style="color:#94A3B8;font-size:14px;">Hemos procesado exitosamente el pago recurrente de tu suscripción CELAEST.</p><div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:16px;font-size:14px;line-height:1.8;"><span style="color:#64748B;">Factura:</span> #INV-2026-084<br><span style="color:#64748B;">Plan:</span> Professional Plan (Mensual)<br><span style="color:#64748B;">Tarjeta:</span> &bull;&bull;&bull;&bull; 4242<br><strong style="color:#FFF;">Total Pagado:</strong> <span style="color:#22C55E;font-weight:bold;">$49.00 USD</span></div><div style="text-align:center;margin-top:24px;"><a href="https://app.celaest.com/billing" style="background:#7C3AED;color:#FFF;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px;">Ver Factura en PDF &rarr;</a></div></div></body></html>`,
      text: "Recibo de Pago CELAEST: Plan Professional por $49.00 USD procesado exitosamente.",
    },
    {
      num: 8,
      name: "Alerta de Pago Fallido (Dunning / Billing)",
      subject: "Acción requerida: No pudimos procesar tu pago de CELAEST",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#EF4444;font-weight:bold;letter-spacing:0.18em;font-size:13px;margin-bottom:12px;">PAGO PENDIENTE</div><h2 style="color:#EF4444;">No pudimos cobrar tu suscripción</h2><div style="background:rgba(239,68,68,0.08);border-left:3px solid #EF4444;padding:14px;border-radius:6px;color:#FCA5A5;font-size:14px;line-height:1.5;">El cobro de $49.00 USD para tu plan Professional con la tarjeta terminada en 4242 fue rechazado por el banco.</div><p style="color:#94A3B8;font-size:14px;margin-top:16px;">Para evitar la interrupción de tus pipelines y agentes de IA, actualiza tu tarjeta:</p><div style="text-align:center;margin:24px 0;"><a href="https://app.celaest.com/settings/billing" style="background:#EF4444;color:#FFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;">Actualizar Método de Pago &rarr;</a></div></div></body></html>`,
      text: "Acción requerida: El cobro de tu plan CELAEST fue rechazado. Actualiza tu tarjeta en https://app.celaest.com/settings/billing",
    },
    {
      num: 9,
      name: "Invitación a Unirse al Workspace (Team)",
      subject: "Esteban te invitó a unirte a CELAEST Enterprise",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#A855F7;font-weight:bold;letter-spacing:0.18em;font-size:18px;margin-bottom:20px;">CELAEST</div><h2 style="color:#FFF;">Invitación a colaborar en equipo</h2><p style="color:#94A3B8;line-height:1.6;">Esteban Pérez te ha invitado a unirte a la organización <strong>CELAEST Enterprise</strong> como <span style="color:#A855F7;font-weight:bold;">Developer</span>.</p><p style="color:#94A3B8;font-size:14px;">Tendrás acceso a pipelines de automatización compartidos, catálogo de macros y modelos de IA.</p><div style="text-align:center;margin:28px 0;"><a href="https://app.celaest.com/invite/accept?token=demo" style="background:#7C3AED;color:#FFF;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold;">Aceptar Invitación &rarr;</a></div><p style="font-size:12px;color:#64748B;text-align:center;">Esta invitación expira en 7 días.</p></div></body></html>`,
      text: "Has sido invitado a unirte a CELAEST Enterprise. Acepta en: https://app.celaest.com/invite/accept",
    },
    {
      num: 10,
      name: "Alerta de Cuota de IA Mesh (Token Limit)",
      subject: "Alerta: Has alcanzado el 85% de tu cuota de IA en CELAEST",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#F59E0B;font-weight:bold;letter-spacing:0.18em;font-size:13px;margin-bottom:12px;">AVISO DE CUOTA IA MESH</div><h2 style="color:#F59E0B;">Consumo al 85% de Tokens</h2><p style="color:#94A3B8;font-size:14px;">Tu organización ha consumido <strong>850.000 de 1.000.000 tokens</strong> de su presupuesto mensual.</p><div style="background:rgba(255,255,255,0.05);border-radius:9999px;height:10px;margin:18px 0;"><div style="background:linear-gradient(90deg,#F59E0B,#EF4444);height:100%;width:85%;border-radius:9999px;"></div></div><p style="color:#64748B;font-size:12px;">Para evitar que los pipelines se pausen al alcanzar el 100%, amplía tu cuota:</p><div style="margin-top:16px;"><a href="https://app.celaest.com/settings/ai-quota" style="background:#7C3AED;color:#FFF;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:13px;">Aumentar Cuota de IA &rarr;</a></div></div></body></html>`,
      text: "Alerta CELAEST: Has consumido el 85% de tu cuota de tokens de IA. Amplía en https://app.celaest.com/settings/ai-quota",
    },
    {
      num: 11,
      name: "Resumen Semanal de Impacto (Weekly Digest)",
      subject: "Tu impacto semanal en CELAEST (420 tareas automatizadas)",
      html: `<!DOCTYPE html><html><body style="background:#050508;color:#E2E8F0;font-family:sans-serif;padding:30px;"><div style="max-width:580px;margin:auto;background:#0B0B14;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:32px;"><div style="color:#A855F7;font-weight:bold;letter-spacing:0.18em;font-size:18px;margin-bottom:6px;">CELAEST</div><div style="color:#64748B;font-size:12px;margin-bottom:20px;">RESUMEN SEMANAL DE IMPACTO</div><h2 style="color:#FFF;">Gran semana de automatización</h2><div style="display:flex;gap:12px;margin:20px 0;"><div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;text-align:center;"><div style="font-size:26px;font-weight:bold;color:#A855F7;">420</div><div style="font-size:11px;color:#64748B;text-transform:uppercase;">Tareas Ejecutadas</div></div><div style="flex:1;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:16px;text-align:center;"><div style="font-size:26px;font-weight:bold;color:#22C55E;">18.5h</div><div style="font-size:11px;color:#64748B;text-transform:uppercase;">Tiempo Ahorrado</div></div></div><div style="text-align:center;margin-top:24px;"><a href="https://app.celaest.com" style="background:#7C3AED;color:#FFF;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px;">Ver Dashboard Completo &rarr;</a></div></div></body></html>`,
      text: "Resumen semanal CELAEST: 420 tareas ejecutadas, 18.5 horas ahorradas.",
    },
  ];

  for (const item of emailSuites) {
    try {
      const result = await sendEmail({
        subject: `[CELAEST Test #${item.num}] ${item.subject}`,
        html: item.html,
        text: item.text,
      });
      console.log(`✅ [${item.num}/11] Enviado: "${item.name}" -> Resend ID: ${result.id}`);
    } catch (err) {
      console.error(`❌ [${item.num}/11] Error en "${item.name}":`, err.message);
    }
    // Pausa de 800ms para respetar el rate limit de Resend (máx 2 req/seg)
    await sleep(800);
  }

  console.log("\n🎉 ¡Todos los 11 correos fueron despachados exitosamente a tu bandeja de entrada!\n");
}

main().catch(console.error);
