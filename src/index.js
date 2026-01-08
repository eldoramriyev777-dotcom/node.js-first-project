const express = require("express")
const app = express()
const { PORT, NODE_ENV } = require("./utils/secret")

const {app_router} = require("./routes/index")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api", app_router)

// // JSON faylni o‘qish funksiyasi
// function readData() {
//     const data = fs.readFileSync("./data.json", "utf-8")
//     return JSON.parse(data)
// }

// // JSON faylga yozish funksiyasi
// function writeData(data) {
//     fs.writeFileSync("./data.json", JSON.stringify(data, null, 2))
// }

/* =====================
      USERS CRUD
===================== */

// GET – barcha userlar
// app.get("/users", (req, res) => {
//     const db = readData()
//     res.json(db.users)
// })

// // POST – yangi user qo‘shish
// app.post("/users", (req, res) => {
//     const db = readData()
//     const newUser = req.body

//     newUser.id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1
    
//     db.users.push(newUser)
//     writeData(db)

//     res.json({ message: "User qo‘shildi!", data: newUser })
// })

// // PUT – user ma’lumotlarini o‘zgartirish
// app.put("/users/:id", (req, res) => {
//     const db = readData()
//     const id = Number(req.params.id)

//     const index = db.users.findIndex(u => u.id === id)
//     if (index === -1) return res.status(404).json({ message: "User topilmadi" })

//     db.users[index] = { ...db.users[index], ...req.body }
//     writeData(db)

//     res.json({ message: "User yangilandi!", data: db.users[index] })
// })

// // DELETE – user o‘chirish
// app.delete("/users/:id", (req, res) => {
//     const db = readData()
//     const id = Number(req.params.id)

//     db.users = db.users.filter(u => u.id !== id)
//     writeData(db)

//     res.json({ message: "User o‘chirildi!" })
// })

// /* =====================
//      PRODUCTS CRUD
// ===================== */

// // Barcha products
// app.get("/products", (req, res) => {
//     const db = readData()
//     res.json(db.products)
// })

// // Product qo‘shish
// app.post("/products", (req, res) => {
//     const db = readData()
//     const newProduct = req.body

//     newProduct.id = db.products.length ? db.products[db.products.length - 1].id + 1 : 1
    
//     db.products.push(newProduct)
//     writeData(db)

//     res.json({ message: "Product qo‘shildi!", data: newProduct })
// })

// /* =====================
//       ORDERS CRUD
// ===================== */

// app.get("/orders", (req, res) => {
//     const db = readData()
//     res.json(db.orders)
// })

// app.post("/orders", (req, res) => {
//     const db = readData()
//     const newOrder = req.body

//     newOrder.id = db.orders.length ? db.orders[db.orders.length - 1].id + 1 : 1

//     db.orders.push(newOrder)
//     writeData(db)

//     res.json({ message: "Order qo‘shildi!", data: newOrder })
// })

// /* ===================== */

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
}) 
