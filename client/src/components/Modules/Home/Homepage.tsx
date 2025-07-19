import { Link } from 'react-router-dom'

const Homepage = () => {
  const features = [
    {
      icon: '📅',
      title: 'Event Management',
      description: 'Create, organize, and manage your events with ease. Our intuitive interface makes event planning simple and efficient.'
    },
    {
      icon: '⚡',
      title: 'Quick Setup',
      description: 'Get started in minutes. Add events quickly with our streamlined form and real-time updates.'
    },
    {
      icon: '🔍',
      title: 'Easy Discovery',
      description: 'Browse and search through all your events with our powerful filtering and search capabilities.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Access your events from any device. Our responsive design works perfectly on desktop, tablet, and mobile.'
    }
  ]

  return (

    <div>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">



        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative container mx-auto px-5 py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Organize Your Events
                <span className="block text-3xl md:text-4xl font-normal mt-2 opacity-90">
                  With Mini Event Scheduler
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
                Streamline your event planning process with our powerful and intuitive event management platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/add-event"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Create New Event
                </Link>
                <Link
                  to="/events"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
                >
                  View All Events
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/10 rounded-full"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Mini Event Scheduler?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the perfect blend of simplicity and functionality for all your event management needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="container mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who trust Mini Event Scheduler for their event management needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/add-event"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Creating Events
              </Link>
              <Link
                to="/events"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-5">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">100%</div>
                <div className="text-gray-600">Free to Use</div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
                <div className="text-gray-600">Always Available</div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">∞</div>
                <div className="text-gray-600">Unlimited Events</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Homepage
