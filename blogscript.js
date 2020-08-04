/*global functions*/
var searchPosts; //function made for searching posts using the search bar and search button
var sortPostsByDate;

//once everything but the DOM is loaded
window.onload = function() {
  //the function gets the blogdata and passes it a custom event generator
  loadJSON("posts.json",function(blogdata){
    const loadevent = new CustomEvent('JSONloaded', {detail : {key : blogdata}}); //the event is fired and passes blogdata to it
    dispatchEvent(loadevent);
  },[]);
}

window.addEventListener("JSONloaded", function(event) {
  //get the event detail key which contains the blog data
  let blogdata = event.detail.key;
  //load the data
  loadPosts(blogdata,'postdisplay','overlay');
  //enable the search button
  searchPosts = search.bindArgs(blogdata,loadPosts,['postdisplay','overlay']);
  document.getElementById('searchbutton').disabled = false;
  //enable the display all button
  sortPostsByDate = sortByDate.bindArgs(blogdata,loadPosts,['postdisplay','overlay']);
  document.getElementById('displayallbutton').disabled = false;
});