import  { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../Shared/axiosPublic'
import DeleteEventModal from './DeleteEventModal'

interface Event {
    id: string
    title: string
    date: string
    time: string
    category: string
    notes?: string
    archivedStatus: boolean
    createdAt?: string
    updatedAt?: string
}

const DetailsEvent = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [event, setEvent] = useState<Event | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isArchiving, setIsArchiving] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null)

    useEffect(() => {
        if (id) {
            fetchEventDetails()
        }
    }, [id])

    const fetchEventDetails = async () => {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get(`/events/${id}`)
            setEvent(response.data.data)
        } catch (error) {
            console.error('Error fetching event details:', error)
            // Handle error - could show toast or redirect
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
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

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
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

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'WORK':
                return '💼'
            case 'PERSONAL':
                return '👤'
            case 'OTHER':
                return '📌'
            default:
                return '📌'
        }
    }

    const handleArchiveEvent = async () => {
        if (!event) return

        try {
            setIsArchiving(true)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500))

            setEvent(prev => prev ? { ...prev, archivedStatus: !prev.archivedStatus } : null)
        } catch (error) {
            console.error('Error updating event status:', error)
        } finally {
            setIsArchiving(false)
        }
    }

    const handleDeleteEvent = () => {
        if (!event) return
        setEventToDelete(event)
        setDeleteModalOpen(true)
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
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">❌</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Not Found</h3>
                    <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <button
                                    onClick={() => navigate('/events')}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    ← Back to Events
                                </button>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                                    {getCategoryIcon(event.category)} {event.category}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.archivedStatus ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {event.archivedStatus ? '📁 Archived' : '✅ Active'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Details Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Event Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                                <p className="text-indigo-100">
                                    {formatDate(event.date)} at {formatTime(event.time)}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl mb-2">{getCategoryIcon(event.category)}</div>
                                <div className="text-sm text-indigo-100">{event.category}</div>
                            </div>
                        </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Main Details */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">📅</span>
                                            <div>
                                                <p className="text-sm text-gray-600">Date</p>
                                                <p className="font-medium text-gray-900">{formatDate(event.date)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">🕒</span>
                                            <div>
                                                <p className="text-sm text-gray-600">Time</p>
                                                <p className="font-medium text-gray-900">{formatTime(event.time)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">🏷️</span>
                                            <div>
                                                <p className="text-sm text-gray-600">Category</p>
                                                <p className="font-medium text-gray-900">{event.category}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">📊</span>
                                            <div>
                                                <p className="text-sm text-gray-600">Status</p>
                                                <p className="font-medium text-gray-900">
                                                    {event.archivedStatus ? 'Archived' : 'Active'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                {event.notes && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-gray-800 whitespace-pre-wrap">{event.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                            <span className="text-gray-500">🆔</span>
                                            <div>
                                                <p className="text-sm text-gray-600">Event ID</p>
                                                <p className="font-mono text-sm text-gray-900">{event.id}</p>
                                            </div>
                                        </div>

                                        {event.createdAt && (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                <span className="text-gray-500">📝</span>
                                                <div>
                                                    <p className="text-sm text-gray-600">Created</p>
                                                    <p className="font-medium text-gray-900">{formatDateTime(event.createdAt)}</p>
                                                </div>
                                            </div>
                                        )}

                                        {event.updatedAt && (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                                <span className="text-gray-500">🔄</span>
                                                <div>
                                                    <p className="text-sm text-gray-600">Last Updated</p>
                                                    <p className="font-medium text-gray-900">{formatDateTime(event.updatedAt)}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">

                                        <button
                                            onClick={handleArchiveEvent}
                                            disabled={isArchiving}
                                            className="w-full bg-yellow-50 text-yellow-600 px-4 py-3 rounded-lg font-medium hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {event.archivedStatus ? '📂 Activate Event' : '📁 Archive Event'}
                                        </button>
                                        <button
                                            onClick={handleDeleteEvent}
                                            className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            🗑️ Delete Event
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Delete Event odal */}
            <DeleteEventModal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                event={eventToDelete}
                onEventDeleted={() => navigate('/events')}
            />
        </div>

    )


}

export default DetailsEvent
