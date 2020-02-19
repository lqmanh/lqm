---
title: SQL-like Trigger Cho MongoDB Cùng Node.js
description: Bắt đầu từ đâu nhỉ? À, phải rồi, mọi chuyện bắt đầu từ việc mình ghét Mongoose, chủ yếu vì cái API và mấy concepts SQL nửa mùa nó thêm vào - những thứ vốn không tồn tại. Không sao, đã có hàng auth node-mongodb-native đây! Nhưng mình sớm nhận ra hàng chính hãng cũng chẳng thể đáp ứng hoàn toàn nhu cầu bản thân. Một trong những tính năng hay hớm của các SQL DBMS mà MongoDB không hỗ trợ chính là trigger. Mình thực sự muốn MongoDB có một thứ tương tự vậy.
published: true
publicationDate: 2020-02-16
lastUpdatedDate: 2020-02-19
tags: [computer-science, nodejs, mongodb]
---

# SQL-like Trigger Cho MongoDB Cùng Node.js

## Nhu cầu

Bắt đầu từ đâu nhỉ? À, phải rồi, mọi chuyện bắt đầu từ việc mình ~~không thích~~ghét [Mongoose][mongoose], chủ yếu vì cái API và mấy concepts SQL nửa mùa nó thêm vào - những thứ vốn không tồn tại. Không sao, đã có hàng auth [node-mongodb-native][node-mongodb-native] đây! Nhưng mình sớm nhận ra hàng chính hãng cũng chẳng thể đáp ứng hoàn toàn nhu cầu bản thân. Một trong những tính năng hay hớm của các SQL DBMS mà MongoDB không hỗ trợ chính là trigger. Mình thực sự ~~cần~~muốn MongoDB có một thứ tương tự vậy. Okay đến đây sẽ có nhiều người phản bác rằng sao không đi mà dùng SQL ấy? Song, lựa chọn một DBMS phù hợp cần dựa trên nhiều yếu tố khác chứ không thể chỉ vì cái trigger phải không nào?

Quay trở lại nhu cầu của chúng ta: _"Tôi muốn một tính năng cho phép MongoDB tự động chạy các hàm định sẵn, ngay trước và sau các CRUD operations."_

Rõ ràng, mình không phải là người đầu tiên và duy nhất đòi hỏi một tính năng như thế này. Người ta đã nghĩ ra vài cách để "fake" trigger cho MongoDB, chủ yếu dựa trên cơ chế [oplog tailing][oplog] hoặc [theo dõi change streams][change-streams].

Một số giải pháp áp dụng 2 cơ chế trên:

- [MongoDB Stitch database trigger][stitch]: sản phẩm thương mại
- [mongo-triggers][mongo-triggers]: ngừng phát triển

Tuy nhiên, cả 2 hướng tiếp cận này đều tương đối phức tạp và khó _(đối với mình)_ làm cho ít rối rắm hơn được. Sản phẩm có sẵn thì chả cái nào ưng. Do đó, mình quyết đi tìm một giải pháp tự chế đơn giản và hiện đại (Mongoose cũng có trigger tự chế mà họ gọi là [middleware][mongoose-middleware]).

## Giải pháp

Vậy là mình bắt đầu tìm cách thiết kế và cài đặt vào [Mongol][mongol] [^1].

Bắt đầu từ hướng giải quyết, rằng làm sao mình có thể gắn before/after hook (mình xin phép từ giờ sẽ gọi trigger là hook - thuật ngữ được sử dụng trong Mongol) vào CRUD operations. Hoá ra cũng không quá khó khăn, nhờ tính "super" dynamic của JavaScript. Mục tiêu của chúng ta đơn giản là monkey-patch tất cả CRUD operation methods của node-mongodb-native như ví dụ dưới đây:

```js
const originalFn = collection.insertOne
collection.insertOne = async (...args) => {
  before()
  const result = await originalFn(...args)
  after()
  return result
}
```

Ơ có gì đó sai sai...

![Sorry for this blurry image](/static/sqllike-trigger-cho-mongodb-cung-nodejs.jpg)

Để có thể gọi `originalFn()` ở bất cứ đâu, chúng ta cần bind context gốc lại cho nó.

```js
const originalFn = collection.insertOne.bind(collection)
```

Chưa xong, công cuộc thiết kế API cho tính năng này mới là điều khiến mình trăn trở nhất. Sau khi tham khảo một vài nguồn, kể cả Mongoose, cuối cùng mình cũng chốt hạ được như trong [API docs][mongol-docs-database-hook] của Mongol hiện nay.

Hiểu một cách đơn giản, _Mongol database hook là một object với 3 optional properties: "before", "after" và "error". Chúng có thể được gán vào handler functions tương ứng, và sẽ được tự động thực thi ngay trước, ngay sau và khi có lỗi phát sinh trong các CRUD operation methods của node-mongodb-native._

## Ví dụ

Trong phần này, chúng ta sẽ cùng nhau cài đặt timestamp hook: tự động thêm/cập nhật `createdAt` và `updatedAt`. Thực tế, timestamp hook đã được tích hợp sẵn trong Mongol. Để sử dụng, các bạn chỉ cần import factory function `createTimestampHook`.

```js
const { Mongol } = require('@albert-team/mongol') // version >= 0.6.0
const { createTimestampHook } = require('@albert-team/mongol/builtins/hooks')

const main = async () => {
  const mongol = new Mongol('mongodb://localhost:27017/myproject', 'myproject')
  const db = await mongol.promisifiedDatabase
  const coll = db.collection('mycollection')
  Mongol.attachDatabaseHook(coll, createTimestampHook())
}
main()
```

`createTimestampHook` còn hỗ trợ các naming conventions khác nhau như camelCase và snake_case. Song, hôm nay chúng ta sẽ cài đặt một phiên bản đơn giản hơn.

_Lưu ý rằng đoạn code dưới đây chưa thể chạy được. Để phục vụ mục đích giải thích, mình xin tóm lược một số phần dễ hiểu._

Trước hết, chúng ta cùng lướt qua một vài thành phần chính (có lẽ bạn sẽ không cần tới mọi thứ liệt kê dưới đây đâu):

```js
// a database hook should have at least one of "before", "after" and "error" handlers
const timestampHook = {
  // context - hook context
  // rawArgs - raw arguments passed to CRUD operation methods, as an array
  before: (context, rawArgs) => {
    // operation - one of CRUD operation methods
    // op - essentially the same as operation, but more generic
    // event - 'before', 'during' or 'after' ('during' may only be useful in 'error' handler)
    // arguments - parsed arguments passed to CRUD operation methods, as an object
    const { operation, op, event, arguments: parsedArgs } = context
    const { query, options } = parsedArgs
    let { documents, update, subOperations } = parsedArgs

    /* process things, see below... */

    // return undefined/null, Mongol'll pass the original args to the original CRUD operation method
    // return an array like rawArgs, Mongol'll pass it to the original CRUD operation method instead
    // return an object like parsedArgs, Mongol'll unparse then pass it to the original CRUD operation method
    return { query, documents, update, subOperations, options }
  }
}

Mongol.attachDatabaseHook(coll, timestampHook)
```

Nếu vẫn mơ hồ, các bạn hãy tra cứu thêm API docs nha! Còn đây là phần thân của "before" handler trên:

```js
if (op === 'insert' || op === 'replace)
  documents = documents.map((doc) => withTimestamp(doc, 'createdAt'))
else if (op === 'update')
  update = { ...update, $currentDate: { ['updatedAt']: true } }
else if (op === 'bulkWrite')
  subOperations = subOperations.map((subOp) => {
    if (subOp.insertOne)
      subOp.insertOne.document = withTimestamp(subOp.insertOne.document, 'createdAt')
    else if (subOp.replaceOne)
      subOp.replaceOne.replacement = withTimestamp(subOp.replaceOne.replacement, 'createdAt')
    else if (subOp.updateOne)
      subOp.updateOne.update = {
        ...subOp.updateOne.update, $currentDate: { ['updatedAt']: true }
      }
    else if (subOp.updateMany)
      subOp.updateMany.update = {
        ...subOp.updateMany.update, $currentDate: { ['updatedAt']: true }
      }

    return subOp
  })
```

## Hạn chế

Dẫu hiện tại mình đã khá hài lòng với implementation này và chắc chắn sẽ sử dụng nó trong các dự án của mình, chúng ta vẫn phải thừa nhận rằng nó không thể nào sánh bằng SQL trigger được. Chưa kể, hướng tiếp cận này của mình còn những điểm mù mà oplog hay change streams giải quyết triệt để hơn.

Một số nhược điểm cơ bản:

- So với SQL trigger, ta không có thông tin về bản ghi cũ trước thay đổi.
- Điểm mù upsert option trong update và replace operations. Ta không biết chắc operation thực sự là update hay insert.
- Kể cả với những hooks cơ bản như timestamp trong ví dụ trên, ta vẫn cần khá nhiều khối lệnh rẽ nhánh (mình sẽ cố gắng tìm cách cải thiện trong tương lai).

Đến đây cũng khá dài rồi, hi vọng mọi người thấy bài viết này hữu ích, càng hi vọng mọi người thấy Mongol hữu ích. Đừng ngại ngần để lại vài feedbacks cho mình nha!

## Links

Mongol: [Github][mongol] | [NPM][mongol-npm] | [API docs][mongol-docs]

[^1]: **[DISCLAIMER]** Mongol là một thư viện bổ trợ cho node-mongodb-native. Khác Mongoose, nó không thay đổi API của driver gốc, không yêu cầu người dùng _phải_ làm gì nếu bản thân MongoDB không yêu cầu (như viết fixed models).

[change-streams]: https://docs.mongodb.com/manual/changeStreams
[mongo-triggers]: https://github.com/iddogino/mongoTriggers
[mongol]: https://github.com/albert-team/mongol
[mongol-docs]: https://albert-team.github.io
[mongol-docs-database-hook]: https://albert-team.github.io/mongol/classes/mongol.html#attachdatabasehook
[mongol-npm]: https://www.npmjs.com/package/@albert-team/mongol
[mongoose]: https://mongoosejs.com
[mongoose-middleware]: https://mongoosejs.com/docs/middleware.html
[node-mongodb-native]: http://mongodb.github.io/node-mongodb-native
[oplog]: https://docs.mongodb.com/manual/core/replica-set-oplog
[stitch]: https://docs.mongodb.com/stitch/triggers/database-triggers
