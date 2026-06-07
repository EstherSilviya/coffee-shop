

const express = require('express')
const router  = express.Router()
const { pool } = require('../db')

function validate({ name, email, message }) {
  const errors = []

  if (!name    || name.trim().length    < 2)   errors.push('Name must be at least 2 characters.')
  if (!email   || !email.includes('@'))         errors.push('A valid email is required.')
  if (!message || message.trim().length < 10)  errors.push('Message must be at least 10 characters.')

  return errors
}

router.post('/', async (req, res) => {
  
  const { name, email, message } = req.body
  const errors = validate({ name, email, message })
  if (errors.length > 0) {
   
    return res.status(422).json({ success: false, errors })
  }

  try {
  
    const sql = `
      INSERT INTO contact_messages (name, email, message)
      VALUES (?, ?, ?)
    `
    const [result] = await pool.execute(sql, [
      name.trim(),
      email.trim().toLowerCase(),
      message.trim(),
    ])

    console.log(`📩 New message saved — ID: ${result.insertId}, from: ${email}`)

    
    return res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      id: result.insertId,
    })

  } catch (err) {
    console.error('❌ DB insert error:', err.message)
    
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    )
    return res.status(200).json({ success: true, data: rows, count: rows.length })
  } catch (err) {
    console.error('❌ DB fetch error:', err.message)
    return res.status(500).json({ success: false, message: 'Failed to fetch messages.' })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params  
  
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return res.status(400).json({ success: false, message: 'Invalid ID.' })
  }

  try {
    const [result] = await pool.execute(
      'DELETE FROM contact_messages WHERE id = ?',
      [id]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Message not found.' })
    }
    return res.status(200).json({ success: true, message: `Message ${id} deleted.` })
  } catch (err) {
    console.error('❌ DB delete error:', err.message)
    return res.status(500).json({ success: false, message: 'Failed to delete message.' })
  }
})

module.exports = router
