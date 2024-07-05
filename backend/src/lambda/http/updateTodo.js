import { updateToDo } from '../../businessLogic/todos.js'

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const toDoItem = await updateToDo(updatedTodo, todoId, jwtToken)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: toDoItem
    })
  }
}
