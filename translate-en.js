// English translation script for Clinica Salud y Mas
// Run: node translate-en.js
const fs = require('fs');
const path = require('path');
const en = path.join(__dirname, 'en');
const files = fs.readdirSync(en).filter(f => f.endsWith('.html'));

function replaceAll(str, map) {
  for (const [from, to] of map) {
    if (str.includes(from)) {
      str = str.split(from).join(to);
    }
  }
  return str;
}

let total = 0;
files.forEach(f => {
  const fp = path.join(en, f);
  let c = fs.readFileSync(fp, 'utf8');

  // ============================================================
  // 0. HTML lang attribute
  // ============================================================
  c = c.replace('<html lang="es">', '<html lang="en">');

  // ============================================================
  // 1. PATHS: Fix relative CSS/JS references for /en/ subdirectory
  // ============================================================
  c = replaceAll(c, [
    ['href="css/style.css"', 'href="../css/style.css"'],
    ['src="js/main.js"', 'src="../js/main.js"'],
  ]);

  // ============================================================
  // 2. CANONICAL URL + OG + Twitter: Point to /en/ version
  // ============================================================
  c = c.replace(/<link rel="canonical" href="https:\/\/rodrilopeez\.github\.io\/clinica-saludymas\//g,
    '<link rel="canonical" href="https://rodrilopeez.github.io/clinica-saludymas/en/');
  c = c.replace(/<meta property="og:url" content="https:\/\/rodrilopeez\.github\.io\/clinica-saludymas\//g,
    '<meta property="og:url" content="https://rodrilopeez.github.io/clinica-saludymas/en/');
  c = c.replace(/<meta name="twitter:title" content="([^"]+) \| /g,
    '<meta name="twitter:title" content="$1 | '); // Fixed below

  // Fix og:locale
  c = c.replace('content="es_ES"', 'content="en_GB"');

  // ============================================================
  // 3. META TAGS + TITLES: English SEO
  // ============================================================
  c = replaceAll(c, [
    // Generic meta
    ['<title>Clínica Salud y Más | Salud Integral en Boadilla del Monte</title>',
     '<title>Clínica Salud y Más | Integral Health in Boadilla del Monte</title>'],
    ['content="Clínica Salud y Más — Centro de salud integral en Boadilla del Monte. Psicología, fisioterapia, nutrición, acupuntura, coaching y más. Primera consulta gratuita. Centro Sanitario CS 10443."',
     'content="Integral health center in Boadilla del Monte, Madrid. Psychology, physiotherapy, nutrition, acupuncture, coaching and more. Free first consultation. Registered Health Center CS 10443."'],
    ['content="clínica salud integral, Boadilla del Monte, psicología, fisioterapia, nutrición, acupuntura, coaching, salud mental, bienestar"',
     'content="integral health clinic, Boadilla del Monte, psychology, physiotherapy, nutrition, acupuncture, coaching, mental health, wellness"'],
    ['content="Clínica Salud y Más | Salud Integral en Boadilla del Monte"',
     'content="Clínica Salud y Más | Integral Health in Boadilla del Monte"'],

    // Terapias page meta
    ['<title>Terapias | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Therapies | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['content="Descubre todas las terapias de Clínica Salud y Más: psicología, coaching, fisioterapia, osteopatía, nutrición, acupuntura, belleza, intervención psicoeducativa, yoga y pilates en Boadilla del Monte."',
     'content="Discover all therapies at Clínica Salud y Más: psychology, coaching, physiotherapy, osteopathy, nutrition, acupuncture, beauty, psychoeducational intervention, yoga and pilates in Boadilla del Monte."'],
    ['content="Todas las terapias de Clínica Salud y Más en Boadilla del Monte. Psicología, fisioterapia, nutrición, acupuntura y más."',
     'content="All therapies at Clínica Salud y Más in Boadilla del Monte. Psychology, physiotherapy, nutrition, acupuncture and more."'],
    ['<meta property="og:title" content="Terapias | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Therapies | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Terapias | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Therapies | Clínica Salud y Más — Boadilla del Monte">'],

    // Page-level meta titles (various pages)
    ['<title>Psicología | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Psychology | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Coaching | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Coaching | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Tratamiento Manual | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Manual Treatment | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Nutrición | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Nutrition | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Belleza | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Beauty | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Medicina Natural | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Natural Medicine | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Intervención Psicoeducativa | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Psychoeducational Intervention | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Clases | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Classes | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Profesionales | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Professionals | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Videoconsulta | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Video Consultation | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Noticias | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>News | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Precios | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Prices | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Ubicación | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Location | Clínica Salud y Más — Boadilla del Monte</title>'],
    ['<title>Contacto | Clínica Salud y Más — Boadilla del Monte</title>',
     '<title>Contact | Clínica Salud y Más — Boadilla del Monte</title>'],

    // OG titles for pages
    ['<meta property="og:title" content="Psicología | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Psychology | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Coaching | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Coaching | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Tratamiento Manual | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Manual Treatment | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Nutrición | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Nutrition | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Belleza | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Beauty | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Medicina Natural | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Natural Medicine | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Intervención Psicoeducativa | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Psychoeducational Intervention | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Clases | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Classes | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Profesionales | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Professionals | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Videoconsulta | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Video Consultation | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Noticias | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="News | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Precios | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Prices | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Ubicación | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Location | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta property="og:title" content="Contacto | Clínica Salud y Más — Boadilla del Monte">',
     '<meta property="og:title" content="Contact | Clínica Salud y Más — Boadilla del Monte">'],

    // Twitter titles
    ['<meta name="twitter:title" content="Psicología | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Psychology | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Coaching | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Coaching | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Tratamiento Manual | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Manual Treatment | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Nutrición | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Nutrition | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Belleza | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Beauty | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Medicina Natural | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Natural Medicine | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Intervención Psicoeducativa | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Psychoeducational Intervention | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Clases | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Classes | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Profesionales | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Professionals | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Videoconsulta | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Video Consultation | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Noticias | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="News | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Precios | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Prices | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Ubicación | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Location | Clínica Salud y Más — Boadilla del Monte">'],
    ['<meta name="twitter:title" content="Contacto | Clínica Salud y Más — Boadilla del Monte">',
     '<meta name="twitter:title" content="Contact | Clínica Salud y Más — Boadilla del Monte">'],

    // OG description page variants
    ['content="Centro de salud integral en Boadilla del Monte. Psicología, fisioterapia, nutrición, acupuntura, coaching y más. Primera consulta gratuita."',
     'content="Integral health center in Boadilla del Monte. Psychology, physiotherapy, nutrition, acupuncture, coaching and more. Free first consultation."'],
    ['content="Descubre todas las terapias de Clínica Salud y Más: psicología, coaching, fisioterapia, osteopatía, nutrición, acupuntura, belleza, intervención psicoeducativa, yoga y pilates en Boadilla del Monte."',
     'content="Discover all therapies at Clínica Salud y Más: psychology, coaching, physiotherapy, osteopathy, nutrition, acupuncture, beauty, psychoeducational intervention, yoga and pilates in Boadilla del Monte."'],
    ['content="Psicología en Boadilla del Monte. Terapia para adultos, adolescentes y niños. Gestión emocional, ansiedad, autoestima. Primera consulta gratuita."',
     'content="Psychology in Boadilla del Monte. Therapy for adults, adolescents, and children. Emotional management, anxiety, self-esteem. Free first consultation."'],
    ['content="Coaching personal y profesional en Boadilla del Monte. Desarrollo personal, liderazgo, gestión del tiempo. Primera sesión gratuita."',
     'content="Personal and professional coaching in Boadilla del Monte. Personal development, leadership, time management. Free first session."'],
    ['content="Fisioterapia y osteopatía en Boadilla del Monte. Tratamiento manual avanzado. Recuperación de lesiones, dolor crónico. Valoración gratuita."',
     'content="Physiotherapy and osteopathy in Boadilla del Monte. Advanced manual treatment. Injury recovery, chronic pain. Free assessment."'],
    ['content="Nutrición en Boadilla del Monte. Planes nutricionales personalizados, control de peso, nutrición deportiva. Primera consulta gratuita."',
     'content="Nutrition in Boadilla del Monte. Personalised nutrition plans, weight control, sports nutrition. Free first consultation."'],
    ['content="Belleza y estética en Boadilla del Monte. Tratamientos faciales, corporales, depilación láser. Presupuesto gratuito."',
     'content="Beauty and aesthetics in Boadilla del Monte. Facial and body treatments, laser hair removal. Free consultation."'],
    ['content="Medicina Natural y acupuntura en Boadilla del Monte. Acupuntura clásica, MTC, homeopatía. Primera consulta gratuita."',
     'content="Natural Medicine and acupuncture in Boadilla del Monte. Classical acupuncture, TCM, homeopathy. Free first consultation."'],
    ['content="Intervención psicoeducativa en Boadilla del Monte. TDAH, dificultades de aprendizaje, dislexia. Primera consulta gratuita."',
     'content="Psychoeducational intervention in Boadilla del Monte. ADHD, learning difficulties, dyslexia. Free first consultation."'],
    ['content="Clases de yoga, pilates y meditación en Boadilla del Monte. Grupos reducidos. Clase de prueba gratuita."',
     'content="Yoga, pilates and meditation classes in Boadilla del Monte. Small groups. Free trial class."'],
    ['content="Conoce a nuestro equipo de profesionales en Boadilla del Monte. Psicólogos, fisioterapeutas, nutricionistas, coaches y más."',
     'content="Meet our team of professionals in Boadilla del Monte. Psychologists, physiotherapists, nutritionists, coaches and more."'],
    ['content="Videoconsulta en Boadilla del Monte. Psicología, coaching y nutrición online. Consultas seguras y confidenciales."',
     'content="Video consultation in Boadilla del Monte. Psychology, coaching and nutrition online. Secure and confidential consultations."'],
    ['content="Noticias y blog de salud de Clínica Salud y Más en Boadilla del Monte. Consejos de bienestar, salud mental y nutrición."',
     'content="News and health blog from Clínica Salud y Más in Boadilla del Monte. Wellness tips, mental health and nutrition."'],
    ['content="Precios de Clínica Salud y Más en Boadilla del Monte. Tarifas transparentes. Primera consulta gratuita en todas las áreas."',
     'content="Prices at Clínica Salud y Más in Boadilla del Monte. Transparent rates. Free first consultation in all areas."'],
    ['content="Ubicación y horario de Clínica Salud y Más en Boadilla del Monte. C/ Isabel de Farnesio 2. L-V 9:00-21:00. S 10:00-14:00."',
     'content="Location and opening hours of Clínica Salud y Más in Boadilla del Monte. C/ Isabel de Farnesio 2. Mon-Fri 9:00-21:00. Sat 10:00-14:00."'],
    ['content="Contacta con Clínica Salud y Más en Boadilla del Monte. Teléfono, email, formulario de contacto. Primera consulta gratuita."',
     'content="Contact Clínica Salud y Más in Boadilla del Monte. Phone, email, contact form. Free first consultation."'],

    // Twitter descriptions
    ['content="Centro de salud integral en Boadilla del Monte. Psicología, fisioterapia, nutrición, acupuntura, coaching y más. Primera consulta gratuita."',
     'content="Integral health center in Boadilla del Monte. Psychology, physiotherapy, nutrition, acupuncture, coaching and more. Free first consultation."'],
    ['content="Todas las terapias de Clínica Salud y Más en Boadilla del Monte. Psicología, fisioterapia, nutrición, acupuntura y más."',
     'content="All therapies at Clínica Salud y Más in Boadilla del Monte. Psychology, physiotherapy, nutrition, acupuncture and more."'],
  ]);

  // ============================================================
  // 4. JSON-LD Structured Data
  // ============================================================
  c = replaceAll(c, [
    ['"name": "Clínica Salud y Más — Salud Integral en Boadilla del Monte"',
     '"name": "Clínica Salud y Más — Integral Health in Boadilla del Monte"'],
    ['"name": "Terapias de Salud Integral — Clínica Salud y Más"',
     '"name": "Integral Health Therapies — Clínica Salud y Más"'],
    ['"name": "Psicología — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Psychology — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Coaching — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Coaching — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Tratamiento Manual — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Manual Treatment — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Nutrición — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Nutrition — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Belleza y Estética — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Beauty and Aesthetics — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Medicina Natural y Acupuntura — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Natural Medicine and Acupuncture — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Intervención Psicoeducativa — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Psychoeducational Intervention — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Clases — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Classes — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Equipo Profesional — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Professional Team — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Videoconsulta — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Video Consultation — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Noticias y Blog de Salud — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Health News and Blog — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Precios — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Prices — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Ubicación y Horario — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Location and Hours — Clínica Salud y Más Boadilla del Monte"'],
    ['"name": "Contacto — Clínica Salud y Más Boadilla del Monte"',
     '"name": "Contact — Clínica Salud y Más Boadilla del Monte"'],
    ['"medicalSpecialty": ["Psychology","PhysicalTherapy","Nutrition","Acupuncture","Coaching"]',
     '"medicalSpecialty": ["Psychology","PhysicalTherapy","Nutrition","Acupuncture","Coaching","Beauty","PsychoeducationalIntervention"]'],
    ['"medicalSpecialty": ["Psychology","PhysicalTherapy","Nutrition","Acupuncture"]',
     '"medicalSpecialty": ["Psychology","PhysicalTherapy","Nutrition","Acupuncture","Coaching","Beauty","PsychoeducationalIntervention"]'],
  ]);

  // ============================================================
  // 5. COOKIE BANNER
  // ============================================================
  c = replaceAll(c, [
    ['Utilizamos cookies propias y de terceros para analizar el trafico, mejorar nuestros servicios y medir el rendimiento de la web. Puedes aceptar todas las cookies o rechazarlas.',
     'We use our own and third-party cookies to analyze traffic, improve our services, and measure website performance. You can accept all cookies or decline them.'],
    ['Politica de privacidad', 'Privacy Policy'],
    ['politica de privacidad', 'privacy policy'],
    ['aria-label="Rechazar cookies">Rechazar<', 'aria-label="Decline cookies">Decline<'],
    ['aria-label="Aceptar cookies">Aceptar<', 'aria-label="Accept cookies">Accept<'],
  ]);

  // ============================================================
  // 6. HEADER NAVIGATION
  // ============================================================
  c = replaceAll(c, [
    ['<a href="index.html" class="header__link active">Inicio</a>', '<a href="index.html" class="header__link active">Home</a>'],
    ['<a href="index.html" class="header__link">Inicio</a>', '<a href="index.html" class="header__link">Home</a>'],
    ['<a href="terapias.html" class="header__link active">Terapias <span class="header__arrow">&#9662;</span></a>',
     '<a href="terapias.html" class="header__link active">Therapies <span class="header__arrow">&#9662;</span></a>'],
    ['<a href="terapias.html" class="header__link">Terapias <span class="header__arrow">&#9662;</span></a>',
     '<a href="terapias.html" class="header__link">Therapies <span class="header__arrow">&#9662;</span></a>'],
    ['<a href="profesionales.html" class="header__link">Profesionales</a>', '<a href="profesionales.html" class="header__link">Professionals</a>'],
    ['<a href="videoconsulta.html" class="header__link">Videoconsulta</a>', '<a href="videoconsulta.html" class="header__link">Video Consultation</a>'],
    ['<a href="precios.html" class="header__link">Precios</a>', '<a href="precios.html" class="header__link">Prices</a>'],
    ['<a href="noticias.html" class="header__link">Noticias</a>', '<a href="noticias.html" class="header__link">News</a>'],
    ['>Reservar Cita<', '>Book Appointment<'],
    ['aria-label="Menú">', 'aria-label="Menu">'],
  ]);

  // ============================================================
  // 7. MEGA MENU
  // ============================================================
  c = replaceAll(c, [
    ['<strong>Psicología</strong><small>Salud mental y bienestar</small>', '<strong>Psychology</strong><small>Mental health and well-being</small>'],
    ['<strong>Coaching</strong><small>Desarrollo personal</small>', '<strong>Coaching</strong><small>Personal development</small>'],
    ['<strong>Tratamiento Manual</strong><small>Fisioterapia y osteopatía</small>', '<strong>Manual Treatment</strong><small>Physiotherapy and osteopathy</small>'],
    ['<strong>Nutrición</strong><small>Alimentación consciente</small>', '<strong>Nutrition</strong><small>Mindful eating</small>'],
    ['<strong>Belleza</strong><small>Estética y cuidado</small>', '<strong>Beauty</strong><small>Aesthetics and care</small>'],
    ['<strong>Medicina Natural</strong><small>Acupuntura y MTC</small>', '<strong>Natural Medicine</strong><small>Acupuncture and TCM</small>'],
    ['<strong>Intervención Psicoeducativa</strong><small>Desarrollo cognitivo</small>', '<strong>Psychoeducational Intervention</strong><small>Cognitive development</small>'],
    ['<strong>Clases</strong><small>Yoga, pilates y más</small>', '<strong>Classes</strong><small>Yoga, pilates and more</small>'],
  ]);

  // ============================================================
  // 8. HERO SECTION
  // ============================================================
  c = replaceAll(c, [
    ['<p class="hero__pretitle">Boadilla del Monte &middot; Madrid</p>',
     '<p class="hero__pretitle">Boadilla del Monte &middot; Madrid, Spain</p>'],
    ['<h1 class="hero__title">Cuidamos de tu salud<br>y la de los tuyos</h1>',
     '<h1 class="hero__title">We care for your health<br>and your loved ones</h1>'],
    ['<p class="hero__subtitle">Recupera tu energía, elimina el dolor y vuelve a sentirte bien. Sin pastillas, sin parches.</p>',
     '<p class="hero__subtitle">Recover your energy, eliminate pain, and feel well again. No pills, no quick fixes.</p>'],
    ['title="Ver reseñas en Google Maps">Más de 200 pacientes nos puntúan con 4.7/5 ⭐ en Google</a>',
     'title="View reviews on Google Maps">Over 200 patients rate us 4.7/5 ⭐ on Google</a>'],
    ['title="Ver reseñas en Google Maps">Más de 200 personas nos valoran con',
     'title="View reviews on Google Maps">Over 200 people rate us'],
    ['>Nuestras Terapias<', '>Our Therapies<'],
    ['onclick="openCalendly(\'primera-consulta\'); return false;">Consulta gratuita de 15 min<',
     'onclick="openCalendly(\'primera-consulta\'); return false;">Free 15-min consultation<'],
  ]);

  // ============================================================
  // 9. PHILOSOPHY SECTION
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Nuestra Filosofía</span>', '<span class="section-tag">Our Philosophy</span>'],
    ['<h2 class="section-title">Una clínica global para una salud integral</h2>',
     '<h2 class="section-title">A global clinic for integral health</h2>'],
    ['<p class="philosophy__text">La única clínica de Boadilla que trata la causa, no el síntoma. Psicología, fisioterapia y nutrición integradas.</p>',
     '<p class="philosophy__text">The only clinic in Boadilla that treats the cause, not the symptom. Psychology, physiotherapy, and nutrition integrated.</p>'],
    ['<p class="philosophy__text">Nuestra visión holística integra psicología, estética, acupuntura, fisioterapia y entrenamiento para acompañarte en cualquier edad y etapa vital.</p>',
     '<p class="philosophy__text">Our holistic vision integrates psychology, aesthetics, acupuncture, physiotherapy, and training to support you at any age and stage of life.</p>'],
    ['>Atención personalizada e integral<', '>Personalized and comprehensive care<'],
    ['>Profesionales especializados<', '>Specialized professionals<'],
    ['>Centro sanitario registrado CS 10443<', '>Registered health center CS 10443<'],
    ['<span class="philosophy__badge-text">Desde</span>', '<span class="philosophy__badge-text">Since</span>'],
    ['alt="Interior de Clínica Salud y Más — Recepción y centro de salud integral en Boadilla del Monte, Madrid"',
     'alt="Interior of Clínica Salud y Más — Reception and integral health center in Boadilla del Monte, Madrid"'],
  ]);

  // ============================================================
  // 10. SERVICES GRID
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Nuestras Terapias</span>', '<span class="section-tag">Our Therapies</span>'],
    ['<h2 class="section-title">Un universo de bienestar a tu alcance</h2>',
     '<h2 class="section-title">A universe of wellness at your fingertips</h2>'],
    ['<p class="section-subtitle">Descubre nuestra gama completa de servicios diseñados para cuidar cada aspecto de tu salud.</p>',
     '<p class="section-subtitle">Discover our complete range of services designed to care for every aspect of your health.</p>'],
    ['Descubrir &rarr;', 'Learn more &rarr;'],

    // Card descriptions (long)
    ['<p>Acompañamiento terapéutico para adultos, adolescentes y niños.</p>', '<p>Therapeutic support for adults, adolescents, and children.</p>'],
    ['<p>Desbloquea tu potencial con sesiones individuales y grupales.</p>', '<p>Unlock your potential with individual and group sessions.</p>'],
    ['<p>Fisioterapia, osteopatía y técnicas manuales avanzadas.</p>', '<p>Physiotherapy, osteopathy, and advanced manual techniques.</p>'],
    ['<p>Planes nutricionales personalizados y alimentación consciente.</p>', '<p>Personalized nutrition plans and mindful eating.</p>'],
    ['<p>Tratamientos estéticos avanzados que realzan tu belleza natural.</p>', '<p>Advanced aesthetic treatments that enhance your natural beauty.</p>'],
    ['<p>Acupuntura y medicina tradicional china de forma holística.</p>', '<p>Acupuncture and traditional Chinese medicine holistically.</p>'],
    ['<p>Apoyo especializado para dificultades de aprendizaje y TDAH.</p>', '<p>Specialized support for learning difficulties and ADHD.</p>'],
    ['<p>Yoga, pilates, meditación y actividades para cuerpo y mente.</p>', '<p>Yoga, pilates, meditation, and activities for body and mind.</p>'],

    // Card descriptions (short — in terapias tab)
    ['<p>Acompañamiento terapéutico para todas las edades.</p>', '<p>Therapeutic support for all ages.</p>'],
    ['<p>Desarrollo personal y profesional.</p>', '<p>Personal and professional development.</p>'],
    ['<p>Fisioterapia, osteopatía y técnicas manuales.</p>', '<p>Physiotherapy, osteopathy, and manual techniques.</p>'],
    ['<p>Alimentación consciente y saludable.</p>', '<p>Mindful and healthy eating.</p>'],
    ['<p>Estética y cuidado personal.</p>', '<p>Aesthetics and personal care.</p>'],
    ['<p>Acupuntura y medicina tradicional china.</p>', '<p>Acupuncture and traditional Chinese medicine.</p>'],
    ['<p>Dificultades de aprendizaje y TDAH.</p>', '<p>Learning difficulties and ADHD.</p>'],
    ['<p>Yoga, pilates, meditación.</p>', '<p>Yoga, pilates, meditation.</p>'],

    // Card titles (short versions in terapias tab)
    ['<h3>Psicología</h3>', '<h3>Psychology</h3>'],
    ['<h3>Coaching</h3>', '<h3>Coaching</h3>'],
    ['<h3>Tratamiento Manual</h3>', '<h3>Manual Treatment</h3>'],
    ['<h3>Nutrición</h3>', '<h3>Nutrition</h3>'],
    ['<h3>Belleza</h3>', '<h3>Beauty</h3>'],
    ['<h3>Medicina Natural</h3>', '<h3>Natural Medicine</h3>'],
    ['<h3>Intervención Psicoeducativa</h3>', '<h3>Psychoeducational Intervention</h3>'],
    ['<h3>Clases</h3>', '<h3>Classes</h3>'],
  ]);

  // ============================================================
  // 11. EXCELLENCE SECTION
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag section-tag--light">Excelencia</span>', '<span class="section-tag section-tag--light">Excellence</span>'],
    ['<h2 class="section-title section-title--light">Un equipo que marca la diferencia</h2>',
     '<h2 class="section-title section-title--light">A team that makes the difference</h2>'],
    ['<p>Profesionales altamente cualificados que comparten una visión común: tratarte como una persona completa, no como un conjunto de síntomas.</p>',
     '<p>Highly qualified professionals who share a common vision: treating you as a whole person, not as a set of symptoms.</p>'],
    ['>Conoce a Nuestro Equipo<', '>Meet Our Team<'],
    ['>Especialidades<', '>Specialties<'],
    ['>Años de experiencia<', '>Years of experience<'],
    ['>Pacientes<', '>Patients<'],
    ['>Visión integral<', '>Integral vision<'],
  ]);

  // ============================================================
  // 12. TESTIMONIALS
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Testimonios Reales</span>', '<span class="section-tag">Real Testimonials</span>'],
    ['<h2 class="section-title">Lo que dicen nuestros pacientes</h2>',
     '<h2 class="section-title">What our patients say</h2>'],
    ['4.7/5 en Google', '4.7/5 on Google'],
    ['Estas son algunas de sus historias.', 'These are some of their stories.'],
    // Testimonial quotes
    ['Llevaba años con ansiedad que no me dejaba dormir. Gracias a Sofía he aprendido a gestionarla y he recuperado las riendas de mi vida. No sé cómo agradecérselo.',
     'I spent years with anxiety that kept me from sleeping. Thanks to Sofía, I have learned to manage it and have taken back control of my life. I cannot thank her enough.'],
    ['Llegué con dolor crónico tras un accidente, y no solo me aliviaron: me enseñaron ejercicios para prevenir recaídas. He vuelto a jugar al tenis sin molestias.',
     'I came with chronic pain after an accident, and not only did they relieve it: they taught me exercises to prevent relapses. I am back to playing tennis without discomfort.'],
    ['Había probado mil dietas sin éxito. Con Conchi aprendí a comer bien sin pasar hambre y he perdido 12 kilos en seis meses. Me ha cambiado la relación con la comida.',
     'I had tried a thousand diets without success. With Conchi I learned to eat well without going hungry and I have lost 12 kilos in six months. It has changed my relationship with food.'],
    ['Sufría migrañas incapacitantes desde la universidad. Tres sesiones de acupuntura con medicina natural y no he vuelto a tener una crisis en meses. Es otra vida.',
     'I suffered from incapacitating migraines since university. Three acupuncture sessions with natural medicine and I have not had a crisis in months. It is a different life.'],
    ['Tras una crisis profesional a los 40, el coaching me ayudó a reenfocar mi carrera. Ahora tengo mi propio negocio y una claridad que nunca había tenido.',
     'After a professional crisis at 40, coaching helped me refocus my career. Now I have my own business and a clarity I had never had before.'],
    ['Mi hijo tenía dificultades de atención y en el colegio nos recomendaron la intervención psicoeducativa. En pocos meses mejoró su concentración, sus notas y su autoestima. Un cambio increíble.',
     'My son had attention difficulties and the school recommended psychoeducational intervention. In a few months his concentration, grades, and self-esteem improved. An incredible change.'],
    // Testimonial details
    ['Psicología · Ansiedad generalizada', 'Psychology · Generalized anxiety'],
    ['Tratamiento Manual · Lesión lumbar crónica', 'Manual Treatment · Chronic lumbar injury'],
    ['Nutrición · Control de peso y reeducación alimentaria', 'Nutrition · Weight control and nutritional re-education'],
    ['Medicina Natural · Migrañas crónicas', 'Natural Medicine · Chronic migraines'],
    ['Coaching · Transición profesional', 'Coaching · Career transition'],
    ['Intervención Psicoeducativa · TDAH infantil', 'Psychoeducational Intervention · Childhood ADHD'],
  ]);

  // ============================================================
  // 13. TAB HERO: TERAPIAS OVERVIEW
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Terapias</span>', '<span class="section-tag">Therapies</span>'],
    ['<h1 class="tab-hero__title">Un universo de bienestar</h1>',
     '<h1 class="tab-hero__title">A universe of wellness</h1>'],
    ['<p class="tab-hero__subtitle">Descubre nuestra gama completa de servicios. Haz clic en cada terapia para conocerla en detalle.</p>',
     '<p class="tab-hero__subtitle">Discover our complete range of services. Click on each therapy to learn more.</p>'],
  ]);

  // ============================================================
  // 14. BACK LINKS
  // ============================================================
  c = replaceAll(c, [
    ['&larr; Volver<', '&larr; Back<'],
    ['&larr; Equipo<', '&larr; Team<'],
  ]);

  // ============================================================
  // 15. TAB: PSICOLOGIA
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Terapia</span>', '<span class="section-tag">Therapy</span>'],
    ['<h1 class="tab-hero__title">Psicología</h1>', '<h1 class="tab-hero__title">Psychology</h1>'],
    ['<p class="tab-hero__subtitle">Acompañamiento terapéutico para adultos, adolescentes y niños. Gestión emocional, ansiedad, autoestima y desarrollo personal.</p>',
     '<p class="tab-hero__subtitle">Therapeutic support for adults, adolescents, and children. Emotional management, anxiety, self-esteem, and personal development.</p>'],
    ['<h2>Tu bienestar emocional, nuestra prioridad</h2>', '<h2>Your emotional well-being, our priority</h2>'],
    ['<p>En Clínica Salud y Más entendemos la salud mental como el pilar fundamental del bienestar integral. Nuestro equipo de psicólogos ofrece un espacio seguro y confidencial donde explorar tus emociones, superar dificultades y crecer personalmente.</p>',
     '<p>At Clínica Salud y Más we understand mental health as the cornerstone of integral well-being. Our team of psychologists offers a safe and confidential space to explore your emotions, overcome difficulties, and grow personally.</p>'],
    ['<p>Trabajamos desde un enfoque integrador, combinando las técnicas más efectivas para adaptarnos a tus necesidades específicas. Creemos en una psicología cercana, humana y basada en la evidencia.</p>',
     '<p>We work from an integrative approach, combining the most effective techniques to adapt to your specific needs. We believe in close, human, evidence-based psychology.</p>'],
    ['<h3>Tratamientos</h3>', '<h3>Treatments</h3>'],
    ['<li>Ansiedad, depresión y gestión del estrés</li>', '<li>Anxiety, depression, and stress management</li>'],
    ['<li>Terapia infanto-juvenil y orientación familiar</li>', '<li>Child and adolescent therapy and family guidance</li>'],
    ['<li>Autoestima y habilidades sociales</li>', '<li>Self-esteem and social skills</li>'],
    ['<li>Duelo y procesos de cambio vital</li>', '<li>Grief and life transition processes</li>'],
    ['<li>Terapia de pareja</li>', '<li>Couples therapy</li>'],
    ['<li>Mindfulness y técnicas de regulación emocional</li>', '<li>Mindfulness and emotional regulation techniques</li>'],
    ['<h4>¿Sabías que...?</h4>', '<h4>Did you know...?</h4>'],
    ['<p>La terapia psicológica no solo ayuda en momentos de crisis. Es una herramienta de autoconocimiento que mejora tu calidad de vida, tus relaciones y tu rendimiento en todas las áreas.</p>',
     '<p>Psychological therapy not only helps in times of crisis. It is a self-knowledge tool that improves your quality of life, your relationships, and your performance in all areas.</p>'],
    ['<h4>Primera consulta gratuita</h4>', '<h4>Free first consultation</h4>'],
    ['<p>Te ofrecemos una primera sesión informativa sin compromiso para conocerte y entender cómo podemos ayudarte.</p>',
     '<p>We offer a no-obligation first session to get to know you and understand how we can help.</p>'],
  ]);

  // ============================================================
  // 16. TAB: COACHING
  // ============================================================
  c = replaceAll(c, [
    ['<h1 class="tab-hero__title">Coaching</h1>', '<h1 class="tab-hero__title">Coaching</h1>'],
    ['<p class="tab-hero__subtitle">Desbloquea tu potencial. Sesiones individuales y grupales para alcanzar tus metas personales y profesionales.</p>',
     '<p class="tab-hero__subtitle">Unlock your potential. Individual and group sessions to achieve your personal and professional goals.</p>'],
    ['<h2>Transforma tu vida con propósito</h2>', '<h2>Transform your life with purpose</h2>'],
    ['<p>El coaching es un proceso de acompañamiento que te ayuda a clarificar tus objetivos, identificar obstáculos y diseñar un plan de acción efectivo. En nuestra clínica, combinamos el rigor del método con una visión humanista.</p>',
     '<p>Coaching is a support process that helps you clarify your goals, identify obstacles, and design an effective action plan. At our clinic, we combine methodological rigor with a humanistic vision.</p>'],
    ['<p>Tanto si buscas mejorar tu rendimiento profesional, encontrar equilibrio vital o superar bloqueos personales, nuestro equipo de coaches te guiará en cada paso del camino.</p>',
     '<p>Whether you seek to improve your professional performance, find life balance, or overcome personal blockages, our team of coaches will guide you every step of the way.</p>'],
    ['<h3>Áreas de trabajo</h3>', '<h3>Areas of work</h3>'],
    ['<li>Coaching personal y desarrollo de propósito vital</li>', '<li>Personal coaching and life purpose development</li>'],
    ['<li>Coaching profesional y transiciones de carrera</li>', '<li>Professional coaching and career transitions</li>'],
    ['<li>Liderazgo y habilidades directivas</li>', '<li>Leadership and management skills</li>'],
    ['<li>Gestión del tiempo y productividad</li>', '<li>Time management and productivity</li>'],
    ['<li>Equilibrio vida personal-profesional</li>', '<li>Work-life balance</li>'],
    ['<li>Coaching de equipos y organizaciones</li>', '<li>Team and organizational coaching</li>'],
    ['<h4>¿En qué se diferencia de la psicología?</h4>', '<h4>How is it different from psychology?</h4>'],
    ['<p>Mientras la psicología profundiza en el origen emocional, el coaching se enfoca en el presente y en construir tu futuro con herramientas prácticas y planes de acción concretos.</p>',
     '<p>While psychology delves into emotional origins, coaching focuses on the present and building your future with practical tools and concrete action plans.</p>'],
  ]);

  // ============================================================
  // 17. TAB: TRATAMIENTO MANUAL
  // ============================================================
  c = replaceAll(c, [
    ['<h1 class="tab-hero__title">Tratamiento Manual</h1>', '<h1 class="tab-hero__title">Manual Treatment</h1>'],
    ['<p class="tab-hero__subtitle">Fisioterapia, osteopatía y técnicas manuales avanzadas para aliviar el dolor y recuperar el equilibrio físico.</p>',
     '<p class="tab-hero__subtitle">Physiotherapy, osteopathy, and advanced manual techniques to relieve pain and recover physical balance.</p>'],
    ['<h2>Recupera tu movilidad, recupera tu vida</h2>', '<h2>Recover your mobility, recover your life</h2>'],
    ['<p>Nuestro enfoque en tratamiento manual integra la fisioterapia clásica con técnicas osteopáticas y métodos avanzados de valoración. No tratamos solo el síntoma: buscamos el origen de tu dolor.</p>',
     '<p>Our manual treatment approach integrates classical physiotherapy with osteopathic techniques and advanced assessment methods. We don\'t just treat the symptom: we seek the origin of your pain.</p>'],
    ['<h3>Servicios</h3>', '<h3>Services</h3>'],
    ['<li>Fisioterapia deportiva y readaptación de lesiones</li>', '<li>Sports physiotherapy and injury rehabilitation</li>'],
    ['<li>Osteopatía estructural, visceral y craneal</li>', '<li>Structural, visceral, and cranial osteopathy</li>'],
    ['<li>Terapia manual ortopédica</li>', '<li>Orthopedic manual therapy</li>'],
    ['<li>Liberación miofascial y puntos gatillo</li>', '<li>Myofascial release and trigger points</li>'],
    ['<li>Vendaje neuromuscular (kinesiotaping)</li>', '<li>Neuromuscular taping (kinesiotaping)</li>'],
    ['<li>Rehabilitación post-quirúrgica</li>', '<li>Post-surgical rehabilitation</li>'],
    ['<h4>Sin esperas</h4>', '<h4>No waiting</h4>'],
    ['<p>Ofrecemos disponibilidad inmediata y horario amplio para que puedas empezar tu tratamiento cuanto antes.</p>',
     '<p>We offer immediate availability and extended hours so you can start your treatment as soon as possible.</p>'],
  ]);

  // ============================================================
  // 18. TAB: NUTRICION
  // ============================================================
  c = replaceAll(c, [
    ['<h1 class="tab-hero__title">Nutrición</h1>', '<h1 class="tab-hero__title">Nutrition</h1>'],
    ['<p class="tab-hero__subtitle">Planes nutricionales personalizados. Alimentación consciente, control de peso y educación alimentaria.</p>',
     '<p class="tab-hero__subtitle">Personalized nutrition plans. Mindful eating, weight control, and nutritional education.</p>'],
    ['<h2>Alimenta tu salud de forma consciente</h2>', '<h2>Nourish your health mindfully</h2>'],
    ['<p>Entendemos la nutrición como un pilar fundamental de la salud. Nuestro enfoque va más allá de las dietas: te enseñamos a relacionarte de forma saludable con la comida para toda la vida.</p>',
     '<p>We understand nutrition as a fundamental pillar of health. Our approach goes beyond diets: we teach you to build a healthy relationship with food for life.</p>'],
    ['<li>Planes nutricionales personalizados</li>', '<li>Personalized nutrition plans</li>'],
    ['<li>Nutrición clínica para patologías específicas</li>', '<li>Clinical nutrition for specific conditions</li>'],
    ['<li>Control de peso y reeducación alimentaria</li>', '<li>Weight control and nutritional re-education</li>'],
    ['<li>Nutrición deportiva</li>', '<li>Sports nutrition</li>'],
    ['<li>Alimentación en etapas vitales (embarazo, menopausia, tercera edad)</li>', '<li>Nutrition for life stages (pregnancy, menopause, senior years)</li>'],
    ['<li>Talleres de cocina saludable</li>', '<li>Healthy cooking workshops</li>'],
  ]);

  // ============================================================
  // 19. TAB: BELLEZA
  // ============================================================
  c = replaceAll(c, [
    ['<h1 class="tab-hero__title">Belleza</h1>', '<h1 class="tab-hero__title">Beauty</h1>'],
    ['<p class="tab-hero__subtitle">Tratamientos estéticos avanzados que realzan tu belleza natural con la máxima seguridad y profesionalidad.</p>',
     '<p class="tab-hero__subtitle">Advanced aesthetic treatments that enhance your natural beauty with the highest safety and professionalism.</p>'],
    ['<h2>Realza tu belleza natural</h2>', '<h2>Enhance your natural beauty</h2>'],
    ['<p>Nuestra unidad de belleza combina tecnología avanzada con un enfoque natural. Te ofrecemos tratamientos personalizados que respetan tu piel y realzan tu belleza única.</p>',
     '<p>Our beauty unit combines advanced technology with a natural approach. We offer personalized treatments that respect your skin and enhance your unique beauty.</p>'],
    ['<li>Faciales personalizados y tratamientos antiedad</li>', '<li>Personalized facials and anti-aging treatments</li>'],
    ['<li>Corporales: remodelación, flacidez y celulitis</li>', '<li>Body treatments: remodeling, firming, and cellulite</li>'],
    ['<li>Depilación láser de última generación</li>', '<li>Latest-generation laser hair removal</li>'],
    ['<li>Manicura y pedicura profesional</li>', '<li>Professional manicure and pedicure</li>'],
    ['<li>Asesoría de imagen personalizada</li>', '<li>Personalized image consulting</li>'],
  ]);

  // ============================================================
  // 20. TAB: MEDICINA NATURAL
  // ============================================================
  c = replaceAll(c, [
    ['<h1 class="tab-hero__title">Medicina Natural y MTC</h1>', '<h1 class="tab-hero__title">Natural Medicine and TCM</h1>'],
    ['<p class="tab-hero__subtitle">Acupuntura, medicina tradicional china y terapias naturales que restauran el equilibrio energético de tu organismo.</p>',
     '<p class="tab-hero__subtitle">Acupuncture, traditional Chinese medicine, and natural therapies that restore your body\'s energetic balance.</p>'],
    ['<h2>El equilibrio natural de tu cuerpo</h2>', '<h2>The natural balance of your body</h2>'],
    ['<p>La Medicina Tradicional China entiende la salud como un estado de equilibrio energético. Nuestros tratamientos milenarios, combinados con el conocimiento moderno, ofrecen soluciones efectivas y naturales.</p>',
     '<p>Traditional Chinese Medicine understands health as a state of energetic balance. Our ancient treatments, combined with modern knowledge, offer effective and natural solutions.</p>'],
    ['<li>Acupuntura clásica y electroacupuntura</li>', '<li>Classical acupuncture and electroacupuncture</li>'],
    ['<li>Auriculoterapia y moxibustión</li>', '<li>Auriculotherapy and moxibustion</li>'],
    ['<li>Ventosas y fitoterapia china</li>', '<li>Cupping and Chinese phytotherapy</li>'],
    ['<li>Medicina ortomolecular</li>', '<li>Orthomolecular medicine</li>'],
    ['<li>Homeopatía y terapias complementarias</li>', '<li>Homeopathy and complementary therapies</li>'],
  ]);

  // ============================================================
  // 21. TAB: INTERVENCION PSICOEDUCATIVA
  // ============================================================
  c = replaceAll(c, [
    ['<h1 class="tab-hero__title">Intervención Psicoeducativa</h1>', '<h1 class="tab-hero__title">Psychoeducational Intervention</h1>'],
    ['<p class="tab-hero__subtitle">Apoyo especializado para dificultades de aprendizaje, TDAH y desarrollo cognitivo.</p>',
     '<p class="tab-hero__subtitle">Specialized support for learning difficulties, ADHD, and cognitive development.</p>'],
    ['<h2>Potenciamos las capacidades únicas de cada persona</h2>', '<h2>We enhance the unique abilities of each person</h2>'],
    ['<p>Cada mente es diferente. Nuestro equipo especializado evalúa y diseña programas individualizados para potenciar el desarrollo cognitivo y superar las dificultades de aprendizaje.</p>',
     '<p>Every mind is different. Our specialized team assesses and designs individualized programs to enhance cognitive development and overcome learning difficulties.</p>'],
    ['<h3>Áreas de intervención</h3>', '<h3>Intervention areas</h3>'],
    ['<li>Evaluación y diagnóstico psicopedagógico</li>', '<li>Psychopedagogical assessment and diagnosis</li>'],
    ['<li>TDAH: estrategias de atención y organización</li>', '<li>ADHD: attention and organization strategies</li>'],
    ['<li>Dificultades de lectoescritura y dislexia</li>', '<li>Reading, writing difficulties, and dyslexia</li>'],
    ['<li>Técnicas de estudio y organización escolar</li>', '<li>Study techniques and school organization</li>'],
    ['<li>Habilidades sociales y comunicación</li>', '<li>Social skills and communication</li>'],
    ['<li>Orientación a familias y coordinación escolar</li>', '<li>Family guidance and school coordination</li>'],
  ]);

  // ============================================================
  // 22. TAB: CLASES
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Actividad</span>', '<span class="section-tag">Activity</span>'],
    ['<h1 class="tab-hero__title">Clases</h1>', '<h1 class="tab-hero__title">Classes</h1>'],
    ['<p class="tab-hero__subtitle">Yoga, pilates, meditación y actividades grupales para mantener cuerpo y mente en armonía.</p>',
     '<p class="tab-hero__subtitle">Yoga, pilates, meditation, and group activities to keep body and mind in harmony.</p>'],
    ['<h2>Mueve tu cuerpo, calma tu mente</h2>', '<h2>Move your body, calm your mind</h2>'],
    ['<p>Nuestras clases están diseñadas para todos los niveles, con grupos reducidos que garantizan una atención personalizada. Cada sesión es una oportunidad para reconectar contigo mismo.</p>',
     '<p>Our classes are designed for all levels, with small groups ensuring personalized attention. Each session is an opportunity to reconnect with yourself.</p>'],
    ['<h3>Disciplinas</h3>', '<h3>Disciplines</h3>'],
    ['<li>Hatha Yoga y Vinyasa Flow</li>', '<li>Hatha Yoga and Vinyasa Flow</li>'],
    ['<li>Yoga restaurativo y Yin Yoga</li>', '<li>Restorative Yoga and Yin Yoga</li>'],
    ['<li>Pilates suelo y con equipamiento</li>', '<li>Mat Pilates and equipment Pilates</li>'],
    ['<li>Meditación guiada y Mindfulness</li>', '<li>Guided meditation and Mindfulness</li>'],
    ['<li>Ejercicio terapéutico para mayores</li>', '<li>Therapeutic exercise for seniors</li>'],
    ['<li>Talleres monográficos de fin de semana</li>', '<li>Weekend monographic workshops</li>'],
    ['>Ver disponibilidad<', '>Check availability<'],
  ]);

  // ============================================================
  // 23. TAB: PROFESIONALES
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag section-tag--light">Equipo</span>', '<span class="section-tag section-tag--light">Team</span>'],
    ['<h1 class="tab-hero__title">Nuestros Profesionales</h1>', '<h1 class="tab-hero__title">Our Professionals</h1>'],
    ['<p class="tab-hero__subtitle">Un equipo multidisciplinar que comparte una visión holística de la salud.</p>',
     '<p class="tab-hero__subtitle">A multidisciplinary team sharing a holistic vision of health.</p>'],

    // Professional cards
    ['<span class="pro-card__specialty">Psicóloga, Coach y Profesora de Yoga</span>', '<span class="pro-card__specialty">Psychologist, Coach and Yoga Teacher</span>'],
    ['<span class="pro-card__role">CEO en Clínica Salud y Más</span>', '<span class="pro-card__role">CEO at Clínica Salud y Más</span>'],
    ['<p class="pro-card__desc">Enfoque holístico que integra psicología, ADE, naturopatía y yoga. Busca el equilibrio mente-cuerpo. "Tú eres el especialista de tu vida y yo te acompaño para que puedas encontrar tu bienestar."</p>',
     '<p class="pro-card__desc">A holistic approach integrating psychology, business, naturopathy, and yoga. Seeks mind-body balance. "You are the specialist in your life and I accompany you so you can find your well-being."</p>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Licenciada en Empresariales, Graduada en Psicología (UNED), Máster en ansiedad y estrés (UCM), Máster en Psicología General Sanitaria (UNED), Naturópata (FENACO), Coach (ICF), Instructora de Yoga (Kabat), especialista en yoga infantil (Rainbow Kids Yoga).</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Degree in Business Studies, Graduate in Psychology (UNED), Master\'s in Anxiety and Stress (UCM), Master\'s in General Health Psychology (UNED), Naturopath (FENACO), Coach (ICF), Yoga Instructor (Kabat), specialist in children\'s yoga (Rainbow Kids Yoga).</p>'],
    ['<span>Psicología Integrativa</span>', '<span>Integrative Psychology</span>'],

    // Eva
    ['<span class="pro-card__specialty">Psicóloga</span>', '<span class="pro-card__specialty">Psychologist</span>'],
    ['<p class="pro-card__desc">Orientación cognitivo-conductual. Trata trastornos de ansiedad, depresión, trastornos alimentarios, terapia de pareja y sexual, y control de emociones. "Soy consciente de lo difícil que es dar un primer paso para pedir ayuda, no esperes más, ¡pide ayuda!"</p>',
     '<p class="pro-card__desc">Cognitive-behavioral orientation. Treats anxiety disorders, depression, eating disorders, couples and sexual therapy, and emotional control. "I am aware of how difficult it is to take the first step to ask for help — do not wait any longer, ask for help!"</p>'],
    ['<span>Terapia Cognitivo-Conductual</span>', '<span>Cognitive-Behavioral Therapy</span>'],

    // Concepcion
    ['<span class="pro-card__specialty">Psicóloga infantil, adolescentes, familia, adultos y parejas</span>',
     '<span class="pro-card__specialty">Child, Adolescent, Family, Adult and Couples Psychologist</span>'],
    ['<p class="pro-card__desc">Más de 15 años como directora de centro privado en Boadilla del Monte. Trabaja con niños, adolescentes y familias facilitando maduración, comunicación y autoestima. En adultos y pareja usa enfoque integrador: depresiones, ansiedad, fobias, adicciones, duelos, conflictos de pareja y trastornos sexuales.</p>',
     '<p class="pro-card__desc">Over 15 years as director of a private center in Boadilla del Monte. Works with children, adolescents, and families facilitating maturation, communication, and self-esteem. With adults and couples uses an integrative approach: depression, anxiety, phobias, addictions, grief, couple conflicts, and sexual disorders.</p>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Máster en Psicología General Sanitaria (UEM), Psicóloga (UNED), Socióloga (UCM), especialista en Psicoterapia Psicoanalítica, Gestalt, Sistémica y Cognitivo-Conductual. Psicomotricista Relacional. Educadora de Masaje Infantil (AEMI-AIMI).</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Master\'s in General Health Psychology (UEM), Psychologist (UNED), Sociologist (UCM), specialist in Psychoanalytic, Gestalt, Systemic, and Cognitive-Behavioral Psychotherapy. Relational Psychomotricity. Infant Massage Educator (AEMI-AIMI).</p>'],
    ['<span>Psicoterapia infantil y adolescentes</span>', '<span>Child and Adolescent Psychotherapy</span>'],
    ['<span>Terapia familiar</span>', '<span>Family Therapy</span>'],
    ['<span>Terapia de pareja</span>', '<span>Couples Therapy</span>'],

    // Blanca
    ['<span class="pro-card__specialty">Psicóloga infanto-juvenil y adultos</span>', '<span class="pro-card__specialty">Child-Adolescent and Adult Psychologist</span>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Graduada en Psicología (UCM), Máster en Psicología General Sanitaria (UAX), Máster en Psicoterapia Integradora, Trauma y Apego (UDIMA), experta en Psicopatología integradora, formada en atención telemática y crisis, intervención en violencia de género, Mindfulness (MBSR), Terapia Sexual.</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Graduate in Psychology (UCM), Master\'s in General Health Psychology (UAX), Master\'s in Integrative Psychotherapy, Trauma and Attachment (UDIMA), expert in Integrative Psychopathology, trained in telematic care and crisis intervention, gender violence intervention, Mindfulness (MBSR), Sexual Therapy.</p>'],
    ['<span>Psicología infanto-juvenil</span>', '<span>Child-Adolescent Psychology</span>'],
    ['<span>Trauma y Apego</span>', '<span>Trauma and Attachment</span>'],

    // Alberto
    ['<span class="pro-card__specialty">Fisioterapeuta y Entrenador Personal</span>', '<span class="pro-card__specialty">Physiotherapist and Personal Trainer</span>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Graduado en CAFYD y Fisioterapia, postgrado en terapia manual ortopédica y dolor, especialista en terapia miofascial y punción seca, ejercicio terapéutico para dolor crónico.</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Graduate in Sport Science and Physiotherapy, postgraduate in orthopedic manual therapy and pain, specialist in myofascial therapy and dry needling, therapeutic exercise for chronic pain.</p>'],
    ['<span>Masaje Terapéutico</span>', '<span>Therapeutic Massage</span>'],
    ['<span>Punción Seca</span>', '<span>Dry Needling</span>'],
    ['<span>Pilates y Stretching</span>', '<span>Pilates and Stretching</span>'],
    ['<span>Entrenamiento Personal</span>', '<span>Personal Training</span>'],

    // Lilibeth
    ['<span class="pro-card__specialty">Dietista-Nutricionista</span>', '<span class="pro-card__specialty">Dietitian-Nutritionist</span>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Graduada en Nutrición Humana y Dietética (Universidad de Alicante, mención en Nutrición Clínica), Máster en Nutrición Clínica y Dietética Aplicada (Centro Nutrición Aleris), Experto en Entrevista Motivacional (Norte Salud).</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Graduate in Human Nutrition and Dietetics (University of Alicante, major in Clinical Nutrition), Master\'s in Clinical Nutrition and Applied Dietetics (Aleris Nutrition Center), Expert in Motivational Interviewing (Norte Salud).</p>'],
    ['<span>Pérdida de grasa</span>', '<span>Fat loss</span>'],
    ['<span>Educación Nutricional</span>', '<span>Nutritional Education</span>'],
    ['<span>Nutrición Clínica</span>', '<span>Clinical Nutrition</span>'],
    ['<span>Alimentación vegetariana/vegana</span>', '<span>Vegetarian/Vegan diet</span>'],

    // Bettina
    ['<span class="pro-card__specialty">Esteticista</span>', '<span class="pro-card__specialty">Aesthetician</span>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Grado superior en estética integral (Nicolás Larburu), cursos avanzados en manicura/pedicura (Armengol), IPL y Láser (Centro Arce), maquillaje, uñas (Nails Academy), masaje estético, Máster en masaje estético (Educa), extensiones de pestañas (Holalash), estética y nutrición vegana (Agge).</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Advanced degree in integral aesthetics (Nicolás Larburu), advanced courses in manicure/pedicure (Armengol), IPL and Laser (Centro Arce), makeup, nails (Nails Academy), aesthetic massage, Master\'s in Aesthetic Massage (Educa), eyelash extensions (Holalash), vegan aesthetics and nutrition (Agge).</p>'],
    ['<span>Peeling Ultrasónico</span>', '<span>Ultrasonic Peeling</span>'],
    ['<span>Radiofrecuencia Facial</span>', '<span>Facial Radiofrequency</span>'],
    ['<span>Cavitación y Lipólisis</span>', '<span>Cavitation and Lipolysis</span>'],
    ['<span>INDIBA Corporal</span>', '<span>INDIBA Body</span>'],
    ['<span>Extensiones de Pestañas</span>', '<span>Eyelash Extensions</span>'],

    // Gloria
    ['<span class="pro-card__specialty">Médico especialista en Medicina Estética</span>', '<span class="pro-card__specialty">Medical Doctor specializing in Aesthetic Medicine</span>'],
    ['<p class="pro-card__desc">Busca con su experiencia poder ayudar a sentirse bien y gustarse más. Cubre desde urgencias hasta pequeños retoques estéticos naturales.</p>',
     '<p class="pro-card__desc">Uses her experience to help people feel good and like themselves more. Covers everything from emergencies to small natural aesthetic touch-ups.</p>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Máster en Medicina Estética (URJC), Licenciada en Medicina (UAM), especialista en Medicina Familiar y Comunitaria.</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Master\'s in Aesthetic Medicine (URJC), Medical Degree (UAM), specialist in Family and Community Medicine.</p>'],
    ['<span>Toxina Botulínica</span>', '<span>Botulinum Toxin</span>'],
    ['<span>Ácido Hialurónico</span>', '<span>Hyaluronic Acid</span>'],
    ['<span>Hilos Tensores PDO</span>', '<span>PDO Thread Lifting</span>'],
    ['<span>Mesoterapia</span>', '<span>Mesotherapy</span>'],
    ['<span>Carboxiterapia</span>', '<span>Carboxytherapy</span>'],

    // Ana
    ['<span class="pro-card__specialty">Acupuntura y Homeopatía</span>', '<span class="pro-card__specialty">Acupuncture and Homeopathy</span>'],
    ['<p class="pro-card__desc">Habilitada por el Ministerio de Sanidad para Medicina General en sistema público español y europeo. El Colegio de Médicos de Madrid la reconoce con formación en Homeopatía, Acupuntura y Naturopatía.</p>',
     '<p class="pro-card__desc">Authorized by the Ministry of Health for General Medicine in the Spanish and European public system. The Madrid Medical Association recognizes her training in Homeopathy, Acupuncture, and Naturopathy.</p>'],
    ['<p class="pro-card__formacion"><strong>Formación:</strong> Licenciada en Medicina (UAH), postgrado en Acupuntura (Universidad de Heilongjiang, China), diplomada en Homeopatía (CEDH, Francia). Especialista en Acupuntura del Maestro Tung, Balance Method, Craneopuntura, Auriculoterapia, Homeoespagyria, Biorregulación, Biomagnetismo, Flores de Bach, Hipnosis, Terapia Regresiva, SHEC.</p>',
     '<p class="pro-card__formacion"><strong>Education:</strong> Medical Degree (UAH), postgraduate in Acupuncture (Heilongjiang University, China), diploma in Homeopathy (CEDH, France). Specialist in Master Tung Acupuncture, Balance Method, Craniopuncture, Auriculotherapy, Homeoespagyria, Bioregulation, Biomagnetism, Bach Flowers, Hypnosis, Regressive Therapy, SHEC.</p>'],
    ['<span>Acupuntura</span>', '<span>Acupuncture</span>'],
    ['<span>Homeopatía</span>', '<span>Homeopathy</span>'],
  ]);

  // ============================================================
  // 24. PROFESSIONAL DETAIL PAGES
  // ============================================================
  c = replaceAll(c, [
    // CTA boxes (generic)
    ['<p class="pro-detail-page__cta-title">¿Hablamos?</p>', '<p class="pro-detail-page__cta-title">Let\'s talk?</p>'],
    ['<p class="pro-detail-page__cta-sub">Primera consulta gratuita</p>', '<p class="pro-detail-page__cta-sub">Free first consultation</p>'],
    ['<p class="pro-detail-page__cta-sub">Valoración personalizada</p>', '<p class="pro-detail-page__cta-sub">Personalized assessment</p>'],
    ['<p class="pro-detail-page__cta-sub">Presupuesto sin compromiso</p>', '<p class="pro-detail-page__cta-sub">No-obligation quote</p>'],
    ['<p class="pro-detail-page__cta-sub">Valoración médica</p>', '<p class="pro-detail-page__cta-sub">Medical assessment</p>'],
    ['>Reservar cita<', '>Book appointment<'],

    // Sofia detail
    ['<div class="pro-detail-page__badge">CEO · Clínica Salud y Más</div>', '<div class="pro-detail-page__badge">CEO · Clínica Salud y Más</div>'],
    ['<p class="pro-detail-page__specialty">Psicóloga, Coach y Profesora de Yoga &mdash; Col. M-32808</p>',
     '<p class="pro-detail-page__specialty">Psychologist, Coach and Yoga Teacher &mdash; Col. M-32808</p>'],
    ['<p class="pro-detail-page__bio">Enfoque holístico que integra psicología, ADE, naturopatía y yoga. Busca el equilibrio mente-cuerpo desde una perspectiva integradora. <em>"Tú eres el especialista de tu vida y yo te acompaño para que puedas encontrar tu bienestar."</em></p>',
     '<p class="pro-detail-page__bio">A holistic approach integrating psychology, business, naturopathy, and yoga. Seeks mind-body balance from an integrative perspective. <em>"You are the specialist in your life and I accompany you so you can find your well-being."</em></p>'],
    ['<h2>Formación</h2>', '<h2>Education</h2>'],
    ['<li>Licenciada en Empresariales</li>', '<li>Degree in Business Studies</li>'],
    ['<li>Graduada en Psicología (UNED)</li>', '<li>Graduate in Psychology (UNED)</li>'],
    ['<li>Máster en Ansiedad y Estrés (UCM)</li>', '<li>Master\'s in Anxiety and Stress (UCM)</li>'],
    ['<li>Máster en Psicología General Sanitaria (UNED)</li>', '<li>Master\'s in General Health Psychology (UNED)</li>'],
    ['<li>Naturópata acreditada (FENACO)</li>', '<li>Accredited Naturopath (FENACO)</li>'],
    ['<li>Coach certificada (ICF)</li>', '<li>Certified Coach (ICF)</li>'],
    ['<li>Instructora de Yoga (Kabat)</li>', '<li>Yoga Instructor (Kabat)</li>'],
    ['<li>Especialista en Yoga Infantil (Rainbow Kids Yoga)</li>', '<li>Specialist in Children\'s Yoga (Rainbow Kids Yoga)</li>'],
    ['<h2>Terapias</h2>', '<h2>Therapies</h2>'],
    ['<span>Yoga y Mindfulness</span>', '<span>Yoga and Mindfulness</span>'],

    // Eva detail
    ['<p class="pro-detail-page__specialty">Psicóloga &mdash; Col. M-11078</p>',
     '<p class="pro-detail-page__specialty">Psychologist &mdash; Col. M-11078</p>'],
    ['<p class="pro-detail-page__bio">Trabaja desde la orientación cognitivo-conductual con técnicas avaladas por la evidencia científica.</p>',
     '<p class="pro-detail-page__bio">Works from a cognitive-behavioral orientation with techniques backed by scientific evidence.</p>'],
    ['<blockquote class="pro-detail-page__quote">"Soy consciente de lo difícil que es dar un primer paso para pedir ayuda, no esperes más, ¡pide ayuda!"</blockquote>',
     '<blockquote class="pro-detail-page__quote">"I am aware of how difficult it is to take the first step to ask for help — do not wait any longer, ask for help!"</blockquote>'],
    ['<h2>Especialidades</h2>', '<h2>Specialties</h2>'],
    ['<li>Trastornos de ansiedad y depresión</li>', '<li>Anxiety and depression disorders</li>'],
    ['<li>Trastornos alimentarios</li>', '<li>Eating disorders</li>'],
    ['<li>Terapia de pareja y sexual</li>', '<li>Couples and sexual therapy</li>'],
    ['<li>Control de emociones</li>', '<li>Emotional control</li>'],

    // Concepcion detail
    ['<div class="pro-detail-page__badge">Más de 15 años en Boadilla del Monte</div>',
     '<div class="pro-detail-page__badge">Over 15 years in Boadilla del Monte</div>'],
    ['<p class="pro-detail-page__specialty">Psicóloga infantil, adolescentes, familia, adultos y parejas &mdash; Col. M-33055</p>',
     '<p class="pro-detail-page__specialty">Child, Adolescent, Family, Adult and Couples Psychologist &mdash; Col. M-33055</p>'],
    ['<p class="pro-detail-page__bio">Con niños y adolescentes facilita procesos de maduración, comunicación y autoestima. En adultos y pareja utiliza un enfoque integrador abordando depresiones, ansiedad, fobias, adicciones, duelos, conflictos de pareja y trastornos sexuales.</p>',
     '<p class="pro-detail-page__bio">With children and adolescents she facilitates maturation, communication, and self-esteem processes. With adults and couples she uses an integrative approach addressing depression, anxiety, phobias, addictions, grief, couple conflicts, and sexual disorders.</p>'],
    ['<li>Máster en Psicología General Sanitaria (UEM)</li>', '<li>Master\'s in General Health Psychology (UEM)</li>'],
    ['<li>Psicóloga (UNED) y Socióloga (UCM)</li>', '<li>Psychologist (UNED) and Sociologist (UCM)</li>'],
    ['<li>Especialista en Psicoterapia Psicoanalítica, Gestalt, Sistémica y Cognitivo-Conductual</li>',
     '<li>Specialist in Psychoanalytic, Gestalt, Systemic, and Cognitive-Behavioral Psychotherapy</li>'],
    ['<li>Psicomotricista Relacional</li>', '<li>Relational Psychomotricity Specialist</li>'],
    ['<li>Educadora de Masaje Infantil (AEMI-AIMI)</li>', '<li>Infant Massage Educator (AEMI-AIMI)</li>'],
    ['<span>Psicología adultos</span>', '<span>Adult Psychology</span>'],

    // Blanca detail
    ['<p class="pro-detail-page__specialty">Psicóloga infanto-juvenil y adultos &mdash; Col. M-39611</p>',
     '<p class="pro-detail-page__specialty">Child-Adolescent and Adult Psychologist &mdash; Col. M-39611</p>'],
    ['<p class="pro-detail-page__bio">Especializada en niños, adolescentes y adultos desde un enfoque integrador que combina psicoterapia, trauma y apego con Mindfulness para una atención completa y personalizada.</p>',
     '<p class="pro-detail-page__bio">Specialized in children, adolescents, and adults from an integrative approach combining psychotherapy, trauma and attachment with Mindfulness for comprehensive and personalized care.</p>'],
    ['<li>Máster en Psicoterapia Integradora, Trauma y Apego (UDIMA)</li>', '<li>Master\'s in Integrative Psychotherapy, Trauma and Attachment (UDIMA)</li>'],
    ['<li>Experta en Psicopatología Integradora</li>', '<li>Expert in Integrative Psychopathology</li>'],
    ['<li>Formada en atención telemática e intervención en crisis</li>', '<li>Trained in telematic care and crisis intervention</li>'],
    ['<li>Intervención en violencia de género</li>', '<li>Gender violence intervention</li>'],
    ['<li>Mindfulness (MBSR) y Terapia Sexual</li>', '<li>Mindfulness (MBSR) and Sexual Therapy</li>'],

    // Alberto detail
    ['<p class="pro-detail-page__specialty">Fisioterapeuta y Entrenador Personal &mdash; Col. 017149</p>',
     '<p class="pro-detail-page__specialty">Physiotherapist and Personal Trainer &mdash; Col. 017149</p>'],
    ['<p class="pro-detail-page__bio">Enfoque integral del movimiento y la salud física. Especializado en el tratamiento del dolor crónico mediante terapia manual avanzada y ejercicio terapéutico personalizado.</p>',
     '<p class="pro-detail-page__bio">Comprehensive approach to movement and physical health. Specialized in chronic pain treatment through advanced manual therapy and personalized therapeutic exercise.</p>'],
    ['<li>Graduado en CAFYD y Fisioterapia</li>', '<li>Graduate in Sport Science and Physiotherapy</li>'],
    ['<li>Postgrado en Terapia Manual Ortopédica y Dolor</li>', '<li>Postgraduate in Orthopedic Manual Therapy and Pain</li>'],
    ['<li>Especialista en Terapia Miofascial y Punción Seca</li>', '<li>Specialist in Myofascial Therapy and Dry Needling</li>'],
    ['<li>Ejercicio Terapéutico para Dolor Crónico</li>', '<li>Therapeutic Exercise for Chronic Pain</li>'],
    ['<span>INDIBA (Diatermia)</span>', '<span>INDIBA (Diathermy)</span>'],
    ['<span>Drenaje Linfático</span>', '<span>Lymphatic Drainage</span>'],
    ['<span>Pilates y Stretching</span>', '<span>Pilates and Stretching</span>'],
    ['<span>Hipopresivos GAH</span>', '<span>GAH Hypopressives</span>'],
    ['<span>Entrenamiento Personal</span>', '<span>Personal Training</span>'],

    // Lilibeth detail
    ['<p class="pro-detail-page__bio">Nutricionista clínica con un enfoque integral que va más allá del peso. Ayuda a sus pacientes a construir una relación saludable con la alimentación mediante planes personalizados adaptados a cada etapa vital y condición clínica.</p>',
     '<p class="pro-detail-page__bio">Clinical nutritionist with a comprehensive approach that goes beyond weight. Helps patients build a healthy relationship with food through personalized plans adapted to each life stage and clinical condition.</p>'],
    ['<li>Graduada en Nutrición Humana y Dietética (Univ. Alicante, mención Nutrición Clínica)</li>',
     '<li>Graduate in Human Nutrition and Dietetics (Univ. Alicante, major Clinical Nutrition)</li>'],
    ['<li>Máster en Nutrición Clínica y Dietética Aplicada (Centro Aleris)</li>',
     '<li>Master\'s in Clinical Nutrition and Applied Dietetics (Aleris Center)</li>'],
    ['<li>Experto en Entrevista Motivacional (Norte Salud)</li>', '<li>Expert in Motivational Interviewing (Norte Salud)</li>'],
    ['<span>Nutrición Clínica (SIBO, H. pylori, hipotiroidismo)</span>', '<span>Clinical Nutrition (SIBO, H. pylori, hypothyroidism)</span>'],
    ['<span>Menopausia</span>', '<span>Menopause</span>'],
    ['<span>Hipertensión</span>', '<span>Hypertension</span>'],

    // Bettina detail
    ['<p class="pro-detail-page__bio">Esteticista integral con formación de alto nivel y más de una década de experiencia en tratamientos faciales y corporales avanzados. Combina la última tecnología con productos de alta gama para realzar la belleza natural de cada persona.</p>',
     '<p class="pro-detail-page__bio">Comprehensive aesthetician with high-level training and over a decade of experience in advanced facial and body treatments. Combines the latest technology with high-end products to enhance each person\'s natural beauty.</p>'],
    ['<li>Grado Superior en Estética Integral (Nicolás Larburu)</li>', '<li>Advanced Degree in Integral Aesthetics (Nicolás Larburu)</li>'],
    ['<li>Máster en Masaje Estético (Educa)</li>', '<li>Master\'s in Aesthetic Massage (Educa)</li>'],
    ['<li>Manicura y Pedicura (Armengol)</li>', '<li>Manicure and Pedicure (Armengol)</li>'],
    ['<li>IPL y Láser (Centro Arce)</li>', '<li>IPL and Laser (Centro Arce)</li>'],
    ['<li>Maquillaje profesional (Hnos. Larrinaga)</li>', '<li>Professional Makeup (Hnos. Larrinaga)</li>'],
    ['<li>Uñas (Nails Academy)</li>', '<li>Nails (Nails Academy)</li>'],
    ['<li>Extensiones de pestañas (Holalash)</li>', '<li>Eyelash Extensions (Holalash)</li>'],
    ['<li>Estética y nutrición vegana (Agge)</li>', '<li>Vegan Aesthetics and Nutrition (Agge)</li>'],
    ['<h2>Tratamientos</h2>', '<h2>Treatments</h2>'],
    ['<span>Peeling Químico</span>', '<span>Chemical Peel</span>'],
    ['<span>Diseño de Cejas</span>', '<span>Eyebrow Design</span>'],
    ['<span>Presoterapia</span>', '<span>Pressotherapy</span>'],

    // Gloria detail
    ['<p class="pro-detail-page__specialty">Médico especialista en Medicina Estética &mdash; Col. M-38895</p>',
     '<p class="pro-detail-page__specialty">Medical Doctor specializing in Aesthetic Medicine &mdash; Col. M-38895</p>'],
    ['<p class="pro-detail-page__bio">Médico con amplia trayectoria en el sistema público y privado. Su experiencia en Medicina Familiar y Comunitaria le da una visión global del paciente, que complementa con tratamientos estéticos avanzados. Busca resultados naturales que realcen la belleza sin artificios.</p>',
     '<p class="pro-detail-page__bio">Medical doctor with extensive experience in both public and private systems. Her experience in Family and Community Medicine gives her a global view of the patient, complemented with advanced aesthetic treatments. She seeks natural results that enhance beauty without artifice.</p>'],
    ['<li>Licenciada en Medicina (UAM)</li>', '<li>Medical Degree (UAM)</li>'],
    ['<li>Máster en Medicina Estética (URJC)</li>', '<li>Master\'s in Aesthetic Medicine (URJC)</li>'],
    ['<li>Especialista en Medicina Familiar y Comunitaria</li>', '<li>Specialist in Family and Community Medicine</li>'],
    ['<span>Hidroxiapatita Cálcica</span>', '<span>Calcium Hydroxyapatite</span>'],
    ['<span>Mesoterapia Corporal y Capilar</span>', '<span>Body and Scalp Mesotherapy</span>'],
    ['<span>Aqualyx</span>', '<span>Aqualyx</span>'],
    ['<span>Tratamiento de Varices</span>', '<span>Varicose Vein Treatment</span>'],

    // Ana detail
    ['<div class="pro-detail-page__badge">Habilitada por el Ministerio de Sanidad</div>',
     '<div class="pro-detail-page__badge">Authorized by the Ministry of Health</div>'],
    ['<p class="pro-detail-page__specialty">Acupuntura y Homeopatía &mdash; Col. 28 28 39862</p>',
     '<p class="pro-detail-page__specialty">Acupuncture and Homeopathy &mdash; Col. 28 28 39862</p>'],
    ['<p class="pro-detail-page__bio">Médico colegiada reconocida por el Colegio de Médicos de Madrid con formación en Homeopatía, Acupuntura y Naturopatía. Combina la medicina occidental con las terapias naturales y la sabiduría de la Medicina Tradicional China para restaurar el equilibrio energético y la salud integral.</p>',
     '<p class="pro-detail-page__bio">Registered doctor recognized by the Madrid Medical Association with training in Homeopathy, Acupuncture, and Naturopathy. She combines Western medicine with natural therapies and the wisdom of Traditional Chinese Medicine to restore energetic balance and integral health.</p>'],
    ['<li>Licenciada en Medicina (UAH)</li>', '<li>Medical Degree (UAH)</li>'],
    ['<li>Habilitada por el Ministerio de Sanidad para Medicina General en la UE</li>',
     '<li>Authorized by the Ministry of Health for General Medicine in the EU</li>'],
    ['<li>Postgrado en Acupuntura (Universidad de Heilongjiang, China)</li>',
     '<li>Postgraduate in Acupuncture (Heilongjiang University, China)</li>'],
    ['<li>Diplomada en Homeopatía (CEDH, Francia)</li>', '<li>Diploma in Homeopathy (CEDH, France)</li>'],
    ['<li>Acupuntura del Maestro Tung y Balance Method</li>', '<li>Master Tung Acupuncture and Balance Method</li>'],
    ['<li>Craneopuntura y Auriculoterapia</li>', '<li>Craniopuncture and Auriculotherapy</li>'],
    ['<li>Homeoespagyria y Biorregulación</li>', '<li>Homeoespagyria and Bioregulation</li>'],
    ['<li>Biomagnetismo y Flores de Bach</li>', '<li>Biomagnetism and Bach Flowers</li>'],
    ['<li>Hipnosis y Terapia Regresiva (SHEC)</li>', '<li>Hypnosis and Regressive Therapy (SHEC)</li>'],
    ['<span>Acupuntura Clásica</span>', '<span>Classical Acupuncture</span>'],
    ['<span>Electroacupuntura</span>', '<span>Electroacupuncture</span>'],
    ['<span>Auriculoterapia</span>', '<span>Auriculotherapy</span>'],
  ]);

  // ============================================================
  // 25. TAB: VIDEOCONSULTA
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag section-tag--light">Online</span>', '<span class="section-tag section-tag--light">Online</span>'],
    ['<h1 class="tab-hero__title">Videoconsulta</h1>', '<h1 class="tab-hero__title">Video Consultation</h1>'],
    ['<p class="tab-hero__subtitle">Tu salud, estés donde estés. Consultas online con total privacidad y seguridad.</p>',
     '<p class="tab-hero__subtitle">Your health, wherever you are. Online consultations with total privacy and security.</p>'],
    ['Ofrecemos psicología, coaching y nutrición en modalidad online. La misma calidad profesional, desde la comodidad de tu hogar y con los más altos estándares de confidencialidad.',
     'We offer psychology, coaching, and nutrition online. The same professional quality, from the comfort of your home and with the highest confidentiality standards.'],
    ['>Reserva tu primera cita<', '>Book your first appointment<'],
  ]);

  // ============================================================
  // 26. TAB: NOTICIAS
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Blog de Salud</span>', '<span class="section-tag">Health Blog</span>'],
    ['<h1 class="tab-hero__title">Noticias</h1>', '<h1 class="tab-hero__title">News</h1>'],
    ['<p class="tab-hero__subtitle">Información, consejos y reflexiones para tu bienestar.</p>',
     '<p class="tab-hero__subtitle">Information, advice, and reflections for your well-being.</p>'],
    // News cards
    ['<h3>Sexualización precoz y redes sociales</h3>', '<h3>Early sexualization and social media</h3>'],
    ['<p>Reflexionamos sobre el impacto que las redes sociales tienen en el desarrollo de niños y adolescentes.</p>',
     '<p>We reflect on the impact that social media has on the development of children and adolescents.</p>'],
    ['<h3>Redes sociales: ¿compañía o soledad?</h3>', '<h3>Social media: company or loneliness?</h3>'],
    ['<p>Analizamos la paradoja de la hiperconexión digital y el aislamiento emocional.</p>',
     '<p>We analyze the paradox of digital hyperconnection and emotional isolation.</p>'],
    ['<h3>El uso del móvil y las redes sociales</h3>', '<h3>Mobile phone use and social media</h3>'],
    ['<p>Exploramos los efectos neurológicos del uso intensivo del móvil en nuestro cerebro.</p>',
     '<p>We explore the neurological effects of intensive mobile phone use on our brain.</p>'],
    ['<h3>Neuromodulación</h3>', '<h3>Neuromodulation</h3>'],
    ['<p>Descubre las últimas técnicas de neuromodulación para mejorar tu bienestar cognitivo.</p>',
     '<p>Discover the latest neuromodulation techniques to improve your cognitive well-being.</p>'],
    ['<h3>Bienestar en la tercera edad</h3>', '<h3>Well-being in senior years</h3>'],
    ['<p>Estrategias para mantener una vida plena, activa y saludable durante la madurez.</p>',
     '<p>Strategies to maintain a full, active, and healthy life during maturity.</p>'],
    ['<h3>Envejecimiento activo</h3>', '<h3>Active aging</h3>'],
    ['<p>Claves para un envejecimiento saludable basado en la actividad física y mental.</p>',
     '<p>Keys to healthy aging based on physical and mental activity.</p>'],
    ['>Leer artículo &rarr;<', '>Read article &rarr;<'],
  ]);

  // ============================================================
  // 27. TAB: PRECIOS
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Precios</span>', '<span class="section-tag">Prices</span>'],
    ['<h1 class="tab-hero__title">Inversión en tu bienestar</h1>', '<h1 class="tab-hero__title">Investment in your well-being</h1>'],
    ['<p class="tab-hero__subtitle">Precios transparentes. Sin compromiso. Primera consulta gratuita en todas las áreas.</p>',
     '<p class="tab-hero__subtitle">Transparent prices. No obligation. Free first consultation in all areas.</p>'],
    ['<p>Estos son precios orientativos. <strong>La primera consulta es gratuita</strong> en todas las especialidades. Contacta con nosotros para un presupuesto personalizado.</p>',
     '<p>These are indicative prices. <strong>The first consultation is free</strong> in all specialties. Contact us for a personalized quote.</p>'],

    // Pricing cards
    ['<li>Terapia individual adultos</li>', '<li>Individual adult therapy</li>'],
    ['<li>Terapia infanto-juvenil</li>', '<li>Child and adolescent therapy</li>'],
    ['<li>Terapia de pareja: <strong>80&euro;</strong></li>', '<li>Couples therapy: <strong>80&euro;</strong></li>'],
    ['<li>Primera consulta: <strong>gratuita</strong></li>', '<li>First consultation: <strong>free</strong></li>'],
    ['<li>Coaching personal</li>', '<li>Personal coaching</li>'],
    ['<li>Coaching profesional</li>', '<li>Professional coaching</li>'],
    ['<li>Coaching de equipos</li>', '<li>Team coaching</li>'],
    ['<li>Primera sesión: <strong>gratuita</strong></li>', '<li>First session: <strong>free</strong></li>'],
    ['<li>Fisioterapia y osteopatía</li>', '<li>Physiotherapy and osteopathy</li>'],
    ['<li>Punción seca</li>', '<li>Dry needling</li>'],
    ['<li>Drenaje linfático</li>', '<li>Lymphatic drainage</li>'],
    ['<li>Valoración inicial: <strong>gratuita</strong></li>', '<li>Initial assessment: <strong>free</strong></li>'],
    ['<li>Plan nutricional personalizado</li>', '<li>Personalized nutrition plan</li>'],
    ['<li>Nutrición clínica</li>', '<li>Clinical nutrition</li>'],
    ['<li>Nutrición deportiva</li>', '<li>Sports nutrition</li>'],
    ['<li>Faciales desde <strong>45&euro;</strong></li>', '<li>Facials from <strong>45&euro;</strong></li>'],
    ['<li>Corporales desde <strong>50&euro;</strong></li>', '<li>Body treatments from <strong>50&euro;</strong></li>'],
    ['<li>Depilación láser</li>', '<li>Laser hair removal</li>'],
    ['<li>Presupuesto: <strong>gratuito</strong></li>', '<li>Consultation: <strong>free</strong></li>'],
    ['<li>Acupuntura clásica</li>', '<li>Classical acupuncture</li>'],
    ['<li>Electroacupuntura</li>', '<li>Electroacupuncture</li>'],
    ['<li>Auriculoterapia</li>', '<li>Auriculotherapy</li>'],
    ['<li>Evaluación cognitiva</li>', '<li>Cognitive assessment</li>'],
    ['<li>TDAH y dificultades de aprendizaje</li>', '<li>ADHD and learning difficulties</li>'],
    ['<li>Dislexia y lectoescritura</li>', '<li>Dyslexia and literacy</li>'],
    ['<li>Primera consulta: <strong>gratuita</strong></li>', '<li>First consultation: <strong>free</strong></li>'],
    ['<li>Yoga y Pilates</li>', '<li>Yoga and Pilates</li>'],
    ['<li>Clase suelta: <strong>15&euro;</strong></li>', '<li>Single class: <strong>15&euro;</strong></li>'],
    ['<li>Bono 10 clases: <strong>120&euro;</strong></li>', '<li>10-class pass: <strong>120&euro;</strong></li>'],
    ['<li>Clase de prueba: <strong>gratuita</strong></li>', '<li>Trial class: <strong>free</strong></li>'],
  ]);

  // ============================================================
  // 28. TAB: RESERVAR CITA (CALENDLY)
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Reservar Cita</span>', '<span class="section-tag">Book Appointment</span>'],
    ['<h1 class="tab-hero__title">Elige día y hora</h1>', '<h1 class="tab-hero__title">Choose day and time</h1>'],
    ['<p class="tab-hero__subtitle">Selecciona la especialidad y reserva tu cita directamente en nuestro calendario.</p>',
     '<p class="tab-hero__subtitle">Select the specialty and book your appointment directly in our calendar.</p>'],
    ['<h3>Calendario de reservas</h3>', '<h3>Booking calendar</h3>'],
    ['<p>Selecciona la especialidad que te interesa para ver la disponibilidad:</p>',
     '<p>Select the specialty you are interested in to see availability:</p>'],
    ['>Psicología<', '>Psychology<'],
    ['>Coaching<', '>Coaching<'],
    ['>Tratamiento Manual<', '>Manual Treatment<'],
    ['>Nutrición<', '>Nutrition<'],
    ['>Belleza<', '>Beauty<'],
    ['>Medicina Natural<', '>Natural Medicine<'],
    ['>Intervención Psicoeducativa<', '>Psychoeducational Intervention<'],
    ['>Clases<', '>Classes<'],
    ['<p class="calendly-placeholder__note">También puedes llamarnos al <strong>91 715 38 44</strong> para reservar por teléfono.</p>',
     '<p class="calendly-placeholder__note">You can also call us at <strong>91 715 38 44</strong> to book by phone.</p>'],
  ]);

  // ============================================================
  // 29. TAB: UBICACION
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Dónde estamos</span>', '<span class="section-tag">Where we are</span>'],
    ['<h1 class="tab-hero__title">Ubicación y Horario</h1>', '<h1 class="tab-hero__title">Location and Hours</h1>'],
    ['<p class="tab-hero__subtitle">En pleno centro de Boadilla del Monte, con fácil acceso y aparcamiento.</p>',
     '<p class="tab-hero__subtitle">In the heart of Boadilla del Monte, with easy access and parking.</p>'],
    ['<h3>&#128205; Dirección</h3>', '<h3>&#128205; Address</h3>'],
    ['>Abrir en Google Maps<', '>Open in Google Maps<'],
    ['<h3>&#128338; Horario</h3>', '<h3>&#128338; Opening Hours</h3>'],
    ['<tr><td>Lunes a Viernes</td>', '<tr><td>Monday to Friday</td>'],
    ['<tr><td>Sábados</td>', '<tr><td>Saturdays</td>'],
    ['<tr><td>Domingos</td><td>Cerrado</td></tr>', '<tr><td>Sundays</td><td>Closed</td></tr>'],
    ['<h3>&#128222; Contacto</h3>', '<h3>&#128222; Contact</h3>'],
    ['<p class="location-info__reg">Centro Sanitario CS 10443</p>', '<p class="location-info__reg">Health Center CS 10443</p>'],
  ]);

  // ============================================================
  // 30. TAB: CONTACTO
  // ============================================================
  c = replaceAll(c, [
    ['<span class="section-tag">Contacto</span>', '<span class="section-tag">Contact</span>'],
    ['<h1 class="tab-hero__title">Estamos aquí para ti</h1>', '<h1 class="tab-hero__title">We are here for you</h1>'],
    ['<p class="tab-hero__subtitle">Da el primer paso hacia tu bienestar. Contacta con nosotros.</p>',
     '<p class="tab-hero__subtitle">Take the first step towards your well-being. Contact us.</p>'],
    ['<div><strong>Email</strong>', '<div><strong>Email</strong>'],
    ['<div><strong>Teléfono</strong>', '<div><strong>Phone</strong>'],
    ['<div><strong>Dirección</strong>', '<div><strong>Address</strong>'],
    ['<div><strong>Registro Sanitario</strong><span>Centro Sanitario CS 10443</span></div>',
     '<div><strong>Health Registry</strong><span>Health Center CS 10443</span></div>'],
    // Form
    ['placeholder="Nombre completo"', 'placeholder="Full name"'],
    ['placeholder="Email"', 'placeholder="Email"'],
    ['placeholder="Teléfono"', 'placeholder="Phone"'],
    ['<option value="">Me interesa...</option>', '<option value="">I\'m interested in...</option>'],
    ['<option>Psicología</option>', '<option>Psychology</option>'],
    ['<option>Coaching</option>', '<option>Coaching</option>'],
    ['<option>Tratamiento Manual</option>', '<option>Manual Treatment</option>'],
    ['<option>Nutrición</option>', '<option>Nutrition</option>'],
    ['<option>Belleza</option>', '<option>Beauty</option>'],
    ['<option>Medicina Natural</option>', '<option>Natural Medicine</option>'],
    ['<option>Intervención Psicoeducativa</option>', '<option>Psychoeducational Intervention</option>'],
    ['<option>Clases</option>', '<option>Classes</option>'],
    ['placeholder="Cuéntanos qué necesitas..."', 'placeholder="Tell us what you need..."'],
    ['<span>Acepto la <a href="https://clinicasaludymas.com/politica-de-privacidad/" target="_blank" rel="noopener">política de privacidad</a></span>',
     '<span>I accept the <a href="https://clinicasaludymas.com/politica-de-privacidad/" target="_blank" rel="noopener">privacy policy</a></span>'],
    ['>Ver disponibilidad<', '>Check availability<'],
  ]);

  // ============================================================
  // 31. NEWSLETTER CTA
  // ============================================================
  c = replaceAll(c, [
    ['<h2>Recibe consejos de salud en tu email</h2>', '<h2>Receive health tips in your inbox</h2>'],
    ['<p>Nuestros profesionales comparten ejercicios, tips de bienestar y novedades cada 15 dias. Sin spam, solo contenido que suma.</p>',
     '<p>Our professionals share exercises, wellness tips, and news every 15 days. No spam, just valuable content.</p>'],
    ['placeholder="Tu mejor email"', 'placeholder="Your best email"'],
    ['aria-label="Tu direccion de email"', 'aria-label="Your email address"'],
    ['>Suscribirme<', '>Subscribe<'],
    ['<p class="newsletter-cta__note">Sin spam, solo contenido de valor. Al suscribirte aceptas nuestra <a href="https://clinicasaludymas.com/politica-de-privacidad/" target="_blank" rel="noopener">politica de privacidad</a>.</p>',
     '<p class="newsletter-cta__note">No spam, just valuable content. By subscribing you accept our <a href="https://clinicasaludymas.com/politica-de-privacidad/" target="_blank" rel="noopener">privacy policy</a>.</p>'],
    ['<h3>Gracias por suscribirte</h3>', '<h3>Thank you for subscribing</h3>'],
    ['<p>Recibiras nuestro primer correo muy pronto.</p>', '<p>You will receive our first email very soon.</p>'],
  ]);

  // ============================================================
  // 32. FOOTER
  // ============================================================
  c = replaceAll(c, [
    ['alt="Logotipo de Clínica Salud y Más — Centro sanitario integral en Boadilla del Monte"',
     'alt="Clínica Salud y Más logo — Integral health center in Boadilla del Monte"'],
    ['<p>Centro sanitario integral en Boadilla del Monte desde 2012. Cuidando de tu salud física, mental y emocional.</p>',
     '<p>Integral health center in Boadilla del Monte since 2012. Caring for your physical, mental, and emotional health.</p>'],
    ['<h4>Terapias</h4>', '<h4>Therapies</h4>'],
    ['<h4>Información</h4>', '<h4>Information</h4>'],
    ['<h4>Horario</h4>', '<h4>Opening Hours</h4>'],
    // Footer links
    ['<a href="psicologia.html">Psicología</a>', '<a href="psicologia.html">Psychology</a>'],
    ['<a href="coaching.html">Coaching</a>', '<a href="coaching.html">Coaching</a>'],
    ['<a href="tratamiento-manual.html">Tratamiento Manual</a>', '<a href="tratamiento-manual.html">Manual Treatment</a>'],
    ['<a href="nutricion.html">Nutrición</a>', '<a href="nutricion.html">Nutrition</a>'],
    ['<a href="belleza.html">Belleza</a>', '<a href="belleza.html">Beauty</a>'],
    ['<a href="medicina-natural.html">Medicina Natural</a>', '<a href="medicina-natural.html">Natural Medicine</a>'],
    ['<a href="clases.html">Clases</a>', '<a href="clases.html">Classes</a>'],
    ['<a href="index.html">Inicio</a>', '<a href="index.html">Home</a>'],
    ['<a href="profesionales.html">Profesionales</a>', '<a href="profesionales.html">Professionals</a>'],
    ['<a href="videoconsulta.html">Videoconsulta</a>', '<a href="videoconsulta.html">Video Consultation</a>'],
    ['<a href="noticias.html">Noticias</a>', '<a href="noticias.html">News</a>'],
    ['<a href="precios.html">Precios</a>', '<a href="precios.html">Prices</a>'],
    ['<a href="ubicacion.html">Ubicación</a>', '<a href="ubicacion.html">Location</a>'],
    ['<a href="contacto.html">Contacto</a>', '<a href="contacto.html">Contact</a>'],
    ['>Aviso Legal<', '>Legal Notice<'],
    ['>Privacidad<', '>Privacy<'],
    // Footer hours
    ['<li><span>Lunes a Viernes</span> <span>9:00 – 21:00</span></li>', '<li><span>Monday to Friday</span> <span>9:00 – 21:00</span></li>'],
    ['<li><span>Sábados</span> <span>10:00 – 14:00</span></li>', '<li><span>Saturdays</span> <span>10:00 – 14:00</span></li>'],
    ['<li><span>Domingos</span> <span>Cerrado</span></li>', '<li><span>Sundays</span> <span>Closed</span></li>'],
    ['<p>&copy; 2012-2026 Clínica Salud y Más. Centro Sanitario CS 10443.</p>',
     '<p>&copy; 2012-2026 Clínica Salud y Más. Health Center CS 10443.</p>'],
  ]);

  // ============================================================
  // 33. WHATSAPP aria-label
  // ============================================================
  c = replaceAll(c, [
    ['aria-label="Chatea con nosotros por WhatsApp"', 'aria-label="Chat with us on WhatsApp"'],
    // Logo alt text (header)
    ['alt="Logotipo de Clínica Salud y Más — Centro de salud integral en Boadilla del Monte"',
     'alt="Clínica Salud y Más logo — Integral health center in Boadilla del Monte"'],
    // Google Maps link title
    ['title="Ver reseñas en Google Maps"', 'title="View reviews on Google Maps"'],
    // Professional image alt texts
    ['alt="Sofía Manzaneque Suárez — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Sofía Manzaneque Suárez — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Eva Fernández — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Eva Fernández — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Concepción Oset — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Concepción Oset — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Blanca Robles — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Blanca Robles — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Alberto Bustos Luque — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Alberto Bustos Luque — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Lilibeth Álvarez Sánchez — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Lilibeth Álvarez Sánchez — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Bettina del Río — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Bettina del Río — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Gloria Pérez Puente — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Gloria Pérez Puente — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    ['alt="Ana Mª Salas Labayen — Profesional de Clínica Salud y Más en Boadilla del Monte"',
     'alt="Ana Mª Salas Labayen — Professional at Clínica Salud y Más in Boadilla del Monte"'],
    // hreflang and language switcher will be added in a second pass
  ]);

  // ============================================================
  // 34. PRICING CARDS: <h3> titles (already translated above,
  // but the pricing card h3s might still be Spanish - they use <h3>Psicología</h3> already handled)
  // NOTE: "Fisioterapia" h3 needs handling
  // ============================================================
  c = replaceAll(c, [
    ['<h3>Fisioterapia</h3>', '<h3>Physiotherapy</h3>'],
    ['<h3>Acupuntura</h3>', '<h3>Acupuncture</h3>'],
  ]);

  // ============================================================
  // 35. LANGUAGE SWITCHER — Add to header
  // ============================================================
  // Insert language switcher before the CTA button in the nav
  const langSwitcherEN = '<li class="header__lang"><a href="../index.html" class="header__link header__lang-link" title="Ver en español" aria-label="Switch to Spanish">ES</a><span class="header__lang-sep">|</span><span class="header__lang-current">EN</span></li>';
  c = c.replace(
    '<li><button class="header__link header__link--cta"',
    langSwitcherEN + '\n          <li><button class="header__link header__link--cta"'
  );

  // Fix the "Más de 200 personas nos valoran con" in testimonials subtitle (was already handled above as partial string)
  // The remaining "4.7/5 en Google" part was already handled

  // Fix OG locale that was already changed
  // Done above

  // ============================================================
  // 36. HREFLANG TAGS — Add to <head>
  // ============================================================
  const pageName = f.replace('.html', '');
  const esPath = pageName === 'index' ? '' : pageName;
  const hreflangTags = `
  <link rel="alternate" hreflang="es" href="https://rodrilopeez.github.io/clinica-saludymas/${esPath}">
  <link rel="alternate" hreflang="en" href="https://rodrilopeez.github.io/clinica-saludymas/en/${f}">
  <link rel="alternate" hreflang="x-default" href="https://rodrilopeez.github.io/clinica-saludymas/${esPath}">`;

  // Insert after the last meta tag or before <link rel="preconnect"
  c = c.replace(
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    hreflangTags + '\n  <link rel="preconnect" href="https://fonts.googleapis.com">'
  );

  // Add lang-switcher CSS (inject a small style block before </head>)
  const langCSS = `
  <style>
    .header__lang { display: flex; align-items: center; gap: 6px; margin-left: 8px; }
    .header__lang-link { padding: 0 4px !important; opacity: 0.6; font-weight: 500; font-size: 0.9rem; }
    .header__lang-link:hover { opacity: 1; }
    .header__lang-current { font-weight: 700; color: var(--blue,#005DAB); font-size: 0.9rem; }
    .header__lang-sep { opacity: 0.3; font-size: 0.85rem; }
    @media (max-width: 900px) { .header__lang { padding: 0.5rem 0; border-top: 1px solid var(--gray-200); margin-top: 0.5rem; } }
  </style>`;
  c = c.replace('</head>', langCSS + '\n</head>');

  fs.writeFileSync(fp, c);
  total++;
});

console.log(`Translated ${total} files successfully.`);
