function addOrIncreaseResult(result, message) {
  const data = result.find((res) => (
    res.username_from === message.username_from
  ));

  if (data) {
    data.total += 1;
  } else {
    result.push({
      username_from: message.username_from,
      total: 1,
    });
  }

  return result;
}

function extractPendingMessages(messages, talkingTo) {
  let result = [];

  for (let i = 0; i < messages.length; i += 1) {
    if (messages[i].username_from !== talkingTo) {
      result = addOrIncreaseResult(result, messages[i]);
    }
  }

  return result;
}

export default extractPendingMessages;
