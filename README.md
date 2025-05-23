# Prince Jain - Personal Website

This repository contains the source code for my personal website, built using Jekyll and hosted on GitHub Pages. The website serves as a platform to share my product management journey, learnings, and insights.

## 🏗️ Project Structure

```
.
├── _includes/         # Reusable components and templates
│   ├── head.html      # <head> section with meta tags and CSS includes
│   ├── header.html    # Site navigation and header
│   ├── footer.html    # Footer with social links
│   ├── meta.html      # SEO meta tags
│   ├── schema.html    # Structured data for rich snippets
│   └── analytics.html # Google Analytics integration
├── _layouts/          # Page layout templates
│   ├── default.html   # Base template with common elements
│   ├── page.html      # Standard page template
│   ├── post.html      # Blog post template
│   └── blog.html      # Blog listing template
├── _posts/            # Blog posts in markdown format
├── _sass/             # SCSS stylesheets
│   ├── _transitions.scss  # Page transition animations
│   ├── _variables.scss    # Color and size variables
│   ├── _svg-icons.scss    # Social icons styling
│   ├── _reset.scss        # CSS reset
│   └── _highlights.scss   # Code syntax highlighting
├── assets/            # Static assets
│   ├── css/           # CSS files
│   │   ├── critical.css   # Core styles for above-the-fold content
│   │   ├── tools.css      # Styles for interactive tools
│   │   └── header.css     # Header-specific styles
│   ├── js/            # JavaScript files
│   │   ├── page-transitions.js  # Smooth page transitions
│   │   ├── polychat.js          # Multi-AI chat comparison tool
│   │   └── tools.js             # Scripts for interactive tools
│   └── blog_images/    # Blog post images
├── css/               # Compiled CSS files
├── images/            # Image assets
├── tools/             # Interactive web tools
│   ├── index.html     # Tools listing page
│   ├── calculator/    # Advanced calculator with scientific functions
│   ├── qr-code-generator/ # QR code generation tool
│   ├── polychat/      # Multi-AI chat comparison tool
│   ├── base64/        # Base64 encoding/decoding tool
│   └── json-formatter/ # JSON formatting and validation tool
├── _site/             # Generated site (not in repo)
├── _config.yml        # Jekyll configuration
├── .cursorrules       # Coding standards and guidelines
├── .gitignore         # Git ignore file
├── CNAME              # Custom domain configuration
├── Gemfile            # Ruby dependencies
├── Gemfile.lock       # Locked dependency versions
└── sitemap.xml        # Site map for search engines
```

## 🏛️ Core Architecture

This is a Jekyll static site with the following key components:

### Configuration and Setup
- **_config.yml**: Site-wide configuration including metadata, plugins, and build settings
- **Gemfile**: Ruby dependencies including Jekyll and required plugins
- **CNAME**: Custom domain configuration for GitHub Pages
- **.cursorrules**: Coding standards and style guide for the project
- **.gitignore**: Specifies files to exclude from version control

### Content Structure

#### Main Pages
- **index.md**: Homepage with introduction
- **about.md**: Professional background and bio
- **blog.md**: Blog listing page
- **links.md**: Product management resources
- **worksummary.md**: Professional experience summary
- **privacy.md**: Privacy policy
- **404.md**: Custom error page
- **sitemap.xml**: XML sitemap for search engine optimization

#### Blog System
- Posts in `/_posts/` following Jekyll's date-based naming convention
- Current blog posts:
  - **2025-05-19**: Automating Google Chat: Solving the 'Mark as Read' Problem
  - **2025-03-31**: Generative AI Revolution
  - **2024-03-20**: PM Links
  - **2022-03-22**: Building Mini Apps
  - **2022-01-12**: Explaining the National Health Stack
  - **2021-08-03**: Building Vaccine Slot Finder
  - **2021-07-23**: Cracking System Design Interview
  - **2021-05-15**: Demystifying SEO
  - **2020-02-15**: There are Apps and then there are SuperApps
  - **2020-02-02**: Setting up Github Pages (Hello World)

### Template System

#### Layouts (`/_layouts/`)
- **default.html**: Base template with common elements
  - Handles page transitions
  - Manages external link behavior
  - Includes header and footer
- **page.html**: Standard page template
- **post.html**: Blog post template
- **blog.html**: Blog listing template

#### Components (`/_includes/`)
- **header.html**: Navigation and site header
- **footer.html**: Site footer with social links
- **head.html**: Meta tags and CSS includes
- **meta.html**: SEO meta tags
- **schema.html**: Structured data for rich results in search
- **analytics.html**: Google Analytics integration

### Styling and Assets
- **`/_sass/`**: SCSS partials for styling
  - **_transitions.scss**: Page transition animations and effects
  - **_variables.scss**: Global color and sizing variables
  - **_svg-icons.scss**: Social media and UI icons
  - **_reset.scss**: CSS reset for consistent rendering
  - **_highlights.scss**: Code syntax highlighting styles
- **`/assets/css/`**: CSS files
  - **critical.css**: Core styles loaded first for performance
  - **tools.css**: Styles for interactive tools section
  - **header.css**: Header-specific styles
- **`/assets/js/`**: JavaScript files
  - **page-transitions.js**: Smooth page transition handling
  - **polychat.js**: Multi-AI chat comparison functionality
  - **tools.js**: General utilities for interactive tools
- **`/images/`**: Image assets for the main site
- **`/assets/blog_images/`**: Images used in blog posts

## 🛠️ Technical Stack

- **Framework**: Jekyll (static site generator)
- **Hosting**: GitHub Pages
- **Analytics**: Google Analytics
- **Syntax Highlighting**: Rouge
- **Markdown**: Kramdown with GitHub Flavored Markdown
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Performance Optimizations**:
  - Critical CSS loading
  - Deferred JavaScript loading
  - Image optimization
  - Page transition animations

### Jekyll Plugins
- **jekyll-sitemap**: Automatically generates sitemap.xml for SEO
- **jekyll-feed**: Creates RSS/Atom feed for blog subscribers
- **jekyll-seo-tag**: Adds meta tags for search engine optimization
- **Rouge**: Provides syntax highlighting for code blocks

### Interactive Tools
The site includes several interactive tools built with vanilla JavaScript:
- **Calculator**: Scientific calculator with advanced mathematical functions
- **QR Code Generator**: Create QR codes for URLs, text, or other data
- **PolyChat**: Multi-AI chat interface for comparing responses across different AI models
- **Base64 Encoder/Decoder**: Convert between text and Base64 encoding
- **JSON Formatter**: Pretty-print and validate JSON data

These tools are self-contained and follow the site's performance and design standards.

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

The site will be available at `http://127.0.0.1:4000/`

### Build Process
When Jekyll builds the site, it:
1. Processes all markdown files into HTML
2. Compiles SCSS files into CSS
3. Applies layouts and includes to generate complete pages
4. Copies static assets to the output directory
5. Generates the following additional files:
   - `feed.xml`: RSS/Atom feed for blog posts
   - Blog post permalinks following the pattern: `/YYYY/MM/DD/post-title/`
   - Directory indexes for categories and dates

The built site is output to the `_site/` directory (ignored by Git).

### Configuration
- Edit `_config.yml` for site settings
- Add posts in `_posts/`
- Customize layouts in `_layouts/`
- Modify styles in `_sass/`

## 📝 Content Management

### Adding Content
- **Blog Posts**: Create markdown files in `_posts/` with format `YYYY-MM-DD-title.md`
- **Pages**: Add markdown files in root directory
- **Assets**: Store in appropriate directories
- **Components**: Add to `_includes/`

### SEO & Performance
- Sitemap generation via jekyll-sitemap
- Meta tags optimization in head.html and meta.html
- Responsive images with loading="lazy" attribute
- Critical CSS loading for above-the-fold content

## 📦 Dependencies

- jekyll-sitemap: Generates a sitemap.xml file
- jekyll-feed: Generates an Atom feed
- jekyll-seo-tag: Adds metadata tags for search engines

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 🙏 Acknowledgments

- Built with [Jekyll](https://jekyllrb.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)

<!-- Comments on using Github Pages using Visual Studio Code: -->
<!--  bundle exec jekyll serve --livereload -->