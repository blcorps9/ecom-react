export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

export async function makeRequest(url = "", opt = {}) {
  const config = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (opt) {
    if (opt.headers) {
      config.headers = opt.headers;
    }

    if (opt.method) {
      config.method = opt.method;
    }

    if (opt.data) {
      config.body = JSON.stringify(opt.data);
    }
  }

  const response = await fetch(url, config);

  return response;
}
