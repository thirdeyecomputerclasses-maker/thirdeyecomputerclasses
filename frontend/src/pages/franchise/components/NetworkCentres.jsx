import React, { useState, useEffect } from "react";
import "./NetworkCentres.css";
import CircularCarousel from "../../../components/CircularCarousel";
import "../../../components/CircularCarousel.css";
import {
  Navigation,
  ArrowUpRight
} from "lucide-react";
import { fetchMedia } from "../../../services/mediaApi";

// Authentic Third Eye Lab & Campus Visuals
import classroomPanoramic from "../../../assets/classroom_panoramic.png";
import classroomSliceLeft from "../../../assets/classroom_slice_left.webp";
import classroomSliceCenter from "../../../assets/classroom_slice_center.webp";
import classroomSliceRight from "../../../assets/classroom_slice_right.webp";

const DEFAULT_CENTRES = [
  {
    id: "mansarovar",
    num: "01",
    name: "Mansarovar",
    address: "Madhyam Marg, Mansarovar, Jaipur",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Mansarovar+Jaipur",
      image: classroomPanoramic
    },
    {
      id: "sodala",
      num: "02",
      name: "Sodala",
      address: "New Sanganer Road, Sodala, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Sodala+Jaipur",
      image: classroomSliceLeft
    },
    {
      id: "pratap-nagar",
      num: "03",
      name: "Pratap Nagar",
      address: "Sector 11, Kumbha Marg, Pratap Nagar, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Pratap+Nagar+Jaipur",
      image: classroomSliceCenter
    },
    {
      id: "sanganer",
      num: "04",
      name: "Sanganer",
      address: "Tonk Road, Near Sanganer Flyover, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Sanganer+Jaipur",
      image: classroomSliceRight
    },
    {
      id: "vaishali-nagar",
      num: "05",
      name: "Vaishali Nagar",
      address: "Amrapali Circle, Vaishali Nagar, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Vaishali+Nagar+Jaipur",
      image: classroomPanoramic
    },
    {
      id: "jagatpura",
      num: "06",
      name: "Jagatpura",
      address: "Near Mahal Road, Jagatpura, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Jagatpura+Jaipur",
      image: classroomSliceLeft
    },
    {
      id: "vidhyadhar-nagar",
      num: "07",
      name: "Vidhyadhar Nagar",
      address: "Sector 2, Vidhyadhar Nagar, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Vidhyadhar+Nagar+Jaipur",
      image: classroomSliceCenter
    },
    {
      id: "raja-park",
      num: "08",
      name: "Raja Park",
      address: "Lane 4, Commercial Complex, Raja Park, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Raja+Park+Jaipur",
      image: classroomSliceRight
    },
    {
      id: "gopalpura",
      num: "09",
      name: "Gopalpura",
      address: "Education Coaching Belt, Gopalpura Bypass, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Gopalpura+Jaipur",
      image: classroomPanoramic
    },
    {
      id: "jhotwara",
      num: "10",
      name: "Jhotwara",
      address: "Kalwar Road Junction, Jhotwara, Jaipur",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Third+Eye+Computer+Classes+Jhotwara+Jaipur",
      image: classroomSliceLeft
    }
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
              branchMap[num] = slot.url;
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
    alt: `Third Eye Computer Classes ${centre.name} Center`,
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
              cardWidth={290}
              aspectRatio={1.5}
              gap={26}
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
