/**
 * MedicalPrice V2.0 — 全局渲染引擎
 * 統一 updateView() 業務流水線 · URL 參數同步 · 卡片級 Coming Soon 降級
 */
(function () {
  'use strict';

  var PLACEHOLDER_PRICE = 9999999;
  var OUTPATIENT_UNAVAILABLE = 9999;

  var INSURANCE_URL_MAP = {
    'vhis-std': 'wemed',
    'vhis-adv': 'wemed'
  };

  var TAG_STYLES = [
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-orange-100 text-orange-700',
    'bg-gray-100 text-gray-600',
    'bg-yellow-100 text-yellow-700',
    'bg-purple-100 text-purple-700'
  ];

  var FAVORITES_STORAGE_KEY = 'mp_procedure_favorites_v1';

  var MODULE_PAGES = {
    imaging: { href: 'imaging.html', title: '內窺鏡與影像', emoji: '🔬' },
    gynecology: { href: 'gyn.html', title: '婦產科', emoji: '👩' },
    generalSurgery: { href: 'general-surgery.html', title: '外科', emoji: '✂️' },
    orthopedics: { href: 'orthopedics.html', title: '骨科', emoji: '🦴' },
    painManagement: { href: 'pain-management.html', title: '疼痛科', emoji: '💉' },
    ent: { href: 'ent.html', title: '耳鼻喉科', emoji: '👂' },
    ophthalmology: { href: 'ophthalmology.html', title: '眼科', emoji: '👁️' },
    cardiology: { href: 'cardiology.html', title: '心內科', emoji: '❤️' },
    plastics: { href: 'plastics.html', title: '整形美容', emoji: '💄' },
    urology: { href: 'urology.html', title: '泌尿外科', emoji: '💧' },
    outpatient: { href: 'outpatient.html', title: '門診', emoji: '🏥' },
    ward: { href: 'ward.html', title: '病房', emoji: '🛏️' }
  };

  var favoritesFilterActive = false;

  function getActiveHospitals() {
    var checkboxes = document.querySelectorAll('#filter-container input[type="checkbox"]');
    return Array.from(checkboxes)
      .filter(function (cb) { return cb.checked; })
      .map(function (cb) { return cb.value; });
  }

  function getSelectValue(id, fallback) {
    var el = document.getElementById(id);
    return el ? el.value : fallback;
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function getPriceThreshold(box) {
    if (box.hasAttribute('data-normal')) return OUTPATIENT_UNAVAILABLE;
    return PLACEHOLDER_PRICE;
  }

  function isUnavailablePrice(price, box) {
    var p = parseFloat(price);
    if (!p || isNaN(p)) return true;
    return p >= getPriceThreshold(box);
  }

  function isComingSoonPrice(price) {
    var p = parseFloat(price);
    return !p || isNaN(p) || p >= PLACEHOLDER_PRICE;
  }

  function applyUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var selectMap = {
      insurance: 'insurance-select',
      time: 'time-select',
      room: 'room-select'
    };

    Object.keys(selectMap).forEach(function (paramKey) {
      var el = document.getElementById(selectMap[paramKey]);
      if (!el) return;

      var value = params.get(paramKey);
      if (!value) return;

      if (el.querySelector('option[value="' + value + '"]')) {
        el.value = value;
        return;
      }

      if (paramKey === 'insurance' && INSURANCE_URL_MAP[value]) {
        var mapped = INSURANCE_URL_MAP[value];
        if (el.querySelector('option[value="' + mapped + '"]')) {
          el.value = mapped;
        }
      }
    });
  }

  function resolveOutpatientPrice(box, timeMode) {
    var normal = parseFloat(box.getAttribute('data-normal')) || PLACEHOLDER_PRICE;
    var night = parseFloat(box.getAttribute('data-night')) || PLACEHOLDER_PRICE;
    var holiday = parseFloat(box.getAttribute('data-holiday')) || PLACEHOLDER_PRICE;

    if (timeMode === 'night') return { price: night, label: '夜診/急診', normal: normal };
    if (timeMode === 'holiday') return { price: holiday, label: '節日/惡劣天氣', normal: normal };
    return { price: normal, label: '日常診金', normal: normal };
  }

  function resolveWardPrice(box, roomMode) {
    var attrMap = {
      standard: 'data-standard',
      semiPrivate: 'data-semi',
      private: 'data-private'
    };
    var attr = attrMap[roomMode] || attrMap.standard;
    return parseFloat(box.getAttribute(attr)) || PLACEHOLDER_PRICE;
  }

  function resolveCardPrice(box) {
    if (box.hasAttribute('data-normal')) {
      var timeMode = getSelectValue('time-select', 'regular');
      return resolveOutpatientPrice(box, timeMode).price;
    }
    if (box.hasAttribute('data-standard')) {
      var roomMode = getSelectValue('room-select', 'standard');
      return resolveWardPrice(box, roomMode);
    }
    return parseFloat(box.getAttribute('data-price')) || PLACEHOLDER_PRICE;
  }

  function formatCurrency(amount) {
    return '$' + Number(amount).toLocaleString('en-US');
  }

  function getOutpatientDisplayAttr(timeMode) {
    var map = {
      regular: 'data-display-regular',
      night: 'data-display-night',
      holiday: 'data-display-holiday'
    };
    return map[timeMode] || map.regular;
  }

  function getOutpatientDisplayText(box, timeMode, numericPrice) {
    var custom = box.getAttribute(getOutpatientDisplayAttr(timeMode));
    if (custom) return custom;
    return formatCurrency(numericPrice);
  }

  function getOutpatientSlotAttr(timeMode) {
    var map = {
      regular: 'data-slot-regular',
      night: 'data-slot-night',
      holiday: 'data-slot-holiday'
    };
    return map[timeMode] || map.regular;
  }

  function getOutpatientSlotText(box, timeMode) {
    return box.getAttribute(getOutpatientSlotAttr(timeMode)) || '';
  }

  function updateOutpatientSlotDisplay(box, timeMode) {
    var slotEl = box.querySelector('.outpatient-slot');
    if (!slotEl) return;

    var slotText = getOutpatientSlotText(box, timeMode);
    if (slotText) {
      slotEl.innerHTML = '<span>🕐 ' + escapeHtml(slotText) + '</span>';
      slotEl.classList.remove('outpatient-slot--empty', 'hidden');
    } else {
      slotEl.innerHTML = '<span aria-hidden="true">&nbsp;</span>';
      slotEl.classList.add('outpatient-slot--empty');
      slotEl.classList.remove('hidden');
    }
  }

  function equalizeOutpatientCardSections(group) {
    if (!group.id || (group.id !== 'outpatient-grid' && group.id !== 'outpatient-specialty-grid')) {
      return;
    }

    var boxes = Array.from(group.querySelectorAll('.hospital-box:not(.user-hidden):not(.price-hidden)'));
    if (!boxes.length) return;

    var sections = ['.card-header', '.outpatient-slot', '.price-display'];
    sections.forEach(function (selector) {
      boxes.forEach(function (box) {
        var el = box.querySelector(selector);
        if (el) el.style.minHeight = '';
      });
    });

    var cols = window.matchMedia('(min-width: 768px)').matches ? 3 : 1;
    for (var i = 0; i < boxes.length; i += cols) {
      var row = boxes.slice(i, i + cols);
      sections.forEach(function (selector) {
        var els = row.map(function (box) { return box.querySelector(selector); }).filter(Boolean);
        if (!els.length) return;
        var max = Math.max.apply(null, els.map(function (el) { return el.getBoundingClientRect().height; }));
        els.forEach(function (el) { el.style.minHeight = Math.ceil(max) + 'px'; });
      });
    }
  }

  function renderComingSoonPriceHtml() {
    return (
      '<div class="text-xl font-bold text-gray-400">資料整理中</div>' +
      '<div class="text-[10px] text-gray-400 mt-1">暫無套餐資料</div>'
    );
  }

  function renderTagsHtml(tags) {
    if (!tags || !tags.length) return '';
    return tags.map(function (tag, idx) {
      var style = TAG_STYLES[idx % TAG_STYLES.length];
      return '<span class="' + style + ' text-[10px] px-1.5 py-0.5 rounded font-bold">' + escapeHtml(tag) + '</span>';
    }).join('');
  }

  function renderCardTopHtml(h, tagHtml) {
    return (
      '<div class="hospital-box__top">' +
      '<a href="' + (h.link || '#') + '" target="_blank" class="hospital-link">' + escapeHtml(h.name) + ' ↗</a>' +
      (tagHtml ? '<div class="hospital-box__tags">' + tagHtml + '</div>' : '') +
      '</div>'
    );
  }

  function getProcedureFavoriteId(moduleName, procedureId) {
    return moduleName + ':' + procedureId;
  }

  function readFavorites() {
    try {
      var raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeFavorites(list) {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list));
  }

  function isProcedureFavorited(moduleName, procedureId) {
    return readFavorites().some(function (item) {
      return item.id === getProcedureFavoriteId(moduleName, procedureId);
    });
  }

  function toggleProcedureFavorite(moduleName, procedureId, label) {
    var id = getProcedureFavoriteId(moduleName, procedureId);
    var list = readFavorites();
    var idx = list.findIndex(function (item) { return item.id === id; });
    if (idx !== -1) {
      list.splice(idx, 1);
    } else {
      var meta = MODULE_PAGES[moduleName] || { href: '#', title: moduleName, emoji: '🏥' };
      list.unshift({
        id: id,
        module: moduleName,
        procedure: procedureId,
        label: label,
        moduleTitle: meta.title,
        moduleEmoji: meta.emoji,
        pageHref: meta.href,
        savedAt: Date.now()
      });
    }
    writeFavorites(list);
    syncFavoritesUI();
    applyFavoritesFilter();
    return idx === -1;
  }

  function buildFavoriteHref(item) {
    var params = new URLSearchParams(window.location.search);
    var q = new URLSearchParams();
    if (params.get('insurance')) q.set('insurance', params.get('insurance'));
    if (params.get('time')) q.set('time', params.get('time'));
    var query = q.toString();
    return item.pageHref + '#' + item.procedure + (query ? '?' + query : '');
  }

  function syncFavoritesUI() {
    var list = readFavorites();

    document.querySelectorAll('.procedure-fav-btn').forEach(function (btn) {
      var moduleName = btn.getAttribute('data-fav-module');
      var procedureId = btn.getAttribute('data-fav-procedure');
      var active = isProcedureFavorited(moduleName, procedureId);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.title = active ? '取消收藏' : '收藏此手術';
      var label = btn.querySelector('.procedure-fav-btn__label');
      if (label) label.textContent = active ? '已收藏' : '收藏';
    });

    document.querySelectorAll('section[data-fav-module]').forEach(function (section) {
      var moduleName = section.getAttribute('data-fav-module');
      var procedureId = section.getAttribute('data-fav-procedure');
      section.classList.toggle('is-favorited', isProcedureFavorited(moduleName, procedureId));
    });

    var countEl = document.querySelector('.mp-fav-header-btn__count');
    if (countEl) {
      countEl.textContent = String(list.length);
      countEl.setAttribute('data-count', String(list.length));
    }

    renderFavoritesPanelList(list);
    renderHomeFavoritesList(list);
  }

  function renderFavoritesPanelList(list) {
    var listEl = document.getElementById('mp-favorites-list');
    if (!listEl) return;
    if (!list.length) {
      listEl.innerHTML = '<li class="mp-fav-panel__empty">尚未收藏手術。<br>在專科頁點擊手術標題旁的「收藏」即可加入。</li>';
      return;
    }
    listEl.innerHTML = list.map(function (item) {
      return (
        '<li class="mp-fav-panel__item">' +
        '<a class="mp-fav-panel__link" href="' + escapeAttr(buildFavoriteHref(item)) + '">' +
        '<div class="mp-fav-panel__proc">' + escapeHtml(item.label) + '</div>' +
        '<div class="mp-fav-panel__meta">' + escapeHtml(item.moduleEmoji + ' ' + item.moduleTitle) + '</div>' +
        '</a></li>'
      );
    }).join('');
  }

  function renderHomeFavoritesList(list) {
    var section = document.getElementById('mp-home-favorites');
    var listEl = document.getElementById('mp-home-favorites-list');
    if (!section || !listEl) return;
    section.classList.toggle('hidden', list.length === 0);
    if (!list.length) return;
    listEl.innerHTML = list.slice(0, 6).map(function (item) {
      return (
        '<a class="mp-fav-home-item" href="' + escapeAttr(buildFavoriteHref(item)) + '">' +
        '<div><div class="text-sm font-bold text-gray-800">' + escapeHtml(item.label) + '</div>' +
        '<div class="text-[10px] text-gray-400 mt-0.5">' + escapeHtml(item.moduleEmoji + ' ' + item.moduleTitle) + '</div></div>' +
        '<span class="text-xs font-bold text-[#2B579A]">查看 →</span></a>'
      );
    }).join('');
  }

  function injectProcedureFavoriteButtons() {
    document.querySelectorAll('.compare-group[data-module][data-procedure]').forEach(function (group) {
      var section = group.closest('section');
      if (!section || section.querySelector('.procedure-fav-btn')) return;

      var header = section.querySelector('.lane-header, h2.lane-header');
      if (!header) return;

      var moduleName = group.getAttribute('data-module');
      var procedureId = group.getAttribute('data-procedure');
      var label = header.textContent.trim();

      section.setAttribute('data-fav-module', moduleName);
      section.setAttribute('data-fav-procedure', procedureId);

      var wrapper = document.createElement('div');
      wrapper.className = 'procedure-lane-head';
      header.parentNode.insertBefore(wrapper, header);
      wrapper.appendChild(header);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'procedure-fav-btn';
      btn.setAttribute('data-fav-module', moduleName);
      btn.setAttribute('data-fav-procedure', procedureId);
      btn.setAttribute('aria-label', '收藏手術：' + label);
      btn.setAttribute('aria-pressed', 'false');
      btn.innerHTML = '<span class="procedure-fav-btn__icon" aria-hidden="true">♥</span><span class="procedure-fav-btn__label">收藏</span>';
      btn.addEventListener('click', function () {
        toggleProcedureFavorite(moduleName, procedureId, label);
      });
      wrapper.appendChild(btn);
    });
  }

  function injectFavoritesHeaderButton() {
    var header = document.querySelector('header');
    if (!header || document.getElementById('mp-favorites-toggle')) return;

    var nav = header.querySelector('nav');
    var wrap = document.createElement('div');
    wrap.className = 'mp-fav-header-wrap';
    wrap.innerHTML =
      '<button type="button" id="mp-favorites-toggle" class="mp-fav-header-btn" aria-expanded="false" aria-controls="mp-favorites-panel" title="我的收藏">' +
      '<span aria-hidden="true">♥</span><span>收藏</span>' +
      '<span class="mp-fav-header-btn__count" data-count="0">0</span>' +
      '</button>' +
      '<div id="mp-favorites-panel" class="mp-fav-panel hidden" role="dialog" aria-label="已收藏的手術">' +
      '<div class="mp-fav-panel__head">我關注的手術</div>' +
      '<ul id="mp-favorites-list" class="mp-fav-panel__list"></ul>' +
      '</div>';

    if (nav) header.insertBefore(wrap, nav);
    else header.appendChild(wrap);

    var toggle = document.getElementById('mp-favorites-toggle');
    var panel = document.getElementById('mp-favorites-panel');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isHidden = panel.classList.toggle('hidden');
      var isOpen = !isHidden;
      panel.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        panel.classList.add('hidden');
        panel.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function injectFavoritesFilterButton() {
    var filterContainer = document.getElementById('filter-container');
    if (!filterContainer || document.getElementById('mp-fav-filter-toggle')) return;
    if (!document.querySelector('.compare-group[data-procedure]')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'mp-fav-filter-toggle';
    btn.className = 'mp-fav-filter-btn';
    btn.innerHTML = '<span aria-hidden="true">♥</span><span>只看收藏的手術</span>';
    btn.addEventListener('click', function () {
      favoritesFilterActive = !favoritesFilterActive;
      btn.classList.toggle('is-active', favoritesFilterActive);
      applyFavoritesFilter();
    });
    filterContainer.insertAdjacentElement('afterend', btn);
  }

  function applyFavoritesFilter() {
    if (!document.querySelector('.compare-group[data-procedure]')) return;
    document.querySelectorAll('section[data-fav-module][data-fav-procedure]').forEach(function (section) {
      if (!favoritesFilterActive) {
        section.classList.remove('hidden');
        return;
      }
      var moduleName = section.getAttribute('data-fav-module');
      var procedureId = section.getAttribute('data-fav-procedure');
      section.classList.toggle('hidden', !isProcedureFavorited(moduleName, procedureId));
    });
    hideEmptyProcedureSections();
  }

  function injectHomeFavoritesSection() {
    if (!document.getElementById('module-grid') || document.getElementById('mp-home-favorites')) return;
    var anchor = document.getElementById('specialties');
    if (!anchor) return;

    anchor.insertAdjacentHTML('beforebegin',
      '<section id="mp-home-favorites" class="mp-fav-home-section hidden space-y-2">' +
      '<div class="flex items-center justify-between gap-3">' +
      '<div class="section-heading mb-0">我關注的手術</div>' +
      '<span class="text-[10px] text-gray-400">本地保存 · 跨專科同步</span>' +
      '</div>' +
      '<div id="mp-home-favorites-list" class="mp-fav-home-list"></div>' +
      '</section>'
    );
  }

  function decorateHospitalCards(group) {
    var visible = Array.from(group.querySelectorAll('.hospital-box:not(.price-hidden):not(.user-hidden)'));
    visible.forEach(function (box, idx) {
      box.style.setProperty('--stagger', String(idx));
      box.classList.add('animate-fadeIn');
    });
  }

  function isCustomUnavailableDisplay(text) {
    return text === '詳情查看' || text === '详情查看' || text === '詳情查看';
  }

  function updateProcedureCardDisplay(box) {
    var price = parseFloat(box.getAttribute('data-price')) || PLACEHOLDER_PRICE;
    var priceDisplayDiv = box.querySelector('.price-display');
    if (!priceDisplayDiv) return;

    if (isComingSoonPrice(price)) {
      priceDisplayDiv.innerHTML = renderComingSoonPriceHtml();
      return;
    }

    var label = box.getAttribute('data-price-label') || '';
    var display = box.getAttribute('data-display-price') || formatCurrency(price);
    priceDisplayDiv.innerHTML =
      (label ? '<div class="text-xs text-gray-400 block mb-0.5">' + escapeHtml(label) + '</div>' : '') +
      '<span class="text-2xl font-black text-gray-800 tracking-tight">' + escapeHtml(display) + '</span>';
  }

  function updateOutpatientCardDisplay(box, timeMode, insMode) {
    var resolved = resolveOutpatientPrice(box, timeMode);
    var currentPrice = resolved.price;
    var normalPrice = resolved.normal;
    var priceLabel = resolved.label;
    var displayText = getOutpatientDisplayText(box, timeMode, currentPrice);
    var normalDisplay = getOutpatientDisplayText(box, 'regular', normalPrice);
    var isSpecialty = box.getAttribute('data-outpatient-type') === 'specialty';

    box.setAttribute('data-price', currentPrice);
    box.setAttribute('data-current-price', currentPrice);
    updateOutpatientSlotDisplay(box, timeMode);

    var priceDisplayDiv = box.querySelector('.price-display');
    if (!priceDisplayDiv) return;

    if (isComingSoonPrice(currentPrice) && isCustomUnavailableDisplay(displayText)) {
      priceDisplayDiv.innerHTML =
        '<div class="text-xl font-bold text-gray-500">' + escapeHtml(displayText) + '</div>' +
        '<div class="text-[10px] text-gray-400 mt-0.5">' + escapeHtml(priceLabel) + '</div>';
    } else if (isComingSoonPrice(currentPrice)) {
      priceDisplayDiv.innerHTML = renderComingSoonPriceHtml();
    } else if (!isSpecialty && currentPrice >= OUTPATIENT_UNAVAILABLE) {
      priceDisplayDiv.innerHTML =
        '<div class="text-xl font-bold text-gray-300">-</div>' +
        '<div class="text-[10px] text-gray-400 mt-1">醫院當前時段不設全科門診</div>';
    } else if (currentPrice > normalPrice) {
      priceDisplayDiv.innerHTML =
        '<div class="text-[10px] text-red-400 line-through">原日常診金: ' + escapeHtml(normalDisplay) + '</div>' +
        '<div class="text-2xl font-black text-red-600 tracking-tight">' + escapeHtml(displayText) + '</div>' +
        '<div class="text-[9px] text-red-500 font-bold mt-0.5">⚡ 觸發時段附加費 (' + escapeHtml(priceLabel) + ')</div>';
    } else {
      priceDisplayDiv.innerHTML =
        '<div class="text-2xl font-bold text-gray-700 tracking-tight">' + escapeHtml(displayText) + '</div>' +
        '<div class="text-[10px] text-gray-400 mt-0.5">' + escapeHtml(priceLabel) + '</div>';
    }

    var insBox = box.querySelector('.insurance-box');
    if (!insBox) return;

    if (isSpecialty || isComingSoonPrice(currentPrice) || isCustomUnavailableDisplay(displayText) ||
        (!isSpecialty && currentPrice >= OUTPATIENT_UNAVAILABLE)) {
      insBox.classList.add('hidden');
    } else {
      insBox.classList.remove('hidden');
      if (insMode === 'wemed') {
        insBox.className = 'mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100 transition-all insurance-box';
        insBox.innerHTML =
          '<div class="text-[10px] text-blue-500 font-semibold">WeMedi 門診網絡保障已對接</div>' +
          '<div class="flex items-end gap-1 mt-0.5"><div class="text-xs text-gray-600">預估自付診金:</div>' +
          '<div class="text-base font-black text-[#1D4E89]">$50</div></div>';
      } else {
        insBox.className = 'mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 transition-all insurance-box';
        insBox.innerHTML =
          '<div class="text-[10px] text-gray-400">自費模式 (不使用門診卡)</div>' +
          '<div class="flex items-end gap-1 mt-0.5"><div class="text-xs text-gray-600">自付總計:</div>' +
          '<div class="text-base font-bold text-gray-700">' + escapeHtml(displayText) + '</div></div>';
      }
    }
  }

  function renderOutpatientCardHtml(h, options) {
    options = options || {};
    var tagClass = h.alert
      ? 'bg-orange-100 text-orange-600 border border-orange-200'
      : 'bg-[#99D6D1] text-[#1D4E89]';
    var hospitalTagHtml = h.tag
      ? '<span class="' + tagClass + ' text-[10px] px-1.5 py-0.5 rounded font-bold">' + escapeHtml(h.tag) + '</span>'
      : '';
    var scopeTagsHtml = renderTagsHtml(h.scopes);
    var remarksClass = h.alert ? 'text-red-500 font-medium' : 'text-gray-400';
    var insuranceBoxHtml = options.hideInsurance
      ? ''
      : '<div class="insurance-box mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200"></div>';

    var attrs =
      'data-hospital="' + h.id + '" ' +
      'data-normal="' + h.prices.regular + '" ' +
      'data-night="' + h.prices.night + '" ' +
      'data-holiday="' + h.prices.holiday + '"';
    if (options.type === 'specialty') attrs += ' data-outpatient-type="specialty"';
    if (h.displayPrices) {
      if (h.displayPrices.regular) attrs += ' data-display-regular="' + escapeAttr(h.displayPrices.regular) + '"';
      if (h.displayPrices.night) attrs += ' data-display-night="' + escapeAttr(h.displayPrices.night) + '"';
      if (h.displayPrices.holiday) attrs += ' data-display-holiday="' + escapeAttr(h.displayPrices.holiday) + '"';
    }
    if (h.timeSlots) {
      if (h.timeSlots.regular) attrs += ' data-slot-regular="' + escapeAttr(h.timeSlots.regular) + '"';
      if (h.timeSlots.night) attrs += ' data-slot-night="' + escapeAttr(h.timeSlots.night) + '"';
      if (h.timeSlots.holiday) attrs += ' data-slot-holiday="' + escapeAttr(h.timeSlots.holiday) + '"';
    }

    var tagsCombined = hospitalTagHtml + scopeTagsHtml;
    var tagsRowClass = options.type === 'specialty'
      ? 'card-tags flex flex-wrap gap-1 mt-1.5'
      : 'flex flex-wrap gap-1 mt-1.5';
    var tagsRowHtml = tagsCombined
      ? '<div class="' + tagsRowClass + '">' + tagsCombined + '</div>'
      : (options.type === 'specialty'
        ? '<div class="' + tagsRowClass + '"></div>'
        : '');
    var headerHtml =
      '<div class="card-header mb-1">' +
      renderCardTopHtml(h, '') +
      tagsRowHtml +
      '</div>';

    return (
      '<div class="hospital-box animate-fadeIn" ' + attrs + '>' +
      headerHtml +
      '<div class="text-[10px] text-gray-400 mb-3 leading-relaxed outpatient-slot outpatient-slot--empty"><span aria-hidden="true">&nbsp;</span></div>' +
      '<div class="price-display min-h-[50px]"></div>' +
      '<div class="text-[10px] ' + remarksClass + ' mt-2 block-remarks">' + escapeHtml(h.remarks || '') + '</div>' +
      insuranceBoxHtml +
      '</div>'
    );
  }

  function renderProcedureCardHtml(h) {
    var price = h.price != null && !isNaN(h.price) ? h.price : PLACEHOLDER_PRICE;
    var tagClass = h.alert
      ? 'bg-orange-100 text-orange-600 border border-orange-200'
      : 'bg-[#99D6D1] text-[#1D4E89]';
    var hospitalTagHtml = h.tag
      ? '<span class="' + tagClass + ' text-[10px] px-1.5 py-0.5 rounded font-bold">' + escapeHtml(h.tag) + '</span>'
      : '';
    var procedureTagsHtml = renderTagsHtml(h.tags);
    var remarksClass = (h.alert || (h.remarks && h.remarks.indexOf('⚠️') !== -1))
      ? 'text-red-500 font-medium'
      : 'text-gray-400';

    var attrs = 'data-hospital="' + h.id + '" data-price="' + price + '"';
    if (h.priceLabel) attrs += ' data-price-label="' + escapeAttr(h.priceLabel) + '"';
    if (h.displayPrice) attrs += ' data-display-price="' + escapeAttr(h.displayPrice) + '"';

    return (
      '<div class="hospital-box animate-fadeIn" ' + attrs + '>' +
      renderCardTopHtml(h, hospitalTagHtml + procedureTagsHtml) +
      '<div class="price-display min-h-[50px]"></div>' +
      '<div class="text-[10px] ' + remarksClass + ' mt-2 block-remarks">' + escapeHtml(h.remarks || '') + '</div>' +
      '</div>'
    );
  }

  function getPageHospitalList() {
    var pageModule = document.body && document.body.getAttribute('data-page-module');
    var multiProcedureModules = [
      'imaging', 'gynecology', 'generalSurgery', 'orthopedics', 'ent',
      'ophthalmology', 'painManagement', 'cardiology', 'plastics', 'urology'
    ];

    if (pageModule && multiProcedureModules.indexOf(pageModule) !== -1 && typeof getOrderedHospitals === 'function') {
      return getOrderedHospitals();
    }

    if (pageModule && typeof getModuleHospitalList === 'function') {
      return getModuleHospitalList(pageModule);
    }

    var moduleEl = document.querySelector('[data-module]');
    if (moduleEl && typeof getModuleHospitalList === 'function') {
      var moduleName = moduleEl.getAttribute('data-module');
      var procedureId = moduleEl.getAttribute('data-procedure');
      return getModuleHospitalList(moduleName, procedureId);
    }

    if (document.getElementById('ward-table-body') && typeof getModuleHospitalList === 'function') {
      return getModuleHospitalList('ward');
    }

    if (typeof getOrderedHospitals === 'function') return getOrderedHospitals();
    return [];
  }

  function initFilters() {
    var container = document.getElementById('filter-container');
    if (!container || container.children.length > 0) return;

    var hospitals = getPageHospitalList();
    if (!hospitals.length) return;

    container.innerHTML = hospitals.map(function (h) {
      var labelClass = h.id === 'szufh'
        ? 'text-[#1D4E89] font-bold'
        : 'text-gray-600 font-medium';
      return (
        '<label class="flex items-center gap-2.5 text-xs ' + labelClass + ' cursor-pointer">' +
        '<input type="checkbox" value="' + h.id + '" checked class="w-4 h-4 rounded text-[#1D4E89]"> ' +
        escapeHtml(h.name) +
        '</label>'
      );
    }).join('');
  }

  function initModuleGroups() {
    document.querySelectorAll('.compare-group[data-module]').forEach(function (group) {
      if (group.children.length > 0) return;
      if (typeof getModuleHospitalList !== 'function') return;

      var moduleName = group.getAttribute('data-module');
      var procedureId = group.getAttribute('data-procedure');
      var hospitals = getModuleHospitalList(moduleName, procedureId);
      group.innerHTML = hospitals.map(renderProcedureCardHtml).join('');
    });
  }

  function initWardTable() {
    var tbody = document.getElementById('ward-table-body');
    if (!tbody || tbody.children.length > 0) return;
    if (typeof getModuleHospitalList !== 'function') return;

    var hospitals = getModuleHospitalList('ward');
    tbody.innerHTML = hospitals.map(function (h) {
      var isSoon = h.prices.standard >= PLACEHOLDER_PRICE;
      var nameClass = isSoon ? 'font-bold text-gray-400' : 'font-bold text-gray-800';
      var cellClass = isSoon ? 'text-gray-400 italic font-normal' : 'font-medium text-gray-700';
      var linkHtml = h.link && h.link !== '#'
        ? '<a href="' + h.link + '" target="_blank" class="hospital-link">' + escapeHtml(h.name) + '</a>'
        : escapeHtml(h.name);

      return (
        '<tr data-hospital="' + h.id + '" data-standard="' + h.prices.standard + '" ' +
        'data-semi="' + h.prices.semiPrivate + '" data-private="' + h.prices.private + '">' +
        '<td class="' + nameClass + '">' + linkHtml + '</td>' +
        '<td class="' + cellClass + '">' + escapeHtml(h.ranges.standard) + '</td>' +
        '<td class="' + cellClass + '">' + escapeHtml(h.ranges.semiPrivate) + '</td>' +
        '<td class="' + cellClass + '">' + escapeHtml(h.ranges.private) + '</td>' +
        '</tr>'
      );
    }).join('');
  }

  function hideEmptyPlaceholders() {
    document.querySelectorAll('.empty-placeholder').forEach(function (el) {
      el.classList.add('hidden');
    });
  }

  function applyUserFilter(activeHospitals) {
    document.querySelectorAll('.hospital-box[data-hospital]').forEach(function (box) {
      var hospId = box.getAttribute('data-hospital');
      if (activeHospitals.indexOf(hospId) !== -1) {
        box.classList.remove('user-hidden');
      } else {
        box.classList.add('user-hidden');
      }
    });

    document.querySelectorAll('#ward-table-body tr[data-hospital]').forEach(function (row) {
      var hospId = row.getAttribute('data-hospital');
      if (activeHospitals.indexOf(hospId) !== -1) {
        row.classList.remove('user-hidden');
      } else {
        row.classList.add('user-hidden');
      }
    });
  }

  function isDetailOnlyOutpatientBox(box) {
    if (box.getAttribute('data-outpatient-type') !== 'specialty') return false;
    var timeMode = getSelectValue('time-select', 'regular');
    var display = box.getAttribute(getOutpatientDisplayAttr(timeMode));
    return isCustomUnavailableDisplay(display);
  }

  function processCompareGroup(group, insMode) {
    var visibleBoxes = Array.from(group.querySelectorAll('.hospital-box:not(.user-hidden)'));

    visibleBoxes.sort(function (a, b) {
      return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
    });

    visibleBoxes.forEach(function (box) {
      group.appendChild(box);
    });

    var detailOnly = visibleBoxes.filter(isDetailOnlyOutpatientBox);
    var available = visibleBoxes.filter(function (box) {
      if (isDetailOnlyOutpatientBox(box)) return false;
      return !isUnavailablePrice(box.getAttribute('data-price'), box);
    });
    var comingSoon = visibleBoxes.filter(function (box) {
      if (isDetailOnlyOutpatientBox(box)) return false;
      return isUnavailablePrice(box.getAttribute('data-price'), box);
    });

    group.querySelectorAll('.hospital-box').forEach(function (box) {
      box.classList.add('price-hidden');
      box.classList.remove('best-value', 'coming-soon-card', 'opacity-50');
    });

    available.slice(0, 3).forEach(function (box, idx) {
      box.classList.remove('price-hidden');
      if (idx === 0) {
        box.classList.add('best-value');
        if (insMode === 'wemed') {
          var ibox = box.querySelector('.insurance-box');
          if (ibox) ibox.className = 'mt-4 bg-emerald-50 p-3 rounded-lg border border-emerald-100 insurance-box';
        }
      }
    });

    comingSoon.forEach(function (box) {
      box.classList.add('price-hidden');
      box.classList.remove('coming-soon-card', 'opacity-50');
    });

    detailOnly.forEach(function (box) {
      box.classList.remove('price-hidden');
    });

    decorateHospitalCards(group);
  }

  function updateSpecialtySectionVisibility(timeMode) {
    var section = document.getElementById('specialty-outpatient');
    if (!section) return;
    if (timeMode === 'night' || timeMode === 'holiday') {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  }

  function updateView() {
    var activeHospitals = getActiveHospitals();
    var timeMode = getSelectValue('time-select', 'regular');
    var insMode = getSelectValue('insurance-select', 'none');
    var roomMode = getSelectValue('room-select', 'standard');

    updateSpecialtySectionVisibility(timeMode);

    document.querySelectorAll('.hospital-box[data-hospital]').forEach(function (box) {
      if (box.hasAttribute('data-normal')) {
        var cardTimeMode = box.getAttribute('data-outpatient-type') === 'specialty' ? 'regular' : timeMode;
        updateOutpatientCardDisplay(box, cardTimeMode, insMode);
      } else if (box.hasAttribute('data-standard')) {
        var price = resolveWardPrice(box, roomMode);
        box.setAttribute('data-price', price);
      } else if (box.querySelector('.price-display')) {
        updateProcedureCardDisplay(box);
      } else {
        box.setAttribute('data-price', resolveCardPrice(box));
      }
    });

    applyUserFilter(activeHospitals);

    document.querySelectorAll('.compare-group').forEach(function (group) {
      processCompareGroup(group, insMode);
      equalizeOutpatientCardSections(group);
    });

    hideEmptyProcedureSections();
  }

  function hideEmptyProcedureSections() {
    document.querySelectorAll('.compare-group[data-module]').forEach(function (group) {
      var section = group.closest('section');
      if (!section) return;
      var visibleCount = group.querySelectorAll(
        '.hospital-box:not(.price-hidden):not(.user-hidden)'
      ).length;
      section.classList.toggle('hidden', visibleCount === 0);
    });
  }

  var SURGERY_PAGE_MODULES = {
    generalSurgery: 1,
    orthopedics: 1,
    ent: 1,
    ophthalmology: 1,
    urology: 1,
    painManagement: 1,
    plastics: 1,
    cardiology: 1,
    gynecology: 1,
    imaging: 1
  };

  var SURGERY_MODULE_NAV = [
    { pageModule: 'imaging', href: 'imaging.html', emoji: '🔬', title: '內窺鏡與影像' },
    { pageModule: 'gynecology', href: 'gyn.html', emoji: '👩', title: '婦產科' },
    { pageModule: 'generalSurgery', href: 'general-surgery.html', emoji: '✂️', title: '外科' },
    { pageModule: 'orthopedics', href: 'orthopedics.html', emoji: '🦴', title: '骨科' },
    { pageModule: 'painManagement', href: 'pain-management.html', emoji: '💉', title: '疼痛科' },
    { pageModule: 'ent', href: 'ent.html', emoji: '👂', title: '耳鼻喉科' },
    { pageModule: 'ophthalmology', href: 'ophthalmology.html', emoji: '👁️', title: '眼科' },
    { pageModule: 'cardiology', href: 'cardiology.html', emoji: '❤️', title: '心內科' },
    { pageModule: 'plastics', href: 'plastics.html', emoji: '💄', title: '整形美容' },
    { pageModule: 'urology', href: 'urology.html', emoji: '💧', title: '泌尿外科' }
  ];

  function buildModuleNavQuery() {
    var params = new URLSearchParams(window.location.search);
    var q = new URLSearchParams();
    var ins = params.get('insurance') || getSelectValue('insurance-select', 'none');
    if (ins === 'wemed') ins = 'vhis-std';
    q.set('insurance', ins);
    if (params.get('time') || document.getElementById('time-select')) {
      q.set('time', params.get('time') || getSelectValue('time-select', 'regular'));
    }
    return q.toString();
  }

  function getSurgeryNavHref(href) {
    var query = buildModuleNavQuery();
    return query ? href + '?' + query : href;
  }

  function renderModuleNavItem(item, currentModule, variant) {
    var label = item.emoji + ' ' + item.title;
    var isActive = item.pageModule === currentModule;

    if (variant === 'chip') {
      if (isActive) {
        return '<span class="surgery-module-chip is-active" aria-current="page">' + escapeHtml(label) + '</span>';
      }
      return '<a class="surgery-module-chip" href="' + escapeAttr(getSurgeryNavHref(item.href)) + '">' + escapeHtml(label) + '</a>';
    }

    if (isActive) {
      return '<li><span class="surgery-module-sidebar-link is-active" aria-current="page">' + escapeHtml(label) + '</span></li>';
    }
    return '<li><a class="surgery-module-sidebar-link" href="' + escapeAttr(getSurgeryNavHref(item.href)) + '">' + escapeHtml(label) + '</a></li>';
  }

  function findSurgeryNavAnchor(mainWrap) {
    var h1 = mainWrap.querySelector('h1');
    if (h1) return h1.closest('section') || h1;

    var pageTitle = mainWrap.querySelector('section h2.text-2xl, section > h2');
    if (pageTitle) return pageTitle.closest('section') || pageTitle;

    return null;
  }

  function injectSurgeryModuleNav() {
    var currentModule = document.body.getAttribute('data-page-module');
    if (!SURGERY_PAGE_MODULES[currentModule] || document.getElementById('surgery-module-nav-chips')) return;

    var chipsHtml =
      '<nav id="surgery-module-nav-chips" class="surgery-module-nav surgery-module-nav--chips" aria-label="切換手術專科">' +
        '<p class="surgery-module-nav-label">切換專科</p>' +
        '<div class="surgery-module-nav-scroll">' +
          SURGERY_MODULE_NAV.map(function (item) {
            return renderModuleNavItem(item, currentModule, 'chip');
          }).join('') +
        '</div>' +
      '</nav>';

    var mainWrap = document.querySelector('main .max-w-6xl');
    if (mainWrap) {
      var anchor = findSurgeryNavAnchor(mainWrap);
      if (anchor) anchor.insertAdjacentHTML('afterend', chipsHtml);
      else mainWrap.insertAdjacentHTML('afterbegin', chipsHtml);
    }

    var filterContainer = document.getElementById('filter-container');
    if (filterContainer && !document.getElementById('surgery-module-nav-sidebar')) {
      var sidebarHtml =
        '<nav id="surgery-module-nav-sidebar" class="surgery-module-nav surgery-module-nav--sidebar" aria-label="切換手術專科">' +
          '<p class="surgery-module-nav-sidebar-label">切換專科</p>' +
          '<ul class="surgery-module-nav-sidebar-list">' +
            SURGERY_MODULE_NAV.map(function (item) {
              return renderModuleNavItem(item, currentModule, 'sidebar');
            }).join('') +
          '</ul>' +
        '</nav>';
      filterContainer.insertAdjacentHTML('afterend', sidebarHtml);
    }
  }

  function hideSurgeryFilterPanel() {
    var pageModule = document.body.getAttribute('data-page-module');
    if (!SURGERY_PAGE_MODULES[pageModule]) return;

    document.querySelectorAll('.surgery-filter-panel, [data-surgery-filter-panel]').forEach(function (el) {
      el.classList.add('hidden');
    });

    var ins = document.getElementById('insurance-select');
    if (ins) {
      var panel = ins.closest('div.rounded-xl');
      if (panel) panel.classList.add('hidden');
    }

    document.querySelectorAll('main .max-w-6xl > p, main .max-w-6xl p.surgery-filter-hint').forEach(function (p) {
      if (/已收錄套餐|Top 3|資料整理中|陸續補充/.test(p.textContent || '')) {
        p.classList.add('hidden');
      }
    });
  }

  function goBackHome(hash) {
    hash = hash || '';
    var params = new URLSearchParams();
    var ins = getSelectValue('insurance-select', 'none');
    var time = getSelectValue('time-select', 'regular');

    if (ins === 'wemed') ins = 'vhis-std';
    params.set('insurance', ins);
    if (document.getElementById('time-select')) params.set('time', time);

    window.location.href = 'index.html?' + params.toString() + hash;
  }

  function injectHeaderNav() {
    var header = document.querySelector('header');
    if (!header || header.querySelector('nav')) return;
    header.classList.add('justify-between');

    var fullWidthBtn = header.querySelector('button.w-full');
    if (fullWidthBtn) {
      var wrap = document.createElement('div');
      wrap.className = 'flex items-center gap-3 min-w-0';
      fullWidthBtn.classList.remove('w-full', 'text-left');
      fullWidthBtn.classList.add('w-7', 'h-7', 'shrink-0', 'bg-[#99D6D1]', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'text-[#1D4E89]', 'font-bold', 'hover:bg-white', 'transition-colors');
      var title = fullWidthBtn.querySelector('.text-xl');
      if (title) {
        title.classList.add('tracking-tighter');
        fullWidthBtn.innerHTML = '←';
        wrap.appendChild(fullWidthBtn);
        wrap.appendChild(title);
      } else {
        wrap.appendChild(fullWidthBtn);
      }
      header.insertBefore(wrap, header.firstChild);
    }

    var nav = document.createElement('nav');
    nav.className = 'hidden md:flex gap-6 text-sm shrink-0 whitespace-nowrap';
    nav.innerHTML =
      '<a href="index.html" class="hover:text-[#99D6D1]">首頁</a>' +
      '<a href="index.html#specialties" class="text-[#99D6D1] font-bold">專科收費</a>' +
      '<a href="intelligence.html" class="hover:text-[#99D6D1]">醫療情報</a>';
    header.appendChild(nav);
  }

  function bindNavigation() {
    document.querySelectorAll('[data-action="go-back-home"]').forEach(function (el) {
      el.addEventListener('click', function () {
        goBackHome(el.getAttribute('data-hash') || '');
      });
    });
  }

  function scrollToHash() {
    if (!window.location.hash) return;
    var target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    }
  }

  window.updateView = updateView;
  window.goBackHome = goBackHome;
  window.renderOutpatientCardHtml = renderOutpatientCardHtml;
  window.toggleProcedureFavorite = toggleProcedureFavorite;
  window.readProcedureFavorites = readFavorites;

  document.addEventListener('DOMContentLoaded', function () {
    applyUrlParams();
    bindNavigation();
    injectHeaderNav();
    injectFavoritesHeaderButton();
    injectHomeFavoritesSection();
    hideSurgeryFilterPanel();
    injectSurgeryModuleNav();

    initModuleGroups();
    initWardTable();
    initFilters();
    hideEmptyPlaceholders();
    injectProcedureFavoriteButtons();
    injectFavoritesFilterButton();
    syncFavoritesUI();

    var loadingSkeleton = document.getElementById('loading-skeleton');
    var outpatientGrid = document.getElementById('outpatient-grid');
    var specialtyGrid = document.getElementById('outpatient-specialty-grid');
    if (loadingSkeleton) loadingSkeleton.classList.add('hidden');
    if (outpatientGrid) outpatientGrid.classList.remove('hidden');
    if (specialtyGrid) specialtyGrid.classList.remove('hidden');

    var filterContainer = document.getElementById('filter-container');
    if (filterContainer) {
      filterContainer.addEventListener('change', function (e) {
        if (e.target && e.target.matches('input[type="checkbox"]')) updateView();
      });
    }

    ['time-select', 'insurance-select', 'room-select'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', updateView);
    });

    if (document.querySelector('.compare-group') || document.querySelector('#ward-table-body')) {
      updateView();
    }

    if (outpatientGrid || specialtyGrid) {
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (outpatientGrid) equalizeOutpatientCardSections(outpatientGrid);
          if (specialtyGrid) equalizeOutpatientCardSections(specialtyGrid);
        }, 150);
      });
    }

    scrollToHash();
  });
})();
