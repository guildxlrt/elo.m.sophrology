import '../styles/main.scss'
import Alpine from 'alpinejs'
import axios from 'axios'
import { newStatus, deletePost } from './tools/PostScripts'
import { resetMsgInputs, resetMsgErrors, submitMsgForm } from './tools/Contact'

// Libraries
window.Alpine = Alpine
Alpine.start()
window.axios = axios

// Scripts
window.newStatus = newStatus
window.deletePost = deletePost

window.resetMsgInputs = resetMsgInputs
window.resetMsgErrors = resetMsgErrors
window.submitMsgForm = submitMsgForm
