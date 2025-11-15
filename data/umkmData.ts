import { UMKM, Category } from '../types';

export const umkmData: UMKM[] = [
  {
    id: 1,
    name: "Sate Khas Senayan",
    category: Category.Drink,
    description: "Kopi penuh sejuta kenangan",
    story: "Berdiri sejak 1974, kami berkomitmen menyajikan sate ayam dan kambing kualitas terbaik dengan resep keluarga yang diwariskan turun-temurun. Setiap tusuk sate adalah cerminan dedikasi kami pada rasa otentik Indonesia.",
    address: "Jl. Pluit Karang Molek XVI No.32-36, RT.6/RW.2, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450",
    location: { lat: -6.237, lng: 106.789 },
    photos: [
      "https://lh3.googleusercontent.com/gps-cs/AHvCnQyMW0weIyCkarpJG4zp6vNGP3MsBjY1joT2FRmI7akqEamaS_pGLfs5cPHy-SBuCTtcjxz2ONpgGDO-72Mw7jrMTNC_Fp0Nm03ljXLQtNKPSR0WcVMdDmahKj5rpcb9ngPYw2hO=w600-h485-p-k-no",
      "https://lh3.googleusercontent.com/gps-cs/AHvCnQwnEHOBy5rp8ti6Po9ZmqKz3IdHUf5Z0JaoNnXMjGuDPW2IqmwjMejVoFpePSU3vPQOi_hIWiGEoM11Ib3qQX2F6tHka3aXD3LWdttA6lH61Z90KTOtGVLmoDmnhi10Z9CbwAxOkQ=w600-h485-p-k-no",
      "https://picsum.photos/seed/sate3/800/600",
      "https://picsum.photos/seed/sate4/800/600"
    ],
    rating: 4.8,
    operatingHours: "08:00 - 22:00",
    contact: {
      phone: "085213085554",
      website: "https://satekhassenayan.com"
    },
    reviews: [
      { id: "1", author: "Budi", rating: 5, comment: "Sate kambingnya juara! Bumbunya meresap sempurna.", date: "2023-10-15" },
      { id: "2", author: "Citra", rating: 4, comment: "Tempatnya nyaman buat kumpul keluarga, sate ayamnya enak.", date: "2023-10-12" }
    ],
    priceRange: { min: 4000, max: 10000 },
    tags: ["Makan di Tempat", "Bawa Pulang", "Keluarga"]
  },
  {
    id: 2,
    name: "Kopi Kenangan Jiwa",
    category: Category.Drink,
    description: "Kopi susu kekinian favorit anak muda.",
    story: "Dari garasi kecil, Kopi Kenangan Jiwa lahir dari mimpi untuk membuat kopi berkualitas terjangkau bagi semua. Kami menggunakan biji kopi lokal pilihan dan susu segar untuk menciptakan rasa yang tak terlupakan.",
    address: "Jl. Jenderal Sudirman No.Kav. 52-53, Jakarta Selatan",
    location: { lat: -6.225, lng: 106.808 },
    photos: [
      "https://picsum.photos/seed/kopi1/800/600",
      "https://picsum.photos/seed/kopi2/800/600",
      "https://picsum.photos/seed/kopi3/800/600"
    ],
    rating: 4.6,
    operatingHours: "08:00 - 21:00",
    contact: {
      phone: "0812-1234-5678",
      website: "https://kopikenangan.com"
    },
    reviews: [
      { id: "1", author: "Rian", rating: 5, comment: "Kopi Susu Gula Arennya mantap, selalu jadi pilihan.", date: "2023-11-01" },
      { id: "2", author: "Dina", rating: 4, comment: "Pelayanannya cepat, cocok buat yang buru-buru.", date: "2023-10-28" }
    ],
    priceRange: { min: 18000, max: 40000 },
    tags: ["Wi-Fi Gratis", "Grab & Go", "Kopi Lokal"]
  },
  {
    id: 3,
    name: "Bengkel Motor Pak Budi",
    category: Category.Service,
    description: "Solusi perbaikan motor cepat dan terpercaya.",
    story: "Pak Budi, seorang montir berpengalaman lebih dari 20 tahun, membuka bengkel ini untuk memberikan pelayanan jujur dan berkualitas. Kepuasan pelanggan adalah prioritas utama kami.",
    address: "Jl. Otista Raya No.10, Jakarta Timur",
    location: { lat: -6.239, lng: 106.868 },
    photos: [
      "https://picsum.photos/seed/bengkel1/800/600",
      "https://picsum.photos/seed/bengkel2/800/600"
    ],
    rating: 4.9,
    operatingHours: "08:00 - 17:00",
    contact: {
      phone: "0815-8765-4321"
    },
    reviews: [
      { id: "1", author: "Agus", rating: 5, comment: "Pak Budi sangat jujur dan pengerjaannya rapi. Sangat direkomendasikan!", date: "2023-09-20" }
    ],
    priceRange: { min: 50000, max: 250000 },
    tags: ["Servis Rutin", "Ganti Oli", "Tambal Ban"]
  },
  {
    id: 4,
    name: "Bakso Lapangan Tembak",
    category: Category.Food,
    description: "Bakso urat dan kuah kaldu yang menggugah selera.",
    story: "Awalnya dijual dengan gerobak di sekitar lapangan tembak, bakso kami menjadi terkenal karena rasa kuah kaldunya yang kaya rempah dan bakso uratnya yang kenyal. Kini, kami hadir untuk memanjakan lidah Anda.",
    address: "Jl. Asia Afrika No.19, Jakarta Pusat",
    location: { lat: -6.223, lng: 106.804 },
    photos: [
      "https://picsum.photos/seed/bakso1/800/600",
      "https://picsum.photos/seed/bakso2/800/600",
      "https://picsum.photos/seed/bakso3/800/600"
    ],
    rating: 4.5,
    operatingHours: "11:00 - 21:30",
    contact: {
      phone: "021-5790-0100"
    },
    reviews: [
        { id: "1", author: "Hendra", rating: 4, comment: "Baksonya enak, kuahnya gurih. Cuma kadang ramai banget.", date: "2023-10-05" }
    ],
    priceRange: { min: 35000, max: 70000 },
    tags: ["Bakso Urat", "Area Parkir", "Populer"]
  },
  {
    id: 5,
    name: "Cukur Rambut 'Rapi Jali'",
    category: Category.Service,
    description: "Potong rambut pria gaya modern dan klasik.",
    story: "'Rapi Jali' bukan sekadar tempat potong rambut, tapi tempat para pria merawat diri. Dengan barber profesional dan suasana yang nyaman, kami jamin Anda akan keluar dengan penampilan terbaik.",
    address: "Jl. Tebet Raya No.58, Jakarta Selatan",
    location: { lat: -6.242, lng: 106.852 },
    photos: [
      "https://picsum.photos/seed/cukur1/800/600",
      "https://picsum.photos/seed/cukur2/800/600",
      "https://picsum.photos/seed/cukur3/800/600",
      "https://picsum.photos/seed/cukur4/800/600"
    ],
    rating: 4.7,
    operatingHours: "10:00 - 20:00",
    contact: {
      phone: "0857-1122-3344"
    },
    reviews: [
        { id: "1", author: "Farhan", rating: 5, comment: "Hasil potongannya selalu memuaskan. Barbernya ngerti banget gaya rambut terkini.", date: "2023-11-02" },
        { id: "2", author: "Kevin", rating: 4, comment: "Tempatnya bersih dan nyaman. Worth the price.", date: "2023-10-25" }
    ],
    priceRange: { min: 50000, max: 100000 },
    tags: ["Barbershop", "Gaya Modern", "Reservasi"]
  },
  {
    id: 6,
    name: "Es Teh Nusantara",
    category: Category.Drink,
    description: "Berbagai varian es teh asli dari seluruh nusantara.",
    story: "Kami berkeliling Indonesia untuk menemukan racikan teh terbaik dari setiap daerah. Es Teh Nusantara menyajikan keunikan rasa teh melati, teh gambyong, hingga teh talua dalam satu tempat.",
    address: "Jl. Sabang No.21, Jakarta Pusat",
    location: { lat: -6.182, lng: 106.824 },
    photos: [
      "https://picsum.photos/seed/teh1/800/600",
      "https://picsum.photos/seed/teh2/800/600"
    ],
    rating: 4.4,
    operatingHours: "09:00 - 22:00",
    contact: {
      phone: "021-3192-6288"
    },
    reviews: [
        { id: "1", author: "Sari", rating: 4, comment: "Banyak pilihan tehnya, harganya juga murah meriah.", date: "2023-09-30" }
    ],
    priceRange: { min: 10000, max: 25000 },
    tags: ["Minuman Segar", "Harga Terjangkau", "Varian Teh"]
  },
  {
    id: 7,
    name: "Gado-Gado Boplo",
    category: Category.Food,
    description: "Gado-gado legendaris dengan saus kacang mete.",
    story: "Sejak 1960, Gado-Gado Boplo mempertahankan resep saus kacang istimewa yang menggunakan campuran kacang tanah dan kacang mete, menciptakan tekstur yang lembut dan rasa yang mewah.",
    address: "Jl. Panglima Polim IX No. 124, Jakarta Selatan",
    location: { lat: -6.248, lng: 106.797 },
    photos: [
      "https://picsum.photos/seed/gado1/800/600",
      "https://picsum.photos/seed/gado2/800/600",
      "https://picsum.photos/seed/gado3/800/600"
    ],
    rating: 4.6,
    operatingHours: "09:30 - 20:00",
    contact: {
      phone: "021-724-8333"
    },
    reviews: [
        { id: "1", author: "Indah", rating: 5, comment: "Saus kacang metenya beda dari yang lain, bikin nagih!", date: "2023-10-18" },
        { id: "2", author: "Joko", rating: 4, comment: "Porsinya pas, sayurannya segar.", date: "2023-10-10" }
    ],
    priceRange: { min: 45000, max: 80000 },
    tags: ["Legendaris", "Saus Kacang Mete", "Halal"]
  },
  {
    id: 8,
    name: "Laundry 'Kinclong'",
    category: Category.Service,
    description: "Jasa cuci dan setrika kilat, bersih, dan wangi.",
    story: "Memahami kesibukan Anda, Laundry 'Kinclong' hadir dengan layanan satu hari selesai. Kami menggunakan deterjen ramah lingkungan dan pewangi premium untuk hasil terbaik.",
    address: "Jl. Kemang Raya No. 12, Jakarta Selatan",
    location: { lat: -6.261, lng: 106.814 },
    photos: [
      "https://picsum.photos/seed/laundry1/800/600",
      "https://picsum.photos/seed/laundry2/800/600"
    ],
    rating: 4.8,
    operatingHours: "07:00 - 19:00",
    contact: {
      phone: "0813-1010-2020"
    },
    reviews: [
        { id: "1", author: "Putri", rating: 5, comment: "Hasilnya selalu bersih, wangi, dan rapi. Langganan!", date: "2023-11-03" }
    ],
    priceRange: { min: 20000, max: 100000 },
    tags: ["Layanan Cepat", "Wangi Premium", "Antar Jemput"]
  },
  {
    id: 9,
    name: "Jus Buah 'Segar Bugar'",
    category: Category.Drink,
    description: "Aneka jus buah segar tanpa tambahan gula.",
    story: "Kesehatan adalah harta yang paling berharga. 'Segar Bugar' menyediakan jus murni dari buah-buahan segar pilihan, diproses tanpa pemanis buatan untuk menjaga nutrisi alaminya.",
    address: "Jl. Cikini Raya No. 73, Jakarta Pusat",
    location: { lat: -6.196, lng: 106.837 },
    photos: [
      "https://picsum.photos/seed/jus1/800/600",
      "https://picsum.photos/seed/jus2/800/600",
      "https://picsum.photos/seed/jus3/800/600"
    ],
    rating: 4.7,
    operatingHours: "09:00 - 18:00",
    contact: {
      phone: "021-315-0000"
    },
    reviews: [
        { id: "1", author: "Fitri", rating: 5, comment: "Jusnya benar-benar murni dan segar. Banyak pilihan buahnya.", date: "2023-10-22" }
    ],
    priceRange: { min: 20000, max: 35000 },
    tags: ["Sehat", "Tanpa Gula", "Buah Segar"]
  },
  {
    id: 10,
    name: "Martabak Pecenongan 65A",
    category: Category.Food,
    description: "Martabak manis dan telur dengan topping melimpah.",
    story: "Sebagai pelopor martabak modern di Jakarta, kami tidak pernah pelit dalam memberikan topping. Setiap gigitan adalah perpaduan sempurna antara adonan yang lembut dan isian yang royal.",
    address: "Jl. Pecenongan Raya No.65A, Jakarta Pusat",
    location: { lat: -6.166, lng: 106.825 },
    photos: [
      "https://picsum.photos/seed/martabak1/800/600",
      "https://picsum.photos/seed/martabak2/800/600",
      "https://picsum.photos/seed/martabak3/800/600"
    ],
    rating: 4.9,
    operatingHours: "17:00 - 23:30",
    contact: {
      phone: "021-350-4061",
      website: "https://martabakpecenongan65a.com"
    },
    reviews: [
        { id: "1", author: "Eko", rating: 5, comment: "Martabak Tipis Kering Keju Coklatnya a must try! Gak ada lawan.", date: "2023-10-30" },
        { id: "2", author: "Wulan", rating: 5, comment: "Toppingnya melimpah ruah, sebanding dengan harganya.", date: "2023-10-29" }
    ],
    priceRange: { min: 100000, max: 250000 },
    tags: ["Topping Melimpah", "Legendaris", "Malam Hari"]
  }
];
