// このjsファイルは, es5, es201X, jQueryの処理を書くことができます。

// defaultとしてexportするとimport時に自由に名前を決めれます。
// import hoge from './module/test_transferModule'
// 特定のメソッドのみimport
import { fuga } from './module/test_transferModule'
// 特定のメソッドを名前を決めてimportできます。
// import { fuga as foo } from './module/test_transferModule'

// hoge()
fuga()
// foo()
