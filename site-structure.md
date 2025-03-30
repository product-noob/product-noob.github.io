## Core Architecture  
This is a classic Jekyll static site with the following key components:  

### 1. Configuration and Setup Files  
- **_config.yml**: The central configuration file that defines site-wide variables, SEO settings, and Jekyll options  
- **Gemfile & Gemfile.lock**: Ruby dependency management files that specify Jekyll version and plugins  
- **CNAME**: Contains `"princejain.me"` - my custom domain for GitHub Pages  

### 2. Content Structure  

#### Pages  
Root-level markdown files that become main site pages:  
- **index.md**: Homepage with my introduction and welcome message  
- **about.md**: My detailed bio and professional background  
- **blog.md**: Blog listing page  
- **links.md**: Collection of useful product management resources  
- **worksummary.md**: Summary of my professional experience  
- **PM-Links.md**: Extensive collection of product management resources  
- **privacy.md**: Privacy policy page  
- **404.md**: Custom 404 error page  

#### Blog Posts  
Located in `/_posts/` directory, following Jekyll's date-based naming convention:  
- Multiple posts about product management, technology, and projects  
- Notable posts about apps, SEO, system design, vaccine slot finder, and more  
- Each post is a markdown file with YAML front matter  

### 3. Template System  

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

### 4. Styling and Assets  

- **`/_sass/`**: SCSS partial files for styling  
- **`/css/`**: Compiled CSS and additional style files  
- **`/images/`**: Image assets including profile pictures and blog post images  
- **`/assets/`**: Additional assets and resources  
  - **scrollbar.js**: JavaScript for custom scrollbar behavior  
  - **site-icon1.webp**: Site favicon/icon  

### 5. Generated Site  
- **`/_site/`**: The generated static site (created when Jekyll builds)  
- **sitemap.xml**: Auto-generated sitemap for search engines  

## How It All Works Together  

- Jekyll processes all markdown files through the templating system  
- The YAML front matter in each file (`---`) determines which layout to use  
- Layouts pull in components from the `_includes` directory  
- Sass files are compiled into CSS  
- The entire site is generated as static HTML in the `_site` directory  
- When deployed to GitHub Pages, my content is served from my `princejain.me` domain  
