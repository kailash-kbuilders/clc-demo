import type { Pair } from '../i18n/LangContext'

/** Institute details - change everything here. */
export const CONFIG = {
  phone: '919571949387',
  phoneShow: '95719 49387',
  coords: '25.737621,71.403307',
  mapQuery: '25.737621,71.403307',
  address: [
    'CLC Sansthan, Shastri Nagar, Barmer, Rajasthan 344001',
    'CLC संस्थान, शास्त्री नगर, बाड़मेर, राजस्थान 344001',
  ] as Pair,
  social: {
    instagram: 'https://www.instagram.com/clcbarmer',
    youtube: 'https://youtube.com/@clcbarmer?si=BYlHlDdjgQWfMkPV',
    telegram: 'https://t.me/Clcbme',
  },
  siteUrl: 'https://clcbarmer.in',
}

export const NAV: { href: string; id: string; label: Pair }[] = [
  { href: '#exams', id: 'exams', label: ['Exams', 'प्रवेश परीक्षा'] },
  { href: '#results', id: 'results', label: ['Results', 'परिणाम'] },
  { href: '#tests', id: 'tests', label: ['Mega Test', 'मेगा टेस्ट'] },
  { href: '#material', id: 'material', label: ['Study Material', 'अध्ययन सामग्री'] },
  { href: '#about', id: 'about', label: ['About us', 'हमारे बारे में'] },
  { href: '#hostel', id: 'hostel', label: ['Hostel', 'छात्रावास'] },
  { href: '#faq', id: 'faq', label: ['FAQ', 'सवाल-जवाब'] },
  { href: '#contact', id: 'contact', label: ['Contact', 'संपर्क'] },
]

export const HERO: Pair[] = [
  ['Dream big. Work even harder.', 'सपने बड़े देखो, मेहनत उससे बड़ी करो।'],
  ["Today's hard work is tomorrow's success.", 'आज की मेहनत ही कल की सफलता है।'],
  ['Dreams from a village can touch the sky too.', 'गाँव से निकले सपने भी आसमान छूते हैं।'],
]

export const MARQUEE: Pair[] = [
  ['Navodaya Vidyalaya', 'नवोदय विद्यालय'],
  ['Sainik School', 'सैनिक स्कूल'],
  ['Rashtriya Military School', 'राष्ट्रीय मिलिट्री स्कूल'],
  ['Academic classes (Class 3-10)', 'अकादमिक कक्षाएँ (कक्षा 3-10 तक)'],
]

export const COURSES: { t: Pair; g: Pair; d: Pair; q: string }[] = [
  {
    t: ['Navodaya Vidyalaya – Class 6 & 9', 'नवोदय विद्यालय – कक्षा 6 व 9'],
    g: ['Class 6 & 9', 'कक्षा 6 व 9'],
    d: [
      'Preparation for JNVST Class 6 entry and Class 9 lateral entry: maths, reasoning and language.',
      'कक्षा 6 प्रवेश (JNVST) व कक्षा 9 लेटरल एंट्री की तैयारी: गणित, रीज़निंग व भाषा।',
    ],
    q: 'Navodaya Vidyalaya',
  },
  {
    t: ['Sainik School – Class 6 & 9', 'सैनिक स्कूल – कक्षा 6 व 9'],
    g: ['Class 6 & 9', 'कक्षा 6 व 9'],
    d: [
      'Sainik School entrance preparation for Class 6 and Class 9 entry.',
      'सैनिक स्कूल कक्षा 6 व कक्षा 9 प्रवेश की तैयारी।',
    ],
    q: 'Sainik School',
  },
  {
    t: ['Rashtriya Military School – Class 6 & 9', 'राष्ट्रीय मिलिट्री स्कूल – कक्षा 6 व 9'],
    g: ['Class 6 & 9', 'कक्षा 6 व 9'],
    d: [
      'RMS entrance preparation for Class 6 and Class 9 entry.',
      'आर.एम.एस. कक्षा 6 व कक्षा 9 प्रवेश की तैयारी।',
    ],
    q: 'Rashtriya Military School',
  },
  {
    t: ['Balika Sainik Vidyalaya', 'बालिका सैनिक विद्यालय'],
    g: ['Girls', 'बालिकाएँ'],
    d: [
      'Guidance and preparation for Balika Sainik Vidyalaya entrance.',
      'बालिका सैनिक विद्यालय प्रवेश के लिए मार्गदर्शन व तैयारी।',
    ],
    q: 'Balika Sainik Vidyalaya',
  },
  {
    t: ['Foundation batch – Class 3 to 5', 'फाउंडेशन बैच – कक्षा 3 से 5'],
    g: ['Foundation', 'फाउंडेशन'],
    d: [
      'Strong basics in maths, reasoning and reading for younger students.',
      'छोटे विद्यार्थियों के लिए गणित, रीज़निंग व पढ़ने की मज़बूत नींव।',
    ],
    q: 'Foundation (Class 3-5)',
  },
  {
    t: ['Foundation batch – Class 6 to 8', 'फाउंडेशन बैच – कक्षा 6 से 8'],
    g: ['Foundation', 'फाउंडेशन'],
    d: [
      'Concept building and exam readiness for Class 6 to 8.',
      'कक्षा 6 से 8 के लिए कॉन्सेप्ट निर्माण व परीक्षा तैयारी।',
    ],
    q: 'Foundation (Class 6-8)',
  },
]

export const EXAMS: { t: Pair; d: Pair }[] = [
  {
    t: ['Navodaya Vidyalaya (JNVST)', 'नवोदय विद्यालय (JNVST)'],
    d: [
      'Entrance to Class 6 and Class 9 lateral entry. Syllabus, eligibility and dates as per the official notice.',
      'कक्षा 6 व कक्षा 9 लेटरल एंट्री में प्रवेश। सिलेबस, पात्रता व तारीखें आधिकारिक अधिसूचना के अनुसार।',
    ],
  },
  {
    t: ['Sainik School (AISSEE)', 'सैनिक स्कूल (AISSEE)'],
    d: [
      'All India Sainik School Entrance Examination for Class 6 and Class 9.',
      'कक्षा 6 व कक्षा 9 के लिए अखिल भारतीय सैनिक स्कूल प्रवेश परीक्षा।',
    ],
  },
  {
    t: ['Rashtriya Military School (RMS)', 'राष्ट्रीय मिलिट्री स्कूल (RMS)'],
    d: [
      'RMS entrance examination for Class 6 and Class 9.',
      'कक्षा 6 व कक्षा 9 के लिए आर.एम.एस. प्रवेश परीक्षा।',
    ],
  },
  {
    t: ['Balika Sainik Vidyalaya', 'बालिका सैनिक विद्यालय'],
    d: [
      'Entrance guidance and preparation for girls.',
      'बालिकाओं के लिए प्रवेश मार्गदर्शन व तैयारी।',
    ],
  },
  {
    t: ['Academic classes - Class 3 to 10', 'अकादमिक कक्षाएँ - कक्षा 3 से 10 तक'],
    d: [
      'Regular academic classes for Class 3 to 10 - all subjects, school syllabus support and exam practice.',
      'कक्षा 3 से 10 तक की नियमित अकादमिक कक्षाएँ - सभी विषय, स्कूल पाठ्यक्रम का सहयोग व परीक्षा अभ्यास।',
    ],
  },
]

export const RESULTS: { img: string; alt: string; name: Pair; detail: Pair; score?: boolean }[] = [
  {
    img: '/img/result-dimple.jpg',
    alt: 'Dimple - Rashtriya Military School selection',
    name: ['Dimple', 'डिंपल'],
    detail: ['Rashtriya Military School (Rajasthan)', 'राष्ट्रीय मिलिट्री स्कूल (राजस्थान)'],
  },
  {
    img: '/img/result-krishna.jpg',
    alt: 'Krishna Kumar - Navodaya Vidyalaya class 6 selection',
    name: ['Krishna Kumar', 'कृष्ण कुमार'],
    detail: ['Navodaya Vidyalaya, Class 6', 'नवोदय विद्यालय, कक्षा 6'],
  },
  {
    img: '/img/result-khushi.jpg',
    alt: 'Khushi Choudhary 265/300 Sainik School',
    name: ['Khushi Choudhary', 'खुशी चौधरी'],
    detail: ['265/300', '265/300'],
    score: true,
  },
  {
    img: '/img/result-manpreet.jpg',
    alt: 'Manpreet Singh 251/300 Sainik School',
    name: ['Manpreet Singh', 'मनप्रीत सिंह'],
    detail: ['251/300', '251/300'],
    score: true,
  },
]

/** Study material - PDFs live in /public/pdf and open as normal links. */
export const MATERIAL: { t: Pair; k: Pair; file: string }[] = [
  {
    t: ['Environmental Studies – important questions', 'पर्यावरण अध्ययन – महत्वपूर्ण प्रश्न'],
    k: ['PDF • 26 pages • Hindi', 'PDF • 26 पेज • हिंदी'],
    file: '/pdf/parayavaran-adhyayan-prashn.pdf',
  },
  {
    t: ['Navodaya model paper 2027 (Hindi)', 'नवोदय मॉडल पेपर 2027 (हिंदी)'],
    k: ['PDF • 16 pages • Hindi', 'PDF • 16 पेज • हिंदी'],
    file: '/pdf/jnvst-model-paper-2027-hindi.pdf',
  },
]

export const FAQ: { q: Pair; a: Pair }[] = [
  {
    q: ['How do I take admission?', 'एडमिशन कैसे लें?'],
    a: [
      'Fill the registration form on this page, or contact us on WhatsApp or by call.',
      'इस पेज का रजिस्ट्रेशन फॉर्म भरें या WhatsApp/कॉल से संपर्क करें।',
    ],
  },
  {
    q: ['Which classes are available?', 'कौन-सी कक्षाएँ उपलब्ध हैं?'],
    a: [
      'Mainly Class 6 and Class 9 (Navodaya, Sainik School and Rashtriya Military School), plus foundation batches for Class 3 to 8.',
      'मुख्य रूप से कक्षा 6 व 9 (नवोदय, सैनिक स्कूल एवं राष्ट्रीय मिलिट्री स्कूल), साथ में कक्षा 3 से 8 के फाउंडेशन बैच।',
    ],
  },
  {
    q: ['What does entrance preparation cover?', 'प्रवेश परीक्षा की तैयारी में क्या है?'],
    a: [
      'Navodaya, Sainik School and Rashtriya Military School syllabus - maths, reasoning, language and general knowledge.',
      'नवोदय, सैनिक स्कूल एवं राष्ट्रीय मिलिट्री स्कूल सिलेबस — गणित, रीज़निंग, भाषा व सामान्य ज्ञान।',
    ],
  },
  {
    q: ['What are the fees?', 'फीस कितनी है?'],
    a: ['Please ask the institute on WhatsApp or by call.', 'कृपया WhatsApp या कॉल पर संस्थान से पूछें।'],
  },
  {
    q: ['How is the test series?', 'टेस्ट सीरीज़ कैसी होगी?'],
    a: [
      'Mock tests, subject-wise tests and performance reports.',
      'मॉक टेस्ट, विषयवार टेस्ट और परफॉर्मेंस रिपोर्ट।',
    ],
  },
  {
    q: ['Is study material provided?', 'क्या स्टडी मटेरियल मिलेगा?'],
    a: [
      'Yes - notes, model papers and worksheets are provided to students.',
      'हाँ — विद्यार्थियों को नोट्स, मॉडल पेपर और वर्कशीट दी जाती हैं।',
    ],
  },
]

export const CLASS_OPTIONS = ['Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9']

export const MSG = {
  admission: [
    'Hello, I would like admission details for CLC Barmer.',
    'नमस्ते, मुझे CLC Barmer में एडमिशन की जानकारी चाहिए।',
  ] as Pair,
  mega: [
    'Hello, I would like details about the Mega Test.',
    'नमस्ते, मुझे मेगा टेस्ट की जानकारी चाहिए।',
  ] as Pair,
  tests: [
    'Hello, I would like details about the test series.',
    'नमस्ते, मुझे टेस्ट सीरीज़ की जानकारी चाहिए।',
  ] as Pair,
  general: [
    'Hello, I would like to know more about CLC Barmer.',
    'नमस्ते, मुझे CLC Barmer के बारे में जानकारी चाहिए।',
  ] as Pair,
}

/** Defaults for the two poster blocks on the site (admin can change these). */
export const MEGATEST_DEFAULT = {
  poster: '/img/megatest-poster.jpg',
  title: [
    'Mega Test for Navodaya Vidyalaya entrance',
    'नवोदय विद्यालय प्रवेश के लिए मेगा टेस्ट',
  ] as Pair,
  description: [
    'Date, syllabus and other details are on the poster.',
    'तारीख, पाठ्यक्रम आदि की जानकारी पोस्टर में है।',
  ] as Pair,
  // --- admin controls ---
  hidden: false,
  regOpen: true,
  regFrom: '',
  regTo: '',
  examDate: '',
  reportingTime: '',
  examTime: '',
  centre: 'Career Launcher Classes, Shastri Nagar, Barmer (Raj.)',
  resultDate: '',
}

/** Printed on every admit card. */
export const ADMIT_INSTRUCTIONS: Pair[] = [
  [
    'This admit card must be brought to the exam centre on the day of the test.',
    'इस एडमिट कार्ड को परीक्षा के दिन साथ लाना अनिवार्य है।',
  ],
  [
    'Without the admit card, the candidate will not be allowed to sit for the exam.',
    'बिना एडमिट कार्ड के किसी भी स्थिति में परीक्षा में बैठने की अनुमति नहीं होगी।',
  ],
  [
    'Reach the exam centre 30 minutes before the exam time.',
    'परीक्षा समय से 30 मिनट पहले परीक्षा केंद्र पर पहुँचें।',
  ],
  [
    'Mobile phones, smart watches, calculators or any electronic item are strictly prohibited.',
    'मोबाइल फोन, स्मार्ट वॉच, कैलकुलेटर आदि किसी भी प्रकार की इलेक्ट्रॉनिक वस्तु साथ लाना पूर्णतः वर्जित है।',
  ],
  [
    'Follow the instructions printed on the question paper.',
    'उत्तर पुस्तिका पर दिए गए निर्देशों का पालन करें।',
  ],
  [
    'If unfair means are found, the candidature can be cancelled.',
    'किसी भी प्रकार की अनुचित गतिविधि पाए जाने पर उम्मीदवारी रद्द की जा सकती है।',
  ],
  [
    'For any exam-related information, contact the staff present at the centre.',
    'परीक्षा से संबंधित किसी भी जानकारी के लिए केंद्र पर उपस्थित पर्यवेक्षक से संपर्क करें।',
  ],
  [
    'Please check that all the details printed on this admit card are correct.',
    'एडमिट कार्ड पर छपी जानकारी की पुष्टि अवश्य कर लें।',
  ],
]

export const CATEGORY_OPTIONS = ['General', 'OBC', 'SC', 'ST', 'Other']
export const GENDER_OPTIONS = ['Male', 'Female']

export const TESTSERIES_DEFAULT = {
  poster: '',
  title: ['Test Series', 'टेस्ट सीरीज़'] as Pair,
  description: [
    'Mock tests, subject-wise tests and performance reports — schedule on the poster.',
    'मॉक टेस्ट, विषयवार टेस्ट और परफॉर्मेंस रिपोर्ट — शेड्यूल पोस्टर में।',
  ] as Pair,
}
