# 🗄️ Database Normalization Explained (with Examples)

Hey fellow dev! Ever felt your database is a complete mess—duplicate data everywhere, tables that don’t make sense, and queries that feel like pulling teeth? Yeah… we’ve all been there. That’s where **Database Normalization** comes in.

Think of normalization as cleaning your room. Instead of throwing everything on one big table (literally), you organize things neatly into their own places—so nothing’s duplicated, nothing’s lost, and everything just works.

---

## ❓ What is Database Normalization?

Database normalization is the process of **organizing data into structured tables** to minimize redundancy and ensure consistency.

In simple terms:

- Each piece of data lives in the right place
- No duplicate clutter
- Relationships between tables are clear and logical

It’s like splitting your messy notes into well-labeled folders—clean, tidy, and easy to find later.

📖 Sources: [Rudiawan16](https://rudiawan16.wordpress.com/normalisasi-database-beserta-pengertian-dan-contohnya), [Aantamim](https://aantamim.id/normalisasi-database)

---

## 🎯 Goals of Normalization

- 🗑 **Eliminate redundancy** → no unnecessary duplicate data
- ✅ **Ensure data dependencies are correct** → every attribute belongs to the right table
- 🛡 **Prevent anomalies** → avoid weird problems when inserting, updating, or deleting data
- 🔄 **Consistency** → each fact is stored once, and only once

Example anomaly without normalization:

- Update anomaly → change a customer’s phone number in one table but forget another copy in another table.
- Delete anomaly → remove a sales record and accidentally delete the only stored customer info.

---

## 💡 Benefits of Normalization

- 🚀 **Efficient queries** → faster search & retrieval
- 🧹 **Reduced redundancy** → cleaner database design
- 🔒 **Data integrity** → consistency maintained at all times
- ⚡ **Flexibility** → easy to add or modify tables without breaking structure
- 🔍 **Avoid anomalies** → insert/update/delete all behave predictably

📖 Extra Reading: [PasarHosting Blog](https://pasarhosting.com/blog/normalisasi-database-1nf-2nf-3nf), [Binus University](https://binus.ac.id/bekasi/2024/12/bagaimana-melakukan-normalisasi-pada-database-dengan-efektif)

---

## ⚙️ How Normalization Works

The process happens in steps, called **Normal Forms (NF)**. Each form fixes specific issues:

### 1️⃣ First Normal Form (1NF)

- Each column is atomic (only one value, no lists).
- No duplicate rows.

✅ Example:
Bad → A `Orders` table with a column `Items` containing `"Pen, Notebook, Eraser"`.
Good → Split into multiple rows, each with one item.

#### 📊 Detailed 1NF Example

**Before 1NF (Violates Atomicity):**

```
Students Table
+------------+----------------+--------------------+
| StudentID  | Name           | Subjects           |
+------------+----------------+--------------------+
| 1          | John Doe       | Math, Physics      |
| 2          | Jane Smith     | English, History   |
| 3          | Bob Johnson    | Math, Chemistry    |
+------------+----------------+--------------------+
```

**After 1NF (Atomic Values):**

```
Students Table
+------------+----------------+
| StudentID  | Name           |
+------------+----------------+
| 1          | John Doe       |
| 2          | Jane Smith     |
| 3          | Bob Johnson    |
+------------+----------------+

Student_Subjects Table
+------------+-------------+
| StudentID  | Subject     |
+------------+-------------+
| 1          | Math        |
| 1          | Physics     |
| 2          | English     |
| 2          | History     |
| 3          | Math        |
| 3          | Chemistry   |
+------------+-------------+
```

---

### 2️⃣ Second Normal Form (2NF)

- Must already be in 1NF.
- No **partial dependency** (non-key attributes must depend on the whole primary key, not just part of it).

✅ Example:
If primary key = `(OrderID, ProductID)` but `ProductName` depends only on `ProductID`, move `ProductName` to a `Products` table.

#### 📊 Detailed 2NF Example

**Before 2NF (Has Partial Dependency):**

```
Order_Details Table
+----------+------------+---------------+------------+----------+
| OrderID  | ProductID  | ProductName   | Quantity   | Price    |
+----------+------------+---------------+------------+----------+
| 101      | P001       | Laptop        | 2          | 800.00   |
| 101      | P002       | Mouse         | 5          | 25.00    |
| 102      | P001       | Laptop        | 1          | 800.00   |
| 102      | P003       | Keyboard      | 3          | 50.00    |
+----------+------------+---------------+------------+----------+
Primary Key: (OrderID, ProductID)
Problem: ProductName depends only on ProductID, not the full key
```

**After 2NF (Removing Partial Dependencies):**

```
Orders Table
+----------+------------+----------+
| OrderID  | ProductID  | Quantity |
+----------+------------+----------+
| 101      | P001       | 2        |
| 101      | P002       | 5        |
| 102      | P001       | 1        |
| 102      | P003       | 3        |
+----------+------------+----------+

Products Table
+------------+---------------+----------+
| ProductID  | ProductName   | Price    |
+------------+---------------+----------+
| P001       | Laptop        | 800.00   |
| P002       | Mouse         | 25.00    |
| P003       | Keyboard      | 50.00    |
+------------+---------------+----------+
```

---

### 3️⃣ Third Normal Form (3NF)

- Must already be in 2NF.
- No **transitive dependency** (non-key attributes cannot depend on other non-key attributes).

✅ Example:
If `Orders` table has `OrderID, ProductID, PricePerUnit`, and `PricePerUnit` depends on `ProductID`, move it to `Products` table.

#### 📊 Detailed 3NF Example

**Before 3NF (Has Transitive Dependency):**

```
Employees Table
+-------------+---------------+----------------+-------------------+
| EmployeeID  | Name          | DepartmentID   | DepartmentName    |
+-------------+---------------+----------------+-------------------+
| E001        | Alice Johnson | D01            | Human Resources   |
| E002        | Bob Smith     | D02            | Engineering       |
| E003        | Carol Brown   | D01            | Human Resources   |
| E004        | David Wilson  | D02            | Engineering       |
+-------------+---------------+----------------+-------------------+
Problem: DepartmentName depends on DepartmentID, not EmployeeID
```

**After 3NF (Removing Transitive Dependencies):**

```
Employees Table
+-------------+---------------+----------------+
| EmployeeID  | Name          | DepartmentID   |
+-------------+---------------+----------------+
| E001        | Alice Johnson | D01            |
| E002        | Bob Smith     | D02            |
| E003        | Carol Brown   | D01            |
| E004        | David Wilson  | D02            |
+-------------+---------------+----------------+

Departments Table
+----------------+-------------------+
| DepartmentID   | DepartmentName    |
+----------------+-------------------+
| D01            | Human Resources   |
| D02            | Engineering       |
+----------------+-------------------+
```

---

### 5️⃣ Boyce–Codd Normal Form (BCNF)

- Stronger version of 3NF.
- Every determinant (attribute that defines another) must be a candidate key.

✅ Example:
If in `Teachers(TeacherID, Subject, Department)`, `Department` determines `Subject`, then we split into separate tables to avoid anomalies.

#### 📊 Detailed BCNF Example

**Before BCNF (Determinant is not a candidate key):**

```
Course_Schedule Table
+------------+-------------+---------------+----------+
| TeacherID  | Subject     | Department    | Room     |
+------------+-------------+---------------+----------+
| T001       | Database    | CS            | R101     |
| T002       | Algorithms  | CS            | R102     |
| T003       | Calculus    | Math          | R201     |
| T001       | Programming | CS            | R103     |
+------------+-------------+---------------+----------+
Problem: Department determines Subject, but Department is not a candidate key
```

**After BCNF (Every determinant is a candidate key):**

```
Teachers Table
+------------+---------------+
| TeacherID  | Department    |
+------------+---------------+
| T001       | CS            |
| T002       | CS            |
| T003       | Math          |
+------------+---------------+

Subjects Table
+-------------+---------------+
| Subject     | Department    |
+-------------+---------------+
| Database    | CS            |
| Algorithms  | CS            |
| Programming | CS            |
| Calculus    | Math          |
+-------------+---------------+

Schedule Table
+------------+-------------+----------+
| TeacherID  | Subject     | Room     |
+------------+-------------+----------+
| T001       | Database    | R101     |
| T002       | Algorithms  | R102     |
| T003       | Calculus    | R201     |
| T001       | Programming | R103     |
+------------+-------------+----------+
```

---

## 🚩 When is Normalization Needed?

- When **designing a new database** (best to start normalized).
- When **adding new entities/attributes** to avoid redundancy.
- When facing **performance issues** or **data anomalies**.
- When **integrating multiple datasets**.
- Mostly in **relational databases** (MySQL, PostgreSQL, Oracle, SQL Server).

👉 Note: Sometimes databases are intentionally denormalized (for speed in read-heavy systems, like data warehouses). But as a rule, **always normalize first, then denormalize if needed**.

---

## ⚠️ What Happens Without Normalization?

A poorly designed database often suffers:

- Duplicate data across multiple tables
- Data inconsistency (values differ in different places)
- Data loss when deleting records
- Many `NULL` values
- Wasted storage & messy queries

Basically → chaos. 😵

---

## 📝 Final Thoughts

Database normalization isn’t just a “theory for textbooks”—it’s a real-world practice that makes your system more reliable, flexible, and efficient.

Remember:

1. Start with 1NF → atomic data
2. Move to 2NF → remove partial dependencies
3. Apply 3NF → remove transitive dependencies
4. Use BCNF if needed → super clean structure

Your future self (and your teammates) will thank you for designing a database that’s easy to maintain and free from headaches.

---

✅ Want to dive deeper? Check these out:

- [PasarHosting — Normalization](https://pasarhosting.com/blog/normalisasi-database-1nf-2nf-3nf)
- [Anomali Database](https://pasarhosting.com/blog/anomali-database/)
- [Aantamim — Normalization Basics](https://aantamim.id/normalisasi-database)
- [Database Normalization — GeeksforGeeks](https://www.geeksforgeeks.org/normalization-in-database-with-example/)

---

🔑 TL;DR → Normalize your database = cleaner data, faster queries, fewer headaches.
