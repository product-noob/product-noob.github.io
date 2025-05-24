---
layout: post
title:  "Creating Your First API with Database for Free"
description: "A comprehensive guide to building your first API with a database backend using free services and tools."
date: 2025-05-24
---

Building your first API with a database doesn't have to be expensive or complicated. In this guide, we'll walk through creating a fully functional API with persistent data storage using entirely free services and tools.

# Create Your First API with Free Permanent Storage on Google Cloud (Beginner's Guide)



Want to build your own API but don't know where to start? Worried about costs? This guide will walk you through creating two simple API endpoints – one to store data and another to fetch it – using Google Cloud's generous free tier. We'll use Node.js for our API logic and Firestore for permanent, free NoSQL database storage.



By the end of this tutorial, you'll have your own working APIs that you can even call from your own website!



## What You'll Build



1.  **An API to Store Data:** This endpoint will accept data (like a name and email) and save it to a database.

2.  **An API to Fetch Data:** This endpoint will retrieve the data you've stored. It will support fetching all data or searching for specific data by name.



## Prerequisites



* **A Google Account:** Like a Gmail account.

* **A Web Browser:** For accessing the Google Cloud Console.

* **(Optional but helpful) A Text Editor:** To easily copy and manage code snippets before pasting them into the Google Cloud editor.

* **(Optional) `curl` or a tool like Postman:** For testing your APIs. We'll provide `curl` examples.



## Phase 1: Setting Up Your Google Cloud Environment



First, we need to get your Google Cloud environment ready.



### 1. Sign Up for Google Cloud Platform (GCP)

   * Go to the [Google Cloud Console](https://console.cloud.google.com/).

   * Sign in with your Google account.

   * If you're new, you'll be eligible for a **Free Trial** which often includes free credits (e.g., $300) to explore services beyond the "Always Free" tier. You'll generally need to provide billing information for verification, but you won't be charged as long as you stay within the Free Tier limits.



### 2. Create a New Project

   * In the Google Cloud Console, find the project selector at the top (it might say "Select a project").

   * Click it and choose "**New Project**".

   * Give your project a name (e.g., `my-first-apis`).

   * Click "**Create**".



### 3. Enable Necessary APIs

   For our project, we need to enable two main services:

   * In the console's search bar, type "**Cloud Run API**", select it, and click "**Enable**".

   * Then, search for "**Cloud Firestore API**", select it, and click "**Enable**".



### 4. Set Up Firestore (Our Database)

   Firestore is a NoSQL document database that's easy to use and has a generous free tier.

   1. In the console's search bar, type "**Firestore**" and select it.

   2. Click "**Select Native Mode**".

   3. Choose a **location** for your database (pick one geographically close to you or your users).

   4. Click "**Create Database**". This might take a few minutes.



## Phase 2: Creating the API to Store Data



This API will receive a name and email via an HTTP POST request and store them in Firestore. We'll use Cloud Run, a service that can run your code (even simple functions) without you managing servers.



### 1. Navigate to Cloud Run

   * In the console search bar, type "**Cloud Run**" and select it.



### 2. Create the "Store Data" Service

   * Click "**Create Service**".

   * **Configuration:**

      * **Source:** Select "**Deploy one revision from an existing container image**" initially, then look for an option to switch to deploying source code directly. You want to find and select the option similar to "**Continuously deploy new revisions from a source repository**" and then choose to build from source with the **inline editor** OR directly an option like "**Use an inline editor to create a function**" or "Build from source". The goal is to get to the inline code editor. (This was a point of confusion earlier, the UI might vary slightly, but look for inline editing or deploying a simple function).

      * **Service name:** `store-user-data`

      * **Region:** Choose the same region you selected for Firestore.

      * **Runtime:** Select **Node.js** (e.g., Node.js 22 or a recent LTS version).

      * **Authentication:** For testing, select "**Allow unauthenticated invocations**".

         * **Security Note:** This makes your API public. For real applications, you'd secure this!

      * **Entry point (CRITICAL!):** Set this to `storeUserData`. This is the name of the function Cloud Run will execute from your `index.js`.



### 3. Add the Code

   You'll see an inline editor with `package.json` and `index.js` files.



   **`package.json`:**

   This file defines your project's dependencies.

   ```json

   {

     "name": "store-data-api",

     "version": "1.0.0",

     "description": "API to store data in Firestore",

     "main": "index.js",

     "dependencies": {

       "@google-cloud/firestore": "^7.7.0"

     },

     "engines": {

       "node": "20.x || 22.x"

     }

   }