import { fetchClanData } from './api.js';

// Ambil elemen dari HTML
const contentArea = document.querySelector('.content');
const navBtns = document.querySelectorAll('.nav-btn');

let currentClanData = null;

// Fungsi untuk memuat data pertama kali
async function initApp() {
    try {
        contentArea.innerHTML = '<p class="text-white text-center">Memuat data klan...</p>';
        currentClanData = await fetchClanData();
        renderStatistik(); // Default menampilkan tab statistik
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
            <div class="bg-gray-800/60 p-5 rounded-2xl border border-gray-700">
                <h1 class="text-3xl font-bold text-indigo-400">${currentClanData.name}</h1>
                <p class="text-gray-400 font-mono mt-1">${currentClanData.tag}</p>
                <p class="text-sm text-gray-300 mt-3">${currentClanData.description || ''}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                    <p class="text-xs text-gray-400 uppercase font-semibold">Level Klan</p>
                    <p class="text-2xl font-bold mt-1 text-white">${currentClanData.clanLevel}</p>
                </div>
                <div class="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                    <p class="text-xs text-gray-400 uppercase font-semibold">Total Poin</p>
                    <p class="text-2xl font-bold mt-1 text-yellow-400">🏆 ${currentClanData.clanPoints?.toLocaleString() || 0}</p>
                </div>
                <div class="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                    <p class="text-xs text-gray-400 uppercase font-semibold">Menang War</p>
                    <p class="text-2xl font-bold mt-1 text-green-400">${currentClanData.warWins || 0}</p>
                </div>
                <div class="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                    <p class="text-xs text-gray-400 uppercase font-semibold">Win Streak</p>
                    <p class="text-2xl font-bold mt-1 text-indigo-300">${currentClanData.warWinStreak || 0}</p>
                </div>
            </div>
        </div>
    `;
}

// Tampilan Menu Member
function renderMember() {
    if (!currentClanData || !currentClanData.memberList) return;
    
    const membersHtml = currentClanData.memberList.map((m, idx) => `
        <div class="flex justify-between items-center bg-gray-800/60 p-3 rounded-xl border border-gray-700/50 mb-2 text-white">
            <div class="flex items-center gap-3">
                <span class="text-xs font-bold text-gray-500 w-5">${idx + 1}</span>
                <div>
                    <p class="font-semibold text-sm">${m.name}</p>
                    <p class="text-xs text-indigo-300 capitalize">${m.role.replace('admin', 'elder')}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-bold text-yellow-400">🏆 ${m.trophies}</p>
                <p class="text-xs text-gray-400">TH ${m.townHallLevel}</p>
            </div>
        </div>
    `).join('');

    contentArea.innerHTML = `
        <div class="max-w-lg mx-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold text-white">Daftar Anggota</h2>
                <span class="text-xs bg-indigo-900/60 text-indigo-300 px-3 py-1 rounded-full font-semibold border border-indigo-700">
                    ${currentClanData.members}/50
                </span>
            </div>
            <div class="space-y-1">
                ${membersHtml}
            </div>
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

// Jalankan aplikasi
initApp();
