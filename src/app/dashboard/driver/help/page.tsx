'use client';

import React, { useState } from 'react';
import { FiSearch, FiHelpCircle, FiBookOpen, FiMessageCircle, FiFileText, FiChevronRight, FiPhoneCall, FiMail, FiDownload, FiExternalLink, FiClipboard, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { FaCar, FaExclamationTriangle, FaGasPump } from 'react-icons/fa';

// FAQ data specific to drivers
const faqData = [
  {
    category: 'Driver App Usage',
    questions: [
      {
        question: 'How do I check my route and schedule for the day?',
        answer: 'From your driver dashboard, navigate to the "Dashboard" section where you can view your current day\'s schedule. You can see details about your route, stops, and estimated times.'
      },
      {
        question: 'How do I report a mechanical issue with my bus?',
        answer: 'Go to "Bus Manage" section, then select your current bus. Click on "Report Issue" and fill in the details about the mechanical problem. Include photos if possible.'
      },
      {
        question: 'How do I mark a passenger as boarded?',
        answer: 'In the "Passengers" section, locate the passenger on your list and tap the checkbox next to their name, or use the barcode scanner to scan their ticket when they board.'
      }
    ]
  },
  {
    category: 'Route Management',
    questions: [
      {
        question: 'What should I do if there is a road closure on my route?',
        answer: 'If you encounter a road closure, first ensure passenger safety. Use the "Alert" button in the app to report the issue. The system will suggest an alternative route and notify passengers of potential delays.'
      },
      {
        question: 'How do I navigate to a new stop that was added to my route?',
        answer: 'New stops will automatically appear in your navigation system. When approaching a new stop, the app will provide voice guidance and visual cues on the map.'
      },
      {
        question: 'How can I suggest a route improvement?',
        answer: 'Use the "Feedback" option in the app menu to suggest route improvements. Provide specific details about the suggested change and why it would be beneficial.'
      }
    ]
  },
  {
    category: 'Passenger Management',
    questions: [
      {
        question: 'What should I do if a passenger doesn\'t have a valid ticket?',
        answer: 'Politely explain that valid tickets are required. Direct them to purchase a ticket through the BusLink app or website. For exceptional circumstances, use the "Issue Temporary Pass" feature, which will be reviewed by management.'
      },
      {
        question: 'How do I help passengers with special needs?',
        answer: 'For passengers with special needs, the app will notify you in advance. Use the accessibility features on your bus (ramp, reserved seating) and offer assistance as needed. Take extra time for boarding and alighting if necessary.'
      },
      {
        question: 'How do I handle a disruptive passenger?',
        answer: 'Remain calm and professional. First attempt to resolve the situation through clear communication. If the issue persists, use the "Emergency Support" option in the app to connect with dispatch who can provide further assistance or send security personnel if needed.'
      }
    ]
  },
  {
    category: 'Vehicle Maintenance',
    questions: [
      {
        question: 'What daily checks should I perform on my bus?',
        answer: 'Before starting your shift, check: fuel levels, tire pressure, lights (headlights, indicators, brake lights), wipers, brakes, and fluid levels. Use the "Pre-trip Checklist" in the app to document your inspection.'
      },
      {
        question: 'How do I report a fuel efficiency issue?',
        answer: 'Go to the "Bus Manage" section, select your bus, then tap "Fuel Efficiency Report." Enter the details of the issue, including when you first noticed it and any patterns you\'ve observed.'
      },
      {
        question: 'What do the different maintenance alert colors mean?',
        answer: 'Red alerts require immediate attention and may prevent you from starting your route. Yellow alerts are warnings that need attention soon but don\'t impact immediate operations. Green notifications are just routine maintenance reminders.'
      }
    ]
  },
  {
    category: 'Emergency Procedures',
    questions: [
      {
        question: 'What should I do in case of an accident?',
        answer: 'First ensure passenger safety and call emergency services if needed. Use the "Emergency" button in the app to immediately notify dispatch. Document the scene with photos if possible and collect contact information from witnesses. Complete the incident report form in the app.'
      },
      {
        question: 'How do I report a medical emergency on the bus?',
        answer: 'Tap the red "Emergency" button in the app and select "Medical Emergency." This will alert dispatch and emergency services. Follow the first aid instructions provided in the app while help is on the way. If possible, ask if there are any medical professionals among the passengers.'
      },
      {
        question: 'What should I do if the bus breaks down?',
        answer: 'Move the bus to a safe location if possible. Use the "Emergency" button and select "Vehicle Breakdown." The app will automatically send your location to the maintenance team and notify passengers of the delay. Follow the instructions provided by dispatch.'
      }
    ]
  }
];

// Guide data for drivers
const guideData = [
  {
    title: "Getting Started as a BusLink Driver",
    description: "Essential information for new drivers using the BusLink system.",
    timeToRead: "7 min read",
    category: "Basic"
  },
  {
    title: "Using the Navigation System",
    description: "How to effectively use the built-in navigation system for your routes.",
    timeToRead: "5 min read",
    category: "Basic"
  },
  {
    title: "Fuel Efficiency Best Practices",
    description: "Tips and techniques to maximize fuel efficiency while driving.",
    timeToRead: "8 min read",
    category: "Intermediate"
  },
  {
    title: "Passenger Management Guidelines",
    description: "Protocols for managing passenger boarding, ticketing, and special requests.",
    timeToRead: "10 min read",
    category: "Intermediate"
  },
  {
    title: "Emergency Response Procedures",
    description: "Step-by-step guide for handling emergencies while on duty.",
    timeToRead: "12 min read",
    category: "Advanced"
  },
  {
    title: "Vehicle Maintenance Checklist",
    description: "Daily, weekly, and monthly maintenance checks for your vehicle.",
    timeToRead: "6 min read",
    category: "Basic"
  }
];

// Documentation data for drivers
const documentationData = [
  {
    title: "Driver Handbook",
    description: "Complete operational guide for BusLink drivers.",
    fileSize: "3.2 MB",
    fileType: "PDF"
  },
  {
    title: "Vehicle Operation Manual",
    description: "Technical documentation for bus operation and features.",
    fileSize: "5.8 MB",
    fileType: "PDF"
  },
  {
    title: "Route Maps Compendium",
    description: "Detailed maps of all BusLink routes in Kigali.",
    fileSize: "8.4 MB",
    fileType: "PDF"
  },
  {
    title: "Safety Protocols",
    description: "Required safety procedures and emergency guidelines.",
    fileSize: "2.1 MB",
    fileType: "PDF"
  },
  {
    title: "Driver App User Guide",
    description: "Step-by-step usage guide for the driver mobile app.",
    fileSize: "4.5 MB",
    fileType: "PDF"
  },
  {
    title: "Customer Service Standards",
    description: "Guidelines for providing excellent passenger service.",
    fileSize: "1.8 MB",
    fileType: "PDF"
  }
];

export default function DriverHelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('faq');
  const [supportTicketForm, setSupportTicketForm] = useState({
    subject: '',
    category: 'Vehicle Issue',
    description: '',
    priority: 'Medium'
  });

  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqData.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => 
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqData;

  // Filter guides and documentation based on search query
  const filteredGuides = searchQuery
    ? guideData.filter(
        guide => 
          guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guide.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : guideData;

  const filteredDocs = searchQuery
    ? documentationData.filter(
        doc => 
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documentationData;

  // Toggle question expansion
  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if a question is expanded
  const isQuestionExpanded = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    return expandedQuestions[key] || false;
  };

  // Handle support ticket form changes
  const handleSupportFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSupportTicketForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle support ticket submission
  const handleSupportFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the ticket to a backend
    alert('Support ticket submitted successfully!');
    setSupportTicketForm({
      subject: '',
      category: 'Vehicle Issue',
      description: '',
      priority: 'Medium'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Driver Help Center</h1>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'faq'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiHelpCircle /> FAQ
          </span>
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'guides'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiBookOpen /> Driver Guides
          </span>
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'support'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiMessageCircle /> Support
          </span>
        </button>
        <button
          onClick={() => setActiveTab('documentation')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'documentation'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiFileText /> Documentation
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for driver help..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Help Buttons - Driver-specific issues */}
      {activeTab === 'faq' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button 
            onClick={() => setSearchQuery('mechanical issue')}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaCar className="text-primary text-xl mb-2" />
            <span className="text-sm text-center">Vehicle Issues</span>
          </button>
          <button 
            onClick={() => setSearchQuery('passenger')}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiUsers className="text-primary text-xl mb-2" />
            <span className="text-sm text-center">Passenger Help</span>
          </button>
          <button 
            onClick={() => setSearchQuery('route')}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiMapPin className="text-primary text-xl mb-2" />
            <span className="text-sm text-center">Route Questions</span>
          </button>
          <button 
            onClick={() => setSearchQuery('emergency')}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaExclamationTriangle className="text-primary text-xl mb-2" />
            <span className="text-sm text-center">Emergency Procedures</span>
          </button>
          <button 
            onClick={() => setSearchQuery('maintenance')}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaGasPump className="text-primary text-xl mb-2" />
            <span className="text-sm text-center">Maintenance Help</span>
          </button>
          <button 
            onClick={() => setSearchQuery('schedule')}
            className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiClock className="text-primary text-xl mb-2" />
            <span className="text-sm text-center">Schedule Questions</span>
          </button>
        </div>
      )}

      {/* FAQ Content */}
      {activeTab === 'faq' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            
            {searchQuery && filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-2">Try using different keywords or browse the categories below</p>
              </div>
            )}
            
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                <h3 
                  className="text-lg font-medium mb-2 cursor-pointer hover:text-primary"
                  onClick={() => setActiveCategory(activeCategory === category.category ? '' : category.category)}
                >
                  {category.category} ({category.questions.length})
                </h3>
                
                {(activeCategory === category.category || searchQuery) && (
                  <div className="space-y-3 ml-2">
                    {category.questions.map((faq, questionIndex) => (
                      <div key={questionIndex} className="border border-gray-200 rounded-md overflow-hidden">
                        <div 
                          className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        >
                          <p className="font-medium">{faq.question}</p>
                          <FiChevronRight 
                            className={`transform transition-transform ${isQuestionExpanded(categoryIndex, questionIndex) ? 'rotate-90' : ''}`} 
                          />
                        </div>
                        
                        {isQuestionExpanded(categoryIndex, questionIndex) && (
                          <div className="p-3 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guides Content */}
      {activeTab === 'guides' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Driver Guides</h2>
            
            {searchQuery && filteredGuides.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No guides found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-2">Try using different keywords</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuides.map((guide, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-4 hover:border-primary cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">{guide.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                      {guide.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{guide.timeToRead}</span>
                    <button className="text-primary hover:text-primary-dark flex items-center gap-1 text-sm">
                      Read guide <FiExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support Content */}
      {activeTab === 'support' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Driver Support</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium mb-3">Contact Driver Support</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <FiPhoneCall size={20} />
                    </div>
                    <div>
                      <p className="font-medium">24/7 Driver Hotline</p>
                      <p className="text-gray-600">+250 788 123 456</p>
                      <p className="text-sm text-gray-500">Available 24/7 for urgent issues</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Driver Support Email</p>
                      <p className="text-gray-600">driver.support@buslink.rw</p>
                      <p className="text-sm text-gray-500">Response within 4 hours</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">On-Road Emergency Support</h4>
                    <p className="text-sm text-gray-600">
                      For immediate assistance with breakdowns, accidents, or other on-road emergencies, use the "Emergency" button directly from your driver app dashboard for fastest response.
                    </p>
                    <div className="mt-3 flex">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2">
                        <FaExclamationTriangle size={16} />
                        Open Emergency Portal
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Support Hours</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Monday - Sunday: 24 Hours</p>
                      <p className="text-xs text-gray-500">
                        Note: Support tickets are prioritized by urgency. On-road issues are handled immediately, while general inquiries may be addressed during normal business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support Ticket Form */}
              <div>
                <h3 className="text-lg font-medium mb-3">Submit a Support Ticket</h3>
                
                <form onSubmit={handleSupportFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Briefly describe your issue"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={supportTicketForm.subject}
                      onChange={handleSupportFormChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Category</label>
                      <select
                        name="category"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={supportTicketForm.category}
                        onChange={handleSupportFormChange}
                      >
                        <option value="Vehicle Issue">Vehicle Issue</option>
                        <option value="Navigation Problem">Navigation Problem</option>
                        <option value="Passenger Issue">Passenger Issue</option>
                        <option value="App Problem">App Problem</option>
                        <option value="Schedule Issue">Schedule Issue</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm">Priority</label>
                      <select
                        name="priority"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={supportTicketForm.priority}
                        onChange={handleSupportFormChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical (On-Road Emergency)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Description</label>
                    <textarea
                      name="description"
                      placeholder="Please provide detailed information about your issue"
                      className="w-full p-2 border border-gray-300 rounded h-32"
                      value={supportTicketForm.description}
                      onChange={handleSupportFormChange}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">Bus ID (if applicable)</label>
                    <input
                      type="text"
                      placeholder="Enter your bus ID"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm gap-1">
                      <FiClipboard />
                      <span>Attach files (optional)</span>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded transition-colors"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Content */}
      {activeTab === 'documentation' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Driver Documentation</h2>
            
            {searchQuery && filteredDocs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No documentation found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-2">Try using different keywords</p>
              </div>
            )}
            
            <div className="space-y-3">
              {filteredDocs.map((doc, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                      <FiFileText size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{doc.fileSize} · {doc.fileType}</span>
                    <button className="text-primary hover:text-primary-dark flex items-center gap-1">
                      <FiDownload size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Required Reading</h3>
              <p className="text-sm text-gray-600 mb-3">
                All drivers must confirm they have read and understood these essential documents:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="read-safety" className="mr-2" />
                  <label htmlFor="read-safety" className="text-sm">Safety Protocols (Updated May 2025)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="read-emergency" className="mr-2" />
                  <label htmlFor="read-emergency" className="text-sm">Emergency Response Procedures</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="read-passenger" className="mr-2" />
                  <label htmlFor="read-passenger" className="text-sm">Passenger Management Guidelines</label>
                </div>
              </div>
              <button className="mt-3 px-3 py-1.5 bg-primary text-white text-sm rounded">
                Confirm Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
