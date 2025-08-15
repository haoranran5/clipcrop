import React from 'react'

export default function ContentSection() {
  return (
    <div className="content-section">
      <div className="container">
        <section className="features">
          <h2>强大的在线图片裁剪工具</h2>
          <p>ClipCrop 是一款功能强大的在线图片裁剪工具，专为设计师、营销人员和内容创作者设计。无需下载软件，直接在浏览器中完成所有图片编辑工作。</p>
          
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🎯 精确裁剪</h3>
              <p>支持多种裁剪模式：自由裁剪、固定比例、圆形裁剪、圆角裁剪等，满足各种设计需求。</p>
            </div>
            
            <div className="feature-card">
              <h3>📱 社交媒体优化</h3>
              <p>内置Instagram、Facebook、Twitter、LinkedIn等主流社交媒体的尺寸预设，一键适配。</p>
            </div>
            
            <div className="feature-card">
              <h3>🎨 专业滤镜</h3>
              <p>提供亮度、对比度、饱和度、灰度、复古等多种滤镜效果，让您的图片更加出彩。</p>
            </div>
            
            <div className="feature-card">
              <h3>⚡ 批量处理</h3>
              <p>支持批量上传和导出，一次处理多张图片，大大提高工作效率。</p>
            </div>
            
            <div className="feature-card">
              <h3>🔒 隐私保护</h3>
              <p>所有图片处理都在您的浏览器中完成，不会上传到服务器，确保您的隐私安全。</p>
            </div>
            
            <div className="feature-card">
              <h3>📱 移动友好</h3>
              <p>响应式设计，完美适配手机、平板和桌面设备，随时随地编辑图片。</p>
            </div>
          </div>
        </section>

        <section className="how-to-use">
          <h2>如何使用 ClipCrop</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>上传图片</h3>
              <p>点击上传按钮或直接拖拽图片到编辑区域，支持JPG、PNG、WebP等格式。</p>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <h3>选择裁剪模式</h3>
              <p>选择全图裁剪或部分裁剪模式，根据需要调整裁剪区域和比例。</p>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <h3>应用效果</h3>
              <p>调整滤镜效果、边框样式、圆角半径等参数，实时预览效果。</p>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <h3>导出图片</h3>
              <p>选择输出格式和质量，点击导出按钮下载处理后的图片。</p>
            </div>
          </div>
        </section>

        <section className="use-cases">
          <h2>适用场景</h2>
          <div className="use-cases-grid">
            <div className="use-case">
              <h3>社交媒体营销</h3>
              <p>为Instagram、Facebook、Twitter等平台制作完美尺寸的图片，提升品牌形象。</p>
            </div>
            
            <div className="use-case">
              <h3>电商产品图</h3>
              <p>统一产品图片尺寸，添加品牌水印，提升产品展示效果。</p>
            </div>
            
            <div className="use-case">
              <h3>个人头像</h3>
              <p>制作圆形或圆角头像，适配各种社交平台和个人网站。</p>
            </div>
            
            <div className="use-case">
              <h3>博客配图</h3>
              <p>为博客文章制作统一风格的配图，提升阅读体验。</p>
            </div>
          </div>
        </section>

        <section className="faq">
          <h2>常见问题</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>支持哪些图片格式？</h3>
              <p>支持JPG、PNG、WebP、GIF等主流图片格式，输出格式包括PNG、JPEG、WebP。</p>
            </div>
            
            <div className="faq-item">
              <h3>图片会上传到服务器吗？</h3>
              <p>不会。所有图片处理都在您的浏览器中完成，确保您的隐私安全。</p>
            </div>
            
            <div className="faq-item">
              <h3>可以批量处理图片吗？</h3>
              <p>可以。支持批量上传和导出，一次可以处理多张图片。</p>
            </div>
            
            <div className="faq-item">
              <h3>支持哪些社交媒体尺寸？</h3>
              <p>支持Instagram、Facebook、Twitter、LinkedIn、YouTube、Pinterest等主流平台的尺寸预设。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
