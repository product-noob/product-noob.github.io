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
├── scripts/           # JavaScript files
└── tools/             # Interactive web tools
    ├── calculator/    # Advanced calculator with scientific functions
    ├── qr-code-generator/ # QR code generation tool
    └── polychat/      # Multi-AI chat comparison tool
```

## 🏛️ Core Architecture

This is a classic Jekyll static site with the following key components:

### Configuration and Setup Files
- **_config.yml**: The central configuration file that defines site-wide variables, SEO settings, and Jekyll options
- **Gemfile & Gemfile.lock**: Ruby dependency management files that specify Jekyll version and plugins
- **CNAME**: Contains `"princejain.me"` - my custom domain for GitHub Pages

### Content Structure

#### Pages
Root-level markdown files that become main site pages:
- **index.md**: Homepage with my introduction and welcome message
- **about.md**: My detailed bio and professional background
- **blog.md**: Blog listing page
- **links.md**: Collection of useful product management resources
- **worksummary.md**: Summary of my professional experience
- **privacy.md**: Privacy policy page
- **404.md**: Custom 404 error page

#### Blog Posts
Located in `/_posts/` directory, following Jekyll's date-based naming convention:
- Multiple posts about product management, technology, and projects
- Notable posts about apps, SEO, system design, vaccine slot finder, and more
- Each post is a markdown file with YAML front matter

### Template System

#### Layouts (`/_layouts/`)
Define the overall page structures:
- **default.html**: Base template for all pages
- **page.html**: Template for regular pages
- **post.html**: Template for blog posts
- **blog.html**: Template for the blog listing page

#### Includes (`/_includes/`)
Reusable HTML components:
- **header.html**: Site navigation
- **footer.html**: Page footer with social links
- **head.html**: HTML `<head>` section with meta tags
- **meta.html**: Additional meta tags for SEO
- **analytics.html**: Google Analytics integration

### Styling and Assets
- **`/_sass/`**: SCSS partial files for styling
- **`/css/`**: Compiled CSS and additional style files
- **`/images/`**: Image assets including profile pictures and blog post images
- **`/assets/`**: Additional assets and resources
  - **scrollbar.js**: JavaScript for custom scrollbar behavior
  - **favicon.png**: Site favicon/icon

### Generated Site
- **`/_site/`**: The generated static site (created when Jekyll builds)
- **sitemap.xml**: Auto-generated sitemap for search engines

## 🚀 Key Features

- **Blog System**: Powered by Jekyll, supporting markdown posts
- **Responsive Design**: Mobile-friendly layout using Minima theme
- **SEO Optimized**: Includes sitemap and meta tags
- **Analytics**: Google Analytics integration
- **Social Links**: Footer integration with social media profiles
- **Interactive Tools**: Collection of browser-based utilities

## 🛠️ Technical Stack

- **Framework**: Jekyll
- **Theme**: Minima (default Jekyll theme)
- **Hosting**: GitHub Pages
- **Analytics**: Google Analytics
- **Syntax Highlighting**: Rouge
- **Markdown**: Kramdown with GitHub Flavored Markdown
- **Tools Framework**: 
  - HTML5, CSS3, and JavaScript
  - SVG for tool icons
  - Responsive design with CSS Grid
  - Client-side processing for privacy

## 🛠️ Interactive Tools

The website includes a collection of browser-based tools built with modern web technologies:

1. **Calculator**
   - Advanced calculator with scientific functions
   - History tracking and memory operations
   - Responsive design for all devices

2. **QR Code Generator**
   - Custom QR code generation
   - Multiple format support
   - Instant download capability

3. **PolyChat**
   - Multi-AI model chat interface
   - Side-by-side response comparison
   - Real-time interaction

All tools are:
- Built with vanilla JavaScript for optimal performance
- Client-side processing for privacy
- No server-side dependencies
- Mobile-responsive design
- Free to use with no registration required

## 🚀 Getting Started

1. **Prerequisites**
   - Ruby (for Jekyll)
   - Bundler

2. **Local Development**
   ```bash
   bundle install
   bundle exec jekyll serve --livereload
   ```

3. **Configuration**
   - Edit `_config.yml` for site-wide settings
   - Add posts in `_posts/` directory
   - Customize layouts in `_layouts/`
   - Modify styles in `_sass/`

## 📝 Content Management

- **Blog Posts**: Create new posts in `_posts/` using markdown
- **Pages**: Add new pages in the root directory
- **Assets**: Store images in `images/` directory
- **Custom Components**: Add reusable components in `_includes/`

## 🔧 Configuration

The site is configured through `_config.yml` with the following key settings:
- Site metadata (title, description, URL)
- Social media links
- Google Analytics tracking
- Jekyll plugins and settings
- Build exclusions

## 📦 Dependencies

- Jekyll
- jekyll-sitemap
- jekyll-feed
- jekyll-seo-tag

## 🔍 SEO & Performance

- Sitemap generation
- Meta tags optimization
- Responsive images
- Service worker for offline support

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## Attributes

I am using Minima, the default theme that comes with Jekyll.
Learn how to set up Jekyll from this amazing post:
[Building a static website with Jekyll and GitHub](https://programminghistorian.org/en/lessons/building-static-sites-with-jekyll-github-pages). 


<!-- Comments on using Github Pages using Visual Studio Code: -->
<!--  bundle exec jekyll serve --livereload -->