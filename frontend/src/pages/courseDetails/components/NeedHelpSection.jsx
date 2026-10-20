import { ArrowUpRight } from "lucide-react";
import { useEnquiry } from "../../../context/EnquiryContext";
import Ballpit from "./Ballpit";
import "./NeedHelpSection.css";

const BALLPIT_COLORS = ["#f1c025", "#cfab3b", "#a98d17"];

export default function NeedHelpSection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="need-help-section" id="contact">
      <div className="need-help-container">
        <div className="help-card">
          <div className="help-content">
            <span className="help-eyebrow">Need Help?</span>
            <h2>Need Help?</h2>
            <p>
              Connect with us & know what's the best course curriculum and career pathway for you.
            </p>
            <div className="help-btn-wrap">
              <button
                type="button"
                className="help-button"
                onClick={() =>
                  openEnquiry({
                    course: "Career Counseling",
                    sourcePage: "Course Details - Need Help Section",
                  })
                }
              >
                <span>Connect With Us</span>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="ball-pit">
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <Ballpit
                count={75}
                gravity={0.5}
                friction={0.9975}
                wallBounce={0.95}
                followCursor
                colors={BALLPIT_COLORS}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
