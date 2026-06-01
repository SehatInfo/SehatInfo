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


// ========== 13. ARTIKEL CARD DROPDOWN ==========

document.addEventListener("DOMContentLoaded", function(){

    const buttons =
    document.querySelectorAll(".kategori-btn");

    const lists =
    document.querySelectorAll(".article-list-expand");

    buttons.forEach(button=>{

        button.addEventListener("click", function(e){

            e.preventDefault();

            buttons.forEach(btn=>{
                btn.classList.remove("active");
            });

            lists.forEach(list=>{
                list.classList.remove("active");
            });

            this.classList.add("active");

            const target =
            this.getAttribute("data-target");

            const targetElement =
            document.getElementById(target);

            if(targetElement){
                targetElement.classList.add("active");
            }

            const kategoriArtikel = {

            olahraga:[
            {
            logo:"🏃",
            judul:"Manfaat Olahraga Rutin",
            desk:"Olahraga rutin membantu menjaga kesehatan jantung.",
            link:"https://www.halodoc.com/kesehatan/olahraga"
            },
            {
            logo:"💪",
            judul:"10 Gerakan Pemanasan",
            desk:"Pemanasan sebelum olahraga sangat penting.",
            link:"https://www.halodoc.com/artikel/berbagai-manfaat-olahraga-high-intensity-interval-training-hiit"
            },
            {
            logo:"🚶",
            judul:"Manfaat Jalan Kaki",
            desk:"Jalan kaki 30 menit setiap hari.",
            link:"https://www.halodoc.com/artikel/ini-6-manfaat-jalan-kaki-setiap-30-menit-setiap-hari"
            },
            {
            logo:"⚽",
            judul:"Olahraga untuk Semua Usia",
            desk:"Tips olahraga yang aman.",
            link:"https://www.halodoc.com/kesehatan/olahraga"
            },
            {
            logo:"🏋️",
            judul:"Menjaga Konsistensi Latihan",
            desk:"Cara tetap semangat berolahraga.",
            link:"https://www.alodokter.com/manfaat-olahraga-bagi-kesehatan"
            }
            ],

            penyakit:[
            {
            logo:"🩸",
            judul:"Hipertensi",
            desk:"Penyebab dan cara mengatasinya.",
            link:"https://www.alodokter.com/hipertensi"
            },
            {
            logo:"💉",
            judul:"Diabetes",
            desk:"Kenali gejala diabetes.",
            link:"https://www.alodokter.com/diabetes"
            },
            {
            logo:"🫁",
            judul:"Asma",
            desk:"Gejala dan pengobatan asma.",
            link:"https://www.alodokter.com/asma"
            },
            {
            logo:"❤️",
            judul:"Penyakit Jantung",
            desk:"Penyakit jantung koroner.",
            link:"https://www.alodokter.com/penyakit-jantung-koroner"
            },
            {
            logo:"🤒",
            judul:"Demam Berdarah",
            desk:"Pencegahan DBD.",
            link:"https://www.alodokter.com/demam-berdarah"
            }
            ],

            kesehatan:[
            {
            logo:"❤️",
            judul:"Pola Hidup Sehat",
            desk:"Menjaga kesehatan tubuh.",
            link:"https://www.alodokter.com/tips-hidup-sehat"
            },
            {
            logo:"💧",
            judul:"Minum Air yang Cukup",
            desk:"Pentingnya hidrasi.",
            link:"https://www.alodokter.com/cara-menjaga-kesehatan-tubuh"
            },
            {
            logo:"😴",
            judul:"Tidur Berkualitas",
            desk:"Tidur cukup setiap hari.",
            link:"https://www.alodokter.com/ingin-tidur-sehat-terapkan-5-tips-ini"
            },
            {
            logo:"🧘",
            judul:"Kelola Stres",
            desk:"Menjaga kesehatan mental.",
            link:"https://www.halodoc.com/artikel/6-cara-meningkatkan-daya-tahan-tubuh"
            },
            {
            logo:"🏥",
            judul:"Medical Check-Up",
            desk:"Pentingnya pemeriksaan rutin.",
            link:"https://www.siloamhospitals.com"
            }
            ],

            nutrisi:[
            {
            logo:"🥗",
            judul:"Gizi Seimbang",
            desk:"Pedoman gizi sehat.",
            link:"https://www.alodokter.com/gizi-seimbang"
            },
            {
            logo:"🍎",
            judul:"Buah untuk Imunitas",
            desk:"Buah yang meningkatkan imun.",
            link:"https://www.alodokter.com/10-makanan-peningkat-sistem-imun-tubuh"
            },
            {
            logo:"🥕",
            judul:"Sayuran Bergizi",
            desk:"Nutrisi penting bagi tubuh.",
            link:"https://www.halodoc.com/kesehatan/nutrisi"
            },
            {
            logo:"🥛",
            judul:"Manfaat Susu",
            desk:"Sumber kalsium yang baik.",
            link:"https://www.halodoc.com"
            },
            {
            logo:"🍗",
            judul:"Protein Harian",
            desk:"Pentingnya protein.",
            link:"https://www.alodokter.com/makanan-sehat"
            }
            ]

};

function showCategory(kategori) {

    // Sembunyikan halaman kategori
    document.getElementById("kategoriPage").style.display = "none";

    // Tampilkan halaman artikel
    document.getElementById("artikelPage").style.display = "block";

    // Sembunyikan semua kategori artikel
    let semuaKategori = document.querySelectorAll(".kategori-artikel");
    semuaKategori.forEach(item => {
        item.style.display = "none";
    });

    // Tampilkan kategori yang dipilih
    document.getElementById(kategori).style.display = "block";

    // Ubah judul kategori
    let judul = "";

    if (kategori === "olahraga") {
        judul = "🏃 Bulletin Olahraga";
    } else if (kategori === "penyakit") {
        judul = "🩺 Bulletin Penyakit";
    } else if (kategori === "kesehatan") {
        judul = "❤️ Bulletin Kesehatan";
    } else if (kategori === "nutrisi") {
        judul = "🥗 Bulletin Nutrisi";
    }

    document.getElementById("judulKategori").innerHTML = judul;
}

function backToCategory() {
    document.getElementById("artikelPage").style.display = "none";
    document.getElementById("kategoriPage").style.display = "block";
}
        });

    });

});
// =====================================
// DETAIL OBAT
// =====================================

function showObat(id) {

    const obatPage = document.getElementById("obatPage");
    const detailPage = document.getElementById("detailObatPage");

    if (obatPage) {
        obatPage.style.display = "none";
    }

    if (detailPage) {
        detailPage.style.display = "block";
    }

    const semuaDetail = document.querySelectorAll(".detail-obat");

    semuaDetail.forEach(function(item) {
        item.style.display = "none";
    });

    const detailDipilih = document.getElementById(id);

    if (detailDipilih) {
        detailDipilih.style.display = "block";
    }
}

function backToObat() {

    const obatPage = document.getElementById("obatPage");
    const detailPage = document.getElementById("detailObatPage");

    if (detailPage) {
        detailPage.style.display = "none";
    }

    if (obatPage) {
        obatPage.style.display = "block";
    }
}

console.log("Informasi Obat berhasil dimuat");

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
// FAQ INTERAKTIF
// =====================================

function kirimPertanyaan() {

    const input = document.getElementById("faqInput");
    const bulletin = document.getElementById("faqBulletin");

    const pertanyaan = input.value.trim();

    if (pertanyaan === "") {
        return;
    }

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
        <div class="faq-user">
            ${pertanyaan}
        </div>

        <div class="faq-bot">
            👨‍⚕️ ${jawaban}
        </div>
    `;

    input.value = "";

    bulletin.scrollTop = bulletin.scrollHeight;
}

  document.querySelectorAll(".faq-question").forEach(function(item){

    item.addEventListener("click", function(){

        const jawaban = this.nextElementSibling;

        if(jawaban.style.display === "block"){
            jawaban.style.display = "none";
        }else{
            jawaban.style.display = "block";
        }

    });

});