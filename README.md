<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meta Ad Spy - Reels Format</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            background-color: #0d0e12;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }

        /* --- TOP CONTROL & FILTER BAR --- */
        header {
            width: 100%;
            max-width: 480px;
            background: #181920;
            padding: 10px 12px;
            border-bottom: 1px solid #2a2b36;
            z-index: 100;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .search-box {
            display: flex;
            gap: 8px;
        }

        .search-box input {
            flex: 1;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #333;
            background: #0d0e12;
            color: #fff;
            outline: none;
            font-size: 0.85rem;
        }

        .search-box button {
            padding: 8px 14px;
            background: #0084ff;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
        }

        /* Dynamic Filters Grid */
        .filters-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
        }

        select, input[type="date"] {
            background: #222430;
            color: #ccc;
            border: 1px solid #333;
            padding: 5px;
            border-radius: 4px;
            font-size: 0.7rem;
            outline: none;
            width: 100%;
        }

        /* --- REELS CONTAINER --- */
        .reels-container {
            width: 100%;
            max-width: 480px;
            height: calc(100vh - 105px);
            overflow-y: scroll;
            scroll-snap-type: y mandatory;
            scrollbar-width: none;
        }

        .reels-container::-webkit-scrollbar {
            display: none;
        }

        /* --- SINGLE REEL --- */
        .reel {
            position: relative;
            width: 100%;
            height: 100%;
            scroll-snap-align: start;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .reel video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .overlay-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60%;
            background: linear-gradient(to top, rgba(0,0,0,0.95) 20%, transparent);
            pointer-events: none;
        }

        /* --- REEL OVERLAYS & INSIGHTS --- */
        .top-meta {
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 10;
        }

        .brand-badge {
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .status-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-active { background: #00e676; color: #000; }
        .status-inactive { background: #ff5252; color: #fff; }

        /* Right Action Bar */
        .side-actions {
            position: absolute;
            right: 12px;
            bottom: 110px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 20;
        }

        .action-btn {
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.85rem;
            cursor: pointer;
            backdrop-filter: blur(5px);
        }

        /* Bottom Details Overlay */
        .bottom-details {
            position: absolute;
            bottom: 15px;
            left: 15px;
            right: 65px;
            z-index: 10;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .ad-copy {
            font-size: 0.85rem;
            line-height: 1.3;
            color: #ddd;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .tags-row {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
        }

        .tag {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(4px);
            font-size: 0.65rem;
            padding: 3px 6px;
            border-radius: 4px;
        }

        .insights-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
        }

        .metric-box {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            padding: 6px 8px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .metric-box .label {
            font-size: 0.6rem;
            color: #aaa;
            text-transform: uppercase;
        }

        .metric-box .val {
            font-size: 0.75rem;
            font-weight: bold;
            color: #00c6ff;
            margin-top: 1px;
        }

        .cta-btn {
            display: block;
            width: 100%;
            padding: 10px;
            background: #0084ff;
            color: white;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 6px;
            font-size: 0.8rem;
            box-shadow: 0 4px 12px rgba(0, 132, 255, 0.3);
        }
    </style>
</head>
<body>

    <!-- TOP FILTERS BAR -->
    <header>
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search keywords or brands...">
            <button onclick="applyFilters()">Search</button>
        </div>
        
        <div class="filters-grid">
            <select id="countryFilter" onchange="applyFilters()">
                <option value="ALL">All Countries</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
            </select>

            <select id="statusFilter" onchange="applyFilters()">
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
            </select>

            <select id="languageFilter" onchange="applyFilters()">
                <option value="ALL">All Languages</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
            </select>

            <select id="platformFilter" onchange="applyFilters()">
                <option value="ALL">All Platforms</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Audience Network">Audience Network</option>
            </select>

            <input type="date" id="startDate" onchange="applyFilters()" title="Start Date">
            <input type="date" id="endDate" onchange="applyFilters()" title="End Date">
        </div>
    </header>

    <!-- REELS FEED -->
    <div class="reels-container" id="reelsFeed"></div>

    <script>
        const rawAdsData = [
            {
                id: "ad_001",
                brandName: "Lumina Studio",
                videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                startDate: "2026-01-15",
                endDate: "Running Now",
                status: "ACTIVE",
                country: "US",
                language: "en",
                platforms: ["Instagram", "Facebook"],
                adCopy: "Upgrade your lighting with Lumina! 🔥 50% discount ends this week. Order now!",
                landingPage: "https://facebook.com/ads/library"
            },
            {
                id: "ad_002",
                brandName: "Flex Gym Gear",
                videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                startDate: "2025-11-01",
                endDate: "2026-02-10",
                status: "INACTIVE",
                country: "IN",
                language: "hi",
                platforms: ["Facebook"],
                adCopy: "Best fitness gear tested by pros. Buy 1 Get 1 free on all compression items.",
                landingPage: "https://facebook.com/ads/library"
            },
            {
                id: "ad_003",
                brandName: "Aura Skin Care",
                videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                startDate: "2026-03-01",
                endDate: "Running Now",
                status: "ACTIVE",
                country: "GB",
                language: "en",
                platforms: ["Instagram", "Audience Network"],
                adCopy: "Hydrate your skin naturally with our organic serum range. Free shipping across Europe.",
                landingPage: "https://facebook.com/ads/library"
            }
        ];

        const feedContainer = document.getElementById('reelsFeed');

        function renderFeed(data) {
            if (data.length === 0) {
                feedContainer.innerHTML = '<div style="text-align:center; padding-top:40%; color:#888;">No ads match your filters.</div>';
                return;
            }

            feedContainer.innerHTML = data.map((ad, index) => `
                <div class="reel" data-index="${index}">
                    <video loop playsinline muted webkit-playsinline src="${ad.videoUrl}"></video>
                    <div class="overlay-gradient"></div>
                    
                    <div class="top-meta">
                        <span class="brand-badge">${ad.brandName}</span>
                        <span class="status-badge ${ad.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}">
                            ${ad.status}
                        </span>
                    </div>

                    <div class="side-actions">
                        <div class="action-btn" onclick="alert('Ad ID: ${ad.id}')">🆔</div>
                        <div class="action-btn" onclick="alert('Country: ${ad.country} | Lang: ${ad.language}')">🌐</div>
                        <div class="action-btn" onclick="navigator.clipboard.writeText('${ad.landingPage}'); alert('Link Copied!')">🔗</div>
                    </div>

                    <div class="bottom-details">
                        <div class="tags-row">
                            <span class="tag">🌐 ${ad.country}</span>
                            <span class="tag">🗣️ ${ad.language.toUpperCase()}</span>
                            ${ad.platforms.map(p => `<span class="tag">${p}</span>`).join('')}
                        </div>

                        <p class="ad-copy">${ad.adCopy}</p>
                        
                        <div class="insights-grid">
                            <div class="metric-box">
                                <div class="label">Started Date</div>
                                <div class="val">${ad.startDate}</div>
                            </div>
                            <div class="metric-box">
                                <div class="label">End Date</div>
                                <div class="val">${ad.endDate}</div>
                            </div>
                        </div>

                        <a href="${ad.landingPage}" target="_blank" class="cta-btn">View in Ad Library ➔</a>
                    </div>
                </div>
            `).join('');

            setupAutoplay();
        }

        function applyFilters() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const country = document.getElementById('countryFilter').value;
            const status = document.getElementById('statusFilter').value;
            const language = document.getElementById('languageFilter').value;
            const platform = document.getElementById('platformFilter').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;

            const filtered = rawAdsData.filter(ad => {
                const matchesQuery = ad.brandName.toLowerCase().includes(query) || ad.adCopy.toLowerCase().includes(query);
                const matchesCountry = country === 'ALL' || ad.country === country;
                const matchesStatus = status === 'ALL' || ad.status === status;
                const matchesLang = language === 'ALL' || ad.language === language;
                const matchesPlatform = platform === 'ALL' || ad.platforms.includes(platform);
                const matchesStart = !startDate || ad.startDate >= startDate;
                const matchesEnd = !endDate || (ad.endDate !== 'Running Now' && ad.endDate <= endDate);

                return matchesQuery && matchesCountry && matchesStatus && matchesLang && matchesPlatform && matchesStart && matchesEnd;
            });

            renderFeed(filtered);
        }

        function setupAutoplay() {
            const reels = document.querySelectorAll('.reel');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target.querySelector('video');
                    if (entry.isIntersecting && video) {
                        video.play().catch(() => {});
                    } else if (video) {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }, { threshold: 0.6 });

            reels.forEach(reel => observer.observe(reel));
        }

        renderFeed(rawAdsData);
    </script>
</body>
</html>
