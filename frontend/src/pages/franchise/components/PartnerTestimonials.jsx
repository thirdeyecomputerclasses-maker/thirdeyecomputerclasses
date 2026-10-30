import React, { useState, useEffect } from "react";
import "./PartnerTestimonials.css";
import { 
  Quote, 
  Star, 
  MapPin, 
  Sparkles, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { fetchMedia, getOptimizedImageUrl } from "../../../services/mediaApi";

// Real partner portrait photos (Cropped from original slides)
import defaultMayaImg from "../../../assets/franchise/partner_maya_sharma.png";
import defaultKapilImg from "../../../assets/franchise/partner_kapil_nitharwal.png";
import defaultRajImg from "../../../assets/franchise/partner_raj_gurjar.png";
import defaultKushalImg from "../../../assets/franchise/partner_kushal_avasthi.png";
import defaultVartikaImg from "../../../assets/franchise/partner_vartika_kumawat.png";
import defaultDiyaImg from "../../../assets/mentor_5.png";

export default function PartnerTestimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dynamicMedia, setDynamicMedia] = useState({});

  // Auto-fetch franchise owners: fetches both Franchise & Team page slots so double uploading is prohibited!
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetchMedia({ page: "franchise", type: "image" }).catch(() => []),
      fetchMedia({ page: "team", type: "image" }).catch(() => [])
    ])
      .then(([franchiseRes, teamRes]) => {
        if (!isMounted) return;
        const map = {};
        const franchiseList = Array.isArray(franchiseRes) ? franchiseRes : (franchiseRes?.data || franchiseRes?.media || []);
        const teamList = Array.isArray(teamRes) ? teamRes : (teamRes?.data || teamRes?.media || []);
        
        [...franchiseList, ...teamList].forEach((item) => {
          if (item?.slotKey && item?.url) {
            // Prioritize custom uploads over defaults
            if (!map[item.slotKey] || !item.isDefault) {
              map[item.slotKey] = item.url;
            }
          }
        });
        setDynamicMedia(map);
      })
      .catch((err) => {
        console.warn("Could not load dynamic franchise partner images, using bundled assets.", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const testimonials = [
    {
      id: 0,
      slotKey: "franchise_partner_maya",
      name: "MAYA SHARMA",
      branch: "JAGATPURA BRANCH",
      fallback: defaultMayaImg,
      role: "Franchise Owner",
      quote: "I, Maya Sharma, the franchise owner of Thirdeye Computer Classes – Jagatpura Branch, am proud to share that our center is running highly successfully. With quality education, practical training, and modern facilities, we are committed to providing the best computer learning experience to every student."
    },
    {
      id: 1,
      slotKey: "franchise_partner_kapil",
      teamSlotKey: "team_member_8",
      name: "KAPIL NITHARWAL",
      branch: "VAISHALI NAGAR BRANCH",
      fallback: defaultKapilImg,
      role: "Franchise Owner",
      quote: "I am glad to share that I have taken the franchise of Thirdeye Computer Classes – Vaishali Branch, and our center is running successfully. With quality teaching, practical training, and modern facilities, we are committed to providing the best computer education to our students."
    },
    {
      id: 2,
      slotKey: "franchise_partner_diya",
      teamSlotKey: "team_member_9",
      name: "DIYA SAINI",
      branch: "SODALA BRANCH",
      fallback: defaultDiyaImg,
      role: "Franchise Owner",
      quote: "I, Diya Saini, the franchise owner of Thirdeye Computer Classes – Sodala Branch, am proud to be part of the Thirdeye network. With continuous curriculum support, advanced practical labs, and high student placement satisfaction, our center has grown rapidly."
    },
    {
      id: 3,
      slotKey: "franchise_partner_raj",
      teamSlotKey: "team_member_10",
      name: "RAJ GURJAR",
      branch: "JHOTWARA BRANCH",
      fallback: defaultRajImg,
      role: "Franchise Owner",
      quote: "I, Raj Gurjar, the franchise owner of Thirdeye Computer Classes – Jhotwara Branch, am pleased to share that our center is running successfully. With expert training, modern facilities, and a strong focus on practical learning, we are committed to offering the best computer education to our students."
    },
    {
      id: 4,
      slotKey: "franchise_partner_kushal",
      teamSlotKey: "team_member_11",
      name: "KUSHAL AVASTHI",
      branch: "GOPALPURA BRANCH",
      fallback: defaultKushalImg,
      role: "Franchise Owner",
      quote: "I, Kushal Avasthi, the franchise owner of Thirdeye Computer Classes – Gopalpura Branch, am proud to share that our center is running successfully. With quality teaching, practical training, and modern facilities, we are dedicated to providing the best computer education to our students."
    },
    {
      id: 5,
      slotKey: "franchise_partner_vartika",
      teamSlotKey: "team_member_12",
      name: "VARTIKA KUMAWAT",
      branch: "MANSAROVAR BRANCH",
      fallback: defaultVartikaImg,
      role: "Franchise Owner",
      quote: "I, Vartika, the franchise owner of Thirdeye Computer Classes – Mansarovar Branch, am delighted to share that our center is running successfully. With expert faculty, practical learning, and modern facilities, we are committed to providing high-quality computer education to all our students."
    }
  ];

  const resolvePartnerPhoto = (t) => {
    // Automatically use photo uploaded in Team page franchise owners stack if present
    const teamUrl = t.teamSlotKey ? dynamicMedia[t.teamSlotKey] : null;
    const franchiseUrl = dynamicMedia[t.slotKey];
    const rawUrl = teamUrl || franchiseUrl || t.fallback;
    return getOptimizedImageUrl(rawUrl, 380, 80);
  };

  const current = testimonials[activeIdx] || testimonials[0];
  const currentPhoto = resolvePartnerPhoto(current);

  return (
    <section className="testimonials-section" id="partner-testimonials">
      {/* Background ambient lighting */}
      <div className="testimonials-ambient-glow glow-left" />
      <div className="testimonials-ambient-glow glow-right" />

      <div className="testimonials-container">
        {/* Yellow Header Banner (Exact Match to User Slides 3 & 4) */}
        <div className="testimonials-hero-banner">
          <h2 className="testimonials-hero-title">
            SUCCESS BEGINS HERE – OUR PARTNER'S JOURNEY
          </h2>
        </div>

        <p className="testimonials-sub-lead">
          Verified center directors sharing their real experiences of running thriving, profitable Thirdeye franchises.
        </p>

        {/* ── Partner Journey Grid (Exact Match to User Slides 3 & 4) ── */}
        <div className="partner-journey-grid">
          {testimonials.map((t, idx) => {
            const photoUrl = resolvePartnerPhoto(t);
            const isSelected = idx === activeIdx;

            return (
              <div 
                key={t.id} 
                className={`partner-journey-card ${isSelected ? "card-highlighted" : ""}`}
                onClick={() => setActiveIdx(idx)}
              >
                {/* Yellow Circle Avatar Frame (Exact visual match from user slides) */}
                <div className="partner-yellow-circle-wrapper">
                  <div className="partner-yellow-circle">
                    <img 
                      src={photoUrl} 
                      alt={t.name} 
                      className="partner-circle-photo"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Partner Details */}
                <h3 className="partner-owner-name">{t.name}</h3>
                <h4 className="partner-branch-tag">{t.branch}</h4>
                <p className="partner-statement-text">"{t.quote}"</p>

                {/* Verification Badge */}
                <div className="partner-verified-pill">
                  <CheckCircle2 size={13} className="text-yellow-400" />
                  <span>Verified TECC Franchisee</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="testimonials-trust-footer">
          <div className="trust-footer-item">
            <span className="trust-item-val">100%</span>
            <span className="trust-item-lbl">Standardized System Support</span>
          </div>
          <div className="trust-footer-sep" />
          <div className="trust-footer-item">
            <span className="trust-item-val">15+</span>
            <span className="trust-item-lbl">Profitable Network Branches</span>
          </div>
          <div className="trust-footer-sep" />
          <div className="trust-footer-item">
            <span className="trust-item-val">5.0 ★</span>
            <span className="trust-item-lbl">Director Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
