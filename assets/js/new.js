const PROJECTS = {
      p1: {
        title: "E-Commerce Website",
        blurb: "Full-featured store with cart, checkout, admin panel, and integrated payment.",
        img: "assets/imgs/elegancebymonica.png",
        tech: ["Laravel","MySQL"],
        bullets: ["Product catalog & filters","Admin dashboard & analytics","Order & payment workflow"],
        live: "https://absolutewebservices.in/elegance/",
      //  code: "https://github.com/darshanvaland/ecommerce"
      },
      p2: {
        title: "Hotel Management System",
        blurb: "Booking management, billing, and staff roles built with Laravel Api",
        img: "assets/imgs/hotelmanagement.png",
        tech: ["Laravel","React","MySql"],
        bullets: ["Booking calendar","Automated nightly reports","PDF invoices"],
        live: "https://absolutewebservices.in/hotelsystem/web/",
        // code: "https://github.com/darshanvaland/hotel-management"
      },
      p3: {
        title: "Car Sales Portal",
        blurb: "Portal for listing & selling cars, with lead tracking and image optimization.",
        img: "assets/imgs/yourcarintocash.png",
        tech: ["Flask","python","MySql"],
        bullets: ["Front-end Validation","Cars Listing With Filter","Admin panel"],
        live: "https://yourcarintocash.com/",
        // code: "https://github.com/darshanvaland/car-sales"
      }
    };

    // Fill year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href = a.getAttribute('href');
        if(!href || href === '#') return;
        const el = document.querySelector(href);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
      })
    });

    // Projects click => modal
    document.querySelectorAll('.project').forEach(p=>{
      p.addEventListener('click', ()=> openProject(p.dataset.id));
      p.addEventListener('keydown', (e)=> { if(e.key === 'Enter') openProject(p.dataset.id) });
    });

    function openProject(id){
      const data = PROJECTS[id];
      if(!data) return;
      const tpl = document.getElementById('modalTpl').content.cloneNode(true);
      const backdrop = tpl.querySelector('.modal-backdrop');
      tpl.querySelector('img').src = data.img;
      tpl.querySelector('.m-title').textContent = data.title;
      tpl.querySelector('.m-blurb').textContent = data.blurb;
      const techWrap = tpl.querySelector('.m-tech');
      data.tech.forEach(t=> {
        const el = document.createElement('span');
        el.style.display='inline-block';
        el.style.padding='6px 8px';
        el.style.marginRight='6px';
        el.style.borderRadius='999px';
        el.style.background='rgba(57, 183, 32, 0.03)';
        el.style.color='var(--muted)';
        el.style.fontSize='13px';
        el.textContent = t;
        techWrap.appendChild(el);
      });
      const bullets = tpl.querySelector('.m-bullets');
      data.bullets.forEach(b=> { const li = document.createElement('li'); li.textContent = b; bullets.appendChild(li) });
      const liveBtn = tpl.querySelector('.m-live'); liveBtn.href = data.live || '#';
      // const codeBtn = tpl.querySelector('.m-code'); codeBtn.href = data.code || '#';

      // close on backdrop click or ESC
      backdrop.addEventListener('click', (ev)=>{
        if(ev.target === backdrop) backdrop.remove();
      });
      document.addEventListener('keydown', function esc(e){
        if(e.key === 'Escape') { backdrop.remove(); document.removeEventListener('keydown', esc); }
      });

      document.body.appendChild(backdrop);
    }

    // Contact form => open mail client with data (no backend)
    document.getElementById('contactForm').addEventListener('submit', function(e){
      e.preventDefault();
      const form = new FormData(this);
      const name = form.get('name'); const email = form.get('email'); const msg = form.get('message');
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      window.location.href = `mailto:darshanvaland143@gmail.com?subject=${subject}&body=${body}`;
    });

    // theme toggle (persist in localStorage)
    const themeBtn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('site-theme');
    if(saved === 'light') root.classList.add('light');
    themeBtn.addEventListener('click', ()=>{
      root.classList.toggle('light');
      const isLight = root.classList.contains('light');
      localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
      themeBtn.innerHTML = isLight ? '<i class=\"fa-solid fa-sun\"></i>' : '<i class=\"fa-solid fa-moon\"></i>';
    });
    // set correct icon on load
    themeBtn.innerHTML = root.classList.contains('light') ? '<i class=\"fa-solid fa-sun\"></i>' : '<i class=\"fa-solid fa-moon\"></i>';
  