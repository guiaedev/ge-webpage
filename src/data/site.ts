export const site = {
  name: 'Guía Existencial',
  // Production origin: canonical URLs, sitemap and share image are built from it.
  url: 'https://guiaexistencialpsic.com',
  instagram: 'https://www.instagram.com/guiaexistencial/',
  facebook: 'https://www.facebook.com/people/Guia-existencial/61579915014721/',
  description: 'Psicoterapia en línea basada en evidencia y atención personalizada. Un espacio para comprenderte y encontrar dirección.',
  // Public Cal.com events shown in the booking modal's two tabs (Guía Existencial's own account).
  // Both currently use the 30-min event; set followUpUrl once a follow-up event exists.
  bookingUrl: 'https://cal.com/guia-existencial-ghxaew/30min',
  followUpUrl: 'https://cal.com/guia-existencial-ghxaew/30min',
  contactUrl: 'https://guiaexistencialpsic.com/contact/',
  contactEmail: 'guiae.dev@gmail.com',
  // WhatsApp number for the FAQ's «¿Otra pregunta?» button: digits only, with the
  // country code (Mexico mobile: 52 + 10 digits). Empty uses the contact email.
  whatsapp: '',
};
// Session agreements shown beside the booking calendar. `summary` is the short line in the sidebar.
export const bookingPolicies = [
 { title: 'Cancelaciones y cambios', summary: 'Cambios con 24 h de aviso; fuera de plazo, $200 MXN', text: 'En caso de no poder asistir, te pedimos avisar con al menos 24 horas de anticipación. Cualquier cancelación o reprogramación fuera de este plazo genera un cargo de $200 MXN.' },
 { title: 'Inasistencias', summary: 'Sin aviso previo se cobra la sesión completa', text: 'La ausencia sin aviso previo conlleva el cobro completo de la sesión.' },
 { title: 'Puntualidad', summary: '10 min de tolerancia', text: 'Las sesiones duran 60 minutos. Contamos con un periodo de tolerancia de 10 minutos; pasado este tiempo, la sesión deberá reprogramarse aplicando la tarifa de cancelación ($200 MXN).' },
 { title: 'Facturación', summary: 'Factura dentro del mismo mes del pago', text: 'Si necesitas factura, solicítala dentro del mismo mes en que realizaste el pago y a más tardar 3 días antes de que termine el mes. Envíanos tu Constancia de Situación Fiscal (RFC, nombre o razón social, régimen fiscal y código postal) y el uso de CFDI. Después de ese plazo ya no es posible emitir la factura.' },
];
// Free downloadable resources shown in "Recursos". Put each PDF in public/assets/recursos/ and set `file`;
// set `image` once its illustration exists. Without a file (or `url`, for link cards) the card shows "Próximamente".
export const resources = [
 { title: 'Diario de gratitud', description: 'Un espacio breve cada día para notar lo que sí está presente y entrenar la atención hacia lo que te sostiene.', format: 'PDF imprimible', file: 'diario-de-gratitud-guia-existencial.pdf', image: 'recursos/diario-de-gratitud-preview.webp', tone: 'oat' },
 { title: 'Ejercicio de motivación al cambio', description: 'Preguntas guiadas para explorar qué quieres cambiar, por qué te importa y cuál puede ser tu primer paso.', format: 'PDF imprimible', file: 'motivacion-al-cambio.pdf', image: 'recursos/motivacion-al-cambio-preview.webp', tone: 'blush' },
 // Link card: `url` opens in a new tab.
 { title: 'Síguenos en Instagram', description: 'Psicología basada en evidencia, explicada en lenguaje claro para tu día a día.', format: 'Instagram', url: 'https://www.instagram.com/guiaexistencial/', image: 'recursos/instagram-no-plant-v3-720.webp', tone: 'sand' },
];
// Topic card illustrations live in public/assets/topics/.
export const topics = [
 { title: 'Ansiedad y estrés', text: 'Herramientas para una vida más tranquila y presente.', image: 'topics/ansiedad-no-plants-v6.webp', color: 'sage', detail: 'Un espacio para comprender la relación entre lo que piensas, sientes y haces, e identificar patrones que mantienen el malestar. El trabajo se orienta a desarrollar habilidades para tu vida diaria.' },
 { title: 'Relaciones y vínculos', text: 'Construye relaciones más sanas y auténticas.', image: 'topics/relaciones-no-plants-v4.webp', color: 'blush', detail: 'Explora formas de relacionarte que se repiten, comprende cómo se construyeron y trabaja en respuestas más útiles para tus necesidades y vínculos actuales.' },
 { title: 'Cambios y sentido de vida', text: 'Encuentra claridad en nuevas etapas.', image: 'topics/cambios-character-v2.webp', color: 'sand', detail: 'Reconoce lo que importa para ti y explora acciones alineadas con tus valores, incluso cuando hay incertidumbre o emociones difíciles.' },
 { title: 'Depresión y estado de ánimo', text: 'Recupera actividad, interés y dirección.', image: 'topics/depresion-soft-v3.webp', color: 'sage', detail: 'Un espacio para comprender cómo se mantiene el bajo estado de ánimo: la relación entre lo que piensas, lo que dejas de hacer y cómo te sientes. El trabajo se orienta a retomar, paso a paso, actividades que tengan sentido para ti.' },
 { title: 'Alimentación e imagen corporal', text: 'Comprende tu relación con la comida y con tu cuerpo.', image: 'topics/alimentacion-no-plants-v4.webp', color: 'blush', detail: 'Un espacio para entender los pensamientos, emociones y conductas alrededor de la comida, el peso y la imagen corporal, e intervenir sobre los patrones que mantienen el malestar. Si tu proceso lo requiere, te orientamos para integrar a otros profesionales de la salud.' },
 { title: 'Emociones intensas', text: 'Habilidades para regular lo que sientes.', image: 'topics/emociones-no-plants-v4.webp', color: 'sand', detail: 'Un espacio para quienes viven sus emociones con mucha intensidad y sienten que las rebasan. El trabajo se orienta a desarrollar habilidades para regularlas, tolerar el malestar y relacionarte de forma más efectiva.' },
];
// `bookingUrl`: the therapist's own Cal.com session event (https://cal.com/…). Once at least one is set,
// the booking window starts by choosing a therapist; empty ones are left out of that step.
export const team = [
 { name: 'Jessica Barragán', initials: 'JB', avatar: 'jessica', specialty: 'Terapia Cognitivo Conductual', bookingUrl: '', role: 'Maestra en Terapia Cognitivo-Conductual', note: 'Fundadora de Guía Existencial. Formación en Terapia de Esquemas, ACT y DBT.',
   // `profile` adds «Conocer más» to the home card and opens this text in a dialog.
   profile: {
    title: 'Psic. Jessica Barragán',
    subtitle: 'Fundadora y directora · Terapia Cognitivo Conductual (TCC)',
    quote: 'Reaccionamos a las situaciones por lo que creemos de ellas, no por la situación en sí. Entender ese mecanismo, y aprender a intervenirlo, es el centro de mi trabajo.',
    bio: [
     'Soy psicóloga clínica y fundadora de Guía Existencial. Estudié Psicología en la Universidad de Guadalajara y la Maestría en Psicoterapia Cognitivo Conductual en el Centro de Psicoterapia Cognitiva. Tengo más de ocho años de práctica clínica con personas adultas, principalmente en ansiedad, depresión, trastornos de la conducta alimentaria y trastornos de la personalidad. Antes de la consulta privada, trabajé como psicóloga clínica en la Unidad Especializada en Violencia Intrafamiliar y de Género.',
     'Trabajo desde la Terapia Cognitivo Conductual y la complemento con formación en Terapia de Esquemas, ACT y Mindfulness, Activación Conductual, Psiconutrición y habilidades de DBT. Mi forma de trabajar es colaborativa y transparente: te explico qué hacemos y por qué, para que entiendas cómo funcionan tus pensamientos, emociones y conductas, y te lleves herramientas que puedas usar fuera de sesión.',
    ],
    focus: ['Ansiedad', 'Depresión', 'Conducta alimentaria', 'Trastornos de la personalidad'],
    closing: 'Si quieres entender qué te está pasando y trabajarlo con un método claro, puedes agendar una primera sesión conmigo.',
    cta: 'Agendar con Jessica',
   } },
 { name: 'Lariza Jiménez', initials: 'LJ', avatar: 'lariza', specialty: 'Terapia de Esquemas', bookingUrl: '', role: 'Especialista en Terapia de Esquemas', note: 'Formación adicional en ACT. Su enfoque aborda los patrones que se formaron temprano y siguen presentes.',
   profile: {
    title: 'Psic. Lariza Jiménez',
    subtitle: 'Especialidad: Terapia de Esquemas',
    bio: [
     'Soy psicóloga clínica, egresada de la Universidad de Guadalajara, con siete años de experiencia acompañando a personas adultas en sus procesos terapéuticos. Cuento con formación especializada y certificación en Terapia de Esquemas, un modelo que permite comprender cómo las experiencias tempranas y las necesidades emocionales influyen en los patrones que repetimos a lo largo de la vida.',
     'Mi práctica integra una mirada contextual y cognitivo-conductual, con herramientas basadas en la evidencia científica. Me interesa ayudar a las personas a comprender su historia, transformar patrones que les generan malestar y construir relaciones más saludables consigo mismas y con los demás.',
     'Me apasiona crear espacios y recursos que acerquen la psicología a la vida cotidiana de una forma clara, amorosa y práctica, porque creo que comprendernos no tiene por qué ser complicado y que el cambio puede comenzar con pequeños pasos.',
     'Mi trabajo parte de una convicción: lo humano siempre va primero. Creo que la terapia es un espacio seguro para mirar con honestidad aquello que duele, reconocer lo que necesitamos y descubrir nuevas formas de cuidarnos, sin juicios y a nuestro propio ritmo.',
    ],
    focus: ['Patrones que se repiten', 'Necesidades emocionales', 'Relaciones'],
    cta: 'Agendar con Lariza',
   } },
 { name: 'Lourdes Huidor', initials: 'LH', avatar: 'lourdes', specialty: 'Terapia de Aceptación y Compromiso', bookingUrl: '', role: 'Especialista en Terapia de Aceptación y Compromiso', note: 'Formación en ACT, Mindfulness y Análisis Funcional de la Conducta.',
   profile: {
    title: 'Psic. Lourdes Huidor',
    subtitle: 'Especialidad: Terapia de Aceptación y Compromiso (ACT)',
    quote: 'A veces no necesitas que alguien te diga qué hacer: necesitas un espacio para entender qué te está pasando y qué te importa de verdad. Ahí es donde puedo acompañarte.',
    bio: [
     'Soy psicóloga contextual y tengo más de siete años de experiencia atendiendo a adolescentes y adultos, en línea y de forma presencial, desde la Terapia de Aceptación y Compromiso (ACT). Mi mirada es honesta y sencilla: no siempre podemos controlar lo que sentimos, pero sí podemos cambiar nuestra relación con ello y dar pasos hacia lo que valoramos.',
     'He creado talleres y conferencias sobre ansiedad, manejo emocional, duelos y violencia de género, y acompaño a madres y padres en temas de crianza. Creo que nada ocurre en el vacío: cada historia se comprende en su contexto, sin juicio y sin prisa.',
     'Me mantengo en formación continua en ACT, Mindfulness, Análisis Funcional de la Conducta y terapias contextuales.',
    ],
    focus: ['Ansiedad', 'Manejo emocional', 'Duelos', 'Crianza'],
    closing: 'Si ya has intentado entenderte y quieres pasar a la acción con acompañamiento, puedes agendar una primera sesión conmigo.',
    cta: 'Agendar con Lourdes',
   } },
 // home: false keeps a person on the Nosotras strip only (no watercolor avatar or bio card on the home page yet).
 { name: 'Laura Elena de Luna Velasco', initials: 'LL', avatar: 'laura', specialty: 'Terapia Dialéctica Conductual', bookingUrl: '', role: 'Especialista en Terapia Dialéctica Conductual (DBT)', note: 'Doctora en Psicología. Formada en el programa DBT-MX-AU; investiga intervenciones DBT para la prevención del suicidio.', home: true,
   profile: {
    title: 'Psic. Laura Elena De Luna Velasco',
    subtitle: 'Especialidad: Terapia Dialéctica Conductual (DBT)',
    quote: 'Cuando las emociones se sienten demasiado intensas, no necesitas que alguien te diga que te calmes: necesitas habilidades concretas para regularlas.',
    bio: [
     'Soy psicóloga clínica, egresada de la Universidad de Guadalajara y doctora en Psicología con orientación en Calidad de Vida y Salud en el Centro Universitario del Sur. Desde hace más de cinco años trabajo con personas adultas desde la Terapia Dialéctica Conductual (DBT), un modelo pensado para quienes viven sus emociones con mucha intensidad y les cuesta regularlas, sostener sus relaciones o tolerar el malestar sin actuar de formas que después lamentan.',
     'Me formé en el programa DBT-MX-AU en la Universidad Autónoma de Aguascalientes, y he investigado y publicado sobre intervenciones DBT para la prevención del suicidio. Esa trayectoria me da algo que considero esencial en terapia: saber qué funciona, por qué y para quién.',
     'En sesión trabajo con un equilibrio entre validación y cambio: reconocer que lo que sientes tiene sentido y, al mismo tiempo, aprender a responder de otra manera.',
    ],
    focus: ['Regulación emocional', 'Relaciones', 'Tolerancia al malestar'],
    closing: 'Si sientes que tus emociones te rebasan y quieres herramientas para manejarlas, puedes agendar una primera sesión conmigo.',
    cta: 'Agendar con Laura',
   } },
];
