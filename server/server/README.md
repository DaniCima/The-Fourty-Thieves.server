FOURTY Thieves
Website for sharing personal creations in any form of art. Social selling and colaboration around performances of uknown artists.

User Stories
404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
Signup: As an anon I can sign up in the platform so that I can start saving favorite artworks.
Login: As a user I can login to the platform so that I can see my own gallery, post artwork and save and see my favourites.
Logout: I will still have access to se the general gallery.
Add Artkork As an artist user I can add my owk artwork so that I can share it with the community
General Gallery As any visitor of the web I want to see the artworks and the artists, and if I sign-up I can text them to buy or make a collaboration offert
Search Artwork As a user I want to search artwork by name so that I know if it´s already in the platform
Add to favorites As a user I want to add an artwork to favorite so that I can save the restaurants that I liked the most
See my favorites As a user I want to see my favorite master pieces (artworks) so that I can see the ones I liked the most

Backlog
User profile:
see other users profiles and galleries

Geo Location:
see artwork in a map

Client

Routes

/ - Homepage
/auth/signup - Signup form
/auth/login - Login form
/restaurants - restaurant list
/artwork/create - create a restaurant
/gallery/:artwork - restaurant detail
/profile/me - my details and favorite restaurants
/profile/:user - acces to other user gallery and collaborators
404
Pages
Home Page (public)
Sign in Page (anon only)
Log in Page (anon only)
General Gallery (public)
My Gallery (user-artist only)
Artwork Create (user-artist only)
Artwork Detail Page (public)
My Profile Page (user only)
404 Page (public)
Components
Artwork Card component
Input: restaurant: any
Output: favorite(restaurantId: string, on: boolean)
Search component
Output: change(terms: string)
IO
Services
Auth Service
auth.login(user)
auth.signup(user)
auth.logout()
auth.me()
auth.getUser() // synchronous
Restaurant Service
gallery()
artwork.create(data)
artwork.detail(id)
artwork.addFavorite(id)
artwork.removeFavorite(id)

Server

Models

User model

username - String // required & unique
email - String // required & unique
password - String // required
favorites - [ObjectID<Artwork>]
artirst - Boolean // required
profileImage - String
discipline - String
autodefinition - String
collaborators - [ObjectID<User>]
link - String

Artwork model

owner - ObjectID<User> // required
username - String // required
img - String
address - String
API Endpoints/Backend Routes
GET /auth/me
POST /auth/signup
body:
username
email
password
POST /auth/login
body:
username
password
POST /auth/logout
body: (empty)
POST /user/me/favorite
body:
restaurantId
DELETE /user/me/favorite/:restaurantId
body: (empty)
GET /restaurant
POST /restaurant
body:
name
phone
address
GET /gallery/:artwork

Links

Trello/Kanban
Link to your trello board or picture of your physical board

Git

Client repository Link Server repository Link

Deploy Link

Slides

Slides Link
