---
title: SNMP - What I Know
description: Things I know about Simple Network Management Protocol (SNMP).
published: true
publicationDate: 2019-01-18
tags: [wik, snmp]
---

# SNMP - What I Know

## GIAO THỨC SNMP

### Giới thiệu

- Simple Network Management Protocol (SNMP) là một giao thức chuẩn dùng cho internet _(internet standard)_, nằm ở tầng ứng dụng _(application layer)_, được mô tả lần đầu trong [IETF RCF 1157](https://www.ietf.org/rfc/rfc1157).
- Dùng để thu thập, quản lý thông tin của các thiết bị mạng và có thể thay đổi những thông tin đó để điều chỉnh hành vi của thiết bị.
- SNMP hỗ trợ nhiều loại thiết bị từ có dây đến không dây như modems, routers, switches, servers, workstations, máy in, thiết bị IOT,...

### Các phiên bản

1. [**v1**](https://www.ietf.org/rfc/rfc1157)
   - Hỗ trợ những tính năng cơ bản nhất.
   - Chỉ sử dụng giao thức UDP.
   - Sử dụng community strings để xác thực.
2. [**v2c**](https://www.ietf.org/rfc/rfc1901)
   - Được sử dụng rộng rãi nhất.
   - Có thể sử dụng giao thức TCP nhưng mặc định vẫn là UDP.
3. [**v3**](https://www.ietf.org/rfc/rfc2571)
   - Tăng cường bảo mật và tính riêng tư bằng cách băm _(hash)_ địa chỉ MAC với MD5 hoặc SHA để xác thực cùng DES-56 để mã hoá dữ liệu.
   - Mặc định sử dụng giao thức TCP.

### Các thành phần chính

1. **Các thiết bị mạng được quản lý**
2. **Agent**
   - Phần mềm chạy trên thiết bị được quản lý.
   - Thu thập thông tin của thiết bị và gửi chúng về hệ thống quản lý.
3. **Network management station (NMS)**
   - Quản lý hệ thống mạng thông qua các agents.
4. **Management information base (MIB)?**
   - Cơ sở dữ liệu được lưu dưới dạng text (.mib).
   - Mô tả các tài nguyên mà hệ thống quản lý.
   - Được tổ chức theo dạng cây _(hierarchy)_.
   - Mỗi đơn vị gắn liền với một object identifier (OID).

### Cách thức hoạt động

Các phương thức chính của SNMP

1. **GET**: Được gửi từ manager để lấy một thông số nào đó, thông qua OID.
2. **GETNEXT**: Được gửi từ manager để lấy giá trị của OID tiếp theo trong cây MIB.
3. **GETBULK**: Được gửi từ manager để lấy một lượng lớn thông tin. _Có từ phiên bản v2c._
4. **RESPONSE**: Agent hồi đáp yêu cầu từ manager, chứa giá trị của thông số được yêu cầu.
5. **SET**: Được gửi từ manager để thay đổi một thông số nào đó của agent.
6. **TRAP**: Agent tự động gửi về manager mà không được yêu cầu. Thường là thông báo lỗi.
7. **INFORM**: Tương tự như TRAP, nhưng yêu cầu xác nhận _(acknowledgement)_ từ manager. _Có từ phiên bản v2c._

## Net-SNMP

### Giới thiệu

- Là một bộ ứng dụng hỗ trợ việc cài đặt _(implement)_ và sử dụng giao thức SNMP.
- Sử dụng cả IPv4 và IPv6.
- Hỗ trợ cả 3 phiên bản giao thức SNMP.
- Hỗ trợ cả Windows và các hệ điều hành Unix-based như Linux và MacOS. Tuy nhiên, một số tính năng có thể khác nhau trên mỗi nền tảng.

### Các thành phần chính

1. **Các ứng dụng CLI**
   - Truy vấn thông tin từ agents: `snmpget`, `snmpgetnext`, `snmpwalk`, `snmptable`, `snmpdelta`.
   - Thay đổi thông số của agents: `snmpset`.
   - Truy vấn những thông số cố định của agents: `snmpdf`, `snmpnetstat`, `snmpstatus`.
   - Trình duyệt MIB: `snmptranslate`.
2. **Trình duyệt MIB `tkmib`**
   - Là ứng dụng giao diện đồ hoạ.
3. **Daemon `snmptrapd`**
   - Nhận và log TRAPs.
4. **Agent daemon `snmpd`**
   - Hỗ trợ sẵn _(built-in)_ nhiều MIB information modules.
   - Có thể được mở rộng.
5. **Thư viện hỗ trợ phát triển ứng dụng SNMP**
   - Hỗ trợ ngôn ngữ C và Perl.
