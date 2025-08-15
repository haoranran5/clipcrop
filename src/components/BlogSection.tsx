import React from 'react'

export default function BlogSection() {
  return (
    <div className="blog-section">
      <div className="container">
        <h2>Image Editing Tips & Tutorials</h2>
        <p>Learn professional image editing techniques to enhance your design skills</p>
        
        <div className="blog-grid">
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">📸</div>
            </div>
            <div className="blog-content">
              <h3>How to Create Perfect Social Media Avatars</h3>
              <p>Social media avatars are one of the most important personal branding elements. This article will teach you how to choose the right images, cropping techniques, and how to maintain consistency across different platforms.</p>
              <div className="blog-meta">
                <span className="read-time">5 min read</span>
                <span className="category">Tutorial</span>
              </div>
            </div>
          </article>
          
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">🎨</div>
            </div>
            <div className="blog-content">
              <h3>E-commerce Product Image Optimization Guide</h3>
              <p>High-quality product images are key to e-commerce success. Learn how to shoot, crop, and optimize product images to improve conversion rates and user experience.</p>
              <div className="blog-meta">
                <span className="read-time">8 min read</span>
                <span className="category">E-commerce</span>
              </div>
            </div>
          </article>
          
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">📱</div>
            </div>
            <div className="blog-content">
              <h3>Mobile Image Processing Best Practices</h3>
              <p>As mobile device usage grows, understanding best practices for mobile image processing becomes increasingly important. This article shares practical tips and tools.</p>
              <div className="blog-meta">
                <span className="read-time">6 min read</span>
                <span className="category">Mobile</span>
              </div>
            </div>
          </article>
          
          <article className="blog-card">
            <div className="blog-image">
              <div className="placeholder-image">🎯</div>
            </div>
            <div className="blog-content">
              <h3>Image Format Selection Guide: JPG vs PNG vs WebP</h3>
              <p>Different image formats are suitable for different scenarios. Understanding the characteristics, advantages and disadvantages of various formats, and when to use them, helps you make the best choice.</p>
              <div className="blog-meta">
                <span className="read-time">7 min read</span>
                <span className="category">Technical</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
