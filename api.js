async function getWarStats() {
    const token = document.getElementById('apiToken').value.trim();
    let clanTag = document.getElementById('clanTag').value.trim();

    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('errorMsg');
    const statsContainer = document.getElementById('statsContainer');

    // Reset tampilan
    errorMsg.classList.add('hidden');
    statsContainer.classList.add('hidden');

    // Validasi input
    if (!token || !clanTag) {
        showError('Harap isi API Token dan Tag Clan!');
        return;
    }

    // Bersihkan tag (tambahkan %23 pengganti # untuk URL encoding)
    clanTag = clanTag.replace('#', '');
    const encodedTag = `%23${clanTag}`;

    loading.classList.remove('hidden');

    try {
        // Endpoint resmi Supercell CoC API untuk Current War
        const url = `https://api.clashofclans.com/v1/clans/${encodedTag}/currentwar`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('API Key tidak valid atau IP Access belum dikonfigurasi di portal developer.');
            } else if (response.status === 404) {
                throw new Error('Clan tidak ditemukan atau clan war bersifat privat.');
            } else {
                throw new Error(`Gagal mengambil data. Kode error: ${response.status}`);
            }
        }

        const data = await response.json();

        if (data.state === 'notInWar') {
            showError('Clan saat ini sedang tidak dalam kondisi War (Not in War).');
            return;
        }

        // Render Data ke HTML
        renderWarData(data);
        statsContainer.classList.remove('hidden');

    } catch (err) {
        showError(err.message);
    } finally {
        loading.classList.add('hidden');
    }
}

function renderWarData(data) {
    // Info Umum War
    document.getElementById('warState').innerText = `STATUS WAR: ${data.state.toUpperCase()}`;

    // Clan Player
    document.getElementById('clanBadge').src = data.clan.badgeUrls?.medium || '';
    document.getElementById('clanName').innerText = data.clan.name;
    document.getElementById('clanTagDisplay').innerText = data.clan.tag;
    document.getElementById('clanStars').innerText = data.clan.stars || 0;
    document.getElementById('clanDestruction').innerText = `${(data.clan.destructionPercentage || 0).toFixed(2)}%`;
    document.getElementById('clanAttacks').innerText = data.clan.attacks || 0;

    // Musuh
    document.getElementById('oppBadge').src = data.opponent.badgeUrls?.medium || '';
    document.getElementById('oppName').innerText = data.opponent.name;
    document.getElementById('oppTagDisplay').innerText = data.opponent.tag;
    document.getElementById('oppStars').innerText = data.opponent.stars || 0;
    document.getElementById('oppDestruction').innerText = `${(data.opponent.destructionPercentage || 0).toFixed(2)}%`;
    document.getElementById('oppAttacks').innerText = data.opponent.attacks || 0;
}

function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.innerText = message;
    errorMsg.classList.remove('hidden');
}
