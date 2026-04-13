// Nav toggle (both pages)
const btn = document.getElementById('nav-btn');
const drawer = document.getElementById('nav-drawer');
if (btn && drawer) {
  btn.addEventListener('click', () => {
    const o = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!o));
    btn.setAttribute('aria-label', o ? 'Open menu' : 'Close menu');
    drawer.classList.toggle('open', !o);
    drawer.setAttribute('aria-hidden', String(o));
    document.body.style.overflow = o ? '' : 'hidden';
  });
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.click();
      btn.focus();
    }
  });
}

// FAQ accordion (index only)
const faqAcc = document.getElementById('faq-acc');
if (faqAcc) {
  faqAcc.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.closest('.faq-item');
    const ans = document.getElementById(q.getAttribute('aria-controls'));
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      const a = document.getElementById(i.querySelector('.faq-q').getAttribute('aria-controls'));
      if (a) a.hidden = true;
    });
    if (!open) {
      item.classList.add('open');
      q.setAttribute('aria-expanded', 'true');
      if (ans) {
        ans.hidden = false;
        ans.setAttribute('aria-live', 'polite');
      }
    }
  });
}

// Practice-areas tabs (index only)
const pracList = document.getElementById('prac-list');
if (pracList) {
  const pdata = [
    { tag: 'Divorce Law', title: 'Divorce & Legal Separation', text: 'Florida is a no-fault divorce state — but equitable distribution, parental responsibility, and support determinations are deeply complex. We manage every stage from petition through financial discovery, parenting negotiations, and final hearing — whether amicable or aggressively contested.' },
    { tag: 'Family Law', title: 'Child Custody & Parenting Plans', text: "Florida law governs custody through 'time-sharing' and 'parental responsibility.' We build detailed, enforceable parenting plans that protect your relationship with your children and defend your parental rights — through mediated agreement or courtroom advocacy." },
    { tag: 'Family Law', title: 'Child & Spousal Support', text: "We ensure all income sources are properly accounted for, challenge attempts to understate income, and pursue modifications when circumstances change substantially. Florida's 2023 alimony reforms require precise legal strategy for both support seekers and those contesting obligations." },
    { tag: 'Complex Divorce', title: 'High-Net-Worth Divorce', text: 'When businesses, investment portfolios, luxury real estate, and retirement accounts are at stake, divorce requires specialized financial expertise. We collaborate with forensic accountants and business valuators to ensure complete asset discovery and fight for your fair share.' },
    { tag: 'Safety & Protection', title: 'Domestic Violence Injunctions', text: 'We provide swift, decisive action when safety is at risk. Emergency injunctions for protection, full representation at hearings, and assistance in all related divorce, custody, and asset matters — a comprehensive legal shield and a clear path to stability.' },
    { tag: 'Family Formation', title: 'Adoptions & Guardianship', text: 'We guide families through stepparent adoptions, agency adoptions, and guardianship proceedings with expertise and genuine care — from home study coordination and consent requirements through final hearing.' },
    { tag: 'Paternity Law', title: "Paternity & Father's Rights", text: 'We represent both mothers seeking to establish paternity and fathers asserting parental rights. Florida law provides strong protections for involved fathers — and we know how to use them effectively in court.' },
    { tag: 'Post-Divorce', title: 'Post-Divorce Modifications', text: "Life changes after divorce. We help you modify custody, time-sharing, and support orders when circumstances have substantially changed — protecting your rights and your family's evolving needs as your life moves forward." },
    { tag: 'Spousal Support', title: 'Alimony & Spousal Support', text: "Florida's 2023 alimony reforms eliminated permanent alimony, replacing it with bridge-the-gap, rehabilitative, and durational awards based on the length of the marriage and each party's financial circumstances. Whether you are seeking support or defending against an unfair claim, our attorneys build precise financial arguments supported by documentation, expert analysis, and current Florida case law. We also handle post-judgment modification and enforcement when circumstances change." }
  ];
  pracList.addEventListener('click', e => {
    const b = e.target.closest('.prac-btn');
    if (!b) return;
    document.querySelectorAll('.prac-btn').forEach(x => x.setAttribute('aria-selected', 'false'));
    b.setAttribute('aria-selected', 'true');
    const d = pdata[parseInt(b.dataset.i)];
    document.getElementById('pp-tag').textContent = d.tag;
    document.getElementById('pp-title').textContent = d.title;
    document.getElementById('pp-text').textContent = d.text;
    if (window.innerWidth < 860) document.getElementById('prac-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  pracList.addEventListener('keydown', e => {
    const bs = [...document.querySelectorAll('.prac-btn')];
    const i = bs.indexOf(document.activeElement);
    if (i === -1) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); bs[Math.min(i + 1, bs.length - 1)].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); bs[Math.max(i - 1, 0)].focus(); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bs[i].click(); }
  });
}

// Scroll reveal (both pages)
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
