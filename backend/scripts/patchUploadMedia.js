const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/uploadMedia/UploadMediaPage.jsx', 'utf8');

const needle1 = 'setActionMessage({\r\n        type: "success",\r\n        text: `Successfully replaced photo for';
const needle1LF = 'setActionMessage({\n        type: "success",\n        text: `Successfully replaced photo for';

const replacement1 = `try {
        window.dispatchEvent(new CustomEvent("thirdeye_media_updated", { detail: activeSlot.slotKey }));
        localStorage.setItem("thirdeye_media_last_updated", Date.now().toString());
      } catch {}
      setActionMessage({
        type: "success",
        text: \`Successfully replaced photo for`;

if (code.includes(needle1)) {
  code = code.replace(needle1, replacement1.replace(/\n/g, '\r\n'));
  console.log('Replaced 1 CRLF');
} else if (code.includes(needle1LF)) {
  code = code.replace(needle1LF, replacement1);
  console.log('Replaced 1 LF');
} else {
  console.log('Needle 1 not found');
}

const needle2 = 'setActionMessage({\r\n        type: "info",\r\n        text: `Reverted "${slot.title}" to original default photo.`,';
const needle2LF = 'setActionMessage({\n        type: "info",\n        text: `Reverted "${slot.title}" to original default photo.`,';

const replacement2 = `try {
        window.dispatchEvent(new CustomEvent("thirdeye_media_updated", { detail: slot.slotKey }));
        localStorage.setItem("thirdeye_media_last_updated", Date.now().toString());
      } catch {}
      setActionMessage({
        type: "info",
        text: \`Reverted "\${slot.title}" to original default photo.\`,`;

if (code.includes(needle2)) {
  code = code.replace(needle2, replacement2.replace(/\n/g, '\r\n'));
  console.log('Replaced 2 CRLF');
} else if (code.includes(needle2LF)) {
  code = code.replace(needle2LF, replacement2);
  console.log('Replaced 2 LF');
} else {
  console.log('Needle 2 not found');
}

fs.writeFileSync('frontend/src/pages/uploadMedia/UploadMediaPage.jsx', code, 'utf8');
console.log('Done patching UploadMediaPage.jsx');

