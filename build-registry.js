// Build an encrypted, password-gated registry.html from PAGES.html.
// Usage: node _build_registry.js <password> <outfile>
const fs = require('fs');
const crypto = require('crypto');

const password = process.argv[2];
const outfile = process.argv[3];
if (!password || !outfile) { console.error('need password + outfile'); process.exit(1); }

let html = fs.readFileSync('PAGES.html', 'utf8');

// 1. Extract the markdown payload.
const m = html.match(/<script id="md" type="text\/plain">([\s\S]*?)<\/script>/);
if (!m) { console.error('md block not found'); process.exit(1); }
const md = m[1];

// 2. Encrypt with PBKDF2-SHA256 -> AES-256-GCM (Web Crypto compatible).
const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const iterations = 250000;
const key = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const ctBody = Buffer.concat([cipher.update(md, 'utf8'), cipher.final()]);
const tag = cipher.getAuthTag();
const ct = Buffer.concat([ctBody, tag]); // Web Crypto expects ciphertext||tag
const enc = {
  v: 1,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  iterations,
  ct: ct.toString('base64'),
};

// 3. Replace the plaintext md block with the encrypted JSON blob.
html = html.replace(
  /<script id="md" type="text\/plain">[\s\S]*?<\/script>/,
  '<script id="enc" type="application/json">' + JSON.stringify(enc) + '</script>'
);

// 4. Inject gate CSS before </style>.
const gateCss = `
  /* password gate */
  .gate { position:fixed; inset:0; z-index:100; background:#1e1f22;
    display:flex; align-items:center; justify-content:center; }
  .gate-card { width:min(360px,90vw); background:#26282c; border:1px solid #34363b;
    border-radius:14px; padding:28px 26px; box-shadow:0 12px 40px rgba(0,0,0,.45); }
  .gate-card h2 { margin:0 0 6px; font-size:18px; border:none; padding:0; }
  .gate-card p { margin:0 0 18px; color:#9aa0a6; font-size:13px; line-height:1.5; }
  .gate-card input { width:100%; box-sizing:border-box; padding:11px 14px; font-size:15px;
    color:#e6e6e6; background:#2b2d31; border:1px solid #3a3c42; border-radius:10px; outline:none; }
  .gate-card input:focus { border-color:#5aa6ff; }
  .gate-card button { margin-top:14px; width:100%; padding:11px; font-size:15px; cursor:pointer;
    color:#fff; background:#3b6fd4; border:none; border-radius:10px; font-weight:600; }
  .gate-card button:hover { background:#5aa6ff; }
  .gate-err { color:#e08a8a; font-size:13px; min-height:16px; margin-top:10px; text-align:center; }
</style>`;
html = html.replace('</style>', gateCss);

// 5. Inject gate HTML right after <body>.
const gateHtml = `<body>
<div class="gate" id="gate">
  <form class="gate-card" id="pw-form">
    <h2>Protected registry</h2>
    <p>Enter the password to view the Hosted Pages Registry.</p>
    <input id="pw" type="password" autocomplete="current-password" placeholder="Password" autofocus>
    <button type="submit">Unlock</button>
    <div class="gate-err" id="pw-err"></div>
  </form>
</div>`;
html = html.replace('<body>', gateHtml);

// 6. md becomes mutable, populated after decrypt.
html = html.replace(
  "const md = document.getElementById('md').textContent;",
  "let md = '';"
);

// 7. Replace the auto-render trigger with the password gate logic.
const gateJs = `// --- password gate: decrypt the registry in-browser ---
  const enc = JSON.parse(document.getElementById('enc').textContent);
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  async function decryptWith(pw) {
    const mat = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name:'PBKDF2', salt:b64(enc.salt), iterations:enc.iterations, hash:'SHA-256' },
      mat, { name:'AES-GCM', length:256 }, false, ['decrypt']);
    const plain = await crypto.subtle.decrypt(
      { name:'AES-GCM', iv:b64(enc.iv) }, key, b64(enc.ct));
    return new TextDecoder().decode(plain);
  }
  (function gate() {
    const g = document.getElementById('gate');
    const form = document.getElementById('pw-form');
    const input = document.getElementById('pw');
    const err = document.getElementById('pw-err');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      err.textContent = '';
      try {
        md = await decryptWith(input.value);
        g.remove();
        render();
      } catch (_) {
        err.textContent = 'Incorrect password.';
        input.select();
      }
    });
    input.focus();
  })();`;
html = html.replace(
  'if (window.marked) render(); else window.addEventListener(\'load\', render);',
  gateJs
);

fs.writeFileSync(outfile, html);
console.log('wrote', outfile, '(', html.length, 'bytes, ct', enc.ct.length, 'b64 chars )');
