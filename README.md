Next JS Project that emulates the Clearscore Tech Test and builds an Idea Board with LocalStore access.

The user(s) have a white board that can be used to add some tiles with some ideas.

Every tile has a title and a space for the content that must be max 140 characters. Whenever the note is getting close to the limit, a message notifies the user until the max character length is reach.

Every time the tile is edited the footer bar on the card registers the time and date of the event, and every note is sortable by title or last edit time.

Informations are stored into the browser Local Storage and can be retrieved from the same device at any page refresh.

For the design I used Bootstrap and React Bootstrap, Uuidv4 provides some unique ID for every idea tile generated.
