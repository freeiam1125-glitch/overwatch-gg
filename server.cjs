// BOOP.GG — Battle.net OAuth 백엔드 + 정적 파일 서빙
const express = require('express');
const session = require('express-session');
const cors    = require('cors');
const axios   = require('axios');
const path    = require('path');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3001;
const PROD = process.env.NODE_ENV === 'production';

const {
  BNET_CLIENT_ID,
  BNET_CLIENT_SECRET,
  BNET_REDIRECT_URI,
  SESSION_SECRET,
  SITE_ORIGIN,
} = process.env;

// 프로덕션: https://boop.asia / 개발: http://localhost:5173
const ORIGIN = SITE_ORIGIN || (PROD ? 'https://boop.asia' : 'http://localhost:5173');

// ── CORS (개발 환경에서만 필요) ──────────────────
if (!PROD) {
  app.use(cors({ origin: ORIGIN, credentials: true }));
}

app.use(express.json());
app.use(session({
  secret: SESSION_SECRET || 'boop-gg-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: PROD,           // HTTPS 환경에서만 true
    sameSite: PROD ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 24h
  },
}));

// ── 0. 헬스체크 ──────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ── 1. 블리자드 로그인 시작 ────────────────────────
app.get('/api/auth/bnet', (req, res) => {
  const params = new URLSearchParams({
    client_id:     BNET_CLIENT_ID,
    redirect_uri:  BNET_REDIRECT_URI,
    response_type: 'code',
    scope:         'openid',
  });
  res.redirect(`https://oauth.battle.net/authorize?${params}`);
});

// ── 2. 콜백: code → access_token ─────────────────
app.get('/api/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.redirect(`${ORIGIN}?auth=error`);

  try {
    const tokenRes = await axios.post(
      'https://oauth.battle.net/token',
      new URLSearchParams({
        grant_type:   'authorization_code',
        code,
        redirect_uri: BNET_REDIRECT_URI,
      }),
      {
        auth: { username: BNET_CLIENT_ID, password: BNET_CLIENT_SECRET },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://oauth.battle.net/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    req.session.user = {
      id:          userRes.data.sub,
      battletag:   userRes.data.battletag,
      accessToken,
    };

    res.redirect(`${ORIGIN}/me`);
  } catch (err) {
    console.error('OAuth error:', err?.response?.data || err.message);
    res.redirect(`${ORIGIN}?auth=error`);
  }
});

// ── 3. 현재 로그인 유저 정보 ──────────────────────
app.get('/api/auth/me', async (req, res) => {
  if (!req.session.user) return res.json({ user: null });

  const { battletag } = req.session.user;

  try {
    const searchRes = await axios.get(
      `https://overfast-api.tekrop.fr/players?name=${encodeURIComponent(battletag.split('#')[0])}&limit=20`
    );
    const match = searchRes.data.results?.find(
      (p) => p.name === battletag
    );

    res.json({
      user: {
        battletag,
        avatar:   match?.avatar  || null,
        playerId: match?.player_id || null,
      }
    });
  } catch {
    res.json({ user: { battletag, avatar: null, playerId: null } });
  }
});

// ── 4. 로그아웃 ───────────────────────────────────
app.get('/api/auth/logout', (req, res) => {
  req.session.destroy(() => res.redirect(ORIGIN));
});

// ── 5. 프로덕션: 빌드된 React 서빙 ───────────────
if (PROD) {
  const distPath = path.join(__dirname, 'dist');
  console.log('Serving static from:', distPath);
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('sendFile error:', err);
        res.status(500).send('Build files not found. Run npm run build first.');
      }
    });
  });
}

app.listen(PORT, () => {
  console.log(`\n🔒 BOOP.GG Server — port ${PORT} [${PROD ? 'PRODUCTION' : 'DEV'}]`);
});
