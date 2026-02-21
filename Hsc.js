// =============================================
// MATHLETICA HSC — APPLICATION
// =============================================

const curriculum = {
  standard2: {
    label:'Standard 2',tag:'tag-std',color:'#3b82f6',
    topics:[
      {id:'std-algebra',name:'Algebra',code:'MS-A4',sub:'Types of Relationships',free:true,
        videos:[{id:'NybHckSEQBI',title:'Linear Relationships',dur:'12:34'},{id:'HsUVPqcLUj4',title:'Non-Linear Relationships',dur:'9:21'}],
        quizzes:[
          {q:'The equation $y = 3x - 2$ represents a linear relationship. What is the gradient?',opts:['$-2$','$3$','$2$','$-3$'],ans:1,explain:'In $y = mx + b$, $m$ is the gradient. Here $m = 3$.'},
          {q:'Which of the following is NOT a linear equation?',opts:['$y = 5x + 1$','$y = x^2 + 3$','$y = -2x$','$2x + 3y = 6$'],ans:1,explain:'$y = x^2 + 3$ is quadratic because of the $x^2$ term.'},
          {q:'What is the $y$-intercept of $y = 4x - 7$?',opts:['$4$','$-4$','$7$','$-7$'],ans:3,explain:'The $y$-intercept is $b = -7$ in $y = mx + b$.'}
        ]
      },
      {id:'std-measurement',name:'Measurement',code:'MS-M6',sub:'Non-right-angled Trigonometry',free:true,
        videos:[{id:'Qm9U0wTOJQo',title:'The Sine Rule',dur:'14:02'},{id:'QIFPp8oJV0U',title:'The Cosine Rule',dur:'11:45'}],
        quizzes:[
          {q:'In the Sine Rule $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$. If $a=8$, $A=30°$, $B=45°$, find $b$ (to 2 d.p.)',opts:['$11.31$','$5.66$','$8.00$','$16.00$'],ans:0,explain:'$b = \\frac{8 \\sin 45°}{\\sin 30°} = \\frac{8 \\times 0.7071}{0.5} \\approx 11.31$'},
          {q:'The Cosine Rule $c^2 = a^2 + b^2 - 2ab\\cos C$. What does it reduce to when $C = 90°$?',opts:['$c^2 = a^2 - b^2$','$c^2 = a^2 + b^2$','$c^2 = 2ab$','$c = a + b$'],ans:1,explain:'$\\cos 90° = 0$, so $c^2 = a^2 + b^2$ — the Pythagorean theorem.'},
          {q:'The area of a triangle with sides $a$, $b$ and included angle $C$ is:',opts:['$ab\\sin C$','$\\frac{1}{2}ab\\cos C$','$\\frac{1}{2}ab\\sin C$','$2ab\\sin C$'],ans:2,explain:'Area $= \\frac{1}{2}ab\\sin C$. This formula works for any triangle given two sides and the included angle.'}
        ]
      },
      {id:'std-finance',name:'Financial Mathematics',code:'MS-F4',sub:'Investments and Loans',free:false,
        videos:[{id:'wJ1OzQSZxH0',title:'Compound Interest',dur:'10:15'},{id:'KXuR_BX-hts',title:'Annuities',dur:'13:08'}],
        quizzes:[
          {q:'In the compound interest formula $A = P(1+r)^n$, what does $r$ represent?',opts:['The total amount','The number of periods','The interest rate per period','The principal'],ans:2,explain:'$r$ is the interest rate per compounding period, written as a decimal (e.g. 5% = 0.05).'},
          {q:'$\\$2000$ is invested at 4% p.a. compounded annually for 3 years. Find $A$.',opts:['$\\$2240.00$','$\\$2249.73$','$\\$2160.00$','$\\$2080.00$'],ans:1,explain:'$A = 2000(1.04)^3 = 2000 \\times 1.124864 = \\$2249.73$'}
        ]
      },
      {id:'std-stats',name:'Statistical Analysis',code:'MS-S4',sub:'Bivariate Data Analysis',free:false,
        videos:[{id:'GwqD_Td2FzQ',title:'Scatter Plots & Correlation',dur:'11:32'},{id:'ZkjP5RJLQF0',title:"Pearson's Coefficient",dur:'8:44'}],
        quizzes:[
          {q:"A correlation coefficient $r = -0.92$ indicates:",opts:['Strong positive linear relationship','Weak negative relationship','Strong negative linear relationship','No relationship'],ans:2,explain:'$r$ close to $-1$ indicates a strong negative linear relationship. $-0.92$ is very close to $-1$.'},
          {q:'Which value of $r$ indicates the strongest linear relationship?',opts:['$r = 0.45$','$r = -0.89$','$r = 0.12$','$r = -0.31$'],ans:1,explain:'The strength is measured by how close $|r|$ is to 1. $|-0.89| = 0.89$ is the largest here.'}
        ]
      },
      {id:'std-networks',name:'Networks & Paths',code:'MS-N2',sub:'Network Concepts',free:false,
        videos:[{id:'hd_FhH9nJyc',title:'Introduction to Networks',dur:'9:17'},{id:'YnNfWm0lzHE',title:'Minimum Spanning Trees',dur:'12:50'}],
        quizzes:[
          {q:'The degree of a vertex in a network is:',opts:['The number of vertices in the network','The number of edges connected to that vertex','The weight of the heaviest edge','The total weight of all edges'],ans:1,explain:'The degree counts how many edges are incident to (connected to) that vertex.'},
          {q:"Euler's theorem states a graph has an Eulerian circuit if and only if:",opts:['It has exactly 2 vertices of odd degree','All vertices have even degree','It is connected and has 4 vertices','It has no cycles'],ans:1,explain:'An Eulerian circuit (traversing every edge once and returning to start) exists iff every vertex has even degree.'}
        ]
      }
    ]
  },

  advanced:{
    label:'Advanced',tag:'tag-adv',color:'#10b981',
    topics:[
      {id:'adv-functions',name:'Functions',code:'MA-F1',sub:'Working with Functions',free:true,
        videos:[{id:'51LGV3LbRxk',title:'Domain and Range',dur:'13:22'},{id:'mQ-4h5BXPFQ',title:'Composite & Inverse Functions',dur:'16:41'}],
        quizzes:[
          {q:'The domain of $f(x) = \\sqrt{x - 3}$ is:',opts:['$x < 3$','$x \\leq 3$','$x \\geq 3$','All real $x$'],ans:2,explain:'We need $x - 3 \\geq 0$, so $x \\geq 3$. The radicand must be non-negative.'},
          {q:'If $f(x) = 2x + 1$ and $g(x) = x^2$, find $f(g(3))$.',opts:['$19$','$49$','$7$','$13$'],ans:0,explain:'$g(3) = 9$, then $f(9) = 2(9) + 1 = 19$.'},
          {q:'The inverse of $f(x) = 3x - 6$ is:',opts:['$f^{-1}(x) = \\frac{x+6}{3}$','$f^{-1}(x) = \\frac{x-6}{3}$','$f^{-1}(x) = 3x+6$','$f^{-1}(x) = \\frac{1}{3x-6}$'],ans:0,explain:'Swap $x$ and $y$: $x = 3y-6$, solve: $y = \\frac{x+6}{3}$.'}
        ]
      },
      {id:'adv-trig',name:'Trigonometric Functions',code:'MA-T2',sub:'Trig Functions & Identities',free:true,
        videos:[{id:'a5iFv_qRHfk',title:'Radians and the Unit Circle',dur:'14:55'},{id:'Oc33F0YlDf0',title:'Pythagorean Identities',dur:'10:28'}],
        quizzes:[
          {q:'$\\pi$ radians equals how many degrees?',opts:['$90°$','$360°$','$180°$','$270°$'],ans:2,explain:'The conversion is $\\pi$ rad $= 180°$.'},
          {q:'Using $\\sin^2\\theta + \\cos^2\\theta = 1$: if $\\sin\\theta = \\frac{3}{5}$ (Q1), find $\\cos\\theta$.',opts:['$\\frac{4}{5}$','$\\frac{3}{4}$','$\\frac{5}{4}$','$\\frac{2}{5}$'],ans:0,explain:'$\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$, so $\\cos\\theta = \\frac{4}{5}$.'},
          {q:'The period of $y = \\sin(2x)$ is:',opts:['$2\\pi$','$\\pi$','$\\frac{\\pi}{2}$','$4\\pi$'],ans:1,explain:'Period $= \\frac{2\\pi}{n}$ where $n$ is the coefficient of $x$. So period $= \\frac{2\\pi}{2} = \\pi$.'}
        ]
      },
      {id:'adv-calculus-diff',name:'Differentiation',code:'MA-C1',sub:'Introduction to Differentiation',free:false,
        videos:[{id:'WsQQvHm4lSw',title:'Limits and the Derivative',dur:'17:03'},{id:'rAof9Ld5sOg',title:'Differentiating Polynomials',dur:'11:19'},{id:'H9eCT6f_Ftc',title:'Chain, Product & Quotient Rules',dur:'19:44'}],
        quizzes:[
          {q:'Find $\\frac{d}{dx}[5x^3 - 2x^2 + 7x - 1]$',opts:['$15x^2 - 4x + 7$','$15x^2 - 2x + 7$','$5x^2 - 4x + 7$','$15x^3 - 4x + 7$'],ans:0,explain:'Power rule term by term: $15x^2 - 4x + 7$.'},
          {q:'Using the chain rule, find $\\frac{d}{dx}[(3x+1)^4]$',opts:['$4(3x+1)^3$','$12(3x+1)^3$','$(3x+1)^3$','$12x(3x+1)^3$'],ans:1,explain:'Chain rule: $4(3x+1)^3 \\times 3 = 12(3x+1)^3$.'},
          {q:'The gradient of $y = x^3 - 3x$ at $x = 2$ is:',opts:['$9$','$6$','$2$','$12$'],ans:0,explain:"$y' = 3x^2 - 3$. At $x=2$: $3(4)-3 = 9$."}
        ]
      },
      {id:'adv-calculus-int',name:'Integration',code:'MA-C4',sub:'Integral Calculus',free:false,
        videos:[{id:'qFJPBmr26Q4',title:'The Definite Integral',dur:'15:36'},{id:'viaPc8zDcQI',title:'Area Under a Curve',dur:'13:22'}],
        quizzes:[
          {q:'Evaluate $\\int_1^3 2x \\, dx$',opts:['$4$','$8$','$6$','$12$'],ans:1,explain:'$[x^2]_1^3 = 9 - 1 = 8$.'},
          {q:'Find $\\int (3x^2 + 4x) \\, dx$',opts:['$6x + 4 + C$','$x^3 + 2x^2 + C$','$3x^3 + 2x^2 + C$','$x^3 + 4x^2 + C$'],ans:1,explain:'Integrate term by term: $x^3 + 2x^2 + C$.'}
        ]
      },
      {id:'adv-explog',name:'Exponential & Logarithmic',code:'MA-E1',sub:'Logs and Exponentials',free:false,
        videos:[{id:'fgcpOMFhY_4',title:'Logarithm Laws',dur:'12:07'},{id:'1bGXMxpFeiQ',title:"Differentiating $e^x$ and $\\ln x$",dur:'10:33'}],
        quizzes:[
          {q:'Simplify $\\log_2 8 + \\log_2 4$',opts:['$\\log_2 12$','$5$','$\\log_2 32$','Both B and C'],ans:3,explain:'$\\log_2 8 + \\log_2 4 = \\log_2(8 \\times 4) = \\log_2 32 = 5$. So both B and C are correct.'},
          {q:'$\\frac{d}{dx}[e^{3x}]$ equals:',opts:['$e^{3x}$','$3e^{3x}$','$e^{3x+1}$','$\\frac{e^{3x}}{3}$'],ans:1,explain:'Chain rule: $e^{3x} \\times 3 = 3e^{3x}$.'}
        ]
      }
    ]
  },

  ext1:{
    label:'Extension 1',tag:'tag-ext1',color:'#8b5cf6',
    topics:[
      {id:'e1-proof',name:'Proof by Induction',code:'ME-P1',sub:'Mathematical Induction',free:true,
        videos:[{id:'wblW_M_HVQ8',title:'Introduction to Mathematical Induction',dur:'16:42'},{id:'Al7MeKMHkH0',title:'Induction — Worked Examples',dur:'14:19'}],
        quizzes:[
          {q:'In proof by induction, after proving the base case, the inductive step assumes the statement holds for $n = k$ and proves it for:',opts:['$n = k - 1$','$n = k + 1$','All $n$','$n = 2k$'],ans:1,explain:'The inductive step: assume true for $n = k$, prove true for $n = k + 1$.'},
          {q:'To prove $\\sum_{r=1}^{n} r = \\frac{n(n+1)}{2}$, the base case $n=1$ gives LHS $=$',opts:['$1$','$2$','$0$','$3$'],ans:0,explain:'LHS $= 1$. RHS $= \\frac{1 \\times 2}{2} = 1$. ✓'},
          {q:'Which step makes mathematical induction logically valid?',opts:['Proving it for many cases','Assuming it for a general $k$ and proving for $k+1$','Showing the formula works for $n=100$','Checking a finite number of cases'],ans:1,explain:'The inductive step creates a chain: if true for $k$, true for $k+1$; combined with the base case, true for all $n \\geq$ base.'}
        ]
      },
      {id:'e1-vectors',name:'Vectors',code:'ME-V1',sub:'Introduction to Vectors',free:true,
        videos:[{id:'YJST4MOXUV8',title:'Vectors in Two Dimensions',dur:'15:08'},{id:'UrJBnOXGR7s',title:'Vector Operations',dur:'13:55'}],
        quizzes:[
          {q:'The magnitude of $\\vec{v} = (3, -4)$ is:',opts:['$1$','$7$','$5$','$25$'],ans:2,explain:'$|\\vec{v}| = \\sqrt{3^2 + (-4)^2} = \\sqrt{25} = 5$.'},
          {q:'If $\\vec{a} = (2, 5)$ and $\\vec{b} = (-1, 3)$, find $\\vec{a} + \\vec{b}$.',opts:['$(1, 8)$','$(3, 2)$','$(-2, 15)$','$(1, 2)$'],ans:0,explain:'$(2-1,\\, 5+3) = (1, 8)$.'},
          {q:'The dot product $\\vec{a} \\cdot \\vec{b} = \\mathbf{0}$ means the vectors are:',opts:['Parallel','Perpendicular','Equal','Anti-parallel'],ans:1,explain:'$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$. If this equals 0 and neither vector is zero, then $\\cos\\theta = 0$, so $\\theta = 90°$ — perpendicular.'}
        ]
      },
      {id:'e1-trig',name:'Trigonometric Equations',code:'ME-T3',sub:'Solving Trig Equations',free:false,
        videos:[{id:'sPqSjbFBqmk',title:'Solving $\\sin x = k$',dur:'12:14'},{id:'KXuR_BX-hts',title:'Double Angle Formulae',dur:'14:30'}],
        quizzes:[
          {q:'The general solution to $\\sin\\theta = \\frac{1}{2}$ is:',opts:['$\\theta = 30°$ only','$30° + 360°n$ or $150° + 360°n$','$30° + 180°n$','$\\pm 30° + 360°n$'],ans:1,explain:'$\\sin = \\frac{1}{2}$ in Q1 gives $30°$, in Q2 gives $150°$. General: $30° + 360°n$ or $150° + 360°n$.'},
          {q:'Simplify $\\sin(2\\theta)$ using double angle formula:',opts:['$2\\sin\\theta$','$2\\cos^2\\theta - 1$','$2\\sin\\theta\\cos\\theta$','$\\sin^2\\theta - \\cos^2\\theta$'],ans:2,explain:'$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta$. This is one of the essential double angle identities.'}
        ]
      },
      {id:'e1-calculus',name:'Further Calculus',code:'ME-C2',sub:'Further Calculus Skills',free:false,
        videos:[{id:'CkOgIBBNAfQ',title:'Integration by Substitution',dur:'18:22'},{id:'mQ-4h5BXPFQ',title:'Related Rates',dur:'15:00'}],
        quizzes:[
          {q:'For $\\int 2x(x^2+1)^3 dx$ with $u = x^2+1$, what is $du$?',opts:['$du = x\\,dx$','$du = 2\\,dx$','$du = 2x\\,dx$','$du = x^2\\,dx$'],ans:2,explain:'$u = x^2+1 \\Rightarrow \\frac{du}{dx} = 2x \\Rightarrow du = 2x\\,dx$.'},
          {q:'$\\int \\cos(3x)\\,dx$ equals:',opts:['$-\\sin(3x)+C$','$\\frac{\\sin(3x)}{3}+C$','$3\\sin(3x)+C$','$-\\frac{\\cos(3x)}{3}+C$'],ans:1,explain:'Reverse chain rule: $\\int \\cos(3x)\\,dx = \\frac{\\sin(3x)}{3}+C$.'}
        ]
      },
      {id:'e1-binomial',name:'Binomial Distribution',code:'ME-S1',sub:'Discrete Probability',free:false,
        videos:[{id:'8idr1WZ1A7Q',title:'The Binomial Theorem',dur:'13:47'},{id:'XBAiOHvO8HM',title:'Binomial Probability',dur:'15:11'}],
        quizzes:[
          {q:'A fair coin is flipped 4 times. $P(\\text{exactly 2 heads}) =$',opts:['$\\frac{1}{4}$','$\\frac{3}{8}$','$\\frac{1}{2}$','$\\frac{1}{8}$'],ans:1,explain:'$P(X=2) = \\binom{4}{2}(\\tfrac{1}{2})^4 = 6 \\times \\tfrac{1}{16} = \\tfrac{3}{8}$.'},
          {q:'For a binomial distribution $X \\sim B(n,p)$, the mean is:',opts:['$np(1-p)$','$np$','$\\sqrt{np(1-p)}$','$p^n$'],ans:1,explain:'$E(X) = np$. The variance is $np(1-p)$.'}
        ]
      }
    ]
  },

  ext2:{
    label:'Extension 2',tag:'tag-ext2',color:'#f5a623',
    topics:[
      {id:'e2-proof',name:'The Nature of Proof',code:'MEX-P1',sub:'Proof techniques',free:true,
        videos:[{id:'04Cnh4O_pSY',title:'Proof by Contradiction',dur:'14:33'},{id:'zHbfQ4XB7TY',title:'Proof by Contrapositive',dur:'11:08'}],
        quizzes:[
          {q:'In proof by contradiction, we assume:',opts:['The statement is true and derive the conclusion','The statement is false and derive a contradiction','A special case of the statement','The contrapositive'],ans:1,explain:'We assume the negation, derive a contradiction, so the original statement must be true.'},
          {q:'The contrapositive of "$P \\Rightarrow Q$" is:',opts:['$Q \\Rightarrow P$','$\\neg P \\Rightarrow \\neg Q$','$\\neg Q \\Rightarrow \\neg P$','$P \\Rightarrow \\neg Q$'],ans:2,explain:'The contrapositive is $\\neg Q \\Rightarrow \\neg P$, logically equivalent to $P \\Rightarrow Q$.'},
          {q:'To prove $\\sqrt{2}$ is irrational by contradiction, we start by assuming:',opts:['$\\sqrt{2}$ is irrational','$\\sqrt{2} = \\frac{p}{q}$ in lowest terms','$2$ is prime','$\\sqrt{2} > 1$'],ans:1,explain:'Assume $\\sqrt{2} = \\frac{p}{q}$ in lowest terms (i.e. rational). Squaring gives $2q^2 = p^2$, forcing both to be even — a contradiction.'}
        ]
      },
      {id:'e2-complex',name:'Complex Numbers',code:'MEX-N1',sub:'Introduction to Complex Numbers',free:true,
        videos:[{id:'SP-YJe7Vldo',title:'Introducing $i = \\sqrt{-1}$',dur:'13:19'},{id:'T647CGsuOVU',title:'The Argand Diagram',dur:'12:44'},{id:'BSRYWbzlKGg',title:'Modulus and Argument',dur:'10:58'}],
        quizzes:[
          {q:'The modulus of $z = 3 + 4i$ is:',opts:['$7$','$1$','$5$','$25$'],ans:2,explain:'$|z| = \\sqrt{3^2+4^2} = \\sqrt{25} = 5$.'},
          {q:'$(2+3i)+(1-5i) =$',opts:['$3-2i$','$3+8i$','$1-2i$','$2-2i$'],ans:0,explain:'$(2+1)+(3-5)i = 3-2i$.'},
          {q:"Euler's formula gives $e^{i\\pi} =$",opts:['$0$','$1$','$-1$','$i$'],ans:2,explain:"$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1+0 = -1$. This is Euler's famous identity."}
        ]
      },
      {id:'e2-induction',name:'Further Induction',code:'MEX-P2',sub:'Induction — Inequalities & Divisibility',free:false,
        videos:[{id:'nuNAlQg9rG8',title:'Induction with Inequalities',dur:'15:49'},{id:'LGDi_DmSxXM',title:'Divisibility Proofs',dur:'12:06'}],
        quizzes:[
          {q:'In a divisibility induction proof for $6 \\mid 7^n-1$, the inductive step writes $7^{k+1}-1$ as:',opts:['$7(7^k-1)+6$','$7^k+1-1$','$6 \\cdot 7^k$','$7^{k+1}$'],ans:0,explain:'$7^{k+1}-1 = 7 \\cdot 7^k - 1 = 7(7^k-1)+6$. Since $6 \\mid 7^k-1$ and $6 \\mid 6$, done.'}
        ]
      },
      {id:'e2-integration',name:'Further Integration',code:'MEX-C1',sub:'Advanced Integration',free:false,
        videos:[{id:'xRyXz_8uK3s',title:'Integration by Parts',dur:'16:22'},{id:'NybHckSEQBI',title:'Partial Fractions',dur:'14:07'}],
        quizzes:[
          {q:'For $\\int x e^x dx$ using integration by parts, a good choice is:',opts:['$u=e^x$, $dv=x\\,dx$','$u=x$, $dv=e^x\\,dx$','$u=x^2$, $dv=e^x\\,dx$','Either works equally'],ans:1,explain:'Choose $u=x$ (differentiates to a constant) and $dv=e^x\\,dx$ (easy to integrate). This simplifies the remaining integral.'},
          {q:'$\\int x e^x dx =$',opts:['$xe^x - e^x + C$','$xe^x + e^x + C$','$x^2 e^x + C$','$e^x + C$'],ans:0,explain:'$\\int x e^x dx = xe^x - \\int e^x dx = xe^x - e^x + C = e^x(x-1)+C$.'}
        ]
      },
      {id:'e2-mechanics',name:'Mechanics',code:'MEX-M1',sub:'Calculus applied to Mechanics',free:false,
        videos:[{id:'CkOgIBBNAfQ',title:'Simple Harmonic Motion',dur:'18:03'},{id:'j4jCE0TFFGQ',title:'Projectile Motion',dur:'16:55'}],
        quizzes:[
          {q:'In SHM, $\\ddot{x} = -n^2 x$. The period is:',opts:['$\\frac{n}{2\\pi}$','$n$','$\\frac{2\\pi}{n}$','$2\\pi n$'],ans:2,explain:'Period $T = \\frac{2\\pi}{n}$, from $x(t) = A\\cos(nt+\\phi)$.'},
          {q:'A particle in SHM has $x = 3\\cos(2t)$. Its amplitude is:',opts:['$2$','$3$','$6$','$\\pi$'],ans:1,explain:'In $x = A\\cos(nt)$, $A$ is the amplitude. Here $A = 3$.'}
        ]
      }
    ]
  }
};

// =============================================
// STATE
// =============================================
const state = {
  course: 'standard2',
  topicIdx: 0,
  quizIdx: 0,
  quizAnswered: false,
  user: JSON.parse(localStorage.getItem('ml-user') || 'null'),
  progress: JSON.parse(localStorage.getItem('ml-progress') || '{}'),
  streak: parseInt(localStorage.getItem('ml-streak') || '0'),
  xp: parseInt(localStorage.getItem('ml-xp') || '0'),
  solved: parseInt(localStorage.getItem('ml-solved') || '0'),
  correct: parseInt(localStorage.getItem('ml-correct') || '0'),
};

function save() {
  localStorage.setItem('ml-progress', JSON.stringify(state.progress));
  localStorage.setItem('ml-streak', state.streak);
  localStorage.setItem('ml-xp', state.xp);
  localStorage.setItem('ml-solved', state.solved);
  localStorage.setItem('ml-correct', state.correct);
}

// =============================================
// CURRICULUM RENDERING
// =============================================
function selectCourse(course) {
  state.course = course;
  state.topicIdx = 0;
  state.quizIdx = 0;
  state.quizAnswered = false;
  document.querySelectorAll('.ctab').forEach((t, i) => {
    t.classList.toggle('active', Object.keys(curriculum)[i] === course);
  });
  renderTopicList();
  renderTopicContent();
}

function selectTopic(idx) {
  state.topicIdx = idx;
  state.quizIdx = 0;
  state.quizAnswered = false;
  renderTopicList();
  renderTopicContent();
}

function renderTopicList() {
  const data = curriculum[state.course];
  document.getElementById('topicList').innerHTML = data.topics.map((t, i) => `
    <div class="topic-item ${i === state.topicIdx ? 'active' : ''}" onclick="selectTopic(${i})">
      <div>
        <div class="topic-item-name">${t.name}</div>
        <div class="topic-item-sub">${t.code}</div>
      </div>
      <span class="topic-badge ${t.free ? 'badge-free' : 'badge-pro'}">${t.free ? 'Free' : 'Pro'}</span>
    </div>
  `).join('');
}

function renderTopicContent() {
  const data = curriculum[state.course];
  const topic = data.topics[state.topicIdx];
  const locked = !topic.free && !state.user;
  const pKey = `${state.course}-${topic.id}`;
  const done = state.progress[pKey] || 0;
  const el = document.getElementById('topicContent');

  el.innerHTML = `
    <div class="topic-header">
      <div class="topic-h-left">
        <h2>${topic.name}</h2>
        <p>${topic.code} — ${topic.sub}</p>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <span class="chip ${topic.free ? 'chip-free' : 'chip-pro'}">${topic.free ? '✓ Free' : '★ Pro'}</span>
        <span class="tag ${data.tag}">${data.label}</span>
      </div>
    </div>

    <div class="topic-meta">
      <div class="tmeta-item"><div class="tmeta-label">Videos</div><div class="tmeta-val">${topic.videos.length}</div></div>
      <div class="tmeta-item"><div class="tmeta-label">Questions</div><div class="tmeta-val">${topic.quizzes.length}</div></div>
      <div class="tmeta-item"><div class="tmeta-label">Completed</div><div class="tmeta-val">${done}/${topic.quizzes.length}</div></div>
    </div>

    ${buildVideoSection(topic, locked)}
    <div class="quiz-section">${buildQuiz(topic, locked)}</div>
  `;

  typesetMath(el);
}

function buildVideoSection(topic, locked) {
  const v = topic.videos[0];
  const navBtns = topic.videos.map((v2, i) => `
    <button class="btn btn-ghost btn-sm vid-btn" onclick="${locked ? "openModal('signup')" : `swapVideo('${v2.id}',this)`}" style="${i===0&&!locked?'border-color:var(--amber);color:var(--amber)':''}">
      ▶ ${v2.title} <span style="color:var(--text3);font-weight:400;margin-left:4px">${v2.dur}</span>
    </button>`).join('');

  if (locked) {
    return `
      <div>
        <div class="video-wrap">
          <iframe src="https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1" allowfullscreen></iframe>
          <div class="video-locked">
            <div class="lock-icon">🔒</div>
            <h3>Pro lesson</h3>
            <p>Start your free trial to unlock all video lessons and quizzes.</p>
            <button class="btn btn-amber" onclick="openModal('signup')">Start free trial</button>
          </div>
        </div>
        <div class="video-nav">${navBtns}</div>
      </div>`;
  }
  return `
    <div>
      <div class="video-wrap">
        <iframe id="vidFrame" src="https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1" allowfullscreen></iframe>
      </div>
      <div class="video-nav">${navBtns}</div>
    </div>`;
}

function swapVideo(id, btn) {
  const f = document.getElementById('vidFrame');
  if (f) f.src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;
  document.querySelectorAll('.vid-btn').forEach(b => { b.style.borderColor=''; b.style.color=''; });
  if (btn) { btn.style.borderColor='var(--amber)'; btn.style.color='var(--amber)'; }
}

function buildQuiz(topic, locked) {
  const total = topic.quizzes.length;
  const q = topic.quizzes[state.quizIdx];
  if (!q) return '<p style="color:var(--text3);font-size:14px">No quiz for this topic yet.</p>';

  if (locked && state.quizIdx >= 2) {
    return `
      <div class="quiz-title">Quick Quiz</div>
      <div style="text-align:center;padding:32px;color:var(--text2)">
        <div style="font-size:40px;margin-bottom:14px">🔒</div>
        <p style="font-size:15px;margin-bottom:20px">Unlock all ${total} questions with a Pro trial</p>
        <button class="btn btn-amber" onclick="openModal('signup')">Start 7-day free trial</button>
      </div>`;
  }

  const pct = Math.round((state.quizIdx / total) * 100);
  return `
    <div class="quiz-title">Quick Quiz — Q${state.quizIdx+1} of ${total}</div>
    <div class="quiz-progress">
      <div class="qprog-bar"><div class="qprog-fill" style="width:${pct}%"></div></div>
      <span>${state.quizIdx}/${total} done</span>
    </div>
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-options">
      ${q.opts.map((o, i) => `
        <div class="quiz-opt" onclick="answerQ(${i})" id="qopt${i}">
          <div class="opt-letter">${'ABCD'[i]}</div>
          <span>${o}</span>
        </div>`).join('')}
    </div>
    <div class="quiz-feedback" id="qfb"></div>
    <div class="quiz-actions">
      <button class="btn btn-amber" id="nextQBtn" style="display:none" onclick="nextQ()">Next question →</button>
      <button class="btn btn-ghost btn-sm" onclick="showHint()">💡 Show explanation</button>
    </div>`;
}

function answerQ(idx) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  const topic = curriculum[state.course].topics[state.topicIdx];
  const q = topic.quizzes[state.quizIdx];
  const correct = idx === q.ans;

  state.solved++;
  if (correct) { state.correct++; state.xp += 10; }
  const pKey = `${state.course}-${topic.id}`;
  state.progress[pKey] = Math.max(state.progress[pKey] || 0, state.quizIdx + 1);
  save();
  updateDashboard();

  document.querySelectorAll('.quiz-opt').forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === q.ans) opt.classList.add('correct');
    else if (i === idx && !correct) opt.classList.add('wrong');
  });

  const fb = document.getElementById('qfb');
  fb.textContent = (correct ? '✓ Correct! ' : '✗ Not quite. ') + q.explain;
  fb.className = `quiz-feedback show ${correct ? 'good' : 'bad'}`;
  document.getElementById('nextQBtn').style.display = 'inline-flex';

  typesetMath(fb);
  toast(correct ? 'Correct! +10 XP 🎉' : "Keep going — you've got this!", correct ? 'success' : 'info');
}

function showHint() {
  const topic = curriculum[state.course].topics[state.topicIdx];
  const q = topic.quizzes[state.quizIdx];
  const fb = document.getElementById('qfb');
  fb.textContent = '💡 ' + q.explain;
  fb.className = 'quiz-feedback show hint';
  typesetMath(fb);
}

function nextQ() {
  const topic = curriculum[state.course].topics[state.topicIdx];
  if (state.quizIdx < topic.quizzes.length - 1) {
    state.quizIdx++;
  } else {
    toast('🎉 Topic complete! Well done.', 'success');
    state.quizIdx = 0;
  }
  state.quizAnswered = false;
  renderTopicContent();
}

// =============================================
// DASHBOARD
// =============================================
function updateDashboard() {
  document.getElementById('dStreak').textContent = state.streak;
  document.getElementById('dSolved').textContent = state.solved;
  document.getElementById('dXP').textContent = state.xp;
  document.getElementById('navStreak').textContent = state.streak;
  document.getElementById('dAccuracy').textContent = state.solved > 0
    ? Math.round(state.correct / state.solved * 100) + '%' : '—';

  const colors = { standard2:'#3b82f6', advanced:'#10b981', ext1:'#8b5cf6', ext2:'#f5a623' };
  const rows = Object.entries(curriculum).flatMap(([k, c]) =>
    c.topics.map(t => ({
      name: `${c.label} — ${t.name}`,
      key: `${k}-${t.id}`,
      total: t.quizzes.length,
      color: colors[k]
    }))
  );

  document.getElementById('masteryList').innerHTML = rows.map(r => {
    const done = state.progress[r.key] || 0;
    const pct = r.total > 0 ? Math.round(done / r.total * 100) : 0;
    return `
      <div class="mastery-row">
        <div class="mastery-info">
          <span class="mastery-name">${r.name}</span>
          <span class="mastery-pct">${pct}%</span>
        </div>
        <div class="mastery-track">
          <div class="mastery-fill" style="width:${pct}%;background:${r.color}"></div>
        </div>
      </div>`;
  }).join('');
}

// =============================================
// AUTH
// =============================================
function openModal(tab) {
  document.getElementById('authModal').classList.add('show');
  switchAuth(tab || 'login');
}
function closeModal() {
  document.getElementById('authModal').classList.remove('show');
}
function switchAuth(tab) {
  document.getElementById('loginForm').style.display = tab === 'login' ? '' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? '' : 'none';
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabSignup').classList.toggle('active', tab === 'signup');
  document.getElementById('modalTitle').textContent = tab === 'login' ? 'Welcome back' : 'Create your account';
  document.getElementById('modalSub').textContent = tab === 'login' ? 'Sign in to save your progress' : 'Start your free 7-day Pro trial';
}
function handleAuth(e, type) {
  e.preventDefault();
  state.user = { email: 'student@mathletica.cc', pro: true };
  localStorage.setItem('ml-user', JSON.stringify(state.user));
  closeModal();
  toast(type === 'login' ? 'Welcome back! 👋' : 'Account created! Enjoy your free trial 🎉', 'success');
  renderTopicContent();
}

// =============================================
// TOAST
// =============================================
function toast(msg, type='info') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<div class="toast-dot"></div><span>${msg}</span>`;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 250); }, 3500);
}

// =============================================
// NAV
// =============================================
function toggleMenu() { document.getElementById('navLinks').classList.toggle('open'); }
function closeMenu() { document.getElementById('navLinks').classList.remove('open'); }

// =============================================
// MATH
// =============================================
function typesetMath(el) {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([el]).catch(() => {});
  }
}

// =============================================
// INIT
// =============================================
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('gone'), 1600);
  selectCourse('standard2');
  updateDashboard();
});
