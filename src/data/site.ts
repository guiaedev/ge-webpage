export const site = {
  name: 'Guía Existencial',
  description: 'Psicoterapia en línea basada en evidencia y atención personalizada. Un espacio para comprenderte y encontrar dirección.',
  // Public Cal.com events shown in the booking modal's two tabs. TEMPORARY: both use Sintropia's
  // staff event; replace with the practice's first-session and follow-up event URLs.
  bookingUrl: 'https://cal.com/staff-sintropia-frmrak/30min',
  followUpUrl: 'https://cal.com/staff-sintropia-frmrak/30min',
  contactUrl: 'https://guiaexistencialpsic.com/contact/',
};
// Session agreements shown beside the booking calendar. `summary` is the short line in the sidebar.
export const bookingPolicies = [
 { title: 'Cancelaciones y cambios', summary: 'Cambios con 24 h de aviso; fuera de plazo, $200 MXN', text: 'En caso de no poder asistir, te pedimos avisar con al menos 24 horas de anticipación. Cualquier cancelación o reprogramación fuera de este plazo genera un cargo de $200 MXN.' },
 { title: 'Inasistencias', summary: 'Sin aviso previo se cobra la sesión completa', text: 'La ausencia sin aviso previo conlleva el cobro completo de la sesión.' },
 { title: 'Puntualidad', summary: '10 min de tolerancia', text: 'Las sesiones duran 60 minutos. Contamos con un periodo de tolerancia de 10 minutos; pasado este tiempo, la sesión deberá reprogramarse aplicando la tarifa de cancelación ($200 MXN).' },
];
export const topics = [
 { title: 'Ansiedad y estrés', text: 'Herramientas para una vida más tranquila y presente.', color: 'sage', detail: 'Un espacio para comprender la relación entre lo que piensas, sientes y haces, e identificar patrones que mantienen el malestar. El trabajo se orienta a desarrollar habilidades para tu vida diaria.' },
 { title: 'Relaciones y vínculos', text: 'Construye relaciones más sanas y auténticas.', color: 'blush', detail: 'Explora formas de relacionarte que se repiten, comprende cómo se construyeron y trabaja en respuestas más útiles para tus necesidades y vínculos actuales.' },
 { title: 'Cambios y sentido de vida', text: 'Encuentra claridad en nuevas etapas.', color: 'sand', detail: 'Reconoce lo que importa para ti y explora acciones alineadas con tus valores, incluso cuando hay incertidumbre o emociones difíciles.' },
];
export const team = [
 { name: 'Jessica Barragán', initials: 'JB', avatar: 'jessica', role: 'Maestra en Terapia Cognitivo-Conductual', note: 'Fundadora de Guía Existencial. Formación en Terapia de Esquemas, ACT y DBT.' },
 { name: 'Lariza Jiménez', initials: 'LJ', avatar: 'lariza', role: 'Especialista en Terapia de Esquemas', note: 'Formación adicional en ACT. Su enfoque aborda los patrones que se formaron temprano y siguen presentes.' },
 { name: 'Lourdes Huidor', initials: 'LH', avatar: 'lourdes', role: 'Especialista en Terapia de Aceptación y Compromiso', note: 'Formación en ACT, Mindfulness y Análisis Funcional de la Conducta.' },
];
