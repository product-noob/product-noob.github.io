---
layout: post
title: Covid-19 Slot Finder App
---

## **How we started:**

It all started with a [Tweet](https://twitter.com/vijayshekhar/status/1387260729028272129)! Isn't that always the case now-a-days?

On Apr 28, RS Sharma (CEO, National Health Authority) tweeted announcing the launch of Public APIs to fetch real-time slot availability and encouraged third party applications to use them to help spread awareness about the vaccination drive and as an end goal to get India Vaccinated sooner!

[Tweet](https://twitter.com/vijayshekhar/status/1387260729028272129)

Reading this tweet (and the mention of "mini-apps" I pinged Shreyas that I wanted to be ap 

We started studying their [APIs](https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2) (almost immediately) after them being made public. Sadly, the initial APIs were behind an Authorisation layer and couldn’t be used publicly. To my amusement, the Government machinery worked round the clock on it! and around Saturday evening, 30th April launched a public version of the APIs.

[](https://apisetu.gov.in/public/marketplace/api/cowin/cowinapi-v2#/)

This allowed anyone to hit the availability API to fetch real-time (almost) data on slot availability.

We around evening of 30th (Saturday) started analyzing the APIs and hashing out an MVP which has a meaningful value proposition for the end user. It was clear to us that we want to be the first one to market to be able for this tool to go viral.

---

## **Question we had (before starting the project):**

### I. **Why should we do this?**

This one was probably the easiest one to answer:

- **Social Cause:**

Getting people vaccinated was our best bet to overcome this pandemic! In our role as the technology leaders in the country it was our duty if I may say to help our users and fellow citizens in the best way we can to overcome this pandemic. Paytm launched an [Oxygen Donation](https://paytm.com/oxygen-campaign#/donations?utm_source=social_media&utm_medium=Twitter&utm_campaign=oxygen) drive a couple of days back (and were able to get contributions of more than INR 350Mn from people across the country which Paytm and its partners matched in full ). 

Creating this utility was our next small bit in making sure that information about the vaccination drive is widely available to users from all sections and strata of society and we are able to help them with relevant info to get them vaccinated sooner.

This motivation was useful and meaningful enough to keep us motivated to burn the midnight oil for the next many days to create a “simple” tool to can help our users!

“*simple” because it was really a complex problem to solve for to make it simple for the end-user!*

- **Business Sense:**

****NONE, we thought of or wanted. We never had any discussion on if it makes any business sense for us or how we want to earn money on this.

We have not added any Promotions/ Adverts in this tool and kept this openly available to all users of our app ( without any barrier at all).

---

### II. **Why is it better than the bots/ other sites which are already present**

I have been asked this question multiple times by many friends and colleagues in the days following the launch of this tool. Couple of reasons we thought of:

- **Reach** : Paytm has a wide user base (600+ Mn users!) spread across the country and with such a tool we might be able to help a much larger base and help in a widespread awareness for vaccination among our users.
- **Technological Barrier:** Not many people are tech-savvy to be able to run bots/ utilities to fetch and book as and when new slots come. We wanted to bridge on this technology divide and make info about new slots accessible to anyone and everyone.
- **User Trust/ Data Privacy:** A lot of bots/ tools which cropped up were (for good or bad) just were data gathering dumps with no surity if they would ever work or if the user data was safe! With Paytm app being already trusted by the users and us not requiring any details from the user ( users were already are in the Paytm app), ours was a much safer way to get this information.
- **Using it the right way:** The bots are using Unethical ways to fetch new data. This was against the Terms under which government issues their APIs and by hitting private APIs meant to be used for actual booking flow, they were restricting access to those who couldn’t! We were using the APIs exposed publicly by the government to be used by Private players to broadcast slot availability data.
- **Personalised Alerts:** This became more and more useful as the vaccination drive progressed. The Telegram / Twitter groups were only for a handful of major cities (around 160 at the time of writing this article) and they were sending general alerts of slot availability. Our tool allowed us to go much deeper into user specific personalisation: basis the PIN Code, vaccine type, dose count etc., which effectively meant every alert we sent to the user was meaningful and instantly actionable.!

## III**. Can we handle scale?**

The tech folks did most of the magic here! We wanted the system to be cheap and scalable for us to be able to run this for the many months to come until the vaccination drive finishes and be able to handle the scale this tool can potentially have. What we used is a combination of Mongo-DB and Lambda and created essentially a Stateless system to avoid storing /processing too much data. We over the many weeks did multiple iterations to improve over the alerting logic, frequency with which we sent out alerts 

## IV**. How quickly can we launch this?**

Ideally as quickly as we can! This was an urgent requirement for millions of our users and launching this as fast as we possibly could was the need of the hour.

---

# **Here’s how we did it……**

### **Creating a strong Value Proposition for our tool:**

We wanted to improve from the existing options in the market: the Co-WIN app and the Telegram/ Twitter bots.

**Problems with Co-WIN App :**

- Searching through the portal was really painful!  When we were launching they didn’t even have basic filters to sort through data ( like Age/ Vaccine Type/ Fee) and showed all results irrespective of whether slots were available or not! This was a nightmare especially when you tried playing fastest fingers first fighting for the elusive 100 slots wanted by the millions in your district.
- There was no mechanism on when new slots come up and most users kept on endlessly refreshing the portal in hope of getting new slots! This was **a major pain point we wanted to solve for!**

**Problems with the Telegram/ Twitter bots:**

- As I mentioned earlier, these tools were not personalized. There were district specific tools and they just sent alerts when any slots opened up for that district: Many users had requirement of only alerts of a specific criterion: basis Dose count (1/2), Vaccine Type, Fee Type or sometimes even just for a bunch of PIN Codes.
- They only covered a handful of districts : started with just Bangalore when we launched this tool and expanding to around 160 by the time of writing this article! Clearly majority part of INDIA lives outside these top 160 districts! Our aim was to serve the entire Indian populace.

**Our Value Proposition:**

- The tool should allow users to search for available basis pin code OR district and age group and Dose type.
- If slots are available users can filter through the results basis Fee Type/ Vaccine Type and also search among the results basis Hospital Name/ PIN Code.
- If slots were not available users can subscribe for alerts : We’ll notify them on Paytm Chat real-time when slots for their chosen criteria are available and also facilitate them to quickly book for these slots directly via the Co-WIN Mini App inside the Paytm app itself!.

### Launching An MVP Quickly:

Since this announcement of APIs was done on a weekend, it was not possible to get a designer to discuss / get the UI designed.

Thankfully in Paytm we have a broadly standard design library and we used that to our advantage. We opened by Figma, combined various existing UI elements basis our needs and created a workable UI flow. Also, since our focus  was to not make the flow too different from the Co-WIN’s UI, it helped in keeping the design decisions simpler.!

This is how our first cut (without any design inputs) looked like! The broad UI thankfully to our amazement has remained the same even after the many iterations:

![Covid%20Slot%20Finder%20App%20cff2806c392149319ac4a212a2bb8d3e/Untitled.png](Covid%20Slot%20Finder%20App%20cff2806c392149319ac4a212a2bb8d3e/Untitled.png)

In case you don’t know, I am also managing the Mini Apps Product and the benefits we offer to our merchants via that platform also helped us immensely in this tool!

- We were able to get user’s PIN Code from the Native app and auto-fill that
- To not have to worry about the UI we shipped with during launch since we could iterate on the UI pretty easily and not worry about releases due to it being a web-based framework
- The most important one was **instant adoption** for our tool since we could launch this is older version of the Paytm app with the Mini Apps SDK (*which effectively meant almost 70-80% of total user base of Paytm)*

One other thing which helped us was the presence of Paytm Chats! We launched this a couple of months ago. The Chat system enabled us to send real-time updates to user via a dedicated Chat Head and we leveraged that fully to design our alerting system.

We created a single API to allow users to subscribe to alerts, periodically fetched new data from Co-WIN APIs for those subscriptions and alerted user on Paytm Chats when any new slot opened up.

With all these in place, we worked round the clock and launched this tool internally on 2nd  May (in under 48 hours!). We couldn’t not make that version live for the entire Paytm user base due to rate limitations of their APIs. We iterated over that in the next few days and launched the tool officially on 6th May.

[https://twitter.com/Prince_Jain17/status/1390172849072001027](https://twitter.com/Prince_Jain17/status/1390172849072001027)

[https://twitter.com/vijayshekhar/status/1390182267322916866](https://twitter.com/vijayshekhar/status/1390182267322916866)

The response immediately after launch was phenomenal! Making all our efforts worthwhile. This is how the users trend looked like:

![Covid%20Slot%20Finder%20App%20cff2806c392149319ac4a212a2bb8d3e/Untitled%201.png](Covid%20Slot%20Finder%20App%20cff2806c392149319ac4a212a2bb8d3e/Untitled%201.png)

We were adding thousands of new users to the tool every hour and people started getting sharing on social media how they benefitted by these alerts and were able to book slots!

[https://twitter.com/afreedUX/status/1391729370956406786](https://twitter.com/afreedUX/status/1391729370956406786)

[https://twitter.com/ajhaamit39/status/1391008391410057220](https://twitter.com/ajhaamit39/status/1391008391410057220)

[https://twitter.com/ada10rsh/status/1391024868435533827](https://twitter.com/ada10rsh/status/1391024868435533827)

This literally helped boost entire team’s motivation to keep on iterating and making this tool as useful as we could.

---

### Iterating endlessly to improve our tool every day!

During the course of next many days/ weeks we constantly iterated over our logic to send alerts. We wanted to balance out on sending instant alerts to the user with sending meaningful one’s. 

### **Strategy 1 : Pre-Launch**

A. **Requirements**:

- Getting fresh data for all the districts/ PIN Codes in India for next 4 weeks in a 1 hour window
- Alerting users basis alerts as soon as we found new slots for their subscription
- Running smaller batch of 5 mins (total 12 batches) fetching districts/ PIN Codes level availability data and triggering Chat pushes in every batch

At this point it was more of a POC than an actual Product. We wanted to understand the Co-WIN APIs  and their behaviour a bit better and accordingly plan for sending real time alerts and handling scale.

We quickly built a basic flow with the UI I described above and this basic backend system and launched internally. We shared the utility with our colleagues for feedback/ suggestions.

B. **Our findings:**

- One observation was that we were getting throttled by the government server’s. We were getting timed out and had to wait for a cool down period for around 10 mins
- This throttling came into effect when we tried fetching data for more than roughly 100 locations per batch.

*We can’t possibly hit distinct APIs for the 19.5k PIN Codes!*

### Strategy 2 : Launch Strategy (MVP)

A. **Research/ Findings**:

In our load testing of Co-WIN APIs we were able to hit close to around 750 hits per 15 min window. Government’s official documentation showed the limit of 100 hits per 5 min window. (maybe the government underquoted and over delivered…! eh?)

B. **Requirements**:

- We assumed that we’ll get users from around half of the total districts to use our tool (*that would be deemed a huge success!*) and hence started doing basic maths to accommodate the hits in within the threshold of ~250 per batch
- Fetch data for all the districts in a one hour window for next 4 weeks per district (12 batches of 5 mins)
- Use district level data to filter PIN Code level availability for alerts

C. **Alerting Logic**:

We calculated total number of slots per district/ PIN Code and if it was non 0, we alerted user every period
**Calculations for districts availability fetched per batch**

This was the MVP we launched with. We fetched 63 new districts every 5 mins and alerted users subscribed to these districts ( and pin codes in those districts) using our Chat flow.

*We can’t delay sending notifications for over an hour! Slots were getting filled much faster ( most times under 5 mins)*

We can’t delay sending notifications for over an hour! Slots were getting filled much faster ( most times under 5 mins)

### Strategy 3: Fetching data for all districts in 5 mins

A. **Findings/ Decisions**:

- The rate limit for the APIs was per IP and not global. We decided to spin up multiple IPs to overcome the rate limiting. This way we could fetch latest data Pan India in 5 mins
- New slots data was not changing for weeks farther than the current 2 weeks. We decided to reduce our week window for 4 to 3 weeks
- Users were getting too many alerts, some of them being non-relevant since slots were getting filled before they could act on the availability!

[Copy of Calculations of IPs required to accommodate all districts](https://www.notion.so/783772b9f4d04b22afd92c43e4c0b766)

Once we had the total instances we want to spun up, we calculated how we split up the Districts among the 6 instances:

[Copy of Split of Districts per IP](https://www.notion.so/dc2cfcdcb45249228138c85f094ac2b2)

With this and some other tricks ( can’t disclose them) we were able to do away with any IP restriction at all. We could hit any number of hits per batch.

*The problem of worrying about rate limiting was done!*

C. **Alerting Logic**:

We added a minimum threshold of slots available to qualify for an alert. We setup an value of 5 ( after some analysis of previous alerts we triggered).

Now we notified user if in a batch the total number of slots every batch were higher than 5.

We thought all is sorted now and we can beat the best bots out there! ( **TL:DR** : We did not until we did  lots and lots of iterations)

### **Strategy 4: Updating the data for all the districts every 2 mins:**

A. **Findings/ Decisions**:

- The slots were getting filled much faster! We had to reduce our batch frequency. Currently it was 5 mins and we wanted to reduce it as much as we could
- We decided to reduce our week window further to 2 weeks
- For some cases, users received multiple notification for a single centre since we alert until slots were higher than 5 for that centre.

B. **Alerting Logic**:

We added a logic to only trigger an alert if the new count if higher than previous count. This helped in reducing the  threshold of slots available to qualify for an alert.

*The tool was proving very useful in a large parts of the country but for metros and large cities the slots were getting filled much faster!*

### **Strategy 5: Updating the data for all the larger districts more frequently**

A. **Findings/ Decisions**:

- We were unable to compete with the Telegram/Twitter bots which updated data much more frequently almost multiple times in a minute ( *by this time all major cities and metros had their groups).*
- The slots were getting filled very quickly! We had to reduce our batch frequency.
- To be in rate limits, we decided to reduce our week window further to 1 weeks ( bots were only observing for 3-5 day window)
- For some cases we were sending few useless alerts when slots increased by just 1 /2 *( possibly cases being when users who booked a slot cancelled/ or failed to book due to captcha led to those slots being made available in the queue)*

B. **How do we find the cities to be processed faster:**

- We started with top 150 districts we had basis total subscriptions
- We cross verified the data with total users which opened the tool and searched for a slot and also with the districts for which had their telegram groups.
- The top 150 districts had more than 95% match with both these above filters!

We started querying data for these districts at a much faster frequency now ( 2 mins)

C. **Alerting Logic**:

We added a threshold of increase to qualify for an alert. After some analysis, we setup a threshold of increase as 5 to send subsequent alerts.

These iterations helped improve the utility of the tool considerably!

*We started seeing most users was proving very useful in a large parts of the country but for metros and large cities the slots were getting filled much faster!*

### Strategy 6: Updating the data for all the larger districts EVEN more frequently

A. **Decisions**:

- This was just a small iteration where we wanted to fetch data for new districts even faster: every 20 seconds.
- Since Lambda doesn’t allow time ranges less than 1 min, we decided to run it 3 times every minute and add a delay to spread out each invocation to 20 secs

This solved almost all problems with timeliness for major cities. We started sending relevant and real-time alerts to all users.

These improvements meant our tool was being shared more widely now! Users were able to find slots basis our alerts and recommended to their circles to use this tool.

*This created another problem now of how do we handle Scale! (a better problem to face than all above)*

### **Strategy 7: How do we ensure we are able to handle this massive scale! We can’t process 1 lac+ hits every 20 seconds!**

We did a lot of brainstorming on this one and had to take some difficult decisions to allow handling such scale.

A. **Findings:**

- We found that there were users who subscribed to over 100 alerts! We are still curious as to why someone would do it!!?
- Other observations was many people subscribed to district and multiple Pin code in those districts
- There were less than 5% of people who unsubscribed till now.!
- We were also taking a lot of time to process the alerts we had to send out since the overall count was way too high

B. **How do we send out less number of alerts:**

- [x]  Keep the window limited to 1 week ( to fetch faster)
- [x]  Add more filters for users while setting up alerts : Dose + Vaccine Type (and no ALL option)
- [x]  Increase overall threshold of increase to qualify for an alert
- [x]  Encourage people to give feedback and unsubscribe Only send user notification for districts if a user is subscribed for both district and its PIN Codes
- [x]  Allow limit of subscriptions per users ( say 10): went with 6
- [ ]  Auto-expire subscription after X days ( say 15)
- [ ]  Limit subscriptions based on ONLY PIN Code or District
- [ ]  To add more granular centre level thresholds (*like only trigger subsequent alert if a new hospital has slots added*

C. **How do we send out alerts faster:**

- Setup SQS Queue to do the processing for alerts
- Setup multiple Lambda’s to ensure there is no CPU throttling
- Increase our throughput for Chats (Target for 2500+ TPS)

### **Strategy 8: We launched the BOOKING FLOW!!**

**Background:**

While we were busy making improvements on our backend systems, we the end goal we wanted to aim for was the Booking Flow! Having tried the CoWIN and Aarogya Setu app myself I knew there was a lot of potential to improve on the user experience for the booking flow!

Since the government had clearly written on their portal that they allow Private players to use the protected APIs to create a booking flow! The API Spec details required to create a booking flow were all available in public domain.

![Covid%20Slot%20Finder%20App%20cff2806c392149319ac4a212a2bb8d3e/Untitled%202.png](Covid%20Slot%20Finder%20App%20cff2806c392149319ac4a212a2bb8d3e/Untitled%202.png)

We wanted to be ready with out booking flow using these APIs with the expectation that we want to launch this tool as soon as government started giving access to these APIs to private players!

**Thinking behind the flow:**

I wanted the app to be as simple and intuitive as it can be ( understanding the kind of audience it had to cater to) and for it to solve existing pain points in the other booking apps: 

- User only needs to see the centres which have slots available. When slots open it literally is the game of faster-fingers first and saving even few milli seconds could be game changer! Existing options showed a list of all centres irrespective of Age or Availability filter! It sometime took many seconds just to find a centre for which slot opened.
- Cache the access token until it expires. The token as per our observations is valid for around 12-15 mins. There should be no need for a user to re-login multiple times before this expiry and we tried to solve for that.
- Support more advanced filters: Vaccine Type/ Dose etc to allow users to quickly find specific slots basis their needs.
- There was no easy option to refresh, the only way was to search for the same criteria again and re-apply the age filters. We wanted to have a auto-refresh kind of mechanism with all filters automatically reapplied.

[Backend system alert optimisation](https://www.notion.so/Backend-system-alert-optimisation-6b654e2b60d34b32a22ecc1c2aa13c48)

**We launched the booking flow!**