import React from 'react';
import '../newPage.css';

const NewPage = () => {
  return (
    <div className="new-page-container">
  <title>Planical modern template</title>
  <meta property="og:title" content="Planical modern template" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charSet="utf-8" />
  <meta property="twitter:card" content="summary_large_image" />
  <style
    data-tag="reset-style-sheet"
    dangerouslySetInnerHTML={{
      __html:
        '\n      html {  line-height: 1.15;}body {  margin: 0;}* {  box-sizing: border-box;  border-width: 0;  border-style: solid;}p,li,ul,pre,div,h1,h2,h3,h4,h5,h6,figure,blockquote,figcaption {  margin: 0;  padding: 0;}button {  background-color: transparent;}button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;  margin: 0;}button,select {  text-transform: none;}button,[type="button"],[type="reset"],[type="submit"] {  -webkit-appearance: button;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}button:-moz-focus,[type="button"]:-moz-focus,[type="reset"]:-moz-focus,[type="submit"]:-moz-focus {  outline: 1px dotted ButtonText;}a {  color: inherit;  text-decoration: inherit;}input {  padding: 2px 4px;}img {  display: block;}html { scroll-behavior: smooth  }\n    '
    }}
  />
  <style
    data-tag="default-style-sheet"
    dangerouslySetInnerHTML={{
      __html:
        "\n      html {\n        font-family: Inter;\n        font-size: 16px;\n      }\n\n      body {\n        font-weight: 400;\n        font-style:normal;\n        text-decoration: none;\n        text-transform: none;\n        letter-spacing: normal;\n        line-height: 1.15;\n        color: var(--dl-color-gray-black);\n        background-color: var(--dl-color-gray-white);\n\n      }\n    "
    }}
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
    data-tag="font"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    data-tag="font"
  />
  <link rel="stylesheet" href="./style.css" />
  <div>
    <link href="./home.css" rel="stylesheet" />
    <div className="home-container">
      <nav className="navbar-navbar navbar-root-class-name">
        <img
          alt="Planical7012"
          src="playground_assets/title-small-200h.png"
          className="navbar-branding-logo"
        />
        <div className="navbar-nav-content">
          <div className="navbar-nav-links">
            <span className="navbar-link nav-link">Features</span>
            <span className="nav-link">Why us</span>
            <a href="#" className="nav-link" onClick={() => {
  const pricingSection = document.querySelector('.section-head');
  pricingSection.scrollIntoView({ behavior: 'smooth' });
}}>
  Prices
</a>

           
            <span className="nav-link">Contact</span>
          </div>
          <div className="get-started navbar-get-started" onClick={() => {window.location.href="/UserLogin"}}>
            <span className="navbar-text">Get started</span>
          </div>
          
          <div id="open-mobile-menu" className="navbar-hamburger get-started">
            <img
              alt="image"
              src="playground_assets/hamburger-200h.png"
              className="navbar-image"
            />
          </div>
        </div>
        <div id="mobile-menu" className="navbar-mobile-menu">
          <div className="navbar-branding">
            <img
              alt="image"
              src="playground_assets/planical7012-ttpb.svg"
              className="navbar-image1"
            />
            <div id="close-mobile-menu" className="navbar-container">
              <svg viewBox="0 0 1024 1024" className="navbar-icon">
                <path d="M225.835 286.165l225.835 225.835-225.835 225.835c-16.683 16.683-16.683 43.691 0 60.331s43.691 16.683 60.331 0l225.835-225.835 225.835 225.835c16.683 16.683 43.691 16.683 60.331 0s16.683-43.691 0-60.331l-225.835-225.835 225.835-225.835c16.683-16.683 16.683-43.691 0-60.331s-43.691-16.683-60.331 0l-225.835 225.835-225.835-225.835c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331z" />
              </svg>
            </div>
          </div>
          <div className="navbar-nav-links1">
            <span className="nav-link">Features</span>
            <span className="nav-link">Why us</span>
            <a href="#" className="nav-link" onClick={() => {
  const pricingSection = document.querySelector('.section-head');
  pricingSection.scrollIntoView({ behavior: 'smooth' });
}}>
  Prices
</a>
            <span className="nav-link">Contact</span>
          </div>
          <div className="get-started">
            <span className="navbar-text1">Get started</span>
          </div>
        </div>
        <div>
          <dangerous-html html="" />
        </div>
      </nav>
      <section className="home-section">
        <div className="home-hero">
          <div className="home-image">
            <img
              alt="image"
              src="playground_assets/untitled-2-700h.png"
              className="home-image01"
            />
          </div>
          <div className="home-image02">
            <img
              alt="image"
              src="playground_assets/heroimage-1500h.png"
              className="home-image03"
            />
          </div>
          <div className="home-content">
            <main className="home-main">
              <header className="home-header">
                <h1 className="home-heading">The Ultimate AI Art Generator.</h1>
              </header>
              <span className="home-caption">
                Fast, intuitive, limitless, and fun.&nbsp;&nbsp;
              </span>
              <div className="home-buttons">
            <div className="home-get-started button" onClick={() => {window.location.href="/UserLogin"}}>
              <span className="home-text">Get started</span>
            </div>
            
            <div className="home-get-started1 button">
              <a href="#features-section"><span className="home-text01">View features</span></a>
            </div>
          </div>
            </main>
            <div className="home-highlight">
              <div className="home-avatars">
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1552234994-66ba234fd567?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDN8fHBvdHJhaXR8ZW58MHx8fHwxNjY3MjQ0ODcx&ixlib=rb-4.0.3&w=200"
                  className="home-image04 avatar"
                />
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3MjQ0ODcx&ixlib=rb-4.0.3&w=200"
                  className="home-image05 avatar"
                />
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEzfHxwb3RyYWl0fGVufDB8fHx8MTY2NzI0NDg3MQ&ixlib=rb-4.0.3&w=200"
                  className="home-image06 avatar"
                />
              </div>
              <label className="home-caption1">
                Loved by 1,000+ people like you.
              </label>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section01" id="features-section">
  <h2 className="home-text02">Create Anything You Can Imagine.</h2>
  <div className="home-features">
    <header className="feature feature-active home-feature">
      <h3 className="home-text03">Beautiful Images</h3>
      <p className="home-text04">
        Cutting-edge AI software at your fingertips.&nbsp;&nbsp;
      </p>
    </header>
          <header className="feature home-feature1">
            <h3 className="home-text05">No Limits</h3>
            <p className="home-text06">
              <span>NSFW unlocked. We give you freedom to create</span>
              <br />
              <span>what you want to see.&nbsp;</span>
              <br />
            </p>
          </header>
          <header className="feature home-feature2">
            <h3 className="home-text11">Fast and Easy</h3>
            <p className="home-text12">
              Simple interface for making stunning AI art.
            </p>
          </header>
        </div>
        <div className="home-note">
          <div className="home-content1">
            <main className="home-main1">
              <h2 className="home-heading01">Bring Your Imagination to Life</h2>
              <p className="home-paragraph">
                <span>
                  With Dream Brain, you'll have access to dozens of checkpoints
                  to help you create your perfect AI-generated image. And the
                  best part? We don't have an NSFW filter, so you can let your
                  creativity run wild.
                </span>
                <br className="home-text14" />
                <br />
                <span>
                  Our platform is incredibly easy to use, even for beginners.
                  You'll be generating beautiful AI art in no time. And once
                  you've created your masterpiece, you can share it with our
                  vibrant community of like-minded artists.
                </span>
                <br />
              </p>
            </main>
            <div className="home-explore-more">
              <p className="home-text18">Explore more -&gt;</p>
            </div>
          </div>
          <img
            alt="image"
            src="playground_assets/untitled-4-1200w.png"
            className="home-image07"
          />
          <div className="home-container1">
            <div className="home-image08" />
          </div>
        </div>
      </section>
      <section className="home-section02">
        <div className="home-note1">
          <div className="home-image09">
            <img
              alt="image"
              src="playground_assets/pic1-800w.png"
              className="home-image10"
            />
          </div>
          <div className="home-content2">
            <div className="home-caption2">
              <span className="section-head">Image Generation</span>
            </div>
            <div className="home-heading02">
              <div className="home-header01">
                <h2 className="section-heading">
                  Stable Diffusion without a NSFW Filter
                </h2>
              </div>
              <div className="accordion-accordion accordion-root-class-name">
                <div
                  data-role="accordion-container"
                  className="accordion-element"
                >
                  <div className="accordion-details">
                    <span className="accordion-text">
                      <span>
                        Create Stunning AI Art with Ease on Stable Diffusion's
                        Simple and Powerful Platform
                      </span>
                    </span>
                    <span
                      data-role="accordion-content"
                      className="accordion-text1"
                    >
                      <span>
                        Our AI technology is incredibly powerful, allowing you
                        to create stunning art with just a few clicks.
                      </span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 1024 1024"
                    data-role="accordion-icon"
                    className="accordion-icon"
                  >
                    <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                  </svg>
                </div>
                <div
                  data-role="accordion-container"
                  className="accordion-element1 accordion-element"
                >
                  <div className="accordion-details1">
                    <span className="accordion-text2">
                      <span>
                        Explore a World of Possibilities with 2x More Images
                        than Mid-Journey on Stable Diffusion
                      </span>
                    </span>
                    <span
                      data-role="accordion-content"
                      className="accordion-text3"
                    >
                      <span>
                        Our site is designed to be simple and user-friendly, so
                        even if you're new to AI-generated art, you'll be able
                        to use Stable Diffusion with ease.
                      </span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 1024 1024"
                    data-role="accordion-icon"
                    className="accordion-icon2"
                  >
                    <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                  </svg>
                </div>
                <div
                  data-role="accordion-container"
                  className="accordion-element2 accordion-element"
                >
                  <div className="accordion-details2">
                    <span className="accordion-text4">
                      <span>
                        Unleash Your Creativity with Dozens of Checkpoints on
                        Stable Diffusion
                      </span>
                    </span>
                    <span
                      data-role="accordion-content"
                      className="accordion-text5"
                    >
                      <span>
                        Our platform offers even more checkpoints than before,
                        providing you with endless opportunities to experiment
                        and be creative with your AI-generated art.
                      </span>
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 1024 1024"
                    data-role="accordion-icon"
                    className="accordion-icon4"
                  >
                    <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-section04">
        <div className="home-cube">
          <div className="home-top side" />
          <div className="home-front side" />
          <div className="home-left side" />
        </div>
        <main className="home-banner">
          <div className="home-header02">
            <h2 className="section-heading">
              Start Using Stable Diffusion AI Today
            </h2>
            <p className="home-description section-description">
              <span>Get a Free Trial when you sign up today.</span>
              <br />
              <span>No credit card required.&nbsp;&nbsp;</span>
              <br />
            </p>
          </div>
          <div className="home-buttons1">
            <a href="https://dreambrainai.com/UserLogin" className="home-get-started2 button">
              <span className="home-text23">Start Your Free Trial</span>
            </a>
          </div>
          
        </main>
      </section>
      <section className="home-section05">
        <div className="home-cube1">
          <div className="home-top1 side" />
          <div className="home-front1 side" />
          <div className="home-left1 side" />
        </div>
        <main className="home-pricing">
          <header className="home-header03">
            <header className="home-left2">
              <span className="section-head">Pricing</span>
              <h2 className="section-heading home-heading05">
                Start small, think big
              </h2>
            </header>
            <div className="home-right">
              <p className="home-paragraph1 section-description">
                Our flexible pricing plans give you double what you'd pay to use
                Mid Journey. or Dall-e
              </p>
            </div>
          </header>
          <div className="home-plans-container">
            <main className="home-plans">
              <div className="home-plan">
                <div className="home-details">
                  <div className="home-header04">
                    <label className="home-name">Basic</label>
                    <div className="home-pricing1">
                      <h1 className="home-price">$10</h1>
                      <span className="home-duration">/mo</span>
                    </div>
                  </div>
                  <p className="home-description1">
                    200 Tokens. Generates 400-600 hi-res images.
                  </p>
                </div>
                <div className="home-buy-details">
                  <div className="home-buy button" onClick={() => window.location.href = "https://dreambrainai.com/UserLogin"}>
                    <span className="home-text24">
                      <span>Start Basic</span>
                      <br />
                    </span>
                  </div>
                
                  <div className="home-features1">
                    <span className="home-heading06">You will get</span>
                    <div className="home-list">
                      <div className="includes-mark includes-root-class-name">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Rights to Commercial Usage</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>200 Tokens</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name25">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Makes 400-600 images</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Access To all Checkpoints</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Rights to the images.</span>
                        </label>
                      </div>
                      <div className="excludes-mark excludes-root-class-name">
                        <div className="excludes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="excludes-icon1"
                          >
                            <path d="M225.835 286.165l225.835 225.835-225.835 225.835c-16.683 16.683-16.683 43.691 0 60.331s43.691 16.683 60.331 0l225.835-225.835 225.835 225.835c16.683 16.683 43.691 16.683 60.331 0s16.683-43.691 0-60.331l-225.835-225.835 225.835-225.835c16.683-16.683 16.683-43.691 0-60.331s-43.691-16.683-60.331 0l-225.835 225.835-225.835-225.835c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331z" />
                          </svg>
                        </div>
                        <label className="excludes-label">
                          <span>No watermark</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-plan1">
                <div className="home-details1">
                  <div className="home-header05">
                    <label className="home-name1">Professional</label>
                    <div className="home-pricing2">
                      <h1 className="home-price1">$20</h1>
                      <span className="home-duration1">/mo</span>
                    </div>
                  </div>
                  <p className="home-description2">
                    450 Tokens. Generates 900-1350 hi-res images.
                  </p>
                </div>
                <div className="home-buy-details1">
                  <a href="/UserLogin" className="home-buy1 button">
                    <span className="home-text27">
                      <span>Start Professional</span>
                      <br />
                    </span>
                  </a>
                  
                  <div className="home-features2">
                    <span className="home-heading07">You will get</span>
                    <div className="home-list1">
                      <div className="includes-mark includes-root-class-name21">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Rights to Commercial Usage</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name22">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>450 Tokens</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name26">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Makes 900 - 1350 Images</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name23">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Access To all Checkpoints</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name24">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>Rights to the images.</span>
                        </label>
                      </div>
                      <div className="includes-mark includes-root-class-name27">
                        <div className="includes-icon">
                          <svg
                            viewBox="0 0 1024 1024"
                            className="includes-icon1"
                          >
                            <path d="M384 690l452-452 60 60-512 512-238-238 60-60z" />
                          </svg>
                        </div>
                        <label className="includes-label">
                          <span>No watermark</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
        <div className="home-help">
          <span className="home-text30">
            <span>Need any help?</span>
            <br />
          </span>
          <div className="home-contact-support">
            <a
              href="mailto:dreambrainai@gmail.com?subject=Support Request"
              className="home-link"
            >
              <p className="home-text33">Contact support -&gt;</p>
            </a>
          </div>
        </div>
      </section>
      <section className="home-section07">
        <header className="home-header06">
          <header className="home-left3">
            <span className="section-head">Tempor incididunt</span>
            <h2 className="home-heading08 section-heading">
              What users say about us
            </h2>
          </header>
          <div className="home-right1">
            <p className="home-paragraph2 section-description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </header>
        <main className="home-cards">
          <div className="home-container2">
            <section className="review-card review-root-class-name">
              <div className="review-stars">
                <svg viewBox="0 0 1024 1024" className="review-icon">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon02">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon04">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon06">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon08">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
              </div>
              <main className="review-content">
                <p className="review-quote">
                  <span>"it's fast, easy and effective!"</span>
                </p>
                <div className="review-author">
                  <img
                    alt="image"
                    src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3NzU5NDE3&ixlib=rb-4.0.3&w=200"
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <h1 className="review-author1">
                      <span>Sima Mosbacher</span>
                    </h1>
                    <label className="review-position">
                      <span>Manager</span>
                    </label>
                  </div>
                </div>
              </main>
            </section>
            <section className="review-card review-root-class-name">
              <div className="review-stars">
                <svg viewBox="0 0 1024 1024" className="review-icon">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon02">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon04">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon06">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon08">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
              </div>
              <main className="review-content">
                <p className="review-quote">
                  <span>
                    “Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur.Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur.”
                  </span>
                </p>
                <div className="review-author">
                  <img
                    alt="image"
                    src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3NzU5NDE3&ixlib=rb-4.0.3&w=200"
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <h1 className="review-author1">
                      <span>Sima Mosbacher</span>
                    </h1>
                    <label className="review-position">
                      <span>Manager</span>
                    </label>
                  </div>
                </div>
              </main>
            </section>
          </div>
          <div className="home-container3">
            <section className="review-card review-root-class-name">
              <div className="review-stars">
                <svg viewBox="0 0 1024 1024" className="review-icon">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon02">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon04">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon06">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon08">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
              </div>
              <main className="review-content">
                <p className="review-quote">
                  <span>
                    “Illum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.”
                  </span>
                </p>
                <div className="review-author">
                  <img
                    alt="image"
                    src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3NzU5NDE3&ixlib=rb-4.0.3&w=200"
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <h1 className="review-author1">
                      <span>Sima Mosbacher</span>
                    </h1>
                    <label className="review-position">
                      <span>Manager</span>
                    </label>
                  </div>
                </div>
              </main>
            </section>
            <section className="review-card review-root-class-name">
              <div className="review-stars">
                <svg viewBox="0 0 1024 1024" className="review-icon">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon02">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon04">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon06">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon08">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
              </div>
              <main className="review-content">
                <p className="review-quote">
                  <span>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor.”
                  </span>
                </p>
                <div className="review-author">
                  <img
                    alt="image"
                    src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3NzU5NDE3&ixlib=rb-4.0.3&w=200"
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <h1 className="review-author1">
                      <span>Sima Mosbacher</span>
                    </h1>
                    <label className="review-position">
                      <span>Manager</span>
                    </label>
                  </div>
                </div>
              </main>
            </section>
          </div>
          <div className="home-container4">
            <section className="review-card review-root-class-name">
              <div className="review-stars">
                <svg viewBox="0 0 1024 1024" className="review-icon">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon02">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon04">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon06">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon08">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
              </div>
              <main className="review-content">
                <p className="review-quote">
                  <span>
                    “Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae.”
                  </span>
                </p>
                <div className="review-author">
                  <img
                    alt="image"
                    src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3NzU5NDE3&ixlib=rb-4.0.3&w=200"
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <h1 className="review-author1">
                      <span>Sima Mosbacher</span>
                    </h1>
                    <label className="review-position">
                      <span>Manager</span>
                    </label>
                  </div>
                </div>
              </main>
            </section>
            <section className="review-card review-root-class-name">
              <div className="review-stars">
                <svg viewBox="0 0 1024 1024" className="review-icon">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon02">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon04">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon06">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
                <svg viewBox="0 0 1024 1024" className="review-icon08">
                  <path d="M512 736l-264 160 70-300-232-202 306-26 120-282 120 282 306 26-232 202 70 300z" />
                </svg>
              </div>
              <main className="review-content">
                <p className="review-quote">
                  <span>
                    “Doloremque laudantium, totam rem aperiam, eaque ipsa quae
                    ab illo inventore veritatis et quasi architecto beatae.”
                  </span>
                </p>
                <div className="review-author">
                  <img
                    alt="image"
                    src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3NzU5NDE3&ixlib=rb-4.0.3&w=200"
                    className="review-avatar"
                  />
                  <div className="review-details">
                    <h1 className="review-author1">
                      <span>Sima Mosbacher</span>
                    </h1>
                    <label className="review-position">
                      <span>Manager</span>
                    </label>
                  </div>
                </div>
              </main>
            </section>
          </div>
        </main>
        <div className="home-view-more">
          <p className="home-text34">View more</p>
        </div>
      </section>
      <section className="home-section09">
        <header className="home-header07">
          <span className="section-head">FAQ</span>
          <h2 className="home-heading09 section-heading">
            Frequently asked questions
          </h2>
        </header>
        <main className="home-accordion">
          <div className="faq-accordion faq-root-class-name">
            <div
              data-role="accordion-container"
              className="faq-element accordion-element"
            >
              <div className="faq-details">
                <span className="faq-text">
                  <span>
                    How do I use the software? Do I need to install anything?
                  </span>
                  <br />
                </span>
                <span data-role="accordion-content" className="faq-text03">
                  <span>
                    There are no downloads or installation. Simply open
                    "generate" page and adjust the controls to fit your need.
                    The interface is very easy to use. Please view our tutorial
                    at&nbsp;https://www.youtube.com/watch?v=3vPtr7wdp6I
                  </span>
                  <br />
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
            <div
              data-role="accordion-container"
              className="faq-element1 accordion-element"
            >
              <div className="faq-details1">
                <span className="faq-text06">Which tools are available?</span>
                <span data-role="accordion-content" className="faq-text07">
                  <span>Create images up to 1024x1024 using</span>
                  <span>&nbsp;any prompts and negative prompt.</span>
                  <br />
                  <span>
                    You may change sampling method, steps, cfg scale, batch and
                    dimensions.&nbsp;
                  </span>
                  <span>Restore face is on by default.</span>
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon02">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
            <div
              data-role="accordion-container"
              className="faq-element2 accordion-element"
            >
              <div className="faq-details2">
                <span className="faq-text13">
                  How does the free trial work?
                </span>
                <span data-role="accordion-content" className="faq-text14">
                  You get 10 Free Tokens when you sign up..&nbsp;
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon04">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
            <div
              data-role="accordion-container"
              className="faq-element3 accordion-element"
            >
              <div className="faq-details3">
                <span className="faq-text15">Do my tokens rollover?</span>
                <span data-role="accordion-content" className="faq-text16">
                  No. Tokens do not rollover between billing periods.&nbsp;
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon06">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
            <div
              data-role="accordion-container"
              className="faq-element4 accordion-element"
            >
              <div className="faq-details4">
                <span className="faq-text17">
                  What makes this app different from Midjourney or Dalle?
                </span>
                <span data-role="accordion-content" className="faq-text18">
                  This app allows you to generate 200% more images for the same
                  cost and gives you dozens of models to choose from.
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon08">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
            <div
              data-role="accordion-container"
              className="faq-element5 accordion-element"
            >
              <div className="faq-details5">
                <span className="faq-text19">
                  How do I cancel my subscription?
                </span>
                <span data-role="accordion-content" className="faq-text20">
                  You may cancel your subscription at any time. Press the
                  "manage billing" button on your account page to modify or
                  cancel your subscription via Stripe billing.
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon10">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
            <div
              data-role="accordion-container"
              className="faq-element6 accordion-element"
            >
              <div className="faq-details6">
                <span className="faq-text21">
                  Do&nbsp; I own the images I generate?&nbsp;
                </span>
                <span data-role="accordion-content" className="faq-text22">
                  You may cancel your subscription at any time. Press the
                  "manage billing" button on your account page to modify or
                  cancel your subscription via Stripe billing.
                </span>
              </div>
              <div data-role="accordion-icon">
                <svg viewBox="0 0 1024 1024" className="faq-icon12">
                  <path d="M366 708l196-196-196-196 60-60 256 256-256 256z" />
                </svg>
              </div>
            </div>
          </div>
        </main>
        <section className="home-section11">
          <div className="home-cube2">
            <div className="home-top2 side" />
            <div className="home-front2 side" />
            <div className="home-left4 side" />
          </div>
          <main className="home-banner1">
            <div className="home-header08">
              <h2 className="section-heading">
                Start Using Stable Diffusion AI Today
              </h2>
              <p className="home-description3 section-description">
                <span>Get a Free Trial when you sign up today.</span>
                <br />
                <span>No credit card required.&nbsp;&nbsp;</span>
                <br />
              </p>
            </div>
            <div className="home-buttons2">
              <a href="/UserLogin" className="home-get-started3 button">
                <span className="home-text39">Get A Free Trial</span>
              </a>
              
            </div>
          </main>
        </section>
      </section>
      <footer className="home-footer">
        <div className="home-content3">
          <main className="home-main-content">
            <div className="home-content4">
              <header className="home-main2">
                <div className="home-header09">
                  <img
                    alt="image"
                    src="playground_assets/title-small-200h.png"
                    className="home-branding"
                  />
                  <span className="home-text40">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
                <div className="home-socials">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img
                      alt="image"
                      src="playground_assets/instagram-200h.png"
                      className="social"
                    />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img
                      alt="image"
                      src="playground_assets/twitter-200h.png"
                      className="social"
                    />
                  </a>
                </div>
              </header>
              <header className="home-categories">
                <div className="home-category">
                  <div className="home-header10">
                    <span className="footer-header">Company</span>
                  </div>
                  <div className="home-links">
                    <span className="footer-link">About</span>
                    <span className="footer-link">Team</span>
                    <span className="footer-link">News</span>
                    <span className="footer-link">Partners</span>
                    <span className="footer-link">Careers</span>
                    <span className="footer-link">Press &amp; Media</span>
                  </div>
                </div>
              </header>
            </div>
            <section className="home-copyright">
              <span className="home-text48">
                © 2023 DreamBrainAI. All Rights Reserved.
              </span>
            </section>
          </main>
          <main className="home-subscribe">
            <main className="home-main3">
              <h1 className="home-heading11">Subscribe to our newsletter</h1>
              <div className="home-input-field">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="home-textinput input"
                />
                <div className="home-buy2 button">
                  <span className="home-text49">-&gt;</span>
                  <span className="home-text50">
                    <span>Subscribe now</span>
                    <br />
                  </span>
                </div>
              </div>
            </main>
            <h1 className="home-notice">
              By subscribing to our newsletter you agree with our Terms and
              Conditions.
            </h1>
          </main>
          <section className="home-copyright1">
            <span className="home-text53">
              © 2022 latitude. All Rights Reserved.
            </span>
          </section>
        </div>
      </footer>
      <div>
        <dangerous-html html="" />
      </div>
    </div>
  </div>
</div>

  );
}

export default NewPage;
