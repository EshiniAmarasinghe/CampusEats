// Service layer: the only place that knows where menu data lives.
// Today it is the static /public/menu.json file. To use the Lab 03/04
// ASP.NET Core API instead, change MENU_URL to e.g. "http://localhost:5183/api/menu".
export const MENU_URL = "/menu.json";

export const formatPrice = (price) => `Rs. ${Number(price).toFixed(2)}`;
