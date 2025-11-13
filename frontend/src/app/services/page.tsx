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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-blue-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Robostaan Logo" 
                className="h-20 w-auto drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Complete Electronics & Manufacturing Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100">
              From 3D design to full-scale manufacturing, we provide end-to-end solutions 
              for electronics products, prototypes, and custom manufacturing needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg">3D Design & Modeling</span>
              <span className="bg-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg">3D Printing</span>
              <span className="bg-orange-600 px-6 py-3 rounded-full font-semibold shadow-lg">Custom Manufacturing</span>
              <span className="bg-blue-600 px-6 py-3 rounded-full font-semibold shadow-lg">Electronics Assembly</span>
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
              <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6 border-t-4 border-orange-600 hover:scale-105 transform duration-200">
                <div className={`w-16 h-16 ${index % 2 === 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 ${index % 2 === 0 ? 'bg-orange-500' : 'bg-blue-500'} rounded-full mr-3`}></div>
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
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-l-4 border-orange-600 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <CubeIcon className="w-8 h-8 text-white" />
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

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <PrinterIcon className="w-8 h-8 text-white" />
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

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-l-4 border-orange-600 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Cog6ToothIcon className="w-8 h-8 text-white" />
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

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <WrenchIcon className="w-8 h-8 text-white" />
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

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-l-4 border-orange-600 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <WrenchScrewdriverIcon className="w-8 h-8 text-white" />
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

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-l-4 border-blue-600 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <PaintBrushIcon className="w-8 h-8 text-white" />
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
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <div className={`w-12 h-12 ${index % 2 === 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
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
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Design & 3D Modeling</h3>
              <p className="text-gray-600">Create detailed 3D models and technical drawings</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Prototyping</h3>
              <p className="text-gray-600">3D print or machine prototype for testing</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Testing & Refinement</h3>
              <p className="text-gray-600">Test prototype and refine design based on feedback</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Production</h3>
              <p className="text-gray-600">Manufacture final product using appropriate methods</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                5
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality & Delivery</h3>
              <p className="text-gray-600">Quality control and final product delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Get in touch with our team to discuss your requirements and get a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105"
            >
              Get Free Quote
            </a>
            <a 
              href="tel:+918439781538" 
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-secondary-800 transition-all transform hover:scale-105"
            >
              Call Now: +91 8439781538
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
