const Media = require("../models/Media");
const { getDBStatus } = require("../config/db");

// Predefined existing section slots for the 5 supported pages:
// 1. About Us (about)
// 2. Franchise (franchise)
// 3. Jobs and Placement (placements)
// 4. Campus Memories (memories)
// 5. Student Reviews (reviews)

const INITIAL_SECTION_SLOTS = [
  // ==========================================
  // 1. ABOUT US (about)
  // ==========================================
  {
    slotKey: "about_team_photo",
    page: "about",
    section: "team",
    type: "image",
    title: "Executive Leadership & Faculty Team Photo",
    description: "Wide team showcase featured in the interactive scroll-expand section of About Us.",
    url: "/src/assets/about_team_photo.webp",
    defaultUrl: "/src/assets/about_team_photo.webp",
    thumbnailUrl: "/src/assets/about_team_photo.webp",
    isDefault: true,
  },
  {
    slotKey: "about_showcase_reel",
    page: "about",
    section: "showcase",
    type: "video",
    title: "Third Eye Brand Showcase Video Reel",
    description: "Cinematic full-width showreel featured in the About Us video section.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },

  // ==========================================
  // 2. FRANCHISE (franchise)
  // Two sections only: 1. founder (1 picture), 2. branches (10 pictures)
  // ==========================================
  {
    slotKey: "franchise_founder",
    page: "franchise",
    section: "founder",
    type: "image",
    title: "Founder Portrait (Mr. M.L. Chaudhary)",
    description: "Hero showcase portrait on the right side of the franchise page with Founder credential tag.",
    url: "/src/assets/leadership/ml_chaudhary.png",
    defaultUrl: "/src/assets/leadership/ml_chaudhary.png",
    thumbnailUrl: "/src/assets/leadership/ml_chaudhary.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_1",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 01 — Mansarovar (Madhyam Marg)",
    description: "Flagship Mansarovar branch photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_panoramic.png",
    defaultUrl: "/src/assets/classroom_panoramic.png",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_2",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 02 — Sodala (New Sanganer Road)",
    description: "Sodala center IT & design lab photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_left.webp",
    defaultUrl: "/src/assets/classroom_slice_left.webp",
    thumbnailUrl: "/src/assets/classroom_slice_left.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_3",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 03 — Pratap Nagar (Kumbha Marg)",
    description: "Pratap Nagar center lab photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_center.webp",
    defaultUrl: "/src/assets/classroom_slice_center.webp",
    thumbnailUrl: "/src/assets/classroom_slice_center.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_4",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 04 — Sanganer (Tonk Road)",
    description: "Sanganer center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_right.webp",
    defaultUrl: "/src/assets/classroom_slice_right.webp",
    thumbnailUrl: "/src/assets/classroom_slice_right.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_5",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 05 — Vaishali Nagar (Amrapali Circle)",
    description: "Vaishali Nagar center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_panoramic.png",
    defaultUrl: "/src/assets/classroom_panoramic.png",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_6",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 06 — Jagatpura (Mahal Road)",
    description: "Jagatpura center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_left.webp",
    defaultUrl: "/src/assets/classroom_slice_left.webp",
    thumbnailUrl: "/src/assets/classroom_slice_left.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_7",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 07 — Vidhyadhar Nagar (Sector 2)",
    description: "Vidhyadhar Nagar center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_center.webp",
    defaultUrl: "/src/assets/classroom_slice_center.webp",
    thumbnailUrl: "/src/assets/classroom_slice_center.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_8",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 08 — Raja Park (Commercial Complex)",
    description: "Raja Park center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_right.webp",
    defaultUrl: "/src/assets/classroom_slice_right.webp",
    thumbnailUrl: "/src/assets/classroom_slice_right.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_9",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 09 — Gopalpura (Education Coaching Belt)",
    description: "Gopalpura center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_panoramic.png",
    defaultUrl: "/src/assets/classroom_panoramic.png",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_branch_10",
    page: "franchise",
    section: "branches",
    type: "image",
    title: "Branch 10 — Jhotwara (Kalwar Road Junction)",
    description: "Jhotwara center campus photo featured in the 10 Running Centers 3D carousel.",
    url: "/src/assets/classroom_slice_left.webp",
    defaultUrl: "/src/assets/classroom_slice_left.webp",
    thumbnailUrl: "/src/assets/classroom_slice_left.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_reel_1",
    page: "franchise",
    section: "instagram_reels",
    type: "video",
    title: "Instagram Reel 1 — Campus Life & Student Energy",
    description: "Instagram reel #1 in the infinite scrolling middle-playing video carousel.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_reel_2",
    page: "franchise",
    section: "instagram_reels",
    type: "video",
    title: "Instagram Reel 2 — Practical Lab & Student Projects",
    description: "Instagram reel #2 in the infinite scrolling middle-playing video carousel.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/classroom_slice_left.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_reel_3",
    page: "franchise",
    section: "instagram_reels",
    type: "video",
    title: "Instagram Reel 3 — Placement Celebrations & Offer Letters",
    description: "Instagram reel #3 in the infinite scrolling middle-playing video carousel.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/classroom_slice_center.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_reel_4",
    page: "franchise",
    section: "instagram_reels",
    type: "video",
    title: "Instagram Reel 4 — Masterclass & Industry Workshop",
    description: "Instagram reel #4 in the infinite scrolling middle-playing video carousel.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/classroom_slice_right.webp",
    isDefault: true,
  },
  {
    slotKey: "franchise_reel_5",
    page: "franchise",
    section: "instagram_reels",
    type: "video",
    title: "Instagram Reel 5 — Center Infrastructure & Tech Setup",
    description: "Instagram reel #5 in the infinite scrolling middle-playing video carousel.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_reel_6",
    page: "franchise",
    section: "instagram_reels",
    type: "video",
    title: "Instagram Reel 6 — Alumni Testimonials & Founder Vision",
    description: "Instagram reel #6 in the infinite scrolling middle-playing video carousel.",
    url: "/assets/webreel.mp4",
    defaultUrl: "/assets/webreel.mp4",
    thumbnailUrl: "/src/assets/team_photo.webp",
    isDefault: true,
  },

  // ==========================================
  // 3. JOBS AND PLACEMENT (placements)
  // ==========================================
  {
    slotKey: "placement_student_1",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #1 — Kirti Khandelwal (Digital Gyan)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_1.jpg",
    defaultUrl: "/src/assets/students/student_1.jpg",
    thumbnailUrl: "/src/assets/students/student_1.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_2",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #2 — Kushal Avesthi (Beyond Designer)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_2.jpg",
    defaultUrl: "/src/assets/students/student_2.jpg",
    thumbnailUrl: "/src/assets/students/student_2.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_3",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #3 — Shubh Sharma (Red Apple Media)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_3.jpg",
    defaultUrl: "/src/assets/students/student_3.jpg",
    thumbnailUrl: "/src/assets/students/student_3.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_4",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #4 — Nisha Nama (Vasco Teleradiology)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_4.jpg",
    defaultUrl: "/src/assets/students/student_4.jpg",
    thumbnailUrl: "/src/assets/students/student_4.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_5",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #5 — Aman Pareek (Technovate Labs)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_5.jpg",
    defaultUrl: "/src/assets/students/student_5.jpg",
    thumbnailUrl: "/src/assets/students/student_5.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_6",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #6 — Priya Sharma (PixelCraft Studios)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_6.jpg",
    defaultUrl: "/src/assets/students/student_6.jpg",
    thumbnailUrl: "/src/assets/students/student_6.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_7",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #7 — Rohan Saini (Apex Data Systems)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_7.jpg",
    defaultUrl: "/src/assets/students/student_7.jpg",
    thumbnailUrl: "/src/assets/students/student_7.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_8",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #8 — Simran Kaur (Infotech Global)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_8.jpg",
    defaultUrl: "/src/assets/students/student_8.jpg",
    thumbnailUrl: "/src/assets/students/student_8.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_9",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #9 — Rahul Verma (CyberTech Systems)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_9.jpg",
    defaultUrl: "/src/assets/students/student_9.jpg",
    thumbnailUrl: "/src/assets/students/student_9.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_10",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #10 — Anjali Gupta (WebVerse Media)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_10.jpg",
    defaultUrl: "/src/assets/students/student_10.jpg",
    thumbnailUrl: "/src/assets/students/student_10.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_11",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #11 — Vikas Meena (CloudOps Global)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_11.jpg",
    defaultUrl: "/src/assets/students/student_11.jpg",
    thumbnailUrl: "/src/assets/students/student_11.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_student_12",
    page: "placements",
    section: "driftwall",
    type: "image",
    title: "Placed Student #12 — Pooja Choudhary (NextGen Studio)",
    description: "Student featured on the Placements DriftWall of Fame.",
    url: "/src/assets/students/student_12.jpg",
    defaultUrl: "/src/assets/students/student_12.jpg",
    thumbnailUrl: "/src/assets/students/student_12.jpg",
    isDefault: true,
  },
  {
    slotKey: "placement_celebration_1",
    page: "placements",
    section: "celebration",
    type: "image",
    title: "Celebration 01 — Annual Placement & Excellence Award Ceremony",
    description: "Grand felicitation ceremony of placed students receiving corporate selection mementos and offer letters.",
    url: "/src/assets/award_ceremony_group.webp",
    defaultUrl: "/src/assets/award_ceremony_group.webp",
    thumbnailUrl: "/src/assets/award_ceremony_group.webp",
    isDefault: true,
  },
  {
    slotKey: "placement_celebration_2",
    page: "placements",
    section: "celebration",
    type: "image",
    title: "Celebration 02 — Founder Felicitation & Outstanding Achiever Honour",
    description: "Founder honouring top placed candidates with mementos and recognition certificates.",
    url: "/src/assets/award_suumit_sharma.webp",
    defaultUrl: "/src/assets/award_suumit_sharma.webp",
    thumbnailUrl: "/src/assets/award_suumit_sharma.webp",
    isDefault: true,
  },
  {
    slotKey: "placement_celebration_3",
    page: "placements",
    section: "celebration",
    type: "image",
    title: "Celebration 03 — Corporate Selection & Academic Excellence Award",
    description: "Felicitation of meritorious students for stellar corporate interview selections.",
    url: "/src/assets/award_preeti_sharma.webp",
    defaultUrl: "/src/assets/award_preeti_sharma.webp",
    thumbnailUrl: "/src/assets/award_preeti_sharma.webp",
    isDefault: true,
  },
  {
    slotKey: "placement_celebration_4",
    page: "placements",
    section: "celebration",
    type: "image",
    title: "Celebration 04 — Placement Day Cap & Certificate Celebration",
    description: "Celebratory convocation and batch milestone victory toss by selected candidates.",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "placement_celebration_5",
    page: "placements",
    section: "celebration",
    type: "image",
    title: "Celebration 05 — Annual Placement Gala & Recruiter Connect",
    description: "Corporate recruiters, mentors, and selected students gathering at the annual dinner gala.",
    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "placement_celebration_6",
    page: "placements",
    section: "celebration",
    type: "image",
    title: "Celebration 06 — Batch Success Bash & Career Kickoff Party",
    description: "Festive celebration marking the beginning of students' professional journey.",
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=80&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=80&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=80&auto=format&fit=crop",
    isDefault: true,
  },

  // ==========================================
  // 4. CAMPUS MEMORIES (memories) - Photos Only
  // ==========================================
  {
    slotKey: "memories_hackathon",
    page: "memories",
    section: "events",
    type: "image",
    title: "Annual Tech Hackathon (24-Hour Code Sprint)",
    description: "Campus memory card #1 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_conclave",
    page: "memories",
    section: "events",
    type: "image",
    title: "National Tech Conclave (Keynotes & Seminars)",
    description: "Campus memory card #2 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_cultural",
    page: "memories",
    section: "events",
    type: "image",
    title: "Euphoria Cultural Fest (Music & Celebrations)",
    description: "Campus memory card #3 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_expo",
    page: "memories",
    section: "events",
    type: "image",
    title: "CAD & Visual Arts Expo (3D Modeling)",
    description: "Campus memory card #4 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_robotics",
    page: "memories",
    section: "events",
    type: "image",
    title: "Robotics & AI Workshop (Sensors & Coding)",
    description: "Campus memory card #5 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_career",
    page: "memories",
    section: "events",
    type: "image",
    title: "Career & Industry Summit (Alumni Mentors)",
    description: "Campus memory card #6 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_demoday",
    page: "memories",
    section: "events",
    type: "image",
    title: "Software Project Demo Day (Live Pitches)",
    description: "Campus memory card #7 in the interactive FlexCarousel.",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=75&auto=format&fit=crop",
    defaultUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=75&auto=format&fit=crop",
    thumbnailUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=75&auto=format&fit=crop",
    isDefault: true,
  },
  {
    slotKey: "memories_panoramic",
    page: "memories",
    section: "hero",
    type: "image",
    title: "Campus Memories Panoramic Classroom Backdrop",
    description: "Hero background classroom panoramic image for the Memories experience.",
    url: "/src/assets/classroom_panoramic.png",
    defaultUrl: "/src/assets/classroom_panoramic.png",
    thumbnailUrl: "/src/assets/classroom_panoramic.png",
    isDefault: true,
  },

  // ==========================================
  // 5. STUDENT REVIEWS (reviews) - Video Testimonials Only
  // ==========================================
  {
    slotKey: "reviews_video_1",
    page: "reviews",
    section: "testimonials",
    type: "video",
    title: "Review 1 — Shina Mathur (Graphic Designing)",
    description: "Graphic Design Training & Real-world Placement Review.",
    url: "https://www.youtube.com/watch?v=xIr9tSA5vj4",
    defaultUrl: "https://www.youtube.com/watch?v=xIr9tSA5vj4",
    thumbnailUrl: "https://img.youtube.com/vi/xIr9tSA5vj4/hqdefault.jpg",
    isDefault: true,
  },
  {
    slotKey: "reviews_video_2",
    page: "reviews",
    section: "testimonials",
    type: "video",
    title: "Review 2 — Ilmuddin Behlim (Web Development)",
    description: "Web Development & Full Stack Practical Experience.",
    url: "https://www.youtube.com/watch?v=MvTcXGfCCls",
    defaultUrl: "https://www.youtube.com/watch?v=MvTcXGfCCls",
    thumbnailUrl: "https://img.youtube.com/vi/MvTcXGfCCls/hqdefault.jpg",
    isDefault: true,
  },
  {
    slotKey: "reviews_video_3",
    page: "reviews",
    section: "testimonials",
    type: "video",
    title: "Review 3 — Punya Singh (React JS Development)",
    description: "React JS Fast-Track Mentorship & Live Project Review.",
    url: "https://www.youtube.com/watch?v=QyM5b3PxyDU",
    defaultUrl: "https://www.youtube.com/watch?v=QyM5b3PxyDU",
    thumbnailUrl: "https://img.youtube.com/vi/QyM5b3PxyDU/hqdefault.jpg",
    isDefault: true,
  },
  {
    slotKey: "reviews_video_4",
    page: "reviews",
    section: "testimonials",
    type: "video",
    title: "Review 4 — Shadab Mohammad (Data Analytics & Python)",
    description: "Data Analytics, SQL & Python Online Training Review.",
    url: "https://www.youtube.com/watch?v=NzywyzmIYAE",
    defaultUrl: "https://www.youtube.com/watch?v=NzywyzmIYAE",
    thumbnailUrl: "https://img.youtube.com/vi/NzywyzmIYAE/hqdefault.jpg",
    isDefault: true,
  },
  {
    slotKey: "reviews_video_5",
    page: "reviews",
    section: "testimonials",
    type: "video",
    title: "Review 5 — Geet Kashyap (Digital Marketing)",
    description: "Digital Marketing Comprehensive Course Feedback.",
    url: "https://www.youtube.com/watch?v=B8qv3oMP0Co",
    defaultUrl: "https://www.youtube.com/watch?v=B8qv3oMP0Co",
    thumbnailUrl: "https://img.youtube.com/vi/B8qv3oMP0Co/hqdefault.jpg",
    isDefault: true,
  },
  {
    slotKey: "reviews_video_6",
    page: "reviews",
    section: "testimonials",
    type: "video",
    title: "Review 6 — Rohit Khandelwal (3D CAD & Modeling)",
    description: "CAD 3D Modeling & Mechanical Design Student Review.",
    url: "https://www.youtube.com/watch?v=aiOyEoe6Cz4",
    defaultUrl: "https://www.youtube.com/watch?v=aiOyEoe6Cz4",
    thumbnailUrl: "https://img.youtube.com/vi/aiOyEoe6Cz4/hqdefault.jpg",
    isDefault: true,
  },
];

let inMemorySlots = INITIAL_SECTION_SLOTS.map((slot, index) => ({
  _id: `slot-${index + 1}`,
  ...slot,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

class MediaStore {
  /**
   * Seed or synchronize section slots in MongoDB
   */
  static async syncSlots() {
    if (getDBStatus()) {
      try {
        const validSlotKeys = INITIAL_SECTION_SLOTS.map((s) => s.slotKey);
        await Media.deleteMany({
          page: { $in: ["about", "franchise", "placements", "memories", "reviews"] },
          slotKey: { $nin: validSlotKeys },
        });

        for (const slot of INITIAL_SECTION_SLOTS) {
          await Media.updateOne(
            { slotKey: slot.slotKey },
            {
              $setOnInsert: {
                ...slot,
                isDefault: true,
                createdAt: new Date(),
              },
              $set: {
                page: slot.page,
                section: slot.section,
                type: slot.type,
                title: slot.title,
                description: slot.description,
                defaultUrl: slot.defaultUrl,
              },
            },
            { upsert: true }
          );
        }
      } catch (err) {
        console.warn("MongoDB sync slots warning:", err.message);
      }
    }
  }

  /**
   * Get all slots filtered by page and type
   */
  static async getAll({ page, type } = {}) {
    await this.syncSlots();

    if (getDBStatus()) {
      try {
        const filter = { slotKey: { $exists: true, $ne: "" } };
        if (page && page !== "all") filter.page = page;
        if (type && type !== "all") filter.type = type;

        const results = await Media.find(filter).sort({ createdAt: 1 });
        if (results && results.length > 0) {
          const map = new Map();
          results.forEach((item) => {
            const existing = map.get(item.slotKey);
            if (!existing || (!item.isDefault && existing.isDefault)) {
              map.set(item.slotKey, item);
            }
          });
          return Array.from(map.values());
        }
      } catch (err) {
        console.warn("MongoDB media fetch failed, falling back to memory:", err.message);
      }
    }

    return inMemorySlots.filter((item) => {
      if (!item.slotKey) return false;
      if (page && page !== "all" && item.page !== page) return false;
      if (type && type !== "all" && item.type !== type) return false;
      return true;
    });
  }

  static async getById(id) {
    if (getDBStatus()) {
      try {
        const media = await Media.findById(id);
        if (media) return media;
      } catch (err) {}
    }
    return inMemorySlots.find((item) => String(item._id) === String(id) || item.slotKey === id) || null;
  }

  static async getBySlotKey(slotKey) {
    if (getDBStatus()) {
      try {
        const media = await Media.findOne({ slotKey });
        if (media) return media;
      } catch (err) {}
    }
    return inMemorySlots.find((item) => item.slotKey === slotKey) || null;
  }

  /**
   * Replace/Update a specific existing slot photo or video
   */
  static async updateSlot(slotKey, updateData) {
    if (getDBStatus()) {
      try {
        const template = INITIAL_SECTION_SLOTS.find((s) => s.slotKey === slotKey) || {};
        const updated = await Media.findOneAndUpdate(
          { slotKey },
          {
            $set: {
              url: updateData.url,
              thumbnailUrl: updateData.thumbnailUrl || updateData.url,
              fileId: updateData.fileId || "",
              isDefault: false,
              updatedAt: new Date(),
            },
            $setOnInsert: {
              page: template.page || "franchise",
              section: template.section || "general",
              type: template.type || "image",
              title: template.title || slotKey,
              description: template.description || "",
              defaultUrl: template.defaultUrl || updateData.url,
              createdAt: new Date(),
            },
          },
          { new: true, upsert: true }
        );
        if (updated) return updated;
      } catch (err) {
        console.warn("MongoDB update slot failed, falling back to memory:", err.message);
      }
    }

    const index = inMemorySlots.findIndex((item) => item.slotKey === slotKey);
    if (index !== -1) {
      inMemorySlots[index] = {
        ...inMemorySlots[index],
        ...updateData,
        isDefault: false,
        updatedAt: new Date(),
      };
      return inMemorySlots[index];
    }

    return null;
  }

  /**
   * Reset slot back to default original asset
   */
  static async resetSlot(slotKey) {
    const template = INITIAL_SECTION_SLOTS.find((s) => s.slotKey === slotKey);
    if (!template) return null;

    if (getDBStatus()) {
      try {
        const updated = await Media.findOneAndUpdate(
          { slotKey },
          {
            $set: {
              url: template.defaultUrl,
              thumbnailUrl: template.defaultUrl,
              fileId: "",
              isDefault: true,
              updatedAt: new Date(),
            },
          },
          { new: true }
        );
        if (updated) return updated;
      } catch (err) {
        console.warn("MongoDB reset slot failed, falling back to memory:", err.message);
      }
    }

    const index = inMemorySlots.findIndex((item) => item.slotKey === slotKey);
    if (index !== -1) {
      inMemorySlots[index] = {
        ...inMemorySlots[index],
        url: template.defaultUrl,
        thumbnailUrl: template.defaultUrl,
        fileId: "",
        isDefault: true,
        updatedAt: new Date(),
      };
      return inMemorySlots[index];
    }

    return null;
  }

  static async delete(id) {
    if (getDBStatus()) {
      try {
        const deleted = await Media.findByIdAndDelete(id);
        if (deleted) return deleted;
      } catch (err) {
        console.warn("MongoDB delete media failed, falling back to memory:", err.message);
      }
    }

    const index = inMemorySlots.findIndex((item) => String(item._id) === String(id));
    if (index !== -1) {
      const [removed] = inMemorySlots.splice(index, 1);
      return removed;
    }
    return null;
  }
}

module.exports = MediaStore;
