import React, { useState } from 'react'
import { axiosInstance } from '../../../Shared/axiosPublic'
import toast from 'react-hot-toast'

interface Event {
  id: string
  title: string
  date: string
  time: string
  category: string
  notes?: string
  archivedStatus: boolean
}

interface DeleteEventModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
  onEventDeleted: (eventId: string) => void
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  isOpen,
  onClose,
  event,
  onEventDeleted
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!event) return

    try {
      setIsDeleting(true)
      const response = await axiosInstance.delete(`/events/${event.id}`)
      console.log(response.data)
      
      onEventDeleted(event.id)
      toast.success(response.data.message)
      onClose()
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Failed to delete event. Please try again.')
    } finally {
      setIsDeleting(false)
    }
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

  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Event
            </h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4">
            {/* Warning Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Event Details */}
            <div className="text-center mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Are you sure you want to delete this event?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone. The event will be permanently removed.
              </p>
              
              {/* Event Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{getCategoryIcon(event.category)}</span>
                  <div className="flex-1 text-left">
                    <h5 className="font-medium text-gray-900">{event.title}</h5>
                    <p className="text-sm text-gray-600">{event.category}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span>{formatTime(event.time)}</span>
                  </div>
                  {event.notes && (
                    <div className="flex items-start gap-2">
                      <span>📝</span>
                      <span className="text-xs line-clamp-2">{event.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteEventModal 