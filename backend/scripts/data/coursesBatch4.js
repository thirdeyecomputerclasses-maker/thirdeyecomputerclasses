module.exports = [
  // 1. Textile Design Course
  {
    title: "Textile Designing & Digital Print Pattern Course",
    slug: "textile-design-course",
    category: "Graphic Design",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master creative textile styling, seamless surface patterns, block/screen printing techniques, digital textile printing with Photoshop/Illustrator, and fabric repeats.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Interest in fashion, apparel, fabrics, and decorative print arts",
      "Basic computer literacy",
      "No prior textile or drawing background required",
    ],
    tools: [
      { id: "tool-1", name: "Adobe Illustrator Textiles", iconType: "adobe", glowColor: "rgba(255, 154, 0, 0.3)" },
      { id: "tool-2", name: "Photoshop Textile CAD", iconType: "palette", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Seamless Repeat Pattern Tools", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Pantone Color Separation", iconType: "tag", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Textile Fundamentals, Fibers & Weaves",
        description:
          "Study natural and synthetic textile fibers, basic yarn construction, plain/twill weave types, and traditional Indian heritage textiles.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Color Theory & Pantone Harmonies for Fabrics",
        description:
          "Explore fashion color trends, Pantone color libraries, color psychology, and create balanced palettes for home furnishings and ethnic wear.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Motif Development & Vector Surface Design",
        description:
          "Draw floral, geometric, abstract, and paisley motifs using vector curves in Illustrator, converting raw sketches into editable digital vectors.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Seamless Repeat Patterns (Block, Brick, Half-Drop)",
        description:
          "Construct continuous surface repeats using straight repeat, brick by row, and half-drop layouts, ensuring seamless edges across bolt fabric printing.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Digital Textile Printing & Color Separation",
        description:
          "Separate artwork colors for screen printing, manage tonal channels, index colors, and optimize files for modern Direct-to-Fabric (DTF) digital printers.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "3D Fabric Mockups & Industry Portfolio",
        description:
          "Drape custom textile designs onto 3D apparel and home decor mockups in Photoshop, building an export-ready textile design portfolio.",
      },
    ],
  },

  // 2. Excel VBA Course
  {
    title: "Microsoft Excel VBA & Macros Automation Course",
    slug: "excel-vba-course",
    category: "Business & Analytics",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Automate tedious spreadsheet operations, build custom user forms, manipulate Excel objects programmatically, and write powerful VBA algorithms.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Good knowledge of basic Microsoft Excel formulas and functions",
      "Accountants, data analysts, office executives, and financial planners",
      "No prior coding background required",
    ],
    tools: [
      { id: "tool-1", name: "Visual Basic for Applications (VBA)", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "VBA Editor (VBE) & Immediate Window", iconType: "terminal", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Custom UserForms & ActiveX", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Automated Reporting Pipelines", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Introduction to VBA & Macro Recorder",
        description:
          "Enable the Developer ribbon tab, record routine spreadsheet tasks, analyze recorded macro code, and understand security trust center settings.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Visual Basic Editor (VBE) & Language Syntax",
        description:
          "Navigate the Project Explorer, write code modules, declare variables with explicit types (Dim), and master scope rules (Private vs Public).",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Excel Object Model (Workbooks, Sheets, Ranges)",
        description:
          "Manipulate workbooks, worksheets, rows, columns, and cell ranges programmatically using Range, Cells, Offset, and End(xlUp) properties.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Logic Structures, Loops & Custom User-Defined Functions (UDF)",
        description:
          "Apply If-Then-Else conditional tests, write For-Next and Do-While loops, and code custom User-Defined Functions to perform proprietary calculations.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Building Interactive GUI UserForms",
        description:
          "Design custom pop-up dialog boxes with textboxes, comboboxes, command buttons, and checkboxes to sanitize user data entry before sheet insertion.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Error Handling, Outlook Integration & Automated Reports",
        description:
          "Implement On Error Resume Next/GoTo handlers, automate batch PDF generation, dispatch automated email reports through Outlook, and optimize execution speed.",
      },
    ],
  },

  // 3. Shopify Development Course
  {
    title: "Shopify Store Development & Liquid E-Commerce",
    slug: "shopify-devlopment-course",
    category: "Web Development",
    badge: "Job Oriented",
    duration: "2 Months",
    description:
      "Build high-converting modern e-commerce stores on Shopify: Liquid template coding, theme customization, product cataloging, payment integration, and app configurations.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of HTML, CSS, and e-commerce shopping workflows",
      "Entrepreneurs, freelancers, web developers, and digital agency executives",
      "No advanced coding background needed",
    ],
    tools: [
      { id: "tool-1", name: "Shopify CLI & Partner Dashboard", iconType: "cart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "Liquid Templating Language", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Shopify Theme Editor & JSON Templates", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Razorpay, Stripe & Shipping Apps", iconType: "tag", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Shopify Platform Setup & Store Architecture",
        description:
          "Set up Shopify Partner development stores, understand store settings, currency preferences, tax rules, staff roles, and the e-commerce admin dashboard.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Catalog Management, Collections & Inventory",
        description:
          "Create simple and variant products (sizes, colors), organize manual and smart automated collections, manage SKU stock levels, and configure digital downloads.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Theme Customization & Section Architecture (Online Store 2.0)",
        description:
          "Customize modern Online Store 2.0 themes, create dynamic sections, reusable blocks, custom header/footer layouts, and configure announcement bars.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Liquid Programming & Dynamic Custom Templates",
        description:
          "Code custom storefront layouts using Shopify Liquid: output tags {{ }}, logic tags {% %}, filters, metafields, cart objects, and product loops.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Payment Gateways, Checkout & Shipping Logistics",
        description:
          "Integrate domestic and global payment gateways (Razorpay, Cash on Delivery, Stripe), set weight-based shipping rates, and automate abandoned cart recovery.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "App Ecosystem, SEO Optimization & Store Launch",
        description:
          "Install review apps, dropshipping integrations, implement on-page SEO, speed optimization, domain mapping, and launch a live commercial storefront.",
      },
    ],
  },

  // 4. HTML Programming Course
  {
    title: "HTML5 Semantic Web Development & Web Accessibility",
    slug: "html-programming-course",
    category: "Web Development",
    badge: "Industry Certified",
    duration: "1 Month",
    description:
      "Master modern semantic HTML5: accessible page structure, tables, media embedding, forms, canvas graphics, and SEO meta tags for modern responsive websites.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy",
      "Anyone aspiring to start a career in frontend web development or design",
      "Zero prior coding knowledge required",
    ],
    tools: [
      { id: "tool-1", name: "VS Code & Live Server", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "HTML5 Semantic Elements", iconType: "code", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "W3C Validation Tools", iconType: "certification", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Web Accessibility (ARIA)", iconType: "layout", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Internet Mechanics & HTML Document Structure",
        description:
          "Understand client-server architecture, URLs, DOCTYPE declarations, head vs body tags, title tags, and character encodings (UTF-8).",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Text Typography, Lists & Hyperlinking",
        description:
          "Format paragraphs, headings (H1-H6), inline semantic elements (strong, em, code), ordered/unordered lists, and relative vs absolute hyperlinks.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Tables, Tabular Data & Semantic Structuring",
        description:
          "Construct complex accessible data tables using table, thead, tbody, tfoot, tr, th, td, colspan, and rowspan attributes.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Interactive Web Forms & HTML5 Input Validation",
        description:
          "Build web forms with modern input types (email, tel, date, range), textareas, dropdowns, labels, and built-in validation attributes (required, pattern).",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Multimedia Embedding: Audio, Video & Iframes",
        description:
          "Embed responsive audio players, video streams with custom controls, interactive Google Maps, and YouTube videos using iframes.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Semantic HTML5 Layouts, SEO & W3C Standards",
        description:
          "Structure modern web pages using header, nav, main, article, section, aside, footer, Open Graph SEO metadata, and validate code against W3C standards.",
      },
    ],
  },

  // 5. Ethical Hacking Course
  {
    title: "Ethical Hacking & Cyber Defense Fundamentals",
    slug: "ethical-hacking-course",
    category: "Cyber Security & Networking",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Learn white-hat ethical hacking: reconnaissance, network scanning, Wi-Fi auditing, social engineering, password cracking, and vulnerability assessment.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of computers and computer networking",
      "BCA / MCA / B.Tech / IT students or tech security enthusiasts",
      "Commitment to ethical cybersecurity practices",
    ],
    tools: [
      { id: "tool-1", name: "Kali Linux OS", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Wireshark & Nmap", iconType: "network", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Aircrack-ng & Hashcat", iconType: "lock", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Burp Suite Community", iconType: "security", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Ethical Hacking Fundamentals & Cyber Laws",
        description:
          "Understand hacker classes (black, white, grey hat), hacking lifecycle stages, vulnerability disclosure ethics, and the Indian IT Act 2000 legal framework.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Information Gathering (Footprinting & OSINT)",
        description:
          "Conduct passive and active reconnaissance using Google Dorks, Whois queries, DNS enumeration, Harvester, and social media footprinting.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Network Scanning, Port Diagnostics & Enumeration",
        description:
          "Scan live network subnets with Nmap, identify open listening ports, grab service banners, detect operating systems, and enumerate SNMP/SMB services.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "System Hacking & Password Security Auditing",
        description:
          "Extract Windows SAM database hashes, execute offline dictionary and brute-force attacks with John the Ripper and Hashcat, and patch authentication holes.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Wireless Security Auditing & Sniffing",
        description:
          "Capture 4-way WPA/WPA2 handshakes, test wireless router vulnerability using Aircrack-ng, and intercept unencrypted packet streams with Wireshark.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Social Engineering, Malware Defense & Countermeasures",
        description:
          "Analyze phishing vectors, fake profile scams, Trojan attack mechanisms, configure host firewalls, and implement proactive cyber defense protocols.",
      },
    ],
  },

  // 6. Stenographer Course
  {
    title: "Professional Stenography, Shorthand & High-Speed Typing",
    slug: "best-stenographer-course",
    category: "Language & Communication",
    badge: "Govt. Recognized",
    duration: "6 Months",
    description:
      "Prepare for High Court, SSC, and state government stenographer exams: Pitman shorthand, stroke dictation, speed transcription, and precision computer typing.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / Any Graduate or Undergraduate student",
      "Aspirants targeting SSC Stenographer (Grade C & D), High Court, or Secretariat recruitment exams",
      "Patience and commitment to daily shorthand handwriting practice",
    ],
    tools: [
      { id: "tool-1", name: "Pitman Shorthand System", iconType: "pen", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Speed Dictation Audio Lab", iconType: "headphones", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Computer Typing Software", iconType: "terminal", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Govt. Exam Transcription Portal", iconType: "document", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Pitman Shorthand Fundamentals: Consonants & Strokes",
        description:
          "Master light and heavy consonant strokes, straight downstrokes, curved strokes, joining rules, and maintain proper pen grip and stroke angles.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Vowel Placement, Diphthongs & Intersections",
        description:
          "Understand 12 vowel sounds (dot and dash vowels), three vowel positions, diphthongs (I, OW, OI, U), and vowel representation on outlines.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Grammalogues, Phraseography & Special Contractions",
        description:
          "Memorize high-frequency shorthand word signs (grammalogues), join strokes into fluent phrases without lifting the pen, and write abbreviated words.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Speed Building Dictation (60 to 80 WPM)",
        description:
          "Practice progressive audio dictation sessions from parliamentary debates and court proceedings, scaling shorthand recording speed to 80 words per minute.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "High-Speed Advanced Dictation (80 to 100+ WPM)",
        description:
          "Tackle rapid dictations up to 100+ WPM, master legal terminology, editorial vocabulary, and rapid stroke abbreviation under tight time limits.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Computer Transcription & Govt. Exam Mock Tests",
        description:
          "Transcribe handwritten shorthand notes into typed English on computers within exam time limits, minimizing errors for SSC Grade C & D exams.",
      },
    ],
  },

  // 7. ETABS Course
  {
    title: "ETABS Structural Analysis & Earthquake Resistant Building Design",
    slug: "etabs-course",
    category: "Architecture & CAD",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Perform multi-story building structural analysis with CSI ETABS: concrete frame modeling, shear walls, wind and seismic earthquake loading (IS 1893), and reinforcement design.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech / BE in Civil or Structural Engineering",
      "Knowledge of structural analysis, concrete design (IS 456), and engineering mechanics",
      "No prior ETABS software experience required",
    ],
    tools: [
      { id: "tool-1", name: "CSI ETABS Professional", iconType: "workstation", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Indian Standard Codes (IS 456, IS 1893)", iconType: "document", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Response Spectrum & Wind Load Engine", iconType: "wind", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Detailed Reinforcement Schedule Viewers", iconType: "chart", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "ETABS Modeling Workspace & Grid System",
        description:
          "Configure building story data, Cartesian and cylindrical grid systems, material properties (concrete grade M25/M30, steel rebar Fe500), and frame section dimensions.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Structural Geometry Modeling: Beams, Columns & Slabs",
        description:
          "Model 3D multi-story concrete structures: draw beams, columns, drop panels, rigid diaphragms, and assign two-way slab shell elements.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Gravity & Lateral Load Definition",
        description:
          "Apply dead loads, live loads according to IS 875 Part 1 & 2, define wind forces (IS 875 Part 3), and calculate seismic base shear as per IS 1893:2016.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Finite Element Structural Analysis",
        description:
          "Execute linear static analysis, check story drift, modal mass participation ratios, analyze bending moment diagrams (BMD) and shear force diagrams (SFD).",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Reinforced Concrete Frame & Shear Wall Design",
        description:
          "Design longitudinal and shear reinforcement for beams, columns, and concrete shear cores as per Indian Standard IS 456 and ductile detailing code IS 13920.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Foundation Interface, Report Generation & High-Rise Project",
        description:
          "Extract joint reaction forces for foundation design, compile professional structural design calculation reports, and complete a G+10 residential tower project.",
      },
    ],
  },

  // 8. PVsyst Course
  {
    title: "PVsyst Solar Photovoltaic Plant Design & Simulation",
    slug: "pvsyst-course",
    category: "Mechanical & MEP Engineering",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Design utility-scale and rooftop solar PV power plants with PVsyst: solar irradiance modeling, shading analysis, PV string sizing, inverter matching, and generation yield reports.",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Diploma / B.Tech in Electrical, Civil, Mechanical, or Renewable Energy",
      "Solar industry engineers, technicians, and green energy entrepreneurs",
      "Basic understanding of electrical units (kW, kWh, Voltage)",
    ],
    tools: [
      { id: "tool-1", name: "PVsyst Simulation Software", iconType: "sun", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "Meteonorm Solar Database", iconType: "cloud", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "3D Near-Shading Simulator", iconType: "workstation", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Financial Yield & PVSyst Reports", iconType: "chart", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Solar Photovoltaic Principles & Solar Geometry",
        description:
          "Study solar radiation fundamentals (DNI, GHI, DHI), sun path diagrams, solar zenith, azimuth angles, optimal tilt angle, and orientation factors.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Meteorological Data & Geographic Project Setup",
        description:
          "Import high-precision weather datasets from Meteonorm, NASA, and SolarGIS into PVsyst, creating geographical site coordinates for any global location.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "PV Module & Inverter Matching Configuration",
        description:
          "Select mono/poly/bifacial PV modules, calculate string lengths based on inverter MPPT voltage windows, and analyze DC/AC overload ratios.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "3D Near-Shading Scene Construction",
        description:
          "Construct 3D CAD environments of surrounding buildings, trees, and terrain in PVsyst, calculating linear and electrical near-shading loss curves.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Detailed System Loss Analysis (Ohmic, Soiling, Thermal)",
        description:
          "Account for thermal degradation losses, DC/AC cable resistance ohmic losses, module quality/mismatch losses, soiling, and transformer efficiency.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Generation Simulation, Financial Yield & Bankable Reports",
        description:
          "Execute annual simulation runs, interpret Performance Ratio (PR) graphs, calculate normalized production yields, and generate bankable bank-loan reports.",
      },
    ],
  },

  // 9. E-Commerce Course
  {
    title: "E-Commerce Business & Marketplace Specialist",
    slug: "e-commerce-course",
    category: "Digital Marketing",
    badge: "Job Oriented",
    duration: "2 Months",
    description:
      "Launch and scale profitable e-commerce operations across Amazon, Flipkart, Meesho, and direct-to-consumer (D2C) websites, covering product listing, ads, and logistics.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer and internet browsing proficiency",
      "Aspiring online entrepreneurs, retail business owners, and marketing graduates",
      "No prior online selling experience needed",
    ],
    tools: [
      { id: "tool-1", name: "Amazon Seller Central & Flipkart Portal", iconType: "cart", glowColor: "rgba(255, 153, 0, 0.3)" },
      { id: "tool-2", name: "Helium 10 & Jungle Scout", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Sponsored Ads & PPC Manager", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "FBA & Third-Party Shipping Aggregators", iconType: "tag", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "E-Commerce Ecosystem & Business Registration",
        description:
          "Understand marketplace models (B2B vs B2C vs D2C), GST requirements for online selling, trademark brand registry, and seller central onboarding.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Profitable Product Research & Supplier Sourcing",
        description:
          "Identify winning high-margin products using Helium 10 and Jungle Scout, analyze competitor sales volume, and source inventory from domestic manufacturers.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Catalog Optimization & SEO Product Listings",
        description:
          "Write keyword-rich product titles, compelling bullet points, descriptions, backend search terms, and create professional A+ Content (EBC) graphics.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Marketplace Advertising: Sponsored Products & Brands",
        description:
          "Set up Amazon Sponsored Products, Brands, and Display PPC ad campaigns, optimize bid strategies, analyze ACOS/ROAS, and negative-target wasteful keywords.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Fulfillment Models: FBA, Easy Ship & Inventory Health",
        description:
          "Manage Fulfillment by Amazon (FBA) warehousing, generate FNSKU product barcodes, shipping labels, manage customer returns, and maintain account health.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "D2C Brand Strategy & Profitability Accounting",
        description:
          "Build an independent brand identity, manage courier aggregators (Shiprocket), calculate net profit margins after marketplace referral fees, and scale sales.",
      },
    ],
  },

  // 10. ZBrush Course
  {
    title: "Pixologic ZBrush 3D Digital Sculpting & Character Art",
    slug: "zbrush-course",
    category: "Animation & 3D",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Sculpt high-poly characters, creature anatomy, hard-surface props, and realistic organic models using Pixologic ZBrush, DynaMesh, ZRemesher, and polypainting.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Interest in 3D art, gaming characters, animation, and digital sculpture",
      "Familiarity with digital tablets/stylus is helpful but not mandatory",
      "No prior 3D sculpting software background required",
    ],
    tools: [
      { id: "tool-1", name: "Pixologic ZBrush Pro", iconType: "workstation", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-2", name: "DynaMesh & ZRemesher", iconType: "layers", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Polypaint & Spotlight Texturing", iconType: "palette", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "SubTool Master & BPR Renderer", iconType: "sparkles", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "ZBrush Interface, Navigation & Canvas Geometry",
        description:
          "Master the 2.5D/3D interface, viewport navigation, document canvas sizing, primitive 3D tools, Edit Mode, and managing multi-layer SubTools.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Core Sculpting Brushes & Digital Clay Fundamentals",
        description:
          "Sculpt organic forms with Standard, Clay Buildup, Move, DamStandard, Inflat, and Smooth brushes, controlling brush curve falloffs and alpha textures.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Digital Base Meshes: ZSpheres & DynaMesh",
        description:
          "Block out character armatures using ZSpheres, generate uniform manifold geometry with DynaMesh, and sculpt without polygon stretching.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Human & Creature Anatomy Sculpting",
        description:
          "Sculpt realistic human skull proportions, facial muscles, torso muscle landmarks, arms, hands, wrinkles, and creature skin pores with alpha stencils.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Retopology with ZRemesher & Hard-Surface Modeling",
        description:
          "Generate clean low-poly animation topology with ZRemesher, use ZModeler brush for hard-surface mechanical props, and manage polygroups.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Polypainting, Texture Baking & BPR Portfolio Renders",
        description:
          "Paint high-resolution color textures directly onto vertices using Polypaint, bake normal/displacement maps, and render beauty shots with Best Preview Render (BPR).",
      },
    ],
  },

  // 11. DTP Course
  {
    title: "DTP (Desktop Publishing) Graphic Design Master Diploma",
    slug: "dtp-desktop-publishing-course",
    category: "Graphic Design",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Become a professional desktop publishing specialist: CorelDRAW, Adobe Photoshop, PageMaker, Hindi/English typing, printing pre-press, and commercial stationery design.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th / Any Graduate or Undergraduate student",
      "Anyone wanting to work in printing presses, advertising agencies, or start a graphic business",
      "No prior design experience required",
    ],
    tools: [
      { id: "tool-1", name: "CorelDRAW Vector Suite", iconType: "pen", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "Adobe Photoshop CC", iconType: "adobe", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Adobe PageMaker / InDesign", iconType: "layout", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-4", name: "Hindi & English Typing Suites", iconType: "keyboard", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Computer Fundamentals & Bilingual Typing (Hindi & English)",
        description:
          "Master touch typing in English and Hindi (KrutiDev / DevLys / Mangal fonts), Windows file handling, and font management for publishing.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Vector Artwork & Layout Design in CorelDRAW",
        description:
          "Design vector logos, decorative borders, wedding invitation cards, visiting cards, certificate frames, and flex banners using CorelDRAW bezier tools.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Digital Photo Editing & Retouching in Photoshop",
        description:
          "Crop passport photos, remove photo backgrounds with pen tool, color correct skin tones, restore damaged vintage prints, and design advertising posters.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Publication Typography & Multi-Page Layouts",
        description:
          "Format newspapers, magazines, brochures, book chapter layouts, balance columns, manage drop caps, and design multi-page commercial catalogs.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Print Pre-Press, Color Separation & Plate Making",
        description:
          "Understand offset and digital printing processes, CMYK 4-color separation, positive film creation, screen printing mesh preparation, and bleed/slug margins.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Paper Sizing, Commercial Cost Estimation & Client Projects",
        description:
          "Calculate paper sheet divisions (A4, Legal, 18x23, 23x36), compute printing and binding costs, and complete commercial client print jobs.",
      },
    ],
  },

  // 12. WordPress Course
  {
    title: "WordPress CMS Website & E-Commerce Development",
    slug: "wordpress-course",
    category: "Web Development",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Design professional business websites, blogs, portfolios, and online stores with WordPress, Elementor page builder, WooCommerce, plugins, and web hosting.",
    image: "https://images.unsplash.com/photo-1599507593499-a3f7f7d97f66?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy and internet surfing experience",
      "Freelancers, business owners, digital marketers, and aspiring web designers",
      "No coding knowledge required",
    ],
    tools: [
      { id: "tool-1", name: "WordPress CMS & Dashboard", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Elementor Pro Page Builder", iconType: "layout", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "WooCommerce E-Commerce Store", iconType: "cart", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "cPanel, Domain & SSL Hosting", iconType: "server", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "WordPress Setup, Localhost & Web Hosting",
        description:
          "Install WordPress locally on XAMPP and live cPanel servers, configure MySQL databases, understand permalinks, and manage admin dashboard settings.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Themes, Customizer & Gutenberg Block Editor",
        description:
          "Install modern themes (Astra, OceanWP), customize site identity, headers, footers, typography, and create rich blog posts with Gutenberg blocks.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Visual Website Building with Elementor",
        description:
          "Design stunning responsive web pages using Elementor drag-and-drop widgets, adjust mobile/tablet breakpoints, and build hero banners and contact forms.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "WooCommerce E-Commerce Store Development",
        description:
          "Set up an online shopping store, add simple/variable products, configure Indian payment gateways (Razorpay, UPI), and manage customer orders.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Plugin Architecture, SEO & Speed Optimization",
        description:
          "Configure essential plugins: Yoast/RankMath for on-page SEO, contact forms, WP Rocket/LiteSpeed for caching, and Google Analytics tracking.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Security Hardening, Backups & Client Website Handover",
        description:
          "Protect against brute-force attacks with Wordfence, perform automated cloud backups with UpdraftPlus, migrate domains, and deliver client projects.",
      },
    ],
  },

  // 13. Office Automation Diploma
  {
    title: "Diploma in Office Automation & Digital Publishing",
    slug: "diploma-in-office-automation-publishing-course",
    category: "Govt. Recognized Diploma",
    badge: "Job Oriented",
    duration: "6 Months",
    description:
      "Comprehensive diploma covering computer office productivity, advanced MS Office, CorelDRAW, Photoshop publishing, financial accounting, and internet utilities.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th / Any Graduate or Undergraduate student",
      "Anyone preparing for front-office, administrative, clerical, or computer operator positions",
      "No prior computer education required",
    ],
    tools: [
      { id: "tool-1", name: "MS Office 365 Professional", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "CorelDRAW & Graphic Suite", iconType: "pen", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Adobe Photoshop CC", iconType: "adobe", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "TallyPrime Financial Accounting", iconType: "calculator", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Computer Operating Systems & Office Management",
        description:
          "Master Windows file systems, folder structures, control panel configurations, peripheral connections, and corporate email communication etiquette.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Advanced Word Processing & Document Automation",
        description:
          "Draft business letters, tenders, formal agreements, apply paragraph styles, automated indexes, and manage bulk letter generation using Mail Merge.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Financial Spreadsheets & Data Analytics in Excel",
        description:
          "Build salary sheets, inventory sheets, write lookup formulas (VLOOKUP, INDEX/MATCH), generate Pivot Tables, and design executive business charts.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Digital Publishing & Stationery Design (CorelDRAW)",
        description:
          "Design corporate identity materials: letterheads, visiting cards, envelopes, brochures, pamphlets, and certificates using vector tools.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Photo Editing & Creative Advertisements (Photoshop)",
        description:
          "Edit corporate headshots, remove backgrounds, balance colors, and design eye-catching social media posters and web banners.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Computerized Accounting & Office Administration Lab",
        description:
          "Record basic business sales and expense transactions in TallyPrime, manage office petty cash, and complete administrative office workflow practicals.",
      },
    ],
  },

  // 14. Web Designing Course
  {
    title: "Responsive Web Designing & Frontend UI Fundamentals",
    slug: "web-designing-course",
    category: "Web Development",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Design mobile-responsive, modern websites with HTML5, CSS3, Flexbox, CSS Grid, Bootstrap, JavaScript DOM manipulation, and UI design principles.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy",
      "Anyone aspiring to become a professional frontend web designer",
      "No coding experience needed",
    ],
    tools: [
      { id: "tool-1", name: "VS Code & Emmet Extensions", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "HTML5 & CSS3 Modern Flex/Grid", iconType: "code", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Bootstrap 5 Framework", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "JavaScript & jQuery Interactivity", iconType: "zap", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "HTML5 Semantic Structure & Page Architecture",
        description:
          "Build clean semantic markup using header, nav, section, article, footer, forms, audio/video elements, and structure web pages properly.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Modern CSS3 Styling, Box Model & Typography",
        description:
          "Master the CSS Box Model, margins, paddings, borders, web fonts (Google Fonts), color palettes, gradients, and CSS transitions.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Responsive Layouts with Flexbox & CSS Grid",
        description:
          "Create complex responsive multi-column layouts without floats using CSS Flexbox alignment and two-dimensional CSS Grid systems.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Rapid Mobile-First UI Design with Bootstrap 5",
        description:
          "Utilize Bootstrap 5 grid containers, responsive utility classes, navigation bars, modal dialogs, carousels, cards, and responsive forms.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "JavaScript & jQuery for Dynamic Interactivity",
        description:
          "Add dynamic UI behaviors: mobile hamburger menu toggles, interactive tabbed content, accordion FAQs, modal popups, and form validation.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Cross-Browser Compatibility & Live Website Hosting",
        description:
          "Test responsive layouts across mobile, tablet, and desktop viewports, optimize web assets, and deploy a live multi-page portfolio website.",
      },
    ],
  },

  // 15. Diploma in Website Designing
  {
    title: "Master Diploma in Website Designing & Frontend Engineering",
    slug: "diploma-in-website-designing-course",
    category: "Web Development",
    badge: "Industry Certified",
    duration: "6 Months",
    description:
      "Comprehensive web design diploma: Figma UI/UX prototyping, HTML5/CSS3, Tailwind CSS, JavaScript ES6+, React foundations, and live web deployment.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / BCA / B.Tech / Diploma / Any Graduate or Undergraduate",
      "Creativity and enthusiasm for building cutting-edge web applications",
      "Zero prior coding background required",
    ],
    tools: [
      { id: "tool-1", name: "Figma UI/UX Design", iconType: "figma", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-2", name: "HTML5, CSS3 & Tailwind CSS", iconType: "code", glowColor: "rgba(56, 189, 248, 0.3)" },
      { id: "tool-3", name: "Modern JavaScript (ES6+)", iconType: "zap", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "React Components & GitHub", iconType: "react", glowColor: "rgba(97, 218, 251, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "UI/UX Research, Wireframing & Figma Prototyping",
        description:
          "Conduct user persona research, design interactive wireframes and design systems in Figma, incorporating typography scales and component auto-layouts.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Semantic HTML5 & Modern CSS3 Architecture",
        description:
          "Translate Figma prototypes into pixel-perfect semantic HTML5, applying modern CSS3 animations, pseudo-classes, and variables.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Modern Utility-First Styling with Tailwind CSS",
        description:
          "Build responsive interfaces rapidly with Tailwind CSS utility classes, configure tailwind.config.js, and implement dark mode styling.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Advanced JavaScript Programming & Asynchronous Fetch",
        description:
          "Master JavaScript ES6+ (arrow functions, destructuring, promises, async/await), DOM events, and fetch live data from external REST APIs.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Frontend Component Engineering with React",
        description:
          "Break UIs into reusable React functional components, manage state with useState/useEffect hooks, and handle client routing with React Router.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Git Version Control, CI/CD & Portfolio Showcase",
        description:
          "Collaborate with Git and GitHub, deploy live projects on Vercel/Netlify with custom domains, and construct a standout frontend developer portfolio.",
      },
    ],
  },

  // 16. V-Ray Training Course
  {
    title: "V-Ray Photorealistic Architectural Rendering & Lighting",
    slug: "v-ray-training-course",
    category: "Architecture & CAD",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Master photorealistic rendering with Chaos V-Ray: physically based materials (PBR), natural daylighting (Sun & Sky), HDRI dome lighting, camera exposure, and post-production.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic knowledge of 3ds Max, SketchUp, or Revit 3D modeling",
      "Architects, interior designers, 3D visualizers, and civil draftsmen",
      "No prior V-Ray rendering experience needed",
    ],
    tools: [
      { id: "tool-1", name: "Chaos V-Ray Render Engine", iconType: "sparkles", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "V-Ray Physical Camera", iconType: "camera", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "V-Ray Material Shaders (VRayMtl)", iconType: "palette", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "V-Ray Frame Buffer (VFB)", iconType: "workstation", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "V-Ray Rendering Architecture & Engine Settings",
        description:
          "Understand ray-tracing rendering, Global Illumination (GI) algorithms (Brute Force, Light Cache), image samplers, and noise threshold optimization.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Physical Camera Composition & Exposure Controls",
        description:
          "Configure the V-Ray Physical Camera: shutter speed, aperture F-number, ISO sensitivity, white balance, depth of field, and vertical tilt correction.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Natural & Exterior Lighting (V-Ray Sun, Sky & HDRI)",
        description:
          "Simulate realistic sunlight with V-Ray Sun and Sky, illuminate scenes with 360-degree high dynamic range HDRI dome lights, and adjust solar turbidity.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Artificial Interior Lighting (IES & Area Lights)",
        description:
          "Model architectural lighting with V-Ray Plane lights, Mesh lights, photometric IES web profiles for ceiling spotlights, and warm LED strip coves.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Physically Based Materials & Shaders (VRayMtl)",
        description:
          "Create hyper-realistic materials: marble, polished wood, textured tiles, architectural glass with dispersion, brushed metals, fabrics, and bump maps.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Render Elements & Post-Production in VFB / Photoshop",
        description:
          "Extract render element passes (Diffuse, Reflection, Refraction, Ambient Occlusion, Cryptomatte), and composite final high-res architectural renders in Photoshop.",
      },
    ],
  },
];

