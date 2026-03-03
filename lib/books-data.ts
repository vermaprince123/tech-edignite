// Tech Edignite — Books & Reference Recommendations

export type Branch = "CSE" | "ECE" | "EE" | "ME" | "CE" | "CHE" | "IT";
export type BookLevel = "Beginner" | "Intermediate" | "Advanced";
export type BookCategory = "Textbook" | "Reference" | "Problem Solving" | "Self-Learning";

export interface Book {
  id: number;
  title: string;
  author: string;
  branch: Branch;
  subject: string;
  description: string;
  level: BookLevel;
  category: BookCategory;
  amazonUrl: string;       // Amazon India search / product link
  coverEmoji: string;
  rating: number;          // out of 5
  mustRead: boolean;
  tags: string[];
}

export interface OnlineCourse {
  id: number;
  title: string;
  platform: string;
  platformIcon: string;
  branch: Branch;
  subject: string;
  url: string;
  free: boolean;
  level: BookLevel;
  description: string;
}

// ────────────────────────────────────────────────────────────────────────────
// BOOKS
// ────────────────────────────────────────────────────────────────────────────
export const books: Book[] = [

  // ── CSE ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Introduction to Algorithms (CLRS)",
    author: "Cormen, Leiserson, Rivest, Stein",
    branch: "CSE",
    subject: "Data Structures & Algorithms",
    description:
      "The definitive algorithms textbook used in IITs and top universities worldwide. Covers every algorithm with proofs, pseudocode, and complexity analysis.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Introduction+to+Algorithms+CLRS+Cormen",
    coverEmoji: "📘",
    rating: 4.8,
    mustRead: true,
    tags: ["DSA", "Algorithms", "Competitive Programming"],
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    branch: "CSE",
    subject: "Software Engineering",
    description:
      "A timeless guide to becoming a better programmer. Covers clean code, debugging, pragmatic philosophy, and career advice every developer needs.",
    level: "Beginner",
    category: "Self-Learning",
    amazonUrl: "https://www.amazon.in/s?k=The+Pragmatic+Programmer+David+Thomas",
    coverEmoji: "🧑‍💻",
    rating: 4.7,
    mustRead: true,
    tags: ["Best Practices", "Career", "Software Craft"],
  },
  {
    id: 3,
    title: "Operating System Concepts (Dinosaur Book)",
    author: "Abraham Silberschatz",
    branch: "CSE",
    subject: "Operating Systems",
    description:
      "The go-to OS textbook. Covers processes, threads, memory management, file systems, and synchronization — essential for placements and GATE.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Operating+System+Concepts+Silberschatz+Galvin",
    coverEmoji: "🦕",
    rating: 4.6,
    mustRead: true,
    tags: ["OS", "GATE", "Systems"],
  },
  {
    id: 4,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    branch: "CSE",
    subject: "Computer Networks",
    description:
      "The world's most widely used networking textbook. Explains the internet stack from physical layer to application layer with clarity and depth.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Computer+Networks+Tanenbaum",
    coverEmoji: "🌐",
    rating: 4.6,
    mustRead: false,
    tags: ["Networking", "GATE", "TCP/IP"],
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin (Uncle Bob)",
    branch: "CSE",
    subject: "Software Engineering",
    description:
      "Every professional software engineer should read this. Teaches how to write readable, maintainable, and testable code through real-world Java examples.",
    level: "Intermediate",
    category: "Self-Learning",
    amazonUrl: "https://www.amazon.in/s?k=Clean+Code+Robert+Martin",
    coverEmoji: "✨",
    rating: 4.7,
    mustRead: true,
    tags: ["Clean Code", "Java", "Refactoring"],
  },
  {
    id: 6,
    title: "Database System Concepts",
    author: "Korth, Silberschatz, Sudarshan",
    branch: "CSE",
    subject: "DBMS",
    description:
      "The standard DBMS textbook for engineering students. Covers ER models, SQL, normalization, transactions, and distributed databases.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Database+System+Concepts+Korth+Silberschatz",
    coverEmoji: "🗄️",
    rating: 4.5,
    mustRead: false,
    tags: ["DBMS", "SQL", "GATE"],
  },

  // ── ECE ──────────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Microelectronic Circuits",
    author: "Adel Sedra & Kenneth Smith",
    branch: "ECE",
    subject: "Electronic Devices & Circuits",
    description:
      "The bible of analog electronics. Covers BJT, MOSFET, amplifiers, op-amps, and feedback circuits with intuitive explanations and SPICE simulations.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Microelectronic+Circuits+Sedra+Smith",
    coverEmoji: "🔬",
    rating: 4.7,
    mustRead: true,
    tags: ["EDC", "Analog", "VLSI", "GATE"],
  },
  {
    id: 8,
    title: "Signals and Systems",
    author: "Alan V. Oppenheim & Allan S. Willsky",
    branch: "ECE",
    subject: "Signals & Systems",
    description:
      "The gold standard for signals & systems. Covers continuous/discrete-time signals, Fourier, Laplace, and Z-transforms with rigorous mathematical treatment.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Signals+and+Systems+Oppenheim+Willsky",
    coverEmoji: "📡",
    rating: 4.6,
    mustRead: true,
    tags: ["Signals", "DSP", "GATE", "Fourier"],
  },
  {
    id: 9,
    title: "Digital Signal Processing",
    author: "John G. Proakis & Dimitris G. Manolakis",
    branch: "ECE",
    subject: "Digital Signal Processing",
    description:
      "Comprehensive DSP textbook covering discrete-time signals, DFT, FFT, filter design, and applications. The standard reference for ECE engineers.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Digital+Signal+Processing+Proakis+Manolakis",
    coverEmoji: "🎛️",
    rating: 4.5,
    mustRead: false,
    tags: ["DSP", "FFT", "Filter Design"],
  },
  {
    id: 10,
    title: "Communication Systems",
    author: "Simon Haykin",
    branch: "ECE",
    subject: "Analog & Digital Communication",
    description:
      "Classic communication systems textbook. Covers AM/FM, digital modulation, noise analysis, and information theory. Essential for GATE ECE.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Communication+Systems+Simon+Haykin",
    coverEmoji: "📻",
    rating: 4.5,
    mustRead: true,
    tags: ["Communications", "GATE", "Modulation"],
  },
  {
    id: 11,
    title: "VLSI Design — Weste & Harris",
    author: "Neil Weste & David Harris",
    branch: "ECE",
    subject: "VLSI Design",
    description:
      "The modern VLSI design textbook. Covers CMOS circuits, logic synthesis, timing, power optimization, and physical design — perfect for chip design aspirants.",
    level: "Advanced",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=CMOS+VLSI+Design+Weste+Harris",
    coverEmoji: "🔲",
    rating: 4.6,
    mustRead: false,
    tags: ["VLSI", "CMOS", "Chip Design"],
  },

  // ── EE ───────────────────────────────────────────────────────────────────
  {
    id: 12,
    title: "Power System Analysis",
    author: "Stevenson & Grainger",
    branch: "EE",
    subject: "Power Systems",
    description:
      "The definitive power systems analysis textbook. Covers load flow, fault analysis, stability, and protection — essential for GATE EE and PSU preparation.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Power+System+Analysis+Stevenson+Grainger",
    coverEmoji: "⚡",
    rating: 4.6,
    mustRead: true,
    tags: ["Power Systems", "GATE EE", "PSU"],
  },
  {
    id: 13,
    title: "Electric Machinery Fundamentals",
    author: "Stephen J. Chapman",
    branch: "EE",
    subject: "Electrical Machines",
    description:
      "The best-selling electrical machines textbook worldwide. Uses intuitive physical explanations alongside mathematics for AC/DC machines and transformers.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Electric+Machinery+Fundamentals+Chapman",
    coverEmoji: "⚙️",
    rating: 4.7,
    mustRead: true,
    tags: ["Electrical Machines", "GATE", "Transformer"],
  },
  {
    id: 14,
    title: "Power Electronics",
    author: "Muhammad H. Rashid",
    branch: "EE",
    subject: "Power Electronics",
    description:
      "Comprehensive coverage of power electronic converters — rectifiers, inverters, choppers, and motor drives. Includes SPICE simulation examples.",
    level: "Advanced",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Power+Electronics+Muhammad+Rashid",
    coverEmoji: "🔋",
    rating: 4.5,
    mustRead: false,
    tags: ["Power Electronics", "Converters", "EV"],
  },
  {
    id: 15,
    title: "Control Systems Engineering",
    author: "Norman S. Nise",
    branch: "EE",
    subject: "Control Systems",
    description:
      "Clear, example-driven approach to control systems. Covers classical and modern control theory, root locus, Bode plots, and state-space methods.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Control+Systems+Engineering+Nise",
    coverEmoji: "🎮",
    rating: 4.6,
    mustRead: true,
    tags: ["Control Systems", "GATE", "PID"],
  },

  // ── ME ───────────────────────────────────────────────────────────────────
  {
    id: 16,
    title: "Engineering Thermodynamics",
    author: "P.K. Nag",
    branch: "ME",
    subject: "Thermodynamics",
    description:
      "India's most popular thermodynamics textbook for ME students. Covers all laws, cycles, mixtures, and combustion with solved examples and GATE-level problems.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Engineering+Thermodynamics+PK+Nag",
    coverEmoji: "🌡️",
    rating: 4.7,
    mustRead: true,
    tags: ["Thermodynamics", "GATE ME", "Cycles"],
  },
  {
    id: 17,
    title: "Shigley's Mechanical Engineering Design",
    author: "Budynas & Nisbett",
    branch: "ME",
    subject: "Machine Design",
    description:
      "The world standard for machine design. Covers stress analysis, fatigue, shafts, gears, bearings, and welds with comprehensive problem sets.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Shigley+Mechanical+Engineering+Design+Budynas",
    coverEmoji: "🔩",
    rating: 4.7,
    mustRead: true,
    tags: ["Machine Design", "Stress Analysis", "Industry"],
  },
  {
    id: 18,
    title: "Fluid Mechanics",
    author: "Frank M. White",
    branch: "ME",
    subject: "Fluid Mechanics",
    description:
      "Comprehensive fluid mechanics textbook. Covers viscous flow, turbulence, pipe systems, and external flow — extensively used in ME and CE programs.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Fluid+Mechanics+Frank+White",
    coverEmoji: "💧",
    rating: 4.6,
    mustRead: false,
    tags: ["Fluid Mechanics", "CFD", "GATE ME"],
  },
  {
    id: 19,
    title: "Manufacturing Engineering & Technology",
    author: "Kalpakjian & Schmid",
    branch: "ME",
    subject: "Manufacturing Processes",
    description:
      "The most comprehensive manufacturing textbook. Covers metal cutting, casting, forming, welding, and CNC with real industry examples.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Manufacturing+Engineering+Technology+Kalpakjian",
    coverEmoji: "🏭",
    rating: 4.5,
    mustRead: false,
    tags: ["Manufacturing", "CNC", "GATE ME"],
  },

  // ── CE ───────────────────────────────────────────────────────────────────
  {
    id: 20,
    title: "Reinforced Concrete Design",
    author: "N. Krishna Raju",
    branch: "CE",
    subject: "RCC Design",
    description:
      "The most recommended RCC design book for Indian BE/B.Tech students. Covers IS 456 code, beams, columns, slabs, footings with worked examples.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Reinforced+Concrete+Design+Krishna+Raju",
    coverEmoji: "🏗️",
    rating: 4.6,
    mustRead: true,
    tags: ["RCC", "IS 456", "Structural Design", "GATE CE"],
  },
  {
    id: 21,
    title: "Soil Mechanics and Foundation Engineering",
    author: "K.R. Arora",
    branch: "CE",
    subject: "Geotechnical Engineering",
    description:
      "India's best-selling geotechnical engineering textbook. Comprehensive coverage of soil properties, consolidation, stability, and foundation design.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Soil+Mechanics+Foundation+Engineering+KR+Arora",
    coverEmoji: "⛏️",
    rating: 4.6,
    mustRead: true,
    tags: ["Geotechnical", "Soil Mechanics", "GATE CE"],
  },
  {
    id: 22,
    title: "Transportation Engineering & Planning",
    author: "C.S. Papacostas",
    branch: "CE",
    subject: "Transportation Engineering",
    description:
      "Covers highway design, traffic engineering, public transportation, and transportation planning. Widely used in Indian engineering universities.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Transportation+Engineering+Planning+Papacostas",
    coverEmoji: "🛣️",
    rating: 4.3,
    mustRead: false,
    tags: ["Transportation", "Highway Design", "Traffic"],
  },
  {
    id: 23,
    title: "Hydraulics and Fluid Mechanics",
    author: "Modi & Seth",
    branch: "CE",
    subject: "Hydraulics",
    description:
      "Classic hydraulics textbook popular in Indian engineering colleges. Covers open channel flow, pipe networks, hydraulic machines, and flood routing.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Hydraulics+Fluid+Mechanics+Modi+Seth",
    coverEmoji: "🌊",
    rating: 4.4,
    mustRead: false,
    tags: ["Hydraulics", "Fluid Mechanics", "GATE CE"],
  },

  // ── CHE ──────────────────────────────────────────────────────────────────
  {
    id: 24,
    title: "Elements of Chemical Reaction Engineering",
    author: "H. Scott Fogler",
    branch: "CHE",
    subject: "Chemical Reaction Engineering",
    description:
      "The CRE bible. Mole balances, reactor design, catalysis — explained through real industrial examples and POLYMATH software. Open access resources available.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Elements+Chemical+Reaction+Engineering+Fogler",
    coverEmoji: "⚗️",
    rating: 4.8,
    mustRead: true,
    tags: ["CRE", "Reactor Design", "Catalysis", "GATE CH"],
  },
  {
    id: 25,
    title: "Unit Operations of Chemical Engineering",
    author: "McCabe, Smith & Harriott",
    branch: "CHE",
    subject: "Mass Transfer & Unit Operations",
    description:
      "The classic unit operations textbook covering distillation, absorption, extraction, drying, evaporation, and heat exchangers with practical examples.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Unit+Operations+Chemical+Engineering+McCabe+Smith",
    coverEmoji: "🏗️",
    rating: 4.6,
    mustRead: true,
    tags: ["Unit Operations", "Distillation", "Mass Transfer"],
  },
  {
    id: 26,
    title: "Perry's Chemical Engineers' Handbook",
    author: "Don W. Green (Editor)",
    branch: "CHE",
    subject: "Chemical Engineering Reference",
    description:
      "The engineering bible for chemical engineers. Comprehensive data, equations, and procedures for virtually every unit operation and process chemical engineers encounter.",
    level: "Advanced",
    category: "Reference",
    amazonUrl: "https://www.amazon.in/s?k=Perry%27s+Chemical+Engineers+Handbook",
    coverEmoji: "📚",
    rating: 4.9,
    mustRead: true,
    tags: ["Reference", "Data Handbook", "Process Design"],
  },
  {
    id: 27,
    title: "Introduction to Chemical Engineering Thermodynamics",
    author: "Smith, Van Ness & Abbott",
    branch: "CHE",
    subject: "Thermodynamics",
    description:
      "The leading chemical engineering thermodynamics textbook. Rigorous treatment of property relations, phase equilibria, and chemical reaction equilibria.",
    level: "Intermediate",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Chemical+Engineering+Thermodynamics+Smith+Van+Ness",
    coverEmoji: "🌡️",
    rating: 4.5,
    mustRead: true,
    tags: ["Thermodynamics", "Phase Equilibria", "GATE CH"],
  },

  // ── IT ───────────────────────────────────────────────────────────────────
  {
    id: 28,
    title: "Computer Networking: A Top-Down Approach",
    author: "Kurose & Ross",
    branch: "IT",
    subject: "Computer Networks",
    description:
      "Best networking book for IT students — starts from applications (HTTP, DNS) and works down to physical layer. Intuitive, with Wireshark lab exercises.",
    level: "Beginner",
    category: "Textbook",
    amazonUrl: "https://www.amazon.in/s?k=Computer+Networking+Top+Down+Approach+Kurose+Ross",
    coverEmoji: "🌐",
    rating: 4.7,
    mustRead: true,
    tags: ["Networking", "TCP/IP", "HTTP", "Wireshark"],
  },
  {
    id: 29,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    branch: "IT",
    subject: "Distributed Systems & Databases",
    description:
      "The modern data engineering bible. Covers databases, replication, consensus, stream processing — essential for backend, cloud, and data engineering roles.",
    level: "Advanced",
    category: "Self-Learning",
    amazonUrl: "https://www.amazon.in/s?k=Designing+Data+Intensive+Applications+Kleppmann",
    coverEmoji: "💾",
    rating: 4.9,
    mustRead: true,
    tags: ["Distributed Systems", "Databases", "Backend", "Cloud"],
  },
  {
    id: 30,
    title: "The Web Application Hacker's Handbook",
    author: "Stuttard & Pinto",
    branch: "IT",
    subject: "Information Security",
    description:
      "Comprehensive guide to web application security. Covers OWASP Top 10, penetration testing, SQL injection, XSS, and authentication vulnerabilities.",
    level: "Intermediate",
    category: "Self-Learning",
    amazonUrl: "https://www.amazon.in/s?k=Web+Application+Hacker+Handbook+Stuttard",
    coverEmoji: "🔒",
    rating: 4.5,
    mustRead: false,
    tags: ["Cybersecurity", "Hacking", "OWASP", "Pentesting"],
  },
  {
    id: 31,
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    branch: "IT",
    subject: "Placement Preparation",
    description:
      "The #1 placement prep book. 189 programming problems with detailed solutions, behavioral guidance, and insider tips from Google, Microsoft, and Amazon engineers.",
    level: "Intermediate",
    category: "Problem Solving",
    amazonUrl: "https://www.amazon.in/s?k=Cracking+the+Coding+Interview+Gayle+McDowell",
    coverEmoji: "🎯",
    rating: 4.7,
    mustRead: true,
    tags: ["Placement", "DSA", "Interviews", "FAANG"],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// ONLINE COURSES
// ────────────────────────────────────────────────────────────────────────────
export const onlineCourses: OnlineCourse[] = [
  // CSE
  { id: 1, title: "CS50: Introduction to Computer Science", platform: "Harvard / edX", platformIcon: "🎓", branch: "CSE", subject: "Programming Fundamentals", url: "https://cs50.harvard.edu/x/", free: true, level: "Beginner", description: "The world's most popular intro CS course — C, Python, SQL, JavaScript with weekly problem sets." },
  { id: 2, title: "DSA by Striver (A2Z Sheet)", platform: "YouTube / TakeUForward", platformIcon: "▶️", branch: "CSE", subject: "Data Structures & Algorithms", url: "https://takeuforward.org/strivers-a2z-dsa-course/", free: true, level: "Intermediate", description: "Most comprehensive free DSA course in India — 455 problems with video explanations in Java/C++." },
  { id: 3, title: "Machine Learning Specialization", platform: "Coursera (DeepLearning.AI)", platformIcon: "🤖", branch: "CSE", subject: "Machine Learning", url: "https://www.coursera.org/specializations/machine-learning-introduction", free: false, level: "Intermediate", description: "Andrew Ng's updated ML course — regression, neural networks, decision trees in Python/TensorFlow." },
  { id: 4, title: "NPTEL: Design & Analysis of Algorithms", platform: "NPTEL (IIT Madras)", platformIcon: "🏛️", branch: "CSE", subject: "Algorithms", url: "https://nptel.ac.in/courses/106106131", free: true, level: "Advanced", description: "IIT Madras course — formal algorithm analysis, graph algorithms, NP-completeness." },

  // ECE
  { id: 5, title: "NPTEL: Digital Signal Processing", platform: "NPTEL (IIT Delhi)", platformIcon: "🏛️", branch: "ECE", subject: "DSP", url: "https://nptel.ac.in/courses/117102060", free: true, level: "Intermediate", description: "IIT Delhi's DSP course — DFT, FFT, FIR/IIR filter design with MATLAB labs." },
  { id: 6, title: "VLSI Design Flow", platform: "Coursera (UC San Diego)", platformIcon: "🎓", branch: "ECE", subject: "VLSI", url: "https://www.coursera.org/learn/vlsi-cad-logic", free: false, level: "Advanced", description: "Complete digital VLSI design — RTL to GDSII flow using industry tools." },
  { id: 7, title: "Embedded Systems — Shape The World", platform: "edX (UT Austin)", platformIcon: "🔌", branch: "ECE", subject: "Embedded Systems", url: "https://www.edx.org/learn/embedded-systems/the-university-of-texas-at-austin-embedded-systems-shape-the-world-microcontroller-inputoutput", free: true, level: "Beginner", description: "ARM Cortex-M3 embedded programming — interfaces, peripherals, RTOS basics." },

  // EE
  { id: 8, title: "NPTEL: Power Systems Analysis", platform: "NPTEL (IIT Bombay)", platformIcon: "🏛️", branch: "EE", subject: "Power Systems", url: "https://nptel.ac.in/courses/108101016", free: true, level: "Intermediate", description: "IIT Bombay — load flow, fault analysis, stability, and power system protection." },
  { id: 9, title: "NPTEL: Control Engineering", platform: "NPTEL (IIT Guwhati)", platformIcon: "🏛️", branch: "EE", subject: "Control Systems", url: "https://nptel.ac.in/courses/108103008", free: true, level: "Intermediate", description: "Classical and modern control — Bode plots, root locus, state-space, with MATLAB exercises." },

  // ME
  { id: 10, title: "NPTEL: Thermodynamics", platform: "NPTEL (IIT Kharagpur)", platformIcon: "🏛️", branch: "ME", subject: "Thermodynamics", url: "https://nptel.ac.in/courses/112105123", free: true, level: "Intermediate", description: "IIT Kharagpur thermodynamics — all laws, cycles, mixtures, combustion, refrigeration." },
  { id: 11, title: "ANSYS FEA Training", platform: "ANSYS Learning Hub", platformIcon: "🖥️", branch: "ME", subject: "Finite Element Analysis", url: "https://www.ansys.com/academic/students", free: true, level: "Intermediate", description: "Structural and thermal simulations using ANSYS Workbench — free for students." },
  { id: 12, title: "SolidWorks for Students", platform: "SolidWorks / CSWA Prep", platformIcon: "✏️", branch: "ME", subject: "CAD Design", url: "https://www.solidworks.com/sw/education/student-software-3d-mcad.htm", free: false, level: "Beginner", description: "3D modeling, assemblies, and drawings — prepare for the CSWA certification exam." },

  // CE
  { id: 13, title: "NPTEL: Strength of Materials", platform: "NPTEL (IIT Roorkee)", platformIcon: "🏛️", branch: "CE", subject: "Solid Mechanics", url: "https://nptel.ac.in/courses/112107146", free: true, level: "Intermediate", description: "IIT Roorkee — beams, columns, torsion, stress transformation with solved problems." },
  { id: 14, title: "STAAD Pro Training", platform: "Bentley Learn Server", platformIcon: "🏗️", branch: "CE", subject: "Structural Analysis", url: "https://learn.bentley.com/", free: false, level: "Intermediate", description: "Structural modelling, load analysis, and design verification using STAAD Pro." },
  { id: 15, title: "GIS for Civil Engineering", platform: "Coursera (UC Davis)", platformIcon: "🗺️", branch: "CE", subject: "Urban Planning", url: "https://www.coursera.org/specializations/gis", free: false, level: "Beginner", description: "Geospatial analysis with ArcGIS — spatial data, mapping, and urban planning applications." },

  // CHE
  { id: 16, title: "NPTEL: Chemical Reaction Engineering", platform: "NPTEL (IIT Madras)", platformIcon: "🏛️", branch: "CHE", subject: "CRE", url: "https://nptel.ac.in/courses/103106098", free: true, level: "Intermediate", description: "IIT Madras CRE — mole balances, rate laws, ideal reactor design, catalysis." },
  { id: 17, title: "Aspen Plus: Process Simulation", platform: "Udemy", platformIcon: "📚", branch: "CHE", subject: "Process Simulation", url: "https://www.udemy.com/topic/aspen-plus/", free: false, level: "Intermediate", description: "Learn chemical process simulation from distillation to reactor design using Aspen Plus." },

  // IT
  { id: 18, title: "AWS Cloud Practitioner Essentials", platform: "AWS Training (Free)", platformIcon: "☁️", branch: "IT", subject: "Cloud Computing", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", free: true, level: "Beginner", description: "Official AWS course for Cloud Practitioner certification — free, self-paced, 6 hours." },
  { id: 19, title: "Full Stack Open 2024", platform: "University of Helsinki", platformIcon: "🌐", branch: "IT", subject: "Full Stack Development", url: "https://fullstackopen.com/en/", free: true, level: "Intermediate", description: "React, Redux, Node.js, GraphQL, TypeScript, testing — modern full-stack in one free course." },
  { id: 20, title: "Google Cybersecurity Certificate", platform: "Coursera (Google)", platformIcon: "🔒", branch: "IT", subject: "Cybersecurity", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", free: false, level: "Beginner", description: "Practical cybersecurity from Google — threat analysis, SIEM, Python for security, IDS." },
];
