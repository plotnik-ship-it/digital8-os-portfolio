import { useEffect } from 'react';
import { Printer } from 'lucide-react';

export default function ResumePage() {
  useEffect(() => {
    // Set page title
    document.title = 'Daniel Plotnik - Resume';
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-container">
      <style>{`
        @media screen {
          .resume-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
            color: #000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            position: relative;
          }
        }

        .print-button {
          position: fixed;
          top: 2rem;
          right: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #000;
          color: white;
          border: 2px solid #000;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .print-button:hover {
          background: white;
          color: #000;
        }

        .print-button:active {
          transform: scale(0.98);
        }

        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .resume-container {
            width: 100%;
            max-width: none;
            padding: 0;
            margin: 0;
            background: white;
            color: #000;
            box-sizing: border-box;
            height: auto;
            min-height: auto;
            overflow: visible;
            page-break-after: auto;
          }

          /* Hide print button and navigation */
          .print-button,
          nav, header, footer, .sidebar, .command-palette, .toast, .navigation-guide, .resume-icon {
            display: none !important;
          }

          /* Prevent awkward page breaks */
          .resume-section {
            page-break-inside: avoid;
            page-break-after: auto;
            margin-bottom: 1.5rem;
          }

          .experience-item {
            page-break-inside: avoid;
            page-break-after: auto;
            margin-bottom: 1.25rem;
          }

          .tech-stack-grid {
            page-break-inside: avoid;
          }

          .resume-header {
            page-break-after: avoid;
            page-break-inside: avoid;
          }

          /* Allow content to flow naturally */
          .resume-container * {
            page-break-inside: auto;
          }

          /* Prevent orphans and widows */
          h2, h3 {
            page-break-after: avoid;
            orphans: 3;
            widows: 3;
          }

          ul, ol {
            page-break-inside: avoid;
          }

          li {
            page-break-inside: avoid;
          }
        }

        .resume-header {
          border-bottom: 2px solid #000;
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
        }

        .resume-name {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          color: #000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .badge-container {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border: 1.5px solid #000;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          background: white;
          color: #000;
        }

        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #333;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .contact-label {
          font-weight: 500;
          color: #000;
        }

        .contact-link {
          color: #000;
          text-decoration: none;
          transition: text-decoration 0.2s;
        }

        .contact-link:hover {
          text-decoration: underline;
        }

        @media print {
          .contact-link {
            color: #000;
            text-decoration: none;
          }
        }

        .resume-section {
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          color: #000;
          border-bottom: 1px solid #000;
          padding-bottom: 0.25rem;
        }

        .summary-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #000;
        }

        .tech-stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .tech-item {
          font-size: 0.9rem;
          padding: 0.25rem 0;
          color: #000;
        }

        .experience-item {
          margin-bottom: 1rem;
        }

        .experience-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: #000;
        }

        .experience-title a {
          color: #000;
          text-decoration: none;
          transition: text-decoration 0.2s;
        }

        .experience-title a:hover {
          text-decoration: underline;
        }

        @media print {
          .experience-title a {
            color: #000;
            text-decoration: none;
          }
        }

        .experience-description {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .experience-highlights {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .experience-highlights li {
          font-size: 0.85rem;
          line-height: 1.6;
          color: #333;
          padding-left: 1rem;
          position: relative;
          margin-bottom: 0.25rem;
        }

        .experience-highlights li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #000;
        }

        .highlight-metric {
          background-color: #e2ff3b;
          padding: 0.15rem 0.4rem;
          font-weight: 600;
          color: #000;
          border-radius: 2px;
        }

        @media print {
          .highlight-metric {
            background-color: #e2ff3b;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Print to PDF Button */}
      <button className="print-button" onClick={handlePrint}>
        <Printer size={16} />
        Print to PDF
      </button>

      <div className="resume-header">
        <h1 className="resume-name">DANIEL PLOTNIK</h1>
        <div className="badge-container">
          <span className="badge">Design Engineer</span>
          <span className="badge">AI Specialist</span>
        </div>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a href="mailto:daniel@digital8.ca" className="contact-link">daniel@digital8.ca</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Portfolio:</span>
            <a href="https://os.digital8.ca" target="_blank" rel="noopener noreferrer" className="contact-link">os.digital8.ca</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">LinkedIn:</span>
            <a href="https://linkedin.com/in/daniel-plotnik" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/daniel-plotnik</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Location:</span>
            <span>Winnipeg, MB</span>
          </div>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="section-title">SUMMARY</h2>
        <p className="summary-text">
          Design Engineer specializing in AI-driven development with a focus on luxury aesthetics through technical precision. 
          Expert in crafting premium user interfaces that combine elegant design with cutting-edge AI/LLM workflows. 
          Proven ability to deliver high-performance applications with 60fps interactions, optimistic UI patterns, 
          and keyboard-first workflows while maintaining luxury brand standards.
        </p>
      </div>

      <div className="resume-section">
        <h2 className="section-title">TECHNICAL STACK</h2>
        <div className="tech-stack-grid">
          <div className="tech-item"><strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, Framer Motion</div>
          <div className="tech-item"><strong>State:</strong> Zustand, React Hooks</div>
          <div className="tech-item"><strong>AI/LLM:</strong> OpenAI API, AI Workflows, LLM Integration</div>
          <div className="tech-item"><strong>Tools:</strong> Vite, Git, Vercel, Figma</div>
          <div className="tech-item"><strong>Performance:</strong> Lighthouse Optimization, Core Web Vitals, TBT Optimization</div>
          <div className="tech-item"><strong>Architecture:</strong> Hybrid Systems, Custom Widget Injection, CMS Integration</div>
        </div>
      </div>

      <div className="resume-section">
        <h2 className="section-title">EXPERIENCE</h2>
        
        <div className="experience-item">
          <h3 className="experience-title">
            <a href="https://os.digital8.ca" target="_blank" rel="noopener noreferrer">Digital8 OS</a>
          </h3>
          <p className="experience-description">
            High-performance task management platform with Linear-inspired UX. Built with Next.js, TypeScript, and Zustand 
            for global state management achieving 60fps UI performance.
          </p>
          <ul className="experience-highlights">
            <li>
              Resolved <span className="highlight-metric">React Error #185</span> (Maximum Update Depth Exceeded) through 
              optimized filter logic and memoized state management, eliminating infinite re-render loops
            </li>
            <li>
              Achieved <span className="highlight-metric">100/100 Performance</span> Lighthouse scores across all metrics 
              through strategic optimization of state management and rendering patterns
            </li>
            <li>
              Implemented optimistic UI updates and keyboard-first workflow for seamless user experience
            </li>
            <li>
              Built command palette with CMDK library for instant navigation and action execution
            </li>
          </ul>
        </div>

        <div className="experience-item">
          <h3 className="experience-title">
            <a href="https://mytravelpoint.ca" target="_blank" rel="noopener noreferrer">MyTravelPoint Agency</a>
          </h3>
          <p className="experience-description">
            Hybrid architecture connecting a Duda CMS commercial site with a high-performance Next.js AI tool. 
            Orchestrated platform-native limitation bypass through custom widget injection and hybrid system design.
          </p>
          <ul className="experience-highlights">
            <li>
              Achieved <span className="highlight-metric">100/100 SEO</span> and 96 Best Practices scores despite platform constraints
            </li>
            <li>
              Developed <span className="highlight-metric">Hybrid Architecture</span> solution integrating Duda CMS with Next.js, 
              bypassing platform limitations through custom widget injection
            </li>
            <li>
              Optimized third-party script execution achieving 0ms Total Blocking Time on mobile
            </li>
            <li>
              Maintained Desktop Performance score of 82/100 while ensuring perfect SEO metrics
            </li>
          </ul>
        </div>

        <div className="experience-item">
          <h3 className="experience-title">
            <a href="https://planner.travelpoint.ca" target="_blank" rel="noopener noreferrer">TravelPoint Planner</a>
          </h3>
          <p className="experience-description">
            AI-powered travel orchestration engine that generates hyper-personalized itineraries based on complex user inputs.
          </p>
          <ul className="experience-highlights">
            <li>
              Engineered a Generative AI System integrating the OpenAI API to transform structured user data (destination, mood, traveler type) into detailed day-by-day itineraries
            </li>
            <li>
              Designed a luxury "Mission Control" interface with conditional form logic to capture granular travel preferences
            </li>
            <li>
              Implemented dynamic prompt engineering to ensure consistent, high-quality outputs tailored to the luxury travel market
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
