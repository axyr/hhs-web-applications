# API Design

## API Ontwerp: stap 1

Beschrijf de meta data:

Title: API Specification for Collections

Description: API Specification document of the Collections Management System

Contact: Martijn van Nieuwenhoven (http://mi6.uk.co/staff/bond-james)

Version: 1.0

API Type: Public

Server base URL: http://localhost:3000/api/v1

## API Ontwerp: stap 2

Identificieer de resources en geef ze de juiste naam:

- ~/collections
- ~/categories
- ~/items

## API Ontwerp: stap 3

Beschrijf het resource model:

Collection

- id
- name
- owner
- logo
- brandColor

Category

- id
- collectionId
- title
- itemCount

Item

- id
- collectionId
- categoryId
- title
- img

## API Ontwerp: Stap 4

Associaties tussen Resources:

- ~/collections
- ~/collections/:id/items
- ~/collections/:id/categories
- ~/categories
- ~/categories/:id/items

## API Ontwerp: Stap 5

Bepaal de HTTP Operations voor elke resource:

- ~/collections
    - GET
    - POST
- ~/collections/:id
    - GET
    - PATCH
    - DELETE
- ~/categories
    - GET
    - POST
- ~/categories/:id
    - GET
    - PATCH
    - DELETE
- ~/items
    - GET
    - POST
- ~/items/:id
    - GET
    - PATCH
    - DELETE

## API Ontwerp: Stap 6

Identificeer het benodige gebruik van parameters die nodig zijn voor de operations:

Query parameters voor de items:

- page
- perPage
- sort
- categories

Path Parameters

:id voor individuele unieke items van de verzamelingen
voor elk van de modellen:

- collections
- catgories
- items

Headers

- content-type

## API Ontwerp: Stap 7

Ontwerp request content:

Header

- content-type : application/json

Body

- ~/collections
    - GET
        - None
    - POST
        - name
        - owner
        - logo
        - brandColor
- ~/collections/:id
    - GET
        - None
    - PATCH
        - name
        - owner
        - logo
        - brandColor
    - DELETE
        - None
- ~/categories
    - GET
        - None
    - POST
        - collectionId
        - title
- ~/categories/:id
    - GET
        - None
    - PATCH
        - title
    - DELETE
        - None
- ~/items
    - GET
        - None
    - POST
        - collectionId
        - categoryId
        - title
        - img
- ~/items/:id
    - GET
        - None
    - PATCH
        - categoryId
        - title
        - img
    - DELETE
        - None

## API Ontwerp: Stap 7

Ontwerp request content voor elk request:

### GET ~/collections

Content-Type: application/json

---

### GET ~/collections/:id

Content-Type: application/json

---

### POST ~/collections

Content-Type: application/json

Body:

```json
{
  "name": "Books",
  "owner": "Martijn van Nieuwenhoven",
  "logo": "/collections/books/assets/logo.png",
  "brandColor": "#0283ff"
}
```

---

### PATCH ~/collections/:id

Content-Type: application/json

Body:

```json
{
  "name": "Books",
  "owner": "Martijn van Nieuwenhoven",
  "logo": "/collections/books/assets/logo.png",
  "brandColor": "#0283ff"
}
```

---

### DELETE ~/collections/:id

Content-Type: application/json

---

### GET ~/categories

Content-Type: application/json

---

### POST ~/categories

Content-Type: application/json

```json
{
  "name": "Pokemon",
  "owner": "Pieter van Nieuwenhoven",
  "logo": "/collections/pokemon/assets/logo.png",
  "brandColor": "#ff0088",
  "collectionId": 1
}
```

---

### GET ~/categories/:id

Content-Type: application/json

---

### PATCH ~/categories/:id

Content-Type: application/json

```json
{
  "name": "Pokemon",
  "owner": "Pieter van Nieuwenhoven",
  "logo": "/collections/pokemon/assets/logo.png",
  "brandColor": "#ff0088"
}
```

---

### DELETE ~/categories/:id

Content-Type: application/json

---

### GET ~/items

Content-Type: application/json

---

### POST ~/categories

Content-Type: application/json

```json
{
  "title": "BDD in Action",
  "img": "/collections/books/images/bdd-in-action.jpg",
  "collectionId": 1,
  "categoryId": 3
}
```

---

### GET ~/items/:id

Content-Type: application/json

---

### PATCH ~/items/:id

Content-Type: application/json

```json
{
  "title": "BDD in Action",
  "img": "/collections/books/images/bdd-in-action.jpg",
  "categoryId": 3
}
```

---

### DELETE ~/items/:id

Content-Type: application/json

---

# API Ontwerp: Stap 8

Ontwerp response content – de status code’s:

- ~/collections
    - GET
        - 200 OK
        - 404 Not Found
    - POST
        - 201 Created
        - 422 Unprocessable Content
- ~/collections/:id
    - GET
        - 200 OK
        - 404 Not Found
    - PATCH
        - 200 OK
        - 404 Not Found
        - 422 Unprocessable Content
    - DELETE
        - 204 No Content
        - 404 Not Found
- ~/categories
    - GET
        - 200 OK
        - 404 Not Found
    - POST
        - 201 Created
        - 422 Unprocessable Content
- ~/categories/:id
    - GET
        - 200 OK
        - 404 Not Found
    - PATCH
        - 200 OK
        - 404 Not Found
        - 422 Unprocessable Content
    - DELETE
        - 204 No Content
        - 404 Not Found
- ~/items
    - GET
        - 200 OK
        - 404 Not Found
    - POST
        - 201 Created
        - 422 Unprocessable Content
- ~/items/:id
    - GET
        - 200 OK
        - 404 Not Found
    - PATCH
        - 200 OK
        - 404 Not Found
        - 422 Unprocessable Content
    - DELETE
        - 204 No Content
        - 404 Not Found

## API Ontwerp: Stap 9

Ontwerp response format:

Alle responses in application/json format.

## API Ontwerp: Stap 10

Ontwerp response body format (voor elk request):

- ~/collections
    - GET
        - 200 OK
        - 404 Not Found
    - POST
        - 201 Created
        - 422 Unprocessable Content
- ~/collections/:id
    - GET
        - 200 OK
        - 404 Not Found
    - PATCH
        - 200 OK
        - 404 Not Found
        - 422 Unprocessable Content
    - DELETE
        - 204 No Content
        - 404 Not Found
- ~/categories
    - GET
        - 200 OK
        - 404 Not Found
    - POST
        - 201 Created
        - 422 Unprocessable Content
- ~/categories/:id
    - GET
        - 200 OK
        - 404 Not Found
    - PATCH
        - 200 OK
        - 404 Not Found
        - 422 Unprocessable Content
    - DELETE
        - 204 No Content
        - 404 Not Found
- ~/items
    - GET
        - 200 OK
        - 404 Not Found
    - POST
        - 201 Created
        - 422 Unprocessable Content
- ~/items/:id
    - GET
        - 200 OK
        - 404 Not Found
    - PATCH
        - 200 OK
        - 404 Not Found
        - 422 Unprocessable Content
    - DELETE
        - 204 No Content
        - 404 Not Found