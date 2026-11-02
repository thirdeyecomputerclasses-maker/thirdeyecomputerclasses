module.exports = [
  // 35. PCB Designing Course
  {
    title: "PCB Designing, Schematic Drafting & Hardware Fabrication",
    slug: "pcb-designing-course",
    category: "Robotics & Embedded Systems",
    badge: "Job Oriented",
    duration: "2 Months",
    description:
      "Design professional single and multi-layer Printed Circuit Boards (PCBs) using Altium Designer / Proteus: schematic capture, track routing, Gerber exports, and physical fabrication.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of electronic components (resistors, ICs, transistors)",
      "Diploma / B.Tech / ITI in Electronics, Electrical, or CS/IT",
      "No prior CAD or PCB manufacturing experience required",
    ],
    tools: [
      { id: "tool-1", name: "Proteus & Altium Designer", iconType: "chip", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Schematic Capture Engine", iconType: "cad", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Gerber & Drill File Viewers", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Etching Chemical & Soldering Station", iconType: "hardware", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Electronic Components & Packaging Standards",
        description:
          "Identify active vs passive electronic components, through-hole vs Surface Mount Technology (SMT/SMD) footprints, component packages (SOIC, QFP, 0805, 1206).",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Schematic Circuit Design & Virtual Simulation",
        description:
          "Draw circuit schematics in Proteus/Eagle, assign component values, create custom symbol libraries, and perform virtual circuit simulation before layout.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "PCB Board Layout & Component Placement",
        description:
          "Define board mechanical outlines, establish keep-out zones, position critical connectors, and place decoupling capacitors close to IC power pins.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Track Routing, Clearance Rules & Ground Planes",
        description:
          "Route single and double-sided copper tracks, configure design rule checks (DRC), calculate trace widths for current handling, and create ground copper pours.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Gerber Data Generation & Manufacturing Exports",
        description:
          "Export production Gerber RS-274X layers (copper, silkscreen, solder mask, drill files), verify with CAM viewers, and generate Bill of Materials (BOM).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Physical PCB Fabrication Lab & Circuit Soldering",
        description:
          "Transfer toner artwork onto copper clad boards, perform chemical etching in Ferric Chloride (FeCl3), drill component holes, and solder working hardware.",
      },
    ],
  },

  // 36. Personality Development Course
  {
    title: "Personality Development, Corporate Grooming & Spoken English",
    slug: "personality-development-course",
    category: "Language & Communication",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Transform your professional presence: confident English public speaking, body language, business etiquette, group discussions, and high-impact corporate interview mastery.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Open to all students, job seekers, and working professionals",
      "Desire to build self-confidence and overcome public speaking fear",
      "No specific academic background required",
    ],
    tools: [
      { id: "tool-1", name: "Public Speaking & Audio Booth", iconType: "mic", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Corporate Resume & CV Builder", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Group Discussion & Mock Arena", iconType: "layout", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Body Language & Etiquette Lab", iconType: "sparkles", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Self-Discovery, Positive Mindset & Overcoming Fear",
        description:
          "Conduct personal SWOT analysis, overcome stage fright and hesitation, set SMART goals, and build unstoppable self-esteem and emotional intelligence.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Spoken English Fluency & Everyday Conversation Drills",
        description:
          "Build daily conversational vocabulary, practice situational dialogues, correct common grammatical pronunciation errors, and develop smooth spontaneous speaking.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Non-Verbal Communication & Body Language Dynamics",
        description:
          "Master firm handshakes, confident eye contact, open posture, facial expressions, voice modulation, tone inflection, and corporate attire grooming standards.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Public Speaking, Presentations & Storytelling",
        description:
          "Structure captivating presentation openings and conclusions, use visual slide aids effectively, handle audience Q&A sessions, and deliver persuasive speeches.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Group Discussions (GD) & Conflict Management",
        description:
          "Practice competitive group discussions, learn initiation and summarizing techniques, articulate logical arguments respectfully, and manage interruptions.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "High-Impact Resume Crafting & HR Mock Interviews",
        description:
          "Design ATS-compliant professional resumes, answer tough HR behavioral questions (STAR method), and undergo video-recorded mock interview rehearsals.",
      },
    ],
  },

  // 37. PGDCA Course
  {
    title: "PGDCA (Post Graduate Diploma in Computer Applications)",
    slug: "pgdca-by-ugc-approved-university-course",
    category: "Govt. Recognized Diploma",
    badge: "Govt. Recognized",
    duration: "1 Year",
    description:
      "UGC-recognized university post-graduate diploma covering Computer Fundamentals, C/C++ Programming, Database Management (DBMS), Web Technologies, and Software Engineering.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Graduation degree in any stream (BA, B.Com, B.Sc, BBA, BCA, etc.)",
      "Aspirants looking for government jobs (Patwar, Information Assistant, Bank PO) requiring a one-year computer diploma",
      "No technical background needed",
    ],
    tools: [
      { id: "tool-1", name: "MS Office & PC Software Suite", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Turbo C++ & GCC Compilers", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Oracle SQL & Relational DBMS", iconType: "database", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-4", name: "HTML5, CSS & Web Editors", iconType: "code", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Computer Fundamentals, Operating Systems & Office Automation",
        description:
          "Study computer architecture, memory hierarchies, operating system internals (Windows & Linux), and advanced document processing with MS Office.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Programming in C & Data Structures",
        description:
          "Build procedural problem-solving skills in C: pointers, arrays, dynamic memory allocation, linked lists, stacks, queues, and search/sort algorithms.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Object-Oriented Programming with C++ / Java",
        description:
          "Master core OOP concepts: encapsulation, inheritance, polymorphism, abstract classes, operator overloading, and exception handling mechanisms.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Database Management Systems (DBMS) & SQL",
        description:
          "Design relational schemas, Entity-Relationship (ER) diagrams, apply normal forms (1NF to BCNF), and execute complex SQL join queries and triggers.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Web Technologies, HTML, CSS & Scripting",
        description:
          "Develop interactive web interfaces using semantic HTML5, CSS3 page layouts, client-side JavaScript validation, and web hosting procedures.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Software Engineering Principles & University Capstone Project",
        description:
          "Understand software lifecycles, requirement analysis, testing documentation, and develop a comprehensive university-standard capstone project.",
      },
    ],
  },

  // 38. Adobe Photoshop Course
  {
    title: "Adobe Photoshop Professional Graphic & Photo Editing",
    slug: "photoshop-course",
    category: "Graphic Design",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Master photo manipulation, portrait retouching, color grading, commercial advertising graphics, digital matte painting, and social media creative design with Adobe Photoshop.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy and visual enthusiasm",
      "Photographers, graphic designers, social media managers, and creative artists",
      "No prior Photoshop experience required",
    ],
    tools: [
      { id: "tool-1", name: "Adobe Photoshop Pro", iconType: "adobe", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Pen Tool & Layer Masks", iconType: "pen", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Camera Raw & Color Balance", iconType: "palette", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Generative AI & Neural Filters", iconType: "sparkles", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Photoshop Interface, Layers & Canvas Setup",
        description:
          "Configure workspaces, color profiles (RGB vs CMYK), resolution (72 vs 300 DPI), canvas resizing, and layer hierarchy management.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Precision Selection Tools & Layer Masking",
        description:
          "Extract complex subjects using Pen Tool vector paths, Quick Selection, Object Selection, Refine Edge for hair, and non-destructive layer masks.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Photo Retouching & Portrait Restoration",
        description:
          "Perform professional skin retouching using Frequency Separation, Spot Healing Brush, Clone Stamp, Dodge & Burn, and facial feature sculpting.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Color Correction, Grading & Adjustment Layers",
        description:
          "Adjust tone curves, levels, selective color balance, hue/saturation, use Adobe Camera Raw filter, and create dramatic cinematic color grades.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Blending Modes, Typography & Commercial Ad Posters",
        description:
          "Combine photos with blending modes (Screen, Multiply, Overlay), design marketing social media creatives, banner ads, and movie posters.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Special Effects, Mockups & Print Pre-Press Export",
        description:
          "Apply smart object mockups, 3D text extrusions, neon glow lighting effects, and export optimized assets for web, social media, and offset printing.",
      },
    ],
  },

  // 39. CakePHP Course
  {
    title: "CakePHP MVC Rapid Web Application Development",
    slug: "cake-php-course",
    category: "Web Development",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Rapidly build structured PHP web applications with CakePHP: convention over configuration, Bake CLI code generation, ORM associations, and authentication components.",
    image: "https://images.unsplash.com/photo-1599507593499-a3f7f7d97f66?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic knowledge of PHP, HTML/CSS, and MySQL",
      "Web developers wanting to learn rapid application development (RAD) frameworks",
      "BCA / MCA / B.Tech or PHP programmers",
    ],
    tools: [
      { id: "tool-1", name: "CakePHP Framework", iconType: "code", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Bake Console CLI", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "MySQL & CakePHP ORM", iconType: "database", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Composer & Apache/XAMPP", iconType: "server", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "CakePHP Architecture & Convention Over Configuration",
        description:
          "Understand directory hierarchies, naming conventions (controllers, models, views, database tables), and install CakePHP using Composer.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Bake Console & Rapid CRUD Scaffolding",
        description:
          "Use the Bake CLI tool to instantly generate models, controllers, and templates, understanding automated scaffolding and database syncing.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Controllers, Request Handling & Components",
        description:
          "Handle HTTP GET/POST requests, implement Flash messages, configure custom controller components, and redirect request routes.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "CakePHP ORM, Table Classes & Entity Relationships",
        description:
          "Model data with Table and Entity classes, define associations (hasOne, hasMany, belongsTo, belongsToMany), and write fluent query builder statements.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Views, Helpers & Form Validation",
        description:
          "Build templates using FormHelper and HtmlHelper, sanitize user inputs, apply validation rules to entities, and manage layout elements.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Authentication, Security & Production Deployment",
        description:
          "Configure password hashing with AuthenticationComponent, prevent CSRF attacks, configure database caching, and deploy to live cPanel servers.",
      },
    ],
  },

  // 40. CATIA Course
  {
    title: "CATIA 3D Mechanical CAD & Parametric Surface Design",
    slug: "catia-course",
    category: "Architecture & CAD",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master high-end automotive and aerospace mechanical design with Dassault Systèmes CATIA: Part Design, Generative Shape Design (Surfacing), Assembly, and Drafting.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech / BE in Mechanical, Automotive, Production, or Aerospace Engineering",
      "Knowledge of engineering drawing standards and geometric dimensioning",
      "Zero prior CATIA software experience required",
    ],
    tools: [
      { id: "tool-1", name: "Dassault Systèmes CATIA V5/V6", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Generative Shape Design (GSD)", iconType: "cad", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Assembly Design Workbench", iconType: "layers", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Interactive Drafting & GD&T", iconType: "document", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Sketcher Workbench & Parametric Geometric Constraints",
        description:
          "Create 2D parametric sketches, apply dimensional constraints, solve over-constrained geometries, and master sketch diagnostic tools.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Part Design: Solid Feature Modeling",
        description:
          "Build 3D solid machine components using Pad, Pocket, Shaft, Groove, Hole, Rib, Slot, and dress-up features (Edge Fillets, Chamfers, Drafts).",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Generative Shape Design (Surface Modeling)",
        description:
          "Model complex aerodynamic automotive body surfaces using Extrude, Revolve, Sweep, Multi-sections surface, Split, Trim, and Join tools.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Assembly Design & Mechanical Kinematic Constraints",
        description:
          "Assemble multiple components in 3D space, establish coincidence, contact, angle, and fix constraints, and perform interference collision checks.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Generative Drafting & Production Blueprints",
        description:
          "Generate orthographic projections, section cuts, detail views, isometric renderings, add Bill of Materials (BOM), and apply GD&T tolerance symbols.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Sheet Metal Design & Industrial Capstone Project",
        description:
          "Create sheet metal bends, flanges, cutouts, and calculate flat pattern unfoldings for sheet manufacturing in an end-to-end industrial project.",
      },
    ],
  },

  // 41. PLC & SCADA Course
  {
    title: "PLC & SCADA Industrial Automation Engineering",
    slug: "plc-scada-course",
    category: "Industrial Automation",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Hands-on industrial automation training: Ladder Logic programming on Siemens / Allen-Bradley PLCs, SCADA HMI screen design, VFD drives, and field sensor wiring.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech / ITI in Electrical, Electronics, Instrumentation, or Mechanical Engineering",
      "Basic understanding of electrical relays, contactors, and control circuits",
      "No prior PLC programming experience required",
    ],
    tools: [
      { id: "tool-1", name: "Siemens TIA Portal & S7-1200", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Allen-Bradley RSLogix 500", iconType: "chip", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-3", name: "Wonderware InTouch SCADA", iconType: "layout", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Variable Frequency Drives (VFD)", iconType: "server", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Industrial Automation Foundations & Relay Logic",
        description:
          "Understand automation hierarchies, differences between conventional hardwired relay logic and Programmable Logic Controllers (PLCs), and sensor types.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "PLC Hardware Architecture & Field Wiring",
        description:
          "Study CPU processors, digital input/output (DI/DO) sinking/sourcing modules, analog I/O cards, power supplies, and wire field sensors and contactors.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Ladder Logic Programming (Siemens & Allen-Bradley)",
        description:
          "Write robust ladder diagrams: NO/NC contacts, coils, latch/unlatch, on-delay/off-delay timers (TON/TOF), up/down counters, and comparison math blocks.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Analog Programming & VFD Motor Speed Control",
        description:
          "Process 4-20mA and 0-10V analog signals (temperature, pressure), calibrate sensor scaling, and program Variable Frequency Drives (VFD) for AC motor speed control.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "SCADA & HMI Screen Design (InTouch / WinCC)",
        description:
          "Create human-machine interface (HMI) screens, configure real-time tag databases, animate industrial valves, pumps, tanks, and configure audio/visual alarms.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Historical Data Logging, Trends & Factory Simulation",
        description:
          "Configure historical trend graphs, log batch recipe data to SQL databases, connect via Modbus/Ethernet protocols, and simulate automated packaging plants.",
      },
    ],
  },

  // 42. CCC Course
  {
    title: "CCC (Course on Computer Concepts) Govt. Certification",
    slug: "ccc-course-in-jaipur",
    category: "Govt. Recognized Diploma",
    badge: "Govt. Recognized",
    duration: "1 Month",
    description:
      "Official NIELIT CCC curriculum: fundamental computer literacy, GUI operating systems, LibreOffice/MS Office, internet services, digital financial literacy, and cyber security.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Open to school students, college students, job applicants, and government exam aspirants",
      "Mandatory requirement for various central and state government recruitment exams",
      "No prior computer education required",
    ],
    tools: [
      { id: "tool-1", name: "MS Office & LibreOffice Suite", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Windows 10/11 & Linux OS", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Digital Payment & Banking Tools", iconType: "calculator", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "NIELIT CCC Online Exam Portal", iconType: "certification", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Introduction to Computer & Operating Systems",
        description:
          "Understand CPU, RAM/ROM, input/output peripherals, storage devices, and navigate Windows and Linux graphical desktop environments.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Word Processing with MS Word & LibreOffice Writer",
        description:
          "Create professional documents, adjust page setups, format typography, design multi-column layouts, insert tables, and use Mail Merge.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Spreadsheets with MS Excel & LibreOffice Calc",
        description:
          "Enter and format financial data, apply mathematical formulas (SUM, AVERAGE, IF), construct visual charts, and sort/filter tabular records.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Presentations with MS PowerPoint & Impress",
        description:
          "Design slide presentations, apply slide transitions, custom animations, embed multimedia audio/video clips, and deliver slide shows.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Internet, World Wide Web, Email & Social Media",
        description:
          "Understand web browsers, search engines, formal email etiquette (attachments, CC/BCC), instant messaging, and social networking safety.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Digital Financial Services, Cyber Security & Mock Tests",
        description:
          "Explore UPI, net banking, OTPs, digital wallets, secure password practices, cyber hygiene, and solve official NIELIT online mock tests.",
      },
    ],
  },

  // 43. CCNA Course
  {
    title: "Cisco Certified Network Associate (CCNA 200-301)",
    slug: "ccna-course",
    category: "Hardware & Networking",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Prepare for the globally recognized Cisco CCNA 200-301 certification: routing protocols (OSPF), switching (VLANs, STP), IP services (NAT, DHCP), security, and network automation.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of computers and IP addressing",
      "Aspiring network engineers, system administrators, and IT infrastructure professionals",
      "No prior Cisco device experience required",
    ],
    tools: [
      { id: "tool-1", name: "Cisco IOS CLI & Packet Tracer", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Cisco Catalyst Switches & Routers", iconType: "server", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-3", name: "Wireshark Protocol Analyzer", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "CCNA 200-301 Exam Simulator", iconType: "certification", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Network Fundamentals & Cisco IOS Architecture",
        description:
          "Explore router/switch physical components, console access, user EXEC vs privileged EXEC modes, configuration registers, and IPv4/IPv6 addressing.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Ethernet Switching, VLANs & Spanning Tree (STP)",
        description:
          "Configure Layer 2 switching, VLAN segmentation, 802.1Q trunking, Inter-VLAN routing (Router-on-a-Stick), and prevent loops with Rapid STP (802.1w).",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "IP Routing Technologies & Open Shortest Path First (OSPF)",
        description:
          "Configure static default routes, understand administrative distance, configure single-area and multi-area OSPFv2, and verify neighbor relationships.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "IP Services: DHCP, DNS, NTP & Dynamic NAT/PAT",
        description:
          "Deploy DHCP relay agents, configure Network Address Translation (Static, Dynamic, Port Address Translation - PAT), and synchronize clocks with NTP.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Network Security Fundamentals & Access Control Lists (ACLs)",
        description:
          "Secure Cisco device management (SSH, enable secrets), implement Standard and Extended IPv4 ACLs, configure port security, and DHCP snooping.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Network Automation, REST APIs & CCNA Certification Exam Prep",
        description:
          "Understand software-defined networking (SDN), Cisco DNA Center, RESTCONF, JSON data formats, Python automation, and solve intensive CCNA mock exam dumps.",
      },
    ],
  },

  // 44. Primavera Course
  {
    title: "Oracle Primavera P6 Enterprise Project Portfolio Management",
    slug: "primavera-course",
    category: "Architecture & CAD",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Master construction and engineering project planning: Work Breakdown Structure (WBS), Critical Path Method (CPM), resource leveling, cost budgeting, and baseline tracking.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech in Civil, Mechanical, Electrical, or Architecture",
      "Project managers, site engineers, planners, and construction professionals",
      "Familiarity with basic project schedules is helpful",
    ],
    tools: [
      { id: "tool-1", name: "Oracle Primavera P6 Professional", iconType: "calendar", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Work Breakdown Structure (WBS)", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-3", name: "Gantt Chart & PERT Networks", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Earned Value Management (EVM)", iconType: "calculator", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Project Management Concepts & Primavera Navigation",
        description:
          "Understand project lifecycles, Enterprise Project Structure (EPS), Organizational Breakdown Structure (OBS), and navigate the Primavera P6 workspace.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Work Breakdown Structure (WBS) & Activity Creation",
        description:
          "Create hierarchical project work packages, add activity tasks, assign activity types (task dependent, resource dependent), and assign custom calendars.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Activity Relationships & Critical Path Method (CPM)",
        description:
          "Link project tasks with Finish-to-Start, Start-to-Start relationships, define lead/lag times, calculate total float, and identify the Critical Path.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Resource Allocation, Costs & Resource Leveling",
        description:
          "Assign labor, non-labor, and material resources, define unit rates, generate resource usage profiles, and resolve resource over-allocations with leveling.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Project Baselines & Earned Value Management (EVM)",
        description:
          "Set project target baselines, track real-time site execution progress, compute Schedule Variance (SV), Cost Variance (CV), SPI, and CPI metrics.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Progress Reporting, S-Curves & Export Blueprints",
        description:
          "Generate cumulative S-curve cash flow diagrams, format custom tabular reports, export schedules to Excel/PDF, and manage multi-project portfolio dashboards.",
      },
    ],
  },

  // 45. Python Programming Course
  {
    title: "Python Programming: Core to Advanced & Automation",
    slug: "python-course",
    category: "Programming & Dev",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master Python programming from scratch: data structures, object-oriented design, file processing, web scraping, API development, and data automation.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Logical thinking and passion for learning coding",
      "School students, college graduates, BCA, B.Tech, or working professionals",
      "Zero prior coding experience required",
    ],
    tools: [
      { id: "tool-1", name: "Python 3 & IDLE / VS Code", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "PyCharm IDE", iconType: "code", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Requests & BeautifulSoup (Web Scraping)", iconType: "network", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Tkinter Desktop GUI", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Python Syntax, Variables & Control Flow",
        description:
          "Master Python interpreter mechanics, dynamic typing, arithmetic/comparison operators, conditional branch logic (if-elif-else), and for/while loops.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Built-in Data Structures & Functional Methods",
        description:
          "Manipulate lists, tuples, dictionaries, and sets; write list comprehensions, lambda functions, and use built-in functions (zip, enumerate, map, filter).",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Functions, Modular Architecture & Exception Handling",
        description:
          "Define reusable functions with *args/**kwargs, create custom packages, handle file I/O operations, and catch runtime errors with try-except-finally blocks.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Object-Oriented Programming (OOP) in Python",
        description:
          "Design classes, instantiate objects, implement encapsulation, inheritance, method overriding, dunder magic methods (__init__, __str__), and class methods.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Web Scraping, Automation & REST APIs",
        description:
          "Scrape live website data with Requests and BeautifulSoup, parse JSON feeds, automate spreadsheet files with openpyxl, and automate daily tasks.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "GUI Application Development & Capstone Project",
        description:
          "Build interactive desktop software interfaces using Tkinter widgets, connect SQLite databases, and package Python scripts into standalone executable .exe apps.",
      },
    ],
  },

  // 46. Certified Industrial Accountant Course
  {
    title: "Certified Industrial Accountant (CIA) Master Diploma",
    slug: "certified-industrial-accountant-course-in-jaipur",
    category: "Accounting & Taxation",
    badge: "Job Oriented",
    duration: "6 Months",
    description:
      "Become an industry-certified industrial accountant: corporate bookkeeping, TallyPrime ERP, Goods & Services Tax (GST), Income Tax / TDS filing, payroll, and auditing.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / Commerce / Arts / Any Graduate or Undergraduate student",
      "Anyone wanting to pursue a high-paying career in corporate accounting and taxation",
      "No prior Tally or bookkeeping knowledge required",
    ],
    tools: [
      { id: "tool-1", name: "TallyPrime with GST Suite", iconType: "calculator", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "Advanced Excel Financial Modeling", iconType: "chart", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Govt GST & Income Tax Portals", iconType: "document", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Busy Accounting Software", iconType: "server", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Manual Bookkeeping & Financial Accounting Standards",
        description:
          "Master journal entries, ledger accounts, cash book, trial balance, depreciation accounting, and preparation of final Profit & Loss and Balance Sheets.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "TallyPrime ERP: Corporate Accounting & Inventory",
        description:
          "Configure company profiles, multi-currency transactions, purchase/sales orders, bill-wise accounting, cost centers, and multi-godown stock inventories.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "GST Compliance, Invoicing & Return Filing",
        description:
          "Manage GST rates, HSN/SAC codes, reverse charge mechanism (RCM), input tax credit (ITC) reconciliation, e-way bills, and e-invoicing portals.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Direct Taxation: Income Tax & TDS / TCS Management",
        description:
          "Calculate taxable business profits, compute employee TDS deductions, file quarterly TDS returns (Form 24Q, 26Q), and generate Form 16 certificates.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Corporate Payroll, PF, ESI & Statutory Banking",
        description:
          "Configure employee salary structures, attendance recording, Provident Fund (PF) calculations, Employee State Insurance (ESI), and bank reconciliation.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Financial Auditing, MIS Reports & Corporate Placement Prep",
        description:
          "Conduct internal audits, prepare ratio analysis, draft executive cash flow statements, and undergo practical interview drills with industrial accounting trainers.",
      },
    ],
  },

  // 47. R Programming Course
  {
    title: "R Programming for Data Science & Statistical Computing",
    slug: "r-programming-course",
    category: "AI & Data",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Perform advanced statistical analysis and data modeling with R: data manipulation with dplyr, publication-grade visualization with ggplot2, regression, and hypothesis testing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic mathematics and statistics familiarity",
      "Data analysts, researchers, statisticians, and engineering graduates",
      "No prior coding experience required",
    ],
    tools: [
      { id: "tool-1", name: "R & RStudio Desktop", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Tidyverse (dplyr & tidyr)", iconType: "code", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "ggplot2 Visualization Engine", iconType: "chart", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "R Markdown & Shiny Dashboards", iconType: "layout", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "R Language Fundamentals & Data Structures",
        description:
          "Explore RStudio, understand atomic vectors, matrices, factors, lists, and construct structured statistical DataFrames.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Data Wrangling & Transformation with Tidyverse",
        description:
          "Clean, filter, arrange, group, and mutate complex data using dplyr verbs and pipeline operators (%>%), reshaping tables with tidyr.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Advanced Data Visualization with ggplot2",
        description:
          "Harness the Grammar of Graphics to design publication-quality scatter plots, histograms, box plots, facet grids, and custom styling themes.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Statistical Inference & Hypothesis Testing",
        description:
          "Calculate descriptive statistics, compute normal probability distributions, perform Student's t-tests, ANOVA variance analysis, and Chi-Square independence tests.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Predictive Modeling & Regression in R",
        description:
          "Build simple and multiple linear regression models, logistic classification models, evaluate goodness-of-fit, and diagnose residuals.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Interactive Web Apps with R Shiny & Markdown",
        description:
          "Generate reproducible HTML/PDF research reports with R Markdown, and build reactive interactive data analytics dashboards using R Shiny.",
      },
    ],
  },

  // 48. Raspberry Pi Course
  {
    title: "Raspberry Pi Single-Board Computing & IoT Projects",
    slug: "raspberry-pi-course",
    category: "Robotics & Embedded Systems",
    badge: "Job Oriented",
    duration: "2 Months",
    description:
      "Learn single-board computer engineering with Raspberry Pi 4/5: Raspberry Pi OS, Linux terminal, Python GPIO hardware interfacing, camera modules, and smart edge IoT automation.",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy and enthusiasm for DIY hardware technology",
      "Electronics/CS students, hobbyists, or engineering graduates",
      "No prior Linux or Raspberry Pi experience required",
    ],
    tools: [
      { id: "tool-1", name: "Raspberry Pi 4 / 5 & Pi OS", iconType: "chip", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Python 3 & RPi.GPIO / GPIO Zero", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Pi Camera Module V2/V3", iconType: "camera", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Sensors, Relays & Breadboard Lab", iconType: "hardware", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Raspberry Pi Hardware Architecture & OS Setup",
        description:
          "Explore Broadcom SoC architecture, flash Raspberry Pi OS onto microSD cards, configure headless Wi-Fi/SSH, and access the desktop via VNC.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Linux Command Line on Raspberry Pi",
        description:
          "Navigate the Debian Linux bash shell, manage software packages with apt, administer users, configure cron jobs, and manipulate directories.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "General Purpose Input/Output (GPIO) Interfacing",
        description:
          "Control the 40-pin GPIO header using Python (GPIO Zero), read pushbuttons, flash multi-color LEDs, control buzzers, and handle software debouncing.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Sensors, Relays & Hardware Peripherals",
        description:
          "Interface ultrasonic distance sensors, PIR motion sensors, digital temperature probes (DHT11/DS18B20), and trigger multi-channel AC relay modules.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Camera Module & Computer Vision Basics",
        description:
          "Connect the CSI Camera Ribbon, capture high-resolution photos and video streams using Picamera2, and perform basic facial detection with OpenCV.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Web Server Hosting & Smart IoT Gateway Capstone",
        description:
          "Host lightweight Flask web dashboards to monitor sensor readings remotely, send Telegram/email alerts, and build an IoT smart home gateway.",
      },
    ],
  },

  // 49. Microsoft Office Specialist Course
  {
    title: "Microsoft Office Specialist (MOS) Master Certification",
    slug: "certified-microsoft-office-course",
    category: "Business & Analytics",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Become certified in Microsoft Office productivity tools: advanced document design in Word, spreadsheet data modeling in Excel, slide decks in PowerPoint, and Outlook.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy",
      "Job seekers, office administrative assistants, and working professionals",
      "No prior certification required",
    ],
    tools: [
      { id: "tool-1", name: "Microsoft Word (Advanced)", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Microsoft Excel (Spreadsheets)", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Microsoft PowerPoint (Decks)", iconType: "layout", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-4", name: "Microsoft Outlook & Teams", iconType: "network", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Advanced Microsoft Word: Layouts & Long Documents",
        description:
          "Structure corporate reports using custom style sets, multi-level numbering, section breaks, automated Table of Contents, footnotes, and index catalogs.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Document Automation, Collaboration & Mail Merge",
        description:
          "Automate bulk personalized letter and certificate generation using Mail Merge, track document revisions, and configure password protection.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Microsoft Excel: Business Formulas & Data Analysis",
        description:
          "Master core business formulas (VLOOKUP, XLOOKUP, INDEX/MATCH, SUMIFS), conditional formatting rules, data validation dropdowns, and error auditing.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Excel Pivot Tables, Charts & Visual Analytics",
        description:
          "Summarize multi-column sales and inventory records with Pivot Tables, calculated fields, dynamic slicers, timeline filters, and professional business charts.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Microsoft PowerPoint: High-Impact Presentations",
        description:
          "Design executive slide decks, customize Slide Masters, integrate SmartArt graphics, smooth Morph transitions, animations, and kiosk presentations.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Microsoft Outlook Email Management & MOS Exam Prep",
        description:
          "Manage calendar schedules, meetings, rules, email signatures, task lists, followed by mock tests for official Microsoft Office Specialist (MOS) exams.",
      },
    ],
  },

  // 50. Chip-Level Repairing Course
  {
    title: "Chip-Level Laptop & Motherboard Repairing Technology",
    slug: "chip-level-repairing-course",
    category: "Hardware & Repairing",
    badge: "Job Oriented",
    duration: "4 Months",
    description:
      "Advanced chip-level laptop and desktop motherboard repairing: schematic reading, voltage regulation circuits (VRM), DC power supply tracing, BGA reballing, and BIOS reprogramming.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th / ITI or basic computer hardware maintenance knowledge",
      "Anyone aspiring to set up a lucrative hardware repair lab or laptop service center",
      "Patience and steady hand coordination for micro-soldering",
    ],
    tools: [
      { id: "tool-1", name: "BGA Rework Station & Micro-Soldering", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Digital Storage Oscilloscope (DSO)", iconType: "chip", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "DC Power Supply & Short Killer", iconType: "hardware", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "SPI BIOS Reprogrammer (RT809F)", iconType: "software", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Motherboard Component Identification & Testing",
        description:
          "Test SMD capacitors, resistors, MOSFETs, diodes, inductors, clock crystals, and fuses on motherboards using a digital multimeter.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Laptop Power Architecture & Voltage Rails",
        description:
          "Trace primary and secondary voltage rails: 19V adapter rail, 3.3V/5V standby power circuits, RAM voltages (1.2V/1.35V), and CPU core VCORE power states.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Schematic Reading & Boardview Diagnostic Tracing",
        description:
          "Interpret complex schematic circuit diagrams and Boardview files to track signal sequences (PWRGD, RESET, CLOCK) and locate corroded tracks.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Short Circuit Hunting & Thermal Diagnostic Methods",
        description:
          "Locate dead shorts on main power lines using DC bench power supplies, thermal cameras, and rosin atomizers to spot overheated micro-components.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "BIOS Chip Reprogramming & I/O Controller (SIO) Replacement",
        description:
          "Flash and patch corrupt SPI flash BIOS ROMs using external programmers (RT809F / CH341A), clear ME regions, and solder Multi-I/O controller chips.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "BGA Chip Reballing Lab & Service Center Practice",
        description:
          "Desolder, reball, and solder BGA graphics chips and PCH bridge chips using optical BGA rework stations, concluding with service business management.",
      },
    ],
  },

  // 51. CHNE Course
  {
    title: "CHNE (Certified Hardware & Networking Engineer)",
    slug: "chne-course",
    category: "Hardware & Networking",
    badge: "Job Oriented",
    duration: "6 Months",
    description:
      "Comprehensive hardware and networking diploma covering computer assembling, component troubleshooting, OS administration, enterprise networking, Cisco routers, and cybersecurity.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th / Any Graduate or Undergraduate student",
      "Curiosity about computer systems, networking infrastructure, and IT technical support",
      "No prior engineering experience required",
    ],
    tools: [
      { id: "tool-1", name: "PC Assembling & Diagnostic Kits", iconType: "hardware", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "Cisco Packet Tracer & IOS", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Windows Server & Linux Admin", iconType: "server", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-4", name: "Wireshark & Network Security Tools", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "PC Hardware Architecture, Assembling & BIOS Setup",
        description:
          "Disassemble and assemble modern desktop PCs, configure SMPS power units, install RAM/CPUs, configure UEFI/BIOS settings, and manage storage drives.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Operating Systems Installation & Peripheral Servicing",
        description:
          "Deploy modern Windows and Linux operating systems, install and troubleshoot peripheral drivers, and service printers, scanners, and display monitors.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Network Fundamentals, Topologies & Structured Cabling",
        description:
          "Study TCP/IP and OSI network models, master Cat6 twisted pair cabling, RJ45 crimping, patch panels, and test network line continuity.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "IP Addressing, Subnetting & Network Services",
        description:
          "Master IPv4 Class A/B/C and CIDR subnetting, configure DHCP automatic address distribution, DNS host resolution, and default gateways.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Cisco Routing & Switching Infrastructure",
        description:
          "Configure Cisco Catalyst switches, set up VLANs and trunking, configure static/OSPF routing, and secure wireless Wi-Fi access points.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Network Security, Backup & IT Support Engineering",
        description:
          "Configure firewalls, defend against malware threats, implement automated data backup protocols, and prepare for corporate IT support roles.",
      },
    ],
  },
];

