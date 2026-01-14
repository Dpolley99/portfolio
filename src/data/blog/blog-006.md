---
id: "blog-006"
title: "Navigating React and Router DOM: Lessons from Building a Portfolio"
date: "2026-01-14"
excerpt: "A technical exploration of learning React and React Router DOM through real-world challenges encountered while building a personal portfolio."
tags: ["React", "React Router DOM", "Frontend Development", "Web Development", "Technical Insights"]
---

# Learning React Router DOM Through Real Challenges

Building a modern frontend application is rarely just about writing components—it’s about understanding how the pieces fit together. While developing this portfolio, I encountered a challenge that made me confront one of the most fundamental aspects of React: navigation.

---

## The Problem

I had multiple pages and sections: a home page with internal sections (About, Projects, Experience, Testimonials, Games), and separate pages like Blog and Games. Initially, I treated all navigation links the same way, using standard HTML <a> tags for every link, whether it was a section on the home page or a completely separate page.

This approach seemed harmless, but it led to subtle issues:
- Clicking on Blog caused a **full page reload**, breaking the React SPA flow.
- Mobile navigation behaved inconsistently, with links sometimes unresponsive or scrolling incorrectly.
- Hash links on the home page (/#about) worked fine, but route links (/blog, /games) didn’t behave as expected.

---

## Digging Deeper

This prompted me to revisit how React Router DOM handles navigation:

1. **Hash Links**  
   - Format: `/#section-id`  
   - Purpose: Jump to an element on the same page  
   - Behavior: Native browser scrolling; React Router not involved

2. **Route Links**  
   - Format: `/blog`, `/games`  
   - Purpose: Navigate to entirely separate pages managed by React Router  
   - Behavior: Must use `<Link>` or `<NavLink>` from `react-router-dom` to avoid full page reloads

The distinction is subtle but critical. Hash links and route links may look similar in markup but are fundamentally different in behavior.

---

## Implementing the Solution

To handle this cleanly, I introduced an `isRoute` property in my navigation data:

```javascript
const navLinks = [
  { href: "/#about", label: "About Me", isRoute: false },
  { href: "/blog", label: "Blog", isRoute: true },
]; 

```

Then, in my Navbar component, I conditionally rendered either an <a> or a <Link> depending on the type of link:

```javascript

{navLinks.map((link) =>
  link.isRoute ? (
    <Link to={link.href}>{link.label}</Link>
  ) : (
    <a href={link.href}>{link.label}</a>
  )
)}
```

This ensured:

- Smooth SPA navigation for route links
- Correct scrolling for hash links
- Consistent behavior across desktop and mobile menus

---

## Lessons Learned

Through this experience, I gained several practical insights:

- Always distinguish between **internal section links** and **full page routes** in React apps.
- React Router’s `<Link>` is not just syntactic sugar—it preserves the SPA state and prevents unnecessary reloads.
- A small abstraction (`isRoute`) can simplify conditional rendering and prevent subtle navigation bugs.
- Testing both desktop and mobile views is critical, as inconsistencies often appear only on smaller screens.

---

## Conclusion

What seemed like a small navigation problem became a deep dive into how React manages page state and URL changes. By carefully separating concerns and leveraging the right components, I was able to create a navigation experience that feels intuitive and responsive.

Even in a portfolio site, such details matter. They reinforce the discipline of thinking in terms of **React’s architecture** rather than just visual output. And this mindset scales directly to larger applications, where navigation, routing, and component lifecycle are all interdependent.



## Where this leaves me: 

I now have a solid grasp of React Router DOM’s nuances, and I approach navigation design with a structured methodology. I’ve learned that every component, no matter how small, interacts with the app’s routing system—and overlooking this can lead to unexpected issues.