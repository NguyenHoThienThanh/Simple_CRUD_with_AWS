const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
// Kết nối MongoDB
async function connectToDatabase() {
  const uri = "mongodb+srv://Lamenth:LamenthGotTheBang123%40%40@myshop.n39gv.mongodb.net/myShop?retryWrites=true&w=majority";

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Connected to MongoDB successfully!");
    } catch (error) {
      console.error("Could not connect to MongoDB", error);
      throw new Error("Database connection failed");
    }
  }
}

// Định nghĩa schema cho Item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const Item = mongoose.model('Item', itemSchema);

// Main handler cho tất cả CRUD operations
module.exports.mainHandler = async (event) => {
  await connectToDatabase();

  const method = event.httpMethod;  // Xác định phương thức HTTP (GET, POST, PUT, DELETE)
  const { id } = event.pathParameters || {};  // Lấy id từ pathParameters nếu có

  switch (method) {
    case 'POST':  // Tạo mới Item
      const { name, description } = JSON.parse(event.body);
      const newItem = new Item({ name, description });
      await newItem.save();

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Item created successfully!', item: newItem }),
      };

    case 'GET':  // Lấy tất cả hoặc lấy 1 Item theo id
      if (id) {
        const item = await Item.findById(id);

        if (!item) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Item not found' }),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify(item),
        };
      } else {
        const items = await Item.find();
        return {
          statusCode: 200,
          body: JSON.stringify(items),
        };
      }

    case 'PUT':  // Cập nhật Item theo id
      const { name: updatedName, description: updatedDescription } = JSON.parse(event.body);

      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { name: updatedName, description: updatedDescription },
        { new: true }
      );

      if (!updatedItem) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(updatedItem),
      };

    case 'DELETE':  // Xóa Item theo id
      const deletedItem = await Item.findByIdAndDelete(id);

      if (!deletedItem) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Item deleted successfully' }),
      };

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};
