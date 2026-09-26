require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

app.get('/api/search-ads', async (req, res) => {
    try {
        const {
            query = '',
            country = 'IN',
            status = 'ACTIVE',
            limit = 10
        } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query keyword is required.' });
        }

        if (!META_ACCESS_TOKEN) {
            return res.status(500).json({ error: 'Meta access token is missing on server.' });
        }

        const response = await axios.get('https://graph.facebook.com/v19.0/ads_archive', {
            params: {
                access_token: META_ACCESS_TOKEN,
                search_terms: query,
                ad_reached_countries: `["${country}"]`,
                ad_active_status: status,
                fields: 'id,ad_creation_time,ad_delivery_stop_time,ad_creative_bodies,ad_creative_link_captions,ad_creative_link_descriptions,ad_snapshot_url,page_id,page_name',
                limit: parseInt(limit)
            }
        });

        const formattedAds = (response.data.data || []).map(ad => {
            const start(DateStr = ad.ad_creation_time ? ad.ad_creation_time.split('T')[0] : 'Unknown');
            const isActive = !ad.ad_delivery_stop_time;

            return {
                id: ad.id,
                type: 'Image',
                brandName: ad.page_name || 'Verified Advertiser',
                category: 'E-Commerce Brand',
                dp: `https://graph.facebook.com/${ad.page_id}/picture?type=square`,
                mediaUrl: 'https://picsum.photos/seed/${ad.id}/600/1000',
                startDate: start(DateStr),
                endDate: isActive ? 'Running Now' : ad.ad_delivery_stop_time.split('T')[0],
                daysRunning: calculateDaysRunning(start(DateStr)),
                status: isActive ? 'ACTIVE' : 'INACTIVE',
                country: country || 'ALL',
                language: 'en',
                platform: ad.publisher_platforms || ['Instagram', 'Facebook'],
                adCopy: ad.ad_creative_bodies ? ad.ad_creative_bodies[0] : 'No caption available for this creative.',
                storeUrl: 'https://www.facebook.com/ads/library/?id=' + ad.id,
                adLibraryUrl: 'https://www.facebook.com/ads/library/?id=' + ad.id,
                followers: 'N/A',
                activeAds: 'Active',
                pageAge: 'Verified',
                createdDate: start(DateStr),
                instaHandle: `@${ad.page_name ? ad.page_name.toLowerCase().replace(/[^a-z0-9]/g, '') : ''}`,
                pageId: ad.page_id
            };
        });

        res.json({ success: true, count: formattedAds.length, ads: formattedAds });

    } catch (error) {
        console.error('Meta API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Failed to fetch ads from Meta API',
            details: error.response ? error.response.data : error.message
        });
    }
});

function calculateDaysRunning(startStr) {
    if (startStr === 'Unknown') return 5;
    const start = new Date(startStr);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Bind to Render's dynamic port so the server stays alive
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
