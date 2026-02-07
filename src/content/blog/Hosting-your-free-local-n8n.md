---
pubDate: '2025-10-10'
title: "Hosting your own N8N Instance for FREE!"
description: "Sharing the step-by-step tutorial of how you can host a free n8n server on Google Cloud"
tags: ['Automation', 'Tech']
---

I’ve always had this itch to find hacks that let me do things others pay for — **for free**. There’s a strange thrill in that. From hosting this website forever free on GitHub Pages, to spinning up a no-cost backend on Supabase, to now running my own N8N automation stack for ₹0 (who pays $30 a month! :P) — it’s a bit of a sport at this point.  

 Thanks to AI, I’m tinkering with new tech almost daily, and I’ve come to love the small wins and the feeling of owning my setup end-to-end. This is one of those journeys.

In this article, I’ll walk you through how I self-host **n8n** —a fantastic workflow automation tool on **Google Cloud**, using **Docker Compose** and **Traefik** for automatic HTTPS. If you stay within Google’s free-tier limits, it runs at **₹0/month!**, and you end up with a clean, reproducible setup you can scale or shut down anytime.

---

## Questions I had while starting this project:
Before diving headfirst into the Google Cloud console, I had to answer a few "Whys" to make sure this was a rabbit hole worth going down.

### Why self-host n8n in the first place?
This one was easy to answer, and it came down to a few key things:

- **Control & Privacy:** My automations and credentials stay in my own virtual box. I wanted to give it access to my Gmail, WhatsApp, Contacts, and more, and I just wasn't comfortable doing that on a public hosted site where I didn't have full control.

- **Predictable Costs:** It’s free if you stick to the e2-micro free tier. Even if you scale up slightly, the costs are incredibly low (maybe ₹100-200 a month at most!). This beats a $30/month subscription any day.

- **Flexibility:** Using Docker makes it trivial to back up, move, or upgrade the entire stack. No vendor lock-in, just pure, unadulterated control.

### Why is this better than the paid options?
For me, it boiled down to these reasons:

- **No Limits on Workflows:** Most paid plans have tiers based on the number of workflows or execution steps. With a self-hosted instance, the only limit is your VM's capacity.

- **Learning Opportunity:** Setting this up forces you to learn about Docker, reverse proxies, and cloud infrastructure—skills that are incredibly valuable.

- **It's Just More Fun!** There's a certain satisfaction that comes from building and owning your own tools.

If any of these resonate, read on.

---

### What we’ll build

A minimal yet production‑grade stack:

- **Compute:** 1× `e2‑micro` VM on Google Cloud (Always Free, select US regions)
- **Reverse proxy:** Traefik with Let’s Encrypt (automatic TLS)
- **App:** n8n (Docker image)
- **Storage:** Docker volume for n8n data + optional “local files” folder for file nodes
- **Domain:** `n8n.yourdomain.com` pointing to the VM


### Prerequisites

Before we spin up our free automation empire, make sure you’ve got a few basics in place:

- A **domain or subdomain** you can tweak — for me, it’s `n8n.princejain.me` (yep, this one works!).
- A **Google Cloud account** with billing enabled — yes, even for the “free” tier, Google still needs a billing added for the project.
- A bit of **terminal comfort** (SSH, copy/paste commands, etc.) — or, worst case, surrender yourself to the GPT gods.

---
## Here’s how I actually did it...

### Step 1 — Create a Free VM on Google Cloud

1. Create or select an existing **Project** in the Google Cloud Console.
2. Enable **Compute Engine**.
3. **Create a VM** with these exact specs:
   - **Machine type:** `e2‑micro` (Always Free where eligible)
   - **Region:** Any eligible free‑tier region (choose one of `us‑west1`, `us‑central1`, `us‑east1`)
   - **OS:** Ubuntu 22.04 LTS (or latest LTS)
   - **Disk:** 30 GB Standard Persistent Disk
   - **Firewall:** Allow **HTTP** and **HTTPS**
4. Once it's create, note down the **external IP** — this is where we’ll point our domain.

> Tip: The free tier is time‑based for all `e2‑micro` instances across supported regions in a month. Stick to the eligible regions to avoid surprise charges.

### Step 2 — Pointing the Domain (DNS)

With the server up, I needed a public URL to access the instance. For that I created an **A record** for my subdomain, `n8n.princejain.me` pointing to the VM IP address we noted in previous step.

- **Host/Name:** `n8n` (or your choice)
- **Type:** A
- **Value:** `YOUR.VM.IP.ADDRESS`
- **TTL:** 5 min (or default)

Propagation is usually fast but can take longer depending on your registrar. You can check if the change has propagated using a tool like [DNS Checker](https://dnschecker.org).and you will get back the external IP of your VM.

### Step 3 — Installing the Building Blocks: Docker + Docker Compose

Next, SSH'd into the VM and install Docker, which lets us run n8n in a container.

```bash
# System updates
sudo apt-get update
sudo apt-get upgrade -y

# Install prerequisites
sudo apt-get install -y ca-certificates curl nano

# Add Docker's official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Set up the repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Quick sanity checks
docker --version
docker compose version
```


### Step 4 — Project layout & environment

Create a working directory and a shared files folder (very handy for n8n’s file nodes):

```bash
mkdir -p ~/n8n-compose
cd ~/n8n-compose
mkdir -p local-files
```

Create a `.env` file:

```bash
sudo nano .env
```

Paste and edit details based on your config:

```
# Where your n8n will be available:
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=n8n
# => https://n8n.yourdomain.com

# Timezone used by cron/schedules inside n8n
GENERIC_TIMEZONE=Asia/Kolkata

# Email for Let's Encrypt (Traefik) — certificate issuance
SSL_EMAIL=you@yourdomain.com
```

Save and exit (Ctrl+O, Enter, Ctrl+X).


Finally, create a `docker-compose.yml` file:

```bash
sudo nano docker-compose.yml
```

Paste:

```yaml
services:
  traefik:
    image: traefik
    restart: always
    command:
      - "--api=true"
      # NOTE: for production, secure/remove the dashboard; '--api.insecure=true' exposes it
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.web.http.redirections.entryPoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.mytlschallenge.acme.tlschallenge=true"
      - "--certificatesresolvers.mytlschallenge.acme.email=${SSL_EMAIL}"
      - "--certificatesresolvers.mytlschallenge.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - traefik_data:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro

  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    # Bind n8n only to localhost; Traefik terminates TLS
    ports:
      - "127.0.0.1:5678:5678"
    labels:
      - traefik.enable=true
      - traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
      - traefik.http.routers.n8n.tls=true
      - traefik.http.routers.n8n.entrypoints=web,websecure
      - traefik.http.routers.n8n.tls.certresolver=mytlschallenge
      - traefik.http.middlewares.n8n.headers.SSLRedirect=true
      - traefik.http.middlewares.n8n.headers.STSSeconds=315360000
      - traefik.http.middlewares.n8n.headers.browserXSSFilter=true
      - traefik.http.middlewares.n8n.headers.contentTypeNosniff=true
      - traefik.http.middlewares.n8n.headers.forceSTSHeader=true
      - traefik.http.middlewares.n8n.headers.SSLHost=${DOMAIN_NAME}
      - traefik.http.middlewares.n8n.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.n8n.headers.STSPreload=true
      - traefik.http.routers.n8n.middlewares=n8n@docker
    environment:
      - N8N_HOST=${SUBDOMAIN}.${DOMAIN_NAME}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${SUBDOMAIN}.${DOMAIN_NAME}/
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
    volumes:
      - n8n_data:/home/node/.n8n
      - ./local-files:/files

volumes:
  n8n_data:
  traefik_data:
```

### Almost done!

With everything in place, it was time to launch.

```bash
cd ~/n8n-compose
sudo docker compose up -d
```

Give it a minute for certificates to issue. Then open:

```
https://n8n.yourdomain.com
```

You should see n8n’s **owner account** screen. Create your account and you’re in. Your very own, free, and private automation server is live.

**Its Done!**

---
## Some Tips and Tricks 

- **Troubleshooting SSL**: If you get a certificate error, the quickest fix is to stop the containers, remove the old certificate, and restart.

```bash
sudo docker compose down
# If you mapped a host folder for certs, clear any stale file. With volumes (as above), a restart is usually enough.
sudo rm -rf ./letsencrypt/acme.json || true
sudo docker compose up -d
```

- **Upgrading n8n safely**

Periodically run these commands to keep your docker instance up-to-date:

```bash
cd ~/n8n-compose
sudo docker compose pull
sudo docker compose down
sudo docker compose up -d
```

### What next?

- Start wiring up workflows. The mounted `/files` path is super handy for import/export nodes.
- Add your OAuth credentials in n8n (they live securely in the volume).
- If you ever outgrow the `e2-micro` VM, you can just resize it or move the stack—Docker Compose makes it painless.


## TL;DR

- One free `e2‑micro` VM in an eligible region + Traefik + n8n
- Automatic HTTPS, persistent volumes, clean upgrade path
- Cheap, private, and fast to replicate for multiple environments

If you run into a snag or want to adapt this for another cloud, ping me—I’m happy to share what’s worked (and what hasn’t).
