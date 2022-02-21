---
layout: post
title:  "Approaching a System Design Interview"
description: "If you are also expecting to interview for a Technical PM role, this should be a useful read on the things you need to keep in mind"
---

**\*Disclaimer:** While a system design interview is generally asked in engineering interviews, some companies for their Technical PM roles do assess the systems knowledge of candidates. These are just some of my personal notes I wrote from memory to serve as a quick refresher.
If you are also expecting to interview for a TPM role, this should be a useful read.\*

### Before we see the structure here are some keywords commonly used in system design:

-   **API:** Application Programming Interface. Think of this as the way a software system interacts with other systems/ people. For instance, an ATM's "API" includes adding money, withdrawing money, and a few other functions.
-   **Back-end:** The back-end often refers to the server-side of a system (mostly where the logic of what to happen if certain data is passed resides. For eg: If credentials are correct login the user.).
-   **Cache**: A cache is like a storage of information or content so that requests can be quicker. Many times you would want to cache requests at different nodes to serve fast (Eg: CDN )
-   **CDN:** Content delivery network. To ensure data (mostly web assets) is served quickly for different geographies, generally for high-traffic use cases. (For eg: Netflix puts their popular content on CDNs near you to serve you faster and save their bandwidth)
-   **Client:** Clients are one part of the client-server model, where clients (e.g. a local computer) initiates a communication session with a server (e.g. a company server hosted on Amazon EC2).
-   **Cookie:** A cookie is a piece of data stored on a client's browser from sites a client visits. This data includes volunteered information including visited pages. A common function of a cookie is to help users not have to log in every time they visit a site.
-   **Database/DBMS**: Database management system. This is a software that allows users to create, read, and update entries in a database. For instance, Exponent's user database stores a list of user emails and passwords for each user to log in.
-   **DNS:** Domain name system. This is a naming system to help map domain names to IP Addresses and other pieces of information across the internet. (For eg: DNS of this blog is [princejain.me](http://princejain.me))
-   **Front-end:** The front-end often refers to the client-side of development (e.g. the page you're reading right now and how it's formatted).
-   **Latency:** This refers to the load time of an experience. For instance, the latency would be considered high if it takes a long time to download large image files to load a page.
-   **Load Balancer:** Load balancers help to distribute a task over a series of databases/servers as opposed to overloading a single one. This is generally helpful when there's high-traffic.
-   **Redis**: Redis is used to do database cache at the server side. Used when your server is serving a same set of data again and again, you can use redis to cache it so that the db hit is avoided and overall operation latency is reduced.
-   **Server:** Servers provide functions to one or many clients. For instance, a web server serves web pages to clients (e.g. local computers, like the one you're reading this on!)
-   **Sharding:** Sharding is the act of partitioning databases into smaller data shards, to optimize for database speed. For eg: address book from A-Z can be sharded into smaller chunks of A-D, E-H, etc.

### Structure I tend to follow in System Design:

1.  **Scoping**

    1.  Clarify the question
        For eg. If the question is design a clock for blind, clarify with questions like severity of blindness: partial or complete, any other disability, potential users eg. family members, care takers.

    2.  Scope the requirement
        Some of the sample questions for scoping:
            1. Questions like why are we doing this? Are we chasing a specific goal (revenue/ engagement etc.)
            2. Company’s history/ previous portfolio/ strengths.
            3. Is the solution for a specific geography?
            4. If there are any limitations to what we can do: bandwidth, cost, time, capability?

    Other question as relevant depending on the case.

    * * *

2.  **User Segmentation.**

    1.  Think of user personas/segments and their pain points
    2.  Think of varous use cases and solutions you can come up with
    3.  Try to evaluate the solutions and pick the one’s which makes most sense
    4.  Think of the high level design, you will need to build this system. Talk through it with your interviewer(s)

    * * *

3.  **System Design**

    1.  Lay down any assumptions you make, detail out all you need to build this system
    2.  Think of the design considerations for the solution. Some of the common ones are:

        1.  **High Availability:** This means ability of the system to serve the user at all times.
            Eg: live streaming, messaging
        2.  **Low Latency:** Latency in laymanish term is the time taken for a page/ app to load. Certain use cases require to optimise on the latency primarily.
            Eg: Online Gaming, Stock Trading, Conference calls
        3.  **Consistency:** This means how critical is it for everyone to have the same data. Most systems are okay with a eventual consistency.
            Eg: A user’s tweet doesn’t necesarily need to be available for all users immediately whereas banking system need to ensure high consitency for funds related data.
        4.  **Redunancy:** This tells how critical is the data. If there is a super critical data, multiple redunancies are put in place. Eg: Banking
        5.  **Scalability**: This is simply the scale the system can handle. Most systems these days are fairly scalable (thank AWS) and can be scaled up as reqd. However potential scale may end up deciding the system architecture in many cases.
            Eg: Cloud Storage like Google Drive, OTT platforms like Netflix, YouTube

        _Remember to keep practical constraints in mind: you can never aim for the best of everything. If you go for improving a particular aspect, it may inherently hamper the other_

    3.  **Designing the system** (Most cases interviewers won’t need this but this definitely serve as a good brownie point)

        1.  Start with laying down a broad block diagram connecting interactions b/w the systems.

            ![Untitled](System%20Des%20ea7f7/Untitled.png)

        2.  Then lay down the end points of the APIs which might be required.

            ![Untitled](System%20Des%20ea7f7/Untitled%201.png)

        3.  Ask if they want **data schema** to be designed. Data schema is the basic db structure with field name and data type. Common data types:

            1.  int (Integer)
            2.  timestamp (To store time)
            3.  bool (T/F)
            4.  string (Any string of text)
            5.  decimal
            6.  enum (pre-defined constants like size :s/m/l)

                ![Untitled](System%20Des%20ea7f7/Untitled%202.png)

4.  Mostly you are done with the system design aspect of the interview. Try to then bring into other considerations like constraints: cost, timeframe, team size, complexity, risks etc. and then accordingly prioritise among the solutions discussed.
5.  **Tracking and Success Metric:** This is often missed during an interview since around reaching this part of the interview you have already invested ~30 mins and want to end it. But this is a good identifier of your product+business sense in the aspect that if you know what success metrics would look like and what all would you want to track and monitor.

* * *

<aside>
💡 **Disclaimer:** I tend not to follow any set structure in interviews and prefer solving free hand, it’s something which has worked the best for me : to each his own.
However there having a broad sense of what all you should cover helps in ensuring you cover all scenarios.

</aside>

### Some keywords commonly used in system design:

-   **API:** Application Programming Interface. Think of this as the way a software system interacts with other systems/ people. For instance, an ATM's "API" includes adding money, withdrawing money, and a few other functions.
-   **Back-end:** The back-end often refers to the server-side of a system (mostly where the logic of what to happen if certain data is passed resides. For eg: If credentials are correct login the user.).
-   **Cache**: A cache is like a storage of information or content so that requests can be quicker. Many times you would want to cache requests at different nodes to serve fast (Eg: CDN )
-   **CDN:** Content delivery network. To ensure data (mostly web assets) is served quickly for different geographies, generally for high-traffic use cases. (For eg: Netflix puts their popular content on CDNs near you to serve you faster and save their bandwidth)
-   **Client:** Clients are one part of the client-server model, where clients (e.g. a local computer) initiates a communication session with a server (e.g. a company server hosted on Amazon EC2).
-   **Cookie:** A cookie is a piece of data stored on a client's browser from sites a client visits. This data includes volunteered information including visited pages. A common function of a cookie is to help users not have to log in every time they visit a site.
-   **Database/DBMS**: Database management system. This is a software that allows users to create, read, and update entries in a database. For instance, Exponent's user database stores a list of user emails and passwords for each user to log in.
-   **DNS:** Domain name system. This is a naming system to help map domain names to IP Addresses and other pieces of information across the internet. (For eg: DNS of this blog is [princejain.me](http://princejain.me))
-   **Front-end:** The front-end often refers to the client-side of development (e.g. the page you're reading right now and how it's formatted).
-   **Latency:** This refers to the load time of an experience. For instance, the latency would be considered high if it takes a long time to download large image files to load a page.
-   **Load Balancer:** Load balancers help to distribute a task over a series of databases/servers as opposed to overloading a single one. This is generally helpful when there's high-traffic.
-   **Redis**: Redis is used to do database cache at the server side. Used when your server is serving a same set of data again and again, you can use redis to cache it so that the db hit is avoided and overall operation latency is reduced.
-   **Server:** Servers provide functions to one or many clients. For instance, a web server serves web pages to clients (e.g. local computers, like the one you're reading this on!)
-   **Sharding:** Sharding is the act of partitioning databases into smaller data shards, to optimize for database speed. For eg: address book from A-Z can be sharded into smaller chunks of A-D, E-H, etc.

* * *

**Tools to use:** I personally use **[LucidChart](https://lucid.app/documents#/dashboard)** for preparing the designs during the interviews, some other tools like [draw.io](http://draw.io) and [excalidraw.com](http://excalidraw.com) are decent as well.

**A system design architecture I designed during an interview:**

![Untitled](System%20Des%20ea7f7/Untitled%203.png)

### Good Links to read about architecture design:

[System design fundamentals for technical product managers](https://www.linkedin.com/pulse/systems-design-fundamentals-technical-product-managers-pruthi/)
