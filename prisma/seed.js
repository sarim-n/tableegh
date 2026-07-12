const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const initialEvents = [
  {
    titleEn: "Annual Raiwind Ijtema",
    titleUr: "سالانہ رائیونڈ اجتماع",
    date: "2026-11-07",
    endDate: "2026-11-09",
    time: "After Fajr",
    locationEn: "Raiwind Markaz, Lahore, Pakistan",
    locationUr: "رائیونڈ مرکز، لاہور، پاکستان",
    category: "ijtema",
    descriptionEn: "The annual three-day Ijtema at Raiwind Markaz, one of the largest gatherings of Muslims in the world. Thousands of participants join for collective Dawah, prayers, and spiritual rejuvenation.",
    descriptionUr: "رائیونڈ مرکز میں سالانہ تین روزہ اجتماع، دنیا کے سب سے بڑے مسلم اجتماعات میں سے ایک۔ ہزاروں شرکاء اجتماعی دعوت، نماز اور روحانی تجدید کے لیے شامل ہوتے ہیں۔"
  },
  {
    titleEn: "Weekly Thursday Bayan",
    titleUr: "ہفتہ وار جمعرات بیان",
    date: "2026-08-14",
    time: "After Maghrib",
    locationEn: "Nizamuddin Markaz, Delhi, India",
    locationUr: "نظام الدین مرکز، دہلی، بھارت",
    category: "bayan",
    descriptionEn: "Weekly gathering featuring a bayan (discourse) by visiting scholars on topics of faith, practice, and self-reformation.",
    descriptionUr: "مہمان علماء کی جانب سے ایمان، عمل اور خود اصلاحی کے موضوعات پر بیان کے ساتھ ہفتہ وار اجتماع۔"
  },
  {
    titleEn: "Regional Mashwara Meeting",
    titleUr: "علاقائی مشورہ میٹنگ",
    date: "2026-08-20",
    time: "After Asr",
    locationEn: "Dewsbury Markaz, UK",
    locationUr: "ڈیوزبری مرکز، برطانیہ",
    category: "mashwara",
    descriptionEn: "Regional consultation meeting to plan upcoming Jamaat departures and discuss community needs and programs.",
    descriptionUr: "آنے والی جماعتوں کی روانگی کی منصوبہ بندی اور کمیونٹی کی ضروریات اور پروگراموں پر بات چیت کے لیے علاقائی مشاورتی میٹنگ۔"
  },
  {
    titleEn: "Local Gasht Program",
    titleUr: "مقامی گشت پروگرام",
    date: "2026-08-10",
    time: "After Zuhr",
    locationEn: "Local Mosques, Citywide",
    locationUr: "مقامی مساجد، شہر بھر میں",
    category: "gasht",
    descriptionEn: "Door-to-door visits in the local community to invite people to the Masjid for prayers and programs.",
    descriptionUr: "مقامی کمیونٹی میں گھر گھر جا کر لوگوں کو مسجد میں نماز اور پروگراموں کے لیے دعوت دینا۔"
  },
  {
    titleEn: "International Tongi Biswa Ijtema",
    titleUr: "بین الاقوامی ٹونگی بشوا اجتماع",
    date: "2027-01-15",
    endDate: "2027-01-18",
    time: "All Day",
    locationEn: "Tongi, Dhaka, Bangladesh",
    locationUr: "ٹونگی، ڈھاکا، بنگلہ دیش",
    category: "ijtema",
    descriptionEn: "The Biswa Ijtema in Tongi is one of the largest annual gatherings of Muslims, drawing millions of participants from around the world.",
    descriptionUr: "ٹونگی کا بشوا اجتماع مسلمانوں کے سب سے بڑے سالانہ اجتماعات میں سے ایک ہے، جس میں دنیا بھر سے لاکھوں شرکاء آتے ہیں۔"
  },
  {
    titleEn: "Youth Dawah Workshop",
    titleUr: "نوجوانوں کی دعوت ورکشاپ",
    date: "2026-09-05",
    time: "After Isha",
    locationEn: "Chicago Markaz, USA",
    locationUr: "شکاگو مرکز، امریکہ",
    category: "bayan",
    descriptionEn: "A special workshop for young Muslims to learn the etiquettes and methods of Dawah in contemporary society.",
    descriptionUr: "نوجوان مسلمانوں کے لیے عصری معاشرے میں دعوت کے آداب اور طریقے سیکھنے کی خصوصی ورکشاپ۔"
  }
];

const initialResources = [
  {
    titleEn: "The Virtues of Tabligh",
    titleUr: "تبلیغ کی فضیلت",
    type: "article",
    category: "dawah",
    descriptionEn: "An in-depth article exploring the Quranic and Hadith foundations of Dawah and the importance of inviting others to the path of Allah.",
    descriptionUr: "دعوت کی قرآنی اور حدیث کی بنیادوں اور دوسروں کو اللہ کی راہ کی طرف بلانے کی اہمیت پر ایک تفصیلی مضمون۔",
    author: "Maulana Muhammad Yusuf Kandhlawi",
    date: "2024-03-15",
    link: "https://example.com/virtues-of-tabligh.pdf"
  },
  {
    titleEn: "Six Points of Tabligh Explained",
    titleUr: "تبلیغ کے چھ نکات کی وضاحت",
    type: "audio",
    category: "education",
    descriptionEn: "A comprehensive audio lecture explaining the six fundamental points of Tabligh and their practical application in daily life.",
    descriptionUr: "تبلیغ کے چھ بنیادی نکات اور روزمرہ زندگی میں ان کے عملی اطلاق کی وضاحت کرنے والا ایک جامع آڈیو بیان۔",
    author: "Maulana Tariq Jameel",
    duration: "45 min",
    date: "2024-06-20",
    link: "https://example.com/six-points.mp3"
  },
  {
    titleEn: "Fazail-e-Amaal: Virtues of Good Deeds",
    titleUr: "فضائل اعمال",
    type: "book",
    category: "literature",
    descriptionEn: "The foundational text of the Tablighi Jamaat movement, compiled by Maulana Muhammad Zakariya Kandhlawi, containing Hadith on virtues of various acts of worship.",
    descriptionUr: "تبلیغی جماعت کی تحریک کی بنیادی کتاب، جو مولانا محمد زکریا کاندھلوی نے مرتب کی، جس میں مختلف عبادات کی فضیلت پر احادیث ہیں۔",
    author: "Maulana Muhammad Zakariya Kandhlawi",
    date: "2023-01-01",
    link: "https://example.com/fazail-e-amaal.pdf"
  },
  {
    titleEn: "Journey of a Jamaat: Documentary",
    titleUr: "جماعت کا سفر: دستاویزی",
    type: "video",
    category: "dawah",
    descriptionEn: "A moving documentary following a group of Tablighis on their 40-day journey, showcasing the transformative power of Dawah.",
    descriptionUr: "تبلیغیوں کے ایک گروپ کی ۴۰ روزہ سفر کی ایک متاثر کن دستاویزی فلم، جو دعوت کی تبدیلی کی طاقت کو ظاہر کرتی ہے۔",
    duration: "28 min",
    date: "2024-09-10",
    link: "https://youtube.com/watch?v=example"
  },
  {
    titleEn: "The Importance of Salah",
    titleUr: "نماز کی اہمیت",
    type: "article",
    category: "education",
    descriptionEn: "Understanding the significance of prayer in Islam and its role as the pillar of faith, with practical guidance on improving concentration.",
    descriptionUr: "اسلام میں نماز کی اہمیت اور ایمان کے ستون کے طور پر اس کے کردار کو سمجھنا، توجہ بہتر بنانے کے لیے عملی رہنمائی کے ساتھ۔",
    author: "Maulana Saad Kandhlawi",
    date: "2024-11-05",
    link: "https://example.com/importance-of-salah.pdf"
  },
  {
    titleEn: "Stories of the Sahaba",
    titleUr: "صحابہ کے قصے",
    type: "audio",
    category: "education",
    descriptionEn: "Inspiring stories from the lives of the companions of the Prophet Muhammad ﷺ and the lessons we can learn from them.",
    descriptionUr: "نبی محمد ﷺ کے صحابہ کی زندگیوں سے متاثر کن قصے اور ان سے ہم کیا سبق سیکھ سکتے ہیں۔",
    author: "Maulana Tariq Jameel",
    duration: "60 min",
    date: "2024-07-22",
    link: "https://example.com/stories-of-sahaba.mp3"
  }
];

async function main() {
  console.log("Seeding database...");

  // Clean old data
  await prisma.event.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.create({
    data: {
      username: adminUsername,
      passwordHash: passwordHash
    }
  });
  console.log(`Created admin user: ${admin.username}`);

  // Create events
  for (const event of initialEvents) {
    await prisma.event.create({ data: event });
  }
  console.log(`Seeded ${initialEvents.length} events.`);

  // Create resources
  for (const resource of initialResources) {
    await prisma.resource.create({ data: resource });
  }
  console.log(`Seeded ${initialResources.length} resources.`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
