import React from 'react'

export default function BlogSection() {
  return (
    <div className="blog-section">
      <div className="container">
        <h2>图片编辑技巧与教程</h2>
        <p>学习专业的图片编辑技巧，提升您的设计能力</p>
        
        <div className="blog-grid">
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">📸</div>
            </div>
            <div className="blog-content">
              <h3>如何制作完美的社交媒体头像</h3>
              <p>社交媒体头像是最重要的个人品牌元素之一。本文将教您如何选择合适的图片、裁剪技巧以及如何在不同平台上保持一致性。</p>
              <div className="blog-meta">
                <span className="read-time">5分钟阅读</span>
                <span className="category">教程</span>
              </div>
            </div>
          </article>
          
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">🎨</div>
            </div>
            <div className="blog-content">
              <h3>电商产品图片优化指南</h3>
              <p>高质量的产品图片是电商成功的关键。了解如何拍摄、裁剪和优化产品图片，提升转化率和用户体验。</p>
              <div className="blog-meta">
                <span className="read-time">8分钟阅读</span>
                <span className="category">电商</span>
              </div>
            </div>
          </article>
          
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">📱</div>
            </div>
            <div className="blog-content">
              <h3>移动端图片处理最佳实践</h3>
              <p>随着移动设备使用率的增长，了解移动端图片处理的最佳实践变得越来越重要。本文分享实用的技巧和工具。</p>
              <div className="blog-meta">
                <span className="read-time">6分钟阅读</span>
                <span className="category">移动端</span>
              </div>
            </div>
          </article>
          
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">🎯</div>
            </div>
            <div className="blog-content">
              <h3>图片格式选择指南：JPG vs PNG vs WebP</h3>
              <p>不同的图片格式适用于不同的场景。了解各种格式的特点、优缺点以及何时使用它们，帮助您做出最佳选择。</p>
              <div className="blog-meta">
                <span className="read-time">7分钟阅读</span>
                <span className="category">技术</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
