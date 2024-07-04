import { getAllToDo } from "../../businessLogic/todos";

export async function handler(event) {
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];
  const toDos = await getAllToDo(jwtToken);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      "items": toDos,
    }),
  }
}
