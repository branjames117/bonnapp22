import { getSession } from 'next-auth/client'
import { ObjectId } from 'bson'
import { connectToDatabase } from '../../../lib/db'

async function notifSetter(db, pageID) {
  /* first check if comment belongs to a user profile */
  const usersCollection = db.collection('users')
  const notifyUser = await usersCollection.findOne({
    _id: ObjectId(pageID),
  })

  if (notifyUser) {
    /* user profile comment has been commented upon, so let's increment
      the notifs object in that user's document only, since only that user
      needs the notification, using the user's own ID */
    await usersCollection.updateOne(
      { _id: ObjectId(pageID) },
      { $inc: { notifs: 1 } }
    )
  } else {
    /* no user found, so check if it's a show profile being commented upon */
    const showsCollection = db.collection('shows')
    const notifyShow = await showsCollection.findOne({
      _id: ObjectId(pageID),
    })
    if (notifyShow) {
      /* it is, so let's loop through each of the "excitedUsers", add each of them
        as a property in the show document's notifs field, and then increment each one */
      notifyShow.excitedUsers.forEach(async (user) => {
        const notifField = { $inc: {} }
        notifField['$inc']['notifs.' + user] = 1
        await showsCollection.updateOne({ _id: ObjectId(pageID) }, notifField)
      })
    }
  }
}

export default async function handler(req, res) {
  const session = await getSession({ req })
  const pageID = req.query.pageID

  if (!pageID) {
    res.status(400).json({
      message: 'Bad input.',
      comments: [],
    })
    return
  }

  /* connect to the db */
  const client = await connectToDatabase()
  /* if db connection fails, respond with empty array */
  if (!client) {
    client.close()
    res.status(503).json({
      message: 'Unable to access database.',
      comments: [],
    })
    return
  }
  const db = client.db()
  const commentsCollection = db.collection('comments')

  /* if GET method, get all comments */
  if (req.method === 'GET') {
    const comments = await commentsCollection
      .find({ pageID: pageID })
      .sort({ timestamp: -1 })
      .toArray()

    client.close()

    if (!comments) {
      res.status(503).json({
        comments: [],
        message: 'Unable to retrieve comments.',
      })
    } else {
      res.status(201).json({ comments: comments })
    }
    return
  }

  /* if POST method, create a new comment */
  if (req.method === 'POST') {
    const { username, text } = req.body

    /* API protections - reject if no session, or if session name does not match
    comment author's name */
    if (!session || session.user.name !== username) {
      client.close()
      res.status(401).json({ message: 'Invalid credentials.', comments: [] })
      return
    }
    if (!username || !text || text.trim() === '' || text.trim().length > 500) {
      client.close()
      res.status(422).json({ message: 'Invalid input.', comments: [] })
      return
    }

    /* update notifications */
    await notifSetter(db, pageID)

    /* create a new comment object */
    const newComment = {
      pageID,
      text,
      username,
      timestamp: new Date(),
    }

    await commentsCollection.insertOne(newComment)

    const comments = await commentsCollection
      .find({ pageID: pageID })
      .sort({ timestamp: -1 })
      .toArray()

    client.close()

    if (!comments) {
      res.status(503).json({
        comments: [],
        message: 'Unable to retrieve comments.',
      })
    } else {
      res.status(201).json({ comments: comments })
    }
    return
  }

  /* if DELETE method, delete the selected comment */
  if (req.method === 'DELETE') {
    /* object destructuring */
    const { commentID, replyID, username, deletingReply } = req.body

    /* only allow auth'd users to delete their own comments */
    if (!session || session.user.name !== username) {
      client.close()
      res.status(401).json({ message: 'Invalid credentials.', comments: [] })
      return
    }

    /* delete the entire comment document if not deleting a reply */
    if (!deletingReply) {
      await commentsCollection.deleteOne({
        _id: ObjectId(commentID),
      })
    }

    /* pull from replies array only if deleting a reply */
    if (deletingReply) {
      await commentsCollection.updateOne(
        {
          _id: ObjectId(commentID),
        },
        {
          $pull: { replies: { id: ObjectId(replyID) } },
        }
      )
    }

    const comments = await commentsCollection
      .find({ pageID: pageID })
      .sort({ timestamp: -1 })
      .toArray()

    client.close()

    if (!comments) {
      res.status(503).json({
        comments: [],
        message: 'Unable to retrieve comments.',
      })
    } else {
      res.status(201).json({ comments: comments })
    }
    return
  }

  /* if method is PATCH, a reply is written */
  if (req.method === 'PATCH') {
    /* object destructuring */
    const { commentID, username, text } = req.body

    /* only allow auth'd users to post their own replies */
    if (!session || session.user.name !== username) {
      client.close()
      res.status(401).json({ message: 'Invalid credentials.', comments: [] })
      return
    }
    if (!username || !text || text.trim() === '' || text.trim().length > 500) {
      client.close()
      res.status(422).json({ message: 'Invalid input.', comments: [] })
      return
    }

    /* update notifications */
    await notifSetter(db, pageID)

    const newReply = {
      id: ObjectId(),
      text,
      username,
      timestamp: new Date(),
    }

    /* Use the $push operator to remove the ID'd comment from the comments array */
    await commentsCollection.updateOne(
      {
        _id: ObjectId(commentID),
      },
      { $push: { replies: newReply } }
    )

    /* get the updated comments and send it back to the front end */
    const comments = await commentsCollection
      .find({ pageID: pageID })
      .sort({ timestamp: -1 })
      .toArray()

    client.close()

    if (!comments) {
      res.status(503).json({
        comments: [],
        message: 'Unable to retrieve comments.',
      })
    } else {
      res.status(201).json({ comments: comments })
    }
    return
  }
}
