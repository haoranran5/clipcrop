import React from 'react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>关于 ClipCrop</h3>
            <p>ClipCrop 是一款免费的在线图片裁剪工具，致力于为用户提供简单、高效、安全的图片编辑体验。我们相信每个人都应该能够轻松地创建专业的图片内容。</p>
          </div>
          
          <div className="footer-section">
            <h3>功能特色</h3>
            <ul>
              <li>在线图片裁剪</li>
              <li>社交媒体优化</li>
              <li>批量处理</li>
              <li>隐私保护</li>
              <li>移动友好</li>
              <li>免费使用</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>支持格式</h3>
            <ul>
              <li>JPG / JPEG</li>
              <li>PNG</li>
              <li>WebP</li>
              <li>GIF</li>
              <li>HEIC</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>联系我们</h3>
            <p>如果您有任何问题或建议，欢迎联系我们。</p>
            <div className="social-links">
              <a href="#" title="GitHub">GitHub</a>
              <a href="#" title="Twitter">Twitter</a>
              <a href="#" title="Email">Email</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; 2024 ClipCrop. 保留所有权利。</p>
            <div className="footer-links">
              <a href="/privacy.html">隐私政策</a>
              <a href="/terms.html">使用条款</a>
              <a href="/faq.html">常见问题</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
