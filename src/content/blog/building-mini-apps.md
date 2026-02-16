---
pubDate: '2022-03-22'
title: "Building the Mini Apps Platform"
description: "Mini Apps is platform Paytm build to allow it to move more closer to its journey of becoming a Superapp. Sharing the story of how it came into being."
tags: ['Platform', 'Product']
---

After a stint of nearly 3 years at Paytm, I recently took the tough call to leave Paytm and explore PM’ing in a new industry. During my tenure here I was lucky to work on few very meaningful and impactful projects most notable being Mini Apps, [Vaccine Finder](https://princejain.me/2021/08/03/Building-Vaccine-Slot-Finder.html) and [Paytm Health](https://princejain.me/2022/01/12/National-Health-Stack.html). I plan to write about my experience and share my learnings from working on these projects. This post is about the journey to build the Mini Apps Platform for Paytm.

_**Disclaimer:** As with most stories in this one too I have tried connecting the dots looking backwards and hence many approaches/ frameworks I have shared here were not explicitly used but we had a very similar thought process while approaching these problems. Looking back it’s very interesting to see how these framework match the natural thought process. <br>
Also I have tried sharing a very broad view of how we did things, its 3 years of works condensed into a single article plus a lot of internal data and decisions omitted for obvious reasons._

* * *

Before we start, some current stats about the Mini Apps platform:

-   **Mini Apps** platform now enables a lot of things in the Paytm app: with more than **80%** of all Paytm users having a a touchpoint of Mini Apps.
-   Core Paytm verticals ranging from Paytm Bank, Recharges, Movies, CST, Gold, Fastag, Stocks, Lending, Paytm Health etc. now are in some form or fashion “Mini Apps”.
-   It also has a full functioning partner app ecosystem hosting more than **2000+ apps** across different categories from food delivery to online shopping to games and healthcare.

Let’s now go deeper into understanding what are Mini Apps and how we built this platform.

## What are Mini Apps?

While the terminology of Mini Apps or Mini Programs is a borrowed one (super popular in **[China](https://www.ft.com/content/d00fb4ee-d645-11e6-944b-e7eb37a6aa8e)**), the concept as such has been present in some form or fashion in many apps before.

In the simplest sense mini apps are hybrid apps (typically webapps) which have a deep integration with a host app (in which they are opened) to make them powerful and feature rich. Being based on web frameworks allows the host app to serve different flows and services dynamically.

These mini apps can be managed either by a different entity than the host app like in the case of Zynga games in Facebook or by the host platform itself to serve some non critical and more dynamic flows. <br>
_In Paytm we enable both kinds of mini apps: one’s built by the 2nd party ( internal Paytm verticals) and 3rd party apps (external merchants) as we will explore later._

## Why we needed Mini Apps?

In our journey to become a **[Superapp](https://princejain.me/2020/02/15/Apps-and-SuperApps.html)** it was essential for Paytm to develop a technology solution which allowed us to de-bundle non-core flows and serve them in real-time only when needed. The idea was that most users don’t need or use all our offerings at all times and it makes sense to serve most non-core flows dynamically via a hybrid approach. Also for many flows there are no visible advantages of increasing the app size for non essential flows when not all users would be using those extra features and increasing bundle size might negatively affect **[app install conversion](https://medium.com/googleplaydev/shrinking-apks-growing-installs-5d3fcba23ce2).**

Serving apps dynamically had many other advantages than just reducing app size:

-   **Instant Adoption:** Any new feature launched on the Mini Apps platform is available instantly to all users. By just a config change at backend all our users can use the newer flows in their Paytm app (without requiring an app upgrade).
-   **Quicker Iterations:** It give businesses the flexibility to iterate quickly since any required change could be rolled out directly on the web app.
-   **Easier Development:** Typically web based apps require significantly lesser development effort: since you have to only develop once for both platforms, technology is relatively more mature, open-source, stable and is cheaper from resourcing POV.
-   **Cheaper Maintenance:** Being based on web based frameworks allows mini apps’ codebase to be same across iOS and Android. It solves a big pain point of ensuring feature parity and code maintenance.

There was another major angle to why we needed this platform, in-fact the very reason we built the platform for: **Merchant Mini Apps!** (the benefits for our internal verticals was something we realised eventually!)

Having this platform allowed us to partner with businesses across the country to bring their flows and offering to our users in the Paytm app. This had immense potential for Paytm to increase the overall usability and stickiness of the app since there were many many businesses we as a company never wanted to venture into ourselves but wanted still wanted to enable for our users by leveraging the rich insights we gathered from their payments behaviour and Mini Apps platform gave us just that.

All in all, there were a lot of benefits we had envisioned and thought through which helped us get the leadership alignment, resourcing and ultimately led us to build the mini apps platform. With this context set, let me now venture deeper into how we actually built this platform

## How we actually built the Mini Apps platform?

If I talk about the product journey for the platform till now, it has been through three broad stages in the last 3 years: Introduction, Growth and the Maturity stage (typical of a PLC).

<figure>
<img src="/images/Mini_Apps_1.png" alt="Product Life Cycle Curve">
<figcaption>Product Life Cycle Curve</figcaption>
</figure>

### Introduction Phase

In the introduction phase as typically is the case it was more about figuring out what we needed to build by answering what needed, what the market needed, how others were doing it and then actually building an MVP.

It all started with answering the questions on: **Why → How → What**

<figure>
<img src="/images/Mini_Apps_2.png" alt="Golden Circle Model" class="center">
<figcaption>Golden Circle Model</figcaption>
</figure>

**Why**

-   Why are we building it? Is it worth building for?
-   Why is it useful for our users, for our merchant partners, for us?
-   Why build right now? Why not before or later?

**What**

-   What are we trying to achieve?
-   What does success for the platform look like? What’s our north star?
-   What are the constraints under which we need to operate (resource, time, cost etc.)?

**How**

-   How will we build it? What does a MVP look like?
-   How does a steady state in future with “Mini Programs” look like?
-   How will we launch it and scale it?

By the end of this thought exercise (which took many weeks), we were ready with a broad idea of what we needed and how we wanted to build it.

**Core tenants for the Mini Apps:**

-   Offer seamless experience for our end users
-   Easier for merchants/verticals to integrate
-   Scalable platform for Paytm

Here’s how we actually went about making these tenants possible:

-   Paytm had earlier experimented with an app in app approach which failed. **[Zomato](https://www.livemint.com/Companies/Eyo2sLq5Q36vzre26kMNbP/Zomato-partners-Paytm-online-food-delivery-business.html)** and Bigbasket were a part of the initial pilot and both these received decent user traction, where it failed was the lack of flexibility and heavy dependency on Paytm↔Merchant teams to work together (since it was a SDK integration) to make any updates. Also due to it being a SDK integration, it increased the Paytm app size and had to go through the adoption curve. Overall meaning it was not a scalable solution and hence a more deeper SDK approach was ruled out.
-   There were different approaches in which the other players, mainly the Chinese apps had built their superapp platforms: broadly they were based on their custom language (DSL) and every merchant had to build an app from scratch in their proprietory frameworks. This had a significant adoption and development cost for merchants.
    We were sure that such a high effort rework would never work in an Indian context and we wanted our platform to be based on existing open source technologies and ended up choosing up building the platform on HTML/ JS, since more merchants had a well functioning mobile compatible website!. This choice allowed us to enable any merchant with an existing website to come onboard as a Mini App with few simple integrations, which played a key role in the platform’s growth so far.
-   As to the question of why a merchant would be willing to partner with us for such a integration, there were few benefits we believed they could leverage as part of their integration with us:
    -   **Customer acquisition channel:** Most users in Tier 2/3 cities typically had a very limited number of apps installed on their phone due to less capable device hardware, poor data reach (though Jio has changed this paradigm) and lack of awareness about the various apps out there. Typically for all these cases, Mini Apps was envisioned to serve as very effective customer acquisition channel.
    -   **Cost effective marketing tool:** Payment apps with their rich user transactional data could effectively help marketeers target their ideal audience. Also due to the seamless user journey post clicking on Ads ( Remember no need of download or signup!) the funnel conversions are also much better.
    -   **Suitable for low frequency services:** Majority of apps are used very infrequently by the users and thus a Mini App kind of offering makes much more sense (say ordering medicines or Pizza once a month!). They offer seamless “In-Out” experience to the user with no hassle of remembering or entering any passwords or payment details.
    -   **Allow experimentation on a limited audience:** The dynamic nature of mini apps allow merchants to experiment with newer flows to a limited audience base with controlled rollout and lesser risk to their core app business.

With this broad understanding in place we started brainstorming on the broad architecture of the SDK. At a high level of what I can share publicly, the architecture we ended up with was a native webview rendered in the Paytm app and made feature rich with custom JS injection. This enabled it to interact with the native layer (Paytm app and device layer) and exchange data and information.

This is how the broad architecture of the platform looks like:

<figure>
<img src="/images/Mini_Apps_3.png" alt="Paytm Mini Apps Architecture">
<figcaption>Paytm Mini Apps Architecture</figcaption>
</figure>

_Mini Apps SDK is internally called as "Phoenix" since it was our third attempt at building such a framework and it literally rose from the ashes (learnings) of the last two experiments. Good nomenclature no!?_
This architecture allowed us to render webpages inside our app’s webview which could interact via our custom JS library with Paytm App and Native Layer. This opened so many possibilities of what this platform could enable: seamless data transfer between Paytm app and the website (like login information, payment flows, analytics etc.) & between webapp and the Native device layer (like hardware details: GPS, Bluetooth, Camera etc.).

While the tech team was busy building the core SDK, the Business-Product teams sprung into action and started having discussions with few key merchants to understand their requirements and expectations from such an integration. We narrowed down to solve for few primitives for them to start with: **Discovery, Login and Payments**. We started brainstorming on how each of these would be solved for and started building the first iteration of the platform with these as the MVP requirements.

Apart from the integration aspects we also started solving for analytics and logging we need to have in place to enable easier monitoring and to later allow us to take data backed decisions, setting up basic SOPs, infrastructure, operations and legal processes to allow us to host merchant apps in the Paytm app. Many mails, follow ups and approvals later we were all set to launch the platform.

We partnered with around 15 merchant for the platform's pilot ( Netmeds, 1mg, Hungerbox, Coolwinks, Box8, being few of them) and worked closely with their tech-product teams to help them onboard and integrate and launched the platform within the first 6 months mark.

This is how the first version of listing page looked like:

<figure>
<img src="/images/Mini_Apps_4.png" alt="Design mockup of Mini Apps listing" class="center40">
<figcaption>Design mockup of Mini Apps listing</figcaption>
</figure>

### Growth Phase

Once the basic setup was in place and we had market tested our platform, we then wanted to grow our platform by onboarding more and more merchant apps. For this we built new flows, improved on the existing ones, wrote richer documentations and automated various manual processes. This took us another 6-8 months.

We also started brainstorming on various app categories which made sense as “Mini Apps” and started reaching out to some of the key players in each of those to explore partnership with them. Few key categories we circled on were Online Shopping, Food Delivery, Casual Gaming, Healthcare and Tools & Utilities. We onboarded large names like Domino’s, Decathlon, Box8, Gaming aggregators and announced a formal launch of the **Mini Apps platform.**

<figure>
<img src="/images/Mini_Apps_5.png" alt="Mini Apps Store Launch" class="center">
<figcaption>Mini Apps Store Launch</figcaption>
</figure>

We got tremendous developer response from this conference with more than 10,000 registrations. This gave us a good pipeline of merchants to partner with and onboard as Mini Apps.

<div class="videoWrapper">
<center>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/nuK7Ct59Vyk?start=3161" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>
</div>

While onboarding payment led apps we wanted to also explore if non-transactional apps (one’s which didn’t had any payment flows) would make sense for us to onboard as a mini app, mainly since we were chasing the north star of engagement. But before we formed any partnership we wanted to do a POC (Proof of Concept) to validate the market-fit and ended up building few mini apps of our own.

The first one to hit the shelf was **[e-Newspaper](https://twitter.com/nightfury_19/status/1247862351467958272)** : due to covid induced lockdown delivery of physical newspapers had stopped and people were trying to find an easy way to access them digitally. We could see the mini apps offering serving this use case pretty well and we decided to launch a e-newspaper Mini App. It was launched **within 2 days** and it served our users with various options of national and local newspapers (It was technically like a simple storefront with newspaper pdf deployed on CDN and updated daily). This app instantly took off and we at one point served copies from ~30 different publishers to 100s of thousands of readers daily.
With the mini apps platform allowing us to quickly build, iterate and test our ideas we ended up launching few more in-house mini apps: AQI Monitor, Speedtest and Paytm Astro.
_Think of these like side projects done by different members of our team to improve their understanding of the product and to get a chance to learn more about the platform._
This also improved our understanding on how is experience of developing a mini app as a developer and gave us very useful insights to improve some of our flows, documentation and SOPs (Yes, it helps to eat your own dogfood!)

**This in hindsight, looking back now was also a pre-cursor leading us to launch the [Vaccine Finder](https://paytm.com/blog/engineering/journey-to-build-the-vaccine-slot-finder-tool-on-paytm/) tool and DigiLocker Mini app.**

Surprisingly enough these  got really great response and are available on the platform till date! With this confidence we started onboarding experimenting a bit more on non-transactional use cases and onboarded few content and gaming apps.
We built a lot more features to meet newer merchant  requirements like integration with Paytm notification service, building support for subscription and pre-authorised payments, integration with Paytm’s promo engine, building a user customised app listing to enhance the app discovery, adding more analytics tracking etc. and onboarded apps from different categories and overall experimented a lot!

<div class="videoWrapper">
  <center>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Qxa3kd4yw3o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </center>
</div>

We also thought of one super interesting use-case for this platform, using it for our internal vertical flows. The benefits we offered to our merchant partners: instant adoption, quicker iterations and easier code maintenance were in-fact super relevant for a lot of our internal use cases as well. And as it happened the core-platform experience team internally was driving a charter to reduce the app size and **“Mini Apps”** seemed like a great fit! We started exploring using the platform for some of our internal verticals and start migrating few non-core flows like Paytm Gold, Paytm Education, Fastag, Mall etc. as Mini Apps.
There were few scaling challenges initially since we never accounted the platform to handle this level of scale so soon but with few optimisation and caching strategies later we were able to handle the scale and migrate many of our verticals as Mini Apps. This allowed any internal Paytm vertical who did not had a DAU use case, to move as a Mini App. It also required us to optimise more heavily on our overall platform: how our webview launched, loaded, performed and optimise a lot of aspects of the SDK (there were many sprints dedicated to just optimisations!). We also had to build support for newer flows to allow some verticals to migrate as Mini Apps. But eventually this enabled us move many of our internal verticals as Mini Apps and helped us reduce the App bundle size of Paytm to just under 30MB (lowest among the top fintech players, despite having the most number of features!)

> For every 10 MB decrease in app install size, the app install conversion rate improves by **[2.5%](https://medium.com/googleplaydev/shrinking-apks-growing-installs-5d3fcba23ce2)**

This is essentially is what I see as the **Growth** phase for the platform, where we took our learnings from the pilot, made the platform better and grew it.

Personally this was the most fun phase of the project for me; where we did a lot of brainstorming, experiments, launches, had a few failures and many successes to boast about :)

### Maturity Phase

Once we had a sizeable numbers of merchant mini apps across categories and a lot of internal verticals on the platform what I consider as reaching the **Maturity** phase, we then started focusing more deeply on questions about handling scale, stability and standardisation of the SDK and the platform, afterall a lot of Paytm app depended on this platform. Few things we did were:

-   As our confidence with the platform grew and more internal teams started using it, we felt its important for us to leverage this SDK in other app properties for Paytm: Paytm For Business app, Paytm Money app, Paytm Insider etc. and hence we worked towards making our SDK **multi-tenant.** This took us a good amount of effort to separate out every dependency and make it work independently in any app just by integrating few hooks. This has now led to the “Phoenix” SDK being part of almost all Paytm App properties and any mini app (internal or external) which goes live on Paytm main app technically can be made available on all other Paytm properties with just a single click.

-   Standardised lot of aspects of the platform : JS API(Bridges) structure, error-codes and handling, Title bar, various UI elements etc. and added more detailed logger and tracking for the platform performance.

-   With the large number of merchant apps we were onboarding a lot of manual processes were just becoming too tedious to manage operationally. To solve this we launched a **“DIY flow”**.

    <div class="videoWrapper">
    <center>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/W0qN81dujfs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </center></div>

      This allowed any merchant to come onboard as a Mini App without requirement any\_ involvement from Paytm’s end : instant onboarding, easy tools for app development and automated submission and go-live process.
      _In a nutshell we ended up building a smaller version of Google/ Apple Play Console_

-   Launched new UQR Flow: This is one of the feature which remain super close to my heart. Paytm app is the most used QR scanner in the country and we wanted to leverage this mind-recall to serve as an additional touchpoint for Mini Apps. This was built at a time when a lot of restaurants were moving to a contactless ordering (blame Covid!) and we felt that this was a good offering both for our users and our merchant partners: Users could simply scan the restaurant QR from their Paytm app to instantly open merchant's Mini app and order within a few clicks (Remember: login and payments are seamlessly integrated in Mini Apps).

-   A lot many things are now in pipeline to improve the core platform: page load time, performance and stability and to give our merchants more powerful tools to reach their customers.

As usual there is so much more to write but I will give it a pause here. I hope you got a good sense of how crazy it was to build this platform.

* * *
