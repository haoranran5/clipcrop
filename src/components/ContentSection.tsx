import React from 'react'

export default function ContentSection() {
  return (
    <div className="content-section">
      <div className="container">
        <section className="features">
          <h2>Powerful Online Image Cropping Tool</h2>
          <p>ClipCrop is a powerful online image cropping tool designed for designers, marketers, and content creators. No software download required - complete all image editing tasks directly in your browser.</p>
          
                      <div className="feature-grid">
              <div className="feature-card">
                <h3>🎯 Precise Cropping</h3>
                <p>Support multiple cropping modes: free crop, fixed ratio, circle crop, rounded corners, and more to meet various design needs.</p>
              </div>
              
              <div className="feature-card">
                <h3>📱 Social Media Optimization</h3>
                <p>Built-in size presets for Instagram, Facebook, Twitter, LinkedIn and other mainstream social media platforms for one-click adaptation.</p>
              </div>
              
              <div className="feature-card">
                <h3>🎨 Professional Filters</h3>
                <p>Provide brightness, contrast, saturation, grayscale, vintage and other filter effects to make your images more outstanding.</p>
              </div>
              
              <div className="feature-card">
                <h3>⚡ Batch Processing</h3>
                <p>Support batch upload and export, process multiple images at once, greatly improving work efficiency.</p>
              </div>
              
              <div className="feature-card">
                <h3>🔒 Privacy Protection</h3>
                <p>All image processing is completed in your browser and will not be uploaded to the server, ensuring your privacy and security.</p>
              </div>
              
              <div className="feature-card">
                <h3>📱 Mobile Friendly</h3>
                <p>Responsive design, perfectly adapts to mobile phones, tablets and desktop devices, edit images anytime, anywhere.</p>
              </div>
            </div>
        </section>

        <section className="how-to-use">
          <h2>How to Use ClipCrop</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Upload Image</h3>
              <p>Click the upload button or drag and drop images directly to the editing area. Supports JPG, PNG, WebP and other formats.</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose Cropping Mode</h3>
              <p>Select full image cropping or partial cropping mode, adjust the cropping area and ratio as needed.</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>Apply Effects</h3>
              <p>Adjust filter effects, border styles, corner radius and other parameters with real-time preview.</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3>Export Image</h3>
              <p>Choose output format and quality, click the export button to download the processed image.</p>
            </div>
          </div>
        </section>

        <section className="use-cases">
          <h2>Use Cases</h2>
          <div className="use-cases-grid">
            <div className="use-case">
              <h3>Social Media Marketing</h3>
              <p>Create perfectly sized images for Instagram, Facebook, Twitter and other platforms to enhance brand image.</p>
            </div>
            
            <div className="use-case">
              <h3>E-commerce Product Images</h3>
              <p>Standardize product image sizes, add brand watermarks, and improve product display effects.</p>
            </div>
            
            <div className="use-case">
              <h3>Personal Avatars</h3>
              <p>Create circular or rounded avatars that adapt to various social platforms and personal websites.</p>
            </div>
            
            <div className="use-case">
              <h3>Blog Illustrations</h3>
              <p>Create unified style illustrations for blog articles to enhance reading experience.</p>
            </div>
          </div>
        </section>

        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What image formats are supported?</h3>
              <p>Supports mainstream image formats such as JPG, PNG, WebP, GIF, with output formats including PNG, JPEG, WebP.</p>
            </div>
            
            <div className="faq-item">
              <h3>Are images uploaded to the server?</h3>
              <p>No. All image processing is completed in your browser, ensuring your privacy and security.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I process images in batch?</h3>
              <p>Yes. Supports batch upload and export, allowing you to process multiple images at once.</p>
            </div>
            
            <div className="faq-item">
              <h3>What social media sizes are supported?</h3>
              <p>Supports size presets for mainstream platforms such as Instagram, Facebook, Twitter, LinkedIn, YouTube, Pinterest and more.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
