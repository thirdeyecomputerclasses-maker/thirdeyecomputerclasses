const dns = require("dns");
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {}

require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const Course = require("../models/Course");

const newCourses = [
  // 1. Hardware (A+ Equivalent) Course
  {
    title: "Hardware (A+ Equivalent) Course",
    slug: "hardware-a-equivalent-course",
    category: "Hardware & Networking",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master computer hardware engineering, PC assembling, component-level diagnostic maintenance, BIOS configuration, peripherals troubleshooting, and Windows OS deployment with hands-on lab practicals.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th / ITI / Diploma / Any Graduate or Undergraduate",
      "Basic computer familiarity and interest in computer hardware and electronics",
      "No prior electronics or hardware repair experience required",
    ],
    tools: [
      { id: "tool-1", name: "PC Diagnostic Tools & Multimeter", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Motherboards & Microprocessors", iconType: "chip", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Storage & I/O Interfaces", iconType: "storage", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Windows OS & Driver Utilities", iconType: "windows", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "PC Architecture & Core Hardware Components",
        description:
          "Understand internal PC architecture including microprocessors, sockets, multi-channel memory modules, power supply units (SMPS/UPS), and active thermal cooling systems.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Motherboards, Bus Architecture & Storage Drives",
        description:
          "Explore motherboard chipsets, expansion buses (PCIe), SATA/NVMe disk interfaces, optical drives, and master BIOS/UEFI setup and firmware flashing.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "I/O Interfaces, Peripherals & Port Diagnostics",
        description:
          "Study high-speed USB standards, serial/parallel communication ports, display interfaces (HDMI/DisplayPort), and peripheral device controller operations.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "PC Assembling, Disassembling & Preventative Maintenance",
        description:
          "Gain hands-on bench experience with complete custom PC assembly, wiring management, safety protocols, dust prevention, and thermal paste application.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Operating Systems, Device Drivers & System Troubleshooting",
        description:
          "Install and configure modern Windows operating systems, manage device driver conflicts, resolve blue screen (BSOD) errors, and implement malware protection.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Peripheral Servicing Lab: Printers & Scanners",
        description:
          "Practical diagnostics and maintenance of laser and inkjet printers, desktop monitors, input controllers, and network peripheral connectivity.",
      },
    ],
  },

  // 2. Adobe Illustrator Course
  {
    title: "Adobe Illustrator Master Course",
    slug: "adobe-illustrator-course",
    category: "Graphic Design",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Learn professional vector graphic design, brand identity creation, typography, digital illustrations, and print-ready artwork creation using Adobe Illustrator.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy and visual curiosity",
      "Interest in graphic design, branding, and creative arts",
      "No prior illustration or drawing background required",
    ],
    tools: [
      { id: "tool-1", name: "Adobe Illustrator Pro", iconType: "adobe", glowColor: "rgba(255, 154, 0, 0.3)" },
      { id: "tool-2", name: "Pen Tool & Bézier Curves", iconType: "pen", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Pathfinder & Shape Builder", iconType: "layers", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Color Harmonies & Gradients", iconType: "palette", glowColor: "rgba(59, 130, 246, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Workspace Setup, Artboards & Selection Fundamentals",
        description:
          "Master the vector interface, customizable workspaces, multiple artboards, precision zooming, and selection modes including Direct Selection and Magic Wand.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Vector Drawing with Pen Tools & Shape Construction",
        description:
          "Build complex illustrations using anchor points, smooth curves, pen conversions, shape tools, and geometric Boolean operations with the Pathfinder panel.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Color Systems, Gradients, Meshes & Transparency",
        description:
          "Apply spot and process colors, CMYK vs RGB workflows, gradient mesh photorealism, opacity masks, and dynamic blending modes for rich visual depth.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Advanced Typography, Outlining & Brand Identity Design",
        description:
          "Design custom wordmarks, format paragraph hierarchies, wrap text around paths, convert fonts to editable vector shapes, and craft corporate logos.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Brushes, Patterns, Symbols & 3D Vector Effects",
        description:
          "Create custom calligraphic and art brushes, seamless geometric patterns, symbol sprayer asset collections, and vector 3D extrusions and revolves.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Web Export, Print Pre-Press & Portfolio Development",
        description:
          "Optimize vector assets for SVG, CSS, and high-resolution print standards (bleed, crop marks, color separation), concluding with a professional design portfolio.",
      },
    ],
  },

  // 3. HVAC Course
  {
    title: "HVAC Engineering & Design Course",
    slug: "hvac-course",
    category: "Mechanical & MEP Engineering",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Comprehensive HVAC engineering course covering thermodynamics, refrigeration cycles, cooling load calculations, duct design, chiller plants, and MEP standards for commercial & residential projects.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech in Mechanical, Civil, Electrical, or ITI draftsmen",
      "Basic understanding of physics and thermal mechanics",
      "Open to working professionals looking to transition into building services/MEP",
    ],
    tools: [
      { id: "tool-1", name: "Psychrometric & Enthalpy Charts", iconType: "chart", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "HAP (Hourly Analysis Program)", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Ductulator & Airflow Sizing", iconType: "calculator", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "AutoCAD MEP / Revit HVAC", iconType: "cad", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Fundamentals of Thermodynamics & Refrigeration Cycles",
        description:
          "Study sensible vs latent heat, heat transfer modes, vapor compression refrigeration cycles, and pressure-enthalpy (p-h) refrigerant thermodynamic charts.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Air Conditioning Equipment & System Classification",
        description:
          "Analyze operational mechanics of compressors, condensers, expansion valves, evaporators, split units, package ACs, and VRF/VRV central systems.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Psychrometrics & Heat Load Calculation",
        description:
          "Perform real-world cooling and heating load estimations using psychrometric charts, building envelope parameters, solar gain, and ASHRAE standards.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Air Distribution & Airflow Duct Sizing",
        description:
          "Design ductwork layouts using equal friction and velocity reduction methods, sizing diffusers, registers, dampers, and acoustic insulation.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Hydronic Piping, Chiller Plants & Cooling Towers",
        description:
          "Calculate chilled water flow rates, select circulating pumps, design pipe routing, and evaluate cooling towers and air handling units (AHU).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "MEP Project Drawings, Costing & Site Commissioning",
        description:
          "Draft complete HVAC single-line layout plans in CAD, prepare Bills of Quantities (BOQ), and learn testing, adjusting, and balancing (TAB) procedures.",
      },
    ],
  },

  // 4. Adobe InDesign Course
  {
    title: "Adobe InDesign Editorial & Layout Design",
    slug: "adobe-indesign-course",
    category: "Graphic Design",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Master multi-page editorial design, magazine and book publishing, corporate brochures, typography styles, interactive PDFs, and pre-flight print workflows with Adobe InDesign.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer operating skills",
      "Interest in desktop publishing, typography, and publication layout",
      "No prior graphic design software experience required",
    ],
    tools: [
      { id: "tool-1", name: "Adobe InDesign Pro", iconType: "adobe", glowColor: "rgba(234, 88, 12, 0.3)" },
      { id: "tool-2", name: "Master Pages & Grid Systems", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-3", name: "Paragraph & Character Styles", iconType: "type", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-4", name: "Preflight & Interactive PDF Engine", iconType: "document", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Document Setup, Grid Systems & Master Pages",
        description:
          "Establish multi-column publication layouts, margins, gutters, bleed/slug setups, parent master page templates, and automatic page numbering.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Advanced Typography & Automated Style Sheets",
        description:
          "Control leading, kerning, tracking, drop caps, hyphenation, and streamline bulk formatting using nested Character, Paragraph, and Object Styles.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Working with Graphics, Frames & Text Wrapping",
        description:
          "Import and link high-resolution Photoshop and Illustrator artwork, manage image fitting proportions, and configure dynamic text wrapping contour options.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Tables, Data Merge & Long Document Organization",
        description:
          "Create styled comparison tables, run automated variable data merges from spreadsheets, and assemble multi-chapter book files with Tables of Contents.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Interactive Documents & Digital Publishing",
        description:
          "Add hyperlinks, bookmarks, form fields, page transitions, and interactive buttons to create dynamic corporate presentations and digital catalogs.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Preflight Verification, Packaging & Print Production",
        description:
          "Detect font and link errors using Live Preflight, verify color separations, package project source files, and export press-ready PDF/X files.",
      },
    ],
  },

  // 5. IELTS Course
  {
    title: "IELTS Preparation Master Course (Academic & General)",
    slug: "ielts-preparation-course",
    category: "Language & Communication",
    badge: "Global Recognized",
    duration: "2 Months",
    description:
      "Target an 8+ band score in IELTS Academic or General Training with comprehensive coaching covering Listening, Reading, Writing, Speaking, and full-length mock exams.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic English proficiency and understanding",
      "Aspiring to study, work, or migrate abroad to UK, Canada, Australia, USA, or Europe",
      "High dedication to daily practice and language immersion",
    ],
    tools: [
      { id: "tool-1", name: "Cambridge IELTS Practice Sets", iconType: "book", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Audio Listening Lab Equipment", iconType: "headphones", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Academic Essay Evaluator", iconType: "edit", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "1-on-1 Speaking Interview Drills", iconType: "mic", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "IELTS Exam Architecture & Scoring Matrix",
        description:
          "Gain an in-depth understanding of the band 0-9 descriptor criteria, test formats for Academic vs General Training, and strategic time allocation methods.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Listening Module Mastery: Audio Accents & Note-Taking",
        description:
          "Train on native British, American, and Australian accents across 4 audio sections, mastering map labeling, multiple choice, and sentence completion.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Reading Strategies: Skimming, Scanning & Inference",
        description:
          "Tackle complex academic articles and general texts using rapid skimming, keyword hunting, True/False/Not Given questions, and heading matching techniques.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Academic & General Writing (Task 1 & Task 2)",
        description:
          "Structure high-scoring reports for charts/graphs/processes (or formal letters for General), and compose cohesive 250+ word discursive argumentative essays.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Speaking Module: Fluency, Coherence & Pronunciation",
        description:
          "Build effortless conversational fluency across Part 1 introduction, Part 2 individual cue cards, and Part 3 abstract two-way discussions.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Full-Length Mock Tests, Band Analysis & Interview Drills",
        description:
          "Experience real exam pressure with timed full-length mock tests, receiving personalized band score analysis and actionable feedback from master trainers.",
      },
    ],
  },

  // 6. Interior Designing – 3ds Max Course
  {
    title: "Interior Designing with 3ds Max & V-Ray",
    slug: "interior-designing-3ds-max-course",
    category: "Architecture & CAD",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Learn photorealistic architectural visualization, 3D interior & exterior space modeling, realistic PBR texturing, daylight/night lighting, and rendering with Autodesk 3ds Max and V-Ray.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / Diploma / Degree in Architecture, Interior Design, Civil Engineering, or Any Graduate",
      "Basic interest in space planning, interior decor, and 3D visualization",
      "No prior 3ds Max experience required",
    ],
    tools: [
      { id: "tool-1", name: "Autodesk 3ds Max Pro", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "V-Ray & Arnold Render Engine", iconType: "sparkles", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "PBR Materials & Textures", iconType: "palette", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "AutoCAD 2D Floor Plan Import", iconType: "cad", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "3ds Max Interface, Units & Architectural Settings",
        description:
          "Configure project units (metric/imperial), customize viewport navigation gizmos, snap controls, and import 2D floor plans from AutoCAD.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Architectural Modeling: Walls, Doors, Windows & Stairs",
        description:
          "Construct 3D walls from spline floor plans, build custom doors, parametric windows, spiral stairs, and complex interior ceilings using Edit Poly modifiers.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Furniture Modeling & Extended Surface Detailing",
        description:
          "Model high-end contemporary furniture, sofas, modular kitchens, light fixtures, and fabric cushions using parametric deformers and subdivision surfaces.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "PBR Texturing, Materials & Shader Creation",
        description:
          "Apply realistic wood grains, marble, tiles, brushed metals, fabrics, and clear glass using UVW mapping and V-Ray PBR material shaders.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Realistic Lighting: Day, Night & Studio Lighting",
        description:
          "Set up natural sunlight using V-Ray Sun and Sky, HDRI dome environment maps, interior spotlights, IES photometric lights, and hidden LED strip profiles.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Camera Composition, Photorealistic Rendering & Post-Production",
        description:
          "Position two-point perspective physical cameras, optimize render passes (ambient occlusion, reflections), and perform final post-processing in Photoshop.",
      },
    ],
  },

  // 7. Advanced Java (J2EE) Course
  {
    title: "Advanced Java & J2EE Enterprise Development",
    slug: "advanced-java-j2ee-course",
    category: "Programming & Dev",
    badge: "Job Oriented",
    duration: "4 Months",
    description:
      "Master enterprise-scale backend engineering with Java, JDBC, Servlets, JSP, MVC architecture, Spring Framework, Hibernate ORM, and RESTful web services.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Knowledge of Core Java basics (OOPs concepts, classes, objects, exception handling)",
      "BCA / B.Tech / MCA / BSc IT or any software engineering enthusiast",
      "Familiarity with basic database queries (SQL)",
    ],
    tools: [
      { id: "tool-1", name: "IntelliJ IDEA / Eclipse IDE", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Apache Tomcat & Servlet 3.0", iconType: "server", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Spring Boot & Hibernate ORM", iconType: "java", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "MySQL / PostgreSQL Database", iconType: "database", glowColor: "rgba(59, 130, 246, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Advanced Database Connectivity with JDBC",
        description:
          "Implement Type-4 JDBC drivers, execute prepared statements, manage ACID transactions, batch updates, and configure connection pooling.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Servlet API, Request Lifecycle & Session Management",
        description:
          "Develop HTTP server components, manage client request/response cycles, implement cookies, HTTP sessions, and secure filter interceptors.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "JavaServer Pages (JSP), JSTL & Custom Tag Libraries",
        description:
          "Build dynamic server-side web interfaces with JSP scripting elements, Expression Language (EL), and JSTL standard tag libraries.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Enterprise MVC Architecture & Web Frameworks",
        description:
          "Decouple business logic and presentation layers using Model-View-Controller design patterns, request dispatching, and validation routines.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Spring Framework: Dependency Injection & AOP",
        description:
          "Master Inversion of Control (IoC), XML/Annotation-based bean configuration, Aspect-Oriented Programming (AOP), and Spring Data persistence.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Hibernate ORM, RESTful Web Services & Capstone Project",
        description:
          "Automate database object-relational mapping with Hibernate/JPA, design scalable REST APIs, and deploy an enterprise-grade cloud application.",
      },
    ],
  },

  // 8. Ionic App Development Course
  {
    title: "Cross-Platform Mobile App Development with Ionic",
    slug: "ionic-app-development-course",
    category: "App Development",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Build blazing-fast cross-platform Android & iOS mobile applications with a single codebase using Ionic Framework, Angular / TypeScript, and Capacitor/Cordova.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic knowledge of HTML5, CSS3, and JavaScript fundamentals",
      "BCA / MCA / B.Tech / Diploma or web developers stepping into mobile development",
      "Curiosity for hybrid and cross-platform native smartphone apps",
    ],
    tools: [
      { id: "tool-1", name: "Ionic CLI & Capacitor", iconType: "smartphone", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Angular & TypeScript", iconType: "code", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-3", name: "Android Studio & Xcode SDKs", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "RESTful APIs & Device Plugins", iconType: "network", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Mobile App Architecture & Hybrid Wave Overview",
        description:
          "Understand modern hybrid app architecture, differences between native vs cross-platform web containers, and set up the Ionic CLI environment.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "TypeScript & Angular Essentials for Mobile",
        description:
          "Master TypeScript types, Angular components, templates, two-way data binding, dependency-injected services, and client-side routing.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Ionic UI Components & Mobile Navigation UX",
        description:
          "Construct polished responsive layouts using Ionic cards, modals, lists, tabs, gestures, adaptive themes, and push/pop navigation stacks.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Native Device Feature Integration via Capacitor",
        description:
          "Access mobile device hardware features including camera image captures, GPS geolocation, file system access, and network status listeners.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "REST API Backend Integration & State Management",
        description:
          "Connect the mobile client to external backend APIs using HTTP clients, manage authentication tokens, and implement offline local caching.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Testing, App Store Packaging & Deployment",
        description:
          "Test across Android Emulators and iOS Simulators, configure app icons/splash screens, generate signed production APK/AAB builds for Google Play.",
      },
    ],
  },

  // 9. Advanced Robotics Course
  {
    title: "Advanced Robotics, Embedded Systems & Automation",
    slug: "advanced-robotics-course",
    category: "Robotics & Embedded Systems",
    badge: "Job Oriented",
    duration: "4 Months",
    description:
      "Hands-on robotics course covering Embedded C programming, AVR microcontrollers, sensor interfacing, wireless robotic control, motor drivers, robotic arm kinematics, and PCB design.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic curiosity about electronics, hardware, and automated machines",
      "10+2 / ITI / Diploma / B.Tech / BCA or engineering students across any stream",
      "Zero prior robotics or hardware soldering experience required",
    ],
    tools: [
      { id: "tool-1", name: "AVR Microcontrollers (ATmega8/32)", iconType: "chip", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "Embedded C & AVR Studio", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Proteus Circuit Simulation", iconType: "software", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Sensors & Wireless Modules", iconType: "network", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Embedded C Programming & Hardware Architecture",
        description:
          "Learn Embedded C syntax, bitwise operations, loops, pointers, memory registers, and differences between microprocessors and microcontrollers.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "AVR Microcontroller Architecture & IDE Simulation",
        description:
          "Explore ATmega architecture, configure I/O pin registers, and test firmware in Proteus circuit simulations and AVR Studio development environments.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Input/Output Interfacing: Sensors, LCDs & Motors",
        description:
          "Interface alphanumeric LCD displays, matrix keypads, analog-to-digital converters (ADC), ultrasonic sensors, IR arrays, and DC/stepper/servo motor drivers.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Wired, Wireless & RF Robotic Control Systems",
        description:
          "Build multi-terrain robots controlled via Bluetooth serial, RF 433MHz transmitters, Infrared (IR), DTMF smartphone commands, and Wi-Fi networks.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Robotic Arm Kinematics & Autonomous Navigation",
        description:
          "Understand degrees of freedom (DoF), end-effector gripper mechanics, forward kinematics, obstacle avoidance algorithms, and line-following logic.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Single-Layer PCB Fabrication & Hardware Capstone",
        description:
          "Design electronic schematics, route single-layer PCB tracks, solder physical breakout boards, and assemble a working autonomous robot.",
      },
    ],
  },

  // 10. IoT Course
  {
    title: "IoT (Internet of Things) & Smart Automation Course",
    slug: "iot-internet-of-things-course",
    category: "IoT & Smart Automation",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Build connected smart hardware systems with NodeMCU/ESP8266, ESP32, Arduino, MQTT communication protocols, cloud IoT dashboards, and home/industrial automation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy and curiosity about connected smart devices and automation",
      "10+2 / BCA / B.Tech / Diploma / Any Graduate or Undergraduate student",
      "No prior IoT or microcontroller experience required",
    ],
    tools: [
      { id: "tool-1", name: "ESP8266 / ESP32 & Arduino IDE", iconType: "chip", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "MQTT & HTTP IoT Protocols", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Adafruit IO, Blynk & ThingsSpeak", iconType: "cloud", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Sensors, Actuators & Relays", iconType: "terminal", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "IoT Architecture & Hardware Ecosystem",
        description:
          "Understand the 4-layer IoT architecture, microcontroller boards (ESP32, NodeMCU, Arduino), low-power sensors, and embedded connectivity options.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Sensor Interfacing & Telemetry Data Acquisition",
        description:
          "Wire and sample environmental telemetry including temperature/humidity (DHT11/22), motion (PIR), light (LDR), and gas detectors using analog and digital pins.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "IoT Communication Protocols (MQTT, CoAP & HTTP)",
        description:
          "Implement lightweight Publish/Subscribe messaging with MQTT brokers, RESTful HTTP client webhooks, and secure TLS socket streams.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Cloud IoT Platforms, Dashboards & Real-Time Alerts",
        description:
          "Stream live telemetry feeds to cloud dashboards (Adafruit IO, Blynk, ThingSpeak), creating automated email and SMS threshold alerts.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Smart Home Automation & Relay Control Systems",
        description:
          "Safely control AC high-voltage household appliances via multi-channel relay modules, smartphone apps, and voice assistant integrations (Google Assistant/Alexa).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Industrial IoT Applications & Career / Interview Preparation",
        description:
          "Explore edge computing architectures and data telemetry logging, concluding with interview question drills, problem-solving scenarios, and project reviews.",
      },
    ],
  },
];

async function run() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "thirdeye" });
    console.log("Connected to MongoDB Atlas!");

    for (let i = 0; i < newCourses.length; i++) {
      const c = newCourses[i];
      console.log(`[${i + 1}/${newCourses.length}] Upserting: ${c.title} (${c.slug})`);
      const saved = await Course.findOneAndUpdate(
        { slug: c.slug },
        c,
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
      );
      console.log(`  -> Saved ID: ${saved._id} | Category: ${saved.category} | Modules: ${saved.modules.length}`);
    }

    const totalCount = await Course.countDocuments();
    console.log("\n=======================================================");
    console.log(`MIGRATION COMPLETE! Total courses in database now: ${totalCount}`);
    console.log("=======================================================");
  } catch (err) {
    console.error("Migration Error:", err);
  } finally {
    process.exit(0);
  }
}

run();

