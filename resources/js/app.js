import '../styles/main.scss'
import Alpine from 'alpinejs'
import axios from 'axios'
import { newStatus, deletePost, resetPostErrors, submitPostForm } from './tools/PostScripts'
import { resetMsgInputs, resetMsgErrors, submitMsgForm } from './tools/ContactScripts'
import { logout } from './tools/UserScripts'

// Libraries
window.Alpine = Alpine
Alpine.start()

window.axios = axios

// Scripts
//---Post
window.newStatus = newStatus
window.deletePost = deletePost
// edit post
window.resetPostErrors = resetPostErrors
window.submitPostForm = submitPostForm
//---Contact
window.resetMsgInputs = resetMsgInputs
window.resetMsgErrors = resetMsgErrors
window.submitMsgForm = submitMsgForm
//---User
window.logout = logout
