---
title: AutoMapper In Dart
description: Trong bài viết này, mình sẽ giới thiệu qua vài nét sơ lược nhất về AutoMapper, rồi quá trình mình implement thư viện ấy với Dart như nào, cùng tất cả những gì mình học được từ đó.
headerImage: /static/automapper-in-dart.jpg
published: true
publicationDate: 2019-12-10
tags: [computer-science]
---

# AutoMapper In Dart

Chào các bạn, Mạnh trở lại rồi đây! Phải lâu lắm rồi mình mới lại cầm bút lên viết một bài tử tế như này nhỉ?

Trong cả thảy hơn chục bài từ trước đến giờ, đây là bài viết thứ hai mình chia sẻ về đề tài lập trình, sau [_Bloom Filter Là Cái Vẹo Gì?_](/posts/bloom-filter-la-cai-veo-gi). Như thường lệ, mình hi vọng nó sẽ thật hay ho và bổ ích cho tất cả độc giả đang theo con đường "cài Win dạo". Ngoài ra, mình cũng đã quyết định lấy luôn nó làm chủ đề bài thuyết trình trong buổi meetup về Flutter sắp tới của công ty.

![Header Image](/static/automapper-in-dart.jpg)

Dạo trước, mình có tình cờ lướt qua một bài blog của anh [Chau Tran][0] được chia sẻ trên cộng đồng [Node.js Việt Nam][1]: [Why I (want to) build an AutoMapper in TypeScript?][2]. Và mình đã nghĩ: "Ồ tuyệt, không phải một bài nhờ vả debug hộ nữa rồi!". Nhưng sự thật là lúc đọc xong mình đã chẳng có ấn tượng gì mấy với AutoMapper cả. Phần vì mình chưa cần dùng đến bao giờ, càng chẳng áp dụng chuẩn chỉnh [MVVM][3] pattern nữa. Mãi đến gần đây, công ty quyết định tổ chức một buổi meetup thân mật cho anh em người dùng Flutter Việt Nam tại Hà Nội. Và mình thì phải lên thuyết trình một bài. Thế là AutoMapper hiện lên trong tâm trí: "Sao không thử port nó sang [Dart][16] rồi giới thiệu cho mọi người nhỉ?".

Cuối cùng thì nó đây, thành quả hai tuần nghiền ngẫm: [automapper_dart][4].

Trong bài viết này, mình sẽ giới thiệu qua vài nét sơ lược nhất về AutoMapper, rồi quá trình mình implement thư viện ấy với Dart như nào, cùng tất cả những gì mình học được từ đó.

## AutoMapper? AutoMapper + Dart?

Giới thiệu về AutoMapper, mình sẽ không dông dài đâu. Các bạn nên _(và cần)_ đọc trước [AutoMapper's Design Philosophy][5] của tác giả [Jimmy Bogard][6] - cha đẻ của phiên bản AutoMapper gốc cho .NET, cũng như bài blog của anh Chau Tran bên trên, để hiểu rõ chúng ta đang nói về cái gì. Nhưng để giải thích một cách đơn giản, _AutoMapper giúp chúng ta tự động map một object này thành một object khác, theo một số quy tắc, thường là từ [domain models][7] sang [DTOs][8] / [view models][3]_.

Nhưng điều hiển nhiên là không có giải pháp nào hoàn hảo cho mọi trường hợp. AutoMapper không phải ngoại lệ. Trên thực tế, với kha khá ràng buộc, nó chỉ nên được áp dụng trong một số ngữ cảnh nhất định.

- Yếu tố tiên quyết là hệ thống của bạn phải áp dụng MVVM design pattern. Nếu không, tất cả những domain model, view model,... chẳng có nghĩa lý gì cả.
- View models phải giống, hoặc tương đối giống domain models. Có thể là tập con, có thể là một phiên bản đơn giản hơn (flattened),...
- Cả domain models và view models cần tuân thủ theo một quy tắc đặt tên biến nào đó.

Có điều tại sao phải là Dart? Như mình nói lúc đầu, mình phải thuyết trình về Flutter, mà nói về ngôn ngữ viết nên Flutter cũng không phải ý tồi. Với cả, mình cảm thấy chưa thực sự làm chủ được Dart trong quá trình phát triển phần mềm. Dù cú pháp cực kì đơn giản và quen thuộc, nó vẫn rất khác so với dynamic typed languages như JavaScript hay Python mình vẫn quen dùng. Vì thế, mình tin đây là cơ hội tốt để bản thân rèn dũa nhiều hơn với ngôn ngữ này. Dẫu vậy, sau này mình có phát hiện ra một điểm yếu chết người của Dart mà tên gà mờ như mình trước đó chưa từng hay biết (mình sẽ nói kĩ hơn ở phần cuối bài viết).

## Hành trình phát triển automapper_dart

![](/static/automapper-in-dart-2.jpg)

Sau khi nghiên cứu chán chê, mình bắt tay vào quá trình viết automapper_dart. Chà, nó không dễ như mình tưởng! Ừ thì đúng là chỉ cần lấy danh sách tất cả các thuộc tính của class đích, duyệt qua danh sách ấy, rồi lấy giá trị của thuộc tính tương ứng trong object nguồn gán vào object đích. Xong! Xong đời!!

Với static typed programming languages như Dart, chúng ta không thể đơn giản chỉ cần gọi `Object.getOwnPropertyNames` lên một object là lấy được hết tên các thuộc tính của nó như JavaScript. Song, sau bài viết của anh Chau Tran, mình tin rằng đây lại là một điều may mắn. Trong trường hợp này, chúng ta cần sử dụng một cơ chế khá hay ho, gọi là [reflection][9] (mình sẽ dành hẳn một bài viết về reflection nói riêng và metaprogramming nói chung trong tương lai).

> In computer science, reflection is the ability of a process to examine, introspect, and modify its own structure and behavior.

Thế là lại phải tìm hiểu thêm về [Symbol][10], mirrors và thư viện [dart:mirrors][11].

Mọi chuyện bắt đầu dễ dàng hơn từ đây. Mình đã phải dành tương đối thời gian nghiên cứu và tham khảo mã nguồn của cả [AutoMapper/AutoMapper][12] và [nartc/mapper][13]. Rồi mình cũng đã đi đến quyết định là không thể bê nguyên 100% mã nguồn C# hay TypeScript của hai thư viện trên sang Dart được. Không hẳn là vì những ngôn ngữ này quá khác nhau còn mình thì không biết bê sang kiểu gì. Đơn giản là vì API của chúng quá lằng nhằng, với hàng tá callbacks ở khắp mọi nơi. Mình không thích điều đó. Mình muốn thiết kế một thư viện với hệ thống API tinh gọn, tường minh và dễ hiểu nhất có thể.

Tính năng này đến tính năng khác, rắc rối này đến rắc rối khác, cuối cùng mình cũng cho ra đời được một phiên bản hòm hòm như ngày hôm nay. Dù chưa hỗ trợ đầy đủ tính năng như phiên bản gốc, mình tin rằng thư viện này đã hoàn toàn đủ dùng cho đa số trường hợp (các bạn có thể xem danh sách những tính năng mình đã và chưa hỗ trợ trên Github repository của automapper_dart).

Quay lại cái điểm yếu chết người của Dart mình đề cập lúc trước. Điểm yếu của dart:mirrors thì chính xác hơn. Hiện tại, thư viện này chỉ còn hoạt động trong Dart virtual machine. Flutter cho di động: không. Flutter cho web: cũng không. `dart2js`: ngừng hỗ trợ. `dart2native`: không nốt. Có thể nói rằng đây là thư viện có tiền đồ xám xịt nhất trong hệ thống thư viện chuẩn của Dart, khi vẫn bị đánh dấu unstable dù API đã gần như không thay đổi từ lâu, vẫn gây ra tranh cãi và thậm chí có nguy cơ bị xoá sổ hoàn toàn. Tất cả chỉ vì một tính năng quan trọng mang tên tree shaking. Mọi người có thể tìm hiểu sâu hơn về vấn đề này qua bài viết [The fear of dart:mirrors][14].

Song song với việc ấy, mình nghĩ bản thân cũng sẽ ít có cơ hội tận dụng sức mạnh của automapper_dart trong các dự án thực tế. Ở Teneocto - công ty hiện tại mình đang làm việc, tất cả các dự án dùng tới ngôn ngữ Dart đều nằm trong ngữ cảnh Flutter cho di động. Chúng mình cũng thường chọn Firebase Firestore làm cơ sở dữ liệu, và áp dụng BLoC pattern thay vì MVVM, nên việc tìm cách (de)serializing JSON hiệu quả sẽ phù hợp nhu cầu thực tiễn hơn là AutoMapper.

## Kết luận

Nói đi cũng phải nói lại, điều mình vừa chia sẻ bên trên không đồng nghĩa với việc tất cả những gì mình làm suốt nửa tháng qua là vô nghĩa. Trong quá trình xây dựng automapper_dart, mình đã được mở rộng tầm mắt với khá nhiều kiến thức mới bổ ích. Đáng nói nhất chính là khái niệm metaprogramming mà mình đã hứa sẽ dành hẳn một bài riêng để nói về nó. Bên cạnh đó, đây chưa hẳn đã là kết thúc của automapper_dart. Nếu có thời gian và thêm chút động lực, mình hoàn toàn có thể cân nhắc chuyển sang thư viện [reflectable][15] thay vì dart:mirrors (code generation thay vì dynamic reflection at runtime).

Đến đây là hết rồi. Cảm ơn các bạn đã dành không ít thời gian đọc hết bài viết dài chưa từng có này của mình! Nếu quan tâm đến AutoMapper, đừng ngại thử dùng nó một lần, bất kể đó là phiên bản cho C#, TypeScript hay Dart. Nếu có bất kì nhận xét, góp ý hay thắc mắc nào, đừng ngại để lại cho mình vài dòng tin nhắn.

Xin chào và hẹn gặp lại trong bài viết tiếp theo!

## Links

- [lqmanh/automapper_dart][4]

[0]: https://github.com/nartc
[1]: https://www.facebook.com/groups/congdong.nodejs.vietnam
[2]: https://nartc.netlify.com/blogs/automapper-typescript
[3]: https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel
[4]: https://github.com/lqmanh/automapper_dart
[5]: https://jimmybogard.com/automappers-design-philosophy
[6]: https://github.com/jbogard
[7]: https://en.wikipedia.org/wiki/Domain_model
[8]: https://en.wikipedia.org/wiki/Data_transfer_object
[9]: https://en.wikipedia.org/wiki/Reflection_(computer_programming)
[10]: https://www.tutorialspoint.com/dart_programming/dart_programming_symbol.htm
[11]: https://api.dartlang.org/stable/dart-mirrors/dart-mirrors-library.html
[12]: https://github.com/AutoMapper/AutoMapper
[13]: https://github.com/nartc/mapper
[14]: https://mrale.ph/blog/2017/01/08/the-fear-of-dart-mirrors.html
[15]: https://pub.dev/packages/reflectable
[16]: https://dart.dev
