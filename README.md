# Prince Jain - Personal Website

This repository contains the source code for my personal website, built using Jekyll and hosted on GitHub Pages. The website serves as a platform to share my product management journey, learnings, and insights.

## 🏗️ Project Structure

```
.
├── _includes/         # Reusable components and templates
├── _layouts/          # Page layout templates
├── _posts/            # Blog posts in markdown format
├── _sass/             # SCSS stylesheets
├── assets/            # Static assets
├── css/               # Compiled CSS files
├── images/            # Image assets
└── tools/             # Interactive web tools
    ├── calculator/    # Advanced calculator with scientific functions
    ├── qr-code-generator/ # QR code generation tool
    ├── polychat/      # Multi-AI chat comparison tool
    ├── base64/        # Base64 encoding/decoding tool
    └── json-formatter/ # JSON formatting and validation tool
```

## 🏛️ Core Architecture

This is a Jekyll static site with the following key components:

### Configuration and Setup
- **_config.yml**: Site-wide configuration including metadata, plugins, and build settings
- **Gemfile**: Ruby dependencies including Jekyll and required plugins
- **CNAME**: Custom domain configuration for GitHub Pages

### Content Structure

#### Main Pages
- **index.md**: Homepage with introduction
- **about.md**: Professional background and bio
- **blog.md**: Blog listing page
- **links.md**: Product management resources
- **worksummary.md**: Professional experience summary
- **privacy.md**: Privacy policy
- **404.md**: Custom error page

#### Blog System
- Posts in `/_posts/` following Jekyll's date-based naming
- Topics include product management, technology, and projects
- Markdown format with YAML front matter

### Template System

#### Layouts (`/_layouts/`)
- **default.html**: Base template with common elements
- **page.html**: Standard page template
- **post.html**: Blog post template
- **blog.html**: Blog listing template

#### Components (`/_includes/`)
- **header.html**: Navigation and site header
- **footer.html**: Site footer with social links
- **head.html**: Meta tags and CSS includes
- **meta.html**: SEO meta tags
- **analytics.html**: Google Analytics integration

### Styling and Assets
- **`/_sass/`**: SCSS partials for styling
- **`/css/`**: Compiled CSS files
- **`/images/`**: Image assets
- **`/assets/`**: Additional resources

## 🚀 Features

### Core Features
- Responsive design using Minima theme
- SEO optimization with sitemap and meta tags
- Google Analytics integration
- Social media integration
- Blog system with markdown support

### Interactive Tools
1. **Calculator**
   - Scientific functions
   - History tracking
   - Memory operations

2. **QR Code Generator**
   - Custom QR code creation
   - Multiple format support
   - Download functionality

3. **PolyChat**
   - Multi-AI model interface
   - Response comparison
   - Real-time interaction

4. **Base64 Encoder/Decoder**
   - Text to Base64 encoding
   - Base64 to text decoding
   - Support for binary data and URLs

5. **JSON Formatter & Validator**
   - JSON beautification
   - Syntax validation
   - Error reporting
   - Minification support
   - Syntax highlighting

## 🛠️ Technical Stack

- **Framework**: Jekyll
- **Theme**: Minima
- **Hosting**: GitHub Pages
- **Analytics**: Google Analytics
- **Syntax Highlighting**: Rouge
- **Markdown**: Kramdown with GFM
- **Tools**: Vanilla JavaScript, HTML5, CSS3

## 🚀 Development

### Prerequisites
- Ruby
- Bundler

### Local Setup
```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve --livereload
```

### Configuration
- Edit `_config.yml` for site settings
- Add posts in `_posts/`
- Customize layouts in `_layouts/`
- Modify styles in `_sass/`

## 📝 Content Management

### Adding Content
- **Blog Posts**: Create markdown files in `_posts/`
- **Pages**: Add markdown files in root directory
- **Assets**: Store in appropriate directories
- **Components**: Add to `_includes/`

### SEO & Performance
- Sitemap generation
- Meta tags optimization
- Responsive images
- Service worker support

## 📦 Dependencies

- jekyll-sitemap
- jekyll-feed
- jekyll-seo-tag

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 🙏 Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Using [Minima](https://github.com/jekyll/minima) theme
- Hosted on [GitHub Pages](https://pages.github.com/)

## Attributes

I am using Minima, the default theme that comes with Jekyll.
Learn how to set up Jekyll from this amazing post:
[Building a static website with Jekyll and GitHub](https://programminghistorian.org/en/lessons/building-static-sites-with-jekyll-github-pages). 


<!-- Comments on using Github Pages using Visual Studio Code: -->
<!--  bundle exec jekyll serve --livereload -->