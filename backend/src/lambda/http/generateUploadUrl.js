import { generateUploadUrl } from "../../businessLogic/todos";

export async function handler(event) {
  const todoId = event.pathParameters.todoId
  const URL = await generateUploadUrl(todoId);

  return {
    statusCode: 202,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      uploadUrl: URL,
    })
  };
}

