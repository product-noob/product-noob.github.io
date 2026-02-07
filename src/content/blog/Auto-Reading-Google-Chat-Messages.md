---
pubDate: '2024-11-19'
title: "Automating Google Chat: Solving the 'Mark as Read' Problem"
description: "A JavaScript snippet I wrote to auto-read Google Chat messages to keep a clean inbox."
tags: ['Automation', 'Tech']
---

We’ve all been there — returning from a vacation, or just navigating the chaos of being in multiple teams and groups over time. You open Google Chat, and suddenly you're staring at an inbox filled with dozens, maybe even hundreds, of unread messages. Even if you're mentally prepared to catch up, the sheer volume can feel overwhelming. And the reality is, most of those messages are either outdated, no longer relevant, or already addressed by someone else. Still, the unread count lingers — and that clutter just bothers you (if you are anything like me).

If you're like me and prefer a clean, zero-notification environment, this becomes especially frustrating. Unlike Gmail, **Google Chat doesn't provide a simple "Mark All as Read" feature** for rooms under the Home tab. There are no batch controls, and manually clicking into each conversation is painfully inefficient.

So I did what any product-minded person would do - used a little AI (blame my rusty coding skills at this point), I created a script to automatically read all messages to solve this problem.

## The Problem with Google Chat's Unread Messages

Let's break down why this became such an annoyance:

- There's no native button to mark everything as read at once
- Clicking each unread thread requires loading separate pages
- After going through 20-30 threads, the process becomes mentally exhausting
- Most importantly, I just wanted a fresh start without the distraction of red notification markers

## The Solution: A Browser Script Approach

I wondered if I could use a simple browser script to automate this process by:

1. Finding all unread chat threads automatically
2. Clicking on them one by one (to mark them as read)
3. Navigating back and repeating until done

After some exploration, I found this was indeed possible. Here's how I approached it:

### Step 1: Examining the DOM Structure

Using browser developer tools, I inspected the unread thread elements and found some consistent attributes:

```html
<span role="listitem" data-is-unread="true">
```

Inside each thread, there was a div with class `.fh7VDd` that handled the click action. The strategy became clear - simulate mouse clicks on these elements.

### Step 2: Creating the Automation Script

I started with a simple script to test a single thread. Once that worked, I expanded it to include delays and limits:

```javascript
function clickUnreadThreadsWithLimitAndDelay(maxCount, delayMs) {
    let readCount = 0;

    function clickNextUnread() {
        const unreadThreads = document.querySelectorAll('span[role="listitem"][data-is-unread="true"]');
        console.log(`Remaining: ${unreadThreads.length}, Processed: ${readCount}/${maxCount}`);

        if (readCount >= maxCount) {
            console.log(`Reached limit of ${maxCount}. Stopping.`);
            return;
        }

        if (unreadThreads.length === 0) {
            console.log("No unread threads left. Done.");
            return;
        }

        const firstUnread = unreadThreads[0];
        const clickableDiv = firstUnread.querySelector('div.fh7VDd');

        if (!clickableDiv) {
            console.warn("Target element not found. Skipping...");
            return;
        }

        console.log(`Clicking unread thread #${readCount + 1}`);
        clickableDiv.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        clickableDiv.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        clickableDiv.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        readCount++;

        setTimeout(() => {
            window.history.back();

            setTimeout(() => {
                clickNextUnread();
            }, delayMs);
        }, 1000);
    }

    clickNextUnread();
}

// Run with your preferred settings:
clickUnreadThreadsWithLimitAndDelay(10, 2000); // Process up to 10 threads with 2s delay
```

### Step 3: Implementing the Solution

To use this script:

1. Open Google Chat on the Home tab where all your conversations are visible
2. Open your browser's developer console (F12 or Right-click > Inspect > Console)
3. Paste the script and press Enter
4. Adjust the parameters as needed (number of threads to process, delay between actions) and run clickUnreadThreadsWithLimitAndDelay.
5. Just wait and watch! :)

<figure style="text-align: center;">
  <img src="/images/googlechatnounread.png"
       alt="No Unread view on Google Chat"
       style="width: 80%; max-width: 800px; border: 1px solid #eee; border-radius: 6px; padding: 4px;">
  <figcaption style="font-size: 0.9em; color: #555;">Bliss when you see this on your Unreads tabs in Google Chat.</figcaption>
</figure>

## Potential Enhancements

There's room to expand this solution further, maybe someday I'll create those as well:

- Add AI generated summary of what all threads were auto-read to avoid missing out on anything. (leveraging basics of [Google Meet Summary extension](https://chromewebstore.google.com/detail/chatgpt-google-meet-summa/kofkiemddfpekcadmaeheonbbkhnclhj))
- Filter threads by specific sender before clicking so that DMs are not auto-read and only groups are.
- Create a browser extension for one-click access

---

_If you've faced similar issues with Google Chat or have created your own productivity hacks, I'd love to hear about them. If You need any help to create your own, feel free to reach out!_