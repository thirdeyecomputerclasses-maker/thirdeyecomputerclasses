const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {}

require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const Course = require("../models/Course");

const courseData = {
  title: "Certified Ethical Hacking & Cyber Security",
  slug: "certified-ethical-hacking-cyber-security",
  category: "Cyber Security & Networking",
  badge: "Govt. Recognized",
  duration: "6 Months",
  description:
    "Master offensive and defensive cybersecurity: Computer networking, footprinting, penetration testing lab setup in Kali Linux, system exploitation, malware analysis, DoS/DDoS, proxies, GHDB, and Indian Cyber Laws (IT Act).",
  image:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
  prerequisites: [
    "10+2 / BCA / B.Tech / Diploma / Any Graduate or Undergraduate student",
    "Basic computer literacy and curiosity about security systems",
    "Zero prior hacking background required - starts from core networking",
  ],
  tools: [
    {
      id: "tool-1",
      name: "Kali Linux & VirtualBox",
      iconType: "terminal",
      glowColor: "rgba(239, 68, 68, 0.3)",
    },
    {
      id: "tool-2",
      name: "Wireshark & Nmap",
      iconType: "network",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      id: "tool-3",
      name: "Metasploit & Burp Suite",
      iconType: "security",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      id: "tool-4",
      name: "GHDB & Password Audit Tools",
      iconType: "lock",
      glowColor: "rgba(234, 179, 8, 0.3)",
    },
  ],
  modules: [
    {
      id: "m-1",
      moduleNumber: "MODULE 1",
      title: "Networking Concepts & Web Protocols",
      description:
        "Internet mechanics, IP addressing (IPv4/IPv6, Public vs Private), TCP/IP & OSI models, Domain Names, email architecture & message formats, network ports, and browser security.",
    },
    {
      id: "m-2",
      moduleNumber: "MODULE 2",
      title: "Ethical Hacking Fundamentals & Cyber Laws",
      description:
        "Global & Indian cybercrime landscape, hacking vs ethical hacking, hacker classes & profiles, cybersecurity challenges, and Indian Cyber Law (IT Act 2000 & 2008 amendments, legal cases, and compliance).",
    },
    {
      id: "m-3",
      moduleNumber: "MODULE 3",
      title: "Virtualization & Pentesting Lab Setup",
      description:
        "Virtualization technology requirements, creating isolated virtual environments (VirtualBox/VMware), installing Windows and Kali Linux, virtual networking, and system cloning.",
    },
    {
      id: "m-4",
      moduleNumber: "MODULE 4",
      title: "Information Gathering (Footprinting & OSINT)",
      description:
        "Active and passive reconnaissance, website footprinting, Ping sweeps, Whois lookups, DNS enumeration, people search, and surface vulnerability identification.",
    },
    {
      id: "m-5",
      moduleNumber: "MODULE 5",
      title: "Windows System Security & Privilege Escalation",
      description:
        "Windows security architecture, SAM database, user accounts security, privilege escalation, password extraction techniques, security bypassing, and countermeasures.",
    },
    {
      id: "m-6",
      moduleNumber: "MODULE 6",
      title: "Cryptography, Steganography & Data Recovery",
      description:
        "Encryption/Decryption algorithms, ciphers, hiding confidential payloads inside media (Steganography), digital integrity, and data recovery techniques.",
    },
    {
      id: "m-7",
      moduleNumber: "MODULE 7",
      title: "Malware Analysis: Viruses, Trojans & Keyloggers",
      description:
        "Malware anatomy, viruses, worms, Trojans, spyware, keyloggers, attack vectors, antivirus bypass techniques, and threat defense analysis.",
    },
    {
      id: "m-8",
      moduleNumber: "MODULE 8",
      title: "Denial of Service (DoS & DDoS) Attacks",
      description:
        "Mechanisms of Denial of Service (DoS) and Distributed Denial of Service (DDoS), flood attack variations, botnets, and mitigation architectures.",
    },
    {
      id: "m-9",
      moduleNumber: "MODULE 9",
      title: "Proxies, VPNs & Anonymity Networks",
      description:
        "Proxy types (HTTP/HTTPS/SOCKS), IP masking, converting machines to HTTPS proxies, VPN tunneling protocols, anonymous routing, and defense against malicious proxies.",
    },
    {
      id: "m-10",
      moduleNumber: "MODULE 10",
      title: "Google Hacking Database (GHDB) & Reconnaissance",
      description:
        "Search engine architecture, advanced Google Dorks queries, discovering exposed admin portals & sensitive files, and remediation strategies.",
    },
    {
      id: "m-11",
      moduleNumber: "MODULE 11",
      title: "Social Engineering, Phishing & Identity Security",
      description:
        "Phishing attacks, session hijacking (cookie stealing), fake profile tracing, email spoofing analysis, and multi-factor authentication (MFA) hardening.",
    },
    {
      id: "m-12",
      moduleNumber: "MODULE 12",
      title: "Mobile Security, Wireless Defense & Capstone CTF",
      description:
        "Mobile hacking vectors, rooting/jailbreaking risks, mobile app security, Wi-Fi security auditing, and a comprehensive real-world Capture The Flag (CTF) security assessment.",
    },
  ],
};

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "thirdeye" });
    console.log("Connected to MongoDB Atlas!");

    const course = await Course.findOneAndUpdate(
      { slug: courseData.slug },
      courseData,
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    console.log("SUCCESSFULLY CREATED/UPDATED COURSE:");
    console.log(`ID: ${course._id}`);
    console.log(`Title: ${course.title}`);
    console.log(`Slug: ${course.slug}`);
    console.log(`Modules count: ${course.modules.length}`);
    process.exit(0);
  } catch (err) {
    console.error("Failed to save course:", err);
    process.exit(1);
  }
}

run();
