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
        summary: '標準計劃與靈活計劃在日間手術、病房升級時的自付差異顯著。使用首頁保險設定進入各專科頁面，可同步您的 VHIS 計劃設定。',
        date: '2026-05',
        featured: false,
        href: '#'
    },
    {
        id: 'cross-border-elderly',
        category: '跨境醫療',
        title: '長者醫療券深圳新風和睦家醫院落地指南：如何扣減香港 VHIS 自付額？',
        summary: '深圳新風和睦家在內窺鏡與影像專線提供跨境定額套餐，可在影像專頁與香港私院直接對比。',
        date: '2026-05',
        featured: false,
        href: 'articles/cross-border-elderly.html'
    }
];

var activeCategory = '全部';

function renderCategoryTabs() {
    var container = document.getElementById('category-tabs');
    container.innerHTML = CATEGORIES.map(function (cat) {
        var active = cat === activeCategory;
        var cls = active
            ? 'bg-[#2B579A] text-white'
            : 'bg-white text-[#2B579A] border border-gray-200 hover:border-[#99D6D1]';
        return '<button type="button" class="category-tab text-xs font-bold px-4 py-2 rounded-full transition-colors cursor-pointer ' + cls + '" data-category="' + cat + '">' + cat + '</button>';
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
    var tag = '#' + article.category;
    var href = article.href && article.href !== '#' ? article.href : '#';
    var clickable = href !== '#';
    var onclick = clickable ? ' onclick="window.location.href=\'' + href + '\'"' : '';
    var cursor = clickable ? ' cursor-pointer' : ' cursor-default';

    if (large) {
        return '<article class="article-feature lg:col-span-2 flex flex-col justify-between group' + cursor + '"' + onclick + '>' +
            '<div class="space-y-3">' +
            '<span class="inline-block bg-[#99D6D1]/40 text-[#1D4E89] text-[10px] font-bold px-2 py-1 rounded">' + tag + '</span>' +
            '<h2 class="text-lg font-bold text-gray-800 group-hover:text-[#1D4E89] transition-colors leading-snug">' + article.title + '</h2>' +
            '<p class="text-xs text-gray-500 leading-relaxed">' + article.summary + '</p>' +
            '</div>' +
            '<div class="flex justify-between items-center pt-6 border-t border-gray-100 mt-4 text-[11px] text-gray-400">' +
            '<span>發佈時間：' + article.date + '</span>' +
            (clickable ? '<span class="text-[#2B579A] font-bold group-hover:translate-x-1 transition-transform inline-block">閱讀全文 →</span>' : '<span class="text-gray-300">即將上線</span>') +
            '</div></article>';
    }

    return '<article class="article-side group flex flex-col justify-between h-full' + cursor + '"' + onclick + '>' +
        '<div class="space-y-2">' +
        '<span class="text-[9px] text-[#2B579A] font-bold">' + tag + '</span>' +
        '<h3 class="text-sm font-bold text-gray-700 group-hover:text-[#1D4E89] line-clamp-3 transition-colors">' + article.title + '</h3>' +
        '<p class="text-[11px] text-gray-500 line-clamp-2">' + article.summary + '</p>' +
        '</div>' +
        '<div class="text-[10px] text-gray-400 pt-3 border-t border-gray-50 mt-3 flex justify-between">' +
        '<span>' + article.date + '</span>' +
        (clickable ? '<span class="text-[#2B579A] font-semibold">閱讀 →</span>' : '<span class="text-gray-300">即將上線</span>') +
        '</div></article>';
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

    if (rest.length === 0 && !featured) {
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
