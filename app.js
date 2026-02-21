
/* =========================================================
   Mathletica ... Multi-page (static) prototype
   Works offline and under file:// by falling back if storage is blocked.
   ========================================================= */

/* ---------- Safe storage (localStorage with fallback) ---------- */
const Storage = (() => {
  try {
    const k = '__ml_test__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return window.localStorage;
  } catch (e) {
    const mem = new Map();
    return {
      getItem: (key) => (mem.has(key) ? mem.get(key) : null),
      setItem: (key, val) => { mem.set(key, String(val)); },
      removeItem: (key) => { mem.delete(key); }
    };
  }
})();

const $$ = (sel, root=document) => root.querySelector(sel);
const $$$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function safeJSON(str, fallback) { try { return JSON.parse(str); } catch { return fallback; } }
function nowISO() { return new Date().toISOString(); }
function uid() { return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); }

function parseQuery() {
  const p = new URLSearchParams(location.search);
  const o = {};
  for (const [k,v] of p.entries()) o[k] = v;
  return o;
}

/* ---------- Crypto helpers ---------- */
async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

/* ---------- Data model ---------- */
const DB_KEYS = {
  users: 'ml-users',
  current: 'ml-current',
  progress: 'ml-progress-v2'
};

function loadUsers() { return safeJSON(Storage.getItem(DB_KEYS.users) || '[]', []); }
function saveUsers(users) { Storage.setItem(DB_KEYS.users, JSON.stringify(users)); }
function getCurrent() { return safeJSON(Storage.getItem(DB_KEYS.current) || 'null', null); }
function setCurrent(u) { Storage.setItem(DB_KEYS.current, JSON.stringify(u)); }
function clearCurrent() { Storage.removeItem(DB_KEYS.current); }

function loadProgress() { return safeJSON(Storage.getItem(DB_KEYS.progress) || '{}', {}); }
function saveProgress(p) { Storage.setItem(DB_KEYS.progress, JSON.stringify(p)); }

/* ---------- Seed admin user (for your own use) ---------- */
async function ensureSeedUsers() {
  const users = loadUsers();
  if (!users.some(u => u.email.toLowerCase() === 'admin@mathletica.local')) {
    users.push({
      id: uid(),
      email: 'admin@mathletica.local',
      name: 'Admin',
      passHash: await sha256('admin1234'),
      role: 'staff',
      plan: 'pro',
      trialEnds: null,
      createdAt: nowISO()
    });
    saveUsers(users);
  }
}

/* ---------- Curriculum (Standard 2, granular) ---------- */
const STD2 = {
  label: 'Mathematics Standard 2',
  topics: [
    {
      slug: 'algebra',
      title: 'Algebra and Equations',
      desc: 'Rearranging, solving, simultaneous equations, and algebraic manipulation used everywhere else.',
      lessons: [
        lesson('lin-eq', 'Solving linear equations', true, ['NybHckSEQBI'], quiz_lin_eq()),
        lesson('rearrange', 'Rearranging formulas', true, ['NybHckSEQBI'], quiz_rearrange()),
        lesson('sim-elim', 'Simultaneous equations: elimination', true, ['HsUVPqcLUj4'], quiz_simul()),
        lesson('sim-sub', 'Simultaneous equations: substitution', false, ['HsUVPqcLUj4'], quiz_simul()),
        lesson('lin-ineq', 'Linear inequalities', false, ['NybHckSEQBI'], quiz_ineq()),
        lesson('indices', 'Index laws and scientific notation', false, ['HsUVPqcLUj4'], quiz_indices()),
        lesson('expand-factor', 'Expanding and factorising basics', false, ['NybHckSEQBI'], quiz_expand()),
        lesson('quadratics-factor', 'Quadratics by factorising', false, ['HsUVPqcLUj4'], quiz_quad())
      ]
    },
    {
      slug: 'relationships',
      title: 'Types of Relationships',
      desc: 'Graphs, gradient, intercepts, and modelling real situations with equations.',
      lessons: [
        lesson('gradient', 'Gradient and y-intercept', true, ['NybHckSEQBI'], quiz_gradient()),
        lesson('lin-graphs', 'Graphing linear relationships', true, ['NybHckSEQBI'], quiz_lin_graphs()),
        lesson('quadratic-shape', 'Quadratic graphs (shape + key features)', false, ['HsUVPqcLUj4'], quiz_quadratic()),
        lesson('nonlinear-models', 'Choosing a model from data', false, ['HsUVPqcLUj4'], quiz_models()),
        lesson('rate-change', 'Rate of change from graphs', false, ['NybHckSEQBI'], quiz_rate())
      ]
    },
    {
      slug: 'geometry',
      title: 'Measurement and Geometry',
      desc: 'Area/volume, circles, similarity, bearings, coordinate geometry foundations.',
      lessons: [
        lesson('area-perim', 'Area and perimeter essentials', true, ['Qm9U0wTOJQo'], quiz_area()),
        lesson('circles', 'Circles: circumference and area', true, ['Qm9U0wTOJQo'], quiz_circles()),
        lesson('sectors', 'Arc length and sector area', false, ['Qm9U0wTOJQo'], quiz_sectors()),
        lesson('pythagoras', 'Pythagoras (as a tool, not a religion)', false, ['QIFPp8oJV0U'], quiz_pythag()),
        lesson('bearings', 'Bearings (baseline skills)', false, ['QIFPp8oJV0U'], quiz_bearings())
      ]
    },
    {
      slug: 'trigonometry',
      title: 'Trigonometry',
      desc: 'Right triangles + non-right triangles: SOHCAHTOA, elevation/depression, sine/cosine rule, applications.',
      lessons: [
        lesson('sohcahtoa', 'SOHCAHTOA and right-triangle trig', true, ['Qm9U0wTOJQo'], quiz_soh()),
        lesson('elev-depress', 'Angles of elevation and depression', true, ['Qm9U0wTOJQo'], quiz_elev()),
        lesson('bearings-trig', 'Bearings with trig (applications)', false, ['QIFPp8oJV0U'], quiz_bearing_trig()),
        lesson('area-tri', 'Area of any triangle: 1/2 ab sin C', false, ['QIFPp8oJV0U'], quiz_area_tri()),
        lesson('sine-rule', 'Sine rule', false, ['Qm9U0wTOJQo'], quiz_sine()),
        lesson('cosine-rule', 'Cosine rule', false, ['QIFPp8oJV0U'], quiz_cosine()),
        lesson('worded', 'Height and distance word problems', false, ['Qm9U0wTOJQo'], quiz_worded())
      ]
    },
    {
      slug: 'financial',
      title: 'Financial Mathematics',
      desc: 'Percentages, interest, loans, annuities, and interpreting financial situations.',
      lessons: [
        lesson('percent', 'Percent change and markups', true, ['wJ1OzQSZxH0'], quiz_percent()),
        lesson('simple-interest', 'Simple interest', true, ['wJ1OzQSZxH0'], quiz_simple_int()),
        lesson('compound', 'Compound interest', false, ['wJ1OzQSZxH0'], quiz_compound()),
        lesson('annuities', 'Annuities (payments over time)', false, ['KXuR_BX-hts'], quiz_annuities()),
        lesson('loans', 'Loans and repayments (conceptual)', false, ['KXuR_BX-hts'], quiz_loans())
      ]
    },
    {
      slug: 'statistics',
      title: 'Statistical Analysis',
      desc: 'Bivariate data: scatterplots, correlation, r, regression, residuals and interpreting context.',
      lessons: [
        lesson('scatter', 'Scatterplots and correlation', true, ['GwqD_Td2FzQ'], quiz_scatter()),
        lesson('pearson-r', "Pearson's correlation coefficient (r)", true, ['ZkjP5RJLQF0'], quiz_r()),
        lesson('regression', 'Least squares regression line', false, ['GwqD_Td2FzQ'], quiz_regression()),
        lesson('residuals', 'Residuals, outliers and influence', false, ['ZkjP5RJLQF0'], quiz_residuals()),
        lesson('interp-extra', 'Interpolation vs extrapolation', false, ['GwqD_Td2FzQ'], quiz_interp())
      ]
    },
    {
      slug: 'probability',
      title: 'Probability',
      desc: 'Sample spaces, Venn/tree diagrams, conditional probability, independence.',
      lessons: [
        lesson('sample-space', 'Sample space and basic probability', true, ['GwqD_Td2FzQ'], quiz_prob_basic()),
        lesson('venn', 'Venn diagrams and set language', true, ['GwqD_Td2FzQ'], quiz_venn()),
        lesson('tree', 'Tree diagrams and multi-step probability', false, ['GwqD_Td2FzQ'], quiz_tree()),
        lesson('conditional', 'Conditional probability', false, ['GwqD_Td2FzQ'], quiz_conditional()),
        lesson('independence', 'Independence and checking it', false, ['GwqD_Td2FzQ'], quiz_independent())
      ]
    },
    {
      slug: 'networks',
      title: 'Networks and Paths',
      desc: 'Graph terminology, Euler/Hamilton, shortest path and spanning trees.',
      lessons: [
        lesson('basics', 'Network basics: vertices, edges, degree', true, ['hd_FhH9nJyc'], quiz_network_basics()),
        lesson('euler', 'Euler paths and circuits', true, ['hd_FhH9nJyc'], quiz_euler()),
        lesson('hamilton', 'Hamilton paths and cycles', false, ['hd_FhH9nJyc'], quiz_hamilton()),
        lesson('shortest', "Shortest path (Dijkstra's idea)", false, ['YnNfWm0lzHE'], quiz_shortest()),
        lesson('mst', 'Minimum spanning tree', false, ['YnNfWm0lzHE'], quiz_mst())
      ]
    }
  ]
};

function lesson(slug, title, free, videoIds, quiz) {
  return { slug, title, free, videoIds, quiz };
}

/* ---------- Quiz builders (small sample; add more over time) ---------- */
function q(q, opts, ans, explain, image=null) { return { q, opts, ans, explain, image }; }

function quiz_lin_eq() {
  return [
    q('Solve: $3x-5=16$', ['x=7', 'x=3', 'x=11', 'x=-7'], 0, 'Add 5: $3x=21$, then divide by 3: $x=7$.'),
    q('Solve: $\\frac{x}{4}=6$', ['x=24', 'x=10', 'x=1.5', 'x=2'], 0, 'Multiply both sides by 4: $x=24$.')
  ];
}
function quiz_rearrange() {
  return [
    q('Rearrange $A = \\pi r^2$ to make $r$ the subject.', ['$r = \\sqrt{\\frac{A}{\\pi}}$', '$r = \\frac{A}{\\pi^2}$', '$r = \\frac{A}{\\pi}$', '$r = \\sqrt{A\\pi}$'], 0, 'Divide by $\\pi$: $\\frac{A}{\\pi}=r^2$, then square root.'),
  ];
}
function quiz_simul() {
  return [
    q('Solve simultaneously: $x+y=9$ and $x-y=1$', ['(x,y)=(5,4)', '(4,5)', '(9,1)', '(1,9)'], 0, 'Add equations: $2x=10 \\Rightarrow x=5$. Then $y=4$.'),
    q('Solve simultaneously: $2x+y=7$ and $x+y=5$', ['(2,3)', '(1,4)', '(3,2)', '(4,1)'], 2, 'Subtract second from first: $x=2$. Then $y=3$.')
  ];
}
function quiz_ineq() {
  return [
    q('Solve: $2x+3 \\le 11$', ['x\\le 4', 'x\\ge 4', 'x\\le 7', 'x\\ge 7'], 0, 'Subtract 3: $2x\\le 8$, divide by 2: $x\\le 4$.')
  ];
}
function quiz_indices() {
  return [
    q('Simplify: $10^3 \\times 10^2$', ['$10^5$', '$10^6$', '$10^1$', '$100^5$'], 0, 'Same base: add indices: $10^{3+2}=10^5$.'),
    q('Write $0.00072$ in scientific notation.', ['$7.2\\times 10^{-4}$', '$72\\times 10^{-5}$', '$7.2\\times 10^{-5}$', '$0.72\\times 10^{-3}$'], 0, 'Move decimal 4 places: $7.2\\times 10^{-4}$.')
  ];
}
function quiz_expand() {
  return [
    q('Expand: $(x+3)(x-5)$', ['$x^2-2x-15$', '$x^2+8x-15$', '$x^2-15$', '$x^2-8x-15$'], 0, 'FOIL: $x^2-5x+3x-15 = x^2-2x-15$.')
  ];
}
function quiz_quad() {
  return [
    q('Solve: $x^2-5x=0$', ['x=0 or 5', 'x=\\pm5', 'x=1 or 4', 'x=2.5'], 0, 'Factor: $x(x-5)=0 \\Rightarrow x=0$ or $x=5$.')
  ];
}
function quiz_gradient(){ return [ q('For $y=4x-7$, what is the gradient?', ['-7','4','7','-4'],1,'In $y=mx+b$, $m$ is gradient.') ]; }
function quiz_lin_graphs(){
  const svg = `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="220" fill="transparent"/>
    <g stroke="rgba(255,255,255,.12)" stroke-width="1">
      ${Array.from({length:11}).map((_,i)=>`<line x1="${20+i*30}" y1="20" x2="${20+i*30}" y2="200"/>`).join('')}
      ${Array.from({length:7}).map((_,i)=>`<line x1="20" y1="${20+i*30}" x2="320" y2="${20+i*30}"/>`).join('')}
    </g>
    <g stroke="rgba(255,255,255,.55)" stroke-width="2">
      <line x1="20" y1="170" x2="320" y2="50"/>
    </g>
    <g stroke="rgba(245,166,35,.9)" stroke-width="3" fill="rgba(245,166,35,.9)">
      <circle cx="80" cy="146" r="3"/><circle cx="170" cy="110" r="3"/><circle cx="260" cy="74" r="3"/>
    </g>
    <g stroke="rgba(255,255,255,.8)" stroke-width="2">
      <line x1="20" y1="110" x2="320" y2="110"/><line x1="170" y1="20" x2="170" y2="200"/>
    </g>
    <text x="306" y="122" fill="rgba(255,255,255,.65)" font-size="11">x</text>
    <text x="178" y="34" fill="rgba(255,255,255,.65)" font-size="11">y</text>
  </svg>`;
  return [
    q('The graph shown is a straight line. Which statement is true?', [
      'It has negative gradient',
      'It has positive gradient',
      'It is not linear',
      'It passes through the origin'
    ], 1, 'The line rises from left to right, so the gradient is positive.', svg)
  ];
}
function quiz_quadratic(){ return [ q('A quadratic graph is generally:', ['A straight line','A parabola','A circle','Always decreasing'],1,'Quadratic graphs are parabolas.') ]; }
function quiz_models(){ return [ q('If data curves upward faster and faster, a good first model is often:', ['Linear','Exponential','Constant','Random'],1,'Exponential growth accelerates as x increases.') ]; }
function quiz_rate(){ return [ q('On a distance-time graph, the gradient represents:', ['Acceleration','Speed','Distance','Time'],1,'Gradient = change in distance / change in time = speed.') ]; }

function quiz_area(){ return [ q('A rectangle is 8 cm by 3 cm. Its area is:', ['11','24','16','48'],1,'Area = length × width = 24 cm².') ]; }
function quiz_circles(){ return [ q('If $r=5$, circumference is:', ['$10\\pi$','$25\\pi$','$5\\pi$','$20\\pi$'],0,'$C=2\\pi r = 10\\pi$.') ]; }
function quiz_sectors(){ return [ q('Sector area is based on what fraction of a circle?', ['Angle/180','Angle/360','Radius/diameter','Always half'],1,'Sector area = (θ/360)×πr².') ]; }
function quiz_pythag(){ return [ q('A right triangle has legs 6 and 8. Hypotenuse is:', ['10','14','2','48'],0,'$\\sqrt{6^2+8^2}=\\sqrt{100}=10$.') ]; }
function quiz_bearings(){ return [ q('A bearing is measured:', ['From South, anticlockwise','From North, clockwise','From East, clockwise','From West, anticlockwise'],1,'Bearings are clockwise from North.') ]; }

function quiz_soh(){ return [ q('In a right triangle, $\\sin\\theta =$', ['opp/hyp','adj/hyp','opp/adj','hyp/opp'],0,'SOH: sine = opposite/hypotenuse.') ]; }
function quiz_elev(){ return [ q('Angle of elevation is measured:', ['Downward from horizontal','Upward from horizontal','From vertical','From North'],1,'Elevation is up from the horizontal line of sight.') ]; }
function quiz_bearing_trig(){ return [ q('Bearings problems often need:', ['Only addition','Trig + diagrams','Calculus','Matrices'],1,'Draw the bearing diagram, then use trig.') ]; }
function quiz_area_tri(){ return [ q('Area formula for any triangle with sides a,b and included angle C:', ['ab\\sin C','½ab\\sin C','½ab\\cos C','ab\\cos C'],1,'Area = ½ab sin C.') ]; }
function quiz_sine(){ return [ q('Sine rule relates:', ['Angles only','Sides only','Sides and opposite angles','Area and perimeter'],2,'$a/\\sin A=b/\\sin B=...$') ]; }
function quiz_cosine(){ return [ q('Cosine rule is most useful when:', ['You have a right triangle','You know two sides and included angle','You know all angles','You only know one side'],1,'SAS uses cosine rule.') ]; }
function quiz_worded(){ return [ q('A 62 m cliff, angle of depression to boat 7°. Distance from base (approx) uses:', ['sin','cos','tan','none'],2,'tan = opposite/adjacent.') ]; }

function quiz_percent(){ return [ q('Increase $80$ by 15%:', ['92','88','95','68'],1,'15% of 80 is 12, so 92.') ]; }
function quiz_simple_int(){ return [ q('$P=1000$, $r=5\\%$, $t=3$ years. Simple interest I =', ['$50','$150','$1050','$1150$'],1,'I=Prt=1000×0.05×3=150.') ]; }
function quiz_compound(){ return [ q('$2000$ at 4% p.a. compounded annually for 3 years gives:', ['$2249.73','$2160','$2080','$2320$'],0,'A=2000(1.04)^3≈2249.73.') ]; }
function quiz_annuities(){ return [ q('An annuity is:', ['A one-off payment','Equal payments at regular intervals','A tax','A discount'],1,'Annuities are repeated equal payments.') ]; }
function quiz_loans(){ return [ q('For a standard loan, early repayments are mostly:', ['Principal','Interest','Both equal','Neither'],1,'Early payments mostly interest; principal portion grows over time.') ]; }

function quiz_scatter(){ return [ q('A scatterplot shows:', ['One variable over time','Relationship between two variables','Only averages','Only categories'],1,'Bivariate data: x vs y.') ]; }
function quiz_r(){ return [ q('If $r=-0.92$ the relationship is:', ['Strong positive','Strong negative','Weak positive','None'],1,'|r| close to 1 is strong; negative means decreasing.') ]; }
function quiz_regression(){ return [ q('Least squares regression line is used to:', ['Guarantee causation','Predict y from x','Make data linear','Remove outliers'],1,'Use the line to predict y for given x (with caution).') ]; }
function quiz_residuals(){ return [ q('A residual is:', ['Observed y - predicted y','Predicted y - observed y','x - y','Always positive'],0,'Residual = y - ŷ.') ]; }
function quiz_interp(){ return [ q('Extrapolation is:', ['Predicting within data range','Predicting outside data range','Deleting points','Making a histogram'],1,'Outside the range is extrapolation and riskier.') ]; }

function quiz_prob_basic(){ return [ q('If P(A)=0.3, then P(not A)=', ['0.7','0.3','1.3','0'],0,'Complement rule: 1-0.3=0.7.') ]; }
function quiz_venn(){ return [ q('P(A ∪ B) =', ['P(A)+P(B)','P(A)+P(B)-P(A∩B)','P(A)P(B)','P(A)/P(B)'],1,'Inclusion-exclusion: subtract intersection once.') ]; }
function quiz_tree(){ return [ q('Tree diagrams are best for:', ['Single events','Multi-stage probability','Geometry','Algebra'],1,'They show branches across stages.') ]; }
function quiz_conditional(){ return [ q('Conditional probability is written as:', ['P(A+B)','P(A|B)','P(A/B)','P(A*B)'],1,'Standard notation: P(A|B).') ]; }
function quiz_independent(){ return [ q('If A and B are independent, then:', ['P(A∩B)=P(A)+P(B)','P(A∩B)=P(A)P(B)','P(A)=P(B)','P(A|B)=P(A)+P(B)'],1,'Independence: multiplication rule.') ]; }

function quiz_network_basics(){ return [ q('Degree of a vertex is:', ['#vertices','#edges touching it','total weight','#cycles'],1,'Degree counts incident edges.') ]; }
function quiz_euler(){ return [ q('An Euler circuit exists if:', ['Exactly two odd vertices','All vertices even degree','Graph is complete','No cycles'],1,'Euler circuit ⇔ all vertices even degree (and connected).') ]; }
function quiz_hamilton(){ return [ q('A Hamilton cycle visits:', ['Every edge once','Every vertex once and returns','Only odd vertices','Only weighted edges'],1,'Hamilton cycle: visit each vertex exactly once and return.') ]; }
function quiz_shortest(){ return [ q('Dijkstra’s algorithm finds:', ['Minimum spanning tree','Shortest path from a start vertex','Euler path','Hamilton path'],1,'Dijkstra = shortest path in weighted graphs with non-negative weights.') ]; }
function quiz_mst(){ return [ q('Minimum spanning tree:', ['Uses all edges','Connects all vertices with minimum total weight','Requires directed edges','Only works for Euler graphs'],1,'MST connects all vertices with minimum possible total weight.') ]; }

/* ---------- Rendering helpers ---------- */
function topicBySlug(slug) { return STD2.topics.find(t => t.slug === slug) || null; }
function lessonBySlug(topic, slug) { return topic?.lessons.find(l => l.slug === slug) || null; }

function isLoggedIn() { return !!getCurrent(); }
function currentUser() { return getCurrent(); }

function userHasPro(u) {
  if (!u) return false;
  if (u.plan === 'pro') return true;
  if (u.trialEnds) return (new Date(u.trialEnds).getTime() > Date.now());
  return false;
}

function lessonLocked(lesson) {
  if (lesson.free) return false;
  const u = currentUser();
  return !userHasPro(u);
}

function toast(msg, type='info') {
  const host = $$('#toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<div class="toast-dot"></div><span>${msg}</span>`;
  host.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 250); }, 3200);
}

/* ---------- Auth UI ---------- */
function openModal(tab='login') {
  const m = $$('#authModal'); if (!m) return;
  m.classList.add('show');
  switchAuth(tab);
}
function closeModal() {
  const m = $$('#authModal'); if (!m) return;
  m.classList.remove('show');
}
function switchAuth(tab) {
  const login = $$('#loginForm');
  const signup = $$('#signupForm');
  if (login) login.style.display = tab === 'login' ? '' : 'none';
  if (signup) signup.style.display = tab === 'signup' ? '' : 'none';
  const tl = $$('#tabLogin'); const ts = $$('#tabSignup');
  if (tl) tl.classList.toggle('active', tab === 'login');
  if (ts) ts.classList.toggle('active', tab === 'signup');
  const t = $$('#modalTitle'); const s = $$('#modalSub');
  if (t) t.textContent = tab === 'login' ? 'Welcome back' : 'Create your account';
  if (s) s.textContent = tab === 'login' ? 'Sign in to save your progress' : 'Create an account (local) to save progress';
}

async function handleAuth(e, type) {
  e.preventDefault();
  const users = loadUsers();

  if (type === 'signup') {
    const name = $$('#suName')?.value?.trim() || 'Student';
    const email = ($$('#suEmail')?.value || '').trim().toLowerCase();
    const pw = $$('#suPass')?.value || '';
    if (!email || pw.length < 8) { toast('Use a valid email and 8+ char password.', 'info'); return; }
    if (users.some(u => u.email.toLowerCase() === email)) { toast('That email already exists. Sign in instead.', 'info'); return; }
    const user = { id: uid(), name, email, passHash: await sha256(pw), role:'student', plan:'free', trialEnds: null, createdAt: nowISO() };
    users.push(user); saveUsers(users);
    setCurrent({ id:user.id, email:user.email, name:user.name, role:user.role, plan:user.plan, trialEnds:user.trialEnds });
    closeModal();
    refreshNav();
    toast('Account created. Progress will save on this device.', 'success');
    return;
  }

  // login
  const email = ($$('#liEmail')?.value || '').trim().toLowerCase();
  const pw = $$('#liPass')?.value || '';
  const u = users.find(x => x.email.toLowerCase() === email);
  if (!u) { toast('No account with that email.', 'info'); return; }
  const h = await sha256(pw);
  if (h !== u.passHash) { toast('Wrong password.', 'info'); return; }
  setCurrent({ id:u.id, email:u.email, name:u.name, role:u.role, plan:u.plan, trialEnds:u.trialEnds });
  closeModal();
  refreshNav();
  toast('Signed in.', 'success');
}

function signOut() {
  clearCurrent();
  refreshNav();
  toast('Signed out.', 'info');
  // avoid leaving admin pages open while signed out
  if (document.body.dataset.page === 'admin') location.href = '../index.html';
}

function refreshNav() {
  const u = currentUser();
  const signInBtn = $$('#navSignIn');
  const signOutBtn = $$('#navSignOut');
  const acct = $$('#navAccount');
  const admin = $$('#navAdmin');
  const badge = $$('#navPlanBadge');

  if (signInBtn) signInBtn.style.display = u ? 'none' : '';
  if (signOutBtn) signOutBtn.style.display = u ? '' : 'none';
  if (acct) acct.style.display = u ? '' : 'none';

  if (badge) {
    if (!u) badge.textContent = 'Guest';
    else if (userHasPro(u)) badge.textContent = 'Pro';
    else badge.textContent = 'Free';
  }

  const isStaff = u && (u.role === 'staff' || u.role === 'admin');
  if (admin) admin.style.display = isStaff ? '' : 'none';
}

/* ---------- Progress ---------- */
function markLessonDone(topicSlug, lessonSlug) {
  const p = loadProgress();
  const u = currentUser();
  const key = (u ? u.id : 'guest') + '::' + topicSlug + '::' + lessonSlug;
  p[key] = { done:true, updatedAt: nowISO() };
  saveProgress(p);
}
function lessonDone(topicSlug, lessonSlug) {
  const p = loadProgress();
  const u = currentUser();
  const key = (u ? u.id : 'guest') + '::' + topicSlug + '::' + lessonSlug;
  return !!p[key]?.done;
}

/* ---------- MathJax ---------- */
function typeset(root) {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([root]).catch(()=>{});
  }
}

/* ---------- Page renderers ---------- */
function renderHome() {
  // small home KPIs
  const u = currentUser();
  const kUser = $$('#homeUser');
  if (kUser) kUser.textContent = u ? u.name : 'Guest';

  const totalLessons = STD2.topics.reduce((a,t)=>a+t.lessons.length,0);
  const done = STD2.topics.reduce((a,t)=>a+t.lessons.filter(l=>lessonDone(t.slug,l.slug)).length,0);

  $$('#kLessons') && ($$('#kLessons').textContent = String(totalLessons));
  $$('#kDone') && ($$('#kDone').textContent = String(done));
  $$('#kPct') && ($$('#kPct').textContent = totalLessons ? Math.round(done/totalLessons*100)+'%' : '0%');

  const cards = $$('#homeTopicCards');
  if (cards) {
    cards.innerHTML = STD2.topics.map(t => `
      <a class="card-link" href="standard2/topic.html?topic=${encodeURIComponent(t.slug)}">
        <div class="card-title">${t.title}</div>
        <div class="card-sub">${t.desc}</div>
        <div class="card-tags">
          <span class="badge">${t.lessons.length} lessons</span>
          <span class="badge ${t.lessons.some(l=>!l.free)?'warn':'ok'}">${t.lessons.some(l=>!l.free)?'Some Pro':'All Free'}</span>
        </div>
      </a>
    `).join('');
  }
}

function renderStd2Index() {
  const cards = $$('#topicCards');
  if (!cards) return;
  cards.innerHTML = STD2.topics.map(t => `
    <a class="card-link" href="topic.html?topic=${encodeURIComponent(t.slug)}">
      <div class="card-title">${t.title}</div>
      <div class="card-sub">${t.desc}</div>
      <div class="card-tags">
        <span class="badge">${t.lessons.length} lessons</span>
        <span class="badge ${t.lessons.some(l=>!l.free)?'warn':'ok'}">${t.lessons.some(l=>!l.free)?'Includes Pro':'Free-ready'}</span>
      </div>
    </a>
  `).join('');
}

function renderStd2Topic() {
  const q = parseQuery();
  const topic = topicBySlug(q.topic);
  if (!topic) { $$('#topicTitle').textContent = 'Topic not found'; return; }

  $$('#topicTitle').textContent = topic.title;
  const ct = $$('#crumbTopic'); if (ct) ct.textContent = topic.title;
  $$('#topicDesc').textContent = topic.desc;

  const list = $$('#lessonList');
  if (!list) return;

  list.innerHTML = topic.lessons.map(l => {
    const locked = lessonLocked(l);
    const done = lessonDone(topic.slug, l.slug);
    return `
      <a href="${locked ? '#' : `lesson.html?topic=${encodeURIComponent(topic.slug)}&lesson=${encodeURIComponent(l.slug)}`}" 
         class="${locked ? 'locked' : ''}">
        <div>
          <div style="font-weight:700">${l.title}</div>
          <div class="meta">${locked ? 'Pro locked' : (done ? 'Completed' : 'Not started')}</div>
        </div>
        <span class="topic-badge ${locked ? 'badge-pro' : 'badge-free'}">${locked ? 'Pro' : 'Open'}</span>
      </a>
    `;
  }).join('');

  // locked click handling
  $$$('#lessonList a.locked').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('signup');
      toast('This lesson is marked Pro in the prototype. You can simulate Pro in Billing.', 'info');
    });
  });

  // KPIs
  const total = topic.lessons.length;
  const doneCount = topic.lessons.filter(l=>lessonDone(topic.slug,l.slug)).length;
  $$('#tKpiLessons') && ($$('#tKpiLessons').textContent = String(total));
  $$('#tKpiDone') && ($$('#tKpiDone').textContent = String(doneCount));
  $$('#tKpiPct') && ($$('#tKpiPct').textContent = total ? Math.round(doneCount/total*100)+'%' : '0%');
  $$('#tKpiPctBig') && ($$('#tKpiPctBig').textContent = total ? Math.round(doneCount/total*100)+'%' : '0%');
}

function renderStd2Lesson() {
  const qy = parseQuery();
  const topic = topicBySlug(qy.topic);
  const l = lessonBySlug(topic, qy.lesson);

  if (!topic || !l) { $$('#lessonTitle').textContent = 'Lesson not found'; return; }

  // gate
  if (lessonLocked(l)) {
    $$('#lessonTitle').textContent = l.title;
    $$('#lessonBody').innerHTML = `
      <div class="panel">
        <div class="panel-b" style="text-align:center">
          <div style="font-size:40px;margin-bottom:12px">🔒</div>
          <div style="font-family:var(--font-head);font-weight:900;margin-bottom:6px">Pro lesson</div>
          <div style="color:var(--text2);margin-bottom:16px">This is locked in the prototype. You can unlock it by simulating Pro on the Billing page.</div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <a class="btn btn-ghost" href="topic.html?topic=${encodeURIComponent(topic.slug)}">Back to topic</a>
            <a class="btn btn-amber" href="../account/billing.html">Go to Billing</a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  $$('#lessonTitle').textContent = l.title;
  const cl = $$('#crumbLesson'); if (cl) cl.textContent = l.title;
  const cbt = $$('#crumbBackTopic'); if (cbt) { cbt.textContent = topic.title; cbt.href = `topic.html?topic=${encodeURIComponent(topic.slug)}`; }
  $$('#lessonMeta').textContent = `${topic.title} • ${l.quiz.length} quiz questions • ${l.free ? 'Free' : 'Pro'}`;

  // videos
  const frame = $$('#vidFrame');
  const v0 = l.videoIds[0];
  if (frame) frame.src = `https://www.youtube.com/embed/${v0}?rel=0&modestbranding=1`;

  const vnav = $$('#videoNav');
  if (vnav) {
    vnav.innerHTML = l.videoIds.map((vid, i) => `
      <button class="btn btn-ghost btn-sm vid-btn" data-vid="${vid}" style="${i===0?'border-color:var(--amber);color:var(--amber)':''}">
        ▶ Video ${i+1}
      </button>
    `).join('');

    $$$('.vid-btn', vnav).forEach(btn => {
      btn.addEventListener('click', () => {
        const vid = btn.getAttribute('data-vid');
        if (frame) frame.src = `https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&autoplay=1`;
        $$$('.vid-btn', vnav).forEach(b => { b.style.borderColor=''; b.style.color=''; });
        btn.style.borderColor='var(--amber)'; btn.style.color='var(--amber)';
      });
    });
  }

  // quiz
  let qi = 0;
  let answered = false;

  function renderQ() {
    const total = l.quiz.length;
    const item = l.quiz[qi];
    const pct = Math.round((qi / total) * 100);

    $$('#quizTitle').textContent = `Quick Quiz ... Q${qi+1} of ${total}`;
    $$('#qFill').style.width = pct + '%';
    $$('#qDone').textContent = `${qi}/${total} done`;
    const qb = $$('#qBadge'); if (qb) qb.textContent = `${qi+1}/${total}`;

    const qEl = $$('#qText');
    qEl.innerHTML = item.q;

    const img = $$('#qImage');
    if (img) {
      if (item.image) {
        img.style.display = '';
        img.innerHTML = item.image.startsWith('<svg') ? item.image : `<img src="${item.image}" alt="question graphic" style="width:100%;border-radius:14px;border:1px solid var(--border2)"/>`;
      } else {
        img.style.display = 'none';
        img.innerHTML = '';
      }
    }

    const opts = $$('#qOpts');
    opts.innerHTML = item.opts.map((o,i)=>`
      <div class="quiz-opt" data-i="${i}">
        <div class="opt-letter">${'ABCD'[i]}</div>
        <span>${o}</span>
      </div>
    `).join('');

    answered = false;
    const fb = $$('#qFb');
    fb.className = 'quiz-feedback';
    fb.textContent = '';
    $$('#nextQBtn').style.display = 'none';

    $$$('.quiz-opt', opts).forEach(opt => {
      opt.style.pointerEvents = '';
      opt.classList.remove('correct','wrong');
      opt.addEventListener('click', () => answer(parseInt(opt.getAttribute('data-i'),10)));
    });

    typeset($$('#lessonBody'));
  }

  function answer(idx) {
    if (answered) return;
    answered = true;
    const item = l.quiz[qi];
    const correct = idx === item.ans;

    // mark lesson done after any answered question
    markLessonDone(topic.slug, l.slug);

    const opts = $$('#qOpts');
    $$$('.quiz-opt', opts).forEach((opt,i)=>{
      opt.style.pointerEvents = 'none';
      if (i === item.ans) opt.classList.add('correct');
      else if (i === idx && !correct) opt.classList.add('wrong');
    });

    const fb = $$('#qFb');
    fb.textContent = (correct ? '✓ Correct! ' : '✗ Not quite. ') + item.explain;
    fb.className = `quiz-feedback show ${correct ? 'good' : 'bad'}`;
    $$('#nextQBtn').style.display = '';

    typeset(fb);
    toast(correct ? 'Correct! 🎉' : 'Close ... read the explanation and try again later.', correct ? 'success' : 'info');
  }

  $$('#hintBtn')?.addEventListener('click', () => {
    const item = l.quiz[qi];
    const fb = $$('#qFb');
    fb.textContent = '💡 ' + item.explain;
    fb.className = 'quiz-feedback show hint';
    typeset(fb);
  });

  $$('#nextQBtn')?.addEventListener('click', () => {
    if (qi < l.quiz.length - 1) qi++;
    else qi = 0;
    renderQ();
  });

  // next/prev lesson buttons
  const idx = topic.lessons.findIndex(x => x.slug === l.slug);
  const prev = topic.lessons[idx-1] || null;
  const next = topic.lessons[idx+1] || null;
  const prevBtn = $$('#prevLesson');
  const nextBtn = $$('#nextLesson');

  if (prevBtn) {
    prevBtn.href = prev ? `lesson.html?topic=${encodeURIComponent(topic.slug)}&lesson=${encodeURIComponent(prev.slug)}` : `topic.html?topic=${encodeURIComponent(topic.slug)}`;
    prevBtn.textContent = prev ? '← Previous lesson' : '← Back to topic';
  }
  if (nextBtn) {
    if (next && !lessonLocked(next)) {
      nextBtn.href = `lesson.html?topic=${encodeURIComponent(topic.slug)}&lesson=${encodeURIComponent(next.slug)}`;
      nextBtn.textContent = 'Next lesson →';
    } else if (next && lessonLocked(next)) {
      nextBtn.href = '../account/billing.html';
      nextBtn.textContent = 'Unlock next →';
    } else {
      nextBtn.href = `topic.html?topic=${encodeURIComponent(topic.slug)}`;
      nextBtn.textContent = 'Back to topic →';
    }
  }

  renderQ();
}

function renderAccount() {
  const u = currentUser();
  if (!u) {
    $$('#acctBody').innerHTML = `
      <div class="panel">
        <div class="panel-b" style="text-align:center">
          <div style="font-size:40px;margin-bottom:10px">👤</div>
          <div style="font-family:var(--font-head);font-weight:900;margin-bottom:6px">Sign in to manage your account</div>
          <div style="color:var(--text2);margin-bottom:16px">Accounts are local to this device for now.</div>
          <button class="btn btn-amber" onclick="openModal('login')">Sign in</button>
        </div>
      </div>
    `;
    return;
  }

  $$('#acctName').value = u.name || '';
  $$('#acctEmail').value = u.email || '';
  $$('#acctPlan').textContent = userHasPro(u) ? 'Pro' : 'Free';

  $$('#saveProfile')?.addEventListener('click', () => {
    const users = loadUsers();
    const idx = users.findIndex(x => x.id === u.id);
    if (idx < 0) return;
    users[idx].name = ($$('#acctName').value || '').trim() || users[idx].name;
    saveUsers(users);
    setCurrent({ ...u, name: users[idx].name });
    refreshNav();
    toast('Saved.', 'success');
  });

  $$('#changePass')?.addEventListener('click', async () => {
    const pw1 = $$('#pw1').value || '';
    const pw2 = $$('#pw2').value || '';
    if (pw1.length < 8) { toast('Password must be 8+ characters.', 'info'); return; }
    if (pw1 !== pw2) { toast('Passwords do not match.', 'info'); return; }
    const users = loadUsers();
    const idx = users.findIndex(x => x.id === u.id);
    if (idx < 0) return;
    users[idx].passHash = await sha256(pw1);
    saveUsers(users);
    $$('#pw1').value = ''; $$('#pw2').value = '';
    toast('Password updated.', 'success');
  });

  $$('#exportData')?.addEventListener('click', () => {
    const p = loadProgress();
    const blob = new Blob([JSON.stringify({ user:u, progress:p }, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mathletica-export.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Exported JSON.', 'success');
  });
}

function renderBilling() {
  const u = currentUser();
  const wrap = $$('#billBody');
  if (!wrap) return;

  if (!u) {
    wrap.innerHTML = `
      <div class="panel">
        <div class="panel-b" style="text-align:center">
          <div style="font-size:40px;margin-bottom:10px">💳</div>
          <div style="font-family:var(--font-head);font-weight:900;margin-bottom:6px">Sign in first</div>
          <div style="color:var(--text2);margin-bottom:16px">Billing is simulated locally for now.</div>
          <button class="btn btn-amber" onclick="openModal('login')">Sign in</button>
        </div>
      </div>
    `;
    return;
  }

  const pro = userHasPro(u);
  wrap.innerHTML = `
    <div class="panel">
      <div class="panel-h"><h3>Plan</h3><span class="badge ${pro?'ok':'warn'}">${pro?'Pro active':'Free'}</span></div>
      <div class="panel-b">
        <p style="color:var(--text2);line-height:1.7;margin-bottom:14px">
          This is your personal prototype, so payments are <strong>simulated</strong>.
          Use the buttons below to switch plans on this device.
        </p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-amber" id="btnGoPro">Simulate Pro</button>
          <button class="btn btn-ghost" id="btnGoFree">Switch to Free</button>
          <button class="btn btn-ghost" id="btnTrial">Start 7-day Trial</button>
        </div>
        <div class="help">Later, this page is where Stripe (or whatever) would live: payment method, invoices, cancellations.</div>
      </div>
    </div>

    <div class="panel" style="margin-top:14px">
      <div class="panel-h"><h3>Payment method</h3><span class="badge">Prototype</span></div>
      <div class="panel-b">
        <div style="color:var(--text2)">No card stored. (Because: no backend yet.)</div>
      </div>
    </div>

    <div class="panel" style="margin-top:14px">
      <div class="panel-h"><h3>Invoices</h3><span class="badge">Prototype</span></div>
      <div class="panel-b">
        <table class="table">
          <thead><tr><th>Date</th><th>Description</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>...</td><td>No invoices yet</td><td><span class="badge">N/A</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  const users = loadUsers();
  const idx = users.findIndex(x => x.id === u.id);

  function syncCurrentFromUsers() {
    const uu = loadUsers().find(x => x.id === u.id);
    if (!uu) return;
    setCurrent({ id:uu.id, email:uu.email, name:uu.name, role:uu.role, plan:uu.plan, trialEnds:uu.trialEnds });
    refreshNav();
  }

  $$('#btnGoPro')?.addEventListener('click', () => {
    const us = loadUsers();
    const i = us.findIndex(x => x.id === u.id);
    if (i<0) return;
    us[i].plan = 'pro';
    us[i].trialEnds = null;
    saveUsers(us);
    syncCurrentFromUsers();
    toast('Pro simulated. Locked lessons now open.', 'success');
    renderBilling();
  });

  $$('#btnGoFree')?.addEventListener('click', () => {
    const us = loadUsers();
    const i = us.findIndex(x => x.id === u.id);
    if (i<0) return;
    us[i].plan = 'free';
    us[i].trialEnds = null;
    saveUsers(us);
    syncCurrentFromUsers();
    toast('Switched to Free.', 'info');
    renderBilling();
  });

  $$('#btnTrial')?.addEventListener('click', () => {
    const us = loadUsers();
    const i = us.findIndex(x => x.id === u.id);
    if (i<0) return;
    const end = new Date(Date.now() + 7*24*60*60*1000).toISOString();
    us[i].trialEnds = end;
    us[i].plan = 'free';
    saveUsers(us);
    syncCurrentFromUsers();
    toast('Trial started (7 days).', 'success');
    renderBilling();
  });
}

function renderAdmin() {
  const u = currentUser();
  if (!u || !(u.role === 'staff' || u.role === 'admin')) {
    $$('#adminBody').innerHTML = `
      <div class="panel">
        <div class="panel-b" style="text-align:center">
          <div style="font-size:40px;margin-bottom:10px">🛡️</div>
          <div style="font-family:var(--font-head);font-weight:900;margin-bottom:6px">Staff only</div>
          <div style="color:var(--text2);margin-bottom:16px">Sign in with the staff account to access admin tools.</div>
          <button class="btn btn-amber" onclick="openModal('login')">Sign in</button>
          <div class="help" style="margin-top:10px">Default staff login: admin@mathletica.local / admin1234</div>
        </div>
      </div>
    `;
    return;
  }

  const list = $$('#userTableBody');
  const search = $$('#userSearch');
  const render = () => {
    const users = loadUsers();
    const term = (search?.value || '').trim().toLowerCase();
    const filtered = term ? users.filter(x => (x.email+x.name).toLowerCase().includes(term)) : users;

    list.innerHTML = filtered.map(x => `
      <tr>
        <td>${escapeHtml(x.name || '...')}</td>
        <td>${escapeHtml(x.email)}</td>
        <td><span class="badge ${x.role==='staff'?'warn':'ok'}">${x.role}</span></td>
        <td><span class="badge ${x.plan==='pro' || (x.trialEnds && new Date(x.trialEnds)>new Date()) ? 'ok':'warn'}">
          ${x.plan==='pro' ? 'Pro' : (x.trialEnds && new Date(x.trialEnds)>new Date() ? 'Trial' : 'Free')}
        </span></td>
        <td>
          <button class="btn btn-ghost btn-sm" data-act="togglePro" data-id="${x.id}">Toggle Pro</button>
          <button class="btn btn-ghost btn-sm" data-act="resetPw" data-id="${x.id}">Reset PW</button>
        </td>
      </tr>
    `).join('');

    $$$('button[data-act]', list).forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const act = btn.getAttribute('data-act');
        if (act === 'togglePro') {
          const us = loadUsers();
          const i = us.findIndex(z => z.id === id);
          if (i<0) return;
          us[i].plan = us[i].plan === 'pro' ? 'free' : 'pro';
          us[i].trialEnds = null;
          saveUsers(us);
          toast('Updated plan.', 'success');
          render();
          if (currentUser()?.id === id) { setCurrent({ ...getCurrent(), plan: us[i].plan, trialEnds: null }); refreshNav(); }
        }
        if (act === 'resetPw') {
          const us = loadUsers();
          const i = us.findIndex(z => z.id === id);
          if (i<0) return;
          us[i].passHash = await sha256('password123');
          saveUsers(us);
          toast('Password reset to password123', 'info');
        }
      });
    });
  };

  search?.addEventListener('input', render);

  $$('#btnExportUsers')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(loadUsers(), null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mathletica-users.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });

  render();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[ch]));
}

/* ---------- Init ---------- */
async function init() {
  await ensureSeedUsers();
  refreshNav();

  // wire modal buttons
  $$('#navSignIn')?.addEventListener('click', () => openModal('login'));
  $$('#navSignOut')?.addEventListener('click', () => signOut());

  // per-page render
  const page = document.body.dataset.page || 'home';
  if (page === 'home') renderHome();
  if (page === 'std2-index') renderStd2Index();
  if (page === 'std2-topic') renderStd2Topic();
  if (page === 'std2-lesson') renderStd2Lesson();
  if (page === 'account') renderAccount();
  if (page === 'billing') renderBilling();
  if (page === 'admin') renderAdmin();

  // close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.addEventListener('load', () => {
  // expose for inline handlers (kept for compatibility)
  Object.assign(window, { openModal, closeModal, switchAuth, handleAuth, toast });
  init().catch((e) => {
    console.error(e);
    toast('App failed to start. Check console.', 'info');
  });
});
