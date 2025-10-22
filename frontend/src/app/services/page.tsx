'use client';

import { 
  WrenchScrewdriverIcon,
  CogIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  BeakerIcon,
  LightBulbIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CubeIcon,
  PrinterIcon,
  Cog6ToothIcon,
  WrenchIcon,
  PaintBrushIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function ServicesPage() {
  const services = [
    {
      icon: WrenchScrewdriverIcon,
      title: "Custom Electronics Assembly",
      description: "Professional assembly services for your electronic projects, from simple circuits to complex PCBs.",
      features: ["PCB Assembly", "Component Soldering", "Quality Testing", "Final Inspection"]
    },
    {
      icon: CubeIcon,
      title: "3D Design & Modeling",
      description: "Professional 3D design services for electronic enclosures, mechanical parts, and product visualization.",
      features: ["CAD Design", "3D Modeling", "Rendering", "Technical Drawings", "Prototype Visualization"]
    },
    {
      icon: PrinterIcon,
      title: "3D Printing & Manufacturing",
      description: "Complete 3D printing services for prototypes, custom parts, and small-scale manufacturing.",
      features: ["FDM 3D Printing", "SLA Printing", "Multi-material Printing", "Post-processing", "Custom Finishing"]
    },
    {
      icon: Cog6ToothIcon,
      title: "Custom Manufacturing",
      description: "End-to-end manufacturing services from design to production for electronic products and components.",
      features: ["CNC Machining", "Injection Molding", "Sheet Metal Fabrication", "Assembly Line Setup", "Quality Control"]
    },
    {
      icon: WrenchIcon,
      title: "Mechanical Design & Engineering",
      description: "Complete mechanical design services for electronic products, enclosures, and mechanical systems.",
      features: ["Mechanical CAD", "Stress Analysis", "Material Selection", "Manufacturing Design", "Assembly Instructions"]
    },
    {
      icon: CogIcon,
      title: "Prototype Development",
      description: "Turn your ideas into reality with our comprehensive prototype development services.",
      features: ["Circuit Design", "3D Modeling", "Rapid Prototyping", "Iterative Testing"]
    },
    {
      icon: ComputerDesktopIcon,
      title: "IoT Solutions",
      description: "Complete Internet of Things solutions for smart homes, industrial monitoring, and automation.",
      features: ["Sensor Integration", "Data Analytics", "Cloud Connectivity", "Mobile Apps"]
    },
    {
      icon: CpuChipIcon,
      title: "Microcontroller Programming",
      description: "Expert programming services for Arduino, ESP32, Raspberry Pi, and other microcontrollers.",
      features: ["Arduino Programming", "ESP32 Development", "Raspberry Pi Setup", "Custom Firmware"]
    },
    {
      icon: PaintBrushIcon,
      title: "Product Design & Branding",
      description: "Complete product design services including industrial design, branding, and user experience.",
      features: ["Industrial Design", "Brand Identity", "Packaging Design", "User Interface Design", "Marketing Materials"]
    },
    {
      icon: BeakerIcon,
      title: "Testing & Quality Assurance",
      description: "Comprehensive testing services to ensure your electronic products meet industry standards.",
      features: ["Functional Testing", "Environmental Testing", "Performance Analysis", "Certification Support"]
    },
    {
      icon: DocumentTextIcon,
      title: "Documentation & Technical Writing",
      description: "Professional documentation services for technical manuals, user guides, and specifications.",
      features: ["Technical Manuals", "User Guides", "API Documentation", "Specification Sheets", "Training Materials"]
    },
    {
      icon: LightBulbIcon,
      title: "Technical Consulting",
      description: "Expert consultation for component selection, circuit design, and technical problem-solving.",
      features: ["Component Selection", "Circuit Design Review", "Troubleshooting", "Technical Documentation"]
    }
  ];

  const whyChooseUs = [
    {
      title: "Expert Team",
      description: "Our engineers have 10+ years of experience in electronics and embedded systems."
    },
    {
      title: "Fast Turnaround",
      description: "Quick project delivery without compromising on quality and precision."
    },
    {
      title: "Competitive Pricing",
      description: "Affordable rates with transparent pricing and no hidden costs."
    },
    {
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with comprehensive testing and quality assurance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Electronics & Manufacturing Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-orange-100">
              From 3D design to full-scale manufacturing, we provide end-to-end solutions 
              for electronics products, prototypes, and custom manufacturing needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">3D Design & Modeling</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">3D Printing</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Custom Manufacturing</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Electronics Assembly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of electronics services to help you bring your ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Manufacturing Capabilities
            </h2>
            <p className="text-lg text-gray-600">
              State-of-the-art equipment and processes for precision manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <CubeIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3D Design & CAD</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• SolidWorks & Fusion 360</li>
                <li>• Mechanical Design</li>
                <li>• Product Visualization</li>
                <li>• Technical Drawings</li>
                <li>• Design for Manufacturing</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <PrinterIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3D Printing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• FDM (PLA, ABS, PETG)</li>
                <li>• SLA Resin Printing</li>
                <li>• Multi-material Printing</li>
                <li>• Large Format Printing</li>
                <li>• Post-processing & Finishing</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Cog6ToothIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">CNC Machining</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 3-Axis CNC Milling</li>
                <li>• Precision Turning</li>
                <li>• Aluminum & Steel</li>
                <li>• Prototype to Production</li>
                <li>• Tight Tolerances (±0.001")</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <WrenchIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sheet Metal</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Laser Cutting</li>
                <li>• Bending & Forming</li>
                <li>• Welding Services</li>
                <li>• Powder Coating</li>
                <li>• Assembly & Finishing</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <WrenchScrewdriverIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Electronics Assembly</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• PCB Assembly (SMT & THT)</li>
                <li>• Component Sourcing</li>
                <li>• Quality Testing</li>
                <li>• Cable Assembly</li>
                <li>• Final Product Assembly</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <PaintBrushIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Finishing & Coating</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Powder Coating</li>
                <li>• Anodizing</li>
                <li>• Painting & Priming</li>
                <li>• Laser Engraving</li>
                <li>• Custom Branding</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">
              We combine technical expertise with customer-focused service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600">
              From concept to production, we follow a proven workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Design & 3D Modeling</h3>
              <p className="text-gray-600">Create detailed 3D models and technical drawings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prototyping</h3>
              <p className="text-gray-600">3D print or machine prototype for testing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Testing & Refinement</h3>
              <p className="text-gray-600">Test prototype and refine design based on feedback</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Production</h3>
              <p className="text-gray-600">Manufacture final product using appropriate methods</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                5
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality & Delivery</h3>
              <p className="text-gray-600">Quality control and final product delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your requirements and get a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Get Free Quote
            </a>
            <a 
              href="tel:+918439781538" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Call Now: +91 8439781538
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
