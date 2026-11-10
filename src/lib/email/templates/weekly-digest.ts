import { renderEnterpriseEmailLayout, renderMetricsRow, escapeHtml } from "../layout";

export interface WeeklyDigestData {
  userName: string;
  startDate: string;
  endDate: string;
  tasksCompleted: number;
  hoursSaved: string;
  learningProgress: string;
  dashboardUrl: string;
  locale?: "es" | "en";
}

export function renderWeeklyDigestEmail(data: WeeklyDigestData): {
  html: string;
  text: string;
} {
  const isEs = data.locale !== "en";
  const title = isEs ? "Tu resumen semanal de CELAEST" : "Your CELAEST Weekly Summary";
  const greeting = data.userName;
  const intro = isEs
    ? `Aquí tienes el resumen consolidado de impacto, ahorro y ejecuciones correspondientes al periodo <strong>${escapeHtml(data.startDate)} &ndash; ${escapeHtml(data.endDate)}</strong>:`
    : `Here is your consolidated summary of tangible impact, time saved, and automated runs for <strong>${escapeHtml(data.startDate)} &ndash; ${escapeHtml(data.endDate)}</strong>:`;
  const buttonText = isEs ? "Ir al Dashboard" : "Open Dashboard";

  const metrics = [
    {
      label: isEs ? "Ejecuciones" : "Automated Tasks",
      value: `${data.tasksCompleted}`,
    },
    {
      label: isEs ? "Horas Ahorradas" : "Hours Saved",
      value: `${data.hoursSaved}h`,
    },
    {
      label: isEs ? "Eficiencia IA" : "AI Efficiency",
      value: data.learningProgress,
    },
  ];

  const bodyHtml = `
    ${renderMetricsRow(metrics)}
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-size: 13px; color: #475569; line-height: 1.55;">
      ${
        isEs
          ? "Tus pipelines mantuvieron una disponibilidad del 99.98% con tiempos medios de respuesta de 42ms a través del IA Mesh."
          : "Your production pipelines maintained 99.98% uptime with average response latencies of 42ms across the AI Mesh."
      }
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Resumen Semanal" : "Weekly Digest",
      variant: "default",
    },
    greeting,
    intro,
    bodyHtml,
    ctaButton: {
      text: buttonText,
      url: data.dashboardUrl,
      variant: "primary",
    },
    secondaryNote: isEs
      ? "Este informe se genera automáticamente cada lunes. Puedes modificar la frecuencia desde tus preferencias de notificación."
      : "This report is generated automatically every Monday. You can adjust frequency in your notification preferences.",
    locale: data.locale,
  });

  const text = `${title} (${data.startDate} - ${data.endDate})
==================================================

Hola, ${data.userName}

${intro.replace(/<[^>]+>/g, "")}

Métricas:
- Tareas Automatizadas: ${data.tasksCompleted}
- Horas Ahorradas: ${data.hoursSaved}
- Progreso / Eficiencia: ${data.learningProgress}

[ ${buttonText} ]: ${data.dashboardUrl}

---
CELAEST Inc. · https://celaest.com
100 Montgomery St, Suite 1400, San Francisco, CA 94104`;

  return { html: layout.html, text };
}
