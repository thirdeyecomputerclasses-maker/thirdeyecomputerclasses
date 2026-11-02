// Canonical Placed Students Data from Jobs & Placement Cell
// Synchronized with ImageKit Media slots (placement_student_1 .. 12)

import student1 from "../assets/students/student_1.jpg";
import student2 from "../assets/students/student_2.jpg";
import student3 from "../assets/students/student_3.jpg";
import student4 from "../assets/students/student_4.jpg";
import student5 from "../assets/students/student_5.jpg";
import student6 from "../assets/students/student_6.jpg";
import student7 from "../assets/students/student_7.jpg";
import student8 from "../assets/students/student_8.jpg";
import student9 from "../assets/students/student_9.jpg";
import student10 from "../assets/students/student_10.jpg";
import student11 from "../assets/students/student_11.jpg";
import student12 from "../assets/students/student_12.jpg";

export const PLACEMENT_STUDENTS = [
  {
    id: 1,
    slotKey: "placement_student_1",
    name: "Kirti Khandelwal",
    company: "Digital Gyan Technology",
    image: student1,
    fallbackImage: student1,
  },
  {
    id: 2,
    slotKey: "placement_student_2",
    name: "Kushal Avesthi",
    company: "Beyond Designer",
    image: student2,
    fallbackImage: student2,
  },
  {
    id: 3,
    slotKey: "placement_student_3",
    name: "Shubh Sharma",
    company: "Red Apple Media",
    image: student3,
    fallbackImage: student3,
  },
  {
    id: 4,
    slotKey: "placement_student_4",
    name: "Nisha Nama",
    company: "Vasco Teleradiology",
    image: student4,
    fallbackImage: student4,
  },
  {
    id: 5,
    slotKey: "placement_student_5",
    name: "Aman Pareek",
    company: "Technovate Labs",
    image: student5,
    fallbackImage: student5,
  },
  {
    id: 6,
    slotKey: "placement_student_6",
    name: "Priya Sharma",
    company: "PixelCraft Studios",
    image: student6,
    fallbackImage: student6,
  },
  {
    id: 7,
    slotKey: "placement_student_7",
    name: "Rohan Saini",
    company: "Apex Data Systems",
    image: student7,
    fallbackImage: student7,
  },
  {
    id: 8,
    slotKey: "placement_student_8",
    name: "Simran Kaur",
    company: "Infotech Global",
    image: student8,
    fallbackImage: student8,
  },
  {
    id: 9,
    slotKey: "placement_student_9",
    name: "Rahul Verma",
    company: "CyberTech Systems",
    image: student9,
    fallbackImage: student9,
  },
  {
    id: 10,
    slotKey: "placement_student_10",
    name: "Anjali Gupta",
    company: "WebVerse Media",
    image: student10,
    fallbackImage: student10,
  },
  {
    id: 11,
    slotKey: "placement_student_11",
    name: "Vikas Meena",
    company: "CloudOps Global",
    image: student11,
    fallbackImage: student11,
  },
  {
    id: 12,
    slotKey: "placement_student_12",
    name: "Pooja Choudhary",
    company: "NextGen Studio",
    image: student12,
    fallbackImage: student12,
  },
];

/**
 * Parses placement title string into { name, company }
 * Supports:
 * - "Placed Student #1 — Kirti Khandelwal (Digital Gyan)"
 * - "Kirti Khandelwal - Placed at Digital Gyan Technology"
 * - "Kirti Khandelwal - Digital Gyan Technology"
 */
export const parsePlacementTitle = (title) => {
  if (!title || typeof title !== "string") return null;

  // Format 1: "Placed Student #1 — Kirti Khandelwal (Digital Gyan)"
  const emDashMatch = title.match(/—\s*([^(]+?)\s*(?:\(([^)]+)\))?$/);
  if (emDashMatch) {
    return {
      name: emDashMatch[1].trim(),
      company: emDashMatch[2] ? emDashMatch[2].trim() : null,
    };
  }

  // Format 2: "Kirti Khandelwal - Placed at Digital Gyan Technology"
  const placedAtMatch = title.match(/^(.+?)\s*-\s*Placed at\s*(.+)$/i);
  if (placedAtMatch) {
    return {
      name: placedAtMatch[1].trim(),
      company: placedAtMatch[2].trim(),
    };
  }

  // Format 3: "Kirti Khandelwal - Digital Gyan Technology"
  const dashMatch = title.match(/^(.+?)\s*-\s*(.+)$/);
  if (dashMatch) {
    return {
      name: dashMatch[1].trim(),
      company: dashMatch[2].trim(),
    };
  }

  return { name: title.trim(), company: null };
};

/**
 * Merges base student records with dynamic media fetched from MongoDB/ImageKit
 */
export const mergePlacementMedia = (baseStudents, mediaSlots) => {
  if (!Array.isArray(mediaSlots) || mediaSlots.length === 0) return baseStudents;

  const slotMap = new Map();
  mediaSlots.forEach((slot) => {
    if (slot.slotKey?.startsWith("placement_student_")) {
      const num = parseInt(slot.slotKey.replace("placement_student_", ""), 10);
      if (!isNaN(num)) {
        slotMap.set(num, slot);
      }
    }
  });

  return baseStudents.map((st) => {
    const slot = slotMap.get(st.id);
    if (!slot) return st;

    const parsed = parsePlacementTitle(slot.title);
    return {
      ...st,
      name: parsed?.name || st.name,
      company: parsed?.company || st.company,
      image: slot.url || st.image,
    };
  });
};

