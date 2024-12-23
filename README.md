# Simple_CRUD_with_AWS
-------------
CÀI ĐẶT
-------------
1. Cài đặt Node.js và npm
2. Cài đặt các phụ thuộc: npm install
3. Cài đặt Serverless Framework: npm install -g serverless
4. Cấu hình AWS
    .Cài đặt AWS CLI:
    .Cấu hình AWS CLI: aws configure
5. Cấu hình dự án Serverless
6. Triển khai ứng dụng: serverless deploy

-------------
THAO TÁC CRUD
-------------
1. Tạo item (POST): 
curl -X POST https://your-api-endpoint.com/items -H "Content-Type: application/json" -d '{"name": "Item Name", "description": "Item Description"}'
2. Lấy danh sách item (GET): 
curl -X GET https://your-api-endpoint.com/items
3. Lấy thông tin item theo ID (GET): 
curl -X GET https://your-api-endpoint.com/items/{itemId}
4. Cập nhật item (PUT): 
curl -X PUT https://your-api-endpoint.com/items/{itemId} -H "Content-Type: application/json" -d '{"name": "Updated Item Name", "description": "Updated Description"}'
5. Xóa item (DELETE): 
curl -X DELETE https://your-api-endpoint.com/items/{itemId}
