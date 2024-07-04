import { createToDo } from "../../businessLogic/todos";

export async function handler(event) {
  const newTodo = JSON.parse(event.body)

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const toDoItem = await createToDo(newTodo, jwtToken);

  return {
      statusCode: 201,
      headers: {
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          "item": toDoItem
      }),
  }
}

