
export interface MockAIResponse {
  goal: string;
  response: string;
}

export interface MockVisionResponse {
  description: string;
  response: string;
}

export const mockAIResponses: MockAIResponse[] = [
  {
    goal: "network",
    response: `## **Recommendations**
- **AI Networking Session**: Join the "Future of AI with Gemini" talk at 10:00 AM in Stage A
- **Developer Meetup**: Connect with Google Developer Team members at the Gemini Lounge (2F)
- **Hackathon Teams**: Find 3 active teams looking for AI developers in the Collaboration Zone

## **Next Steps**
1. **Visit Stage A** by 9:45 AM for the AI session
2. **Exchange contacts** with Google Developer Team after their talk
3. **Join Team "Quantum"** in Collaboration Zone - they need AI expertise
4. **Attend Networking 101** session at 11:30 AM in Lounge area

## **Pro Tips**
- The Gemini Lounge has the highest concentration of AI professionals
- Google team members are actively recruiting for internship positions
- Bring your laptop - teams are demoing live AI projects
- Use the event hashtag #PromptWars2026 to connect online

## **Hidden Gems**
- Secret AI workshop happening in Room 201 at 3:00 PM (limited seats)
- Free cloud credits available for attendees who join Google Cloud Office Hours
- VIP networking dinner with industry leaders (invite-only, ask organizers)`
  },
  {
    goal: "learn",
    response: `## **Recommendations**
- **Keynote: "The Future of AI with Gemini"** - 10:00 AM, Stage A
- **Technical Workshop: "Building with Vertex AI"** - 2:00 PM, Room 201
- **Panel Discussion: "AI Ethics & Responsibility"** - 4:00 PM, Main Hall

## **Next Steps**
1. **Arrive early** for keynote (best seats, networking opportunities)
2. **Download workshop materials** from event app before sessions
3. **Prepare questions** for panel discussion moderators
4. **Join study groups** forming in the Learning Lounge

## **Pro Tips**
- All sessions provide certificate of completion (great for resume)
- Workshop includes hands-on lab with Google Cloud credits
- Panel features Google AI research team members
- Recording available for registered attendees within 24 hours

## **Expert Insights**
- Focus on practical implementation over theoretical concepts
- Network with speakers during dedicated Q&A sessions
- Join the "AI Learners" Slack channel for ongoing discussions
- Access to exclusive Google AI research papers and resources`
  },
  {
    goal: "job",
    response: `## **Recommendations**
- **Google Recruitment Booth**: Visit between 11:00 AM - 3:00 PM
- **Career Fair**: 50+ tech companies hiring (Main Hall, all day)
- **Startup Pitch Session**: 2:00 PM, Stage B (founders hiring actively)

## **Next Steps**
1. **Update your resume** and bring 5 printed copies
2. **Practice your 30-second pitch** before approaching recruiters
3. **Research target companies** beforehand (list in event app)
4. **Collect business cards** and follow up within 24 hours

## **Pro Tips**
- Google is hiring for 15+ positions (software engineering, AI research, cloud)
- Startups offering equity + competitive salaries
- Many companies doing on-site interviews
- Remote work opportunities available with global companies

## **Inside Track**
- Google has fast-track hiring process for event attendees
- Several startups have immediate openings (hiring this week)
- Free resume review service available at Career Center
- Salary negotiation workshop at 1:00 PM in Room 105`
  },
  {
    goal: "ai",
    response: `## **Recommendations**
- **Gemini 1.5 Flash Deep Dive**: 10:00 AM, Stage A (Google team)
- **Multimodal AI Workshop**: 2:00 PM, Room 201 (hands-on coding)
- **AI Ethics Panel**: 4:00 PM, Main Hall (industry experts)

## **Next Steps**
1. **Get API keys** for Google Cloud during registration
2. **Bring laptop** for hands-on workshop (WiFi provided)
3. **Join AI community** Discord server (shared during sessions)
4. **Submit questions** early for panel discussion

## **Pro Tips**
- Free Google Cloud credits ($300) for all workshop attendees
- Direct access to Google AI research engineers
- Live coding sessions with real-time Q&A
- Certificate of completion for resume building

## **Advanced Insights**
- Learn about Gemini's latest features before public release
- Get early access to new Vertex AI capabilities
- Network with Google's core AI development team
- Opportunity to contribute to open-source AI projects`
  }
];

// Mock vision analysis responses
export const mockVisionResponses: MockVisionResponse[] = [
  {
    description: "banner with text",
    response: `## **What I See**
- Event banner displaying "Google PromptWars 2026"
- Located at Main Entrance, Registration Area
- Shows event dates: April 6-19, 2026
- Features Google Cloud and AI branding

## **Event Context**
- This is the main registration checkpoint
- Opens at 8:00 AM, closes at 6:00 PM daily
- QR code leads to event app and schedule
- Staff can provide event badges and information

## **Recommendations**
- **Scan QR code** to download the official event app
- **Pick up your badge** here if you haven't already
- **Ask staff** about any schedule changes or special events
- **Take a photo** of the schedule for quick reference

## **Pro Tips**
- Registration area has charging stations for devices
- Free event swag available for early registrants
- Staff can direct you to specific session rooms
- VIP lounge access passes distributed here (limited quantity)`
  },
  {
    description: "room number",
    response: `## **What I See**
- Conference room sign: "Room 201 - AI Workshop"
- Currently showing "Building with Vertex AI" session
- Capacity: 50 people, currently 35 attendees
- Time: 2:00 PM - 3:30 PM

## **Event Context**
- Hands-on technical workshop in progress
- Intermediate level, requires basic coding knowledge
- Google Cloud credits provided to participants
- Free WiFi and power outlets available

## **Recommendations**
- **Join now** - still 15 spots available
- **Bring laptop** for hands-on coding exercises
- **Download materials** from workshop link provided
- **Network with participants** during breaks

## **Pro Tips**
- Workshop instructor is a Google Cloud senior engineer
- Participants get certificate of completion
- Advanced AI concepts covered (model fine-tuning)
- Opportunity for 1:1 Q&A after session`
  },
  {
    description: "map",
    response: `## **What I See**
- Event venue map showing 3 floors
- Stage A (Main Hall) on ground floor
- Workshop rooms 201-205 on second floor
- Networking lounge and collaboration zones

## **Event Context**
- Large tech conference with 500+ attendees
- Multiple tracks running simultaneously
- 15-minute walk between farthest points
- Elevators at both ends of building

## **Recommendations**
- **Plan your route** between sessions (use app for navigation)
- **Allow 15 minutes** for room changes
- **Use stairs** for faster movement between floors
- **Check digital displays** for any room changes

## **Pro Tips**
- Restrooms on each floor near elevators
- Quiet zones available for focused work
- All rooms have WiFi and charging stations
- Emergency exits clearly marked on map`
  }
];

// Mock event sessions (enhanced fallback data)
export const mockEventSessions = [
  {
    id: "1",
    title: "The Future of AI with Gemini",
    speaker: "Google Developer Team",
    time: "10:00 AM",
    room: "Stage A",
    description: "Deep dive into multimodal LLMs and their applications in modern software development."
  },
  {
    id: "2",
    title: "Building with Vertex AI",
    speaker: "Sarah Chen - Google Cloud",
    time: "11:30 AM",
    room: "Room 201",
    description: "Hands-on workshop for building scalable AI applications using Google's Vertex AI platform."
  },
  {
    id: "3",
    title: "AI Ethics & Responsibility",
    speaker: "Panel Discussion",
    time: "2:00 PM",
    room: "Main Hall",
    description: "Industry experts discuss the ethical implications of AI development and deployment."
  },
  {
    id: "4",
    title: "Networking 101",
    speaker: "Community Lead",
    time: "3:30 PM",
    room: "Lounge",
    description: "Build lasting professional connections with practical networking strategies."
  },
  {
    id: "5",
    title: "Multimodal AI Workshop",
    speaker: "Google Research Team",
    time: "4:00 PM",
    room: "Room 205",
    description: "Advanced workshop on implementing multimodal AI in production environments."
  },
  {
    id: "6",
    title: "Cloud Native Development",
    speaker: "Google Cloud Engineers",
    time: "5:00 PM",
    room: "Stage B",
    description: "Best practices for building and deploying cloud-native applications."
  }
];

// Mock radar venue insights
export const mockRadarData = {
  crowdDensity: {
    current: 12,
    max: 30,
    status: "Moderate",
    trend: "Increasing"
  },
  networkQuality: {
    signal: "Excellent",
    speed: "150 Mbps",
    latency: "5ms"
  },
  activityLevel: {
    score: 85,
    status: "High",
    engagement: "Very Active"
  },
  venues: [
    {
      name: "Gemini Lounge",
      location: "2F",
      people: 12,
      potential: "High networking potential",
      activity: "AI discussions in progress"
    },
    {
      name: "Stage A",
      location: "Ground Floor",
      people: 45,
      potential: "Keynote session starting",
      activity: "Main presentation"
    },
    {
      name: "Collaboration Zone",
      location: "3F",
      people: 8,
      potential: "Team formation happening",
      activity: "Hackathon projects"
    }
  ]
};
