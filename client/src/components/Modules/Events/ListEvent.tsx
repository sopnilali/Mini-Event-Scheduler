import  { useState, useEffect, } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { axiosInstance } from '../../../Shared/axiosPublic'
import toast from 'react-hot-toast'
import DeleteEventModal from './DeleteEventModal'

interface Event {
  id: string
  title: string
  date: string
  time: string
  category: string
  notes?: string
  archivedStatus: boolean
}


const ListEvent = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | boolean>('all')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null)


  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchTerm, categoryFilter, statusFilter])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      // Simulate API call with mock data
      const response = await axiosInstance.get('/')
      console.log(response.data.data)
      setEvents(response.data.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = events

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.archivedStatus === statusFilter)
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'WORK':
        return 'bg-blue-100 text-blue-800'
      case 'PERSONAL':
        return 'bg-green-100 text-green-800'
      case 'OTHER':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }


  const handleArchiveEvent = async (eventId: string) => {
    try {
      // Find current event to get current archivedStatus
      const currentEvent = events.find(event => event.id === eventId)
      if (!currentEvent) return
      
      // Toggle the archived status
      const newArchivedStatus = !currentEvent.archivedStatus
      
      // Simulate API call
      const response = await axiosInstance.put(`/${eventId}`, {
        archivedStatus: newArchivedStatus
      })
      console.log(response.data)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, archivedStatus: newArchivedStatus }
          : event
      ))
      
      // Show success message
      toast.success(response.data.message)
    } catch (error) {
      console.error('Error updating event status:', error)
      toast.error('Failed to update event status. Please try again.')
    }
  }

  const handleDeleteEvent = (event: Event) => {
    setEventToDelete(event)
    setDeleteModalOpen(true)
  }

  const handleEventDeleted = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setEventToDelete(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
              <p className="text-gray-600">
                {filteredEvents.length} of {events.length} events
              </p>
            </div>
            <button
              onClick={() => navigate('/add-event')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Event
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Events
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or notes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="WORK">Work</option>
                <option value="PERSONAL">Personal</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter === 'all' ? 'all' : statusFilter.toString()}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === 'all') {
                    setStatusFilter('all')
                  } else {
                    setStatusFilter(value === 'true')
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="false">Active</option>
                <option value="true">Archived</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setCategoryFilter('all')
                  setStatusFilter('all')
                }}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'Get started by creating your first event.'}
            </p>
            {!searchTerm && categoryFilter === 'all' && statusFilter === 'all' && (
              <button
                onClick={() => navigate('/add-event')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Create Your First Event
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Event Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                     <Link to={`/events/${event.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {event.title}
                      </h3>
                     </Link>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.archivedStatus ? 'archived' : 'active')}`}>
                          {event.archivedStatus ? 'Archived' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-gray-400">📅</span>
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-gray-400">🕒</span>
                      <span className="text-sm">{formatTime(event.time)}</span>
                    </div>
                    {event.notes && (
                      <div className="flex items-start gap-2 text-gray-600">
                        <span className="text-gray-400 mt-0.5">📝</span>
                        <span className="text-sm line-clamp-2">{event.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleArchiveEvent(event.id)}
                      className="flex-1 bg-yellow-50 text-yellow-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors"
                    >
                      {event.archivedStatus ? 'Archived' : 'Archive'}
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event)}
                      className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Delete Event Modal */}
      <DeleteEventModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        event={eventToDelete}
        onEventDeleted={handleEventDeleted}
      />
 
    </div>
  )
}

export default ListEvent
