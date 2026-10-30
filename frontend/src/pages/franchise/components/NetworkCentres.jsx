import React, { useState, useEffect } from "react";
import "./NetworkCentres.css";
import CircularCarousel from "../../../components/CircularCarousel";
import "../../../components/CircularCarousel.css";
import {
  Navigation,
  ArrowUpRight
} from "lucide-react";
import { fetchMedia } from "../../../services/mediaApi";

// Authentic ThirdEye Lab & Campus Visuals
import classroomPanoramic from "../../../assets/classroom_panoramic.png";
import classroomSliceLeft from "../../../assets/classroom_slice_left.webp";
import classroomSliceCenter from "../../../assets/classroom_slice_center.webp";
import classroomSliceRight from "../../../assets/classroom_slice_right.webp";

const DEFAULT_CENTRES = [
  {
    id: "mansarovar",
    num: "01",
    name: "Mansarovar",
    address: "84/57, Madhyam Marg, near by Indian Bank, Ward 27, Mansarovar Sector 8, Mansarovar, Jaipur, Rajasthan 302020",
    mapUrl: "https://maps.app.goo.gl/eim3KAKYhPyBF82i7",
    image: classroomPanoramic,
  },
  {
    id: "sodala",
    num: "02",
    name: "Sodala",
    address: "1st floor, D. P. Colony, Plot no.7, near Vivek Vihar Metro Station, Ganesh Nagar, Sodala, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302019",
    mapUrl: "https://maps.app.goo.gl/ewQmBEQnktW2qgmU7",
    image: classroomSliceLeft,
  },
  {
    id: "pratap-nagar",
    num: "03",
    name: "Pratap Nagar",
    address: "111, First, Haldi ghati Gate, 68, Coaching Hub Road, Sanganer, Pratap Nagar, Jaipur, Rajasthan 302033",
    mapUrl: "https://maps.app.goo.gl/6vB6EQBBpNWz5BvY7",
    image: classroomSliceCenter,
  },
  {
    id: "sanganer",
    num: "04",
    name: "Sanganer",
    address: "35, First Floor, Nagar Nigam Rd, above HDFC Bank, near Sanganer Stadium, Printers Colony, Dada Gurudev Nagar, Sanganer, Jaipur, Rajasthan 302029",
    mapUrl: "https://maps.app.goo.gl/V21L8Br2ZgBVgdB9A",
    image: classroomSliceRight,
  },
  {
    id: "vaishali-nagar",
    num: "05",
    name: "Vaishali Nagar",
    address: "Shop no. S1, 2nd Floor, Royal Plaza, opposite Gupta Stores, near Amrapali Circle, Sector 6, Vaishali Nagar, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302021",
    mapUrl: "https://maps.app.goo.gl/VbPm1bE9vTTDTs3x8",
    image: classroomPanoramic,
  },
  {
    id: "jagatpura",
    num: "06",
    name: "Jagatpura",
    address: "First Floor 137-138, C 07, near Akshay Patra, mahal yojana, Block B, Central Spine, Jagatpura, Jaipur, Rajasthan 302017",
    mapUrl: "https://maps.app.goo.gl/FFAoFPtLRuRdUc5R7",
    image: classroomSliceLeft,
  },
  {
    id: "vidhyadhar-nagar",
    num: "07",
    name: "Vidhyadhar Nagar",
    address: "First Floor, Dwarika Apartment, A-12, Sector 2 Rd, above Jaipur Kurti, Sector 2, Central Spine, Vidyadhar Nagar, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302039",
    mapUrl: "https://maps.app.goo.gl/KmZRtZo9TJyJSfSF7",
    image: classroomSliceCenter,
  },
  {
    id: "raja-park",
    num: "08",
    name: "Raja Park",
    address: "No.1, Plot No.189A, Fashion St, near Panchwati Circle, above Bandhan Bank, Raja Park, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302004",
    mapUrl: "https://maps.app.goo.gl/vnRksZ4ZdH7b69HP9",
    image: classroomSliceRight,
  },
  {
    id: "gopalpura",
    num: "09",
    name: "Gopalpura",
    address: "First Floor, Basant Bahar Colony, 30, Gopalpura Bypass Rd, near Cake World, opposite Bhandari Hospital & Research Centre, Muktanand Nagar, Gopal Pura Mode, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302018",
    mapUrl: "https://maps.app.goo.gl/qNJur1SX36cLo7z37",
    image: classroomPanoramic,
  },
  {
    id: "jhotwara",
    num: "10",
    name: "Jhotwara",
    address: "First Floor, Thirdeye Computer Classes, 93, Kalwar Rd, opposite Hotel Regenta Central, Raghunath Puri, Jagannath Puri, Jhotwara, Jaipur, Jaipur Nagar Nigam Area, Rajasthan 302012",
    mapUrl: "https://maps.app.goo.gl/9TK52jEhAvqV7x136",
    image: classroomSliceLeft,
  },
];

export default function NetworkCentres() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [centres, setCentres] = useState(DEFAULT_CENTRES);

  // Dynamically load updated branch photos from ImageKit
  useEffect(() => {
    fetchMedia({ page: "franchise", type: "image" })
      .then((data) => {
        if (!data || data.length === 0) return;
        const branchMap = {};
        data.forEach((slot) => {
          if (slot.slotKey?.startsWith("franchise_branch_")) {
            const num = parseInt(slot.slotKey.replace("franchise_branch_", ""), 10);
            if (num >= 1 && num <= 10 && slot.url) {
              if (!slot.isDefault) { branchMap[num] = slot.url; }
            }
          }
        });

        setCentres((prev) =>
          prev.map((c, idx) => {
            const branchNum = idx + 1;
            if (branchMap[branchNum]) {
              return {
                ...c,
                image: branchMap[branchNum],
              };
            }
            return c;
          })
        );
      })
      .catch(() => {});
  }, []);

  const carouselItems = centres.map((centre) => ({
    src: centre.image,
    alt: `ThirdEye Computer Classes ${centre.name} Center`,
    title: centre.name,
    subtitle: centre.address
  }));

  const current = centres[activeIdx] || centres[0];

  return (
    <section className="network-centres-section" id="network-centres">
      {/* Dynamic Cyber Yellow Ambient Glows */}
      <div className="network-ambient-glow glow-top-left" />
      <div className="network-ambient-glow glow-bottom-right" />

      <div className="network-centres-container">
        {/* ── Section Heading (Exact Matching User Request) ── */}
        <div className="network-header-block">
          <h2 className="network-title">
            OUR 10 RUNNING CENTRES <span className="network-title-gold">ACROSS JAIPUR</span>
          </h2>
        </div>

        {/* ── 3D Circular Carousel ── */}
        <div className="carousel-stage-container">
          <div className="circular-carousel-wrapper">
            <CircularCarousel
              items={carouselItems}
              preset="cylinder"
              onChange={(idx) => setActiveIdx(idx)}
              cardWidth={380}
              aspectRatio={1.65}
              gap={28}
              tilt={-4}
              autoplay="drift"
              speed={12}
              intro="none"
              pauseOnHover={false}
              draggable={true}
              snap={false}
              depthFade={0.65}
              fadeColor="#000000"
              cornerRadius={16}
            />
          </div>
        </div>

        {/* ── Only Centre Name & Open on Map Button ── */}
        <div className="carousel-centre-bar-wrap">
          <div className="carousel-centre-bar">
            <span key={current.id} className="carousel-centre-name">
              {current.name}
            </span>
            <a
              href={current.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="carousel-open-map-btn"
              title={`Open ${current.name} Center on Google Maps`}
            >
              <Navigation size={14} className="map-btn-icon" />
              <span>Open on Map</span>
              <ArrowUpRight size={14} className="map-btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
