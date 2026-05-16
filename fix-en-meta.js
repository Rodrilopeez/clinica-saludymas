// Fix page-specific meta titles, descriptions, OG tags, Twitter tags, JSON-LD in /en/ files
const fs = require('fs');
const path = require('path');
const enDir = path.join(__dirname, 'en');

function replaceAll(str, map) {
  let result = str;
  for (const [from, to] of map) {
    result = result.split(from).join(to);
  }
  return result;
}

// Per-file replacement maps
const fileMaps = {

  'belleza.html': [
    ['<title>Belleza y Estética en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Beauty and Aesthetics in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Belleza y Estética en Boadilla del Monte | Clínica Salud y Más"', 'content="Beauty and Aesthetics in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Belleza y Estética en Boadilla del Monte — Clínica Salud y Más"', '"name": "Beauty and Aesthetics in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Centro de estética y belleza en Boadilla del Monte. Tratamientos faciales, corporales y asesoría de imagen con tecnología avanzada. Centro CS 10443."', 'content="Aesthetics and beauty center in Boadilla del Monte. Facial, body treatments and image consulting with advanced technology. Health Center CS 10443."'],
    ['content="Centro de estética en Boadilla del Monte. Tratamientos faciales y corporales con tecnología avanzada."', 'content="Aesthetics center in Boadilla del Monte. Facial and body treatments with advanced technology."'],
  ],

  'clases.html': [
    ['<title>Clases de Yoga y Pilates en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Yoga and Pilates Classes in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Clases de Yoga y Pilates en Boadilla del Monte | Clínica Salud y Más"', 'content="Yoga and Pilates Classes in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Clases de Yoga y Pilates en Boadilla del Monte — Clínica Salud y Más"', '"name": "Yoga and Pilates Classes in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Clases de yoga, pilates y meditación en Boadilla del Monte. Grupos reducidos con instructores certificados. Centro Sanitario CS 10443."', 'content="Yoga, pilates and meditation classes in Boadilla del Monte. Small groups with certified instructors. Health Center CS 10443."'],
  ],

  'coaching.html': [
    ['<title>Coaching en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Coaching in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Coaching en Boadilla del Monte | Clínica Salud y Más"', 'content="Coaching in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Coaching en Boadilla del Monte — Clínica Salud y Más"', '"name": "Coaching in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Coaching personal y profesional en Boadilla del Monte. Desarrollo personal, liderazgo y gestión del cambio con coaches certificados. Centro CS 10443."', 'content="Personal and professional coaching in Boadilla del Monte. Personal development, leadership and change management with certified coaches. Health Center CS 10443."'],
    ['content="Coaching personal y profesional en Boadilla del Monte. Desarrollo personal con coaches certificados."', 'content="Personal and professional coaching in Boadilla del Monte. Personal development with certified coaches."'],
  ],

  'contacto.html': [
    ['<title>Contacto y Citas | Clínica Salud y Más — Boadilla del Monte</title>', '<title>Contact and Appointments | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['content="Contacto y Citas | Clínica Salud y Más — Boadilla"', 'content="Contact and Appointments | Clínica Salud y Más — Boadilla"'],
    ['"name": "Contacto y Citas — Clínica Salud y Más"', '"name": "Contact and Appointments — Clínica Salud y Más"'],
    ['content="Contacta con Clínica Salud y Más en Boadilla del Monte. Pide cita online, llámanos al 91 715 38 44 o visítanos en C/ Isabel de Farnesio 2. Primera consulta gratuita. CS 10443."', 'content="Contact Clínica Salud y Más in Boadilla del Monte. Book online, call us at 91 715 38 44 or visit us at C/ Isabel de Farnesio 2. Free first consultation. Health Center CS 10443."'],
  ],

  'medicina-natural.html': [
    ['<title>Medicina Natural y Acupuntura en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Natural Medicine and Acupuncture in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Medicina Natural y Acupuntura en Boadilla del Monte | Clínica Salud y Más"', 'content="Natural Medicine and Acupuncture in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Acupuntura y Medicina Natural en Boadilla del Monte — Clínica Salud y Más"', '"name": "Acupuncture and Natural Medicine in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Acupuntura y Medicina Tradicional China en Boadilla del Monte. Tratamientos naturales para el equilibrio cuerpo-mente. Centro Sanitario CS 10443."', 'content="Acupuncture and Traditional Chinese Medicine in Boadilla del Monte. Natural treatments for body-mind balance. Health Center CS 10443."'],
    ['content="Acupuntura y Medicina Tradicional China en Boadilla del Monte. Equilibrio cuerpo-mente con terapias milenarias."', 'content="Acupuncture and Traditional Chinese Medicine in Boadilla del Monte. Body-mind balance with ancient therapies."'],
  ],

  'noticias.html': [
    ['<title>Blog de Salud y Bienestar | Clínica Salud y Más</title>', '<title>Health and Wellness Blog | Clínica Salud y Más</title>'],
    ['content="Blog de Salud y Bienestar | Clínica Salud y Más"', 'content="Health and Wellness Blog | Clínica Salud y Más"'],
    ['"name": "Blog de Salud y Bienestar — Clínica Salud y Más"', '"name": "Health and Wellness Blog — Clínica Salud y Más"'],
    ['content="Artículos y consejos sobre salud mental, bienestar emocional, desarrollo personal y vida saludable en el blog de Clínica Salud y Más en Boadilla del Monte."', 'content="Articles and tips on mental health, emotional wellbeing, personal development and healthy living on the Clínica Salud y Más blog in Boadilla del Monte."'],
    ['content="Artículos sobre salud mental, bienestar y desarrollo personal en el blog de Clínica Salud y Más."', 'content="Articles on mental health, wellbeing and personal development on the Clínica Salud y Más blog."'],
  ],

  'nutricion.html': [
    ['<title>Nutrición en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Nutrition in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Nutrición en Boadilla del Monte | Clínica Salud y Más"', 'content="Nutrition in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Nutrición en Boadilla del Monte — Clínica Salud y Más"', '"name": "Nutrition in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Nutricionistas en Boadilla del Monte. Planes de alimentación personalizados, nutrición deportiva y alimentación consciente. Centro Sanitario CS 10443."', 'content="Nutritionists in Boadilla del Monte. Personalized meal plans, sports nutrition and mindful eating. Health Center CS 10443."'],
    ['content="Nutricionistas en Boadilla del Monte. Alimentación consciente y planes personalizados para tu salud."', 'content="Nutritionists in Boadilla del Monte. Mindful eating and personalized plans for your health."'],
  ],

  'precios.html': [
    ['<title>Precios y Tarifas | Clínica Salud y Más — Boadilla del Monte</title>', '<title>Prices and Rates | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['content="Precios y Tarifas | Clínica Salud y Más — Boadilla"', 'content="Prices and Rates | Clínica Salud y Más — Boadilla"'],
    ['"name": "Precios y Tarifas — Clínica Salud y Más"', '"name": "Prices and Rates — Clínica Salud y Más"'],
    ['content="Consulta los precios y tarifas de Clínica Salud y Más en Boadilla del Monte. Primera consulta gratuita. Bonos y packs disponibles. Centro Sanitario CS 10443."', 'content="Check the prices and rates of Clínica Salud y Más in Boadilla del Monte. Free first consultation. Packages and packs available. Health Center CS 10443."'],
    ['content="Consulta nuestros precios y tarifas en Boadilla del Monte. Primera consulta gratuita. Bonos disponibles."', 'content="Check our prices and rates in Boadilla del Monte. Free first consultation. Packages available."'],
  ],

  'profesionales.html': [
    ['<title>Nuestro Equipo Profesional | Clínica Salud y Más — Boadilla</title>', '<title>Our Professional Team | Clínica Salud y Más — Boadilla</title>'],
    ['content="Nuestro Equipo Profesional | Clínica Salud y Más — Boadilla"', 'content="Our Professional Team | Clínica Salud y Más — Boadilla"'],
    ['"name": "Equipo Profesional — Clínica Salud y Más"', '"name": "Professional Team — Clínica Salud y Más"'],
    ['content="Conoce a nuestro equipo multidisciplinar en Boadilla del Monte. Psicólogos, fisioterapeutas, nutricionistas, acupuntores y coaches con visión integral de la salud. Centro CS 10443."', 'content="Meet our multidisciplinary team in Boadilla del Monte. Psychologists, physiotherapists, nutritionists, acupuncturists and coaches with a comprehensive health vision. Health Center CS 10443."'],
    ['content="Equipo multidisciplinar en Boadilla del Monte. Psicólogos, fisioterapeutas, nutricionistas y coaches."', 'content="Multidisciplinary team in Boadilla del Monte. Psychologists, physiotherapists, nutritionists and coaches."'],
    // Fix typo in original (acupuntores → acupuncturists) — already handled above
  ],

  'psicoeducativa.html': [
    ['<title>Intervención Psicoeducativa en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Psychoeducational Intervention in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Intervención Psicoeducativa en Boadilla del Monte | Clínica Salud y Más"', 'content="Psychoeducational Intervention in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Intervención Psicoeducativa en Boadilla del Monte — Clínica Salud y Más"', '"name": "Psychoeducational Intervention in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Intervención psicoeducativa en Boadilla del Monte. Dificultades de aprendizaje, TDAH y desarrollo cognitivo infantil. Centro Sanitario CS 10443."', 'content="Psychoeducational intervention in Boadilla del Monte. Learning difficulties, ADHD and child cognitive development. Health Center CS 10443."'],
    ['content="Intervención psicoeducativa en Boadilla del Monte. Apoyo para dificultades de aprendizaje y TDAH."', 'content="Psychoeducational intervention in Boadilla del Monte. Support for learning difficulties and ADHD."'],
  ],

  'psicologia.html': [
    ['<title>Psicología en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Psychology in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Psicología en Boadilla del Monte | Clínica Salud y Más"', 'content="Psychology in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Psicología en Boadilla del Monte — Clínica Salud y Más"', '"name": "Psychology in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Psicólogos en Boadilla del Monte. Terapia cognitivo-conductual, sistémica y mindfulness para niños, adolescentes y adultos. Centro Sanitario CS 10443. Pide cita online."', 'content="Psychologists in Boadilla del Monte. Cognitive-behavioral, systemic and mindfulness therapy for children, adolescents and adults. Health Center CS 10443. Book online."'],
    ['content="Psicólogos en Boadilla del Monte. Terapia para todas las edades con enfoque integral. Centro Sanitario CS 10443."', 'content="Psychologists in Boadilla del Monte. Therapy for all ages with a comprehensive approach. Health Center CS 10443."'],
  ],

  'tratamiento-manual.html': [
    ['<title>Fisioterapia y Osteopatía en Boadilla del Monte | Clínica Salud y Más</title>', '<title>Physiotherapy and Osteopathy in Boadilla del Monte | Clínica Salud y Más</title>'],
    ['content="Fisioterapia y Osteopatía en Boadilla del Monte | Clínica Salud y Más"', 'content="Physiotherapy and Osteopathy in Boadilla del Monte | Clínica Salud y Más"'],
    ['"name": "Fisioterapia y Osteopatía en Boadilla del Monte — Clínica Salud y Más"', '"name": "Physiotherapy and Osteopathy in Boadilla del Monte — Clínica Salud y Más"'],
    ['content="Fisioterapia, osteopatía y tratamiento manual en Boadilla del Monte. Técnicas avanzadas para dolor de espalda, lesiones y rehabilitación. Centro CS 10443."', 'content="Physiotherapy, osteopathy and manual treatment in Boadilla del Monte. Advanced techniques for back pain, injuries and rehabilitation. Health Center CS 10443."'],
    ['content="Fisioterapeutas y osteópatas en Boadilla del Monte. Tratamiento manual avanzado para dolor y lesiones."', 'content="Physiotherapists and osteopaths in Boadilla del Monte. Advanced manual treatment for pain and injuries."'],
  ],

  'ubicacion.html': [
    ['<title>Ubicación y Contacto | Clínica Salud y Más — Boadilla del Monte</title>', '<title>Location and Contact | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['"name": "Ubicación — Clínica Salud y Más"', '"name": "Location — Clínica Salud y Más"'],
    ['content="Encuentra Clínica Salud y Más en C/ Isabel de Farnesio 2, 28660 Boadilla del Monte, Madrid. Mapa, horario y cómo llegar. Centro Sanitario CS 10443."', 'content="Find Clínica Salud y Más at C/ Isabel de Farnesio 2, 28660 Boadilla del Monte, Madrid. Map, opening hours and how to get here. Health Center CS 10443."'],
  ],

  'videoconsulta.html': [
    ['<title>Videoconsulta Online | Clínica Salud y Más</title>', '<title>Online Video Consultation | Clínica Salud y Más</title>'],
    ['content="Videoconsulta Online | Clínica Salud y Más"', 'content="Online Video Consultation | Clínica Salud y Más"'],
    ['"name": "Videoconsulta Online — Clínica Salud y Más"', '"name": "Online Video Consultation — Clínica Salud y Más"'],
    ['content="Consulta online con profesionales de Clínica Salud y Más. Psicología, coaching y nutrición por videollamada con total privacidad. Tu salud, estés donde estés."', 'content="Online consultation with Clínica Salud y Más professionals. Psychology, coaching and nutrition via video call with complete privacy. Your health, wherever you are."'],
    ['content="Psicología, coaching y nutrición por videollamada con total privacidad. Tu salud, estés donde estés."', 'content="Psychology, coaching and nutrition via video call with complete privacy. Your health, wherever you are."'],
  ],
};

let totalFiles = 0;
let totalReplacements = 0;

Object.entries(fileMaps).forEach(([filename, replacements]) => {
  const fp = path.join(enDir, filename);
  if (!fs.existsSync(fp)) {
    console.log('SKIP (not found): ' + filename);
    return;
  }
  let content = fs.readFileSync(fp, 'utf8');
  const newContent = replaceAll(content, replacements);
  if (newContent !== content) {
    fs.writeFileSync(fp, newContent);
    console.log('FIXED: ' + filename + ' (' + replacements.length + ' replacements)');
    totalFiles++;
    totalReplacements += replacements.length;
  } else {
    console.log('SKIP (no changes): ' + filename);
  }
});

console.log('\nDone. Fixed ' + totalFiles + ' files with ' + totalReplacements + ' replacements.');
