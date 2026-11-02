const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
require('dotenv').config({ path: 'backend/.env' });
const Media = require('../models/Media');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');
  
  const slots = await Media.find({ page: 'team' }).select('slotKey section title url defaultUrl isDefault');
  console.log(`Found ${slots.length} team slots:`);
  for (const s of slots) {
    console.log(`${s.slotKey} | ${s.section} | ${s.title} | ${s.url}`);
  }

  await mongoose.disconnect();
}
check().catch(console.error);
