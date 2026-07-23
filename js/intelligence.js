/**
 * 醫療情報 — 文章數據
 * 新增文章：在 ARTICLES 陣列末尾追加一筆即可，頁面會自動渲染。
 *
 * 欄位說明：
 *   id       — 唯一識別（用於詳情頁檔名，如 articles/{id}.html）
 *   category — 分類標籤（不含 #）
 *   title    — 標題
 *   summary  — 摘要
 *   date     — 發佈日期
 *   featured — 是否精選（true 時顯示於頂部大卡片）
 *   href     — 文章連結；留空或 '#' 表示詳情頁尚未上線
 */
var CATEGORIES = ['全部', '費用須知', '理賠解析', '跨境醫療', '政策動態'];

var ARTICLES = [
    {
        id: 'hidden-fees',
        category: '費用須知',
        title: '私家醫院隱藏收費解析：巡房費、儀器費點樣計？',
        summary: '許多患者誤以為私院套餐已包含所有開支。本文深入解讀各院「非套餐項目」的隱形計費標準，教您如何看懂入院報價單，避免出院時面臨巨額帳單差價。',
        date: '2026年6月',
        featured: true,
        href: 'articles/hidden-fees.html'
    },
    {
        id: 'vhis-smm',
        category: '理賠解析',
        title: 'VHIS「附加醫療保障（SMM）」理賠比例實測及案例分析',
        summary: '解釋 SMM 何時啟動、常見 80% 超額賠償邏輯，以及標準計劃與靈活計劃差異。配合專科頁套餐價估算自付差（非理賠承諾）。',
        date: '2026年7月',
        featured: false,
        href: 'articles/vhis-smm.html'
    },
    {
        id: 'ha-fee-reform-2026',
        category: '政策動態',
        title: '2026 公營醫療收費改革解讀：急症 $400 之後，公私院怎麼比？',
        summary: '整理醫管局 2026 年 1 月 1 日起生效的急症室、專科門診、住院日費與全年收費上限，並與私院量級對照。',
        date: '2026年7月',
        featured: false,
        href: 'articles/ha-fee-reform-2026.html'
    },
    {
        id: 'day-surgery-budget',
        category: '費用須知',
        title: '日間手術套餐怎麼讀？已含、另計與住院差在哪',
        summary: '教您拆解日間套餐的包含項目、常見另計費用，以及與住院路徑、公營日間程序基準的預算差異。',
        date: '2026年7月',
        featured: false,
        href: 'articles/day-surgery-budget.html'
    },
    {
        id: 'cataract-cost-guide',
        category: '費用須知',
        title: '白內障手術預算指南：私院套餐價、晶體級別與自付估算',
        summary: '整理各院日間白內障公開套餐區間與市場中位數量級，說明晶體升級如何拉高價錢，並連結眼科比價頁。',
        date: '2026年7月',
        featured: false,
        href: 'articles/cataract-cost-guide.html'
    },
    {
        id: 'cross-border-elderly',
        category: '跨境醫療',
        title: '長者醫療券深圳新風和睦家醫院落地指南：如何扣減香港 VHIS 自付額？',
        summary: '深圳新風和睦家在內窺鏡與影像專線提供跨境定額套餐，可在影像專頁與香港私院直接對比。',
        date: '2026年5月',
        featured: false,
        href: 'articles/cross-border-elderly.html'
    }
];

var activeCategory = '全部';

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
}

function renderCategoryTabs() {
    var container = document.getElementById('category-tabs');
    container.innerHTML = CATEGORIES.map(function (cat) {
        var active = cat === activeCategory;
        var cls = active
            ? 'bg-[#2B579A] text-white'
            : 'bg-white text-[#2B579A] border border-gray-200 hover:border-[#99D6D1]';
        return '<button type="button" class="category-tab text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer ' + cls + '" data-category="' + escapeAttr(cat) + '">' + escapeHtml(cat) + '</button>';
    }).join('');

    container.querySelectorAll('.category-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
            activeCategory = btn.getAttribute('data-category');
            renderCategoryTabs();
            renderArticles();
        });
    });
}

function filterArticles() {
    if (activeCategory === '全部') return ARTICLES.slice();
    return ARTICLES.filter(function (a) { return a.category === activeCategory; });
}

function articleCardHtml(article, large) {
    var tag = '#' + escapeHtml(article.category);
    var href = article.href && article.href !== '#' ? article.href : '';
    var clickable = !!href;
    var title = escapeHtml(article.title);
    var summary = escapeHtml(article.summary);
    var date = escapeHtml(article.date);
    var openTag = clickable
        ? '<a href="' + escapeAttr(href) + '" class="block no-underline text-inherit'
        : '<article class="';
    var closeTag = clickable ? '</a>' : '</article>';

    if (large) {
        return openTag + ' article-feature lg:col-span-2 flex flex-col justify-between group">' +
            '<div class="space-y-3">' +
            '<span class="inline-block bg-[#99D6D1]/40 text-[#1D4E89] text-[10px] font-bold px-2 py-1 rounded">' + tag + '</span>' +
            '<h2 class="text-lg font-bold text-gray-800 group-hover:text-[#1D4E89] transition-colors leading-snug">' + title + '</h2>' +
            '<p class="text-xs text-gray-500 leading-relaxed">' + summary + '</p>' +
            '</div>' +
            '<div class="flex justify-between items-center pt-6 border-t border-gray-100 mt-4 text-[11px] text-gray-400">' +
            '<span>發佈時間：' + date + '</span>' +
            (clickable ? '<span class="text-[#2B579A] font-bold group-hover:translate-x-1 transition-transform inline-block">閱讀全文 →</span>' : '<span class="text-gray-300">即將上線</span>') +
            '</div>' + closeTag;
    }

    return openTag + ' article-side group flex flex-col justify-between h-full">' +
        '<div class="space-y-2">' +
        '<span class="text-[9px] text-[#2B579A] font-bold">' + tag + '</span>' +
        '<h3 class="text-sm font-bold text-gray-700 group-hover:text-[#1D4E89] line-clamp-3 transition-colors">' + title + '</h3>' +
        '<p class="text-[11px] text-gray-500 line-clamp-2">' + summary + '</p>' +
        '</div>' +
        '<div class="text-[10px] text-gray-400 pt-3 border-t border-gray-50 mt-3 flex justify-between">' +
        '<span>' + date + '</span>' +
        (clickable ? '<span class="text-[#2B579A] font-semibold">閱讀 →</span>' : '<span class="text-gray-300">即將上線</span>') +
        '</div>' + closeTag;
}

function renderArticles() {
    var filtered = filterArticles();
    var featured = filtered.find(function (a) { return a.featured; });
    var rest = filtered.filter(function (a) { return !a.featured || activeCategory !== '全部'; });
    if (activeCategory !== '全部') rest = filtered;

    var featuredSection = document.getElementById('featured-section');
    var featuredEl = document.getElementById('featured-article');
    var listEl = document.getElementById('article-list');
    var emptyEl = document.getElementById('empty-state');
    var countEl = document.getElementById('article-count');

    if (activeCategory === '全部' && featured) {
        featuredSection.classList.remove('hidden');
        featuredEl.innerHTML = articleCardHtml(featured, true);
        rest = filtered.filter(function (a) { return a.id !== featured.id; });
    } else {
        featuredSection.classList.add('hidden');
        featuredEl.innerHTML = '';
    }

    countEl.textContent = filtered.length + ' 篇';

    if (rest.length === 0 && !(activeCategory === '全部' && featured)) {
        listEl.innerHTML = '';
        listEl.classList.add('hidden');
        emptyEl.classList.remove('hidden');
        return;
    }

    listEl.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    listEl.innerHTML = rest.map(function (a) { return articleCardHtml(a, false); }).join('');
}

renderCategoryTabs();
renderArticles();
