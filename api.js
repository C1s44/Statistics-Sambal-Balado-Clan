import { fetchClanData } from './api.js';

// Ambil elemen dari HTML
const contentArea = document.querySelector('.content');
const navBtns = document.querySelectorAll('.nav-btn');

let currentClanData = null;

// Fungsi untuk load data pertama kali
async function initApp() {
    try {
        contentArea.innerHTML = '<p class="text-white text-center">Loading data...</p>';
        currentClanData = await fetchClanData();
        renderStatistik(); // Default tampilkan statistik
    } catch (err) {
        console.error(err);
        contentArea.innerHTML = `<p class="text-red-500 text-center">Gagal memuat data: ${err.message}</p>`;
    }
}

// Tampilan Menu Statistik
function renderStatistik() {
    if (!currentClanData) return;
    contentArea.innerHTML = `
        <div class="text-white space-y-4 max-w-lg mx-auto">
            <h1 class="text-2xl font-bold">${currentClanData.name}</h1>
            <p class="text-gray-400">${currentClanData.tag}</p>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-800 p-4 rounded-lg">
                    <p class="text-sm text-gray-400">Level Klan</p>
                    <p class="text-xl font-bold">${currentClanData.clanLevel}</p>
                </div>
                <div class="bg-gray-800 p-4 rounded-lg">
                    <p class="text-sm text-gray-400">Total Poin</p>
                    <p class="text-xl font-bold">${currentClanData.clanPoints}</p>
                </div>
            </div>
        </div>
    `;
}

// Tampilan Menu Member
function renderMember() {
    if (!currentClanData || !currentClanData.memberList) return;
    
    const membersHtml = currentClanData.memberList.map(m => `
        <div class="flex justify-between items-center bg-gray-800 p-3 rounded mb-2 text-white">
            <div>
                <p class="font-semibold">${m.name}</p>
                <p class="text-xs text-gray-400">${m.role}</p>
            </div>
            <p class="text-yellow-400">🏆 ${m.trophies}</p>
        </div>
    `).join('');

    contentArea.innerHTML = `
        <div class="max-w-lg mx-auto">
            <h2 class="text-xl font-bold text-white mb-4">Daftar Member (${currentClanData.members}/50)</h2>
            ${membersHtml}
        </div>
    `;
}

// Event Listener Tombol Navigasi
navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        navBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const menuName = e.target.innerText.trim().toLowerCase();
        if (menuName === 'statistik') {
            renderStatistik();
        } else if (menuName === 'member') {
            renderMember();
        }
    });
});

// Jalankan saat aplikasi dibuka
initApp();
