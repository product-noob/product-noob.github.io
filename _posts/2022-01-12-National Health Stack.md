---
layout: post
title:  "Explaining the National Health Stack"
description: "National Health Stack is an upcoming government initiative which might end up revolutionising healthcare in India"
---

The National Health Stack is a new digital health infrastructure launched by the National Health Authority of India, envisioned to serve as the building block for digitising the healthcare sector in the country.

It's essentially set of APIs to any which entity (public/ private) can hook into and enable complex solutions in the health space, the same way any fintech player these days can enable UPI payments with simple API integrations. The basics of the NHS are very similar to India stack and the way India Stack revolutionised Payments in the country (among other things), NHS is envisioned to revolutionise the healthcare ecosystem in India.

Before I start with detailing the National Health Stack, I believe it’s important to mention **India Stack**: it's imperative to understand how we reached here and what the future for healthcare may look like. Okay with that said, let's start with a crash course on **India Stack**.

India Stack is the comprehensive digital identity, payment, and data-management system we as a nation have been working towards for a little more than 10 years. Under it, we are trying to solve for the three economic primitives of identity, payments, and data.

**Stage 1: Digital Identity**

It all started with building the digital identity for all citizens under the Aadhaar initiative ( literally meaning “foundation” in Hindi). This gave everyone a unique 12-digit identification number that could be used to access a wide range of services.
More than 90% of the country’s population, 1.2 Bn of them have enrolled for a Aadhaar, about half of them linked it to their bank accounts.

<img src="/images/Health_Stack.png" alt="Aadhaar Trend" class="center">

Prior to Aadhaar, lack of a central identity meant nearly half of the country’s population lacked a nationally accepted identity. This meant complex processes for banks to verify identity, ultimately driving up the cost for banking. All other popular modes of identity (PAN, Passport, Driving License, Ration Card) are fragmented in their adoption and many lacks digitisation.

The Reserve Bank of India grasped this opportunity to transform banking. It created an electronic way for banks to verify customer’s identity using Aadhaar’s biometrics (e-KYC) and significantly brought down the cost of account opening. This coupled with the ambitious *Pradhan Mantri Jan Dhan Yojana* enabled more than 350 million new account openings.

**Stage 2: Interoperable Payments**

While the government was widening access to bank accounts, RBI under the NPCI arm launched a new layer of retail payments called as UPI (Unified Payments Interface). This enabled banks and non banks to talk and exchange payments inter-operably amongst one other.
> “*Since its launch in April 2016, UPI has been nothing short of a runaway success story, with few parallels in the history of global payments. In just 4 years, the second layer of India Stack grew from an ambitious idea to the world’s 5th largest payment network by volume, behind only Visa, Alipay, WeChat Pay, and MasterCard.*” - Tigerfeathers substack.
>

In simple sense, the way UPI works is that all banks are connected to a central server operated by NPCI (National Payments Corporation of India) and NPCI acts as a middlemen and a custodian of all the information exchange between banks.

<img src="/images/Health_Stack_1.png" alt="UPI Trend" class="center">

Banks can expose hooks (UPI handles like okhdfcbank, okicici) to private fintech players which allows them to extend seamless payments functionality to their users without having to implement a complex maze of banking flows.

From an end-user aspect, everyone is free to choose the app of their choice and transfer money (send/request) from one VPA handle to other. This has led unprecedented innovation and growth in the payments space in the country in the last 5 years.

**Stage 3: Data Empowerment through DEPA**

Solving for the primitives of identity and payments, led to India becoming data-rich. People from organised to semi and un-organised sectors including small shopkeepers, MSMEs, entrepreneurs and gig economy workers started generating digital payments footprint. This digital footprint could be used, for the first time, to provide evidence that builds trust with institutions. This could also enable better access to services that could meaningfully improve people’s lives and all this eventually creates a need to solve for **data ownership**.

The third and the final piece of India Stack focuses on establishing a new model for data governance in India. This is somewhat similar to what **[GPDR](https://gdpr.eu/what-is-gdpr/)** is for EU citizens.

_To understand why this is needed, think of a practical situation where you apply for a loan and the loan provider asks for your last 3 month bank statements. Like me, have you also felt uncomfortable sharing these? After all, they just need to verify your income to ensure you are capable to pay back your EMIs. Another problem in this regard is what if you receive income in multiple bank accounts, how do you prove your credit worthiness?_

This is what the DEPA aims to solve by putting users in control and ownership of their data. This is done by freeing up data from the ownership of those who generate it and putting the actual owners on that data in control. It solves to ensure that users should not struggle to access or share their data from institutions

> *DEPA replaces costly and cumbersome data
access and sharing practices that disempower individuals, such as bulk printout notarisation and physical submission, screen scraping, username/password sharing, and terms and conditions forms providing blanket consent.* - DEPA Consultation Paper
>

There is still a lot happening on this layer with an impending legislation under **[PDP Bill](https://www.meity.gov.in/writereaddata/files/Personal_Data_Protection_Bill,2018.pdf)** (Personal Data Protection) and many things are currently being build and enabled. The one which is most striking is the [Account Aggregator Framework](https://setu.co/data/account-aggregator) which is meant to solve for how we share our financial data.

<figure>
<img src="/images/Health_Stack_7.png" alt="The three layers of India Stack. Source: iSPIRT">
<figcaption>The three layers of India Stack. Source: iSPIRT</figcaption>
</figure>

In a nutshell, the India Stack enabled us widen access to financial services, dramatically lower the cost of confirming people’s identities and allowed control on access to people’s personal data  through consent:
- Identity: Aadhaar
- Payments: UPI
- Data: DEPA

*If you want to learn more about the India Stack, read **[this](https://tigerfeathers.substack.com/p/the-internet-country)** amazing blog on India Stack by Aaryaman Vir.*

---


#### **Introduction**

Now that you know about India Stack, before we dig deeper into the National Health Stack, I want to help you imagine a worldview where this infrastructure has come to life.

Lets take the case of a normal doctor consultation:

1. You visit a Hospital and find a QR on the registration desk. You pull out your smartphone, launch the app of your choice and scan it. The hospital instantly gets accurate information about you and you are instantly registered – *Profile Sharing*
2. The health facility then sends you a request, asking you to share relevant documents from your previous medical visits. You use your smartphone to relevant documents. -  *Health data sharing & consent*
3. When you walk into the doctor’s room, she has your full medical history open on her computer. She uses that to aid in your assessment and and writes you a new prescription. You instantly get a notification on your mobile and can view the recent prescription digitally - *Digital Health Records*
4. Doctor’s treatment plan and prescription shows up on your mobile and you can schedule a follow up visit or have a tele-consult or order medicines directly from your phone. - *Value added services like tele-consult, medicine ordering*
5. You can then use all these documents to get instant and seamless digital claims processed for your health insurance - *e-Insurance claims*

*These are some of the actual flows being enabled by the National Health Stack, currently being built piece by piece!*

#### Okay, so what is India Health Stack

Now that we have done a crash course on **India Stack** and understood what the future with NHS may look like, let’s actually try to understand it. NHS takes learnings from the best of what India stack has to offer:

***Identity layer from Aadhaar, Interoperability from UPI and data ownership from DEPA***

All the key traits of India stack are well utilised in National Health stack as well:

- **Presence-less layer** : Remove barrier for participation by giving digital identities and authentication mechanisms
- **Paper-less layer:** Enables digital records to be moved seamlessly linked with an individual’s identity
- **Consent layer:** Give users control over their data and allow them to share it in a safe and secure manner

India health stack is the infrastructure which aims to provide the foundational components for health programs in India. It aims to bring a holistic view across multiple health entities and enable interoperability between the various public and private players.
> “*Built as a Common Public Good by the Centre for adoption by all states, it will eliminate any repetitive efforts on part of, yet retain autonomy for, the states—paving way for rapid rollout of various health initiatives, achieve convergence and accelerate the momentum to achieve the goal of Universal Health Coverage*” - NHA
>

#### Health Stack Building Blocks

<figure>
<img src="/images/Health_Stack_2.png" alt="National Health Stack. Source: UHI Consultation Paper">
<figcaption>National Health Stack. Source: UHI Consultation Paper</figcaption>
</figure>

There are four broad layers or stack to the National Health Stack Architecture:

1. **JAM and Existing Digital Public Goods**: This is like the base layer which form the foundational layer in digital health services and sets foundations for interoperability by leveraging existing digital public goods (remember India Stack!). NDHM has been designed to operate effectively with and leverage Aadhaar, Jan Dhan Bank Accounts and Mobile (JAM), UPI, eSign, Digilocker, etc.
These integrations provide key functionalities in the NDHM architecture. For example, the creation of a Health ID for patients using Aadhaar authentication service to verify identity, and doctors can pull in their digitally issued certificates through DigiLocker when enrolling in the Healthcare Professionals Registry. NDHM is built with other such integrations in mind in a modular, scalable manner.

2. **Health Data Exchange Layer:** This layer encompasses the core digital infrastructure
modules needed to ensure the interoperability of various kinds of health data. These
building blocks include core participant registries, Health Information Exchange and Consent
Manager, Health Data Standards (based on FHIR), coding terminology and data
aggregation specifications that drive trust and shareability of health data between
patients and healthcare providers. Some of the key components of this layer are:
    -  **Digital** **Registries:** This is aimed to serve as a reliable and easily accessible master data about all the players in the health ecosystem. It plans to include consolidated e-registries for healthcare providers (hospitals, clinics, labs etc), beneficiaries, doctors, insurers and ASHAs etc. Similar to how every citizen has a digital identity with Aadhaar, every health participant will have a digital identity:
        1. **Health Id :** Each user in the system will be issued an unique 14-digit Health ID
        2. **Doctor Id:** Each doctor in the ecosystem will be issued a unique 14-digit Doctor ID.
        3. **Facility Registry:** Each participating healthcare facility (clinic/hospital/lab etc) will be issued a unique facility ID.

    -  **Health Information Exchange:** This lays down the principles of how health data is to be shared inter-operably between patients and health care providers. It lays down the FHIR so that health data is encoded in a machine readable and globally accepted format for it to be processed universally.
    Another key aspect of this layer is **“Consent”.** It lays down the details of a consent manager which details how users consent is managed, maintained and taken into account while sharing any health data. It also gives user the control or rather the ownership of their health data  

    -  **Health Claims Standards:** This component aims to provide building blocks for implementing a large scale health insurance program, with the vision of allowing private and public players to implement insurance schemes in a data driven manner through open APIs. It is meant to do enable of wide-impacting use cases in the Insurance space:
        1. Enable a policy engine to allow for defining and storing a machine readable insurance policies
        2. Instant digital activation of policy on verification of premium transfer
        3. Setting up a Claim Engine for auto adjudication of claims**.** Scope for a smart contract (shoutout to cryto bois’ reading this) to auto execute insurance payments on meetings conditions of the claim process
        4. Data modelling backed fraud detection, better visibility of past claims history and deeper analysis of suspicious claims

3. **Health Services Interface:** Building blocks in this layer are envisioned to enable interoperable and seamless interactions between the patients and providers of digital health services. It lays down the foundation of “open networks”

    ![Health Services Interface](/images/Health_Stack_3.png)

    Open Networks are set of shared technical standards, accessible to everyone. Being a non proprietary protocol means no one is locked into using any particular entity’s product and makes the ecosystem interoperable.

    This is akin to UPI and the role of NPCI in Payments layer of India Stack. The way NPCI controls the central server and lays out protocol for banks to talk to each other (maybe now you realise why I had to cover India Stack before!), this layer lays down open protocols for various participating health care entities to talk and exchange data with each other by a introducing the concept of **Unified Health Interface** (India Stack parallel: UPI 😉)

    UHI is envisioned as an open protocol for digital health services and aims to allow interactions between end-user applications (EUAs) and Health Service Providers (HSPs). This has the potential to bring a lot of benefits to the entire health ecosytem, ultimately bringing down the cost of delivery health care services: Interoperability, easy discoverability, trust and network effects.

    As a small snippet assume the current scenario where every health-tech player from Apollo to Practo to EkaCare needs to have their own onboarding flows for users and doctors, incur a significant cost for verification and data accuracy. These platform operators have put in place their own doctor credential verification systems to reassure end users but the standards used by these operators are not scrutinized by any regulatory body. In the UHI scheme of things, they can simply plugin to the NDHM stack and get the list of all users and doctors which are already onboarded and can choose to build value added services on top of the stack.

    <figure>
    <img src="/images/Health_Stack_4.png" alt="Digital Health Services possible on UHI. Source: NHA ">
    <figcaption>Digital Health Services possible on UHI. Source: NHA </figcaption>
    </figure>

4. **User Applications:** This is the final end-user layer of the NDHM ecosystem. It comprises the
applications and platforms developed by the government or private sector through which
patients, healthcare providers, insurers, researchers, policy makers, etc. access health services. The application layer will interact with the health services layer
and the health data layer to enable a wide range of digital health services and health data
interchange.UHI defines various entities with regards to their participation in the health information flow:
    - **Health Information Provider (HIP):** Any entity which generates Health information ( *Includes Hospitals, diagnostic centres, clinics, public health programs, telemedicine players, etc. )*
    - **Health Information User (HIU):** Any entity that would like to access health records of an individual ( *Includes doctors, hospitals or 3rd party app)*
    - **Health Repository Provider (HRP):** Software service providers who offer NDHM compliant software and long-term record storage to HIP/HIUs
    - **Public Health Record (PHR):** User facing app which facilitates HealthId creation, consent management and health record viewing. (by that definition most PHRs would be HIUs as well
    - **Health Locker:** Think of this as a Google Drive for your health documents. The way you have all your identity documents available in Digilocker, the same way users have an option to store all their health documents in a health locker.

        <figure>
        <img src="/images/Health_Stack_5.png" alt="High level information flow in UHI">
        <figcaption>High level information flow in UHI </figcaption>
        </figure>

     It is crucial to note that this layer is envisioned as the hotbed for market innovation. NDHM as an entity doesn’t aim to directly participate in user interactions and expects private and public sector participants to take a lead in building use cases and innovative solutions on top of this stack.


### Why do we need a National Health Stack?

A bunch of reasons. The broad idea is that a National Health Stack will enable us to digitise and standardise health service by getting all entities to talk to a single central system. This has a bunch of potential benefits:

- **Consolidate Digital Health**: A lot of our health documents these days are already in some form or other digital: be it the Covid Vaccination certificate or a Blood test report. The problem today is of consolidation since all these health data lie under various fragmented data systems and as a user we don't have a single place to store/view them. The health stack is supposed to solve this problem by bringing all your health documents under a single infrastructure.

- **Standardise Digital Health records**: Currently there is no standardisation on how different health entities generate/ consume health records. While there exists few globally accepted Health document standards, India lacks adoption and NHS plans to solve that by adopting the [FHIR](https://www.hl7.org/fhir/)  standardisation. So that all entities generate and recognise health reports in the same format and it can be made machine readable

- **Build longitudinal Health records**: A longitudinal health record is a collection of electronic medical record (EMR) of patient health information generated by one or more healthcare providers. Having your longitudinal health history available helps health professionals to quickly learn about your previous health history, allergies, medications and take quick remedial actions when urgently needed.

- **Derive analytical insights from data**: Once health data is standardised, consolidated and made machine readable there are many powerful use cases which can be build of top of it. One of the powerful one's is to enable big data analytics to determine the health scenario in the country, complex study of diseases and pandemics for medical research purposes.


Okay, so now that you understand the basic construct and why we may need the NHS for; lets look at some of key tenants on which this stack is based on:

### Key tenants of the Health Stack

- **Inter-Operablility**
UHI is designed to be a truly inter-operable model. You can have your health records from various different providers (Labs, clinics, private & government health facilities, self uploaded medical records) and all of it will be consolidated for the user linked to their Health ID and available to the entire ecosystem for access ***post an explicit end user consent.***
This ensures that health data is easily accessible by everyone in the ecosystem and large players do not build a closed wall around user data using their proprietary protocol.

- **Consent**
Another core tenant of UHI is that any user data flows only upon explicit user consent. No health data for the user flows There are even granular controls to choose the health document type and time validity for which the documents are shared. No entity can ever access your health documents without explicit consent.

- **Choice**
Another key fundamental of the UHI network is that it is **optional** and only users who wishes to participate in this network do. No one by default gets a Health Id or gets their data shared with anyone in the ecosystem  
_(**Note**: There was a known deviation to this where Health IDs were created for millions of users during their Covid Vaccination and has been rolled back since then)_

- **Ownership**
While the construct of ownership is still loosely defined, probably due to impeding PDP bill. The idea here is that user owns their health care data and are free to fetch their data from all healthcare entities in the ecosystem and store it permanently* for themselves in a separate health locker of their choice. (* depending on the capabilities of the Health Locker)

- **Privacy**
All user data is stored and is exchanged in an encrypted manner and only the relevant parties authorised (with a valid private key) can decrypt and view the health care data.

### Market Opportunities

While the Health Stack is still currently being worked upon and many opportunities will be unlocked once this ecosystem is fully developed, these are some of the more immediate opportunities for private players:

- **PHR App**: Any private entity which has a good understanding and capability to build user side flows can become a PHR App. It is essentially the app which users will use to interact with the UHI stack (like the fintech apps incase of UPI).
There are significant potential to integrate and enable a lot of value added services like payments, doctor ratings/reviews, health records storage, upselling services like insurance, lab tests, hardware devices etc.

- **Health Locker:** This is another user facing functionality enabled by NDHM. This is Google Drive equivalent of Health where users can store their longitudinal health data from all health providers, digitise existing health documents (uploading them) and ensuring its accessible and stored perenially.
This is the data layer of UHI stack and a lot of interesting use cases from insurance to analytics can be build on top of the health locker layer.

- **HIMS/ LIMS:** Most labs and hospitals currently use outdated HIMS systems, which barely serves the purpose of digitising their information flow. In order for them to integrate with the NDHM ecosystem, they would need to upgrade their information management systems to make it FHIR and UHI compliant and also invest considerably in hardware to digitise the data collection and viewing flow.
There is significant business potential for hardware and software players in hospital-tech.

> NDHM can spur a fundamental transformation in India’s healthcare system and unlock economic value worth over $200 billion by 2030- Niti Aayog
>
<figure>
   <img src="/images/Health_Stack_6.png" alt="Various Entities participating in UHI. Source: The Ken">
    <figcaption>Various Entities participating in UHI. Source: The Ken </figcaption>
</figure>


### Critics to UHI

There are some of the critics I have come across while researching and discussing about the UHI stack, detailing some of those here:

- **Its meant to INDIA and not for BHARAT**
While most of what I discussed about for the stack assumes the user has a smartphone (blame my privilege), most part of the UHI functions even without one! Users can create a HealthID account at health centres by showing physical documents and get a physical Health ID Card, and avail most of these services offline. The fundamental utlity of the documents available digitally still is valid. However, some intricate aspects like health data sharing and consent flow for non-smartphone users though are something yet to be detailed out further.

- **Health IDs were created without consent during Vaccination drive**
While there is some merit to this critic since the government did create HealthIDs for users without any explicit consent or education and most of them got to know about this when opening their vaccination certificate, there was no leakage or miss-use of user’s health data in my opinion.

   > Of 165 million health IDs that have been generated, Co-WIN alone aided in generation of 127 million of them
>

    Looking back this certainly was an oversight on behalf of policy makers but considering that no other document was added to this,  I don’t see this as any harm done. _**Note**: It has been rolled backed since then and new cowin certificates don’t have a HID._

- **Loose definition on encryption for Health Lockers/ PHR apps**
Currently there is not enough regulations/ policies around how health lockers/ PHR apps need to handle or store user’s health data. While NDHM lays out broad principles and guidelines, there are no well defined requirements on data encryption and storage for these entities.
In my opinion, as the ecosystem evolves, this will eventualy become more clearer.

- **Opposition from the incumbents**
This ecosystem in a lot of ways is a direct threat to the current business models of the incumbents.  Let's take Practo for example: it has invested considerable money and resources in getting tens of thousands of doctors onboarded and verified on their platform, which is the hook they use to get users onto their platform.
In the UHI scheme of things all health professional will be onboarded by NDHM and are available for all players to leverage. The moat Practo had (the closed wall) might be made irrelevant. But this is also why a lot of innovations might happen in health-tech space and new and interesting business models will arrive.

**The end.**

Thank you for bearing with me all the way till the end, I hope you got to learn something about the National Health Stack. <br>
_**Disclaimer:** As of writing this article, I am associated with Paytm working on their Health Initiative._

#### References:

- **[UHI Consultation Paper](https://abdm.gov.in/assets/uploads/consultation_papersDocs/UHI_Consultation_Paper.pdf)**
- **[National Health Stack Consultation Paper](https://abdm.gov.in/publications/NHS_Strategy_and_Approach)**
- **[DEPA Consultation Paper](https://www.niti.gov.in/sites/default/files/2020-09/DEPA-Book.pdf)**
- **[iSpirt Working Paper](https://itihaasa.com/public/pdf/History_and_Future_of_Digital_Health_in_the_World_and_India.pdf)**
- **[The Ken - Article on UHI](https://the-ken.com/story/behind-the-rush-and-hush-of-indias-digital-health-mission/)**

---
