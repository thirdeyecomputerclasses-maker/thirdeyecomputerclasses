import React, { memo, useCallback, useState, useEffect } from 'react';
import './Memories.css';
import FlexCarousel from './components/FlexCarousel';
import InfiniteSpiral from './components/InfiniteSpiral';
import StrokeText from './components/StrokeText';
import { fetchMedia } from '../../services/mediaApi';

// Local assets for mask & campus memories
import classroomPanoramic from '../../assets/classroom_panoramic.png';
import teamPhoto from '../../assets/team_photo.webp';

// Sample students from assets
import student1 from '../../assets/students/student_1.jpg';
import student2 from '../../assets/students/student_2.jpg';
import student3 from '../../assets/students/student_3.jpg';
import student4 from '../../assets/students/student_4.jpg';
import student5 from '../../assets/students/student_5.jpg';
import student6 from '../../assets/students/student_6.jpg';

const eventPhoto = (id) => `https://images.unsplash.com/${id}?w=900&q=75&auto=format&fit=crop`;
const spiralPhoto = (id) => `https://images.unsplash.com/${id}?w=360&q=75&auto=format&fit=crop`;

const EVENT_IMAGES = [
  {
    src: eventPhoto('photo-1540575467063-178a50c2df87'),
    alt: 'Tech Summit & Hackathon at Third Eye',
    title: 'Annual Tech Hackathon',
    subtitle: '24-hour sprint of coding, design & innovative solutions'
  },
  {
    src: eventPhoto('photo-1511578314322-379afb476865'),
    alt: 'Campus Tech Conference & Seminars',
    title: 'National Tech Conclave',
    subtitle: 'Keynote speakers, industry trends & visionary leaders'
  },
  {
    src: eventPhoto('photo-1523580494863-6f3031224c94'),
    alt: 'College Cultural Fest & Musical Evening',
    title: 'Euphoria Cultural Fest',
    subtitle: 'Celebrating artistic expression, music & campus spirit'
  },
  {
    src: eventPhoto('photo-1515187029135-18ee286d815b'),
    alt: '3D CAD & Animation Expo',
    title: 'CAD & Visual Arts Expo',
    subtitle: 'Showcasing 3D modeling, rendering & digital art portfolios'
  },
  {
    src: eventPhoto('photo-1531482615713-2afd69097998'),
    alt: 'Interactive Coding & Robotics Workshop',
    title: 'Robotics & AI Workshop',
    subtitle: 'Hands-on microcontrollers, sensors & robotic builds'
  },
  {
    src: eventPhoto('photo-1524178232363-1fb2b075b655'),
    alt: 'Mentorship & Career Strategy Masterclass',
    title: 'Career & Industry Summit',
    subtitle: 'Direct interaction with hiring managers & alumni mentors'
  },
  {
    src: eventPhoto('photo-1475721027785-f74eccf877e2'),
    alt: 'Software Bootcamp Project Presentations',
    title: 'Project Demo Day',
    subtitle: 'Live project pitches, peer reviews & certificate distribution'
  }
];

// -------------------------------------------------------------
// SECTION 3: EXACT 28 CELEBRATION IMAGES FOR INFINITE SPIRAL
// -------------------------------------------------------------
const CELEBRATION_IMAGES = [
  // 1 - 7: Turn 1 (Milestones & Graduations)
  { id: 1, src: spiralPhoto('photo-1523050854058-8df90110c9f1'), alt: 'Graduation Hat Toss', label: 'Graduation Ceremony' },
  { id: 2, src: spiralPhoto('photo-1517457373958-b7bdd4587205'), alt: 'Confetti Bash', label: 'Victory Bash' },
  { id: 3, src: student1, alt: 'Student Achievement', label: 'Student Honor' },
  { id: 4, src: spiralPhoto('photo-1511795409834-ef04bbd61622'), alt: 'Annual Gala Night', label: 'Annual Gala' },
  { id: 5, src: spiralPhoto('photo-1492684223066-81342ee5ff30'), alt: 'Lighting Celebration', label: 'Festival of Lights' },
  { id: 6, src: student2, alt: 'Course Completion Smile', label: 'Milestone Day' },
  { id: 7, src: spiralPhoto('photo-1464366400600-7168b8af9bc3'), alt: 'Champagne & Cheers', label: 'Faculty Cheers' },

  // 8 - 14: Turn 2 (Awards, Competitions & Parties)
  { id: 8, src: spiralPhoto('photo-1516450360452-9312f5e86fc7'), alt: 'Dance & Music Fest', label: 'Festive Vibes' },
  { id: 9, src: student3, alt: 'Top Performer Award', label: 'Top Performer' },
  { id: 10, src: spiralPhoto('photo-1530103862676-de8c9debad1d'), alt: 'Colorful Balloons', label: 'Foundation Day' },
  { id: 11, src: teamPhoto, alt: 'Entire Third Eye Team', label: 'Team Reunion' },
  { id: 12, src: spiralPhoto('photo-1514525253161-7a46d19cd819'), alt: 'Stage Performance', label: 'Annual Night' },
  { id: 13, src: student4, alt: 'Certification Joy', label: 'Certified Star' },
  { id: 14, src: spiralPhoto('photo-1519751138087-5bf79df62d5b'), alt: 'Cake Cutting Joy', label: 'Birthday & Cake' },

  // 15 - 21: Turn 3 (Festivals, Victories & Memories)
  { id: 15, src: spiralPhoto('photo-1533174072545-7a4b6ad7a6c3'), alt: 'Sparklers & Cheer', label: 'Sparkle Moment' },
  { id: 16, src: student5, alt: 'Placement Celebration', label: 'Job Placed!' },
  { id: 17, src: spiralPhoto('photo-1527529482837-4698179dc6ce'), alt: 'High Five Cheer', label: 'Hackathon Win' },
  { id: 18, src: spiralPhoto('photo-1576267423445-b2e0074d68a4'), alt: 'Golden Confetti Shower', label: 'Grand Finale' },
  { id: 19, src: student6, alt: 'Innovation Trophy', label: 'Trophy Winner' },
  { id: 20, src: spiralPhoto('photo-1528605248644-14dd04022da1'), alt: 'Outdoor Campus Picnic', label: 'Campus Picnic' },
  { id: 21, src: spiralPhoto('photo-1470225620780-dba8ba36b745'), alt: 'Live DJ & Fest', label: 'Youth Beats' },

  // 22 - 28: Turn 4 (Farewells, Friendships & Alumni)
  { id: 22, src: spiralPhoto('photo-1513151233558-d860c5398176'), alt: 'New Year Celebrations', label: 'New Year Bash' },
  { id: 23, src: spiralPhoto('photo-1529156069898-49953e39b3ac'), alt: 'Group of Friends', label: 'Lifelong Friends' },
  { id: 24, src: spiralPhoto('photo-1509198397868-475647b2a1e5'), alt: 'Gaming Tournament Victory', label: 'E-Sports Win' },
  { id: 25, src: spiralPhoto('photo-1561489413-985b06da5bee'), alt: 'Farewell Banquet', label: 'Farewell Gala' },
  { id: 26, src: spiralPhoto('photo-1578328819058-b69f3a3b0f6b'), alt: 'Creative Art Festival', label: 'Creative Showcase' },
  { id: 27, src: spiralPhoto('photo-1496337589254-7e19d01cec44'), alt: 'Concert Lighting', label: 'Spotlight Star' },
  { id: 28, src: spiralPhoto('photo-1505373877841-8d25f7d46678'), alt: 'Graduation Stage Cap Toss', label: 'Convocation Day' }
];

function Memories() {
  const [eventImages, setEventImages] = useState(EVENT_IMAGES);
  const [panoramicBg, setPanoramicBg] = useState(classroomPanoramic);

  useEffect(() => {
    fetchMedia({ page: "memories", type: "image" })
      .then((data) => {
        if (!data || data.length === 0) return;
        const panoSlot = data.find((s) => s.slotKey === "memories_panoramic");
        if (panoSlot?.url) setPanoramicBg(panoSlot.url);

        const slotMap = {
          memories_hackathon: 0,
          memories_conclave: 1,
          memories_cultural: 2,
          memories_expo: 3,
          memories_robotics: 4,
          memories_career: 5,
          memories_demoday: 6,
        };

        setEventImages((prev) =>
          prev.map((item, idx) => {
            const foundSlot = data.find((s) => slotMap[s.slotKey] === idx);
            if (foundSlot?.url) {
              return {
                ...item,
                src: foundSlot.url,
              };
            }
            return item;
          })
        );
      })
      .catch(() => {});
  }, []);

  const scrollToEvents = useCallback(() => {
    const el = document.getElementById('events-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="sweet-memories-page w-full min-h-screen bg-[#0b0c10] text-white">
      {/* ========================================================
          SECTION 1: Yellow Background with Masked Heading
          ======================================================== */}
      <section className="sweet-memories-hero">
        <div className="max-w-6xl mx-auto px-4 z-10 flex flex-col items-center">
        
          {/* Masked Heading "SWEET MEMORIES" */}
          <h1
            className="sweet-memories-masked-text text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight"
            style={{
              backgroundImage: `url(${panoramicBg}), linear-gradient(135deg, #111111 0%, #333333 100%)`
            }}
          >
            SWEET MEMORIES
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-zinc-900 font-normal text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-center">
            Reliving the laughter, breakthroughs, campus workshops, and lifelong friendships created at Third Eye Computer Classes.
          </p>

          {/* Jump to Events Button */}
          <button
            onClick={scrollToEvents}
            className="sweet-memories-scroll-btn group"
            aria-label="Scroll to events section"
          >
            <span>Explore Events & Celebrations</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: Events Heading & Flex Carousel
          ======================================================== */}
      <section id="events-section" className="sweet-memories-section text-center">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="sweet-memories-pill">
            <span className="w-2 h-2 rounded-full bg-[#ffd300]" />
            Campus Highlights & Workshops
          </div>
          <h2 className="sweet-memories-section-title">
            EVENTS
          </h2>
        </div>

        {/* Flex Carousel Container */}
        <div className="flex-carousel-wrapper">
          <FlexCarousel
            items={eventImages}
            preset="liquid"
            intro="rise"
            squeeze={0.2}
            cardHeight={0.52}
            focusOnClick={true}
            autoplay={false}
          />
        </div>
      </section>

      {/* ========================================================
          SECTION 3: Celebration Heading & Infinite Spiral (28 Images)
          ======================================================== */}
      <section className="sweet-memories-section-alt text-center">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="sweet-memories-pill">
            <span className="w-2 h-2 rounded-full bg-[#ffd300]" />
            Joy & Milestone Memories
          </div>
          <h2 className="sweet-memories-section-title">
            CELEBRATION
          </h2>
        </div>

        {/* Infinite Spiral Container */}
        <div className="infinite-spiral-wrapper">
          <InfiniteSpiral
            items={CELEBRATION_IMAGES}
            speed={0.55}
            direction="up"
            animationMode="auto"
            radius={180}
            cardWidth={120}
            cardHeight={120}
            verticalSpacing={65}
            perspective={1000}
            cardsPerTurn={7}
            centerScale={1.25}
            pauseOnHover={false}
            imageFit="cover"
            edgeBlur={2}
          />
        </div>
      </section>

      {/* ========================================================
          SECTION 4: Memories Stroke Text Section
          ======================================================== */}
      <section className="stroke-text-section text-center">
        <div className="max-w-5xl mx-auto px-4">

          <div className="stroke-text-wrapper my-4">
            <StrokeText
              text="MEMORIES"
              strokeColor="#ffd300"
              fillColor="#ffffff"
              strokeWidth={1.8}
              drawDuration={1.8}
              fillDelay={0.3}
              trigger="scroll"
              fillMode="wipe"
              fontSize={140}
              fontWeight={900}
              letterSpacing={-2}
              className="w-full"
            />
          </div>

          <p className="stroke-watermark-text mt-2">
            THIRD EYE
            </p>

          <p className="sweet-memories-section-subtitle mt-6 max-w-2xl mx-auto">
            Every breakthrough, late-night code review, mentor advice, and laughter shared here is etched into our history forever.
          </p>
        </div>
      </section>
    </div>
  );
}

export default memo(Memories);
