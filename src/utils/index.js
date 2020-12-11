export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line eqeqeq,no-bitwise
    const v = c == "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

const currencyMap = {
  "en-IN": "INR",
  "en-US": "USD",
  "en-GB": "EUR",
  "en-JP": "JPY",
};
export function formatPrice(price, lang) {
  // eslint-disable-next-line no-param-reassign
  lang = lang || navigator.language;

  return Number(price).toLocaleString(lang, {
    style: "currency",
    currency: currencyMap[lang] || "USD",
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

// Payment cards
export const supportedCards = [
  "visa",
  "masterCard",
  "amex",
  "jcb",
  "discover",
  "dinersClub",
];
export function detectCardType(number) {
  const re = {
    visa: /^4[0-9]{0,}$/,
    mastercard: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/,
    amex: /^3[47][0-9]{0,}$/,
    "diners-club": /^3(?:0[0-59]{1}|[689])[0-9]{0,}$/,
    discover: /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$/,
    jcb: /^(?:2131|1800|35)[0-9]{0,}$/,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const key in re) {
    if (re[key].test(number)) {
      return key;
    }
  }

  return "";
}

export function maskCardNumber(num) {
  const len = num.length;
  const last4 = num.substr(-4);

  return last4.padStart(len, "x");
}

export function isPastDate(date) {
  const today = new Date();

  return (
    date.getFullYear() <= today.getFullYear()
    && date.getMonth() <= today.getMonth()
    && date.getDate() < today.getDate()
  );
}
