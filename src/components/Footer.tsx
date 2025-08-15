import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About ClipCrop</h3>
            <p>ClipCrop is a free online image cropping tool dedicated to providing users with simple, efficient, and secure image editing experience. We believe everyone should be able to easily create professional image content.</p>
          </div>
          
          <div className="footer-section">
            <h3>Features</h3>
            <ul>
              <li>Online Image Cropping</li>
              <li>Social Media Optimization</li>
              <li>Batch Processing</li>
              <li>Privacy Protection</li>
              <li>Mobile Friendly</li>
              <li>Free to Use</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Supported Formats</h3>
            <ul>
              <li>JPG / JPEG</li>
              <li>PNG</li>
              <li>WebP</li>
              <li>GIF</li>
              <li>HEIC</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>If you have any questions or suggestions, please feel free to contact us.</p>
            <div className="social-links">
              <a href="#" title="GitHub">GitHub</a>
              <a href="#" title="Twitter">Twitter</a>
              <a href="#" title="Email">Email</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; 2024 ClipCrop. All rights reserved.</p>
            <div className="footer-links">
              <a href="/privacy.html">Privacy Policy</a>
              <a href="/terms.html">Terms of Service</a>
              <a href="/faq.html">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
