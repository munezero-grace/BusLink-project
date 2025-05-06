'use client';

import React, { useState } from 'react';
import { FiSearch, FiHelpCircle, FiBookOpen, FiMessageCircle, FiFileText, FiChevronRight, FiPhoneCall, FiMail, FiDownload, FiExternalLink, FiClipboard } from 'react-icons/fi';

// FAQ data
const faqData = [
  {
    category: 'Account Management',
    questions: [
      {
        question: 'How do I change my password?',
        answer: 'You can change your password in the Settings page under the Security tab. You\'ll need to enter your current password and then your new password twice to confirm it.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Account to update your personal information including your name, email address, and profile picture.'
      },
      {
        question: 'Can I have multiple admin accounts?',
        answer: 'Yes, you can create multiple admin accounts with different permission levels. Go to Admin > Manage Users to create and manage admin accounts.'
      }
    ]
  },
  {
    category: 'Bus Management',
    questions: [
      {
        question: 'How do I add a new bus to the system?',
        answer: 'Navigate to Bus Management, click on "Add New Bus" and fill in the required details including bus number, capacity, route assignment, and maintenance schedule.'
      },
      {
        question: 'How do I assign a driver to a bus?',
        answer: 'In the Bus Management section, select the bus you want to assign a driver to, click on "Assign Driver" and select from the available drivers in the dropdown menu.'
      },
      {
        question: 'How do I track bus maintenance history?',
        answer: 'Each bus has a maintenance log that can be accessed from its detail page. The log shows all past maintenance activities and scheduled future maintenance.'
      }
    ]
  },
  {
    category: 'Route Management',
    questions: [
      {
        question: 'How do I create a new route?',
        answer: 'Go to Routes > Add New Route. You\'ll need to define the start and end points, all stops in between, expected travel times, and assign buses to the route.'
      },
      {
        question: 'How do I modify an existing route?',
        answer: 'Select the route you want to modify from the Routes list, click "Edit Route", and make the necessary changes to stops, schedule, or bus assignments.'
      },
      {
        question: 'Can I temporarily disable a route?',
        answer: 'Yes, you can mark a route as inactive from the route details page. This will remove it from public view but retain all the route information for future use.'
      }
    ]
  },
  {
    category: 'Booking Management',
    questions: [
      {
        question: 'How do I view all current bookings?',
        answer: 'Navigate to the Bookings section to see a list of all current bookings. You can filter by date, route, or passenger name.'
      },
      {
        question: 'How do I process a refund?',
        answer: 'From the Booking details page, click on "Process Refund". You\'ll need to select a reason for the refund and confirm the refund amount.'
      },
      {
        question: 'Can I manually add a booking for a customer?',
        answer: 'Yes, in the Bookings section, click "Add New Booking" and you can create a booking on behalf of a customer by entering their details and the trip information.'
      }
    ]
  }
];

// Guide data
const guideData = [
  {
    title: "Getting Started with BusLink",
    description: "Learn the basics of navigating the admin dashboard and essential functions.",
    timeToRead: "5 min read",
    category: "Basic"
  },
  {
    title: "Managing Bus Fleet",
    description: "How to add, update, and maintain your bus fleet information.",
    timeToRead: "8 min read",
    category: "Intermediate"
  },
  {
    title: "Route Planning and Optimization",
    description: "Create efficient routes and schedules for your bus operations.",
    timeToRead: "12 min read",
    category: "Advanced"
  },
  {
    title: "Driver Management",
    description: "How to add drivers, assign buses, and track performance.",
    timeToRead: "7 min read",
    category: "Intermediate"
  },
  {
    title: "Booking Management System",
    description: "Process bookings, manage reservations, and handle customer requests.",
    timeToRead: "10 min read",
    category: "Intermediate"
  },
  {
    title: "Analytics and Reporting",
    description: "Generate and interpret reports for business intelligence.",
    timeToRead: "15 min read",
    category: "Advanced"
  }
];

// Documentation data
const documentationData = [
  {
    title: "Administrator Guide",
    description: "Complete guide for system administrators.",
    fileSize: "2.4 MB",
    fileType: "PDF"
  },
  {
    title: "API Documentation",
    description: "Technical documentation for the BusLink API.",
    fileSize: "1.8 MB",
    fileType: "PDF"
  },
  {
    title: "Driver App Manual",
    description: "Guide for drivers using the mobile application.",
    fileSize: "3.2 MB",
    fileType: "PDF"
  },
  {
    title: "Booking System Guide",
    description: "How to use the booking system effectively.",
    fileSize: "1.5 MB",
    fileType: "PDF"
  },
  {
    title: "Route Management",
    description: "Technical details about route management.",
    fileSize: "2.1 MB",
    fileType: "PDF"
  },
  {
    title: "Security Protocols",
    description: "Information about system security measures.",
    fileSize: "1.2 MB",
    fileType: "PDF"
  }
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('faq');
  const [supportTicketForm, setSupportTicketForm] = useState({
    subject: '',
    category: 'Technical Issue',
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
      category: 'Technical Issue',
      description: '',
      priority: 'Medium'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Help Center</h1>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2 font-medium ${
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
          className={`px-4 py-2 font-medium ${
            activeTab === 'guides'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <FiBookOpen /> Guides
          </span>
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-2 font-medium ${
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
          className={`px-4 py-2 font-medium ${
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
          placeholder="Search for help..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
            <h2 className="text-xl font-semibold mb-4">User Guides</h2>
            
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
            <h2 className="text-xl font-semibold mb-4">Get Support</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium mb-3">Contact Us</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <FiPhoneCall size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-gray-600">+250 788 123 456</p>
                      <p className="text-sm text-gray-500">Available 24/7 for urgent issues</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600">support@buslink.rw</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Support Hours</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 3:00 PM</p>
                      <p>Sunday: Closed (Emergency support only)</p>
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
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Account Access">Account Access</option>
                        <option value="Booking Problem">Booking Problem</option>
                        <option value="Bus Management">Bus Management</option>
                        <option value="Driver Issue">Driver Issue</option>
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
                        <option value="Critical">Critical</option>
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
            <h2 className="text-xl font-semibold mb-4">Documentation</h2>
            
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
          </div>
        </div>
      )}
    </div>
  );
}
