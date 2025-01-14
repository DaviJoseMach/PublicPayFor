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

PayFor provides a proprietary resource for managing these ports directly through our API, making the integration process seamless and efficient. Further details on utilizing this resource will follow.

----



# **Data Porting Method**

The PayFor API provides a custom method to port data into the system. This method is based on a structured process involving TypeScript validation, error handling, and integration into the database.

#### **Step-by-Step Process**

1.  **Data Structure**  
    The data must follow the JSON format with the following fields:
    
    -   `nome` (string): The name of the gateway.
    -   `logo` (string): The URL of the logo.
    -   `doc` (string): The documentation link.
    -   `site` (string): The official site link.
    -   `paises` (array of strings): Countries where the gateway operates.
    -   `recursos` (array of strings): Available features (e.g., "Pix", "Checkout").
    -   `porcentagem` (number): The gateway's transaction percentage.
    -   `tag` (array of strings): Tags for categorization.
    -   `dificuldade` (string): The difficulty level (e.g., "Fácil", "Média", "Difícil").
    
    **Example JSON:**
    
    ```json
    {
      "nome": "ExemploPay",
      "logo": "https://example.com/logo.png",
      "doc": "https://example.com/doc",
      "site": "https://example.com",
      "paises": ["Brasil", "Canadá", "EUA"],
      "recursos": ["Pix", "Cartão de crédito", "Checkout"],
      "porcentagem": 2.5,
      "tag": ["Recomendado", "Tendência"],
      "dificuldade": "Fácil"
    }
    
    ```
    
2.  **Validation Function**  
    Use a TypeScript function to validate the data structure.
    
    ```ts
    interface GatewayData {
      nome: string;
      logo: string;
      doc: string;
      site: string;
      paises: string[];
      recursos: string[];
      porcentagem: number;
      tag: string[];
      dificuldade: string;
    }
    
    function validateGatewayData(data: any): { isValid: boolean; errors: string[] } {
      const errors: string[] = [];
    
      if (typeof data.nome !== "string") errors.push("Invalid 'nome' field.");
      if (typeof data.logo !== "string") errors.push("Invalid 'logo' field.");
      if (typeof data.doc !== "string") errors.push("Invalid 'doc' field.");
      if (typeof data.site !== "string") errors.push("Invalid 'site' field.");
      if (!Array.isArray(data.paises)) errors.push("Invalid 'paises' field.");
      if (!Array.isArray(data.recursos)) errors.push("Invalid 'recursos' field.");
      if (typeof data.porcentagem !== "number") errors.push("Invalid 'porcentagem' field.");
      if (!Array.isArray(data.tag)) errors.push("Invalid 'tag' field.");
      if (typeof data.dificuldade !== "string") errors.push("Invalid 'dificuldade' field.");
    
      return { isValid: errors.length === 0, errors };
    }
    
    ```
    
3.  **Data Processing**  
    Use a `try-catch` block to handle errors and add the data if validation passes.
    
    ```ts
    function processGatewayData(data: any): void {
      try {
        const validation = validateGatewayData(data);
    
        if (!validation.isValid) {
          console.log("Validation errors:", validation.errors);
          console.log("Data reset.");
          return;
        }
    
        // Add data to JSON or database
        const database: GatewayData[] = []; // Example database
        database.push(data);
        console.log("Data added successfully:", data);
    
      } catch (error) {
        console.error("Error processing gateway data:", error);
      }
    }
    
    ```
    
4.  **Usage**  
    Call the `processGatewayData` function with your JSON object.
    
    ```ts
    const newGateway = {
      nome: "ExemploPay",
      logo: "https://example.com/logo.png",
      doc: "https://example.com/doc",
      site: "https://example.com",
      paises: ["Brasil", "Canadá", "EUA"],
      recursos: ["Pix", "Cartão de crédito", "Checkout"],
      porcentagem: 2.5,
      tag: ["Recomendado", "Tendência"],
      dificuldade: "Fácil"
    };
    
    processGatewayData(newGateway);
    
    ```
    

----------

This method ensures the data is validated, errors are handled gracefully, and valid data is seamlessly integrated into the system.