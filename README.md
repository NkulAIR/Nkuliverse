# Personal Design Portfolio & Brand Experience**

A multi-page creative portfolio web application designed to present the visual identity, design projects, and creative world of Nkululeko under the *Nkul-AIR™* brand. This was built as part of Harvard's CS50x Week 8 coursework.

## **System Description**

The core engineering and design purpose of this project is to combine responsive frontend web development with custom visual branding using semantic HTML, custom CSS properties, Bootstrap components, and event-driven JavaScript navigation.  
Nkuliverse allows visitors to explore multiple creative disciplines, specifically Graphic Design, Motion Design, and Typography through a centralized project directory and dedicated interactive carousel galleries. 

## **Core Features**

> * **Brand Identity & Bio**: A two-part hero landing page (index.html) and a custom profile layout (about.html) introducing Nkululeko, the *Nkul-AIR™* brand, and his creative background.  
> * **Categorized Project Hub**: A central project directory (projects.html) built with dark-themed cards that route users to three distinct design disciplines.  
> * **Interactive Media Galleries**: Dedicated showcase pages for Graphic Design (gd.html), Motion Design (md.html), and Typography (tp.html) utilizing Bootstrap slide carousels to display static imagery and animated GIFs.  
> * **Event-Driven Navigation & Social Integration**: A fixed navigation bar powered by a custom JavaScript click-event router (goToPage), complete with direct links to the 2022 Behance Logofolio, Instagram, and YouTube (contact.html).

## **Tech Stack**

> * **Course Context**: Harvard CS50x — Week 8 (HTML, CSS, JavaScript)  
> * **Frontend Markup**: HTML5 (header, nav, section, div, button, h1, img, ul, li, span, link)  
> * **Styling & UI Framework**: CSS3 (styles.css), Bootstrap (v5.2.3 & v4.5.3)  
> * **Interactivity & Routing**: Vanilla JavaScript (goToPage event handler), Bootstrap Bundle JS (Carousels)  
> * **Typography**: Google Fonts (*Climate Crisis*, *Montserrat*, *Open Sans*, *Archivo Black*, *EB Garamond*, *Michroma*) & CDNFonts (*Graphik Trial*)

> 

## **Project Structure**

This repository contains the HTML views, custom stylesheet, and technical specification for the portfolio web application.

Plaintext  
nkulair-nkuliverse/  
├── index.html                 \# Landing page with split hero section & brand intro  
├── about.html                 \# Creator bio ("Meet Nkululeko") & personal interests  
├── projects.html              \# Central hub linking to the 3 design categories  
├── gd.html                    \# 01\. Graphic Design portfolio carousel  
├── md.html                    \# 02\. Motion Design portfolio carousel  
├── tp.html                    \# 03\. Typography portfolio carousel  
├── contact.html               \# Contact page with animated GIF & social links  
├── styles.css                 \# Custom dark-theme styling, blur filters & media queries  
└── specification.txt          \# Documentation of HTML tags, CSS properties & JS/Bootstrap usage  
