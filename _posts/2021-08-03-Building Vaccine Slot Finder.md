---
layout: post
title: Building the Vaccine Slot Finder tool
description: "This is the sample description of posts trying to test out a new way to show in blogs"

---


What started as a weekend project ended up becoming one of the most popular vaccination tool for millions of people in the country! This is behind the scenes story of how the Paytm Vaccine Finder tool came to life.

**Some stats on the tool:**

The tool helped more than **15 million** users from over 750 districts and 19,000+ PIN codes in the country by sending more than **1 billion** vaccine availability alerts, and achieved **3 million+** vaccine slot booking on the Paytm app.

In the details that follow, I have tried sharing the story of how we built this tool.

### How we started

**Background:**

It's necessary to set the context first. The tool was ideated at a time when the Government had just launched the Co-WIN portal for vaccine bookings and almost everyone in the country wanted to get their vaccine shots as quickly as they could!

With a population of over 1.3 billion this was a task of massive proportions for the country and there was already a huge demand-supply mismatch for the vaccine doses. People had to desperately keep refreshing the Co-WIN portal to check when new slots opened. The slots opened erratically, were booked in a matter of a couple of minutes and it ended up becoming a game of fastest finger first!

There were a lot of tools which sprung up to serve this need: Telegram Channels, Twitter bots, Chrome extensions and sites which claimed to book slots for you (for a small fee!)

**Ideation:**

This all started during a casual mid-day twitter browsing on a Wednesday (blame WFH!). On Apr 28, Dr. RS Sharma (CEO, National Health Authority) tweeted announcing the launch of Public APIs to fetch real-time slot availability and encouraged third-party applications to integrate them and help spread awareness about the vaccination drive.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Today, we have opened Co-Win APIs for vacancies search and downloading certificates of vaccinations for third party applications. API specs can be found at <a href="https://t.co/2t0Ac8Ftmi">https://t.co/2t0Ac8Ftmi</a>.</p>&mdash; Dr. RS Sharma (@rssharma3) <a href="https://twitter.com/rssharma3/status/1387252842667208704?ref_src=twsrc%5Etfw">April 28, 2021</a></blockquote>

Reading this tweet I discussed with my manager almost immediately that we should do something on this initiative. After all, I was also struggling to book a vaccine slot for my family and understood the need very well and could see the immediate benefit millions of people would get from such a tool and was confident we could build a value prop on top of the exposed APIs.

With the alignment set, I started pinging folks I knew who'd be willing to work over a weekend for a side project and to my amusement, everyone I pinged was interested to be a part! With the team in place we started studying the [Co-WIN APIs](https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2) almost immediately.

Sadly, the initial APIs were behind an authorization layer and couldn’t be used publicly. We wrote to the folks at Co-WIN and to my surprise, the Government machinery worked round the clock on it (even during the weekend) and around Saturday evening on 30th April launched a public version of the APIs. This allowed anyone to hit the API to fetch real-time data on slot availability.

We started analysing the APIs around the evening, ideated and hashed out an MVP that had a meaningful value proposition for the end-user by the late night.

---

### Questions we had while starting the project:

Before we went ahead and started working on the project in full steam, there were a couple of WHYs and HOWs we thought to answer for ourselves and the team to have the right intensions and the idea of what we wanted to build.

#### I. Why should we do this?

This one was probably the easiest one to answer:

- **Social Cause:**

Getting people vaccinated was our best bet to overcome this pandemic! In our role as the technology leaders in the country it was our duty if I may say to help our users and fellow citizens in the best way we can to overcome this pandemic.

Creating this utility was our next small bit in making sure that information about the vaccination drive is widely available to users from all sections and strata of society and we are able to help them with relevant info to get them vaccinated sooner.

This motivation was meaningful enough to keep us motivated to burn the midnight oil for the next many days to create a “simple” tool to help our users.

“*simple” because we wanted to solve a complex problem at our end to make it simpler for the users to find and book slots.*

- **Business Sense:**

NONE, we thought of or wanted. We never had any discussion on if it makes any business sense for us or how we can earn money on this.

Till date, we have not added any promotions/ adverts or any have made use of any user generated data from this tool and kept this openly available to all users of our app. This was our humble offering to do a very small bit in the fight against this pandemic.


#### II. Why is it better than the existing solutions:

I have been asked this question multiple times by many friends and colleagues in the days following the launch of this tool. Couple of reasons we thought of then:

- **Reach**: Paytm has a wide user base (500+ Mn users!) spread across the country and with such a tool we might be able to help a much larger base and help in a widespread awareness for vaccination.
- **Technological Barrier:** Not many people are tech-savvy to be able to run bots/ utilities to find and book as and when new slots come. We wanted to bridge on this technology divide and make info about new slots accessible to anyone and everyone.
- **User Trust/ Data Privacy:** A lot of bots/ tools which cropped up were just data gathering dumps with no surety if they would ever work or if the user data was safe! With Paytm already being a trusted brand and us not requiring any details from the user (they were already in the Paytm app), ours was a much safer way for them to get vaccine availability related information.
- **Personalised Alerts:** The Telegram / Twitter bots served only for a handful of major cities (around 160 at the time of writing this article) and they were sending generalised alerts for slot availability. Our tool allowed us to go much deeper into user specific personalisation: basis PIN Code, vaccine type, dose count etc., which effectively meant every alert we sent to the user was highly relevant and instantly actionable. This became more and more useful as the vaccination drive progressed.
- **Enable users to directly book on Paytm:** We had an opportunity to improve on the overall vaccine booking experience for the users and wanted to finally build an integrated slot booking on our app (thankfully we were able to do so within a few weeks of launching the tool)

#### III. Can we handle scale?

Short Answer : Yes.

Long Answer: Yes, but we had to make the right architectural and design decisions and iterate quickly various times in order to do so.!
While designing the initial architecture, we designed the system with a target of 1 million users (we were happy to be proven wrong later!)

The tech folks did most of the magic here. We wanted the system to be cheap and scalable for us to allow us to run it for the many months to come until the vaccination drive finishes and be able to handle the scale this tool can potentially have. What we used is a combination of Mongo-DB and Lambda and created essentially a Stateless system to avoid storing/ processing too much data. Over the many weeks, we did multiple iterations to improve almost each and every aspect of the tool: the alerting logic, the UX, the frequency with which we sent out alerts, the customisation options and adding new functionalities to the tool.

#### IV. How quickly can we launch this?

Ideally we wanted to launch this as quickly as we could! This was an urgent requirement for millions of our users and launching this as fast as we possibly could was the need of the hour.

We set ourselves an insane timeline of **4 days** to launch the first version of this tool, since we didn't want it to delay our day work much or risk this project getting de-prioritised.

---

### Here’s how we actually did it……

What we started with is to narrow down a use-case for the tool which was important enough for us to build for. In Product Manager's lingo the user-story for it read like this: ***"***

 ***As a user I want the tool to help me find and book vaccine slots as easily as possible!"***

### I. Creating a strong value proposition for our tool

To figure out value prop, I analysed the existing options in the market to find a use-case we can excel at: the Co-WIN website, Aarogya Setu app and the Telegram and Twitter bots. We tried finding use-cases which were unserved.

**Problems with Co-WIN App :**

- Searching through the portal was really painful! When we launched they didn’t even have basic filters to sort through results ( like Age/ Vaccine Type/ Fee) and showed the complete non-filtered results for the PIN Code. This was a nightmare especially when you tried playing fastest fingers first fighting for the elusive 100 slots wanted by the millions in your district. We wanted our tool to allow for **easy filtering of results and to show only relevant results for the user.**
- There was no mechanism on when new slots came up and most users kept on endlessly refreshing the portal in hope of finding new slots. This was **a major pain point we wanted to solve for.**

**Problems with the Telegram/ Twitter bots:**

- As I mentioned earlier, these tools were not personalised. These tools sent alerts for all possible slot openings for a district: most users had requirement of only alerts for a specific criterion: basis Dose count (1/2), Vaccine Type (Covishield/ Covaxin), Fee Type (Free/Paid) or sometimes even just for a specific PIN Code. We wanted to **support personalised alerting**
- They only covered a handful of districts : starting with just Bangalore when we launched this tool and expanding to around 400 odd by the time of writing this article! Clearly the majority of INDIA lived outside these major districts and our aim was **to serve the entire Indian populace**.

**Establishing our value-prop:**

- The tool should allow users to search for slot availability basis pin code or district , age group, Vaccine and Dose type.
- To only show vaccination centres which had slots available for the user's criteria and to allow users to filter through the search results.
- If slots are not available, to allow users to set availability alerts. We will keep on checking when new slots open up and alert the users in real-time when slots open up for their locality. *Just to give a sense of the magnitude of supply-demand deficit, for a city like Delhi we have more than 1 Million users who wanted to be alerted for the elusive 300 odd vaccine slots which opened every day.* **This became the "Hero feature" of our product in the days to come.**

**Other considerations we had in mind:**

- To keep the tool similar to Co-WIN: Since a lot of users would be juggling between Co-WIN and our tool we wanted the tool to mimic the overall user flow of Co-WIN as closely as possible so that user's don't feel alienated while switching from one tool to another.
- To ensure we can easily enable booking flow in future: We wanted our tool to enable direct vaccine bookings in the future *(the government had already announced their plans to open the booking APIs for public)* and hence took conscious design decisions to ensure we can accommodate the booking flow quickly when needed
- Faster to build: Since we were chasing insane timelines and this tool was largely utilitarian and was to be used by different sections of the society, we kept the overall UI/UX decisions with these aspects in mind.

#### II. Launching an MVP Quickly

It was essential for us to launch an MVP quickly to validate our hypothesis if the market really had a need for such a tool and gather crucial user feedback. Since the APIs were launched over a weekend, it was not possible to get a designer aligned to get the UI of the app designed.

Thankfully in Paytm we have a [standard design library](https://thehardcopy.co/under-paytms-design-hood/) and we used that to our advantage. I opened Figma Design PODS, combined various existing UI elements based on our needs and created a workable UI flow. Also, since our focus was to not make the flow too different from the Co-WIN’s UI, it helped in making design decisions.

This is how our first cut (without any design inputs) looked like:

![First cut for Vaccine Finder Tool](/images/VaccineFinder_Screenshot.png)

The broad UI thankfully to my satisfaction (and my developer's happiness) has remained the same even after the many iterations.

In case you don’t know, I was also managing the **Mini Apps** Product and the [benefits](https://business.paytm.com/miniapps) we offer to our merchants via this platform also helped us immensely in this tool! Few I can share here were:

- To not have to worry about the UI we shipped with during launch since we could iterate on the UI pretty easily and not worry about releases due to it being a web-based framework
- The most important benefit was **instant adoption** for our tool since we could launch this in all older versions of the Paytm app with the Mini Apps SDK (*which effectively meant reaching almost 70-80% of the entire user base of Paytm instantly on launch!)*
- We were able to get user details like PIN Code/ Phone Number from the Native app and auto-fill that to add user delight

One other thing which helped us was the presence of **Paytm Chats**. (*As they say most successful things happen because of being at the right place at the right time!)*

Paytm had launched Chats a couple of months ago and having the Chat system enabled us to send real-time updates to millions of users at scale. We leveraged their architecture fully to design our alerting system around it.

With all this in place, we get on to work and built the MVP in the next 2 days: allowing users to search for vaccine slots, set availability alerts and get notified in real time when slots opened up for their locality.

**Broad System Design:**

We created a simple Front-end page which fetched data from Co-WIN's APIs directly and displayed it in a clean way on our app. Users could find slots, filter through availability results and set availability alerts for specific locations, when slots became available they would get an alert on their Paytm app.

To enable the alerting flow, we created a single API to allow users to subscribe to alerts and periodically fetch new data from Co-WIN APIs at our backend for those locations and alert users on Paytm Chats when any new slot opens up.

#### III. First Launch:

With all these decisions in place, we worked round the clock and launched this tool internally on 2nd  May (in under 48 hours!). We couldn’t make the app live for the entire Paytm user base initially due to rate limitations of Co-WIN APIs. We iterated and worked our way around that for the next few days and launched the tool officially on 6th May.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Happy to have done my small part in help India Vaccinate sooner :)<br>Paytm is tracking all the available vaccine slots across the country in real-time. Find available slots &amp; get instant alerts if a new vaccine slot opens up using : <a href="https://t.co/ctNq7PCYDr">https://t.co/ctNq7PCYDr</a> <a href="https://t.co/kvjj1DcLma">pic.twitter.com/kvjj1DcLma</a></p>&mdash; Prince Jain (@Prince_Jain17) <a href="https://twitter.com/Prince_Jain17/status/1390172849072001027?ref_src=twsrc%5Etfw">May 6, 2021</a></blockquote>

The response immediately after launch was phenomenal making all our efforts worthwhile! This is how the users trend looked like day over day:

![Vaccine Finder New User Trend](/images/VaccineFinder_Usergraph.png)

We were adding thousands of new users to the tool every hour and people started sharing on social media how they benefitted by these alerts and were able to book slots!
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The Notification update related to the vaccine available slots are awesome!<br>Thank you <a href="https://twitter.com/Paytm?ref_src=twsrc%5Etfw">@Paytm</a> for the remainders. Appreciate your efforts. <a href="https://twitter.com/vijayshekhar?ref_src=twsrc%5Etfw">@vijayshekhar</a> <a href="https://twitter.com/hashtag/gratitude?src=hash&amp;ref_src=twsrc%5Etfw">#gratitude</a> <a href="https://twitter.com/hashtag/cowin?src=hash&amp;ref_src=twsrc%5Etfw">#cowin</a> <a href="https://twitter.com/hashtag/CovidIndia?src=hash&amp;ref_src=twsrc%5Etfw">#CovidIndia</a> <a href="https://twitter.com/hashtag/Paytm?src=hash&amp;ref_src=twsrc%5Etfw">#Paytm</a></p>&mdash; Afreed Patan (@afreedUX) <a href="https://twitter.com/afreedUX/status/1391729370956406786?ref_src=twsrc%5Etfw">May 10, 2021</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Vaccine slot notifier by <a href="https://twitter.com/Paytm?ref_src=twsrc%5Etfw">@Paytm</a> actually works, unlike many other such tools. <a href="https://twitter.com/vijayshekhar?ref_src=twsrc%5Etfw">@vijayshekhar</a> definitely knows how to help Indians at large scale, given the current scale of paytm app, even in tier 2 &amp; 3 towns, it was just perfect to launch vaccine slot notifier. 👍 <a href="https://t.co/OcuH6dfHhI">https://t.co/OcuH6dfHhI</a></p>&mdash; ak47_iitm (@ajhaamit39) <a href="https://twitter.com/ajhaamit39/status/1391008391410057220?ref_src=twsrc%5Etfw">May 8, 2021</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I was trying to schedule a vaccine appointment for the last 10 days but all slots were showing booked. <br><br>Thanks to <a href="https://twitter.com/Paytm?ref_src=twsrc%5Etfw">@Paytm</a> for simplifying the process. Got the availability alert when the slots open, booked my slot and got the confirmation.<br><br>Thanks, <a href="https://twitter.com/vijayshekhar?ref_src=twsrc%5Etfw">@vijayshekhar</a> &amp; Team.</p>&mdash; Adarsh (@ada10rsh) <a href="https://twitter.com/ada10rsh/status/1391024868435533827?ref_src=twsrc%5Etfw">May 8, 2021</a></blockquote>

These messages (and many of the personal one's on WhatsApp) literally helped boost the entire team’s motivation to keep on iterating and making this tool as useful as we could.

#### IV. Major Milestones:

While we did the first launch in under 5 days, it took us almost the next 2 months to perfect the tool. With each version we were improving specific aspects of the tool, be it adding new features, improving alerting speed or accuracy, adding more customisation options and working on user feedback and suggestions.

I have tried summarising the major versions we had for the tool:

- **Version 1- MVP Launch:** Enable users to find available slots and set availability alerts, launched on 6th May.

  <blockquote class="twitter-tweet"><p lang="en" dir="ltr">🚨 BREAKING: Now track &amp; get real-time alerts about COVID vaccination slots in your city on the Paytm App! 📱<br><br>Get Started: <a href="https://t.co/tcYY5cbXKq">https://t.co/tcYY5cbXKq</a> <a href="https://t.co/LHMyocZ8Jg">pic.twitter.com/LHMyocZ8Jg</a></p>&mdash; Paytm (@Paytm) <a href="https://twitter.com/Paytm/status/1390205121389154309?ref_src=twsrc%5Etfw">May 6, 2021</a></blockquote>

- **Version 2 -** **Improving the accuracy and speed of alerts:** We integrated directly with Co-WIN's web-hook to receive real-time availability information and tweaked a lot of backend logic to make our alerts as fast as we could and added some UI feature basis user feedback.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🚨 [Update] Basis your feedback, we&#39;ve added more enhancements to our COVID Vaccine Slot Finder tool.<br><br>Try here: <a href="https://t.co/tcYY5cbXKq">https://t.co/tcYY5cbXKq</a><br><br>Please RT and help India fight COVID-19. 🙏🏼 <a href="https://t.co/1JMuadkLMQ">pic.twitter.com/1JMuadkLMQ</a></p>&mdash; Paytm (@Paytm) <a href="https://twitter.com/Paytm/status/1391630208621416448?ref_src=twsrc%5Etfw">May 10, 2021</a></blockquote>

- **Version 3 - Enabled Booking Flow:** We finally got approval to enable vaccine booking directly on our app and enabled the booking flow on our app on 11th June.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">From instant alerts to now directly booking on your Paytm app – the new &amp; improved Vaccine Slot Finder tool is here.<br><br>Give it a go! 📱 💉</p>&mdash; Paytm (@Paytm) <a href="https://twitter.com/Paytm/status/1404375332354887680?ref_src=twsrc%5Etfw">June 14, 2021</a></blockquote>

- **Version** **4,5,6,...n:** During the course of the next many weeks, we iterated multiple times to improve our tool: adding new functionalities, supporting new vaccines types and even enabling users to download their International Travel Certificate. We even launched a (now viral) social media campaign to educate users

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ready, on your marks – <a href="https://twitter.com/hashtag/GetShotGo?src=hash&amp;ref_src=twsrc%5Etfw">#GetShotGo</a> 💉 <a href="https://t.co/Em9nsWnJ9p">pic.twitter.com/Em9nsWnJ9p</a></p>&mdash; Paytm (@Paytm) <a href="https://twitter.com/Paytm/status/1405744353310433288?ref_src=twsrc%5Etfw">June 18, 2021</a></blockquote>

OK, I know, it’s time to wrap this up (although there is still so much more to write on this.. ;) )

Thanks for reaching this far to the end. If want to try the tool for your self you can still do so by visiting [https://m.paytm.me/vaccineslotfinder](https://m.paytm.me/vaccineslotfinder)

Let me conclude by sharing that this has been the single most satisfying project I have undertaken in my professional career. The ability to impact millions of people around me and see people getting benefitted from something I build is the utmost gratification for a Product Manager. ✌️

![Onto the Next challenge](/images/onto_the_next.gif)

Back to drawing boards.

#GetShotGo!
