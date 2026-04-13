import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlAPI, getUserFromStorage, getToken } from '../api';

function Dashboard() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const user = getUserFromStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
    fetchUserUrls();
  }, []);

  const fetchUserUrls = async () => {
    try {
      const response = await urlAPI.getUserUrls();
      setUrls(response.data.urls || []);
    } catch (err) {
      console.log('No URLs found or error fetching URLs');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!url.trim()) {
      setError('Please enter a URL');
      setLoading(false);
      return;
    }

    try {
      const response = await urlAPI.createShortUrl(url);
      if (response.status === 200) {
        setSuccess(`Short URL created: ${response.data.id}`);
        setUrl('');
        fetchUserUrls();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (shortId) => {
    const shortUrl = `http://localhost:3002/url/${shortId}`;
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="url-form-card">
          <h3>Create Short URL</h3>
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="url-input-group">
              <input
                type="url"
                placeholder="Enter your long URL (https://...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>

        <div className="url-list">
          <h3>Your Short URLs</h3>
          {urls.length === 0 ? (
            <p style={{ color: '#999' }}>No short URLs created yet</p>
          ) : (
            urls.map((urlItem) => (
              <div key={urlItem._id} className="url-item">
                <div className="url-item-info">
                  <div className="url-item-short">
                    Short ID: {urlItem.shortid}
                  </div>
                  <div className="url-item-original">
                    Original: {urlItem.redirecturl}
                  </div>
                  <div className="url-item-clicks">
                    Clicks: {urlItem.totalclicks}
                  </div>
                </div>
                <div className="url-item-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => copyToClipboard(urlItem.shortid)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
