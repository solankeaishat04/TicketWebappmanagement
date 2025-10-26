import React, { useState, useEffect, useRef } from "react";
import { FaTachometerAlt, FaTicketAlt, FaBookOpen, FaCog, FaArrowRight } from "react-icons/fa";

// Feature module types
interface OutputItem {
  text: string;
}

interface Step {
  id: string;
  description: string;
}

interface Module {
  moduleNum: number;
  title: string;
  sectionTitle: string;
  Icon: React.ElementType;
  keyFeatures: OutputItem[];
  detailedFeatures: Step[];
}

// Feature data
const featureModules: Module[] = [
  {
    moduleNum: 1,
    title: "Real-time performance metrics and overview",
    sectionTitle: "Dashboard",
    Icon: FaTachometerAlt,
    keyFeatures: [
      { text: "Real-time KPI visualization" },
      { text: "Pending ticket count and status" },
      { text: "SLA breach warnings (Red/Yellow)" },
      { text: "Agent performance metrics" },
    ],
    detailedFeatures: [
      { id: "1.1", description: "Interactive charts for ticket flow analysis" },
      { id: "1.2", description: "Filter and sort data by team, severity, or date" },
      { id: "1.3", description: "One-click access to open tickets and queues" },
      { id: "1.4", description: "Fully customizable widgets and layouts" },
    ],
  },
  {
    moduleNum: 2,
    title: "End-to-end ticket creation and lifecycle management",
    sectionTitle: "Ticketing",
    Icon: FaTicketAlt,
    keyFeatures: [
      { text: "Multi-channel input (Email, Portal, API)" },
      { text: "Automated categorization and routing" },
      { text: "Escalation paths management" },
      { text: "Complete audit trail and activity log" },
    ],
    detailedFeatures: [
      { id: "2.1", description: "Dynamic ticket submission forms with logic" },
      { id: "2.2", description: "Agent-to-agent assignment and transfer" },
      { id: "2.3", description: "In-app collaboration via notes and mentions" },
      { id: "2.4", description: "Bulk ticket action processing" },
    ],
  },
  {
    moduleNum: 3,
    title: "Empower users with powerful knowledge search",
    sectionTitle: "Self-Service",
    Icon: FaBookOpen,
    keyFeatures: [
      { text: "Integrated knowledge article search" },
      { text: "Public-facing ticket status updates" },
      { text: "Guided troubleshooting workflows" },
      { text: "User profile and request history management" },
    ],
    detailedFeatures: [
      { id: "3.1", description: "Searchable content hierarchy and versioning" },
      { id: "3.2", description: "Article creation and publishing tool for agents" },
      { id: "3.3", description: "User feedback and rating on articles" },
      { id: "3.4", description: "AI-powered article suggestions during ticket creation" },
    ],
  },
  {
    moduleNum: 4,
    title: "Configure, audit, and manage the entire platform",
    sectionTitle: "Admin",
    Icon: FaCog,
    keyFeatures: [
      { text: "Custom report builder with CSV/PDF export" },
      { text: "SLA configuration management" },
      { text: "User and role-based access control (RBAC)" },
      { text: "System health and integration monitoring" },
    ],
    detailedFeatures: [
      { id: "4.1", description: "Define and manage user roles (Agent, Manager, Admin)" },
      { id: "4.2", description: "Schedule automated report delivery" },
      { id: "4.3", description: "Integrate with external systems via APIs" },
      { id: "4.4", description: "Configure custom fields and ticket templates" },
    ],
  },
];

// --- ModuleBlock ---
const ModuleBlock: React.FC<{ module: Module }> = ({ module }) => {
  const Icon = module.Icon;
  return (
    <div className="flex flex-col items-center">
      {/* Key Features */}
      <div className="w-full bg-emerald-50 rounded-lg shadow-lg mb-4 p-4 md:h-48 border border-emerald-200">
        <div className="flex items-center text-emerald-800 mb-2">
          <FaArrowRight className="w-5 h-5 mr-2 rotate-[-90deg]" />
          <span className="text-sm font-semibold uppercase tracking-wider">Key Features</span>
        </div>
        <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700">
          {module.keyFeatures.map((feature, idx) => (
            <li key={idx} className="leading-tight">{feature.text}</li>
          ))}
        </ul>
      </div>

      {/* Main Module Card */}
      <div className="relative w-full">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border-2 border-emerald-600">
          <span className="text-xs font-bold text-emerald-800">Module {module.moduleNum}</span>
        </div>

        <div className="bg-emerald-700 text-white p-4 rounded-lg shadow-xl text-center">
          <Icon className="text-2xl mx-auto mb-1 opacity-80" />
          <h3 className="font-extrabold text-lg tracking-wide">{module.sectionTitle}</h3>
          <p className="text-sm opacity-90 font-light">{module.title}</p>
        </div>
      </div>

      <div className="hidden md:block w-0.5 h-8 bg-emerald-700 opacity-50"></div>
    </div>
  );
};

// --- FeatureList ---
const FeatureList: React.FC<{ module: Module }> = ({ module }) => (
  <div className="w-full space-y-1 mt-4 md:mt-0">
    {module.detailedFeatures.map(feature => (
      <div key={feature.id} className="flex items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-emerald-500">
        <div className="text-xs font-bold text-emerald-700 w-8 flex-shrink-0 pt-0.5">{feature.id}</div>
        <p className="text-sm text-gray-800 ml-2">{feature.description}</p>
      </div>
    ))}
  </div>
);

// --- Features Component with Intersection Observer ---
const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleModules, setVisibleModules] = useState<boolean[]>(featureModules.map(() => false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    if (containerRef.current) {
      const moduleElements = containerRef.current.querySelectorAll(".feature-module");

      moduleElements.forEach((el, idx) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleModules(prev => {
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(el);
        observers.push(observer);
      });
    }

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section id="features" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={containerRef}>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 border-b-2 border-emerald-500 pb-2 inline-block">
        Core Application Modules
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12">
        {featureModules.map((module, idx) => (
          <div
            key={module.moduleNum}
            className={`flex flex-col feature-module transform transition-all duration-700 ${
              visibleModules[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            }`}
          >
            <ModuleBlock module={module} />
            <div className="md:hidden w-full h-px bg-emerald-300 my-4"></div>
            <FeatureList module={module} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
