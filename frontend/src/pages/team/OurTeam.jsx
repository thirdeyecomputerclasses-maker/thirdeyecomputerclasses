import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchMedia } from "../../services/mediaApi";
import logo from "../../assets/logo.webp";
import preetiSharmaImg from "../../assets/leadership/preeti_sharma.png";
import puneetSharmaImg from "../../assets/leadership/puneet_sharma.png";
import suumitSharmaImg from "../../assets/leadership/suumit_sharma.png";
import mlChaudharyImg from "../../assets/leadership/ml_chaudhary.png";
import sheetalSharmaImg from "../../assets/leadership/sheetal_sharma.png";
import neelamSharmaImg from "../../assets/leadership/neelam_sharma.png";
import muskanAvesthiImg from "../../assets/leadership/muskan_avesthi.png";
import khushwangSharmaImg from "../../assets/leadership/khushwang_sharma.png";
import amitSainiImg from "../../assets/leadership/amit_saini.png";
import shubhamSainiImg from "../../assets/leadership/shubham_saini.png";
import tusharPrajapatImg from "../../assets/mentor_1.png";
import gauravSinghImg from "../../assets/leadership/gaurav_singh.png";
import rishikaRajImg from "../../assets/mentor_2.png";
import ishikaJainImg from "../../assets/mentor_4.png";
import diyaSainiImg from "../../assets/mentor_5.png";
import sheetanshuSaxenaImg from "../../assets/mentor_3.png";
import mohitSharmaImg from "../../assets/leadership/mohit_sharma.png";
import CardSwap from "./components/CardSwap";
import "./OurTeam.css";

const mentors = [
  {
    id: 1,
    name: "Preeti Sharma",
    role: "CHIEF MANAGING DIRECTOR",
    category: "DIRECTORATE",
    image: preetiSharmaImg,
    description:
      "Preeti Sharma, Chief Managing Director of Thirdeye Computer Classes, is a proven professional with over 15 years of experience in Business Development and Key Account Management. She has a demonstrated history of success in the staffing and recruiting industry and is highly skilled in Negotiation, HR Consulting, Customer Relationship Management (CRM), Market Research, and Management.",
  },
  {
    id: 2,
    name: "Puneet Sharma",
    role: "Managing Director",
    category: "DIRECTORATE",
    image: puneetSharmaImg,
    description:
      "Puneet Sharma, Managing Director of Thirdeye computer classses is a results-oriented professional with over 20 years of experience in managing and direction. Possesses excellent time management skills, top customer-relations abilities and strong communication methods",
  },
  {
    id: 3,
    name: "Suumit sharrma",
    role: "Chief Operating Officer",
    category: "EXECUTIVE LEAD",
    image: suumitSharmaImg,
    description:
      "Suumit Sharrma is the Chief Operating Officer at Thirdeye Computer Classes, where he oversees daily operations, drives strategic growth initiatives, and ensures the smooth functioning of all departments. With a deep understanding of the education and training industry",
  },
  {
    id: 4,
    name: "Mr. M.L. Chaudhary",
    role: "Founder & Chief Patron",
    category: "FOUNDER",
    image: mlChaudharyImg,
    description:
      "An enthusiastic person and qualified technical instructor, trained in technical management with incredible contributions to Indian Airforce. An accredited technical safety inspector in technical aviation field, Served with innovative ideas for the continues improvement in technical safety. The recipient of Indian Airforce Commandation was an asset to the service.\n\nHis vision is to develop the computer skills, in each and every youth and enlighten the IT knowledge by inspiring every student through the principle of Swami Vivekananda: “Arise, awake n do not stop until the goal is reached.”",
  },
  {
    id: 5,
    name: "Sheetal Sharma",
    role: "SALES & B.D. HEAD",
    category: "BUSINESS LEAD",
    image: sheetalSharmaImg,
    description:
      "A seasoned leader with 27 years of experience, Sheetal Sharma spearheads Sales and Business Development at Thirdeye. Formerly the Sales & B.D. Head and Franchise Manager at Samyak, she brings unmatched expertise in business expansion and strategic growth. She is an ICF-accredited Life Coach, a Corporate Soft Skills Trainer, and an award-winning storyteller from Toastmasters International.\n\nCombining her deep industry knowledge with a passion for English literature, Sheetal is dedicated to scaling Thirdeye’s vision to new heights.",
  },
  {
    id: 6,
    name: "Neelam Sharma",
    role: "RECRUITMENT HEAD",
    category: "ADMISSION LEAD",
    image: neelamSharmaImg,
    description:
      "She is a highly accomplished and dedicated professional serving as the Admission & Counseling Head at Thirdeye Computer Classes. With a strong background in student guidance and enrollment management, Neelam plays a pivotal role in shaping the academic journeys of countless students. Their expertise in career counseling, admissions strategy, and student support has made them invaluable to the institution.\n\nKnown for their commitment to fostering a supportive and growth-oriented environment, Neelam strives to help students make informed decisions and achieve their academic and career aspirations.",
  },
  {
    id: 7,
    name: "Muskan Avesthi",
    role: "PLACEMENT MANAGER",
    category: "CAREER PLACEMENTS",
    image: muskanAvesthiImg,
    description:
      "Team Member Muskan Avesthi-An enthusiastic soft and communication skills trainer with demonstrated history of providing process training to new hires. With overall 8+ years of Experience in Career counselling and overseas consultant, Known for driving initiatives for business development.",
  },
  {
    id: 8,
    name: "Kushwang Sharma",
    role: "Social Media Manager",
    category: "OPERATIONS",
    image: khushwangSharmaImg,
    description:
      "Social Media Manager & Operations Head, ThirdEye Computer Classes Khushwang Sharma leads social media and operations at ThirdEye Computer Classes, combining digital marketing expertise with strong organizational skills. His work has enhanced the institute’s brand presence and streamlined daily operations. Under his leadership, social media engagement and student enrollments have seen significant growth through effective, data-driven strategies.",
  },
  {
    id: 9,
    name: "Amit Saini",
    role: "Senior Digital Marketing Manager",
    category: "SENIOR FACULTY",
    image: amitSainiImg,
    description:
      "Amit Saini is an experienced Digital Marketing Manager and Graphic Design Expert with over 9 years of experience in digital marketing, design, and brand strategy. He is a Senior Digital Marketing Manager and Educator at Thirdeye Computer Classes. He is also the Founder of Digitallitsolutions and has previously taught at Dicazo. Amit has successfully worked with brands like Lapinoz Pizza, GD Goenka, Maharaja Masala, Kids Pride School, Naughty Dogs, and Carz Spa.",
  },
  {
    id: 10,
    name: "Shubham Saini",
    role: "SR. TRAINING MANAGER",
    category: "TRAINING HEAD",
    image: shubhamSainiImg,
    description:
      "Shubham Saini is an accomplished Senior Manager at Thirdeye Computer Classes, where he brings a wealth of experience in business development, franchise management, and career counseling. With his strong leadership skills and strategic vision, Shubham has played a significant role in expanding the institute’s operations and guiding students toward successful career paths.\n\nAt Thirdeye Computer Classes, Shubham took on the role of Senior Branch Manager, where he successfully lead business development initiatives, expanded franchise operations, and offered career counseling to students. His role involves overseeing the daily operations of the branch, developing new business opportunities, managing franchise partnerships, and ensuring the overall growth and success of the organization.",
  },
  {
    id: 11,
    name: "Tushar prajapat",
    role: "Senior bRANCH MANAGER",
    category: "BRANCH LEAD",
    image: tusharPrajapatImg,
    description:
      "Digital Marketer | Designer | Freelancer | Video Editor | Career Counsellor With 6 years of experience, Tushar Prajapat combines creativity and strategy to craft impactful digital solutions. At ThirdEye Computer Classes, he drives digital marketing, design, and career counselling initiatives—helping students and brands grow in the digital era.\n\nA versatile professional with expertise in branding, design, content, and freelancing, Tushar’s innovative and result-driven approach inspires learners to upskill and achieve their goals. Philosophy: “Learn. Create. Grow — because your skills define your success.”",
  },
  {
    id: 12,
    name: "Gaurav Singh Panwar",
    role: "IVR & CRM SUPPORT mANAGER",
    category: "STUDENT SUPPORT",
    image: gauravSinghImg,
    description:
      "With 5+ years of experience in operations, sales, and client advisory, I’ve worked with leading MNCs like Genpact and Concentrix. At Genpact, I managed international projects, and at Concentrix, I served as a Senior Advisor for US/UK processes. Currently, I’m working with Thirdeye – The digital skills powerhouse, focused on driving growth of students.",
  },
  {
    id: 13,
    name: "Rishika Raj",
    role: "Senior Career Counsellor",
    category: "CAREER ADVISOR",
    image: rishikaRajImg,
    description:
      "Rishika Raj is an B.A. Graduate from Jaipur, With over 3.5 years of experience international clients handeling in Qdegrees, teleperformance and CarDekho. specializing in: Customer Support, Tele Sales, Customer Experience, Feedback Management. She is Dedicated professional and has a enthusiastic personality In Thirdeye she helps & guides students to choose correct pathway to build their career.",
  },
  {
    id: 14,
    name: "ishika jain",
    role: "Senior Career Counsellor",
    category: "CAREER ADVISOR",
    image: ishikaJainImg,
    description:
      "Ishika Jain holds a BBA, M.Com (HRM), and an MBA, and brings over five years of teaching experience at both domestic and international levels. She is passionate about guiding students through their academic journey with clarity and confidence. Her teaching approach focuses not only on building strong subject knowledge but also on developing the skills and self-assurance students need to succeed in their future careers.",
  },
  {
    id: 15,
    name: "Diya Saini",
    role: "Senior bRANCH MANAGER",
    category: "BRANCH LEAD",
    image: diyaSainiImg,
    description:
      "With over 4 years of experience in education, I have guided students in English to enhance their communication and academic skills. I also worked as an E-commerce Executive in the Amazon Advertisement Department at Jaipur Global Services, gaining expertise in digital operations. Currently, I serve as a Counsellor at Thirdeye Computer Classes, helping students choose the right career-oriented courses for a successful future.",
  },
  {
    id: 16,
    name: "Sheetanshu Saxena",
    role: "Digital Marketing Executive",
    category: "MARKETING",
    image: sheetanshuSaxenaImg,
    description:
      "With a passion for creativity and data-driven strategy, Sheetanshu manages the digital presence of Thirdeye Computer Classes. From running impactful ad campaigns to optimizing online visibility, he ensures that Thirdeye stays ahead in the digital space. His innovative approach and keen eye for trends help connect students with the right opportunities and courses.",
  },
  {
    id: 17,
    name: "Mohit Sharma",
    role: "ADMIN MANAGER",
    category: "ANIMATION & VFX",
    image: mohitSharmaImg,
    description:
      "A creative and passionate Animation & VFX Faculty with expertise in 2D & 3D Animation, Motion Graphics, and Visual Effects. With strong industry knowledge and hands-on software skills, they focus on practical learning and portfolio development. At ThirdEye Computer Classes, they train and mentor students to build successful careers in the animation and media industry.",
  },
  {
    id: 18,
    name: "Rahul Verma",
    role: "Designing Executive",
    category: "DESIGN FACULTY",
    image: "",
    description:
      "Rahul is a creative Designing Executive with expertise in graphic design, branding, and visual content creation. With strong knowledge of modern design tools and trends, he develops impactful creatives for digital and print media. At ThirdEye Computer Classes, he contributes by creating engaging designs and supporting the institute’s branding and promotional activities.",
  },
  {
    id: 19,
    name: "Harshita jain",
    role: "Senior Career Counsellor",
    category: "TECH COUNSELLOR",
    image: "",
    description:
      "I am a B.Tech graduate in Computer Science & Engineering with a strong foundation in both technology and education. I have experience in web development, software training, and student counseling, which helps me bridge technical knowledge with student needs. Currently, I am working as Branch Manager and Academic Counsellor, where I guide students in choosing the right career path and support their overall learning. I am dedicated to mentoring and helping students build a successful future in the IT field.",
  },
  {
    id: 20,
    name: "rohit bairwa",
    role: "Senior Career Counsellor",
    category: "CAREER ADVISOR",
    image: "",
    description:
      "Rohit Bairwa is a dedicated academic counselor who helps students plan their IT careers with clarity and confidence. Known for his detail-oriented approach, Rohit guides learners to align their goals with current industry trends. His personalized support ensures that every student makes informed and confident career decisions.",
  },
  {
    id: 21,
    name: "Pankaj sharma",
    role: "Senior Career Counsellor",
    category: "AI & ML MENTOR",
    image: "",
    description:
      "Pankaj holds a BBA from Jai Narain Vyas University and an MCA in AI & ML from Amity University, Noida. He guides students in choosing the right career path with practical, industry-focused advice and personalized support.",
  },
];


// Dynamic Typewriter words
const ROTATING_WORDS = [
  "opportunities...",
  "innovation...",
  "growth...",
  "mentorship...",
  "tech careers...",
  "leadership...",
];

// Mentorship & Learning Workflow Steps
const learningSteps = [
  {
    id: "01",
    step: "KICK OFF",
    title: "COUNSELING & ORIENTATION",
    desc: "Meet academic advisors to assess your strengths, identify ideal career trajectories, and choose your specialization.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="42" fill="#000" stroke="#000" strokeWidth="3" />
        <path d="M35 50L45 60L65 40" stroke="#ffd300" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="70" cy="30" r="10" fill="#ffd300" />
      </svg>
    ),
  },
  {
    id: "02",
    step: "CURRICULUM",
    title: "FOUNDATIONAL ROADMAP",
    desc: "Build rock-solid software and development fundamentals through structured daily theory, syntax drills, and logic design.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="18" width="60" height="64" rx="8" fill="#000" />
        <path d="M32 36H68M32 48H68M32 60H54" stroke="#ffd300" strokeWidth="5" strokeLinecap="round" />
        <path d="M62 62L76 76" stroke="#000" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "03",
    step: "DESIGN LAB",
    title: "LIVE ASSET CRAFTING",
    desc: "Produce industrial-grade assets, animations, and web prototypes. Learn the software suites used in modern creative agencies.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="24" width="56" height="44" rx="6" fill="#000" />
        <path d="M22 56L40 40L54 54L64 44L78 58" stroke="#ffd300" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="36" cy="38" r="4" fill="#ffd300" />
        <path d="M42 74L58 74" stroke="#000" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "04",
    step: "PROTOTYPING",
    title: "PRACTICAL LABS & SPRINT",
    desc: "Convert conceptual knowledge into functional projects. Build live client campaigns, full web apps, and VFX motion clips.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="22" width="56" height="56" rx="10" fill="#000" />
        <path d="M38 34L50 50L62 34M50 50V68" stroke="#ffd300" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="30" stroke="#000" strokeWidth="3" strokeDasharray="6 6" />
      </svg>
    ),
  },
  {
    id: "05",
    step: "EVALUATION",
    title: "1-ON-1 MENTOR REVIEWS",
    desc: "Direct reviews from senior faculty. Receive line-by-line feedback on code, rendering fidelity, and design principles.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="#000" />
        <path d="M34 50C34 40 40 32 50 32C60 32 66 40 66 50C66 60 56 68 50 68" stroke="#ffd300" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="74" r="3" fill="#ffd300" />
      </svg>
    ),
  },
  {
    id: "06",
    step: "PLACEMENT",
    title: "INTERVIEW & ONBOARDING",
    desc: "Mock appraisal rounds, resume tailoring, and campus hiring drives connecting you directly with corporate partners.",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="40" r="40" fill="#000" />
        <path d="M32 50L44 62L68 38" stroke="#ffd300" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 18V26M50 74V82M18 50H26M74 50H82" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── OPTIMIZED HERO TYPEWRITER (ISOLATES FREQUENT STATE UPDATES) ───
const RotatingTypewriter = React.memo(function RotatingTypewriter() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let pauseTimer = null;
    const currentWord = ROTATING_WORDS[currentWordIndex];
    const typingSpeed = isDeleting ? 45 : 95;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        if (displayedText === currentWord) {
          pauseTimer = setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }
      }
    }, typingSpeed);

    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <span className="rotating-text-wrapper">
      {displayedText}
      <span className="typing-cursor">|</span>
    </span>
  );
});

// ─── ZERO-LAYOUT-SHIFT SCRAMBLETEXT ENGINE ───
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*?/";

function ScrambleText({ text, trigger }) {
  const [displayed, setDisplayed] = useState(text);

  useEffect(() => {
    let frameId;
    let start = null;
    const duration = 1200;
    const len = text.length;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const revealed = Math.floor(progress * len);

      let result = "";
      for (let i = 0; i < len; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i < revealed) {
          result += text[i];
        } else {
          result +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      setDisplayed(result);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [text, trigger]);

  return (
    <span className="scramble-container-lock">
      <span className="scramble-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="scramble-visible">{displayed}</span>
    </span>
  );
}

// ─── ISOLATED SCRAMBLE HERO SECTION (PREVENTS GLOBAL RE-RENDERS) ───
const ScrambleHeroSection = React.memo(function ScrambleHeroSection() {
  const [scrambleTrigger, setScrambleTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrambleTrigger((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="gsap-scramble-hero">
      <div className="gsap-scramble-inner">
        <div
          className="gsap-headline-wrapper"
          onClick={() => setScrambleTrigger((p) => p + 1)}
          title="Click to scramble"
        >
          <h2 className="gsap-headline">
            <ScrambleText
              text="Arise, awake and do not stop until the goal is reached."
              trigger={scrambleTrigger}
            />
          </h2>
        </div>
      </div>
    </section>
  );
});

// ─── NOTH.IN LIQUID MERCURY / CHROME MORPHING SHADER ───
function LiquidChromeBlob() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      float map(vec3 p) {
        vec3 p1 = p + vec3(sin(u_time * 0.9) * 0.35, cos(u_time * 0.7) * 0.25, 0.0);
        float d1 = length(p1) - 0.75;
        
        vec3 p2 = p + vec3(cos(u_time * 1.1) * 0.45, sin(u_time * 1.3) * 0.35, sin(u_time * 0.5) * 0.2);
        float d2 = length(p2) - 0.55;

        vec3 p3 = p + vec3(sin(u_time * 0.6) * 0.5, -cos(u_time * 0.8) * 0.4, 0.0);
        float d3 = length(p3) - 0.48;

        vec3 mouseOffset = vec3((u_mouse.x - 0.5) * 1.4, -(u_mouse.y - 0.5) * 1.2, 0.2);
        float dMouse = length(p - mouseOffset) - 0.38;

        float blob = smin(d1, d2, 0.35);
        blob = smin(blob, d3, 0.3);
        blob = smin(blob, dMouse, 0.4);

        blob += sin(p.x * 6.0 + u_time * 2.0) * sin(p.y * 6.0 + u_time * 2.0) * 0.04;
        return blob;
      }

      vec3 calcNormal(vec3 p) {
        float eps = 0.005;
        return normalize(vec3(
          map(p + vec2(eps, 0.0).xyy) - map(p - vec2(eps, 0.0).xyy),
          map(p + vec2(eps, 0.0).yxy) - map(p - vec2(eps, 0.0).yxy),
          map(p + vec2(eps, 0.0).yyx) - map(p - vec2(eps, 0.0).yyx)
        ));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
        vec3 ro = vec3(0.0, 0.0, 2.5);
        vec3 rd = normalize(vec3(uv, -1.2));

        float t = 0.0;
        for (int i = 0; i < 50; i++) {
          vec3 p = ro + rd * t;
          float d = map(p);
          if (d < 0.003 || t > 5.0) break;
          t += d;
        }

        if (t < 5.0) {
          vec3 p = ro + rd * t;
          vec3 n = calcNormal(p);
          vec3 ref = reflect(rd, n);

          float fresnel = pow(1.0 + dot(rd, n), 3.0);
          float spec = pow(max(dot(ref, normalize(vec3(0.8, 1.0, 0.5))), 0.0), 32.0);
          float spec2 = pow(max(dot(ref, normalize(vec3(-0.8, -0.6, 0.8))), 0.0), 16.0);

          vec3 chrome = vec3(0.1, 0.1, 0.1) + vec3(0.95) * (spec * 1.5 + spec2 * 0.8) + fresnel * vec3(0.85);
          gl_FragColor = vec4(chrome, 0.92);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");

    let mouse = [0.5, 0.5];
    let rect = canvas.getBoundingClientRect();

    const updateRect = () => {
      if (canvas) rect = canvas.getBoundingClientRect();
    };

    const onMove = (e) => {
      if (!rect.width || !rect.height) {
        rect = canvas.getBoundingClientRect();
      }
      mouse = [
        (e.clientX - rect.left) / (rect.width || 1),
        (e.clientY - rect.top) / (rect.height || 1),
      ];
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    let isVisible = true;
    let animationId;

    // Pause WebGL rendering when canvas is outside viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = (time) => {
      if (isVisible) {
        if (
          canvas.width !== canvas.clientWidth ||
          canvas.height !== canvas.clientHeight
        ) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
          rect = canvas.getBoundingClientRect();
        }

        gl.uniform2f(uResLoc, canvas.width, canvas.height);
        gl.uniform1f(uTimeLoc, time * 0.001);
        gl.uniform2f(uMouseLoc, mouse[0], mouse[1]);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", updateRect);
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="nothin-chrome-canvas" />;
}

export default function OurTeam() {
  const [mentorsList, setMentorsList] = useState(mentors);

  // Dynamic team photos managed via Admin Panel
  useEffect(() => {
    fetchMedia({ page: "team", type: "image" })
      .then((data) => {
        if (!data || data.length === 0) return;
        const slotMap = {};
        data.forEach((slot) => {
          if (slot.slotKey?.startsWith("team_member_") && slot.url) {
            const num = parseInt(slot.slotKey.replace("team_member_", ""), 10);
            if (!isNaN(num)) {
              slotMap[num] = slot.url;
            }
          }
        });

        setMentorsList((prev) =>
          prev.map((m, idx) => {
            const memberId = m.id || idx + 1;
            if (slotMap[memberId]) {
              return {
                ...m,
                image: slotMap[memberId],
              };
            }
            return m;
          })
        );
      })
      .catch(() => {});
  }, []);

  const foundersList = useMemo(
    () => [
      { ...mentorsList[3], originalIndex: 3 },
      { ...mentorsList[0], originalIndex: 0 },
      { ...mentorsList[1], originalIndex: 1 },
      { ...mentorsList[2], originalIndex: 2 },
    ],
    [mentorsList]
  );

  const departmentList = useMemo(
    () => [
      { ...mentorsList[4], originalIndex: 4 },
      { ...mentorsList[5], originalIndex: 5 },
      { ...mentorsList[6], originalIndex: 6 },
      { ...mentorsList[7], originalIndex: 7 },
    ],
    [mentorsList]
  );

  const facultiesList = useMemo(
    () =>
      mentorsList.slice(8).map((m, idx) => ({
        ...m,
        originalIndex: 8 + idx,
      })),
    [mentorsList]
  );
  const haloRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!haloRef.current) return;
    const x = Math.round((e.clientX / window.innerWidth) * 100);
    const y = Math.round((e.clientY / window.innerHeight) * 100);
    haloRef.current.style.left = `${x}%`;
    haloRef.current.style.top = `${y}%`;
  }, []);

  const scrollToCarousel = useCallback(() => {
    const el = document.getElementById("leadership-teams-section");
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  
  return (
    <div className="team-page-wrapper" onMouseMove={handleMouseMove}>
      {/* Dynamic Ambient Background Effects from Student Feedback */}
      <div className="team-ambient-fx" aria-hidden="true">
        {/* Interactive Mouse Spotlight Halo */}
        <div
          ref={haloRef}
          className="team-spotlight-halo"
          style={{
            left: "50%",
            top: "30%",
          }}
        />

        {/* Floating Ambient Glowing Light Blobs */}
        <div className="team-glow-blob team-glow-blob-1" />
        <div className="team-glow-blob team-glow-blob-2" />
        <div className="team-glow-blob team-glow-blob-3" />
      </div>

      {/* ─── 1. HERO SECTION ─── */}
      <section className="team-hero-section">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to the new world of <RotatingTypewriter />
            </h1>

            <p className="hero-subtitle">
              Take a quick tour to explore our team & mentors...
            </p>

            <div className="hero-buttons">
              <button
                type="button"
                className="hero-btn hero-btn-primary"
                onClick={scrollToCarousel}
              >
                Let's Go!
              </button>
              <button
                type="button"
                className="hero-btn hero-btn-secondary"
                onClick={scrollToCarousel}
              >
                Skip Tour
              </button>
            </div>
          </div>

          <div className="hero-graphic" aria-hidden="true">
            <svg
              viewBox="0 0 450 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 320 L370 50 L420 300 Z"
                stroke="#111111"
                strokeWidth="7"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <path
                d="M170 210 L370 50"
                stroke="#111111"
                strokeWidth="5"
                opacity="0.4"
              />
              <path
                d="M370 50 L430 185"
                stroke="#111111"
                strokeWidth="4"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
      </section>

      

      {/* ─── 3. THREE 3D REVOLVING STACKS ─── */}
      <section className="three-stacks-section" id="leadership-teams-section">
        <div className="stacks-section-header">
          <h2>Explore Our Leadership & Teams</h2>
        </div>

        <div className="three-stacks-grid">
          {/* Stack 1: The Founders */}
          <div className="stack-column">
            <div className="stack-title-box">
              <span className="stack-num">01</span>
              <h3>The Founders</h3>
            </div>
            <div className="card-swap-stage-wrapper">
              <CardSwap
                items={foundersList}
                delay={3800}
                width={280}
                height={400}
                cardDistance={24}
                verticalDistance={25}
                depth={50}
                skewAmount={2.5}
                visibleCards={4}
                pauseOnHover={true}
              />
            </div>
          </div>

          {/* Stack 2: The Department Ones */}
          <div className="stack-column">
            <div className="stack-title-box">
              <span className="stack-num">02</span>
              <h3>The Department Ones</h3>
            </div>
            <div className="card-swap-stage-wrapper">
              <CardSwap
                items={departmentList}
                delay={4300}
                width={280}
                height={400}
                cardDistance={24}
                verticalDistance={25}
                depth={50}
                skewAmount={2.5}
                visibleCards={4}
                pauseOnHover={true}
              />
            </div>
          </div>

          {/* Stack 3: The Faculties */}
          <div className="stack-column">
            <div className="stack-title-box">
              <span className="stack-num">03</span>
              <h3>The Faculties</h3>
            </div>
            <div className="card-swap-stage-wrapper">
              <CardSwap
                items={facultiesList}
                delay={4800}
                width={280}
                height={400}
                cardDistance={24}
                verticalDistance={25}
                depth={50}
                skewAmount={2.5}
                visibleCards={4}
                pauseOnHover={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. SCRAMBLE TEXT HEADLINE (WITH EXPANDED SPACING) ─── */}
      <ScrambleHeroSection />

      {/* ─── 5. MENTORSHIP JOURNEY WORKFLOW (ADAPTED FROM REFERENCE) ─── */}
      <section className="workflow-steps-section">
        <div className="workflow-inner">
          <div className="workflow-header">
            <div className="workflow-eyebrow">OUR LEARNING BLUEPRINT</div>
            <h2>How Our Mentors Guide You From Day One</h2>
            <p>
              A proven, production-tested roadmap taking students from zero
              knowledge to confident tech leaders.
            </p>
          </div>

          <div className="workflow-grid">
            {learningSteps.map((item, idx) => (
              <div key={idx} className="workflow-card">
                <div className="workflow-icon-box">{item.icon}</div>
                <div className="workflow-step-badge">{item.step}</div>
                <h3 className="workflow-step-title">{item.title}</h3>
                <p className="workflow-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. NOTH.IN LIQUID MERCURY / CHROME MENTORSHIP HERO ─── */}
      <section className="nothin-mentorship-section">
        <div className="nothin-inner">
          <div className="nothin-tagline-bar">
            <span>( THE THIRDEYE DIFFERENCE )</span>
            <span>BECAUSE MENTORSHIP IS EVERYTHIN'</span>
          </div>

          <div className="nothin-stage-wrapper">
            <h1 className="nothin-giant-title">MENTORSHIP</h1>
            <LiquidChromeBlob />
          </div>

          <div className="nothin-content-grid">
            <div className="nothin-column nothin-col-left">
              <p className="nothin-statement">
                Most institutes produce students. <br />
                We build practitioners.
              </p>
            </div>

            <div className="nothin-column nothin-col-mid">
              <p className="nothin-body-text">
                In an era of generic online tutorials, the truly rare advantage
                is <strong> personal direction</strong>. Code with precision,
                master production tools, and navigate real industry challenges
                with leaders who have already walked the path.
              </p>
            </div>

            <div className="nothin-column nothin-col-right">
              <div className="nothin-jump-action" onClick={scrollToCarousel}>
                <span className="nothin-circle-arrow">↗</span>
                <span className="nothin-action-text">EXPLORE THE ROSTER</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}