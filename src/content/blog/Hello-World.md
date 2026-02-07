---
pubDate: '2020-02-02'
title: Setting up Github Pages
description: This is the sample description of posts trying to test out a new way to show in blogs
tags: ['Tech']
---

This is just the typesetting for my blog, keeping it here for quick reference. **Please ignore this.**

This is a sample text.

<h1> This is a sample header H1 </h1>
<h2> This is a sample header H2 </h2>
<h3> This is a sample header H3 </h3>
<h4> This is a sample header H4 </h4>
<h5> This is a sample header H5 </h5>
<h6> This is a sample header H6 </h6>
<strong> This is sample bold </strong>

<i> This is sample italics </i>
<p> This is sample text <p>
<ul>
<li>This is Unordered List </li>
<li>This is Unordered List </li>
<li>This is Unordered List </li>
</ul>

<ol>
<li>This is Ordered List </li>
<li>This is Ordered List </li>
<li>This is Ordered List </li>
</ol>

<p> This is sample img tag </p>
<figure>
   <img src="/images/my-image.png" alt="Prince Jain" class="center">
    <figcaption>This is imagecaption </figcaption>
</figure>

<p> This is sample I-frame tag </p>
Linking here some of the good sources to visit later for Markdown or HTML tutorials

<!--
### Complete Site Structure Guide

This Jekyll site follows a specific structure for optimal organization and performance:

## Core Project Structure

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
│   ├── js/            # JavaScript files
│   └── blog_images/   # Blog post images
├── css/               # Compiled CSS files
├── images/            # Main site image assets
├── tools/             # Interactive web tools
├── _config.yml        # Jekyll configuration
├── .cursorrules       # Coding standards and guidelines
├── Gemfile            # Ruby dependencies
└── sitemap.xml        # Site map for search engines
```

## Layout System Explained

### _layouts/ Directory
- **default.html**: Base template for ALL pages
  - Includes common elements (header, footer, analytics)
  - Handles page transitions and external link behavior
  - Use this template when creating new page types
- **page.html**: Template for static pages (about, links, work summary)
  - Extends default.html
  - Adds page-specific styling and structure
- **post.html**: Template for individual blog posts
  - Includes post metadata, reading time, social sharing
  - Handles structured data for SEO
- **blog.html**: Template for blog listing page
  - Shows post excerpts, pagination, categories

### _includes/ Directory (Reusable Components)
- **header.html**: Navigation bar and site branding
- **footer.html**: Footer with social links and site info
- **head.html**: Meta tags, CSS includes, and performance optimizations
- **meta.html**: SEO meta tags for social sharing
- **schema.html**: Structured data markup for rich search results
- **analytics.html**: Google Analytics tracking code

### Styling System

#### _sass/ Directory (SCSS Partials)
- **_variables.scss**: Global color, font, and spacing variables
- **_reset.scss**: CSS reset for consistent cross-browser rendering
- **_transitions.scss**: Page transition animations and effects
- **_svg-icons.scss**: Social media and UI icon styles
- **_highlights.scss**: Code syntax highlighting themes

#### assets/css/ Directory
- **critical.css**: Above-the-fold styles loaded first for performance
- **tools.css**: Styles specific to interactive tools section
- **header.css**: Header component specific styles

## Writing a New Blog Post: Complete Guide

### Step 1: Create the Post File
Create a new file in `_posts/` following the naming convention:
```
YYYY-MM-DD-Post-Title.md
```
Example: `2024-12-07-My-New-Blog-Post.md`

### Step 2: Set Up Front Matter
Every post must start with YAML front matter:

```yaml
---
layout: post
title: "Your Compelling Post Title"
description: "A brief description that appears in social shares and search results"
date: 2024-12-07
categories: [product-management, technology]  # Optional
tags: [startup, innovation, AI]               # Optional
---
```

### Step 3: Content Structure Best Practices

#### Headers
Use markdown headers for structure:
```markdown
# Main Title (H1) - Only use once per post
## Major Sections (H2)
### Subsections (H3)
#### Minor Points (H4)
```

#### Text Formatting
```markdown
**Bold text for emphasis**
*Italic text for subtle emphasis*
`Inline code` for technical terms
> Blockquotes for important quotes or highlights
```

#### Lists
```markdown
Unordered lists:
- Point one
- Point two
- Point three

Ordered lists:
1. First step
2. Second step
3. Third step
```

#### Code Blocks
Use fenced code blocks with language specification:
```markdown
```javascript
function example() {
    console.log("Hello, world!");
}
```
```

#### Images
Store images in `/images/` or `/assets/blog_images/` and reference them:
```markdown
![Alt text description](/images/image-name.png)

Or with figure caption:
<figure>
   <img src="/images/image-name.png" alt="Descriptive alt text" class="center">
   <figcaption>Your image caption here</figcaption>
</figure>
```

#### Links
```markdown
[Link text](https://example.com)
[Internal link](/about)
```

### Step 4: SEO and Performance Tips

1. **Optimize Images**: Use compressed images and include alt text
2. **Meta Description**: Keep descriptions under 160 characters
3. **Internal Linking**: Link to other relevant posts when appropriate
4. **Headers**: Use logical header hierarchy (H1 > H2 > H3)
5. **Loading**: For images below the fold, add `loading="lazy"`

### Step 5: Testing Your Post

1. **Local Development**: Run `bundle exec jekyll serve --livereload`
2. **Preview**: Check at `http://127.0.0.1:4000/`
3. **Verify**: Test on mobile and desktop
4. **Check**: Ensure all links work and images load

## Jekyll Liquid Template Variables

Common variables available in posts:
- `{{ page.title }}` - Post title
- `{{ page.date }}` - Post date
- `{{ page.description }}` - Post description
- `{{ content }}` - Post content
- `{{ site.title }}` - Site title
- `{{ site.url }}` - Site URL

## Content Guidelines

### Writing Style
- Write in clear, conversational tone
- Break up long paragraphs
- Use subheadings to organize content
- Include practical examples
- End with actionable takeaways

### Technical Posts
- Include code examples where relevant
- Explain technical concepts clearly
- Provide working examples when possible
- Link to relevant documentation

### Performance Considerations
- Optimize images before uploading
- Use lazy loading for images below the fold
- Keep JavaScript minimal
- Test load times on mobile connections

## Deployment Process

1. **Local Testing**: Always test locally first
2. **Git Workflow**: 
   ```bash
   git add .
   git commit -m "Add new blog post: [Post Title]"
   git push origin master
   ```
3. **GitHub Pages**: Site automatically builds and deploys
4. **Verification**: Check live site after deployment

## Troubleshooting Common Issues

### Liquid Syntax Errors
- Avoid spaces in template variables: `{{post_title}}` not `{{Post_Title}}`
- Escape curly braces in code examples when needed

### Build Failures
- Check YAML front matter syntax
- Verify all images exist
- Ensure proper markdown formatting

### Styling Issues
- Follow the coding standards in `.cursorrules`
- Use existing CSS classes when possible
- Test responsive design on multiple devices

Remember: Follow the coding standards defined in `.cursorrules` and maintain consistency with existing posts!

-->
