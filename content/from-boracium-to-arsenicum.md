---
title: From Boracium To Arsenicum
description: Một vài ghi chép về Boracium, Silicium và Arsenicum.
published: true
publicationDate: 2019-08-19
lastUpdatedDate:
tags: [computer-science]
---

# From Boracium To Arsenicum

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [ĐẶT VẤN ĐỀ](#%C4%91%E1%BA%B7t-v%E1%BA%A5n-%C4%91%E1%BB%81)
- [SNMP](#snmp)
  - [Giải Pháp Hiện Thời](#gi%E1%BA%A3i-ph%C3%A1p-hi%E1%BB%87n-th%E1%BB%9Di)
    - [So Sánh](#so-s%C3%A1nh)
  - [Đề Xuất Giải Pháp: _Boracium_](#%C4%91%E1%BB%81-xu%E1%BA%A5t-gi%E1%BA%A3i-ph%C3%A1p-_boracium_)
    - [Tính Năng](#t%C3%ADnh-n%C4%83ng)
    - [So Sánh](#so-s%C3%A1nh-1)
  - [Công Cụ Hỗ Trợ](#c%C3%B4ng-c%E1%BB%A5-h%E1%BB%97-tr%E1%BB%A3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ĐẶT VẤN ĐỀ

- Cách mạng Công nghiệp lần 4, thời đại IOT, cloud computing,... => Nhu cầu quản lý tài nguyên mạng tối ưu
- Giao thức SNMP là một trong những giải pháp tốt nhất cho internet
  - Đơn giản, dễ sử dụng
  - Phổ biến nhất
  - Lịch sử phát triển lâu đời

## SNMP

Gồm 2 đối tượng chính

- Agent: Đối tượng quản lý
- Manager / Network management station (NMS): Hệ thống quản lý

_<Sơ đồ minh hoạ>_

### Giải Pháp Hiện Thời

- Net-SNMP: Bản cài đặt (implementation) đầy đủ cho SNMP
  - Agent
  - Trap receiver
  - Các ứng dụng CLI
  - Thư viện hỗ trợ phát triển ứng dụng
- Thư viện client khác
  - Python: PySNMP, Easy SNMP,...
  - Node.js: node-net-snmp,...

#### So Sánh

| Giải pháp     | Ngôn ngữ            | Tính năng   | Hiệu năng   | Tính dễ sử dụng |
| ------------- | ------------------- | ----------- | ----------- | --------------- |
| Net-SNMP      | C (chủ yếu)         | **RẤT TỐT** | **RẤT TỐT** | KÉM             |
| PySNMP        | Python              | TRUNG BÌNH  | KÉM         | TỐT             |
| Easy SNMP     | Python (C bindings) | TRUNG BÌNH  | **RẤT TỐT** | **RẤT TỐT**     |
| node-net-snmp | JavaScript/Node.js  | KÉM         | TRUNG BÌNH  | TỐT             |

### Đề Xuất Giải Pháp: _Boracium_

- Hỗ trợ làm việc dễ dàng, nhanh chóng, hiệu quả với SNMP
- Viết bằng TypeScript
- Nguyên lý hoạt động: Sinh tiến trình con (child process) thực thi binaries của Net-SNMP

#### Tính Năng

- Hỗ trợ v1, v2c và v3
- Gửi GET, GETNEXT, GETBULK và SET requests
- Nhận TRAP và INFORM
- Dịch (translate) OIDs
- Phân tích MIB (MIB parsing) và sinh cây MIB

#### So Sánh

| Giải pháp     | Ngôn ngữ            | Tính năng   | Hiệu năng   | Tính dễ sử dụng |
| ------------- | ------------------- | ----------- | ----------- | --------------- |
| Net-SNMP      | C (chủ yếu)         | **RẤT TỐT** | **RẤT TỐT** | KÉM             |
| PySNMP        | Python              | TRUNG BÌNH  | KÉM         | TỐT             |
| Easy SNMP     | Python (C bindings) | TRUNG BÌNH  | **RẤT TỐT** | **RẤT TỐT**     |
| node-net-snmp | JavaScript/Node.js  | KÉM         | TRUNG BÌNH  | TỐT             |
| _Boracium_    | TypeScript/Node.js  | TỐT         | **RẤT TỐT** | **RẤT TỐT**     |

### Công Cụ Hỗ Trợ

- Arsenicum: Công cụ hỗ trợ tích hợp SNMP vào NMSes
- Silicium: SNMP GUI toolkit
  - Gửi GET, GETNEXT, GETBULK và SET requests
  - Lưu lịch sử
  - Duyệt cây MIB
