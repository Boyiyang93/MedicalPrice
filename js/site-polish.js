/**
 * MedicalPrice site polish — scroll motion, logo, mobile nav/filters,
 * SEO helpers, legal footer links, cookie/localStorage notice banner.
 */
(function () {
  'use strict';

  var COOKIE_NOTICE_KEY = 'mp_cookie_notice';

  var LOGO_SVG =
    '<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M14 5v18M5 14h18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M18.5 9.5l2 2 3.5-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function inArticles() {
    return /\/articles\//.test(window.location.pathname);
  }

  function rootHref(file) {
    return inArticles() ? '../' + file : file;
  }

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
      desc = '比較港資私家醫院手術、檢查、門診及病房收費。官方套餐基準，非保險銷售。';
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

  function stripSourcesFromHeaderNav() {
    document.querySelectorAll('header nav a[href="sources.html"], header nav a[href="../sources.html"]').forEach(function (a) {
      a.remove();
    });
  }

  function legalLinksHtml(linkClass) {
    var sources = rootHref('sources.html');
    var privacy = rootHref('privacy.html');
    var cookies = rootHref('cookies.html');
    var terms = rootHref('terms.html');
    return (
      '<a href="' + sources + '" class="' + linkClass + '">資料來源與更新</a>' +
      '<span class="mp-legal-sep" aria-hidden="true">·</span>' +
      '<a href="' + privacy + '" class="' + linkClass + '">隱私政策</a>' +
      '<span class="mp-legal-sep" aria-hidden="true">·</span>' +
      '<a href="' + cookies + '" class="' + linkClass + '">Cookie 政策</a>' +
      '<span class="mp-legal-sep" aria-hidden="true">·</span>' +
      '<a href="' + terms + '" class="' + linkClass + '">使用條款</a>'
    );
  }

  function ensureLegalBar(host, linkClass, barClass) {
    if (!host || host.querySelector('.mp-legal-links')) return;
    var bar = document.createElement('p');
    bar.className = barClass || 'mp-legal-links mt-3';
    bar.innerHTML = legalLinksHtml(linkClass);
    host.appendChild(bar);
  }

  function injectFooterLegalLinks() {
    if (!document.querySelector('footer') && document.querySelector('main.main-content, main')) {
      var host = document.querySelector('main .max-w-6xl') || document.querySelector('main');
      if (host) {
        var footer = document.createElement('footer');
        footer.className = 'mt-16 mb-8 text-xs text-gray-500';
        footer.setAttribute('role', 'contentinfo');
        footer.innerHTML =
          '<p class="leading-relaxed">免責聲明：所有資料僅供預算參考，不構成醫療診斷或理賠承諾。</p>';
        host.appendChild(footer);
      }
    }

    document.querySelectorAll('footer').forEach(function (footer) {
      if (footer.querySelector('.mp-legal-links')) return;

      var deep = footer.querySelector('.bg-gray-900');
      var mintClass = 'text-[#99D6D1] hover:underline font-medium';
      var blueClass = 'text-[#2B579A] hover:underline font-medium';

      if (deep) {
        var existing = deep.querySelector('a[href$="sources.html"]');
        if (existing && existing.parentElement && !existing.parentElement.classList.contains('mp-legal-links')) {
          var parent = existing.parentElement;
          // Replace lone sources link row with full legal bar when it's a simple paragraph
          if (parent.tagName === 'P' && parent.querySelectorAll('a').length === 1) {
            parent.classList.add('mp-legal-links');
            parent.innerHTML = legalLinksHtml(mintClass);
            return;
          }
          // Index-style flex wrap: append siblings after sources
          if (!parent.querySelector('a[href$="privacy.html"]')) {
            var frag = document.createElement('span');
            frag.className = 'mp-legal-links inline-flex flex-wrap items-center gap-x-2 gap-y-1';
            frag.innerHTML =
              '<span class="mp-legal-sep" aria-hidden="true">·</span>' +
              '<a href="' + rootHref('privacy.html') + '" class="' + mintClass + '">隱私政策</a>' +
              '<span class="mp-legal-sep" aria-hidden="true">·</span>' +
              '<a href="' + rootHref('cookies.html') + '" class="' + mintClass + '">Cookie 政策</a>' +
              '<span class="mp-legal-sep" aria-hidden="true">·</span>' +
              '<a href="' + rootHref('terms.html') + '" class="' + mintClass + '">使用條款</a>';
            existing.insertAdjacentElement('afterend', frag);
          }
          return;
        }
        ensureLegalBar(deep, mintClass);
        return;
      }

      var loneSources = footer.querySelector('a[href$="sources.html"]');
      if (loneSources && loneSources.parentElement && loneSources.parentElement.querySelectorAll('a').length === 1) {
        loneSources.parentElement.classList.add('mp-legal-links');
        loneSources.parentElement.innerHTML = legalLinksHtml(blueClass);
        return;
      }
      ensureLegalBar(footer, blueClass);
    });

    document.querySelectorAll('.article-footer-nav').forEach(function (nav) {
      if (nav.querySelector('a[href$="privacy.html"]')) return;
      var wrap = document.createElement('span');
      wrap.className = 'mp-legal-links article-legal-links';
      wrap.innerHTML =
        '<a href="' + rootHref('privacy.html') + '" class="text-sm text-gray-400 hover:text-[#2B579A]">隱私政策</a>' +
        '<a href="' + rootHref('cookies.html') + '" class="text-sm text-gray-400 hover:text-[#2B579A]">Cookie 政策</a>' +
        '<a href="' + rootHref('terms.html') + '" class="text-sm text-gray-400 hover:text-[#2B579A]">使用條款</a>';
      var sources = nav.querySelector('a[href$="sources.html"]');
      if (sources) sources.insertAdjacentElement('afterend', wrap);
      else nav.insertBefore(wrap, nav.firstChild);
    });
  }

  function injectMobileNav() {
    var header = document.querySelector('header');
    if (!header || document.getElementById('mp-mobile-nav-toggle')) return;

    var desktopNav = header.querySelector('nav');
    var links = [
      { href: rootHref('index.html'), label: '首頁' },
      { href: rootHref('index.html') + '#specialties', label: '專科收費' },
      { href: rootHref('intelligence.html'), label: '醫療情報' },
      { href: rootHref('sources.html'), label: '資料來源' }
    ];

    if (!desktopNav) {
      desktopNav = document.createElement('nav');
      desktopNav.className = 'hidden md:flex gap-6 text-sm shrink-0 whitespace-nowrap';
      desktopNav.setAttribute('aria-label', '主導航');
      desktopNav.innerHTML = links.slice(0, 3).map(function (l) {
        return '<a href="' + l.href + '" class="hover:text-[#99D6D1]">' + l.label + '</a>';
      }).join('');
      header.appendChild(desktopNav);
    }

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.id = 'mp-mobile-nav-toggle';
    toggle.className = 'mp-mobile-nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mp-mobile-nav-panel');
    toggle.setAttribute('aria-label', '開啟選單');
    toggle.innerHTML = '<span class="mp-mobile-nav-toggle__bars" aria-hidden="true"></span>';

    var panel = document.createElement('div');
    panel.id = 'mp-mobile-nav-panel';
    panel.className = 'mp-mobile-nav-panel';
    panel.hidden = true;
    panel.innerHTML =
      '<nav class="mp-mobile-nav-list" aria-label="手機導航">' +
      links.map(function (l) {
        return '<a href="' + l.href + '">' + l.label + '</a>';
      }).join('') +
      '</nav>';

    header.appendChild(toggle);
    header.insertAdjacentElement('afterend', panel);

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
      panel.hidden = !open;
      panel.classList.toggle('is-open', open);
      document.body.classList.toggle('mp-mobile-nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function initCookieNotice() {
    try {
      if (window.localStorage.getItem(COOKIE_NOTICE_KEY)) return;
    } catch (e) {
      return;
    }
    if (document.getElementById('mp-cookie-notice')) return;

    var bar = document.createElement('div');
    bar.id = 'mp-cookie-notice';
    bar.className = 'mp-cookie-notice';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', '本地存儲說明');
    bar.innerHTML =
      '<p class="mp-cookie-notice__text">' +
      '本網站使用瀏覽器本地存儲以記住您的偏好（例如收藏）。我們目前不使用第三方分析或廣告 Cookie。詳情見 ' +
      '<a href="' + rootHref('cookies.html') + '">Cookie 政策</a>。' +
      '</p>' +
      '<div class="mp-cookie-notice__actions">' +
      '<a class="mp-cookie-notice__link" href="' + rootHref('cookies.html') + '">了解更多</a>' +
      '<button type="button" class="mp-cookie-notice__btn" id="mp-cookie-notice-dismiss">知道了</button>' +
      '</div>';

    document.body.appendChild(bar);
    document.body.classList.add('has-cookie-notice');

    document.getElementById('mp-cookie-notice-dismiss').addEventListener('click', function () {
      try {
        window.localStorage.setItem(COOKIE_NOTICE_KEY, '1');
      } catch (err) { /* ignore quota / private mode */ }
      bar.remove();
      document.body.classList.remove('has-cookie-notice');
    });
  }

  function run() {
    upgradeLogoMarks();
    initHeaderScroll();
    initReveal();
    initSeoDefaults();
    injectMobileFilterDrawer();
    stripSourcesFromHeaderNav();
    injectFooterLegalLinks();
    injectMobileNav();
    initCookieNotice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
