### fsjs-atlc

Weird name, and weird config. Just trying to establish a good personal **F**ull**s**tack **J**ava**S**cript boilerplate for use by [**@atlc**](https://github.com/atlc).

Stack includes React, Typescript, Express, Redux, MySQL. Going to attempt to wean off bootstrap and use another css framework/toolkit, like Tailwind.

---

Architecture (just most of the backend bare structureplanned so far):

**src** 📁
- ↪ **server** 📁
    - ↪ **config** 📁
      - *index.ts*
    - ↪ **db** 📁
      - ↪ **queries** 📁
      - *index.ts*
    - ↪ **middleware** 📁
          - *index.ts*
    - ↪ **routes** 📁
      - ↪ **api** 📁
      - ↪ **auth** 📁
          - *index.ts*
          - *login.ts*
          - *register.ts*
      - *index.ts*
    - ↪ **utils** 📁
      - ↪ **security** 📁
        - *passwords.ts*
        - *tokens.ts*
    - ***server.ts***