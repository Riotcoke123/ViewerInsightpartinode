const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();

const userIds = ['465731']; // Add more streamer IDs here if you want

const headers = {
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
};

async function getLivestreamInfo(userId) {
  const url = `https://api-backend.parti.com/parti_v2/profile/get_livestream_channel_info/${userId}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`[${userId}] Error fetching livestream data:`, error.message);
    return null;
  }
}

function analyzeViewerData(data) {
  const channelInfo = data?.channel_info || {};
  const streamInfo = channelInfo?.stream || {};
  const channelDetails = channelInfo?.channel || {};

  const userId = channelDetails.user_id || 'Unknown';
  const totalViewers = streamInfo.viewer_count || 0;

  const realViewers8 = totalViewers ? totalViewers / 9 : 0;
  const fakeViewers8 = totalViewers - realViewers8;

  const realViewers12 = totalViewers ? totalViewers / 13 : 0;
  const fakeViewers12 = totalViewers - realViewers12;

  return {
    id: userId,
    total_viewer_count: totalViewers,
    '8:1_ratio': {
      real_viewer_count: Math.floor(realViewers8),
      bot_viewer_count: Math.floor(fakeViewers8),
    },
    '12:1_ratio': {
      real_viewer_count: Math.floor(realViewers12),
      bot_viewer_count: Math.floor(fakeViewers12),
    },
  };
}

async function fetchProfile(userId) {
  const url = `https://api-backend.parti.com/parti_v2/profile/user_profile/${userId}`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`[${userId}] Error fetching profile data:`, error.message);
    return {};
  }
}

async function fetchDataForUser(userId) {
  const profile = await fetchProfile(userId);
  const livestream = await getLivestreamInfo(userId);
  const analysis = analyzeViewerData(livestream);

  return {
    user_id: userId,
    avatar_link: profile.avatar_link,
    social_username: profile.social_username,
    viewer_analysis: analysis,
    timestamp: new Date().toISOString(),
  };
}

async function fetchAllStreamers(userIds) {
  return Promise.all(userIds.map(uid => fetchDataForUser(uid)));
}

// Serve static files (index.html, styles.css) from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/streamers', async (req, res) => {
  try {
    const data = await fetchAllStreamers(userIds);

    // Save data to data.json
    const savePath = path.join(__dirname, 'data.json');
    fs.writeFile(savePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error saving data.json:', err);
      } else {
        console.log('data.json saved successfully');
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
