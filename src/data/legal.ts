// MOCK DATA — every value marked [EJEMPLO] is a placeholder. Replace with the practice's real
// information (cédulas, responsible party, legal texts reviewed by a lawyer) before publishing.
export const legal = {
  mock: true,
  responsible: 'Guía Existencial [EJEMPLO]',
  address: 'Calle Ejemplo 123, Col. Centro, C.P. 00000, Ciudad de México [EJEMPLO]',
  privacyEmail: 'privacidad@ejemplo.com',
  updated: '26 de septiembre de 2026',
  // Keyed by the team member's name in site.ts.
  cedulas: {
    'Jessica Barragán': '0000000',
    'Lariza Jiménez': '0000000',
    'Lourdes Huidor': '0000000',
  } as Record<string, string>,
  // Taken verbatim from the current contact page (guiaexistencialpsic.com/contact).
  crisis: 'Este medio no es para atención de emergencias. Si estás en una situación de crisis, comunícate a la Línea de la Vida: 800 911 2000 (disponible 24/7) o al 911.',
};

export const legalPages = [
  { slug: 'aviso-de-privacidad', label: 'Aviso de privacidad' },
  { slug: 'terminos', label: 'Términos del servicio' },
  { slug: 'consentimiento', label: 'Consentimiento informado' },
];

type Section = { title: string; body: string[] };
export const legalContent: Record<string, { title: string; intro: string; sections: Section[] }> = {
  'aviso-de-privacidad': {
    title: 'Aviso de privacidad',
    intro: `${legal.responsible}, con domicilio en ${legal.address}, es responsable del tratamiento de tus datos personales.`,
    sections: [
      { title: 'Datos que recabamos', body: ['Datos de identificación y contacto (nombre, correo electrónico, teléfono) y, durante la atención, datos sensibles relacionados con tu salud emocional.'] },
      { title: 'Finalidades', body: ['Agendar y brindar el servicio de psicoterapia, dar seguimiento clínico y comunicarnos contigo sobre tus sesiones.'] },
      { title: 'Consentimiento para datos sensibles', body: ['Los datos de salud se tratan únicamente con tu consentimiento expreso y por escrito, y bajo estricta confidencialidad profesional.'] },
      { title: 'Derechos ARCO', body: [`Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos escribiendo a ${legal.privacyEmail}.`] },
    ],
  },
  terminos: {
    title: 'Términos del servicio',
    intro: 'Estas condiciones describen cómo funciona la psicoterapia en línea de Guía Existencial.',
    sections: [
      { title: 'Naturaleza del servicio', body: ['Psicoterapia en línea con modelos basados en evidencia, a cargo de profesionales con cédula profesional vigente.'] },
      { title: 'Sesiones y reagendado', body: ['Las condiciones de duración, reagendado y cancelación se confirman al coordinar tu primera sesión.'] },
      { title: 'Emergencias', body: [legal.crisis] },
    ],
  },
  consentimiento: {
    title: 'Consentimiento informado',
    intro: 'Antes de iniciar, es importante que conozcas en qué consiste el proceso y tus derechos como paciente.',
    sections: [
      { title: 'El proceso terapéutico', body: ['La terapia es un proceso colaborativo. Tu terapeuta te explicará el enfoque, los objetivos y la duración estimada.'] },
      { title: 'Confidencialidad', body: ['Lo que compartes es confidencial, salvo en los casos de riesgo para tu vida o la de terceros que establece la ley.'] },
      { title: 'Tu participación es voluntaria', body: ['Puedes hacer preguntas, pausar o concluir el proceso en cualquier momento.'] },
    ],
  },
};
