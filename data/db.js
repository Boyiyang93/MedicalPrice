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
      alert: false
    },
    cuhk: {
      name: "香港中文大學醫院",
      link: "https://www.cuhkmc.hk/",
      tag: "",
      alert: false
    },
    hksh: {
      name: "養和醫院 (HKSH)",
      link: "https://www.hksh-hospital.com/",
      tag: "",
      alert: false
    },
    ghk: {
      name: "港怡醫院 (GHK)",
      link: "https://gleneagles.hk/",
      tag: "",
      alert: false
    },
    matilda: {
      name: "明德國際醫院",
      link: "https://www.matilda.org/",
      tag: "",
      alert: false
    },
    sth: {
      name: "聖德肋撒醫院 (法國)",
      link: "http://www.sth.org.hk/",
      tag: "",
      alert: false
    },
    baptist: {
      name: "香港浸信會醫院",
      link: "https://www.hkbh.org.hk/",
      tag: "",
      alert: false
    },
    union: {
      name: "仁安醫院",
      link: "https://www.union.org/",
      tag: "",
      alert: false
    },
    canossa: {
      name: "嘉諾撒醫院",
      link: "#",
      tag: "",
      alert: false
    },
    sph: {
      name: "聖保祿醫院 (SPH)",
      link: "https://www.stpaul.org.hk/",
      tag: "",
      alert: false
    },
    pbh: {
      name: "寶血醫院 (PBH)",
      link: "https://www.pbh.hk/",
      tag: "",
      alert: false
    },
    evangel: {
      name: "播道醫院",
      link: "#",
      tag: "",
      alert: false
    },
    twah: {
      name: "荃灣港安醫院",
      link: "#",
      tag: "",
      alert: false
    },
    hkah: {
      name: "香港港安–司徒拔道",
      link: "#",
      tag: "",
      alert: false
    }
  },
  modules: {
    outpatient: {
      szufh: {
        link: "https://www.szufh.hk/fuwusf.html",
        prices: {
          regular: 813,
          night: 1375,
          holiday: 1375
        },
        displayPrices: {
          regular: "$625 – $1,000",
          night: "$1,250 – $1,500",
          holiday: "$1,250 – $1,500"
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
        prices: {
          regular: 400,
          night: 600,
          holiday: 500
        },
        displayPrices: {
          regular: "$400",
          night: "$500 – $700",
          holiday: "$500"
        },
        timeSlots: {
          regular: "星期一至五 09:00-19:00；星期六 09:00-13:00",
          night: "星期一至五 08:00-09:00及19:00-00:00；星期六 08:00-09:00及13:00-00:00；每日 00:00-08:00",
          holiday: "星期日及公眾假期 08:00-00:00"
        },
        remarks: "診金收費以病人取票時間為準。"
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
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "資料整理中。"
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
        remarks: "資料整理中。"
      },
      canossa: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "資料整理中。"
      },
      sph: {
        prices: {
          regular: 280,
          night: 430,
          holiday: 410
        },
        remarks: "注意：非當值專科醫生回院應診外加收 $1,000。"
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
        remarks: "資料整理中。"
      },
      twah: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "資料整理中。"
      },
      hkah: {
        prices: {
          regular: 9999999,
          night: 9999999,
          holiday: 9999999
        },
        remarks: "資料整理中。"
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
        link: "https://www.szufh.hk/yiliaoquan.html",
        prices: {
          regular: 1000,
          night: 9999999,
          holiday: 9999999
        },
        displayPrices: {
          regular: "$1,000 – $1,875",
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
      cholecystectomy: {
      szufh: {
        price: 77344,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$68,750 – $85,938",
        remarks: "✓ 手術形式（常規腹腔鏡／開放式）與風險等級；標準住院天數為 2 晚。",
        link: "https://www.szufh.hk/shoushusf.html"
      },

      cuhk: {
        price: 110387,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$95,688 – $125,086",
        remarks: "⚠️ 2025年歷史統計。總收費=醫生費+醫院費。標準房。",
        link: "https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery"
      },

      hksh: {
        price: 97500,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$85,000 – $110,000",
        remarks: "⚠️ 視乎病房級別（普通房/半私家房/私家房）。醫生費需另計。",
        link: "https://www.hksh-hospital.com/tc_chi/services/service_general_surgery.aspx"
      },

      ghk: {
        price: 121060,
        priceLabel: "腹腔鏡膽囊切除術",
        displayPrice: "HK$99,900 – $142,220",
        remarks: "⚠️ 手術路徑(常規腹腔鏡/單孔腹腔鏡/開放式)、能量設備(超聲刀/雙極刀)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
      },

      matilda: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
      },

      sth: {
        price: 20250,
        priceLabel: "日間普通房基準套餐",
        displayPrice: "HK$18,500 – $22,000",
        remarks: "⚠️ 雜費風險：病理化驗與耗材可能另計。"
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
      breast_lump: {
      szufh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
      circumcision: {
      szufh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 73565,
        priceLabel: "包皮環切術",
        displayPrice: "HK$18,300 – $128,830",
        remarks: "⚠️ 手術項目(包皮/膿腫/藏毛竇/激光靜脈曲張/脂肪瘤)、麻醉方式與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
      thyroidectomy: {
      szufh: {
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 133160,
        priceLabel: "甲狀腺切除術",
        displayPrice: "HK$89,000 – $177,320",
        remarks: "⚠️ 切除範圍(半邊/全邊)、是否併用神經監測，與手術風險等級。均使用能量設備。",
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
        price: 89065,
        priceLabel: "腹股溝疝氣修補術",
        displayPrice: "HK$42,800 – $135,330",
        remarks: "⚠️ 手術路徑(開放式/腹腔鏡)、單雙邊、患者年齡(成人/兒童)與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
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
        price: 9999999,
        remarks: "定額一般外科手術資料整理中。"
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
      appendectomy: {
      szufh: {
        price: 76438,
        priceLabel: "闌尾切除術",
        displayPrice: "HK$62,250 – $90,625",
        remarks: "✓ 手術形式（常規腹腔鏡/開放式）與手術風險等級.標準住院天數均為1晚。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
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
        price: 14063,
        priceLabel: "痔瘡專項處置",
        displayPrice: "HK$3,125 – $25,000",
        remarks: "✓ 痔瘡術式类别（传统切除术/RBL胶圈套扎/库克一次性套扎/硬化剂注射）與手術風險等級。属于同台手術加项。標準住院天數为0至1晚。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
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
      thyroid_surgery: {
      szufh: {
        price: 57063,
        priceLabel: "甲狀腺處置手術",
        displayPrice: "HK$4,750 – $109,375",
        remarks: "✓ 手術術式（超聲引导下穿刺活检/次全切除/全切除术）與手術風險等級。標準住院天數为日間至3晚。",
        link: "https://www.szufh.hk/shoushusf.html"
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
      port_a_cath: {
      szufh: {
        price: 29563,
        priceLabel: "輸液港手術",
        displayPrice: "HK$12,250 – $46,875",
        remarks: "✓ 处置形式（置入/取出）与麻醉形式（局部麻醉/監測麻醉/全身麻醉）及手術風險等級。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        price: 19250,
        priceLabel: "乳腺抽針及旋切活檢",
        displayPrice: "HK$3,500 – $35,000",
        remarks: "✓ 術式类别（细针FNA/粗针CNB/旋切VAB）、进刀口与结节增项数量、單雙側以及麻醉。",
        link: "https://www.szufh.hk/shoushusf.html"
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
      breast_surgery: {
      szufh: {
        price: 80000,
        priceLabel: "乳腺外科手術",
        displayPrice: "HK$35,000 – $125,000",
        remarks: "✓ 手術路径复杂程度（單雙側肿块切除/部分切除+前哨活检/乳腺癌根治术）與手術風險等級。標準住院天數为日間至5晚。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        price: 122120,
        priceLabel: "乳房腫塊/腫瘤切除術",
        displayPrice: "HK$48,200 – $196,040",
        remarks: "⚠️ 切除範圍(單個或多個腫塊/部分/全乳/根治性)、單雙邊、是否附加冷凍切片/前哨結活檢/腋下淋巴廓清術，與手術風險等級。",
        link: "https://gleneagles.hk/tc/patient-care-services/general-surgery"
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
      }
    },
    imaging: {
      gastroscopy: {
      szufh: {
        price: 7563,
        priceLabel: "無痛胃鏡健康檢查 (監察麻醉)",
        displayPrice: "HK$6,000 – $9,125",
        remarks: "✓ 住院休养形式（標準日間操作/PRO精英版1天不过夜/PRO休養版入住1晚）。不含超出套餐外的病理活检及息肉切除。套餐包含全额胃镜检查费、麻醉及医生费。",
        link: "https://www.szufh.hk/xiaohuaneijing.html",
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
        price: 9999999,
        remarks: "定額內窺鏡資料整理中。"
      },

      sth: {
        price: 6950,
        priceLabel: "日間程序普通房常規區間",
        displayPrice: "HK$6,100 – $7,800",
        remarks: "⚠️ 雜費風險：人流量大，切除活檢費與耗材另計。",
        tags: ["九龍核心"]
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
        price: 5800,
        priceLabel: "日間大房基準套餐價",
        displayPrice: "HK$5,800",
        remarks: "✓ 全港最低參考價：性價比極高，標準計劃基本全覆蓋。",
        tags: ["常規體檢首選"]
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
      colonoscopy: {
      szufh: {
        price: 8438,
        priceLabel: "無痛腸鏡健康檢查 (監察麻醉)",
        displayPrice: "HK$6,875 – $10,000",
        remarks: "✓ 住院休养形式（標準日間操作/PRO精英版1天不过夜/PRO休養版入住1晚）。不含超出套餐外的病理活检及息肉切除。套餐包含全额肠镜检查费、麻醉及医生费。",
        link: "https://www.szufh.hk/xiaohuaneijing.html",
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
        price: 10938,
        priceLabel: "無痛胃腸鏡健康檢查 (雙鏡聯合)",
        displayPrice: "HK$9,375 – $12,500",
        remarks: "✓ 住院休养形式（標準日間操作/PRO精英版1天不过夜/PRO休養版入住1晚）。不含超出套餐外的病理活检及息肉切除。专为双镜联合设计的套餐。",
        link: "https://www.szufh.hk/xiaohuaneijing.html",
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
          remarks: "CT 腦部掃描資料整理中。"
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
          remarks: "CT 腦部掃描資料整理中。"
        },
        matilda: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
        },
        sth: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
        },
        baptist: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
        },
        union: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
        },
        canossa: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
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
          remarks: "CT 腦部掃描資料整理中。"
        },
        twah: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
        },
        hkah: {
          price: 9999999,
          remarks: "CT 腦部掃描資料整理中。"
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
          remarks: "MRI 腦部掃描資料整理中。"
        },
        matilda: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        sth: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        baptist: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        union: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        canossa: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        sph: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
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
          remarks: "MRI 腦部掃描資料整理中。"
        },
        twah: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
        },
        hkah: {
          price: 9999999,
          remarks: "MRI 腦部掃描資料整理中。"
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
        price: 25625,
        priceLabel: "子宮頸病變治療手術",
        displayPrice: "HK$7,500 – $43,750",
        remarks: "✓ 手術具体術式（锥切/LEEP/環紮/射频治疗）以及麻醉形式（局部麻醉/監測麻醉）。包括全包医院费、麻醉及医生费。"
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
        price: 28125,
        priceLabel: "子宮鏡診治手術",
        displayPrice: "HK$25,000 – $31,250",
        remarks: "✓ 手術風險等級（一般風險/中等風險）。项目包含子宫镜下的活组织检查、息肉切除、纵隔切除、黏连分离及异物取出。"
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
      myomectomy: {
      szufh: {
        price: 64375,
        priceLabel: "子宮肌瘤切除術",
        displayPrice: "HK$35,000 – $93,750",
        remarks: "✓ 手術路径形式（子宮鏡/腹腔鏡/開放式）與手術風險等級。標準住院天數为日間至3晚。"
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
      hysterectomy: {
      szufh: {
        price: 101563,
        priceLabel: "子宮切除術",
        displayPrice: "HK$81,250 – $121,875",
        remarks: "✓ 手術術式（常規腹腔鏡/LAVH輔助/開放式）與手術風險等級。標準住院天數均為3晚。"
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
      tubal_ectopic: {
      szufh: {
        price: 42063,
        priceLabel: "輸卵管及宮外孕手術",
        displayPrice: "HK$6,000 – $78,125",
        remarks: "✓ 具体手術项目（超聲输卵管造影/腹腔镜结扎术/切开取胚/宫外孕切除）與手術風險等級。標準住院天數为日間至1晚。"
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
        price: 74219,
        priceLabel: "卵巢囊腫切除術",
        displayPrice: "HK$62,500 – $85,938",
        remarks: "✓ 切除手術范围（腹腔鏡單側/雙側/開放式）與手術風險等級。標準住院天數均為3晚。"
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
      contraception: {
      szufh: {
        price: 12500,
        priceLabel: "避孕及終止妊娠",
        displayPrice: "HK$2,500 – $22,500",
        remarks: "✓ 具体处置项目（普通或Mirena子宫环置入/取出、皮下避孕剂置入/取出、终止妊娠子宫扩刮术）。均在日間操作完成。"
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
      }
    },
    orthopedics: {
      knee_replacement: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
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
        price: 9999999,
        remarks: "骨科手術資料整理中。"
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
      hip_replacement: {
      szufh: {
        price: 9999999,
        remarks: "骨科手術資料整理中。"
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
        price: 110625,
        priceLabel: "人工關節置換術",
        displayPrice: "HK$52,500 – $168,750",
        remarks: "✓ 手術部位及形式（全膝/單髁/机械臂辅助CORI/全髋陶瓷對陶瓷/陶瓷對聚乙烯）、指定耗材品牌选项以及手術風險等級。標準住院天數为5至6晚。"
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
        price: 200313,
        priceLabel: "脊柱手術",
        displayPrice: "HK$135,000 – $265,625",
        remarks: "✓ 手術術式（腰椎減壓融合/頸椎前路融合ACDF/人工椎間盤ADR/UBE鏡下減壓術）、是否屬於【集採】渠道耗材以及手術風險等級。標準住院天數為3至6晚。"
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
        price: 75813,
        priceLabel: "骨科小手術及運動醫學",
        displayPrice: "HK$11,000 – $140,625",
        remarks: "✓ 手術術式（肿块切除/腱鞘囊腫/冰凍肩松解/交叉韌帶重建/半月板成形修復/踝关节韌帶修补）与复杂程度及手術風險等級。標準住院天數为日間至4晚。"
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
      }
    },
    cardiology: {
      angiography: {
      szufh: {
        price: 9999999,
        remarks: "心臟導管造影資料整理中。"
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
        price: 60000,
        priceLabel: "冠狀動脈造影及支架置入 (PCI)",
        displayPrice: "HK$27,500 – $92,500",
        remarks: "✓ 手術路径術式（單純造影日間/造影住院1晚/PCI造影+支架置入2晚）以及是否每增加一个支架（增项基准单价+20000）。"
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
        price: 24813,
        priceLabel: "白內障超聲乳化晶體植入",
        displayPrice: "HK$9,000 – $40,625",
        remarks: "✓ 人工晶体級別选择（單焦距/雙焦距/EDOF/三焦距非散光）、玻璃体注药术以及手術風險等級。均在局部麻醉下日間操作完成。",
        link: "https://www.szufh.hk/shoushusf.html"
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
      },
      strabismus: {
      szufh: {
        price: 29688,
        priceLabel: "斜視手術",
        displayPrice: "HK$25,000 – $34,375",
        remarks: "✓ 矫正眼外肌数量（1条水平肌/2条水平肌）與手術風險等級().均在全身麻醉下日間完成。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
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
      micro_laryngoscopy: {
      szufh: {
        price: 9999999,
        remarks: "耳鼻喉科手術資料整理中。"
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
      adenoid_tonsil: {
      szufh: {
        price: 41125,
        priceLabel: "腺樣體及扁桃體手術",
        displayPrice: "HK$31,000 – $51,250",
        remarks: "✓ 手術具体类别（内窥镜单切腺样体/常規扁桃体切除/腺样体+扁桃体同台复合术）與手術風險等級。均在日間手術室完成。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        price: 76563,
        priceLabel: "鼻竇炎及鼻中隔手術",
        displayPrice: "HK$43,750 – $109,375",
        remarks: "✓ 手術复杂程度（功能性内窥镜FESS不伴鼻息肉/伴息肉切除/鼻中隔矫正/功能复合术业务）與手術風險等級。標準住院天數为2至3晚。",
        link: "https://www.szufh.hk/shoushusf.html"
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
      tympanoplasty: {
      szufh: {
        price: 32500,
        priceLabel: "鼓膜修補及顯微喉鏡",
        displayPrice: "HK$27,500 – $37,500",
        remarks: "✓ 具体手術術式（常規鼓膜修补/显微喉镜检查+/-活组织检查）。注：针对未标注中等風險项，依照全局常規1.25倍系数拉齐极值区间。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        price: 174125,
        priceLabel: "疼痛管理 (神經阻滯/射頻等)",
        displayPrice: "HK$4,500 – $343,750",
        remarks: "✓ 处置类别（超聲引导阻滞/手術室神经造影/射频治疗/三叉神经球囊压迫/鞘内镇痛泵植入）與手術風險等級。標準住院天數为日間至5晚。"
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
        displayPrice: "HK$40,000 – $50,000",
        remarks: "✓ 手術風險等級（一般風險/中等風險）。均在監測麻醉（MAC）下日間進行。"
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
        price: 48438,
        priceLabel: "脊髓電刺激植入術",
        displayPrice: "HK$37,500 – $59,375",
        remarks: "✓ 植入分期阶段（第一期测试阶段3晚 / 第二期永久植入1晚）與手術風險等級。"
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
        price: 4625,
        priceLabel: "急症/整形外科縫合套餐",
        displayPrice: "HK$3,000 – $6,250",
        remarks: "✓ 伤口长度跨度与缝合材料（小于2cm / 2-4cm / 4-8cm / 4cm以内组织胶水缝合）與手術風險等級。均在日間操作完成。"
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
        link: "https://www.szufh.hk/shoushusf.html",
        price: 66407,
        priceLabel: "前列腺診療手術",
        displayPrice: "HK$31,250 – $101,563",
        remarks: "✓ 手術術式（MRI-超聲融合活检/Rezum热蒸汽消融/Urolift悬扩/TURP电切/HoLEP铥激光剜除）與手術風險等級。標準住院天數为日間至3晚。"
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
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
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
      kidney_stone: {
      szufh: {
        link: "https://www.szufh.hk/shoushusf.html",
        price: 51563,
        priceLabel: "泌尿系結石碎石手術",
        displayPrice: "HK$12,500 – $90,625",
        remarks: "✓ 手術形式（输尿管硬镜/软镜铥激光碎石术、硬镜/软镜双J管拔除）與手術風險等級。均在日間手術室完成。"
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
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
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
        link: "https://www.szufh.hk/shoushusf.html",
        price: 14063,
        priceLabel: "尿動力及膀胱鏡檢查",
        displayPrice: "HK$9,375 – $18,750",
        remarks: "✓ 项目类别（常規尿动力学套餐/膀胱尿道镜）與手術風險等級。"
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
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
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
      andrology: {
      szufh: {
        link: "https://www.szufh.hk/shoushusf.html",
        price: 15625,
        priceLabel: "男科處置手術",
        displayPrice: "HK$6,250 – $25,000",
        remarks: "✓ 手術術式（输精管切除术/传统/套环/吻合器包皮枪）与麻醉形式及年龄段（局麻/全麻、儿童/成人/新生儿）與手術風險等級。"
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
        price: 9999999,
        remarks: "泌尿外科手術資料整理中。"
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
      }
    },
    urology: {
      prostate: {
      szufh: {
        price: 66407,
        priceLabel: "前列腺診療手術",
        displayPrice: "HK$31,250 – $101,563",
        remarks: "✓ 手術術式（MRI-超聲融合活检/Rezum热蒸汽消融/Urolift悬扩/TURP电切/HoLEP铥激光剜除）與手術風險等級。標準住院天數为日間至3晚。",
        link: "https://www.szufh.hk/shoushusf.html"
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
      kidney_stone: {
      szufh: {
        price: 51563,
        priceLabel: "泌尿系結石碎石手術",
        displayPrice: "HK$12,500 – $90,625",
        remarks: "✓ 手術形式（输尿管硬镜/软镜铥激光碎石术、硬镜/软镜双J管拔除）與手術風險等級。均在日間手術室完成。",
        link: "https://www.szufh.hk/shoushusf.html"
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
        price: 14063,
        priceLabel: "尿動力及膀胱鏡檢查",
        displayPrice: "HK$9,375 – $18,750",
        remarks: "✓ 项目类别（常規尿动力学套餐/膀胱尿道镜）與手術風險等級。",
        link: "https://www.szufh.hk/shoushusf.html"
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
      andrology: {
      szufh: {
        price: 15625,
        priceLabel: "男科處置手術",
        displayPrice: "HK$6,250 – $25,000",
        remarks: "✓ 手術術式（输精管切除术/传统/套环/吻合器包皮枪）与麻醉形式及年龄段（局麻/全麻、儿童/成人/新生儿）與手術風險等級。",
        link: "https://www.szufh.hk/shoushusf.html"
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
