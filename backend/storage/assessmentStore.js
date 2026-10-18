const Assessment = require("../models/Assessment");
const { getDBStatus } = require("../config/db");

const INITIAL_SEED_ASSESSMENTS = [
  {
    title: "Computer Fundamentals Assessment",
    slug: "computer-fundamentals",
    category: "Computer Science",
    targetAudience: "Beginners & Students",
    description: "Evaluate your essential computer literacy, operating systems, file systems, internet protocols, and cybersecurity hygiene.",
    iconType: "laptop",
    durationMinutes: 10,
    passingPercentage: 60,
    attemptsCount: 1420,
    isActive: true,
    recommendedCourses: [
      {
        title: "Basic to Advanced Computer Diploma",
        slug: "computer-basics-advance",
        badge: "Beginner Friendly",
        description: "Master Windows OS, MS Office suite, internet security, and professional typing.",
        duration: "3 Months",
      },
      {
        title: "Full Stack Web Development",
        slug: "full-stack-web-development",
        badge: "High Placement",
        description: "Step into modern software development with JavaScript, React 19, and Node.js.",
        duration: "6 Months",
      },
    ],
    questions: [
      {
        id: "cf-1",
        question: "Which component is often considered the 'brain' of a computer system?",
        options: ["RAM (Random Access Memory)", "CPU (Central Processing Unit)", "Hard Disk Drive", "Motherboard Bus"],
        correctAnswer: 1,
        explanation: "The CPU executes program instructions and processes data, acting as the brain of the computer.",
        topic: "Hardware & Architecture",
      },
      {
        id: "cf-2",
        question: "What does 'RAM' stand for, and what is its primary characteristic?",
        options: [
          "Read Access Module, permanent non-volatile storage",
          "Random Access Memory, volatile high-speed temporary memory",
          "Rapid Action Motherboard, graphics computation unit",
          "Real Allocation Memory, cloud-synced storage",
        ],
        correctAnswer: 1,
        explanation: "RAM is volatile memory used by the operating system to hold data actively needed by running applications.",
        topic: "Memory Systems",
      },
      {
        id: "cf-3",
        question: "Which file extension is typically associated with executable programs in Windows?",
        options: [".docx", ".exe", ".png", ".xlsx"],
        correctAnswer: 1,
        explanation: ".exe files are binary executable programs recognized and executed by Windows OS.",
        topic: "Operating Systems",
      },
      {
        id: "cf-4",
        question: "What is the primary role of an Operating System (OS)?",
        options: [
          "To design vector illustrations and edit video clips",
          "To manage hardware resources and provide a platform for application software",
          "To manufacture physical semiconductor microchips",
          "To convert alternating current into direct current",
        ],
        correctAnswer: 1,
        explanation: "The operating system manages CPU scheduling, memory allocation, storage devices, and hardware abstraction.",
        topic: "Operating Systems",
      },
      {
        id: "cf-5",
        question: "What does 'HTTP' stand for in web communication?",
        options: [
          "HyperText Transfer Protocol",
          "High Tech Technical Program",
          "Host Terminal Translation Protocol",
          "Hyperlink Testing Transmission Process",
        ],
        correctAnswer: 0,
        explanation: "HyperText Transfer Protocol (HTTP) is the foundational application protocol used by the World Wide Web.",
        topic: "Networking & Internet",
      },
      {
        id: "cf-6",
        question: "Which of the following represents a strong security practice for personal passwords?",
        options: [
          "Using your birth date so you never forget it",
          "Using a combination of uppercase letters, lowercase letters, numbers, and symbols with 12+ characters",
          "Sharing your password with colleagues via unencrypted email",
          "Using the same password across all your banking and social media accounts",
        ],
        correctAnswer: 1,
        explanation: "Complex, high-entropy passphrases prevent brute-force attacks and credential stuffing exploits.",
        topic: "Cybersecurity Basics",
      },
      {
        id: "cf-7",
        question: "What is the primary function of a computer's BIOS or UEFI firmware?",
        options: [
          "To render 3D animation keyframes",
          "To initialize hardware during booting and load the operating system bootloader",
          "To compress high-resolution video files",
          "To monitor network bandwidth usage",
        ],
        correctAnswer: 1,
        explanation: "BIOS/UEFI conducts Power-On Self-Test (POST) and transfers control to the operating system bootloader.",
        topic: "Hardware & Architecture",
      },
      {
        id: "cf-8",
        question: "Which shortcut key is universally used to permanently delete a file in Windows without sending it to the Recycle Bin?",
        options: ["Ctrl + Delete", "Shift + Delete", "Alt + Delete", "Ctrl + Shift + D"],
        correctAnswer: 1,
        explanation: "Shift + Delete bypasses the Windows Recycle Bin and immediately marks the disk sectors as reusable.",
        topic: "Operating Systems",
      },
      {
        id: "cf-9",
        question: "What does 'IP' stand for in computer networking?",
        options: ["Internet Protocol", "Internal Program", "Instant Packet", "Interface Port"],
        correctAnswer: 0,
        explanation: "Internet Protocol (IP) provides the addressing and routing scheme that allows packets to navigate global networks.",
        topic: "Networking & Internet",
      },
      {
        id: "cf-10",
        question: "What is Phishing in cybersecurity?",
        options: [
          "A fast technique to benchmark hard drive read speeds",
          "A deceptive social engineering attempt to acquire sensitive credentials via counterfeit messages",
          "A modern programming paradigm for real-time multiplayer gaming",
          "An algorithm for cooling GPU heat sinks",
        ],
        correctAnswer: 1,
        explanation: "Phishing tricks individuals into revealing passwords, credit card numbers, or installing malware via fraudulent communications.",
        topic: "Cybersecurity Basics",
      },
    ],
  },
  {
    title: "Python Basics & Programming Quiz",
    slug: "python-basics-quiz",
    category: "Computer Science",
    targetAudience: "Programming Students & Developers",
    description: "Assess your mastery of Python syntax, data structures, conditional control flow, functions, and algorithmic thinking.",
    iconType: "code",
    durationMinutes: 10,
    passingPercentage: 60,
    attemptsCount: 2150,
    isActive: true,
    recommendedCourses: [
      {
        title: "Full Stack Web Development",
        slug: "full-stack-web-development",
        badge: "Industry Certified",
        description: "Master modern full-stack development with Node.js, Python, React, and MongoDB.",
        duration: "6 Months",
      },
      {
        title: "Python with Data Analytics & AI",
        slug: "python-data-analytics",
        badge: "Job Oriented",
        description: "Pandas, NumPy, automated web scrapers, and predictive machine learning models.",
        duration: "4 Months",
      },
    ],
    questions: [
      {
        id: "py-1",
        question: "Which of the following is an immutable built-in data type in Python?",
        options: ["List", "Dictionary", "Tuple", "Set"],
        correctAnswer: 2,
        explanation: "Tuples cannot be modified after instantiation, making them immutable in Python.",
        topic: "Data Structures",
      },
      {
        id: "py-2",
        question: "What is the output of the expression: type(5 / 2) in Python 3?",
        options: ["<class 'int'>", "<class 'float'>", "<class 'number'>", "<class 'double'>"],
        correctAnswer: 1,
        explanation: "In Python 3, standard division '/' always produces a float (2.5), whereas '//' performs floor integer division.",
        topic: "Operators & Types",
      },
      {
        id: "py-3",
        question: "How do you create a function in Python?",
        options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
        correctAnswer: 1,
        explanation: "The 'def' keyword is used to define functions in Python.",
        topic: "Functions & Scope",
      },
      {
        id: "py-4",
        question: "What will `[1, 2, 3] * 2` evaluate to in Python?",
        options: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "Error: unsupported operand", "[[1, 2, 3], [1, 2, 3]]"],
        correctAnswer: 1,
        explanation: "Multiplying a sequence (like a list or string) by an integer repeats its elements.",
        topic: "Data Structures",
      },
      {
        id: "py-5",
        question: "Which keyword is used to handle exceptions in Python?",
        options: ["try ... catch", "try ... except", "attempt ... rescue", "do ... error"],
        correctAnswer: 1,
        explanation: "Python utilizes `try ... except ... finally` blocks to catch and handle runtime exceptions.",
        topic: "Control Flow & Errors",
      },
      {
        id: "py-6",
        question: "What does the `len()` function return when passed a dictionary `{'a': 1, 'b': 2, 'c': 3}`?",
        options: ["6", "3", "2", "Error"],
        correctAnswer: 1,
        explanation: "len() counts the number of key-value pairs (keys) present in the dictionary.",
        topic: "Data Structures",
      },
      {
        id: "py-7",
        question: "What is the value of `x` after: `x = [i**2 for i in range(4)]`?",
        options: ["[1, 4, 9, 16]", "[0, 1, 4, 9]", "[0, 1, 2, 3]", "[0, 2, 4, 6]"],
        correctAnswer: 1,
        explanation: "range(4) produces 0, 1, 2, 3. Squaring each yields [0, 1, 4, 9].",
        topic: "List Comprehensions",
      },
      {
        id: "py-8",
        question: "In object-oriented Python, what does the first parameter of an instance method represent by convention?",
        options: ["this", "self", "cls", "super"],
        correctAnswer: 1,
        explanation: "'self' points to the active instance of the class upon which the method is called.",
        topic: "Object-Oriented Programming",
      },
      {
        id: "py-9",
        question: "Which built-in function can be used to iterate over a list while tracking index positions?",
        options: ["index()", "enumerate()", "track()", "range_index()"],
        correctAnswer: 1,
        explanation: "enumerate(iterable) returns tuples of (index, item), enabling clean counter loops.",
        topic: "Functions & Scope",
      },
      {
        id: "py-10",
        question: "What does the `pass` statement do in Python?",
        options: [
          "Terminates the program immediately",
          "Acts as a null statement or syntactical placeholder that does nothing",
          "Skips to the next iteration of a loop",
          "Returns true to the calling function",
        ],
        correctAnswer: 1,
        explanation: "`pass` is a no-op placeholder used when code is required syntactically but no execution is needed.",
        topic: "Control Flow & Errors",
      },
    ],
  },
  {
    title: "Excel & Tally Prime Skills Assessment",
    slug: "excel-tally-assessment",
    category: "Tally & Accounting",
    targetAudience: "Office Professionals & Accountants",
    description: "Verify your commercial calculation skills, VLOOKUP, Pivot Tables, GST reconciliation, ledger postings, and balance sheet principles.",
    iconType: "table",
    durationMinutes: 10,
    passingPercentage: 60,
    attemptsCount: 1890,
    isActive: true,
    recommendedCourses: [
      {
        title: "Tally Prime with GST & E-Way Bill",
        slug: "tally-prime-gst",
        badge: "Placement Certified",
        description: "Hands-on corporate accounting, balance sheets, inventory management, and tax filing.",
        duration: "3 Months",
      },
      {
        title: "Advanced Excel with Financial Dashboards",
        slug: "advanced-excel-analytics",
        badge: "Corporate Essential",
        description: "VLOOKUP, XLOOKUP, Nested IFs, Dynamic Pivot charts, and automated macros.",
        duration: "2 Months",
      },
    ],
    questions: [
      {
        id: "ta-1",
        question: "In Microsoft Excel, every formula must begin with which character?",
        options: ["@", "=", "#", "+"],
        correctAnswer: 1,
        explanation: "The equals sign '=' signals to Excel that the cell contents should be parsed as a formula.",
        topic: "Excel Formulas",
      },
      {
        id: "ta-2",
        question: "Which Excel function searches for a lookup value in the first column of a table and returns a value from another column?",
        options: ["HLOOKUP", "VLOOKUP", "COUNTIF", "CONCATENATE"],
        correctAnswer: 1,
        explanation: "VLOOKUP (Vertical Lookup) searches down the first column and retrieves corresponding row data.",
        topic: "Lookup & Reference",
      },
      {
        id: "ta-3",
        question: "What is the shortcut key in Tally Prime to view the Trial Balance report?",
        options: ["Alt + F1", "Gateway of Tally > D > T", "F12 > Configuration", "Ctrl + B"],
        correctAnswer: 1,
        explanation: "From the Gateway of Tally, typing D (Display More Reports) followed by T opens the Trial Balance.",
        topic: "Tally Navigation",
      },
      {
        id: "ta-4",
        question: "In Excel, what does the error '#DIV/0!' signify?",
        options: [
          "The column width is too narrow",
          "A formula attempts to divide a number by zero or an empty cell",
          "A referenced cell has been deleted",
          "Text format is incompatible with numeric operations",
        ],
        correctAnswer: 1,
        explanation: "#DIV/0! is thrown when a divisor evaluates to zero, which is mathematically undefined.",
        topic: "Excel Formulas",
      },
      {
        id: "ta-5",
        question: "What is the primary difference between CGST, SGST, and IGST in Indian GST accounting?",
        options: [
          "CGST and SGST apply to intrastate sales, whereas IGST applies to interstate supply",
          "IGST is only charged on agricultural products",
          "CGST is paid by consumers, while SGST is paid by manufacturers",
          "SGST applies exclusively to export transactions outside India",
        ],
        correctAnswer: 0,
        explanation: "For sales within the same state, tax is split equally between CGST and SGST; interstate sales attract IGST.",
        topic: "GST & Corporate Tax",
      },
      {
        id: "ta-6",
        question: "Which tool in Excel allows you to summarize, aggregate, and slice large transactional datasets interactively without writing complex code?",
        options: ["Data Validation", "Pivot Tables", "Conditional Formatting", "Goal Seek"],
        correctAnswer: 1,
        explanation: "Pivot Tables provide powerful drag-and-drop multidimensional data aggregation and crosstab reporting.",
        topic: "Data Analysis",
      },
      {
        id: "ta-7",
        question: "In Tally Prime, which voucher type is recorded when money is transferred from Cash account to Bank account?",
        options: ["Receipt Voucher (F6)", "Payment Voucher (F5)", "Contra Voucher (F4)", "Journal Voucher (F7)"],
        correctAnswer: 2,
        explanation: "Contra Voucher (F4) records internal fund transfers between cash and bank accounts.",
        topic: "Ledgers & Vouchers",
      },
      {
        id: "ta-8",
        question: "What is the modern replacement function for VLOOKUP in newer versions of Excel that can search both left and right?",
        options: ["FIND", "XLOOKUP", "SEARCH", "INDEX_DIRECT"],
        correctAnswer: 1,
        explanation: "XLOOKUP overcomes VLOOKUP's limitations by supporting bidirectional search, exact match defaults, and array returns.",
        topic: "Lookup & Reference",
      },
      {
        id: "ta-9",
        question: "Under the Golden Rules of Accounting, what is the fundamental rule for Real Accounts (e.g., Machinery, Cash)?",
        options: [
          "Debit all expenses and losses, Credit all incomes and gains",
          "Debit what comes in, Credit what goes out",
          "Debit the receiver, Credit the giver",
          "Debit owner equity, Credit liabilities",
        ],
        correctAnswer: 1,
        explanation: "Real accounts follow: 'Debit what comes in, Credit what goes out'.",
        topic: "Accounting Principles",
      },
      {
        id: "ta-10",
        question: "What happens when you freeze panes in Excel?",
        options: [
          "Prevents unauthorized users from editing the sheet",
          "Keeps specific rows or columns visible while scrolling through the rest of the worksheet",
          "Stops automatic recalculation of formulas",
          "Encrypts the workbook with password protection",
        ],
        correctAnswer: 1,
        explanation: "Freeze Panes locks headers in place so you can scroll through thousands of rows while retaining context.",
        topic: "Excel Productivity",
      },
    ],
  },
  {
    title: "AutoCAD & 3D Drafting Knowledge Test",
    slug: "autocad-3d-drafting",
    category: "AutoCAD",
    targetAudience: "Engineering, Architecture & CAD Students",
    description: "Assess your comprehension of orthogonal projections, coordinates, layers, 3D solids, jewelry cad tools, and precision drafting.",
    iconType: "compass",
    durationMinutes: 10,
    passingPercentage: 60,
    attemptsCount: 1210,
    isActive: true,
    recommendedCourses: [
      {
        title: "3D CAD Matrix & Rhino Jewelry Design",
        slug: "3d-cad-matrix-rhino",
        badge: "Jaipur Specialization",
        description: "Master gem pavé setting, ring shanks, render v-ray studio, and 3D printing STL export.",
        duration: "4 Months",
      },
      {
        title: "Civil & Architectural 2D/3D AutoCAD",
        slug: "autocad-civil-architectural",
        badge: "Industry Certified",
        description: "Blueprint floor plans, structural sections, elevations, and BIM integration.",
        duration: "3 Months",
      },
    ],
    questions: [
      {
        id: "cad-1",
        question: "What is the standard command line shortcut to initiate the Line tool in AutoCAD?",
        options: ["LN", "L", "LINE_START", "CTRL + L"],
        correctAnswer: 1,
        explanation: "Typing 'L' and hitting Enter activates the Line drawing command in AutoCAD.",
        topic: "Drafting Commands",
      },
      {
        id: "cad-2",
        question: "Which function key toggles 'Ortho Mode' on or off to restrict cursor movement to horizontal and vertical axes?",
        options: ["F3", "F8", "F9", "F12"],
        correctAnswer: 1,
        explanation: "F8 toggles Ortho Mode, ensuring lines are drawn strictly perpendicular along 90-degree angles.",
        topic: "Interface & Controls",
      },
      {
        id: "cad-3",
        question: "In CAD coordinate systems, what does the '@' symbol represent in '@50,25'?",
        options: [
          "Absolute coordinate from origin (0,0)",
          "Relative coordinate measured from the last specified point",
          "Polar angle in degrees",
          "Z-axis elevation height",
        ],
        correctAnswer: 1,
        explanation: "The '@' prefix indicates relative coordinates calculated from the current cursor vertex.",
        topic: "Coordinate Systems",
      },
      {
        id: "cad-4",
        question: "What is the primary architectural purpose of utilizing Layers in CAD software?",
        options: [
          "To speed up CPU clock frequency",
          "To organize drawing elements by object type, color, linetype, and control visibility/plotting",
          "To export drawings directly to MP4 format",
          "To automatically correct misspelled annotations",
        ],
        correctAnswer: 1,
        explanation: "Layers isolate distinct elements (walls, plumbing, dimensions, electrical) for modular drafting and plotting.",
        topic: "Layer Management",
      },
      {
        id: "cad-5",
        question: "Which command in AutoCAD smoothly rounds off the sharp corner between two intersecting lines with a defined radius?",
        options: ["CHAMFER", "FILLET", "OFFSET", "TRIM"],
        correctAnswer: 1,
        explanation: "FILLET connects two objects with an arc of specified radius. CHAMFER creates a beveled straight cut.",
        topic: "Modification Tools",
      },
      {
        id: "cad-6",
        question: "In 3D CAD modeling, which operation creates a 3D solid by sweeping a 2D closed profile along a straight vector or path?",
        options: ["EXTRUDE", "REVOLVE", "LOFT", "SHELL"],
        correctAnswer: 0,
        explanation: "EXTRUDE extends the boundary of a 2D planar shape along the Z-axis to create a 3D solid or surface.",
        topic: "3D Modeling",
      },
      {
        id: "cad-7",
        question: "In jewelry CAD design (Matrix / Rhino), what is a 'Shank'?",
        options: [
          "The circular band of a ring that encircles the wearer's finger",
          "The diamond prong setting alone",
          "The weight of 24k gold",
          "The final polished texture file",
        ],
        correctAnswer: 0,
        explanation: "The shank is the structural band of a ring that rests around the finger.",
        topic: "Jewelry CAD Matrix",
      },
      {
        id: "cad-8",
        question: "Which file format is universally exported from 3D CAD programs for direct cam manufacturing and 3D wax printing?",
        options: [".dwg", ".stl", ".psd", ".xlsx"],
        correctAnswer: 1,
        explanation: ".STL (Stereolithography) decomposes 3D surfaces into triangular facet meshes readable by 3D printers and CAM slicers.",
        topic: "Manufacturing & 3D Printing",
      },
      {
        id: "cad-9",
        question: "What is the function of the 'OFFSET' command?",
        options: [
          "Deletes intersecting lines",
          "Creates concentric circles, parallel lines, and parallel curves at a specified distance",
          "Changes object scale uniformly by a factor",
          "Rotates objects around a base point",
        ],
        correctAnswer: 1,
        explanation: "OFFSET generates parallel or concentric geometries offset by an exact measurement.",
        topic: "Modification Tools",
      },
      {
        id: "cad-10",
        question: "What does 'OSNAP' (Object Snap) allow you to do during CAD drafting?",
        options: [
          "Quickly save a snapshot of the workspace to social media",
          "Snap precisely to geometric locations on objects such as endpoints, midpoints, and center points",
          "Convert 2D lines into high-resolution JPG images",
          "Automatically adjust layer opacity",
        ],
        correctAnswer: 1,
        explanation: "Object Snap guarantees mathematical accuracy by locking the cursor onto precise geometric vertices.",
        topic: "Drafting Precision",
      },
    ],
  },
  {
    title: "Graphic Design Fundamentals Quiz",
    slug: "graphic-design-quiz",
    category: "Graphic Design",
    targetAudience: "Creative Students & Aspiring Designers",
    description: "Test your artistic eye across color theory, typography, vector branding, raster image manipulation, and UI layout rules.",
    iconType: "palette",
    durationMinutes: 10,
    passingPercentage: 60,
    attemptsCount: 1740,
    isActive: true,
    recommendedCourses: [
      {
        title: "Graphic Design & Brand Identity Mastery",
        slug: "graphic-design-branding",
        badge: "Studio Certified",
        description: "Photoshop, Illustrator, CorelDraw, corporate packaging, typography, and portfolio creation.",
        duration: "4 Months",
      },
      {
        title: "UI/UX Design & Design Systems",
        slug: "ui-ux-design-systems",
        badge: "High Demand",
        description: "Figma wireframing, high-fidelity prototypes, user research, and mobile design guidelines.",
        duration: "4 Months",
      },
    ],
    questions: [
      {
        id: "gd-1",
        question: "What is the fundamental difference between Raster and Vector graphics?",
        options: [
          "Raster graphics are made of mathematical vectors; Vectors are made of pixels",
          "Raster graphics are pixel-based and lose quality when scaled; Vector graphics use mathematical paths and scale infinitely without quality loss",
          "Raster is only used for audio files; Vector is used for print posters",
          "There is no difference in modern design suites",
        ],
        correctAnswer: 1,
        explanation: "Vector graphics (SVG, AI) maintain razor-sharp clarity at any resolution, whereas raster images (JPEG, PNG) pixelate when enlarged.",
        topic: "Vector vs Raster",
      },
      {
        id: "gd-2",
        question: "Which color model is utilized for professional physical offset and digital paper printing?",
        options: ["RGB (Red, Green, Blue)", "CMYK (Cyan, Magenta, Yellow, Key/Black)", "HEX (#FFFFFF)", "HSL (Hue, Saturation, Lightness)"],
        correctAnswer: 1,
        explanation: "CMYK is a subtractive ink mixing process used by commercial printing presses.",
        topic: "Color Theory",
      },
      {
        id: "gd-3",
        question: "What is 'Kerning' in typography?",
        options: [
          "The vertical space between baseline lines of text",
          "The adjustment of space between individual pairs of adjacent characters",
          "The font weight or thickness of the stroke",
          "The alignment of text to the right margin",
        ],
        correctAnswer: 1,
        explanation: "Kerning fine-tunes proportional horizontal spacing between two specific glyphs to achieve visual harmony.",
        topic: "Typography",
      },
      {
        id: "gd-4",
        question: "Which primary Adobe software is industry standard for creating scalable vector logos and illustrations?",
        options: ["Adobe Premiere Pro", "Adobe Illustrator", "Adobe Lightroom", "Adobe Audition"],
        correctAnswer: 1,
        explanation: "Adobe Illustrator is the premier vector authoring environment for identity design, vector artwork, and iconography.",
        topic: "Design Tools",
      },
      {
        id: "gd-5",
        question: "What is 'White Space' (Negative Space) in graphic design?",
        options: [
          "Wasted blank canvas area that must be filled with clip art",
          "Unmarked space surrounding and between design elements that provides breathing room and visual hierarchy",
          "A special Pantone white ink coating used on luxury paper",
          "A canvas rendering glitch when files fail to load",
        ],
        correctAnswer: 1,
        explanation: "Negative space is an essential compositional tool that prevents clutter, improves scannability, and guides the eye.",
        topic: "Composition & Hierarchy",
      },
      {
        id: "gd-6",
        question: "Which image file format supports 24-bit transparent backgrounds and lossless compression on the web?",
        options: [".jpg", ".png", ".bmp", ".gif"],
        correctAnswer: 1,
        explanation: "PNG supports 8-bit alpha channel transparency, making it ideal for web logos and overlaid graphics.",
        topic: "Vector vs Raster",
      },
      {
        id: "gd-7",
        question: "In Photoshop, what is the safest workflow method to edit images without destroying original pixel data?",
        options: [
          "Applying destructive eraser and direct brightness adjustments",
          "Utilizing Adjustment Layers, Layer Masks, and Smart Objects",
          "Saving over the original file after every brush stroke",
          "Flattening all layers immediately",
        ],
        correctAnswer: 1,
        explanation: "Non-destructive workflows preserve raw pixels, allowing infinite adjustment and reversal.",
        topic: "Design Tools",
      },
      {
        id: "gd-8",
        question: "What are 'Complementary Colors' on the traditional artist color wheel?",
        options: [
          "Colors that sit adjacent next to each other",
          "Colors positioned directly opposite each other on the color wheel (e.g., Blue and Orange)",
          "Monochromatic variations of black and white",
          "Warm colors grouped together",
        ],
        correctAnswer: 1,
        explanation: "Complementary colors sit opposite each other and create high visual contrast when juxtaposed.",
        topic: "Color Theory",
      },
      {
        id: "gd-9",
        question: "What is 'Leading' in typography?",
        options: [
          "The leader paragraph at the top of a magazine",
          "The vertical distance between consecutive baselines of text lines",
          "The first letter of a brand name",
          "The color used for headline text",
        ],
        correctAnswer: 1,
        explanation: "Leading (pronounced 'ledding') defines the vertical line-height spacing in a block of text.",
        topic: "Typography",
      },
      {
        id: "gd-10",
        question: "What is the 'Rule of Thirds' in visual composition?",
        options: [
          "A guideline dividing an image into nine equal parts with two horizontal and two vertical lines, placing points of interest at intersections",
          "Using only three colors per poster design",
          "Limiting designs to three words maximum",
          "Printing brochures in sets of three",
        ],
        correctAnswer: 0,
        explanation: "Placing focal elements along the 3x3 grid intersections generates balanced, dynamic compositions.",
        topic: "Composition & Hierarchy",
      },
    ],
  },
  {
    title: "Digital Marketing Strategy Quiz",
    slug: "digital-marketing-quiz",
    category: "Digital Marketing",
    targetAudience: "Marketing Learners & Entrepreneurs",
    description: "Measure your digital acumen in Search Engine Optimization (SEO), PPC Google Ads, CTR metrics, Social Media ROI, and Lead Funnels.",
    iconType: "trending-up",
    durationMinutes: 10,
    passingPercentage: 60,
    attemptsCount: 2310,
    isActive: true,
    recommendedCourses: [
      {
        title: "Full Stack Digital Marketing & Performance Ads",
        slug: "digital-marketing-performance",
        badge: "Agency Certified",
        description: "SEO, Google Search Ads, Meta Ads Manager, E-commerce ROAS, and conversion funnels.",
        duration: "4 Months",
      },
      {
        title: "Full Stack Web Development",
        slug: "full-stack-web-development",
        badge: "Career Booster",
        description: "Understand the code powering web pages, core web vitals, and technical SEO architecture.",
        duration: "6 Months",
      },
    ],
    questions: [
      {
        id: "dm-1",
        question: "What does 'SEO' stand for, and what is its primary objective?",
        options: [
          "Social Engagement Operations, buying Instagram followers",
          "Search Engine Optimization, increasing organic traffic from search engine result pages",
          "Server Electronic Organization, hosting web files",
          "Site Encryption Order, installing SSL certificates",
        ],
        correctAnswer: 1,
        explanation: "SEO optimizes content, technical structure, and authority to rank organically on Google and other engines.",
        topic: "SEO Fundamentals",
      },
      {
        id: "dm-2",
        question: "What does 'CTR' represent in digital advertising campaigns?",
        options: [
          "Cost To Return",
          "Click-Through Rate (Clicks divided by Impressions multiplied by 100)",
          "Customer Target Reach",
          "Centralized Traffic Router",
        ],
        correctAnswer: 1,
        explanation: "CTR measures the percentage of users who clicked an ad after viewing it (Clicks / Impressions * 100).",
        topic: "Metrics & Analytics",
      },
      {
        id: "dm-3",
        question: "What is the recommended ideal length for a webpage's Meta Description for Google search snippets?",
        options: ["Under 20 characters", "Around 140 to 160 characters", "Over 500 characters", "Exactly 1,000 words"],
        correctAnswer: 1,
        explanation: "Search engines typically truncate snippets beyond 155-160 characters on desktop and mobile displays.",
        topic: "On-Page SEO",
      },
      {
        id: "dm-4",
        question: "In Google Ads, what is 'Quality Score'?",
        options: [
          "A rating of how much credit limit is left on your billing card",
          "A diagnostic metric measuring the relevance of your ad, keywords, and landing page experience",
          "The speed of your local office broadband internet",
          "The number of characters inside your headline copy",
        ],
        correctAnswer: 1,
        explanation: "Quality Score determines your ad rank and actual cost-per-click based on relevance and user experience.",
        topic: "PPC & Google Ads",
      },
      {
        id: "dm-5",
        question: "Which of the following describes 'Remarketing' or 'Retargeting'?",
        options: [
          "Re-branding a company with a new logo",
          "Serving tailored ads to visitors who previously engaged with your website or mobile app",
          "Sending physical postal letters to former customers",
          "Deleting inactive email subscribers",
        ],
        correctAnswer: 1,
        explanation: "Retargeting re-engages prospective buyers who abandoned a cart or browsed products without converting.",
        topic: "Performance Marketing",
      },
      {
        id: "dm-6",
        question: "What is an 'Organic' search result?",
        options: [
          "A paid sponsored placement at the very top of Google",
          "A non-paid ranking achieved purely through relevance, content authority, and algorithmic indexation",
          "A blog post discussing natural agriculture",
          "An email newsletter sent via Gmail",
        ],
        correctAnswer: 1,
        explanation: "Organic rankings cannot be bought; they reflect search algorithm assessments of quality and relevance.",
        topic: "SEO Fundamentals",
      },
      {
        id: "dm-7",
        question: "What does 'CPC' stand for in paid search marketing?",
        options: ["Cost Per Click", "Customer Profile Code", "Clicks Per Conversion", "Content Production Cost"],
        correctAnswer: 0,
        explanation: "Cost Per Click (CPC) is the financial fee an advertiser incurs every time a user clicks their ad.",
        topic: "PPC & Google Ads",
      },
      {
        id: "dm-8",
        question: "What is a 'Call to Action' (CTA) in marketing copy?",
        options: [
          "A telephone call from an angry customer",
          "A clear prompt that encourages visitors to take immediate action (e.g., 'Enroll Now', 'Get Started')",
          "A disclaimer at the footer of legal contracts",
          "An internal team standup reminder",
        ],
        correctAnswer: 1,
        explanation: "CTAs guide visitors toward the desired conversion step in a marketing funnel.",
        topic: "Conversion Optimization",
      },
      {
        id: "dm-9",
        question: "What is Google Analytics 4 (GA4) primarily used for?",
        options: [
          "Drawing vector UI logos",
          "Tracking website user events, session journeys, conversions, and traffic origins",
          "Sending bulk WhatsApp spam messages",
          "Writing server-side backend database queries",
        ],
        correctAnswer: 1,
        explanation: "GA4 captures user engagement across web and apps to analyze conversion channels and visitor behavior.",
        topic: "Metrics & Analytics",
      },
      {
        id: "dm-10",
        question: "What is 'A/B Testing' (Split Testing) in digital marketing?",
        options: [
          "Testing a keyboard's A and B keys for typing speed",
          "Comparing two variations of a webpage or ad creative against each other to see which performs better",
          "Translating copy into two foreign languages",
          "Running two marketing campaigns in two different decades",
        ],
        correctAnswer: 1,
        explanation: "A/B testing splits traffic evenly between Version A and Version B to isolate variables that boost conversions.",
        topic: "Conversion Optimization",
      },
    ],
  },
];

let inMemoryAssessments = JSON.parse(JSON.stringify(INITIAL_SEED_ASSESSMENTS));

class AssessmentStore {
  static async getAll({ category, search, activeOnly = false } = {}) {
    if (getDBStatus()) {
      const filter = {};
      if (activeOnly) {
        filter.isActive = true;
      }
      if (category && category !== "all") {
        filter.category = new RegExp(`^${category}$`, "i");
      }
      if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [
          { title: regex },
          { description: regex },
          { category: regex },
          { targetAudience: regex },
        ];
      }

      const assessments = await Assessment.find(filter)
        .select("-questions.correctAnswer") // Hide correct answers for public listing
        .sort({ attemptsCount: -1, createdAt: -1 })
        .lean();

      return assessments.map((a) => ({ ...a, id: a._id.toString() }));
    }

    // In-memory fallback
    let list = [...inMemoryAssessments];
    if (activeOnly) {
      list = list.filter((a) => a.isActive !== false);
    }
    if (category && category !== "all") {
      list = list.filter(
        (a) => a.category && a.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q)
      );
    }

    // Clean sensitive answer keys for public
    return list.map((a) => {
      const copy = { ...a };
      if (Array.isArray(copy.questions)) {
        copy.questions = copy.questions.map((q) => {
          const { correctAnswer, ...rest } = q;
          return rest;
        });
      }
      return copy;
    });
  }

  static async getAllForAdmin() {
    if (getDBStatus()) {
      const list = await Assessment.find().sort({ createdAt: -1 }).lean();
      return list.map((a) => ({ ...a, id: a._id.toString() }));
    }
    return inMemoryAssessments;
  }

  static async getBySlugOrId(slugOrId, includeAnswers = false) {
    if (!slugOrId) return null;

    if (getDBStatus()) {
      let query = { slug: slugOrId.toLowerCase() };
      if (/^[0-9a-fA-F]{24}$/.test(slugOrId)) {
        query = { _id: slugOrId };
      }

      let assessmentQuery = Assessment.findOne(query);
      if (!includeAnswers) {
        assessmentQuery = assessmentQuery.select("-questions.correctAnswer");
      }

      const assessment = await assessmentQuery.lean();
      if (assessment) {
        return { ...assessment, id: assessment._id.toString() };
      }
      return null;
    }

    // In-memory fallback
    const found = inMemoryAssessments.find(
      (a) =>
        a.slug.toLowerCase() === slugOrId.toLowerCase() ||
        a.id === slugOrId ||
        a._id === slugOrId
    );

    if (!found) return null;

    if (includeAnswers) {
      return JSON.parse(JSON.stringify(found));
    }

    // Hide answers
    const copy = JSON.parse(JSON.stringify(found));
    if (Array.isArray(copy.questions)) {
      copy.questions = copy.questions.map((q) => {
        delete q.correctAnswer;
        return q;
      });
    }
    return copy;
  }

  static async submitAssessment(slugOrId, userAnswers = {}) {
    // We need the true assessment with correct answers
    let fullAssessment = null;

    if (getDBStatus()) {
      let query = { slug: slugOrId.toLowerCase() };
      if (/^[0-9a-fA-F]{24}$/.test(slugOrId)) {
        query = { _id: slugOrId };
      }
      fullAssessment = await Assessment.findOne(query).lean();
      if (fullAssessment) {
        // Increment attempts count
        await Assessment.findByIdAndUpdate(fullAssessment._id, {
          $inc: { attemptsCount: 1 },
        });
      }
    } else {
      fullAssessment = inMemoryAssessments.find(
        (a) =>
          a.slug.toLowerCase() === slugOrId.toLowerCase() ||
          a.id === slugOrId ||
          a._id === slugOrId
      );
      if (fullAssessment) {
        fullAssessment.attemptsCount = (fullAssessment.attemptsCount || 0) + 1;
      }
    }

    if (!fullAssessment || !Array.isArray(fullAssessment.questions)) {
      throw new Error("Assessment not found or has no questions.");
    }

    const totalQuestions = fullAssessment.questions.length;
    let score = 0;
    const topicStats = {};
    const questionReview = [];

    fullAssessment.questions.forEach((q, idx) => {
      const qKey = q.id || `q-${idx}`;
      const userSelected = userAnswers[qKey];
      const isCorrect = userSelected !== undefined && Number(userSelected) === Number(q.correctAnswer);

      if (isCorrect) score += 1;

      // Group by topic for topic-wise breakdown
      const topic = q.topic || "General";
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += 1;
      if (isCorrect) {
        topicStats[topic].correct += 1;
      }

      questionReview.push({
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswer: userSelected !== undefined ? Number(userSelected) : null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic,
      });
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= (fullAssessment.passingPercentage || 60);

    // Calculate topic performance breakdown
    const topicBreakdown = Object.entries(topicStats).map(([topic, stat]) => {
      const pct = Math.round((stat.correct / stat.total) * 100);
      let proficiency = "Beginner";
      if (pct >= 80) proficiency = "Mastery";
      else if (pct >= 60) proficiency = "Proficient";
      else if (pct >= 40) proficiency = "Developing";

      return {
        topic,
        correct: stat.correct,
        total: stat.total,
        percentage: pct,
        proficiency,
      };
    });

    // Extract weak areas (topics under 65%)
    const areasToImprove = topicBreakdown
      .filter((t) => t.percentage < 65)
      .map((t) => ({
        topic: t.topic,
        suggestion: `Strengthen core concepts in ${t.topic}. Hands-on practice and guided mentorship are recommended.`,
      }));

    return {
      assessmentTitle: fullAssessment.title,
      slug: fullAssessment.slug,
      category: fullAssessment.category,
      score,
      totalQuestions,
      percentage,
      passed,
      topicBreakdown,
      areasToImprove,
      recommendedCourses: fullAssessment.recommendedCourses || [],
      questionReview,
    };
  }

  static async create(data) {
    const slug = (data.slug || data.title || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    const newAssessmentData = {
      title: data.title.trim(),
      slug: slug || `assessment-${Date.now()}`,
      category: data.category || "General",
      targetAudience: data.targetAudience || "All Learners",
      description: data.description || "",
      iconType: data.iconType || "code",
      durationMinutes: Number(data.durationMinutes) || 10,
      passingPercentage: Number(data.passingPercentage) || 60,
      questions: Array.isArray(data.questions) ? data.questions : [],
      recommendedCourses: Array.isArray(data.recommendedCourses) ? data.recommendedCourses : [],
      isActive: data.isActive !== false,
      attemptsCount: 0,
    };

    if (getDBStatus()) {
      const created = await Assessment.create(newAssessmentData);
      return { ...created.toObject(), id: created._id.toString() };
    }

    // In-memory fallback
    const id = `asm_${Date.now()}`;
    const item = { ...newAssessmentData, _id: id, id, createdAt: new Date().toISOString() };
    inMemoryAssessments.unshift(item);
    return item;
  }

  static async update(id, data) {
    if (getDBStatus()) {
      let query = { slug: id };
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        query = { _id: id };
      }

      const updated = await Assessment.findOneAndUpdate(query, data, {
        new: true,
        runValidators: true,
      }).lean();

      if (updated) {
        return { ...updated, id: updated._id.toString() };
      }
      return null;
    }

    const idx = inMemoryAssessments.findIndex(
      (a) => a.id === id || a._id === id || a.slug === id
    );
    if (idx !== -1) {
      inMemoryAssessments[idx] = {
        ...inMemoryAssessments[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return inMemoryAssessments[idx];
    }
    return null;
  }

  static async delete(id) {
    if (getDBStatus()) {
      let query = { slug: id };
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        query = { _id: id };
      }
      const deleted = await Assessment.findOneAndDelete(query).lean();
      return !!deleted;
    }

    const initLen = inMemoryAssessments.length;
    inMemoryAssessments = inMemoryAssessments.filter(
      (a) => a.id !== id && a._id !== id && a.slug !== id
    );
    return inMemoryAssessments.length < initLen;
  }

  static async getStats() {
    if (getDBStatus()) {
      const [total, active, attemptsData, categories] = await Promise.all([
        Assessment.countDocuments(),
        Assessment.countDocuments({ isActive: true }),
        Assessment.aggregate([
          { $group: { _id: null, totalAttempts: { $sum: "$attemptsCount" } } },
        ]),
        Assessment.distinct("category"),
      ]);

      return {
        total,
        active,
        totalAttempts: attemptsData[0]?.totalAttempts || 0,
        categories,
      };
    }

    const total = inMemoryAssessments.length;
    const active = inMemoryAssessments.filter((a) => a.isActive !== false).length;
    const totalAttempts = inMemoryAssessments.reduce(
      (sum, a) => sum + (a.attemptsCount || 0),
      0
    );
    const categories = Array.from(
      new Set(inMemoryAssessments.map((a) => a.category).filter(Boolean))
    );

    return { total, active, totalAttempts, categories };
  }
}

module.exports = AssessmentStore;
