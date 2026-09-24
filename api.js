// Ganti dengan API Key yang kamu dapatkan dari developer.clashofclans.com
const API_TOKEN = 'YOUR_API_TOKEN_HERE';

// Tag klan yang ingin diambil (gantikan '#' dengan '%23')
const CLAN_TAG = '%232Y920C80'; // Contoh tag klan

async function fetchClanMembers() {
    const url = `https://api.clashofclans.com/v1/clans/${CLAN_TAG}/members`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderMembers(data.items);
    } catch (error) {
        console.error('Gagal mengambil data anggota:', error);
    }
}

function renderMembers(members) {
    const listContainer = document.getElementById('member-list');
    listContainer.innerHTML = '';

    members.forEach((member) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${member.clanRank}</td>
            <td><strong>${member.name}</strong><br><small>${member.tag}</small></td>
            <td>${member.role}</td>
            <td>${member.expLevel}</td>
            <td>🏆 ${member.trophies}</td>
            <td>${member.donations}</td>
        `;

        listContainer.appendChild(row);
    });
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', fetchClanMembers);
