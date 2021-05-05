[![CI](https://github.com/prrknh/dayoftheweek-checker-chrome-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/prrknh/dayoftheweek-checker-chrome-extension/actions?query=workflow%3ACI)

# dayoftheweek-checker-chrome-extension 

https://chrome.google.com/webstore/detail/dayoftheweekchecker/chlmgjghfeamkmgbnklkbidnhbfmaonj

## 概要

曜日の入った日付文字列に対して、適切な曜日であるかをチェックするGoogle Chrome拡張機能です。
例えば、"2021/03/23(月)" という文字列の場合、カレンダー上2021年3月23日は火曜日なので、(月)は間違っていることになります。

また曜日の入っていない日付文字列から、その日付の曜日を確認することができます。

## 利用ケース

- ブラウザでメールを書くときに、間違った日付を相手に送ることを防げます。
- 表示されている曜日入日付がおかしいと思った時に、その場で確認することができます。
- 表示されている日付が何曜日かなと思った時に、その場で確認することができます。

## 機能

- WEBページ上でチェックしたい文字列を選択して右クリックメニューを開き、
    - 曜日入日付の場合は、曜日が正しいかをチェックできます。
    - 曜日が入っていない日付の場合は、曜日を確認できます。
- フォームで曜日入日付を入力した際に、自動でチェックが走ります。
    - チェックした結果は、表示されているページ上で即座に表示されます。(※ 元のWEBページの挙動を害しません。)


