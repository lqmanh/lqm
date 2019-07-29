---
title: From Boracium To Arsenicum
description: Một vài ghi chép về Boracium, Silicium và Arsenicum.
published: true
publicationDate: 2019-07-29
lastUpdatedDate:
tags: [computer-science]
---

# From Boracium To Arsenicum

## ĐẶT VẤN ĐỀ

- Cách mạng Công nghiệp lần 4, thời đại IOT, cloud computing,... => Nhu cầu quản lý tài nguyên mạng một cách tối ưu
- Giao thức SNMP là một trong những giải pháp tốt nhất
  - Đơn giản, dễ sử dụng
  - Phổ biến nhất
  - Lịch sử phát triển lâu đời

## GIẢI PHÁP HIỆN THỜI

- Net-SNMP: Bản cài đặt (implementation) đầy đủ cho SNMP
  - Agent (server)
  - Các ứng dụng CLI (client)
  - Thư viện hỗ trợ phát triển ứng dụng SNMP (client)
- Thư viện client khác
  - Python: PySNMP, Easy SNMP,...
  - Node.js: node-net-snmp,...

### So Sánh

| Giải pháp     | Ngôn ngữ            | Tính năng   | Hiệu năng   | Tính dễ sử dụng |
| ------------- | ------------------- | ----------- | ----------- | --------------- |
| Net-SNMP      | C (chủ yếu)         | **RẤT TỐT** | **RẤT TỐT** | KÉM             |
| PySNMP        | Python              | TRUNG BÌNH  | KÉM         | TỐT             |
| Easy SNMP     | Python (C bindings) | TRUNG BÌNH  | **RẤT TỐT** | **RẤT TỐT**     |
| node-net-snmp | JavaScript/Node.js  | KÉM         | TRUNG BÌNH  | TỐT             |

## ĐỀ XUẤT GIẢI PHÁP

Thư viện client _Boracium_

- Hỗ trợ làm việc với SNMP dễ dàng, nhanh chóng, hiệu quả
- Viết bằng TypeScript
- Nguyên lý hoạt động: Sinh tiến trình con (child process) thực thi binaries của Net-SNMP

### Tính Năng

- Hỗ trợ đầy đủ v1, v2c và v3
- Gửi GET, GETNEXT, GETBULK và SET requests
- Nhận TRAP và INFORM
- Dịch (translate) OIDs
- Phân tích MIB (MIB parsing)
- Sinh cây MIB

### So Sánh

| Giải pháp     | Ngôn ngữ            | Tính năng   | Hiệu năng   | Tính dễ sử dụng |
| ------------- | ------------------- | ----------- | ----------- | --------------- |
| Net-SNMP      | C (chủ yếu)         | **RẤT TỐT** | **RẤT TỐT** | KÉM             |
| PySNMP        | Python              | TRUNG BÌNH  | KÉM         | TỐT             |
| Easy SNMP     | Python (C bindings) | TRUNG BÌNH  | **RẤT TỐT** | **RẤT TỐT**     |
| node-net-snmp | JavaScript/Node.js  | KÉM         | TRUNG BÌNH  | TỐT             |
| _Boracium_    | TypeScript/Node.js  | TỐT         | **RẤT TỐT** | **RẤT TỐT**     |

## CÔNG CỤ BỔ TRỢ

- Silicium: SNMP GUI toolkit
  - Gửi GET, GETNEXT, GETBULK và SET requests
  - Lưu lịch sử
  - Duyệt cây MIB
