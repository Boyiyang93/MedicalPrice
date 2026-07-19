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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 73500,
        priceLabel: "乳房腫塊切除術",
        displayPrice: "HK$48,200 – $98,800",
        remarks: "⚠️ 腫塊數目(單一／兩個／三至五個)與日間／住院2日及手術風險等級。",
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
        price: 64130,
        priceLabel: "超聲波導引乳房腫塊切除術",
        displayPrice: "HK$35,480 – $157,600",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.2日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 35900,
        priceLabel: "包皮環切術",
        displayPrice: "HK$28,250 – $43,550",
        remarks: "⚠️ 年齡(出生28天或以下／一般)、日間或住院2日與手術風險等級。",
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 110215,
        priceLabel: "半邊甲狀腺切除術",
        displayPrice: "HK$89,000 – $131,430",
        remarks: "⚠️ 是否併用神經監測與手術風險等級；標準住院約3日。均使用能量設備。",
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 150810,
        priceLabel: "全邊甲狀腺切除術",
        displayPrice: "HK$124,300 – $177,320",
        remarks: "⚠️ 是否併用神經監測與手術風險等級；標準住院約4日。均使用能量設備。",
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 72425,
        priceLabel: "單側腹股溝疝氣修補術",
        displayPrice: "HK$42,800 – $102,050",
        remarks: "⚠️ 手術路徑(開放式／腹腔鏡)、患者年齡(成人／兒童)與手術風險等級；單邊。",
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      ghk: {
        price: 57750,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$42,700 – $72,800",
        remarks: "⚠️ 手術方式(傳統/環狀切除/使用Ligasure)與手術風險等級。",
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
        price: 46540,
        priceLabel: "痔瘡切除術",
        displayPrice: "HK$30,910 – $83,420",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.2日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      baptist: {
        price: 12250,
        priceLabel: "日間常規程序基準",
        displayPrice: "HK$11,000 – $13,500",
        remarks: "⚠️ 瘜肉階梯：切除超出3粒後觸發階梯收費，輪候約2週。",
        tags: ["常規程序"]
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      pbh: {
        price: 8200,
        priceLabel: "日間大房基準套餐價",
        displayPrice: "HK$8,200",
        remarks: "✓ 價格相宜：香港本地高性價比，適合基礎篩查。",
        tags: ["預算優選"]
      },

      evangel: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sth: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      pbh: {
        price: 12500,
        priceLabel: "常規兩項程序大房加總底價",
        displayPrice: "HK$12,500",
        remarks: "ℹ️ 本地經濟之選：香港本地最省錢的雙鏡聯合排查方案。",
        tags: ["參考低價"]
      },

      evangel: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      union: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      canossa: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sph: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      pbh: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      evangel: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      twah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      hkah: {
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
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
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
        },
        hksh: {
          price: 3690,
          priceLabel: "CT 腦部平掃",
          displayPrice: "$3,690 – $6,630",
          remarks: "✓ 價目表（門診/普通房級，2026-08）。 加顯影約 $6,630。",
          link: "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list"
        },
        ghk: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
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
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
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
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
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
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
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
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
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
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      ghk: {
        price: 158500,
        priceLabel: "子宮切除術",
        displayPrice: "HK$102,500 – $214,500",
        remarks: "⚠️ 手術路徑(經陰道/開放式/腹腔鏡輔助)及是否連帶雙側輸卵管及卵巢切除，與手術風險等級。",
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
        price: 162930,
        priceLabel: "腹腔鏡輔助子宮切除術",
        displayPrice: "HK$100,420 – $397,250",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約4.6日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      ghk: {
        price: 145300,
        priceLabel: "卵巢囊腫切除術",
        displayPrice: "HK$93,000 – $197,600",
        remarks: "⚠️ 手術路徑、單雙側切除、是否使用Ligasure/Enseal能量設備，與手術風險等級。",
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
        price: 103550,
        priceLabel: "腹腔鏡卵巢囊腫切除術",
        displayPrice: "HK$69,740 – $159,300",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.3日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
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
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      baptist: {
        price: 9999999,
        remarks: "婦產科套餐資料整理中。"
      },

      union: {
        price: 29650,
        priceLabel: "刮宮術",
        displayPrice: "HK$16,240 – $44,200",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約1.4日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 89530,
        priceLabel: "開放性復位及內固定術",
        displayPrice: "HK$36,870 – $227,720",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.1日。 收費因病情複雜性及個別醫生收費而異。 統計未分上下肢。",
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
        price: 89110,
        priceLabel: "膝關節內窺鏡檢查",
        displayPrice: "HK$69,000 – $108,980",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.0日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 89530,
        priceLabel: "開放性復位及內固定術",
        displayPrice: "HK$36,870 – $227,720",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.1日。 收費因病情複雜性及個別醫生收費而異。 統計未分上下肢。",
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
        price: 9999999,
        remarks: "骨科手術資料整理中。"
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
      spine_surgery: {
      szufh: {
        price: 160250,
        priceLabel: "脊柱手術",
        displayPrice: "￥108,000 – ￥212,500",
        remarks: "✓ 腰椎減壓融合／ACDF／人工椎間盤／UBE及集採選項與風險等級。",
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
        price: 134470,
        priceLabel: "膝前十字韌帶重建術",
        displayPrice: "HK$110,260 – $159,810",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約3.5日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 9999999,
        remarks: "眼科手術資料整理中。"
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
        price: 9999999,
        remarks: "眼科手術資料整理中。"
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
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      ghk: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
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
        price: 71290,
        priceLabel: "扁桃體切除術",
        displayPrice: "HK$28,770 – $129,900",
        remarks: "⚠️ 2025年7–12月統計（標準房）。總收費含手術室費、醫生費、麻醉科醫生費及醫院費。 平均住院約2.1日。 收費因病情複雜性及個別醫生收費而異。",
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
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      hksh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
      },

      ghk: {
        price: 79000,
        priceLabel: "腺樣體及扁桃體手術",
        displayPrice: "HK$54,000 – $104,000",
        remarks: "⚠️ 手術範圍(扁桃腺/腺體/垂腭咽)、是否合併內窺鏡切除，與手術風險等級。",
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
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
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
        "專科門診",
        "專科診金",
        "specialist outpatient"
      ],
      page: "outpatient.html",
      hash: "#specialty-outpatient",
      label: "專科門診"
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
    },
    {
      keywords: [
        "支氣管鏡",
        "bronchoscopy"
      ],
      page: "imaging.html",
      hash: "#bronchoscopy",
      label: "支氣管鏡檢查"
    },
    {
      keywords: [
        "泌尿外科",
        "前列腺",
        "urology"
      ],
      page: "urology.html",
      hash: "#prostate",
      label: "泌尿外科手術"
    },
    {
      keywords: [
        "一般外科",
        "闌尾",
        "疝氣"
      ],
      page: "general-surgery.html",
      hash: "#appendectomy",
      label: "一般外科手術"
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
