// import express from 'express';
// import { PrismaClient } from '@prisma/client';

// const router = express.Router();
// const prisma = new PrismaClient();



// // Get all events
// router.get('/', async (req, res) => {
//   try {
//     const events = await prisma.event.findMany({
//       where: {
//         isDeleted: false,
//         archivedStatus: 'UNARCHIVED'
//       },
//       orderBy: {
//         date: 'asc'
//       }
//     });
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch events' });
//   }
// });


// // Get event by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await prisma.event.findFirst({
//       where: {
//         id,
//         isDeleted: false
//       }
//     });
    
//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }
    
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch event' });
//   }
// });

// // Update event
// router.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, date, time, notes } = req.body;
    
//     // Re-categorize when updating
//     const category = categorizeEvent(title, notes);
    
//     const event = await prisma.event.update({
//       where: { id },
//       data: {
//         title,
//         date: new Date(date),
//         time,
//         notes,
//         category
//       }
//     });
    
//     res.json({
//       ...event,
//       categoryReason: `Re-categorized as ${category} based on updated content`
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update event' });
//   }
// });

// // Delete event (soft delete)
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     await prisma.event.update({
//       where: { id },
//       data: { isDeleted: true }
//     });
    
//     res.json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete event' });
//   }
// });

// // Archive/Unarchive event
// router.patch('/:id/archive', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { archived } = req.body;
    
//     const event = await prisma.event.update({
//       where: { id },
//       data: {
//         archivedStatus: archived ? 'ARCHIVED' : 'UNARCHIVED'
//       }
//     });
    
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update event archive status' });
//   }
// });

// export default router; 