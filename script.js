/* ════════════════════════════════════════
   DESIGN TOKENS
════════════════════════════════════════ */
:root{
  --c-bg:       #f8fafc;
  --c-bg2:      #f1f5f9;
  --c-surface:  #ffffff;
  --c-border:   #e2e8f0;
  --c-txt1:     #0f172a;
  --c-txt2:     #64748b;
  --c-txt3:     #94a3b8;
  --c-accent:   #6366f1;
  --c-accent2:  #8b5cf6;
  --c-accent3:  #ec4899;
  --c-accentL:  #eef2ff;
  --c-accentLH: #e0e7ff;
  --grad:       linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%);
  --grad2:      linear-gradient(135deg,#6366f1,#8b5cf6);
  --r:          20px;
  --r-sm:       12px;
  --sh:         0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(99,102,241,.08);
  --sh-md:      0 4px 24px rgba(99,102,241,.15);
  --sh-lg:      0 8px 48px rgba(99,102,241,.22);
  --t:          .3s cubic-bezier(.4,0,.2,1);
}
[data-theme="dark"]{
  --c-bg:       #0d1117;
  --c-bg2:      #161b22;
  --c-surface:  #1c2333;
  --c-border:   #30363d;
  --c-txt1:     #e6edf3;
  --c-txt2:     #8b949e;
  --c-txt3:     #6e7681;
  --c-accent:   #818cf8;
  --c-accent2:  #a78bfa;
  --c-accent3:  #f472b6;
  --c-accentL:  #1e1b4b;
  --c-accentLH: #312e81;
  --sh:         0 1px 3px rgba(0,0,0,.3),0 4px 16px rgba(0,0,0,.25);
  --sh-md:      0 4px 24px rgba(0,0,0,.4);
  --sh-lg:      0 8px 48px rgba(0,0,0,.5);
}

/* ════════════════════════════════════════
   RESET & BASE
════════════════════════════════════════ */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;-webkit-tap-highlight-color:transparent;}
body{
  font-family:'Inter',sans-serif;
  background:var(--c-bg);
  color:var(--c-txt1);
  line-height:1.7;
  transition:background var(--t),color var(--t);
  overflow-x:hidden;
}
html[data-lang="ar"] body{font-family:'Cairo',sans-serif;direction:rtl;}
a{text-decoration:none;color:inherit;}
button{font-family:inherit;cursor:pointer;border:none;background:none;}
::-webkit-scrollbar{width:5px;}
::-webkit-scrollbar-track{background:var(--c-bg2);}
::-webkit-scrollbar-thumb{background:var(--c-accent);border-radius:99px;}
::selection{background:rgba(99,102,241,.25);}

/* ════════════════════════════════════════
   UTILITIES
════════════════════════════════════════ */
.container{max-width:1120px;margin:0 auto;padding:0 24px;}
.grad-text{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);}

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
#navbar{
  position:fixed;inset-block-start:0;inset-inline:0;z-index:900;
  background:rgba(248,250,252,.82);
  backdrop-filter:blur(20px) saturate(1.8);
  -webkit-backdrop-filter:blur(20px) saturate(1.8);
  border-bottom:1px solid var(--c-border);
  transition:background var(--t),border-color var(--t);
}
[data-theme="dark"] #navbar{background:rgba(13,17,23,.85);}
.nav-wrap{
  display:flex;align-items:center;justify-content:space-between;
  height:66px;
}
.nav-logo{
  font-size:1.25rem;font-weight:900;letter-spacing:-.5px;
  background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  flex-shrink:0;
}
.nav-links{
  display:flex;align-items:center;gap:4px;list-style:none;
}
.nav-links a{
  font-size:.875rem;font-weight:500;padding:6px 14px;
  border-radius:8px;color:var(--c-txt2);
  transition:color var(--t),background var(--t);
}
.nav-links a:hover,.nav-links a.active{color:var(--c-accent);background:var(--c-accentL);}
.nav-right{display:flex;align-items:center;gap:8px;}
.icon-btn{
  width:38px;height:38px;border-radius:10px;
  border:1.5px solid var(--c-border);
  background:var(--c-surface);
  color:var(--c-txt1);
  display:flex;align-items:center;justify-content:center;
  font-size:.9rem;font-weight:700;
  transition:all var(--t);
}
.icon-btn:hover{border-color:var(--c-accent);color:var(--c-accent);transform:scale(1.06);}
.lang-icon-btn{font-size:.78rem;letter-spacing:.5px;}
.hamburger{
  display:none;flex-direction:column;justify-content:center;align-items:center;
  width:38px;height:38px;gap:5px;
  border-radius:10px;border:1.5px solid var(--c-border);
  background:var(--c-surface);
  transition:all var(--t);
}
.hamburger span{
  display:block;width:18px;height:1.8px;
  background:var(--c-txt1);border-radius:99px;
  transition:all var(--t);
}
.hamburger.open span:nth-child(1){transform:translateY(6.8px) rotate(45deg);}
.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
.hamburger.open span:nth-child(3){transform:translateY(-6.8px) rotate(-45deg);}

/* mobile drawer */
.mobile-drawer{
  display:none;position:fixed;
  top:66px;inset-inline:0;z-index:899;
  background:var(--c-surface);
  border-bottom:1px solid var(--c-border);
  padding:12px 24px 20px;
  flex-direction:column;gap:4px;
  box-shadow:var(--sh-md);
}
.mobile-drawer.open{display:flex;}
.mobile-drawer a{
  padding:10px 14px;border-radius:10px;font-weight:500;
  color:var(--c-txt2);transition:all .2s;
}
.mobile-drawer a:hover{color:var(--c-accent);background:var(--c-accentL);}

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
#hero{
  min-height:100svh;
  display:flex;align-items:center;justify-content:center;
  padding:120px 24px 80px;
  position:relative;overflow:hidden;
}
.hero-bg{
  position:absolute;inset:0;pointer-events:none;
  overflow:hidden;
}
.hero-blob{
  position:absolute;border-radius:50%;filter:blur(80px);opacity:.5;
  animation:blobFloat 8s ease-in-out infinite;
}
[data-theme="dark"] .hero-blob{opacity:.25;}
.blob-1{
  width:600px;height:600px;
  background:radial-gradient(circle,rgba(99,102,241,.4),transparent 70%);
  top:-200px;inset-inline-start:-150px;
  animation-delay:0s;
}
.blob-2{
  width:500px;height:500px;
  background:radial-gradient(circle,rgba(139,92,246,.35),transparent 70%);
  top:10%;inset-inline-end:-100px;
  animation-delay:-3s;
}
.blob-3{
  width:400px;height:400px;
  background:radial-gradient(circle,rgba(236,72,153,.3),transparent 70%);
  bottom:-100px;left:30%;
  animation-delay:-5s;
}
@keyframes blobFloat{
  0%,100%{transform:translate(0,0) scale(1);}
  33%{transform:translate(30px,-20px) scale(1.05);}
  66%{transform:translate(-20px,15px) scale(.97);}
}
.hero-inner{
  position:relative;text-align:center;max-width:860px;margin:0 auto;
}
.hero-status{
  display:inline-flex;align-items:center;gap:8px;
  padding:7px 18px;border-radius:99px;
  border:1.5px solid var(--c-border);
  background:var(--c-surface);
  font-size:.8rem;font-weight:600;
  color:var(--c-txt2);
  margin-bottom:32px;
  box-shadow:var(--sh);
  animation:fadeUp .6s ease both;
}
.status-dot{
  width:7px;height:7px;border-radius:50%;
  background:#22c55e;
  box-shadow:0 0 0 2px rgba(34,197,94,.3);
  animation:pulse 2s infinite;
}
@keyframes pulse{0%,100%{box-shadow:0 0 0 2px rgba(34,197,94,.3);}50%{box-shadow:0 0 0 5px rgba(34,197,94,.1);}}

.hero-name{
  font-size:clamp(3rem,8vw,6rem);
  font-weight:900;line-height:1.05;
  letter-spacing:-3px;
  margin-bottom:20px;
  animation:fadeUp .7s .1s ease both;
}
.hero-title{
  font-size:clamp(1.1rem,3vw,1.5rem);
  font-weight:500;color:var(--c-txt2);
  margin-bottom:28px;
  animation:fadeUp .7s .15s ease both;
}
.hero-title span{color:var(--c-accent);font-weight:700;}
.hero-desc{
  font-size:1.05rem;color:var(--c-txt2);
  max-width:560px;margin:0 auto 40px;
  animation:fadeUp .7s .2s ease both;
}
.hero-btns{
  display:flex;gap:14px;justify-content:center;flex-wrap:wrap;
  animation:fadeUp .7s .25s ease both;
}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 28px;border-radius:12px;
  font-size:.95rem;font-weight:600;
  transition:all var(--t);cursor:pointer;
}
.btn-grad{
  background:var(--grad);color:#fff;
  box-shadow:0 4px 20px rgba(99,102,241,.35);
  border:none;
}
.btn-grad:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(99,102,241,.45);}
.btn-ghost{
  background:var(--c-surface);
  border:1.5px solid var(--c-border);
  color:var(--c-txt1);
}
.btn-ghost:hover{border-color:var(--c-accent);color:var(--c-accent);background:var(--c-accentL);transform:translateY(-3px);}
.hero-scroll-hint{
  margin-top:64px;
  display:flex;flex-direction:column;align-items:center;gap:8px;
  color:var(--c-txt3);font-size:.78rem;letter-spacing:1px;text-transform:uppercase;
  animation:fadeUp .7s .4s ease both;
}
.scroll-bar{
  width:1.5px;height:48px;overflow:hidden;
  background:var(--c-border);border-radius:99px;
  position:relative;
}
.scroll-bar::after{
  content:'';position:absolute;inset-block-start:0;inset-inline:0;
  height:50%;background:var(--grad);
  animation:scrollAnim 2s ease-in-out infinite;
}
@keyframes scrollAnim{
  0%{transform:translateY(-100%);}
  100%{transform:translateY(200%);}
}

/* ════════════════════════════════════════
   SECTION SHARED
════════════════════════════════════════ */
.section{padding:96px 0;}
.section-alt{background:var(--c-bg2);}
.eyebrow{
  display:inline-block;
  font-size:.72rem;font-weight:800;
  letter-spacing:3px;text-transform:uppercase;
  color:var(--c-accent);margin-bottom:12px;
}
.section-title{
  font-size:clamp(1.9rem,4vw,2.8rem);
  font-weight:900;line-height:1.15;
  letter-spacing:-1.5px;margin-bottom:16px;
}
.section-sub{
  color:var(--c-txt2);max-width:500px;
  font-size:1rem;margin-bottom:60px;
}

/* ════════════════════════════════════════
   ABOUT
════════════════════════════════════════ */
.about-grid{
  display:grid;grid-template-columns:auto 1fr;
  gap:64px;align-items:center;
}
.about-visual{
  display:flex;flex-direction:column;align-items:center;gap:20px;
}
.avatar{
  width:200px;height:200px;border-radius:28px;
  background:var(--grad);
  display:flex;align-items:center;justify-content:center;
  font-size:5rem;
  box-shadow:var(--sh-lg);
  flex-shrink:0;
}
.stat-cards{
  display:flex;flex-direction:column;gap:12px;width:100%;
}
.stat-card{
  background:var(--c-surface);border:1.5px solid var(--c-border);
  border-radius:14px;padding:14px 18px;
  display:flex;align-items:center;gap:14px;
  box-shadow:var(--sh);
  transition:all var(--t);
}
.stat-card:hover{border-color:var(--c-accent);transform:translateX(4px);}
html[data-lang="ar"] .stat-card:hover{transform:translateX(-4px);}
.stat-icon-wrap{
  width:40px;height:40px;border-radius:10px;
  background:var(--c-accentL);flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:1.2rem;
}
.stat-num{font-size:1.3rem;font-weight:800;color:var(--c-accent);}
.stat-lbl{font-size:.75rem;color:var(--c-txt2);font-weight:500;}
.about-text p{color:var(--c-txt2);margin-bottom:14px;}
.skill-chips{
  display:flex;flex-wrap:wrap;gap:8px;margin-top:24px;
}
.chip{
  padding:6px 14px;border-radius:99px;font-size:.8rem;font-weight:600;
  background:var(--c-accentL);color:var(--c-accent);
  border:1.5px solid rgba(99,102,241,.15);
  transition:all var(--t);
}
.chip:hover{background:var(--grad);color:#fff;border-color:transparent;transform:translateY(-2px);}

/* ════════════════════════════════════════
   PROJECTS
════════════════════════════════════════ */
.projects-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:24px;
  align-items:start;
}
.project-card{
  background:var(--c-surface);
  border:1.5px solid var(--c-border);
  border-radius:var(--r);
  padding:0;
  box-shadow:var(--sh);
  transition:all var(--t);
  overflow:hidden;
  display:flex;flex-direction:column;
  position:relative;

  align-self:start;
}
.project-card:hover{
  transform:translateY(-8px);
  box-shadow:var(--sh-lg);
  border-color:transparent;
}
.project-card::before{
  content:'';position:absolute;inset:0;
  background:var(--grad);opacity:0;
  border-radius:var(--r);
  transition:opacity var(--t);
  pointer-events:none;
}
.card-glow{
  position:absolute;inset:-1px;border-radius:calc(var(--r) + 1px);
  background:var(--grad);
  z-index:-1;opacity:0;
  transition:opacity var(--t);
}
.project-card:hover .card-glow{opacity:1;}

.card-header{
  padding:28px 28px 20px;
  display:flex;align-items:flex-start;justify-content:space-between;
  gap:16px;
}
.proj-icon-wrap{
  width:58px;height:58px;border-radius:16px;
  background:var(--c-accentL);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  transition:transform var(--t);
}
.project-card:hover .proj-icon-wrap{transform:scale(1.1) rotate(6deg);}
.proj-icon-wrap svg{transition:filter var(--t);}

.gh-btn{
  display:flex;align-items:center;gap:6px;
  padding:7px 14px;border-radius:8px;
  font-size:.8rem;font-weight:600;
  background:var(--c-bg2);
  border:1.5px solid var(--c-border);
  color:var(--c-txt2);
  transition:all var(--t);
  white-space:nowrap;
  flex-shrink:0;
}
.gh-btn:hover{background:var(--c-accent);color:#fff;border-color:var(--c-accent);}
.gh-btn svg{flex-shrink:0;}

.card-body{padding:0 28px 28px;display:flex;flex-direction:column;}
.proj-name{font-size:1.2rem;font-weight:800;margin-bottom:10px;letter-spacing:-.3px;}
.proj-desc{color:var(--c-txt2);font-size:.9rem;line-height:1.7;margin-bottom:20px;}
.proj-tags{display:flex;flex-wrap:wrap;gap:6px;}
.tag{
  font-size:.73rem;font-weight:600;
  padding:3px 10px;border-radius:99px;
  background:var(--c-bg2);color:var(--c-txt2);
  border:1px solid var(--c-border);
}

/* Project feature list */
.proj-features{
  list-style:none;
  display:flex;flex-direction:column;gap:7px;
  margin-bottom:10px;
}
.proj-features li{
  display:flex;align-items:center;gap:8px;
  font-size:.845rem;color:var(--c-txt2);
  line-height:1.4;
}
.feat-icon{
  font-size:1rem;flex-shrink:0;
  width:24px;text-align:center;
}

/* Image icon wrap variant */
.proj-icon-img{
  background:var(--c-bg2);
  overflow:hidden;
  padding:2px;
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
.contact-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;
}
.contact-info-card{
  background:var(--c-surface);
  border:1.5px solid var(--c-border);
  border-radius:var(--r);padding:36px;
  box-shadow:var(--sh);
  display:flex;flex-direction:column;gap:20px;
}
.contact-row{
  display:flex;align-items:center;gap:16px;
  padding:14px;border-radius:12px;
  transition:background var(--t);
}
.contact-row:hover{background:var(--c-bg2);}
.c-icon-box{
  width:46px;height:46px;border-radius:12px;
  background:var(--c-accentL);
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}
.c-lbl{font-size:.73rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--c-txt3);margin-bottom:2px;}
.c-val{font-weight:600;font-size:.95rem;}
.c-val a{color:var(--c-accent);transition:opacity .2s;}
.c-val a:hover{opacity:.7;}

.cta-card{
  border-radius:var(--r);overflow:hidden;position:relative;
}
.cta-inner{
  background:var(--grad);padding:44px 40px;
  color:#fff;position:relative;z-index:1;
}
.cta-inner::before{
  content:'';position:absolute;inset:0;
  background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events:none;
}
.cta-inner h3{font-size:1.55rem;font-weight:800;margin-bottom:10px;line-height:1.3;}
.cta-inner p{opacity:.85;margin-bottom:28px;font-size:.95rem;}
.btn-white{
  display:inline-flex;align-items:center;gap:8px;
  padding:12px 26px;border-radius:10px;
  background:#fff;color:#6366f1;
  font-weight:700;font-size:.9rem;
  box-shadow:0 4px 16px rgba(0,0,0,.15);
  transition:all var(--t);
}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2);}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
footer{
  border-top:1px solid var(--c-border);
  padding:28px 24px;
  text-align:center;
  color:var(--c-txt3);font-size:.85rem;
  transition:border-color var(--t);
}
footer strong{color:var(--c-accent);}

/* ════════════════════════════════════════
   REVEAL ANIMATION
════════════════════════════════════════ */
.reveal{
  opacity:0;transform:translateY(28px);
  transition:opacity .65s ease,transform .65s ease;
}
.reveal.in{opacity:1;transform:translateY(0);}
.reveal-delay-1{transition-delay:.1s;}
.reveal-delay-2{transition-delay:.2s;}

@keyframes fadeUp{
  from{opacity:0;transform:translateY(20px);}
  to{opacity:1;transform:translateY(0);}
}

/* ════════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════ */
@media(max-width:900px){
  .nav-links{display:none;}
  .hamburger{display:flex;}
  .about-grid{grid-template-columns:1fr;}
  .about-visual{flex-direction:row;align-items:flex-start;}
  .stat-cards{display:grid;grid-template-columns:1fr 1fr;}
  .contact-grid{grid-template-columns:1fr;}
}
@media(max-width:600px){
  .hero-name{letter-spacing:-1.5px;}
  .section{padding:72px 0;}
  .about-visual{flex-direction:column;align-items:center;}
  .stat-cards{grid-template-columns:1fr;}
  .avatar{width:160px;height:160px;font-size:4rem;}
  .card-header{flex-wrap:wrap;}
}
@media(max-width:400px){
  .hero-btns{flex-direction:column;align-items:stretch;}
  .btn{justify-content:center;}
}

/* RTL fine-tuning */
html[data-lang="ar"] .eyebrow{letter-spacing:.5px;}
html[data-lang="ar"] .section-title{letter-spacing:-.5px;}
html[data-lang="ar"] .hero-name{letter-spacing:-1px;}
html[data-lang="ar"] .btn svg{transform:scaleX(-1);}
