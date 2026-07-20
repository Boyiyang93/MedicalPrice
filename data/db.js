/**
 * MedicalPrice V2.0 — 全局醫療數據底層
 * 14 家醫院 × 門診 / 病房 / 專科模組統一數據源
 *
 * Schema 約定：
 * - B 型門診: prices + remarks + displayPrices (可選) + timeSlots (可選)
 * - C 型病房: prices.* (排序數字) + ranges.* (展示文字)
 * - D 型套餐: price + priceLabel + displayPrice + remarks + tags[]
 * - 9999999 = Coming Soon | 9999 = 門診時段不提供
 */
const globalMedicalData = {
  version: "2.0",
  lastUpdated: "2026-07-19",
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
    // ownership: private=私立 | public=公立 | nonprofit=公益
    szufh: {
      name: "深圳新風和睦家",
      ownership: "private",
      link: "https://www.szufh.hk/",
      tag: "高透明度",
      alert: false
    },
    cuhk: {
      name: "香港中文大學醫院",
      ownership: "private",
      link: "https://www.cuhkmc.hk/",
      tag: "",
      alert: false
    },
    hksh: {
      name: "養和醫院 (HKSH)",
      ownership: "private",
      link: "https://www.hksh-hospital.com/",
      tag: "",
      alert: false
    },
    ghk: {
      name: "港怡醫院 (GHK)",
      ownership: "private",
      link: "https://gleneagles.hk/",
      tag: "",
      alert: false
    },
    matilda: {
      name: "明德國際醫院",
      ownership: "nonprofit",
      link: "https://www.matilda.org/",
      tag: "",
      alert: false
    },
    sth: {
      name: "聖德肋撒醫院 (法國)",
      ownership: "nonprofit",
      link: "http://www.sth.org.hk/",
      tag: "",
      alert: false
    },
    baptist: {
      name: "香港浸信會醫院",
      ownership: "nonprofit",
      link: "https://www.hkbh.org.hk/",
      tag: "",
      alert: false
    },
    union: {
      name: "仁安醫院",
      ownership: "private",
      link: "https://www.union.org/tc/charges-promotion/charges",
      tag: "",
      alert: false
    },
    canossa: {
      name: "嘉諾撒醫院",
      ownership: "nonprofit",
      link: "https://www.canossahospital.org.hk/",
      tag: "",
      alert: false
    },
    sph: {
      name: "聖保祿醫院 (SPH)",
      ownership: "nonprofit",
      link: "https://www.stpaul.org.hk/",
      tag: "",
      alert: false
    },
    pbh: {
      name: "寶血醫院 (PBH)",
      ownership: "nonprofit",
      link: "https://www.pbh.hk/",
      tag: "",
      alert: false
    },
    evangel: {
      name: "播道醫院",
      ownership: "nonprofit",
      link: "https://www.evangel.org.hk/",
      tag: "",
      alert: false
    },
    twah: {
      name: "荃灣港安醫院",
      ownership: "nonprofit",
      link: "https://www.twah.org.hk/",
      tag: "",
      alert: false
    },
    hkah: {
      name: "香港港安–司徒拔道",
      ownership: "nonprofit",
      link: "https://www.hkah.org.hk/",
      tag: "",
      alert: false
    }
  },
  modules: {
    outpatient: {
      szufh: {
        link: "https://www.szufh.hk/service-fees.html",
        prices: {
          regular: 813,
          night: 1375,
          holiday: 1375
        },
        displayPrices: {
          regular: "￥625 – ￥1,000",
          night: "￥1,250 – ￥1,500",
          holiday: "￥1,250 – ￥1,500"
        },
        timeSlots: {
          regular: "星期一至五 08:30-17:30；星期六至日 08:30-17:30",
          night: "星期一至星期日 17:30-08:30（24小時全天候急診）",
          holiday: "國家法定公眾假期"
        },
        remarks: "診金不包括小手術費、藥費及化驗費等。支持香港長者醫療券。"
      },
      cuhk: {
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/emergency-medicine-centre",
        prices: {
          regular: 400,
          night: 700,
          holiday: 700
        },
        displayPrices: {
          regular: "$400",
          night: "$600 – $800",
          holiday: "$600 – $800"
        },
        timeSlots: {
          regular: "星期一至五 8:00-17:59；星期六 8:00-12:59",
          night: "星期一至五 18:00-07:59；星期六 13:00-07:59",
          holiday: "星期日、公眾假期及惡劣天氣 8:00-21:59"
        },
        remarks: "診金不包括小手術費、藥費及化驗費等。"
      },
      hksh: {
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list",
        prices: {
          regular: 400,
          night: 800,
          holiday: 600
        },
        displayPrices: {
          regular: "$400",
          night: "$600 – $800",
          holiday: "$600"
        },
        timeSlots: {
          regular: "一至五 09:00-19:00；周六 09:00-13:00",
          night: "平日夜間及每日 00:00-08:00",
          holiday: "周日及公眾假期 08:00-00:00"
        },
        remarks: "Happy Valley 24小時普通科診金（價目表）。診金以取票時間為準。不含藥費及程序費。"
      },
      ghk: {
        prices: {
          regular: 420,
          night: 1050,
          holiday: 1050
        },
        displayPrices: {
          regular: "$420",
          night: "$600 – $1,500",
          holiday: "$600 – $1,500"
        },
        timeSlots: {
          regular: "星期一至五 09:00-19:59；星期六 09:00-12:59",
          night: "星期一至五 20:00-08:59；星期六 13:00-08:59",
          holiday: "星期日及公眾假期 00:00-23:59；農曆新年長假期"
        },
        remarks: "診金不包括小手術費、藥費及化驗費等。分流為「第一類危急」個案均收費$1,500（急救服務費用另計）。農曆新年長假期常規收費為$1,100。本院接受使用醫療券。"
      },
      matilda: {
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees",
        prices: {
          regular: 590,
          night: 900,
          holiday: 800
        },
        displayPrices: {
          regular: "$590",
          night: "$900 – $1,000",
          holiday: "$800"
        },
        timeSlots: {
          regular: "每日 08:00-20:00（周日及公眾假期除外）",
          night: "每日 20:00-08:00",
          holiday: "周日及公眾假期 08:00-20:00"
        },
        remarks: "24小時門診普通科診金（2026-02-01起）。不含藥費、化驗及程序費。"
      },
      sth: {
        link: "https://www.sth.org.hk/charge.asp?lang_code=zh",
        prices: {
          regular: 280,
          night: 430,
          holiday: 350
        },
        displayPrices: {
          regular: "$280",
          night: "$430",
          holiday: "$350 – $470"
        },
        timeSlots: {
          regular: "一至六 08:00-19:59",
          night: "一至六 20:00-07:59",
          holiday: "周日及公眾假期 08:00-19:59（夜間 $470）"
        },
        remarks: "門診部駐院醫生診金（FeeSchedule 2026-07-01起）。不含特別檢查/手術、藥費及物料。"
      },
      baptist: {
        link: "https://www.hkbh.org.hk/fees-charges/general-services-charges/",
        prices: {
          regular: 400,
          night: 900,
          holiday: 600
        },
        displayPrices: {
          regular: "$400",
          night: "$600 – $900",
          holiday: "$600 – $900"
        },
        timeSlots: {
          regular: "一至五 08:00-18:00；周六 08:00-13:00",
          night: "平日 18:00-08:00；周六 13:00-08:00",
          holiday: "周日及公眾假期全日"
        },
        remarks: "24小時門診醫院診金（2026-07-01起）。不含藥費、化驗及程序費。"
      },
      union: {
        link: "https://www.union.org/tc/charges-promotion/charges/emergency-medicine-centre",
        prices: {
          regular: 420,
          night: 900,
          holiday: 600
        },
        displayPrices: {
          regular: "$420 – $700",
          night: "$900 – $1,500",
          holiday: "$600 – $1,500"
        },
        timeSlots: {
          regular: "星期一至五 09:00-17:59（08:00-08:59 $700）",
          night: "18:00-21:59 $900；22:00-01:59 $1,100；02:00-07:59 $1,500",
          holiday: "星期日及公眾假期 09:00-17:59 $600；夜間同平日"
        },
        remarks: "急症門診中心診金（2026-02-01起）。年滿60歲長者有優惠價。不含藥費、化驗及程序費。"
      },
      canossa: {
        link: "https://www.canossahospital.org.hk/tc/service/24_hours_out_patient_services/fees_and_charges/",
        prices: {
          regular: 388,
          night: 800,
          holiday: 500
        },
        displayPrices: {
          regular: "$388",
          night: "$500 – $800",
          holiday: "$500 – $800"
        },
        timeSlots: {
          regular: "一至五 08:00-17:59；周六 08:00-12:59",
          night: "平日 18:00-07:59；周六 13:00-07:59",
          holiday: "周日及公眾假期 08:00-23:59（夜間 $800）"
        },
        remarks: "24小時門診普通科診金（官网价目）。不含藥費、化驗及特別治療。"
      },
      sph: {
        link: "https://www.stpaul.org.hk/tc/charges",
        prices: {
          regular: 280,
          night: 430,
          holiday: 350
        },
        displayPrices: {
          regular: "$280",
          night: "$430 – $470",
          holiday: "$350 – $470"
        },
        timeSlots: {
          regular: "一至六 08:00-20:00",
          night: "每日 20:00-08:00",
          holiday: "周日及公眾假期 08:00-20:00"
        },
        remarks: "24小時門診普通科診金（服務收費 2026-07-16通告）。非當值專科回院另計。"
      },
      pbh: {
        link: "https://www.pbh.hk/service-fee-adjustment/",
        prices: {
          regular: 280,
          night: 390,
          holiday: 390
        },
        displayPrices: {
          regular: "$280",
          night: "$390",
          holiday: "$390"
        },
        timeSlots: {
          regular: "一至六 08:00-19:59",
          night: "一至六 20:00-22:00",
          holiday: "周日、公眾假期、八號風球及黑色暴雨"
        },
        remarks: "門診部駐院醫生診金（2025-01-01起）。65歲以上減$20。不含藥費、化驗及程序費。"
      },
      evangel: {
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/",
        prices: {
          regular: 285,
          night: 9999,
          holiday: 395
        },
        displayPrices: {
          regular: "$285",
          night: "時段不設全科門診",
          holiday: "$395"
        },
        timeSlots: {
          regular: "一至六日間（約07:00-21:00）",
          night: "不設夜間門診",
          holiday: "周日、公眾假期及惡劣天氣"
        },
        remarks: "全科門診診金（2025-01-02起）。不設通宵急症。65歲以上診金及藥費九折。不含藥費及化驗。"
      },
      twah: {
        link: "https://www.twah.org.hk/tc/fees-and-charges",
        prices: {
          regular: 270,
          night: 950,
          holiday: 800
        },
        displayPrices: {
          regular: "$270 – $480",
          night: "$800 – $950",
          holiday: "$800"
        },
        timeSlots: {
          regular: "平日全科/急症日間",
          night: "急症 20:00-08:00",
          holiday: "周末及公眾假期急症"
        },
        remarks: "門診/急症診金（OPD PDF 2026-06）。急症夜間較高。不含藥費、化驗及程序費。"
      },
      hkah: {
        link: "https://www.hkah.org.hk/en/fees-and-charges/out-patient-consultation-fee/out-patient-consultation-fee-2",
        prices: {
          regular: 980,
          night: 1200,
          holiday: 1200
        },
        displayPrices: {
          regular: "$980",
          night: "$1,200",
          holiday: "$1,200"
        },
        timeSlots: {
          regular: "普通科門診辦公時間",
          night: "24小時急症服務",
          holiday: "急症服務全日"
        },
        remarks: "普通科初診$980／覆診$780；24小時急症診金$1,200（2025-10-17起）。特別診症另收設施費。"
      }
    },
    outpatientSpecialty: {
      cuhk: {
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/specialist-outpatient-clinic",
        prices: {
          regular: 370,
          night: 9999999,
          holiday: 9999999
        },
        displayPrices: {
          regular: "$370 – $4,000",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        timeSlots: {
          regular: "星期一至五 09:00-17:00/18:00；星期六 09:00-13:00（星期日及公眾假期部分中心休息）",
          night: "非辦公時間、星期日及公眾假期收費將有所調整",
          holiday: "非辦公時間、星期日及公眾假期收費將有所調整"
        },
        scopes: ["基礎專科", "眼科", "腫瘤科", "中西醫", "專職醫療"],
        remarks: "診金普遍不包括藥費、醫生費、小手術及化驗費。非辦公時間、星期日及公眾假期收費將有所調整。"
      },
      szufh: {
        link: "https://www.szufh.hk/service-fees.html",
        prices: {
          regular: 1000,
          night: 9999999,
          holiday: 9999999
        },
        displayPrices: {
          regular: "￥1,000 – ￥1,875",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        timeSlots: {
          regular: "星期一至五 08:30-17:30；星期六至日 08:30-17:30（各專科開診時間依排班為準）",
          night: "非辦公時間、星期日及公眾假期收費將有所調整",
          holiday: "非辦公時間、星期日及公眾假期收費將有所調整"
        },
        scopes: ["內科", "外科", "婦科", "兒科", "骨科", "眼科", "耳鼻喉", "中醫"],
        remarks: "專科診金因醫生級別（主治、副主任、主任、特聘專家）而異。部分指定專科套餐不適用於非常規時段。"
      },
      hksh: {
        prices: {
          regular: 1500,
          night: 9999999,
          holiday: 9999999
        },
        displayPrices: {
          regular: "$1,500 – $2,500",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        timeSlots: {
          regular: "參考普通門診時間，具體請諮詢醫院",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        scopes: ["心", "腦神經", "腸胃", "內分泌", "長者", "骨科", "婦產", "外科", "眼科", "牙科", "兒科", "過敏"],
        remarks: "覆診收費範圍$1,200–$2,000；延長覆診、複雜病症或緊急診症（如牙科急診$6,000）等另有加收。上述費用不包括藥費。"
      },
      ghk: {
        prices: {
          regular: 550,
          night: 9999999,
          holiday: 9999999
        },
        displayPrices: {
          regular: "$550 – $2,500",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        timeSlots: {
          regular: "參考普通門診時間，具體請諮詢醫院",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        scopes: ["普通科", "行為健康", "內科", "外科", "婦腫瘤", "神經", "骨科", "兒科", "整外"],
        remarks: "覆診收費範圍$600–$2,000，視乎所選醫生收費。診金為醫生診金，其他費用另計。"
      },
      union: {
        link: "https://www.union.org/tc/charges-promotion/charges/general-surgery",
        prices: {
          regular: 760,
          night: 9999999,
          holiday: 9999999
        },
        displayPrices: {
          regular: "$760 – $3,500",
          night: "詳情查看",
          holiday: "詳情查看"
        },
        timeSlots: {
          regular: "微創中心專科門診（具體專科時間請查詢）",
          night: "非辦公時間收費將有所調整",
          holiday: "非辦公時間收費將有所調整"
        },
        scopes: ["外科", "腸胃肝臟", "骨科", "耳鼻喉", "泌尿"],
        remarks: "專科門診登記及診症費 $760–$3,500。不含藥費、化驗及程序費。"
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
          standard: "￥1,558",
          semiPrivate: "￥2,170",
          private: "￥3,565 – ￥7,619"
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
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list",
        prices: {
          standard: 1400,
          semiPrivate: 3030,
          private: 4850
        },
        ranges: {
          standard: "$1,400 – $2,020",
          semiPrivate: "$3,030 – $4,030",
          private: "$4,850 – $6,950"
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
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees",
        prices: {
          standard: 1100,
          semiPrivate: 2300,
          private: 4500
        },
        ranges: {
          standard: "$1,100",
          semiPrivate: "$2,300",
          private: "$4,500 – $6,500"
        }
      },
      sth: {
        link: "https://www.sth.org.hk/download/RoomCharges.pdf",
        prices: {
          standard: 610,
          semiPrivate: 1000,
          private: 2100
        },
        ranges: {
          standard: "$610 – $800",
          semiPrivate: "$1,000 – $1,750",
          private: "$2,100 – $4,100"
        }
      },
      baptist: {
        link: "https://www.hkbh.org.hk/fees-charges/room-types-rates/",
        prices: {
          standard: 850,
          semiPrivate: 1900,
          private: 3880
        },
        ranges: {
          standard: "$850 – $1,200",
          semiPrivate: "$1,900 – $2,800",
          private: "$3,880 – $4,880"
        }
      },
      union: {
        link: "https://www.union.org/tc/charges-promotion/charges/room-charges",
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
        link: "https://canossahospital.org.hk/tc/fee/accommodation_charges/",
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
        link: "https://www.stpaul.org.hk/tc/charges/room-charge",
        prices: {
          standard: 760,
          semiPrivate: 1380,
          private: 3800
        },
        ranges: {
          standard: "$760 – $900",
          semiPrivate: "$1,380 – $1,480",
          private: "$3,800 – $4,880"
        }
      },
      pbh: {
        link: "https://www.pbh.hk/service-fee-adjustment/",
        prices: {
          standard: 850,
          semiPrivate: 1280,
          private: 2350
        },
        ranges: {
          standard: "$850",
          semiPrivate: "$1,280 – $1,850",
          private: "$2,350"
        }
      },
      evangel: {
        link: "https://www.evangel.org.hk/images/charges/list_inpatient.pdf",
        prices: {
          standard: 830,
          semiPrivate: 1280,
          private: 2350
        },
        ranges: {
          standard: "$830 – $1,020",
          semiPrivate: "$1,280 – $1,920",
          private: "$2,350"
        }
      },
      twah: {
        link: "https://www.twah.org.hk/tc/fees-and-charges",
        prices: {
          standard: 1000,
          semiPrivate: 1250,
          private: 3500
        },
        ranges: {
          standard: "$1,000",
          semiPrivate: "$1,250 – $2,200",
          private: "$3,500"
        }
      },
      hkah: {
        link: "https://www.hkah.org.hk/tc/fees-and-charges",
        prices: {
          standard: 900,
          semiPrivate: 2300,
          private: 3900
        },
        ranges: {
          standard: "$900",
          semiPrivate: "$2,300 – $2,800",
          private: "$3,900 – $9,000"
        }
      }
    },
    generalSurgery: {
      cholecystectomy: {
      szufh: {
        price: 61875,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "￥55,000 – ￥68,750",
        remarks: "✓ 手術形式（常規腹腔鏡／開放式）與風險等級；標準住院天數為 2 晚。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 110387,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$95,688 – $125,086",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 116362,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$116,362",
        remarks: "⚠️ 2025年先導計劃歷史賬目中位數（普通房）。總收費=醫生費+醫院費。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-charges/historical-bill-sizes-statistics"
      },

      ghk: {
        price: 121060,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$99,900 – $142,220",
        remarks: "⚠️ 手術路徑(常規腹腔鏡/單孔腹腔鏡/開放式)、能量設備(超聲刀/雙極刀)與手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 169295,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$157,309 – $181,281",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/"
      },

      sth: {
        price: 92680,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$92,680 – $115,725",
        remarks: "⚠️ 2025年歷史統計（標準房）。總收費=醫生費+醫院費。平均住院約2.2日。",
        link: "https://www.sth.org.hk/download/zh/ccssp.pdf"
      },

      baptist: {
        price: 97093,
        priceLabel: "腹腔內視鏡膽囊切除術",
        displayPrice: "HK$97,093 – $187,508",
        remarks: "⚠️ 2025年歷史統計（標準房）。總收費=醫生費+醫院費。平均住院約2.8日。",
        link: "https://www.hkbh.org.hk/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals/"
      },

      union: {
        price: 110660,
        priceLabel: "腹腔鏡內膽囊切除術",
        displayPrice: "HK$74,300 – $232,740",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.2日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 122704,
        priceLabel: "膽囊切除術（腹腔鏡）",
        displayPrice: "HK$122,704 – $210,661",
        remarks: "⚠️ 2025年常見程序參考費用（普通病房）。總收費=醫生費+醫院費。",
        link: "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/"
      },

      sph: {
        price: 91039,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$91,039",
        remarks: "⚠️ 2025年歷史賬目（標準房）。總收費=醫生費+醫院費。平均住院約2.0日。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 102843,
        priceLabel: "膽囊切除術",
        displayPrice: "HK$102,843 – $124,200",
        remarks: "⚠️ 2025年常見手術參考（標準房）。總收費統計；實際視病情及醫生收費而定。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 37347,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$37,347",
        remarks: "⚠️ 2025年歷史統計（普通房）五十分位總收費。另有日間/套餐價目請查官网。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 50325,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$50,325",
        remarks: "⚠️ 2025年常見手術統計（標準房）。總收費含醫生費及醫院費。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 121520,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$91,000 – $152,040",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      breast_lump: {
      szufh: {
        price: 35875,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "￥28,000 – ￥43,750",
        remarks: "✓ 單側／雙側腫塊切除與風險等級。",
        link: "https://www.szufh.hk/breast-surgery-fees.html"
      },

      cuhk: {
        price: 73976,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$52,175 – $95,776",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 96693,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$96,693",
        remarks: "⚠️ 2025年先導計劃歷史賬目中位數（普通房）。總收費=醫生費+醫院費。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-charges/historical-bill-sizes-statistics"
      },

      ghk: {
        price: 73500,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$48,200 – $98,800",
        remarks: "⚠️ 腫塊數目(單一／兩個／三至五個)與日間／住院2日及手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 68262,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$46,967 – $89,556",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/"
      },

      sth: {
        price: 69825,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$59,930 – $79,720",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.sth.org.hk/charge.asp?lang_code=zh"
      },

      baptist: {
        price: 90634,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$64,955 – $116,314",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 64130,
        priceLabel: "超聲波導引乳房腫塊切除術",
        displayPrice: "HK$35,480 – $157,600",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.2日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 104181,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$62,349 – $146,013",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.canossahospital.org.hk/tc/fee/"
      },

      sph: {
        price: 76746,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$76,746",
        remarks: "⚠️ 2025年歷史賬目（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.0日。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 37242,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$37,242",
        remarks: "⚠️ 2025年常見手術參考（標準房）五十分位總收費。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 64058,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$51,954 – $76,162",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 89381,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$64,350 – $114,412",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 93026,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$79,395 – $106,658",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      circumcision: {
      szufh: {
        price: 11875,
        priceLabel: "包皮環切術",
        displayPrice: "￥5,000 – ￥18,750",
        remarks: "✓ 術式、年齡與麻醉及風險等級。",
        link: "https://www.szufh.hk/urology-surgery-fees.html"
      },

      cuhk: {
        price: 40016,
        priceLabel: "包皮環切術",
        displayPrice: "HK$29,674 – $50,357",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 51242,
        priceLabel: "包皮環切術",
        displayPrice: "HK$42,814 – $59,669",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/"
      },

      ghk: {
        price: 35900,
        priceLabel: "包皮環切術",
        displayPrice: "HK$28,250 – $43,550",
        remarks: "⚠️ 年齡(出生28天或以下／一般)、日間或住院2日與手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 34090,
        priceLabel: "包皮環切術（全面護理套餐）",
        displayPrice: "HK$34,090 – $57,230",
        remarks: "✓ 明德全面護理套餐（含醫生費，標準/雙人/私家房）。",
        link: "https://www.matilda.org/fees-and-packages/general-survery/circumcision-package?hsLang=zh-hk"
      },

      sth: {
        price: 31748,
        priceLabel: "包皮環切術",
        displayPrice: "HK$30,823 – $32,672",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.sth.org.hk/charge.asp?lang_code=zh"
      },

      baptist: {
        price: 31358,
        priceLabel: "包皮環切術",
        displayPrice: "HK$27,624 – $35,092",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 13000,
        priceLabel: "包皮環切術",
        displayPrice: "HK$13,000",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.union.org/tc/charges-promotion/charges"
      },

      canossa: {
        price: 48060,
        priceLabel: "包皮環切術",
        displayPrice: "HK$48,060",
        remarks: "⚠️ 2025年常見程序參考費用（普通病房）五十分位總收費。總收費=醫生費+醫院費。",
        link: "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/"
      },

      sph: {
        price: 32229,
        priceLabel: "包皮環切術",
        displayPrice: "HK$27,507 – $36,951",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 26241,
        priceLabel: "包皮環切術",
        displayPrice: "HK$25,114 – $27,368",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 23524,
        priceLabel: "包皮環切術",
        displayPrice: "HK$21,240 – $25,807",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 45089,
        priceLabel: "包皮環切術",
        displayPrice: "HK$41,798 – $48,380",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 45612,
        priceLabel: "包皮環切術",
        displayPrice: "HK$41,056 – $50,167",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      thyroid_fna: {
      szufh: {
        price: 4275,
        priceLabel: "超聲波導引甲狀腺細針穿刺",
        displayPrice: "￥3,800 – ￥4,750",
        remarks: "✓ 超聲引導下甲狀腺穿刺活檢；日間操作；一般／中等風險。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 17245,
        priceLabel: "超聲波導引甲狀腺細針穿刺",
        displayPrice: "HK$14,960 – $19,530",
        remarks: "✓ 麻醉級別与住院形式。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      hemithyroidectomy: {
      szufh: {
        price: 67500,
        priceLabel: "甲狀腺次全切術",
        displayPrice: "￥60,000 – ￥75,000",
        remarks: "✓ 甲狀腺次全切術；標準住院天數為 3 晚；一般／中等風險。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 136280,
        priceLabel: "偏側甲狀腺切除術",
        displayPrice: "HK$85,960 – $186,600",
        remarks: "✓ 是否使用能量設備及住院級別。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 145038,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$145,038",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 110215,
        priceLabel: "半邊甲狀腺切除術",
        displayPrice: "HK$89,000 – $131,430",
        remarks: "⚠️ 是否併用神經監測與手術風險等級；標準住院約3日。均使用能量設備。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 35600,
        priceLabel: "半甲狀腺切除術套餐（標準房）",
        displayPrice: "HK$35,600 – $51,800",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 醫院套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 99275,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$99,275",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 103580,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$103,580",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 119448,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$119,448",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年標準房歷史五十分位總收費。",
        link: "https://www.canossahospital.org.hk/"
      },

      sph: {
        price: 101840,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$101,840",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 99954,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$99,954",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 76643,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$76,643",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      twah: {
        price: 80386,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$80,386",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 97084,
        priceLabel: "半甲狀腺切除（歷史中位）",
        displayPrice: "HK$97,084",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      thyroidectomy: {
      szufh: {
        price: 78750,
        priceLabel: "甲狀腺全切術",
        displayPrice: "￥70,000 – ￥87,500",
        remarks: "✓ 甲狀腺全切術；標準住院天數為 3 晚；一般／中等風險。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 171580,
        priceLabel: "甲狀腺/副甲狀腺切除術",
        displayPrice: "HK$94,360 – $248,800",
        remarks: "✓ 切除范围（局部/次全/全/副甲状腺）、是否使用能量設備及住院級別。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 221472,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$221,472",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 150810,
        priceLabel: "全邊甲狀腺切除術",
        displayPrice: "HK$124,300 – $177,320",
        remarks: "⚠️ 是否併用神經監測與手術風險等級；標準住院約4日。均使用能量設備。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 45800,
        priceLabel: "全甲狀腺切除術套餐（標準房）",
        displayPrice: "HK$45,800 – $65,900",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 醫院套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 145440,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$145,440",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 151312,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$151,312",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 165481,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$165,481",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年標準房歷史五十分位總收費。",
        link: "https://www.canossahospital.org.hk/"
      },

      sph: {
        price: 156009,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$156,009",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 117933,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$117,933",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 136121,
        priceLabel: "全甲狀腺切除（歷史中位）",
        displayPrice: "HK$136,121",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      hernia_abdominal: {
      szufh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      cuhk: {
        price: 113950,
        priceLabel: "腹腔疝氣修補術",
        displayPrice: "HK$51,000 – $176,900",
        remarks: "✓ 手術形式（開放式/腹腔鏡）、住院形式及住院級別。均包括使用人工網膜補片及全身麻醉。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 71524,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$71,524",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 61797,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$61,797",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 50283,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$50,283",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 55103,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$55,103",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 58144,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$58,144",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 54167,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$54,167",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 42778,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$42,778",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 46175,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$46,175",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      twah: {
        price: 44379,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$44,379",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 66800,
        priceLabel: "開放式疝氣手術（歷史中位）",
        displayPrice: "HK$66,800",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      hernia_unilateral: {
      szufh: {
        price: 40875,
        priceLabel: "單側腹股溝疝氣修補術",
        displayPrice: "￥33,000 – ￥48,750",
        remarks: "✓ 是否含補片與風險等級；標準住院天數為 2 晚。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 64700,
        priceLabel: "單側腹股溝疝氣修補術",
        displayPrice: "HK$40,800 – $88,600",
        remarks: "✓ 手術形式（開放式/腹腔鏡）、麻醉与形式（全身/局部/鎮靜麻醉）、是否使用人工網膜補片。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 118083,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$102,575 – $133,591",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/"
      },

      ghk: {
        price: 72425,
        priceLabel: "單側腹股溝疝氣修補術",
        displayPrice: "HK$42,800 – $102,050",
        remarks: "⚠️ 手術路徑(開放式／腹腔鏡)、患者年齡(成人／兒童)與手術風險等級；單邊。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 81980,
        priceLabel: "腹股溝疝氣切除術（腹腔鏡單邊）",
        displayPrice: "HK$81,980 – $141,670",
        remarks: "✓ 明德全面護理套餐（含醫生費；不含人工網膜）。標準/雙人/私家房。",
        link: "https://www.matilda.org/fees-and-packages/general-survery/inguinal-hernia-repair-package?hsLang=zh-hk"
      },

      sth: {
        price: 91463,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$80,987 – $101,939",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.sth.org.hk/charge.asp?lang_code=zh"
      },

      baptist: {
        price: 98178,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$78,214 – $118,141",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 82490,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$72,510 – $92,470",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.union.org/tc/charges-promotion/charges"
      },

      canossa: {
        price: 118319,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$118,319",
        remarks: "⚠️ 2025年常見程序參考費用（普通病房）腹腔鏡疝修補五十分位總收費。",
        link: "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/"
      },

      sph: {
        price: 81323,
        priceLabel: "腹腔鏡腹股溝疝修補術",
        displayPrice: "HK$81,323",
        remarks: "⚠️ 2025年歷史賬目（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.0日。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 55272,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$55,272",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 92132,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$71,734 – $112,531",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 65454,
        priceLabel: "腹腔鏡腹股溝疝修補術（單側）",
        displayPrice: "HK$65,454",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 119217,
        priceLabel: "腹腔鏡疝氣修補（歷史中位）",
        displayPrice: "HK$119,217",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      hernia_bilateral: {
      szufh: {
        price: 60375,
        priceLabel: "雙側腹股溝疝氣修補術",
        displayPrice: "￥47,000 – ￥73,750",
        remarks: "✓ 是否含補片與風險等級；標準住院天數為 2 晚。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 131405,
        priceLabel: "雙側腹股溝疝氣修補術",
        displayPrice: "HK$62,010 – $200,800",
        remarks: "✓ 手術形式（開放式/腹腔鏡）及是否使用人工網膜補片。均在全身麻醉下住院進行。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 113815,
        priceLabel: "雙側腹股溝疝氣修補術",
        displayPrice: "HK$92,300 – $135,330",
        remarks: "⚠️ 腹腔鏡雙邊修補、患者年齡(成人／兒童)與手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      appendectomy: {
      szufh: {
        price: 61150,
        priceLabel: "闌尾切除術",
        displayPrice: "￥49,800 – ￥72,500",
        remarks: "✓ 手術形式（常規腹腔鏡／開放式）與風險等級；標準住院天數為 1 晚。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 130645,
        priceLabel: "闌尾切除術",
        displayPrice: "HK$91,290 – $170,000",
        remarks: "✓ 慢阑尾炎病症复杂程度（非複雜性/複雜性）。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 129749,
        priceLabel: "腹腔鏡闌尾切除（歷史中位）",
        displayPrice: "HK$129,749",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 普通房歷史五十分位總收費。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges"
      },

      ghk: {
        price: 116445,
        priceLabel: "闌尾切除術",
        displayPrice: "HK$93,400 – $139,490",
        remarks: "⚠️ 手術路徑(開放/腹腔鏡)、病症複雜程度(簡單/複雜)與手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      hemorrhoid: {
      szufh: {
        price: 12900,
        priceLabel: "痔瘡專項處置",
        displayPrice: "￥5,800 – ￥20,000",
        remarks: "✓ 術式（傳統切除／RBL／庫克套扎／硬化劑）與風險等級。",
        link: "https://www.szufh.hk/colorectal-and-anal-surgery-fees.html"
      },

      cuhk: {
        price: 61747,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$58,962 – $64,532",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.cuhkmc.hk/"
      },

      hksh: {
        price: 66988,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$56,723 – $77,252",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/"
      },

      ghk: {
        price: 57750,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$42,700 – $72,800",
        remarks: "⚠️ 手術方式(傳統/環狀切除/使用Ligasure)與手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 44000,
        priceLabel: "痔瘡切除術（傳統・全面護理套餐）",
        displayPrice: "HK$44,000 – $75,850",
        remarks: "✓ 明德全面護理套餐（含醫生費，標準/雙人/私家房）。痔瘡槍套餐另計。",
        link: "https://www.matilda.org/fees-and-packages/general-survery/haemorrhoidectomy-package?hsLang=zh-hk"
      },

      sth: {
        price: 42417,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$42,417",
        remarks: "⚠️ 2025年歷史統計（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.5日。",
        link: "https://www.sth.org.hk/download/zh/ccssp.pdf"
      },

      baptist: {
        price: 50163,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$50,163 – $53,372",
        remarks: "⚠️ 2025年歷史統計（標準房）。總收費=醫生費+醫院費。日間手術五十分位約 HK$36,206。",
        link: "https://www.hkbh.org.hk/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals/"
      },

      union: {
        price: 46540,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$30,910 – $83,420",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.2日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 61892,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$61,892",
        remarks: "⚠️ 2025年常見程序參考費用（普通病房）五十分位總收費。總收費=醫生費+醫院費。",
        link: "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/"
      },

      sph: {
        price: 49935,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$49,935",
        remarks: "⚠️ 2025年歷史賬目（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.0日。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 38932,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$33,058 – $44,807",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 37000,
        priceLabel: "痔瘡切除術（普通房套餐）",
        displayPrice: "HK$37,000 – $55,000",
        remarks: "✓ 播道套餐（普通房，傳統約$37,000／痔瘡槍約$55,000，約2日1夜）。歷史統計五十分位另有偏高紀錄，以套餐口徑為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 70732,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$70,732",
        remarks: "⚠️ 2025年常見手術統計（標準房）五十分位總收費。總收費含醫生費及醫院費。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 69823,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$48,335 – $91,311",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      thyroid_surgery: {
      szufh: {
        price: 45650,
        priceLabel: "甲狀腺處置手術",
        displayPrice: "￥3,800 – ￥87,500",
        remarks: "✓ 術式（穿刺活檢／次全切除／全切除）與風險等級；日間至 3 晚。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 133160,
        priceLabel: "甲狀腺處置手術",
        displayPrice: "HK$89,000 – $177,320",
        remarks: "⚠️ 半邊／全邊切除、是否併用神經監測與手術風險等級。均使用能量設備。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      port_a_cath: {
      szufh: {
        price: 23650,
        priceLabel: "輸液港手術",
        displayPrice: "￥9,800 – ￥37,500",
        remarks: "✓ 處置形式（置入／取出）與麻醉及風險等級；日間手術。",
        link: "https://www.szufh.hk/general-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      breast_biopsy: {
      szufh: {
        price: 15400,
        priceLabel: "乳腺抽針及旋切活檢",
        displayPrice: "￥2,800 – ￥28,000",
        remarks: "✓ 術式（幼針／粗針／真空輔助）及麻醉；日間操作。不含加項。",
        link: "https://www.szufh.hk/breast-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 33235,
        priceLabel: "開放式乳房活組織切片檢查",
        displayPrice: "HK$28,900 – $37,570",
        remarks: "⚠️ 日間治療；普通／中等風險。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      },
      breast_surgery: {
      szufh: {
        price: 64000,
        priceLabel: "乳腺外科手術",
        displayPrice: "￥28,000 – ￥100,000",
        remarks: "✓ 術式（腫塊切除／部分切除+前哨／乳腺癌根治）與風險等級。",
        link: "https://www.szufh.hk/breast-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 132520,
        priceLabel: "乳房腫瘤／全乳切除術",
        displayPrice: "HK$69,000 – $196,040",
        remarks: "⚠️ 術式(部分／全乳／根治)、單雙邊、是否附加冷凍切片／前哨結活檢／腋下淋巴廓清，與手術風險等級。",
        link: "https://gleneagles.hk/tc/fee-charges/general-surgery"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      union: {
        price: 126660,
        priceLabel: "乳房切除術",
        displayPrice: "HK$107,930 – $147,540",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約4.3日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      }
      }
    },
    imaging: {
      gastroscopy: {
      szufh: {
        price: 6050,
        priceLabel: "無痛胃鏡健康檢查 (監察麻醉)",
        displayPrice: "￥4,800 – ￥7,300",
        remarks: "✓ 套餐形式（標準日間／PRO精英版／PRO休養版）。不含超出套餐外的病理活檢及息肉切除。",
        link: "https://www.szufh.hk/gi-endoscopy-fees.html",
        tags: ["跨境免找數"]
      },

      cuhk: {
        price: 14990,
        priceLabel: "日間胃鏡 (鎮靜麻醉)",
        displayPrice: "HK$10,550 – $19,430",
        remarks: "✓ 检查复杂程度及活組織切片樽数（0-3樽）。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/endoscopy-package-fees"
      },

      hksh: {
        price: 10000,
        priceLabel: "日間中心程序起步底價",
        displayPrice: "HK$9,200 – $10,800",
        remarks: "⚠️ 非全包：醫生費、巡房費與化驗費按件累加。",
        tags: ["頂尖專家"]
      },

      ghk: {
        price: 7820,
        priceLabel: "日間定額醫療程序套餐",
        displayPrice: "HK$7,820",
        remarks: "✓ 定額保障：已包含基礎用藥與組織化驗雜費。",
        link: "https://gleneagles.hk/tc/patient-care-services/endoscopy",
        tags: ["100%全包", "港島旗艦"]
      },

      matilda: {
        price: 9300,
        priceLabel: "胃鏡檢查 - 睡眠監察麻醉",
        displayPrice: "HK$9,300 – $13,700",
        remarks: "✓ 醫院套餐（不含醫生費，2026价目）。標準/雙人/私家房。全面護理套餐另計。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 19870,
        priceLabel: "胃窺鏡 +/- 瘜肉切除術",
        displayPrice: "HK$19,870 – $29,054",
        remarks: "⚠️ 2025年歷史統計日間手術五十分位總收費（標準房基準）。",
        link: "https://www.sth.org.hk/download/zh/ccssp.pdf"
      },

      baptist: {
        price: 18921,
        priceLabel: "日間胃鏡 ± 瘜肉切除（歷史中位）",
        displayPrice: "HK$18,921",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2024–2025 日間手術五十分位總收費（醫生+醫院）。套餐參考另見 Bowtie：AMC 約 HK$7,600 – $9,400。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 10480,
        priceLabel: "日間淨胃鏡（鎮靜麻醉）",
        displayPrice: "HK$10,480 – $12,800",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 門診／普通房套餐；監測麻醉約 HK$12,800。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E5%98%89%E8%AB%BE%E6%92%92%E9%86%AB%E9%99%A2-%E8%83%83%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      sph: {
        price: 14000,
        priceLabel: "日間胃鏡總收費中位（連醫生費）",
        displayPrice: "HK$14,000 – $15,000",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 日間門診總收費中位數；醫院基本設施費另見官價約 HK$2,300。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E8%81%96%E4%BF%9D%E7%A5%BF%E9%86%AB%E9%99%A2-%E8%83%83%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      pbh: {
        price: 8075,
        priceLabel: "胃鏡檢查",
        displayPrice: "HK$8,075 – $24,711",
        remarks: "⚠️ 2025年歷史統計五十分位總收費（標準房）。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 3100,
        priceLabel: "門診胃鏡（醫院收費）",
        displayPrice: "HK$3,100 – $13,000",
        remarks: "✓ 門診醫院收費約 $3,100；日間全面護理套餐約 $13,000（含醫生及麻醉）。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 11588,
        priceLabel: "日間手術中心胃內窺鏡套餐",
        displayPrice: "HK$11,588 – $15,100",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 日間套餐起價；瘜肉／化驗另計。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E8%8D%83%E7%81%A3%E6%B8%AF%E5%AE%89%E9%86%AB%E9%99%A2-%E8%83%83%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      hkah: {
        price: 53878,
        priceLabel: "胃鏡 ± 瘜肉（歷史中位）",
        displayPrice: "HK$53,878",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      colonoscopy: {
      szufh: {
        price: 6750,
        priceLabel: "無痛腸鏡健康檢查 (監察麻醉)",
        displayPrice: "￥5,500 – ￥8,000",
        remarks: "✓ 套餐形式（標準日間／PRO精英版／PRO休養版）。不含超出套餐外的病理活檢及息肉切除。",
        link: "https://www.szufh.hk/gi-endoscopy-fees.html",
        tags: ["瘜肉全包", "當天出報告"]
      },

      cuhk: {
        price: 16980,
        priceLabel: "日間結腸鏡 (鎮靜麻醉)",
        displayPrice: "HK$13,250 – $20,710",
        remarks: "✓ 检查复杂程度及活組織切片樽数（0-3樽）。包括所有醫院收費及所有醫生費用。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/endoscopy-package-fees"
      },

      hksh: {
        price: 32109,
        priceLabel: "大腸鏡 ± 瘜肉（歷史中位）",
        displayPrice: "HK$32,109",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 11930,
        priceLabel: "日間定額全包區間",
        displayPrice: "HK$10,420 – $13,440",
        remarks: "✓ 結構清晰：已含基礎瘜肉切除與組織活檢化驗費。",
        link: "https://gleneagles.hk/tc/patient-care-services/endoscopy",
        tags: ["港島推薦"]
      },

      matilda: {
        price: 19880,
        priceLabel: "結腸鏡檢查（睡眠監察麻醉）",
        displayPrice: "HK$19,880 – $29,420",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 18973,
        priceLabel: "日間腸鏡（歷史中位總收費）",
        displayPrice: "HK$18,973",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計日間總收費五十分位（標準房）。Bowtie 日間套餐另列約 HK$10,070 起。",
        link: "https://www.sth.org.hk/"
      },

      baptist: {
        price: 12250,
        priceLabel: "日間常規程序基準",
        displayPrice: "HK$11,000 – $13,500",
        remarks: "⚠️ 瘜肉階梯：切除超出3粒後觸發階梯收費，輪候約2週。",
        tags: ["常規程序"]
      },

      union: {
        price: 21490,
        priceLabel: "日間腸鏡總收費中位",
        displayPrice: "HK$21,490 – $24,800",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 日間手術中心第50/90百分位總收費；設施費另約 HK$4,600（不含醫生費）。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E4%BB%81%E5%AE%89%E9%86%AB%E9%99%A2-%E8%85%B8%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      canossa: {
        price: 12610,
        priceLabel: "日間大腸鏡（鎮靜麻醉・不連瘜肉）",
        displayPrice: "HK$12,610 – $15,520",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 定額日間套餐；監測麻醉約 HK$15,520。連≤3粒瘜肉另計。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E5%98%89%E8%AB%BE%E6%92%92%E9%86%AB%E9%99%A2-%E8%85%B8%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      sph: {
        price: 20449,
        priceLabel: "日間大腸鏡總收費中位",
        displayPrice: "HK$20,449",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 日間手術總費用中位數；門診／標準房基本設施費約 HK$5,688（不含醫生費）。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E8%81%96%E4%BF%9D%E7%A5%BF%E9%86%AB%E9%99%A2-%E8%85%B8%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      pbh: {
        price: 8200,
        priceLabel: "日間大房基準套餐價",
        displayPrice: "HK$8,200",
        remarks: "✓ 價格相宜：香港本地高性價比，適合基礎篩查。",
        tags: ["預算優選"]
      },

      evangel: {
        price: 15500,
        priceLabel: "日間全面護理套餐（大腸鏡）",
        displayPrice: "HK$15,500",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 日間全面護理套餐（含醫生及麻醉）；門診醫院收費約 HK$4,100。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 46678,
        priceLabel: "日間大腸鏡（歷史中位總收費）",
        displayPrice: "HK$46,678",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計日間總收費五十分位。Bowtie 日間套餐另列約 HK$12,940 – $15,850。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 31838,
        priceLabel: "大腸鏡檢查（含／不含瘜肉）參考區間",
        displayPrice: "HK$31,838 – $41,702",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 預估區間（含或不含瘜肉）；實際以醫院書面估價為準。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E9%A6%99%E6%B8%AF%E6%B8%AF%E5%AE%89%E9%86%AB%E9%99%A2-%E8%85%B8%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      }
      },
      dual_scope: {
      szufh: {
        price: 8750,
        priceLabel: "無痛胃腸鏡健康檢查 (雙鏡聯合)",
        displayPrice: "￥7,500 – ￥10,000",
        remarks: "✓ 套餐形式（標準日間／PRO精英版／PRO休養版）。專為雙鏡聯合設計。",
        link: "https://www.szufh.hk/gi-endoscopy-fees.html",
        tags: ["一次麻醉", "節省近35%"]
      },

      cuhk: {
        price: 32203,
        priceLabel: "日間胃鏡及大腸鏡聯查",
        displayPrice: "HK$28,056 – $36,350",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/endoscopy-package-fees"
      },

      hksh: {
        price: 53422,
        priceLabel: "胃鏡+大腸鏡（歷史中位）",
        displayPrice: "HK$53,422",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 16800,
        priceLabel: "日間全包雙鏡定額套餐",
        displayPrice: "HK$16,800",
        remarks: "✓ 醫療團隊強：港島全包雙鏡天花板，放射與內窺鏡安心度高。",
        link: "https://gleneagles.hk/tc/patient-care-services/endoscopy",
        tags: ["全包保障"]
      },

      matilda: {
        price: 30900,
        priceLabel: "結腸鏡及胃鏡（睡眠監察麻醉）",
        displayPrice: "HK$30,900 – $44,600",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 36194,
        priceLabel: "日間胃腸鏡聯查（歷史中位）",
        displayPrice: "HK$36,194",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計日間雙鏡總收費五十分位。Bowtie 套餐另列約 HK$18,160 起。",
        link: "https://www.sth.org.hk/"
      },

      baptist: {
        price: 39766,
        priceLabel: "日間胃鏡＋腸鏡（歷史中位）",
        displayPrice: "HK$39,766",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 日間手術五十分位總收費。Bowtie AMC 組合套餐另列約 HK$16,700 – $20,000。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 17990,
        priceLabel: "日間淨胃鏡＋大腸鏡（鎮靜）",
        displayPrice: "HK$17,990",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 門診／普通房鎮靜麻醉合併套餐。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E5%98%89%E8%AB%BE%E6%92%92%E9%86%AB%E9%99%A2-%E8%83%83%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      sph: {
        price: 35000,
        priceLabel: "日間腸胃鏡同照總收費中位",
        displayPrice: "HK$35,000",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 日間門診總收費中位數約 HK$35,000。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E8%81%96%E4%BF%9D%E7%A5%BF%E9%86%AB%E9%99%A2-%E8%83%83%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      },

      pbh: {
        price: 12500,
        priceLabel: "常規兩項程序大房加總底價",
        displayPrice: "HK$12,500",
        remarks: "ℹ️ 本地經濟之選：香港本地最省錢的雙鏡聯合排查方案。",
        tags: ["參考低價"]
      },

      evangel: {
        price: 26500,
        priceLabel: "日間全面護理套餐（胃＋腸）",
        displayPrice: "HK$26,500",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 日間全面護理合併套餐；門診醫院收費約 HK$6,100。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 57452,
        priceLabel: "日間胃＋腸鏡（歷史中位總收費）",
        displayPrice: "HK$57,452",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計日間雙鏡總收費五十分位。Bowtie 組合約 HK$26,130 起。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 48907,
        priceLabel: "胃鏡＋大腸鏡合併套餐參考",
        displayPrice: "HK$48,907 – $56,918",
        remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 合併套餐預估區間。",
        link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E9%A6%99%E6%B8%AF%E6%B8%AF%E5%AE%89%E9%86%AB%E9%99%A2-%E8%85%B8%E9%8F%A1-%E6%94%B6%E8%B2%BB/"
      }
      },
      bronchoscopy: {
      szufh: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      cuhk: {
        price: 47031,
        priceLabel: "支氣管鏡檢查 (日間)",
        displayPrice: "HK$40,796 – $53,266",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/endoscopy-package-fees"
      },

      hksh: {
        price: 64725,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$64,725",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 131045,
        priceLabel: "支氣管內視鏡檢查",
        displayPrice: "HK$39,400 – $222,690",
        remarks: "⚠️ 麻醉方式(監測/全身)、是否附加超音波、活檢結節數量(1至≥3個)以及手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/endoscopy"
      },

      matilda: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sth: {
        price: 37318,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$37,318",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 60606,
        priceLabel: "支氣管鏡（歷史中位總收費）",
        displayPrice: "HK$60,606",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年常見手術參考收費五十分位總收費。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 55269,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$55,269",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年標準房歷史五十分位總收費。",
        link: "https://www.canossahospital.org.hk/"
      },

      sph: {
        price: 50627,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$50,627",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      evangel: {
        price: 93324,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$93,324",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 92019,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$92,019",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 95945,
        priceLabel: "支氣管鏡 ± 活檢（歷史中位）",
        displayPrice: "HK$95,945",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
    ct_brain: {
        szufh: {
          price: 3500,
          priceLabel: "無造影劑掃描",
          displayPrice: "￥3,500",
          remarks: "✓ 高效流轉：當天可直接取走膠片與數位電子報告，零耽誤。",
          tags: [
            "極速出片",
            "高階排數機"
          ]
        },
        cuhk: {
          price: 2380,
          priceLabel: "CT 腦部平掃（門診）",
          displayPrice: "HK$2,380 – $4,490",
          remarks: "⚠️ 參考公開收費整理（Bowtie／醫療資訊站）。區間僅供參考，實際以醫院書面報價為準。 平掃約 HK$2,380；加顯影約 HK$4,490。",
          link: "https://www.cuhkmc.hk/"
        },
        hksh: {
          price: 3690,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$3,690 – $6,630",
          remarks: "✓ 價目表（門診/普通房級，2026-08）。 加顯影約 $6,630。",
          link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list"
        },
        ghk: {
          price: 2200,
          priceLabel: "CT 腦部平掃（門診／普通房）",
          displayPrice: "HK$2,200 – $2,970",
          remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 加顯影約 HK$3,690 – $5,220。",
          link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E6%B8%AF%E6%80%A1%E9%86%AB%E9%99%A2-ct-%E9%9B%BB%E8%85%A6%E6%8E%83%E6%8F%8F-%E6%94%B6%E8%B2%BB/"
        },
        matilda: {
          price: 2800,
          priceLabel: "CT 腦部平掃（標準房）",
          displayPrice: "$2,800 – $5,900",
          remarks: "✓ 醫院收費表（2026-02-01）。標準房/基本收費。 加顯影約 $5,900。",
          link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees"
        },
        sth: {
          price: 2100,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$2,100 – $3,900",
          remarks: "✓ 掃描部基本收費（標準房/門診，2024-07-01／FeeSchedule 2026-07-01）。 加顯影約 $3,900。",
          link: "https://www.sthscan.com/hk/charges/"
        },
        baptist: {
          price: 2380,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$2,380 – $4,450",
          remarks: "✓ 放射診斷收費（標準房/門診，2026-01-01）。 加顯影約 $4,450。",
          link: "https://www.hkbh.org.hk/fees-charges/general-services-charges/"
        },
        union: {
          price: 3450,
          priceLabel: "CT 腦部掃描",
          displayPrice: "HK$2,400 – $4,500",
          remarks: "✓ 掃描 $2,400；掃描+顯影劑 $4,500。醫療造影部價目（2026-06-10起）。",
          link: "https://www.union.org/tc/charges-promotion/charges/diagnostic-tests-medical-imaging"
        },
        canossa: {
          price: 2950,
          priceLabel: "CT 腦部掃描（門診參考）",
          displayPrice: "HK$2,950 – $5,460",
          remarks: "⚠️ 參考公開收費整理（Bowtie／醫療資訊站）。區間僅供參考，實際以醫院書面報價為準。 視病房級別及是否加顯影而定。",
          link: "https://www.canossahospital.org.hk/"
        },
        sph: {
          price: 2400,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$2,400 – $4,300",
          remarks: "✓ 放射部收費（標準房/門診）。 加顯影約 $4,300。",
          link: "https://www.stpaul.org.hk/tc/charges"
        },
        pbh: {
          price: 2275,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$2,275 – $3,950",
          remarks: "✓ 影像診斷服務收費（2025-06-10）。 加顯影約 $3,950。",
          link: "https://www.pbh.hk/service-fee-adjustment/"
        },
        evangel: {
          price: 2300,
          priceLabel: "CT 腦部平掃（普通房）",
          displayPrice: "$2,300 – $4,000",
          remarks: "✓ 掃描服務收費（2026-03-02）。門診平掃約 $2,000。 加顯影約 $4,000。",
          link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
        },
        twah: {
          price: 2900,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$2,900 – $3,900",
          remarks: "✓ 放射診斷收費（標準房，2026-06）。 加顯影約 $3,900。",
          link: "https://www.twah.org.hk/tc/fees-and-charges"
        },
        hkah: {
          price: 3450,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$3,450 – $6,220",
          remarks: "✓ 影像收費（標準房，2026-01-01）。門診平掃約 $2,833。 加顯影約 $6,220。",
          link: "https://www.hkah.org.hk/tc/fees-and-charges"
        }
      },
    mri_brain: {
        szufh: {
          price: 6900,
          priceLabel: "無造影劑 MRI",
          displayPrice: "￥6,900",
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
          price: 9990,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$9,990 – $15,970",
          remarks: "✓ 價目表（門診/普通房級，2026-08）。 加顯影約 $15,970。",
          link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list"
        },
        ghk: {
          price: 8460,
          priceLabel: "MRI 腦部平掃（門診／標準房）",
          displayPrice: "HK$8,460 – $13,590",
          remarks: "⚠️ 參考 Bowtie 匯總（稱取自醫院官網／統計）。區間僅供參考，實際以醫院書面估價為準。 平掃 HK$8,460；加顯影約 HK$13,590。",
          link: "https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%E6%B8%AF%E6%80%A1%E9%86%AB%E9%99%A2-mri-%E7%A3%81%E5%8A%9B%E5%85%B1%E6%8C%AF-%E6%94%B6%E8%B2%BB/"
        },
        matilda: {
          price: 6930,
          priceLabel: "MRI 腦部平掃（標準房）",
          displayPrice: "$6,930 – $10,260",
          remarks: "✓ 醫院收費表（2026-02-01）。 加顯影約 $10,260。",
          link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees"
        },
        sth: {
          price: 6260,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$6,260 – $10,100",
          remarks: "✓ 掃描部基本收費（標準房/門診）。 加顯影約 $10,100。",
          link: "https://www.sthscan.com/hk/charges/"
        },
        baptist: {
          price: 6740,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$6,740 – $10,200",
          remarks: "✓ 放射診斷收費（標準房/門診）。 加顯影約 $10,200。",
          link: "https://www.hkbh.org.hk/fees-charges/general-services-charges/"
        },
        union: {
          price: 8600,
          priceLabel: "MRI 腦部掃描",
          displayPrice: "HK$6,600 – $10,600",
          remarks: "✓ 腦部掃描 $6,600；掃描+顯影劑 $10,600。腦部及腦動脈另計 $10,000–$14,000。",
          link: "https://www.union.org/tc/charges-promotion/charges/diagnostic-tests-medical-imaging"
        },
        canossa: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        sph: {
          price: 6430,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$6,430 – $9,940",
          remarks: "✓ 放射部收費（標準房/門診）。 加顯影約 $9,940。",
          link: "https://www.stpaul.org.hk/tc/charges"
        },
        pbh: {
          price: 5730,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$5,730 – $9,245",
          remarks: "✓ 影像診斷服務收費（2025-06-10）。 加顯影約 $9,245。",
          link: "https://www.pbh.hk/service-fee-adjustment/"
        },
        evangel: {
          price: 6200,
          priceLabel: "MRI 腦部平掃（普通房）",
          displayPrice: "$6,200 – $10,000",
          remarks: "✓ 磁力共振收費（2026-03-02）。門診平掃約 $5,500。 加顯影約 $10,000。",
          link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
        },
        twah: {
          price: 6900,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$6,900 – $10,700",
          remarks: "✓ 放射診斷收費（標準房）。 加顯影約 $10,700。",
          link: "https://www.twah.org.hk/tc/fees-and-charges"
        },
        hkah: {
          price: 9320,
          priceLabel: "MRI 腦部平掃",
          displayPrice: "$9,320 – $14,560",
          remarks: "✓ 影像收費（標準房，2026-01-01）。門診平掃約 $7,644。 加顯影約 $14,560。",
          link: "https://www.hkah.org.hk/tc/fees-and-charges"
        }
      }
    },
    gynecology: {
      normal_delivery: {
      szufh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      cuhk: {
        price: 33550,
        priceLabel: "自然分娩套餐 (二人房/一人房)",
        displayPrice: "HK$23,200 – $43,900",
        remarks: "⚠️ 套式收費不包括醫生費用。3日2夜 HK$23,200–40,300；4日3夜 HK$26,000–43,900。",
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/maternity"
      },

      hksh: {
        price: 30450,
        priceLabel: "自然分娩套餐 (二人房/一人房)",
        displayPrice: "HK$22,300 – $38,600",
        remarks: "⚠️ 套式收費不包括醫生費用。",
        link: "https://www.hksh-hospital.com/tc_chi/services/service_obstetrics_and_gynaecology.aspx"
      },

      ghk: {
        price: 23900,
        priceLabel: "自然分娩套餐（標準房 3日2夜）",
        displayPrice: "HK$23,900 – $53,300",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 標準房$23,900。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      },

      matilda: {
        price: 64800,
        priceLabel: "自然分娩套餐（兩晚・含產鉗／真空）",
        displayPrice: "HK$64,800 – $100,800",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房$64,800（另有較低醫院套餐約$23,800 起，不含專科醫生費）。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 78809,
        priceLabel: "陰道分娩（歷史中位總收費）",
        displayPrice: "HK$78,809",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計五十分位總收費。",
        link: "https://www.sth.org.hk/"
      },

      baptist: {
        price: 89451,
        priceLabel: "自然分娩（歷史中位總收費）",
        displayPrice: "HK$89,451",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2024–2025 住院五十分位總收費（醫生+醫院）。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 22500,
        priceLabel: "自然分娩計劃（標準房 4日3夜）",
        displayPrice: "HK$22,500 – $38,000",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 標準房$22,500。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      },

      canossa: {
        price: 21600,
        priceLabel: "自然分娩套餐（普通房 3日2夜）",
        displayPrice: "HK$21,600 – $64,900",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 6人房$21,600。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      },

      sph: {
        price: 22000,
        priceLabel: "自然分娩套餐（標準房 3日2夜）",
        displayPrice: "HK$22,000 – $40,800",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房$22,000／雙人$28,000／私家$40,800；通常不含醫生費。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 102944,
        priceLabel: "自然分娩（歷史中位總收費）",
        displayPrice: "HK$102,944",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 22800,
        priceLabel: "自然分娩計劃（2人房 3日2夜）",
        displayPrice: "HK$22,800 – $43,500",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 醫院產科計劃；通常不含醫生費。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 22000,
        priceLabel: "自然分娩套餐（普通房 3日2夜）",
        displayPrice: "HK$22,000 – $41,800",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 3人房$22,000。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      }
      },
      c_section: {
      szufh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      cuhk: {
        price: 45400,
        priceLabel: "剖腹分娩套餐 (二人房/一人房)",
        displayPrice: "HK$31,000 – $59,800",
        remarks: "⚠️ 套式收費不包括醫生費用。選擇性 HK$31,000–49,800；緊急 HK$39,500–59,800。含 5日4夜住院。",
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/maternity"
      },

      hksh: {
        price: 48000,
        priceLabel: "剖腹分娩套餐 (二人房/一人房)",
        displayPrice: "HK$28,800 – $67,200",
        remarks: "⚠️ 套式收費不包括醫生費用。選擇性 HK$28,800–55,200；緊急 HK$35,800–67,200。",
        link: "https://www.hksh-hospital.com/tc_chi/services/service_obstetrics_and_gynaecology.aspx"
      },

      ghk: {
        price: 33300,
        priceLabel: "剖腹分娩套餐（標準房 5日4夜）",
        displayPrice: "HK$33,300 – $73,800",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 標準房$33,300。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      },

      matilda: {
        price: 108600,
        priceLabel: "剖腹分娩套餐（4晚）",
        displayPrice: "HK$108,600 – $162,000",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房$108,600（另有較低醫院套餐約$34,300 起）。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 82086,
        priceLabel: "剖腹分娩（歷史中位總收費）",
        displayPrice: "HK$82,086",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計五十分位總收費。",
        link: "https://www.sth.org.hk/"
      },

      baptist: {
        price: 99927,
        priceLabel: "剖腹分娩（歷史中位總收費）",
        displayPrice: "HK$99,927",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2024–2025 住院五十分位總收費（醫生+醫院）。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 26000,
        priceLabel: "剖腹分娩計劃（標準房 5日4夜）",
        displayPrice: "HK$26,000 – $44,800",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 標準房$26,000。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      },

      canossa: {
        price: 29800,
        priceLabel: "剖腹分娩套餐（普通房 5日4夜）",
        displayPrice: "HK$29,800 – $110,700",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 6人房$29,800。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      },

      sph: {
        price: 93962,
        priceLabel: "剖腹取嬰術（歷史中位總收費）",
        displayPrice: "HK$93,962",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計五十分位總收費。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 26900,
        priceLabel: "剖腹分娩（歷史中位總收費）",
        displayPrice: "HK$26,900",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費（醫生+醫院）。個案結構可能偏醫院費偏低，請以書面估價為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 130111,
        priceLabel: "剖腹分娩（歷史中位總收費）",
        displayPrice: "HK$130,111",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計五十分位總收費。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 31300,
        priceLabel: "剖腹分娩套餐（普通房 5日4夜）",
        displayPrice: "HK$31,300 – $61,500",
        remarks: "⚠️ 參考 2026 公開分娩套餐整理（通常不含婦產／麻醉／兒科醫生費）。實際以醫院書面報價為準。 3人房約$31,300。",
        link: "https://www.shemom.com/motherhood/%E7%A7%81%E9%99%A2%E5%88%86%E5%A8%A9-%E7%A7%81%E5%AE%B6%E9%86%AB%E9%99%A2-%E7%94%9Fb-%E5%88%86%E5%A8%A9-%E6%98%9F%E5%AA%BD-%E5%AD%AB%E6%85%A7%E9%9B%AA/"
      }
      },
      cervical_treatment: {
      szufh: {
        price: 20500,
        priceLabel: "子宮頸病變治療手術",
        displayPrice: "￥6,000 – ￥35,000",
        remarks: "✓ 術式（錐切／LEEP／環紮／射頻）及麻醉。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      ghk: {
        price: 29970,
        priceLabel: "陰道窺鏡檢查",
        displayPrice: "HK$16,000 – $43,940",
        remarks: "⚠️ 麻醉方式(局麻/監測/全身)、是否附加活組織或電環切除(Letz)，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      }
      },
      hysteroscopy: {
      szufh: {
        price: 22500,
        priceLabel: "子宮鏡診治手術",
        displayPrice: "￥20,000 – ￥25,000",
        remarks: "✓ 一般／中等風險。含活檢、息肉、縱隔、黏連及異物取出。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      ghk: {
        price: 59920,
        priceLabel: "子宮鏡診治手術",
        displayPrice: "HK$39,500 – $80,340",
        remarks: "⚠️ 診斷性或手術性、麻醉方式、是否使用Hysteroscopic Shaver設備，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 38050,
        priceLabel: "子宮腔鏡（診斷）+ 擴刮套餐",
        displayPrice: "HK$38,050 – $51,800",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      union: {
        price: 39370,
        priceLabel: "宮腔鏡檢查 + 刮宮術",
        displayPrice: "HK$19,670 – $78,450",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約1.5日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 30900,
        priceLabel: "宮腔鏡 + 刮宮（C級套餐）",
        displayPrice: "HK$30,900",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 日間／住院套餐。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      }
      },
      myomectomy: {
      szufh: {
        price: 51500,
        priceLabel: "子宮肌瘤切除術",
        displayPrice: "￥28,000 – ￥75,000",
        remarks: "✓ 路徑（子宮鏡／腹腔鏡／開放式）與風險等級。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      ghk: {
        price: 155650,
        priceLabel: "子宮肌瘤切除術",
        displayPrice: "HK$115,000 – $196,300",
        remarks: "⚠️ 手術路徑(開放式/腹腔鏡)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 106050,
        priceLabel: "子宮肌瘤切除術（傳統）套餐",
        displayPrice: "HK$106,050 – $166,300",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      union: {
        price: 121810,
        priceLabel: "肌瘤切除術",
        displayPrice: "HK$91,990 – $185,050",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約4.9日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      }
      },
      hysterectomy: {
      szufh: {
        price: 81250,
        priceLabel: "子宮切除術",
        displayPrice: "￥65,000 – ￥97,500",
        remarks: "✓ 術式（腹腔鏡／LAVH／開放式）與風險等級。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 184049,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$184,049",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hksh: {
        price: 199832,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$199,832",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 158500,
        priceLabel: "子宮切除術",
        displayPrice: "HK$102,500 – $214,500",
        remarks: "⚠️ 手術路徑(經陰道/開放式/腹腔鏡輔助)及是否連帶雙側輸卵管及卵巢切除，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 126680,
        priceLabel: "子宮切除術（經腹腔）套餐",
        displayPrice: "HK$126,680 – $200,990",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 124861,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$124,861",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 148499,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$148,499",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 162930,
        priceLabel: "腹腔鏡輔助子宮切除術",
        displayPrice: "HK$100,420 – $397,250",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約4.6日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 207471,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$207,471",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 183634,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$183,634",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 41064,
        priceLabel: "腹腔鏡子宮切除（歷史中位）",
        displayPrice: "HK$41,064",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 169196,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$169,196",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 187506,
        priceLabel: "子宮切除術（歷史中位）",
        displayPrice: "HK$187,506",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      tubal_ectopic: {
      szufh: {
        price: 33650,
        priceLabel: "輸卵管及宮外孕手術",
        displayPrice: "￥4,800 – ￥62,500",
        remarks: "✓ 項目（造影／結紮／取胚／宮外孕切除）與風險等級。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      ghk: {
        price: 85075,
        priceLabel: "輸卵管及宮外孕手術",
        displayPrice: "HK$40,800 – $129,350",
        remarks: "⚠️ 手術類別(迷你腹腔結紮/腹腔鏡宮外孕切除/診斷性腹腔鏡)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      }
      },
      ovarian_cyst: {
      szufh: {
        price: 59375,
        priceLabel: "卵巢囊腫切除術",
        displayPrice: "￥50,000 – ￥68,750",
        remarks: "✓ 範圍（腹腔鏡單側／雙側／開放式）與風險等級。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 112730,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$112,730",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hksh: {
        price: 130609,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$130,609",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 145300,
        priceLabel: "卵巢囊腫切除術",
        displayPrice: "HK$93,000 – $197,600",
        remarks: "⚠️ 手術路徑、單雙側切除、是否使用Ligasure/Enseal能量設備，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 90100,
        priceLabel: "卵巢囊腫切除（傳統）套餐",
        displayPrice: "HK$90,100 – $145,670",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 93988,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$93,988",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 103376,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$103,376",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 103550,
        priceLabel: "腹腔鏡卵巢囊腫切除術",
        displayPrice: "HK$69,740 – $159,300",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.3日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 98057,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$98,057",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 118024,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$118,024",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 103115,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$103,115",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 122439,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$122,439",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 133843,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$133,843",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 143201,
        priceLabel: "腹腔鏡卵巢囊腫切除（歷史中位）",
        displayPrice: "HK$143,201",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      contraception: {
      szufh: {
        price: 10000,
        priceLabel: "避孕及終止妊娠",
        displayPrice: "￥2,000 – ￥18,000",
        remarks: "✓ 子宮環／皮下避孕劑／終止妊娠擴刮術；日間操作。",
        link: "https://www.szufh.hk/gynecology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 52353,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$52,353",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 33570,
        priceLabel: "避孕及終止妊娠",
        displayPrice: "HK$25,800 – $41,340",
        remarks: "⚠️ 處置項目(常規擴刮/終止妊娠/產後流產後擴刮)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology"
      },

      matilda: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      sth: {
        price: 30200,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$30,200",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 30602,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$30,602",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 29650,
        priceLabel: "刮宮術",
        displayPrice: "HK$16,240 – $44,200",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約1.4日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 40184,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$40,184",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 31583,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$31,583",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 37857,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$37,857",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 41064,
        priceLabel: "刮宮術（歷史中位）",
        displayPrice: "HK$41,064",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      twah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      }
      }
    },
    orthopedics: {
      knee_replacement: {
      szufh: {
        price: 88500,
        priceLabel: "單側全膝關節置換術",
        displayPrice: "￥42,000 – ￥135,000",
        remarks: "✓ 植入物選項及機械臂輔助 CORI；一般／中等風險。",
        link: "https://www.szufh.hk/orthopedic-surgery-fees.html"
      },

      cuhk: {
        price: 338950,
        priceLabel: "全人工膝關節置換術",
        displayPrice: "HK$156,900 – $521,000",
        remarks: "✓ 单侧或双侧置换、使用的品牌植入物（S&N/ZIMMER/STRYKER）及住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      union: {
        price: 173980,
        priceLabel: "全膝關節置換術",
        displayPrice: "HK$129,180 – $282,320",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約5.6日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      shoulder_arthroscopy: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 181585,
        priceLabel: "肩關節鏡手術",
        displayPrice: "HK$109,370 – $253,800",
        remarks: "✓ 手術形式（盂唇韌帶/肩袖修復）与住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      shoulder_replacement: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 297750,
        priceLabel: "全肩關節置換術",
        displayPrice: "HK$198,500 – $397,000",
        remarks: "✓ 住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      orif_upper_limb: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 207750,
        priceLabel: "ORIF (鎖骨/橈骨遠端)",
        displayPrice: "HK$138,500 – $277,000",
        remarks: "✓ 骨折具体部位（锁骨/桡骨远端）与住院級別.包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 201626,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$166,314 – $236,938",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/"
      },

      ghk: {
        price: 127050,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$104,133 – $149,966",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://gleneagles.hk/tc/fee-charges/"
      },

      matilda: {
        price: 209560,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$173,262 – $245,859",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/"
      },

      sth: {
        price: 110426,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$94,685 – $126,168",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.sth.org.hk/charge.asp?lang_code=zh"
      },

      baptist: {
        price: 142690,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$113,371 – $172,008",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 89530,
        priceLabel: "開放性復位及內固定術",
        displayPrice: "HK$36,870 – $227,720",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.1日。 收費因病情複雜性及個別醫生收費而異。 統計未分上下肢。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 165084,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$123,299 – $206,870",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.canossahospital.org.hk/tc/fee/"
      },

      sph: {
        price: 132970,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$107,343 – $158,596",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 82562,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$74,420 – $90,704",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 109597,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$93,149 – $126,045",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 137469,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$120,487 – $154,451",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 135258,
        priceLabel: "切開復位內固定術（上肢）",
        displayPrice: "HK$124,786 – $145,730",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      carpal_tunnel: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 91490,
        priceLabel: "內視鏡腕管解除術",
        displayPrice: "HK$49,380 – $133,600",
        remarks: "✓ 是否附加板機狀指鬆解及住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 77356,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$77,356",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 42445,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$42,445",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sth: {
        price: 37133,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$37,133",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 39258,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$39,258",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 41411,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$41,411",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 46201,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$46,201",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 29577,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$29,577",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 45225,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$45,225",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      twah: {
        price: 53649,
        priceLabel: "腕管鬆解術（歷史中位）",
        displayPrice: "HK$53,649",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      trigger_finger: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 76600,
        priceLabel: "板機狀指鬆解術",
        displayPrice: "HK$19,600 – $133,600",
        remarks: "✓ 是否附加板機狀指鬆解及住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 58423,
        priceLabel: "板機指鬆解術（歷史中位）",
        displayPrice: "HK$58,423",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 27889,
        priceLabel: "板機指鬆解術（歷史中位）",
        displayPrice: "HK$27,889",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 34092,
        priceLabel: "板機指鬆解術（歷史中位）",
        displayPrice: "HK$34,092",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 25622,
        priceLabel: "板機指鬆解術（歷史中位）",
        displayPrice: "HK$25,622",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 43307,
        priceLabel: "板機指鬆解術（歷史中位）",
        displayPrice: "HK$43,307",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 14897,
        priceLabel: "板機指鬆解術（歷史中位）",
        displayPrice: "HK$14,897",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      knee_arthroscopy: {
      szufh: {
        price: 73750,
        priceLabel: "膝關節鏡手術",
        displayPrice: "￥35,000 – ￥112,500",
        remarks: "✓ 關節鏡術式與風險等級。",
        link: "https://www.szufh.hk/orthopedic-surgery-fees.html"
      },

      cuhk: {
        price: 194310,
        priceLabel: "膝關節鏡手術",
        displayPrice: "HK$63,620 – $325,000",
        remarks: "✓ 術式复杂性（单侧游离体移除/半月板修復/前或后十字韌帶重建）与住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 100756,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$100,756",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 83771,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$83,771",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 77211,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$77,211",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 84144,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$84,144",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 89110,
        priceLabel: "膝關節內窺鏡檢查",
        displayPrice: "HK$69,000 – $108,980",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.0日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 88630,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$88,630",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 81011,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$81,011",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 106356,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$106,356",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 81837,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$81,837",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      twah: {
        price: 97947,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$97,947",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 150723,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$150,723",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      orif_lower_limb: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 129985,
        priceLabel: "ORIF (髕骨/足踝骨折)",
        displayPrice: "HK$71,170 – $188,800",
        remarks: "✓ 骨折具体部位（髌骨/足踝单双踝）与住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 185814,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$170,666 – $200,963",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/"
      },

      ghk: {
        price: 119110,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$100,300 – $137,919",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://gleneagles.hk/tc/fee-charges/"
      },

      matilda: {
        price: 224570,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$187,686 – $261,455",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/"
      },

      sth: {
        price: 117353,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$98,395 – $136,311",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.sth.org.hk/charge.asp?lang_code=zh"
      },

      baptist: {
        price: 155102,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$119,558 – $190,646",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 89530,
        priceLabel: "開放性復位及內固定術",
        displayPrice: "HK$36,870 – $227,720",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.1日。 收費因病情複雜性及個別醫生收費而異。 統計未分上下肢。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 183856,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$139,411 – $228,301",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.canossahospital.org.hk/tc/fee/"
      },

      sph: {
        price: 132970,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$107,343 – $158,596",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 96889,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$83,974 – $109,804",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 114275,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$106,735 – $121,815",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 144068,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$128,211 – $159,926",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 136843,
        priceLabel: "切開復位內固定術（下肢）",
        displayPrice: "HK$125,386 – $148,300",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      hip_replacement: {
      szufh: {
        price: 97375,
        priceLabel: "單側全髖關節置換術",
        displayPrice: "￥76,000 – ￥118,750",
        remarks: "✓ 陶瓷對陶瓷／陶瓷對聚乙烯及品牌選項；一般／中等風險。",
        link: "https://www.szufh.hk/orthopedic-surgery-fees.html"
      },

      cuhk: {
        price: 247900,
        priceLabel: "髖關節全關節置換",
        displayPrice: "HK$163,800 – $332,000",
        remarks: "✓ 使用的品牌植入物（S&N/ZIMMER/STRYKER）及住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 129200,
        priceLabel: "機械臂輔助髖關節置換套餐",
        displayPrice: "HK$129,200 – $166,500",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 視機械臂及人工關節品牌而定（2026）。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      achilles_ankle: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      cuhk: {
        price: 123760,
        priceLabel: "跟腱修補/踝關節鏡韌帶修補",
        displayPrice: "HK$65,220 – $182,300",
        remarks: "✓ 術式类型（开放式跟腱/关节镜韌帶修补）与住院級別。包括所有醫院收費及所有醫生費用。"
      },

      hksh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      joint_replacement: {
      szufh: {
        price: 88500,
        priceLabel: "人工關節置換術",
        displayPrice: "￥42,000 – ￥135,000",
        remarks: "✓ 全膝／單髁／機械臂CORI／全髖及植入物選項與風險等級。",
        link: "https://www.szufh.hk/orthopedic-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 191800,
        priceLabel: "全膝關節置換術（單側）套餐",
        displayPrice: "HK$191,800",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 標準房套餐。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      evangel: {
        price: 133000,
        priceLabel: "全膝關節置換（5日4夜普通房）",
        displayPrice: "HK$133,000",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 套餐含醫生及麻醉費（普通房）。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      }
      },
      spine_surgery: {
      szufh: {
        price: 160250,
        priceLabel: "脊柱手術",
        displayPrice: "￥108,000 – ￥212,500",
        remarks: "✓ 腰椎減壓融合／ACDF／人工椎間盤／UBE及集採選項與風險等級。",
        link: "https://www.szufh.hk/orthopedic-surgery-fees.html"
      },

      cuhk: {
        price: 214145,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$214,145",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hksh: {
        price: 274359,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$274,359",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      matilda: {
        price: 168704,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$168,704",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sth: {
        price: 142963,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$142,963",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 203421,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$203,421",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      canossa: {
        price: 192142,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$192,142",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 199536,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$199,536",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 121031,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$121,031",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      twah: {
        price: 185442,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$185,442",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 343575,
        priceLabel: "椎板切除術（歷史中位）",
        displayPrice: "HK$343,575",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      sports_ortho: {
      szufh: {
        price: 61150,
        priceLabel: "骨科小手術及運動醫學",
        displayPrice: "￥9,800 – ￥112,500",
        remarks: "✓ 腫塊／腱鞘／冰凍肩／交叉韌帶／半月板等與風險等級。",
        link: "https://www.szufh.hk/orthopedic-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      hksh: {
        price: 100756,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$100,756",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 83771,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$83,771",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      matilda: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
      },

      sth: {
        price: 77211,
        priceLabel: "膝關節腔內窺鏡（歷史中位）",
        displayPrice: "HK$77,211",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計五十分位總收費。",
        link: "https://www.sth.org.hk/"
      },

      baptist: {
        price: 84144,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$84,144",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 134470,
        priceLabel: "膝前十字韌帶重建術",
        displayPrice: "HK$110,260 – $159,810",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.5日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 88630,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$88,630",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 81011,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$81,011",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 106356,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$106,356",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 112556,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$112,556",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 97947,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$97,947",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 150723,
        priceLabel: "膝關節內視鏡（歷史中位）",
        displayPrice: "HK$150,723",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      }
    },
    cardiology: {
      angiography: {
      szufh: {
        price: 23250,
        priceLabel: "冠狀動脈造影",
        displayPrice: "￥22,000 – ￥24,500",
        remarks: "✓ 日間手術或住院 1 晚。",
        link: "https://www.szufh.hk/cardiology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      }
      },
      pci: {
      szufh: {
        price: 40000,
        priceLabel: "冠狀動脈造影及支架置入 (PCI)",
        displayPrice: "￥22,000 – ￥58,000",
        remarks: "✓ 造影日間／住院／造影+支架；每增加一個支架另計。",
        link: "https://www.szufh.hk/cardiology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
      }
      }
    },
    ophthalmology: {
      cataract: {
      szufh: {
        price: 19850,
        priceLabel: "白內障超聲乳化晶體植入",
        displayPrice: "￥7,200 – ￥32,500",
        remarks: "✓ 晶體級別（單焦／雙焦／EDOF／三焦）及玻璃體注藥；局麻日間。",
        link: "https://www.szufh.hk/ophthalmic-surgery-fees.html"
      },

      cuhk: {
        price: 55825,
        priceLabel: "白內障超聲乳化手術",
        displayPrice: "HK$33,770 – $77,879",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/price-transparency/reference-charges-for-common-surgical-procedures"
      },

      hksh: {
        price: 30225,
        priceLabel: "白內障超聲乳化+人工晶體植入",
        displayPrice: "HK$25,230 – $35,220",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/"
      },

      ghk: {
        price: 67540,
        priceLabel: "白內障超聲乳化手術",
        displayPrice: "HK$23,800 – $111,280",
        remarks: "⚠️ 所選擇的人工晶體級別(標準/雙光/三光/多焦點/散光)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/ophthalmology"
      },

      matilda: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      baptist: {
        price: 23800,
        priceLabel: "白內障超聲乳化+人工晶體植入",
        displayPrice: "HK$23,800",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 20100,
        priceLabel: "白內障摘除及人工晶體植入（單眼／日間）",
        displayPrice: "HK$20,100",
        remarks: "✓ 套餐含專科醫生手術費及局麻、術前測度、日間手術室、單焦距透明晶體、術後兩週內1次覆診及術後藥物。非住院。",
        link: "https://www.union.org/tc/charges-promotion/charges/cataract-surgery-package-plan"
      },

      canossa: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      sph: {
        price: 31510,
        priceLabel: "白內障超聲乳化+人工晶體植入",
        displayPrice: "HK$28,250 – $34,770",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.stpaul.org.hk/tc/charges"
      },

      pbh: {
        price: 21492,
        priceLabel: "白內障超聲乳化+人工晶體植入",
        displayPrice: "HK$20,599 – $22,384",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.pbh.hk/service-fee-adjustment/"
      },

      evangel: {
        price: 21800,
        priceLabel: "白內障超聲乳化+人工晶體植入（單眼套餐）",
        displayPrice: "HK$21,800 – $22,800",
        remarks: "✓ 播道套餐價（列表價約$22,800；推廣約$21,800）。實際晶體級別與是否日間依估價單為準。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 21362,
        priceLabel: "白內障超聲乳化+人工晶體植入",
        displayPrice: "HK$18,093 – $24,631",
        remarks: "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.twah.org.hk/tc/fees-and-charges"
      },

      hkah: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      }
      },
      strabismus: {
      szufh: {
        price: 23750,
        priceLabel: "斜視手術",
        displayPrice: "￥20,000 – ￥27,500",
        remarks: "✓ 矯正眼外肌數量（1條／2條）；全身麻醉日間。",
        link: "https://www.szufh.hk/ophthalmic-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "眼科手術資料整理中。"
      }
      }
    },
    ent: {
      tonsillectomy: {
      szufh: {
        price: 33525,
        priceLabel: "扁桃體切除術",
        displayPrice: "￥29,800 – ￥37,250",
        remarks: "✓ 扁桃體切除術；日間手術；一般／中等風險。",
        link: "https://www.szufh.hk/ent-surgery-fees.html"
      },

      cuhk: {
        price: 83955,
        priceLabel: "扁桃體切除術",
        displayPrice: "HK$66,667 – $101,242",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/price-transparency/reference-charges-for-common-surgical-procedures"
      },

      hksh: {
        price: 78513,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$78,513",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 65551,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$65,551",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      matilda: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sth: {
        price: 62477,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$62,477",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      baptist: {
        price: 66613,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$66,613",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      union: {
        price: 71290,
        priceLabel: "扁桃體切除術",
        displayPrice: "HK$28,770 – $129,900",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.1日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 76675,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$76,675",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 63414,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$63,414",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 69389,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$69,389",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      twah: {
        price: 106684,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$106,684",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 69634,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$69,634",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      micro_laryngoscopy: {
      szufh: {
        price: 33750,
        priceLabel: "顯微喉鏡檢查",
        displayPrice: "￥30,000 – ￥37,500",
        remarks: "✓ 顯微喉鏡±活檢；未標中等風險項按 1.25 倍拉齊上限。",
        link: "https://www.szufh.hk/ent-surgery-fees.html"
      },

      cuhk: {
        price: 70720,
        priceLabel: "微型喉鏡檢查",
        displayPrice: "HK$65,748 – $75,691",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/fees-and-charges/price-transparency/reference-charges-for-common-surgical-procedures"
      },

      hksh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      ghk: {
        price: 78555,
        priceLabel: "顯微喉鏡檢查",
        displayPrice: "HK$70,200 – $86,910",
        remarks: "⚠️ 是否使用激光設備。",
        link: "https://gleneagles.hk/tc/patient-care-services/ear-nose-throat"
      },

      matilda: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      union: {
        price: 59790,
        priceLabel: "顯微喉內視鏡檢查",
        displayPrice: "HK$34,580 – $144,740",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.0日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      }
      },
      adenoid_tonsil: {
      szufh: {
        price: 32900,
        priceLabel: "腺樣體及扁桃體手術",
        displayPrice: "￥24,800 – ￥41,000",
        remarks: "✓ 腺樣體／扁桃體／同台複合；日間手術室。",
        link: "https://www.szufh.hk/ent-surgery-fees.html"
      },

      cuhk: {
        price: 66667,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$66,667",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hksh: {
        price: 78513,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$78,513",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      ghk: {
        price: 79000,
        priceLabel: "腺樣體及扁桃體手術",
        displayPrice: "HK$54,000 – $104,000",
        remarks: "⚠️ 手術範圍(扁桃腺/腺體/垂腭咽)、是否合併內窺鏡切除，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/ear-nose-throat"
      },

      matilda: {
        price: 67200,
        priceLabel: "扁桃腺切除術套餐（標準房）",
        displayPrice: "HK$67,200 – $104,660",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 醫院套餐（標準／雙人／私家）。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages"
      },

      sth: {
        price: 62477,
        priceLabel: "扁桃體切除術（歷史中位）",
        displayPrice: "HK$62,477",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年歷史統計五十分位總收費。",
        link: "https://www.sth.org.hk/"
      },

      baptist: {
        price: 66613,
        priceLabel: "扁桃體切除術（歷史中位）",
        displayPrice: "HK$66,613",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2024–2025 住院五十分位總收費。",
        link: "https://www.hkbh.org.hk/fees-charges/"
      },

      union: {
        price: 65790,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$65,790",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      canossa: {
        price: 76675,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$76,675",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      sph: {
        price: 63414,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$63,414",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      pbh: {
        price: 69389,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$69,389",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      evangel: {
        price: 18484,
        priceLabel: "扁桃體切除術（歷史中位）",
        displayPrice: "HK$18,484",
        remarks: "✓ 醫院價目／歷史統計（本地 scrape）。 2025年普通房歷史五十分位總收費。",
        link: "https://www.evangel.org.hk/zh-hant/charges/price_list/"
      },

      twah: {
        price: 106684,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$106,684",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      },

      hkah: {
        price: 69634,
        priceLabel: "扁桃腺切除術（歷史中位）",
        displayPrice: "HK$69,634",
        remarks: "⚠️ 參考 Hong Kong Card 2026-05 匯總（稱取自各院 2025 常見手術統計五十分位總收費）。區間僅供參考，實際以醫院書面估價為準。",
        link: "https://www.hongkongcard.com/blogs/hong-kong-private-hospital-surgery-fees-2026"
      }
      },
      sinus_surgery: {
      szufh: {
        price: 61250,
        priceLabel: "鼻竇炎及鼻中隔手術",
        displayPrice: "￥35,000 – ￥87,500",
        remarks: "✓ FESS／鼻中隔矯正／複合術與風險等級。",
        link: "https://www.szufh.hk/ent-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      ghk: {
        price: 98805,
        priceLabel: "鼻竇炎及鼻中隔手術",
        displayPrice: "HK$42,000 – $155,610",
        remarks: "⚠️ 手術項目(鼻骨閉合復位/內窺鏡鼻甲成形/鼻中膈修補/FESS)、是否附加定位導航，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/ear-nose-throat"
      },

      matilda: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      union: {
        price: 140700,
        priceLabel: "功能性內視鏡鼻竇手術",
        displayPrice: "HK$56,520 – $384,600",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.8日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      }
      },
      tympanoplasty: {
      szufh: {
        price: 26000,
        priceLabel: "鼓膜修補及顯微喉鏡",
        displayPrice: "￥22,000 – ￥30,000",
        remarks: "✓ 鼓膜修補／顯微喉鏡±活檢。未標中等風險項按 1.25 倍拉齊上限。",
        link: "https://www.szufh.hk/ent-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      ghk: {
        price: 69665,
        priceLabel: "鼓膜修補及顯微喉鏡",
        displayPrice: "HK$39,100 – $100,230",
        remarks: "⚠️ 手術術式(鼓膜切開伴中耳導管植入/鼓膜成型修補術)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/ear-nose-throat"
      },

      matilda: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      }
      }
    },
    painManagement: {
      nerve_block: {
      szufh: {
        price: 139300,
        priceLabel: "疼痛管理 (神經阻滯/射頻等)",
        displayPrice: "￥3,600 – ￥275,000",
        remarks: "✓ 阻滯／造影／射頻／三叉神經球囊／鞘內鎮痛泵與風險等級。",
        link: "https://www.szufh.hk/pain-management-procedure-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      }
      },
      spine_endoscopy: {
      szufh: {
        price: 45000,
        priceLabel: "脊柱內鏡診療手術",
        displayPrice: "￥40,000 – ￥50,000",
        remarks: "✓ 腰椎／頸椎；監測麻醉下日間；一般／中等風險。",
        link: "https://www.szufh.hk/pain-management-procedure-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      }
      },
      scs_implant: {
      szufh: {
        price: 38750,
        priceLabel: "脊髓電刺激植入術",
        displayPrice: "￥30,000 – ￥47,500",
        remarks: "✓ 第一期測試／第二期永久植入與風險等級。",
        link: "https://www.szufh.hk/pain-management-procedure-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "疼痛管理資料整理中。"
      }
      }
    },
    plastics: {
    rhinoplasty: {
        szufh: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        cuhk: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        hksh: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        ghk: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        matilda: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        sth: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        baptist: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        union: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        canossa: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        sph: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        pbh: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        evangel: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        twah: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        },
        hkah: {
          price: 9999999,
          remarks: "隆鼻手術資料整理中。"
        }
      },
      laceration_repair: {
      szufh: {
        price: 3700,
        priceLabel: "急症/整形外科縫合套餐",
        displayPrice: "￥2,400 – ￥5,000",
        remarks: "✓ 傷口長度與材料；日間操作。",
        link: "https://www.szufh.hk/emergency-and-plastic-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      matilda: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "整形外科手術資料整理中。"
      }
      }
    },
    urology: {
      prostate: {
      szufh: {
        price: 53125,
        priceLabel: "前列腺診療手術",
        displayPrice: "￥25,000 – ￥81,250",
        remarks: "✓ MRI融合活檢／Rezum／Urolift／TURP／HoLEP與風險等級。",
        link: "https://www.szufh.hk/urology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      ghk: {
        price: 87075,
        priceLabel: "前列腺及膀胱腫瘤手術",
        displayPrice: "HK$40,900 – $133,250",
        remarks: "⚠️ 處置項目(經會陰活組織檢查/經尿道前列腺切除/膀胱腫瘤切除)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/urology"
      },

      matilda: {
        price: 106300,
        priceLabel: "經尿道前列腺切除術（全面護理套餐）",
        displayPrice: "HK$106,300 – $184,370",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 含專科醫生費、3晚住院；醫院套餐（不含醫生）約$56,100起。",
        link: "https://www.matilda.org/zh-hk/fees-and-packages/urology/transurethral-resection-of-prostate"
      },

      sth: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      union: {
        price: 111675,
        priceLabel: "前列腺手術（電刮／等離子氣化）",
        displayPrice: "HK$69,430 – $186,140",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 收費因病情複雜性及個別醫生收費而異。 含經尿道電刮與等離子氣化統計區間。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hkah: {
        price: 122000,
        priceLabel: "經尿道前列腺切除術（TURP）套餐",
        displayPrice: "HK$122,000",
        remarks: "✓ 醫院套餐價目（本地 scrape／官網）。 泌尿科住院套餐（2025價目單）。",
        link: "https://www.hkah.org.hk/tc/fees-and-charges"
      }
      },
      kidney_stone: {
      szufh: {
        price: 41250,
        priceLabel: "泌尿系結石碎石手術",
        displayPrice: "￥10,000 – ￥72,500",
        remarks: "✓ 硬鏡／軟鏡碎石、雙J管拔除與風險等級。",
        link: "https://www.szufh.hk/urology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      ghk: {
        price: 83040,
        priceLabel: "泌尿系結石碎石手術",
        displayPrice: "HK$49,600 – $116,480",
        remarks: "⚠️ 手術方式(體外衝擊波/輸尿管內窺鏡取石/鈥激光/銩激光碎石)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/urology"
      },

      matilda: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      }
      },
      urodynamics: {
      szufh: {
        price: 11250,
        priceLabel: "尿動力及膀胱鏡檢查",
        displayPrice: "￥7,500 – ￥15,000",
        remarks: "✓ 尿動力套餐／膀胱尿道鏡±活檢與風險等級。",
        link: "https://www.szufh.hk/urology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      ghk: {
        price: 25020,
        priceLabel: "膀胱鏡檢查",
        displayPrice: "HK$17,800 – $32,240",
        remarks: "⚠️ 使用硬鏡或軟鏡、麻醉方式(局麻/監察/全身麻醉)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/urology"
      },

      matilda: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      union: {
        price: 3800,
        priceLabel: "尿動力測試（成人）",
        displayPrice: "HK$3,800 – $4,000",
        remarks: "✓ 微創中心門診價；成人 $3,800／兒童 $4,000。不含醫生診症費。",
        link: "https://www.union.org/tc/charges-promotion/charges/urology-price-list"
      },

      canossa: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      }
      },
      andrology: {
      szufh: {
        price: 12500,
        priceLabel: "男科處置手術",
        displayPrice: "￥5,000 – ￥20,000",
        remarks: "✓ 輸精管結紮／包皮術式與麻醉及年齡段。",
        link: "https://www.szufh.hk/urology-surgery-fees.html"
      },

      cuhk: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      ghk: {
        price: 44700,
        priceLabel: "男科處置手術",
        displayPrice: "HK$27,000 – $62,400",
        remarks: "⚠️ 手術項目、麻醉方式(局麻/監察/全身麻醉)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/urology"
      },

      matilda: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      union: {
        price: 69660,
        priceLabel: "睾丸固定術",
        displayPrice: "HK$46,390 – $92,970",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約1.5日。 收費因病情複雜性及個別醫生收費而異。",
        link: "https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital"
      },

      canossa: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
      }
      }
    }
  },
  searchIndex: [
    {
      "keywords": [
        "胃鏡",
        "gastroscopy",
        "OGD",
        "日間胃鏡檢查套餐價格比較 (Gastroscopy)",
        "無痛胃鏡健康檢查 (監察麻醉)",
        "日間胃鏡 (鎮靜麻醉)",
        "日間中心程序起步底價",
        "日間定額醫療程序套餐",
        "胃鏡檢查 - 睡眠監察麻醉",
        "胃窺鏡 +/- 瘜肉切除術",
        "日間胃鏡 ± 瘜肉切除（歷史中位）",
        "日間淨胃鏡（鎮靜麻醉）",
        "日間胃鏡總收費中位（連醫生費）",
        "胃鏡檢查",
        "門診胃鏡（醫院收費）",
        "日間手術中心胃內窺鏡套餐",
        "胃鏡 ± 瘜肉（歷史中位）"
      ],
      "page": "imaging.html",
      "hash": "#gastroscopy",
      "label": "日間胃鏡檢查套餐價格比較 (Gastroscopy)"
    },
    {
      "keywords": [
        "結腸鏡",
        "肠镜",
        "colonoscopy",
        "大腸鏡",
        "日間大腸鏡檢查套餐價格比較 (Colonoscopy)",
        "無痛腸鏡健康檢查 (監察麻醉)",
        "日間結腸鏡 (鎮靜麻醉)",
        "大腸鏡 ± 瘜肉（歷史中位）",
        "日間定額全包區間",
        "結腸鏡檢查（睡眠監察麻醉）",
        "日間腸鏡（歷史中位總收費）",
        "日間常規程序基準",
        "日間腸鏡總收費中位",
        "日間大腸鏡（鎮靜麻醉・不連瘜肉）",
        "日間大腸鏡總收費中位",
        "日間大房基準套餐價",
        "日間全面護理套餐（大腸鏡）",
        "日間大腸鏡（歷史中位總收費）",
        "大腸鏡檢查（含／不含瘜肉）參考區間"
      ],
      "page": "imaging.html",
      "hash": "#colonoscopy",
      "label": "日間大腸鏡檢查套餐價格比較 (Colonoscopy)"
    },
    {
      "keywords": [
        "雙鏡",
        "dual",
        "胃鏡+大腸鏡",
        "胃鏡加大腸鏡聯合檢查",
        "dual scope",
        "無痛胃腸鏡健康檢查 (雙鏡聯合)",
        "日間胃鏡及大腸鏡聯查",
        "胃鏡+大腸鏡（歷史中位）",
        "日間全包雙鏡定額套餐",
        "結腸鏡及胃鏡（睡眠監察麻醉）",
        "日間胃腸鏡聯查（歷史中位）",
        "日間胃鏡＋腸鏡（歷史中位）",
        "日間淨胃鏡＋大腸鏡（鎮靜）",
        "日間腸胃鏡同照總收費中位",
        "常規兩項程序大房加總底價",
        "日間全面護理套餐（胃＋腸）",
        "日間胃＋腸鏡（歷史中位總收費）",
        "胃鏡＋大腸鏡合併套餐參考"
      ],
      "page": "imaging.html",
      "hash": "#dual_scope",
      "label": "胃鏡加大腸鏡聯合檢查"
    },
    {
      "keywords": [
        "CT",
        "電腦斷層",
        "ct brain",
        "CT 腦部掃描套餐價格比較",
        "無造影劑掃描",
        "CT 腦部平掃（門診）",
        "CT 腦部平掃",
        "CT 腦部平掃（門診／普通房）",
        "CT 腦部平掃（標準房）",
        "CT 腦部掃描",
        "CT 腦部掃描（門診參考）",
        "CT 腦部平掃（普通房）"
      ],
      "page": "imaging.html",
      "hash": "#ct_brain",
      "label": "CT 腦部掃描套餐價格比較"
    },
    {
      "keywords": [
        "MRI",
        "磁力共振",
        "mri brain",
        "MRI 腦部掃描套餐價格比較",
        "無造影劑 MRI",
        "腦部磁力共振套餐",
        "MRI 腦部平掃",
        "MRI 腦部平掃（門診／標準房）",
        "MRI 腦部平掃（標準房）",
        "MRI 腦部掃描",
        "MRI 腦部平掃（普通房）"
      ],
      "page": "imaging.html",
      "hash": "#mri_brain",
      "label": "MRI 腦部掃描套餐價格比較"
    },
    {
      "keywords": [
        "膽囊",
        "cholecystectomy",
        "腹腔鏡"
      ],
      "page": "general-surgery.html",
      "hash": "",
      "label": "腹腔鏡膽囊切除術"
    },
    {
      "keywords": [
        "門診",
        "診金",
        "outpatient",
        "門診診金"
      ],
      "page": "outpatient.html",
      "hash": "",
      "label": "門診診金"
    },
    {
      "keywords": [
        "專科門診",
        "專科診金",
        "specialist outpatient",
        "outpatientSpecialty"
      ],
      "page": "outpatient.html",
      "hash": "#specialty-outpatient",
      "label": "專科門診"
    },
    {
      "keywords": [
        "病房",
        "ward",
        "住院",
        "病房收費"
      ],
      "page": "ward.html",
      "hash": "",
      "label": "病房收費"
    },
    {
      "keywords": [
        "婦產",
        "子宮肌瘤",
        "子宮鏡",
        "婦科",
        "子宮肌瘤切除術",
        "myomectomy",
        "子宮肌瘤切除術（傳統）套餐",
        "肌瘤切除術"
      ],
      "page": "gyn.html",
      "hash": "#myomectomy",
      "label": "myomectomy"
    },
    {
      "keywords": [
        "膝關節",
        "骨科",
        "orthopedics"
      ],
      "page": "orthopedics.html",
      "hash": "",
      "label": "骨科手術"
    },
    {
      "keywords": [
        "心臟",
        "通波仔",
        "cardiology"
      ],
      "page": "cardiology.html",
      "hash": "",
      "label": "心臟科"
    },
    {
      "keywords": [
        "白內障",
        "眼科",
        "ophthalmology"
      ],
      "page": "ophthalmology.html",
      "hash": "",
      "label": "眼科手術"
    },
    {
      "keywords": [
        "耳鼻喉",
        "ent"
      ],
      "page": "ent.html",
      "hash": "",
      "label": "耳鼻喉科"
    },
    {
      "keywords": [
        "支氣管鏡",
        "bronchoscopy",
        "支氣管鏡檢查",
        "支氣管鏡檢查 (日間)",
        "支氣管鏡 ± 活檢（歷史中位）",
        "支氣管內視鏡檢查",
        "支氣管鏡（歷史中位總收費）"
      ],
      "page": "imaging.html",
      "hash": "#bronchoscopy",
      "label": "bronchoscopy"
    },
    {
      "keywords": [
        "泌尿外科",
        "前列腺",
        "urology",
        "前列腺診療手術",
        "prostate",
        "前列腺及膀胱腫瘤手術",
        "經尿道前列腺切除術（全面護理套餐）",
        "前列腺手術（電刮／等離子氣化）",
        "經尿道前列腺切除術（TURP）套餐"
      ],
      "page": "urology.html",
      "hash": "#prostate",
      "label": "prostate"
    },
    {
      "keywords": [
        "一般外科",
        "闌尾",
        "疝氣",
        "闌尾切除術",
        "appendectomy",
        "腹腔鏡闌尾切除（歷史中位）"
      ],
      "page": "general-surgery.html",
      "hash": "#appendectomy",
      "label": "appendectomy"
    },
    {
      "keywords": [
        "现状 · 生产环境",
        "baseline"
      ],
      "page": "card-explorer.html",
      "hash": "#baseline",
      "label": "现状 · 生产环境"
    },
    {
      "keywords": [
        "建议方案 v2",
        "proposed"
      ],
      "page": "card-explorer.html",
      "hash": "#proposed",
      "label": "建议方案 v2"
    },
    {
      "keywords": [
        "冠狀動脈造影及支架置入 (PCI)",
        "pci"
      ],
      "page": "cardiology.html",
      "hash": "#pci",
      "label": "冠狀動脈造影及支架置入 (PCI)"
    },
    {
      "keywords": [
        "扁桃體切除術",
        "tonsillectomy",
        "扁桃腺切除術（歷史中位）"
      ],
      "page": "ent.html",
      "hash": "#tonsillectomy",
      "label": "tonsillectomy"
    },
    {
      "keywords": [
        "微型喉鏡檢查",
        "micro laryngoscopy",
        "顯微喉鏡檢查",
        "顯微喉內視鏡檢查"
      ],
      "page": "ent.html",
      "hash": "#micro_laryngoscopy",
      "label": "micro laryngoscopy"
    },
    {
      "keywords": [
        "腺樣體及扁桃體手術",
        "adenoid tonsil",
        "扁桃腺切除術（歷史中位）",
        "扁桃腺切除術套餐（標準房）",
        "扁桃體切除術（歷史中位）"
      ],
      "page": "ent.html",
      "hash": "#adenoid_tonsil",
      "label": "adenoid tonsil"
    },
    {
      "keywords": [
        "鼻竇炎及鼻中隔手術",
        "sinus surgery",
        "功能性內視鏡鼻竇手術"
      ],
      "page": "ent.html",
      "hash": "#sinus_surgery",
      "label": "sinus surgery"
    },
    {
      "keywords": [
        "鼓膜修補及顯微喉鏡",
        "tympanoplasty"
      ],
      "page": "ent.html",
      "hash": "#tympanoplasty",
      "label": "tympanoplasty"
    },
    {
      "keywords": [
        "腹腔鏡膽囊切除術",
        "cholecystectomy",
        "腹腔內視鏡膽囊切除術",
        "腹腔鏡內膽囊切除術",
        "膽囊切除術（腹腔鏡）",
        "膽囊切除術"
      ],
      "page": "general-surgery.html",
      "hash": "#cholecystectomy",
      "label": "cholecystectomy"
    },
    {
      "keywords": [
        "乳房腫塊切除術",
        "breast lump",
        "超聲波導引乳房腫塊切除術"
      ],
      "page": "general-surgery.html",
      "hash": "#breast_lump",
      "label": "breast lump"
    },
    {
      "keywords": [
        "包皮環切術",
        "circumcision",
        "包皮環切術（全面護理套餐）"
      ],
      "page": "general-surgery.html",
      "hash": "#circumcision",
      "label": "circumcision"
    },
    {
      "keywords": [
        "甲狀腺細針穿刺檢查",
        "thyroid fna",
        "超聲波導引甲狀腺細針穿刺"
      ],
      "page": "general-surgery.html",
      "hash": "#thyroid_fna",
      "label": "thyroid fna"
    },
    {
      "keywords": [
        "偏側甲狀腺切除術",
        "hemithyroidectomy",
        "甲狀腺次全切術",
        "半甲狀腺切除（歷史中位）",
        "半邊甲狀腺切除術",
        "半甲狀腺切除術套餐（標準房）"
      ],
      "page": "general-surgery.html",
      "hash": "#hemithyroidectomy",
      "label": "hemithyroidectomy"
    },
    {
      "keywords": [
        "甲狀腺/副甲狀腺切除術",
        "thyroidectomy",
        "甲狀腺全切術",
        "全甲狀腺切除（歷史中位）",
        "全邊甲狀腺切除術",
        "全甲狀腺切除術套餐（標準房）"
      ],
      "page": "general-surgery.html",
      "hash": "#thyroidectomy",
      "label": "thyroidectomy"
    },
    {
      "keywords": [
        "腹腔疝氣修補術",
        "hernia abdominal",
        "開放式疝氣手術（歷史中位）"
      ],
      "page": "general-surgery.html",
      "hash": "#hernia_abdominal",
      "label": "hernia abdominal"
    },
    {
      "keywords": [
        "單側腹股溝疝氣修補術",
        "hernia unilateral",
        "腹腔鏡腹股溝疝修補術（單側）",
        "腹股溝疝氣切除術（腹腔鏡單邊）",
        "腹腔鏡腹股溝疝修補術",
        "腹腔鏡疝氣修補（歷史中位）"
      ],
      "page": "general-surgery.html",
      "hash": "#hernia_unilateral",
      "label": "hernia unilateral"
    },
    {
      "keywords": [
        "雙側腹股溝疝氣修補術",
        "hernia bilateral"
      ],
      "page": "general-surgery.html",
      "hash": "#hernia_bilateral",
      "label": "hernia bilateral"
    },
    {
      "keywords": [
        "痔瘡專項處置",
        "hemorrhoid",
        "痔瘡切除術",
        "痔瘡切除術（傳統・全面護理套餐）",
        "痔瘡切除術（普通房套餐）"
      ],
      "page": "general-surgery.html",
      "hash": "#hemorrhoid",
      "label": "hemorrhoid"
    },
    {
      "keywords": [
        "甲狀腺處置手術",
        "thyroid surgery"
      ],
      "page": "general-surgery.html",
      "hash": "#thyroid_surgery",
      "label": "thyroid surgery"
    },
    {
      "keywords": [
        "輸液港手術",
        "port a cath"
      ],
      "page": "general-surgery.html",
      "hash": "#port_a_cath",
      "label": "port a cath"
    },
    {
      "keywords": [
        "乳腺抽針及旋切活檢",
        "breast biopsy",
        "開放式乳房活組織切片檢查"
      ],
      "page": "general-surgery.html",
      "hash": "#breast_biopsy",
      "label": "breast biopsy"
    },
    {
      "keywords": [
        "乳腺外科手術",
        "breast surgery",
        "乳房腫瘤／全乳切除術",
        "乳房切除術"
      ],
      "page": "general-surgery.html",
      "hash": "#breast_surgery",
      "label": "breast surgery"
    },
    {
      "keywords": [
        "自然分娩套餐",
        "normal delivery",
        "自然分娩套餐 (二人房/一人房)",
        "自然分娩套餐（標準房 3日2夜）",
        "自然分娩套餐（兩晚・含產鉗／真空）",
        "陰道分娩（歷史中位總收費）",
        "自然分娩（歷史中位總收費）",
        "自然分娩計劃（標準房 4日3夜）",
        "自然分娩套餐（普通房 3日2夜）",
        "自然分娩計劃（2人房 3日2夜）"
      ],
      "page": "gyn.html",
      "hash": "#normal_delivery",
      "label": "normal delivery"
    },
    {
      "keywords": [
        "剖腹產套餐",
        "c section",
        "剖腹分娩套餐 (二人房/一人房)",
        "剖腹分娩套餐（標準房 5日4夜）",
        "剖腹分娩套餐（4晚）",
        "剖腹分娩（歷史中位總收費）",
        "剖腹分娩計劃（標準房 5日4夜）",
        "剖腹分娩套餐（普通房 5日4夜）",
        "剖腹取嬰術（歷史中位總收費）"
      ],
      "page": "gyn.html",
      "hash": "#c_section",
      "label": "c section"
    },
    {
      "keywords": [
        "子宮頸病變治療手術",
        "cervical treatment",
        "陰道窺鏡檢查"
      ],
      "page": "gyn.html",
      "hash": "#cervical_treatment",
      "label": "cervical treatment"
    },
    {
      "keywords": [
        "子宮鏡診治手術",
        "hysteroscopy",
        "子宮腔鏡（診斷）+ 擴刮套餐",
        "宮腔鏡檢查 + 刮宮術",
        "宮腔鏡 + 刮宮（C級套餐）"
      ],
      "page": "gyn.html",
      "hash": "#hysteroscopy",
      "label": "hysteroscopy"
    },
    {
      "keywords": [
        "子宮切除術",
        "hysterectomy",
        "子宮切除術（歷史中位）",
        "子宮切除術（經腹腔）套餐",
        "腹腔鏡輔助子宮切除術",
        "腹腔鏡子宮切除（歷史中位）"
      ],
      "page": "gyn.html",
      "hash": "#hysterectomy",
      "label": "hysterectomy"
    },
    {
      "keywords": [
        "輸卵管及宮外孕手術",
        "tubal ectopic"
      ],
      "page": "gyn.html",
      "hash": "#tubal_ectopic",
      "label": "tubal ectopic"
    },
    {
      "keywords": [
        "卵巢囊腫切除術",
        "ovarian cyst",
        "腹腔鏡卵巢囊腫切除（歷史中位）",
        "卵巢囊腫切除（傳統）套餐",
        "腹腔鏡卵巢囊腫切除術"
      ],
      "page": "gyn.html",
      "hash": "#ovarian_cyst",
      "label": "ovarian cyst"
    },
    {
      "keywords": [
        "避孕及終止妊娠",
        "contraception",
        "刮宮術（歷史中位）",
        "刮宮術"
      ],
      "page": "gyn.html",
      "hash": "#contraception",
      "label": "contraception"
    },
    {
      "keywords": [
        "公營醫院收費參考及常見手術開支",
        "featured-section"
      ],
      "page": "intelligence.html",
      "hash": "#featured-section",
      "label": "公營醫院收費參考及常見手術開支"
    },
    {
      "keywords": [
        "白內障超聲乳化手術",
        "cataract",
        "白內障超聲乳化晶體植入",
        "白內障超聲乳化+人工晶體植入",
        "白內障摘除及人工晶體植入（單眼／日間）",
        "白內障超聲乳化+人工晶體植入（單眼套餐）"
      ],
      "page": "ophthalmology.html",
      "hash": "#cataract",
      "label": "白內障超聲乳化手術"
    },
    {
      "keywords": [
        "斜視手術",
        "strabismus"
      ],
      "page": "ophthalmology.html",
      "hash": "#strabismus",
      "label": "strabismus"
    },
    {
      "keywords": [
        "全人工膝關節置換術",
        "knee replacement",
        "單側全膝關節置換術",
        "全膝關節置換術"
      ],
      "page": "orthopedics.html",
      "hash": "#knee_replacement",
      "label": "knee replacement"
    },
    {
      "keywords": [
        "髖關節全關節置換",
        "hip replacement",
        "單側全髖關節置換術",
        "機械臂輔助髖關節置換套餐"
      ],
      "page": "orthopedics.html",
      "hash": "#hip_replacement",
      "label": "hip replacement"
    },
    {
      "keywords": [
        "人工關節置換術 (全膝/單髁/全髖)",
        "joint replacement",
        "人工關節置換術",
        "全膝關節置換術（單側）套餐",
        "全膝關節置換（5日4夜普通房）"
      ],
      "page": "orthopedics.html",
      "hash": "#joint_replacement",
      "label": "人工關節置換術 (全膝/單髁/全髖)"
    },
    {
      "keywords": [
        "肩關節鏡手術",
        "shoulder arthroscopy"
      ],
      "page": "orthopedics.html",
      "hash": "#shoulder_arthroscopy",
      "label": "shoulder arthroscopy"
    },
    {
      "keywords": [
        "全肩關節置換術",
        "shoulder replacement"
      ],
      "page": "orthopedics.html",
      "hash": "#shoulder_replacement",
      "label": "shoulder replacement"
    },
    {
      "keywords": [
        "膝關節鏡手術",
        "knee arthroscopy",
        "膝關節內視鏡（歷史中位）",
        "膝關節內窺鏡檢查"
      ],
      "page": "orthopedics.html",
      "hash": "#knee_arthroscopy",
      "label": "knee arthroscopy"
    },
    {
      "keywords": [
        "骨科小手術及運動醫學",
        "sports ortho",
        "膝關節內視鏡（歷史中位）",
        "膝關節腔內窺鏡（歷史中位）",
        "膝前十字韌帶重建術"
      ],
      "page": "orthopedics.html",
      "hash": "#sports_ortho",
      "label": "sports ortho"
    },
    {
      "keywords": [
        "脊柱手術",
        "spine surgery",
        "椎板切除術（歷史中位）"
      ],
      "page": "orthopedics.html",
      "hash": "#spine_surgery",
      "label": "spine surgery"
    },
    {
      "keywords": [
        "ORIF (鎖骨/橈骨遠端骨折)",
        "orif upper limb",
        "ORIF (鎖骨/橈骨遠端)",
        "切開復位內固定術（上肢）",
        "開放性復位及內固定術"
      ],
      "page": "orthopedics.html",
      "hash": "#orif_upper_limb",
      "label": "ORIF (鎖骨/橈骨遠端骨折)"
    },
    {
      "keywords": [
        "ORIF (髕骨/足踝骨折)",
        "orif lower limb",
        "切開復位內固定術（下肢）",
        "開放性復位及內固定術"
      ],
      "page": "orthopedics.html",
      "hash": "#orif_lower_limb",
      "label": "orif lower limb"
    },
    {
      "keywords": [
        "內視鏡腕管解除術",
        "carpal tunnel",
        "腕管鬆解術（歷史中位）"
      ],
      "page": "orthopedics.html",
      "hash": "#carpal_tunnel",
      "label": "carpal tunnel"
    },
    {
      "keywords": [
        "板機狀指鬆解術",
        "trigger finger",
        "板機指鬆解術（歷史中位）"
      ],
      "page": "orthopedics.html",
      "hash": "#trigger_finger",
      "label": "trigger finger"
    },
    {
      "keywords": [
        "跟腱修補/踝關節鏡韌帶修補",
        "achilles ankle"
      ],
      "page": "orthopedics.html",
      "hash": "#achilles_ankle",
      "label": "achilles ankle"
    },
    {
      "keywords": [
        "疼痛管理 (神經阻滯/射頻等)",
        "nerve block"
      ],
      "page": "pain-management.html",
      "hash": "#nerve_block",
      "label": "疼痛管理 (神經阻滯/射頻等)"
    },
    {
      "keywords": [
        "脊柱內鏡診療手術",
        "spine endoscopy"
      ],
      "page": "pain-management.html",
      "hash": "#spine_endoscopy",
      "label": "spine endoscopy"
    },
    {
      "keywords": [
        "脊髓電刺激植入術",
        "scs implant"
      ],
      "page": "pain-management.html",
      "hash": "#scs_implant",
      "label": "scs implant"
    },
    {
      "keywords": [
        "急症/整形外科縫合套餐",
        "laceration repair"
      ],
      "page": "plastics.html",
      "hash": "#laceration_repair",
      "label": "laceration repair"
    },
    {
      "keywords": [
        "泌尿系結石碎石手術",
        "kidney stone"
      ],
      "page": "urology.html",
      "hash": "#kidney_stone",
      "label": "kidney stone"
    },
    {
      "keywords": [
        "尿動力及膀胱鏡檢查",
        "urodynamics",
        "膀胱鏡檢查",
        "尿動力測試（成人）"
      ],
      "page": "urology.html",
      "hash": "#urodynamics",
      "label": "urodynamics"
    },
    {
      "keywords": [
        "男科處置手術",
        "andrology",
        "睾丸固定術"
      ],
      "page": "urology.html",
      "hash": "#andrology",
      "label": "andrology"
    },
    {
      "keywords": [
        "angiography",
        "冠狀動脈造影"
      ],
      "page": "cardiology.html",
      "hash": "#angiography",
      "label": "angiography"
    },
    {
      "keywords": [
        "rhinoplasty"
      ],
      "page": "plastics.html",
      "hash": "#rhinoplasty",
      "label": "rhinoplasty"
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

/** 全局搜尋索引查詢（只回傳繁中標籤結果） */
function searchMedicalIndex(query) {
  var q = String(query || '').toLowerCase().trim();
  if (!q) return [];

  function hasCjk(s) {
    return /[\u3400-\u9FFF]/.test(String(s || ''));
  }

  function withZhLabel(item) {
    if (hasCjk(item.label)) return item;
    var kws = item.keywords || [];
    for (var i = 0; i < kws.length; i++) {
      if (hasCjk(kws[i])) {
        return Object.assign({}, item, { label: kws[i], hash: item.hash || '' });
      }
    }
    return null;
  }

  var matched = (globalMedicalData.searchIndex || []).filter(function (item) {
    return item.keywords.some(function (kw) {
      return q.indexOf(kw.toLowerCase()) !== -1 || kw.toLowerCase().indexOf(q) !== -1;
    });
  });

  var byKey = {};
  matched.forEach(function (item) {
    var zh = withZhLabel(item);
    if (!zh) return;
    var key = zh.page + '|' + zh.label;
    var prev = byKey[key];
    if (!prev) {
      byKey[key] = zh;
      return;
    }
    if (!(prev.hash) && zh.hash) byKey[key] = zh;
  });

  return Object.keys(byKey).map(function (k) { return byKey[k]; });
}
