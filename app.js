/* ============================
   MATHLETICA - APPLICATION
   ============================ */

// ---- State Management ----
const state = {
    theme: localStorage.getItem('mathletica-theme') || 'light',
    user: JSON.parse(localStorage.getItem('mathletica-user')) || null,
    streak: parseInt(localStorage.getItem('mathletica-streak')) || 0,
    xp: parseInt(localStorage.getItem('mathletica-xp')) || 0,
    totalProblems: parseInt(localStorage.getItem('mathletica-problems')) || 0,
    level: parseInt(localStorage.getItem('mathletica-level')) || 1,
    session: {
        correct: 0,
        total: 0,
        streak: 0,
        bestStreak: 0,
        xp: 0
    },
    calculator: {
        input: '0',
        history: '',
        newInput: true
    },
    currentProblem: null,
    testimonialIndex: 0,
    masteryData: JSON.parse(localStorage.getItem('mathletica-mastery')) || {
        arithmetic: 0,
        algebra: 0,
        geometry: 0,
        trigonometry: 0,
        calculus: 0,
        statistics: 0,
        'linear-algebra': 0,
        discrete: 0
    }
};

// ---- Course Data ----
const courses = [
    {
        id: 'arithmetic',
        title: 'Arithmetic',
        description: 'Master the fundamentals: addition, subtraction, multiplication, division, fractions, and decimals.',
        icon: '🔢',
        level: 'beginner',
        lessons: 45,
        problems: 800,
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        progress: 0
    },
    {
        id: 'algebra',
        title: 'Algebra',
        description: 'Variables, equations, inequalities, polynomials, and functions — the language of mathematics.',
        icon: '📐',
        level: 'beginner',
        lessons: 65,
        problems: 1500,
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        progress: 0
    },
    {
        id: 'geometry',
        title: 'Geometry',
        description: 'Shapes, angles, proofs, area, volume, and the beauty of spatial reasoning.',
        icon: '📏',
        level: 'intermediate',
        lessons: 55,
        problems: 1200,
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        progress: 0
    },
    {
        id: 'trigonometry',
        title: 'Trigonometry',
        description: 'Sine, cosine, tangent — understand triangles and circular functions.',
        icon: '🔺',
        level: 'intermediate',
        lessons: 40,
        problems: 900,
        gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        progress: 0
    },
    {
        id: 'calculus',
        title: 'Calculus',
        description: 'Limits, derivatives, integrals — the mathematics of change and motion.',
        icon: '∫',
        level: 'advanced',
        lessons: 80,
        problems: 2000,
        gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
        progress: 0
    },
    {
        id: 'statistics',
        title: 'Statistics & Probability',
        description: 'Data analysis, probability distributions, hypothesis testing, and more.',
        icon: '📊',
        level: 'intermediate',
        lessons: 50,
        problems: 1100,
        gradient: 'linear-gradient(135deg, #14b8a6, #10b981)',
        progress: 0
    },
    {
        id: 'linear-algebra',
        title: 'Linear Algebra',
        description: 'Vectors, matrices, transformations, and eigenvalues — the backbone of modern math.',
        icon: '🔳',
        level: 'advanced',
        lessons: 60,
        problems: 1200,
        gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        progress: 0
    },
    {
        id: 'discrete',
        title: 'Discrete Mathematics',
        description: 'Logic, sets, combinatorics, graph theory, and number theory.',
        icon: '🎯',
        level: 'advanced',
        lessons: 55,
        problems: 1000,
        gradient: 'linear-gradient(135deg, #ef4444, #f59e0b)',
        progress: 0
    }
];

// ---- Lesson Data ----
const lessons = {
    quadratic: {
        title: 'Quadratic Equations',
        content: `
            
                Quadratic Equations
                A quadratic equation is a second-degree polynomial equation in a single variable. 
                   It has the general form:
