---
title: SNMP - What I Know
description: Một vài ghi chép về Giao thức Quản lý Mạng Đơn giản - Simple Network Management Protocol (SNMP), cho một dự án cá nhân ngắn hạn về quản lý tài nguyên hệ thống mạng.
published: true
publicationDate: 2019-01-18
lastUpdatedDate: 2019-04-08
tags: [computer-science, wik]
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
4. **Management information base (MIB)**
   - Mô tả các tài nguyên mà hệ thống quản lý.

### Cách thức hoạt động

Các phương thức chính của SNMP

1. **GET**: Được gửi từ manager để lấy một thông số nào đó, thông qua OID.
2. **GETNEXT**: Được gửi từ manager để lấy giá trị của OID tiếp theo trong cây MIB.
3. **GETBULK**: Được gửi từ manager để lấy một lượng lớn thông tin. _Có từ phiên bản v2c._
4. **RESPONSE**: Agent hồi đáp yêu cầu từ manager, chứa giá trị của thông số được yêu cầu.
5. **SET**: Được gửi từ manager để thay đổi một thông số nào đó của agent.
6. **TRAP**: Agent tự động gửi về manager mà không được yêu cầu. Thường là thông báo lỗi.
7. **INFORM**: Tương tự như TRAP, nhưng yêu cầu xác nhận _(acknowledgement)_ từ manager. _Có từ phiên bản v2c._

## MANAGEMENT INFORMATION BASE (MIB)

- Để định vị mỗi tài nguyên mà SNMP quản lý, người ta dùng hệ thống MIB. Mỗi tài nguyên ấy được định danh bởi một object identifier (OID).
- Hệ thống MIB có thể được mô tả như một cây có gốc không tên _(nameless root)_.
- Các file MIBs được lưu trữ trong `/usr/share/snmp/mibs` dưới dạng text (.txt).
- Mỗi OID được thể hiện qua standard dotted naming system. Ví dụ với OID 1.3.6.1.4.1.77 ta có:
  - 1: International Organization for Standardization (ISO)
  - 3: Organization (ORG)
  - 6: Department of Defense (DoD)
  - 1: Internet
  - 4: Private
  - 1: Enterprises
  - 77: LAN Manager MIB II

## NET-SNMP

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

### Tuỳ chỉnh _(Configuration)_

Các tuỳ chỉnh cho Net-SNMP có thể được lưu trữ trong:

1. `~/.snmp/snmpd.conf`: Chỉ cho một người dùng nhất định và có mức độ ưu tiên cao nhất.
2. `/usr/share/snmp/snmpd.conf`: Cho tất cả người dùng trong hệ thống.
3. `/etc/snmp/snmpd.conf`: Thường chỉ cho phiên bản v1 và v2c.
4. `/var/net-snmp/snmpd.conf`: Được sinh ra bởi `snmpd` và bị ghi đè mỗi khi `snmpd` khởi động. Vì vậy, không được tự ý lưu tuỳ chỉnh vào đây, trừ _"createUser" tokens_.

`snmpconf` là một ứng dụng CLI có sẵn hỗ trợ việc sinh ra file tuỳ chỉnh cho `snmpd`.
