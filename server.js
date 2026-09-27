require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const ACTOR_ID = 'curious_coder~facebook-ads-library-scraper';

app.get('/api/search-ads', async (req, res) => {
    try {
        const {
            query = '',
            country = 'US',
            status = 'active',
            limit = 10
        } = req.query;

        if (!query) {
            return res.status(400).json({ error: 'Search query keyword is required.' });
        }

        if (!APIFY_API_TOKEN) {
            return res.status(500).json({ error: 'Apify API token is missing on server.' });
        }

        const searchUrl = `https://www.facebook.com/ads/library/?active_status=${status}&ad_type=all&country=${country}&q=${encodeURIComponent(query)}&search_type=keyword_unordered`;

        const runResponse = await axios.post(
            `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items`,
            {
                urls: [{ url: searchUrl }],
                scrapeAdDetails: true,
                totalRecords: parseInt(limit)
            },
            {
                params: { token: APIFY_API_TOKEN },
                timeout: 120000
            }
        );

        const rawAds = runResponse.data || [];

        const formattedAds = rawAds.map(ad => {
            const startDateStr = ad.startDate || ad.ad_delivery_start_time || 'Unknown';
            const isActive = ad.isActive !== undefined ? ad.isActive : true;

            return {
                id: ad.adArchiveID || ad.ad_archive_id || 'N/A',
                type: 'Image',
                brandName: ad.pageName || ad.page_name || 'Verified Advertiser',
                category: 'E-Commerce Brand',
                dp: ad.pageProfilePictureUrl || '',
                mediaUrl: ad.imageUrl || ad.videoUrl || `https://picsum.photos/seed/${ad.adArchiveID || Math.random()}/600/1000`,
                startDate: startDateStr,
                endDate: isActive ? 'Running Now' : (ad.endDate || 'Unknown'),
                daysRunning: calculateDaysRunning(startDateStr),
                status: isActive ? 'ACTIVE' : 'INACTIVE',
                country: country || 'ALL',
                language: 'en',
                platform: ad.publisherPlatform || ['Instagram', 'Facebook'],
                adCopy: ad.adText || ad.body || 'No caption available for this creative.',
                storeUrl: ad.adLibraryUrl || ad.ad_library_url || '',
                adLibraryUrl: ad.adLibraryUrl || ad.ad_library_url || '',
                followers: 'N/A',
                activeAds: 'Active',
                pageAge: 'Verified',
                createdDate: startDateStr,
                instaHandle: `@${ad.pageName ? ad.pageName.toLowerCase().replace(/[^a-z0-9]/g, '') : ''}`,
                pageId: ad.pageId || ad.page_id || ''
            };
        });

        res.json({ success: true, count: formattedAds.length, ads: formattedAds });

    } catch (error) {
        console.error('Apify API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Failed to fetch ads from Apify',
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
