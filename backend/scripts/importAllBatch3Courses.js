const dns = require("dns");
try {
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
  }
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {}

require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const Course = require("../models/Course");

const batch4 = require("./data/coursesBatch4");
const batch5 = require("./data/coursesBatch5");
const batch6 = require("./data/coursesBatch6");

const allCourses = [...batch4, ...batch5, ...batch6];

async function run() {
  try {
    console.log(`Connecting to MongoDB Atlas to import ${allCourses.length} courses...`);
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "thirdeye" });
    console.log("Connected to MongoDB Atlas successfully!\n");

    let successCount = 0;
    for (let i = 0; i < allCourses.length; i++) {
      const c = allCourses[i];
      process.stdout.write(`[${i + 1}/${allCourses.length}] Upserting: "${c.title}" (${c.slug})... `);
      const saved = await Course.findOneAndUpdate(
        { slug: c.slug },
        c,
        { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
      );
      console.log(`DONE! (ID: ${saved._id}, Category: "${saved.category}", Modules: ${saved.modules.length})`);
      successCount++;
    }

    const totalInDb = await Course.countDocuments();
    console.log("\n=======================================================");
    console.log(`SUCCESS! Processed ${successCount}/${allCourses.length} courses.`);
    console.log(`TOTAL COURSES CURRENTLY IN DATABASE: ${totalInDb}`);
    console.log("=======================================================");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    process.exit(0);
  }
}

run();

