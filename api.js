const fs = require('fs');

// Tag Klan Anda (ganti # dengan %23 untuk URL)
const CLAN_TAG = '%232RVRP900V'; 
const API_TOKEN = process.env.COC_API_TOKEN; // Diambil dari environment variable

async function getClanData() {
  try {
    const response = await fetch(`https://api.clashofclans.com/v1/clans/${CLAN_TAG}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Simpan data ke file JSON (misal: members_latest.json)
    fs.writeFileSync('members_latest.json', JSON.stringify(data, null, 4));
    console.log('File JSON berhasil diperbarui!');
  } catch (error) {
    console.error('Gagal mengambil data:', error);
    process.exit(1);
  }
}

getClanData();
