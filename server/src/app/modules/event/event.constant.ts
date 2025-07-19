// Enhanced categorization logic
export const categorizeEvent = (title: string, notes?: string): string => {
    const text = `${title} ${notes || ''}`.toLowerCase();
    
    // Work-related keywords
    const workKeywords = [
      'work', 'meeting', 'office', 'business', 'client', 'project', 'deadline',
      'presentation', 'conference', 'interview', 'appointment', 'call', 'zoom',
      'team', 'manager', 'boss', 'colleague', 'report', 'review', 'planning',
      'strategy', 'workshop', 'training', 'seminar', 'webinar', 'conference call',
      'standup', 'sprint', 'agile', 'scrum', 'kanban', 'deliverable', 'milestone'
    ];
    
    // Personal-related keywords
    const personalKeywords = [
      'personal', 'family', 'friend', 'home', 'dinner', 'lunch', 'breakfast',
      'birthday', 'anniversary', 'wedding', 'party', 'celebration', 'vacation',
      'holiday', 'trip', 'travel', 'doctor', 'dentist', 'appointment', 'gym',
      'workout', 'exercise', 'yoga', 'meditation', 'therapy', 'counseling',
      'shopping', 'errand', 'chore', 'cleaning', 'cooking', 'baking', 'hobby',
      'movie', 'theater', 'concert', 'show', 'game', 'sport', 'fitness',
      'parent', 'child', 'kid', 'baby', 'school', 'parent-teacher', 'volunteer'
    ];
    
    // Count keyword matches
    const workMatches = workKeywords.filter(keyword => text.includes(keyword)).length;
    const personalMatches = personalKeywords.filter(keyword => text.includes(keyword)).length;
    
    // Determine category based on keyword frequency and context
    if (workMatches > personalMatches && workMatches > 0) {
      return 'WORK';
    } else if (personalMatches > workMatches && personalMatches > 0) {
      return 'PERSONAL';
    } else {
      return 'OTHER';
    }
  };


  