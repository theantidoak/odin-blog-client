// place files you want to import through the `$lib` alias in this folder.

function getHeaders(APITOKEN: unknown) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APITOKEN}`
    },
  }
}

function postHeaders(APITOKEN: unknown) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APITOKEN}`
    },
  }
}

function putHeaders(APITOKEN: unknown) {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${APITOKEN}`
    },
  }
}

export { getHeaders, postHeaders, putHeaders };