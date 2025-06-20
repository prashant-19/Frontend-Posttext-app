project:
  name: Notes App Frontend
  description: |
    A full-featured Notes application frontend built using React (with Vite) and Tailwind CSS. 
    Supports login, register, private/public notes, save/unsave feature, user profile updates, and protected routing.

  features:
    - Authentication with JWT
    - Create, Edit, Delete notes
    - Public/Private note toggling
    - Save/Unsave notes (toggle like Instagram)
    - User Profile editing
    - Protected Routes
    - Responsive UI with Tailwind
    - API Integration with Auth headers

  tech_stack:
    - React.js + Vite
    - Tailwind CSS
    - Context API
    - React Router DOM
    - JWT with LocalStorage

  folder_structure:
    frontend:
      components:
        - auth: [Login, Register]
        - functions: [CreatePost, SaveButton, EditPost, DeletePost]
        - layout: [Header.jsx]
        - pages: [Dashboard, Profile, LandingPage, SavedPosts]
      context:
        - AuthContext.jsx
      src:
        - Api.js
      others:
        - App.jsx [method POST, GET, PUT, DELETE]
        - main.jsx

  setup:
    install:
      - npm install
    start:
      - npm run dev
    backend_url:
      - http://localhost:5000

  auth_flow:
    token_storage: LocalStorage
    context: AuthContext
    routing_protection: PrivateRoute
    on_reload:
      - checks token
      - verifies user
      - shows protected pages accordingly

  api:
    wrapper_file: src/Api.js
    methods: [GET, POST, PUT, DELETE]
    token: attached in Authorization header automatically

  components_summary:
    AuthContext: "Manages auth state globally using Context API"
    PrivateRoute: "Guards protected routes using context"
    Header: "Shows Login/Register or Logout depending on auth"
    SaveButton: "Toggles saved status and shows status"
    CreatePost: "Handles post creation (reused in modal)"
    EditPost: "Handles inline editing of posts"
    DeletePost: "Confirms and deletes a note"

  save_feature:
    toggle: true
    backend: /api/toggle-save/:postId
    checks_user_posts: true
    reflected_in_UI: true

  protected_routes_example:
    route: /profile
    usage: "<PrivateRoute><Profile /></PrivateRoute>"

  ui_ux:
    - Tailwind for styling
    - Responsive design
    - Save button UI feedback
    - CreatePost popup/modal
    - Button disable/error checks

  future_improvements:
    - Dark mode
    - Pagination
    - Search and filter
    - Comments
    - Email support for password reset

  deployment:
    target: Vercel
    backend_url_setting: "Set BASE_URL in Api.js"
    steps:
      - Push to GitHub
      - Import in Vercel
      - Deploy

  developer_tips:
    - Use console.log for debugging
    - Ensure App is wrapped in AuthProvider
    - Set correct API base URL
    - Always test protected routes after logout

  license: Educational use only
  author: Prashant
