/* ============================================
   SCRIPT.JS - Informasi Kesehatan & Obat
   ============================================ */

// ========== 1. NAVBAR SCROLL ==========
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =====================================
// NAVIGASI HALAMAN
// =====================================

function showPage(pageId){

    document.querySelectorAll(".page")
    .forEach(page=>{
        page.style.display="none";
    });

    const target =
    document.getElementById(pageId);

    if(target){
        target.style.display="block";
        window.scrollTo(0,0);
    }
}

// ========== 2. HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '72px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(13, 31, 23, 0.98)';
  navLinks.style.padding = '20px 5%';
  navLinks.style.gap = '16px';
});

// ========== 3. SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ========== 4. FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(fi => fi.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ========== 5. PENCARIAN OBAT ==========
const searchInput = document.querySelector('.search-input');
const obatCards   = document.querySelectorAll('.obat-card');
const searchBtn   = document.querySelector('.search-btn');

function filterObat() {
  const query = searchInput.value.toLowerCase().trim();

  obatCards.forEach(card => {
    const name    = card.querySelector('.obat-name')?.textContent.toLowerCase() || '';
    const generic = card.querySelector('.obat-generic')?.textContent.toLowerCase() || '';

    const match = name.includes(query) || generic.includes(query);

    card.style.display = match ? '' : 'none';
    card.style.animation = match ? 'fadeIn 0.35s ease' : '';
  });
}

searchInput?.addEventListener('input', filterObat);
searchBtn?.addEventListener('click', filterObat);

searchInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') filterObat();
});

// ========== 6. COUNTER ANIMASI ==========
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const increment = target / (duration / 16);

  const tick = () => {
    start += increment;
    if (start < target) {
      el.textContent = Math.floor(start).toLocaleString('id-ID');
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString('id-ID');
    }
  };

  requestAnimationFrame(tick);
}

const heroSection = document.querySelector('.hero');
const counterEls  = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counterEls.forEach(el => {
        const target = parseInt(el.dataset.target || '0', 10);
        animateCounter(el, target);
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (heroSection) counterObserver.observe(heroSection);

// ========== 7. TOAST NOTIFIKASI ==========
function showToast(pesan, tipe = 'sukses') {
  const toast = document.createElement('div');
  const warna = tipe === 'sukses' ? '#1a8a5a' : '#e84545';
  const ikon  = tipe === 'sukses' ? '✅' : '⚠️';

  toast.innerHTML = `
    <div style="
      position:fixed; bottom:24px; right:24px; z-index:9999;
      background:${warna}; color:#fff;
      padding:14px 22px; border-radius:12px;
      box-shadow:0 8px 32px rgba(0,0,0,0.2);
      font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:600;
      display:flex; align-items:center; gap:10px;
      animation:fadeUp 0.4s ease both;
    ">
      <span>${ikon}</span> ${pesan}
    </div>
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}


// =========================
// DATA PENCARIAN
// =========================

const searchData = {

    olahraga:[
        "olahraga",
        "jalan kaki",
        "hiit",
        "fitness",
        "latihan"
    ],

    penyakit:[
        "penyakit",
        "hipertensi",
        "diabetes",
        "asma",
        "dbd",
        "demam berdarah"
    ],

    kesehatan:[
        "kesehatan",
        "imunitas",
        "daya tahan tubuh",
        "tidur",
        "air putih"
    ],

    nutrisi:[
        "nutrisi",
        "gizi",
        "vitamin",
        "buah",
        "sayur",
        "protein"
    ]

};


// =========================
// TAMPILKAN KATEGORI
// =========================

function showCategory(kategori){

    document.getElementById("kategoriPage").style.display="none";

    document.getElementById("catGrid").style.display = "none";

    document.getElementById("artikelPage").style.display="block";

    document.querySelectorAll(".kategori-artikel")
    .forEach(el=>{
        el.style.display="none";
    });

    document.getElementById(kategori).style.display="flex";

    const judulMap={
        olahraga:"🏃 Bulletin Olahraga",
        penyakit:"🩺 Bulletin Penyakit",
        kesehatan:"❤️ Bulletin Kesehatan",
        nutrisi:"🥗 Bulletin Nutrisi"
    };

    document.getElementById("judulKategori")
    .innerHTML=judulMap[kategori];
}


// =========================
// KEMBALI
// =========================

function backToCategory(){

    document.getElementById("artikelPage").style.display="none";

    document.getElementById("kategoriPage").style.display="block";
}


// =========================
// PENCARIAN REALTIME
// =========================

document.addEventListener("DOMContentLoaded",()=>{

    const input =
    document.getElementById("articleSearch");

    const result =
    document.getElementById("searchResult");

    input.addEventListener("keyup",()=>{

        let keyword =
        input.value.toLowerCase().trim();

        result.innerHTML="";

        if(keyword===""){
            result.style.display="none";
            return;
        }

        let ditemukan=[];

        Object.keys(searchData).forEach(kategori=>{

            searchData[kategori].forEach(kata=>{

                if(kata.includes(keyword)){

                    if(!ditemukan.includes(kategori)){
                        ditemukan.push(kategori);
                    }

                }

            });

        });

        if(ditemukan.length===0){

            result.innerHTML=
            `<div class="search-item">
                Tidak ditemukan
            </div>`;

            result.style.display="block";
            return;
        }

        ditemukan.forEach(kategori=>{

            let nama="";

            if(kategori==="olahraga")
                nama="🏃  Olahraga";

            if(kategori==="penyakit")
                nama="🩺  Penyakit";

            if(kategori==="kesehatan")
                nama="❤️  Kesehatan";

            if(kategori==="nutrisi")
                nama="🥗  Nutrisi";

            result.innerHTML+=`
                <div class="search-item"
                     onclick="pilihKategori('${kategori}')">

                     ${nama}
                </div>
            `;
        });

        result.style.display="block";

    });

});


// =========================
// PILIH HASIL PENCARIAN
// =========================

function pilihKategori(kategori){

    document.getElementById("searchResult")
    .style.display="none";

    document.getElementById("articleSearch")
    .value="";

    showCategory(kategori);
}


// =========================
// TUTUP POPUP JIKA KLIK LUAR
// =========================
document.addEventListener("click",(e)=>{

    const box =
    document.querySelector(".search-box");

    const result =
    document.getElementById("searchResult");

    if(!box || !result) return;

    if(!box.contains(e.target)){

        result.style.display="none";

    }

});

// =====================================
// SHOW DETAIL
// =====================================
function showObat(id){

    const data = obatDatabase[id];

    if(!data) return;

    document.getElementById("detailObatPage").style.display="block";

    document.getElementById("detailObatContainer").innerHTML=`

        <div class="detail-obat">

            <h2>${data.icon} ${data.nama}</h2>

            <p><b>Nama Generik :</b> ${data.generik}</p>

            <p><b>Golongan :</b> ${data.golongan}</p>

            <p><b>Fungsi :</b> ${data.fungsi}</p>

            <p><b>Dosis :</b> ${data.dosis}</p>

            <p><b>Efek Samping :</b> ${data.efek}</p>

            <p><b>Kontraindikasi :</b> ${data.kontra}</p>

            <p><b>Penyimpanan :</b> ${data.penyimpanan}</p>

        </div>

    `;

    document.getElementById("obatSearchResult").style.display="none";
}

// =====================================
// DATABASE OBAT
// =====================================

const obatDatabase = {

paracetamol:{
    nama:"Paracetamol",
    icon:"💊",
    generik:"Acetaminophen",
    golongan:"Analgesik & Antipiretik",
    fungsi:"Menurunkan demam dan meredakan nyeri ringan hingga sedang.",
    dosis:"500-1000 mg setiap 4-6 jam.",
    efek:"Mual, ruam kulit, gangguan hati bila digunakan berlebihan.",
    kontra:"Penderita penyakit hati berat.",
    penyimpanan:"Simpan pada suhu ruangan.",
    keyword:["paracetamol","acetaminophen","demam","nyeri","sakit kepala"]
},

amoxicillin:{
    nama:"Amoxicillin",
    icon:"🔵",
    generik:"Amoxicillin Trihydrate",
    golongan:"Antibiotik Penisilin",
    fungsi:"Mengobati infeksi bakteri.",
    dosis:"250-500 mg sesuai resep dokter.",
    efek:"Diare, mual, muntah, alergi.",
    kontra:"Alergi penisilin.",
    penyimpanan:"Suhu ruangan.",
    keyword:["amoxicillin","antibiotik","infeksi","bakteri"]
},

cefadroxil: {
      nama: "Cefadroxil",
      icon: "🔵",
      generik: "Cefadroxil",
      golongan: "Antibiotik Sefalosporin",
      fungsi: "Infeksi saluran pernapasan dan kulit.",
      dosis: "500 mg 2x sehari.",
      efek: "Diare, mual, alergi.",
      kontra: "Alergi sefalosporin.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["infeksi", "antibiotik", "bakteri"]
},

azithromycin: {
      nama: "Azithromycin",
      icon: "🔵",
      generik: "Azithromycin",
      golongan: "Antibiotik Makrolida",
      fungsi: "Infeksi saluran napas dan kulit.",
      dosis: "500 mg hari pertama, lalu 250 mg.",
      efek: "Mual, diare, pusing.",
      kontra: "Gangguan hati berat.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["infeksi", "batuk", "antibiotik"]
},

diclofenac: {
      nama: "Diclofenac",
      icon: "🔴",
      generik: "Diclofenac sodium",
      golongan: "NSAID",
      fungsi: "Nyeri sendi, radang, sakit otot.",
      dosis: "50 mg 2–3x sehari.",
      efek: "Nyeri lambung, mual, pusing.",
      kontra: "Tukak lambung.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["nyeri", "radang", "sendi"]
},

ibuprofen:{
    nama:"Ibuprofen",
    icon:"🔴",
    generik:"Ibuprofen",
    golongan:"NSAID",
    fungsi:"Mengurangi nyeri, radang, dan demam.",
    dosis:"200-400 mg setiap 4-6 jam.",
    efek:"Nyeri lambung, mual, pusing.",
    kontra:"Tukak lambung aktif.",
    penyimpanan:"Suhu ruangan.",
    keyword:["ibuprofen","radang","nyeri","demam"]
},

meloxicam: {
      nama: "Meloxicam",
      icon: "🔴",
      generik: "Meloxicam",
      golongan: "NSAID",
      fungsi: "Radang sendi (arthritis).",
      dosis: "7.5–15 mg per hari.",
      efek: "Mual, gangguan lambung.",
      kontra: "Maag berat.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["arthritis", "nyeri", "radang"]
},

omeprazole: {
      nama: "Omeprazole",
      icon: "🟡",
      generik: "Omeprazole",
      golongan: "PPI",
      fungsi: "Maag, GERD, tukak lambung.",
      dosis: "20 mg sebelum makan.",
      efek: "Sakit kepala, mual.",
      kontra: "Gangguan hati berat.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["maag", "asam lambung", "gerd"]
},

lansoprazole: {
      nama: "Lansoprazole",
      icon: "🟡",
      generik: "Lansoprazole",
      golongan: "PPI",
      fungsi: "Menurunkan asam lambung.",
      dosis: "15–30 mg sehari.",
      efek: "Mual, diare.",
      kontra: "Alergi PPI.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["maag", "asam lambung"]
},

dextromethorphan: {
      nama: "Dextromethorphan",
      icon: "⚪",
      generik: "Dextromethorphan HBr",
      golongan: "Antitusif",
      fungsi: "Meredakan batuk kering.",
      dosis: "10–20 mg tiap 4 jam.",
      efek: "Mengantuk, pusing.",
      kontra: "Asma berat.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["batuk", "kering"]
},

guaifenesin: {
      nama: "Guaifenesin",
      icon: "⚪",
      generik: "Guaifenesin",
      golongan: "Ekspektoran",
      fungsi: "Mengencerkan dahak.",
      dosis: "200–400 mg tiap 4 jam.",
      efek: "Mual ringan.",
      kontra: "Alergi.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["batuk", "dahak", "flu"]
},

metformin: {
      nama: "Metformin",
      icon: "🟢",
      generik: "Metformin HCl",
      golongan: "Antidiabetes",
      fungsi: "Menurunkan gula darah.",
      dosis: "500–850 mg 2–3x sehari.",
      efek: "Mual, diare.",
      kontra: "Gangguan ginjal berat.",
      penyimpanan: "Suhu ruangan.",
      keyword: ["diabetes", "gula darah"]
},

antasida:{
    nama:"Antasida",
    icon:"🟡",
    generik:"Aluminium Hydroxide + Magnesium Hydroxide",
    golongan:"Antasida",
    fungsi:"Mengatasi maag dan asam lambung.",
    dosis:"Ikuti petunjuk kemasan.",
    efek:"Diare atau sembelit.",
    kontra:"Gangguan ginjal berat.",
    penyimpanan:"Suhu ruangan.",
    keyword:["antasida","maag","gerd","asam lambung"]
  }
};

function cariObat(keyword) {
  let hasil = [];

  for (let id in obatDatabase) {
    let obat = obatDatabase[id];

    if (obat.keyword.includes(keyword)) {
      hasil.push(obat);
    }
  }

  return hasil;
}

// =====================================
// BACK
// =====================================
function backToObat(){

    document.getElementById("detailObatPage").style.display="none";

    document.getElementById("detailObatContainer").innerHTML="";

    document.getElementById("obatSearch").value="";
}

// =====================================
// SEARCH
// =====================================

document.addEventListener("DOMContentLoaded",()=>{

    const input=document.getElementById("obatSearch");
    const hasil=document.getElementById("obatSearchResult");

    if(!input || !hasil) return;

    input.addEventListener("keyup",()=>{

        const keyword=input.value.toLowerCase().trim();

        hasil.innerHTML="";

        if(keyword===""){

            hasil.style.display="none";
            return;

        }

        let ditemukan=[];

        for(let id in obatDatabase){

            const obat=obatDatabase[id];

            if(
                obat.nama.toLowerCase().includes(keyword)
                ||
                obat.keyword.some(k=>k.toLowerCase().includes(keyword))
            ){
                ditemukan.push({
                    id:id,
                    nama:obat.nama,
                    icon:obat.icon,
                    golongan:obat.golongan
                });
            }
        }

        if(ditemukan.length===0){

            hasil.innerHTML=`
                <div class="search-item">
                    Obat tidak ditemukan
                </div>
            `;

            hasil.style.display="block";
            return;
        }

        ditemukan.forEach(obat=>{

            hasil.innerHTML+=`

            <div class="search-item"
                 onclick="showObat('${obat.id}')">

                <b>${obat.icon} ${obat.nama}</b><br>
                <small>${obat.golongan}</small>

            </div>

            `;
        });

        hasil.style.display="block";

    });

});

// ========== 12. SEARCH ARTIKEL ==========
const articleSearch = document.getElementById("articleSearch");
const searchArticleBtn = document.getElementById("searchArticleBtn");

const artikel = {
  hipertensi: "https://www.alodokter.com/hipertensi",
  tekanan: "https://www.alodokter.com/hipertensi",

  imun: "https://www.halodoc.com/artikel/imun-pengertian-fungsi-jenis-cara-kerja-sistem-kekebalan-tubuh",
  imunitas: "https://www.alodokter.com/berbagai-cara-meningkatkan-imunitas-tubuh-agar-tidak-mudah-sakit",

  tidur: "https://www.alodokter.com/ingin-tidur-sehat-terapkan-5-tips-ini",
  posisi: "https://www.halodoc.com/artikel/seperti-apa-posisi-tidur-yang-baik-untuk-kesehatan"
};

searchArticleBtn?.addEventListener("click", () => {
  const keyword = articleSearch.value.toLowerCase();

  for (let key in artikel) {
    if (keyword.includes(key)) {
      window.open(artikel[key], "_blank");
      return;
    }
  }

  alert("Artikel belum tersedia.");
});

articleSearch?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchArticleBtn.click();
  }
});

 // =====================================
 // FAQ INTERAKTIF (CHAT + ACCORDION FIX)
 // =====================================


// ===============================
// CHAT FAQ (FAQ INPUT JAWAB OTOMATIS)
// ===============================
function kirimPertanyaan() {

    const input = document.getElementById("faqInput");
    const bulletin = document.getElementById("faqBulletin");

    const pertanyaan = input.value.trim();

    if (pertanyaan === "") return;

    let jawaban = "Maaf, jawaban belum tersedia.";

    const teks = pertanyaan.toLowerCase();

    if (teks.includes("obat")) {
        jawaban = "Penggunaan obat harus sesuai petunjuk dokter atau kemasan.";
    } else if (teks.includes("antibiotik")) {
        jawaban = "Antibiotik harus diminum sampai habis sesuai resep dokter.";
    } else if (teks.includes("demam")) {
        jawaban = "Perbanyak istirahat dan minum air putih.";
    } else if (teks.includes("vitamin")) {
        jawaban = "Vitamin membantu menjaga daya tahan tubuh.";
    }

    bulletin.innerHTML += `
        <div class="faq-user">${pertanyaan}</div>
        <div class="faq-bot">👨‍⚕️ ${jawaban}</div>
    `;

    input.value = "";
    bulletin.scrollTop = bulletin.scrollHeight;
}


// ===============================
// FAQ ACCORDION (KLIK BUKA/TUTUP)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

});

// =====================================
// SHOW PAGE
// =====================================
function showPage(pageId){

    document.querySelectorAll(".page").forEach(page=>{
        page.style.display="none";
    });

    const target =
    document.getElementById(pageId);

    if(target){
        target.style.display="block";
    }
}


// =====================================
// SAAT HALAMAN PERTAMA KALI DIBUKA
// =====================================
document.addEventListener("DOMContentLoaded",()=>{

    showPage("beranda");

});