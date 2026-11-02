module.exports = [
  // 17. Diploma in Animation (Short Term)
  {
    title: "Certificate in 3D Animation & Visual Effects (Short-Term)",
    slug: "diploma-in-animation-short-term-course",
    category: "Animation & 3D",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Accelerated 3D animation certificate: 3D asset modeling, texturing, keyframe animation, camera cinematics, lighting, and visual effects with Autodesk Maya.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Interest in 3D gaming, visual effects, and animated filmmaking",
      "Basic computer literacy",
      "No prior 3D animation experience required",
    ],
    tools: [
      { id: "tool-1", name: "Autodesk Maya", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Arnold Render Engine", iconType: "sparkles", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Adobe Premiere Pro & After Effects", iconType: "video", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Graph Editor & Keyframe Animation", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "3D Space, Maya Interface & Navigation",
        description:
          "Explore the 3D Cartesian coordinates, workspace views, shelf tools, transformations (Move, Rotate, Scale), and scene hierarchy management.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Low-Poly & High-Poly Prop Modeling",
        description:
          "Model hard-surface environmental assets using polygon primitives, Extrude, Bevel, Bridge, Edge Loop insertion, and clean quad topology.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Texturing, UV Unwrapping & Shading",
        description:
          "Unwrap UV maps without texture distortion, apply diffuse and bump textures, and configure realistic Arnold Standard Surface material shaders.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "12 Principles of Animation & Motion Mechanics",
        description:
          "Apply timing, spacing, squash and stretch, anticipation, and ease in/out curves to animate bouncing balls and mechanical movements using the Graph Editor.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Cinematic Lighting, Cameras & Rendering",
        description:
          "Set up three-point lighting, physical camera focal lengths, depth of field, and render high-resolution animation sequences with Arnold.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Video Editing, Sound Sync & Showreel Creation",
        description:
          "Composite rendered image sequences in Premiere Pro, synchronize audio sound effects, apply color grading, and export a professional 3D showreel.",
      },
    ],
  },

  // 18. VHDL & VLSI Course
  {
    title: "VHDL & VLSI Digital Integrated Circuit Design",
    slug: "vhdl-vlsi-course",
    category: "Robotics & Embedded Systems",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master digital chip architecture: combinational & sequential circuit design, VHDL / Verilog HDL coding, FPGA synthesis with Xilinx Vivado, and ASIC flow.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech in Electronics (ECE), Electrical (EEE), or Computer Science",
      "Understanding of digital logic design, boolean algebra, and logic gates",
      "No prior hardware description language (HDL) experience needed",
    ],
    tools: [
      { id: "tool-1", name: "Xilinx Vivado / ISE Simulator", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "ModelSim Logic Simulation", iconType: "chip", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-3", name: "VHDL & Verilog HDL", iconType: "code", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Xilinx Spartan / Artix-7 FPGA", iconType: "hardware", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Digital Logic Foundations & CMOS Technology",
        description:
          "Review boolean minimization (K-Maps), CMOS inverter operation, propagation delays, setup/hold times, and digital circuit timing constraints.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "VHDL Language Architecture & Modeling Styles",
        description:
          "Understand entities, architectures, signals, variables, and implement Dataflow, Behavioral, and Structural modeling paradigms.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Combinational Circuit Design & Testbench Verification",
        description:
          "Code adders, multiplexers, decoders, priority encoders, and write automated testbenches in ModelSim to verify behavioral waveform simulation.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Sequential Circuits & Finite State Machines (FSM)",
        description:
          "Design synchronous flip-flops, shift registers, ring counters, and model Mealy and Moore Finite State Machines (FSMs) for traffic controllers.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "FPGA Architecture, Synthesis & Bitstream Generation",
        description:
          "Explore FPGA Configurable Logic Blocks (CLBs), synthesize RTL netlists with Xilinx Vivado, apply pin constraints (XDC), and generate bitstream files.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Hardware Implementation on FPGA Board & ASIC Flow",
        description:
          "Download bitstreams to physical Xilinx FPGA evaluation boards, test live inputs/outputs, and study the complete ASIC physical design flow.",
      },
    ],
  },

  // 19. Diploma in Animation (Full)
  {
    title: "Master Diploma in 2D & 3D Animation & Visual Effects",
    slug: "diploma-in-animation-course",
    category: "Animation & 3D",
    badge: "Job Oriented",
    duration: "1 Year",
    description:
      "Comprehensive year-long animation diploma: classical 2D animation, Autodesk Maya 3D modeling, character rigging, texturing, VFX dynamics, and showreel production.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / Any Graduate or Undergraduate student",
      "Creativity, visual imagination, and passion for animation and movies",
      "No prior drawing or animation experience required",
    ],
    tools: [
      { id: "tool-1", name: "Autodesk Maya & 3ds Max", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Adobe Animate & After Effects", iconType: "video", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Substance 3D Painter", iconType: "palette", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Arnold & V-Ray Render Engines", iconType: "sparkles", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Classical 2D Animation & Storyboarding",
        description:
          "Master the 12 principles of animation, character model sheets, perspective sketching, framing, camera movements, and cinematic storyboarding.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "3D Modeling: Environments, Props & Characters",
        description:
          "Construct complex organic characters, architecture, vehicles, and weapons in Autodesk Maya with clean edge loops and anatomical proportions.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "UV Mapping, PBR Texturing & Substance 3D Painter",
        description:
          "Unwrap complex multi-tile UDIM UV coordinates, and paint hyper-realistic physically based rendering (PBR) textures in Substance Painter.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Character Rigging & Skinning",
        description:
          "Build bone skeletons, Inverse Kinematics (IK/FK) switches, custom control curves, set driven keys, paint smooth skin weights, and create facial blendshapes.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "3D Character Animation & Motion Acting",
        description:
          "Animate realistic walk cycles, run cycles, emotional body language acting, dialogue lip-sync, and weight distribution across dramatic shots.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "VFX Dynamics, Arnold Rendering & Industry Showreel",
        description:
          "Simulate fire, smoke, water particles with Maya nDynamics, render photorealistic passes with Arnold, and compile a cinematic student showreel.",
      },
    ],
  },

  // 20. UI/UX Designing Course
  {
    title: "UI/UX Design, Design Systems & Product Strategy",
    slug: "ui-ux-designing-course",
    category: "Graphic Design",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Become a product designer: user research, empathy mapping, Figma component libraries, responsive design systems, micro-interactions, and usability testing.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy and eye for visual aesthetics",
      "Aspiring product designers, graphic designers, software developers, and product managers",
      "No coding background required",
    ],
    tools: [
      { id: "tool-1", name: "Figma Pro Suite", iconType: "figma", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-2", name: "Design Tokens & Auto Layout", iconType: "layout", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "FigJam UX Whiteboarding", iconType: "pen", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Miro & Maze Usability Testing", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Design Thinking & User Experience (UX) Research",
        description:
          "Understand the 5 stages of Design Thinking, conduct qualitative user interviews, craft user personas, and map customer journey touchpoints.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Information Architecture, User Flows & Wireframing",
        description:
          "Organize app structures using card sorting, create intuitive user task flows, and draft low-fidelity paper and digital wireframes in FigJam.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Visual Design (UI): Typography, Color & Spacing",
        description:
          "Apply 8pt grid systems, contrast accessibility standards (WCAG 2.1), visual hierarchy, and harmonize modern mobile/web color palettes.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Figma Mastery: Components, Auto Layout & Variables",
        description:
          "Build scalable component libraries with auto layout, component properties, variants, interactive states (hover/pressed), and design tokens.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Advanced Interactive Prototyping & Micro-Interactions",
        description:
          "Create high-fidelity clickable prototypes with smart animate transitions, scroll behaviors, dynamic overlays, and realistic micro-interactions.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Usability Testing, Developer Handoff & Behance Case Study",
        description:
          "Conduct moderated usability testing sessions, export design specifications for developers, and publish a comprehensive product design case study.",
      },
    ],
  },

  // 21. Diploma in Civil CAD
  {
    title: "Professional Diploma in Civil CAD & Structural Drafting",
    slug: "diploma-courses-in-civil-course",
    category: "Architecture & CAD",
    badge: "Job Oriented",
    duration: "6 Months",
    description:
      "Master civil drafting and construction modeling: AutoCAD Civil 2D/3D, building bylaws, structural detailing, estimating & costing, and surveying software.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech in Civil Engineering or ITI Civil Draftsman",
      "Anyone working in construction, site supervision, or architectural offices",
      "Basic understanding of building construction",
    ],
    tools: [
      { id: "tool-1", name: "AutoCAD Civil 2D/3D", iconType: "cad", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Revit Architecture & Civil 3D", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Structural Detailing Suite", iconType: "document", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Estimation & Costing Spreadsheets", iconType: "calculator", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Civil Drafting Standards & National Building Code (NBC)",
        description:
          "Understand municipal building bylaws, standard architectural symbols, line weights, plot setbacks, floor area ratio (FAR), and drawing scales.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "2D Architectural Floor Plans & Elevations in AutoCAD",
        description:
          "Draft complete residential and commercial floor plans, cross-sections, front elevations, door/window schedules, and electrical layouts.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Structural Detailing & Reinforcement Drawings",
        description:
          "Draw foundation footing plans, column schedules, beam rebar cross-sections, slab reinforcement layouts, and create detailed bar bending schedules (BBS).",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Plumbing, Sanitary & Water Supply Layouts",
        description:
          "Draft internal water supply piping diagrams, drainage lines, septic tank details, rainwater harvesting plans, and storm sewer connections.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Quantity Estimation & Costing (BOQ Preparation)",
        description:
          "Calculate material quantities (cement, sand, aggregate, steel), prepare detailed rate analysis, and compile commercial Bills of Quantities (BOQ).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "3D Building Visualization & Municipal Sanction Project",
        description:
          "Model 3D exterior building massing, prepare municipal corporation blueprint approval drawings, and complete a multi-story building project.",
      },
    ],
  },

  // 22. Tally Course
  {
    title: "TallyPrime with GST & Corporate Accounting Course",
    slug: "tally-course",
    category: "Accounting & Taxation",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Master computerized accounting with TallyPrime: ledger management, voucher entry, inventory tracking, GST billing, e-way bills, bank reconciliation, and final accounts.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / Commerce / Arts / Any Graduate or Undergraduate student",
      "Anyone aspiring to work as an accountant, billing executive, or finance clerk",
      "No prior Tally experience required",
    ],
    tools: [
      { id: "tool-1", name: "TallyPrime ERP", iconType: "calculator", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "GST E-Way Bill & E-Invoice Portal", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Banking & Financial Ledger Tools", iconType: "chart", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Payroll Management Module", iconType: "server", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Accounting Fundamentals & TallyPrime Setup",
        description:
          "Understand double-entry bookkeeping, Golden Rules of Accounting, company creation in TallyPrime, and managing user access controls.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Chart of Accounts & Accounting Vouchers",
        description:
          "Create ledgers, groups, cost centers, and record financial vouchers: Payment, Receipt, Contra, Journal, Sales, and Purchase.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Inventory Management & Stock Valuations",
        description:
          "Track stock groups, stock items, units of measure, multi-godown storage, reorder levels, and manage batch-wise expiry dates.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "GST Integration, Tax Invoices & E-Way Bills",
        description:
          "Configure CGST, SGST, IGST tax ledgers, generate GST-compliant tax invoices, reconcile Input Tax Credit, and export GSTR-1 and GSTR-3B data.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Banking, Cheque Printing & Reconciliation (BRS)",
        description:
          "Automate Bank Reconciliation Statements (BRS), manage post-dated cheques (PDC), generate electronic payment advice, and track petty cash.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Financial Statements, Auditing & Final Reports",
        description:
          "Generate and analyze Trial Balance, Profit & Loss accounts, Balance Sheet, cash flow statements, and perform audit verification checks.",
      },
    ],
  },

  // 23. Digital Marketing Course
  {
    title: "Master Diploma in Digital Marketing, SEO & Social Media",
    slug: "digital-marketing-course",
    category: "Digital Marketing",
    badge: "Job Oriented",
    duration: "4 Months",
    description:
      "Comprehensive digital marketing diploma: Search Engine Optimization (SEO), Google Search & Display Ads, Meta Social Media Ads, Content Strategy, and Analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer and internet knowledge",
      "Students, entrepreneurs, marketing professionals, and freelancers",
      "No technical or coding background needed",
    ],
    tools: [
      { id: "tool-1", name: "Google Ads & Meta Ads Manager", iconType: "network", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Google Analytics 4 & Search Console", iconType: "chart", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "SEMrush & Ahrefs SEO Tools", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Canva Pro & Email Automation", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Digital Marketing Foundations & Website Setup",
        description:
          "Understand customer acquisition funnels, inbound marketing, purchase journeys, domain selection, and launch an optimized WordPress website.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Search Engine Optimization (SEO: On-Page & Technical)",
        description:
          "Conduct keyword research, write optimized meta titles and headings, create internal links, configure XML sitemaps, robots.txt, and site speed.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Off-Page SEO, Backlink Building & Local SEO",
        description:
          "Build high-authority backlink profiles, manage guest posts, optimize Google Business Profile (Google My Business) for local top-3 map pack rankings.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Google Ads (PPC, Search, Display & Video)",
        description:
          "Create targeted Google Search keyword campaigns, write responsive search ads, negative keyword matching, YouTube video ads, and maximize ROI.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Social Media Marketing (Meta, Instagram & LinkedIn Ads)",
        description:
          "Build viral organic social media strategies, configure Meta Pixel tracking, set up targeted lead generation and dynamic retargeting campaigns.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Web Analytics (GA4), Conversion Rate & Agency Project",
        description:
          "Track conversions with Google Analytics 4 (GA4) and Google Tag Manager (GTM), interpret marketing attribution, and execute an agency capstone project.",
      },
    ],
  },

  // 24. Tableau Course
  {
    title: "Tableau Business Intelligence & Visual Analytics",
    slug: "tableau-course",
    category: "Data Science & Analytics",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Transform complex corporate datasets into interactive dashboards and visual stories using Tableau Desktop: calculated fields, LOD expressions, and Tableau Server.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic familiarity with spreadsheet tables or business data",
      "Data analysts, business managers, finance professionals, and engineers",
      "No coding background required",
    ],
    tools: [
      { id: "tool-1", name: "Tableau Desktop Professional", iconType: "chart", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Tableau Prep Builder", iconType: "database", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Calculated Fields & LOD Expressions", iconType: "calculator", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Tableau Cloud / Server", iconType: "server", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Tableau Architecture & Connecting to Data",
        description:
          "Explore the Tableau visual interface, connect to live and extract data sources (Excel, CSV, SQL databases), and understand dimensions vs measures.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Data Preparation & Shaping with Tableau Prep",
        description:
          "Clean, pivot, reshape, union, and join tables using Tableau Prep Builder, handling missing values and data inconsistencies before visualization.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Core Visualizations: Charts, Maps & Treemaps",
        description:
          "Construct bar charts, line graphs, dual-axis charts, scatter plots, filled geographic maps, heat maps, and bullet graphs.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Calculations, Table Calculations & Level of Detail (LOD)",
        description:
          "Create custom calculated fields, moving average table calculations, and write advanced Level of Detail (LOD) expressions (FIXED, INCLUDE, EXCLUDE).",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Interactive Dashboard Design & Dashboard Actions",
        description:
          "Combine multiple worksheets into responsive dashboards, configure interactive filter actions, highlight actions, URL actions, and parameter controls.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Data Storytelling & Tableau Server Publishing",
        description:
          "Assemble persuasive data presentation story points, publish interactive dashboards to Tableau Server/Public, and manage user permissions.",
      },
    ],
  },

  // 25. DevOps Course
  {
    title: "DevOps Engineering, CI/CD & Cloud Infrastructure Automation",
    slug: "devops-training-course",
    category: "Cloud & DevOps",
    badge: "Job Oriented",
    duration: "4 Months",
    description:
      "Master modern DevOps culture: Git version control, Docker containerization, Kubernetes orchestration, Jenkins CI/CD pipelines, Terraform, and cloud automation.",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of Linux command line and computer networks",
      "Software developers, system administrators, or cloud engineering aspirants",
      "BCA / MCA / B.Tech or IT professionals",
    ],
    tools: [
      { id: "tool-1", name: "Docker Containers", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Kubernetes (K8s)", iconType: "server", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Jenkins & GitHub Actions CI/CD", iconType: "code", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-4", name: "Terraform & Ansible", iconType: "chip", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "DevOps Culture & Version Control with Git/GitHub",
        description:
          "Understand DevOps SDLC integration, branching strategies (Gitflow), pull requests, merge conflict resolution, and collaborative repo management.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Containerization with Docker & Docker Compose",
        description:
          "Build custom container images with Dockerfiles, manage multi-container microservices with Docker Compose, and configure persistent volumes and bridge networks.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Container Orchestration with Kubernetes (K8s)",
        description:
          "Deploy containerized workloads using Kubernetes Pods, Deployments, Services (NodePort/LoadBalancer), ConfigMaps, Secrets, and manage auto-scaling.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Automated CI/CD Pipelines with Jenkins & GitHub Actions",
        description:
          "Write declarative Jenkinsfiles and GitHub Actions workflows to automate code compilation, run automated test suites, and trigger container deployments.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Infrastructure as Code (IaC) with Terraform & Ansible",
        description:
          "Provision cloud servers declaratively using Terraform HCL scripts on AWS, and automate software configuration and package deployments with Ansible playbooks.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Monitoring, Logging & Production Cloud Pipeline",
        description:
          "Monitor cluster metrics with Prometheus and Grafana, centralize logs with the ELK stack (Elasticsearch, Logstash, Kibana), and execute a zero-downtime deployment.",
      },
    ],
  },

  // 26. STAAD.Pro Course
  {
    title: "STAAD.Pro Civil Structural Analysis & Concrete Design",
    slug: "staad-pro-course",
    category: "Architecture & CAD",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Perform high-precision structural civil engineering with Bentley STAAD.Pro: 3D space frames, steel trusses, concrete design (IS 456), foundation reactions, and wind/seismic loads.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech / BE in Civil or Structural Engineering",
      "Knowledge of structural analysis, concrete design (IS 456), and steel design (IS 800)",
      "No prior STAAD.Pro experience required",
    ],
    tools: [
      { id: "tool-1", name: "Bentley STAAD.Pro CONNECT Edition", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "STAAD.Foundation Advanced", iconType: "cad", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Indian Standard Structural Codes", iconType: "document", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Post-Processing Result Engine", iconType: "chart", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "STAAD.Pro Interface, Nodes & Beam Geometry",
        description:
          "Explore the CONNECT interface, create structural nodes using coordinate tables, draw beam elements, define structural materials, and assign cross-sections.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Translational Repeat & 3D Frame Modeling",
        description:
          "Model 3D multi-story space frames rapidly using Transitional Repeat and Mirror tools, assign support boundary conditions (Fixed, Pinned), and specify member offsets.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Load Definition: Dead, Live, Wind & Seismic",
        description:
          "Apply self-weight, member uniformly distributed loads (UDL), floor pressure loads, calculate wind pressure (IS 875 Part 3), and define seismic loads (IS 1893:2016).",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Analysis Execution & Post-Processing Verification",
        description:
          "Run linear static analysis, inspect bending moment (Mz), shear force (Fy), axial forces, deflections, and verify nodal equilibrium.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Concrete & Steel Member Design Verification",
        description:
          "Design reinforced concrete beams and columns according to IS 456, and verify steel member section slenderness and unity ratios according to IS 800:2007.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Foundation Design in STAAD.Foundation & Project",
        description:
          "Export column base reactions to STAAD.Foundation to design isolated and combined footings, and complete an industrial warehouse truss project.",
      },
    ],
  },

  // 27. DCA Course
  {
    title: "DCA (Diploma in Computer Applications) Govt. Recognized",
    slug: "diploma-in-computer-application-course",
    category: "Govt. Recognized Diploma",
    badge: "Govt. Recognized",
    duration: "6 Months",
    description:
      "Fundamental one-year computer diploma: operating systems, MS Office suite, internet utilities, HTML/CSS web design, C programming, and digital business tools.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th pass from any recognized board",
      "Students preparing for government clerical jobs, administrative roles, or office executive careers",
      "No prior computer education required",
    ],
    tools: [
      { id: "tool-1", name: "MS Office Suite (Word/Excel/PPT)", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Windows 10/11 & Linux OS", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "HTML & Web Editors", iconType: "code", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-4", name: "C Programming Compiler", iconType: "terminal", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Computer Hardware Fundamentals & Windows OS",
        description:
          "Study CPU architecture, memory devices, input/output peripherals, Windows file management, control panel utilities, and virus defense.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Office Productivity Suite (MS Word, Excel, PowerPoint)",
        description:
          "Format official letters, manage large datasets with Excel formulas (VLOOKUP, IF), create Pivot Tables, and design animated slide presentations.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Internet Technology, Cloud Storage & Cyber Safety",
        description:
          "Explore search engines, professional email protocols, Google Drive cloud collaboration, online banking security, and cyber hygiene.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Web Page Designing with HTML & CSS",
        description:
          "Create static personal and business web pages using HTML semantic tags, text formatting, hyperlinks, tables, forms, and basic CSS styling.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Problem Solving & C Language Programming Logic",
        description:
          "Develop computational logic using flowcharts, algorithms, C variables, conditional branching, loops, functions, and arrays.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Database Concepts & Practical Examination Prep",
        description:
          "Understand relational databases in MS Access/SQL, solve previous years' diploma exam papers, and undergo practical computer lab evaluations.",
      },
    ],
  },

  // 28. SQL Course
  {
    title: "SQL Relational Database Queries, Design & Optimization",
    slug: "sql-course",
    category: "Database & Cloud",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Master relational database management with SQL (MySQL / PostgreSQL): complex joins, subqueries, aggregation, window functions, indexing, and stored procedures.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy",
      "Software developers, data analysts, QA testers, and data science aspirants",
      "No prior database background required",
    ],
    tools: [
      { id: "tool-1", name: "MySQL & PostgreSQL", iconType: "database", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "DBeaver & pgAdmin", iconType: "terminal", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "SQL Query Analyzer", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Index & Query Optimization", iconType: "zap", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Relational Concepts, DDL & Database Design",
        description:
          "Understand Entity-Relationship (ER) models, create databases, define tables with DDL (CREATE, ALTER, DROP), and enforce primary/foreign key constraints.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Data Manipulation (DML) & Basic Querying",
        description:
          "Insert, update, delete records, filter data with WHERE clauses, logical operators (AND, OR, NOT), pattern matching (LIKE), and sort with ORDER BY.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Multi-Table Joins & Set Operations",
        description:
          "Join disparate tables using INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN, self-joins, and union result sets with UNION / UNION ALL.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Aggregate Functions & Grouping Analytics",
        description:
          "Aggregate rows using COUNT, SUM, AVG, MIN, MAX; segment data with GROUP BY, and filter grouped summaries using the HAVING clause.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Subqueries, Common Table Expressions (CTEs) & Window Functions",
        description:
          "Write nested subqueries, write clean modular CTEs (WITH clause), and compute running totals and rankings with window functions (ROW_NUMBER, RANK, DENSE_RANK).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Stored Procedures, Triggers & Performance Tuning",
        description:
          "Code reusable stored procedures, triggers, views, analyze execution plans with EXPLAIN, create B-Tree indexes, and eliminate slow query bottlenecks.",
      },
    ],
  },

  // 29. Data Structures Using C
  {
    title: "Data Structures & Algorithms (DSA) Using C",
    slug: "data-structures-using-c-course",
    category: "Programming & Dev",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master core algorithmic foundations in C: memory pointers, linked lists, stacks, queues, binary search trees, graph algorithms, and Big-O complexity analysis.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of C language syntax (variables, loops, functions)",
      "BCA / MCA / B.Tech / Computer Science students preparing for software product engineering interviews",
      "Dedication to hands-on coding and problem solving",
    ],
    tools: [
      { id: "tool-1", name: "GCC Compiler & VS Code", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "GDB Debugger & Valgrind", iconType: "code", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-3", name: "LeetCode & CodeChef Problems", iconType: "software", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Memory Profiler & Visualizers", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Pointers, Dynamic Memory Allocation & Big-O Notation",
        description:
          "Master pointer arithmetic, double pointers, dynamic heap allocation (malloc, calloc, realloc, free), and analyze time/space complexities.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Arrays, String Manipulation & Recursion",
        description:
          "Implement multidimensional arrays, sparse matrices, string algorithms, and understand recursive call stacks through divide-and-conquer examples.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Linked Lists (Singly, Doubly & Circular)",
        description:
          "Build node-based linked lists from scratch, perform node insertions, deletions, list reversals, detect cycles, and manage memory without leaks.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Stacks, Queues & Practical Applications",
        description:
          "Implement array and linked-list based Stacks and Queues (FIFO/LIFO), evaluate postfix expressions, balanced parentheses checks, and circular queues.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Non-Linear Structures: Trees & Binary Search Trees (BST)",
        description:
          "Construct binary trees, implement recursive traversals (Inorder, Preorder, Postorder), build Binary Search Trees, and explore AVL self-balancing trees.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Searching, Sorting & Graph Algorithms",
        description:
          "Implement sorting algorithms (QuickSort, MergeSort, HeapSort), graph representations, breadth-first search (BFS), and depth-first search (DFS).",
      },
    ],
  },

  // 30. Spoken English Course
  {
    title: "Spoken English, Accent Training & Communication Mastery",
    slug: "spoken-english-course",
    category: "Language & Communication",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Achieve confident English speaking: grammar foundations, pronunciation accent training, vocabulary building, public speaking, and corporate conversation drills.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Open to school/college students, job seekers, and working professionals",
      "Desire to overcome language hesitation and speak English fluently",
      "No specific prior English background required",
    ],
    tools: [
      { id: "tool-1", name: "Pronunciation & Phonetics Lab", iconType: "headphones", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Audio-Visual Speaking Arena", iconType: "mic", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-3", name: "Vocabulary Builder & Flashcards", iconType: "book", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Corporate Email & Speech Templates", iconType: "document", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Functional Grammar Foundations & Sentence Structure",
        description:
          "Eliminate common grammatical errors, master verb tenses (past, present, future), modal verbs, prepositions, and natural sentence formation.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Phonetics, Pronunciation & Accent Neutralization",
        description:
          "Neutralize Mother Tongue Influence (MTI), master English vowel/consonant sounds, syllable stress, intonation, and clear vocal articulation.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Daily Situational Dialogues & Conversation Drills",
        description:
          "Practice conversational scenarios: introductions, telephone etiquette, asking directions, making reservations, shopping, and everyday social small talk.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Active Vocabulary Expansion & Idiomatic Expressions",
        description:
          "Expand active vocabulary by 500+ corporate words, learn colloquial expressions, phrasal verbs, idioms, and eliminate hesitation fillers.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Debates, Extempore & Group Discussion Mastery",
        description:
          "Participate in extempore impromptu speeches, articulate point of views in structured debates, and contribute constructively in group discussions.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Professional Business Communication & Interview Skills",
        description:
          "Draft professional emails, master formal meeting communication, deliver business presentations, and rehearse job interview responses.",
      },
    ],
  },

  // 31. Data Science Course
  {
    title: "Data Science, Machine Learning & Python Master Diploma",
    slug: "data-science-course",
    category: "AI & Data",
    badge: "Industry Certified",
    duration: "6 Months",
    description:
      "Become a data scientist: Python programming, advanced statistical analysis, predictive machine learning algorithms, deep learning neural networks, and live project deployments.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic mathematics (algebra, calculus) and basic programming familiarity",
      "BCA / MCA / B.Tech / Statistics / Math / Engineering graduates",
      "Passion for extracting predictive insights from raw big data",
    ],
    tools: [
      { id: "tool-1", name: "Python, NumPy & Pandas", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Scikit-Learn & TensorFlow", iconType: "chip", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Matplotlib, Seaborn & Tableau", iconType: "chart", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Jupyter Notebook & GitHub", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Python Data Manipulation & Exploratory Analysis (EDA)",
        description:
          "Perform vectorized computations with NumPy, clean messy datasets with Pandas, handle missing data, and uncover statistical distributions.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Applied Business Statistics & Probability",
        description:
          "Master descriptive statistics, probability distributions (Normal, Poisson, Binomial), Central Limit Theorem, hypothesis testing (p-values), and A/B testing.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Supervised Machine Learning: Regression & Classification",
        description:
          "Train predictive models using Linear/Logistic Regression, Decision Trees, Random Forests, Support Vector Machines (SVM), and evaluate accuracy with ROC-AUC.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Unsupervised Learning & Clustering",
        description:
          "Discover hidden customer personas with K-Means and DBSCAN clustering, and compress high-dimensional feature spaces using Principal Component Analysis (PCA).",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Deep Learning Foundations & Natural Language Processing (NLP)",
        description:
          "Build Artificial Neural Networks (ANN) with Keras, process textual sentiments using tokenization and TF-IDF, and explore pre-trained Hugging Face transformers.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Model Deployment, Streamlit Dashboards & Capstone Project",
        description:
          "Package machine learning models into web APIs using FastAPI, build interactive dashboards with Streamlit, and deploy a live predictive application.",
      },
    ],
  },

  // 32. SolidWorks Course
  {
    title: "SolidWorks 3D Mechanical CAD & Parametric Product Design",
    slug: "solidworks-course",
    category: "Architecture & CAD",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master mechanical product design with Dassault Systèmes SolidWorks: 3D part modeling, sheet metal, weldments, complex assemblies, and production drawings.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech / BE in Mechanical, Production, Automobile, or Industrial Design",
      "Understanding of engineering drawing, orthographic projections, and machine elements",
      "No prior SolidWorks software experience needed",
    ],
    tools: [
      { id: "tool-1", name: "Dassault Systèmes SolidWorks Pro", iconType: "workstation", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Sheet Metal & Weldments Workbench", iconType: "cad", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "SolidWorks Simulation (FEA)", iconType: "chip", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "PhotoView 360 / Visualize", iconType: "sparkles", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Parametric 2D Sketching & Geometric Relations",
        description:
          "Create fully defined 2D sketches using lines, arcs, splines, smart dimensions, and apply geometric relations (tangent, coincident, perpendicular, symmetric).",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "3D Part Modeling Features & Applied Dress-ups",
        description:
          "Generate 3D solids with Extruded Boss/Base, Revolve, Swept Boss, Lofted Boss, Hole Wizard, Fillets, Chamfers, Shell, and linear/circular patterns.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Sheet Metal & Structural Weldment Design",
        description:
          "Design fabricated sheet metal brackets, edge flanges, miter flanges, calculate bend deductions, unfold flat patterns, and design structural steel weldments.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Bottom-Up & Top-Down Assembly Modeling",
        description:
          "Assemble multiple components using standard mates (coincident, parallel, concentric), advanced mechanical mates (gear, cam-follower), and check physical clearances.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Detailed Engineering Drawings, GD&T & BOM",
        description:
          "Generate standard multiview drawings, section cuts, exploded views with isometric orientation, add Bill of Materials (BOM), and apply GD&T symbols.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Stress Analysis Simulation & Photorealistic Rendering",
        description:
          "Run basic finite element stress analysis using SolidWorks Simulation, compute safety factors, and generate photorealistic marketing renders in Visualize.",
      },
    ],
  },
];

