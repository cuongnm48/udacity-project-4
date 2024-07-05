import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const s3Client = new AWS.S3({ signatureVersion: 'v4' })
const todoTable = process.env.TODOS_TABLE
const s3BucketName = process.env.S3_BUCKET_NAME

export async function getServiceAllToDo(userId) {
  const params = {
    TableName: todoTable,
    KeyConditionExpression: '#userId = :userId',
    ExpressionAttributeNames: {
      '#userId': 'userId'
    },
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }
  const result = await docClient.query(params).promise()
  const items = result.Items

  return items
}

export async function createServiceToDo(todoItem) {
  const params = {
    TableName: todoTable,
    Item: todoItem
  }

  const result = await docClient.put(params).promise()
  console.log(result)
  return todoItem
}

export async function updateServiceToDo(todoUpdate, todoId, userId) {
  const params = {
    TableName: todoTable,
    Key: {
      userId: userId,
      todoId: todoId
    },
    UpdateExpression: 'set #a = :a, #b = :b, #c = :c',
    ExpressionAttributeNames: {
      '#a': 'name',
      '#b': 'dueDate',
      '#c': 'done'
    },
    ExpressionAttributeValues: {
      ':a': todoUpdate['name'],
      ':b': todoUpdate['dueDate'],
      ':c': todoUpdate['done']
    },
    ReturnValues: 'ALL_NEW'
  }

  const result = await docClient.update(params).promise()
  console.log('result', result)
  const attributes = result.Attributes
  return attributes
}

export async function deleteServiceToDo(todoId, userId) {
  const params = {
    TableName: todoTable,
    Key: {
      userId: userId,
      todoId: todoId
    }
  }

  const result = await docClient.delete(params).promise()
  console.log(result)
  return ''
}

export async function generateServiceUploadUrl(todoId) {
  const url = s3Client.getSignedUrl('putObject', {
    Bucket: s3BucketName,
    Key: todoId,
    Expires: 1000
  })
  console.log('url upload', url)
  return url
}
