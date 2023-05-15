<script setup>
// 一下正则表达式使用与含html标签的字符串的处理
let str = `<p>周保平一行到校团委和各校级学生组织办公室看望并慰问团学干部</p>
<p>周保平一行到测绘工程学院实训基地看望备战技能竞赛的青年学生</p>
<p>周保平做总结讲话</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><img src="http://www.hxedu.org/upFiles/infoImg/202305/2023050565554321.png" border="0"></p>
<p>何新宣读表彰决定。学校领导分别为五四红旗团总支、十佳主题团日活动、优秀团干和优秀团员等先进基层团组织、先进个人颁奖。</p>
<p><img src="http://www.hxedu.org/upFiles/infoImg/202305/2023050565563937.png" border="0"></p>`;

// 匹配字符串中所有的img标签
let arr = str.match(/<img.*?(?:>|\/>)/gi);
// arr打印结果
arr = [
  '<img src="http://www.hxedu.org/upFiles/infoImg/202305/2023050565563937.png" border="0">',
  '<img src="http://www.hxedu.org/upFiles/infoImg/202305/2023050565554321.png" border="0"',
];
// 匹配字符串中的纯文本
let brr = str.replace(/<[^>]+>/g, "");
// brr打印结果
brr = `周保平一行到校团委和各校级学生组织办公室看望并慰问团学干部周保平一行到测绘
工程学院实训基地看望备战技能竞赛的青年学生周保平做总结讲话何新宣读表彰决定。
学校领导分别为五四红旗团总支、十佳主题团日活动、优秀团干和优秀团员等先进基层团组织、先进个人颁奖。`;

// 匹配字符串中的数字
let str1 = "我今年25岁了";
let crr = str1.replace(/[^\d]/g, " ");
// crr打印结果
crr = "25";
</script>
