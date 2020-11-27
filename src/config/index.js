import { uuidv4 } from "../utils";

export const SITE_NAME = "eStore";

export const BRANDS = [
  {
    name: "Levis",
    id: uuidv4(),
  },
  {
    name: "Adidas",
    id: uuidv4(),
  },
  {
    name: "Puma",
    id: uuidv4(),
  },
  {
    name: "Nike",
    id: uuidv4(),
  },
];

export const PAYMENT_CARDS = [
  {
    size: "1x",
    id: uuidv4(),
    title: "Mastercard",
    icon: { prefix: "fab", iconName: "cc-mastercard" },
  },
  {
    size: "1x",
    id: uuidv4(),
    title: "Visa",
    icon: { prefix: "fab", iconName: "cc-visa" },
  },
  {
    size: "1x",
    id: uuidv4(),
    title: "AmEx",
    icon: { prefix: "fab", iconName: "cc-amex" },
  },
  {
    size: "1x",
    id: uuidv4(),
    title: "Discover",
    icon: { prefix: "fab", iconName: "cc-discover" },
  },
  {
    size: "1x",
    id: uuidv4(),
    title: "Diners Club",
    icon: { prefix: "fab", iconName: "cc-diners-club" },
  },
  {
    size: "1x",
    id: uuidv4(),
    title: "JCB",
    icon: { prefix: "fab", iconName: "cc-jcb" },
  },
  {
    size: "1x",
    id: uuidv4(),
    title: "PayPal",
    icon: { prefix: "fab", iconName: "cc-paypal" },
  },
];

export const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const CARD_NUM_LENGTHS = {
  visa: 16,
  mastercard: 16,
  amex: 15,
  "diners-club": 14,
  discover: 16,
  jcb: 16,
};
