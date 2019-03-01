# 1. What is the purpose of using _sessions_?

**Sessions** are used for **persisting authentication data** in some designated storage (like a server), keeping a record of information about individual clients. Through this procedure, each _client_ (some specific piece of hardware or software from an individual device) will be 'remembered' once authenticated - **credentials and other information won't have to be gathered for every single request**.

# 2. What does bcrypt do to help us store passwords in a secure manner.

**`bcrypt`** ensures that passwords are _not stored in plaintext_ in order to **prevent passwords from becoming completely compromised in the event of a password leakage** - the outputs will not be immediately readable to humans. It also uses **hashing**, which means that unlike the two-way process of _encryption_, the password **can be encoded but not decoded upon being processed (one-way conversion)**.

# 3. What does bcrypt do to slow down attackers?

## Salting

`bcrypt` not only **hashes** passwords; it can also generate **random salts** for the hashes - this means that some _additional randomized input(s)_ get added to the hashing function, and these salts can be used even more commonly used patterns more 'different' from one another in storage. This results in _larger rainbow tables_, slowing down attackers.

## Multiple hashing rounds

While hashing algorithms all have some forms of security flaw, they do serve to _delay_ attackers in obtaining the actual password. These algorithms can be used on a password in **multiple accumulative rounds** for deeper password security. In the case of `bcrypt`, there are functions that take in a numerical parameter indicating the number of hashing rounds - `bcrypt` takes that number (recommended to be **at least 12**) and hashes the password in **2<sup>n</sup> iterations**.

# 4. What are the three parts of the JSON Web Token?

A **JWT** is essentially a _string_ that can be separated into the following parts (which are joined together by periods **.**):

- Header - contains the **algorithm** (for token creation) and token type
- Payload - includes **user information**, **specified permissions** and _possibly additional relevant data_
- Signature - a **base64-encoded string** that is 'signed' with a **secret (secret key)** - this is essentially a _computed 'signature' used to validate a JWT_
