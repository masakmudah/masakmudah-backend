export const generateDescription = () => {
  const description = [
    "Yang kamu butuhkan hanyalah cinta. Tapi, sedikit cokelat sekarang dan nanti, tidak ada salahnya. - Charles M. Schulz",
    "Hanya ada tiga hal yang dibutuhkan wanita dalam hidup: makanan, air, dan pujian. - Chris Rock",
    "Humor membuat kita tetap hidup. Humor dan makanan. Jangan lupakan makanan. Kamu bisa pergi seminggu tanpa tertawa, tapi tidak tanpa makanan. - Joss Whedon",
    "Jangan tanya apa yang dapat kamu lakukan untuk negaramu. Tanyakan apa untuk makan siang. - Orson Welles",
    "Diet kamu adalah rekening bank. Pilihan makanan yang baik adalah investasi yang baik. - Bethenny Frankel",
    "Makanan adalah bentuk kenyamanan paling primitif. - Sheila Graham",
    "Dia yang makan sendirian, tersedak sendirian. - Pepatah Arab",
    "Orang yang suka makan selalu orang terbaik. - Julia Child",
    "Makanan enak pasti diakhiri dengan pembicaraan yang baik. - Geoffrey Neighor",
    "Tidak ada cinta yang lebih tulus daripada cinta makanan. - George Bernard Shaw",
    "Semua yang Anda lihat, saya berutang pada spaghetti. - Sophia Loren",
    "Es krim sangat indah. Sayang sekali itu tidak ilegal. - Voltaire",
    "Hidup tidak pasti. Makan makanan penutup dulu. - Ernestine Ulmer",
  ];

  const index = Math.floor(Math.random() * description.length);
  return description[index];
};
