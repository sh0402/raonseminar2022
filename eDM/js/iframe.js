/**
    * Test harness to find out the best method for dynamically loading a
    * html page into your app.
    */
 const test_times = {};
 const test_page = 'https://sh0402.github.io/raonseminar2022/eDM/';
 const content_div = document.getElementById('content');

 // TEST 1 = use jQuery to load in testpage.htm and time it.

 function test_() {
   var start = new Date().getTime();
   $(content_div).load(test_page, function () {
     //alert(new Date().getTime() - start);
   });
 }
 test_();