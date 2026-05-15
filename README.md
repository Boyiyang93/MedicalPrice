<!DOCTYPE html>
<html lang="zh-HK">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>醫療價格第三方門戶 - 全維度智能比價</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --ufh-blue: #1D4E89; 
            --title-blue: #2B579A;
            --ufh-mint: #99D6D1;
        }
        body { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; background-color: #F7F8FA; color: #333; scroll-behavior: smooth; }
        
        .sidebar-fixed { width: 280px; height: calc(100vh - 64px); position: fixed; top: 64px; left: 0; background: white; border-right: 1px solid #E5E7EB; overflow-y: auto; z-index: 40; }
        .main-content { margin-left: 280px; padding-top: 80px; padding-bottom: 100px; }
        
        .comparison-card { background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); margin-bottom: 3rem; border: 1px solid #F3F4F6; overflow: hidden; }
        .hospital-box { border-radius: 8px; padding: 16px; border: 1px solid #F3F4F6; transition: all 0.2s; position: relative; }
        .hospital-box.best-value { border: 2px solid var(--ufh-mint); background-color: #F0FAF9; }
        
        /* 動態隱藏引擎 */
        .user-hidden { display: none !important; } 
        .price-hidden { display: none !important; } 
        
        .data-table { width: 100%; text-align: left; border-collapse: collapse; }
        .data-table th { padding: 12px; background-color: #F9FAFB; font-weight: 600; color: #6B7280; font-size: 12px; border-bottom: 1px solid #E5E7EB; }
        .data-table td { padding: 12px; border-bottom: 1px solid #F3F4F6; font-size: 13px; color: #4B5563; }
        
        /* 超鏈接樣式 */
        .hospital-link { color: var(--title-blue); font-weight: bold; text-decoration: none; border-bottom: 1px solid transparent; transition: 0.2s; display: inline-block; }
        .hospital-link:hover { border-bottom-color: var(--ufh-mint); color: var(--ufh-blue); }
        .section-header::before { content: ""; display: inline-block; width: 4px; height: 20px; background: var(--ufh-mint); margin-right: 10px; vertical-align: middle; }
    </style>
</head>
<body>

    <header class="h-16 bg-[#1D4E89] text-white fixed w-full z-[100] flex items-center px-8 justify-between shadow-md">
        <div class="flex items-center gap-3">
            <div class="w-7 h-7 bg-[#99D6D1] rounded-sm"></div>
            <span class="text-xl font-bold tracking-tighter">MedicalPrice <span class="font-light opacity-60 ml-2">智能比價引擎</span></span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-xs">
            <div class="opacity-70">匯率基準：1 CNY = 1.1544 HKD</div>
            <div class="bg-[#99D6D1] text-[#1D4E89] font-bold px-3 py-1.5 rounded">智能過濾：僅顯示最優惠 Top 3</div>
        </div>
    </header>

    <div class="flex">
        <aside class="sidebar-fixed p-6 hidden lg:block">
            <div class="mb-6">
                <nav class="space-y-1">
                    <a href="#ward" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">🏥 13間私院病房</a>
                    <a href="#ortho" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">🦴 骨科中心</a>
                    <a href="#surgery" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">✂️ 普通/日間外科</a>
                    <a href="#endo" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">🔬 內窺鏡中心</a>
                    <a href="#ent" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">👁️ 眼/耳鼻喉科</a>
                    <a href="#gyn" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">👩 婦產科中心</a>
                    <a href="#plastic" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">💄 整形及醫美外科</a>
                    <a href="#imaging" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">🩻 CT及MRI掃描</a>
                    <a href="#public" class="block p-2 text-sm rounded hover:bg-gray-50 text-red-600 font-bold">🏥 公立醫院新規</a>
                    <a href="#serious" class="block p-2 text-sm rounded hover:bg-gray-50 text-gray-600">📊 重疾總開支預估</a>
                </nav>
            </div>
            
            <div>
                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">醫院過濾器 (多選)</p>
                <div class="space-y-2 px-1 h-64 overflow-y-auto" id="filter-container">
                    <label class="flex items-center gap-2 text-xs text-[#1D4E89] font-bold"><input type="checkbox" value="szufh" checked onchange="updateView()"> 深圳新風和睦家</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="ghk" checked onchange="updateView()"> 港怡醫院 (GHK)</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="hksh" checked onchange="updateView()"> 養和醫院 (HKSH)</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="matilda" checked onchange="updateView()"> 明德國際醫院</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="sth" checked onchange="updateView()"> 聖德肋撒 (法國)</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="cuhk" checked onchange="updateView()"> 中大醫院 (CUHK)</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="union" checked onchange="updateView()"> 仁安醫院</label>
                    <label class="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" value="baptist" checked onchange="updateView()"> 香港浸信會</label>
                    <label class="flex items-center gap-2 text-xs text-red-600 font-bold"><input type="checkbox" value="ha" checked onchange="updateView()"> 醫管局 (公立)</label>
                </div>
            </div>
        </aside>

        <main class="main-content flex-1 px-4 lg:px-10">
            <div class="max-w-6xl mx-auto">
                
                <section class="mb-10">
                    <h1 class="text-3xl font-black text-[#2B579A] mb-4">智能手術及套餐比價引擎</h1>
                    
                    <div class="mt-6 flex gap-4">
                        <input type="text" placeholder="搜索手術項目 (如：剖腹產、白內障、腹腔鏡)..." class="flex-1 p-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#99D6D1] bg-white">
                        <button class="bg-[#2B579A] text-white px-8 rounded-xl font-bold hover:bg-[#1D4E89] transition-colors">搜索</button>
                    </div>
                </section>

                <div id="ward" class="section-header text-xl font-bold text-[#2B579A] mb-4">全港私家醫院病房基準收費</div>
                <div class="comparison-card">
                    <table class="data-table">
                        <thead><tr><th>醫院名稱</th><th>普通病房 (HK$)</th><th>半私家房 (HK$)</th><th>私家房 (HK$)</th></tr></thead>
                        <tbody>
                            <tr data-hospital="hksh"><td>養和醫院</td><td>$1,180 – $1,930</td><td>$2,500 – $3,500</td><td>$4,200 – $6,800</td></tr>
                            <tr data-hospital="ghk"><td>港怡醫院</td><td>$980 – $1,080</td><td>$1,800 – $2,700</td><td>$4,200 – $10,800</td></tr>
                            <tr data-hospital="matilda"><td>明德國際醫院</td><td>$900 – $1,100</td><td>$1,990 – $2,300</td><td>$3,300 – $4,500</td></tr>
                            <tr data-hospital="sth"><td>聖德肋撒醫院 (法國)</td><td>$610 – $800</td><td>$1,000 – $1,750</td><td>$2,100 – $15,300</td></tr>
                            <tr data-hospital="union"><td>仁安醫院</td><td>$600 – $950</td><td>$1,080 – $2,000</td><td>$2,500 – $8,000</td></tr>
                            <tr data-hospital="baptist"><td>香港浸信會醫院</td><td>$820 – $1,240</td><td>$1,810 – $2,320</td><td>$3,500 – $4,780</td></tr>
                            <tr data-hospital="cuhk"><td>中大醫院</td><td>$1,000</td><td>$1,500 – $2,500</td><td>$3,600 – $4,800</td></tr>
                        </tbody>
                    </table>
                    <div class="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <a href="#" class="inline-flex items-center gap-2 text-[#2B579A] text-sm font-bold hover:text-[#1D4E89] hover:underline transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>
                            查看 13 間醫院病房全面價格清單 (PDF版)
                        </a>
                    </div>
                </div>

                <div id="ortho" class="section-header text-xl font-bold text-[#2B579A] mt-10 mb-2">骨科中心手術</div>
                <p class="text-xs text-gray-500 mb-4 bg-blue-50/50 inline-block px-3 py-1 rounded">ℹ️ 智能比價：如選擇超過三家醫院，當前視圖僅展示價格最便宜的前三家信息。</p>
                <div class="comparison-card">
                    <div class="p-6">
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">單側全膝關節置換術</h3>
                        <div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="hospital-box" data-hospital="szufh" data-price="48485">
                                <a href="https://www.szufh.hk/" target="_blank" class="hospital-link text-[10px] mb-1">深圳和睦家 ↗</a>
                                <div class="text-xl font-black text-[#1D4E89]">￥42,000</div>
                                <div class="text-[10px] text-gray-500 mt-1">約 HK$48,485</div>
                            </div>
                            <div class="hospital-box" data-hospital="ghk" data-price="158800">
                                <a href="https://gleneagles.hk/" target="_blank" class="hospital-link text-[10px] mb-1">港怡醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$158,800</div>
                                <div class="text-[10px] text-gray-400 mt-1">全包套餐 (起)</div>
                            </div>
                            <div class="hospital-box" data-hospital="matilda" data-price="191800">
                                <a href="https://www.matilda.org/" target="_blank" class="hospital-link text-[10px] mb-1">明德國際醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$191,800</div>
                                <div class="text-[10px] text-gray-400 mt-1">醫院套餐</div>
                            </div>
                            <div class="hospital-box" data-hospital="hksh" data-price="9999999">
                                <a href="https://www.hksh-hospital.com/" target="_blank" class="hospital-link text-[10px] mb-1">養和醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                            <div class="hospital-box" data-hospital="union" data-price="9999999">
                                <a href="https://www.union.org/" target="_blank" class="hospital-link text-[10px] mb-1">仁安醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <a href="#" class="inline-flex items-center gap-2 text-[#2B579A] text-sm font-bold hover:text-[#1D4E89] hover:underline transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>
                            查看骨科全面價格對比清單 (PDF版)
                        </a>
                    </div>
                </div>

                <div id="surgery" class="section-header text-xl font-bold text-[#2B579A] mt-10 mb-2">普通及日間外科</div>
                <p class="text-xs text-gray-500 mb-4 bg-blue-50/50 inline-block px-3 py-1 rounded">ℹ️ 智能比價：如選擇超過三家醫院，當前視圖僅展示價格最便宜的前三家信息。</p>
                <div class="comparison-card">
                    <div class="p-6">
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">腹腔鏡膽囊切除術 (微創割膽石)</h3>
                        <div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="hospital-box" data-hospital="sth" data-price="10330">
                                <a href="https://www.sth.org.hk/" target="_blank" class="hospital-link text-[10px] mb-1">聖德肋撒醫院 ↗</a>
                                <div class="text-xl font-bold text-red-500">HK$10,330</div>
                                <div class="text-[10px] text-gray-400 mt-1">⚠️ 僅手術室基本費</div>
                            </div>
                            <div class="hospital-box" data-hospital="hksh" data-price="85000">
                                <a href="https://www.hksh-hospital.com/" target="_blank" class="hospital-link text-[10px] mb-1">養和醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$85,000</div>
                                <div class="text-[10px] text-gray-400 mt-1">套餐參考價</div>
                            </div>
                            <div class="hospital-box" data-hospital="ghk" data-price="99500">
                                <a href="https://gleneagles.hk/" target="_blank" class="hospital-link text-[10px] mb-1">港怡醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$99,500</div>
                                <div class="text-[10px] text-gray-400 mt-1">全包套餐 (起)</div>
                            </div>
                            <div class="hospital-box" data-hospital="szufh" data-price="9999999">
                                <a href="https://www.szufh.hk/" target="_blank" class="hospital-link text-[10px] mb-1">深圳和睦家 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                        </div>

                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">包皮環切術</h3>
                        <div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="hospital-box" data-hospital="sth" data-price="1650">
                                <a href="https://www.sth.org.hk/" target="_blank" class="hospital-link text-[10px] mb-1">聖德肋撒醫院 ↗</a>
                                <div class="text-xl font-bold text-red-500">HK$1,650</div>
                                <div class="text-[10px] text-gray-400 mt-1">⚠️ 僅手術室基本費</div>
                            </div>
                            <div class="hospital-box" data-hospital="matilda" data-price="34090">
                                <a href="https://www.matilda.org/" target="_blank" class="hospital-link text-[10px] mb-1">明德國際醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$34,090</div>
                                <div class="text-[10px] text-gray-400 mt-1">醫院套餐</div>
                            </div>
                            <div class="hospital-box" data-hospital="szufh" data-price="9999999">
                                <a href="https://www.szufh.hk/" target="_blank" class="hospital-link text-[10px] mb-1">深圳和睦家 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                            <div class="hospital-box" data-hospital="ghk" data-price="9999999">
                                <a href="https://gleneagles.hk/" target="_blank" class="hospital-link text-[10px] mb-1">港怡醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <a href="#" class="inline-flex items-center gap-2 text-[#2B579A] text-sm font-bold hover:text-[#1D4E89] hover:underline transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>
                            查看外科全面價格對比清單 (PDF版)
                        </a>
                    </div>
                </div>

                <div id="endo" class="section-header text-xl font-bold text-[#2B579A] mt-10 mb-2">內窺鏡中心</div>
                <p class="text-xs text-gray-500 mb-4 bg-blue-50/50 inline-block px-3 py-1 rounded">ℹ️ 智能比價：如選擇超過三家醫院，當前視圖僅展示價格最便宜的前三家信息。</p>
                <div class="comparison-card">
                    <div class="p-6">
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">結腸內窺鏡 (大腸鏡)</h3>
                        <div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="hospital-box" data-hospital="sth" data-price="2380">
                                <a href="https://www.sth.org.hk/" target="_blank" class="hospital-link text-[10px] mb-1">聖德肋撒醫院 ↗</a>
                                <div class="text-xl font-bold text-red-500">HK$2,380</div>
                                <div class="text-[10px] text-gray-400 mt-1">⚠️ 僅門診基本費</div>
                            </div>
                            <div class="hospital-box" data-hospital="szufh" data-price="8658">
                                <a href="https://www.szufh.hk/" target="_blank" class="hospital-link text-[10px] mb-1">深圳和睦家 ↗</a>
                                <div class="text-xl font-black text-[#1D4E89]">￥7,500</div>
                                <div class="text-[10px] text-gray-500 mt-1">約 HK$8,658 (全包)</div>
                            </div>
                            <div class="hospital-box" data-hospital="ghk" data-price="18950">
                                <a href="https://gleneagles.hk/" target="_blank" class="hospital-link text-[10px] mb-1">港怡醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$18,950</div>
                                <div class="text-[10px] text-gray-400 mt-1">全包套餐</div>
                            </div>
                            <div class="hospital-box" data-hospital="cuhk" data-price="9999999">
                                <a href="https://www.cuhkmc.hk/" target="_blank" class="hospital-link text-[10px] mb-1">中大醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <a href="#" class="inline-flex items-center gap-2 text-[#2B579A] text-sm font-bold hover:text-[#1D4E89] hover:underline transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>
                            查看內窺鏡全面價格對比清單 (PDF版)
                        </a>
                    </div>
                </div>

                <div id="gyn" class="section-header text-xl font-bold text-[#2B579A] mt-10 mb-2">婦產科中心</div>
                <p class="text-xs text-gray-500 mb-4 bg-blue-50/50 inline-block px-3 py-1 rounded">ℹ️ 智能比價：如選擇超過三家醫院，當前視圖僅展示價格最便宜的前三家信息。</p>
                <div class="comparison-card">
                    <div class="p-6">
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">自然分娩 (住院套餐)</h3>
                        <div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="hospital-box" data-hospital="union" data-price="23800">
                                <a href="https://www.union.org/" target="_blank" class="hospital-link text-[10px] mb-1">仁安醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$23,800</div>
                                <div class="text-[10px] text-gray-400 mt-1">標準房 (3日2夜)</div>
                            </div>
                            <div class="hospital-box" data-hospital="matilda" data-price="64800">
                                <a href="https://www.matilda.org/" target="_blank" class="hospital-link text-[10px] mb-1">明德國際醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-700">HK$64,800</div>
                                <div class="text-[10px] text-gray-400 mt-1">全包套餐 (2晚)</div>
                            </div>
                            <div class="hospital-box border-red-100" data-hospital="ha" data-price="74000">
                                <a href="https://www.ha.org.hk/" target="_blank" class="hospital-link text-[10px] text-red-600 mb-1">醫管局 (非符合資格人士) ↗</a>
                                <div class="text-xl font-bold text-red-600">HK$74,000</div>
                                <div class="text-[10px] text-gray-400 mt-1">已確認預約套餐</div>
                            </div>
                            <div class="hospital-box" data-hospital="szufh" data-price="9999999">
                                <a href="https://www.szufh.hk/" target="_blank" class="hospital-link text-[10px] mb-1">深圳和睦家 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <a href="#" class="inline-flex items-center gap-2 text-[#2B579A] text-sm font-bold hover:text-[#1D4E89] hover:underline transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>
                            查看婦產科全面價格對比清單 (PDF版)
                        </a>
                    </div>
                </div>

                <div id="imaging" class="section-header text-xl font-bold text-[#2B579A] mt-10 mb-2">電腦掃描 (CT) 及 磁力共振 (MRI) 平掃</div>
                <p class="text-xs text-gray-500 mb-4 bg-blue-50/50 inline-block px-3 py-1 rounded">ℹ️ 智能比價：如選擇超過三家醫院，當前視圖僅展示價格最便宜的前三家信息。</p>
                <div class="comparison-card">
                    <div class="p-6">
                        <h3 class="font-bold text-gray-800 mb-4 border-b pb-2">CT 腦部掃描 (門診)</h3>
                        <div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="hospital-box" data-hospital="szufh" data-price="1385">
                                <a href="https://www.szufh.hk/" target="_blank" class="hospital-link text-[10px] mb-1">深圳和睦家 ↗</a>
                                <div class="text-xl font-black text-[#1D4E89]">￥1,200</div>
                                <div class="text-[10px] text-gray-500 mt-1">約 HK$1,385 (起)</div>
                            </div>
                            <div class="hospital-box" data-hospital="sth" data-price="2100">
                                <a href="https://www.sth.org.hk/" target="_blank" class="hospital-link text-[10px] mb-1">聖德肋撒醫院 ↗</a>
                                <div class="text-xl font-bold text-red-500">HK$2,100</div>
                                <div class="text-[10px] text-gray-400 mt-1">基本費</div>
                            </div>
                            <div class="hospital-box" data-hospital="matilda" data-price="9999999">
                                <a href="https://www.matilda.org/" target="_blank" class="hospital-link text-[10px] mb-1">明德國際醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                            <div class="hospital-box" data-hospital="ghk" data-price="9999999">
                                <a href="https://gleneagles.hk/" target="_blank" class="hospital-link text-[10px] mb-1">港怡醫院 ↗</a>
                                <div class="text-xl font-bold text-gray-300">-</div><div class="text-[10px] text-gray-400 mt-1">未匹配到價格數據</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 border-t border-gray-100 p-4 text-center">
                        <a href="#" class="inline-flex items-center gap-2 text-[#2B579A] text-sm font-bold hover:text-[#1D4E89] hover:underline transition-colors">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm0 3h-10v1h10v-1z"/></svg>
                            查看影像檢查全面對比清單 (PDF版)
                        </a>
                    </div>
                </div>

                <div id="public" class="section-header text-xl font-bold text-red-600 mt-10 mb-4">醫管局 (公立醫院) 2026 最新收費</div>
                <div class="comparison-card p-6" data-hospital="ha">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 class="font-bold text-sm mb-3">符合資格人士 (香港居民)</h4>
                            <table class="data-table">
                                <tbody>
                                    <tr><td>急症室診症</td><td class="font-bold text-red-600">HK$400 <span class="text-[10px] font-normal text-gray-400">(原$180)</span></td></tr>
                                    <tr><td>急症病床住院 (每日)</td><td class="font-bold text-red-600">HK$300 <span class="text-[10px] font-normal text-gray-400">(免$75入院費)</span></td></tr>
                                    <tr><td>專科門診 (首次)</td><td class="font-bold text-red-600">HK$250</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h4 class="font-bold text-sm mb-3 text-gray-600">非符合資格人士 (非居民)</h4>
                            <table class="data-table">
                                <tbody>
                                    <tr><td>急症室</td><td class="font-bold">HK$2,100 / 次</td></tr>
                                    <tr><td>普通科住院</td><td class="font-bold">HK$7,400 / 日</td></tr>
                                    <tr><td>深切治療部 (ICU)</td><td class="font-bold text-red-800">HK$35,600 / 日</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="serious" class="section-header text-xl font-bold text-[#2B579A] mt-10 mb-4">全港常見嚴重疾病治癒總開支預估</div>
                <div class="comparison-card">
                    <div class="p-4 bg-gray-50 text-[10px] text-gray-500">📊 數據來源：10Life/Bowtie 市場理賠統計。包含醫生費、手術室、病房、化驗及耗材的<b>全套開支</b>。不受 Top 3 過濾器影響。</div>
                    <table class="data-table">
                        <thead><tr><th>疾病及治療方式</th><th>普通病房 (中位數)</th><th>半私家房</th><th>私家房</th></tr></thead>
                        <tbody>
                            <tr><td class="font-bold">乳癌 <span class="text-[10px] text-gray-400 block">切除、重建、化療及電療</span></td><td class="text-lg font-bold text-[#1D4E89]">HK$799,978</td><td>$949,037</td><td>$1,240,755</td></tr>
                            <tr><td class="font-bold">肺癌 <span class="text-[10px] text-gray-400 block">肺葉切除術</span></td><td class="text-lg font-bold text-[#1D4E89]">HK$275,158</td><td>$417,737</td><td>$691,695</td></tr>
                            <tr><td class="font-bold">心臟通波仔 <span class="text-[10px] text-gray-400 block">連支架</span></td><td class="text-lg font-bold text-[#1D4E89]">HK$217,813</td><td>$326,120</td><td>$541,133</td></tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
    </div>

    <script>
        function updateView() {
            const checkboxes = document.querySelectorAll('#filter-container input[type="checkbox"]');
            const activeHospitals = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

            // 1. 全局顯示/隱藏
            document.querySelectorAll('[data-hospital]').forEach(el => {
                const hosp = el.getAttribute('data-hospital');
                if (activeHospitals.includes(hosp)) {
                    el.classList.remove('user-hidden');
                } else {
                    el.classList.add('user-hidden');
                }
            });

            // 2. Top 3 邏輯處理 (僅對 compare-group 內的 box 生效)
            document.querySelectorAll('.compare-group').forEach(group => {
                const visibleBoxes = Array.from(group.querySelectorAll('.hospital-box:not(.user-hidden)'));
                const pricedBoxes = visibleBoxes.filter(box => box.hasAttribute('data-price'));

                // 根據數值大小排序 (9999999 沒有價格的將排在最後面)
                pricedBoxes.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));

                pricedBoxes.forEach((box, index) => {
                    const priceValue = parseFloat(box.getAttribute('data-price'));
                    
                    if (index < 3) {
                        box.classList.remove('price-hidden');
                        if (index === 0 && priceValue < 9999999) {
                            box.classList.add('best-value');
                        } else {
                            box.classList.remove('best-value');
                        }
                    } else {
                        // 排名第 4 及以後的隱藏
                        box.classList.add('price-hidden');
                        box.classList.remove('best-value');
                    }
                });
            });
        }

        window.addEventListener('DOMContentLoaded', updateView);
    </script>

</body>
</html>
