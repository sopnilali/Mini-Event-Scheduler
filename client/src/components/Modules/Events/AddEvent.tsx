import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { axiosInstance } from '../../../Shared/axiosPublic'
import toast from 'react-hot-toast'
import { personalKeywords, workKeywords } from '../../../Shared/AiCategoryMatch'

interface EventFormData {
  title: string
  date: string
  time: string
  notes: string
}

const AddEvent = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<EventFormData>({
    defaultValues: {
      title: '',
      date: '',
      time: '',
      notes: ''
    }
  })

  // Watch title and notes for auto-categorization
  const title = watch('title')
  const notes = watch('notes')
  const [displayCategory, setDisplayCategory] = useState('OTHER')



  // Get current date for default value
  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Get current time for default value
  const getCurrentTime = () => {
    const now = new Date()
    return now.toTimeString().slice(0, 5)
  }


  // Auto-categorize based on title and notes content
  const categorizeEvent = (title: string, notes: string) => {
    const content = `${title} ${notes}`.toLowerCase()

    if (workKeywords.some(keyword => content.includes(keyword))) {
      return 'WORK'
    } else if (personalKeywords.some(keyword => content.includes(keyword))) {
      return 'PERSONAL'
    } else {
      return 'OTHER'
    }
  }

  useEffect(() => {
    // Set default values
    setValue('date', getCurrentDate())
    setValue('time', getCurrentTime())
  }, [setValue])

  // Auto-update display category when title or notes change
  useEffect(() => {
    const newCategory = categorizeEvent(title, notes)
    setDisplayCategory(newCategory)
  }, [title, notes])

  const onSubmit = async (data: EventFormData) => {
    try {
      // Combine date and time into ISO-8601 DateTime format with Z timezone
      const dateTimeString = `${data.date}T${data.time}:00Z`
      const formattedData = {
        title: data.title,
        date: dateTimeString, // Full ISO-8601 DateTime with Z
        time: data.time,
        notes: data.notes
      }

      const response = await axiosInstance.post('/events', formattedData)

      console.log(response.data)

      // Show success message and redirect
      toast.success(response.data.message)
      navigate('/events')
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Event</h1>
          <p className="text-gray-600">Create a new event with all the details</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 2,
                    message: 'Title must be at least 2 characters'
                  }
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  {...register('date', {
                    required: 'Date is required'
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              {/* Time Field */}
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="time"
                  {...register('time', {
                    required: 'Time is required'
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Category Field (Display Only) */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={displayCategory}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Auto-categorizing..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Category is automatically assigned based on your event title and notes
              </p>
            </div>

            {/* Notes Field */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                {...register('notes')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                placeholder="Add any additional notes about the event..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600  text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Event...
                  </div>
                ) : (
                  'Create Event'
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/events')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEvent
