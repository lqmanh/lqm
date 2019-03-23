---
title: Bloom Filter Là Cái Vẹo Gì?
description: Bloom Filter là một cấu trúc dữ liệu xác suất (probabilistic data structure). Tạo sao nói xác suất? Nó có thể nhanh chóng kết luận một phần tử CHẮC CHẮN KHÔNG nằm trong tập hợp, nhưng chỉ có thể dự đoán một phần tử CÓ THỂ CÓ nằm trong tập hợp mà thôi.
headerImage: /static/bloom-filter-la-cai-veo-gi.jpg
published: true
publicationDate: 2019-03-23
tags: [computer-science]
---

# Bloom Filter Là Cái Vẹo Gì?

> _Khuyến cáo_: Bài viết này chỉ dành cho những con _mọt máy tính_ như mình. Sẽ có rất nhiều thuật ngữ chuyên ngành mà mình thậm chí chẳng buồn (hay chẳng thể) dịch ra tiếng Việt, chứ đừng nói đến việc cắt nghĩa chúng. Vậy nên, các bạn hãy cân nhắc thật kĩ, trước khi nổ não.

![Header Image](/static/bloom-filter-la-cai-veo-gi.jpg)

## Giới thiệu

**Bloom Filter** là một cấu trúc dữ liệu xác suất _(probabilistic data structure)_. Tạo sao nói xác suất? Nó có thể nhanh chóng kết luận một phần tử CHẮC CHẮN KHÔNG nằm trong tập hợp, nhưng chỉ có thể dự đoán một phần tử CÓ THỂ CÓ nằm trong tập hợp mà thôi.

Cấu trúc dữ liệu này phát huy được tính ứng dụng của mình rõ nhất thông qua việc truy vấn những tài nguyên _expensive-to-access_ (gửi request lên server qua internet, đọc dữ liệu từ ổ đĩa,...): nếu mình có một cơ sở dữ liệu (CSDL) rất lớn và muốn kiểm tra xem phần tử `foo` có tồn tại trong đó hay không, mình có thể truy vấn **Bloom Filter** trước; nếu không tồn tại, mình có thể bỏ qua bước truy vấn tốn kém vào CSDL; ngược lại, mình vẫn cần truy vấn vào CSDL để chắc chắn `foo` tồn tại thật hay không. Ngoài ra, nó cũng tiết kiệm không gian bộ nhớ _(memory efficient)_ hơn rất nhiều so với bảng băm _(hash table)_.

Dẫu vậy, **Bloom Filter** vẫn có nhiều nhược điểm. Luôn tồn tại một tỉ lệ lỗi _false positives_ (có thể kiểm soát được) khi nó khẳng định một phần tử có tồn tại, nhưng trên thực tế thì không. Không như bảng băm, **Bloom Filter** không lưu trực tiếp giá trị của phần tử vào bộ nhớ nên không có cách nào lấy lại giá trị ấy. Ta cũng không thể xoá một phần tử ra khỏi filter.

Một vài biến thể: Counting Bloom Filter, Partitioned Bloom Filter, Cuckoo Filter, Count Min Sketch,...

## Cách thức hoạt động

**Bloom Filter** thực chất là một dãy bits _(bit array/vector)_. Trước khi một phần tử được thêm vào, nó sẽ được băm _(hashed)_. `bits[hashval % nbits]` được chuyển thành `1`. Cơ chế này tương đối giống bảng băm. Để kiểm tra một phần tử tồn tại hay không, filter sẽ kiểm tra giá trị băm và bit tương ứng trong dãy bits đã được chuyển thành `1` hay chưa.

VD: `hash(item) % 8 = 2`

| 0   | 0   | 1   | 0   | 0   | 0   | 0   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- |


Bạn có thể thấy, cơ chế hoạt động như trên có thể dẫn đến xung đột _(collisions)_. Nếu `hash(another_item) % 8 == 2`, filter sẽ bị lỗi _false positive_ - khẳng định `another_item` có tồn tại trong khi thực tế không phải vậy.

Có hai cách để giảm thiểu tỉ lệ xảy ra lỗi này. Cách đầu tiên là tăng kích thước dãy bits. Cách thứ hai là sử dụng nhiều hơn 1 bit để xác định một phần tử, tức là thực hiện băm nhiều lần _(multiple hashing)_.

VD:

```
hash(item, 0) % 16 = 2
hash(item, 1) % 16 = 0
hash(item, 1) % 16 = 11
```

| 1   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 0   | 0   | 0   | 1   | 0   | 0   | 0   | 0   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |


Ở đây, ta đã tăng gấp đôi kích thước dãy bits (từ 8 lên 16). Thay vì băm một lần, ta cũng đã tăng lên ba lần với 3 seed khác nhau để nhận được các giá trị băm khác nhau. Để chắc chắn `item` không có trong filter, chỉ cần 1 trong 3 bits `0`, `2` hoặc `11` được tắt.

## Bloom Filter + Redis = RedisBloom

Trong thực tế, mình sử dụng **Bloom Filter** với [Redis][0] (in-memory database), thông qua [RedisBloom][1] module. Để sử dụng module này trong Node.js một cách thuận tiện hơn, mình đã và đang phát triển một thư viện client mang tên Rebloom. Bạn có thể ngó qua trang Github của nó tại [đây][2] và NPM package tại [đây][3].

## Đọc thêm

1. https://en.wikipedia.org/wiki/Bloom_filter
2. https://llimllib.github.io/bloomfilter-tutorial

---

Cảm ơn các bạn đã dành thời gian đọc hết bài viết này của mình. Nếu quan tâm và muốn đóng góp cho Rebloom, đừng ngần ngại, _just fork [it][2]_.

[0]: https://redis.io
[1]: https://github.com/RedisLabsModules/redisbloom
[2]: https://github.com/albert-team/rebloom
[3]: https://www.npmjs.com/package/@albert-team/rebloom
