const fs = require("fs");
const path = require("path");
const Media = require("../models/Media");
const { getDBStatus, ensureConnected } = require("../config/db");

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
    slotKey: "about_showcase_reel",
    page: "about",
    section: "showcase",
    type: "video",
    title: "ThirdEye Brand Showcase Video Reel",
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

  // ------------------------------------------
  // Franchise — Awards & Industry Recognition (7 Slots)
  // ------------------------------------------
  {
    slotKey: "franchise_award_1",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "Best Tech Institute Award — Poornima University (Suumit Sharma)",
    description: "Founder Suumit Sharma receiving Best Tech Training Institute trophy from Poornima Global University.",
    url: "/src/assets/awards/award_poornima_suumit.png",
    defaultUrl: "/src/assets/awards/award_poornima_suumit.png",
    thumbnailUrl: "/src/assets/awards/award_poornima_suumit.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_award_2",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "Academic Excellence Honors — Poornima College (Preeti Sharma)",
    description: "Director Preeti Sharma receiving excellence award from Poornima College of Engineering.",
    url: "/src/assets/awards/award_poornima_preeti.png",
    defaultUrl: "/src/assets/awards/award_poornima_preeti.png",
    thumbnailUrl: "/src/assets/awards/award_poornima_preeti.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_award_3",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "Annual Stage Convocation & Graduation Ceremony",
    description: "Grand auditorium stage with certified graduates and university faculty dignitaries.",
    url: "/src/assets/awards/award_auditorium_ceremony.png",
    defaultUrl: "/src/assets/awards/award_auditorium_ceremony.png",
    thumbnailUrl: "/src/assets/awards/award_auditorium_ceremony.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_award_4",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "Best SAP Training Institute — ICFAI Global University",
    description: "Academic delegation & MoU ceremony at ICFAI Global University campus.",
    url: "/src/assets/awards/award_icfai_campus.png",
    defaultUrl: "/src/assets/awards/award_icfai_campus.png",
    thumbnailUrl: "/src/assets/awards/award_icfai_campus.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_award_5",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "National Media Acclaim — 'Skill-Based Education Begins'",
    description: "Newspaper clipping spotlighting ThirdEye's job-guaranteed training curriculum.",
    url: "/src/assets/awards/award_newspaper_skill_based.png",
    defaultUrl: "/src/assets/awards/award_newspaper_skill_based.png",
    thumbnailUrl: "/src/assets/awards/award_newspaper_skill_based.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_award_6",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "Campus Inauguration & Dignitary Ribbon Cutting",
    description: "Official center ribbon cutting ceremony with academic & civic leadership.",
    url: "/src/assets/awards/award_inauguration_ribbon.png",
    defaultUrl: "/src/assets/awards/award_inauguration_ribbon.png",
    thumbnailUrl: "/src/assets/awards/award_inauguration_ribbon.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_award_7",
    page: "franchise",
    section: "awards",
    type: "image",
    title: "State Education Forum Leadership Felicitation",
    description: "Flower bouquet and stage honors by regional educators and industry executives.",
    url: "/src/assets/awards/award_bouquet_celebration.png",
    defaultUrl: "/src/assets/awards/award_bouquet_celebration.png",
    thumbnailUrl: "/src/assets/awards/award_bouquet_celebration.png",
    isDefault: true,
  },

  // ------------------------------------------
  // Franchise — Placement Drive Photos (3 Slots)
  // ------------------------------------------
  {
    slotKey: "franchise_placement_1",
    page: "franchise",
    section: "placement_drive",
    type: "image",
    title: "Placement Drive #1 — 1-on-1 Technical Evaluation",
    description: "Recruiter testing student coding skills and technical projects on drive day.",
    url: "/src/assets/awards/placement_interview_1.png",
    defaultUrl: "/src/assets/awards/placement_interview_1.png",
    thumbnailUrl: "/src/assets/awards/placement_interview_1.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_placement_2",
    page: "franchise",
    section: "placement_drive",
    type: "image",
    title: "Placement Drive #2 — Corporate Recruiter HR Panel",
    description: "Panel interviews conducted by hiring managers from IT & corporate firms.",
    url: "/src/assets/awards/placement_interview_2.png",
    defaultUrl: "/src/assets/awards/placement_interview_2.png",
    thumbnailUrl: "/src/assets/awards/placement_interview_2.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_placement_3",
    page: "franchise",
    section: "placement_drive",
    type: "image",
    title: "Placement Drive #3 — Student Registration & Counseling Desk",
    description: "Candidate registration and documentation verification for placement drives.",
    url: "/src/assets/awards/placement_interview_3.png",
    defaultUrl: "/src/assets/awards/placement_interview_3.png",
    thumbnailUrl: "/src/assets/awards/placement_interview_3.png",
    isDefault: true,
  },

  // ------------------------------------------
  // Franchise — Partner Testimonials (5 Slots)
  // ------------------------------------------
  {
    slotKey: "franchise_partner_maya",
    page: "franchise",
    section: "partner_testimonials",
    type: "image",
    title: "Maya Sharma — Jagatpura Branch Director",
    description: "Real photo of Maya Sharma, franchise center owner of Jagatpura Branch.",
    url: "/src/assets/franchise/partner_maya_sharma.png",
    defaultUrl: "/src/assets/franchise/partner_maya_sharma.png",
    thumbnailUrl: "/src/assets/franchise/partner_maya_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_partner_kapil",
    page: "franchise",
    section: "partner_testimonials",
    type: "image",
    title: "Kapil Nitharwal — Vaishali Nagar Branch Director",
    description: "Real photo of Kapil Nitharwal, franchise center owner of Vaishali Nagar Branch.",
    url: "/src/assets/franchise/partner_kapil_nitharwal.png",
    defaultUrl: "/src/assets/franchise/partner_kapil_nitharwal.png",
    thumbnailUrl: "/src/assets/franchise/partner_kapil_nitharwal.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_partner_raj",
    page: "franchise",
    section: "partner_testimonials",
    type: "image",
    title: "Raj Gurjar — Jhotwara Branch Director",
    description: "Real photo of Raj Gurjar, franchise center owner of Jhotwara Branch.",
    url: "/src/assets/franchise/partner_raj_gurjar.png",
    defaultUrl: "/src/assets/franchise/partner_raj_gurjar.png",
    thumbnailUrl: "/src/assets/franchise/partner_raj_gurjar.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_partner_kushal",
    page: "franchise",
    section: "partner_testimonials",
    type: "image",
    title: "Kushal Avasthi — Gopalpura Branch Director",
    description: "Real photo of Kushal Avasthi, franchise center owner of Gopalpura Branch.",
    url: "/src/assets/franchise/partner_kushal_avasthi.png",
    defaultUrl: "/src/assets/franchise/partner_kushal_avasthi.png",
    thumbnailUrl: "/src/assets/franchise/partner_kushal_avasthi.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_partner_vartika",
    page: "franchise",
    section: "partner_testimonials",
    type: "image",
    title: "Vartika Kumawat — Mansarovar Branch Director",
    description: "Real photo of Vartika Kumawat, franchise center owner of Mansarovar Branch.",
    url: "/src/assets/franchise/partner_vartika_kumawat.png",
    defaultUrl: "/src/assets/franchise/partner_vartika_kumawat.png",
    thumbnailUrl: "/src/assets/franchise/partner_vartika_kumawat.png",
    isDefault: true,
  },
  {
    slotKey: "franchise_partner_diya",
    page: "franchise",
    section: "partner_testimonials",
    type: "image",
    title: "Diya Saini — Sodala Branch Director",
    description: "Real photo of Diya Saini, franchise center owner of Sodala Branch.",
    url: "/src/assets/mentor_5.png",
    defaultUrl: "/src/assets/mentor_5.png",
    thumbnailUrl: "/src/assets/mentor_5.png",
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
  // Celebration Infinite Spiral (28 Photos)
  // ==========================================
  {
      slotKey: "memories_celebration_1",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 01 — Graduation Cap Toss Ceremony",
      description: "Celebration Spiral Card #1 (Turn 1: Milestones & Graduations)",
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_2",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 02 — Confetti Victory Bash",
      description: "Celebration Spiral Card #2 (Turn 1: Milestones & Graduations)",
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_3",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 03 — Student Honor & Achievement",
      description: "Celebration Spiral Card #3 (Turn 1: Milestones & Graduations)",
      url: "/src/assets/students/student_1.jpg",
      defaultUrl: "/src/assets/students/student_1.jpg",
      thumbnailUrl: "/src/assets/students/student_1.jpg",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_4",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 04 — Annual Gala Night",
      description: "Celebration Spiral Card #4 (Turn 1: Milestones & Graduations)",
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_5",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 05 — Festival of Lights Celebration",
      description: "Celebration Spiral Card #5 (Turn 1: Milestones & Graduations)",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_6",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 06 — Course Completion Milestone",
      description: "Celebration Spiral Card #6 (Turn 1: Milestones & Graduations)",
      url: "/src/assets/students/student_2.jpg",
      defaultUrl: "/src/assets/students/student_2.jpg",
      thumbnailUrl: "/src/assets/students/student_2.jpg",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_7",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 07 — Faculty & Student Cheers",
      description: "Celebration Spiral Card #7 (Turn 1: Milestones & Graduations)",
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_8",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 08 — Festive Vibes Dance & Music Fest",
      description: "Celebration Spiral Card #8 (Turn 2: Awards & Parties)",
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_9",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 09 — Top Performer Student Award",
      description: "Celebration Spiral Card #9 (Turn 2: Awards & Parties)",
      url: "/src/assets/students/student_3.jpg",
      defaultUrl: "/src/assets/students/student_3.jpg",
      thumbnailUrl: "/src/assets/students/student_3.jpg",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_10",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 10 — Foundation Day Colorful Balloons",
      description: "Celebration Spiral Card #10 (Turn 2: Awards & Parties)",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_11",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 11 — Team Reunion & Entire ThirdEye Team",
      description: "Celebration Spiral Card #11 (Turn 2: Awards & Parties)",
      url: "/src/assets/team_photo.webp",
      defaultUrl: "/src/assets/team_photo.webp",
      thumbnailUrl: "/src/assets/team_photo.webp",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_12",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 12 — Annual Night Stage Performance",
      description: "Celebration Spiral Card #12 (Turn 2: Awards & Parties)",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_13",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 13 — Certified Star Student Joy",
      description: "Celebration Spiral Card #13 (Turn 2: Awards & Parties)",
      url: "/src/assets/students/student_4.jpg",
      defaultUrl: "/src/assets/students/student_4.jpg",
      thumbnailUrl: "/src/assets/students/student_4.jpg",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_14",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 14 — Birthday & Anniversary Cake Cutting",
      description: "Celebration Spiral Card #14 (Turn 2: Awards & Parties)",
      url: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_15",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 15 — Sparkler Moment & Festive Cheer",
      description: "Celebration Spiral Card #15 (Turn 3: Festivals & Victories)",
      url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_16",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 16 — Placement Celebration Job Placed",
      description: "Celebration Spiral Card #16 (Turn 3: Festivals & Victories)",
      url: "/src/assets/students/student_5.jpg",
      defaultUrl: "/src/assets/students/student_5.jpg",
      thumbnailUrl: "/src/assets/students/student_5.jpg",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_17",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 17 — Hackathon Win High Five",
      description: "Celebration Spiral Card #17 (Turn 3: Festivals & Victories)",
      url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_18",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 18 — Grand Finale Confetti Shower",
      description: "Celebration Spiral Card #18 (Turn 3: Festivals & Victories)",
      url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_19",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 19 — Innovation Trophy Winner",
      description: "Celebration Spiral Card #19 (Turn 3: Festivals & Victories)",
      url: "/src/assets/students/student_6.jpg",
      defaultUrl: "/src/assets/students/student_6.jpg",
      thumbnailUrl: "/src/assets/students/student_6.jpg",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_20",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 20 — Outdoor Campus Picnic & Bonding",
      description: "Celebration Spiral Card #20 (Turn 3: Festivals & Victories)",
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_21",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 21 — Youth Beats Live DJ & Music Fest",
      description: "Celebration Spiral Card #21 (Turn 3: Festivals & Victories)",
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_22",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 22 — New Year Bash Celebrations",
      description: "Celebration Spiral Card #22 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_23",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 23 — Lifelong Friends & Campus Bonds",
      description: "Celebration Spiral Card #23 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_24",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 24 — E-Sports & Gaming Win",
      description: "Celebration Spiral Card #24 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_25",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 25 — Farewell Banquet & Senior Send-off",
      description: "Celebration Spiral Card #25 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_26",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 26 — Creative Showcase & Art Festival",
      description: "Celebration Spiral Card #26 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_27",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 27 — Spotlight Star & Concert Lighting",
      description: "Celebration Spiral Card #27 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=600&q=80&auto=format&fit=crop",
      isDefault: true
  },
  {
      slotKey: "memories_celebration_28",
      page: "memories",
      section: "celebration",
      type: "image",
      title: "Celebration 28 — Convocation Day Stage Cap Toss",
      description: "Celebration Spiral Card #28 (Turn 4: Farewells & Friends)",
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80&auto=format&fit=crop",
      defaultUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80&auto=format&fit=crop",
      isDefault: true
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
     // ==========================================
  // 6. OUR TEAM (team) — 20 Mentors, Leadership & Franchise Owners
  // ==========================================
  // --- Founders (Slots 1 to 7) ---
  {
    slotKey: "team_member_1",
    page: "team",
    section: "founders",
    type: "image",
    title: "Suumit Sharrma — Chief Operating Officer",
    description: "Chief Operating Officer card photo in Founders stack",
    url: "/src/assets/leadership/suumit_sharma.png",
    defaultUrl: "/src/assets/leadership/suumit_sharma.png",
    thumbnailUrl: "/src/assets/leadership/suumit_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_2",
    page: "team",
    section: "founders",
    type: "image",
    title: "Preeti Sharma — CHIEF MANAGING DIRECTOR",
    description: "Chief Managing Director card photo in Founders stack",
    url: "/src/assets/leadership/preeti_sharma.png",
    defaultUrl: "/src/assets/leadership/preeti_sharma.png",
    thumbnailUrl: "/src/assets/leadership/preeti_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_3",
    page: "team",
    section: "founders",
    type: "image",
    title: "Puneet Sharma — Managing Director",
    description: "Managing Director card photo in Founders stack",
    url: "/src/assets/leadership/puneet_sharma.png",
    defaultUrl: "/src/assets/leadership/puneet_sharma.png",
    thumbnailUrl: "/src/assets/leadership/puneet_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_4",
    page: "team",
    section: "founders",
    type: "image",
    title: "Neelam Sharma — RECRUITMENT HEAD",
    description: "Recruitment Head card photo in Founders stack",
    url: "/src/assets/leadership/neelam_sharma.png",
    defaultUrl: "/src/assets/leadership/neelam_sharma.png",
    thumbnailUrl: "/src/assets/leadership/neelam_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_5",
    page: "team",
    section: "founders",
    type: "image",
    title: "Kushwang Sharma — Social Media Manager",
    description: "Social Media Manager card photo in Founders stack",
    url: "/src/assets/leadership/khushwang_sharma.png",
    defaultUrl: "/src/assets/leadership/khushwang_sharma.png",
    thumbnailUrl: "/src/assets/leadership/khushwang_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_6",
    page: "team",
    section: "founders",
    type: "image",
    title: "Mr. M.L. Chaudhary — Founder & Chief Patron",
    description: "Founder & Chief Patron card photo in Founders stack",
    url: "/src/assets/leadership/ml_chaudhary.png",
    defaultUrl: "/src/assets/leadership/ml_chaudhary.png",
    thumbnailUrl: "/src/assets/leadership/ml_chaudhary.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_7",
    page: "team",
    section: "founders",
    type: "image",
    title: "Sheetal Sharma — SALES & B.D. HEAD",
    description: "Sales & B.D. Head card photo in Founders stack",
    url: "/src/assets/leadership/sheetal_sharma.png",
    defaultUrl: "/src/assets/leadership/sheetal_sharma.png",
    thumbnailUrl: "/src/assets/leadership/sheetal_sharma.png",
    isDefault: true,
  },

  // --- Franchise Owners (Slots 8 to 12) ---
  {
    slotKey: "team_member_8",
    page: "team",
    section: "franchise_owners",
    type: "image",
    title: "Kapil Nitharwal — FRANCHISE OWNER / VAISHALI NAGAR BRANCH",
    description: "Vaishali Nagar Branch Franchise Owner card photo",
    url: "/src/assets/franchise/partner_kapil_nitharwal.png",
    defaultUrl: "/src/assets/franchise/partner_kapil_nitharwal.png",
    thumbnailUrl: "/src/assets/franchise/partner_kapil_nitharwal.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_9",
    page: "team",
    section: "franchise_owners",
    type: "image",
    title: "Diya Saini — FRANCHISE OWNER / Sodala Branch",
    description: "Sodala Branch Franchise Owner card photo",
    url: "/src/assets/mentor_5.png",
    defaultUrl: "/src/assets/mentor_5.png",
    thumbnailUrl: "/src/assets/mentor_5.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_10",
    page: "team",
    section: "franchise_owners",
    type: "image",
    title: "Raj Gurjar — FRANCHISE OWNER / Jhotwara Branch",
    description: "Jhotwara Branch Franchise Owner card photo",
    url: "/src/assets/franchise/partner_raj_gurjar.png",
    defaultUrl: "/src/assets/franchise/partner_raj_gurjar.png",
    thumbnailUrl: "/src/assets/franchise/partner_raj_gurjar.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_11",
    page: "team",
    section: "franchise_owners",
    type: "image",
    title: "Kushal Avasthi — FRANCHISE OWNER / Gopalpura Branch",
    description: "Gopalpura Branch Franchise Owner card photo",
    url: "/src/assets/franchise/partner_kushal_avasthi.png",
    defaultUrl: "/src/assets/franchise/partner_kushal_avasthi.png",
    thumbnailUrl: "/src/assets/franchise/partner_kushal_avasthi.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_12",
    page: "team",
    section: "franchise_owners",
    type: "image",
    title: "Vartika Kumawat — FRANCHISE OWNER / Mansarovar Branch",
    description: "Mansarovar Branch Franchise Owner card photo",
    url: "/src/assets/franchise/partner_vartika_kumawat.png",
    defaultUrl: "/src/assets/franchise/partner_vartika_kumawat.png",
    thumbnailUrl: "/src/assets/franchise/partner_vartika_kumawat.png",
    isDefault: true,
  },

  // --- The Department Ones (Slots 13 to 22) ---
  {
    slotKey: "team_member_13",
    page: "team",
    section: "departments",
    type: "image",
    title: "Sheetanshu Saxena — Senior Digital Marketing Executive",
    description: "Senior Digital Marketing Executive card photo in Department stack",
    url: "/src/assets/mentor_3.png",
    defaultUrl: "/src/assets/mentor_3.png",
    thumbnailUrl: "/src/assets/mentor_3.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_14",
    page: "team",
    section: "departments",
    type: "image",
    title: "Anjali Nama — Digital Marketing Executive",
    description: "Digital Marketing Executive card photo in Department stack",
    url: "/src/assets/students/student_1.jpg",
    defaultUrl: "/src/assets/students/student_1.jpg",
    thumbnailUrl: "/src/assets/students/student_1.jpg",
    isDefault: true,
  },
  {
    slotKey: "team_member_15",
    page: "team",
    section: "departments",
    type: "image",
    title: "Simran Sharma — Talent Acquisition Manager",
    description: "Talent Acquisition Manager card photo in Department stack",
    url: "/src/assets/students/student_2.jpg",
    defaultUrl: "/src/assets/students/student_2.jpg",
    thumbnailUrl: "/src/assets/students/student_2.jpg",
    isDefault: true,
  },
  {
    slotKey: "team_member_16",
    page: "team",
    section: "departments",
    type: "image",
    title: "Gaurav Singh Panwar — IVR & CRM SUPPORT MANAGER",
    description: "IVR & CRM Support Manager card photo in Department stack",
    url: "/src/assets/leadership/gaurav_singh.png",
    defaultUrl: "/src/assets/leadership/gaurav_singh.png",
    thumbnailUrl: "/src/assets/leadership/gaurav_singh.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_17",
    page: "team",
    section: "departments",
    type: "image",
    title: "Mohit Sharma — ADMIN MANAGER",
    description: "Admin Manager card photo in Department stack",
    url: "/src/assets/leadership/mohit_sharma.png",
    defaultUrl: "/src/assets/leadership/mohit_sharma.png",
    thumbnailUrl: "/src/assets/leadership/mohit_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_18",
    page: "team",
    section: "departments",
    type: "image",
    title: "Shubham Saini — SR. TRAINING MANAGER",
    description: "Sr. Training Manager card photo in Department stack",
    url: "/src/assets/leadership/shubham_saini.png",
    defaultUrl: "/src/assets/leadership/shubham_saini.png",
    thumbnailUrl: "/src/assets/leadership/shubham_saini.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_19",
    page: "team",
    section: "departments",
    type: "image",
    title: "Tushar Prajapat — Senior BRANCH MANAGER",
    description: "Senior Branch Manager card photo in Department stack",
    url: "/src/assets/mentor_1.png",
    defaultUrl: "/src/assets/mentor_1.png",
    thumbnailUrl: "/src/assets/mentor_1.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_20",
    page: "team",
    section: "departments",
    type: "image",
    title: "Rishika Raj — Senior Career Counsellor",
    description: "Senior Career Counsellor card photo in Department stack",
    url: "/src/assets/mentor_2.png",
    defaultUrl: "/src/assets/mentor_2.png",
    thumbnailUrl: "/src/assets/mentor_2.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_21",
    page: "team",
    section: "departments",
    type: "image",
    title: "Rohit Bairwa — Senior Career Counsellor",
    description: "Senior Career Counsellor card photo in Department stack",
    url: "/src/assets/students/student_11.jpg",
    defaultUrl: "/src/assets/students/student_11.jpg",
    thumbnailUrl: "/src/assets/students/student_11.jpg",
    isDefault: true,
  },
  {
    slotKey: "team_member_22",
    page: "team",
    section: "departments",
    type: "image",
    title: "Ishika Jain — Senior Career Counsellor",
    description: "Senior Career Counsellor card photo in Department stack",
    url: "/src/assets/mentor_4.png",
    defaultUrl: "/src/assets/mentor_4.png",
    thumbnailUrl: "/src/assets/mentor_4.png",
    isDefault: true,
  },
  {
    slotKey: "team_member_23",
    page: "team",
    section: "departments",
    type: "image",
    title: "Seema Agarwal — Senior Career Counsellor",
    description: "Senior Career Counsellor card photo in Department stack",
    url: "/src/assets/students/student_4.jpg",
    defaultUrl: "/src/assets/students/student_4.jpg",
    thumbnailUrl: "/src/assets/students/student_4.jpg",
    isDefault: true,
  },
  {
    slotKey: "team_member_24",
    page: "team",
    section: "departments",
    type: "image",
    title: "Jay Singh Rathor — Senior Career Counsellor",
    description: "Senior Career Counsellor card photo in Department stack",
    url: "/src/assets/students/student_5.jpg",
    defaultUrl: "/src/assets/students/student_5.jpg",
    thumbnailUrl: "/src/assets/students/student_5.jpg",
    isDefault: true,
  },
  {
    slotKey: "team_member_25",
    page: "team",
    section: "departments",
    type: "image",
    title: "Mratyunjay Mishra — Senior Career Counsellor",
    description: "Senior Career Counsellor card photo in Department stack",
    url: "/src/assets/students/student_6.jpg",
    defaultUrl: "/src/assets/students/student_6.jpg",
    thumbnailUrl: "/src/assets/students/student_6.jpg",
    isDefault: true,
  },

  // --- The Faculties (Slots 26 & 27) ---
  {
    slotKey: "team_member_26",
    page: "team",
    section: "faculties",
    type: "image",
    title: "Rahul Verma — Designing Executive",
    description: "Designing Executive card photo in Faculties stack",
    url: "/src/assets/students/student_9.jpg",
    defaultUrl: "/src/assets/students/student_9.jpg",
    thumbnailUrl: "/src/assets/students/student_9.jpg",
    isDefault: true,
  },
  {
    slotKey: "team_member_27",
    page: "team",
    section: "faculties",
    type: "image",
    title: "Pramendra Sankhla — Civil and Mechanical Trainer",
    description: "Civil and Mechanical Trainer card photo in Faculties stack",
    url: "/src/assets/students/student_7.jpg",
    defaultUrl: "/src/assets/students/student_7.jpg",
    thumbnailUrl: "/src/assets/students/student_7.jpg",
    isDefault: true,
  },

  // ==========================================
  // 7. OUR TEAM CAROUSEL (carousel) — 20 Mentors Carousel Cards
  // ==========================================
  {
    slotKey: "carousel_mentor_1",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Suumit Sharrma — Carousel Card Avatar",
    description: "Suumit Sharrma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/suumit_sharma.png",
    defaultUrl: "/src/assets/leadership/suumit_sharma.png",
    thumbnailUrl: "/src/assets/leadership/suumit_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_2",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Preeti Sharma — Carousel Card Avatar",
    description: "Preeti Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/preeti_sharma.png",
    defaultUrl: "/src/assets/leadership/preeti_sharma.png",
    thumbnailUrl: "/src/assets/leadership/preeti_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_3",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Puneet Sharma — Carousel Card Avatar",
    description: "Puneet Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/puneet_sharma.png",
    defaultUrl: "/src/assets/leadership/puneet_sharma.png",
    thumbnailUrl: "/src/assets/leadership/puneet_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_4",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Neelam Sharma — Carousel Card Avatar",
    description: "Neelam Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/neelam_sharma.png",
    defaultUrl: "/src/assets/leadership/neelam_sharma.png",
    thumbnailUrl: "/src/assets/leadership/neelam_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_5",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Kushwang Sharma — Carousel Card Avatar",
    description: "Kushwang Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/khushwang_sharma.png",
    defaultUrl: "/src/assets/leadership/khushwang_sharma.png",
    thumbnailUrl: "/src/assets/leadership/khushwang_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_6",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Mr. M.L. Chaudhary — Carousel Card Avatar",
    description: "Founder & Chief Patron avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/ml_chaudhary.png",
    defaultUrl: "/src/assets/leadership/ml_chaudhary.png",
    thumbnailUrl: "/src/assets/leadership/ml_chaudhary.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_7",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Sheetal Sharma — Carousel Card Avatar",
    description: "Sheetal Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/sheetal_sharma.png",
    defaultUrl: "/src/assets/leadership/sheetal_sharma.png",
    thumbnailUrl: "/src/assets/leadership/sheetal_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_8",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Kapil Nitharwal — Carousel Card Avatar",
    description: "Kapil Nitharwal avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/franchise/partner_kapil_nitharwal.png",
    defaultUrl: "/src/assets/franchise/partner_kapil_nitharwal.png",
    thumbnailUrl: "/src/assets/franchise/partner_kapil_nitharwal.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_9",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Diya Saini — Carousel Card Avatar",
    description: "Diya Saini avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/mentor_5.png",
    defaultUrl: "/src/assets/mentor_5.png",
    thumbnailUrl: "/src/assets/mentor_5.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_10",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Raj Gurjar — Carousel Card Avatar",
    description: "Raj Gurjar avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/franchise/partner_raj_gurjar.png",
    defaultUrl: "/src/assets/franchise/partner_raj_gurjar.png",
    thumbnailUrl: "/src/assets/franchise/partner_raj_gurjar.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_11",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Kushal Avasthi — Carousel Card Avatar",
    description: "Kushal Avasthi avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/franchise/partner_kushal_avasthi.png",
    defaultUrl: "/src/assets/franchise/partner_kushal_avasthi.png",
    thumbnailUrl: "/src/assets/franchise/partner_kushal_avasthi.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_12",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Vartika Kumawat — Carousel Card Avatar",
    description: "Vartika Kumawat avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/franchise/partner_vartika_kumawat.png",
    defaultUrl: "/src/assets/franchise/partner_vartika_kumawat.png",
    thumbnailUrl: "/src/assets/franchise/partner_vartika_kumawat.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_13",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Sheetanshu Saxena — Carousel Card Avatar",
    description: "Sheetanshu Saxena avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/mentor_3.png",
    defaultUrl: "/src/assets/mentor_3.png",
    thumbnailUrl: "/src/assets/mentor_3.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_14",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Anjali Nama — Carousel Card Avatar",
    description: "Anjali Nama avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_1.jpg",
    defaultUrl: "/src/assets/students/student_1.jpg",
    thumbnailUrl: "/src/assets/students/student_1.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_15",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Simran Sharma — Carousel Card Avatar",
    description: "Simran Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_2.jpg",
    defaultUrl: "/src/assets/students/student_2.jpg",
    thumbnailUrl: "/src/assets/students/student_2.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_16",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Gaurav Singh Panwar — Carousel Card Avatar",
    description: "Gaurav Singh Panwar avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/gaurav_singh.png",
    defaultUrl: "/src/assets/leadership/gaurav_singh.png",
    thumbnailUrl: "/src/assets/leadership/gaurav_singh.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_17",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Mohit Sharma — Carousel Card Avatar",
    description: "Mohit Sharma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/mohit_sharma.png",
    defaultUrl: "/src/assets/leadership/mohit_sharma.png",
    thumbnailUrl: "/src/assets/leadership/mohit_sharma.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_18",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Shubham Saini — Carousel Card Avatar",
    description: "Shubham Saini avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/leadership/shubham_saini.png",
    defaultUrl: "/src/assets/leadership/shubham_saini.png",
    thumbnailUrl: "/src/assets/leadership/shubham_saini.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_19",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Tushar Prajapat — Carousel Card Avatar",
    description: "Tushar Prajapat avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/mentor_1.png",
    defaultUrl: "/src/assets/mentor_1.png",
    thumbnailUrl: "/src/assets/mentor_1.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_20",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Rishika Raj — Carousel Card Avatar",
    description: "Rishika Raj avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/mentor_2.png",
    defaultUrl: "/src/assets/mentor_2.png",
    thumbnailUrl: "/src/assets/mentor_2.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_21",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Rohit Bairwa — Carousel Card Avatar",
    description: "Rohit Bairwa avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_11.jpg",
    defaultUrl: "/src/assets/students/student_11.jpg",
    thumbnailUrl: "/src/assets/students/student_11.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_22",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Ishika Jain — Carousel Card Avatar",
    description: "Ishika Jain avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/mentor_4.png",
    defaultUrl: "/src/assets/mentor_4.png",
    thumbnailUrl: "/src/assets/mentor_4.png",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_23",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Seema Agarwal — Carousel Card Avatar",
    description: "Seema Agarwal avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_4.jpg",
    defaultUrl: "/src/assets/students/student_4.jpg",
    thumbnailUrl: "/src/assets/students/student_4.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_24",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Jay Singh Rathor — Carousel Card Avatar",
    description: "Jay Singh Rathor avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_5.jpg",
    defaultUrl: "/src/assets/students/student_5.jpg",
    thumbnailUrl: "/src/assets/students/student_5.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_25",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Mratyunjay Mishra — Carousel Card Avatar",
    description: "Mratyunjay Mishra avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_6.jpg",
    defaultUrl: "/src/assets/students/student_6.jpg",
    thumbnailUrl: "/src/assets/students/student_6.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_26",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Rahul Verma — Carousel Card Avatar",
    description: "Rahul Verma avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_9.jpg",
    defaultUrl: "/src/assets/students/student_9.jpg",
    thumbnailUrl: "/src/assets/students/student_9.jpg",
    isDefault: true,
  },
  {
    slotKey: "carousel_mentor_27",
    page: "team",
    section: "carousel",
    type: "image",
    title: "Pramendra Sankhla — Carousel Card Avatar",
    description: "Pramendra Sankhla avatar photo in 'Meet the people behind the learning journey' carousel",
    url: "/src/assets/students/student_7.jpg",
    defaultUrl: "/src/assets/students/student_7.jpg",
    thumbnailUrl: "/src/assets/students/student_7.jpg",
    isDefault: true,
  },
];

let inMemorySlots = INITIAL_SECTION_SLOTS.map((slot, index) => ({
  _id: `slot-${index + 1}`,
  ...slot,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

let hasSynced = false;
let isSyncing = false;

// Defensively sanitize item: if url points to nonexistent local /uploads/, fall back to defaultUrl
// Ensures ImageKit URLs are preserved, and MP4 video URLs are not used as thumbnail images
const sanitizeMedia = (item) => {
  const doc = typeof item.toObject === "function" ? item.toObject() : { ...item };
  if (doc.url && doc.url.startsWith("/uploads/")) {
    const diskPath = path.join(__dirname, "..", doc.url);
    if (!fs.existsSync(diskPath)) {
      doc.url = doc.defaultUrl;
      doc.thumbnailUrl = doc.defaultUrl;
    }
  }
  // If thumbnailUrl points to a video file, clear it so it doesn't break image tags
  if (doc.thumbnailUrl && /\.(mp4|webm|mov|mkv)$/i.test(doc.thumbnailUrl)) {
    doc.thumbnailUrl = "";
  }
  return doc;
};

class MediaStore {
  /**
   * Seed or synchronize section slots in MongoDB using high-performance bulk operations
   */
  static async syncSlots(force = false) {
    if (hasSynced && !force) return;
    if (isSyncing) return;

    if (!getDBStatus()) {
      await ensureConnected();
    }

    if (getDBStatus()) {
      isSyncing = true;
      try {
        const validSlotKeys = INITIAL_SECTION_SLOTS.map((s) => s.slotKey);

        // Remove outdated/obsolete slots not in current configuration
        await Media.deleteMany({
          page: { $in: ["about", "franchise", "placements", "memories", "reviews", "team"] },
          slotKey: { $nin: validSlotKeys },
        });

        // Fast bulkWrite for all 119 slots in a single round-trip
        const bulkOps = INITIAL_SECTION_SLOTS.map((slot) => {
          const { page, section, type, title, description, defaultUrl, ...insertOnly } = slot;
          return {
            updateOne: {
              filter: { slotKey: slot.slotKey },
              update: {
                $setOnInsert: {
                  ...insertOnly,
                  url: slot.url,
                  thumbnailUrl: slot.thumbnailUrl || slot.url,
                  fileId: slot.fileId || "",
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
              upsert: true,
            },
          };
        });

        if (bulkOps.length > 0) {
          await Media.bulkWrite(bulkOps, { ordered: false });
        }

        // Sync inMemorySlots with the latest MongoDB records
        const allDocs = await Media.find({ slotKey: { $in: validSlotKeys } }).lean();
        allDocs.forEach((doc) => {
          const mIdx = inMemorySlots.findIndex((s) => s.slotKey === doc.slotKey);
          if (mIdx !== -1) {
            inMemorySlots[mIdx] = {
              ...inMemorySlots[mIdx],
              url: doc.url,
              thumbnailUrl: doc.thumbnailUrl,
              fileId: doc.fileId,
              isDefault: doc.isDefault,
              updatedAt: doc.updatedAt,
            };
          }
        });

        hasSynced = true;
        console.log("MediaStore: Initialized and synchronized all section slots with MongoDB.");
      } catch (err) {
        console.warn("MongoDB sync slots warning:", err.message);
      } finally {
        isSyncing = false;
      }
    }
  }

  /**
   * Get all slots filtered by page and type (High performance, cached & safe)
   */
  static async getAll({ page, type } = {}) {
    if (!getDBStatus()) {
      await ensureConnected();
    }

    if (!hasSynced && getDBStatus()) {
      await this.syncSlots();
    }

    if (getDBStatus()) {
      try {
        const filter = { slotKey: { $exists: true, $ne: "", $nin: ["about_team_photo", "franchise_founder"] } };
        if (page && page !== "all") filter.page = page;
        if (type && type !== "all") filter.type = type;

        const results = await Media.find(filter).lean().sort({ createdAt: 1 });
        if (results && results.length > 0) {
          const map = new Map();
          results.forEach((item) => {
            const sanitized = sanitizeMedia(item);
            if (sanitized.slotKey === "about_team_photo" || sanitized.slotKey === "franchise_founder") return;
            const existing = map.get(sanitized.slotKey);
            if (!existing || (!sanitized.isDefault && existing.isDefault)) {
              map.set(sanitized.slotKey, sanitized);
            }
          });
          return Array.from(map.values());
        }
      } catch (err) {
        console.warn("MongoDB media fetch failed, falling back to memory:", err.message);
      }
    }

    return inMemorySlots
      .filter((item) => {
        if (!item.slotKey || item.slotKey === "about_team_photo" || item.slotKey === "franchise_founder") return false;
        if (page && page !== "all" && item.page !== page) return false;
        if (type && type !== "all" && item.type !== type) return false;
        return true;
      })
      .map(sanitizeMedia);
  }

  static async getById(id) {
    if (!getDBStatus()) {
      await ensureConnected();
    }
    if (getDBStatus()) {
      try {
        const media = await Media.findById(id).lean();
        if (media) return sanitizeMedia(media);
      } catch (err) {}
    }
    const found = inMemorySlots.find((item) => String(item._id) === String(id) || item.slotKey === id);
    return found ? sanitizeMedia(found) : null;
  }

  static async getBySlotKey(slotKey) {
    if (!getDBStatus()) {
      await ensureConnected();
    }
    if (getDBStatus()) {
      try {
        const media = await Media.findOne({ slotKey }).lean();
        if (media) return sanitizeMedia(media);
      } catch (err) {}
    }
    const found = inMemorySlots.find((item) => item.slotKey === slotKey);
    return found ? sanitizeMedia(found) : null;
  }

// Paired slots for franchise owners: uploading in either Team or Franchise page automatically syncs both!
const PAIRED_FRANCHISE_SLOTS = {
  team_member_8: "franchise_partner_kapil",
  franchise_partner_kapil: "team_member_8",
  team_member_9: "franchise_partner_diya",
  franchise_partner_diya: "team_member_9",
  team_member_10: "franchise_partner_raj",
  franchise_partner_raj: "team_member_10",
  team_member_11: "franchise_partner_kushal",
  franchise_partner_kushal: "team_member_11",
  team_member_12: "franchise_partner_vartika",
  franchise_partner_vartika: "team_member_12",
};

  /**
   * Replace/Update a specific existing slot photo or video
   */
  static async updateSlot(slotKey, updateData, isSync = false) {
    if (slotKey === "about_team_photo" || slotKey === "franchise_founder") {
      throw new Error("This slot is managed statically in assets and cannot be modified via backend.");
    }

    const template = INITIAL_SECTION_SLOTS.find((s) => s.slotKey === slotKey) || {};
    const inferredType = template.type || (updateData.url && /\.(mp4|webm|mov|mkv)$/i.test(updateData.url) ? "video" : "image");
    
    // Clean thumbnailUrl: if it's an MP4, don't store it as an image thumbnail
    let cleanThumbnail = updateData.thumbnailUrl || "";
    if (cleanThumbnail && /\.(mp4|webm|mov|mkv)$/i.test(cleanThumbnail)) {
      cleanThumbnail = "";
    }

    // Keep in-memory cache synchronized immediately
    const memIndex = inMemorySlots.findIndex((item) => item.slotKey === slotKey);
    if (memIndex !== -1) {
      inMemorySlots[memIndex] = {
        ...inMemorySlots[memIndex],
        url: updateData.url,
        thumbnailUrl: cleanThumbnail,
        fileId: updateData.fileId || "",
        type: inferredType,
        isDefault: false,
        updatedAt: new Date(),
      };
    }

    if (!getDBStatus()) {
      await ensureConnected();
    }

    let resultDoc = memIndex !== -1 ? inMemorySlots[memIndex] : null;

    if (getDBStatus()) {
      try {
        const inferredPage = template.page || (
          slotKey.startsWith("team_") || slotKey.startsWith("carousel_") ? "team" :
          slotKey.startsWith("memories_") ? "memories" :
          slotKey.startsWith("placement_") ? "placements" :
          slotKey.startsWith("about_") ? "about" :
          slotKey.startsWith("reviews_") ? "reviews" :
          "franchise"
        );
        const inferredSection = template.section || (
          slotKey.startsWith("carousel_mentor_") ? "carousel" :
          slotKey.startsWith("team_member_") && [1, 2, 3, 4].includes(parseInt(slotKey.replace("team_member_", ""), 10)) ? "founders" :
          slotKey.startsWith("team_member_") && [5, 6, 7, 8].includes(parseInt(slotKey.replace("team_member_", ""), 10)) ? "departments" :
          slotKey.startsWith("team_member_") ? "faculties" :
          slotKey.includes("celebration") ? "celebration" :
          slotKey.includes("student") ? "driftwall" :
          slotKey.includes("branch") ? "branches" :
          slotKey.includes("reel") ? "reels" :
          "general"
        );
        const updated = await Media.findOneAndUpdate(
          { slotKey },
          {
            $set: {
              url: updateData.url,
              thumbnailUrl: cleanThumbnail,
              fileId: updateData.fileId || "",
              type: inferredType,
              isDefault: false,
              page: inferredPage,
              section: inferredSection,
              updatedAt: new Date(),
            },
            $setOnInsert: {
              title: template.title || slotKey,
              description: template.description || "",
              defaultUrl: template.defaultUrl || updateData.url,
              createdAt: new Date(),
            },
          },
          { returnDocument: "after", upsert: true }
        );
        if (updated) {
          const doc = updated.toObject ? updated.toObject() : updated;
          if (memIndex !== -1) {
            inMemorySlots[memIndex] = { ...inMemorySlots[memIndex], ...doc };
          }
          resultDoc = doc;
        }
      } catch (err) {
        console.warn("MongoDB update slot failed, falling back to memory:", err.message);
      }
    }

    // Auto-sync paired slot across pages (e.g. team_member_8 <-> franchise_partner_kapil)
    if (!isSync && PAIRED_FRANCHISE_SLOTS[slotKey]) {
      try {
        await MediaStore.updateSlot(PAIRED_FRANCHISE_SLOTS[slotKey], updateData, true);
      } catch (syncErr) {
        console.warn("Auto-syncing paired franchise slot failed:", syncErr.message);
      }
    }

    return resultDoc;
  }

  /**
   * Reset slot back to default original asset
   */
  static async resetSlot(slotKey, isSync = false) {
    const template = INITIAL_SECTION_SLOTS.find((s) => s.slotKey === slotKey);
    if (!template) return null;

    const memIndex = inMemorySlots.findIndex((item) => item.slotKey === slotKey);
    if (memIndex !== -1) {
      inMemorySlots[memIndex] = {
        ...inMemorySlots[memIndex],
        url: template.defaultUrl,
        thumbnailUrl: template.defaultUrl,
        fileId: "",
        isDefault: true,
        updatedAt: new Date(),
      };
    }

    if (!getDBStatus()) {
      await ensureConnected();
    }

    let resultDoc = memIndex !== -1 ? inMemorySlots[memIndex] : null;

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
          { returnDocument: "after" }
        );
        if (updated) {
          const doc = updated.toObject ? updated.toObject() : updated;
          if (memIndex !== -1) {
            inMemorySlots[memIndex] = { ...inMemorySlots[memIndex], ...doc };
          }
          resultDoc = doc;
        }
      } catch (err) {
        console.warn("MongoDB reset slot failed, falling back to memory:", err.message);
      }
    }

    // Auto-reset paired slot across pages
    if (!isSync && PAIRED_FRANCHISE_SLOTS[slotKey]) {
      try {
        await MediaStore.resetSlot(PAIRED_FRANCHISE_SLOTS[slotKey], true);
      } catch (syncErr) {
        console.warn("Auto-resetting paired franchise slot failed:", syncErr.message);
      }
    }

    return resultDoc;
  }

  static async delete(id) {
    if (!getDBStatus()) {
      await ensureConnected();
    }
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
