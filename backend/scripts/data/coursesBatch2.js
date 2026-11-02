module.exports = [
  // 18. ASP.NET Web Forms & Core Course
  {
    title: "ASP.NET Core & C# Full-Stack Web Development",
    slug: "asp-net-course",
    category: "Programming & Dev",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Develop secure, cross-platform enterprise web applications and microservices using C#, ASP.NET Core, Entity Framework Core, SQL Server, and REST APIs.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of programming logic and databases",
      "BCA / MCA / B.Tech / Diploma or software developers",
      "No prior .NET experience required",
    ],
    tools: [
      { id: "tool-1", name: "Visual Studio 2022 & C#", iconType: "terminal", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-2", name: "ASP.NET Core & Razor Pages", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Entity Framework Core", iconType: "database", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Microsoft SQL Server & Azure", iconType: "cloud", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "C# Language Foundations & Object-Oriented Principles",
        description:
          "Master C# data types, generics, interfaces, abstract classes, delegates, events, lambda expressions, and LINQ collection querying.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "ASP.NET Core Architecture & Middleware Pipeline",
        description:
          "Understand the unified ASP.NET Core web host, dependency injection container, configuration management (appsettings.json), and HTTP middleware pipeline.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Database Modeling with Entity Framework Core",
        description:
          "Create relational data models using EF Core, configure database migrations, write LINQ-to-Entities queries, and handle database relationships.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Building RESTful Web APIs with ASP.NET Core",
        description:
          "Construct scalable JSON Web API controllers, implement CRUD operations, return HTTP response statuses, and generate interactive Swagger/OpenAPI documentation.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Security, Authentication & JWT Authorization",
        description:
          "Secure endpoints with JSON Web Tokens (JWT), configure claim-based authorization, implement password hashing, and prevent SQL injection/CSRF.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Enterprise Project & Cloud Hosting Deployment",
        description:
          "Build an end-to-end full-stack web application with repository patterns, automated unit testing, and deploy to Microsoft Azure App Services.",
      },
    ],
  },

  // 19. Microsoft Power BI Course
  {
    title: "Microsoft Power BI Data Visualization & Business Analytics",
    slug: "microsoft-power-bi-course",
    category: "Data Science & Analytics",
    badge: "Industry Certified",
    duration: "2 Months",
    description:
      "Transform raw corporate data into interactive dashboards, KPI reports, and actionable business insights using Power BI Desktop, Power Query, and DAX formulas.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Familiarity with basic Microsoft Excel functions",
      "Business professionals, accountants, engineers, and aspiring data analysts",
      "No coding experience required",
    ],
    tools: [
      { id: "tool-1", name: "Power BI Desktop & Service", iconType: "chart", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "Power Query ETL Engine", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "DAX (Data Analysis Expressions)", iconType: "calculator", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "SQL & Cloud Data Connectors", iconType: "database", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Power BI Architecture & Data Connecting",
        description:
          "Explore the Power BI ecosystem, import heterogeneous data sources (Excel, CSV, SQL databases, Web APIs), and understand DirectQuery vs Import mode.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Data Transformation & ETL with Power Query",
        description:
          "Clean, pivot, unpivot, merge, and append messy datasets, handle missing values, and transform complex tables with Power Query M code.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Data Modeling & Relationship Management",
        description:
          "Design robust star and snowflake schemas, establish cardinality (1-to-many, many-to-many), and configure cross-filter directions.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "DAX Calculations: Calculated Columns & Measures",
        description:
          "Write powerful DAX formulas using CALCULATE, FILTER, RELATED, SUMX, and implement Time-Intelligence functions (YTD, QTD, SamePeriodLastYear).",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Interactive Visualization & Dynamic Dashboard Design",
        description:
          "Build intuitive visual reports with bar charts, treemaps, KPI cards, visual tooltips, slicers, bookmarks, drill-throughs, and color themes.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Power BI Cloud Service, Gateways & Row-Level Security",
        description:
          "Publish reports to Power BI Service, configure on-premises scheduled data refresh gateways, share workspaces, and enforce Row-Level Security (RLS).",
      },
    ],
  },

  // 20. MIS & Data Analysis Course
  {
    title: "MIS Reporting & Advanced Data Analysis",
    slug: "mis-and-data-analysis-course",
    category: "Data Science & Analytics",
    badge: "Job Oriented",
    duration: "2 Months",
    description:
      "Master Management Information Systems (MIS), advanced spreadsheet modeling, automated corporate reporting, KPI scorecards, and data analytics workflows.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic knowledge of computer operating systems and Excel fundamentals",
      "Any graduate, B.Com, BBA, BCA, or corporate administrative executives",
      "Analytical mindset and passion for structured business data",
    ],
    tools: [
      { id: "tool-1", name: "Advanced MS Excel & MIS", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "Pivot Tables & Power Query", iconType: "database", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "VBA & Macros Automation", iconType: "code", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Executive KPI Dashboards", iconType: "layout", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "MIS Concepts & Corporate Information Flow",
        description:
          "Understand how Management Information Systems drive executive decision-making, data auditing standards, and operational reporting cycles.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Advanced Excel Functions for MIS Analysts",
        description:
          "Master lookup engines (XLOOKUP, INDEX-MATCH), dynamic arrays (FILTER, UNIQUE, SORT), nested logical tests, and multi-criteria aggregations.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Pivot Tables, Slicers & Multi-Dimensional Summaries",
        description:
          "Summarize large corporate datasets with Pivot Tables, calculated fields, grouped dates, timelines, slicers, and conditional data visualization.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Automated Data Cleaning with Power Query",
        description:
          "Automate daily, weekly, and monthly data extraction, transformation, consolidation from multiple branches, and eliminate manual copy-pasting.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "VBA Macro Fundamentals for Reporting Automation",
        description:
          "Record and write basic VBA macro scripts, automate repetitive spreadsheet tasks, generate PDF reports, and trigger automated email dispatchers.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Executive MIS Dashboard Creation & Case Studies",
        description:
          "Design interactive executive management dashboards for sales, inventory, HR payroll, and financial operations with live case studies.",
      },
    ],
  },

  // 21. AWS Cloud Computing Course
  {
    title: "AWS Cloud Computing & Solutions Architecture",
    slug: "aws-amazon-web-services-cloud-computing-course",
    category: "Cloud & DevOps",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Prepare for AWS Certified Solutions Architect with comprehensive hands-on training on EC2, S3, VPC networking, IAM security, RDS databases, Lambda, and high availability.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of computer networks and operating systems",
      "BCA / MCA / B.Tech / Diploma / IT professionals looking to migrate to Cloud",
      "No prior cloud platform experience required",
    ],
    tools: [
      { id: "tool-1", name: "AWS Management Console & CLI", iconType: "cloud", glowColor: "rgba(255, 153, 0, 0.3)" },
      { id: "tool-2", name: "Amazon EC2 & S3 Buckets", iconType: "server", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "AWS VPC, Subnets & Route53", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "AWS Lambda & CloudFormation", iconType: "terminal", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Cloud Computing Fundamentals & AWS Global Infrastructure",
        description:
          "Understand IaaS, PaaS, SaaS, AWS global regions, availability zones, edge locations, and the Shared Responsibility Security Model.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Identity & Access Management (AWS IAM)",
        description:
          "Configure IAM users, groups, roles, JSON permission policies, Multi-Factor Authentication (MFA), and enforce least-privilege security.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Elastic Compute Cloud (EC2) & Elastic Block Store (EBS)",
        description:
          "Provision Linux and Windows EC2 virtual machines, configure security groups, key pairs, attach persistent EBS volumes, and create AMI machine images.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Object Storage with Amazon S3 & CloudFront CDN",
        description:
          "Create S3 buckets, manage storage tiers (Standard, Glacier), configure bucket policies, versioning, static website hosting, and global CloudFront CDN caching.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Virtual Private Cloud (VPC) & Hybrid Networking",
        description:
          "Architect isolated custom VPC networks with public/private subnets, Internet Gateways, NAT Gateways, route tables, Network ACLs, and VPC peering.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "High Availability, Auto Scaling, RDS & Serverless Lambda",
        description:
          "Implement Application Load Balancers (ALB), Auto Scaling Groups (ASG), provision managed relational databases (RDS), and execute serverless Lambda code.",
      },
    ],
  },

  // 22. Mobile Repairing Course
  {
    title: "Smartphone Hardware & Software Mobile Repairing",
    slug: "mobile-reparing-course",
    category: "Hardware & Repairing",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Hands-on mobile phone repairing covering circuit tracing, SMD soldering, BGA chip-level rework, display/touch replacement, flashing, unlocking, and diagnostic troubleshooting.",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10th / 12th / ITI or anyone interested in self-employment and hardware repair",
      "Patience, steady hand-eye coordination, and technical curiosity",
      "Zero prior electronics or mobile repairing experience required",
    ],
    tools: [
      { id: "tool-1", name: "SMD Hot Air Gun & Soldering Station", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Digital Multimeter & DC Power Supply", iconType: "chip", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "Microscope & BGA Reballing Stencils", iconType: "hardware", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-4", name: "Flashing & Unlocking Software Tools", iconType: "software", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Mobile Architecture & Electronic Components Identification",
        description:
          "Identify smartphone internal components: resistors, capacitors, diodes, transistors, coils, crystals, and battery charging circuits using a digital multimeter.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "SMD Soldering, Desoldering & Jumper Techniques",
        description:
          "Master temperature control with SMD rework stations, solder delicate micro-connectors, mic/speakers, USB charging ports, and draw precision track jumpers.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Circuit Board Tracing & Schematic Diagrams",
        description:
          "Read smartphone motherboard schematics and layout bitmaps (ZXW/Pragmafix), trace power lines (VPH_PWR, VREG), and detect short circuits with DC power supplies.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Display Assembly, Touch Screen & Battery Replacement",
        description:
          "Operate LCD separator heating machines, remove cracked front glass, glue OCA laminations, and replace smartphone batteries safely.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "BGA Chip-Level Repair & IC Reballing",
        description:
          "Desolder, clean, and reball BGA integrated circuits including Power IC, Charging IC, Audio IC, and Wi-Fi modules using specialized stencils and solder paste.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Smartphone Software Flashing, Unlocking & IMEI Recovery",
        description:
          "Flash Android and iOS firmware, unlock network locks, bypass FRP Google accounts, recover bootlooped devices, and establish a repair business.",
      },
    ],
  },

  // 23. Banking Diploma Course
  {
    title: "Diploma in Banking, Financial Accounting & Taxation",
    slug: "banking-deploma-course",
    category: "Accounting & Taxation",
    badge: "Govt. Recognized",
    duration: "6 Months",
    description:
      "Comprehensive banking diploma covering banking operations, financial accounting, TallyPrime ERP, GST compliance, TDS calculation, auditing, and corporate banking practices.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / Commerce / Arts / Science / Any Graduate or Undergraduate",
      "Interest in banking, financial management, taxation, and office accounts",
      "No prior accounting knowledge required",
    ],
    tools: [
      { id: "tool-1", name: "TallyPrime ERP with GST", iconType: "calculator", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "Advanced MS Excel Banking Models", iconType: "chart", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "GST & Income Tax Portals", iconType: "document", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Core Banking Software Simulator", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Computer Fundamentals & Office Productivity",
        description:
          "Master modern business computing, Windows administration, professional email correspondence, and business spreadsheet calculations with MS Office.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Principles of Financial Accounting & Bookkeeping",
        description:
          "Learn Golden Rules of Accounting, journal entries, ledger posting, trial balance preparation, and drafting final financial statements (P&L and Balance Sheet).",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Computerized Accounting with TallyPrime",
        description:
          "Set up companies, manage chart of accounts, process purchase/sales vouchers, manage multi-location inventory, and generate cash flow statements.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Banking Operations & Retail Banking Services",
        description:
          "Study KYC protocols, negotiable instruments, cheque clearance, RTGS/NEFT/IMPS transfers, loan disbursements, EMI calculation, and anti-money laundering norms.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Goods & Services Tax (GST) & TDS Compliance",
        description:
          "Understand CGST, SGST, IGST rules, input tax credit (ITC) reconciliation, generate e-way bills, prepare monthly GSTR-1/GSTR-3B, and compute TDS deductions.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Financial Auditing, MIS Reports & Banking Interviews",
        description:
          "Conduct internal audits, prepare bank reconciliation statements (BRS), draft financial ratio reports, and prepare for retail banking interview assessments.",
      },
    ],
  },

  // 24. Networking Course
  {
    title: "Computer Networking & Network Infrastructure Engineering",
    slug: "networking-course",
    category: "Hardware & Networking",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master computer networking fundamentals, TCP/IP & OSI models, IPv4/IPv6 subnetting, switch and router configuration, cabling, DNS/DHCP, and LAN/WAN troubleshooting.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic familiarity with computers",
      "Undergraduates, diploma holders, BCA, B.Tech, or IT technicians",
      "No prior networking background required",
    ],
    tools: [
      { id: "tool-1", name: "Cisco Packet Tracer", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Wireshark Packet Analyzer", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-3", name: "Network Crimper & Cable Tester", iconType: "hardware", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Switches, Routers & Access Points", iconType: "server", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Network Fundamentals, Topologies & OSI Reference Model",
        description:
          "Explore LAN/WAN/MAN networks, star/mesh topologies, and understand data encapsulation across all 7 layers of the OSI model and TCP/IP protocol suite.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Transmission Media, Cabling & Physical Lab",
        description:
          "Gain hands-on experience with Cat6 twisted-pair cabling, color-coding standards (T568A/B), RJ45 crimping, punch-down patch panels, and optical fiber basics.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "IP Addressing & Advanced VLSM Subnetting",
        description:
          "Master Class A/B/C IPv4 addressing, public vs private IP spaces (RFC 1918), CIDR notation, variable-length subnet masking (VLSM), and IPv6 addressing.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Ethernet Switching & Virtual LANs (VLANs)",
        description:
          "Understand MAC address tables, collision vs broadcast domains, configure managed Cisco switches, set up VLAN segmentation, and configure 802.1Q trunking.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Routing Principles & Network Infrastructure Services",
        description:
          "Configure static and dynamic routing (RIP, OSPF), set up DHCP address pools, DNS host resolution, and configure Network Address Translation (NAT/PAT).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Wi-Fi Wireless Networking, Security & Troubleshooting",
        description:
          "Configure wireless access points (WPA2/WPA3 enterprise), capture packet telemetry with Wireshark, analyze latency, and resolve network outages.",
      },
    ],
  },

  // 25. Basic Excel Course
  {
    title: "Basic to Advanced Microsoft Excel & Business Calculations",
    slug: "basic-excel-course",
    category: "Business & Analytics",
    badge: "Industry Certified",
    duration: "1 Month",
    description:
      "Master Microsoft Excel from ground up: spreadsheet formatting, essential formulas, VLOOKUP, Pivot Tables, conditional formatting, data validation, and visual charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy",
      "Students, office clerks, accountants, and working professionals",
      "No prior spreadsheet experience required",
    ],
    tools: [
      { id: "tool-1", name: "Microsoft Excel 2021 / 365", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-2", name: "Formula & Function Library", iconType: "calculator", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Pivot Tables & Charts Engine", iconType: "layout", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-4", name: "Data Validation & Sort Tools", iconType: "document", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Excel Workspace, Navigation & Spreadsheet Formatting",
        description:
          "Navigate ribbon tabs, manage workbooks/sheets, adjust rows/columns, format cell typography, borders, background fills, and number styles.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Essential Formulas & Cell Referencing",
        description:
          "Write mathematical arithmetic formulas, master Relative, Absolute ($A$1), and Mixed cell referencing, and auto-fill series using the fill handle.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Core Mathematical, Statistical & Text Functions",
        description:
          "Utilize standard business functions: SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTIF, SUMIF, and text manipulation tools (LEFT, RIGHT, CONCAT, TRIM).",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Data Organization: Sorting, Filtering & Data Validation",
        description:
          "Sort multi-column tables, apply custom auto-filters, create dropdown selection lists with Data Validation, and remove duplicate records.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Lookup Mastery (VLOOKUP & HLOOKUP) & Logic",
        description:
          "Retrieve cross-sheet data using exact and approximate VLOOKUP matches, handle IFERROR exceptions, and build multi-condition IF statements.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Pivot Tables, Charts & Print Page Layout",
        description:
          "Summarize business records with interactive Pivot Tables, generate bar/pie charts, configure print margins, page breaks, and print headers.",
      },
    ],
  },

  // 26. Node.js Course
  {
    title: "Node.js & Express.js Backend Engineering",
    slug: "node-js-course",
    category: "Web Development",
    badge: "Job Oriented",
    duration: "3 Months",
    description:
      "Build high-performance asynchronous server-side applications and microservices using Node.js, Express.js framework, MongoDB Atlas, JWT authentication, and WebSockets.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Good knowledge of JavaScript (ES6+), async/await, and JSON",
      "Web developers looking to master backend engineering",
      "BCA / MCA / B.Tech or self-taught web programmers",
    ],
    tools: [
      { id: "tool-1", name: "Node.js & V8 Runtime", iconType: "server", glowColor: "rgba(104, 160, 99, 0.3)" },
      { id: "tool-2", name: "Express.js REST Framework", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "MongoDB & Mongoose ODM", iconType: "database", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Postman & JWT Security", iconType: "lock", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Node.js Architecture & Asynchronous Event Loop",
        description:
          "Understand the V8 JavaScript engine, single-threaded non-blocking I/O event loop, global objects, process environment, and CommonJS vs ES Modules.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Core Built-in Modules: FS, Path, Events & Streams",
        description:
          "Read and write files asynchronously with the File System (fs) module, handle EventEmitter architecture, and stream large datasets with buffer pipelines.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Express.js Framework & Middleware Engineering",
        description:
          "Build scalable HTTP servers with Express, handle dynamic URL parameters, manage request bodies, and implement custom logging and error-handling middleware.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "NoSQL Database Integration with MongoDB & Mongoose",
        description:
          "Model complex JSON documents using Mongoose schemas, execute CRUD operations, write validation hooks, aggregate pipelines, and establish relations.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "RESTful API Security, JWT Auth & Password Hashing",
        description:
          "Secure REST endpoints using JSON Web Tokens (JWT), hash passwords with bcrypt, protect against security vulnerabilities with Helmet, and enforce CORS.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Real-Time WebSockets & Cloud Server Deployment",
        description:
          "Build live real-time bidirectional chat with Socket.IO, implement file uploads with Multer, and deploy production servers on Linux cloud hosts.",
      },
    ],
  },

  // 27. Big Data Hadoop Admin Course
  {
    title: "Big Data Hadoop Administration & Cluster Management",
    slug: "big-data-hadoop-admin-course",
    category: "AI & Data",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Administer enterprise multi-node Hadoop clusters: HDFS configuration, YARN resource management, high availability (HA), Kerberos security, and cluster performance monitoring.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Familiarity with Linux command line administration and networking",
      "System administrators, database administrators, or IT infrastructure engineers",
      "Basic understanding of distributed storage concepts",
    ],
    tools: [
      { id: "tool-1", name: "Apache Hadoop & HDFS", iconType: "server", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "YARN & ZooKeeper", iconType: "chip", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Apache Ambari & Cloudera", iconType: "terminal", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Kerberos & Knox Security", iconType: "lock", glowColor: "rgba(239, 68, 68, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Big Data Ecosystem & Hadoop Distributed Architecture",
        description:
          "Understand Big Data characteristics (Volume, Velocity, Variety), master-worker architecture, NameNode, DataNodes, and Secondary NameNodes.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Hadoop Distributed File System (HDFS) Deep Dive",
        description:
          "Configure HDFS block sizes, replication factors, fsimage and edits logs, execute HDFS shell administrative commands, and manage cluster safemode.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Multi-Node Cluster Installation & Configuration",
        description:
          "Set up passwordless SSH across Linux nodes, edit core-site.xml, hdfs-site.xml, yarn-site.xml, and deploy a production-grade multi-node cluster.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "YARN Resource Management & Job Scheduling",
        description:
          "Allocate memory and vCPU resources with YARN ResourceManager, configure Fair Scheduler and Capacity Scheduler, and monitor distributed job queues.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "High Availability (HA) with Apache ZooKeeper",
        description:
          "Eliminate Single Point of Failure (SPOF) by configuring active-standby NameNode High Availability with ZooKeeper Failover Controllers (ZKFC).",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Cluster Security, Ambari Management & Benchmarking",
        description:
          "Secure cluster communication using Kerberos authentication, monitor node health with Apache Ambari, and benchmark cluster I/O performance.",
      },
    ],
  },

  // 28. NIELIT O-Level Course
  {
    title: "NIELIT O-Level IT Diploma Certification",
    slug: "o-level-course",
    category: "Govt. Recognized Diploma",
    badge: "Govt. Recognized",
    duration: "1 Year",
    description:
      "Govt. recognized NIELIT 'O' Level foundation diploma covering IT Tools, Web Designing (HTML/CSS/JS), Python Programming, and Internet of Things (IoT).",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "10+2 / ITI certificate / Any Graduate or Undergraduate student",
      "Aspirants looking for government jobs (SSC, Railways, State Govt) requiring O-Level certification",
      "No prior computer diploma needed",
    ],
    tools: [
      { id: "tool-1", name: "LibreOffice & MS Office Suite", iconType: "document", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "HTML5, CSS3 & JavaScript", iconType: "layout", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Python 3 & IDLE", iconType: "code", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Arduino & IoT Sensors", iconType: "chip", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Paper M1-R5: Information Technology Tools & Network Basics",
        description:
          "Master computer hardware, operating systems (Windows & Linux), word processing (LibreOffice Writer), spreadsheets (Calc), and cyber security essentials.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Paper M2-R5: Web Designing & Publishing Fundamentals",
        description:
          "Design responsive websites using semantic HTML5, modern CSS3 styling, CSS Box Model, W3.CSS framework, and client-side JavaScript interactivity.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Paper M3-R5: Programming & Problem Solving Through Python",
        description:
          "Learn algorithmic logic, flowcharts, Python data structures (lists, tuples, dicts), functions, file handling, and numerical data processing with NumPy.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Paper M4-R5: Internet of Things (IoT) & Applications",
        description:
          "Understand connected device ecosystems, sensors, actuators, Arduino board programming, and security protocols across modern smart IoT applications.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Hands-on Practical Labs & Viva-Voce Training",
        description:
          "Comprehensive practical lab exam simulations covering all four papers, command terminal execution, and one-on-one viva preparation.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "NIELIT Project Work Submission & Model Papers",
        description:
          "Develop and submit the mandatory NIELIT capstone software project, solving previous 5 years' question papers and mock exam assessments.",
      },
    ],
  },

  // 29. Big Data Hadoop Developer Course
  {
    title: "Big Data Hadoop Developer with MapReduce, Hive & Spark",
    slug: "big-data-hadoop-developer-course",
    category: "AI & Data",
    badge: "Industry Certified",
    duration: "4 Months",
    description:
      "Master distributed Big Data engineering: write MapReduce algorithms in Java/Python, query large datasets with Apache Hive and Pig, and process real-time streaming data with Apache Spark.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic programming experience in Java or Python and basic SQL knowledge",
      "Software engineers, ETL developers, and data engineering aspirants",
      "BCA / MCA / B.Tech or analytical graduates",
    ],
    tools: [
      { id: "tool-1", name: "Apache Hadoop & MapReduce", iconType: "terminal", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-2", name: "Apache Hive & Pig", iconType: "database", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Apache Spark & PySpark", iconType: "zap", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-4", name: "Apache Sqoop & Flume", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Distributed Data Storage with HDFS",
        description:
          "Understand how big datasets are chunked across commodity clusters, execute HDFS Java APIs, and optimize data locality and read/write throughput.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "MapReduce Programming Paradigm",
        description:
          "Write custom Mapper and Reducer classes, understand the shuffle and sort phase, implement Partitioners, Combiners, and process terabytes of raw logs.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Data Warehousing with Apache Hive (HiveQL)",
        description:
          "Design enterprise data warehouses with Hive, create managed vs external tables, optimize queries with partitioning and bucketing, and write custom UDFs.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Data Ingestion with Apache Sqoop & Apache Flume",
        description:
          "Import and export bulk structured data between relational databases (RDBMS) and HDFS using Sqoop, and stream unstructured live server logs with Flume.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "In-Memory Data Processing with Apache Spark",
        description:
          "Harness in-memory distributed computation with Spark Resilient Distributed Datasets (RDDs), Spark DataFrames, and Spark SQL transformations.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Real-Time Streaming & End-to-End Big Data Pipeline",
        description:
          "Process real-time streaming feeds with Spark Streaming and Kafka, concluding with a massive end-to-end Big Data analytical pipeline project.",
      },
    ],
  },

  // 30. Oracle Certified Associate (OCA) Course
  {
    title: "Oracle Database Administrator: OCA Certification",
    slug: "oracle-certified-associate-course",
    category: "Database & Cloud",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Prepare for the Oracle Certified Associate (OCA 1Z0-082) credential with in-depth SQL queries, database architecture, tablespace storage, user security, and instance management.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of relational tables and data concepts",
      "BCA / MCA / B.Tech / Diploma / Working IT professionals",
      "No prior Oracle DBA experience required",
    ],
    tools: [
      { id: "tool-1", name: "Oracle Database 19c / 21c", iconType: "database", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "SQL Developer & SQL*Plus", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "Oracle Enterprise Manager (OEM)", iconType: "server", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "OCA Exam Practice Suite", iconType: "certification", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Relational Database Concepts & Advanced SQL",
        description:
          "Master complex SQL queries, multi-table joins, subqueries, set operators, DDL schema creation, DML data manipulation, and transaction control (TCL).",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Oracle Database Architecture & Instance Management",
        description:
          "Study Oracle memory structures (SGA, PGA), background processes (DBWn, LGWR, SMON, PMON), database startup/shutdown stages, and parameter files.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Storage Management: Tablespaces & Datafiles",
        description:
          "Create and manage tablespaces, configure auto-extend datafiles, manage undo tablespaces, temporary tablespaces, and monitor storage utilization.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "User Administration, Security & Privileges",
        description:
          "Create database user accounts, enforce password profiles, assign system and object privileges, configure roles, and audit user activity.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Oracle Network Configuration (Net Services)",
        description:
          "Configure Oracle Net Listener (listener.ora), local naming service (tnsnames.ora), troubleshoot network connections, and manage shared server architecture.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Data Concurrency, Redo Logs & OCA Exam Drills",
        description:
          "Manage lock contention, inspect redo log groups and archive logs, followed by comprehensive OCA 1Z0-082 certification mock exam drills.",
      },
    ],
  },

  // 31. Blockchain Certification Course
  {
    title: "Blockchain Architecture & Smart Contracts Development",
    slug: "blockchain-certification-course",
    category: "Programming & Dev",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Master decentralized Web3 engineering: cryptographic hashing, Ethereum virtual machine (EVM), Solidity smart contracts, Web3.js, DApp development, and DeFi protocols.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of programming (JavaScript, Python, or C++)",
      "Software developers, computer science graduates, and fintech enthusiasts",
      "Curiosity for decentralized consensus and cryptography",
    ],
    tools: [
      { id: "tool-1", name: "Solidity & Remix IDE", iconType: "code", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Hardhat & Truffle Suite", iconType: "terminal", glowColor: "rgba(234, 179, 8, 0.3)" },
      { id: "tool-3", name: "MetaMask & Ethereum Testnets", iconType: "lock", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-4", name: "Ethers.js & Web3.js SDKs", iconType: "network", glowColor: "rgba(16, 185, 129, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Blockchain Foundations & Cryptographic Primitives",
        description:
          "Understand peer-to-peer networks, SHA-256 cryptographic hashing, asymmetric public-key cryptography, digital signatures, and Merkle tree structures.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Consensus Mechanisms & Ethereum EVM Architecture",
        description:
          "Compare Proof of Work (PoW) vs Proof of Stake (PoS), gas economics, account types (EOA vs Contract), and Ethereum Virtual Machine (EVM) bytecodes.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Smart Contract Programming with Solidity",
        description:
          "Write secure Solidity contracts: state variables, functions, modifiers, visibility keywords, mappings, events, inheritance, and error handling (revert/require).",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Token Standards: ERC-20 & ERC-721 (NFTs)",
        description:
          "Implement standard ERC-20 fungible tokens with OpenZeppelin, mint unique ERC-721 non-fungible tokens (NFTs), and store metadata on IPFS.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Decentralized Application (DApp) Frontend Integration",
        description:
          "Connect web frontends to smart contracts using Ethers.js, integrate MetaMask browser wallet authentication, and manage blockchain transaction states.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Smart Contract Security, Auditing & Mainnet Deployment",
        description:
          "Identify reentrancy vulnerabilities, overflow exploits, conduct security audits, test using Hardhat test suites, and deploy to Sepolia/Polygon networks.",
      },
    ],
  },

  // 32. Oracle Certified Professional (OCP) Course
  {
    title: "Oracle Database Administrator: OCP Advanced Certification",
    slug: "oracle-certified-professional-course",
    category: "Database & Cloud",
    badge: "Industry Certified",
    duration: "4 Months",
    description:
      "Advanced Oracle database administration for OCP certification: RMAN backup and recovery, Multitenant container databases (CDB/PDB), performance tuning, and Data Guard.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Completion of Oracle OCA certification or equivalent DBA work experience",
      "Strong understanding of Oracle database architecture and SQL",
      "Database administrators seeking senior enterprise accreditation",
    ],
    tools: [
      { id: "tool-1", name: "Oracle Recovery Manager (RMAN)", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Multitenant Architecture (CDB/PDB)", iconType: "database", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-3", name: "AWR, ADDM & SQL Tuning Advisor", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "Oracle Data Guard & Flashback", iconType: "server", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Multitenant Container (CDB) & Pluggable Databases (PDB)",
        description:
          "Master Oracle Multitenant architecture, create and provision PDBs, clone pluggable databases, unplug/plug across servers, and manage multitenant security.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Backup & Recovery Architecture with RMAN",
        description:
          "Configure Oracle Recovery Manager (RMAN), perform consistent full/incremental backups, configure recovery catalogs, and automate backup retention policies.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Disaster Recovery & Non-Datafile Failure Scenarios",
        description:
          "Restore and recover damaged datafiles, control files, SPFILEs, perform point-in-time recovery (PITR), and handle media failure scenarios without data loss.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Oracle Flashback Technology & Point-In-Time Undo",
        description:
          "Configure Flashback Database, Flashback Drop (recycle bin recovery), Flashback Table, and Flashback Query to reverse accidental data corruption.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Database Performance Tuning & Diagnostic Repositories",
        description:
          "Analyze Automatic Workload Repository (AWR) reports, interpret ADDM recommendations, resolve wait events, and optimize slow execution plans with SQL Tuning Advisor.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "High Availability with Oracle Data Guard & OCP Exam Drills",
        description:
          "Configure physical standby databases with Oracle Data Guard, manage automatic failover and switchovers, and prepare for OCP exam certification dumps.",
      },
    ],
  },

  // 33. Business Analyst Course
  {
    title: "Certified Business Analyst Master Course",
    slug: "business-analyst-course",
    category: "Business & Analytics",
    badge: "Industry Certified",
    duration: "3 Months",
    description:
      "Become an industry-ready Business Analyst: requirements gathering (BRD/FRD), Agile Scrum user stories, UML process mapping, wireframing, SQL queries, and stakeholder management.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Any Graduate / B.Tech / MBA / BBA / B.Com / BCA",
      "Strong communication, analytical thinking, and documentation skills",
      "No coding background required",
    ],
    tools: [
      { id: "tool-1", name: "JIRA & Confluence Agile Suites", iconType: "terminal", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-2", name: "Balsamiq & Figma Wireframing", iconType: "layout", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Microsoft Visio & Lucidchart (UML)", iconType: "chart", glowColor: "rgba(16, 185, 129, 0.3)" },
      { id: "tool-4", name: "SQL for Business Data Queries", iconType: "database", glowColor: "rgba(234, 179, 8, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Role of Business Analyst & Project Lifecycles",
        description:
          "Understand the BA core competencies (BABOK framework), differences between SDLC models (Waterfall vs Agile), and business value proposition.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Requirements Elicitation & Stakeholder Collaboration",
        description:
          "Conduct stakeholder interviews, focus groups, brainstorming workshops, surveys, and requirement elicitation using the MoSCoW prioritization model.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "Documentation Mastery: BRD, FRD, SRS & Use Cases",
        description:
          "Draft professional Business Requirement Documents (BRD), Functional Requirement Specifications (FRS), and write detailed Use Case specifications.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Business Process Modeling (BPMN) & UML Diagrams",
        description:
          "Model workflows using MS Visio and Lucidchart: Activity Diagrams, Use Case Diagrams, Sequence Diagrams, and swimlane workflow representations.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Agile Scrum Methodology & User Stories in JIRA",
        description:
          "Participate in Sprint planning and standups, write INVEST user stories, define Acceptance Criteria, and manage backlog grooming in JIRA.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "UI Wireframing, SQL Analytics & User Acceptance Testing (UAT)",
        description:
          "Create low-fidelity interactive UI wireframes, extract business metrics with SQL queries, coordinate UAT testing signoffs, and prepare case studies.",
      },
    ],
  },

  // 34. Penetration Testing Course
  {
    title: "Advanced Penetration Testing & Web Application Security",
    slug: "penetration-testing-course",
    category: "Cyber Security & Networking",
    badge: "Industry Certified",
    duration: "4 Months",
    description:
      "Learn professional ethical hacking and penetration testing: OWASP Top 10 web vulnerabilities, network exploitation, Metasploit, Burp Suite Pro, and defensive security auditing.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic understanding of networking (IP addresses, ports) and Linux fundamentals",
      "BCA / MCA / B.Tech / IT students or aspiring cyber security analysts",
      "Strong ethical commitment to legal white-hat security testing",
    ],
    tools: [
      { id: "tool-1", name: "Kali Linux & Virtual Pentest Lab", iconType: "terminal", glowColor: "rgba(239, 68, 68, 0.3)" },
      { id: "tool-2", name: "Burp Suite Professional", iconType: "lock", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-3", name: "Nmap & Metasploit Framework", iconType: "network", glowColor: "rgba(59, 130, 246, 0.3)" },
      { id: "tool-4", name: "OWASP ZAP & SQLMap", iconType: "security", glowColor: "rgba(168, 85, 247, 0.3)" },
    ],
    modules: [
      {
        id: "m-1",
        moduleNumber: "MODULE 1",
        title: "Penetration Testing Methodologies & Reconnaissance (OSINT)",
        description:
          "Follow PTES guidelines, conduct passive and active OSINT footprinting, DNS enumeration, subdomain discovery, and network port scanning with Nmap.",
      },
      {
        id: "m-2",
        moduleNumber: "MODULE 2",
        title: "Network Vulnerability Scanning & Exploitation",
        description:
          "Scan enterprise networks with Nessus/OpenVAS, identify unpatched CVE vulnerabilities, and execute remote exploits using the Metasploit Framework.",
      },
      {
        id: "m-3",
        moduleNumber: "MODULE 3",
        title: "OWASP Top 10 Web Application Pentesting",
        description:
          "Intercept and manipulate HTTP traffic with Burp Suite, exploit SQL Injections, Cross-Site Scripting (XSS), CSRF, SSRF, and broken access controls.",
      },
      {
        id: "m-4",
        moduleNumber: "MODULE 4",
        title: "Authentication Bypassing & Session Hijacking",
        description:
          "Test password reset logic flaws, bypass multi-factor authentication (MFA), exploit JWT token signature flaws, and execute session hijacking attacks.",
      },
      {
        id: "m-5",
        moduleNumber: "MODULE 5",
        title: "Privilege Escalation & Post-Exploitation",
        description:
          "Elevate user privileges in Linux (sudo misconfigurations, SUID binaries) and Windows environments (Unquoted service paths), dump password hashes, and establish persistence.",
      },
      {
        id: "m-6",
        moduleNumber: "MODULE 6",
        title: "Penetration Testing Reporting & CTF Security Challenge",
        description:
          "Draft executive and technical remediation vulnerability assessment reports, and compete in a real-world multi-target Capture The Flag (CTF) lab.",
      },
    ],
  },
];

