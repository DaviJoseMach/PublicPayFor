# PayFor API Documentation

  

## What is a REST API?

  

A REST (Representational State Transfer) API is an interface that enables communication between systems using HTTP protocols. REST APIs are commonly used to transfer data, providing a lightweight and efficient mechanism for exchanging information between clients and servers.

  

## How Does the PayFor API Work?

  

The PayFor API operates by retrieving gateway information from our database. This data is stored and processed on our server. The API then sends pre-processed and optimized data to the front-end, allowing the application to display it seamlessly to users.

  

This approach ensures that only relevant, formatted data is shared, reducing overhead and improving application performance.

### Database (DB)

At **PayFor**, we use **Supabase** as our database solution. However, you don't need to set it up or install any of its dependencies. Our API provides direct integration, allowing you to work with the data through code modifications.

If you'd like to propose changes to the database, you can submit an **issue** with a `.json` file specifying the desired data structure (example provided). Alternatively, you can directly adjust the code without interacting with the database.

For example:

```typescript
const tags = ["All", "Most Used", "Trending", "New", "Recommended", "Innovative"];
const resources = ["All", "Pix", "Credit Card", "Debit Card", "Subscription", "Checkout", "No-Code", "Community", "Low-Code"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const countries = [
  { name: "All", emoji: "🌍" },
  { name: "Brazil", emoji: "🐆" },
  { name: "Canada", emoji: "🍁" },
  { name: "USA", emoji: "🦅" },
  { name: "UK", emoji: "🦁" },
  { name: "Italy", emoji: "🍕" },
  { name: "Spain", emoji: "💃" },
  { name: "Germany", emoji: "🍺" },
  { name: "Portugal", emoji: "🍷" },
  { name: "Argentina", emoji: "🐆" },
];

```

These fields represent **filters**, and you can add new filters by extending the arrays while following the same structure.

 ### Data Porting in PayFor API

To perform a data port using the PayFor API, you need to create a JSON file with specific fields:

**Required Fields**:

-   `name`: Name of the gateway.
-   `logo`: URL or path to the gateway's logo.
-   `doc`: Documentation link for the gateway.
-   `site`: Website of the gateway.
-   `countries`: List of supported countries.
-   `resources`: Available payment resources (e.g., "Pix", "Credit Card").
-   `percentage`: Fee percentage for using the gateway.
-   `tag`: Tags categorizing the gateway.
-   `difficulty`: Difficulty level for integration.

**Example JSON**:

```json
{
  "name": "AbacatePay",
  "logo": "https://example.com/logo.png",
  "doc": "https://example.com/docs",
  "site": "https://example.com",
  "countries": ["Brazil", "USA"],
  "resources": ["Pix", "Credit Card", "Debit Card"],
  "percentage": 2.5,
  "tag": ["Innovative", "Recommended"],
  "difficulty": "Easy"
}

```

PayFor provides a proprietary resource for managing these ports directly through our API, making the integration process seamless and efficient. Further details on utilizing this resource will follow.

