/**
 * MedicalPrice V2.0 — 全局渲染引擎
 * 統一 updateView() 業務流水線
 */
(function () {
  'use strict';

  var PLACEHOLDER_PRICE = 9999999;
  var OUTPATIENT_UNAVAILABLE = 9999;

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

  function updateOutpatientCardDisplay(box, timeMode, insMode) {
    var resolved = resolveOutpatientPrice(box, timeMode);
    var currentPrice = resolved.price;
    var normalPrice = resolved.normal;
    var priceLabel = resolved.label;
    var hospitalId = box.getAttribute('data-hospital');

    box.setAttribute('data-price', currentPrice);
    box.setAttribute('data-current-price', currentPrice);

    var priceDisplayDiv = box.querySelector('.price-display');
    if (!priceDisplayDiv) return;

    if (currentPrice >= OUTPATIENT_UNAVAILABLE) {
      priceDisplayDiv.innerHTML =
        '<div class="text-xl font-bold text-gray-300">-</div>' +
        '<div class="text-[10px] text-gray-400 mt-1">醫院當前時段不設全科門診</div>';
    } else if (currentPrice > normalPrice) {
      priceDisplayDiv.innerHTML =
        '<div class="text-[10px] text-red-400 line-through">原日常診金: HK$' + normalPrice + '</div>' +
        '<div class="text-xl font-black text-red-600">HK$' + currentPrice + '</div>' +
        '<div class="text-[9px] text-red-500 font-bold mt-0.5">⚡ 觸發時段附加費 (' + priceLabel + ')</div>';
    } else if (hospitalId === 'szufh') {
      priceDisplayDiv.innerHTML =
        '<div class="text-xl font-black text-[#1D4E89]">￥550</div>' +
        '<div class="text-[10px] text-gray-500 mt-0.5">約 HK$' + currentPrice + ' (常規辦公)</div>';
    } else {
      priceDisplayDiv.innerHTML =
        '<div class="text-xl font-bold text-gray-700">HK$' + currentPrice + '</div>' +
        '<div class="text-[10px] text-gray-400 mt-0.5">' + priceLabel + '</div>';
    }

    var insBox = box.querySelector('.insurance-box');
    if (!insBox) return;

    if (currentPrice >= OUTPATIENT_UNAVAILABLE) {
      insBox.classList.add('hidden');
    } else {
      insBox.classList.remove('hidden');
      if (insMode === 'wemed') {
        insBox.className = 'mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100 transition-all insurance-box';
        insBox.innerHTML =
          '<div class="text-[10px] text-blue-500 font-semibold">WeMedi 門診網絡保障已對接</div>' +
          '<div class="flex items-end gap-1 mt-0.5"><div class="text-xs text-gray-600">預估自付診金:</div>' +
          '<div class="text-base font-black text-[#1D4E89]">HK$ 50</div></div>';
      } else {
        insBox.className = 'mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200 transition-all insurance-box';
        insBox.innerHTML =
          '<div class="text-[10px] text-gray-400">自費模式 (不使用門診卡)</div>' +
          '<div class="flex items-end gap-1 mt-0.5"><div class="text-xs text-gray-600">自付總計:</div>' +
          '<div class="text-base font-bold text-gray-700">HK$ ' + currentPrice + '</div></div>';
      }
    }
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

  function processCompareGroup(group, insMode) {
    var visibleBoxes = Array.from(group.querySelectorAll('.hospital-box:not(.user-hidden)'));

    visibleBoxes.sort(function (a, b) {
      return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
    });

    visibleBoxes.forEach(function (box) {
      group.appendChild(box);
    });

    group.querySelectorAll('.hospital-box').forEach(function (box) {
      box.classList.add('price-hidden');
      box.classList.remove('best-value');
    });

    visibleBoxes.forEach(function (box, idx) {
      var priceValue = parseFloat(box.getAttribute('data-price'));
      if (idx < 3) {
        box.classList.remove('price-hidden');
        var threshold = box.hasAttribute('data-normal') ? OUTPATIENT_UNAVAILABLE : PLACEHOLDER_PRICE;
        if (idx === 0 && priceValue < threshold) {
          box.classList.add('best-value');
          if (insMode === 'wemed') {
            var ibox = box.querySelector('.insurance-box');
            if (ibox) ibox.className = 'mt-4 bg-emerald-50 p-3 rounded-lg border border-emerald-100 insurance-box';
          }
        }
      }
    });
  }

  function updateView() {
    var activeHospitals = getActiveHospitals();
    var timeMode = getSelectValue('time-select', 'regular');
    var insMode = getSelectValue('insurance-select', 'none');
    var roomMode = getSelectValue('room-select', 'standard');

    document.querySelectorAll('.hospital-box[data-hospital]').forEach(function (box) {
      if (box.hasAttribute('data-normal')) {
        updateOutpatientCardDisplay(box, timeMode, insMode);
      } else if (box.hasAttribute('data-standard')) {
        var price = resolveWardPrice(box, roomMode);
        box.setAttribute('data-price', price);
      } else {
        box.setAttribute('data-price', resolveCardPrice(box));
      }
    });

    applyUserFilter(activeHospitals);

    document.querySelectorAll('.compare-group').forEach(function (group) {
      processCompareGroup(group, insMode);
    });
  }

  window.updateView = updateView;

  document.addEventListener('DOMContentLoaded', function () {
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
  });
})();
