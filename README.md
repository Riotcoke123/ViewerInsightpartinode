<h1>🎥 ViewerInsight (Beta)</h1>
<h3>Parti Streamer Viewer Analysis</h3>

<p><strong>ViewerInsight</strong> is a Node.js-based application that analyzes Parti livestreams to estimate real vs. bot viewers using ratio heuristics (8:1 and 12:1). It fetches and analyzes data from the Parti API, provides results via a JSON endpoint, and saves them to <code>data.json</code>.</p>

<p><em>Status: <strong>Beta Testing</strong></em></p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li>Fetches livestream viewer data from Parti API</li>
  <li>Heuristic-based bot vs. real viewer estimation</li>
  <li>Profile data enrichment (avatar & username)</li>
  <li>Exposes JSON API at <code>/api/streamers</code></li>
  <li>Automatically saves results to <code>data.json</code></li>
</ul>

<hr>

<h2>📦 Installation</h2>

<pre><code>git clone https://github.com/Riotcoke123/ViewerInsightpartinode.git
cd ViewerInsightpartinode
npm install
</code></pre>

<hr>

<h2>⚙️ Usage</h2>

<pre><code>node index.js
</code></pre>

<p>Then visit: <a href="http://localhost:3000/api/streamers" target="_blank">http://localhost:3000/api/streamers</a></p>

<p>The app will:</p>
<ul>
  <li>Fetch data for all streamer IDs in the <code>userIds</code> array</li>
  <li>Perform viewer analysis</li>
  <li>Return and save the data in JSON format</li>
</ul>

<hr>

<h2>🧪 Beta Notice</h2>

<p>This application is currently in <strong>beta testing</strong>. Viewer analysis is based on static heuristic ratios and may not reflect actual bot behavior. Use results for indicative purposes only.</p>

<hr>

<h2>📁 Project Structure</h2>

<pre>
.
├── public/
│   └── (Optional static assets)
├── data.json          # Output file with viewer analysis
├── index.js           # Main server and logic
└── README.md
</pre>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>Axios</li>
  <li>Parti API</li>
</ul>

<hr>

<h2>📄 License</h2>

<p>This project is licensed under the <strong>GNU General Public License v3.0</strong>.<br>
See <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">LICENSE</a> for more details.</p>
