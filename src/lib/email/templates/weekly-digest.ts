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
    ? `Aquí tienes un resumen claro del trabajo que tus herramientas y automatizaciones adelantaron por ti durante la última semana (<strong>${escapeHtml(data.startDate)} &ndash; ${escapeHtml(data.endDate)}</strong>):`
    : `Here is a clear look at the work your tools and automations completed for you over the past week (<strong>${escapeHtml(data.startDate)} &ndash; ${escapeHtml(data.endDate)}</strong>):`;
  const buttonText = isEs ? "Ir a mi panel de CELAEST" : "Open my CELAEST dashboard";

  const metrics = [
    {
      label: isEs ? "Procesos ejecutados" : "Completed runs",
      value: `${data.tasksCompleted}`,
    },
    {
      label: isEs ? "Tiempo ahorrado" : "Time saved",
      value: `${data.hoursSaved}h`,
    },
    {
      label: isEs ? "Sin errores" : "Success rate",
      value: data.learningProgress,
    },
  ];

  const bodyHtml = `
    ${renderMetricsRow(metrics)}
    <div style="background-color: #F8FAFC; border-radius: 10px; padding: 14px 18px; margin: 16px 0; font-size: 13.5px; color: #334155; line-height: 1.6;">
      ${
        isEs
          ? "Además, tienes nuevas actualizaciones disponibles listas para descargar en tu biblioteca de activos."
          : "Plus, you have new version updates ready to download in your asset library."
      }
    </div>
  `;

  const layout = renderEnterpriseEmailLayout({
    title,
    badge: {
      text: isEs ? "Resumen Semanal" : "Weekly Summary",
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
      ? "Enviamos este resumen cada lunes para ayudarte a medir el retorno de tus automatizaciones. Puedes desactivarlo cuando quieras desde tus preferencias."
      : "We send this summary every Monday to help you track your automation ROI. You can turn it off anytime in your preferences.",
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
