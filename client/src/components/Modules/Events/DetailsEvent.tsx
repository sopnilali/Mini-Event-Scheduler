import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../../Shared/axiosPublic'
import DeleteEventModal from './DeleteEventModal'
import { toast } from 'react-hot-toast'

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
            toast.error('Error fetching event details:')
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading event details...</p>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center dark:bg-gray-900">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4"> 274c</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-gray-100">Event Not Found</h3>
                    <p className="text-gray-600 mb-6 dark:text-gray-400">The event you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/events')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors dark:bg-indigo-800 dark:hover:bg-indigo-900"
                    >
                        Back to Events
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="">
                        <div className=' rounded-xl  overflow-hidden  flex flex-col gap-4'>
                            <div className="flex items-center gap-3 mb-2">
                                <button
                                    onClick={() => navigate('/events')}
                                    className="text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-300 dark:hover:text-gray-100"
                                >
                                    <span className="text-xl">←</span> Back to Events
                                </button>
                            </div>
                            <div className=' p-4 bg-white flex justify-between gap-3 flex-col sm:flex-row dark:bg-gray-800 '>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-gray-100">{event.title}</h1>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)} dark:bg-gray-700 dark:text-gray-200`}>
                                        {getCategoryIcon(event.category)} {event.category}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.archivedStatus ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                                        {event.archivedStatus ? ' Archived' : ' ⚡ Active'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Details Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden dark:bg-gray-800 dark:shadow-2xl">
                    {/* Event Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6 text-white dark:from-gray-900 dark:to-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                                <p className="text-indigo-100 dark:text-indigo-300">
                                    {formatDate(event.date)} at {formatTime(event.time)}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl mb-2">{getCategoryIcon(event.category)}</div>
                                <div className="text-sm text-indigo-100 dark:text-indigo-300">{event.category}</div>
                            </div>
                        </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Main Details */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Event Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                            <span className="text-gray-500 dark:text-gray-400">📅</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{formatDate(event.date)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                            <span className="text-gray-500 dark:text-gray-400">🕒</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{formatTime(event.time)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                            <span className="text-gray-500 dark:text-gray-400">🏷️</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{event.category}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                            <span className="text-gray-500 dark:text-gray-400">📊</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                                    {event.archivedStatus ? 'Archived' : 'Active'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes Section */}
                                {event.notes && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Notes</h3>
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900 dark:border-blue-700">
                                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{event.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Event Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                            <span className="text-gray-500 dark:text-gray-400">🆔</span>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Event ID</p>
                                                <p className="font-mono text-sm text-gray-900 dark:text-gray-100">{event.id}</p>
                                            </div>
                                        </div>

                                        {event.createdAt && (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                                <span className="text-gray-500 dark:text-gray-400"> 📝</span>
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{formatDateTime(event.createdAt)}</p>
                                                </div>
                                            </div>
                                        )}

                                        {event.updatedAt && (
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg dark:bg-gray-900">
                                                <span className="text-gray-500 dark:text-gray-400">🔄</span>
                                                <div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">{formatDateTime(event.updatedAt)}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Quick Actions</h3>
                                    <div className="space-y-3">

                                        <button
                                            onClick={handleArchiveEvent}
                                            disabled={isArchiving}
                                            className="w-full bg-yellow-50 text-yellow-600 px-4 py-3 rounded-lg font-medium hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800"
                                        >
                                            {event.archivedStatus ? '⚡Active' : '  Archive'}
                                        </button>
                                        <button
                                            onClick={handleDeleteEvent}
                                            className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
                                        >
                                            Delete
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

