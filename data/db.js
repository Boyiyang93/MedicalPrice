/**
 * MedicalPrice V2.0 — 全局醫療數據底層
 * 14 家醫院 × 門診 / 病房 / 專科模組統一數據源
 *
 * Schema 約定：
 * - B 型門診: prices.regular / night / holiday + remarks
 * - C 型病房: prices.* (排序數字) + ranges.* (展示文字)
 * - D 型套餐: price + priceLabel + displayPrice + remarks + tags[]
 * - 9999999 = Coming Soon | 9999 = 門診時段不提供
 */
const globalMedicalData = {
  version: "2.0",
  lastUpdated: "2026-07",
  hospitalOrder: [
    "szufh",
    "cuhk",
    "hksh",
    "ghk",
    "matilda",
    "sth",
    "baptist",
    "union",
    "canossa",
    "sph",
    "pbh",
    "evangel",
    "twah",
    "hkah"
  ],
  hospitals: {
    szufh: {
      name: "深圳新風和睦家",
      link: "https://www.szufh.hk/",
      tag: "高透明度",
      waitTime: "<15分",
      score: "4.8",
      alert: false
    },
    cuhk: {
      name: "香港中文大學醫院",
      link: "https://www.cuhkmc.hk/",
      tag: "",
      waitTime: "15-30分",
      score: "4.5",
      alert: false
    },
    hksh: {
      name: "養和醫院 (HKSH)",
      link: "https://www.hksh-hospital.com/",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    ghk: {
      name: "港怡醫院 (GHK)",
      link: "https://gleneagles.hk/",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    matilda: {
      name: "明德國際醫院",
      link: "https://www.matilda.org/",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    sth: {
      name: "聖德肋撒醫院 (法國)",
      link: "http://www.sth.org.hk/",
      tag: "",
      waitTime: "40-80分",
      score: "4.1",
      alert: false
    },
    baptist: {
      name: "香港浸信會醫院",
      link: "https://www.hkbh.org.hk/",
      tag: "",
      waitTime: "45-90分",
      score: "4.0",
      alert: false
    },
    union: {
      name: "仁安醫院",
      link: "https://www.union.org/",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    canossa: {
      name: "嘉諾撒醫院",
      link: "#",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    sph: {
      name: "聖保祿醫院 (SPH)",
      link: "https://www.stpaul.org.hk/",
      tag: "⚠️ 漏洞條款",
      waitTime: "30-60分",
      score: "4.2",
      alert: true
    },
    pbh: {
      name: "寶血醫院 (PBH)",
      link: "https://www.pbh.hk/",
      tag: "",
      waitTime: "20-40分",
      score: "3.9",
      alert: false
    },
    evangel: {
      name: "播道醫院",
      link: "#",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    twah: {
      name: "荃灣港安醫院",
      link: "#",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    },
    hkah: {
      name: "香港港安–司徒拔道",
      link: "#",
      tag: "",
      waitTime: "",
      score: "",
      alert: false
    }
  },
  modules: {
    outpatient: {
      szufh: {
        prices: {
          regular: 635,
          night: 935,
          holiday: 935
        },
        remarks: "備註：夜診外加RMB300，法定假日外加RMB300（此處已作匯率折算換算）。"
      },
      cuhk: {
        prices: {
          regular: 600,
          night: 9999,
          holiday: 9999
        },
        remarks: "備註：常規普通門診基本起步診金為 $600。非辦公時間段安排多需致電預約。"
      },
      hksh: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      ghk: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      matilda: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      sth: {
        prices: {
          regular: 230,
          night: 340,
          holiday: 340
        },
        remarks: "備註：常規時間段按08:00-19:59計，夜間及公眾假期加收附加費。"
      },
      baptist: {
        prices: {
          regular: 400,
          night: 850,
          holiday: 850
        },
        remarks: "備註：夜診/假日區間為 $700-$1,000，取中間值。遇惡劣天氣收費同假日。"
      },
      union: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      canossa: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      sph: {
        prices: {
          regular: 280,
          night: 430,
          holiday: 410
        },
        remarks: "排雷：非當值專科醫生回院應診外加收 $1,000。"
      },
      pbh: {
        prices: {
          regular: 280,
          night: 390,
          holiday: 390
        },
        remarks: "備註：週六20:00起及假日計入附加費。"
      },
      evangel: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      twah: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      },
      hkah: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "數據核對中。"
      }
    },
    ward: {
      szufh: {
        prices: {
          standard: 1558,
          semiPrivate: 2170,
          private: 3565
        },
        ranges: {
          standard: "$1,558",
          semiPrivate: "$2,170",
          private: "$3,565 – $7,619"
        }
      },
      cuhk: {
        prices: {
          standard: 1000,
          semiPrivate: 1500,
          private: 3600
        },
        ranges: {
          standard: "$1,000",
          semiPrivate: "$1,500 – $2,500",
          private: "$3,600 – $4,800"
        }
      },
      hksh: {
        prices: {
          standard: 1300,
          semiPrivate: 2800,
          private: 4600
        },
        ranges: {
          standard: "$1,300 – $1,960",
          semiPrivate: "$2,800 – $3,950",
          private: "$4,600 – $23,000"
        }
      },
      ghk: {
        prices: {
          standard: 980,
          semiPrivate: 1800,
          private: 4200
        },
        ranges: {
          standard: "$980 – $1,080",
          semiPrivate: "$1,800 – $2,700",
          private: "$4,200 – $10,800"
        }
      },
      matilda: {
        prices: {
          standard: 900,
          semiPrivate: 1990,
          private: 3300
        },
        ranges: {
          standard: "$900 – $1,100",
          semiPrivate: "$1,990 – $2,300",
          private: "$3,300 – $4,500"
        }
      },
      sth: {
        prices: {
          standard: 610,
          semiPrivate: 1000,
          private: 2100
        },
        ranges: {
          standard: "$610 – $800",
          semiPrivate: "$1,000 – $1,750",
          private: "$2,100 – $15,300"
        }
      },
      baptist: {
        prices: {
          standard: 820,
          semiPrivate: 1810,
          private: 3500
        },
        ranges: {
          standard: "$820 – $1,240",
          semiPrivate: "$1,810 – $2,320",
          private: "$3,500 – $4,780"
        }
      },
      union: {
        prices: {
          standard: 600,
          semiPrivate: 1080,
          private: 2500
        },
        ranges: {
          standard: "$600 – $950",
          semiPrivate: "$1,080 – $2,000",
          private: "$2,500 – $8,000"
        }
      },
      canossa: {
        prices: {
          standard: 800,
          semiPrivate: 2600,
          private: 4200
        },
        ranges: {
          standard: "$800 – $1,100",
          semiPrivate: "$2,600",
          private: "$4,200"
        }
      },
      sph: {
        prices: {
          standard: 9999999,
          semiPrivate: 9999999,
          private: 9999999
        },
        ranges: {
          standard: "Coming Soon",
          semiPrivate: "Coming Soon",
          private: "Coming Soon"
        }
      },
      pbh: {
        prices: {
          standard: 9999999,
          semiPrivate: 9999999,
          private: 9999999
        },
        ranges: {
          standard: "Coming Soon",
          semiPrivate: "Coming Soon",
          private: "Coming Soon"
        }
      },
      evangel: {
        prices: {
          standard: 9999999,
          semiPrivate: 9999999,
          private: 9999999
        },
        ranges: {
          standard: "Coming Soon",
          semiPrivate: "Coming Soon",
          private: "Coming Soon"
        }
      },
      twah: {
        prices: {
          standard: 9999999,
          semiPrivate: 9999999,
          private: 9999999
        },
        ranges: {
          standard: "Coming Soon",
          semiPrivate: "Coming Soon",
          private: "Coming Soon"
        }
      },
      hkah: {
        prices: {
          standard: 9999999,
          semiPrivate: 9999999,
          private: 9999999
        },
        ranges: {
          standard: "Coming Soon",
          semiPrivate: "Coming Soon",
          private: "Coming Soon"
        }
      }
    },
    generalSurgery: {
      szufh: {
        price: 28500,
        priceLabel: "日間膽囊切除套餐 (￥25,000)",
        displayPrice: "HK$28,500",
        remarks: "✓ 跨境定額：含術前評估、麻醉及術後隨訪。"
      },
      cuhk: {
        price: 32000,
        priceLabel: "日間腹腔鏡膽囊切除定額",
        displayPrice: "HK$32,000",
        remarks: "✓ 智慧定額：透明打包，無隱性行政附加費。"
      },
      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      ghk: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      sth: {
        price: 18500,
        priceLabel: "日間普通房基準套餐",
        displayPrice: "HK$18,500 – $22,000",
        remarks: "⚠️ 雜費風險：病理化驗與耗材可能另計。"
      },
      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      union: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      sph: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      twah: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      },
      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術數據核對中。"
      }
    },
    imaging: {
      gastroscopy: {
        szufh: {
          price: 8580,
          priceLabel: "門診日間中心套餐價 (￥7,800)",
          displayPrice: "HK$8,580",
          remarks: "✓ 全包定額：含幽門螺桿菌測試與瘜肉切除費。",
          tags: [
            "跨境免找數",
            "含瘜肉切除"
          ]
        },
        cuhk: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        hksh: {
          price: 9200,
          priceLabel: "日間中心程序起步底價",
          displayPrice: "HK$9,200 – $10,800",
          remarks: "⚠️ 非全包：醫生費、巡房費與化驗費按件累加。",
          tags: [
            "頂尖專家"
          ]
        },
        ghk: {
          price: 7820,
          priceLabel: "日間定額醫療程序套餐",
          displayPrice: "HK$7,820",
          remarks: "✓ 定額保障：已包含基礎用藥與組織化驗雜費。",
          tags: [
            "100%全包",
            "港島旗艦"
          ]
        },
        matilda: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        sth: {
          price: 6100,
          priceLabel: "日間程序普通房常規區間",
          displayPrice: "HK$6,100 – $7,800",
          remarks: "⚠️ 雜費風險：人流量大，切除活檢費與耗材另計。",
          tags: [
            "九龍核心"
          ]
        },
        baptist: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        pbh: {
          price: 5800,
          priceLabel: "日間大房基準套餐價",
          displayPrice: "HK$5,800",
          remarks: "✓ 全港地板價：性價比極高，標準計劃基本全覆蓋。",
          tags: [
            "常規體檢首選"
          ]
        },
        evangel: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "定額胃鏡數據核對中。"
        }
      },
      colonoscopy: {
        szufh: {
          price: 11550,
          priceLabel: "日間全包套餐 (￥10,500)",
          displayPrice: "HK$11,550",
          remarks: "✓ 零預約輪候：已包含常規瘜肉切除與基本化驗費。",
          tags: [
            "瘜肉全包",
            "當天出報告"
          ]
        },
        cuhk: {
          price: 9800,
          priceLabel: "日間定額醫療套餐",
          displayPrice: "HK$9,800",
          remarks: "✓ 透明防震：智慧定額制度，絕不設任何隱性行政後加開支。",
          tags: [
            "數位定額",
            "絕無雜費"
          ]
        },
        hksh: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        ghk: {
          price: 10420,
          priceLabel: "日間定額全包區間",
          displayPrice: "HK$10,420 – $13,440",
          remarks: "✓ 結構清晰：已含基礎瘜肉切除與組織活檢化驗費。",
          tags: [
            "港島推薦"
          ]
        },
        matilda: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        baptist: {
          price: 11000,
          priceLabel: "日間常規程序基準",
          displayPrice: "HK$11,000 – $13,500",
          remarks: "⚠️ 瘜肉階梯：切除超出3粒後觸發階梯收費，輪候約2週。",
          tags: [
            "常規程序"
          ]
        },
        union: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        pbh: {
          price: 8200,
          priceLabel: "日間大房基準套餐價",
          displayPrice: "HK$8,200",
          remarks: "✓ 價格親民：香港本地極致性價比，適合基礎篩查。",
          tags: [
            "預算優選"
          ]
        },
        evangel: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "定額結腸鏡數據核對中。"
        }
      },
      dual_scope: {
        szufh: {
          price: 16280,
          priceLabel: "雙鏡聯查專線 (￥14,800)",
          displayPrice: "HK$16,280",
          remarks: "✓ 降維打擊：一劑清腸。雙鏡套餐價格比在香港分開做划算極多。",
          tags: [
            "一次麻醉",
            "節省近35%"
          ]
        },
        cuhk: {
          price: 15200,
          priceLabel: "日間定額雙鏡聯合套餐",
          displayPrice: "HK$15,200",
          remarks: "✓ 包含麻醉：已含靜脈鎮靜劑，香港本地定額防震標桿。",
          tags: [
            "中產首選"
          ]
        },
        hksh: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        ghk: {
          price: 16800,
          priceLabel: "日間全包雙鏡定額套餐",
          displayPrice: "HK$16,800",
          remarks: "✓ 醫療團隊強：港島全包雙鏡天花板，放射與內窺鏡安心度高。",
          tags: [
            "全包保障"
          ]
        },
        matilda: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        pbh: {
          price: 12500,
          priceLabel: "常規兩項程序大房加總底價",
          displayPrice: "HK$12,500",
          remarks: "ℹ️ 本地經濟解：香港本地最省錢的雙鏡聯合排查方案。",
          tags: [
            "極致低價"
          ]
        },
        evangel: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "雙鏡聯查數據核對中。"
        }
      },
      ct_brain: {
        szufh: {
          price: 3850,
          priceLabel: "無造影劑掃描 (￥3,500)",
          displayPrice: "HK$3,850",
          remarks: "✓ 高效流轉：當天可直接取走膠片與數位電子報告，零耽誤。",
          tags: [
            "極速出片",
            "高階排數機"
          ]
        },
        cuhk: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        hksh: {
          price: 4500,
          priceLabel: "常規專科高級影像收費",
          displayPrice: "HK$4,500",
          remarks: "⭐ 診斷權威：費用較高，但放射醫學專家團隊實力冠絕全港。",
          tags: [
            "名醫聯合診斷"
          ]
        },
        ghk: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        sph: {
          price: 2900,
          priceLabel: "常規腦部電腦斷層掃描",
          displayPrice: "HK$2,900",
          remarks: "⚠️ 顯影劑另計：注意若臨床需增強掃描，造影藥費需外加。",
          tags: [
            "地段方便"
          ]
        },
        pbh: {
          price: 2500,
          priceLabel: "無顯影劑平掃基準價",
          displayPrice: "HK$2,500",
          remarks: "✓ 全港私院最低：適合常規體檢或急性病因初步排查。",
          tags: [
            "影像窪地"
          ]
        },
        evangel: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "CT 腦部掃描數據核對中。"
        }
      },
      mri_brain: {
        szufh: {
          price: 7590,
          priceLabel: "無造影劑 MRI (￥6,900)",
          displayPrice: "HK$7,590",
          remarks: "✓ 無幽閉感：配備頂級高排磁力共振，內置娛樂影音緩解緊張。",
          tags: [
            "旗艦3T設備",
            "體驗舒適"
          ]
        },
        cuhk: {
          price: 6200,
          priceLabel: "腦部磁力共振套餐",
          displayPrice: "HK$6,200",
          remarks: "✓ 噪聲控制好：儀器非常先進，包含主診放射科醫生書面報告費。",
          tags: [
            "大孔徑大空間"
          ]
        },
        hksh: {
          price: 8800,
          priceLabel: "神經影像磁力共振底價",
          displayPrice: "HK$8,800",
          remarks: "⭐ 診斷標桿：針對腦神經血管、微小病變的臨床診斷實力極強。",
          tags: [
            "權威神經影像"
          ]
        },
        ghk: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        pbh: {
          price: 5100,
          priceLabel: "常規無造影劑 MRI 基準價",
          displayPrice: "HK$5,100",
          remarks: "✓ 門檻低：香港本地磁力共振最實惠方案，適合定期隨訪。",
          tags: [
            "複查首選"
          ]
        },
        evangel: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "MRI 腦部掃描數據核對中。"
        }
      }
    },
    gynecology: {
      normal_delivery: {
        szufh: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "自然分娩套餐數據核對中。"
        }
      },
      c_section: {
        szufh: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "剖腹產套餐數據核對中。"
        }
      }
    },
    orthopedics: {
      knee_replacement: {
        szufh: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "全膝關節置換術數據核對中。"
        }
      }
    },
    cardiology: {
      angiography: {
        szufh: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "心臟導管造影數據核對中。"
        }
      }
    },
    ophthalmology: {
      cataract: {
        szufh: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "白內障手術數據核對中。"
        }
      }
    },
    ent: {
      tonsillectomy: {
        szufh: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "扁桃腺切除術數據核對中。"
        }
      }
    },
    painManagement: {
      nerve_block: {
        szufh: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "神經阻滯治療數據核對中。"
        }
      }
    },
    plastics: {
      rhinoplasty: {
        szufh: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        hksh: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        ghk: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        matilda: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        sth: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        baptist: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        union: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        canossa: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        sph: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        pbh: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        evangel: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        twah: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        },
        hkah: {
          price: 9999999,
          remarks: "隆鼻手術數據核對中。"
        }
      }
    }
  },
  searchIndex: [
    {
      keywords: [
        "胃鏡",
        "gastroscopy",
        "OGD"
      ],
      page: "imaging.html",
      hash: "#gastroscopy",
      label: "胃鏡檢查"
    },
    {
      keywords: [
        "結腸鏡",
        "肠镜",
        "colonoscopy",
        "大腸鏡"
      ],
      page: "imaging.html",
      hash: "#colonoscopy",
      label: "結腸鏡檢查"
    },
    {
      keywords: [
        "雙鏡",
        "dual",
        "胃鏡+大腸鏡"
      ],
      page: "imaging.html",
      hash: "#dual_scope",
      label: "雙鏡聯查"
    },
    {
      keywords: [
        "CT",
        "電腦斷層",
        "ct brain"
      ],
      page: "imaging.html",
      hash: "#ct_brain",
      label: "CT 腦部掃描"
    },
    {
      keywords: [
        "MRI",
        "磁力共振",
        "mri brain"
      ],
      page: "imaging.html",
      hash: "#mri_brain",
      label: "MRI 腦部掃描"
    },
    {
      keywords: [
        "膽囊",
        "cholecystectomy",
        "腹腔鏡"
      ],
      page: "general-surgery.html",
      hash: "",
      label: "腹腔鏡膽囊切除術"
    },
    {
      keywords: [
        "門診",
        "診金",
        "outpatient"
      ],
      page: "outpatient.html",
      hash: "",
      label: "門診診金"
    },
    {
      keywords: [
        "病房",
        "ward",
        "住院"
      ],
      page: "ward.html",
      hash: "",
      label: "病房收費"
    },
    {
      keywords: [
        "分娩",
        "產科",
        "婦產"
      ],
      page: "gyn.html",
      hash: "#normal_delivery",
      label: "婦產科套餐"
    },
    {
      keywords: [
        "膝關節",
        "骨科",
        "orthopedics"
      ],
      page: "orthopedics.html",
      hash: "",
      label: "骨科手術"
    },
    {
      keywords: [
        "心臟",
        "通波仔",
        "cardiology"
      ],
      page: "cardiology.html",
      hash: "",
      label: "心臟科"
    },
    {
      keywords: [
        "白內障",
        "眼科",
        "ophthalmology"
      ],
      page: "ophthalmology.html",
      hash: "",
      label: "眼科手術"
    },
    {
      keywords: [
        "耳鼻喉",
        "ent"
      ],
      page: "ent.html",
      hash: "",
      label: "耳鼻喉科"
    }
  ]
};

/** 按全局順序返回醫院列表（含 id） */
function getOrderedHospitals() {
  return globalMedicalData.hospitalOrder.map(function (id) {
    return Object.assign({ id: id }, globalMedicalData.hospitals[id]);
  });
}

/** 取得指定模組的醫院數據陣列 */
function getModuleHospitalList(moduleName, procedureId) {
  var mod = globalMedicalData.modules[moduleName] || {};
  if (procedureId && mod[procedureId]) {
    mod = mod[procedureId];
  }
  return globalMedicalData.hospitalOrder
    .filter(function (id) { return mod[id]; })
    .map(function (id) {
      var meta = globalMedicalData.hospitals[id];
      var row = mod[id];
      return Object.assign({ id: id }, meta, row);
    });
}

/** 全局搜尋索引查詢 */
function searchMedicalIndex(query) {
  var q = String(query || '').toLowerCase().trim();
  if (!q) return [];
  return (globalMedicalData.searchIndex || []).filter(function (item) {
    return item.keywords.some(function (kw) { return q.indexOf(kw.toLowerCase()) !== -1 || kw.toLowerCase().indexOf(q) !== -1; });
  });
}
