const axios = require('axios');
const test = async () => {
    try {
        console.log('Starting search with 10s timeout...');
        const r = await axios.post('http://localhost:5000/api/hotels/search', {
            CheckIn: '2026-03-01',
            CheckOut: '2026-03-05',
            HotelCodes: '1000000',
            GuestNationality: 'IN',
            PaxRooms: [{ Adults: 2, Children: 0 }]
        }, { timeout: 10000 });
        console.log('SUCCESS:', r.data);
    } catch (e) {
        console.error('ERROR MESSAGE:', e.message);
        if (e.response) {
            console.error('ERROR DATA:', JSON.stringify(e.response.data, null, 2));
        }
        process.exit(1);
    }
};
test();
