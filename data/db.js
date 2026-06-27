/**
 * MedicalPrice V2.0 — 全局醫療數據底層
 * 14 家醫院 × 門診 / 病房模組統一數據源
 */
const globalMedicalData = {
  version: '2.0',
  lastUpdated: '2026-06',

  hospitalOrder: [
    'szufh', 'cuhk', 'hksh', 'ghk', 'matilda', 'sth', 'baptist',
    'union', 'canossa', 'sph', 'pbh', 'evangel', 'twah', 'hkah'
  ],

  hospitals: {
    szufh: {
      name: '深圳新風和睦家',
      link: 'https://www.szufh.hk/',
      tag: '高透明度',
      waitTime: '<15分',
      score: '4.8',
      alert: false
    },
    cuhk: {
      name: '香港中文大學醫院',
      link: 'https://www.cuhkmc.hk/',
      tag: '',
      waitTime: '15-30分',
      score: '4.5',
      alert: false
    },
    hksh: {
      name: '養和醫院 (HKSH)',
      link: 'https://www.hksh-hospital.com/',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    ghk: {
      name: '港怡醫院 (GHK)',
      link: 'https://gleneagles.hk/',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    matilda: {
      name: '明德國際醫院',
      link: 'https://www.matilda.org/',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    sth: {
      name: '聖德肋撒醫院 (法國)',
      link: 'http://www.sth.org.hk/',
      tag: '',
      waitTime: '40-80分',
      score: '4.1',
      alert: false
    },
    baptist: {
      name: '香港浸信會醫院',
      link: 'https://www.hkbh.org.hk/',
      tag: '',
      waitTime: '45-90分',
      score: '4.0',
      alert: false
    },
    union: {
      name: '仁安醫院',
      link: 'https://www.union.org/',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    canossa: {
      name: '嘉諾撒醫院',
      link: '#',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    sph: {
      name: '聖保祿醫院 (SPH)',
      link: 'https://www.stpaul.org.hk/',
      tag: '⚠️ 漏洞條款',
      waitTime: '30-60分',
      score: '4.2',
      alert: true
    },
    pbh: {
      name: '寶血醫院 (PBH)',
      link: 'https://www.pbh.hk/',
      tag: '',
      waitTime: '20-40分',
      score: '3.9',
      alert: false
    },
    evangel: {
      name: '播道醫院',
      link: '#',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    twah: {
      name: '荃灣港安醫院',
      link: '#',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    },
    hkah: {
      name: '香港港安–司徒拔道',
      link: '#',
      tag: '',
      waitTime: '',
      score: '',
      alert: false
    }
  },

  modules: {
    outpatient: {
      szufh: {
        prices: { regular: 635, night: 935, holiday: 935 },
        remarks: '備註：夜診外加RMB300，法定假日外加RMB300（此處已作匯率折算換算）。'
      },
      cuhk: {
        prices: { regular: 600, night: 9999, holiday: 9999 },
        remarks: '備註：常規普通門診基本起步診金為 $600。非辦公時間段安排多需致電預約。'
      },
      hksh: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      ghk: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      matilda: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      sth: {
        prices: { regular: 230, night: 340, holiday: 340 },
        remarks: '備註：常規時間段按08:00-19:59計，夜間及公眾假期加收附加費。'
      },
      baptist: {
        prices: { regular: 400, night: 850, holiday: 850 },
        remarks: '備註：夜診/假日區間為 $700-$1,000，取中間值。遇惡劣天氣收費同假日。'
      },
      union: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      canossa: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      sph: {
        prices: { regular: 280, night: 430, holiday: 410 },
        remarks: '排雷：非當值專科醫生回院應診外加收 $1,000。'
      },
      pbh: {
        prices: { regular: 280, night: 390, holiday: 390 },
        remarks: '備註：週六20:00起及假日計入附加費。'
      },
      evangel: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      twah: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      },
      hkah: {
        prices: { regular: 9999999, night: 9999999, holiday: 9999999 },
        remarks: '數據核對中。'
      }
    },

    ward: {
      szufh: {
        prices: { standard: 1558, semiPrivate: 2170, private: 3565 },
        ranges: { standard: '$1,558', semiPrivate: '$2,170', private: '$3,565 – $7,619' }
      },
      cuhk: {
        prices: { standard: 1000, semiPrivate: 1500, private: 3600 },
        ranges: { standard: '$1,000', semiPrivate: '$1,500 – $2,500', private: '$3,600 – $4,800' }
      },
      hksh: {
        prices: { standard: 1300, semiPrivate: 2800, private: 4600 },
        ranges: { standard: '$1,300 – $1,960', semiPrivate: '$2,800 – $3,950', private: '$4,600 – $23,000' }
      },
      ghk: {
        prices: { standard: 980, semiPrivate: 1800, private: 4200 },
        ranges: { standard: '$980 – $1,080', semiPrivate: '$1,800 – $2,700', private: '$4,200 – $10,800' }
      },
      matilda: {
        prices: { standard: 900, semiPrivate: 1990, private: 3300 },
        ranges: { standard: '$900 – $1,100', semiPrivate: '$1,990 – $2,300', private: '$3,300 – $4,500' }
      },
      sth: {
        prices: { standard: 610, semiPrivate: 1000, private: 2100 },
        ranges: { standard: '$610 – $800', semiPrivate: '$1,000 – $1,750', private: '$2,100 – $15,300' }
      },
      baptist: {
        prices: { standard: 820, semiPrivate: 1810, private: 3500 },
        ranges: { standard: '$820 – $1,240', semiPrivate: '$1,810 – $2,320', private: '$3,500 – $4,780' }
      },
      union: {
        prices: { standard: 600, semiPrivate: 1080, private: 2500 },
        ranges: { standard: '$600 – $950', semiPrivate: '$1,080 – $2,000', private: '$2,500 – $8,000' }
      },
      canossa: {
        prices: { standard: 800, semiPrivate: 2600, private: 4200 },
        ranges: { standard: '$800 – $1,100', semiPrivate: '$2,600', private: '$4,200' }
      },
      sph: {
        prices: { standard: 9999999, semiPrivate: 9999999, private: 9999999 },
        ranges: { standard: 'Coming Soon', semiPrivate: 'Coming Soon', private: 'Coming Soon' }
      },
      pbh: {
        prices: { standard: 9999999, semiPrivate: 9999999, private: 9999999 },
        ranges: { standard: 'Coming Soon', semiPrivate: 'Coming Soon', private: 'Coming Soon' }
      },
      evangel: {
        prices: { standard: 9999999, semiPrivate: 9999999, private: 9999999 },
        ranges: { standard: 'Coming Soon', semiPrivate: 'Coming Soon', private: 'Coming Soon' }
      },
      twah: {
        prices: { standard: 9999999, semiPrivate: 9999999, private: 9999999 },
        ranges: { standard: 'Coming Soon', semiPrivate: 'Coming Soon', private: 'Coming Soon' }
      },
      hkah: {
        prices: { standard: 9999999, semiPrivate: 9999999, private: 9999999 },
        ranges: { standard: 'Coming Soon', semiPrivate: 'Coming Soon', private: 'Coming Soon' }
      }
    }
  }
};

/** 按全局順序返回醫院列表（含 id） */
function getOrderedHospitals() {
  return globalMedicalData.hospitalOrder.map(function (id) {
    return Object.assign({ id: id }, globalMedicalData.hospitals[id]);
  });
}

/** 取得指定模組的醫院數據陣列（門診頁面渲染用） */
function getModuleHospitalList(moduleName) {
  var mod = globalMedicalData.modules[moduleName] || {};
  return globalMedicalData.hospitalOrder
    .filter(function (id) { return mod[id]; })
    .map(function (id) {
      var meta = globalMedicalData.hospitals[id];
      var data = mod[id];
      return Object.assign({ id: id }, meta, data);
    });
}
