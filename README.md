# Project Name: Mini Event Scheduler with AI Categorization Task

## Project Overview:

I build full-stack <strong>Mini Event Scheduler</strong> application built with React (frontend) and Node.js with TypeScript (backend). It allows users to create, view, update, and delete events such as meetings or personal reminders. Each event includes:Title, Date & Time, Optional Notes.
To demonstrate basic AI integration, the app features a smart categorization system that automatically assigns each event a category: "Work," "Personal," or "Other", based on keyword analysis from the event title and notes—simulating simple AI logic.

## Live Link: 

- [x] Client Live: https://mini-event-schedulerui.vercel.app
- [x] Server live: https://mini-event-scheduler-api.vercel.app

## ✨ Technology Used ⚙️
<li> <strong>Frontend:</strong> React with TypeScript, Tailwind CSS</li>
<li> <strong>Backend:</strong> Node.js with TypeScript, Express</li>
<li> <strong>Database:</strong>In Memory</li>
<li> <strong>API:</strong> RESTful design</li>

## ✨ Features (Planned & In Progress)
 
- [x] Project setup with Node.js/Express backend
- [x] Add new Event
- [x] Display Events
- [x] Fetch and display event sorted by date and time (ascending). 
- [x] Search and filtering event
- [x] Responsive frontend UI (React/vite)


### 📦 **API Features & Endpoints**

#### 1\. **Mini Event Scheduler Management**

* * *

### ✅ **1\.** **`POST /events`** **- Create a new events**

#### 📥 Request Body

```perl
{
  "title": "happy birthday guys",
  "date": "2025-12-10T15:30:00Z", 
  "time": "12:00",
  "notes": " we are celebrate my birthday"
}
```

#### 📤 Response Example (201 Created)

```json
{
    "success": true,
    "message": "Event created successfully",
    "statusCode": 201,
    "data": {
        "id": "event_3_1753002406284",
        "title": "happy birthday guys",
        "date": "2025-12-10T15:30:00.000Z",
        "time": "12:00",
        "notes": " we are celebrate my birthday",
        "archivedStatus": false,
        "category": "PERSONAL",
        "createdAt": "2025-07-20T09:06:46.284Z",
        "updatedAt": "2025-07-20T09:06:46.284Z",
        "isDeleted": false,
        "categoryReason": "Automatically categorized as PERSONAL based on content analysis"
    }
}
```

* * *

### ✅ **2\.** **`GET /events`** **- Get all events**

#### 📤 Response Example (200 Ok)

```perl
{
    "success": true,
    "message": "Events fetched successfully",
    "statusCode": 200,
    "data": [
        {
            "id": "event_2_1753001940764",
            "title": "Full-Stack Engineering Intern Coding ",
            "date": "2025-07-17T14:58:00.000Z",
            "time": "14:58",
            "notes": "Full-Stack Engineering Intern Coding",
            "archivedStatus": false,
            "category": "OTHER",
            "createdAt": "2025-07-20T08:59:00.764Z",
            "updatedAt": "2025-07-20T08:59:00.764Z",
            "isDeleted": false
        },
    {...}
]
}
```

* * *

### ✅ **3\.** **`GET /events/event_3_1753002406284`** **- Get a specific event by ID**

#### 📤 Response Example (200 Ok)

```json
{
    "success": true,
    "message": "Event fetched successfully",
    "statusCode": 200,
    "data": {
        "id": "event_3_1753002406284",
        "title": "happy birthday guys",
        "date": "2025-12-10T15:30:00.000Z",
        "time": "12:00",
        "notes": " we are celebrate my birthday",
        "archivedStatus": true,
        "category": "PERSONAL",
        "createdAt": "2025-07-20T09:06:46.284Z",
        "updatedAt": "2025-07-20T09:10:25.607Z",
        "isDeleted": false
    }
}
```

* * *


### ✅ **4\.** **`PUT /events/event_2_1753001940764`** **- Update event archived status to true**

#### 📥  Body Request

```
Not body any request. Only Hit event id. then update archived status.
```

#### 📤 Response Example (200 Ok)

```
{
    "success": true,
    "message": "Event archived status updated successfully",
    "statusCode": 200,
    "data": {
        "id": "event_3_1753002406284",
        "title": "happy birthday guys",
        "date": "2025-12-10T15:30:00.000Z",
        "time": "12:00",
        "notes": " we are celebrate my birthday",
        "archivedStatus": true,
        "category": "PERSONAL",
        "createdAt": "2025-07-20T09:06:46.284Z",
        "updatedAt": "2025-07-20T09:10:25.607Z",
        "isDeleted": false
    }
}
```


## Server Folder Structure 📂
<p>I organized the project by creating this folder structure. The folders here are events. All of them are crated in different files, so that they can be controlled and handled very easily.</p>

<pre>
prisma/
src/
│   ├── app/
│   │   ├── config
│   │   ├── errors
│   │   ├── helper
│   │   ├── interface
│   │   ├── middleware
│   │   ├── modules
│   │   │   ├── event
│   │   │   │   ├── event.constant.ts
│   │   │   │   ├── event.controller.ts
│   │   │   │   ├── event.interface.ts
│   │   │   │   ├── event.route.ts
│   │   │   │   ├── event.service.ts
│   │   │   │   ├── event.validation.ts
│   │   ├── routes
│   │   ├── utils
├── app.ts
├── server.ts
</pre>

## Client Folder Structure 📂
<p>I organized the project by creating this folder structure. The folders here are events. All of them are crated in different files, so that they can be controlled and handled very easily.</p>

<pre>
src/
│   ├── components/
│   │   ├── Layout
│   │   ├── Modules
│   │   │   ├── Events
│   │   │   │   ├── AddEvents.tsx
│   │   │   │   ├── DeleteEventModal.tsx
│   │   │   │   ├── DetailsEvent.tsx
│   │   │   │   ├── ListEvent.tsx
│   │   │   ├── Home
│   │   │   │   ├── HomePage.tsx
│   │   ├── Routes
│   ├── Shared
│   │   ├── AiCategoryMatch.tsx
│   │   ├── axiosPublic.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
├── app.ts
├── server.ts
</pre>

## Error Handling ⚠️
<li>I am implement error handling for invalid input, missing data, invalid email and insufficient stock.</li>
<pre>{
    "success": false,
    "message": "Validation Error",
    "errorSources": [
        {
            "path": "title",
            "message": "Title is required"
        }
    ],
    "err": {
        "issues": [
            {
                "code": "invalid_type",
                "expected": "string",
                "received": "undefined",
                "path": [
                    "title"
                ],
                "message": "Title is required"
            }
        ],
        "name": "ZodError"
    },
    "stack": "ZodError: [\n  {\n    \"code\": \"invalid_type\",\n  
}
</pre>
<li><strong>Not Found:</strong> If you hit a wrong route, it will send a message and tell you your status, and which route you hit. </li>
<pre>
{
    "success": false,
    "message": "API Not Found /event",
    "error": "Error: API Not Found /event\n    at notFound (/var/task/dist/middlewares/notFound.js:10:19)\n
}
</pre>

# Thanks you Sir/Mam 💕

