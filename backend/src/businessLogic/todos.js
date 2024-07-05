import { parseUserId } from '../auth/utils.mjs'
import {
  createServiceToDo,
  deleteServiceToDo,
  generateServiceUploadUrl,
  getServiceAllToDo,
  updateServiceToDo
} from '../dataLayer/todosAccess.js'
import { v4 as uuidv4 } from 'uuid'

export function getAllToDo(jwtToken) {
  const userId = parseUserId(jwtToken)
  return getServiceAllToDo(userId)
}

export function createToDo(createTodoRequest, jwtToken) {
  const userId = parseUserId(jwtToken)
  const todoId = uuidv4()
  const s3BucketName = process.env.S3_BUCKET_NAME

  return createServiceToDo({
    userId: userId,
    todoId: todoId,
    attachmentUrl: `https://${s3BucketName}.s3.amazonaws.com/${todoId}`,
    createdAt: new Date().getTime().toString(),
    done: false,
    ...createTodoRequest
  })
}

export function updateToDo(updateTodoRequest, todoId, jwtToken) {
  const userId = parseUserId(jwtToken)
  return updateServiceToDo(updateTodoRequest, todoId, userId)
}

export function deleteToDo(todoId, jwtToken) {
  const userId = parseUserId(jwtToken)
  return deleteServiceToDo(todoId, userId)
}

export function generateUploadUrl(todoId) {
  return generateServiceUploadUrl(todoId)
}
