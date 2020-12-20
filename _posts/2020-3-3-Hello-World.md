---
layout: post
title: You're up and running!
---

Next you can update your site name, avatar and other options using the _config.yml file in the root of your repository (shown below).

![_config.yml]({{ site.baseurl }}/images/config.png)

The easiest way to make your first post is to edit this one. Go into /_posts/ and update the Hello World markdown file. For more instructions head over to the [Jekyll Now repository](https://github.com/barryclark/jekyll-now) on GitHub.


Highlighting a specific author's name is useful and widely used in CV. But there is no elegant way to do it with existing latex packages.
The **IEEEtran.bst** style does not provide this functionality neither. There are many ways hacking the latex to achieve the goal. Many of them are error-prone,  only working for particular cases and not easy to understand.

Here is a solution that is relatively elegant, easy to understand and maintain. The main idea is to modify the `bst` file, match the specific author's name and then highlight it. Thus, no modification need to be done to the bib file. 

1. add a highlight function to the **IEEEtran.bst** before `FUNCTION {format.names}`
```
FUNCTION {highlight.if.cv.author}
{ duplicate$ purify$ "Y. Zhang" purify$ =
    { "\textbf{" swap$ * "}" * }
    'skip$
  if$
}
```   
**NOTE**: The command is trying to compare the string. So you need to provide the `Y. Zhang` to the highlight function rather than `Zhang, Yu` in bibtex entry.
2. call `highlight.if.cv.author` in `FUNCTION {format.names}` between `format.name$` and `bibinfo bibinfo.check` as below
```tex
FUNCTION {format.names}
{ 'bibinfo :=
  duplicate$ empty$ 'skip$ {
  this.to.prev.status
  this.status.std
  's :=
  "" 't :=
  #1 'nameptr :=
  s num.names$ 'numnames :=
  numnames 'namesleft :=
    { namesleft #0 > }
    { s nameptr
      name.format.string
      format.name$
      highlight.if.cv.author
      bibinfo bibinfo.check
      't :=
      nameptr #1 >
        { nameptr num.names.shown.with.forced.et.al #1 + =
          numnames max.num.names.before.forced.et.al >
          is.forced.et.al and and
            { "others" 't :=
              #1 'namesleft :=
            }
            { skip$ }
          if$
          namesleft #1 >
            { ", " * t do.name.latex.cmd * }
            { s nameptr "{ll}" format.name$ duplicate$ "others" =
                { 't := }
                { pop$ }
              if$
              t "others" =
                { " " * bbl.etal emphasize * }
                { numnames #2 >
                    { "," * }
                    { skip$ }
                  if$
                  bbl.and
                  space.word * t do.name.latex.cmd *
                }
              if$
            }
          if$
        }
        { t do.name.latex.cmd }
      if$
      nameptr #1 + 'nameptr :=
      namesleft #1 - 'namesleft :=
    }
  while$
  cap.status.std
  } if$
}
```
3. test in your tex file.
```
\documentclass{article}
\begin{document}
\nocite{*}
\bibliographystyle{IEEEtran}
\bibliography{your_reference}
\end{document}
```
