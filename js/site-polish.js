/**
 * MedicalPrice site polish — scroll motion, logo upgrade, mobile filters, SEO helpers.
 * Loaded after engine.js on product pages.
 */
(function () {
  'use strict';

  var LOGO_SVG =
    '<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M14 5v18M5 14h18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M18.5 9.5l2 2 3.5-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function upgradeLogoMarks() {
    document.querySelectorAll('header').forEach(function (header) {
      header.classList.add('site-header');

      header.querySelectorAll('div.w-7.h-7, span.logo-mark').forEach(function (el) {
        if (el.tagName === 'BUTTON') return;
        var isMint = el.className.indexOf('99D6D1') !== -1 || el.classList.contains('logo-mark');
        if (!isMint) return;
        el.classList.add('logo-mark');
        if (!el.querySelector('svg')) el.innerHTML = LOGO_SVG;
      });
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector('header');
    if (!header) return;
    header.classList.add('site-header');

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initReveal() {
    var nodes = document.querySelectorAll('.mp-reveal');
    if (!nodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

    nodes.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.92) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });
  }

  function ensureMeta(name, content, attr) {
    attr = attr || 'name';
    if (!content) return;
    var el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    if (!el.getAttribute('content')) el.setAttribute('content', content);
  }

  function initSeoDefaults() {
    var title = document.title || 'MedicalPrice';
    var descEl = document.querySelector('meta[name="description"]');
    var desc = descEl && descEl.getAttribute('content');
    if (!desc) {
      desc = '比較全港私家醫院手術、檢查、門診及病房收費。官方套餐基準，非保險銷售。';
      ensureMeta('description', desc);
    }
    ensureMeta('og:title', title, 'property');
    ensureMeta('og:description', desc, 'property');
    ensureMeta('og:type', 'website', 'property');
    ensureMeta('og:locale', 'zh_HK', 'property');
    ensureMeta('twitter:card', 'summary');
  }

  function injectMobileFilterDrawer() {
    var aside = document.querySelector('aside.sidebar-fixed');
    var filter = document.getElementById('filter-container');
    var main = document.querySelector('main.main-content') || document.querySelector('main');
    if (!aside || !filter || !main || document.getElementById('mp-mobile-filter-btn')) return;

    aside.classList.add('mp-filter-drawer');

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'mp-filter-drawer-close';
    closeBtn.textContent = '完成篩選';
    aside.insertBefore(closeBtn, aside.firstChild);

    var bar = document.createElement('div');
    bar.className = 'mp-mobile-filter-bar';
    bar.innerHTML =
      '<button type="button" id="mp-mobile-filter-btn" class="mp-mobile-filter-btn" aria-expanded="false">' +
      '篩選醫院' +
      '</button>';

    var anchor = main.querySelector('.max-w-6xl') || main;
    anchor.insertBefore(bar, anchor.firstChild);

    var backdrop = document.createElement('div');
    backdrop.className = 'mp-filter-backdrop';
    document.body.appendChild(backdrop);

    function setOpen(open) {
      aside.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      var btn = document.getElementById('mp-mobile-filter-btn');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    document.getElementById('mp-mobile-filter-btn').addEventListener('click', function () {
      setOpen(!aside.classList.contains('is-open'));
    });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    backdrop.addEventListener('click', function () { setOpen(false); });
  }

  function injectSourcesNavLink() {
    document.querySelectorAll('header nav').forEach(function (nav) {
      if (nav.querySelector('a[href="sources.html"]')) return;
      var intel = nav.querySelector('a[href="intelligence.html"]');
      var link = document.createElement('a');
      link.href = 'sources.html';
      link.className = 'hover:text-[#99D6D1]';
      link.textContent = '資料來源';
      if (intel) nav.insertBefore(link, intel);
      else nav.appendChild(link);
    });
  }

  function run() {
    upgradeLogoMarks();
    initHeaderScroll();
    initReveal();
    initSeoDefaults();
    injectMobileFilterDrawer();
    injectSourcesNavLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
